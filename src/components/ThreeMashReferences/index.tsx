import { Props } from "./types";
import { getDefaultSrc } from "@ikas/bp-storefront";
import crsCompositeSararmaImage from "../../assets/crs-composite-sararma-data";
import { crsModelBottleImage } from "../../assets/crs-model-data";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";
import {
  machineP16L,
  machineUW02,
  profileBerkan,
  profileGoksel,
  profileMehmet,
  resinBottle,
} from "../../assets/remaining-assets-data";
import trustLogo1 from "../../assets/trust-logo-1-data";
import trustLogo2 from "../../assets/trust-logo-2-data";
import trustLogo3 from "../../assets/trust-logo-3-data";
import trustLogo4 from "../../assets/trust-logo-4-data";
import trustLogo5 from "../../assets/trust-logo-5-data";
import { isEnglishLocale, tLocalized } from "../../utils/i18n";
import ThreeMashReferencesLead from "../../sub-components/ThreeMashReferencesLead";
import ThreeMashReferenceWall from "../../sub-components/ThreeMashReferenceWall";
import ThreeMashReferencesCaseStudy from "../../sub-components/ThreeMashReferencesCaseStudy";
import ThreeMashReferencesPartners from "../../sub-components/ThreeMashReferencesPartners";
import ThreeMashReferencesWorkflow from "../../sub-components/ThreeMashReferencesWorkflow";

