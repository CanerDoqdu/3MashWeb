import { Props } from "./types";
import ThreeMashReferencesLead from "../../sub-components/ThreeMashReferencesLead";
import trustLogo1 from "../../assets/trust-logo-1-data";
import trustLogo2 from "../../assets/trust-logo-2-data";
import trustLogo3 from "../../assets/trust-logo-3-data";
import trustLogo4 from "../../assets/trust-logo-4-data";
import trustLogo5 from "../../assets/trust-logo-5-data";
import { tLocalized } from "../../utils/i18n";
import {
  localizedReferenceText,
  referenceHref,
  referenceImage,
  referenceRichHtml,
  referencesRootStyle,
} from "../../utils/threeMashReferencesStandalone";

export function ReferanslarSayfasiGiris(props: Props) {
  const id = props.sectionAnchorId?.trim() || "referanslar-giris";
  const proofCategories = [
    localizedReferenceText(props.proofCategory1, props.proofCategory1En, tLocalized("Klinik vaka", "Clinical Case")),
    localizedReferenceText(props.proofCategory2, props.proofCategory2En, tLocalized("Kullanıcı yorumu", "User Review")),
    localizedReferenceText(props.proofCategory3, props.proofCategory3En, tLocalized("İş ortaklığı", "Partnership")),
    localizedReferenceText(props.proofCategory4, props.proofCategory4En, tLocalized("Laboratuvar paylaşımı", "Lab Showcase")),
  ];
  const proofStats = [
    {
      value: props.proofMetric1Value?.trim() || "580+",
      label: localizedReferenceText(props.proofMetric1Label, props.proofMetric1LabelEn, tLocalized("laboratuvar ve klinik", "laboratories and clinics")),
    },
    {
      value: props.proofMetric2Value?.trim() || "9",
      label: localizedReferenceText(props.proofMetric2Label, props.proofMetric2LabelEn, tLocalized("referans kaydı", "reference records")),
    },
    {
      value: props.proofMetric3Value?.trim() || "A-Z",
      label: localizedReferenceText(props.proofMetric3Label, props.proofMetric3LabelEn, tLocalized("kurulumdan desteğe", "from installation to support")),
    },
  ];
  const logos = [
    referenceImage(props.trustLogo1ImageUrl, trustLogo1),
    referenceImage(props.trustLogo2ImageUrl, trustLogo2),
    referenceImage(props.trustLogo3ImageUrl, trustLogo3),
    referenceImage(props.trustLogo4ImageUrl, trustLogo4),
    referenceImage(props.trustLogo5ImageUrl, trustLogo5),
  ];
  const leadContent = {
    eyebrowHtml: referenceRichHtml(localizedReferenceText(
      props.eyebrowText,
      props.eyebrowTextEn,
      tLocalized("Referanslar ve başarı hikayeleri", "References and success stories"),
    )),
    titleHtml: referenceRichHtml(localizedReferenceText(
      props.titleText,
      props.titleTextEn,
      tLocalized("Dijital üretimde güveni <em>gerçek işlerle</em> kuruyoruz.", "We build trust in digital production with <em>real results</em>."),
    )),
    descriptionHtml: referenceRichHtml(localizedReferenceText(
      props.descriptionHtml,
      props.descriptionHtmlEn,
      tLocalized(
        "3MASH ekosistemi; kliniklerin, laboratuvarların ve çözüm ortaklarının günlük üretiminde aynı hedefe çalışır: doğru cihaz, doğru malzeme, doğru parametre ve kesintisiz teknik destek.",
        "The 3MASH ecosystem works toward the same goal in daily production for clinics, laboratories, and solution partners: the right device, the right material, the right parameters, and continuous technical support.",
      ),
    )),
    showActions: props.showActions !== false,
    actionsAriaLabel: localizedReferenceText(props.actionsAriaLabel, props.actionsAriaLabelEn, tLocalized("Referanslar aksiyonları", "References actions")),
    showPrimaryButton: props.showPrimaryButton !== false,
    primaryHref: referenceHref(props.primaryButtonHref, "#referanslar-vaka"),
    primaryButtonText: localizedReferenceText(props.primaryButtonText, props.primaryButtonTextEn, tLocalized("Başarı hikayesini gör", "View success story")),
    showSecondaryButton: props.showSecondaryButton !== false,
    secondaryHref: referenceHref(props.secondaryButtonHref, "#referanslar-isleyis"),
    secondaryButtonText: localizedReferenceText(props.secondaryButtonText, props.secondaryButtonTextEn, tLocalized("Ekosistemi incele", "Explore ecosystem")),
    showProofSummary: props.showProofSummary !== false,
    proofAriaLabel: localizedReferenceText(props.proofAriaLabel, props.proofAriaLabelEn, tLocalized("3MASH referans özeti", "3MASH reference summary")),
    proofEyebrow: localizedReferenceText(props.proofEyebrow, props.proofEyebrowEn, tLocalized("Referans havuzu", "Reference Pool")),
    proofTitle: localizedReferenceText(props.proofTitle, props.proofTitleEn, tLocalized("Kliniklerden laboratuvarlara uzanan saha kaydı.", "Field records spanning clinics to laboratories.")),
    proofDescription: localizedReferenceText(
      props.proofDescription,
      props.proofDescriptionEn,
      tLocalized(
        "Yorumlar, klinik vakalar, iş ortakları ve üretim paylaşımları aynı sayfada tek bir güven mimarisi olarak sunulur.",
        "Reviews, clinical cases, partnerships, and production shares presented as a single architecture of trust.",
      ),
    ),
    proofCategories,
    proofStats,
    showTrustLogos: props.showTrustLogos !== false,
    logosAriaLabel: localizedReferenceText(props.logosAriaLabel, props.logosAriaLabelEn, tLocalized("3MASH güven logoları", "3MASH trust logos")),
    logos,
  };

  return (
    <section id={id} className="three-mash-references" style={referencesRootStyle(props)}>
      <div className="tmref-shell">
        <ThreeMashReferencesLead {...leadContent} />
      </div>
    </section>
  );
}

export default ReferanslarSayfasiGiris;
