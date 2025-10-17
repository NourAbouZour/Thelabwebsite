import json
import re
from pathlib import Path


def is_candidate_name(line: str) -> bool:
    line = line.strip()
    if not (3 <= len(line) <= 60):
        return False
    if any(tok in line.lower() for tok in ["terms", "privacy", "contact", "program", "exhibition", "sponsor", "press", "about", "we design", "beirut", "oct."]):
        return False
    # Title Case heuristic: words start uppercase followed by lowercase
    tokens = [t for t in re.split(r"\s+", line) if t]
    if len(tokens) < 2 or len(tokens) > 6:
        return False
    score = 0
    for t in tokens:
        if re.match(r"^[A-Z][a-z'\-]{1,}$", t):
            score += 1
        elif re.match(r"^[A-Z]{2,}$", t):  # all caps token
            score += 1
    return score >= max(2, len(tokens) - 1)


def sentences_after(lines, start_idx, max_chars=220):
    text = " ".join(l.strip() for l in lines[start_idx:start_idx + 12])
    # split into sentences crudely
    parts = re.split(r"(?<=[.!?])\s+", text)
    out = []
    total = 0
    for p in parts:
        if not p:
            continue
        out.append(p)
        total += len(p)
        if total >= max_chars or len(out) >= 2:
            break
    return " ".join(out).strip()


def slugify(text: str) -> str:
    return re.sub(r"(^-|-$)+", "", re.sub(r"[^a-z0-9]+", "-", text.lower()))


def main():
    root = Path(__file__).resolve().parents[1]
    extracted_dir = root / "assets" / "data" / "extracted"
    files = sorted(extracted_dir.glob("*.txt"))
    if not files:
        raise SystemExit(f"No extracted text files in {extracted_dir}")

    # Load and combine lines
    all_lines = []
    for fp in files:
        try:
            content = fp.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            content = fp.read_text(encoding="latin-1", errors="ignore")
        lines = [l.strip() for l in content.splitlines() if l.strip()]
        all_lines.extend(lines)

    candidates = []
    for idx, line in enumerate(all_lines):
        if is_candidate_name(line):
            candidates.append((idx, line))

    # Deduplicate preserving order
    seen = set()
    unique = []
    for idx, name in candidates:
        key = name.lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append((idx, name))
        if len(unique) >= 11:
            break

    creators = []
    for i, (idx, name) in enumerate(unique, start=1):
        # Gather a larger text window around the anchor
        full_text = "\n".join(all_lines[max(0, idx-20): idx + 400])
        # Extract structured sections
        biography = extract_section(full_text, ["biography", "bio"]) or ""
        process = extract_section(full_text, ["process", "making", "production"]) or ""
        materials = extract_inline(full_text, ["materials", "medium"]) or ""
        dimensions = extract_inline(full_text, ["dimensions", "size"]) or ""
        year = extract_inline(full_text, ["year", "date"]) or ""
        location = extract_inline(full_text, ["location"]) or ""
        # Fallback details is the full window
        details = full_text.strip()
        summary = sentences_after(all_lines, idx + 1)
        slug = slugify(name)
        creators.append({
            "id": f"c{i}",
            "name": name,
            "slug": slug,
            "x": [18,35,56,74,82,66,44,26,16,52,50][(i-1) % 11],
            "y": [22,30,18,28,46,62,72,64,46,44,50][(i-1) % 11],
            "summary": summary,
            "details": details,
            "biography": biography,
            "process": process,
            "materials": materials,
            "dimensions": dimensions,
            "year": year,
            "location": location,
            "image": ""
        })


def extract_section(text: str, headings: list[str]) -> str:
    lines = [l.strip() for l in text.splitlines()]
    idxs = []
    for i, l in enumerate(lines):
        low = l.lower().rstrip(':').strip()
        if low in headings or any(low.startswith(h+':') for h in headings):
            idxs.append(i)
    if not idxs:
        return ""
    start = idxs[0] + 1
    # Stop at next heading-like line
    out = []
    for j in range(start, min(len(lines), start + 200)):
        lj = lines[j]
        low = lj.lower().rstrip(':').strip()
        if low in ["biography","bio","process","making","production","materials","medium","dimensions","size","year","date","location","awards","education","exhibitions","press"]:
            break
        out.append(lj)
    return "\n".join(out).strip()


def extract_inline(text: str, labels: list[str]) -> str:
    for lab in labels:
        m = __import__('re').search(rf"{lab}\s*[:\-]\s*(.+)", text, __import__('re').IGNORECASE)
        if m:
            val = m.group(1).strip()
            # stop at line end
            return val.splitlines()[0].strip()
    return ""

    out_fp = root / "assets" / "data" / "creators.json"
    out_fp.write_text(json.dumps({"creators": creators}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(creators)} creators -> {out_fp}")


if __name__ == "__main__":
    main()


