import { getCurrentLocale, tLocalized } from "../../utils/i18n";
import { safeDecodeURI } from "../../utils/safeDecodeURI";
import type { CategoryLandingData } from "./index";

export const categoryPresetLocale = getCurrentLocale();

const curieM1MainImage =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/302ffc22-20c4-49b7-8d16-b303e079f0cf/1080/1.webp";

function normalizeCategoryKey(value: string | undefined) {
  const decoded = safeDecodeURI(value || "");

  return decoded
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function categoryKeyMatches(key: string, categoryKey: string) {
  return key === categoryKey || key.startsWith(`${categoryKey} `) || key.endsWith(` ${categoryKey}`) || key.includes(` ${categoryKey} `);
}

export function dentalResinsCategoryData(): CategoryLandingData {
  return {
  kind: "resins",
  announcement: {
    highlight: tLocalized("⚡ Doğru reçineyi mi arıyorsunuz?", "⚡ Looking for the right resin?"),
    text: tLocalized("Uygulamanıza göre filtreleyin; emin değilseniz ekibimiz sizin için eşleştirir.", "Filter by your application; if you're not sure, our team will match one for you."),
    href: "#secici",
    ctaText: tLocalized("Reçine seçiciye git →", "go to resin selector →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Dental Reçineler", "Dental Resins"),
  },
  hero: {
    titlePrefix: tLocalized("Sonucun yarısı", "Half of the result lies in the"),
    titleEmphasis: tLocalized("reçinede", "resin."),
    titleSuffix: tLocalized("saklı.", "hidden."),
    descriptionHtml:
      tLocalized("Ana sayfada gördüğümüz gibi hassasiyet tek bir cihazdan çıkmaz. Doğru reçine, <b>doğru işe eşleştiğinde</b> ve cihazınızın parametreleriyle <b>birlikte kalibre edildiğinde</b> ortaya çıkar. CE Class IIa sertifikalı <b>CRS</b> hattı ve ekonomik <b>Mash</b> hattıyla, her uygulama için doğru bir reçine var.", "As we saw on the home page, precision doesn't come from a single device. It emerges when the right resin is <b>matched to the right job</b> and <b>calibrated together</b> with your device's parameters. With the CE Class IIa certified <b>CRS</b> line and the economical <b>Mash</b> line, there's a right resin for every application."),
    buttons: [
      { label: tLocalized("Reçineni seç ↓", "select your resin ↓"), href: "#secici", variant: "lime" },
      { label: tLocalized("Emin değil misiniz? Ekibe sorun", "not sure? ask our team"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "CE", emphasis: tLocalized("Class IIa", "Class IIa"), label: tLocalized("biyouyumlu CRS hattı · sertifikalı", "biocompatible CRS line · certified") },
      { value: "16", emphasis: tLocalized("reçine", "Resin"), label: tLocalized("model, kron, protez, diş eti, splint, aligner, guide…", "model, crown, denture, gingiva, splint, aligner, guide…") },
      { value: tLocalized("Marka", "Brand"), emphasis: tLocalized("bağımsız", "independent"), label: tLocalized("tüm DLP & LCD 3D yazıcılarla uyumlu", "compatible with all DLP & LCD 3D printers") },
      { value: tLocalized("Birlikte", "Together"), emphasis: "kalibre", label: tLocalized("cihaz parametrelerinizle eşleştirilerek teslim", "delivered matched to your device parameters") },
    ],
  },
  selector: {
    anchorId: "secici",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("REÇİNİ SEÇİCİ", "RESIN SELECTOR"),
    titlePrefix: tLocalized("Hangi işe", "which resin for"),
    titleEmphasis: tLocalized("hangi reçine?", "which application?"),
    sideHtml:
      tLocalized("Uygulamanızı seçin, doğru reçineyi görün. Hepsi tüm DLP/LCD yazıcılarla çalışır; CRS hattı ayrıca <b>CE Class IIa</b> biyouyumludur.", "Choose your application, see the right resin. All work with every DLP/LCD printer; the CRS line is also <b>CE Class IIa</b> biocompatible."),
    filters: [
      { id: "all", label: tLocalized("Tümü", "All") },
      { id: "model", label: tLocalized("Model", "Model") },
      { id: "kron", label: tLocalized("Kron & Köprü", "Crown & Bridge") },
      { id: "protez", label: tLocalized("Protez & Diş Eti", "Denture & Gingiva") },
      { id: "splint", label: tLocalized("Splint / Gece Plağı", "Splint / Night Guard") },
      { id: "orto", label: tLocalized("Ortodonti", "Orthodontics") },
      { id: "cerrahi", label: tLocalized("Cerrahi / Döküm / Ölçü", "Surgical / Cast / Impression") },
    ],
    emptyMessageHtml: tLocalized("Bu kategoride ürün yok. <a href=\"/pages/iletisim\">İhtiyacınızı bize iletin →</a>", "There are no products in this category. <a href=\"/pages/iletisim\">Let us know what you need →</a>"),
    products: [
      {
        title: tLocalized("CRS Composite", "CRS Composite"),
        descriptionHtml: tLocalized("Geçici ve daimi kron-köprü. <b>144 MPa</b> eğilme mukavemeti, kompozit şırıngalarla birebir uyum.", "Temporary and permanent crown-bridge. <b>144 MPa</b> flexural strength, exact match with composite syringes."),
        href: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
        imageAlt: tLocalized("CRS Composite reçine", "CRS Composite resin"),
        filterId: "kron",
        tag: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
        hot: true,
        tone: "#F1ECE0",
      },
      {
        title: tLocalized("CRS Model", "CRS Model"),
        descriptionHtml: tLocalized("Master protez ve ortodontik modeller. Belirgin <b>kole hatları</b>, net marjinal uyum; kum/gri renk.", "Master dentures and orthodontic models. Distinct <b>cervical lines</b>, clear marginal fit; sand/gray color."),
        href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
        imageAlt: tLocalized("CRS Model reçine", "CRS Model resin"),
        filterId: "model",
        tag: tLocalized("HASSASİYET", "PRECISION"),
        tone: "#EFE7D3",
      },
      {
        title: tLocalized("CRS Denture", "CRS Denture"),
        descriptionHtml: tLocalized("Çıkarılabilir protez tabanı. PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.", "Removable denture base. <b>Low shrinkage</b> compared to PMMA, compatible with polishing + glazing."),
        href: "/crs-denture-biouyumlu-protez-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
        imageAlt: tLocalized("CRS Denture reçine", "CRS Denture resin"),
        filterId: "protez",
        tag: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
        hot: true,
        tone: "#F6E3E4",
      },
      {
        title: tLocalized("CRS Gingiva", "CRS Gingiva"),
        descriptionHtml: tLocalized("İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, elastik, doğal diş eti rengi.", "Implant model and gingiva mask. High tear resistance, elastic, natural gingiva color."),
        href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
        imageAlt: tLocalized("CRS Gingiva reçine", "CRS Gingiva resin"),
        filterId: "protez",
        tag: "YIRTILMAZ",
        tone: "#F5DEE0",
      },
      {
        title: tLocalized("CRS Splint Hard", "CRS Splint Hard"),
        descriptionHtml: tLocalized("Sert gece plağı ve <b>oklüzal splint</b> için sağlam, stabil reçine.", "A strong, stable resin for hard night guards and <b>occlusal splints</b>."),
        href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
        imageAlt: tLocalized("CRS Splint Hard reçine", "CRS Splint Hard resin"),
        filterId: "splint",
        tag: "SERT",
        tone: "#E6F2F0",
      },
      {
        title: tLocalized("CRS Splint Soft", "CRS Splint Soft"),
        descriptionHtml: tLocalized("Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.", "Flexible and biocompatible splint / night guard resin; comfortable use."),
        href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
        imageAlt: tLocalized("CRS Splint Soft reçine", "CRS Splint Soft resin"),
        filterId: "splint",
        tag: tLocalized("ESNEK · CE", "FLEXIBLE CE"),
        tone: "#E6F2F0",
      },
      {
        title: tLocalized("CRS Aligner", "CRS Aligner"),
        descriptionHtml: tLocalized("<b>Memory-shape</b> aligner reçinesi. Termoform sınırlarını aşar, minimal son işlem.", "<b>Memory-shape</b> aligner resin. Goes beyond the limits of thermoforming, with minimal post-processing."),
        href: "/crs-aligner-memory-shape-ozellikli-aligner-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
        imageAlt: tLocalized("CRS Aligner reçine", "CRS Aligner resin"),
        filterId: "orto",
        tag: tLocalized("BİYOUYUMLU", "BIOCOMPATIBLE"),
        hot: true,
        tone: "#E6F2F0",
      },
      {
        title: tLocalized("CRS IBT", "CRS IBT"),
        descriptionHtml: tLocalized("Ortodontik braket yerleştirme (indirect bonding tray) için hassas, esnek reçine.", "A precise, flexible resin for orthodontic bracket placement (indirect bonding tray)."),
        href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/1080/crs-ibt-resin.webp",
        imageAlt: tLocalized("CRS IBT reçine", "CRS IBT resin"),
        filterId: "orto",
        tag: tLocalized("HASSAS · ESNEK", "PRECISION FLEXIBLE"),
        tone: "#E6F2F0",
      },
      {
        title: tLocalized("CRS Guide", "CRS Guide"),
        descriptionHtml: tLocalized("Cerrahi rehber (guide) için biyouyumlu, hassas kılavuz reçinesi.", "A biocompatible, precise guide resin for surgical guides."),
        href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
        imageAlt: tLocalized("CRS Guide reçine", "CRS Guide resin"),
        filterId: "cerrahi",
        tag: tLocalized("CE · BİYOUYUMLU", "CE · BIOCOMPATIBLE"),
        hot: true,
        tone: "#E6F2F0",
      },
      {
        title: tLocalized("CRS Cast", "CRS Cast"),
        descriptionHtml: tLocalized("<b>Çekmeyen</b> döküm reçinesi. Tüm revetmanlarla, kalıntısız; kürleme gerektirmez.", "<b>Non-shrinking</b> casting resin. Residue-free with all investment materials; requires no curing."),
        href: "/crs-cast-cekmeyen-dokum-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
        imageAlt: tLocalized("CRS Cast reçine", "CRS Cast resin"),
        filterId: "cerrahi",
        tag: tLocalized("DÖKÜM", "CAST"),
        tone: "#E4ECF5",
      },
      {
        title: tLocalized("CRS Flexit", "CRS Flexit"),
        descriptionHtml: tLocalized("Esnek protez reçinesi; <b>dayanım ve konfor</b> dengesi.", "Flexible denture resin; a balance of <b>strength and comfort</b>."),
        href: "/crs-flexit-recin-protez-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/1080/crs-flexit-resin.webp",
        imageAlt: tLocalized("CRS Flexit reçine", "CRS Flexit resin"),
        filterId: "protez",
        tag: "ESNEK",
        tone: "#F6E3E4",
      },
      {
        title: tLocalized("CRS Tray", "CRS Tray"),
        descriptionHtml: tLocalized("Kişiye özel <b>ölçü kaşığı</b> üretimi için stabil reçine.", "Stable resin for custom <b>impression tray</b> production."),
        href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
        imageAlt: tLocalized("CRS Tray reçine", "CRS Tray resin"),
        filterId: "cerrahi",
        tag: tLocalized("ÖLÇÜ KAŞIĞI", "IMPRESSION TRAY"),
        tone: "#EEEEE9",
      },
      {
        title: tLocalized("Mash Study", "Mash Study"),
        descriptionHtml: tLocalized("Uygun fiyatlı, yüksek kaliteli <b>model reçinesi</b> — yüksek hacimli iş akışına.", "Affordable, high-quality <b>model resin</b> — for high-volume workflows."),
        href: "/mash-study-resin-dental-model-3d-yazici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/1080/mash-study-resin.webp",
        imageAlt: tLocalized("Mash Study reçine", "Mash Study resin"),
        filterId: "model",
        tag: tLocalized("EKONOMİK", "ECONOMICAL"),
        tone: "#EEEEE9",
      },
      {
        title: tLocalized("Mash Trial White", "Mash Trial White"),
        descriptionHtml: tLocalized("Geçici dental reçine — <b>beyaz try-in</b>; hızlı prova ve deneme.", "Temporary dental resin — <b>white try-in</b>; fast try-in and trial."),
        href: "/mash-trial-white-resin-gecici-dental-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
        imageAlt: tLocalized("Mash Trial White reçine", "Mash Trial White resin"),
        filterId: "kron",
        tag: tLocalized("EKONOMİK", "ECONOMICAL"),
        tone: "#F4F4EF",
      },
      {
        title: tLocalized("Mash Trial Pink", "Mash Trial Pink"),
        descriptionHtml: tLocalized("<b>Pembe try-in</b> geçici reçinesi — protez provası için pratik çözüm.", "<b>Pink try-in</b> temporary resin — a practical solution for prosthesis try-in."),
        href: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
        imageAlt: tLocalized("Mash Trial Pink reçine", "Mash Trial Pink resin"),
        filterId: "protez",
        tag: tLocalized("EKONOMİK", "ECONOMICAL"),
        tone: "#F5DEE0",
      },
      {
        title: tLocalized("Mash Clear", "Mash Clear"),
        descriptionHtml: tLocalized("Şeffaf, biyouyumlu <b>cerrahi kılavuz</b> reçinesi — ekonomik guide çözümü.", "A clear, biocompatible <b>surgical guide</b> resin — an economical guide solution."),
        href: "/mash-clear-resin-dental-cerrahi-kilavuz-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
        imageAlt: tLocalized("Mash Clear reçine", "Mash Clear resin"),
        filterId: "cerrahi",
        tag: tLocalized("EKONOMİK", "ECONOMICAL"),
        tone: "#E6F2F0",
      },
    ],
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("CRS COMPOSITE · CE CLASS IIa", "CRS COMPOSITE · CE CLASS IIa"),
      titlePrefix: tLocalized("Daimi kron artık", "The permanent crown now"),
      titleEmphasis: tLocalized("baskıdan", "from printing"),
      titleSuffix: tLocalized("çıkıyor.", "turns out."),
      descriptionHtml:
        tLocalized("Geçici ve daimi kron-köprülerin katmanlı üretimi için biyouyumlu reçine. Rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum; yarı saydamlık–opaklık arasında dengeli translüsentlik. Ağız koşullarına dayanıklı, tat/koku yapmaz.", "A biocompatible resin for layered production of temporary and permanent crowns and bridges. <b>Higher flexural strength</b> than competitors and precise marginal fit; balanced translucency between semi-transparency and opacity. Resistant to oral conditions, no taste or odor."),
      href: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
      ctaText: tLocalized("Ürün detayına git →", "Go to product details →"),
      specs: [
        { label: tLocalized("Eğilme mukavemeti (ISO 10477)", "Flexural strength (ISO 10477)"), value: "144 MPa" },
        { label: tLocalized("Eğilme modülü (ISO 10477)", "Flexural modulus (ISO 10477)"), value: "5000 MPa" },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Geçici + daimi kron-köprü", "Temporary + permanent crown-bridge") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm DLP / LCD yazıcılar", "All DLP / LCD printers") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("İKİ HAT, TEK STANDART", "TWO LINES, ONE STANDARD"),
    titlePrefix: tLocalized("Bütçenize göre hat,", "A lineup based on your budget,"),
    titleEmphasis: tLocalized("kaliteye göre değil.", "not by quality."),
    sideHtml:
      tLocalized("İster premium ister ekonomik seçin; ikisi de <b>tüm marka yazıcılarla</b> çalışır ve teknik ekibimizin parametre desteğiyle gelir.", "Whether you choose premium or economical, both work with <b>all printer brands</b> and come with parameter support from our technical team."),
    lineCards: [
      {
        marker: "CRS",
        title: tLocalized("CRS — Biyouyumlu premium hat", "CRS — Biocompatible premium line"),
        descriptionHtml:
          tLocalized("CRSCAM üretimi, <b>CE Class IIa</b> sertifikalı; hassasiyet, dayanım ve biyouyumluluğun kritik olduğu işler için. Ağız içinde kalan tüm uygulamaların adresi.", "Manufactured by CRSCAM, <b>CE Class IIa</b> certified — for work where precision, strength, and biocompatibility are critical. The go-to choice for all applications that remain intraoral."),
        items: [tLocalized("Kron-köprü, protez, diş eti, aligner, splint, guide", "Crown-bridge, denture, gingiva, aligner, splint, guide"), tLocalized("CE Class IIa · klinik güvenlik standartları", "CE Class IIa · clinical safety standards"), tLocalized("Cihaz parametrelerinizle birlikte kalibre", "Calibrated together with your device parameters")],
        variant: "accent",
      },
      {
        marker: "M",
        title: tLocalized("Mash — Ekonomik hat", "Mash — Economic line"),
        descriptionHtml:
          tLocalized("Yüksek hacimli, ağız dışı ve deneme işleri için <b>uygun maliyetli</b> alternatif. Model, try-in ve ekonomik guide ihtiyaçlarını karşılar.", "A <b>cost-effective</b> alternative for high-volume, extraoral, and trial work. Meets model, try-in, and economical guide needs."),
        items: ["Study model, Trial (white/pink), Clear guide", tLocalized("Yüksek hacimde maliyet avantajı", "Cost advantage at high volume"), tLocalized("Aynı teknik destek, aynı marka bağımsızlık", "The same technical support, the same brand independence")],
        variant: "plain",
      },
    ],
    callout: {
      titlePrefix: tLocalized("Reçine tek başına yeterli değil:", "Resin alone is not enough:"),
      titleEmphasis: tLocalized("kürleme sonucu tamamlar.", "completes the curing result."),
      descriptionHtml:
        tLocalized("Doğru reçineyi seçseniz bile, yanlış post-curing hassasiyeti ve dayanımı bozar. Her CRS reçinesi bir <b>kürleme protokolüyle</b> gelir; akıllı kürleme cihazımız bu protokolü otomatik uygular.", "Even if you choose the right resin, incorrect post-curing ruins precision and strength. Every CRS resin comes with a <b>curing protocol</b>; our smart curing device applies this protocol automatically."),
      buttons: [{ label: tLocalized("Kürlemenin önemini gör →", "See the importance of curing →"), href: tLocalized("/yikama-kurleme-cihazlari#neden-gerekli", "/yikama-kurleme-cihazlari#neden-gerekli"), variant: "dark" }],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Reçine seçerken merak edilenler.", "Frequently asked questions when choosing a resin."),
    sideHtml: tLocalized("Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from dentists and labs, with clear answers."),
    items: [
      {
        question: tLocalized("Hangi dental reçineyi seçmeliyim?", "Which dental resin should I choose?"),
        answerHtml:
          tLocalized("Reçineyi <b>uygulamaya göre</b> seçmelisiniz: model için <b>CRS Model</b> ya da ekonomik <b>Mash Study</b>; geçici/daimi kron-köprü için <b>CRS Composite</b>; protez tabanı için <b>CRS Denture</b>; diş eti için <b>CRS Gingiva</b>; gece plağı için <b>CRS Splint Hard/Soft</b>; şeffaf hizalayıcı için <b>CRS Aligner</b>; cerrahi rehber için <b>CRS Guide</b>. Emin değilseniz yukarıdaki <a href=\"#secici\">reçine seçiciyi</a> kullanın veya ekibimize danışın.", "You should choose the resin <b>based on the application</b>: <b>CRS Model</b> or the economical <b>Mash Study</b> for models; <b>CRS Composite</b> for temporary/permanent crowns and bridges; <b>CRS Denture</b> for denture bases; <b>CRS Gingiva</b> for gum tissue; <b>CRS Splint Hard/Soft</b> for night guards; <b>CRS Aligner</b> for clear aligners; <b>CRS Guide</b> for surgical guides. If you are not sure, use the <a href=\"#secici\">resin selector</a> above or contact our team."),
      },
      {
        question: tLocalized("CE Class IIa biyouyumluluk ne anlama geliyor?", "What does CE Class IIa biocompatibility mean?"),
        answerHtml:
          tLocalized("CE Class IIa, ağız içinde belirli bir süre temas eden tıbbi cihaz sınıfıdır; reçinenin <b>hasta güvenliği ve biyouyumluluk</b> standartlarını karşıladığını gösterir. CRS hattımız CE Class IIa sertifikalıdır ve MDR süreçleri üretici ortağımız CRSCAM tarafından yürütülür.", "CE Class IIa is a medical device class that remains in contact with the mouth for a certain period; it indicates that the resin meets <b>patient safety and biocompatibility</b> standards. Our CRS line is CE Class IIa certified, and MDR processes are carried out by our manufacturing partner CRSCAM."),
      },
      {
        question: tLocalized("Reçineleriniz başka marka 3D yazıcılarla çalışır mı?", "Do your resins work with other brand 3D printers?"),
        answerHtml:
          tLocalized("Evet. Tüm CRS ve Mash reçineleri <b>tüm DLP ve LCD marka</b> yazıcılarla uyumludur. Ayrıca teknik ekibimiz, reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> teslim eder — böylece marka fark etmeden aynı sonucu alırsınız.", "Yes. All CRS and Mash resins are compatible with <b>all DLP and LCD brand</b> printers. Our technical team also delivers the resin by <b>calibrating it together with your device's parameters</b> — so you get the same result regardless of brand."),
      },
      {
        question: tLocalized("Model reçinesinde nelere dikkat etmeliyim?", "What should I pay attention to with model resin?"),
        answerHtml:
          tLocalized("İyi bir model reçinesinde <b>boyutsal doğruluk</b>, yüksek detay çözünürlüğü, belirgin kole hatları ve mat/lekesiz yüzey aranır. CRS Model kum ve gri renk seçenekleriyle optik tespit için yüksek görsel detay sunar.", "A good model resin needs <b>dimensional accuracy</b>, high detail resolution, well-defined collar lines, and a matte, stain-free surface. CRS Model offers high visual detail for optical detection in sand and gray shade options."),
      },
      {
        question: tLocalized("Reçine performansını kürleme etkiler mi?", "Does curing affect resin performance?"),
        answerHtml:
          tLocalized("Kesinlikle. <b>Yetersiz kürleme</b> kırılganlık ve monomer salınımı, <b>fazla kürleme</b> deformasyon yaratır. Doğru reçine bile yanlış kürlemeyle başarısız olur; bu yüzden her reçineyi bir kürleme protokolüyle veriyoruz. Detay için <a href=\"/yikama-kurleme-cihazlari#neden-gerekli\">kürleme bölümüne</a> bakabilirsiniz.", "Absolutely. <b>Insufficient curing</b> causes brittleness and monomer release, while <b>excessive curing</b> causes deformation. Even the right resin can fail with the wrong curing; that's why we provide every resin with a curing protocol. For details, you can check the <a href=\"/yikama-kurleme-cihazlari#neden-gerekli\">curing section</a>."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("İşinize uygun reçineyi", "The resin suited to your work"),
    titleEmphasis: tLocalized("birlikte seçelim.", "let's choose it together."),
    descriptionHtml:
      tLocalized("Hangi uygulama, hangi cihaz, hangi bütçe? Kısa bir görüşmeyle size en uygun CRS veya Mash reçinesini ve doğru parametreleri <b>ücretsiz</b> önerelim.", "Which application, which device, which budget? With a short conversation, let's recommend the most suitable CRS or Mash resin and the correct parameters for you <b>free of charge</b>."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Reçine seçiciye dön", "Back to the resin selector"), href: "#secici", variant: "inverse" },
    ],
  },
};
}

export function printersCategoryData(): CategoryLandingData {
  return {
  kind: "printers",
  announcement: {
    highlight: tLocalized("⚡ Hangi yazıcı size uygun?", "⚡ Which printer suits you?"),
    text: tLocalized("Hız, çözünürlük ve bütçeye göre karşılaştırın; emin değilseniz ekibimiz eşleştirir.", "Compare based on speed, resolution, and budget; if you're not sure, our team will match you with the right option."),
    href: "#karsilastirma-tablosu",
    ctaText: tLocalized("Karşılaştırmaya git →", "Go to comparison →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("3D Yazıcılar", "3D Printers"),
  },
  hero: {
    titlePrefix: tLocalized("±20 mikron", "±20 microns"),
    titleEmphasis: tLocalized("burada doğar.", "is born here."),
    descriptionHtml:
      tLocalized("Hassasiyet tesadüf değildir; <b>doğru dalga boyu</b>, termal stabilite ve kalibrasyonla kurulur. 3mash yazıcıları malzemeye göre tasarlanır: <b>385 nm</b> ışık reçinenin kürlenme spektrumuna tam uyar, entegre ısıtma viskoziteyi sabitler. Üstelik <b>gizli lisans veya RFID ücreti yok</b> — istediğiniz reçineyle çalışırsınız.", "Precision is not a coincidence; it's built with <b>the right wavelength</b>, thermal stability, and calibration. 3mash printers are designed around the material: <b>385 nm</b> light matches the resin's curing spectrum exactly, and integrated heating stabilizes viscosity. What's more, <b>there are no hidden license or RFID fees</b> — you can work with any resin you want."),
    buttons: [
      { label: tLocalized("Yazıcıları karşılaştır ↓", "Compare printers ↓"), href: "#karsilastirma-tablosu", variant: "lime" },
      { label: tLocalized("Bana uygun olanı öner", "Recommend the right one for me"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "385", emphasis: "nm", label: tLocalized("reçine kürlenme spektrumuna tam uyum · keskin marjin", "perfect match to the resin's curing spectrum · sharp margin") },
      { value: "14×19", emphasis: "µm", label: tLocalized("MASH P16L · 16K XY çözünürlük", "MASH P16L · 16K XY resolution") },
      { value: "±20", emphasis: "µm", label: tLocalized("CURIE M1 · tekrarlanabilir doğruluk", "CURIE M1 · repeatable accuracy") },
      { value: "0", emphasis: tLocalized("gizli ücret", "hidden fee"), label: tLocalized("lisans / RFID kilidi yok · marka bağımsız reçine", "no license / RFID lock · brand-independent resin") },
    ],
  },
  selector: {
    anchorId: "karsilastir",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("CİHAZLAR", "DEVICES"),
    titlePrefix: tLocalized("İhtiyacınıza göre", "Based on your needs"),
    titleEmphasis: tLocalized("üç yol.", "three ways."),
    sideHtml:
      tLocalized("En yüksek çözünürlük, en yüksek hız ya da en uygun giriş — üçü de aynı 3mash desteğiyle ve <b>gizli ücret olmadan</b> gelir.", "Highest resolution, highest speed, or the best entry point — all three come with the same 3mash support and <b>no hidden fees</b>."),
    products: [
      {
        title: tLocalized("MASH P16L", "MASH P16L"),
        descriptionHtml: tLocalized("385 nm profesyonel dental yazıcı. <b>16K</b> ultra çözünürlük ve termal kontrolle en detaylı yüzey ve keskin marjin.", "385 nm professional dental printer. The most detailed surface and sharp margins with <b>16K</b> ultra resolution and thermal control."),
        href: "/mash-p16l-385nm-16k-dental-3d-yazici",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e47e604b-5052-4935-800f-57d4ead78ced/1080/mash-p16l.webp",
        imageAlt: tLocalized("MASH P16L dental 3D yazıcı", "MASH P16L dental 3D printer"),
        tag: tLocalized("EN YÜKSEK ÇÖZÜNÜRLÜK", "HIGHEST RESOLUTION"),
        status: tLocalized("Satışta", "For sale"),
        hot: true,
        sourceIcon: true,
        specs: [
          { label: tLocalized("Çözünürlük", "Resolution"), value: "14×19 µm · 16K" },
          { label: tLocalized("Işık", "Light"), value: "385 nm UV" },
          { label: tLocalized("Kalibrasyon", "Calibration"), value: "8 nokta dikey kilit" },
        ],
      },
      {
        title: tLocalized("Mash CURIE M1", "Mash CURIE M1"),
        descriptionHtml: tLocalized("Antalya Teknokent'te üretilen <b>tamamen yerli</b> yazıcı. Hız ve düşük toplam maliyet için tasarlandı.", "A <b>fully domestic</b> printer made in Antalya Teknokent. Designed for speed and low total cost."),
        href: "/mash-curie-m1-dental-3d-yazici",
        tag: tLocalized("YERLİ · HIZLI", "LOCAL · FAST"),
        status: tLocalized("Talep üzerine", "On request"),
        imageSrc: curieM1MainImage,
        imageAlt: tLocalized("Mash CURIE M1 dental 3D yazıcı", "Mash CURIE M1 dental 3D printer"),
        specs: [
          { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("±20 µm tekrarlanabilir", "±20 µm repeatable") },
          { label: tLocalized("Hız", "Speed"), value: tLocalized("14 dk'da geçici kron", "Temporary crown in 14 minutes") },
          { label: tLocalized("Kalibrasyon", "Calibration"), value: tLocalized("6 aya kadar gerekmez", "Not required for up to 6 months") },
        ],
      },
      {
        title: tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K"),
        descriptionHtml: tLocalized("6K çözünürlük; <b>3mash iyileştirmeli</b> versiyonda <b>±15 µm</b> garanti. $10.000'lık cihaz kalitesine çok daha uygun fiyata.", "6K resolution; <b>±15 µm</b> guaranteed in the <b>3mash-enhanced</b> version. Device quality worth $10,000, at a far more affordable price."),
        href: "/creality-halot-sky-6k",
        tag: tLocalized("EKONOMİK GİRİŞ", "ECONOMICAL ENTRY"),
        status: tLocalized("Talep üzerine", "On request"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp",
        imageAlt: tLocalized("Creality Halot-Sky 6K reçine 3D yazıcı", "Creality Halot-Sky 6K resin 3D printer"),
        tone: "#FFFFFF",
        specs: [
          { label: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("6K", "6K") },
          { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("±15 µm (arttırılmış)", "±15 µm (enhanced)") },
          { label: tLocalized("Versiyon", "Version"), value: tLocalized("Fabrika / Arttırılmış", "Factory / Enhanced") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Özellik", "Feature") },
        { title: tLocalized("MASH P16L", "MASH P16L"), subtitle: tLocalized("En yüksek çözünürlük", "Highest resolution") },
        { title: tLocalized("Mash CURIE M1", "Mash CURIE M1"), subtitle: tLocalized("Hız + yerli", "Speed + domestic") },
        { title: tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K"), subtitle: tLocalized("Ekonomik giriş", "Economical entry") },
      ],
      rows: [
        { label: tLocalized("Çözünürlük / Hassasiyet", "Resolution / Precision"), values: ["<b>14×19 µm</b> · 16K", "<b>±20 µm</b> tekrarlanabilir", tLocalized("<b>±15 µm</b> (arttırılmış)", "<b>±15 µm</b> (enhanced)")] },
        { label: tLocalized("Işık kaynağı", "Light source"), values: ["385 nm UV", tLocalized("Yerli optik sistem", "Domestic optical system"), "6K LCD"] },
        { label: tLocalized("Hız", "Speed"), values: [tLocalized("Yüksek detay odaklı", "Detail-focused"), tLocalized("<b>14 dk'da</b> geçici kron", "Temporary crown <b>in 14 min</b>"), tLocalized("Standart", "Standard")] },
        { label: tLocalized("Termal kontrol", "thermal control"), values: [tLocalized("Entegre ısıtma (25/30°C)", "Integrated heating (25/30°C)"), "—", "—"] },
        { label: tLocalized("Kalibrasyon", "Calibration"), values: [tLocalized("8 nokta dikey kilit · aylarca stabil", "8-point vertical lock · stable for months"), tLocalized("6 aya kadar gerekmez", "Not required for up to 6 months"), tLocalized("3mash servis desteği", "3mash service support")] },
        { label: tLocalized("Gizli lisans / RFID", "Hidden license / RFID"), values: ['<span class="tmcl-yes">Yok</span>', '<span class="tmcl-yes">Yok</span>', '<span class="tmcl-yes">Yok</span>'] },
        { label: tLocalized("En uygun", "Optimal"), values: [tLocalized("Detay & keskin marjin gereken işler", "Work requiring detail & sharp margins"), tLocalized("Yüksek hacim, hız, düşük TCO", "High volume, speed, low TCO"), tLocalized("Dijitale ekonomik giriş", "An economical entry into digital")] },
      ],
      noteHtml:
        tLocalized("Not: Tüm 3mash yazıcılarında <b>gizli lisans veya RFID ücreti yoktur</b> ve dilediğiniz marka reçineyle çalışabilirsiniz. Stok durumu için ekibimize danışın.", "Note: <b>There is no hidden license or RFID fee</b> on any 3mash printer, and you can work with any resin brand you like. Contact our team for stock status."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MASH P16L · 385nm · 16K", "MASH P16L 385nm 16K"),
      titlePrefix: tLocalized("Marjin hattı,", "Margin line,"),
      titleEmphasis: tLocalized("saç telinden ince.", "thinner than a strand of hair."),
      descriptionHtml:
        tLocalized("Profesyonel 385 nm UV kaynağı reçinelerin kürlenme spektrumuna tam uyar; parazit ışığı minimize ederek <b>keskin marjin hatları</b> sunar. 16K çözünürlük 14×19 µm XY hassasiyet getirir; entegre termal kontrol reçine viskozitesini sabitleyerek <b>her baskıda</b> aynı sonucu güvence altına alır.", "The professional 385 nm UV source fully matches the curing spectrum of resins; by minimizing stray light, it delivers <b>sharp margin lines</b>. 16K resolution provides 14×19 µm XY precision; integrated thermal control stabilizes resin viscosity, ensuring the same result <b>with every print</b>."),
      href: "/mash-p16l-385nm-16k-dental-3d-yazici",
      ctaText: tLocalized("Ürün detayına git →", "Go to product details →"),
      specs: [
        { label: tLocalized("XY çözünürlük", "XY resolution"), value: "14×19 µm (16K)" },
        { label: tLocalized("Işık kaynağı", "Light source"), value: "385 nm UV" },
        { label: tLocalized("Termal kontrol", "thermal control"), value: tLocalized("Entegre (25/30°C)", "Integrated (25/30°C)") },
        { label: tLocalized("Kalibrasyon", "Calibration"), value: "8 nokta dikey kilit" },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("NEDEN 3MASH YAZICILARI FARKLI", "WHY 3MASH PRINTERS ARE DIFFERENT"),
    titlePrefix: tLocalized("İyi cihaz değil,", "Not the device itself,"),
    titleEmphasis: tLocalized("doğru sistem.", "the right system."),
    sideHtml: tLocalized("Hassasiyet dört şeyin bir araya gelmesiyle çıkar. 3mash yazıcıları bunları baştan düşünülerek tasarlanır.", "Precision comes from the combination of four things. 3mash printers are designed with these in mind from the start."),
    whyCards: [
      { number: "01", title: tLocalized("Malzemeye göre ışık", "Light matched to the material"), descriptionHtml: tLocalized("<b>385 nm</b> dalga boyu reçine kimyasına uyar; parazit ışığı azaltır, marjini keskinleştirir. (P16L)", "The <b>385 nm</b> wavelength matches resin chemistry; it reduces stray light and sharpens the margin. (P16L)") },
      { number: "02", title: tLocalized("Termal stabilite", "thermal stability"), descriptionHtml: tLocalized("Entegre ısıtma <b>reçine viskozitesini</b> sabitler; baskıdan baskıya sonucu tekrar edilebilir kılar.", "Integrated heating stabilizes <b>resin viscosity</b>, making results repeatable from print to print.") },
      { number: "03", title: tLocalized("Kalibrasyon derdi yok", "No calibration hassle"), descriptionHtml: tLocalized("8 nokta dikey kilit ve <b>6 aya kadar</b> kalibrasyon gerektirmeyen yapı — her gün aynı doğruluk.", "8-point vertical lock and a design that needs <b>no calibration for up to 6 months</b> — the same accuracy every day.") },
      { number: "04", title: tLocalized("Kilitlenme yok", "No deadlock"), descriptionHtml: tLocalized("<b>Gizli lisans / RFID ücreti yok.</b> İstediğiniz marka reçineyle çalışır, bir ekosisteme mahkûm olmazsınız.", "<b>No hidden license / RFID fee.</b> Works with any resin brand you like — you're not locked into one ecosystem.") },
    ],
    callout: {
      titlePrefix: tLocalized("Yazıcı, hikâyenin", "Printer, the story's"),
      titleEmphasis: tLocalized("üçte biri.", "one-third."),
      descriptionHtml:
        tLocalized("En iyi cihaz bile yanlış reçine veya yanlış kürlemeyle hassasiyeti kaybeder. Kuronun oturması <b>yazıcı + reçine + kürlemenin</b> senkronuna bağlıdır — biz üçünü birlikte kalibre ediyoruz.", "Even the best device loses precision with the wrong resin or wrong curing. Whether the crown seats properly depends on the sync between <b>printer + resin + curing</b> — we calibrate all three together."),
      buttons: [
        { label: tLocalized("Uyumlu reçineler →", "Compatible resins →"), href: "/dental-3d-yazici-recineleri", variant: "dark" },
        { label: tLocalized("Kürlemenin önemi →", "The importance of curing →"), href: tLocalized("/yikama-kurleme-cihazlari#neden-gerekli", "/yikama-kurleme-cihazlari#neden-gerekli"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Yazıcı seçerken merak edilenler.", "Frequently asked questions when choosing a printer."),
    sideHtml: tLocalized("Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from dentists and labs, with clear answers."),
    items: [
      {
        question: tLocalized("Hangi dental 3D yazıcıyı seçmeliyim?", "Which dental 3D printer should I choose?"),
        answerHtml:
          tLocalized("İhtiyacınıza göre: en yüksek çözünürlük ve keskin marjin için <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); hız ve düşük toplam maliyet için yerli <b>Mash CURIE M1</b> (±20 µm, 14 dk'da geçici kron); dijitale ekonomik giriş için <b>Creality Halot-Sky 6K</b> (arttırılmış versiyonda ±15 µm). Emin değilseniz yukarıdaki <a href=\"#karsilastir\">karşılaştırmayı</a> kullanın veya ekibimize danışın.", "Based on your needs: for the highest resolution and sharpest margin, <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); for speed and low total cost, the local <b>Mash CURIE M1</b> (±20 µm, temporary crown in 14 min); for an economical entry into digital, <b>Creality Halot-Sky 6K</b> (±15 µm in the enhanced version). If you're not sure, use the <a href=\"#karsilastir\">comparison</a> above or consult our team."),
      },
      {
        question: tLocalized("385 nm mi, 405 nm mi? Fark ne?", "385 nm or 405 nm? What's the difference?"),
        answerHtml:
          tLocalized("<b>385 nm</b> dalga boyu, çoğu dental reçinenin kürlenme spektrumuna daha iyi uyar; parazit ışığı azaltır ve daha keskin marjinler sağlar. MASH P16L bu yüzden profesyonel 385 nm UV kaynağı kullanır. Detaylı karşılaştırma için Mash Academy'deki <a href=\"/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi\">385nm mi 405nm mi?</a> yazısına bakabilirsiniz.", "The <b>385 nm</b> wavelength matches the curing spectrum of most dental resins better; it reduces stray light and provides sharper margins. That's why the MASH P16L uses a professional 385 nm UV source. For a detailed comparison, see the <a href=\"/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi\">385nm or 405nm?</a> article on Mash Academy."),
      },
      {
        question: tLocalized("Gizli lisans veya RFID reçine ücreti var mı?", "Is there a hidden license or RFID resin fee?"),
        answerHtml:
          tLocalized("<b>Hayır.</b> 3mash yazıcılarında gizli lisans veya RFID kilidi yoktur. Cihazı bir marka reçineye mahkûm etmiyoruz; dilediğiniz reçineyle çalışabilir, maliyetinizi kendiniz kontrol edebilirsiniz.", "<b>No.</b> 3mash printers have no hidden license or RFID lock. We don't tie the device to a single resin brand; you can work with any resin you like and control your own costs."),
      },
      {
        question: tLocalized("Ne sıklıkta kalibrasyon gerekir?", "How often is calibration required?"),
        answerHtml:
          tLocalized("Sık sık değil. MASH P16L <b>8 nokta dikey kilit</b> sayesinde aylarca stabil kalır; Mash CURIE M1 <b>6 aya kadar</b> kalibrasyon gerektirmez. Böylece her gün aynı doğrulukta baskı alırsınız.", "Not often. Thanks to its <b>8-point vertical lock</b>, the MASH P16L stays stable for months; the Mash CURIE M1 requires no calibration for <b>up to 6 months</b>. This way, you get the same accuracy in every print, every day."),
      },
      {
        question: tLocalized("Başka marka reçineyle çalışır mı?", "Does it work with another brand's resin?"),
        answerHtml:
          tLocalized("Evet. 3mash yazıcıları marka bağımsızdır. Dahası teknik ekibimiz, kullandığınız reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> en iyi sonucu almanızı sağlar.", "Yes. 3mash printers are brand-independent. What's more, our technical team ensures you get the best results by <b>calibrating the resin together with your device's parameters</b>."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Doğru yazıcıyı", "The right printer"),
    titleEmphasis: tLocalized("birlikte seçelim.", "let's choose it together."),
    descriptionHtml:
      tLocalized("Hangi işler, hangi hacim, hangi bütçe? Kısa bir görüşmeyle size en uygun cihazı, reçineyi ve doğru parametreleri <b>ücretsiz</b> önerelim — elinizdeki cihazı da değerlendiririz.", "Which jobs, which volume, which budget? With a short conversation, let's recommend the most suitable device, resin, and correct parameters for you <b>free of charge</b> — we'll also evaluate the device you already have."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Karşılaştırmaya dön", "Back to comparison"), href: "#karsilastir", variant: "inverse" },
    ],
  },
};
}

export function washCureCategoryData(): CategoryLandingData {
  return {
  kind: "wash-cure",
  announcement: {
    highlight: tLocalized("⚡ Baskı sonrası sonucu sabitleyin", "⚡ Lock in your post-print result"),
    text: tLocalized("Yıkama ve kürleme kritik; W1E ve C1E cihazlarını birlikte kullanın.", "Washing & curing critical; choose W1E and C1E together."),
    href: "#cihaz",
    ctaText: tLocalized("Cihaza git →", "Go to device →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Yıkama Kürleme Cihazları", "Washing Curing Devices"),
  },
  hero: {
    titlePrefix: tLocalized("Baskı bittiğinde", "When printing finishes"),
    titleEmphasis: tLocalized("sonuç daha bitmedi.", "the result isn't finished yet."),
    descriptionHtml:
      tLocalized("Yıkama ve post-curing, dental 3D baskıda yüzey temizliğini, mekanik dayanımı ve ölçü stabilitesini tamamlayan adımdır. Doğru cihaz; reçinenin protokolünü, ışık dalga boyunu ve laboratuvar iş akışını aynı çizgide tutar.", "Washing and post-curing are the steps that complete surface cleanliness, mechanical strength, and dimensional stability in dental 3D printing. The right device keeps the resin's protocol, light wavelength, and lab workflow aligned."),
    buttons: [
      { label: tLocalized("Yıkama & kürleme cihazını incele ↓", "Browse the washing & curing device ↓"), href: "#cihaz", variant: "lime" },
      { label: tLocalized("Akışı birlikte kuralım", "Let's set up the workflow together"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "3", emphasis: "cihaz", label: tLocalized("yıkama ve kürleme adımları", "washing and curing steps") },
      { value: "360", emphasis: "°", label: tLocalized("C1E ışık sistemi", "C1E light system") },
      { value: "24", emphasis: "LED", label: tLocalized("C1E UV kürleme düzeni", "C1E UV curing setup") },
      { value: "16.453", emphasis: "TRY", label: tLocalized("W1E başlangıç fiyatı", "W1E starting price") },
    ],
  },
  selector: {
    anchorId: "cihaz",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("CİHAZLAR", "DEVICES"),
    titlePrefix: tLocalized("Baskı sonrası için", "For after printing"),
    titleEmphasis: tLocalized("iki tamamlayıcı adım.", "two complementary steps."),
    sideHtml:
      tLocalized("<b>Mash W1E</b> baskı sonrası yıkama adımını, <b>Mash C1E</b> ise UV kürleme adımını kontrol altına alır. Birlikte kullanıldığında reçine baskı sonrası temiz yüzey, dengeli kürleme ve tekrar edilebilir sonuç için net bir akış oluşturur.", "The <b>Mash W1E</b> takes control of the post-print washing step, while the <b>Mash C1E</b> takes control of the UV curing step. Used together, they create a clear workflow for a clean surface, balanced curing, and repeatable results after resin printing."),
    products: [
      {
        title: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
        descriptionHtml:
          tLocalized("3D baskı sonrası parçaların yüzeyindeki reçine kalıntılarını temizlemek için konumlanan <b>ultrasonik yıkama</b> cihazı.", "An <b>ultrasonic washing</b> device positioned to clean resin residue from the surface of parts after 3D printing."),
        href: tLocalized("/mash-w1e-ultrasonik-yikama-cihazi", "/mash-w1e-ultrasonik-yikama-cihazi"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2ed9f9dd-4203-4c95-9dd3-c9e321bdd354/1080/mash-w1e-washing-device.webp",
        imageAlt: tLocalized("Mash W1E ultrasonik yıkama cihazı", "Mash W1E ultrasonic washing device"),
        tag: tLocalized("YIKAMA", "WASHING"),
        status: "",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("İşlem", "Process"), value: tLocalized("Ultrasonik yıkama", "Ultrasonic washing") },
          { label: tLocalized("Akış", "Workflow"), value: tLocalized("Baskı sonrası temizlik", "Post-print cleaning") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Yıkama", "Washing") },
        ],
      },
      {
        title: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
        descriptionHtml:
          tLocalized("24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle dental reçine baskılar için <b>UV post-curing</b> cihazı.", "A <b>UV post-curing</b> device for dental resin prints, with a 24-LED 360° light system and 360-530 nm wide spectrum support."),
        href: tLocalized("/mash-c1e-uv-kurleme-cihazi", "/mash-c1e-uv-kurleme-cihazi"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e7c22c86-93e4-4c53-92f8-969d358e0c0f/1080/mash-c1e-dental-post-cure-cihazi.webp",
        imageAlt: tLocalized("Mash C1E UV kürleme cihazı", "Mash C1E UV curing device"),
        tag: tLocalized("KÜRLEME", "CURING"),
        status: "",
        tone: "#F2F8DC",
        specs: [
          { label: tLocalized("Işık", "Light"), value: "360° / 24 LED" },
          { label: tLocalized("Spektrum", "Spectrum"), value: tLocalized("360-530 nm", "360-530nm") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Kürleme", "Curing") },
        ],
      },
      {
        title: tLocalized("Creality UW02 - Yıkama & Kürleme Cihazı", "Creality UW02 - Washing & Curing Device"),
        descriptionHtml:
          tLocalized("Reçine 3D baskılar için yıkama ve UV kürleme adımlarını <b>tek post-process akışında</b> toplayan cihaz.", "A device that combines the washing and UV curing steps for resin 3D prints <b>in a single post-processing workflow</b>."),
        href: "/creality-washcure-uw-02",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
        imageAlt: tLocalized("Creality UW02 yıkama ve kürleme cihazı", "Creality UW02 washing and curing device"),
        tag: tLocalized("YIKAMA + KÜRLEME", "WASHING + CURING"),
        status: "",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("İşlem", "Process"), value: tLocalized("Yıkama + kürleme", "Washing + curing") },
          { label: "UV", value: tLocalized("365 / 405 nm", "365/405nm") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Post-process", "post-processing") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Akış", "Workflow") },
        { title: tLocalized("Yıkama", "Washing") },
        { title: tLocalized("Kürleme", "Curing") },
        { title: tLocalized("Birlikte", "Together") },
      ],
      rows: [
        { label: tLocalized("Amaç", "Purpose"), values: [tLocalized("Baskı sonrası yüzey temizliği", "Post-print surface cleaning"), tLocalized("Mekanik değerleri tamamlamak", "Completing the mechanical values"), tLocalized("Yazıcı, reçine ve post-process uyumu", "Printer, resin, and post-process compatibility")] },
        { label: tLocalized("Cihaz", "Device"), values: [tLocalized("Mash W1E Ultrasonik Yıkama", "Mash W1E Ultrasonic Washing"), tLocalized("Mash C1E UV Kürleme", "Mash C1E UV Curing"), tLocalized("W1E + C1E birlikte planlanır", "W1E + C1E planned together")] },
        { label: tLocalized("Kontrol", "Control"), values: [tLocalized("Fazla reçine kalıntısını azaltmak", "Reducing excess resin residue"), tLocalized("UV ışıkla son dayanımı desteklemek", "Supporting final strength with UV light"), tLocalized("Reçine protokolüne göre süre ve işlem akışı", "Duration and workflow according to the resin protocol")] },
      ],
      noteHtml:
        tLocalized("Yıkama ve kürleme cihazını iş akışınıza göre değerlendirmeniz için ürün bilgileri tek ekranda karşılaştırılır.", "Product information is compared on a single screen to help you evaluate the washing and curing device based on your workflow."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MASH W1E + MASH C1E", "MASH W1E + MASH C1E"),
      titlePrefix: tLocalized("Yıkama ve kürleme", "Washing and curing"),
      titleEmphasis: tLocalized("ayrı ayrı kontrol edilir.", "checked separately."),
      descriptionHtml:
        tLocalized("W1E yıkama adımında yüzeyi hazırlar; C1E, 24 LED'li 360° ışık sistemiyle UV post-curing sürecini tamamlar. Böylece baskı sonrası akış iki net cihazla yönetilir.", "The W1E prepares the surface during the washing step; the C1E completes the UV post-curing process with its 24-LED 360° light system. This way the post-print workflow is managed with two clear devices."),
      href: tLocalized("/mash-c1e-uv-kurleme-cihazi", "/mash-c1e-uv-kurleme-cihazi"),
      ctaText: tLocalized("C1E detayına git →", "Go to C1E details →"),
      specs: [
        { label: tLocalized("Yıkama", "Washing"), value: tLocalized("Mash W1E", "Mash W1E") },
        { label: tLocalized("Kürleme", "Curing"), value: tLocalized("Mash C1E", "Mash C1E") },
        { label: tLocalized("C1E ışık sistemi", "C1E light system"), value: "360° / 24 LED" },
        { label: tLocalized("C1E spektrum", "C1E spectrum"), value: tLocalized("360-530 nm", "360-530nm") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("NEDEN GEREKLİ", "WHY IT'S NEEDED"),
    titlePrefix: tLocalized("Kürleme,", "Curing,"),
    titleEmphasis: tLocalized("sonucu tamamlar.", "completes the result."),
    sideHtml:
      tLocalized("Yazıcı ve reçine doğru olsa bile baskı sonrası işlem eksikse yüzey, dayanım ve ölçü stabilitesi beklendiği gibi oluşmaz.", "Even if the printer and resin are correct, if post-processing is missing, the surface, strength, and dimensional stability will not turn out as expected."),
    whyCards: [
      { number: "01", title: tLocalized("Yüzey temizliği", "Surface cleaning"), descriptionHtml: tLocalized("Yıkama adımı baskı üzerindeki fazla reçineyi temizler; sonraki kürleme için yüzeyi hazırlar.", "The washing step cleans excess resin on the print; it prepares the surface for the subsequent curing.") },
      { number: "02", title: tLocalized("Mekanik değerler", "Mechanical values"), descriptionHtml: tLocalized("Post-curing, reçinenin hedef dayanımına yaklaşması için gereken tamamlayıcı adımdır.", "Post-curing is the complementary step required for the resin to approach its target strength.") },
      { number: "03", title: tLocalized("Protokol uyumu", "Protocol compliance"), descriptionHtml: tLocalized("Cihaz seçimi reçine protokolüyle birlikte düşünülmeli; süre ve ışık uyumu sonucu doğrudan etkiler.", "Device selection should be considered together with the resin protocol; duration and light compatibility directly affect the result.") },
      { number: "04", title: tLocalized("Teknik destek", "Technical support"), descriptionHtml: tLocalized("3mash ekibi cihaz, reçine ve yazıcı parametrelerini birlikte değerlendirerek doğru akışı kurmanıza yardımcı olur.", "The 3mash team helps you establish the right workflow by evaluating the device, resin, and printer parameters together.") },
    ],
    callout: {
      titlePrefix: tLocalized("Yazıcı + reçine +", "Printer + resin +"),
      titleEmphasis: tLocalized("kürleme.", "curing."),
      descriptionHtml:
        tLocalized("Dental baskıda güvenilir sonuç üç adımın birlikte çalışmasıyla çıkar. Yıkama/kürleme cihazı, bu zincirin son halkasını kontrol altına alır.", "A reliable result in dental printing comes from three steps working together. The washing/curing device controls the last link in this chain."),
      buttons: [
        { label: tLocalized("Uyumlu reçineleri gör →", "See compatible resins →"), href: "/dental-3d-yazici-recineleri", variant: "dark" },
        { label: tLocalized("3D yazıcılara git →", "Go to 3D printers →"), href: "/3d-yazicilar", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Yıkama ve kürleme seçerken merak edilenler.", "Frequently asked questions when choosing washing and curing."),
    sideHtml: tLocalized("Baskı sonrası işlemin dental sonuç üzerindeki etkisini net cevaplarla özetledik.", "We summarized the effect of post-processing on the dental outcome with clear answers."),
    items: [
      {
        question: tLocalized("Yıkama kürleme cihazı neden gerekli?", "Why is a washing-curing device necessary?"),
        answerHtml:
          tLocalized("Baskıdan çıkan parçanın yüzeyindeki fazla reçinenin temizlenmesi ve materyalin hedef mekanik değerlere ulaşması için yıkama ve post-curing adımı gerekir.", "A washing and post-curing step is required to clean excess resin from the surface of a printed part and to bring the material to its target mechanical values."),
      },
      {
        question: tLocalized("Bu kategoride hangi ürün var?", "Which product is in this category?"),
        answerHtml:
          tLocalized("Bu kategoride Mash W1E Ultrasonik Yıkama Cihazı, Mash C1E UV Kürleme Cihazı ve Creality UW02 - Yıkama & Kürleme Cihazı birlikte konumlanır.", "This category features the Mash W1E Ultrasonic Washing Device, the Mash C1E UV Curing Device, and the Creality UW02 - Washing & Curing Device together."),
      },
      {
        question: tLocalized("C1E hangi ışık sistemiyle çalışır?", "Which light system does the C1E work with?"),
        answerHtml:
          tLocalized("Mash C1E, 24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle dental reçine baskıların UV post-curing adımını destekler.", "The Mash C1E supports the UV post-curing step of dental resin prints with its 24-LED 360° light system and wide 360-530 nm spectrum support."),
      },
      {
        question: tLocalized("Yazıcı ve reçine doğruysa kürleme yine de önemli mi?", "Does curing still matter if the printer and resin are correct?"),
        answerHtml:
          tLocalized("Evet. Reçine ve yazıcı doğru seçilse bile yanlış veya eksik post-curing dayanım, yüzey kalitesi ve stabiliteyi etkileyebilir.", "Yes. Even if the resin and printer are chosen correctly, incorrect or incomplete post-curing can affect strength, surface quality, and stability."),
      },
      {
        question: tLocalized("Hangi protokolü kullanmalıyım?", "Which protocol should I use?"),
        answerHtml:
          tLocalized("Kullanılan reçineye ve baskı tipine göre süre/ışık protokolü değişebilir. Emin değilseniz cihaz, reçine ve yazıcı bilginizle ekibimize danışın.", "The time/light protocol may vary depending on the resin used and the print type. If you're not sure, consult our team with your device, resin, and printer information."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Baskı sonrası akışı", "Post-print workflow"),
    titleEmphasis: tLocalized("birlikte kuralım.", "let's build it together."),
    descriptionHtml:
      tLocalized("Hangi yazıcı, hangi reçine, hangi parça tipi? Kısa bir görüşmeyle yıkama ve kürleme adımını iş akışınıza göre birlikte netleştirelim.", "Which printer, which resin, which part type? With a short conversation, let's clarify the washing and curing step together according to your workflow."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Cihazlara dön", "Back to devices"), href: "#cihaz", variant: "inverse" },
    ],
  },
};
}

export function washingCategoryData(): CategoryLandingData {
  return {
  kind: "washing",
  announcement: {
    highlight: tLocalized("⚡ Baskı sonrası temizlikte kayıp yaşamayın", "⚡ Don't lose out on post-print cleaning"),
    text: tLocalized("Reçine baskı sonrası yüzey temizliği için W1E Ultrasonik Yıkama Cihazı ile hassas ve hızlı arındırma.", "Precise and fast cleaning with the W1E Ultrasonic Washing Device for surface cleaning after resin printing."),
    href: "#cihaz",
    ctaText: tLocalized("Yıkama cihazını incele →", "Browse the washing device →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Dental Yıkama Cihazları", "Dental Washing Devices"),
  },
  hero: {
    titlePrefix: tLocalized("Baskı sonrası", "After printing"),
    titleEmphasis: tLocalized("kusursuz yüzey,", "flawless surface,"),
    titleSuffix: tLocalized("yıkamayla başlar.", "starts with washing."),
    descriptionHtml:
      tLocalized("Dental 3D baskıdan çıkan parçaların yüzeyinde kalan fazla sıvı reçineyi ultrasonik titreşimlerle mikro detaylardan uzaklaştırır. Kürleme öncesi homojen, temiz ve yapışkanlıktan arınmış yüzey kalitesi sağlar.", "It removes excess liquid resin left on the surface of dental 3D printed parts from micro details using ultrasonic vibrations. It provides a homogeneous, clean, tack-free surface quality before curing."),
    buttons: [
      { label: tLocalized("Yıkama cihazını incele ↓", "Browse the washing device ↓"), href: "#cihaz", variant: "lime" },
      { label: tLocalized("İş akışına danış", "Consult the workflow"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "Ultrasonik", emphasis: tLocalized("yıkama", "Washing"), label: tLocalized("mikro boşluklarda derinlemesine temizlik", "deep cleaning in micro gaps") },
      { value: "16.453", emphasis: "TRY", label: tLocalized("W1E başlangıç fiyatı", "W1E starting price") },
      { value: "Hassas", emphasis: tLocalized("arındırma", "purification"), label: tLocalized("parça geometrisine zarar vermez", "does not damage the part geometry") },
      { value: tLocalized("Kürleme", "Curing"), emphasis: tLocalized("öncesi", "before"), label: tLocalized("homojen post-curing için hazır yüzey", "ready surface for homogeneous post-curing") },
    ],
  },
  selector: {
    anchorId: "cihaz",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("YIKAMA CİHAZLARI", "WASHING DEVICES"),
    titlePrefix: tLocalized("Baskı sonrası için", "For after printing"),
    titleEmphasis: tLocalized("ultrasonik temizleme gücü.", "ultrasonic cleaning power."),
    sideHtml:
      tLocalized("<b>Mash W1E</b>, baskı sonrası yıkama adımını kontrol altına alarak yüzeydeki fazla reçineyi hızlı ve güvenli biçimde temizler.", "The <b>Mash W1E</b> takes control of the post-print washing step, quickly and safely cleaning excess resin from the surface."),
    products: [
      {
        title: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
        descriptionHtml:
          tLocalized("3D baskı sonrası parçaların yüzeyindeki reçine kalıntılarını temizlemek için konumlanan <b>ultrasonik yıkama</b> cihazı.", "An <b>ultrasonic washing</b> device positioned to clean resin residue from the surface of parts after 3D printing."),
        href: tLocalized("/mash-w1e-ultrasonik-yikama-cihazi", "/mash-w1e-ultrasonik-yikama-cihazi"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2ed9f9dd-4203-4c95-9dd3-c9e321bdd354/1080/mash-w1e-washing-device.webp",
        imageAlt: tLocalized("Mash W1E ultrasonik yıkama cihazı", "Mash W1E ultrasonic washing device"),
        tag: tLocalized("YIKAMA", "WASHING"),
        status: "",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("İşlem", "Process"), value: tLocalized("Ultrasonik yıkama", "Ultrasonic washing") },
          { label: tLocalized("Akış", "Workflow"), value: tLocalized("Baskı sonrası temizlik", "Post-print cleaning") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Yıkama", "Washing") },
        ],
      },
      {
        title: tLocalized("Creality UW02 - Yıkama & Kürleme Cihazı", "Creality UW02 - Washing & Curing Device"),
        descriptionHtml:
          tLocalized("Reçine 3D baskılar için yıkama ve UV kürleme adımlarını <b>tek post-process akışında</b> toplayan cihaz.", "A device that combines the washing and UV curing steps for resin 3D prints <b>in a single post-processing workflow</b>."),
        href: "/creality-washcure-uw-02",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
        imageAlt: tLocalized("Creality UW02 yıkama ve kürleme cihazı", "Creality UW02 washing and curing device"),
        tag: tLocalized("YIKAMA SEÇENEĞİ", "WASHING OPTION"),
        status: "",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("İşlem", "Process"), value: tLocalized("Geniş yıkama haznesi", "Large wash chamber") },
          { label: tLocalized("Uyumluluk", "Compatibility"), value: tLocalized("Büyük tablalarla uyumlu", "Compatible with large plates") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Yıkama", "Washing") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Özellik", "Feature") },
        { title: tLocalized("Mash W1E", "Mash W1E"), subtitle: tLocalized("Ultrasonik Yıkama", "Ultrasonic Washing") },
        { title: tLocalized("Creality UW02", "Creality UW02"), subtitle: tLocalized("Kombine Yıkama", "Combined Washing") },
      ],
      rows: [
        { label: tLocalized("Temizleme Teknolojisi", "Cleaning Technology"), values: ["<b>Ultrasonik kavitasyon</b>", tLocalized("Pervaneli girdap akışı", "Propeller vortex flow")] },
        { label: tLocalized("Mikro Boşluk Temizliği", "Micro-Gap Cleaning"), values: [tLocalized("<b>Çok yüksek</b> (kole & marjin)", "<b>Very high</b> (cervical & margin)"), tLocalized("Standart", "Standard")] },
        { label: tLocalized("Yüzey Bütünlüğü", "Surface Integrity"), values: [tLocalized("Hassas parçalara zarar vermez", "Does not damage delicate parts"), "Girdap hareketli"] },
        { label: tLocalized("En Uygun Akış", "Best-fit Workflow"), values: [tLocalized("Hassas kron, köprü, model ve rehber", "Precise crowns, bridges, models, and guides"), tLocalized("Büyük modeller ve genel akış", "Large models and general workflow")] },
      ],
      noteHtml:
        tLocalized("Yıkama cihazını laboratuvarınızın baskı hacmi ve hassasiyet ihtiyacına göre değerlendirin.", "Evaluate the washing device based on your lab's print volume and precision needs."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MASH W1E · ULTRASONİK YIKAMA", "MASH W1E · ULTRASONIC WASHING"),
      titlePrefix: tLocalized("Kürleme öncesi,", "Before curing,"),
      titleEmphasis: tLocalized("mikron seviyesinde temizlik.", "Cleaning at micron level."),
      descriptionHtml:
        tLocalized("Parça üzerindeki kürlenmemiş reçine kalıntıları giderilmezse, kürleme anında marjin detayları kaybolur ve boyutsal sapmalar oluşur. W1E ultrasonik kavitasyon dalgalarıyla en dar aralıklara kadar homojen temizlik sağlar.", "If uncured resin residue on the part is not removed, margin details are lost during curing and dimensional deviations occur. The W1E provides homogeneous cleaning down to the narrowest gaps with ultrasonic cavitation waves."),
      href: tLocalized("/mash-w1e-ultrasonik-yikama-cihazi", "/mash-w1e-ultrasonik-yikama-cihazi"),
      ctaText: tLocalized("W1E detayına git →", "Go to W1E details →"),
      specs: [
        { label: tLocalized("İşlem", "Process"), value: tLocalized("Ultrasonik yıkama", "Ultrasonic washing") },
        { label: tLocalized("Akış", "Workflow"), value: tLocalized("Baskı sonrası temizlik", "Post-print cleaning") },
        { label: tLocalized("Temizlik", "Cleaning"), value: "Mikron hassasiyetinde" },
        { label: tLocalized("Hazırlık", "Preparation"), value: tLocalized("Post-curing öncesi", "Before post-curing") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("NEDEN YIKAMA KRİTİK", "WHY WASHING IS CRITICAL"),
    titlePrefix: tLocalized("Yüzey temizliği,", "Surface cleaning,"),
    titleEmphasis: tLocalized("sonucun temelidir.", "is the basis of the result."),
    sideHtml:
      tLocalized("Doğru yıkanmamış bir parça, en iyi kürleme cihazına girse bile optik ve mekanik kalitesini kaybeder.", "A part that hasn't been properly washed loses its optical and mechanical quality even if it goes into the best curing device."),
    whyCards: [
      { number: "01", title: tLocalized("Marjin netliği", "Margin clarity"), descriptionHtml: tLocalized("Fazla reçine marjin basamaklarında birikmez; kron ve köprülerin ağıza tam oturmasını güvenceye alır.", "Excess resin does not build up at margin steps, ensuring crowns and bridges seat properly in the mouth.") },
      { number: "02", title: tLocalized("Kürleme verimi", "Curing efficiency"), descriptionHtml: tLocalized("Kürlenmemiş sıvı film tabakasını uzaklaştırarak UV ışığının doğrudan parça yüzeyine nüfuz etmesini sağlar.", "Removes the uncured liquid film layer, allowing UV light to penetrate directly into the part's surface.") },
      { number: "03", title: tLocalized("Yüzey pürüzsüzlüğü", "Surface smoothness"), descriptionHtml: tLocalized("Yapışkanlık hissini ortadan kaldırır, pürüzsüz ve temiz dental restorasyon yüzeyleri oluşturur.", "Eliminates the tacky feel, creating smooth, clean dental restoration surfaces.") },
      { number: "04", title: tLocalized("Süre tasarrufu", "Time savings"), descriptionHtml: tLocalized("Manuel fırçalama veya uzun süreli solvent temasını azaltır, tekrarlanabilir iş akışı sunar.", "Reduces manual brushing or prolonged solvent contact, offering a repeatable workflow.") },
    ],
    callout: {
      titlePrefix: tLocalized("Yıkama tamamlandıktan sonra:", "Once washing is complete:"),
      titleEmphasis: tLocalized("akıllı kürleme adımı.", "the smart curing step."),
      descriptionHtml:
        tLocalized("Temizlenen parçalar hedef mekanik dayanım ve biyouyumluluk değerine ulaşmak için UV kürleme cihazına aktarılır.", "Cleaned parts are transferred to the UV curing device to reach the target mechanical strength and biocompatibility values."),
      buttons: [
        { label: tLocalized("Kürleme cihazlarını gör →", "See curing devices →"), href: tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"), variant: "dark" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Yıkama cihazları hakkında merak edilenler.", "Frequently asked questions about washing devices."),
    sideHtml: tLocalized("Ultrasonik yıkamanın dental iş akışındaki önemini net cevaplarla yanıtladık.", "We answered the key questions about the importance of ultrasonic washing in the dental workflow."),
    items: [
      {
        question: tLocalized("Dental 3D baskıda ultrasonik yıkama neden gereklidir?", "Why is ultrasonic washing necessary in dental 3D printing?"),
        answerHtml:
          tLocalized("Ultrasonik kavitasyon, manuel temizliğin ulaşamadığı ince kole hatları, interdental boşluklar ve kanal içlerindeki sıvı reçineyi parçaya zarar vermeden tamamen söker.", "Ultrasonic cavitation completely removes liquid resin from fine collar lines, interdental spaces, and canal interiors that manual cleaning cannot reach, without damaging the part."),
      },
      {
        question: tLocalized("W1E ile hangi yıkama sıvıları kullanılabilir?", "Which washing liquids can be used with the W1E?"),
        answerHtml:
          tLocalized("İzopropil Alkol (IPA), etanol veya özel dental reçine temizleme solüsyonlarıyla tam uyumlu olarak kullanılabilir.", "Can be used fully compatible with Isopropyl Alcohol (IPA), ethanol, or special dental resin cleaning solutions."),
      },
      {
        question: tLocalized("Yıkama süresi ne kadar olmalıdır?", "How long should washing take?"),
        answerHtml:
          tLocalized("Kullanılan reçine tipine göre genellikle 2 ila 5 dakika arası ultrasonik banyo yüzey temizliği için yeterlidir.", "Depending on the type of resin used, an ultrasonic bath of generally 2 to 5 minutes is sufficient for surface cleaning."),
      },
      {
        question: tLocalized("Yıkamadan sonra doğrudan kürlemeye geçilebilir mi?", "Can curing begin directly after washing?"),
        answerHtml:
          tLocalized("Yıkama sonrası parçanın yüzeyindeki solventin tamamen buharlaşması ve parçanın kuruması beklendikten sonra kürleme adımına geçilmelidir.", "After washing, wait until the solvent on the surface of the part has completely evaporated and the part has dried before moving to the curing step."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Laboratuvarınız için doğru yıkama akışını", "The right washing workflow for your laboratory"),
    titleEmphasis: tLocalized("birlikte kuralım.", "let's build it together."),
    descriptionHtml:
      tLocalized("Hangi reçineleri kullanıyorsunuz, günlük baskı hacminiz ne kadar? İhtiyacınıza en uygun yıkama protokolünü ücretsiz belirleyelim.", "Which resins do you use, and what is your daily print volume? Let's determine the washing protocol that best fits your needs, free of charge."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Cihazlara dön", "Back to devices"), href: "#cihaz", variant: "inverse" },
    ],
  },
};
}

export function curingCategoryData(): CategoryLandingData {
  return {
  kind: "curing",
  announcement: {
    highlight: tLocalized("⚡ Mekanik dayanım ve biyouyumluluğu tamamlayın", "⚡ Complete your mechanical strength and biocompatibility"),
    text: tLocalized("Mash C1E 24 LED 360° homojen ışık sistemi ile reçinenizin hedef klinik değerlerine ulaşmasını sağlayın.", "With the Mash C1E's 24-LED 360° homogeneous light system, help your resin reach its target clinical values."),
    href: "#cihaz",
    ctaText: tLocalized("Kürleme cihazını incele →", "Review the curing device →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Dental Kürleme Cihazları", "Dental Curing Devices"),
  },
  hero: {
    titlePrefix: tLocalized("Reçinenin gerçek gücü", "The true strength of the resin"),
    titleEmphasis: tLocalized("doğru kürlemeyle", "with correct curing"),
    titleSuffix: tLocalized("ortaya çıkar.", "emerges."),
    descriptionHtml:
      tLocalized("Dental 3D baskıda polimerizasyonun tamamlanması, biyouyumluluk sertifikasyonu ve 140+ MPa bükülme mukavemeti ancak kontrollü <b>UV post-curing</b> ile elde edilir. 24 LED'li 360° ışık düzeni ve 360-530 nm geniş spektrumuyla Mash C1E, parçayı her açıdan eşit sertleştirir.", "In dental 3D printing, complete polymerization, biocompatibility certification, and 140+ MPa flexural strength can only be achieved with controlled <b>UV post-curing.</b> With its 24-LED 360° light array and wide 360-530 nm spectrum, the Mash C1E cures the part evenly from every angle."),
    buttons: [
      { label: tLocalized("Kürleme cihazını incele ↓", "Review the curing device ↓"), href: "#cihaz", variant: "lime" },
      { label: tLocalized("Kürleme protokolü danış", "Consult on curing protocol"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "360", emphasis: "°", label: tLocalized("C1E homojen ışık sistemi · gölgesiz", "C1E homogeneous light system · shadow-free") },
      { value: "24", emphasis: "LED", label: tLocalized("yüksek güçlü UV kürleme matrisi", "high-power UV curing matrix") },
      { value: "360-530", emphasis: "nm", label: tLocalized("tüm dental reçinelerle uyumlu geniş spektrum", "broad-spectrum compatibility with all dental resins") },
      { value: "76.782", emphasis: "TRY", label: tLocalized("C1E profesyonel post-curing fiyatı", "C1E professional post-curing price") },
    ],
  },
  selector: {
    anchorId: "cihaz",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("KÜRLEME CİHAZLARI", "CURING DEVICES"),
    titlePrefix: tLocalized("Dental reçineler için", "For dental resins"),
    titleEmphasis: tLocalized("ileri UV polimerizasyon.", "advanced UV polymerization."),
    sideHtml:
      tLocalized("<b>Mash C1E</b>, 24 LED'li 360° ışık sistemi ve 360-530 nm spektrum desteğiyle dental restorasyonların mekanik dayanımını, şeffaflığını ve biyouyumluluğunu zirveye taşır.", "With its 24-LED 360° light system and 360-530 nm spectrum support, the <b>Mash C1E</b> takes the mechanical strength, transparency, and biocompatibility of dental restorations to their peak."),
    products: [
      {
        title: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
        descriptionHtml:
          tLocalized("24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle dental reçine baskılar için <b>UV post-curing</b> cihazı.", "A <b>UV post-curing</b> device for dental resin prints, with a 24-LED 360° light system and 360-530 nm wide spectrum support."),
        href: tLocalized("/mash-c1e-uv-kurleme-cihazi", "/mash-c1e-uv-kurleme-cihazi"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e7c22c86-93e4-4c53-92f8-969d358e0c0f/1080/mash-c1e-dental-post-cure-cihazi.webp",
        imageAlt: tLocalized("Mash C1E UV kürleme cihazı", "Mash C1E UV curing device"),
        tag: tLocalized("AKILLI KÜRLEME", "SMART CURING"),
        status: "",
        hot: true,
        tone: "#F2F8DC",
        specs: [
          { label: tLocalized("Işık", "Light"), value: "360° / 24 LED" },
          { label: tLocalized("Spektrum", "Spectrum"), value: tLocalized("360-530 nm", "360-530nm") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Kürleme", "Curing") },
        ],
      },
      {
        title: tLocalized("Creality UW02 - Yıkama & Kürleme Cihazı", "Creality UW02 - Washing & Curing Device"),
        descriptionHtml:
          tLocalized("Reçine 3D baskılar için yıkama ve UV kürleme adımlarını <b>tek post-process akışında</b> toplayan cihaz.", "A device that combines the washing and UV curing steps for resin 3D prints <b>in a single post-processing workflow</b>."),
        href: "/creality-washcure-uw-02",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
        imageAlt: tLocalized("Creality UW02 yıkama ve kürleme cihazı", "Creality UW02 washing and curing device"),
        tag: tLocalized("KOMBİNE POST-PROCESS", "COMBINED POST-PROCESS"),
        status: "",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("İşlem", "Process"), value: tLocalized("Döner tablalı kürleme", "Curing with a rotating table") },
          { label: "UV", value: tLocalized("365 / 405 nm", "365/405nm") },
          { label: tLocalized("Kategori", "Category"), value: tLocalized("Kürleme", "Curing") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Özellik", "Feature") },
        { title: tLocalized("Mash C1E", "Mash C1E"), subtitle: tLocalized("Profesyonel Akıllı Kürleme", "Professional Smart Curing") },
        { title: tLocalized("Creality UW02", "Creality UW02"), subtitle: tLocalized("Kombine Cihaz", "Combined Device") },
      ],
      rows: [
        { label: tLocalized("LED Dizilimi", "LED Array"), values: [tLocalized("<b>24 LED / 360° tam çevreleme</b>", "<b>24 LED / 360° full coverage</b>"), tLocalized("Çift sıra dikey LED", "Dual-row vertical LED")] },
        { label: tLocalized("Spektrum Aralığı", "Spectrum Range"), values: [tLocalized("<b>360 - 530 nm (Geniş bant)</b>", "<b>360 - 530 nm (Wide band)</b>"), "385 / 405 nm"] },
        { label: tLocalized("Biyouyumluluk Uyumu", "Biocompatibility Compatibility"), values: ["<b>CE Class IIa protokollerine tam uyum</b>", tLocalized("Standart", "Standard")] },
        { label: tLocalized("Kürleme Homojenliği", "Curing Homogeneity"), values: [tLocalized("Alt, üst ve yanlardan gölgesiz 360°", "Shadowless 360° from bottom, top, and sides"), tLocalized("Tabladan yansımalı", "Reflected from the platform")] },
      ],
      noteHtml:
        tLocalized("Doğru UV kürleme cihazı, dental reçinenin tüm mekanik ve biyouyumluluk potansiyelini ortaya çıkarır.", "The right UV curing device unlocks the full mechanical and biocompatibility potential of the dental resin."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MASH C1E · 360° UV POST-CURING", "MASH C1E · 360° UV POST-CURING"),
      titlePrefix: tLocalized("24 LED ile", "with 24 LEDs"),
      titleEmphasis: tLocalized("gölgesiz ve homojen", "shadow-free and homogeneous"),
      titleSuffix: tLocalized("polimerizasyon.", "polymerization"),
      descriptionHtml:
        tLocalized("Geleneksel kürleme kutularında tabanın altı veya iç kaviteler eksik kürlenir. C1E, 360 derece yerleştirilmiş 24 adet yüksek çıkışlı LED ile tüm yüzeyleri eşit sürede kürler; artık monomer salınımını sıfıra indirir.", "In conventional curing boxes, the underside or internal cavities are undercured. The C1E cures all surfaces evenly with 24 high-output LEDs placed at 360 degrees, reducing residual monomer release to zero."),
      href: tLocalized("/mash-c1e-uv-kurleme-cihazi", "/mash-c1e-uv-kurleme-cihazi"),
      ctaText: tLocalized("C1E ürün detayına git →", "Go to C1E product details →"),
      specs: [
        { label: tLocalized("LED Sayısı", "Number of LEDs"), value: tLocalized("24 Adet Yüksek Güçlü", "24 High-Power") },
        { label: tLocalized("Işık Açısı", "Light Angle"), value: tLocalized("360° Çepeçevre", "360° All-Around") },
        { label: tLocalized("Dalga Boyu", "Wavelength"), value: "360 - 530 nm" },
        { label: tLocalized("Sonuç", "Result"), value: tLocalized("Maksimum Bükülme Dayanımı", "Maximum Flexural Strength") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("NEDEN KÜRLEME KRİTİK", "WHY CURING IS CRITICAL"),
    titlePrefix: tLocalized("Doğru kürlenmeyen parça,", "A part that is not properly cured,"),
    titleEmphasis: tLocalized("ağızda kırıma uğrar.", "fractures in the mouth."),
    sideHtml:
      tLocalized("Baskıdan çıkan parça henüz %70-80 polimerizedir. Son %20-30'luk mukavemet ve stabilite farkını doğru post-curing tamamlar.", "A part fresh off the printer is only 70-80% polymerized. The right post-curing completes the remaining 20-30% difference in strength and stability."),
    whyCards: [
      { number: "01", title: tLocalized("Maksimum mukavemet", "maximum strength"), descriptionHtml: tLocalized("CRS Composite gibi reçinelerde 144 MPa bükülme direncine ulaşmak için doğru süre ve UV dozu şarttır.", "In resins like CRS Composite, the correct duration and UV dose are essential to reach 144 MPa flexural strength.") },
      { number: "02", title: tLocalized("Biyouyumluluk güvencesi", "Biocompatibility assurance"), descriptionHtml: tLocalized("Ağız içinde kalacak protez ve splintlerde artık monomer kalıntısını yok ederek hasta güvenliği sağlar.", "Ensures patient safety by eliminating residual monomer in dentures and splints that remain in the mouth.") },
      { number: "03", title: tLocalized("Boyutsal kararlılık", "Dimensional stability"), descriptionHtml: tLocalized("Homojen kürleme, parçanın bir tarafının fazla çekip deforme olmasını önler; oklüzyon uyumunu korur.", "Homogeneous curing prevents one side of the part from shrinking excessively and deforming; it preserves occlusal fit.") },
      { number: "04", title: tLocalized("Optik translüsentlik", "Optical translucency"), descriptionHtml: tLocalized("Doğru dalga boyunda kürlenen restorasyonlar sararma yapmaz, doğal diş translüsentliğini korur.", "Restorations cured at the correct wavelength don't yellow and retain natural tooth translucency.") },
    ],
    callout: {
      titlePrefix: tLocalized("Uyumlu reçineler ve parametreler:", "Compatible resins and parameters:"),
      titleEmphasis: tLocalized("üretim uzmanlığı.", "production expertise."),
      descriptionHtml:
        tLocalized("Her reçinenin kürlenme süresi farklıdır. 3mash ekibi olarak sattığımız tüm reçinelerin C1E kürleme parametrelerini kalibre edilmiş olarak teslim ediyoruz.", "Every resin has a different curing time. As the 3mash team, we deliver all the resins we sell with the C1E curing parameters already calibrated."),
      buttons: [
        { label: tLocalized("Dental reçineleri incele →", "Explore dental resins →"), href: "/dental-3d-yazici-recineleri", variant: "dark" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Kürleme cihazları hakkında merak edilenler.", "Frequently asked questions about curing devices."),
    sideHtml: tLocalized("Dental post-curing adımının klinik başarısına dair merak edilen cevaplar.", "Answers to common questions about the clinical success of the dental post-curing step."),
    items: [
      {
        question: tLocalized("UV kürleme cihazı neden bu kadar önemlidir?", "Why is a UV curing device so important?"),
        answerHtml:
          tLocalized("Reçine 3D yazıcıdan çıkan modeller tam mekanik dayanımına henüz ulaşmamıştır. UV post-curing işlemi reçine zincirlerini tamamen bağlayarak sertlik, biyouyumluluk ve elastikiyet değerlerini tamamlar.", "Models coming out of a resin 3D printer have not yet reached their full mechanical strength. The UV post-curing process fully cross-links the resin chains, completing the hardness, biocompatibility, and elasticity values."),
      },
      {
        question: tLocalized("Mash C1E hangi dalga boylarını destekler?", "Which wavelengths does the Mash C1E support?"),
        answerHtml:
          tLocalized("Mash C1E, 360 nm ile 530 nm arasındaki geniş spektrumu destekler; piyasadaki tüm DLP, SLA ve LCD dental reçineleriyle tam uyumludur.", "The Mash C1E supports a wide spectrum between 360 nm and 530 nm and is fully compatible with all DLP, SLA, and LCD dental resins on the market."),
      },
      {
        question: tLocalized("Gölgesiz 360° kürleme neden gereklidir?", "Why is shadow-free 360° curing necessary?"),
        answerHtml:
          tLocalized("Işık tek bir yönden gelirse parçanın altı veya iç kısımları yumuşak kalır, bu da ağızda erken kırılmalara yol açar. 360° dizilim her yüzeyin aynı anda tam sertleşmesini sağlar.", "If light comes from only one direction, the underside or inner parts of the piece remain soft, which leads to early fractures in the mouth. The 360° arrangement ensures every surface fully hardens at the same time."),
      },
      {
        question: tLocalized("Kürleme süresi nasıl belirlenir?", "How is the curing time determined?"),
        answerHtml:
          tLocalized("Kullanılan reçinenin üretici protokolüne göre genellikle 5 ila 20 dakika arasında değişir. C1E üzerinde süre hassas şekilde ayarlanabilir.", "It generally varies between 5 and 20 minutes according to the manufacturer's protocol for the resin used. The time can be precisely adjusted on the C1E."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Kürleme sürecinizi", "Your curing process"),
    titleEmphasis: tLocalized("standarda bağlayalım.", "let's tie it to a standard."),
    descriptionHtml:
      tLocalized("Hangi reçineleri kullanıyorsunuz, hangi endikasyonları basıyorsunuz? C1E akıllı kürleme cihazı ile kliniğinizin/laboratuvarınızın kalite standardını sabitleyelim.", "Which resins do you use, and which indications do you print? Let's lock in your clinic's/lab's quality standard with the C1E smart curing device."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Cihazlara dön", "Back to devices"), href: "#cihaz", variant: "inverse" },
    ],
  },
};
}

export function zirconBlocksCategoryData(): CategoryLandingData {
  return {
  kind: "zircon",
  announcement: {
    highlight: tLocalized("⚡ Zirkon seçimini vaka belirler", "⚡ Case determines the zirconia selection"),
    text: tLocalized("Renk, kalınlık, translüsentlik ve sinterleme akışını birlikte kontrol ederek doğru ArgenZ zirkonu seçin.", "Select the right ArgenZ zirconia by checking color, thickness, translucency, and sintering workflow together."),
    href: "#zirkonlar",
    ctaText: tLocalized("Zirkonları karşılaştır →", "Compare zirconia →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Zirkon Bloklar", "Zirconia Blocks"),
  },
  hero: {
    titlePrefix: tLocalized("Doğru zirkon,", "The right zirconia,"),
    titleEmphasis: tLocalized("vakanın içinde", "within the case"),
    titleSuffix: tLocalized("seçilir.", "is selected."),
    descriptionHtml:
      tLocalized("ArgenZ zirkon bloklarda sonuç; yalnızca diskin kendisinden değil, <b>endikasyon, renk, kalınlık, nesting ve sinterleme protokolünün</b> birlikte doğru kurulmasından gelir. Estetik multilayer geçişten yüksek dayanım isteyen restorasyonlara kadar üç aktif ArgenZ seçeneği aynı kategoride listelenir.", "The result with ArgenZ zirconia blocks comes not just from the disc itself, but from correctly setting up the <b>indication, color, thickness, nesting, and sintering protocol</b> together. Three active ArgenZ options are listed in the same category, ranging from an aesthetic multilayer transition to restorations requiring high strength."),
    buttons: [
      { label: tLocalized("Zirkonları incele ↓", "Browse zirconia ↓"), href: "#zirkonlar", variant: "lime" },
      { label: tLocalized("Vaka uyumunu sor", "Ask about case compliance"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "3", emphasis: tLocalized("ürün", "Ürün"), label: tLocalized("farklı estetik ve dayanım seçenekleri", "different aesthetic and strength options") },
      { value: "850", emphasis: tLocalized("MPa", "MPa"), label: tLocalized("ST Multilayer estetik zirkon dayanımı", "ST Multilayer aesthetic zirconia strength") },
      { value: "1250", emphasis: tLocalized("MPa", "MPa"), label: tLocalized("HT+ ve HT+ Multilayer yüksek dayanım sınıfı", "HT+ and HT+ Multilayer high-strength class") },
      { value: "7.337", emphasis: "TRY", label: tLocalized("başlangıç fiyat aralığı", "starting price range") },
    ],
  },
  selector: {
    anchorId: "zirkonlar",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("ZİRKON SEÇİCİ", "ZIRCONIA SELECTOR"),
    titlePrefix: tLocalized("Estetik, dayanım,", "Aesthetics, strength,"),
    titleEmphasis: tLocalized("gradient.", "gradient"),
    sideHtml:
      tLocalized("Estetik, dayanım ve indikasyon ihtiyacına göre HT+, ST Multilayer ve multilayer seçeneklerini birlikte değerlendirin.", "Evaluate the HT+, ST Multilayer, and multilayer options together based on aesthetics, strength, and indication needs."),
    products: [
      {
        title: tLocalized("ArgenZ HT+ Zirkon Blok", "ArgenZ HT+ Zircon Block"),
        descriptionHtml:
          tLocalized("Dayanım, performans ve estetik dengesini geniş endikasyonlarda kullanmak için konumlanan <b>HT+</b> zirkon blok.", "<b>HT+</b> zirconia block, positioned to apply the balance of strength, performance, and aesthetics across a wide range of indications."),
        href: "/argenz-ht-plus-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/1080/6.webp",
        imageAlt: tLocalized("ArgenZ HT+ Zirkon Blok", "ArgenZ HT+ Zircon Block"),
        tag: tLocalized("HT+", "HT+"),
        status: "",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "1" },
          { label: tLocalized("Dayanım", "Strength"), value: "1250 MPa" },
          { label: tLocalized("Translüsentlik", "Translucency"), value: "45%" },
        ],
      },
      {
        title: tLocalized("ArgenZ ST Multilayer Zirkon Blok", "ArgenZ ST Multilayer Zircon Block"),
        descriptionHtml:
          tLocalized("Lityum disilikata alternatif olacak yüksek geçirgenlik ve doğal dentin geçişi isteyen estetik vakalar için <b>ST Multilayer</b> disk.", "<b>ST Multilayer</b> disk for aesthetic cases that need high translucency and a natural dentin transition as an alternative to lithium disilicate."),
        href: "/argenz-st-multilayer-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/1080/5.webp",
        imageAlt: tLocalized("ArgenZ ST Multilayer Zirkon Blok", "ArgenZ ST Multilayer Zircon Block"),
        tag: tLocalized("ST MULTILAYER", "ST MULTILAYER"),
        status: "",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "2" },
          { label: tLocalized("Dayanım", "Strength"), value: "850 MPa" },
          { label: tLocalized("Translüsentlik", "Translucency"), value: "50%" },
        ],
      },
      {
        title: tLocalized("ArgenZ HT+ Multilayer Zirkon Blok", "ArgenZ HT+ Multilayer Zircon Block"),
        descriptionHtml:
          tLocalized("HT+ materyal dayanımını doğal dentin-mine geçişine benzeyen <b>multilayer gradient</b> ile birleştiren zirkon disk.", "A zirconia disk that combines HT+ material strength with a <b>multilayer gradient</b> resembling the natural dentin-enamel transition."),
        href: "/argenz-ht-multilayer-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/1080/4.webp",
        imageAlt: tLocalized("ArgenZ HT+ Multilayer Zirkon Blok", "ArgenZ HT+ Multilayer Zircon Block"),
        tag: tLocalized("HT+ MULTILAYER", "HT+ MULTILAYER"),
        status: "",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "3" },
          { label: tLocalized("Dayanım", "Strength"), value: "1250 MPa" },
          { label: tLocalized("Geçiş", "Transition"), value: tLocalized("Doğal gradient", "Natural gradient") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Seçim", "Selection") },
        { title: tLocalized("HT+", "HT+"), subtitle: tLocalized("Dayanım dengesi", "Strength balance") },
        { title: tLocalized("ST Multilayer", "ST Multilayer"), subtitle: tLocalized("Estetik geçirgenlik", "Aesthetic translucency") },
        { title: tLocalized("HT+ Multilayer", "HT+ Multilayer"), subtitle: tLocalized("Gradient + güç", "Gradient + strength") },
      ],
      rows: [
        { label: tLocalized("Odak", "Focus"), values: [tLocalized("1250 MPa dayanım ve geniş endikasyon", "1250 MPa strength and wide indication range"), tLocalized("50% translüsentlik ve doğal dentin geçişi", "50% translucency and natural dentin transition"), tLocalized("HT+ dayanımıyla multilayer shade geçişi", "Multilayer shade transition with HT+ strength")] },
        { label: tLocalized("Uygun kullanım", "Proper use"), values: [tLocalized("Full contour, altyapı, dayanım odaklı kron/köprü", "Full contour, substructure, strength-focused crown/bridge"), tLocalized("Estetik anterior ve 1 pontikli 3 üyeye kadar köprü", "Aesthetic anterior and bridges with up to 3 units and 1 pontic"), tLocalized("Doğal gradient istenen güçlü estetik restorasyonlar", "Strong aesthetic restorations requiring a natural gradient")] },
        { label: tLocalized("Kontrol", "Control"), values: [tLocalized("Shrinkage, milling ve sinterleme çevrimi", "Shrinkage, milling, and sintering cycle"), tLocalized("Renk, kalınlık ve disk içi konum", "Color, thickness, and position within the disc"), tLocalized("Nesting yönü, shade doğruluğu ve finishing", "Nesting orientation, shade accuracy, and finishing")] },
      ],
      noteHtml:
        tLocalized("Zirkon blok seçenekleri estetik beklenti, dayanım ve restorasyon tipine göre karşılaştırılır.", "Zirconia block options are compared based on aesthetic expectations, strength, and restoration type."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("ARGENZ HT+ · 1250 MPa · 45%", "ARGENZ HT+ · 1250 MPa · 45%"),
      titlePrefix: tLocalized("Dayanım ve estetik", "Strength and aesthetics"),
      titleEmphasis: tLocalized("aynı diskte.", "on the same disc."),
      descriptionHtml:
        tLocalized("HT+ zirkonya, dayanım korunurken estetik ışık geçirgenliği hedefleyen restorasyonlar için konumlandırılır. Full contour ve altyapı işlerinde CAM shrinkage değeri, milling stratejisi ve sinterleme protokolü birlikte kontrol edilmelidir.", "HT+ zirconia is positioned for restorations that target aesthetic light transmission while preserving strength. In full contour and substructure work, the CAM shrinkage value, milling strategy, and sintering protocol should be checked together."),
      href: "/argenz-ht-plus-zirkon-blok",
      ctaText: tLocalized("HT+ ürün detayına git →", "Go to HT+ product details →"),
      specs: [
        { label: tLocalized("Dayanım", "Strength"), value: "1250 MPa" },
        { label: tLocalized("Translüsentlik", "Translucency"), value: "45%" },
        { label: tLocalized("Marka", "Brand"), value: "Argen" },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Zirkon blok", "zirconia block") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("SEÇİM MANTIĞI", "SELECTION LOGIC"),
    titlePrefix: tLocalized("Zirkon blok,", "zirconia block,"),
    titleEmphasis: tLocalized("tek başına karar değildir.", "is not a decision on its own."),
    sideHtml:
      tLocalized("Aynı materyal farklı vaka, renk ve kalınlıkta farklı sonuç verir. Bu yüzden zirkon seçimi frezeleme ve sinterleme akışıyla birlikte düşünülmelidir.", "The same material gives different results in different cases, colors, and thicknesses. That's why zirconia selection should be considered together with the milling and sintering workflow."),
    whyCards: [
      { number: "01", title: tLocalized("Endikasyon", "Indication"), descriptionHtml: tLocalized("Tek kron, köprü, altyapı veya full contour ihtiyacı materyal tipini belirler.", "The need for a single crown, bridge, substructure, or full contour determines the material type.") },
      { number: "02", title: tLocalized("Renk ve kalınlık", "Color and thickness"), descriptionHtml: tLocalized("Shade seçimi, disk kalınlığı ve multilayer konumlandırma estetik sonucu doğrudan etkiler.", "Shade selection, disc thickness, and multilayer positioning directly affect the aesthetic result.") },
      { number: "03", title: tLocalized("CAM ve shrinkage", "CAM and shrinkage"), descriptionHtml: tLocalized("Disk üzerindeki shrinkage değeri CAM yazılıma doğru girilmeli; nesting stratejisi vaka tipine göre kurulmalıdır.", "The shrinkage value on the disk must be entered correctly into the CAM software; the nesting strategy should be set according to the case type.") },
      { number: "04", title: tLocalized("Sinterleme", "sintering"), descriptionHtml: tLocalized("Fırın çevrimi, sıcaklık ve finishing/glaze adımları zirkon sonucunu tamamlar.", "The furnace cycle, temperature, and finishing/glaze steps complete the zirconia result.") },
    ],
    callout: {
      titlePrefix: tLocalized("Blok + freze +", "block + milling +"),
      titleEmphasis: tLocalized("fırın.", "furnace."),
      descriptionHtml:
        tLocalized("Zirkon restorasyonun güvenilirliği, doğru disk seçimi kadar freze ve sinterleme adımlarının birlikte yönetilmesine bağlıdır.", "The reliability of a zirconia restoration depends as much on managing the milling and sintering steps together as on choosing the right disc."),
      buttons: [
        { label: tLocalized("Dental fırınlara git →", "Go to dental furnaces →"), href: "/dental-firinlar", variant: "dark" },
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Zirkon blok seçerken merak edilenler.", "Frequently asked questions when choosing a zirconia block."),
    sideHtml: tLocalized("Renk, kalınlık, materyal tipi ve sinterleme protokolü için temel karar noktaları.", "Key decision points for color, thickness, material type, and sintering protocol."),
    items: [
      {
        question: tLocalized("Bu kategoride hangi ürünler var?", "Which products are in this category?"),
        answerHtml:
          tLocalized("ArgenZ HT+, ArgenZ ST Multilayer ve ArgenZ HT+ Multilayer seçenekleri farklı estetik ve dayanım ihtiyaçlarına göre konumlanır.", "The ArgenZ HT+, ArgenZ ST Multilayer, and ArgenZ HT+ Multilayer options are positioned for different aesthetic and strength needs."),
      },
      {
        question: tLocalized("ST Multilayer ne zaman seçilir?", "When is ST Multilayer chosen?"),
        answerHtml:
          tLocalized("Yüksek estetik, doğal dentin geçişi ve 50% translüsentlik ihtiyacında ST Multilayer uygun seçenektir.", "For high aesthetics, natural dentin transition, and 50% translucency needs, ST Multilayer is the suitable option."),
      },
      {
        question: tLocalized("HT+ ne zaman seçilir?", "When should HT+ be chosen?"),
        answerHtml:
          tLocalized("Dayanım, full contour veya altyapı restorasyonları ön plandaysa HT+ materyal sınıfı tercih edilir.", "If strength, full-contour, or substructure restorations are the priority, the HT+ material class is preferred."),
      },
      {
        question: tLocalized("HT+ Multilayer farkı nedir?", "What is the difference with HT+ Multilayer?"),
        answerHtml:
          tLocalized("HT+ dayanımını doğal shade gradient ve multilayer geçişle birleştirir; nesting pozisyonu renk sonucunu etkiler.", "It combines HT+ strength with a natural shade gradient and multilayer transition; nesting position affects the color result."),
      },
      {
        question: tLocalized("Satın almadan önce ne kontrol edilmeli?", "What should be checked before purchasing?"),
        answerHtml:
          tLocalized("Endikasyon, renk, kalınlık, CAM shrinkage değeri, freze stratejisi ve sinterleme protokolü birlikte kontrol edilmelidir.", "Indication, color, thickness, CAM shrinkage value, milling strategy, and sintering protocol should be checked together."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Doğru zirkonu", "The right zirconia"),
    titleEmphasis: tLocalized("birlikte seçelim.", "let's choose it together."),
    descriptionHtml:
      tLocalized("Vaka tipi, renk, kalınlık ve fırın akışınızı kısa bir görüşmeyle netleştirip doğru ArgenZ zirkon bloğu birlikte belirleyelim.", "Let's clarify your case type, shade, thickness, and furnace flow in a short call and choose the right ArgenZ zirconia block together."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Zirkonlara dön", "Back to zirconia"), href: "#zirkonlar", variant: "inverse" },
    ],
  },
};
}

export function dentalFurnacesCategoryData(): CategoryLandingData {
  return {
  kind: "furnaces",
  announcement: {
    highlight: tLocalized("⚡ Fırın seçimi iş akışına göre yapılır", "⚡ Furnace selection is based on your workflow"),
    text: tLocalized("Sinterleme, press ve porselen akışını laboratuvar hacminize göre karşılaştırın.", "Compare sintering, press, and porcelain workflows according to your laboratory volume."),
    href: "#firinlar",
    ctaText: tLocalized("Fırınları karşılaştır →", "Compare furnaces →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Dental Fırınlar", "Dental Furnaces"),
  },
  hero: {
    titlePrefix: tLocalized("Restorasyon kalitesi,", "Restoration quality,"),
    titleEmphasis: tLocalized("kontrollü ısıyla", "with controlled heat"),
    titleSuffix: tLocalized("tamamlanır.", "is completed."),
    descriptionHtml:
      tLocalized("Zirkon sinterleme, press seramik ve porselen pişiriminde sonuç; fırın sıcaklığı, çevrim kontrolü ve laboratuvar akışının birlikte kurulmasıyla stabil hale gelir. Naberthem hattı, hızlı sinterleme ihtiyacından vakumlu porselen pişirimine kadar dental üretimin kritik ısı adımlarını kapsar.", "The outcome of zirconia sintering, press ceramic, and porcelain firing becomes stable when furnace temperature, cycle control, and lab workflow are set up together. The Nabertherm line covers the critical heat steps of dental production, from fast sintering needs to vacuum porcelain firing."),
    buttons: [
      { label: tLocalized("Fırınları incele ↓", "Explore furnaces ↓"), href: "#firinlar", variant: "lime" },
      { label: tLocalized("Akışı birlikte planlayalım", "Let's plan the workflow together"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "4", emphasis: tLocalized("ürün", "Ürün"), label: tLocalized("sinterleme ve porselen pişirim seçenekleri", "sintering and porcelain firing options") },
      { value: "1650", emphasis: "°C", label: tLocalized("LHT 02/17 LB Speed maksimum sıcaklık sınıfı", "LHT 02/17 LB Speed maximum temperature class") },
      { value: "1600", emphasis: "°C", label: tLocalized("LHT 01/16 Turbo Fire hızlı sinterleme akışı", "LHT 01/16 Turbo Fire fast sintering workflow") },
      { value: tLocalized("Press", "press"), emphasis: "/ Porselen", label: tLocalized("VL 01/12 LB hattında iki farklı laboratuvar işi", "Two different laboratory jobs on the VL 01/12 LB line") },
    ],
  },
  selector: {
    anchorId: "firinlar",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("FIRIN SEÇİCİ", "FURNACE SELECTOR"),
    titlePrefix: tLocalized("Sinterleme, press,", "Sintering, pressing,"),
    titleEmphasis: tLocalized("porselen.", "porcelain."),
    sideHtml:
      tLocalized("Dental fırın seçimi tek bir teknik değerden ibaret değildir. Zirkon tipi, restorasyon hacmi, press/porselen ihtiyacı ve çevrim süresi birlikte düşünülmelidir.", "Dental furnace selection is not just about a single technical value. Zirconia type, restoration volume, press/porcelain needs, and cycle time should be considered together."),
    products: [
      {
        title: tLocalized("Naberthem LHT 02/17 LB Speed", "Naberthem LHT 02/17 LB Speed"),
        descriptionHtml:
          tLocalized("Zirkonya sinterleme için yüksek sıcaklık sınıfında konumlanan Speed fırın. <b>1650 °C</b> maksimum sıcaklık ve geniş fırın odasıyla yoğun laboratuvar akışına uygundur.", "The Speed furnace, positioned in the high-temperature class for zirconia sintering. With a <b>1650 °C</b> maximum temperature and a large furnace chamber, it suits high-volume laboratory workflows."),
        href: "/naberthem-lht-02-17-lb-speed",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4112bcc1-a205-4063-bb3b-c52112d8dba2/1080/firinlar4.webp",
        imageAlt: tLocalized("Naberthem LHT 02/17 LB Speed dental fırın", "Naberthem LHT 02/17 LB Speed dental furnace"),
        tag: "SINTERLEME",
        status: tLocalized("Teklif alın", "Get a quote"),
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "1" },
          { label: tLocalized("Maksimum", "Maximum"), value: tLocalized("1650 °C", "1650 °C") },
          { label: tLocalized("Akış", "Workflow"), value: tLocalized("Zirkonya sinterleme", "Zirconia sintering") },
        ],
      },
      {
        title: tLocalized("Naberthem LHT 01/16 Turbo Fire", "Naberthem LHT 01/16 Turbo Fire"),
        descriptionHtml:
          tLocalized("Hızlı zirkonyum oksit sinterleme için kompakt çözüm. <b>1600 °C</b> sınıfı ve kısa çevrim ihtiyacı olan tek kron akışlarında öne çıkar.", "A compact solution for fast zirconium oxide sintering. It stands out in single-crown workflows requiring the <b>1600 °C</b> class and short cycles."),
        href: "/naberthem-lht-01-16-turbo-fire",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cef47053-2e60-4139-9089-9aadb5855033/1080/firinlar3.webp",
        imageAlt: tLocalized("Naberthem LHT 01/16 Turbo Fire dental fırın", "Naberthem LHT 01/16 Turbo Fire dental furnace"),
        tag: tLocalized("TURBO FIRE", "TURBO FIRE"),
        status: tLocalized("Teklif alın", "Get a quote"),
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "2" },
          { label: tLocalized("Maksimum", "Maximum"), value: tLocalized("1600 °C", "1600 °C") },
          { label: tLocalized("Süreç", "Process"), value: tLocalized("1 saat", "1 hour") },
        ],
      },
      {
        title: tLocalized("Naberthem VL 01/12 LB Press Furnace", "Naberthem VL 01/12 LB Press Furnace"),
        descriptionHtml:
          tLocalized("Press seramik işleri için kaldırma tablalı dental fırın. Kontrollü fırın çevrimi, presleme akışını laboratuvar standardına bağlar.", "A dental furnace with a lift table for press ceramic work. The controlled furnace cycle ties the pressing workflow to laboratory standards."),
        href: "/naberthem-vl-01-12-lb-press-furnace",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c72ba72c-c628-46f6-ac9d-863e3ccb6d8a/1080/firinlar2.webp",
        imageAlt: tLocalized("Naberthem VL 01/12 LB Press Furnace", "Naberthem VL 01/12 LB Press Furnace"),
        tag: "PRESS",
        status: tLocalized("Teklif alın", "Get a quote"),
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "3" },
          { label: tLocalized("Tip", "Medicine"), value: tLocalized("Pres fırını", "Press furnace") },
          { label: tLocalized("Yapı", "Structure"), value: tLocalized("Kaldırma tabla", "Lift plate") },
        ],
      },
      {
        title: tLocalized("Naberthem VL 01/12 LB Porcelain Furnace", "Naberthem VL 01/12 LB Porcelain Furnace"),
        descriptionHtml:
          tLocalized("Vakumlu ve normal atmosfer porselen pişirimleri için dental fırın. Çepeçevre ısıtma yapısı homojen sıcaklık dağılımını destekler.", "Dental furnace for porcelain firing under vacuum and normal atmosphere. The all-round heating structure supports homogeneous temperature distribution."),
        href: "/naberthem-vl-01-12-lb-porcelain-furnace",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3bfdd659-7c98-4939-8573-8fecb1408edc/1080/washcure-website-kopyasi.webp",
        imageAlt: tLocalized("Naberthem VL 01/12 LB Porcelain Furnace", "Naberthem VL 01/12 LB Porcelain Furnace"),
        tag: "PORCELEN",
        status: tLocalized("Teklif alın", "Get a quote"),
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "4" },
          { label: tLocalized("Atmosfer", "Atmosphere"), value: "Normal / vakum" },
          { label: tLocalized("Isıtma", "Heating"), value: tLocalized("Çepeçevre", "All-round") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Akış", "Workflow") },
        { title: tLocalized("LHT 02/17", "LHT 02/17"), subtitle: tLocalized("yüksek hacim", "high volume") },
        { title: tLocalized("Turbo Fire", "Turbo Fire"), subtitle: tLocalized("hızlı sinterleme", "fast sintering") },
        { title: tLocalized("VL 01/12", "VL 01/12"), subtitle: tLocalized("press / porselen", "press / porcelain") },
      ],
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), values: [tLocalized("Zirkonya sinterleme", "Zirconia sintering"), tLocalized("Hızlı zirkonyum oksit sinterleme", "Fast zirconium oxide sintering"), tLocalized("Press seramik veya porselen pişirim", "Press ceramic or porcelain firing")] },
        { label: tLocalized("Sıcaklık / çevrim", "Temperature / cycle"), values: [tLocalized("1650 °C sınıfı", "1650 °C class"), tLocalized("1600 °C ve 1 saat odaklı akış", "A workflow focused on 1600 °C and 1 hour"), tLocalized("Kontrollü fırın çevrimi", "Controlled furnace cycle")] },
        { label: tLocalized("Seçim notu", "Selection note"), values: [tLocalized("Geniş fırın odası ve yoğun üretim", "Large furnace chamber and high-volume production"), tLocalized("1-3 tek kron gibi hızlı işler", "Quick jobs such as 1-3 single crowns"), tLocalized("İş tipine göre press ya da porselen versiyon", "Press or porcelain version depending on the type of work")] },
      ],
      noteHtml:
        tLocalized("Fırın seçeneklerini sıcaklık, çevrim ve uygulama tipine göre karşılaştırın.", "Compare furnace options by temperature, cycle, and application type."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("NABERTHEM LHT 02/17 LB SPEED", "NABERTHEM LHT 02/17 LB SPEED"),
      titlePrefix: tLocalized("Zirkon sinterleme için", "For zirconia sintering"),
      titleEmphasis: tLocalized("yüksek sıcaklık", "high temperature"),
      titleSuffix: tLocalized("kontrolü.", "control."),
      descriptionHtml:
        tLocalized("LHT 02/17 LB Speed, 1650 °C maksimum sıcaklık sınıfı ve geniş fırın odasıyla zirkonya sinterleme akışında öne çıkar. Elektrikli kaldırma masası ve kontrollü çevrim yapısı, laboratuvar üretimini tekrarlanabilir hale getirmeye yardımcı olur.", "The LHT 02/17 LB Speed stands out in the zirconia sintering workflow with its 1650 °C maximum temperature class and large furnace chamber. Its electric lift table and controlled cycle structure help make laboratory production repeatable."),
      href: "/naberthem-lht-02-17-lb-speed",
      ctaText: tLocalized("Ürün detayına git →", "Go to product details →"),
      specs: [
        { label: tLocalized("Maksimum sıcaklık", "Maximum temperature"), value: tLocalized("1650 °C", "1650 °C") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Zirkonya sinterleme", "Zirconia sintering") },
        { label: tLocalized("Yapı", "Structure"), value: tLocalized("Elektrikli kaldırma masası", "Electric lifting table") },
        { label: tLocalized("Kategori sırası", "Category order"), value: "1" },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("SEÇİM MANTIĞI", "SELECTION LOGIC"),
    titlePrefix: tLocalized("Fırın seçimi,", "Furnace selection,"),
    titleEmphasis: tLocalized("malzemeyle başlar.", "starts with the material."),
    sideHtml:
      tLocalized("Zirkon, press seramik ve porselen pişiriminde aynı fırın mantığı kullanılmaz. Isı aralığı, çevrim süresi, yükleme yapısı ve restorasyon tipi birlikte değerlendirilmelidir.", "The same furnace logic doesn't apply to zirconia, press ceramic, and porcelain firing. Heat range, cycle time, loading structure, and restoration type should be evaluated together."),
    whyCards: [
      { number: "01", title: tLocalized("Sinterleme", "sintering"), descriptionHtml: tLocalized("Zirkonya restorasyonlarda fırın sıcaklığı ve çevrim profili dayanım, renk ve ölçü stabilitesini etkiler.", "In zirconia restorations, furnace temperature and cycle profile affect strength, color, and dimensional stability.") },
      { number: "02", title: tLocalized("Hızlı çevrim", "Fast cycle"), descriptionHtml: tLocalized("Turbo Fire gibi hızlı çözümler, düşük adetli kron işlerinde teslim süresini kısaltmak için konumlanır.", "Fast solutions like Turbo Fire are positioned to shorten delivery time for low-volume crown work.") },
      { number: "03", title: tLocalized("Press", "press"), descriptionHtml: tLocalized("Press seramik akışında kaldırma tabla ve kontrollü çevrim, tekrarlanabilir presleme sonucunu destekler.", "In the press ceramic workflow, the lift table and controlled cycle support a repeatable pressing result.") },
      { number: "04", title: tLocalized("Porselen", "Porcelain"), descriptionHtml: tLocalized("Vakumlu veya normal atmosfer pişirimlerinde homojen ısıtma ve doğru çevrim yüzey kalitesini belirler.", "Homogeneous heating and correct cycling determine surface quality in vacuum or normal-atmosphere firings.") },
    ],
    callout: {
      titlePrefix: tLocalized("Zirkon + fırın +", "Zirconia + furnace +"),
      titleEmphasis: tLocalized("protokol.", "protocol."),
      descriptionHtml:
        tLocalized("Doğru blok seçimi, doğru sinterleme çevrimiyle tamamlanır. Zirkon disk, frezeleme stratejisi ve fırın programını aynı akışta değerlendirin.", "The right block choice is completed with the right sintering cycle. Evaluate the zirconia disk, milling strategy, and furnace program in the same workflow."),
      buttons: [
        { label: tLocalized("Zirkon bloklara git →", "Go to zirconia blocks →"), href: "/zirkon-bloklar", variant: "dark" },
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Dental fırın seçerken merak edilenler.", "Frequently asked questions when choosing a dental furnace."),
    sideHtml: tLocalized("Sinterleme, press ve porselen akışı için temel seçim noktaları.", "Key selection points for sintering, press, and porcelain workflow."),
    items: [
      {
        question: tLocalized("Bu kategoride hangi fırınlar var?", "Which furnaces are in this category?"),
        answerHtml:
          tLocalized("Naberthem LHT 02/17 LB Speed, Naberthem LHT 01/16 Turbo Fire, Naberthem VL 01/12 LB Pres Fırını ve Naberthem VL 01/12 LB Porselen Fırını listelenir.", "Naberthem LHT 02/17 LB Speed, Naberthem LHT 01/16 Turbo Fire, Naberthem VL 01/12 LB Press Furnace, and Naberthem VL 01/12 LB Porcelain Furnace are listed."),
      },
      {
        question: tLocalized("Sinterleme fırını seçerken neye bakılmalı?", "What should be considered when choosing a sintering furnace?"),
        answerHtml:
          tLocalized("Zirkon tipi, restorasyon adedi, maksimum sıcaklık, çevrim süresi, fırın odası hacmi ve laboratuvarın günlük üretim ritmi birlikte değerlendirilmelidir.", "Zirconia type, number of restorations, maximum temperature, cycle time, furnace chamber volume, and the lab's daily production rhythm should be evaluated together."),
      },
      {
        question: tLocalized("Turbo Fire hangi işlerde mantıklı?", "For which work does Turbo Fire make sense?"),
        answerHtml:
          tLocalized("Hızlı zirkonyum oksit sinterleme ihtiyacı olan, özellikle düşük adetli kron işlerinde kısa çevrim avantajı isteyen laboratuvarlar için uygundur.", "Suitable for laboratories that need fast zirconium oxide sintering, especially those wanting a short-cycle advantage for low-quantity crown jobs."),
      },
      {
        question: tLocalized("Press ve porselen fırını aynı şey mi?", "Are press and porcelain furnaces the same thing?"),
        answerHtml:
          tLocalized("Hayır. Press seramik ve porselen pişirim süreçleri farklı ihtiyaçlara sahiptir; VL 01/12 LB hattında bu iki iş için ayrı ürünler bulunur.", "No. Press ceramic and porcelain firing processes have different needs; the VL 01/12 LB line has separate products for these two jobs."),
      },
      {
        question: tLocalized("Zirkon blokla fırın birlikte mi seçilmeli?", "Should the zirconia block and furnace be chosen together?"),
        answerHtml:
          tLocalized("Evet. Zirkon blok materyali, sinterleme protokolü ve fırın çevrimi birlikte düşünülmediğinde renk, dayanım ve ölçü stabilitesi değişebilir.", "Yes. If the zirconia block material, sintering protocol, and furnace cycle are not considered together, color, strength, and dimensional stability can vary."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Laboratuvarınıza uygun fırını", "The furnace suitable for your laboratory"),
    titleEmphasis: tLocalized("birlikte seçelim.", "let's choose it together."),
    descriptionHtml:
      tLocalized("Hangi zirkon, hangi adet, hangi teslim süresi? Kısa bir görüşmeyle sinterleme, press veya porselen akışınız için doğru fırın seçimini netleştirelim.", "Which zirconia, how many units, what delivery time? With a short conversation, let's clarify the right furnace choice for your sintering, press, or porcelain workflow."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Fırınlara dön", "Back to furnaces"), href: "#firinlar", variant: "inverse" },
    ],
  },
};
}

export function desktopScannersCategoryData(): CategoryLandingData {
  return {
  kind: "scanners",
  announcement: {
    highlight: tLocalized("⚡ Tarayıcı seçimi üretim hacmine göre yapılır", "⚡ Scanner selection is based on production volume"),
    text: tLocalized("E2, E3 ve E4 arasındaki farkı laboratuvar iş akışınıza göre karşılaştırın.", "Compare the difference between the E2, E3, and E4 according to your lab workflow."),
    href: "#tarayicilar",
    ctaText: tLocalized("Tarayıcıları karşılaştır →", "Compare scanners →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"),
  },
  hero: {
    titlePrefix: tLocalized("Dijital üretim,", "Digital production,"),
    titleEmphasis: tLocalized("doğru taramayla", "with correct scanning"),
    titleSuffix: tLocalized("başlar.", "begins."),
    descriptionHtml:
      tLocalized("CAD/CAM akışında model verisinin kalitesi, üretimin geri kalanını doğrudan etkiler. 3Shape E serisi; doku taramasından implant bar doğruluğuna, yüksek hacimli tam çene taramaya kadar laboratuvarın tarama ihtiyacını üç farklı seviyede karşılar.", "In the CAD/CAM workflow, the quality of model data directly affects the rest of production. The 3Shape E series meets the lab's scanning needs at three different levels, from tissue scanning to implant bar accuracy and high-volume full-arch scanning."),
    buttons: [
      { label: tLocalized("Tarayıcıları incele ↓", "Review scanners ↓"), href: "#tarayicilar", variant: "lime" },
      { label: tLocalized("Laboratuvarı birlikte eşleyelim", "Let's match the laboratory together"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "3", emphasis: tLocalized("ürün", "Ürün"), label: tLocalized("E2, E3 ve E4 tarayıcı seçenekleri", "E2, E3, and E4 scanner options") },
      { value: "4", emphasis: "μm", label: tLocalized("3Shape E4 hassasiyet bilgisi", "3Shape E4 sensitivity information") },
      { value: "9", emphasis: "sn", label: tLocalized("3Shape E4 tam çene tarama hızı", "3Shape E4 full-arch scanning speed") },
      { value: tLocalized("3Shape", "3Shape"), emphasis: tLocalized("E serisi", "E series"), label: tLocalized("dental laboratuvar CAD/CAM başlangıcı", "dental laboratory CAD/CAM starting point") },
    ],
  },
  selector: {
    anchorId: "tarayicilar",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("TARAYICI SEÇİCİ", "SCANNER SELECTOR"),
    titlePrefix: tLocalized("Doku, implant bar,", "Tissue, implant bar,"),
    titleEmphasis: tLocalized("hız.", "speed."),
    sideHtml:
      tLocalized("Masaüstü tarayıcı seçiminde ilk soru model değil, iş akışıdır. Doku taraması, implant bar doğruluğu ve yüksek hacimli tam çene tarama farklı cihaz seviyeleri gerektirir.", "When choosing a desktop scanner, the first question is not the model but the workflow. Tissue scanning, implant bar accuracy, and high-volume full-arch scanning require different device tiers."),
    products: [
      {
        title: tLocalized("3Shape E2", "3Shape E2"),
        descriptionHtml:
          tLocalized("Diş laboratuvarlarının üretkenliğini artırmak ve <b>doku taraması</b> yapmak için konumlanan masaüstü tarayıcı.", "A desktop scanner positioned to increase dental laboratory productivity and perform <b>tissue scanning</b>."),
        href: "/3shape-e2",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d2937ac4-16ad-4c18-a76e-24a2b26ced24/1080/e2-new-red-2.webp",
        imageAlt: tLocalized("3Shape E2 masaüstü tarayıcı", "3Shape E2 desktop scanner"),
        tag: tLocalized("DOKU TARAMASI", "TISSUE SCAN"),
        status: tLocalized("Teklif alın", "Get a quote"),
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "1" },
          { label: tLocalized("Odak", "Focus"), value: tLocalized("Doku taraması", "Tissue scanning") },
          { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental laboratuvar", "dental laboratory") },
        ],
      },
      {
        title: tLocalized("3Shape E3", "3Shape E3"),
        descriptionHtml:
          tLocalized("Uygun maliyetle yüksek performans sunan, özellikle <b>implant bar doğruluğu</b> için tasarlanmış masaüstü tarayıcı.", "A desktop scanner offering high performance at an affordable cost, designed specifically for <b>implant bar accuracy</b>."),
        href: "/3shape-e3",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0adf4e0d-a7a0-48ef-b2f2-65b9c5719703/1080/e3-new-red.webp",
        imageAlt: tLocalized("3Shape E3 masaüstü tarayıcı", "3Shape E3 desktop scanner"),
        tag: tLocalized("IMPLANT BAR", "IMPLANT BAR"),
        status: tLocalized("Teklif alın", "Get a quote"),
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "2" },
          { label: tLocalized("Odak", "Focus"), value: tLocalized("İmplant bar doğruluğu", "Implant bar accuracy") },
          { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental laboratuvar", "dental laboratory") },
        ],
      },
      {
        title: tLocalized("3Shape E4", "3Shape E4"),
        descriptionHtml:
          tLocalized("E serisinin en güçlü cihazı. <b>4 μm</b> hassasiyet, <b>9 sn</b> tam çene tarama ve dört kamera ile yüksek hacimli işlere odaklanır.", "The most powerful device in the E series. It focuses on high-volume work with <b>4 μm</b> precision, <b>9-second</b> full-arch scanning, and four cameras."),
        href: "/3shape-e4",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f6ee476e-9d5a-4744-b561-b2990f9db4ae/1080/4-1550872.webp",
        imageAlt: tLocalized("3Shape E4 masaüstü tarayıcı", "3Shape E4 desktop scanner"),
        tag: tLocalized("4 μm · 9 sn", "4 μm 9 s"),
        status: tLocalized("Teklif alın", "Get a quote"),
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "3" },
          { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("4 μm", "4μm") },
          { label: tLocalized("Tam çene", "Full arch"), value: "9 sn" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Seçim", "Selection") },
        { title: tLocalized("E2", "E2"), subtitle: tLocalized("doku taraması", "tissue scanning") },
        { title: tLocalized("E3", "E3"), subtitle: tLocalized("implant bar", "implant bar") },
        { title: tLocalized("E4", "E4"), subtitle: tLocalized("hız + hassasiyet", "speed + precision") },
      ],
      rows: [
        { label: tLocalized("Odak", "Focus"), values: [tLocalized("Model ve doku taraması", "Model and tissue scanning"), tLocalized("İmplant bar doğruluğu", "Implant bar accuracy"), tLocalized("4 μm hassasiyet ve 9 sn tam çene", "4 μm precision and 9 sec full-arch")] },
        { label: tLocalized("Laboratuvar tipi", "Laboratory type"), values: [tLocalized("Üretkenliği artırmak isteyen ekipler", "Teams looking to boost productivity"), tLocalized("İmplant işlerinde doğruluk arayan lablar", "Labs seeking accuracy in implant work"), tLocalized("Yüksek hacimli ve hızlı tarama ihtiyacı", "Need for high-volume, fast scanning")] },
        { label: tLocalized("Video", "Video"), values: ["6IUVgU336Qc", "6IUVgU336Qc", "-gsABaM06sg"] },
      ],
      noteHtml:
        tLocalized("Tarayıcı seçeneklerini laboratuvar tipi, hız ve hassasiyet ihtiyacına göre karşılaştırın.", "Compare scanner options according to laboratory type, speed, and precision needs."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("3SHAPE E4 · 4 μM · 9 SN", "3SHAPE E4 4 μM 9 SEC"),
      titlePrefix: tLocalized("Hız ve hassasiyet", "Speed and precision"),
      titleEmphasis: tLocalized("aynı taramada.", "in the same scan."),
      descriptionHtml:
        tLocalized("3Shape E4, dört kamera yapısı, 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla E serisinin en güçlü cihazı olarak konumlandırılır. Yoğun laboratuvar akışında hızlı ve hassas veri üretmek için öne çıkar.", "The 3Shape E4 is positioned as the most powerful device in the E series, with a four-camera design, 4 μm precision, and 9-second full-arch scanning speed. It stands out for producing fast and precise data in high-volume lab workflows."),
      href: "/3shape-e4",
      ctaText: tLocalized("E4 ürün detayına git →", "Go to E4 product details →"),
      specs: [
        { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("4 μm", "4μm") },
        { label: tLocalized("Tam çene", "Full arch"), value: "9 sn" },
        { label: tLocalized("Kamera", "Camera"), value: "4" },
        { label: tLocalized("Kategori sırası", "Category order"), value: "3" },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("TARAYICI SEÇİM", "SCANNER SELECTION"),
    titlePrefix: tLocalized("Tarayıcı seçimi,", "Scanner selection,"),
    titleEmphasis: tLocalized("iş tipine bağlıdır.", "depends on the type of work."),
    sideHtml:
      tLocalized("Dental laboratuvarda tarama verisi, tasarım ve üretim sürecinin başlangıcıdır. Bu yüzden cihaz seçimi yalnızca fiyatla değil, iş tipi ve doğruluk ihtiyacıyla yapılmalıdır.", "In the dental lab, scan data is the starting point of the design and production process. That's why device selection should be based not only on price but on the type of work and accuracy needs."),
    whyCards: [
      { number: "01", title: tLocalized("Doku taraması", "Tissue scanning"), descriptionHtml: tLocalized("E2, model ve doku tarama işlerinde üretkenliği artırmaya odaklanan giriş seviyesidir.", "The E2 is the entry-level option focused on boosting productivity in model and tissue scanning work.") },
      { number: "02", title: tLocalized("İmplant bar doğruluğu", "Implant bar accuracy"), descriptionHtml: tLocalized("E3, implant bar doğruluğu ve yüksek performans ihtiyacını uygun maliyetle karşılamak için konumlanır.", "The E3 is positioned to meet the need for implant bar accuracy and high performance at an affordable cost.") },
      { number: "03", title: tLocalized("Yüksek hacim", "High volume"), descriptionHtml: tLocalized("E4, hızlı tam çene tarama ve hassasiyet gerektiren yoğun laboratuvar akışlarında öne çıkar.", "The E4 stands out in busy lab workflows that require fast full-arch scanning and precision.") },
      { number: "04", title: tLocalized("CAD/CAM bağlantısı", "CAD/CAM connection"), descriptionHtml: tLocalized("Tarama verisi, tasarım ve üretim adımlarına temel oluşturur; mevcut akışla uyum birlikte değerlendirilmelidir.", "Scan data forms the basis for the design and production steps; compatibility with your existing workflow should be evaluated together.") },
    ],
    callout: {
      titlePrefix: tLocalized("Tarama + tasarım +", "Scanning + design +"),
      titleEmphasis: tLocalized("üretim.", "production."),
      descriptionHtml:
        tLocalized("Masaüstü tarayıcı, dental CAD/CAM zincirinin ilk halkasıdır. Tarayıcı seçimini freze, zirkon, fırın ve yazıcı akışınızla birlikte planlayın.", "The desktop scanner is the first link in the dental CAD/CAM chain. Plan your scanner choice together with your milling, zirconia, furnace, and printer workflow."),
      buttons: [
        { label: tLocalized("Sistemlere git →", "Go to systems →"), href: "/sistemler", variant: "dark" },
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Masaüstü tarayıcı seçerken merak edilenler.", "Frequently asked questions when choosing a desktop scanner."),
    sideHtml: tLocalized("E2, E3 ve E4 arasında karar verirken bakılması gereken temel noktalar.", "Key points to consider when deciding between the E2, E3, and E4."),
    items: [
      {
        question: tLocalized("Bu kategoride hangi tarayıcılar var?", "Which scanners are in this category?"),
        answerHtml:
          tLocalized("3Shape E2, E3 ve E4 seçenekleri laboratuvarların farklı tarama hızı ve hassasiyet ihtiyaçlarına göre konumlanır.", "The 3Shape E2, E3, and E4 options are positioned according to labs' different scanning speed and precision needs."),
      },
      {
        question: tLocalized("3Shape E2 ne için seçilir?", "Why choose the 3Shape E2?"),
        answerHtml:
          tLocalized("Model ve doku taraması yapan, laboratuvar üretkenliğini artırmak isteyen ekipler için konumlanır.", "Positioned for teams that perform model and tissue scanning and want to increase laboratory productivity."),
      },
      {
        question: tLocalized("3Shape E3 farkı nedir?", "What's different about the 3Shape E3?"),
        answerHtml:
          tLocalized("E3 tarafında implant bar doğruluğu ve yüksek performans vurgusu öne çıkar.", "On the E3 side, the emphasis is on implant bar accuracy and high performance."),
      },
      {
        question: tLocalized("3Shape E4 hangi durumda mantıklı?", "When does the 3Shape E4 make sense?"),
        answerHtml:
          tLocalized("4 μm hassasiyet, 9 sn tam çene tarama ve dört kamera gerektiren yüksek hacimli laboratuvar akışlarında E4 öne çıkar.", "The E4 stands out in high-volume lab workflows requiring 4 μm precision, 9-second full-arch scanning, and four cameras."),
      },
      {
        question: tLocalized("Tarayıcı seçimini neye göre yapmalıyım?", "What should I base my scanner selection on?"),
        answerHtml:
          tLocalized("Günlük tarama hacmi, implant bar işi olup olmadığı, tam çene hız beklentisi ve mevcut CAD/CAM akışı birlikte değerlendirilmelidir.", "Daily scan volume, whether there is implant bar work, full-arch speed expectations, and the existing CAD/CAM workflow should be evaluated together."),
      },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Laboratuvarınıza uygun tarayıcıyı", "The scanner suitable for your laboratory"),
    titleEmphasis: tLocalized("birlikte seçelim.", "let's choose it together."),
    descriptionHtml:
      tLocalized("Doku taraması mı, implant bar doğruluğu mu, yüksek hacimli tam çene akışı mı? Kısa bir görüşmeyle E2, E3 ve E4 arasındaki doğru seçimi netleştirelim.", "Tissue scanning, implant bar accuracy, or a high-volume full-arch workflow? Let's clarify the right choice between E2, E3, and E4 with a short conversation."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Tarayıcılara dön", "Back to scanners"), href: "#tarayicilar", variant: "inverse" },
    ],
  },
};
}

export function printerSparePartsCategoryData(): CategoryLandingData {
  return {
  kind: "spares",
  announcement: {
    highlight: tLocalized("⚡ Doğru yedek parça cihaz uyumuyla seçilir", "⚡ The right spare part is chosen for device compatibility"),
    text: tLocalized("P16L, Halot Sky, Piocreat C01 ve sarf parçalarını kullanım ihtiyacınıza göre karşılaştırın.", "Compare the P16L, Halot Sky, Piocreat C01, and consumable parts based on your usage needs."),
    href: "#yedek-parcalar",
    ctaText: tLocalized("Yedek parçaları gör →", "See spare parts →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("3D Yazıcı Yedek Parçaları", "3D Printer Spare Parts"),
  },
  hero: {
    titlePrefix: tLocalized("Üretim sürekliliği,", "Production continuity,"),
    titleEmphasis: tLocalized("doğru parçayla", "with the right part"),
    titleSuffix: tLocalized("korunur.", "is protected."),
    descriptionHtml:
      tLocalized("3D yazıcı bakımında parça seçimi yalnızca ürün adından ibaret değildir. Cihaz modeli, ekran revizyonu, tank/film uyumu, tabla kalibrasyonu ve ilk test baskısı birlikte kontrol edildiğinde üretim tekrar stabil hale gelir.", "Choosing parts for 3D printer maintenance isn't just about the product name. When the device model, screen revision, tank/film compatibility, platform calibration, and the first test print are checked together, production becomes stable again."),
    buttons: [
      { label: tLocalized("Yedek parçaları incele ↓", "Browse spare parts ↓"), href: "#yedek-parcalar", variant: "lime" },
      { label: tLocalized("Uyumluluğu kontrol ettir", "Get compatibility checked"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "8", emphasis: tLocalized("ürün", "Ürün"), label: tLocalized("yazıcı bakım ve yedek parça seçenekleri", "printer maintenance and spare part options") },
      { value: tLocalized("16K", "16K"), emphasis: "LCD", label: tLocalized("MASH P16L monokrom ekran yedek parçası", "MASH P16L monochrome screen replacement part") },
      { value: "800", emphasis: "ml", label: tLocalized("MASH P16L reçine tankı kapasitesi", "MASH P16L resin tank capacity") },
      { value: tLocalized("6K", "6K"), emphasis: "Mono", label: tLocalized("Creality Halot Sky LCD ekran kiti", "Creality Halot Sky LCD display kit") },
    ],
  },
  selector: {
    anchorId: "yedek-parcalar",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("PARÇA LİSTESİ", "PARTS LIST"),
    titlePrefix: tLocalized("Elektronik, tabla,", "Electronic, tray,"),
    titleEmphasis: tLocalized("tank ve film.", "tank and film."),
    sideHtml:
      tLocalized("Kategori içindeki ürünler bakım ve servis akışının farklı noktalarına denk gelir. Ana kart ve LCD ekran elektronik; tabla, tank ve film baskı temas yüzeyidir.", "The products in this category correspond to different points in the maintenance and service workflow. The mainboard and LCD screen are electronic components; the plate, tank, and film are the printing contact surfaces."),
    products: [
      {
        title: tLocalized("MASH P16L Ana Kart (Kontrol Kartı)", "MASH P16L Mainboard (Control Board)"),
        descriptionHtml: tLocalized("Motor, sensör ve veri iletişimi görevlerini yöneten <b>merkezi kontrol kartı</b> yedek parçası.", "A replacement part for the <b>central control board</b> that manages motor, sensor, and data communication tasks."),
        href: "/mash-p16l-ana-kart",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c9594235-74c3-4f06-9b83-84028ecc7716/1080/mash-p16l-ana-kart-kontrol-karti.webp",
        imageAlt: tLocalized("MASH P16L Ana Kart Kontrol Kartı", "MASH P16L Mainboard Control Board"),
        tag: "KONTROL",
        status: "12.913 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "1" },
          { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
          { label: tLocalized("Tip", "Medicine"), value: tLocalized("Ana kart", "main board") },
        ],
      },
      {
        title: tLocalized("MASH P16L 16K Monokrom LCD Ekran (9.6 inç)", "MASH P16L 16K Monochrome LCD Screen (9.6 inch)"),
        descriptionHtml:
          tLocalized("<b>16K UHD</b> monokrom LCD ekran. 385 nm uyumlu, 14x19 μm hassasiyet ve 100°C ısı direnciyle listelenir.", "<b>16K UHD</b> monochrome LCD screen. Listed with 385 nm compatibility, 14x19 μm precision, and 100°C heat resistance."),
        href: "/mash-p16l-16k-monokrom-lcd-ekran-yedek-parca",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/25a9f313-f298-4a05-98ff-1a5ec1773515/1080/mashp16l-lcd-ekran.webp",
        imageAlt: tLocalized("MASH P16L 16K Monokrom LCD Ekran", "MASH P16L 16K Monochrome LCD Display"),
        tag: tLocalized("16K LCD", "16K LCD"),
        status: "19.370 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "2" },
          { label: tLocalized("Boyut", "Dimension"), value: tLocalized("9.6 inç", "9.6 inches") },
          { label: tLocalized("Işık", "Light"), value: tLocalized("385 nm", "385nm") },
        ],
      },
      {
        title: tLocalized("MASH P16L Küçük Baskı Tablası (Hızlı Baskı & Tekli Vaka)", "MASH P16L Small Build Plate (Fast Printing & Single Case)"),
        descriptionHtml:
          tLocalized("Acil vakalar ve tekli üye üretimleri için optimize edilmiş <b>küçük baskı tablası</b>; düşük emiş davranışını destekler.", "A <b>small print platform</b> optimized for urgent cases and single-unit production; supports low suction behavior."),
        href: tLocalized("/mash-p16l-kucuk-hizli-baski-tablasi", "/mash-p16l-kucuk-hizli-baski-tablasi"),
        imageSrc: tLocalized("https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp", "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp"),
        imageAlt: tLocalized("MASH P16L Küçük Baskı Tablası", "MASH P16L Small Build Plate"),
        tag: tLocalized("TEKLİ VAKA", "SINGLE CASE"),
        status: "4.099 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "3" },
          { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Hızlı baskı", "Fast printing") },
          { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("MASH P16L", "MASH P16L") },
        ],
      },
      {
        title: tLocalized("MASH P16L Büyük Baskı Tablası (211x118mm)", "MASH P16L Large Build Plate (211x118mm)"),
        descriptionHtml:
          tLocalized("<b>211x118 mm</b> geniş baskı alanı için standart tabla. Yüzey tutunması ve platform hizalaması birlikte kontrol edilir.", "The standard platform for a <b>211x118 mm</b> large print area. Surface adhesion and platform alignment are checked together."),
        href: tLocalized("/mash-p16l-buyuk-baski-tablasi-211x118mm", "/mash-p16l-buyuk-baski-tablasi-211x118mm"),
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/588256f3-53a6-4f64-99ed-5428c3bbcaca/1080/masp16l-tabla.webp",
        imageAlt: tLocalized("MASH P16L Büyük Baskı Tablası", "MASH P16L Large Build Plate"),
        tag: tLocalized("211x118 mm", "211x118mm"),
        status: "5.166 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "4" },
          { label: tLocalized("Ölçü", "Measurement"), value: tLocalized("211x118 mm", "211x118mm") },
          { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("MASH P16L", "MASH P16L") },
        ],
      },
      {
        title: tLocalized("MASH P16L Reçine Tankı (800 ml)", "MASH P16L Resin Tank (800 ml)"),
        descriptionHtml:
          tLocalized("<b>800 ml</b> alüminyum reçine tankı. Vidasız hızlı kilit, UV korumalı kapak ve ısıtma sistemi uyumu öne çıkar.", "<b>800 ml</b> aluminum resin tank. Screw-free quick lock, UV-protected lid, and heating system compatibility stand out."),
        href: "/mash-p16l-recine-tanki-800ml",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0bb3ef3d-0297-4119-96c3-5bb899f82e5f/1080/mash-p16l-orijinal-recine-tanki1.webp",
        imageAlt: tLocalized("MASH P16L Reçine Tankı", "MASH P16L Resin Tank"),
        tag: tLocalized("800 ml", "800ml"),
        status: "4.492 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "5" },
          { label: tLocalized("Kapasite", "Capacity"), value: tLocalized("800 ml", "800ml") },
          { label: tLocalized("Gövde", "Body"), value: tLocalized("Alüminyum", "Aluminum") },
        ],
      },
      {
        title: tLocalized("Şeffaf ACF Film – LCD/DLP Reçine 3D Yazıcılar İçin", "Clear ACF Film – For LCD/DLP Resin 3D Printers"),
        descriptionHtml:
          tLocalized("LCD ve DLP reçine 3D yazıcılarda tank alt yüzeyi için kullanılan <b>sarf film</b>; UV geçirgenliği ve katman oluşumunu destekler.", "A <b>consumable film</b> used for the tank's underside surface in LCD and DLP resin 3D printers; it supports UV transmittance and layer formation."),
        href: "/seffaf-fep-film-3d-yazici",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/43979b0b-5e26-4b8e-a0e1-f751a3929374/1080/acf-fep-film.webp",
        imageAlt: tLocalized("Şeffaf ACF Film LCD DLP reçine 3D yazıcılar için", "Clear ACF Film for LCD DLP resin 3D printers"),
        tag: tLocalized("ACF / FEP", "ACF/FEP"),
        status: "2.077 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "6" },
          { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("LCD / DLP", "LCD/DLP") },
          { label: tLocalized("Tip", "Medicine"), value: tLocalized("Sarf film", "sarf film") },
        ],
      },
      {
        title: tLocalized("Piocreat C01 LCD Ekran Kiti", "Piocret C01 LCD Screen Kit"),
        descriptionHtml:
          tLocalized("Piocreat C01 3D yazıcı için <b>LCD ekran kiti</b>. Baskı performansını korumak ve stabil sonuç almak için konumlanır.", "An <b>LCD screen kit</b> for the Piocreat C01 3D printer. Designed to preserve print performance and achieve stable results."),
        href: "/piocreat-c01-lcd-ekran-kiti",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5178138f-f83b-4c0e-b48a-78f5e04be566/1080/piocreat-lcd.webp",
        imageAlt: tLocalized("Piocreat C01 LCD Ekran Kiti", "Piocret C01 LCD Screen Kit"),
        tag: tLocalized("C01 LCD", "C01 LCD"),
        status: "20.718 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "7" },
          { label: tLocalized("Cihaz", "Device"), value: tLocalized("Piocreat C01", "Piocret C01") },
          { label: tLocalized("Tip", "Medicine"), value: "LCD kit" },
        ],
      },
      {
        title: tLocalized("Creality Halot Sky LCD Ekran Kiti - 6K Mono", "Creality Halot Sky LCD Display Kit - 6K Mono"),
        descriptionHtml:
          tLocalized("Creality Halot Sky için orijinal <b>6K Mono LCD</b> ekran kiti. Yüksek çözünürlük ve geniş dokunmatik ekranla listelenir.", "Original <b>6K Mono LCD</b> screen kit for the Creality Halot Sky. Listed with high resolution and a large touchscreen."),
        href: "/creality-halot-sky-lcd-ekran-kiti-6k-mono",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a1735bcc-58b6-47c0-a820-ff325b8d4902/1080/creality-halot-sky-lcd-kit.webp",
        imageAlt: tLocalized("Creality Halot Sky LCD Ekran Kiti 6K Mono", "Creality Halot Sky LCD Display Kit 6K Mono"),
        tag: tLocalized("6K MONO", "6K MONO"),
        status: "20.605 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "8" },
          { label: tLocalized("Cihaz", "Device"), value: "Halot Sky" },
          { label: tLocalized("Tip", "Medicine"), value: "LCD kit" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Grup", "Group") },
        { title: tLocalized("Elektronik", "Electronic") },
        { title: tLocalized("Baskı yüzeyi", "Print surface") },
        { title: tLocalized("Tank / film", "tank/movie") },
      ],
      rows: [
        { label: tLocalized("Ürünler", "Products"), values: ["Ana kart, 16K LCD, C01 LCD, Halot Sky LCD", tLocalized("Küçük tabla, büyük tabla", "Small plate, large plate"), tLocalized("P16L reçine tankı, ACF/FEP film", "P16L resin tank, ACF/FEP film")] },
        { label: tLocalized("Kontrol", "Control"), values: [tLocalized("Cihaz modeli, ekran revizyonu, bağlantı", "Device model, screen revision, connection"), tLocalized("Tabla yüzeyi, hizalama, ilk katman", "Platform surface, alignment, first layer"), tLocalized("Film gerginliği, tank yüzeyi, UV geçirgenliği", "Film tension, tank surface, UV transmission")] },
        { label: tLocalized("Amaç", "Purpose"), values: [tLocalized("Pozlama ve kontrol stabilitesi", "Exposure and control stability"), tLocalized("Baskı tutunması ve üretim hızı", "Print adhesion and production speed"), tLocalized("Reçine akışı ve katman ayrımı", "Resin flow and layer separation")] },
      ],
      noteHtml:
        tLocalized("Yedek parçaları uyum, kullanım amacı ve bakım ihtiyacına göre seçin.", "Choose spare parts based on fit, intended use, and maintenance needs."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MASH P16L · 16K LCD · 385 nm", "MASH P16L 16K LCD 385 nm"),
      titlePrefix: tLocalized("Mikron detay", "Micron-level detail"),
      titleEmphasis: tLocalized("LCD ekranda", "on the LCD screen"),
      titleSuffix: tLocalized("başlar.", "begins."),
      descriptionHtml:
        tLocalized("MASH P16L 16K monokrom LCD ekran; 9.6 inç panel, 14x19 μm hassasiyet, 385 nm UV ışık uyumu ve 100°C ısı direnciyle dental üretimde yüksek detay seviyesini destekler.", "The MASH P16L 16K monochrome LCD screen supports a high level of detail in dental production with its 9.6-inch panel, 14x19 μm precision, 385 nm UV light compatibility, and 100°C heat resistance."),
      href: "/mash-p16l-16k-monokrom-lcd-ekran-yedek-parca",
      ctaText: tLocalized("LCD ekran detayına git →", "Go to LCD screen details →"),
      specs: [
        { label: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("16K UHD", "16K UHD") },
        { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("14x19 μm", "14x19μm") },
        { label: tLocalized("Ekran", "Screen"), value: tLocalized("9.6 inç", "9.6 inches") },
        { label: tLocalized("Işık", "Light"), value: tLocalized("385 nm", "385nm") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("SERVİS MANTIĞI", "SERVICE LOGIC"),
    titlePrefix: tLocalized("Parça değişimi,", "Part replacement,"),
    titleEmphasis: tLocalized("kalibrasyonla biter.", "It ends with calibration."),
    sideHtml:
      tLocalized("Yedek parça değişiminde son adım montaj değil, cihazın yeniden stabil baskı verebildiğini doğrulamaktır. Ekran, tank filmi, tabla ve reçine birlikte kontrol edilmelidir.", "The last step in a spare part replacement is not installation, but verifying that the device can produce stable prints again. The screen, tank film, tray, and resin should be checked together."),
    whyCards: [
      { number: "01", title: tLocalized("Cihaz uyumu", "Device compatibility"), descriptionHtml: tLocalized("Satın alma öncesi cihaz modeli, parça revizyonu ve bağlantı tipi doğrulanmalıdır.", "The device model, part revision, and connection type should be verified before purchase.") },
      { number: "02", title: tLocalized("Temiz montaj", "clean assembly"), descriptionHtml: tLocalized("LCD ekran, film ve tank yüzeyi reçine kalıntısı ve tozdan arındırılarak kurulmalıdır.", "The LCD screen, film, and tank surface should be cleaned of resin residue and dust before installation.") },
      { number: "03", title: tLocalized("İlk katman", "First layer"), descriptionHtml: tLocalized("Tabla ve tank değişiminden sonra hizalama ve ilk katman tutunması test edilmelidir.", "Alignment and first-layer adhesion should be tested after platform and tank replacement.") },
      { number: "04", title: tLocalized("Test baskısı", "Test print"), descriptionHtml: tLocalized("Elektronik veya sarf parça değişiminden sonra kısa bir test baskısı üretim riskini azaltır.", "A short test print after replacing electronic or consumable parts reduces production risk.") },
    ],
    callout: {
      titlePrefix: tLocalized("Yedek parça +", "Spare part +"),
      titleEmphasis: tLocalized("teknik destek.", "technical support."),
      descriptionHtml:
        tLocalized("Parçayı tek başına satın almak yerine cihaz modelini ve baskı problemini birlikte kontrol edin. Doğru parça, doğru kurulum adımıyla üretimi tekrar stabil hale getirir.", "Instead of purchasing the part on its own, check the device model and the printing problem together. The right part, combined with the right installation step, restores stable production again."),
      buttons: [
        { label: tLocalized("3D yazıcılara git →", "Go to 3D printers →"), href: "/3d-yazicilar", variant: "dark" },
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Yedek parça seçerken merak edilenler.", "Frequently asked questions when choosing spare parts."),
    sideHtml: tLocalized("Cihaz uyumu, kurulum ve test baskısı için temel kontrol noktaları.", "Key checkpoints for device compatibility, installation, and test print."),
    items: [
      { question: tLocalized("Bu kategoride hangi ürünler var?", "Which products are in this category?"), answerHtml: tLocalized("MASH P16L ana kart, LCD ekran, küçük/büyük baskı tablası, reçine tankı, ACF/FEP film, Piocreat C01 LCD ve Creality Halot Sky LCD ekran kiti listelenir.", "The MASH P16L mainboard, LCD screen, small/large build plate, resin tank, ACF/FEP film, Piocreat C01 LCD, and Creality Halot Sky LCD screen kit are listed.") },
      { question: tLocalized("Yanlış parça almamak için ne kontrol edilmeli?", "What should be checked to avoid getting the wrong part?"), answerHtml: tLocalized("Cihaz modeli, parça revizyonu, ekran/tank ölçüsü ve bağlantı uyumu satın alma öncesi kontrol edilmelidir.", "Device model, part revision, screen/vat size, and connection compatibility should be checked before purchase.") },
      { question: tLocalized("LCD ekran değişimi sonrası ne yapılmalı?", "What should be done after replacing the LCD screen?"), answerHtml: tLocalized("Bağlantılar, ekran yüzeyi, tank filmi ve pozlama testi kontrol edilmelidir.", "Connections, screen surface, tank film, and exposure test should be checked.") },
      { question: tLocalized("Tabla değişimi sonrası kalibrasyon gerekir mi?", "Is calibration required after platform replacement?"), answerHtml: tLocalized("Evet. Platform hizalaması ve ilk katman tutunması test edilmelidir.", "Yes. Platform alignment and first-layer adhesion should be tested.") },
      { question: tLocalized("ACF/FEP film ne işe yarar?", "What is ACF/FEP film for?"), answerHtml: tLocalized("Tank alt yüzeyinde UV ışığın reçineye dengeli iletilmesini ve stabil katman oluşumunu destekleyen sarf malzemedir.", "A consumable that supports balanced transmission of UV light to the resin and stable layer formation on the underside of the tank.") },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Doğru yedek parçayı", "The right spare part"),
    titleEmphasis: tLocalized("birlikte netleştirelim.", "let's clarify it together."),
    descriptionHtml:
      tLocalized("Cihaz modelinizi, baskı probleminizi ve mevcut parça revizyonunu paylaşın; doğru ürünü ve kurulum kontrol listesini birlikte belirleyelim.", "Share your device model, print issue, and current part revision; let's determine the right product and installation checklist together."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Yedek parçalara dön", "Back to spare parts"), href: "#yedek-parcalar", variant: "inverse" },
    ],
  },
};
}

export function systemsCategoryData(): CategoryLandingData {
  return {
  kind: "systems",
  announcement: {
    highlight: tLocalized("⚡ Sistem ürünleri birlikte düşünülür", "⚡ Systems together"),
    text: tLocalized("Trasformer Comp Flow ve Light Glass akışını tam çene kompozit restorasyon ihtiyacına göre karşılaştırın.", "Compare Comp Flow and Light Glass for your case."),
    href: "#sistemler",
    ctaText: tLocalized("Sistemleri gör →", "See systems →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Sistemler", "Systems"),
  },
  hero: {
    titlePrefix: tLocalized("Tam çene kompozitte", "In full-arch composite"),
    titleEmphasis: tLocalized("sistem birlikte", "system together"),
    titleSuffix: tLocalized("çalışır.", "works."),
    descriptionHtml:
      tLocalized("Trasformer sistemi; kompozit materyal, ışık geçirgenliği, doğruluk ve stabiliteyi aynı restorasyon akışında birleştirir. Comp Flow şırınga kompozit ve Light Glass mufla sistemi, vaka planıyla birlikte değerlendirilmelidir.", "The Trasformer system combines composite material, light transmission, accuracy, and stability in the same restoration workflow. The Comp Flow syringe composite and Light Glass muffle system should be evaluated together with the case plan."),
    buttons: [
      { label: tLocalized("Sistemleri incele ↓", "Review systems ↓"), href: "#sistemler", variant: "lime" },
      { label: tLocalized("Vaka uyumunu sor", "Ask about case compliance"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "2", emphasis: tLocalized("ürün", "Ürün"), label: tLocalized("Comp Flow ve Light Glass sistemleri", "Comp Flow and Light Glass systems") },
      { value: "Tam", emphasis: tLocalized("çene", "jaw"), label: tLocalized("kompozit restorasyon akışı", "composite restoration workflow") },
      { value: "CRS", emphasis: tLocalized("Trasformer", "transformer"), label: tLocalized("sistem ve materyal birlikte konumlanır", "system and material positioned together") },
      { value: "14.654", emphasis: "TRY", label: tLocalized("Light Glass başlangıç fiyat aralığı", "Light Glass starting price range") },
    ],
  },
  selector: {
    anchorId: "sistemler",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("SİSTEM SEÇİCİ", "SYSTEM SELECTOR"),
    titlePrefix: tLocalized("Kompozit materyal,", "composite material,"),
    titleEmphasis: tLocalized("mufla sistemi.", "muffle system."),
    sideHtml:
      tLocalized("Bu kategori tekil ürün listesinden çok bir restorasyon akışı gibi düşünülmelidir. Comp Flow materyal tarafını, Light Glass ise mufla sistemi tarafını temsil eder.", "This category should be thought of as a restoration workflow rather than a single product list. Comp Flow represents the material side, while Light Glass represents the muffle system side."),
    products: [
      {
        title: tLocalized("Trasformer Comp Flow Şırınga Kompozit", "Trasformer Comp Flow Syringe Composite"),
        descriptionHtml:
          tLocalized("Trasformer Light Glass sistemiyle birlikte tam çene kompozit restorasyonlarda kullanılan <b>şırınga kompozit</b>.", "A <b>syringe composite</b> used together with the Trasformer Light Glass system in full-arch composite restorations."),
        href: "/trasformer-comp-flow-siringa-kompozit?Comp-Flow-Renk=Dentin-A1%2FB1-3g-1912001",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2eb7407c-c84b-4bf3-bb87-343b261f6854/1080/iso.webp",
        imageAlt: tLocalized("Trasformer Comp Flow Şırınga Kompozit", "Trasformer Comp Flow Syringe Composite"),
        tag: tLocalized("COMP FLOW", "COMP FLOW"),
        status: "1.179 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "1" },
          { label: tLocalized("Form", "Form"), value: tLocalized("Şırınga kompozit", "Syringe composite") },
          { label: tLocalized("Akış", "Workflow"), value: tLocalized("Tam çene", "Full arch") },
        ],
      },
      {
        title: tLocalized("Trasformer Light Glass Mufla Sistemi", "Transformer Light Glass Muffle System"),
        descriptionHtml:
          tLocalized("Tam çene kompozit restorasyonlarda <b>doğruluk, ışık geçirgenliği ve stabilite</b> hedefleyen mufla sistemi.", "A muffle system targeting <b>accuracy, light transmission, and stability</b> in full-arch composite restorations."),
        href: "/trasformer-light-glass-mufla-sistemi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ee5b1f34-39b8-4ca3-b9d1-e911a6547b71/1080/tra.webp",
        imageAlt: tLocalized("Trasformer Light Glass Mufla Sistemi", "Transformer Light Glass Muffle System"),
        tag: tLocalized("LIGHT GLASS", "LIGHT GLASS"),
        status: "14.654 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Sıra", "Order"), value: "2" },
          { label: tLocalized("Tip", "Medicine"), value: tLocalized("Mufla sistemi", "Muffle system") },
          { label: tLocalized("Hedef", "Aim"), value: tLocalized("Stabil akış", "Stable flow") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Akış", "Workflow") },
        { title: tLocalized("Comp Flow", "Comp Flow") },
        { title: tLocalized("Light Glass", "Light Glass") },
        { title: tLocalized("Birlikte", "Together") },
      ],
      rows: [
        { label: tLocalized("Rol", "Role"), values: [tLocalized("Şırınga kompozit materyal", "Syringe composite material"), tLocalized("Mufla sistemi", "Muffle system"), tLocalized("Tam çene kompozit restorasyon akışı", "Full-arch composite restoration workflow")] },
        { label: tLocalized("Hedef", "Aim"), values: ["Kompozit uygulama", tLocalized("Işık geçirgenliği ve stabilite", "Light transmittance and stability"), tLocalized("Doğruluk, vaka planı ve restorasyon kontrolü", "Accuracy, case plan, and restoration control")] },
        { label: tLocalized("Kontrol", "Control"), values: [tLocalized("Renk ve materyal seçimi", "Color and material selection"), tLocalized("Sistem kullanımı ve vaka uyumu", "System usage and case compatibility"), tLocalized("Vaka planı, materyal ve laboratuvar süreci", "Case plan, material, and lab process")] },
      ],
      noteHtml:
        tLocalized("Sistemleri endikasyon, çalışma akışı ve laboratuvar ihtiyacına göre değerlendirin.", "Evaluate systems according to indication, workflow, and laboratory needs."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("TRASFORMER LIGHT GLASS", "TRASFORMER LIGHT GLASS"),
      titlePrefix: tLocalized("Kompozit restorasyonda", "In composite restoration"),
      titleEmphasis: tLocalized("ışık ve stabilite.", "light and stability."),
      descriptionHtml:
        tLocalized("Trasformer Light Glass Mufla Sistemi, modern dijital laboratuvarların tam çene kompozit restorasyonlarda ihtiyaç duyduğu doğruluk, ışık geçirgenliği ve stabiliteyi desteklemek için tasarlanmıştır.", "The Trasformer Light Glass Muffle System is designed to support the accuracy, light transmission, and stability that modern digital laboratories need in full-arch composite restorations."),
      href: "/trasformer-light-glass-mufla-sistemi",
      ctaText: tLocalized("Light Glass detayına git →", "Go to Light Glass details →"),
      specs: [
        { label: tLocalized("Ürün", "Product"), value: tLocalized("Mufla sistemi", "Muffle system") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Tam çene", "Full arch") },
        { label: tLocalized("Materyal", "Materiel"), value: "Kompozit" },
        { label: tLocalized("Kategori sırası", "Category order"), value: "2" },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("AKIŞ MANTIĞI", "WORKFLOW LOGIC"),
    titlePrefix: tLocalized("Sistem ürünü,", "System product,"),
    titleEmphasis: tLocalized("tek parça değildir.", "is not a single part."),
    sideHtml:
      tLocalized("Comp Flow ve Light Glass aynı restorasyon hedefinin iki parçasıdır. Materyal seçimi, mufla sistemi kullanımı ve vaka planı birlikte netleşmelidir.", "Comp Flow and Light Glass are two parts of the same restoration goal. Material selection, muffle system use, and the case plan should be clarified together."),
    whyCards: [
      { number: "01", title: tLocalized("Materyal", "Materiel"), descriptionHtml: tLocalized("Comp Flow, sistem içindeki kompozit uygulama adımıdır; renk ve vaka planıyla seçilir.", "Comp Flow is the composite application step within the system; it is selected based on shade and case plan.") },
      { number: "02", title: tLocalized("Mufla sistemi", "Muffle system"), descriptionHtml: tLocalized("Light Glass, tam çene kompozit restorasyonlarda stabilite ve ışık geçirgenliği için konumlanır.", "Light Glass is positioned for stability and light transmittance in full-arch composite restorations.") },
      { number: "03", title: tLocalized("Vaka planı", "Case plan"), descriptionHtml: tLocalized("Tam çene restorasyonlarda dijital plan, materyal ve sistem adımı birlikte düşünülmelidir.", "Digital plan, material, and system steps should be considered together in full-arch restorations.") },
      { number: "04", title: tLocalized("Laboratuvar akışı", "Laboratory workflow"), descriptionHtml: tLocalized("Sistem ürünleri mevcut laboratuvar süreci ve ekip alışkanlığına göre uygulanmalıdır.", "System products should be applied according to the existing laboratory process and team practice.") },
    ],
    callout: {
      titlePrefix: tLocalized("Materyal + sistem +", "Material + system +"),
      titleEmphasis: tLocalized("vaka.", "case."),
      descriptionHtml:
        tLocalized("Tam çene kompozit restorasyon akışında doğru ürün seçimi vaka hedefiyle başlar. Renk, sistem uyumu ve laboratuvar sürecini birlikte netleştirin.", "The right product selection in the full-arch composite restoration workflow starts with the case goal. Clarify color, system compatibility, and laboratory process together."),
      buttons: [
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "dark" },
        { label: tLocalized("Tarayıcılara git →", "Go to scanners →"), href: "/masasustu-tarayicilar", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Sistem ürünleri hakkında merak edilenler.", "Frequently asked questions about system products."),
    sideHtml: tLocalized("Trasformer Comp Flow ve Light Glass arasındaki rol ayrımı.", "The division of roles between Trasformer Comp Flow and Light Glass."),
    items: [
      { question: tLocalized("Bu kategoride hangi ürünler var?", "Which products are in this category?"), answerHtml: tLocalized("Trasformer Comp Flow Şırınga Kompozit ve Trasformer Light Glass Mufla Sistemi listelenir.", "Trasformer Comp Flow Syringe Composite and Trasformer Light Glass Muffle System are listed.") },
      { question: tLocalized("Comp Flow ne için kullanılır?", "What is Comp Flow used for?"), answerHtml: tLocalized("Light Glass sistemiyle birlikte tam çene kompozit restorasyon akışında kullanılan şırınga kompozittir.", "It is a syringe composite used together with the Light Glass system in the full-arch composite restoration workflow.") },
      { question: tLocalized("Light Glass ne işe yarar?", "What is Light Glass used for?"), answerHtml: tLocalized("Tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen mufla sistemidir.", "A muffle system targeting accuracy, light transmission, and stability in full-arch composite restorations.") },
      { question: tLocalized("Bu ürünler birlikte mi düşünülmeli?", "Should these products be considered together?"), answerHtml: tLocalized("Evet. Comp Flow materyal, Light Glass sistem adımı olarak aynı restorasyon akışında değerlendirilir.", "Yes. Comp Flow material is considered a Light Glass system step within the same restoration workflow.") },
      { question: tLocalized("Satın almadan önce ne kontrol edilmeli?", "What should be checked before purchasing?"), answerHtml: tLocalized("Vaka tipi, renk seçimi, laboratuvar süreci ve sistem kullanım adımları netleştirilmelidir.", "Case type, shade selection, lab process, and system usage steps should be clarified.") },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Trasformer akışını", "The Trasformer workflow"),
    titleEmphasis: tLocalized("birlikte planlayalım.", "let's plan it together."),
    descriptionHtml:
      tLocalized("Vaka hedefinizi, renk ihtiyacınızı ve laboratuvar sürecinizi paylaşın; Comp Flow ve Light Glass kullanımını birlikte netleştirelim.", "Share your case goal, shade requirement, and lab process; let's clarify Comp Flow and Light Glass usage together."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Sistemlere dön", "Back to systems"), href: "#sistemler", variant: "inverse" },
    ],
  },
};
}

export function titaniumDiscsCategoryData(): CategoryLandingData {
  return {
  kind: "titanium",
  announcement: {
    highlight: tLocalized("⚡ Titanyum disk seçimi implant üstü akışla yapılır", "⚡ Titanium disc selection follows the implant-supported workflow"),
    text: tLocalized("MESA Grade 5 ELI disk materyal, çap ve CAD/CAM uyumu üzerinden değerlendirilir.", "The MESA Grade 5 ELI disc is evaluated by material, diameter, and CAD/CAM compatibility."),
    href: "#titanyum",
    ctaText: tLocalized("Titanyum diski gör →", "View titanium disc →"),
  },
  breadcrumb: {
    homeLabel: tLocalized("Ana sayfa", "Home"),
    homeHref: "/",
    parentLabel: tLocalized("Ürünler", "Products"),
    currentLabel: tLocalized("Titanyum Diskler", "Titanium Discs"),
  },
  hero: {
    titlePrefix: tLocalized("İmplant üstü işlerde", "For implant-supported work"),
    titleEmphasis: tLocalized("biyouyumlu titanyum", "biocompatible titanium"),
    titleSuffix: tLocalized("güven verir.", "builds confidence."),
    descriptionHtml:
      tLocalized("MESA Grade 5 ELI titanyum disk, implant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar. Ø98.5 mm formu ile CAD/CAM freze sistemlerinde kullanılmak üzere konumlanır.", "The MESA Grade 5 ELI titanium disc offers high strength and biocompatibility for implant-supported restorations. With its Ø98.5 mm form, it is designed for use in CAD/CAM milling systems."),
    buttons: [
      { label: tLocalized("Titanyum diski incele ↓", "Review titanium disc ↓"), href: "#titanyum", variant: "lime" },
      { label: tLocalized("Freze uyumunu sor", "Ask about milling compatibility"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
    ],
    metrics: [
      { value: "1", emphasis: tLocalized("ürün", "Product"), label: tLocalized("freze iş akışı için titanyum disk", "titanium disc for milling workflows") },
      { value: "Grade", emphasis: "5 ELI", label: tLocalized("titanyum materyal sınıfı", "titanium material class") },
      { value: "Ø98.5", emphasis: "mm", label: tLocalized("CAD/CAM disk formu", "CAD/CAM disc form") },
      { value: "3.930", emphasis: "TRY", label: tLocalized("başlangıç fiyat aralığı", "starting price range") },
    ],
  },
  selector: {
    anchorId: "titanyum",
    cardCtaText: tLocalized("İncele", "Explore"),
    number: "01",
    label: tLocalized("TİTANYUM DİSK", "TITANIUM DISC"),
    titlePrefix: tLocalized("Grade 5 ELI,", "Grade 5 ELI,"),
    titleEmphasis: tLocalized("implant üstü.", "implant-supported."),
    sideHtml:
      tLocalized("Titanyum disk seçimi materyal sınıfı, disk formu, freze uyumu ve implant üstü endikasyonla birlikte yapılmalıdır.", "Titanium disc selection should consider material class, disc form, milling compatibility, and implant-supported indication together."),
    products: [
      {
        title: tLocalized("MESA Titanyum Disk Grade 5 ELI – Dental CAD/CAM İmplant Çözümleri", "MESA Titanium Disc Grade 5 ELI – Dental CAD/CAM Implant Solutions"),
        descriptionHtml:
          tLocalized("İmplant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunan <b>Grade 5 ELI</b> titanyum disk.", "A <b>Grade 5 ELI</b> titanium disc offering high strength and biocompatibility for implant-supported restorations."),
        href: "/mesa-grade-5-eli-titanyum-disk?Boyut=10-mm",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8eaf20f5-0227-4f18-b8fc-7f054422ce88/1080/mesa-titanyum-disk.webp",
        imageAlt: tLocalized("MESA Titanyum Disk Grade 5 ELI Dental CAD CAM", "MESA Titanium Disc Grade 5 ELI Dental CAD CAM"),
        tag: tLocalized("GRADE 5 ELI", "GRADE 5 ELI"),
        status: "3.930 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: tLocalized("Kategori sırası", "Category order"), value: "1" },
          { label: tLocalized("Çap", "Diameter"), value: tLocalized("Ø98.5 mm", "Ø98.5 mm") },
          { label: tLocalized("Kullanım", "Usage"), value: tLocalized("İmplant üstü", "Implant-supported") },
        ],
      },
    ],
    compare: {
      columns: [
        { title: tLocalized("Kontrol", "Control") },
        { title: tLocalized("Materyal", "Materiel") },
        { title: tLocalized("Freze", "milling") },
        { title: tLocalized("Endikasyon", "Indication") },
      ],
      rows: [
        { label: tLocalized("Bu ürün", "This product"), values: ["Titanyum Grade 5 ELI", "Ø98.5 mm CAD/CAM disk formu", tLocalized("İmplant üstü restorasyonlar", "Implant-supported restorations")] },
        { label: tLocalized("Seçim notu", "Selection note"), values: [tLocalized("Biyouyumluluk ve dayanım ihtiyacı", "Biocompatibility and durability requirements"), tLocalized("Disk boyutu ve freze sistemi uyumu", "Disk size and milling system compatibility"), tLocalized("Vaka tipi ve implant üstü plan", "Case type and implant-supported plan")] },
        { label: tLocalized("Satın alma öncesi", "Before purchase"), values: [tLocalized("Materyal sınıfı", "Material class"), "Boyut / holder uyumu", tLocalized("Restorasyon ve CAM stratejisi", "Restoration and CAM strategy")] },
      ],
      noteHtml:
        tLocalized("Titanyum diski freze uyumu, ölçü ve uygulama ihtiyacına göre değerlendirin.", "Evaluate the titanium disc according to milling compatibility, dimensions, and application needs."),
    },
  },
  feature: {
    number: "02",
    label: tLocalized("ÖNE ÇIKAN", "FEATURED"),
    content: {
      eyebrow: tLocalized("MESA · GRADE 5 ELI · Ø98.5 MM", "MESA · GRADE 5 HAND · Ø98.5 MM"),
      titlePrefix: tLocalized("CAD/CAM frezeleme için", "For CAD/CAM milling"),
      titleEmphasis: tLocalized("titanyum disk.", "titanium disc."),
      descriptionHtml:
        tLocalized("MESA Grade 5 ELI, implant üstü restorasyonlarda CAD/CAM sistemlerle uyumlu yüksek dayanımlı titanyum disk çözümüdür. Ø98.5 mm disk formu, frezeleme akışının temel kontrol noktasıdır.", "The MESA Grade 5 ELI is a high-strength titanium disk solution compatible with CAD/CAM systems for implant-supported restorations. The Ø98.5 mm disk form is the key control point of the milling workflow."),
      href: "/mesa-grade-5-eli-titanyum-disk?Boyut=10-mm",
      ctaText: tLocalized("Ürün detayına git →", "Go to product details →"),
      specs: [
        { label: tLocalized("Materyal", "Materiel"), value: tLocalized("Grade 5 ELI", "Grade 5 ELI") },
        { label: tLocalized("Çap", "Diameter"), value: tLocalized("Ø98.5 mm", "Ø98.5mm") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("İmplant üstü", "Implant-supported") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("CAD/CAM", "CAD/CAM") },
      ],
    },
  },
  detail: {
    number: "03",
    label: tLocalized("SEÇİM MANTIĞI", "SELECTION LOGIC"),
    titlePrefix: tLocalized("Titanyum disk,", "titanium disc,"),
    titleEmphasis: tLocalized("CAM akışıyla", "With the CAM workflow"),
    titleSuffix: tLocalized("seçilir.", "is selected."),
    sideHtml:
      tLocalized("İmplant üstü restorasyonlarda materyal seçimi, disk ölçüsü, holder uyumu ve frezeleme stratejisi birlikte değerlendirilmelidir.", "Material selection, disc size, holder compatibility, and milling strategy should be evaluated together for implant-supported restorations."),
    whyCards: [
      { number: "01", title: tLocalized("Materyal sınıfı", "Material class"), descriptionHtml: tLocalized("Grade 5 ELI titanyum, yüksek dayanım ve biyouyumluluk ihtiyacı olan implant üstü işler için konumlanır.", "Grade 5 ELI titanium is positioned for implant-supported work that requires high strength and biocompatibility.") },
      { number: "02", title: tLocalized("Disk formu", "disc form"), descriptionHtml: tLocalized("Ø98.5 mm formu, CAD/CAM freze sistemleriyle uyum kontrolünün başlangıç noktasıdır.", "The Ø98.5 mm form is the starting point for compatibility checks with CAD/CAM milling systems.") },
      { number: "03", title: tLocalized("CAM stratejisi", "CAM strategy"), descriptionHtml: tLocalized("Frezeleme yolu, holder uyumu ve disk boyutu restorasyon sonucunu etkiler.", "Milling path, holder compatibility, and disk size affect the restoration result.") },
      { number: "04", title: tLocalized("Vaka uyumu", "Case concordance"), descriptionHtml: tLocalized("İmplant üstü restorasyonlarda materyal ve tasarım hedefi birlikte doğrulanmalıdır.", "Material and design goals should be validated together for implant-supported restorations.") },
    ],
    callout: {
      titlePrefix: tLocalized("Disk + freze +", "Disc + milling +"),
      titleEmphasis: tLocalized("implant planı.", "implant plan."),
      descriptionHtml:
        tLocalized("Titanyum disk seçimini freze sisteminiz, CAM yazılımınız ve implant üstü vaka planınızla birlikte netleştirin.", "Clarify titanium disc selection together with your milling system, CAM software, and implant-supported case plan."),
      buttons: [
        { label: tLocalized("Sistemlere git →", "Go to systems →"), href: "/sistemler", variant: "dark" },
        { label: tLocalized("Teknik destek al →", "Get technical support →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"),
    title: tLocalized("Titanyum disk seçerken merak edilenler.", "Frequently asked questions when choosing a titanium disc."),
    sideHtml: tLocalized("Materyal, çap, CAD/CAM uyumu ve implant üstü kullanım için temel sorular.", "Key questions on material, diameter, CAD/CAM compatibility, and use on implants."),
    items: [
      { question: tLocalized("Bu kategoride hangi ürün var?", "Which product is in this category?"), answerHtml: tLocalized("MESA Titanyum Disk Grade 5 ELI, CAD/CAM freze iş akışları için konumlanan titanyum disk seçeneğidir.", "The MESA Titanium Disk Grade 5 ELI is a titanium disk option positioned for CAD/CAM milling workflows.") },
      { question: tLocalized("MESA Grade 5 ELI ne için kullanılır?", "What is the MESA Grade 5 ELI used for?"), answerHtml: tLocalized("İmplant üstü restorasyonlar için kullanılan CAD/CAM uyumlu titanyum disktir.", "A CAD/CAM-compatible titanium disc used for implant-supported restorations.") },
      { question: tLocalized("Disk çapı nedir?", "What is the disk diameter?"), answerHtml: tLocalized("Ürün açıklamasında Ø98.5 mm formu belirtilir.", "The Ø98.5 mm form is stated in the product description.") },
      { question: tLocalized("Biyouyumlu mudur?", "Is it biocompatible?"), answerHtml: tLocalized("Kaynak açıklamada yüksek dayanım ve biyouyumluluk sunduğu belirtilir.", "The source description states that it offers high strength and biocompatibility.") },
      { question: tLocalized("Satın almadan önce ne kontrol edilmeli?", "What should be checked before purchasing?"), answerHtml: tLocalized("Freze sistemi, holder uyumu, disk boyutu ve implant üstü vaka planı birlikte kontrol edilmelidir.", "Milling system, holder compatibility, disk size, and implant-supported case plan should be checked together.") },
    ],
  },
  finalCta: {
    titlePrefix: tLocalized("Titanyum disk uyumunu", "Titanium disc compatibility"),
    titleEmphasis: tLocalized("birlikte kontrol edelim.", "let's check it together."),
    descriptionHtml:
      tLocalized("Freze sisteminizi, CAM akışınızı ve implant üstü vaka tipinizi paylaşın; doğru disk boyutu ve kullanım planını birlikte netleştirelim.", "Share your milling system, CAM workflow, and implant-supported case type; let's clarify the right disk size and usage plan together."),
    buttons: [
      { label: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "lime" },
      { label: tLocalized("Titanyum diske dön", "Back to titanium disc"), href: "#titanyum", variant: "inverse" },
    ],
  },
};
}

export function categoryLandingDataFromKey(value: string | undefined): CategoryLandingData | null {
  const key = normalizeCategoryKey(value);
  if (!key) return null;
  const dentalKeys = ["dental 3d yazici recineleri", "3d yazici recineleri", "dental recineler", "dental recine", "dental resins"];
  const printerKeys = ["3d yazicilar", "dental 3d yazicilar", "3d printers", tLocalized("mash p16l", "MASH P16L"), "curie m1", "halot sky", "creality halot"];
  const washingKeys = [tLocalized("yikama cihazlari", "yikama cihazlari"), tLocalized("dental yikama", "dental washing"), tLocalized("yikama", "yikama"), "washing", tLocalized("mash w1e", "Mash W1E")];
  const curingKeys = [tLocalized("kurleme cihazlari", "kurleme cihazlari"), tLocalized("dental kurleme", "dental curing"), tLocalized("kurleme", "kurleme"), "curing", tLocalized("mash c1e", "Mash C1E")];
  const washCureKeys = [tLocalized("yikama kurleme cihazlari", "yikama kurleme cihazlari"), tLocalized("yikama kurleme", "yikama kurleme"), "wash cure", "wash and cure devices", "washcure", "uw 03", "uw 02"];
  const zirconKeys = ["zirkon bloklar", tLocalized("zirkon blok", "Zirconia Block"), "zircon blocks", "argenz ht plus", tLocalized("argenz st multilayer", "ArgenZ ST Multilayer"), "argenz ht multilayer"];
  const furnaceKeys = [
    "dental firinlar",
    "dental firin",
    "firinlar",
    "naberthem lht 02 17 lb speed",
    "naberthem lht 01 16 turbo fire",
    "naberthem vl 01 12 lb pres firini",
    "naberthem vl 01 12 lb press firini",
    "naberthem vl 01 12 lb porselen firini",
  ];
  const scannerKeys = [
    "masasustu tarayicilar",
    "masaustu tarayicilar",
    "desktop scanners",
    "tarayicilar",
    tLocalized("3shape e2", "3Shape E2"),
    tLocalized("3shape e3", "3Shape E3"),
    tLocalized("3shape e4", "3Shape E4"),
  ];
  const spareKeys = [
    "3d yazici yedek parcalari",
    "yazici yedek parcalari",
    "yedek parcalar",
    tLocalized("mash p16l ana kart", "MASH P16L Ana Kart"),
    tLocalized("mash p16l 16k monokrom lcd ekran", "MASH P16L 16K Monokrom LCD Ekran"),
    tLocalized("mash p16l kucuk baski tablasi", "mash p16l kucuk baski tablasi"),
    tLocalized("mash p16l buyuk baski tablasi", "mash p16l buyuk baski tablasi"),
    "mash p16l recine tanki",
    "seffaf acf film",
    "seffaf fep film",
    tLocalized("piocreat c01 lcd ekran kiti", "Piocreat C01 LCD Ekran Kiti"),
    tLocalized("creality halot sky lcd ekran kiti", "Creality Halot Sky LCD ekran kiti"),
  ];
  const systemKeys = [
    "sistemler",
    tLocalized("trasformer comp flow", "Trasformer Comp Flow"),
    "trasformer comp flow siringa kompozit",
    tLocalized("trasformer light glass", "TRASFORMER LIGHT GLASS"),
    tLocalized("trasformer light glass mufla sistemi", "Trasformer Light Glass Mufla Sistemi"),
    "light glass mufla",
  ];
  const titaniumKeys = [
    "titanyum diskler",
    tLocalized("titanyum disk", "Titanium Disc"),
    "titanium disk",
    "mesa grade 5 eli",
    "mesa titanyum disk",
    "mesa titanium disk",
  ];

  if (dentalKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return dentalResinsCategoryData();
  }
  if (washCureKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return washCureCategoryData();
  }
  if (washingKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return washingCategoryData();
  }
  if (curingKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return curingCategoryData();
  }
  if (zirconKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return zirconBlocksCategoryData();
  }
  if (furnaceKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return dentalFurnacesCategoryData();
  }
  if (scannerKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return desktopScannersCategoryData();
  }
  if (spareKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return printerSparePartsCategoryData();
  }
  if (systemKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return systemsCategoryData();
  }
  if (titaniumKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return titaniumDiscsCategoryData();
  }
  if (printerKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return printersCategoryData();
  }
  return null;
}

