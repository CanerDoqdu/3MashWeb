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
  const label = trimmedText(props.sectionLabel, "SERTİFİKALAR & RAPORLAR");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Uluslararası standartlar ve <span class="em">klinik onaylar.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "Tüm ürünlerimiz akredite bağımsız laboratuvarlar ve medikal otoriteler tarafından test edilip sertifikalandırılmıştır."
  );

  const globalShowImages = props.showImages !== false;

  const certs = [
    {
      showImage: globalShowImages && props.cert1ShowImage !== false,
      image: imageSource(
        props.cert1Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp"
      ),
      badge: trimmedText(props.cert1Badge, "CE CLASS IIa"),
      title: trimmedText(props.cert1Title, "MDR Tıbbi Cihaz Uygunluğu"),
      sub: trimmedText(props.cert1Subtitle, "Avrupa Birliği Tıbbi Cihaz Direktifi (MDR) onaylı biyouyumlu üretim sertifikası."),
      reportNo: trimmedText(props.cert1ReportNo, "CE-2024-MDR-098"),
      issuer: trimmedText(props.cert1Issuer, "TÜV SÜD / CE Notified Body"),
      actionText: trimmedText(props.cert1ActionText, "Sertifikayı İncele (PDF) →"),
      actionHref: trimmedText(props.cert1ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert2ShowImage !== false,
      image: imageSource(
        props.cert2Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp"
      ),
      badge: trimmedText(props.cert2Badge, "ISO 13485:2016"),
      title: trimmedText(props.cert2Title, "Medikal Kalite Yönetimi"),
      sub: trimmedText(props.cert2Subtitle, "Dental ve medikal üretim süreçlerinin uluslararası kalite ve güvenlik standardı."),
      reportNo: trimmedText(props.cert2ReportNo, "ISO-13485-TR-2024"),
      issuer: trimmedText(props.cert2Issuer, "BSI Group International"),
      actionText: trimmedText(props.cert2ActionText, "Standardı Görüntüle →"),
      actionHref: trimmedText(props.cert2ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert3ShowImage !== false,
      image: imageSource(
        props.cert3Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp"
      ),
      badge: trimmedText(props.cert3Badge, "ISO 10993"),
      title: trimmedText(props.cert3Title, "Biyouyumluluk & Sitotoksisite"),
      sub: trimmedText(props.cert3Subtitle, "Ağız içi mukoza temasına uygun, monomer salınımı yapmayan güvenli yapı testi."),
      reportNo: trimmedText(props.cert3ReportNo, "BIO-LAB-88421"),
      issuer: trimmedText(props.cert3Issuer, "Akredite Biyomedikal Lab"),
      actionText: trimmedText(props.cert3ActionText, "Test Raporu Detayı →"),
      actionHref: trimmedText(props.cert3ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert4ShowImage !== false,
      image: imageSource(
        props.cert4Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp"
      ),
      badge: trimmedText(props.cert4Badge, "KLİNİK TEST"),
      title: trimmedText(props.cert4Title, "Üniversite Araştırma Raporu"),
      sub: trimmedText(props.cert4Subtitle, "Diş hekimliği fakültelerinde yapılan mekanik dayanım ve marjinal uyum analizleri."),
      reportNo: trimmedText(props.cert4ReportNo, "UNI-DENT-2024-77"),
      issuer: trimmedText(props.cert4Issuer, "Dental Araştırma Enstitüsü"),
      actionText: trimmedText(props.cert4ActionText, "Klinik Raporu İncele →"),
      actionHref: trimmedText(props.cert4ActionHref, "#"),
    },
  ];

  const complianceNotice = trimmedText(
    props.complianceNotice,
    "Tüm sertifika ve test raporlarının orijinalleri talep edilmesi durumunda klinik ve laboratuvarlarımıza PDF olarak iletilmektedir."
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
