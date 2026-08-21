import { Props } from "./types";

function trimmedText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function ThreeMashProductComparison(props: Props) {
  const index = trimmedText(props.sectionIndex, "05");
  const label = trimmedText(props.sectionLabel, "KARŞILAŞTIRMA");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Geleneksel yöntemler ile <span class="em">3MASH farkı.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "Dental üretim süreçlerinde zaman, maliyet ve ölçüsel doğruluk karşılaştırması."
  );

  const col1Title = trimmedText(props.column1Title, "Geleneksel / Alternatif");
  const col1Sub = trimmedText(props.column1Subtitle, "Klasik laboratuvar & freze akışı");
  const col1Badge = trimmedText(props.column1Badge, "KLASİK");

  const col2Title = trimmedText(props.column2Title, "3MASH Ekosistemi");
  const col2Sub = trimmedText(props.column2Subtitle, "Entegre 3D üretim & kürleme");
  const col2Badge = trimmedText(props.column2Badge, "ÖNERİLEN");

  const rows = [
    {
      feature: trimmedText(props.row1Feature, "Ölçüsel Doğruluk & Marjinal Uyum"),
      col1: trimmedText(props.row1Col1Value, "±80–120 µm (Değişken)"),
      col2: trimmedText(props.row1Col2Value, "±20 µm (Her baskıda tutarlı)"),
      col1Pos: props.row1Col1Positive ?? false,
      col2Pos: props.row1Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row2Feature, "Birim Üretim Süresi (Kuron)"),
      col1: trimmedText(props.row2Col1Value, "45 – 90 dakika"),
      col2: trimmedText(props.row2Col2Value, "12 – 18 dakika (Çoklu tabla)"),
      col1Pos: props.row2Col1Positive ?? false,
      col2Pos: props.row2Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row3Feature, "Biyouyumluluk & CE Standardı"),
      col1: trimmedText(props.row3Col1Value, "Sınırlı sertifikasyon"),
      col2: trimmedText(props.row3Col2Value, "CE Class IIa / Biyouyumlu"),
      col1Pos: props.row3Col1Positive ?? false,
      col2Pos: props.row3Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row4Feature, "Kürleme & Dönüşüm Derecesi"),
      col1: trimmedText(props.row4Col1Value, "Manuel UV lambası (Dengesiz)"),
      col2: trimmedText(props.row4Col2Value, "24 LED 360° homojen UV kürleme"),
      col1Pos: props.row4Col1Positive ?? false,
      col2Pos: props.row4Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row5Feature, "Teknik Destek & Parametre Ayarı"),
      col1: trimmedText(props.row5Col1Value, "Yalnızca cihaz satışı"),
      col2: trimmedText(props.row5Col2Value, "Mash Academy + Canlı Mühendis Desteği"),
      col1Pos: props.row5Col1Positive ?? false,
      col2Pos: props.row5Col2Positive ?? true,
    },
    {
      feature: trimmedText(props.row6Feature, "Tekrar (Remake) Maliyet Oranı"),
      col1: trimmedText(props.row6Col1Value, "%8 – 14 görünmez kayıp"),
      col2: trimmedText(props.row6Col2Value, "< %2 minimum hata payı"),
      col1Pos: props.row6Col1Positive ?? false,
      col2Pos: props.row6Col2Positive ?? true,
    },
  ];

  const bottomNote = trimmedText(
    props.bottomNote,
    "* 580+ klinik ve laboratuvarın üretim verileri baz alınarak modellenmiştir."
  );
  const ctaText = trimmedText(props.ctaText, "Kliniğinize Özel Analiz Alın →");
  const ctaHref = trimmedText(
    props.ctaHref,
    "https://wa.me/905314326577?text=Urun%20karsilastirmasi%20hakkinda%20bilgi%20almak%20istiyorum"
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
              <span className="tm-cmp-col-badge">{col1Badge}</span>
              <h3 className="tm-cmp-col-title">{col1Title}</h3>
              <p className="tm-cmp-col-sub">{col1Sub}</p>
            </div>
            <div className="tm-cmp-th-col is-featured">
              <span className="tm-cmp-col-badge">{col2Badge}</span>
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
