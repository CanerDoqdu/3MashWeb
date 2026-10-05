import { getDefaultSrc } from "@ikas/bp-storefront";
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
  const label = localizedText(props.sectionLabel, props.sectionLabelEn, "SERTİFİKALAR & RAPORLAR", "CERTIFICATES & REPORTS");
  const titleHtml = trimmedText(
    isEnglishLocale() ? props.titleHtmlEn : props.titleHtml,
    isEnglishLocale()
      ? 'Certificates and reports <span class="em">title goes here.</span>'
      : 'Sertifikalar ve raporlar <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    isEnglishLocale() ? props.sideHtmlEn : props.sideHtml,
    isEnglishLocale()
      ? "Detailed description text for the certificates and test reports section goes here."
      : "Sertifikalar ve test raporları bölümü için sağ taraftaki detaylı açıklama metni buraya gelecek."
  );

  const globalShowImages = props.showImages !== false;

  const certs = [
    {
      show: props.showCert1 !== false,
      showImage: globalShowImages && props.cert1ShowImage !== false,
      image: imageSource(
        props.cert1Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp"
      ),
      badge: localizedText(props.cert1Badge, props.cert1BadgeEn, "CE CLASS IIa", "CE CLASS IIa"),
      title: localizedText(props.cert1Title, props.cert1TitleEn, "1. Sertifika / Rapor Başlığı", "1. Certificate / Report Title"),
      sub: localizedText(props.cert1Subtitle, props.cert1SubtitleEn, "1. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "1. The standard and description text for the certificate or test report will go here."),
      reportNo: localizedText(props.cert1ReportNo, props.cert1ReportNoEn, "RAPOR-NO-01", "REPORT-NO-01"),
      issuer: localizedText(props.cert1Issuer, props.cert1IssuerEn, "Akredite Test Kurumu 1", "Accredited Testing Body 1"),
      actionText: localizedText(props.cert1ActionText, props.cert1ActionTextEn, "Raporu İncele (PDF) →", "View Report (PDF) →"),
      actionHref: safeNavigationHref(props.cert1ActionHref, "#"),
    },
    {
      show: props.showCert2 !== false,
      showImage: globalShowImages && props.cert2ShowImage !== false,
      image: imageSource(
        props.cert2Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp"
      ),
      badge: localizedText(props.cert2Badge, props.cert2BadgeEn, "ISO 13485:2016", "ISO 13485:2016"),
      title: localizedText(props.cert2Title, props.cert2TitleEn, "2. Sertifika / Rapor Başlığı", "2. Certificate / Report Title"),
      sub: localizedText(props.cert2Subtitle, props.cert2SubtitleEn, "2. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "2. The standard and description text for the certificate or test report will go here."),
      reportNo: localizedText(props.cert2ReportNo, props.cert2ReportNoEn, "RAPOR-NO-02", "REPORT-NO-02"),
      issuer: localizedText(props.cert2Issuer, props.cert2IssuerEn, "Akredite Test Kurumu 2", "Accredited Testing Body 2"),
      actionText: localizedText(props.cert2ActionText, props.cert2ActionTextEn, "Standardı Görüntüle →", "View Standard →"),
      actionHref: safeNavigationHref(props.cert2ActionHref, "#"),
    },
    {
      show: props.showCert3 !== false,
      showImage: globalShowImages && props.cert3ShowImage !== false,
      image: imageSource(
        props.cert3Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp"
      ),
      badge: localizedText(props.cert3Badge, props.cert3BadgeEn, "ISO 10993", "ISO 10993"),
      title: localizedText(props.cert3Title, props.cert3TitleEn, "3. Sertifika / Rapor Başlığı", "3. Certificate / Report Title"),
      sub: localizedText(props.cert3Subtitle, props.cert3SubtitleEn, "3. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "3. The standard and description text for the certificate or test report will go here."),
      reportNo: localizedText(props.cert3ReportNo, props.cert3ReportNoEn, "RAPOR-NO-03", "REPORT-NO-03"),
      issuer: localizedText(props.cert3Issuer, props.cert3IssuerEn, "Akredite Test Kurumu 3", "Accredited Testing Body 3"),
      actionText: localizedText(props.cert3ActionText, props.cert3ActionTextEn, "Test Raporu Detayı →", "Test Report Details →"),
      actionHref: safeNavigationHref(props.cert3ActionHref, "#"),
    },
    {
      show: props.showCert4 !== false,
      showImage: globalShowImages && props.cert4ShowImage !== false,
      image: imageSource(
        props.cert4Image,
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp"
      ),
      badge: localizedText(props.cert4Badge, props.cert4BadgeEn, "KLİNİK TEST", "CLINICAL TEST"),
      title: localizedText(props.cert4Title, props.cert4TitleEn, "4. Sertifika / Rapor Başlığı", "4. Certificate / Report Title"),
      sub: localizedText(props.cert4Subtitle, props.cert4SubtitleEn, "4. Sertifika veya test raporuna ait standart ve açıklama metni buraya gelecek.", "4. The standard and description text for the certificate or test report will go here."),
      reportNo: localizedText(props.cert4ReportNo, props.cert4ReportNoEn, "RAPOR-NO-04", "REPORT-NO-04"),
      issuer: localizedText(props.cert4Issuer, props.cert4IssuerEn, "Akredite Test Kurumu 4", "Accredited Testing Body 4"),
      actionText: localizedText(props.cert4ActionText, props.cert4ActionTextEn, "Klinik Raporu İncele →", "Review the Clinical Report →"),
      actionHref: safeNavigationHref(props.cert4ActionHref, "#"),
    },
  ];

  const complianceNotice = trimmedText(
    isEnglishLocale() ? props.complianceNoticeEn : props.complianceNotice,
    isEnglishLocale()
      ? "General legal disclaimer note regarding certificates and test reports goes here."
      : "Sertifikalar ve test raporları hakkında genel yasal bilgilendirme notu buraya gelecek."
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
          {certs.filter((cert) => cert.show).map((cert, idx) => (
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
                    <span>{localizedText(props.reportNoLabel, props.reportNoLabelEn, "Rapor No:", "Report No:")}</span>
                    <b>{cert.reportNo}</b>
                  </div>
                  <div className="tm-cert-meta-row">
                    <span>{localizedText(props.issuerLabel, props.issuerLabelEn, "Kurum:", "Issuer:")}</span>
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

        {props.showComplianceNotice !== false && complianceNotice ? (
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
