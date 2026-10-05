import { Props } from "./types";
import { isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

function trimmedText(value: unknown, fallback = ""): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return fallback;
  if (isEnglishLocale() && isTurkishText(trimmed)) return fallback;
  return trimmed;
}

function localizedText(value: unknown, englishValue: unknown, turkishFallback: string, englishFallback: string): string {
  const english = isEnglishLocale();
  return trimmedText(english ? englishValue : value, english ? englishFallback : turkishFallback);
}

export function ThreeMashProductComparison(props: Props) {
  const index = trimmedText(props.sectionIndex, "05");
  const label = localizedText(props.sectionLabel, props.sectionLabelEn, "KARŞILAŞTIRMA", "COMPARISON");
  const titleHtml = trimmedText(
    isEnglishLocale() ? props.titleHtmlEn : props.titleHtml,
    isEnglishLocale()
      ? 'Comparison table <span class="em">title goes here.</span>'
      : 'Karşılaştırma tablosu <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    isEnglishLocale() ? props.sideHtmlEn : props.sideHtml,
    isEnglishLocale()
      ? "Detailed description text for the comparison section goes here."
      : "Karşılaştırma bölümü için sağ tarafta yer alan detaylı açıklama metni buraya gelecek."
  );

  const col1Title = localizedText(props.column1Title, props.column1TitleEn, "1. Karşılaştırılan Seçenek", "1. Comparison Option");
  const col1Sub = localizedText(props.column1Subtitle, props.column1SubtitleEn, "1. Seçenek kısa alt açıklama metni", "Option 1 short description");
  const col1Badge = localizedText(props.column1Badge, props.column1BadgeEn, "SEÇENEK 1", "OPTION 1");

  const col2Title = localizedText(props.column2Title, props.column2TitleEn, "2. Karşılaştırılan Seçenek", "2. Comparison Option");
  const col2Sub = localizedText(props.column2Subtitle, props.column2SubtitleEn, "2. Seçenek kısa alt açıklama metni", "Option 2 short description");
  const col2Badge = localizedText(props.column2Badge, props.column2BadgeEn, "ÖNE ÇIKAN", "FEATURED");
  const positiveStatusLabel = localizedText(props.positiveStatusLabel, props.positiveStatusLabelEn, "Olumlu", "Positive");
  const negativeStatusLabel = localizedText(props.negativeStatusLabel, props.negativeStatusLabelEn, "Olumsuz", "Negative");

  const rows = [
    {
      feature: localizedText(props.row1Feature, props.row1FeatureEn, "1. Karşılaştırma Kriteri", "1. Comparison Criteria"),
      col1: localizedText(props.row1Col1Value, props.row1Col1ValueEn, "1. Kriter 1. Seçenek Değeri", "Criteria 1 Option 1 Value"),
      col2: localizedText(props.row1Col2Value, props.row1Col2ValueEn, "1. Kriter 2. Seçenek Değeri", "Criteria 1 Option 2 Value"),
      col1Pos: props.row1Col1Positive ?? false,
      col2Pos: props.row1Col2Positive ?? true,
      show: props.showRow1 !== false,
    },
    {
      feature: localizedText(props.row2Feature, props.row2FeatureEn, "2. Karşılaştırma Kriteri", "2. Comparison Criteria"),
      col1: localizedText(props.row2Col1Value, props.row2Col1ValueEn, "2. Kriter 1. Seçenek Değeri", "Criteria 2 Option 1 Value"),
      col2: localizedText(props.row2Col2Value, props.row2Col2ValueEn, "2. Kriter 2. Seçenek Değeri", "Criteria 2 Option 2 Value"),
      col1Pos: props.row2Col1Positive ?? false,
      col2Pos: props.row2Col2Positive ?? true,
      show: props.showRow2 !== false,
    },
    {
      feature: localizedText(props.row3Feature, props.row3FeatureEn, "3. Karşılaştırma Kriteri", "3. Comparison Criteria"),
      col1: localizedText(props.row3Col1Value, props.row3Col1ValueEn, "3. Kriter 1. Seçenek Değeri", "Criteria 3 Option 1 Value"),
      col2: localizedText(props.row3Col2Value, props.row3Col2ValueEn, "3. Kriter 2. Seçenek Değeri", "Criteria 3 Option 2 Value"),
      col1Pos: props.row3Col1Positive ?? false,
      col2Pos: props.row3Col2Positive ?? true,
      show: props.showRow3 !== false,
    },
    {
      feature: localizedText(props.row4Feature, props.row4FeatureEn, "4. Karşılaştırma Kriteri", "4. Comparison Criteria"),
      col1: localizedText(props.row4Col1Value, props.row4Col1ValueEn, "4. Kriter 1. Seçenek Değeri", "Criteria 4 Option 1 Value"),
      col2: localizedText(props.row4Col2Value, props.row4Col2ValueEn, "4. Kriter 2. Seçenek Değeri", "Criteria 4 Option 2 Value"),
      col1Pos: props.row4Col1Positive ?? false,
      col2Pos: props.row4Col2Positive ?? true,
      show: props.showRow4 !== false,
    },
    {
      feature: localizedText(props.row5Feature, props.row5FeatureEn, "5. Karşılaştırma Kriteri", "5. Comparison Criteria"),
      col1: localizedText(props.row5Col1Value, props.row5Col1ValueEn, "5. Kriter 1. Seçenek Değeri", "Criteria 5 Option 1 Value"),
      col2: localizedText(props.row5Col2Value, props.row5Col2ValueEn, "5. Kriter 2. Seçenek Değeri", "Criteria 5 Option 2 Value"),
      col1Pos: props.row5Col1Positive ?? false,
      col2Pos: props.row5Col2Positive ?? true,
      show: props.showRow5 !== false,
    },
    {
      feature: localizedText(props.row6Feature, props.row6FeatureEn, "6. Karşılaştırma Kriteri", "6. Comparison Criteria"),
      col1: localizedText(props.row6Col1Value, props.row6Col1ValueEn, "6. Kriter 1. Seçenek Değeri", "Criteria 6 Option 1 Value"),
      col2: localizedText(props.row6Col2Value, props.row6Col2ValueEn, "6. Kriter 2. Seçenek Değeri", "Criteria 6 Option 2 Value"),
      col1Pos: props.row6Col1Positive ?? false,
      col2Pos: props.row6Col2Positive ?? true,
      show: props.showRow6 !== false,
    },
  ];

  const bottomNote = trimmedText(
    isEnglishLocale() ? props.bottomNoteEn : props.bottomNote,
    isEnglishLocale()
      ? "* Table bottom explanation or informative note goes here."
      : "* Tablo altı açıklama veya bilgilendirme notu buraya gelecek."
  );
  const ctaText = localizedText(props.ctaText, props.ctaTextEn, "Kliniğinize Özel Analiz Alın →", "Get a Clinic-Specific Analysis →");
  const ctaHref = safeNavigationHref(props.ctaHref, "/3d-yazicilar");

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
          <p className="tm-cmp-side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(sideHtml) }} />
        </div>

        <div className="tm-cmp-table-card">
          <div className="tm-cmp-grid-head">
            <div className="tm-cmp-th-feature">{localizedText(props.comparisonCriteriaLabel, props.comparisonCriteriaLabelEn, "KARŞILAŞTIRMA KRİTERİ", "COMPARISON CRITERIA")}</div>
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
            {rows.filter((row) => row.show).map((row, idx) => (
              <div className="tm-cmp-row" key={idx}>
                <div className="tm-cmp-row-feature">{row.feature}</div>
                <div className="tm-cmp-cell">
                  <span className={`tm-cmp-icon ${row.col1Pos ? "is-check" : "is-cross"}`} role="img" aria-label={row.col1Pos ? positiveStatusLabel : negativeStatusLabel}>
                    {row.col1Pos ? "✓" : "×"}
                  </span>
                  <span>{row.col1}</span>
                </div>
                <div className="tm-cmp-cell is-featured">
                  <span className={`tm-cmp-icon ${row.col2Pos ? "is-check" : "is-cross"}`} role="img" aria-label={row.col2Pos ? positiveStatusLabel : negativeStatusLabel}>
                    {row.col2Pos ? "✓" : "×"}
                  </span>
                  <span>{row.col2}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tm-cmp-foot">
            {props.showBottomNote !== false ? <p className="tm-cmp-note">{bottomNote}</p> : null}
            {props.showCta !== false && ctaText ? (
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
