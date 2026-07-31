import type { CategoryLandingData } from "./index";

function normalizeCategoryKey(value: string | undefined) {
  const decoded = (() => {
    try {
      return decodeURIComponent(value || "");
    } catch {
      return value || "";
    }
  })();

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

export const washCureCategoryData: CategoryLandingData = {
  kind: "wash-cure",
  announcement: {
    highlight: "⚡ Baskı sonrası sonucu sabitleyin",
    text: "Yıkama ve kürleme adımı doğru mekanik değerler için kritik; cihazı, reçine ve yazıcı akışınızla birlikte seçin.",
    href: "#cihaz",
    ctaText: "Cihaza git →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Yıkama Kürleme Cihazları",
  },
  hero: {
    titlePrefix: "Baskı bittiğinde",
    titleEmphasis: "sonuç daha bitmedi.",
    descriptionHtml:
      "Yıkama ve post-curing, dental 3D baskıda yüzey temizliğini, mekanik dayanımı ve ölçü stabilitesini tamamlayan adımdır. Doğru cihaz; reçinenin protokolünü, ışık dalga boyunu ve laboratuvar iş akışını aynı çizgide tutar.",
    buttons: [
      { label: "Yıkama & kürleme cihazını incele ↓", href: "#cihaz", variant: "lime" },
      { label: "Akışı birlikte kuralım", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "365", emphasis: "+ 405 nm", label: "ürün datasındaki çift dalga boylu kürleme desteği" },
      { value: "3", emphasis: "görsel", label: "canlı ürün sayfasından alınan doğru ürün görselleri" },
      { value: "1", emphasis: "cihaz", label: "kategori ItemList sırasındaki aktif ürün" },
      { value: "17.349", emphasis: "TRY", label: "canlı kategori JSON-LD fiyat bilgisi" },
    ],
  },
  selector: {
    anchorId: "cihaz",
    cardCtaText: "İncele",
    number: "01",
    label: "Cihaz",
    titlePrefix: "Baskı sonrası için",
    titleEmphasis: "tek doğru adım.",
    sideHtml:
      "Canlı kategori verisine göre bu kategoride aktif ürün <b>Creality Wash&Cure UW-03</b>. İsim, görsel, link ve sıra kategori ItemList datasıyla eşleşir.",
    products: [
      {
        title: "Creality Wash&Cure UW-03",
        descriptionHtml:
          "3D yazıcı baskıları için hızlı <b>yıkama ve kürleme</b> makinesi. Baskıların doğru mekanik değerlere ulaşması için 365 + 405 nm ışık dalga boylu kürleme akışı sunar.",
        href: "/creality-washcure-uw-02",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
        imageAlt: "Creality Wash&Cure UW-03 yıkama ve kürleme cihazı",
        tag: "YIKAMA & KÜRLEME",
        status: "17.349 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "1" },
          { label: "Işık", value: "365 + 405 nm" },
          { label: "Video", value: "Ürün sayfasında var" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Akış" },
        { title: "Yıkama" },
        { title: "Kürleme" },
        { title: "3mash ekosistemi" },
      ],
      rows: [
        { label: "Amaç", values: ["Baskı sonrası yüzey temizliği", "Mekanik değerleri tamamlamak", "Yazıcı, reçine ve post-process uyumu"] },
        { label: "Risk", values: ["Yetersiz temizlik yüzey kalitesini bozar", "Yanlış kürleme dayanımı ve stabiliteyi etkiler", "Parametreler birlikte düşünülmezse sonuç değişkenleşir"] },
        { label: "Bu kategori", values: ["Creality Wash&Cure UW-03", "365 + 405 nm kürleme desteği", "Teknik destek ve doğru protokol yönlendirmesi"] },
      ],
      noteHtml:
        "Ürün adı, görseli, fiyatı ve bağlantısı canlı <b>yikama-kurleme-cihazlari</b> kategori ItemList datasından alınmıştır.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "CREALITY WASH&CURE UW-03",
      titlePrefix: "Temizlik ve kürleme",
      titleEmphasis: "aynı akışta.",
      descriptionHtml:
        "Ürün detay datasına göre UW serisi cihaz, 3D yazıcı baskıları için hızlı yıkama ve kürleme makinesidir. Baskıların doğru mekanik değerlere ulaşması için çift dalga boylu ışıkla kürleme adımını destekler.",
      href: "/creality-washcure-uw-02",
      ctaText: "Ürün detayına git →",
      specs: [
        { label: "Canlı kategori adı", value: "Creality Wash&Cure UW-03" },
        { label: "Marka", value: "Creality" },
        { label: "Fiyat", value: "17.349 TRY" },
        { label: "Video", value: "youtube.com/watch?v=b3cLqCnfKAk" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Neden Gerekli",
    titlePrefix: "Kürleme,",
    titleEmphasis: "sonucu tamamlar.",
    sideHtml:
      "Yazıcı ve reçine doğru olsa bile baskı sonrası işlem eksikse yüzey, dayanım ve ölçü stabilitesi beklendiği gibi oluşmaz.",
    whyCards: [
      { number: "01", title: "Yüzey temizliği", descriptionHtml: "Yıkama adımı baskı üzerindeki fazla reçineyi temizler; sonraki kürleme için yüzeyi hazırlar." },
      { number: "02", title: "Mekanik değerler", descriptionHtml: "Post-curing, reçinenin hedef dayanımına yaklaşması için gereken tamamlayıcı adımdır." },
      { number: "03", title: "Protokol uyumu", descriptionHtml: "Cihaz seçimi reçine protokolüyle birlikte düşünülmeli; süre ve ışık uyumu sonucu doğrudan etkiler." },
      { number: "04", title: "Teknik destek", descriptionHtml: "3mash ekibi cihaz, reçine ve yazıcı parametrelerini birlikte değerlendirerek doğru akışı kurmanıza yardımcı olur." },
    ],
    callout: {
      titlePrefix: "Yazıcı + reçine +",
      titleEmphasis: "kürleme.",
      descriptionHtml:
        "Dental baskıda güvenilir sonuç üç adımın birlikte çalışmasıyla çıkar. Yıkama/kürleme cihazı, bu zincirin son halkasını kontrol altına alır.",
      buttons: [
        { label: "Uyumlu reçineleri gör →", href: "/dental-3d-yazici-recineleri", variant: "dark" },
        { label: "3D yazıcılara git →", href: "/3d-yazicilar", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Yıkama ve kürleme seçerken merak edilenler.",
    sideHtml: "Baskı sonrası işlemin dental sonuç üzerindeki etkisini net cevaplarla özetledik.",
    items: [
      {
        question: "Yıkama kürleme cihazı neden gerekli?",
        answerHtml:
          "Baskıdan çıkan parçanın yüzeyindeki fazla reçinenin temizlenmesi ve materyalin hedef mekanik değerlere ulaşması için yıkama ve post-curing adımı gerekir.",
      },
      {
        question: "Bu kategoride hangi ürün var?",
        answerHtml:
          'Canlı kategori ItemList datasına göre bu kategoride <b>Creality Wash&Cure UW-03</b> yer alıyor. Ürün bağlantısı <a href="/creality-washcure-uw-02">creality-washcure-uw-02</a> slugına gidiyor.',
      },
      {
        question: "365 + 405 nm ne işe yarar?",
        answerHtml:
          "Ürün detay açıklamasında çift dalga boylu kürleme desteği belirtiliyor. Bu destek, farklı reçine protokollerine daha uygun bir post-curing akışı kurmaya yardımcı olur.",
      },
      {
        question: "Yazıcı ve reçine doğruysa kürleme yine de önemli mi?",
        answerHtml:
          "Evet. Reçine ve yazıcı doğru seçilse bile yanlış veya eksik post-curing dayanım, yüzey kalitesi ve stabiliteyi etkileyebilir.",
      },
      {
        question: "Hangi protokolü kullanmalıyım?",
        answerHtml:
          "Kullanılan reçineye ve baskı tipine göre süre/ışık protokolü değişebilir. Emin değilseniz cihaz, reçine ve yazıcı bilginizle ekibimize danışın.",
      },
    ],
  },
  finalCta: {
    titlePrefix: "Baskı sonrası akışı",
    titleEmphasis: "birlikte kuralım.",
    descriptionHtml:
      "Hangi yazıcı, hangi reçine, hangi parça tipi? Kısa bir görüşmeyle yıkama ve kürleme adımını iş akışınıza göre birlikte netleştirelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Cihaza dön", href: "#cihaz", variant: "inverse" },
    ],
  },
};

export const zirconBlocksCategoryData: CategoryLandingData = {
  kind: "zircon",
  announcement: {
    highlight: "⚡ Zirkon seçimini vaka belirler",
    text: "Renk, kalınlık, translüsentlik ve sinterleme akışını birlikte kontrol ederek doğru ArgenZ zirkonu seçin.",
    href: "#zirkonlar",
    ctaText: "Zirkonları karşılaştır →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Zirkon Bloklar",
  },
  hero: {
    titlePrefix: "Doğru zirkon,",
    titleEmphasis: "vakanın içinde",
    titleSuffix: "seçilir.",
    descriptionHtml:
      "ArgenZ zirkon bloklarda sonuç; yalnızca diskin kendisinden değil, <b>endikasyon, renk, kalınlık, nesting ve sinterleme protokolünün</b> birlikte doğru kurulmasından gelir. Estetik multilayer geçişten yüksek dayanım isteyen restorasyonlara kadar üç aktif ArgenZ seçeneği aynı kategoride listelenir.",
    buttons: [
      { label: "Zirkonları incele ↓", href: "#zirkonlar", variant: "lime" },
      { label: "Vaka uyumunu sor", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "3", emphasis: "ürün", label: "canlı zirkon blok kategori sırasıyla eşleşir" },
      { value: "850", emphasis: "MPa", label: "ST Multilayer estetik zirkon dayanımı" },
      { value: "1250", emphasis: "MPa", label: "HT+ ve HT+ Multilayer yüksek dayanım sınıfı" },
      { value: "7.337", emphasis: "TRY", label: "kategori JSON-LD başlangıç fiyatı" },
    ],
  },
  selector: {
    anchorId: "zirkonlar",
    cardCtaText: "İncele",
    number: "01",
    label: "Zirkon Seçici",
    titlePrefix: "Estetik, dayanım,",
    titleEmphasis: "gradient.",
    sideHtml:
      "Canlı <b>zirkon-bloklar</b> kategori ItemList datasındaki ürün sırası, görseli ve bağlantısı korunur. Detay sayfasında yanlış JSON-LD dönen ürünlerde kategori datası esas alınır.",
    products: [
      {
        title: "ArgenZ HT+ Zirkon Blok",
        descriptionHtml:
          "Dayanım, performans ve estetik dengesini geniş endikasyonlarda kullanmak için konumlanan <b>HT+</b> zirkon blok.",
        href: "/argenz-ht-plus-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/1080/6.webp",
        imageAlt: "ArgenZ HT+ Zirkon Blok",
        tag: "HT+",
        status: "7.337 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "1" },
          { label: "Dayanım", value: "1250 MPa" },
          { label: "Translüsentlik", value: "45%" },
        ],
      },
      {
        title: "ArgenZ ST Multilayer Zirkon Blok",
        descriptionHtml:
          "Lityum disilikata alternatif olacak yüksek geçirgenlik ve doğal dentin geçişi isteyen estetik vakalar için <b>ST Multilayer</b> disk.",
        href: "/argenz-st-multilayer-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/1080/5.webp",
        imageAlt: "ArgenZ ST Multilayer Zirkon Blok",
        tag: "ST MULTILAYER",
        status: "7.337 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "2" },
          { label: "Dayanım", value: "850 MPa" },
          { label: "Translüsentlik", value: "50%" },
        ],
      },
      {
        title: "ArgenZ HT+ Multilayer Zirkon Blok",
        descriptionHtml:
          "HT+ materyal dayanımını doğal dentin-mine geçişine benzeyen <b>multilayer gradient</b> ile birleştiren zirkon disk.",
        href: "/argenz-ht-multilayer-zirkon-blok",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/1080/4.webp",
        imageAlt: "ArgenZ HT+ Multilayer Zirkon Blok",
        tag: "HT+ MULTILAYER",
        status: "7.337 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "3" },
          { label: "Dayanım", value: "1250 MPa" },
          { label: "Geçiş", value: "Doğal gradient" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Seçim" },
        { title: "HT+", subtitle: "Dayanım dengesi" },
        { title: "ST Multilayer", subtitle: "Estetik geçirgenlik" },
        { title: "HT+ Multilayer", subtitle: "Gradient + güç" },
      ],
      rows: [
        { label: "Odak", values: ["1250 MPa dayanım ve geniş endikasyon", "50% translüsentlik ve doğal dentin geçişi", "HT+ dayanımıyla multilayer shade geçişi"] },
        { label: "Uygun kullanım", values: ["Full contour, altyapı, dayanım odaklı kron/köprü", "Estetik anterior ve 1 pontikli 3 üyeye kadar köprü", "Doğal gradient istenen güçlü estetik restorasyonlar"] },
        { label: "Kontrol", values: ["Shrinkage, milling ve sinterleme çevrimi", "Renk, kalınlık ve disk içi konum", "Nesting yönü, shade doğruluğu ve finishing"] },
      ],
      noteHtml:
        "Ürün adları, ana görseller, fiyatlar ve kategori sırası canlı <b>zirkon-bloklar</b> ItemList datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "ARGENZ HT+ · 1250 MPa · 45%",
      titlePrefix: "Dayanım ve estetik",
      titleEmphasis: "aynı diskte.",
      descriptionHtml:
        "HT+ zirkonya, dayanım korunurken estetik ışık geçirgenliği hedefleyen restorasyonlar için konumlandırılır. Full contour ve altyapı işlerinde CAM shrinkage değeri, milling stratejisi ve sinterleme protokolü birlikte kontrol edilmelidir.",
      href: "/argenz-ht-plus-zirkon-blok",
      ctaText: "HT+ ürün detayına git →",
      specs: [
        { label: "Dayanım", value: "1250 MPa" },
        { label: "Translüsentlik", value: "45%" },
        { label: "Marka", value: "Argen" },
        { label: "Kategori", value: "Zirkon blok" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Seçim Mantığı",
    titlePrefix: "Zirkon blok,",
    titleEmphasis: "tek başına karar değildir.",
    sideHtml:
      "Aynı materyal farklı vaka, renk ve kalınlıkta farklı sonuç verir. Bu yüzden zirkon seçimi frezeleme ve sinterleme akışıyla birlikte düşünülmelidir.",
    whyCards: [
      { number: "01", title: "Endikasyon", descriptionHtml: "Tek kron, köprü, altyapı veya full contour ihtiyacı materyal tipini belirler." },
      { number: "02", title: "Renk ve kalınlık", descriptionHtml: "Shade seçimi, disk kalınlığı ve multilayer konumlandırma estetik sonucu doğrudan etkiler." },
      { number: "03", title: "CAM ve shrinkage", descriptionHtml: "Disk üzerindeki shrinkage değeri CAM yazılıma doğru girilmeli; nesting stratejisi vaka tipine göre kurulmalıdır." },
      { number: "04", title: "Sinterleme", descriptionHtml: "Fırın çevrimi, sıcaklık ve finishing/glaze adımları zirkon sonucunu tamamlar." },
    ],
    callout: {
      titlePrefix: "Blok + freze +",
      titleEmphasis: "fırın.",
      descriptionHtml:
        "Zirkon restorasyonun güvenilirliği, doğru disk seçimi kadar freze ve sinterleme adımlarının birlikte yönetilmesine bağlıdır.",
      buttons: [
        { label: "Dental fırınlara git →", href: "/dental-firinlar", variant: "dark" },
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Zirkon blok seçerken merak edilenler.",
    sideHtml: "Renk, kalınlık, materyal tipi ve sinterleme protokolü için temel karar noktaları.",
    items: [
      {
        question: "Bu kategoride hangi ürünler var?",
        answerHtml:
          "Canlı kategori datasına göre ArgenZ HT+ Zirkon Blok, ArgenZ ST Multilayer Zirkon Blok ve ArgenZ HT+ Multilayer Zirkon Blok listelenir.",
      },
      {
        question: "ST Multilayer ne zaman seçilir?",
        answerHtml:
          "Yüksek estetik, doğal dentin geçişi ve 50% translüsentlik ihtiyacında ST Multilayer uygun seçenektir.",
      },
      {
        question: "HT+ ne zaman seçilir?",
        answerHtml:
          "Dayanım, full contour veya altyapı restorasyonları ön plandaysa HT+ materyal sınıfı tercih edilir.",
      },
      {
        question: "HT+ Multilayer farkı nedir?",
        answerHtml:
          "HT+ dayanımını doğal shade gradient ve multilayer geçişle birleştirir; nesting pozisyonu renk sonucunu etkiler.",
      },
      {
        question: "Satın almadan önce ne kontrol edilmeli?",
        answerHtml:
          "Endikasyon, renk, kalınlık, CAM shrinkage değeri, freze stratejisi ve sinterleme protokolü birlikte kontrol edilmelidir.",
      },
    ],
  },
  finalCta: {
    titlePrefix: "Doğru zirkonu",
    titleEmphasis: "birlikte seçelim.",
    descriptionHtml:
      "Vaka tipi, renk, kalınlık ve fırın akışınızı kısa bir görüşmeyle netleştirip doğru ArgenZ zirkon bloğu birlikte belirleyelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Zirkonlara dön", href: "#zirkonlar", variant: "inverse" },
    ],
  },
};

export const dentalFurnacesCategoryData: CategoryLandingData = {
  kind: "furnaces",
  announcement: {
    highlight: "⚡ Fırın seçimi iş akışına göre yapılır",
    text: "Sinterleme, press ve porselen akışını laboratuvar hacminize göre karşılaştırın.",
    href: "#firinlar",
    ctaText: "Fırınları karşılaştır →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Dental Fırınlar",
  },
  hero: {
    titlePrefix: "Restorasyon kalitesi,",
    titleEmphasis: "kontrollü ısıyla",
    titleSuffix: "tamamlanır.",
    descriptionHtml:
      "Zirkon sinterleme, press seramik ve porselen pişiriminde sonuç; fırın sıcaklığı, çevrim kontrolü ve laboratuvar akışının birlikte kurulmasıyla stabil hale gelir. Naberthem hattı, hızlı sinterleme ihtiyacından vakumlu porselen pişirimine kadar dental üretimin kritik ısı adımlarını kapsar.",
    buttons: [
      { label: "Fırınları incele ↓", href: "#firinlar", variant: "lime" },
      { label: "Akışı birlikte planlayalım", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "4", emphasis: "ürün", label: "kategori sırası korunarak listelenir" },
      { value: "1650", emphasis: "°C", label: "LHT 02/17 LB Speed maksimum sıcaklık sınıfı" },
      { value: "1600", emphasis: "°C", label: "LHT 01/16 Turbo Fire hızlı sinterleme akışı" },
      { value: "Press", emphasis: "/ Porselen", label: "VL 01/12 LB hattında iki farklı laboratuvar işi" },
    ],
  },
  selector: {
    anchorId: "firinlar",
    cardCtaText: "İncele",
    number: "01",
    label: "Fırın Seçici",
    titlePrefix: "Sinterleme, press,",
    titleEmphasis: "porselen.",
    sideHtml:
      "Dental fırın seçimi tek bir teknik değerden ibaret değildir. Zirkon tipi, restorasyon hacmi, press/porselen ihtiyacı ve çevrim süresi birlikte düşünülmelidir.",
    products: [
      {
        title: "Naberthem LHT 02/17 LB Speed",
        descriptionHtml:
          "Zirkonya sinterleme için yüksek sıcaklık sınıfında konumlanan Speed fırın. <b>1650 °C</b> maksimum sıcaklık ve geniş fırın odasıyla yoğun laboratuvar akışına uygundur.",
        href: "/naberthem-lht-02-17-lb-speed",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4112bcc1-a205-4063-bb3b-c52112d8dba2/1080/firinlar4.webp",
        imageAlt: "Naberthem LHT 02/17 LB Speed dental fırın",
        tag: "SINTERLEME",
        status: "Teklif alın",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "1" },
          { label: "Maksimum", value: "1650 °C" },
          { label: "Akış", value: "Zirkonya sinterleme" },
        ],
      },
      {
        title: "Naberthem LHT 01/16 Turbo Fire",
        descriptionHtml:
          "Hızlı zirkonyum oksit sinterleme için kompakt çözüm. <b>1600 °C</b> sınıfı ve kısa çevrim ihtiyacı olan tek kron akışlarında öne çıkar.",
        href: "/naberthem-lht-01-16-turbo-fire",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cef47053-2e60-4139-9089-9aadb5855033/1080/firinlar3.webp",
        imageAlt: "Naberthem LHT 01/16 Turbo Fire dental fırın",
        tag: "TURBO FIRE",
        status: "Teklif alın",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "2" },
          { label: "Maksimum", value: "1600 °C" },
          { label: "Süreç", value: "1 saat" },
        ],
      },
      {
        title: "Naberthem VL 01/12 LB Pres Fırını",
        descriptionHtml:
          "Press seramik işleri için kaldırma tablalı dental fırın. Kontrollü fırın çevrimi, presleme akışını laboratuvar standardına bağlar.",
        href: "/naberthem-vl-01-12-lb-press-firini",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c72ba72c-c628-46f6-ac9d-863e3ccb6d8a/1080/firinlar2.webp",
        imageAlt: "Naberthem VL 01/12 LB Pres Fırını",
        tag: "PRESS",
        status: "Teklif alın",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "3" },
          { label: "Tip", value: "Pres fırını" },
          { label: "Yapı", value: "Kaldırma tabla" },
        ],
      },
      {
        title: "Naberthem VL 01/12 LB Porselen Fırını",
        descriptionHtml:
          "Vakumlu ve normal atmosfer porselen pişirimleri için dental fırın. Çepeçevre ısıtma yapısı homojen sıcaklık dağılımını destekler.",
        href: "/naberthem-vl-01-12-lb-porselen-firini",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3bfdd659-7c98-4939-8573-8fecb1408edc/1080/washcure-website-kopyasi.webp",
        imageAlt: "Naberthem VL 01/12 LB Porselen Fırını",
        tag: "PORSELEN",
        status: "Teklif alın",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "4" },
          { label: "Atmosfer", value: "Normal / vakum" },
          { label: "Isıtma", value: "Çepeçevre" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Akış" },
        { title: "LHT 02/17", subtitle: "yüksek hacim" },
        { title: "Turbo Fire", subtitle: "hızlı sinterleme" },
        { title: "VL 01/12", subtitle: "press / porselen" },
      ],
      rows: [
        { label: "Uygulama", values: ["Zirkonya sinterleme", "Hızlı zirkonyum oksit sinterleme", "Press seramik veya porselen pişirim"] },
        { label: "Sıcaklık / çevrim", values: ["1650 °C sınıfı", "1600 °C ve 1 saat odaklı akış", "Kontrollü fırın çevrimi"] },
        { label: "Seçim notu", values: ["Geniş fırın odası ve yoğun üretim", "1-3 tek kron gibi hızlı işler", "İş tipine göre press ya da porselen versiyon"] },
      ],
      noteHtml:
        "Ürün adı, ana görseli, bağlantısı ve kategori sırası <b>dental-firinlar</b> kategori datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "NABERTHEM LHT 02/17 LB SPEED",
      titlePrefix: "Zirkon sinterleme için",
      titleEmphasis: "yüksek sıcaklık",
      titleSuffix: "kontrolü.",
      descriptionHtml:
        "LHT 02/17 LB Speed, 1650 °C maksimum sıcaklık sınıfı ve geniş fırın odasıyla zirkonya sinterleme akışında öne çıkar. Elektrikli kaldırma masası ve kontrollü çevrim yapısı, laboratuvar üretimini tekrarlanabilir hale getirmeye yardımcı olur.",
      href: "/naberthem-lht-02-17-lb-speed",
      ctaText: "Ürün detayına git →",
      specs: [
        { label: "Maksimum sıcaklık", value: "1650 °C" },
        { label: "Uygulama", value: "Zirkonya sinterleme" },
        { label: "Yapı", value: "Elektrikli kaldırma masası" },
        { label: "Kategori sırası", value: "1" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Seçim Mantığı",
    titlePrefix: "Fırın seçimi,",
    titleEmphasis: "malzemeyle başlar.",
    sideHtml:
      "Zirkon, press seramik ve porselen pişiriminde aynı fırın mantığı kullanılmaz. Isı aralığı, çevrim süresi, yükleme yapısı ve restorasyon tipi birlikte değerlendirilmelidir.",
    whyCards: [
      { number: "01", title: "Sinterleme", descriptionHtml: "Zirkonya restorasyonlarda fırın sıcaklığı ve çevrim profili dayanım, renk ve ölçü stabilitesini etkiler." },
      { number: "02", title: "Hızlı çevrim", descriptionHtml: "Turbo Fire gibi hızlı çözümler, düşük adetli kron işlerinde teslim süresini kısaltmak için konumlanır." },
      { number: "03", title: "Press", descriptionHtml: "Press seramik akışında kaldırma tabla ve kontrollü çevrim, tekrarlanabilir presleme sonucunu destekler." },
      { number: "04", title: "Porselen", descriptionHtml: "Vakumlu veya normal atmosfer pişirimlerinde homojen ısıtma ve doğru çevrim yüzey kalitesini belirler." },
    ],
    callout: {
      titlePrefix: "Zirkon + fırın +",
      titleEmphasis: "protokol.",
      descriptionHtml:
        "Doğru blok seçimi, doğru sinterleme çevrimiyle tamamlanır. Zirkon disk, frezeleme stratejisi ve fırın programını aynı akışta değerlendirin.",
      buttons: [
        { label: "Zirkon bloklara git →", href: "/zirkon-bloklar", variant: "dark" },
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Dental fırın seçerken merak edilenler.",
    sideHtml: "Sinterleme, press ve porselen akışı için temel seçim noktaları.",
    items: [
      {
        question: "Bu kategoride hangi fırınlar var?",
        answerHtml:
          "Naberthem LHT 02/17 LB Speed, Naberthem LHT 01/16 Turbo Fire, Naberthem VL 01/12 LB Pres Fırını ve Naberthem VL 01/12 LB Porselen Fırını listelenir.",
      },
      {
        question: "Sinterleme fırını seçerken neye bakılmalı?",
        answerHtml:
          "Zirkon tipi, restorasyon adedi, maksimum sıcaklık, çevrim süresi, fırın odası hacmi ve laboratuvarın günlük üretim ritmi birlikte değerlendirilmelidir.",
      },
      {
        question: "Turbo Fire hangi işlerde mantıklı?",
        answerHtml:
          "Hızlı zirkonyum oksit sinterleme ihtiyacı olan, özellikle düşük adetli kron işlerinde kısa çevrim avantajı isteyen laboratuvarlar için uygundur.",
      },
      {
        question: "Press ve porselen fırını aynı şey mi?",
        answerHtml:
          "Hayır. Press seramik ve porselen pişirim süreçleri farklı ihtiyaçlara sahiptir; VL 01/12 LB hattında bu iki iş için ayrı ürünler bulunur.",
      },
      {
        question: "Zirkon blokla fırın birlikte mi seçilmeli?",
        answerHtml:
          "Evet. Zirkon blok materyali, sinterleme protokolü ve fırın çevrimi birlikte düşünülmediğinde renk, dayanım ve ölçü stabilitesi değişebilir.",
      },
    ],
  },
  finalCta: {
    titlePrefix: "Laboratuvarınıza uygun fırını",
    titleEmphasis: "birlikte seçelim.",
    descriptionHtml:
      "Hangi zirkon, hangi adet, hangi teslim süresi? Kısa bir görüşmeyle sinterleme, press veya porselen akışınız için doğru fırın seçimini netleştirelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Fırınlara dön", href: "#firinlar", variant: "inverse" },
    ],
  },
};

export const desktopScannersCategoryData: CategoryLandingData = {
  kind: "scanners",
  announcement: {
    highlight: "⚡ Tarayıcı seçimi üretim hacmine göre yapılır",
    text: "E2, E3 ve E4 arasındaki farkı laboratuvar iş akışınıza göre karşılaştırın.",
    href: "#tarayicilar",
    ctaText: "Tarayıcıları karşılaştır →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Masaüstü Tarayıcılar",
  },
  hero: {
    titlePrefix: "Dijital üretim,",
    titleEmphasis: "doğru taramayla",
    titleSuffix: "başlar.",
    descriptionHtml:
      "CAD/CAM akışında model verisinin kalitesi, üretimin geri kalanını doğrudan etkiler. 3Shape E serisi; doku taramasından implant bar doğruluğuna, yüksek hacimli tam çene taramaya kadar laboratuvarın tarama ihtiyacını üç farklı seviyede karşılar.",
    buttons: [
      { label: "Tarayıcıları incele ↓", href: "#tarayicilar", variant: "lime" },
      { label: "Laboratuvarı birlikte eşleyelim", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "3", emphasis: "ürün", label: "kategori sırası E2, E3, E4 olarak korunur" },
      { value: "4", emphasis: "μm", label: "3Shape E4 hassasiyet bilgisi" },
      { value: "9", emphasis: "sn", label: "3Shape E4 tam çene tarama hızı" },
      { value: "3Shape", emphasis: "E serisi", label: "dental laboratuvar CAD/CAM başlangıcı" },
    ],
  },
  selector: {
    anchorId: "tarayicilar",
    cardCtaText: "İncele",
    number: "01",
    label: "Tarayıcı Seçici",
    titlePrefix: "Doku, implant bar,",
    titleEmphasis: "hız.",
    sideHtml:
      "Masaüstü tarayıcı seçiminde ilk soru model değil, iş akışıdır. Doku taraması, implant bar doğruluğu ve yüksek hacimli tam çene tarama farklı cihaz seviyeleri gerektirir.",
    products: [
      {
        title: "3Shape E2",
        descriptionHtml:
          "Diş laboratuvarlarının üretkenliğini artırmak ve <b>doku taraması</b> yapmak için konumlanan masaüstü tarayıcı.",
        href: "/3shape-e2",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d2937ac4-16ad-4c18-a76e-24a2b26ced24/1080/e2-new-red-2.webp",
        imageAlt: "3Shape E2 masaüstü tarayıcı",
        tag: "DOKU TARAMASI",
        status: "Teklif alın",
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "1" },
          { label: "Odak", value: "Doku taraması" },
          { label: "Kullanım", value: "Dental laboratuvar" },
        ],
      },
      {
        title: "3Shape E3",
        descriptionHtml:
          "Uygun maliyetle yüksek performans sunan, özellikle <b>implant bar doğruluğu</b> için tasarlanmış masaüstü tarayıcı.",
        href: "/3shape-e3",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0adf4e0d-a7a0-48ef-b2f2-65b9c5719703/1080/e3-new-red.webp",
        imageAlt: "3Shape E3 masaüstü tarayıcı",
        tag: "IMPLANT BAR",
        status: "Teklif alın",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "2" },
          { label: "Odak", value: "İmplant bar doğruluğu" },
          { label: "Kullanım", value: "Dental laboratuvar" },
        ],
      },
      {
        title: "3Shape E4",
        descriptionHtml:
          "E serisinin en güçlü cihazı. <b>4 μm</b> hassasiyet, <b>9 sn</b> tam çene tarama ve dört kamera ile yüksek hacimli işlere odaklanır.",
        href: "/3shape-e4",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f6ee476e-9d5a-4744-b561-b2990f9db4ae/1080/4-1550872.webp",
        imageAlt: "3Shape E4 masaüstü tarayıcı",
        tag: "4 μm · 9 sn",
        status: "Teklif alın",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "3" },
          { label: "Hassasiyet", value: "4 μm" },
          { label: "Tam çene", value: "9 sn" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Seçim" },
        { title: "E2", subtitle: "doku taraması" },
        { title: "E3", subtitle: "implant bar" },
        { title: "E4", subtitle: "hız + hassasiyet" },
      ],
      rows: [
        { label: "Odak", values: ["Model ve doku taraması", "İmplant bar doğruluğu", "4 μm hassasiyet ve 9 sn tam çene"] },
        { label: "Laboratuvar tipi", values: ["Üretkenliği artırmak isteyen ekipler", "İmplant işlerinde doğruluk arayan lablar", "Yüksek hacimli ve hızlı tarama ihtiyacı"] },
        { label: "Video", values: ["6IUVgU336Qc", "6IUVgU336Qc", "-gsABaM06sg"] },
      ],
      noteHtml:
        "Ürün adı, ana görseli, bağlantısı ve kategori sırası <b>masasustu-tarayicilar</b> kategori datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "3SHAPE E4 · 4 μM · 9 SN",
      titlePrefix: "Hız ve hassasiyet",
      titleEmphasis: "aynı taramada.",
      descriptionHtml:
        "3Shape E4, dört kamera yapısı, 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla E serisinin en güçlü cihazı olarak konumlandırılır. Yoğun laboratuvar akışında hızlı ve hassas veri üretmek için öne çıkar.",
      href: "/3shape-e4",
      ctaText: "E4 ürün detayına git →",
      specs: [
        { label: "Hassasiyet", value: "4 μm" },
        { label: "Tam çene", value: "9 sn" },
        { label: "Kamera", value: "4" },
        { label: "Kategori sırası", value: "3" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Seçim Mantığı",
    titlePrefix: "Tarayıcı seçimi,",
    titleEmphasis: "iş tipine bağlıdır.",
    sideHtml:
      "Dental laboratuvarda tarama verisi, tasarım ve üretim sürecinin başlangıcıdır. Bu yüzden cihaz seçimi yalnızca fiyatla değil, iş tipi ve doğruluk ihtiyacıyla yapılmalıdır.",
    whyCards: [
      { number: "01", title: "Doku taraması", descriptionHtml: "E2, model ve doku tarama işlerinde üretkenliği artırmaya odaklanan giriş seviyesidir." },
      { number: "02", title: "İmplant bar doğruluğu", descriptionHtml: "E3, implant bar doğruluğu ve yüksek performans ihtiyacını uygun maliyetle karşılamak için konumlanır." },
      { number: "03", title: "Yüksek hacim", descriptionHtml: "E4, hızlı tam çene tarama ve hassasiyet gerektiren yoğun laboratuvar akışlarında öne çıkar." },
      { number: "04", title: "CAD/CAM bağlantısı", descriptionHtml: "Tarama datası, tasarım ve üretim adımlarına temel oluşturur; mevcut akışla uyum birlikte değerlendirilmelidir." },
    ],
    callout: {
      titlePrefix: "Tarama + tasarım +",
      titleEmphasis: "üretim.",
      descriptionHtml:
        "Masaüstü tarayıcı, dental CAD/CAM zincirinin ilk halkasıdır. Tarayıcı seçimini freze, zirkon, fırın ve yazıcı akışınızla birlikte planlayın.",
      buttons: [
        { label: "Sistemlere git →", href: "/sistemler", variant: "dark" },
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Masaüstü tarayıcı seçerken merak edilenler.",
    sideHtml: "E2, E3 ve E4 arasında karar verirken bakılması gereken temel noktalar.",
    items: [
      {
        question: "Bu kategoride hangi tarayıcılar var?",
        answerHtml:
          "Kategori datasına göre 3Shape E2, 3Shape E3 ve 3Shape E4 listelenir. Ürün sırası E2, E3, E4 olarak korunur.",
      },
      {
        question: "3Shape E2 ne için seçilir?",
        answerHtml:
          "Model ve doku taraması yapan, laboratuvar üretkenliğini artırmak isteyen ekipler için konumlanır.",
      },
      {
        question: "3Shape E3 farkı nedir?",
        answerHtml:
          "E3 tarafında implant bar doğruluğu ve yüksek performans vurgusu öne çıkar.",
      },
      {
        question: "3Shape E4 hangi durumda mantıklı?",
        answerHtml:
          "4 μm hassasiyet, 9 sn tam çene tarama ve dört kamera gerektiren yüksek hacimli laboratuvar akışlarında E4 öne çıkar.",
      },
      {
        question: "Tarayıcı seçimini neye göre yapmalıyım?",
        answerHtml:
          "Günlük tarama hacmi, implant bar işi olup olmadığı, tam çene hız beklentisi ve mevcut CAD/CAM akışı birlikte değerlendirilmelidir.",
      },
    ],
  },
  finalCta: {
    titlePrefix: "Laboratuvarınıza uygun tarayıcıyı",
    titleEmphasis: "birlikte seçelim.",
    descriptionHtml:
      "Doku taraması mı, implant bar doğruluğu mu, yüksek hacimli tam çene akışı mı? Kısa bir görüşmeyle E2, E3 ve E4 arasındaki doğru seçimi netleştirelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Tarayıcılara dön", href: "#tarayicilar", variant: "inverse" },
    ],
  },
};

export const printerSparePartsCategoryData: CategoryLandingData = {
  kind: "spares",
  announcement: {
    highlight: "⚡ Doğru yedek parça cihaz uyumuyla seçilir",
    text: "P16L, Halot Sky, Piocreat C01 ve sarf parçaları kategori sırasıyla karşılaştırın.",
    href: "#yedek-parcalar",
    ctaText: "Yedek parçaları gör →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "3D Yazıcı Yedek Parçaları",
  },
  hero: {
    titlePrefix: "Üretim sürekliliği,",
    titleEmphasis: "doğru parçayla",
    titleSuffix: "korunur.",
    descriptionHtml:
      "3D yazıcı bakımında parça seçimi yalnızca ürün adından ibaret değildir. Cihaz modeli, ekran revizyonu, tank/film uyumu, tabla kalibrasyonu ve ilk test baskısı birlikte kontrol edildiğinde üretim tekrar stabil hale gelir.",
    buttons: [
      { label: "Yedek parçaları incele ↓", href: "#yedek-parcalar", variant: "lime" },
      { label: "Uyumluluğu kontrol ettir", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "8", emphasis: "ürün", label: "canlı kategori sırası korunarak listelenir" },
      { value: "16K", emphasis: "LCD", label: "MASH P16L monokrom ekran yedek parçası" },
      { value: "800", emphasis: "ml", label: "MASH P16L reçine tankı kapasitesi" },
      { value: "6K", emphasis: "Mono", label: "Creality Halot Sky LCD ekran kiti" },
    ],
  },
  selector: {
    anchorId: "yedek-parcalar",
    cardCtaText: "İncele",
    number: "01",
    label: "Parça Listesi",
    titlePrefix: "Elektronik, tabla,",
    titleEmphasis: "tank ve film.",
    sideHtml:
      "Kategori içindeki ürünler bakım ve servis akışının farklı noktalarına denk gelir. Ana kart ve LCD ekran elektronik; tabla, tank ve film baskı temas yüzeyidir.",
    products: [
      {
        title: "MASH P16L Ana Kart (Kontrol Kartı)",
        descriptionHtml: "Motor, sensör ve veri iletişimi görevlerini yöneten <b>merkezi kontrol kartı</b> yedek parçası.",
        href: "/mash-p16l-ana-kart",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c9594235-74c3-4f06-9b83-84028ecc7716/1080/mash-p16l-ana-kart-kontrol-karti.webp",
        imageAlt: "MASH P16L Ana Kart Kontrol Kartı",
        tag: "KONTROL",
        status: "12.913 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "1" },
          { label: "Cihaz", value: "MASH P16L" },
          { label: "Tip", value: "Ana kart" },
        ],
      },
      {
        title: "MASH P16L 16K Monokrom LCD Ekran (9.6 inç)",
        descriptionHtml:
          "<b>16K UHD</b> monokrom LCD ekran. 385 nm uyumlu, 14x19 μm hassasiyet ve 100°C ısı direnciyle listelenir.",
        href: "/mash-p16l-16k-monokrom-lcd-ekran-yedek-parca",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/25a9f313-f298-4a05-98ff-1a5ec1773515/1080/mashp16l-lcd-ekran.webp",
        imageAlt: "MASH P16L 16K Monokrom LCD Ekran",
        tag: "16K LCD",
        status: "19.370 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "2" },
          { label: "Boyut", value: "9.6 inç" },
          { label: "Işık", value: "385 nm" },
        ],
      },
      {
        title: "MASH P16L Küçük Baskı Tablası (Hızlı Baskı & Tekli Vaka)",
        descriptionHtml:
          "Acil vakalar ve tekli üye üretimleri için optimize edilmiş <b>küçük baskı tablası</b>; düşük emiş davranışını destekler.",
        href: "/mash-p16l-kucuk-hizli-baski-tablasi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp",
        imageAlt: "MASH P16L Küçük Baskı Tablası",
        tag: "TEKLİ VAKA",
        status: "4.099 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "3" },
          { label: "Kullanım", value: "Hızlı baskı" },
          { label: "Uyum", value: "MASH P16L" },
        ],
      },
      {
        title: "MASH P16L Büyük Baskı Tablası (211x118mm)",
        descriptionHtml:
          "<b>211x118 mm</b> geniş baskı alanı için standart tabla. Yüzey tutunması ve platform hizalaması birlikte kontrol edilir.",
        href: "/mash-p16l-buyuk-baski-tablasi-211x118mm",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/588256f3-53a6-4f64-99ed-5428c3bbcaca/1080/masp16l-tabla.webp",
        imageAlt: "MASH P16L Büyük Baskı Tablası",
        tag: "211x118 mm",
        status: "5.166 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "4" },
          { label: "Ölçü", value: "211x118 mm" },
          { label: "Uyum", value: "MASH P16L" },
        ],
      },
      {
        title: "MASH P16L Reçine Tankı (800 ml)",
        descriptionHtml:
          "<b>800 ml</b> alüminyum reçine tankı. Vidasız hızlı kilit, UV korumalı kapak ve ısıtma sistemi uyumu öne çıkar.",
        href: "/mash-p16l-recine-tanki-800ml",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0bb3ef3d-0297-4119-96c3-5bb899f82e5f/1080/mash-p16l-orijinal-recine-tanki1.webp",
        imageAlt: "MASH P16L Reçine Tankı",
        tag: "800 ml",
        status: "4.492 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "5" },
          { label: "Kapasite", value: "800 ml" },
          { label: "Gövde", value: "Alüminyum" },
        ],
      },
      {
        title: "Şeffaf ACF Film – LCD/DLP Reçine 3D Yazıcılar İçin",
        descriptionHtml:
          "LCD ve DLP reçine 3D yazıcılarda tank alt yüzeyi için kullanılan <b>sarf film</b>; UV geçirgenliği ve katman oluşumunu destekler.",
        href: "/seffaf-fep-film-3d-yazici",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/43979b0b-5e26-4b8e-a0e1-f751a3929374/1080/acf-fep-film.webp",
        imageAlt: "Şeffaf ACF Film LCD DLP reçine 3D yazıcılar için",
        tag: "ACF / FEP",
        status: "2.077 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "6" },
          { label: "Uyum", value: "LCD / DLP" },
          { label: "Tip", value: "Sarf film" },
        ],
      },
      {
        title: "Piocreat C01 LCD Ekran Kiti",
        descriptionHtml:
          "Piocreat C01 3D yazıcı için <b>LCD ekran kiti</b>. Baskı performansını korumak ve stabil sonuç almak için konumlanır.",
        href: "/piocreat-c01-lcd-ekran-kiti",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5178138f-f83b-4c0e-b48a-78f5e04be566/1080/piocreat-lcd.webp",
        imageAlt: "Piocreat C01 LCD Ekran Kiti",
        tag: "C01 LCD",
        status: "20.718 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "7" },
          { label: "Cihaz", value: "Piocreat C01" },
          { label: "Tip", value: "LCD kit" },
        ],
      },
      {
        title: "Creality Halot Sky LCD Ekran Kiti - 6K Mono",
        descriptionHtml:
          "Creality Halot Sky için orijinal <b>6K Mono LCD</b> ekran kiti. Yüksek çözünürlük ve geniş dokunmatik ekranla listelenir.",
        href: "/creality-halot-sky-lcd-ekran-kiti-6k-mono",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a1735bcc-58b6-47c0-a820-ff325b8d4902/1080/creality-halot-sky-lcd-kit.webp",
        imageAlt: "Creality Halot Sky LCD Ekran Kiti 6K Mono",
        tag: "6K MONO",
        status: "20.605 TRY",
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "8" },
          { label: "Cihaz", value: "Halot Sky" },
          { label: "Tip", value: "LCD kit" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Grup" },
        { title: "Elektronik" },
        { title: "Baskı yüzeyi" },
        { title: "Tank / film" },
      ],
      rows: [
        { label: "Ürünler", values: ["Ana kart, 16K LCD, C01 LCD, Halot Sky LCD", "Küçük tabla, büyük tabla", "P16L reçine tankı, ACF/FEP film"] },
        { label: "Kontrol", values: ["Cihaz modeli, ekran revizyonu, bağlantı", "Tabla yüzeyi, hizalama, ilk katman", "Film gerginliği, tank yüzeyi, UV geçirgenliği"] },
        { label: "Amaç", values: ["Pozlama ve kontrol stabilitesi", "Baskı tutunması ve üretim hızı", "Reçine akışı ve katman ayrımı"] },
      ],
      noteHtml:
        "Ürün adı, fiyat, ana görsel, bağlantı ve sıra <b>3d-yazici-yedek-parcalari</b> kategori datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "MASH P16L · 16K LCD · 385 nm",
      titlePrefix: "Mikron detay",
      titleEmphasis: "LCD ekranda",
      titleSuffix: "başlar.",
      descriptionHtml:
        "MASH P16L 16K monokrom LCD ekran; 9.6 inç panel, 14x19 μm hassasiyet, 385 nm UV ışık uyumu ve 100°C ısı direnciyle dental üretimde yüksek detay seviyesini destekler.",
      href: "/mash-p16l-16k-monokrom-lcd-ekran-yedek-parca",
      ctaText: "LCD ekran detayına git →",
      specs: [
        { label: "Çözünürlük", value: "16K UHD" },
        { label: "Hassasiyet", value: "14x19 μm" },
        { label: "Ekran", value: "9.6 inç" },
        { label: "Işık", value: "385 nm" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Servis Mantığı",
    titlePrefix: "Parça değişimi,",
    titleEmphasis: "kalibrasyonla biter.",
    sideHtml:
      "Yedek parça değişiminde son adım montaj değil, cihazın yeniden stabil baskı verebildiğini doğrulamaktır. Ekran, tank filmi, tabla ve reçine birlikte kontrol edilmelidir.",
    whyCards: [
      { number: "01", title: "Cihaz uyumu", descriptionHtml: "Satın alma öncesi cihaz modeli, parça revizyonu ve bağlantı tipi doğrulanmalıdır." },
      { number: "02", title: "Temiz montaj", descriptionHtml: "LCD ekran, film ve tank yüzeyi reçine kalıntısı ve tozdan arındırılarak kurulmalıdır." },
      { number: "03", title: "İlk katman", descriptionHtml: "Tabla ve tank değişiminden sonra hizalama ve ilk katman tutunması test edilmelidir." },
      { number: "04", title: "Test baskısı", descriptionHtml: "Elektronik veya sarf parça değişiminden sonra kısa bir test baskısı üretim riskini azaltır." },
    ],
    callout: {
      titlePrefix: "Yedek parça +",
      titleEmphasis: "teknik destek.",
      descriptionHtml:
        "Parçayı tek başına satın almak yerine cihaz modelini ve baskı problemini birlikte kontrol edin. Doğru parça, doğru kurulum adımıyla üretimi tekrar stabil hale getirir.",
      buttons: [
        { label: "3D yazıcılara git →", href: "/3d-yazicilar", variant: "dark" },
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Yedek parça seçerken merak edilenler.",
    sideHtml: "Cihaz uyumu, kurulum ve test baskısı için temel kontrol noktaları.",
    items: [
      { question: "Bu kategoride hangi ürünler var?", answerHtml: "MASH P16L ana kart, LCD ekran, küçük/büyük baskı tablası, reçine tankı, ACF/FEP film, Piocreat C01 LCD ve Creality Halot Sky LCD ekran kiti listelenir." },
      { question: "Yanlış parça almamak için ne kontrol edilmeli?", answerHtml: "Cihaz modeli, parça revizyonu, ekran/tank ölçüsü ve bağlantı uyumu satın alma öncesi kontrol edilmelidir." },
      { question: "LCD ekran değişimi sonrası ne yapılmalı?", answerHtml: "Bağlantılar, ekran yüzeyi, tank filmi ve pozlama testi kontrol edilmelidir." },
      { question: "Tabla değişimi sonrası kalibrasyon gerekir mi?", answerHtml: "Evet. Platform hizalaması ve ilk katman tutunması test edilmelidir." },
      { question: "ACF/FEP film ne işe yarar?", answerHtml: "Tank alt yüzeyinde UV ışığın reçineye dengeli iletilmesini ve stabil katman oluşumunu destekleyen sarf malzemedir." },
    ],
  },
  finalCta: {
    titlePrefix: "Doğru yedek parçayı",
    titleEmphasis: "birlikte netleştirelim.",
    descriptionHtml:
      "Cihaz modelinizi, baskı probleminizi ve mevcut parça revizyonunu paylaşın; doğru ürünü ve kurulum kontrol listesini birlikte belirleyelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Yedek parçalara dön", href: "#yedek-parcalar", variant: "inverse" },
    ],
  },
};

