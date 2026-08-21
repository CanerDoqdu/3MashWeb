import { Props } from "./types";

function trimmedText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function ThreeMashProductComparison(props: Props) {
  const index = trimmedText(props.sectionIndex, "05");
  const label = trimmedText(props.sectionLabel, "BÖLÜM ETİKETİ");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Karşılaştırma tablosu <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "Karşılaştırma bölümü için sağ tarafta yer alan detaylı açıklama metni buraya gelecek."
  );

  const col1Title = trimmedText(props.column1Title, "1. Karşılaştırılan Seçenek");
  const col1Sub = trimmedText(props.column1Subtitle, "1. Seçenek kısa alt açıklama metni");
  const col1Badge = trimmedText(props.column1Badge, "SEÇENEK 1");

  const col2Title = trimmedText(props.column2Title, "2. Karşılaştırılan Seçenek");
  const col2Sub = trimmedText(props.column2Subtitle, "2. Seçenek kısa alt açıklama metni");
  const col2Badge = trimmedText(props.column2Badge, "ÖNE ÇIKAN");

  const rows = [
    {
      feature: trimmedText(props.row1Feature, "1. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row1Col1Value, "1. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row1Col2Value, "1. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row1Col1Positive ?? false,
      col2Pos: props.row1Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row2Feature, "2. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row2Col1Value, "2. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row2Col2Value, "2. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row2Col1Positive ?? false,
      col2Pos: props.row2Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row3Feature, "3. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row3Col1Value, "3. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row3Col2Value, "3. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row3Col1Positive ?? false,
      col2Pos: props.row3Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row4Feature, "4. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row4Col1Value, "4. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row4Col2Value, "4. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row4Col1Positive ?? false,
      col2Pos: props.row4Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row5Feature, "5. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row5Col1Value, "5. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row5Col2Value, "5. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row5Col1Positive ?? false,
      col2Pos: props.row5Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row6Feature, "6. Karşılaştırma Kriteri"),
      col1: trimmedText(props.row6Col1Value, "6. Kriter 1. Seçenek Değeri"),
      col2: trimmedText(props.row6Col2Value, "6. Kriter 2. Seçenek Değeri"),
      col1Pos: props.row6Col1Positive ?? false,
      col2Pos: props.row6Col2Positive ?? true,
    },
  ];

  const bottomNote = trimmedText(
    props.bottomNote,
    "* Tablo altı açıklama veya bilgilendirme notu buraya gelecek."
  );
  const ctaText = trimmedText(props.ctaText, "Aksiyon Butonu Metni →");
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
          <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="tm-cmp-side" dangerouslySetInnerHTML={{ __html: sideHtml }} />
        </div>

        <div className="tm-cmp-table-card">
          <div className="tm-cmp-grid-head">
            <div className="tm-cmp-th-feature">KARŞILAŞTIRMA KRİTERİ</div>
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