function getReferenceData() {
  const defaultDescription = tLocalized(
    "3MASH ekosistemi; kliniklerin, laboratuvarların ve çözüm ortaklarının günlük üretiminde aynı hedefe çalışır: doğru cihaz, doğru malzeme, doğru parametre ve kesintisiz teknik destek.",
    "The 3MASH ecosystem works toward the same goal in daily production for clinics, laboratories, and solution partners: the right device, the right material, the right parameters, and continuous technical support."
  );

  const testimonials = [
    {
      name: tLocalized("Mehmet İşlek", "Mehmet İşlek"),
      role: tLocalized("ATTELIA - Kurucu Başhekim", "ATTELIA - Founding Chief Physician"),
      image: profileMehmet,
      quote: tLocalized(
        "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.",
        "Professionals trust professionals for absolute success. We collaborate with Mash in equipment selection, supply, training, and operation."
      ),
      meta: tLocalized("22 yıldır gülümseme tasarlayan klinik", "Clinic designing smiles for 22 years"),
    },
    {
      name: tLocalized("Berkan Öztaş", "Berkan Öztaş"),
      role: tLocalized("DENTEK - Genel Müd. Yard.", "DENTEK - Asst. General Manager"),
      image: profileBerkan,
      quote: tLocalized(
        "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.",
        "Innovative and creative. A long-term, successful partnership across hardware, software, and materials."
      ),
      meta: tLocalized("Dijital üretim ve laboratuvar operasyonu", "Digital production and laboratory operation"),
    },
    {
      name: tLocalized("Göksel Pişkin", "Göksel Pişkin"),
      role: tLocalized("MIKRO LAB - Kurucu Ortak", "MIKRO LAB - Co-founder"),
      image: profileGoksel,
      quote: tLocalized(
        "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim, mükemmel sonuçlar.",
        "They solved issues before we even encountered them. Consistent production quality and excellent results every time."
      ),
      meta: tLocalized("Tekrarlanabilir üretim ve teknik süreç", "Repeatable production and technical process"),
    },
  ];

  const referenceEntries = [
    ...testimonials.map((item) => ({
      ...item,
      type: tLocalized("Kullanıcı yorumu", "User Review"),
    })),
    {
      name: tLocalized("Dr. Barbaros Baran", "Dr. Barbaros Baran"),
      role: tLocalized("Diş Hekimi", "Dentist"),
      quote: tLocalized(
        "CRS Composite Resin ile tamamen dijital olarak üretilen All-on-Six geçici restorasyon, düşük ağırlığı ve takip edilebilir klinik iş akışıyla öne çıktı.",
        "The All-on-Six temporary restoration produced entirely digitally with CRS Composite Resin stood out with its lightweight structure and traceable clinical workflow."
      ),
      meta: tLocalized("All-on-Six geçici restorasyon vakası", "All-on-Six provisional restoration case"),
      type: tLocalized("Klinik vaka", "Clinical Case"),
    },
    {
      name: tLocalized("Yapı Dental", "Yapı Dental"),
      role: tLocalized("Dental ürün ve teknoloji iş ortağı", "Dental products & technology partner"),
      quote: tLocalized(
        "Phrozen cihazları üzerinde 3MASH ortaklığıyla geliştirme, ayarlama ve kalibrasyon süreci yürütüldü; CRS reçineleriyle uyum aynı ekosistemde değerlendirildi.",
        "Development, calibration, and adjustment processes were carried out on Phrozen devices in partnership with 3MASH; compatibility with CRS resins was verified in the same ecosystem."
      ),
      meta: tLocalized("Kalibre edilmiş cihaz ve reçine iş akışı", "Calibrated device & resin workflow"),
      type: tLocalized("İş ortaklığı", "Partnership"),
    },
    {
      name: tLocalized("Serdent", "serdent"),
      role: tLocalized("Diş hekimliği ve laboratuvar malzemeleri çözüm ağı", "Dental and lab supplies solution network"),
      quote: tLocalized(
        "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan portföy içinde CRS ve 3MASH markaları birlikte konumlanıyor.",
        "CRS and 3MASH brands are positioned together within a portfolio offering product, training, and technical service support to clinics and laboratories."
      ),
      meta: tLocalized("Bölgesel çözüm ve destek ağı", "Regional solution & support network"),
      type: tLocalized("Çözüm ortağı", "Solution Partner"),
    },
    {
      name: tLocalized("Özel Manas Diş Protez Laboratuvarı", "Ozel Manas Dental Prosthesis Laboratory"),
      role: tLocalized("Diş protez laboratuvarı", "Dental prosthesis laboratory"),
      quote: tLocalized(
        "Laboratuvar üretim paylaşımlarında #3mash, #crs ve #digitaldentistry etiketleriyle dijital dental üretim çalışmalarını öne çıkarıyor.",
        "Highlights digital dental production work with #3mash, #crs, and #digitaldentistry tags in laboratory production shares."
      ),
      meta: tLocalized("Kullanıcı üretimi ve laboratuvar paylaşımı", "User production & laboratory share"),
      type: tLocalized("Kullanıcı çalışması", "User Showcase"),
    },
    {
      name: tLocalized("Mümin Tuğra", "Mümin Tuğra"),
      role: tLocalized("Dental laboratuvar içerik üreticisi", "Dental laboratory content creator"),
      quote: tLocalized(
        "CRS Model ve dijital dental üretim odağındaki paylaşımlarıyla 3MASH ekosistemine bağlı kullanıcı içeriği havuzunda yer alıyor.",
        "Included in the 3MASH ecosystem user content pool with focus on CRS Model and digital dental fabrication."
      ),
      meta: tLocalized("CRS Model odaklı üretim içeriği", "CRS Model focused production content"),
      type: tLocalized("Kullanıcı içeriği", "User Content"),
    },
    {
      name: tLocalized("Batuhan Arabacı", "Batuhan Arabacı"),
      role: tLocalized("Dental sektör profesyoneli", "Dental industry professional"),
      quote: tLocalized(
        "Ürünler için sektöre güçlü giriş yapan ve rakip tanımayan bir çizgi vurgusu yapan olumlu tanıtım ifadesiyle öne çıkıyor.",
        "Stands out with positive commentary highlighting a strong market entrance and unrivaled quality."
      ),
      meta: tLocalized("Sektör yorumu", "Industry review"),
      type: tLocalized("Profesyonel görüş", "Professional Opinion"),
    },
  ];

  const proofStats = [
    { value: "580+", label: tLocalized("laboratuvar ve klinik", "laboratories and clinics") },
    { value: String(referenceEntries.length), label: tLocalized("referans kaydı", "reference records") },
    { value: "A-Z", label: tLocalized("kurulumdan desteğe", "from installation to support") },
  ];

  const proofCategories = [
    tLocalized("Klinik vaka", "Clinical Case"),
    tLocalized("Kullanıcı yorumu", "User Review"),
    tLocalized("İş ortaklığı", "Partnership"),
    tLocalized("Laboratuvar paylaşımı", "Lab Showcase"),
  ];

  const partnerCards = [
    {
      name: tLocalized("Yapı Dental", "Yapı Dental"),
      title: tLocalized("Kalibre edilmiş dental üretim ekosistemi", "Calibrated dental production ecosystem"),
      text: tLocalized(
        "Phrozen cihazları, CRS Dental reçineleri ve 3MASH teknik birikimi aynı üretim hattında buluşur. Cihaz seçimi, ışık dağılımı, Z ekseni stabilitesi ve reçine parametreleri birlikte değerlendirilir.",
        "Phrozen hardware, CRS Dental resins, and 3MASH technical expertise unite on the same line. Device selection, light uniformity, Z-axis stability, and resin parameters are evaluated together."
      ),
      image: machineP16L,
    },
    {
      name: tLocalized("Serdent", "serdent"),
      title: tLocalized("Bölgesel çözüm ve teknik servis ağı", "Regional solution & technical service network"),
      text: tLocalized(
        "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan çözüm ağı içinde CRS ve 3MASH markaları birlikte konumlanır.",
        "CRS and 3MASH brands are positioned together within a solution network delivering product, training, and service support to clinics and labs."
      ),
      image: resinBottle,
    },
  ];

  const workflowCards = [
    {
      title: tLocalized("Cihaz", "Hardware"),
      text: tLocalized(
        "3D yazıcı, yıkama-kürleme ve tarayıcı seçimi üretim hedefiyle birlikte planlanır.",
        "3D printer, wash-cure, and scanner selections are planned alongside production goals."
      ),
      image: p16lPrimaryImage,
    },
    {
      title: tLocalized("Malzeme", "Material"),
      text: tLocalized(
        "CRS reçine hattı; model, kompozit, tray ve restoratif uygulamalarda doğru parametreyle çalışır.",
        "The CRS resin line operates with validated parameters for model, composite, tray, and restorative applications."
      ),
      image: crsModelBottleImage,
    },
    {
      title: tLocalized("Destek", "Support"),
      text: tLocalized(
        "Kurulum, eğitim, reçine uyumlama ve satış sonrası teknik destek aynı ekip tarafından takip edilir.",
        "Installation, training, resin profiling, and after-sales support are handled by the same team."
      ),
      image: machineUW02,
    },
  ];

  const storyPoints = [
    tLocalized("Üst ve alt All-on-Six geçici restorasyon üretimi", "Upper and lower All-on-Six provisional restoration fabrication"),
    tLocalized("Metal bar üzerinde 3D baskılı kompozit köprü yaklaşımı", "3D-printed composite bridge on metal bar framework"),
    tLocalized("Düşük ağırlık, takip edilebilir dijital iş akışı ve klinik adaptasyon odağı", "Low weight, traceable digital workflow, and clinical adaptation focus"),
  ];

  return {
    defaultDescription,
    testimonials,
    referenceEntries,
    proofStats,
    proofCategories,
    partnerCards,
    workflowCards,
    storyPoints,
  };
}

