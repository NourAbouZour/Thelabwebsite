import os
from pathlib import Path

try:
    from pdfminer.high_level import extract_text
except ImportError as e:
    raise SystemExit("pdfminer.six not installed. Run: pip install pdfminer.six")


def slugify(text: str) -> str:
    out = []
    for ch in text.lower():
        if ch.isalnum():
            out.append(ch)
        elif ch in [' ', '-', '_', '.']:
            out.append('-')
        else:
            out.append('-')
    slug = ''.join(out)
    while '--' in slug:
        slug = slug.replace('--', '-')
    return slug.strip('-')


def extract_pdf_text(pdf_path: Path, text_out_dir: Path) -> None:
    base_slug = slugify(pdf_path.name)
    text_out_dir.mkdir(parents=True, exist_ok=True)
    text_out = text_out_dir / f"{base_slug}.txt"
    try:
        text = extract_text(str(pdf_path))
    except Exception as e:
        raise SystemExit(f"Failed to extract text from {pdf_path}: {e}")
    text_out.write_text(text, encoding='utf-8')


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    pdfs = [
        root / "Artist Cartel_Naggiar x Wedesign .pdf",
        root / "Naggiar x Wedesign x Notsocivilised_Artist Photoshoot.pdf",
    ]
    text_out_dir = root / "assets" / "data" / "extracted"

    done = 0
    for pdf in pdfs:
        if pdf.exists():
            extract_pdf_text(pdf, text_out_dir)
            done += 1
        else:
            print(f"[warn] PDF not found: {pdf}")

    print(f"Extraction complete. PDFs processed: {done}")
    print(f"Text -> {text_out_dir}")


if __name__ == "__main__":
    main()


