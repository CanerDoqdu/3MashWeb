import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";

function trimmedText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function imageSource(value: unknown, fallback = ""): string {
  if (!value) return fallback;
  if (typeof value === "string") return value.trim() || fallback;
  try {
    return getDefaultSrc(value as any) || fallback;
  } catch {
    return fallback;
  }
}

export function ThreeMashProductCertificates(props: Props) {
  const index = trimmedText(props.sectionIndex, "08");
  const label = trimmedText(props.sectionLabel, "BÖLÜM ETİKETİ");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Sertifikalar ve raporlar <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "Sertifikalar ve test raporları bölümü için sağ taraftaki detaylı açıklama metni buraya gelecek."
  );

  const globalShowImages = props.showImages !== false;

  const certs = [
    {
      showImage: globalShowImages && props.cert1ShowImage !== false,
      image: imageSource(
        props.cert1Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp"
      ),
      badge: trimmedText(props.cert1Badge, "1. SERTİFİKA ROZETİ"),
      title: trimmedText(props.cert1Title, "1. Sertifika / Rapor Başlığı"),
      sub: trimmedText(props.cert1Subtitle, "1. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek."),
      reportNo: trimmedText(props.cert1ReportNo, "RAPOR-NO-01"),
      issuer: trimmedText(props.cert1Issuer, "Akredite Test Kurumu 1"),
      actionText: trimmedText(props.cert1ActionText, "Raporu İncele (PDF) →"),
      actionHref: trimmedText(props.cert1ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert2ShowImage !== false,
      image: imageSource(
        props.cert2Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp"
      ),
      badge: trimmedText(props.cert2Badge, "2. SERTİFİKA ROZETİ"),
      title: trimmedText(props.cert2Title, "2. Sertifika / Rapor Başlığı"),
      sub: trimmedText(props.cert2Subtitle, "2. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek."),
      reportNo: trimmedText(props.cert2ReportNo, "RAPOR-NO-02"),
      issuer: trimmedText(props.cert2Issuer, "Akredite Test Kurumu 2"),
      actionText: trimmedText(props.cert2ActionText, "Standardı Görüntüle →"),
      actionHref: trimmedText(props.cert2ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert3ShowImage !== false,
      image: imageSource(
        props.cert3Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp"
      ),
      badge: trimmedText(props.cert3Badge, "3. SERTİFİKA ROZETİ"),
      title: trimmedText(props.cert3Title, "3. Sertifika / Rapor Başlığı"),
      sub: trimmedText(props.cert3Subtitle, "3. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek."),
      reportNo: trimmedText(props.cert3ReportNo, "RAPOR-NO-03"),
      issuer: trimmedText(props.cert3Issuer, "Akredite Test Kurumu 3"),
      actionText: trimmedText(props.cert3ActionText, "Test Raporu Detayı →"),
      actionHref: trimmedText(props.cert3ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert4ShowImage !== false,
      image: imageSource(
        props.cert4Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp"
      ),
      badge: trimmedText(props.cert4Badge, "4. SERTİFİKA ROZETİ"),
      title: trimmedText(props.cert4Title, "4. Sertifika / Rapor Başlığı"),
      sub: trimmedText(props.cert4Subtitle, "4. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek."),
      reportNo: trimmedText(props.cert4ReportNo, "RAPOR-NO-04"),
      issuer: trimmedText(props.cert4Issuer, "Akredite Test Kurumu 4"),
      actionText: trimmedText(props.cert4ActionText, "Klinik Raporu İncele →"),
      actionHref: trimmedText(props.cert4ActionHref, "#"),
    },
  ];

  const complianceNotice = trimmedText(
    props.complianceNotice,
    "Sertifikalar ve test raporları hakkında genel yasal bilgilendirme notu buraya gelecek."
  );

  return (
    <section className="tm-cert-section">
      <div className="tm-cert-wrap">
        <div className="tm-cert-idx">
          <span className="tm-cert-idx-n">{index}</span>
          <span className="tm-cert-idx-t">{label}</span>
          <span className="tm-cert-idx-ln" />
        </div>

        <div className="tm-cert-head">
          <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="tm-cert-side" dangerouslySetInnerHTML={{ __html: sideHtml }} />
        </div>

        <div className="tm-cert-grid">
          {certs.map((cert, idx) => (
            <article className="tm-cert-card" key={idx}>
              <div>
                <div className="tm-cert-top">
                  <span className="tm-cert-badge">{cert.badge}</span>
                  <span className="tm-cert-icon-seal">✓</span>
                </div>

                {cert.showImage && cert.image ? (
                  <div className="tm-cert-media-wrap">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}

                <h3>{cert.title}</h3>
                <p>{cert.sub}</p>
              </div>

              <div>
                <div className="tm-cert-meta">
                  <div className="tm-cert-meta-row">
                    <span>Rapor No:</span>
                    <b>{cert.reportNo}</b>
                  </div>
                  <div className="tm-cert-meta-row">
                    <span>Kurum:</span>
                    <b>{cert.issuer}</b>
                  </div>
                </div>

                <a className="tm-cert-action" href={cert.actionHref} target="_blank" rel="noopener noreferrer">
                  {cert.actionText}
                </a>
              </div>
            </article>
          ))}
        </div>

        {complianceNotice ? (
          <div className="tm-cert-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{complianceNotice}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ThreeMashProductCertificates;
