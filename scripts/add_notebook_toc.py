import json
import re
import unicodedata
from pathlib import Path

TOC_TAG = "python-prirocnik-toc-v1"


def source_text(cell):
    source = cell.get("source", [])
    return "".join(source) if isinstance(source, list) else str(source)


def heading_from_cell(cell):
    if cell.get("cell_type") != "markdown":
        return None
    for line in source_text(cell).splitlines():
        match = re.match(r"^\s*(#{1,6})\s+(.+?)\s*$", line)
        if match:
            return len(match.group(1)), match.group(2).strip()
    return None


def github_slug(text):
    text = unicodedata.normalize("NFC", text.strip().lower())
    text = re.sub(r"[^\w\- ]", "", text, flags=re.UNICODE)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def toc_cell(title, intro, entries):
    lines = [f"# {title}\n", "\n", f"{intro}\n", "\n"]
    lines.extend(f"- [{text}](#{github_slug(text)})\n" for text in entries)
    lines.extend(["\n", "---\n", "\n", "*Klik na naslov skoči neposredno na izbrano poglavje.*"])
    return {
        "cell_type": "markdown",
        "id": "python-prirocnik-kazalo",
        "metadata": {"tags": [TOC_TAG]},
        "source": lines,
    }


def remove_old_toc(cells):
    result = []
    for cell in cells:
        tags = cell.get("metadata", {}).get("tags", [])
        if TOC_TAG in tags or cell.get("id") == "python-prirocnik-kazalo":
            continue
        result.append(cell)
    return result


def update_snov(path):
    nb = json.loads(path.read_text(encoding="utf-8"))
    cells = remove_old_toc(nb.get("cells", []))
    headings = []
    for cell in cells:
        item = heading_from_cell(cell)
        if item and item[0] == 1:
            headings.append(item[1])
    if not headings:
        raise RuntimeError("V snov.ipynb ni glavnih Markdown naslovov.")
    nb["cells"] = [toc_cell("Kazalo", "**Hitri skoki po snovi:**", headings)] + cells
    path.write_text(json.dumps(nb, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("snov.ipynb:", headings)


def update_izpiti(path):
    nb = json.loads(path.read_text(encoding="utf-8"))
    cells = remove_old_toc(nb.get("cells", []))
    headings = []
    for cell in cells:
        item = heading_from_cell(cell)
        if not item:
            continue
        level, text = item
        if level <= 3 and re.match(r"^(?:\d+[.)]?\s*)?izpit\b", text, flags=re.IGNORECASE):
            headings.append(text)
    if not headings:
        headings = [item[1] for cell in cells if (item := heading_from_cell(cell)) and item[0] == 1]
    if not headings:
        raise RuntimeError("V izpitiRP.ipynb ni naslovov izpitov.")
    nb["cells"] = [toc_cell("Kazalo izpitov", "**Klikni na izpit za neposreden skok:**", headings)] + cells
    path.write_text(json.dumps(nb, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("izpitiRP.ipynb:", headings)


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    update_snov(root / "snov.ipynb")
    update_izpiti(root / "izpitiRP.ipynb")