export const systemsCategoryData: CategoryLandingData = {
  kind: "systems",
  announcement: {
    highlight: "⚡ Sistem ürünleri birlikte düşünülür",
    text: "Trasformer Comp Flow ve Light Glass akışını tam çene kompozit restorasyon ihtiyacına göre karşılaştırın.",
    href: "#sistemler",
    ctaText: "Sistemleri gör →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Sistemler",
  },
  hero: {
    titlePrefix: "Tam çene kompozitte",
    titleEmphasis: "sistem birlikte",
    titleSuffix: "çalışır.",
    descriptionHtml:
      "Trasformer sistemi; kompozit materyal, ışık geçirgenliği, doğruluk ve stabiliteyi aynı restorasyon akışında birleştirir. Comp Flow şırınga kompozit ve Light Glass mufla sistemi, vaka planıyla birlikte değerlendirilmelidir.",
    buttons: [
      { label: "Sistemleri incele ↓", href: "#sistemler", variant: "lime" },
      { label: "Vaka uyumunu sor", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "2", emphasis: "ürün", label: "kategori sırasıyla Comp Flow ve Light Glass" },
      { value: "Tam", emphasis: "çene", label: "kompozit restorasyon akışı" },
      { value: "CRS", emphasis: "Trasformer", label: "sistem ve materyal birlikte konumlanır" },
      { value: "14.654", emphasis: "TRY", label: "Light Glass kategori fiyat bilgisi" },
    ],
  },
  selector: {
    anchorId: "sistemler",
    cardCtaText: "İncele",
    number: "01",
    label: "Sistem Seçici",
    titlePrefix: "Kompozit materyal,",
    titleEmphasis: "mufla sistemi.",
    sideHtml:
      "Bu kategori tekil ürün listesinden çok bir restorasyon akışı gibi düşünülmelidir. Comp Flow materyal tarafını, Light Glass ise mufla sistemi tarafını temsil eder.",
    products: [
      {
        title: "Trasformer Comp Flow Şırınga Kompozit",
        descriptionHtml:
          "Trasformer Light Glass sistemiyle birlikte tam çene kompozit restorasyonlarda kullanılan <b>şırınga kompozit</b>.",
        href: "/trasformer-comp-flow-siringa-kompozit?Comp-Flow-Renk=Dentin-A1%2FB1-3g-1912001",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2eb7407c-c84b-4bf3-bb87-343b261f6854/1080/iso.webp",
        imageAlt: "Trasformer Comp Flow Şırınga Kompozit",
        tag: "COMP FLOW",
        status: "1.179 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "1" },
          { label: "Form", value: "Şırınga kompozit" },
          { label: "Akış", value: "Tam çene" },
        ],
      },
      {
        title: "Trasformer Light Glass Mufla Sistemi",
        descriptionHtml:
          "Tam çene kompozit restorasyonlarda <b>doğruluk, ışık geçirgenliği ve stabilite</b> hedefleyen mufla sistemi.",
        href: "/trasformer-light-glass-mufla-sistemi",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ee5b1f34-39b8-4ca3-b9d1-e911a6547b71/1080/tra.webp",
        imageAlt: "Trasformer Light Glass Mufla Sistemi",
        tag: "LIGHT GLASS",
        status: "14.654 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Sıra", value: "2" },
          { label: "Tip", value: "Mufla sistemi" },
          { label: "Hedef", value: "Stabil akış" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Akış" },
        { title: "Comp Flow" },
        { title: "Light Glass" },
        { title: "Birlikte" },
      ],
      rows: [
        { label: "Rol", values: ["Şırınga kompozit materyal", "Mufla sistemi", "Tam çene kompozit restorasyon akışı"] },
        { label: "Hedef", values: ["Kompozit uygulama", "Işık geçirgenliği ve stabilite", "Doğruluk, vaka planı ve restorasyon kontrolü"] },
        { label: "Kontrol", values: ["Renk ve materyal seçimi", "Sistem kullanımı ve vaka uyumu", "Vaka planı, materyal ve laboratuvar süreci"] },
      ],
      noteHtml:
        "Ürün adı, ana görsel, bağlantı ve sıra <b>sistemler</b> kategori datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "TRASFORMER LIGHT GLASS",
      titlePrefix: "Kompozit restorasyonda",
      titleEmphasis: "ışık ve stabilite.",
      descriptionHtml:
        "Trasformer Light Glass Mufla Sistemi, modern dijital laboratuvarların tam çene kompozit restorasyonlarda ihtiyaç duyduğu doğruluk, ışık geçirgenliği ve stabiliteyi desteklemek için tasarlanmıştır.",
      href: "/trasformer-light-glass-mufla-sistemi",
      ctaText: "Light Glass detayına git →",
      specs: [
        { label: "Ürün", value: "Mufla sistemi" },
        { label: "Uygulama", value: "Tam çene" },
        { label: "Materyal", value: "Kompozit" },
        { label: "Kategori sırası", value: "2" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Akış Mantığı",
    titlePrefix: "Sistem ürünü,",
    titleEmphasis: "tek parça değildir.",
    sideHtml:
      "Comp Flow ve Light Glass aynı restorasyon hedefinin iki parçasıdır. Materyal seçimi, mufla sistemi kullanımı ve vaka planı birlikte netleşmelidir.",
    whyCards: [
      { number: "01", title: "Materyal", descriptionHtml: "Comp Flow, sistem içindeki kompozit uygulama adımıdır; renk ve vaka planıyla seçilir." },
      { number: "02", title: "Mufla sistemi", descriptionHtml: "Light Glass, tam çene kompozit restorasyonlarda stabilite ve ışık geçirgenliği için konumlanır." },
      { number: "03", title: "Vaka planı", descriptionHtml: "Tam çene restorasyonlarda dijital plan, materyal ve sistem adımı birlikte düşünülmelidir." },
      { number: "04", title: "Laboratuvar akışı", descriptionHtml: "Sistem ürünleri mevcut laboratuvar süreci ve ekip alışkanlığına göre uygulanmalıdır." },
    ],
    callout: {
      titlePrefix: "Materyal + sistem +",
      titleEmphasis: "vaka.",
      descriptionHtml:
        "Tam çene kompozit restorasyon akışında doğru ürün seçimi vaka hedefiyle başlar. Renk, sistem uyumu ve laboratuvar sürecini birlikte netleştirin.",
      buttons: [
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "dark" },
        { label: "Tarayıcılara git →", href: "/masasustu-tarayicilar", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Sistem ürünleri hakkında merak edilenler.",
    sideHtml: "Trasformer Comp Flow ve Light Glass arasındaki rol ayrımı.",
    items: [
      { question: "Bu kategoride hangi ürünler var?", answerHtml: "Trasformer Comp Flow Şırınga Kompozit ve Trasformer Light Glass Mufla Sistemi listelenir." },
      { question: "Comp Flow ne için kullanılır?", answerHtml: "Light Glass sistemiyle birlikte tam çene kompozit restorasyon akışında kullanılan şırınga kompozittir." },
      { question: "Light Glass ne işe yarar?", answerHtml: "Tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen mufla sistemidir." },
      { question: "Bu ürünler birlikte mi düşünülmeli?", answerHtml: "Evet. Comp Flow materyal, Light Glass sistem adımı olarak aynı restorasyon akışında değerlendirilir." },
      { question: "Satın almadan önce ne kontrol edilmeli?", answerHtml: "Vaka tipi, renk seçimi, laboratuvar süreci ve sistem kullanım adımları netleştirilmelidir." },
    ],
  },
  finalCta: {
    titlePrefix: "Trasformer akışını",
    titleEmphasis: "birlikte planlayalım.",
    descriptionHtml:
      "Vaka hedefinizi, renk ihtiyacınızı ve laboratuvar sürecinizi paylaşın; Comp Flow ve Light Glass kullanımını birlikte netleştirelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Sistemlere dön", href: "#sistemler", variant: "inverse" },
    ],
  },
};

export const titaniumDiscsCategoryData: CategoryLandingData = {
  kind: "titanium",
  announcement: {
    highlight: "⚡ Titanyum disk seçimi implant üstü akışla yapılır",
    text: "MESA Grade 5 ELI disk materyal, çap ve CAD/CAM uyumu üzerinden değerlendirilir.",
    href: "#titanyum",
    ctaText: "Titanyum diski gör →",
  },
  breadcrumb: {
    homeLabel: "Ana sayfa",
    homeHref: "/",
    parentLabel: "Ürünler",
    currentLabel: "Titanyum Diskler",
  },
  hero: {
    titlePrefix: "İmplant üstü işlerde",
    titleEmphasis: "biyouyumlu titanyum",
    titleSuffix: "güven verir.",
    descriptionHtml:
      "MESA Grade 5 ELI titanyum disk, implant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar. Ø98.5 mm formu ile CAD/CAM freze sistemlerinde kullanılmak üzere konumlanır.",
    buttons: [
      { label: "Titanyum diski incele ↓", href: "#titanyum", variant: "lime" },
      { label: "Freze uyumunu sor", href: "/pages/iletisim", variant: "line" },
    ],
    metrics: [
      { value: "1", emphasis: "ürün", label: "kategori ItemList sırasındaki aktif ürün" },
      { value: "Grade", emphasis: "5 ELI", label: "titanyum materyal sınıfı" },
      { value: "Ø98.5", emphasis: "mm", label: "CAD/CAM disk formu" },
      { value: "3.930", emphasis: "TRY", label: "kategori başlangıç fiyat bilgisi" },
    ],
  },
  selector: {
    anchorId: "titanyum",
    cardCtaText: "İncele",
    number: "01",
    label: "Titanyum Disk",
    titlePrefix: "Grade 5 ELI,",
    titleEmphasis: "implant üstü.",
    sideHtml:
      "Titanyum disk seçimi materyal sınıfı, disk formu, freze uyumu ve implant üstü endikasyonla birlikte yapılmalıdır.",
    products: [
      {
        title: "MESA Titanyum Disk Grade 5 ELI – Dental CAD/CAM İmplant Çözümleri",
        descriptionHtml:
          "İmplant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunan <b>Grade 5 ELI</b> titanyum disk.",
        href: "/mesa-grade-5-eli-titanyum-disk?Boyut=10-mm",
        imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8eaf20f5-0227-4f18-b8fc-7f054422ce88/1080/mesa-titanyum-disk.webp",
        imageAlt: "MESA Titanyum Disk Grade 5 ELI Dental CAD CAM",
        tag: "GRADE 5 ELI",
        status: "3.930 TRY",
        hot: true,
        tone: "#F1F1EC",
        specs: [
          { label: "Kategori sırası", value: "1" },
          { label: "Çap", value: "Ø98.5 mm" },
          { label: "Kullanım", value: "İmplant üstü" },
        ],
      },
    ],
    compare: {
      columns: [
        { title: "Kontrol" },
        { title: "Materyal" },
        { title: "Freze" },
        { title: "Endikasyon" },
      ],
      rows: [
        { label: "Bu ürün", values: ["Titanyum Grade 5 ELI", "Ø98.5 mm CAD/CAM disk formu", "İmplant üstü restorasyonlar"] },
        { label: "Seçim notu", values: ["Biyouyumluluk ve dayanım ihtiyacı", "Disk boyutu ve freze sistemi uyumu", "Vaka tipi ve implant üstü plan"] },
        { label: "Satın alma öncesi", values: ["Materyal sınıfı", "Boyut / holder uyumu", "Restorasyon ve CAM stratejisi"] },
      ],
      noteHtml:
        "Ürün adı, ana görsel, bağlantı ve kategori sırası <b>titanyum-diskler</b> kategori datasıyla eşleşir.",
    },
  },
  feature: {
    number: "02",
    label: "Öne Çıkan",
    content: {
      eyebrow: "MESA · GRADE 5 ELI · Ø98.5 MM",
      titlePrefix: "CAD/CAM frezeleme için",
      titleEmphasis: "titanyum disk.",
      descriptionHtml:
        "MESA Grade 5 ELI, implant üstü restorasyonlarda CAD/CAM sistemlerle uyumlu yüksek dayanımlı titanyum disk çözümüdür. Ø98.5 mm disk formu, frezeleme akışının temel kontrol noktasıdır.",
      href: "/mesa-grade-5-eli-titanyum-disk?Boyut=10-mm",
      ctaText: "Ürün detayına git →",
      specs: [
        { label: "Materyal", value: "Grade 5 ELI" },
        { label: "Çap", value: "Ø98.5 mm" },
        { label: "Uygulama", value: "İmplant üstü" },
        { label: "Uyum", value: "CAD/CAM" },
      ],
    },
  },
  detail: {
    number: "03",
    label: "Seçim Mantığı",
    titlePrefix: "Titanyum disk,",
    titleEmphasis: "CAM akışıyla",
    titleSuffix: "seçilir.",
    sideHtml:
      "İmplant üstü restorasyonlarda materyal seçimi, disk ölçüsü, holder uyumu ve frezeleme stratejisi birlikte değerlendirilmelidir.",
    whyCards: [
      { number: "01", title: "Materyal sınıfı", descriptionHtml: "Grade 5 ELI titanyum, yüksek dayanım ve biyouyumluluk ihtiyacı olan implant üstü işler için konumlanır." },
      { number: "02", title: "Disk formu", descriptionHtml: "Ø98.5 mm formu, CAD/CAM freze sistemleriyle uyum kontrolünün başlangıç noktasıdır." },
      { number: "03", title: "CAM stratejisi", descriptionHtml: "Frezeleme yolu, holder uyumu ve disk boyutu restorasyon sonucunu etkiler." },
      { number: "04", title: "Vaka uyumu", descriptionHtml: "İmplant üstü restorasyonlarda materyal ve tasarım hedefi birlikte doğrulanmalıdır." },
    ],
    callout: {
      titlePrefix: "Disk + freze +",
      titleEmphasis: "implant planı.",
      descriptionHtml:
        "Titanyum disk seçimini freze sisteminiz, CAM yazılımınız ve implant üstü vaka planınızla birlikte netleştirin.",
      buttons: [
        { label: "Sistemlere git →", href: "/sistemler", variant: "dark" },
        { label: "Teknik destek al →", href: "/pages/iletisim", variant: "line" },
      ],
    },
  },
  faq: {
    number: "04",
    label: "Sık Sorulanlar",
    title: "Titanyum disk seçerken merak edilenler.",
    sideHtml: "Materyal, çap, CAD/CAM uyumu ve implant üstü kullanım için temel sorular.",
    items: [
      { question: "Bu kategoride hangi ürün var?", answerHtml: "Kategori datasına göre MESA Titanyum Disk Grade 5 ELI listelenir." },
      { question: "MESA Grade 5 ELI ne için kullanılır?", answerHtml: "İmplant üstü restorasyonlar için kullanılan CAD/CAM uyumlu titanyum disktir." },
      { question: "Disk çapı nedir?", answerHtml: "Ürün açıklamasında Ø98.5 mm formu belirtilir." },
      { question: "Biyouyumlu mudur?", answerHtml: "Kaynak açıklamada yüksek dayanım ve biyouyumluluk sunduğu belirtilir." },
      { question: "Satın almadan önce ne kontrol edilmeli?", answerHtml: "Freze sistemi, holder uyumu, disk boyutu ve implant üstü vaka planı birlikte kontrol edilmelidir." },
    ],
  },
  finalCta: {
    titlePrefix: "Titanyum disk uyumunu",
    titleEmphasis: "birlikte kontrol edelim.",
    descriptionHtml:
      "Freze sisteminizi, CAM akışınızı ve implant üstü vaka tipinizi paylaşın; doğru disk boyutu ve kullanım planını birlikte netleştirelim.",
    buttons: [
      { label: "Uzmana danış — ücretsiz", href: "/pages/iletisim", variant: "lime" },
      { label: "Titanyum diske dön", href: "#titanyum", variant: "inverse" },
    ],
  },
};

export function categoryLandingDataFromKey(value: string | undefined): CategoryLandingData | null {
  const key = normalizeCategoryKey(value);
  if (!key) return null;
  const dentalKeys = ["dental 3d yazici recineleri", "3d yazici recineleri", "dental recineler", "dental recine"];
  const printerKeys = ["3d yazicilar", "dental 3d yazicilar", "mash p16l", "curie m1", "halot sky", "creality halot"];
  const washCureKeys = ["yikama kurleme cihazlari", "yikama kurleme", "wash cure", "washcure", "uw 03", "uw 02"];
  const zirconKeys = ["zirkon bloklar", "zirkon blok", "zircon blocks", "argenz ht plus", "argenz st multilayer", "argenz ht multilayer"];
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
    "3shape e2",
    "3shape e3",
    "3shape e4",
  ];
  const spareKeys = [
    "3d yazici yedek parcalari",
    "yazici yedek parcalari",
    "yedek parcalar",
    "mash p16l ana kart",
    "mash p16l 16k monokrom lcd ekran",
    "mash p16l kucuk baski tablasi",
    "mash p16l buyuk baski tablasi",
    "mash p16l recine tanki",
    "seffaf acf film",
    "seffaf fep film",
    "piocreat c01 lcd ekran kiti",
    "creality halot sky lcd ekran kiti",
  ];
  const systemKeys = [
    "sistemler",
    "trasformer comp flow",
    "trasformer comp flow siringa kompozit",
    "trasformer light glass",
    "trasformer light glass mufla sistemi",
    "light glass mufla",
  ];
  const titaniumKeys = [
    "titanyum diskler",
    "titanyum disk",
    "titanium disk",
    "mesa grade 5 eli",
    "mesa titanyum disk",
    "mesa titanium disk",
  ];

  if (dentalKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return dentalResinsCategoryData;
  }
  if (washCureKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return washCureCategoryData;
  }
  if (zirconKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return zirconBlocksCategoryData;
  }
  if (furnaceKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return dentalFurnacesCategoryData;
  }
  if (scannerKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return desktopScannersCategoryData;
  }
  if (spareKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return printerSparePartsCategoryData;
  }
  if (systemKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return systemsCategoryData;
  }
  if (titaniumKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return titaniumDiscsCategoryData;
  }
  if (printerKeys.some((categoryKey) => categoryKeyMatches(key, categoryKey))) {
    return printersCategoryData;
  }
  return null;
}

