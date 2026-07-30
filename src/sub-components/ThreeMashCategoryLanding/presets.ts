import type { CategoryLandingData } from "./index";

function normalizeCategoryKey(value: string | undefined) {
  return (value || "")
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

export const dentalResinsCategoryData: CategoryLandingData = {
  kind: "resins",
  announcement: {
    highlight: "⚡ Doğru reçineyi mi arıyorsunuz?",
    text: "Uygulamanıza göre filtreleyin; emin değilseniz ekibimiz sizin için eşleştirir.",
    href: "#secici",
    ctaText: "Reçine seçiciye git →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Dental Reçineler",
  },
  hero: {
    titlePrefix: "Sonucun yarısı",
    titleEmphasis: "reçinede",
    titleSuffix: "saklı.",
    descriptionHtml:
      "Ana sayfada gördüğümüz gibi hassasiyet tek bir cihazdan çıkmaz. Doğru reçine, <b>doğru işe eşleştiğinde</b> ve cihazınızın parametreleriyle <b>birlikte kalibre edildiğinde</b> ortaya çıkar. CE Class IIa sertifikalı <b>CRS</b> hattı ve ekonomik <b>Mash</b> hattıyla, her uygulama için doğru bir reçine var.",
    buttons: [
      { label: "Reçineni seç ↓", href: "#secici", variant: "lime" },
      { label: "Emin değil misiniz? Ekibe sorun", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "CE", emphasis: "Class IIa", label: "biyouyumlu CRS hattı · sertifikalı" },
      { value: "16", emphasis: "reçine", label: "model, kron, protez, diş eti, splint, aligner, guide…" },
      { value: "Marka", emphasis: "bağımsız", label: "tüm DLP & LCD 3D yazıcılarla uyumlu" },
      { value: "Birlikte", emphasis: "kalibre", label: "cihaz parametrelerinizle eşleştirilerek teslim" },
    ],
  },
  selector: {
    anchorId: "secici",
    cardCtaText: "İncele",
    number: "01",
    label: "Reçine Seçici",
    titlePrefix: "Hangi işe",
    titleEmphasis: "hangi reçine?",
    sideHtml:
      "Uygulamanızı seçin, doğru reçineyi görün. Hepsi tüm DLP/LCD yazıcılarla çalışır; CRS hattı ayrıca <b>CE Class IIa</b> biyouyumludur.",
    filters: [
      { id: "all", label: "Tümü" },
      { id: "model", label: "Model" },
      { id: "kron", label: "Kron & Köprü" },
      { id: "protez", label: "Protez & Diş Eti" },
      { id: "splint", label: "Splint / Gece Plağı" },
      { id: "orto", label: "Ortodonti" },
      { id: "cerrahi", label: "Cerrahi / Döküm / Ölçü" },
    ],
    emptyMessageHtml: 'Bu kategoride ürün yok. <a href="/pages/iletisim">İhtiyacınızı bize iletin →</a>',
    products: [
      {
        title: "CRS Composite",
        descriptionHtml: "Geçici ve daimi kron-köprü. <b>144 MPa</b> eğilme mukavemeti, kompozit şırıngalarla birebir uyum.",
        href: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
        imageAlt: "CRS Composite reçine",
        filterId: "kron",
        tag: "CE CLASS IIa",
        hot: true,
        tone: "#F1ECE0",
      },
      {
        title: "CRS Model",
        descriptionHtml: "Master protez ve ortodontik modeller. Belirgin <b>kole hatları</b>, net marjinal uyum; kum/gri renk.",
        href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
        imageAlt: "CRS Model reçine",
        filterId: "model",
        tag: "HASSASİYET",
        tone: "#EFE7D3",
      },
      {
        title: "CRS Denture",
        descriptionHtml: "Çıkarılabilir protez tabanı. PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.",
        href: "/crs-denture-biouyumlu-protez-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
        imageAlt: "CRS Denture reçine",
        filterId: "protez",
        tag: "CE CLASS IIa",
        hot: true,
        tone: "#F6E3E4",
      },
      {
        title: "CRS Gingiva",
        descriptionHtml: "İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, elastik, doğal diş eti rengi.",
        href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
        imageAlt: "CRS Gingiva reçine",
        filterId: "protez",
        tag: "YIRTILMAZ",
        tone: "#F5DEE0",
      },
      {
        title: "CRS Splint Hard",
        descriptionHtml: "Sert gece plağı ve <b>oklüzal splint</b> için sağlam, stabil reçine.",
        href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
        imageAlt: "CRS Splint Hard reçine",
        filterId: "splint",
        tag: "SERT",
        tone: "#E6F2F0",
      },
      {
        title: "CRS Splint Soft",
        descriptionHtml: "Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.",
        href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
        imageAlt: "CRS Splint Soft reçine",
        filterId: "splint",
        tag: "ESNEK · CE",
        tone: "#E6F2F0",
      },
      {
        title: "CRS Aligner",
        descriptionHtml: "<b>Memory-shape</b> aligner reçinesi. Termoform sınırlarını aşar, minimal son işlem.",
        href: "/crs-aligner-memory-shape-ozellikli-aligner-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
        imageAlt: "CRS Aligner reçine",
        filterId: "orto",
        tag: "BİYOUYUMLU",
        hot: true,
        tone: "#E6F2F0",
      },
      {
        title: "CRS IBT",
        descriptionHtml: "Ortodontik braket yerleştirme (indirect bonding tray) için hassas, esnek reçine.",
        href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/1080/crs-ibt-resin.webp",
        imageAlt: "CRS IBT reçine",
        filterId: "orto",
        tag: "HASSAS · ESNEK",
        tone: "#E6F2F0",
      },
      {
        title: "CRS Guide",
        descriptionHtml: "Cerrahi rehber (guide) için biyouyumlu, hassas kılavuz reçinesi.",
        href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
        imageAlt: "CRS Guide reçine",
        filterId: "cerrahi",
        tag: "CE · BİYOUYUMLU",
        hot: true,
        tone: "#E6F2F0",
      },
      {
        title: "CRS Cast",
        descriptionHtml: "<b>Çekmeyen</b> döküm reçinesi. Tüm revetmanlarla, kalıntısız; kürleme gerektirmez.",
        href: "/crs-cast-cekmeyen-dokum-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
        imageAlt: "CRS Cast reçine",
        filterId: "cerrahi",
        tag: "DÖKÜM",
        tone: "#E4ECF5",
      },
      {
        title: "CRS Flexit",
        descriptionHtml: "Esnek protez reçinesi; <b>dayanım ve konfor</b> dengesi.",
        href: "/crs-flexit-recin-protez-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/1080/crs-flexit-resin.webp",
        imageAlt: "CRS Flexit reçine",
        filterId: "protez",
        tag: "ESNEK",
        tone: "#F6E3E4",
      },
      {
        title: "CRS Tray",
        descriptionHtml: "Kişiye özel <b>ölçü kaşığı</b> üretimi için stabil reçine.",
        href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
        imageAlt: "CRS Tray reçine",
        filterId: "cerrahi",
        tag: "ÖLÇÜ KAŞIĞI",
        tone: "#EEEEE9",
      },
      {
        title: "Mash Study",
        descriptionHtml: "Uygun fiyatlı, yüksek kaliteli <b>model reçinesi</b> — yüksek hacimli iş akışına.",
        href: "/mash-study-resin-dental-model-3d-yazici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/1080/mash-study-resin.webp",
        imageAlt: "Mash Study reçine",
        filterId: "model",
        tag: "EKONOMİK",
        tone: "#EEEEE9",
      },
      {
        title: "Mash Trial White",
        descriptionHtml: "Geçici dental reçine — <b>beyaz try-in</b>; hızlı prova ve deneme.",
        href: "/mash-trial-white-resin-gecici-dental-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
        imageAlt: "Mash Trial White reçine",
        filterId: "kron",
        tag: "EKONOMİK",
        tone: "#F4F4EF",
      },
      {
        title: "Mash Trial Pink",
        descriptionHtml: "<b>Pembe try-in</b> geçici reçinesi — protez provası için pratik çözüm.",
        href: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
        imageAlt: "Mash Trial Pink reçine",
        filterId: "protez",
        tag: "EKONOMİK",
        tone: "#F5DEE0",
      },
      {
        title: "Mash Clear",
        descriptionHtml: "Şeffaf, biyouyumlu <b>cerrahi kılavuz</b> reçinesi — ekonomik guide çözümü.",
        href: "/mash-clear-resin-dental-cerrahi-kilavuz-recinesi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
        imageAlt: "Mash Clear reçine",
        filterId: "cerrahi",
        tag: "EKONOMİK",
        tone: "#E6F2F0",
      },
    ],
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "CRS COMPOSITE · CE CLASS IIa",
      titlePrefix: "Daimi kron artık",
      titleEmphasis: "baskıdan",
      titleSuffix: "çıkıyor.",
      descriptionHtml:
        "Geçici ve daimi kron-köprülerin katmanlı üretimi için biyouyumlu reçine. Rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum; yarı saydamlık–opaklık arasında dengeli translüsentlik. Ağız koşullarına dayanıklı, tat/koku yapmaz.",
      href: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
      ctaText: "Ürün detayına git →",
      specs: [
        { label: "Eğilme mukavemeti (ISO 10477)", value: "144 MPa" },
        { label: "Eğilme modülü (ISO 10477)", value: "5000 MPa" },
        { label: "Uygulama", value: "Geçici + daimi kron-köprü" },
        { label: "Uyum", value: "Tüm DLP / LCD yazıcılar" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "İki Hat, Tek Standart",
    titlePrefix: "Bütçenize göre hat,",
    titleEmphasis: "kaliteye göre değil.",
    sideHtml:
      "İster premium ister ekonomik seçin; ikisi de <b>tüm marka yazıcılarla</b> çalışır ve teknik ekibimizin parametre desteğiyle gelir.",
    lineCards: [
      {
        marker: "CRS",
        title: "CRS — Biyouyumlu premium hat",
        descriptionHtml:
          "CRSCAM üretimi, <b>CE Class IIa</b> sertifikalı; hassasiyet, dayanım ve biyouyumluluğun kritik olduğu işler için. Ağız içinde kalan tüm uygulamaların adresi.",
        items: ["Kron-köprü, protez, diş eti, aligner, splint, guide", "CE Class IIa · klinik güvenlik standartları", "Cihaz parametrelerinizle birlikte kalibre"],
        variant: "accent",
      },
      {
        marker: "M",
        title: "Mash — Ekonomik hat",
        descriptionHtml:
          "Yüksek hacimli, ağız dışı ve deneme işleri için <b>uygun maliyetli</b> alternatif. Model, try-in ve ekonomik guide ihtiyaçlarını karşılar.",
        items: ["Study model, Trial (white/pink), Clear guide", "Yüksek hacimde maliyet avantajı", "Aynı teknik destek, aynı marka bağımsızlık"],
        variant: "plain",
      },
    ],
    callout: {
      titlePrefix: "Reçine tek başına yeterli değil:",
      titleEmphasis: "kürleme sonucu tamamlar.",
      descriptionHtml:
        "Doğru reçineyi seçseniz bile, yanlış post-curing hassasiyeti ve dayanımı bozar. Her CRS reçinesi bir <b>kürleme protokolüyle</b> gelir; akıllı kürleme cihazımız bu protokolü otomatik uygular.",
      buttons: [{ label: "Kürlemenin önemini gör →", href: "/#kurleme", variant: "dark" }],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Reçine seçerken merak edilenler.",
    sideHtml: "Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.",
    items: [
      {
        question: "Hangi dental reçineyi seçmeliyim?",
        answerHtml:
          'Reçineyi <b>uygulamaya göre</b> seçmelisiniz: model için <b>CRS Model</b> ya da ekonomik <b>Mash Study</b>; geçici/daimi kron-köprü için <b>CRS Composite</b>; protez tabanı için <b>CRS Denture</b>; diş eti için <b>CRS Gingiva</b>; gece plağı için <b>CRS Splint Hard/Soft</b>; şeffaf hizalayıcı için <b>CRS Aligner</b>; cerrahi rehber için <b>CRS Guide</b>. Emin değilseniz yukarıdaki <a href="#secici">reçine seçiciyi</a> kullanın veya ekibimize danışın.',
      },
      {
        question: "CE Class IIa biyouyumluluk ne anlama geliyor?",
        answerHtml:
          "CE Class IIa, ağız içinde belirli bir süre temas eden tıbbi cihaz sınıfıdır; reçinenin <b>hasta güvenliği ve biyouyumluluk</b> standartlarını karşıladığını gösterir. CRS hattımız CE Class IIa sertifikalıdır ve MDR süreçleri üretici ortağımız CRSCAM tarafından yürütülür.",
      },
      {
        question: "Reçineleriniz başka marka 3D yazıcılarla çalışır mı?",
        answerHtml:
          "Evet. Tüm CRS ve Mash reçineleri <b>tüm DLP ve LCD marka</b> yazıcılarla uyumludur. Ayrıca teknik ekibimiz, reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> teslim eder — böylece marka fark etmeden aynı sonucu alırsınız.",
      },
      {
        question: "Model reçinesinde nelere dikkat etmeliyim?",
        answerHtml:
          "İyi bir model reçinesinde <b>boyutsal doğruluk</b>, yüksek detay çözünürlüğü, belirgin kole hatları ve mat/lekesiz yüzey aranır. CRS Model kum ve gri renk seçenekleriyle optik tespit için yüksek görsel detay sunar.",
      },
      {
        question: "Reçine performansını kürleme etkiler mi?",
        answerHtml:
          'Kesinlikle. <b>Yetersiz kürleme</b> kırılganlık ve monomer salınımı, <b>fazla kürleme</b> deformasyon yaratır. Doğru reçine bile yanlış kürlemeyle başarısız olur; bu yüzden her reçineyi bir kürleme protokolüyle veriyoruz. Detay için <a href="/#kurleme">kürleme bölümüne</a> bakabilirsiniz.',
      },
    ],
  },
  finalCta: {
    titlePrefix: "İşinize uygun reçineyi",
    titleEmphasis: "birlikte seçelim.",
    descriptionHtml:
      "Hangi uygulama, hangi cihaz, hangi bütçe? Kısa bir görüşmeyle size en uygun CRS veya Mash reçinesini ve doğru parametreleri <b>ücretsiz</b> önerelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Reçine seçiciye dön", href: "#secici", variant: "inverse" },
    ],
  },
};

export const printersCategoryData: CategoryLandingData = {
  kind: "printers",
  announcement: {
    highlight: "⚡ Hangi yazıcı size uygun?",
    text: "Hız, çözünürlük ve bütçeye göre karşılaştırın; emin değilseniz ekibimiz eşleştirir.",
    href: "#karsilastir",
    ctaText: "Karşılaştırmaya git →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "3D Yazıcılar",
  },
  hero: {
    titlePrefix: "±20 mikron",
    titleEmphasis: "burada doğar.",
    descriptionHtml:
      "Hassasiyet tesadüf değildir; <b>doğru dalga boyu</b>, termal stabilite ve kalibrasyonla kurulur. 3mash yazıcıları malzemeye göre tasarlanır: <b>385 nm</b> ışık reçinenin kürlenme spektrumuna tam uyar, entegre ısıtma viskoziteyi sabitler. Üstelik <b>gizli lisans veya RFID ücreti yok</b> — istediğiniz reçineyle çalışırsınız.",
    buttons: [
      { label: "Yazıcıları karşılaştır ↓", href: "#karsilastir", variant: "lime" },
      { label: "Bana uygun olanı öner", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "385", emphasis: "nm", label: "reçine kürlenme spektrumuna tam uyum · keskin marjin" },
      { value: "14×19", emphasis: "µm", label: "MASH P16L · 16K XY çözünürlük" },
      { value: "±20", emphasis: "µm", label: "CURIE M1 · tekrarlanabilir doğruluk" },
      { value: "0", emphasis: "gizli ücret", label: "lisans / RFID kilidi yok · marka bağımsız reçine" },
    ],
  },
  selector: {
    anchorId: "karsilastir",
    cardCtaText: "İncele",
    number: "01",
    label: "Cihazlar",
    titlePrefix: "İhtiyacınıza göre",
    titleEmphasis: "üç yol.",
    sideHtml:
      "En yüksek çözünürlük, en yüksek hız ya da en uygun giriş — üçü de aynı 3mash desteğiyle ve <b>gizli ücret olmadan</b> gelir.",
    products: [
      {
        title: "MASH P16L",
        descriptionHtml: "385 nm profesyonel dental yazıcı. <b>16K</b> ultra çözünürlük ve termal kontrolle en detaylı yüzey ve keskin marjin.",
        href: "/mash-p16l-385nm-16k-dental-3d-yazici",
        tag: "EN YÜKSEK ÇÖZÜNÜRLÜK",
        status: "Satışta",
        hot: true,
        sourceIcon: true,
        specs: [
          { label: "Çözünürlük", value: "14×19 µm · 16K" },
          { label: "Işık", value: "385 nm UV" },
          { label: "Kalibrasyon", value: "8 nokta dikey kilit" },
        ],
      },
      {
        title: "Mash CURIE M1",
        descriptionHtml: "Antalya Teknokent'te üretilen <b>tamamen yerli</b> yazıcı. Hız ve düşük toplam maliyet için tasarlandı.",
        href: "/mash-curie-m1-dental-3d-yazici",
        tag: "YERLİ · HIZLI",
        status: "Talep üzerine",
        sourceIcon: true,
        specs: [
          { label: "Hassasiyet", value: "±20 µm tekrarlanabilir" },
          { label: "Hız", value: "14 dk'da geçici kron" },
          { label: "Kalibrasyon", value: "6 aya kadar gerekmez" },
        ],
      },
      {
        title: "Creality Halot-Sky 6K",
        descriptionHtml: "6K çözünürlük; <b>3mash iyileştirmeli</b> versiyonda <b>±15 µm</b> garanti. $10.000'lık cihaz kalitesine çok daha uygun fiyata.",
        href: "/creality-halot-sky-6k",
        tag: "EKONOMİK GİRİŞ",
        status: "Talep üzerine",
        sourceIcon: true,
        specs: [
          { label: "Çözünürlük", value: "6K" },
          { label: "Hassasiyet", value: "±15 µm (arttırılmış)" },
          { label: "Versiyon", value: "Fabrika / Arttırılmış" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Özellik" },
        { title: "MASH P16L", subtitle: "En yüksek çözünürlük" },
        { title: "Mash CURIE M1", subtitle: "Hız + yerli" },
        { title: "Creality Halot-Sky 6K", subtitle: "Ekonomik giriş" },
      ],
      rows: [
        { label: "Çözünürlük / Hassasiyet", values: ["<b>14×19 µm</b> · 16K", "<b>±20 µm</b> tekrarlanabilir", "<b>±15 µm</b> (arttırılmış)"] },
        { label: "Işık kaynağı", values: ["385 nm UV", "Yerli optik sistem", "6K LCD"] },
        { label: "Hız", values: ["Yüksek detay odaklı", "<b>14 dk'da</b> geçici kron", "Standart"] },
        { label: "Termal kontrol", values: ["Entegre ısıtma (25/30°C)", "—", "—"] },
        { label: "Kalibrasyon", values: ["8 nokta dikey kilit · aylarca stabil", "6 aya kadar gerekmez", "3mash servis desteği"] },
        { label: "Gizli lisans / RFID", values: ['<span class="tmcl-yes">Yok</span>', '<span class="tmcl-yes">Yok</span>', '<span class="tmcl-yes">Yok</span>'] },
        { label: "En uygun", values: ["Detay & keskin marjin gereken işler", "Yüksek hacim, hız, düşük TCO", "Dijitale ekonomik giriş"] },
      ],
      noteHtml:
        "Not: Tüm 3mash yazıcılarında <b>gizli lisans veya RFID ücreti yoktur</b> ve dilediğiniz marka reçineyle çalışabilirsiniz. Stok durumu için ekibimize danışın.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "MASH P16L · 385nm · 16K",
      titlePrefix: "Marjin hattı,",
      titleEmphasis: "saç telinden ince.",
      descriptionHtml:
        "Profesyonel 385 nm UV kaynağı reçinelerin kürlenme spektrumuna tam uyar; parazit ışığı minimize ederek <b>keskin marjin hatları</b> sunar. 16K çözünürlük 14×19 µm XY hassasiyet getirir; entegre termal kontrol reçine viskozitesini sabitleyerek <b>her baskıda</b> aynı sonucu güvence altına alır.",
      href: "/mash-p16l-385nm-16k-dental-3d-yazici",
      ctaText: "Ürün detayına git →",
      specs: [
        { label: "XY çözünürlük", value: "14×19 µm (16K)" },
        { label: "Işık kaynağı", value: "385 nm UV" },
        { label: "Termal kontrol", value: "Entegre (25/30°C)" },
        { label: "Kalibrasyon", value: "8 nokta dikey kilit" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Neden 3mash Yazıcıları Farklı",
    titlePrefix: "İyi cihaz değil,",
    titleEmphasis: "doğru sistem.",
    sideHtml: "Hassasiyet dört şeyin bir araya gelmesiyle çıkar. 3mash yazıcıları bunları baştan düşünülerek tasarlanır.",
    whyCards: [
      { number: "01", title: "Malzemeye göre ışık", descriptionHtml: "<b>385 nm</b> dalga boyu reçine kimyasına uyar; parazit ışığı azaltır, marjini keskinleştirir. (P16L)" },
      { number: "02", title: "Termal stabilite", descriptionHtml: "Entegre ısıtma <b>reçine viskozitesini</b> sabitler; baskıdan baskıya sonucu tekrar edilebilir kılar." },
      { number: "03", title: "Kalibrasyon derdi yok", descriptionHtml: "8 nokta dikey kilit ve <b>6 aya kadar</b> kalibrasyon gerektirmeyen yapı — her gün aynı doğruluk." },
      { number: "04", title: "Kilitlenme yok", descriptionHtml: "<b>Gizli lisans / RFID ücreti yok.</b> İstediğiniz marka reçineyle çalışır, bir ekosisteme mahkûm olmazsınız." },
    ],
    callout: {
      titlePrefix: "Yazıcı, hikâyenin",
      titleEmphasis: "üçte biri.",
      descriptionHtml:
        "En iyi cihaz bile yanlış reçine veya yanlış kürlemeyle hassasiyeti kaybeder. Kuronun oturması <b>yazıcı + reçine + kürlemenin</b> senkronuna bağlıdır — biz üçünü birlikte kalibre ediyoruz.",
      buttons: [
        { label: "Uyumlu reçineler →", href: "/dental-3d-yazici-recineleri", variant: "dark" },
        { label: "Kürlemenin önemi →", href: "/#kurleme", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Yazıcı seçerken merak edilenler.",
    sideHtml: "Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.",
    items: [
      {
        question: "Hangi dental 3D yazıcıyı seçmeliyim?",
        answerHtml:
          'İhtiyacınıza göre: en yüksek çözünürlük ve keskin marjin için <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); hız ve düşük toplam maliyet için yerli <b>Mash CURIE M1</b> (±20 µm, 14 dk\'da geçici kron); dijitale ekonomik giriş için <b>Creality Halot-Sky 6K</b> (arttırılmış versiyonda ±15 µm). Emin değilseniz yukarıdaki <a href="#karsilastir">karşılaştırmayı</a> kullanın veya ekibimize danışın.',
      },
      {
        question: "385 nm mi, 405 nm mi? Fark ne?",
        answerHtml:
          '<b>385 nm</b> dalga boyu, çoğu dental reçinenin kürlenme spektrumuna daha iyi uyar; parazit ışığı azaltır ve daha keskin marjinler sağlar. MASH P16L bu yüzden profesyonel 385 nm UV kaynağı kullanır. Detaylı karşılaştırma için Mash Academy\'deki <a href="/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a> yazısına bakabilirsiniz.',
      },
      {
        question: "Gizli lisans veya RFID reçine ücreti var mı?",
        answerHtml:
          "<b>Hayır.</b> 3mash yazıcılarında gizli lisans veya RFID kilidi yoktur. Cihazı bir marka reçineye mahkûm etmiyoruz; dilediğiniz reçineyle çalışabilir, maliyetinizi kendiniz kontrol edebilirsiniz.",
      },
      {
        question: "Ne sıklıkta kalibrasyon gerekir?",
        answerHtml:
          "Sık sık değil. MASH P16L <b>8 nokta dikey kilit</b> sayesinde aylarca stabil kalır; Mash CURIE M1 <b>6 aya kadar</b> kalibrasyon gerektirmez. Böylece her gün aynı doğrulukta baskı alırsınız.",
      },
      {
        question: "Başka marka reçineyle çalışır mı?",
        answerHtml:
          "Evet. 3mash yazıcıları marka bağımsızdır. Dahası teknik ekibimiz, kullandığınız reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> en iyi sonucu almanızı sağlar.",
      },
    ],
  },
  finalCta: {
    titlePrefix: "Doğru yazıcıyı",
    titleEmphasis: "birlikte seçelim.",
    descriptionHtml:
      "Hangi işler, hangi hacim, hangi bütçe? Kısa bir görüşmeyle size en uygun cihazı, reçineyi ve doğru parametreleri <b>ücretsiz</b> önerelim — elinizdeki cihazı da değerlendiririz.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Karşılaştırmaya dön", href: "#karsilastir", variant: "inverse" },
    ],
  },
};

export function categoryLandingDataFromKey(value: string | undefined): CategoryLandingData | null {
  const key = normalizeCategoryKey(value);
  if (!key) return null;
  const dentalKeys = ["dental 3d yazici recineleri", "3d yazici recineleri", "dental recineler", "dental recine"];
  const printerKeys = ["3d yazicilar", "dental 3d yazicilar", "mash p16l", "curie m1", "halot sky", "creality halot"];

  if (dentalKeys.some((categoryKey) => key.includes(categoryKey))) {
    return dentalResinsCategoryData;
  }
  if (printerKeys.some((categoryKey) => key.includes(categoryKey))) {
    return printersCategoryData;
  }
  return null;
}

export function createGenericCategoryLandingData(categoryName: string | undefined): CategoryLandingData {
  const title = categoryName?.trim() || "Ürünler";
  return {
    kind: "generic",
    announcement: {
      highlight: "Doğru ürünü mü arıyorsunuz?",
      text: "Kategori ürünlerini inceleyin; emin değilseniz ekibimiz ihtiyacınıza göre eşleştirir.",
      href: "#urunler",
      ctaText: "Ürünlere git →",
    },
    breadcrumb: {
      homeLabel: "Ana sayfa",
      homeHref: "/",
      parentLabel: "Ürünler",
      currentLabel: title,
    },
    hero: {
      titlePrefix: title,
      titleEmphasis: "tek ekosistemde.",
      descriptionHtml:
        "3mash ürün ailesinde cihaz, malzeme, yazılım akışı ve teknik destek birlikte düşünülür. Bu kategorideki ürünleri kullanım amacınıza, cihaz uyumuna ve üretim hacminize göre seçebilirsiniz.",
      buttons: [
        { label: "Ürünleri incele ↓", href: "#urunler", variant: "lime" },
        { label: "Uzmana danış", href: "/pages/iletisim", variant: "line" },
      ],
      metrics: [
        { value: "Marka", emphasis: "bağımsız", label: "uyum ve kurulum desteğiyle teslim" },
        { value: "Teknik", emphasis: "destek", label: "satış sonrasında mühendis + teknisyen ekibi" },
        { value: "Academy", emphasis: "bilgisi", label: "doğru kullanım ve üretim know-how'ı" },
        { value: "Uçtan uca", emphasis: "akış", label: "ürün, parametre ve proses birlikte planlanır" },
      ],
    },
    selector: {
      anchorId: "urunler",
      cardCtaText: "İncele",
      number: "01",
      label: "Kategori Ürünleri",
      titlePrefix: "Bu kategorideki",
      titleEmphasis: "ürünler.",
      sideHtml:
        "Canlı ürün listesi ikas kategori verisinden gelir. Kartlar aynı kategori template'i içinde ürün görseli, marka ve ürün linkiyle render edilir.",
      products: [],
      emptyMessageHtml: '<a href="/pages/iletisim">Bu kategori için ekibimize ulaşın →</a>',
    },
    feature: {
      number: "02",
      label: "Kategori Odağı",
      content: {
        eyebrow: "3MASH KATEGORİ EKOSİSTEMİ",
        titlePrefix: "Ürün değil,",
        titleEmphasis: "çalışan proses",
        titleSuffix: "seçin.",
        descriptionHtml:
          "3mash kategorileri tek başına ürün satışı gibi tasarlanmaz. Doğru ürünün yanında kurulum, parametre, sarf uyumu ve satış sonrası teknik destek aynı kararın parçasıdır.",
        href: "/pages/iletisim",
        ctaText: "Kategori danışmanlığı al →",
        specs: [
          { label: "Kurulum", value: "Teknik ekip desteği" },
          { label: "Uyum", value: "Marka bağımsız ekosistem" },
          { label: "Eğitim", value: "Mash Academy" },
          { label: "Destek", value: "Satış sonrası takip" },
        ],
      },
    },
    detail: {
      number: "03",
      label: "Seçim Mantığı",
      titlePrefix: "Kategori seçimi,",
      titleEmphasis: "iş akışına göre yapılır.",
      sideHtml:
        "Ürünleri sadece teknik özelliklerine göre değil; hacim, hassasiyet beklentisi, mevcut cihaz parkı ve kullanıcı alışkanlıklarıyla birlikte değerlendirmek gerekir.",
      whyCards: [
        { number: "01", title: "İhtiyaca göre ürün", descriptionHtml: "Klinik veya laboratuvarın gerçek üretim hacmi ve kullanım senaryosu önce gelir." },
        { number: "02", title: "Uyumlu ekosistem", descriptionHtml: "Ürün; yazıcı, sarf, kürleme, yazılım ve teknik destekle birlikte düşünülür." },
        { number: "03", title: "Kurulum desteği", descriptionHtml: "Parametre ve ilk kullanım desteği ürün performansını doğrudan etkiler." },
        { number: "04", title: "Sürdürülebilir kullanım", descriptionHtml: "Eğitim, servis ve sarf devamlılığı toplam sahip olma maliyetini belirler." },
      ],
      callout: {
        titlePrefix: "Emin değilseniz,",
        titleEmphasis: "birlikte eşleştirelim.",
        descriptionHtml:
          "Elinizdeki cihazları, üretim hedefinizi ve bütçenizi birlikte değerlendirelim; kategori içinden doğru ürün kombinasyonunu netleştirelim.",
        buttons: [
          { label: "Uzmana danış →", href: "/pages/iletisim", variant: "dark" },
          { label: "Academy'ye git →", href: "/pages/mash-academy", variant: "line" },
        ],
      },
    },
    faq: {
      number: "04",
      label: "Sık Sorulanlar",
      title: "Kategori seçerken merak edilenler.",
      sideHtml: "Ürün grubundan bağımsız olarak seçim sürecinde en çok sorulan başlıklar.",
      items: [
        {
          question: "Bu kategoride hangi ürünü seçmeliyim?",
          answerHtml:
            "Seçimi kullanım amacınız, günlük üretim hacminiz, mevcut cihazlarınız ve bütçeniz belirler. Emin değilseniz ekibimiz sizin için doğru ürünü eşleştirir.",
        },
        {
          question: "Ürünler başka sistemlerle uyumlu mu?",
          answerHtml:
            "3mash yaklaşımı marka bağımsız çalışmayı destekler. Ürün grubuna göre uyum detayları değişir; satın almadan önce teknik ekipten teyit alabilirsiniz.",
        },
        {
          question: "Satış sonrası destek var mı?",
          answerHtml:
            "Evet. Kurulum, kullanım, parametre ve servis ihtiyaçları için teknik destek sağlanır; amaç ürünün sahada sürdürülebilir şekilde çalışmasıdır.",
        },
      ],
    },
    finalCta: {
      titlePrefix: "Doğru ürünü",
      titleEmphasis: "birlikte seçelim.",
      descriptionHtml:
        "Hangi kategori, hangi ürün, hangi bütçe? Kısa bir görüşmeyle size uygun ürünleri ve doğru kurulum akışını netleştirelim.",
      buttons: [
        { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
        { label: "Ürünlere dön", href: "#urunler", variant: "inverse" },
      ],
    },
  };
}
