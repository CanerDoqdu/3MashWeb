import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

function trimmedText(value: unknown, fallback = ""): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return fallback;
  if (isEnglishLocale() && isTurkishText(trimmed)) return fallback;
  return trimmed;
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
  const label = trimmedText(props.sectionLabel, tLocalized("BÖLÜM ETİKETİ", "SECTION LABEL"));
  const titleHtml = trimmedText(
    props.titleHtml,
    tLocalized('Sertifikalar ve raporlar <span class="em">başlığı buraya gelecek.</span>', 'Certificates and reports <span class="em">title goes here.</span>')
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    tLocalized("Sertifikalar ve test raporları bölümü için sağ taraftaki detaylı açıklama metni buraya gelecek.", "Detailed description text for the certificates and test reports section goes here.")
  );

  const globalShowImages = props.showImages !== false;

  const certs = [
    {
      showImage: globalShowImages && props.cert1ShowImage !== false,
      image: imageSource(
        props.cert1Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp"
      ),
      badge: trimmedText(props.cert1Badge, tLocalized("1. SERTİFİKA ROZETİ", "1. CERTIFICATE BADGE")),
      title: trimmedText(props.cert1Title, tLocalized("1. Sertifika / Rapor Başlığı", "1. Certificate / Report Title")),
      sub: trimmedText(props.cert1Subtitle, tLocalized("1. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "1. The standard and description text for the certificate or test report will go here.")),
      reportNo: trimmedText(props.cert1ReportNo, "RAPOR-NO-01"),
      issuer: trimmedText(props.cert1Issuer, "Akredite Test Kurumu 1"),
      actionText: trimmedText(props.cert1ActionText, tLocalized("Raporu İncele (PDF) →", "View Report (PDF) →")),
      actionHref: safeNavigationHref(props.cert1ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert2ShowImage !== false,
      image: imageSource(
        props.cert2Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp"
      ),
      badge: trimmedText(props.cert2Badge, tLocalized("2. SERTİFİKA ROZETİ", "2. CERTIFICATE BADGE")),
      title: trimmedText(props.cert2Title, tLocalized("2. Sertifika / Rapor Başlığı", "2. Certificate / Report Title")),
      sub: trimmedText(props.cert2Subtitle, tLocalized("2. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "2. The standard and description text for the certificate or test report will go here.")),
      reportNo: trimmedText(props.cert2ReportNo, "RAPOR-NO-02"),
      issuer: trimmedText(props.cert2Issuer, "Akredite Test Kurumu 2"),
      actionText: trimmedText(props.cert2ActionText, tLocalized("Standardı Görüntüle →", "View Standard →")),
      actionHref: safeNavigationHref(props.cert2ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert3ShowImage !== false,
      image: imageSource(
        props.cert3Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp"
      ),
      badge: trimmedText(props.cert3Badge, tLocalized("3. SERTİFİKA ROZETİ", "3. CERTIFICATE BADGE")),
      title: trimmedText(props.cert3Title, tLocalized("3. Sertifika / Rapor Başlığı", "3. Certificate / Report Title")),
      sub: trimmedText(props.cert3Subtitle, tLocalized("3. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "3. The standard and description text for the certificate or test report will go here.")),
      reportNo: trimmedText(props.cert3ReportNo, "RAPOR-NO-03"),
      issuer: trimmedText(props.cert3Issuer, "Akredite Test Kurumu 3"),
      actionText: trimmedText(props.cert3ActionText, tLocalized("Test Raporu Detayı →", "Test Report Details →")),
      actionHref: safeNavigationHref(props.cert3ActionHref, "#"),
    },
    {
      showImage: globalShowImages && props.cert4ShowImage !== false,
      image: imageSource(
        props.cert4Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp"
      ),
      badge: trimmedText(props.cert4Badge, tLocalized("4. SERTİFİKA ROZETİ", "4. CERTIFICATE BADGE")),
      title: trimmedText(props.cert4Title, tLocalized("4. Sertifika / Rapor Başlığı", "4. Certificate / Report Title")),
      sub: trimmedText(props.cert4Subtitle, tLocalized("4. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "4. The standard and description text for the certificate or test report will go here.")),
      reportNo: trimmedText(props.cert4ReportNo, "RAPOR-NO-04"),
      issuer: trimmedText(props.cert4Issuer, "Akredite Test Kurumu 4"),
      actionText: trimmedText(props.cert4ActionText, tLocalized("Klinik Raporu İncele →", "Review the Clinical Report →")),
      actionHref: safeNavigationHref(props.cert4ActionHref, "#"),
    },
  ];

  const complianceNotice = trimmedText(
    props.complianceNotice,
    tLocalized("Sertifikalar ve test raporları hakkında genel yasal bilgilendirme notu buraya gelecek.", "General legal disclaimer note regarding certificates and test reports goes here.")
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
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(titleHtml) }} />
          <p className="tm-cert-side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(sideHtml) }} />
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
                    <span>{tLocalized("Rapor No:", "Report No:")}</span>
                    <b>{cert.reportNo}</b>
                  </div>
                  <div className="tm-cert-meta-row">
                    <span>{tLocalized("Kurum:", "Issuer:")}</span>
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