const logos = [trustLogo1, trustLogo2, trustLogo3, trustLogo4, trustLogo5];

function text(value: string | undefined, fallback: string) {
  const clean = value?.trim();
  return clean ? clean : fallback;
}

function localizedText(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  return text(isEnglishLocale() ? valueEn : value, fallback);
}

function imageSource(
  image: Props["trustLogo1ImageUrl"],
  fallback?: string,
) {
  return (image ? getDefaultSrc(image) : "") || fallback || "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function colorValue(value: string | undefined, fallback: string) {
  const clean = value?.trim();
  return clean || fallback;
}

function richHtml(value: string | undefined, fallback: string) {
  const cleaned = text(value, fallback)
    .replace(/\sstyle=(["']).*?\1/gi, "")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");

  return { __html: sanitizeHtml(cleaned) };
}

function safeHref(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
}

export function ThreeMashReferences(props: Props) {
  const referenceData = getReferenceData();
  const referenceProps = [
    {
      type: props.reference1TypeText, typeEn: props.reference1TypeTextEn,
      quote: props.reference1QuoteHtml, quoteEn: props.reference1QuoteHtmlEn,
      name: props.reference1NameText, nameEn: props.reference1NameTextEn,
      details: props.reference1DetailsHtml, detailsEn: props.reference1DetailsHtmlEn,
      image: props.reference1ImageUrl, show: props.showReference1,
    },
    {
      type: props.reference2TypeText, typeEn: props.reference2TypeTextEn,
      quote: props.reference2QuoteHtml, quoteEn: props.reference2QuoteHtmlEn,
      name: props.reference2NameText, nameEn: props.reference2NameTextEn,
      details: props.reference2DetailsHtml, detailsEn: props.reference2DetailsHtmlEn,
      image: props.reference2ImageUrl, show: props.showReference2,
    },
    {
      type: props.reference3TypeText, typeEn: props.reference3TypeTextEn,
      quote: props.reference3QuoteHtml, quoteEn: props.reference3QuoteHtmlEn,
      name: props.reference3NameText, nameEn: props.reference3NameTextEn,
      details: props.reference3DetailsHtml, detailsEn: props.reference3DetailsHtmlEn,
      image: props.reference3ImageUrl, show: props.showReference3,
    },
    {
      type: props.reference4TypeText, typeEn: props.reference4TypeTextEn,
      quote: props.reference4QuoteHtml, quoteEn: props.reference4QuoteHtmlEn,
      name: props.reference4NameText, nameEn: props.reference4NameTextEn,
      details: props.reference4DetailsHtml, detailsEn: props.reference4DetailsHtmlEn,
      image: props.reference4ImageUrl, show: props.showReference4,
    },
    {
      type: props.reference5TypeText, typeEn: props.reference5TypeTextEn,
      quote: props.reference5QuoteHtml, quoteEn: props.reference5QuoteHtmlEn,
      name: props.reference5NameText, nameEn: props.reference5NameTextEn,
      details: props.reference5DetailsHtml, detailsEn: props.reference5DetailsHtmlEn,
      image: props.reference5ImageUrl, show: props.showReference5,
    },
    {
      type: props.reference6TypeText, typeEn: props.reference6TypeTextEn,
      quote: props.reference6QuoteHtml, quoteEn: props.reference6QuoteHtmlEn,
      name: props.reference6NameText, nameEn: props.reference6NameTextEn,
      details: props.reference6DetailsHtml, detailsEn: props.reference6DetailsHtmlEn,
      image: props.reference6ImageUrl, show: props.showReference6,
    },
    {
      type: props.reference7TypeText, typeEn: props.reference7TypeTextEn,
      quote: props.reference7QuoteHtml, quoteEn: props.reference7QuoteHtmlEn,
      name: props.reference7NameText, nameEn: props.reference7NameTextEn,
      details: props.reference7DetailsHtml, detailsEn: props.reference7DetailsHtmlEn,
      image: props.reference7ImageUrl, show: props.showReference7,
    },
    {
      type: props.reference8TypeText, typeEn: props.reference8TypeTextEn,
      quote: props.reference8QuoteHtml, quoteEn: props.reference8QuoteHtmlEn,
      name: props.reference8NameText, nameEn: props.reference8NameTextEn,
      details: props.reference8DetailsHtml, detailsEn: props.reference8DetailsHtmlEn,
      image: props.reference8ImageUrl, show: props.showReference8,
    },
    {
      type: props.reference9TypeText, typeEn: props.reference9TypeTextEn,
      quote: props.reference9QuoteHtml, quoteEn: props.reference9QuoteHtmlEn,
      name: props.reference9NameText, nameEn: props.reference9NameTextEn,
      details: props.reference9DetailsHtml, detailsEn: props.reference9DetailsHtmlEn,
      image: props.reference9ImageUrl, show: props.showReference9,
    },
    {
      type: props.reference10TypeText, typeEn: props.reference10TypeTextEn,
      quote: props.reference10QuoteHtml, quoteEn: props.reference10QuoteHtmlEn,
      name: props.reference10NameText, nameEn: props.reference10NameTextEn,
      details: props.reference10DetailsHtml, detailsEn: props.reference10DetailsHtmlEn,
      image: props.reference10ImageUrl, show: props.showReference10,
    },
    {
      type: props.reference11TypeText, typeEn: props.reference11TypeTextEn,
      quote: props.reference11QuoteHtml, quoteEn: props.reference11QuoteHtmlEn,
      name: props.reference11NameText, nameEn: props.reference11NameTextEn,
      details: props.reference11DetailsHtml, detailsEn: props.reference11DetailsHtmlEn,
      image: props.reference11ImageUrl, show: props.showReference11,
    },
  ];
  const referenceEntries = referenceProps.flatMap((item, index) => {
    const fallback = referenceData.referenceEntries[index];
    const isNewSlot = index >= referenceData.referenceEntries.length;
    const isVisible = isNewSlot ? item.show === true : item.show !== false;
    if (!isVisible) return [];

    const name = localizedText(
      item.name,
      item.nameEn,
      fallback?.name ?? tLocalized("Yeni Referans", "New Reference"),
    );
    const quote = localizedText(
      item.quote,
      item.quoteEn,
      fallback?.quote ?? tLocalized("Yeni referans metnini buraya ekleyin.", "Add the new reference text here."),
    );
    if (isNewSlot && (!name.trim() || !quote.trim())) return [];

    const detailsFallback = fallback
      ? `<span>${escapeHtml(fallback.role)}</span><small>${escapeHtml(fallback.meta)}</small>`
      : tLocalized(
          "<span>Kuruluş / görev</span><small>Referans bilgisi</small>",
          "<span>Organization / role</span><small>Reference details</small>",
        );
    const detailsHtml = localizedText(item.details, item.detailsEn, detailsFallback);

    return [{
      type: localizedText(item.type, item.typeEn, fallback?.type ?? "User Review"),
      quote,
      name,
      detailsHtml: sanitizeHtml(detailsHtml),
      image: imageSource(
        item.image,
        fallback && "image" in fallback ? fallback.image : undefined,
      ),
      featured: index === 0,
    }];
  });
  const proofCategories = [
    localizedText(props.proofCategory1, props.proofCategory1En, referenceData.proofCategories[0]),
    localizedText(props.proofCategory2, props.proofCategory2En, referenceData.proofCategories[1]),
    localizedText(props.proofCategory3, props.proofCategory3En, referenceData.proofCategories[2]),
    localizedText(props.proofCategory4, props.proofCategory4En, referenceData.proofCategories[3]),
  ];
  const proofStats = [
    {
      value: text(props.proofMetric1Value, "580+"),
      label: localizedText(props.proofMetric1Label, props.proofMetric1LabelEn, referenceData.proofStats[0].label),
    },
    {
      value: text(props.proofMetric2Value, String(referenceData.referenceEntries.length)),
      label: localizedText(props.proofMetric2Label, props.proofMetric2LabelEn, referenceData.proofStats[1].label),
    },
    {
      value: text(props.proofMetric3Value, "A-Z"),
      label: localizedText(props.proofMetric3Label, props.proofMetric3LabelEn, referenceData.proofStats[2].label),
    },
  ];
  const partnerDefaults = referenceData.partnerCards;
  const partnerCards = [
    ...partnerDefaults.map((item, index) => {
      const number = index + 1;
      const isFirst = number === 1;
      return {
        name: localizedText(
          isFirst ? props.partner1NameText : props.partner2NameText,
          isFirst ? props.partner1NameTextEn : props.partner2NameTextEn,
          item.name,
        ),
        title: localizedText(
          isFirst ? props.partner1TitleText : props.partner2TitleText,
          isFirst ? props.partner1TitleTextEn : props.partner2TitleTextEn,
          item.title,
        ),
        text: localizedText(
          isFirst ? props.partner1DescriptionHtml : props.partner2DescriptionHtml,
          isFirst ? props.partner1DescriptionHtmlEn : props.partner2DescriptionHtmlEn,
          item.text,
        ),
        image: imageSource(
          isFirst ? props.partner1ImageUrl : props.partner2ImageUrl,
          item.image,
        ),
        show: isFirst ? props.showPartner1 : props.showPartner2,
      };
    }),
    ...(props.showPartner3 === true &&
    props.partner3ImageUrl &&
    imageSource(props.partner3ImageUrl)
      ? [{
          name: localizedText(
            props.partner3NameText,
            props.partner3NameTextEn,
            tLocalized("Yeni Çözüm Ortağı", "New Solution Partner"),
          ),
          title: localizedText(
            props.partner3TitleText,
            props.partner3TitleTextEn,
            tLocalized("Yeni iş ortağı başlığı", "New partner headline"),
          ),
          text: localizedText(
            props.partner3DescriptionHtml,
            props.partner3DescriptionHtmlEn,
            tLocalized(
              "İş ortağınızı ve sunduğu değeri buraya tanıtın.",
              "Introduce the partner and the value they provide here.",
            ),
          ),
          image: imageSource(props.partner3ImageUrl),
          show: true,
        }]
      : []),
  ].filter((item) => item.show !== false);
  const workflowDefaults = referenceData.workflowCards;
  const workflowCards = [
    ...workflowDefaults.map((item, index) => {
      const number = index + 1;
      return {
        title: localizedText(
          number === 1 ? props.workflow1TitleText : number === 2 ? props.workflow2TitleText : props.workflow3TitleText,
          number === 1 ? props.workflow1TitleTextEn : number === 2 ? props.workflow2TitleTextEn : props.workflow3TitleTextEn,
          item.title,
        ),
        text: localizedText(
          number === 1 ? props.workflow1DescriptionHtml : number === 2 ? props.workflow2DescriptionHtml : props.workflow3DescriptionHtml,
          number === 1 ? props.workflow1DescriptionHtmlEn : number === 2 ? props.workflow2DescriptionHtmlEn : props.workflow3DescriptionHtmlEn,
          item.text,
        ),
        image: imageSource(
          number === 1 ? props.workflow1ImageUrl : number === 2 ? props.workflow2ImageUrl : props.workflow3ImageUrl,
          item.image,
        ),
        show: number === 1 ? props.showWorkflowCard1 : number === 2 ? props.showWorkflowCard2 : props.showWorkflowCard3,
      };
    }),
    ...(props.showWorkflowCard4 === true &&
    props.workflow4ImageUrl &&
    imageSource(props.workflow4ImageUrl)
      ? [{
          title: localizedText(
            props.workflow4TitleText,
            props.workflow4TitleTextEn,
            tLocalized("Yeni İş Akışı Adımı", "New Workflow Step"),
          ),
          text: localizedText(
            props.workflow4DescriptionHtml,
            props.workflow4DescriptionHtmlEn,
            tLocalized("Yeni üretim aşamasını açıklayın.", "Describe the new production step."),
          ),
          image: imageSource(props.workflow4ImageUrl),
          show: true,
        }]
      : []),
  ].filter((item) => item.show !== false);
  const storyPointConfigs = [
    { value: props.storyPoint1Text, valueEn: props.storyPoint1TextEn, show: props.showStoryPoint1 },
    { value: props.storyPoint2Text, valueEn: props.storyPoint2TextEn, show: props.showStoryPoint2 },
    { value: props.storyPoint3Text, valueEn: props.storyPoint3TextEn, show: props.showStoryPoint3 },
    { value: props.storyPoint4Text, valueEn: props.storyPoint4TextEn, show: props.showStoryPoint4 },
    { value: props.storyPoint5Text, valueEn: props.storyPoint5TextEn, show: props.showStoryPoint5 },
  ];
  const storyPoints = storyPointConfigs.flatMap((item, index) => {
    const fallback = referenceData.storyPoints[index];
    const isNewSlot = index >= referenceData.storyPoints.length;
    if (isNewSlot ? item.show !== true : item.show === false) return [];
    const value = localizedText(
      item.value,
      item.valueEn,
      fallback ?? tLocalized("Yeni vaka bilgisini buraya ekleyin.", "Add a new case detail here."),
    );
    return value.trim() ? [value] : [];
  });
  const logos = [
    imageSource(props.trustLogo1ImageUrl, trustLogo1),
    imageSource(props.trustLogo2ImageUrl, trustLogo2),
    imageSource(props.trustLogo3ImageUrl, trustLogo3),
    imageSource(props.trustLogo4ImageUrl, trustLogo4),
    imageSource(props.trustLogo5ImageUrl, trustLogo5),
  ];
  const defaultDescription = referenceData.defaultDescription;
  const maxWidth = numberValue(props.maxWidth, 1220);
  const paddingTop = numberValue(props.paddingTop, 84);
  const paddingBottom = numberValue(props.paddingBottom, 92);
  const primaryHref = safeHref(props.primaryButtonHref, "#referanslar-vaka");
  const secondaryHref = safeHref(props.secondaryButtonHref, "#referanslar-isleyis");
  const primaryButtonText = localizedText(
    props.primaryButtonText,
    props.primaryButtonTextEn,
    tLocalized("Başarı hikayesini gör", "View success story"),
  );
  const secondaryButtonText = localizedText(
    props.secondaryButtonText,
    props.secondaryButtonTextEn,
    tLocalized("Ekosistemi incele", "Explore ecosystem"),
  );

  const rootStyle = {
    "--tm-ref-bg": colorValue(
      props.backgroundColor,
      "var(--tm-theme-bg, #FAFAF7)",
    ),
    "--tm-ref-text": colorValue(
      props.textColor,
      "var(--tm-theme-text, #0E0E0C)",
    ),
    "--tm-ref-muted": colorValue(
      props.mutedTextColor,
      "var(--tm-theme-sub, #55554e)",
    ),
    "--tm-ref-line": colorValue(
      props.lineColor,
      "var(--tm-theme-line, #E6E6E0)",
    ),
    "--tm-ref-max": `${maxWidth}px`,
    "--tm-ref-pt": `${paddingTop}px`,
    "--tm-ref-pb": `${paddingBottom}px`,
  } as Record<string, string>;
  const leadContent = {
    eyebrowHtml: richHtml(
      localizedText(
        props.eyebrowText,
        props.eyebrowTextEn,
        tLocalized("Referanslar ve başarı hikayeleri", "References and success stories"),
      ),
      "",
    ).__html,
    titleHtml: richHtml(
      localizedText(
        props.titleText,
        props.titleTextEn,
        tLocalized("Dijital üretimde güveni <em>gerçek işlerle</em> kuruyoruz.", "We build trust in digital production with <em>real results</em>."),
      ),
      "",
    ).__html,
    descriptionHtml: richHtml(
      localizedText(props.descriptionHtml, props.descriptionHtmlEn, defaultDescription),
      defaultDescription,
    ).__html,
    showActions: props.showActions !== false,
    actionsAriaLabel: localizedText(
      props.actionsAriaLabel,
      props.actionsAriaLabelEn,
      tLocalized("Referanslar aksiyonları", "References actions"),
    ),
    showPrimaryButton: props.showPrimaryButton !== false,
    primaryHref,
    primaryButtonText,
    showSecondaryButton: props.showSecondaryButton !== false,
    secondaryHref,
    secondaryButtonText,
    showProofSummary: props.showProofSummary !== false,
    proofAriaLabel: localizedText(
      props.proofAriaLabel,
      props.proofAriaLabelEn,
      tLocalized("3MASH referans özeti", "3MASH reference summary"),
    ),
    proofEyebrow: localizedText(
      props.proofEyebrow,
      props.proofEyebrowEn,
      tLocalized("Referans havuzu", "Reference Pool"),
    ),
    proofTitle: localizedText(
      props.proofTitle,
      props.proofTitleEn,
      tLocalized("Kliniklerden laboratuvarlara uzanan saha kaydı.", "Field records spanning clinics to laboratories."),
    ),
    proofDescription: localizedText(
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
    logosAriaLabel: localizedText(
      props.logosAriaLabel,
      props.logosAriaLabelEn,
      tLocalized("3MASH güven logoları", "3MASH trust logos"),
    ),
    logos,
  };
  const referenceWallContent = {
    visible: props.showReferenceWall !== false,
    ariaLabel: localizedText(
      props.referencesAriaLabel,
      props.referencesAriaLabelEn,
      tLocalized("3MASH referans yorumları", "3MASH reference reviews"),
    ),
    entries: referenceEntries.map((item) => ({
      type: item.type,
      quoteHtml: richHtml(item.quote, "").__html,
      name: item.name,
      detailsHtml: sanitizeHtml(
        `<strong>${escapeHtml(item.name)}</strong>${item.detailsHtml}`,
      ),
      image: item.image,
      featured: item.featured,
    })),
  };
  const caseStudyContent = {
    visible: props.showCaseStudy !== false,
    kicker: localizedText(
      props.caseKicker,
      props.caseKickerEn,
      tLocalized("Klinik başarı hikayesi", "Clinical Success Story"),
    ),
    title: localizedText(
      props.caseTitle,
      props.caseTitleEn,
      tLocalized("Dr. Barbaros Baran ile All-on-Six geçici restorasyon.", "All-on-Six temporary restoration with Dr. Barbaros Baran."),
    ),
    descriptionHtml: richHtml(
      localizedText(
        props.caseDescription,
        props.caseDescriptionEn,
        tLocalized(
          "CRS Composite Resin ile tamamen dijital olarak üretilen geçici restorasyon; hafif yapı, kontrollü üretim süreci ve klinik adaptasyon odağıyla 3MASH ekosisteminin sahadaki karşılığını gösterir.",
          "The provisional restoration produced entirely digitally with CRS Composite Resin demonstrates the field value of the 3MASH ecosystem through lightweight design, controlled manufacturing, and clinical precision.",
        ),
      ),
      "",
    ).__html,
    storyPoints,
    image: imageSource(props.caseImageUrl, crsCompositeSararmaImage),
    imageAlt: localizedText(
      props.caseImageAlt,
      props.caseImageAltEn,
      tLocalized("CRS Composite Resin ile dijital restorasyon çalışması", "Digital restoration study with CRS Composite Resin"),
    ),
    captionTitle: localizedText(
      props.caseCaptionTitle,
      props.caseCaptionTitleEn,
      tLocalized("CRS Composite Resin", "CRS Composite Resin"),
    ),
    captionText: localizedText(
      props.caseCaptionText,
      props.caseCaptionTextEn,
      tLocalized("Dijital geçici restorasyon ve klinik takip süreci", "Digital provisional restoration and clinical follow-up"),
    ),
  };
  const partnersContent = {
    visible: props.showPartners !== false,
    kicker: localizedText(
      props.partnersKicker,
      props.partnersKickerEn,
      tLocalized("Çözüm ortakları", "Solution Partners"),
    ),
    title: localizedText(
      props.partnersTitle,
      props.partnersTitleEn,
      tLocalized("Cihaz, reçine ve teknik destek aynı iş akışında buluşur.", "Hardware, resin, and technical support unite in the same workflow."),
    ),
    cards: partnerCards.map((item) => ({
      name: item.name,
      title: item.title,
      descriptionHtml: richHtml(item.text, "").__html,
      image: item.image,
    })),
  };
  const workflowContent = {
    visible: props.showWorkflow !== false,
    kicker: localizedText(
      props.workflowKicker,
      props.workflowKickerEn,
      tLocalized("3MASH ile üretim akışı", "Production Workflow with 3MASH"),
    ),
    title: localizedText(
      props.workflowTitle,
      props.workflowTitleEn,
      tLocalized("Referansların ortak noktası ürün değil, çalışan sistem.", "The common thread of references isn't just a product—it's a working system."),
    ),
    descriptionHtml: richHtml(
      localizedText(
        props.workflowDescription,
        props.workflowDescriptionEn,
        tLocalized(
          "Başarılı sonuç yalnızca bir cihaz veya tek bir reçineyle oluşmaz. Laboratuvarda tekrarlanabilir kalite için donanım, malzeme, eğitim ve teknik destek birlikte ilerler.",
          "Successful results don't come from a single printer or resin alone. Hardware, materials, training, and support work together for repeatable quality in the lab.",
        ),
      ),
      "",
    ).__html,
    cards: workflowCards.map((item) => ({
      title: item.title,
      descriptionHtml: richHtml(item.text, "").__html,
      image: item.image,
    })),
  };

  return (
    <section
      id={text(props.sectionAnchorId, "referanslar")}
      className="three-mash-references"
      style={rootStyle}
    >
      <div className="tmref-shell">
        <ThreeMashReferencesLead {...leadContent} />
        <ThreeMashReferenceWall {...referenceWallContent} />
        <ThreeMashReferencesCaseStudy {...caseStudyContent} />
        <ThreeMashReferencesPartners {...partnersContent} />
        <ThreeMashReferencesWorkflow {...workflowContent} />
      </div>
    </section>
  );
}

export default ThreeMashReferences;
