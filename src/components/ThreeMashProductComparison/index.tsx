import { Props } from "./types";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function trimmedText(value: unknown, fallback = ""): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return fallback;
  if (isEnglishLocale() && isTurkishText(trimmed)) return fallback;
  return trimmed;
}

export function ThreeMashProductComparison(props: Props) {
  const index = trimmedText(props.sectionIndex, "05");
  const label = trimmedText(props.sectionLabel, tLocalized("BÖLÜM ETİKETİ", "SECTION LABEL"));
  const titleHtml = trimmedText(
    props.titleHtml,
    tLocalized('Karşılaştırma tablosu <span class="em">başlığı buraya gelecek.</span>', 'Comparison table <span class="em">title goes here.</span>')
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    tLocalized("Karşılaştırma bölümü için sağ tarafta yer alan detaylı açıklama metni buraya gelecek.", "Detailed description text for the comparison section goes here."
    )
  );

  const col1Title = trimmedText(props.column1Title, tLocalized("1. Karşılaştırılan Seçenek", "1. Comparison Option"));
  const col1Sub = trimmedText(props.column1Subtitle, tLocalized("1. Seçenek kısa alt açıklama metni", "Option 1 short description"));
  const col1Badge = trimmedText(props.column1Badge, tLocalized("SEÇENEK 1", "OPTION 1"));

  const col2Title = trimmedText(props.column2Title, tLocalized("2. Karşılaştırılan Seçenek", "2. Comparison Option"));
  const col2Sub = trimmedText(props.column2Subtitle, tLocalized("2. Seçenek kısa alt açıklama metni", "Option 2 short description"));
  const col2Badge = trimmedText(props.column2Badge, tLocalized("ÖNE ÇIKAN", "FEATURED"));

  const rows = [
    {
      feature: trimmedText(props.row1Feature, tLocalized("1. Karşılaştırma Kriteri", "1. Comparison Criteria")),
      col1: trimmedText(props.row1Col1Value, tLocalized("1. Kriter 1. Seçenek Değeri", "Criteria 1 Option 1 Value")),
      col2: trimmedText(props.row1Col2Value, tLocalized("1. Kriter 2. Seçenek Değeri", "Criteria 1 Option 2 Value")),
      col1Pos: props.row1Col1Positive ?? false,
      col2Pos: props.row1Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row2Feature, tLocalized("2. Karşılaştırma Kriteri", "2. Comparison Criteria")),
      col1: trimmedText(props.row2Col1Value, tLocalized("2. Kriter 1. Seçenek Değeri", "Criteria 2 Option 1 Value")),
      col2: trimmedText(props.row2Col2Value, tLocalized("2. Kriter 2. Seçenek Değeri", "Criteria 2 Option 2 Value")),
      col1Pos: props.row2Col1Positive ?? false,
      col2Pos: props.row2Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row3Feature, tLocalized("3. Karşılaştırma Kriteri", "3. Comparison Criteria")),
      col1: trimmedText(props.row3Col1Value, tLocalized("3. Kriter 1. Seçenek Değeri", "Criteria 3 Option 1 Value")),
      col2: trimmedText(props.row3Col2Value, tLocalized("3. Kriter 2. Seçenek Değeri", "Criteria 3 Option 2 Value")),
      col1Pos: props.row3Col1Positive ?? false,
      col2Pos: props.row3Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row4Feature, tLocalized("4. Karşılaştırma Kriteri", "4. Comparison Criteria")),
      col1: trimmedText(props.row4Col1Value, tLocalized("4. Kriter 1. Seçenek Değeri", "Criteria 4 Option 1 Value")),
      col2: trimmedText(props.row4Col2Value, tLocalized("4. Kriter 2. Seçenek Değeri", "Criteria 4 Option 2 Value")),
      col1Pos: props.row4Col1Positive ?? false,
      col2Pos: props.row4Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row5Feature, tLocalized("5. Karşılaştırma Kriteri", "5. Comparison Criteria")),
      col1: trimmedText(props.row5Col1Value, tLocalized("5. Kriter 1. Seçenek Değeri", "Criteria 5 Option 1 Value")),
      col2: trimmedText(props.row5Col2Value, tLocalized("5. Kriter 2. Seçenek Değeri", "Criteria 5 Option 2 Value")),
      col1Pos: props.row5Col1Positive ?? false,
      col2Pos: props.row5Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row6Feature, tLocalized("6. Karşılaştırma Kriteri", "6. Comparison Criteria")),
      col1: trimmedText(props.row6Col1Value, tLocalized("6. Kriter 1. Seçenek Değeri", "Criteria 6 Option 1 Value")),
      col2: trimmedText(props.row6Col2Value, tLocalized("6. Kriter 2. Seçenek Değeri", "Criteria 6 Option 2 Value")),
      col1Pos: props.row6Col1Positive ?? false,
      col2Pos: props.row6Col2Positive ?? true,
    },
  ];

  const bottomNote = trimmedText(
    props.bottomNote,
    tLocalized("* Tablo altı açıklama veya bilgilendirme notu buraya gelecek.", "* Table bottom explanation or informative note goes here.")
  );
  const ctaText = trimmedText(props.ctaText, tLocalized("Aksiyon Butonu Metni →", "Action Button Text →"));
  const ctaHref = trimmedText(
    props.ctaHref,
    "#"
  );

  return (
    <section className="tm-cmp-section">
      <div className="tm-cmp-wrap">
        <div className="tm-cmp-idx">
          <span className="tm-cmp-idx-n">{index}</span>
          <span className="tm-cmp-idx-t">{label}</span>
          <span className="tm-cmp-idx-ln" />
        </div>

        <div className="tm-cmp-head">
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(titleHtml) }} />
          <p className="tm-cmp-side" dangerouslySetInnerHTML={{ __html: sideHtml }} />
        </div>

        <div className="tm-cmp-table-card">
          <div className="tm-cmp-grid-head">
            <div className="tm-cmp-th-feature">{tLocalized("KARŞILAŞTIRMA KRİTERİ", "COMPARISON CRITERIA")}</div>
            <div className="tm-cmp-th-col">
              <div className="tm-cmp-col-badge-wrap">
                <span className="tm-cmp-col-badge">{col1Badge}</span>
              </div>
              <h3 className="tm-cmp-col-title">{col1Title}</h3>
              <p className="tm-cmp-col-sub">{col1Sub}</p>
            </div>
            <div className="tm-cmp-th-col is-featured">
              <div className="tm-cmp-col-badge-wrap">
                <span className="tm-cmp-col-badge">{col2Badge}</span>
              </div>
              <h3 className="tm-cmp-col-title">{col2Title}</h3>
              <p className="tm-cmp-col-sub">{col2Sub}</p>
            </div>
          </div>

          <div className="tm-cmp-rows">
            {rows.map((row, idx) => (
              <div className="tm-cmp-row" key={idx}>
                <div className="tm-cmp-row-feature">{row.feature}</div>
                <div className="tm-cmp-cell">
                  <span className={`tm-cmp-icon ${row.col1Pos ? "is-check" : "is-cross"}`}>
                    {row.col1Pos ? "✓" : "×"}
                  </span>
                  <span>{row.col1}</span>
                </div>
                <div className="tm-cmp-cell is-featured">
                  <span className={`tm-cmp-icon ${row.col2Pos ? "is-check" : "is-cross"}`}>
                    {row.col2Pos ? "✓" : "×"}
                  </span>
                  <span>{row.col2}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tm-cmp-foot">
            <p className="tm-cmp-note">{bottomNote}</p>
            {ctaText ? (
              <a className="tm-cmp-btn" href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaText}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductComparison;
