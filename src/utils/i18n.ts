import { I18n, IkasStorefrontConfig } from "@ikas/bp-storefront";
import trLocaleJson from "../locales/tr.json";
import enLocaleJson from "../locales/en.json";
import allTranslationsJson from "./all_translations.json";

export type Locale = "tr" | "en";

function flattenJson(
  obj: Record<string, any>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenJson(value, nextKey));
    } else if (typeof value === "string") {
      result[nextKey] = value;
    }
  }
  return result;
}

const flatTr = flattenJson(trLocaleJson);
const flatEn = flattenJson(enLocaleJson);

export const translations: Record<Locale, Record<string, string>> = {
  tr: flatTr,
  en: flatEn,
};

let _clientCachedLocale: Locale | null = null;

/**
 * Resolves current storefront locale ('tr' | 'en') on both SSR and Client.
 * On SSR: reads directly from IkasStorefrontConfig and I18n on every render.
 * On Client: reads URL pathname, DOM attributes, IkasStorefrontConfig, and persistence.
 */
export function getCurrentLocale(): Locale {
  try {
    // -------------------------------------------------------------
    // 1. SSR (Server-Side Rendering on ikas Node.js server)
    // -------------------------------------------------------------
    if (typeof window === "undefined") {
      try {
        // A. Check IkasStorefrontConfig routing locale
        if (typeof IkasStorefrontConfig !== "undefined") {
          const currentPath = IkasStorefrontConfig.getCurrentPath?.()?.toLowerCase?.();
          if (currentPath) {
            if (currentPath === "en" || currentPath === "/en" || currentPath.startsWith("en/") || currentPath.startsWith("/en/")) {
              return "en";
            }
            return "tr";
          }

          const configLocale = IkasStorefrontConfig.getCurrentLocale?.()?.toLowerCase?.();
          if (configLocale) {
            if (configLocale.startsWith("en")) return "en";
            if (configLocale.startsWith("tr")) return "tr";
          }

          const routing = IkasStorefrontConfig.getCurrentRouting?.();
          const routingLocale = routing?.locale?.toLowerCase?.();
          if (routingLocale) {
            if (routingLocale.startsWith("en")) return "en";
            if (routingLocale.startsWith("tr")) return "tr";
          }

        }

        // B. Check I18n service
        if (typeof I18n !== "undefined" && typeof I18n.getLocale === "function") {
          const ikasLocale = I18n.getLocale()?.toLowerCase?.();
          if (ikasLocale) {
            if (ikasLocale.startsWith("en")) return "en";
            if (ikasLocale.startsWith("tr")) return "tr";
          }
        }
      } catch { }

      return "tr";
    }

    // -------------------------------------------------------------
    // 2. Client-Side (Browser)
    // -------------------------------------------------------------
    // Priority 1: URL Path (authoritative because ikas routes /en/ for English)
    const pathname = window.location.pathname.toLowerCase();
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      _clientCachedLocale = "en";
      return "en";
    }

    // Ikas uses /en/ as the English route prefix; every other storefront path
    // is Turkish. Persisted preferences must not override the current route.
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang") || searchParams.get("locale");
      if (urlLang?.toLowerCase().startsWith("en")) {
        _clientCachedLocale = "en";
        return "en";
      }
    } catch { }

    _clientCachedLocale = "tr";
    return "tr";
  } catch (_e) { }

  return "tr";
}

if (typeof window !== "undefined") {
  try {
    document.documentElement.classList.add("tm-ready");
  } catch { }
}

/**
 * Persists the preferred locale to localStorage, cookies, document DOM, and in-memory cache.
 */
export function setPreferredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  _clientCachedLocale = locale;
  try {
    document.documentElement.setAttribute("data-3mash-locale", locale);
    document.documentElement.lang = locale;
    if (locale === "en") {
      document.documentElement.classList.add("tm-locale-en");
      document.documentElement.classList.remove("tm-locale-tr");
    } else {
      document.documentElement.classList.add("tm-locale-tr");
      document.documentElement.classList.remove("tm-locale-en");
    }
  } catch { }
  try {
    // Write only primary key; deprecated keys are read-only for backward compat
    localStorage.setItem("3mash_locale", locale);
  } catch { }
  try {
    // Secure flag added for HTTPS protection (prevents downgrade attacks)
    const secureSuffix = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
    
    // Write only primary cookie; deprecated keys are kept for backward-compat reads only
    document.cookie = `3mash_locale=${locale}; path=/; max-age=31536000; SameSite=Lax${secureSuffix}`;
  } catch { }
}

/**
 * Checks whether the current locale is English
 */
export function isEnglishLocale(): boolean {
  return getCurrentLocale() === "en";
}

/**
 * Translate a key with optional fallback and interpolation params
 */
export function t(
  key: string,
  fallback?: string,
  params?: Record<string, string | number>
): string {
  const locale = getCurrentLocale();
  let text =
    translations[locale]?.[key] ||
    translations["tr"]?.[key] ||
    fallback ||
    key;

  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([paramKey, paramVal]) => {
      text = text.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramVal));
    });
  }

  return text;
}

/**
 * Return English string if locale is 'en', otherwise return Turkish string
 */
export function tLocalized(trText: string, enText: string): string {
  return isEnglishLocale() ? enText : trText;
}

export function cleanText(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[–—]/g, "-");
}

export function isTurkishText(text?: string | null): boolean {
  if (!text) return false;
  if (/[ışğüöçİŞĞÜÖÇ]/.test(text)) return true;
  const clean = cleanText(text);
  const trKeywords = [
    "bir", "bu", "ve", "veya", "ile", "icin", "için", "her", "neden", "nasil",
    "nasıl", "sebebi", "kaynagi", "kaynağı", "yaygin", "yaygın", "katina",
    "katına", "cikabilir", "çıkabilir", "edildiginde", "edildiğinde", "birlikte",
    "bagli", "bağlı", "oturan", "isler", "işler", "aciklama", "açıklama",
    "basligi", "başlığı", "urunler", "ürünler", "urun", "ürün", "hakkimizda",
    "hakkımızda", "bilgi", "adres", "siparis", "sipariş", "kurleme", "kürleme",
    "yikama", "yıkama", "sepet", "hesabim", "hesabım", "giris", "giriş",
    "kayit", "kayıt", "sifre", "şifre", "tekrar", "kayip", "kayıp", "tasarruf",
    "hesapla", "ornek", "örnek", "cozum", "çözüm", "uretim", "üretim", "dayanim",
    "dayanım", "dogruluk", "doğruluk", "salinimi", "salınımı", "faturasi", "faturası",
    "türkiye", "turkiye", "bizimle", "üretiyor", "uretiyor", "sorulanlar", "azaltalım",
    "azaltalim", "dayanak", "bilimsel", "sebep", "baski", "baskı"
  ];
  return trKeywords.some((w) => clean.includes(w));
}

export const AUTO_TRANSLATION_MAP: Record<string, string> = {
  ...(allTranslationsJson as Record<string, string>),
  // Announcement
  "fırsatı kaçırmayın.": "⚡ Don't miss out.",
  "⚡ fırsatı kaçırmayın.": "⚡ Don't miss out.",
  "kliniğinizin sessiz kaybını 30 saniyede hesaplayın; ücretsiz analizle nasıl azaltabileceğinizi birlikte görelim.":
    "Calculate your clinic's silent loss in 30 seconds; see how to reduce it with a free analysis.",
  "hemen hesaplayın": "Calculate now",

  // Nav & Header
  "ürünler": "Products",
  "tüm ürünler": "All Products",
  "neden 3mash?": "Why 3mash?",
  "referanslar": "References",
  "menü": "Menu",
  "üretim": "PRODUCTION",
  "tamamlayıcı": "COMPLEMENTARY",
  "öne çıkan": "FEATURED",
  "keşfet": "Explore",
  "arama": "Search",
  "ara...": "Search...",
  "ürün, kategori veya marka ara...": "Search product, category or brand...",
  "sepetim": "My Cart",
  "sepet": "Cart",
  "hesabım": "My Account",
  "giriş yap": "Sign In",
  "üye ol": "Sign Up",
  "çıkış yap": "Sign Out",
  "sepetiniz boş": "Your cart is empty",
  "alışverişe başla": "Start shopping",
  "toplam": "Total",
  "ara toplam": "Subtotal",
  "siparişi tamamla": "Proceed to Checkout",
  "sepete git": "Go to Cart",
  "favorilerim": "My Favorites",
  "siparişlerim": "My Orders",
  "adreslerim": "My Addresses",
  "kullanıcı bilgileri": "Account Details",
  "şifre değiştir": "Change Password",
  "3d yazıcılar": "3D Printers",
  "dental reçineler": "Dental Resins",
  "yıkama & kürleme": "Wash & Cure",
  "yıkama ve kürleme": "Wash and Cure",
  "yıkama kürleme": "Wash and Cure",
  "masaüstü tarayıcılar": "Desktop Scanners",
  "zirkon bloklar": "Zirconia Blocks",
  "dental fırınlar": "Dental Furnaces",
  "titanyum diskler": "Titanium Discs",
  "yazıcı yedek parça": "Printer Spare Parts",
  "sistemler": "Systems",
  "mash academy": "Mash Academy",
  "blog": "Blog",
  "iletişim": "Contact",

  // Hero Copy
  "dental üretimin görünmez faturası": "THE INVISIBLE INVOICE OF DENTAL PRODUCTION",
  "dental 3d baskı danışmanlığı": "DENTAL 3D PRINTING CONSULTING",
  "kliniğiniz her yıl": "Your clinic loses",
  "kliniğiniz yılda": "Your clinic loses",
  "laboratuvarınız her yıl": "Your lab loses",
  "laboratuvarınız yılda": "Your lab loses",
  "sessizce kaybediyor olabilir.": "silently every year.",
  "farkında bile olmadan.": "Without even realizing it.",
  "sebebini birlikte görelim.": "Let's see why together.",
  "bu para reklama gitmiyor, yeni cihaza da gitmiyor. hastanın ağzına":
    "This money doesn't go to ads or new equipment. Because of work that",
  "ilk seferde oturmayan işler": "doesn't seat on the first try",
  "yüzünden, sessizce üretim maliyetine dönüşüyor. yandaki değerleri":
    ", it silently turns into production waste. Adjust the values on the right",
  "kendinize göre ayarlayın": "to your own numbers",
  "- yukarıdaki rakam anında sizin kliniğinize göre güncellenir.":
    "— and the figure above instantly updates for your clinic.",
  "— yukarıdaki rakam anında sizin kliniğinize göre güncellenir.":
    "— and the figure above instantly updates for your clinic.",
  "sebebini görün ↓": "See why ↓",
  "sebebini görün": "See why ↓",
  "ücretsiz danışmanlık": "Free consultation",
  "bağlayıcılık yok · 20 dk": "No commitment · 20 min",
  "bağlayıcılık yok • 20 dk": "No commitment · 20 min",

  // Hero Calculator
  "tasarruf hesaplayıcı": "SAVINGS CALCULATOR",
  "tahmini": "ESTIMATED",
  "klinik": "Clinic",
  "laboratuvar": "Lab",
  "aylık restoratif vaka": "Monthly restorative cases",
  "aylık kron / restorasyon adedi": "Monthly crown / restoration count",
  "aylık üretim adedi": "Monthly production volume",
  "mevcut tekrar oranınız (rpt)": "Current remake rate (RPT)",
  "tahmini kron tekrar (remake) oranı": "Estimated remake rate",
  "bir tekrarın size maliyeti": "Cost to you per remake",
  "klinik başı ortalama tekrar maliyeti ($)": "Avg remake cost per clinic ($)",
  "bu maliyet nelerden oluşuyor? kalem kalem hesaplayın →":
    "What does this cost include? Calculate item by item →",
  "bu maliyet nelerden oluşuyor? kalem kalem hesaplayın":
    "What does this cost include? Calculate item by item →",
  "tahmini yıllık kayıp": "Estimated annual loss",
  "· mevcut oranla": "· at current rate",
  "hedef oranla": "At target rate",
  "· ≤%3, 3mash desteğiyle": "· ≤3%, with 3mash support",
  "yıllık tasarruf potansiyeliniz": "YOUR ANNUAL SAVINGS POTENTIAL",
  "zaten hedef banttasınız 👏": "You're already in the target band 👏",
  "basitleştirilmiş bir tahmindir; sonuçlar iş akışınıza göre değişir. kesin analiz için":
    "This is a simplified estimate; results vary by workflow. For precise analysis,",
  "alın.": "get one.",

  // Hero Stats
  "her baskıda boyutsal hassasiyet - insan saç telinin yarısı":
    "dimensional accuracy on every print — half a human hair",
  "her baskıda boyutsal hassasiyet -- insan saç telinin yarısı":
    "dimensional accuracy on every print — half a human hair",
  "her baskıda boyutsal hassasiyet - insan sac telinin yarisi":
    "dimensional accuracy on every print — half a human hair",
  "3mash müşterilerinde tekrarlanan iş oranı (%7-12'den)":
    "remake rate in 3mash customers (down from 7-12%)",
  "3mash musterilerinde tekrarlanan is orani (%7-12'den)":
    "remake rate in 3mash customers (down from 7-12%)",
  "yatırımın kendini geri ödeme potansiyeli": "investment payback potential",
  "yatirimin kendini geri odeme potansiyeli": "investment payback potential",
  "dental lab & klinik bu sistemle üretiyor":
    "dental labs & clinics produce with this system",
  "dental lab & klinik bu sistemle uretiyor":
    "dental labs & clinics produce with this system",

  // Problem Section
  "sorunun kaynağı": "Root of the Problem",
  "sorunun kaynagi": "Root of the Problem",
  "kaybın görünmeyen sebebi:": "The unseen cause of loss:",
  "kaybin gorunmeyen sebebi:": "The unseen cause of loss:",
  "ölçüsel hassasiyet.": "dimensional accuracy.",
  "olcusel hassasiyet.": "dimensional accuracy.",
  "diş hekimliği dijitalleşti; herkes benzer cihazlara erişiyor. asıl fark, ürettiğiniz işin ilk seferde oturup oturmadığı.":
    "Dentistry went digital; everyone has access to similar machines. The real difference is whether your restoration seats on the <b>first try</b>.",
  "piyasada yaygın kurulum": "Common market setup",
  "piyasada yaygin kurulum": "Common market setup",
  "yanlış parametre, reçine uyumsuzluğu ve eksik kalibrasyonla sapma güvenli sınırın 2-5 katına çıkabiliyor.":
    "With wrong parameters, resin mismatch, and lack of calibration, deviation can reach <b>2-5x the safe limit</b>.",
  "yanlış parametre, reçine uyumsuzluğu ve eksik kalibrasyonla sapma güvenli sınırın 2-5 katına çıkar. tekrar oranı yükselir (bazı pratiklerde %42'ye) -> yüksek hacimli bir işletmede yılda -$126k'ya varan kayıp.":
    "With wrong parameters, resin mismatch, and lack of calibration, deviation reaches <b>2-5x the safe limit</b>. Remake rate rises (up to 42% in some practices) → up to <b>-$126K annual loss</b> in high-volume operations.",
  "3mash ekosistemiyle": "With 3mash ecosystem",
  "yazıcı, reçine ve kürleme birlikte kalibre edildiğinde: her baskıda tekrar edilebilir hassasiyet ve minimum tekrar oranı.":
    "When printer, resin, and curing are <b>calibrated together</b>: repeatable precision and minimal remake rate on every print.",
  "yazıcı, reçine ve kürleme birlikte kalibre edildiğinde: her baskıda tekrar edilebilir hassasiyet -> <=%3 remake -> yılda $72-162k'ya varan tasarruf potansiyeli.":
    "When printer, resin, and curing are <b>calibrated together</b>: repeatable precision → <b>≤3% remake</b> → annual savings potential up to <b>$72-162K</b>.",
  "ölçek için: bir insan saç teli ~70 µm. piyasadaki sapma saç telinin 5 katına çıkabilirken, 3mash ±20 µm bandında kalır.":
    "<b>For scale:</b> a human hair is ~70 µm. Market deviation can reach <b>5x the thickness of a hair</b>; we work at <b>half the thickness of a human hair</b> — and we commit to this <b>on every print, not just once.</b>\n\n<b>2 — Scientific basis:</b> Full-arch model accuracy varies from <b>3–190 µm</b> across systems (Etemad-Shahidi et al., <b>J Clin Med 2020</b>); SLA/DLP/PolyJet are among the most accurate technologies (Németh et al., <b>J Dentistry 2023</b>). Repeatability and its contributing factors: <b>McCracken et al., J Prosthodont 2019</b>.",
  "ölçek için: bir insan saç teli ~70 µm. piyasadaki sapma saç telinin 5 katına çıkabilir; biz saç telinin yarısında çalışıyoruz -- ve bunu tek seferlik değil, her baskıda sağlıyoruz.":
    "<b>For scale:</b> a human hair is ~70 µm. Market deviation can reach <b>5x the thickness of a hair</b>; we work at <b>half the thickness of a human hair</b> — and we commit to this <b>on every print, not just once.</b>\n\n<b>2 — Scientific basis:</b> Full-arch model accuracy varies from <b>3–190 µm</b> across systems (Etemad-Shahidi et al., <b>J Clin Med 2020</b>); SLA/DLP/PolyJet are among the most accurate technologies (Németh et al., <b>J Dentistry 2023</b>). Repeatability and its contributing factors: <b>McCracken et al., J Prosthodont 2019</b>.",
  "ölçek için: bir insan saç teli ~70 µm. piyasadaki sapma saç telinin 5 katına çıkabilir; biz saç telinin yarısında çalışıyoruz -- ve bunu tek seferlik değil, her baskıda taahhüt ediyoruz.":
    "<b>For scale:</b> a human hair is ~70 µm. Market deviation can reach <b>5x the thickness of a hair</b>; we work at <b>half the thickness of a human hair</b> — and we commit to this <b>on every print, not just once.</b>\n\n<b>2 — Scientific basis:</b> Full-arch model accuracy varies from <b>3–190 µm</b> across systems (Etemad-Shahidi et al., <b>J Clin Med 2020</b>); SLA/DLP/PolyJet are among the most accurate technologies (Németh et al., <b>J Dentistry 2023</b>). Repeatability and its contributing factors: <b>McCracken et al., J Prosthodont 2019</b>.",
  "bilimsel dayanak: full-arch model doğruluğu sistemden sisteme 3-190 µm arasında değişiyor (revilla-león et al., j prosthet dent 2023).":
    "<b>2 — Scientific basis:</b> Full-arch model accuracy varies from <b>3–190 µm</b> across systems (<a href=\"https://doi.org/10.3390/jcm9103357\" target=\"_blank\" rel=\"noopener noreferrer\">Etemad-Shahidi et al., <b>J Clin Med 2020</b></a>); SLA/DLP/PolyJet are among the most accurate technologies (<a href=\"https://doi.org/10.1016/j.jdent.2023.104532\" target=\"_blank\" rel=\"noopener noreferrer\">Németh et al., <b>J Dentistry 2023</b></a>). Repeatability and its contributing factors: <a href=\"https://doi.org/10.1111/jopr.12995\" target=\"_blank\" rel=\"noopener noreferrer\"><b>McCracken et al., J Prosthodont 2019</b></a>.",
  "bilimsel dayanak: full-arch model doğruluğu sistemden sisteme 3-190 µm arasında değişiyor (etemad-shahidi ve ark., j clin med 2020); sla/dlp/polyjet en doğru teknolojiler (németh ve ark., j dentistry 2023). tekrar oranı ve sebepleri: mccracken ve ark., j prosthodont 2019.":
    "<b>2 — Scientific basis:</b> Full-arch model accuracy varies from <b>3–190 µm</b> across systems (<a href=\"https://doi.org/10.3390/jcm9103357\" target=\"_blank\" rel=\"noopener noreferrer\">Etemad-Shahidi et al., <b>J Clin Med 2020</b></a>); SLA/DLP/PolyJet are among the most accurate technologies (<a href=\"https://doi.org/10.1016/j.jdent.2023.104532\" target=\"_blank\" rel=\"noopener noreferrer\">Németh et al., <b>J Dentistry 2023</b></a>). Repeatability and its contributing factors: <a href=\"https://doi.org/10.1111/jopr.12995\" target=\"_blank\" rel=\"noopener noreferrer\"><b>McCracken et al., J Prosthodont 2019</b></a>.",

  // Solution Section
  "çözüm · üretim ekosistemi": "Solution · Production Ecosystem",
  "cozum · uretim ekosistemi": "Solution · Production Ecosystem",
  "hassasiyet cihazdan çıkmaz;": "Precision doesn't come from the device;",
  "uyumdan çıkar.": "it comes from compatibility.",
  "kuronun oturması üç şeyin senkronuna bağlı: yazıcı, reçine, kürleme. biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.":
    "A crown seating depends on three things in sync: <b>printer, resin, curing.</b> We calibrate all three together and deliver with field-proven knowledge — even for your existing third-party device.",
  "kuronun oturması üç şeyin senkronuna bağlı: yazıcı, reçine, kürleme. biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz -- elinizdeki başka marka cihaza bile.":
    "A crown seating depends on three things in sync: <b>printer, resin, curing.</b> We calibrate all three together and deliver with field-proven knowledge — even for your existing third-party device.",
  "profesyonel": "PROFESSIONAL",
  "giriş seviyesi": "ENTRY LEVEL",
  "geniş uyumluluk": "WIDE COMPATIBILITY",
  "ışık kaynağı": "Light source",
  "işık kaynağı": "Light source",
  "hassasiyet": "Precision",
  "tekrar edilebilirlik": "Repeatability",
  "panel boyutu": "Panel size",
  "uyumlu yazıcılar": "Compatible printers",
  "baskı hızı": "Print speed",
  "tüm 405nm yazıcılar": "All 405nm printers",
  "incele": "Explore",
  "detaylı incele": "View Details",
  "sepete ekle": "Add to Cart",
  "satın al": "Buy Now",

  // Curing Section
  "kritik son adım": "Critical Final Step",
  "sadece yazıcı değil. sonucu": "Not just the printer. Curing",
  "kürleme tamamlar.": "completes the result.",
  "baskı, cihazdan çıktığında bitmemiştir. yanlış kürlenen iş, doğru basılmış olsa bile başarısız olur. işte üç sebep:":
    "The print is not finished when it leaves the device. A poorly cured job, <b>even if correctly printed</b>, will fail. Here are three reasons:",
  "sebep 01": "REASON 01",
  "mekanik dayanım": "Mechanical strength",
  "eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin sık kırılmasının en yaygın görünmez sebebi.":
    "Undercure means brittleness — the most common hidden cause of <b>frequent fractures</b> in provisional crowns and bridges.",
  "eksik kürleme (undercure) kırılganlık demek -- geçici kron ve köprülerin sık kırılmasının en yaygın görünmez sebebi.":
    "Undercure means brittleness — the most common hidden cause of <b>frequent fractures</b> in provisional crowns and bridges.",
  "sebep 02": "REASON 02",
  "ölçüsel doğruluk": "Dimensional accuracy",
  "fazla kürleme (overcure) malzemeyi çeker ve deforme eder. yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.":
    "Overcure <b>shrinks and deforms</b> the material. The ±20 µm accuracy achieved in the printer is lost in the curing unit.",
  "sebep 03": "REASON 03",
  "biyouyumluluk & renk": "Biocompatibility & color",
  "doğru dönüşüm derecesi monomer salınımını engeller; renk stabilitesi ve hasta güvenliği sağlar.":
    "Proper degree of conversion prevents <b>monomer elution</b>; ensures color stability and patient safety.",
  "yıkama": "WASHING",
  "yikama": "WASHING",
  "kürleme": "CURING",
  "kurleme": "CURING",
  "işlem": "Process",
  "akış": "Workflow",
  "ışık": "Light",
  "spektrum": "Spectrum",
  "ultrasonik temizleme": "Ultrasonic cleaning",
  "ultrasonik yıkama": "Ultrasonic washing",
  "yıkama → kürleme hazırlığı": "Washing → curing prep",
  "yıkama hacmi": "Washing volume",
  "derine inmek isteyenlere, mash academy'den:": "For those who want to dive deeper, from Mash Academy:",
  "overcure ve undercure nedir?": "What is Overcure and Undercure?",
  "385nm mi 405nm mi?": "385nm or 405nm?",

  // ROI & Ecosystem
  "yatırımın geri dönüşü": "RETURN ON INVESTMENT",
  "uçtan uca": "End to End",
  "dijital akışın her parçası,": "Every part of the digital workflow,",
  "tek çatı altında.": "under one roof.",
  "cihaz satıp gitmiyoruz: doğru ürün için danışmanlık, sürdürülebilirlik için academy eğitimleri, satış sonrasında teknisyen + mühendis teknik destek.":
    "We don't just sell devices: <b>consulting</b> for the right product, <b>Academy training</b> for sustainability, technician + engineer <b>technical support</b> after the sale.",

  // References & Testimonials
  "türkiye'nin en büyük lab'ları neden": "Why do Turkey's largest labs",
  "bizimle üretiyor?": "produce with us?",
  "kısa cevap hep aynı: tutarlılık. 580+ dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç her seferinde aynı çıkıyor.":
    "The short answer is always the same: consistency. <b>580+</b> dental labs and clinics produce with this system because the result is the same <b>every single time.</b>",
  "güvenenler": "Trusted by",
  "profesyoneller mutlak başarı için profesyonellere güvenir. ekipman seçimi, temini, eğitimi ve kullanımında mash ile iş birliği yapıyoruz.":
    "Professionals trust professionals for absolute success. We collaborate with Mash in equipment selection, supply, training, and operation.",
  "yenilikçi ve yaratıcı. donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.":
    "Innovative and creative. A long-term, successful collaboration across hardware, software, and materials.",
  "sorunları biz daha yaşamadan çözmüşler. her zaman aynı kalitede üretim — mükemmel sonuçlar.":
    "They solved problems before we even encountered them. Consistent production quality every single time — excellent results.",
  "kurucu başhekim — 22 yıldır gülümseme tasarlayan klinik": "Chief Physician & Founder — Designing smiles for 22 years",
  "genel müd. yard.": "Deputy General Manager",
  "kurucu ortak": "Co-Founder",

  // FAQ Section
  "sık sorulanlar": "Frequently Asked",
  "kısa, net cevaplar.": "Short, clear answers.",
  "en kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.":
    "We gathered the most critical questions from clinics and labs with clear answers to help you make decisions quickly.",
  "dental 3d baskıda ölçüsel hassasiyet neden bu kadar önemli?":
    "Why is dimensional accuracy so critical in dental 3D printing?",
  "çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır — üçü de birer hassasiyet problemidir. 3mash ekosistemi ±20 µm boyutsal hassasiyeti, tek seferlik değil her baskıda tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.":
    "Because whether a restoration seats on the first try directly depends on dimensional accuracy. In national clinical data, the most common reasons for crown remakes are <b>proximal misfit, marginal errors, and esthetic failure</b> — all accuracy problems. The 3mash ecosystem provides <b>±20 µm</b> dimensional accuracy repeatable <b>on every print</b>, which lowers remake rates and hidden costs.",
  "bir kron tekrarının (remake) maliyeti gerçekte ne kadar?":
    "How much does a crown remake actually cost?",
  "tahminî olarak ~500 dolar — ve bu tutarın büyük kısmı lab ücreti değil, koltuk süresidir (yeniden prep, ölçü ve yapıştırma randevusu). klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. kendi kalemlerinizle hesaplamak için maliyet detay sayfamıza bakabilirsiniz.":
    "Estimated at <b>~$500</b> — and the majority is not lab fees, but <b>chairside time</b> (re-prep, impression, and seating appointment). Clinical overhead is modeled at ~$375/hr; a single remake consumes most of it. To calculate with your own numbers, visit our <a href='/pages/hesaplama'>cost calculation page</a>.",
  "3d baskıda kürleme (post-curing) neden kritik?":
    "Why is post-curing so critical in 3D printing?",
  "çünkü baskı, cihazdan çıktığında henüz bitmemiştir. yetersiz kürleme (undercure) kırılganlık, fazla kürleme (overcure) ise deformasyon yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.":
    "Because a print is not finished when it comes out of the machine. Undercure causes <b>brittleness</b>, while overcure causes <b>deformation</b> — you can lose the accuracy gained in the printer during curing. 3mash smart curing units manage parameters automatically to eliminate this risk.",
  "3mash yalnızca cihaz mı satıyor?": "Does 3mash only sell equipment?",
  "hayır. 3mash entegre bir üretim ekosistemi sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, mash academy eğitimleri ve diş teknisyeni + mühendislerden oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.":
    "No. 3mash offers an integrated <b>production ecosystem</b>: calibrating printer, resin, and curing together, accompanied by consulting, Mash Academy training, and after-sales technical support from <b>dental technicians + engineers</b>.",
  "elimdeki başka marka yazıcıyla çalışır mısınız?":
    "Can you work with my existing third-party printer?",
  "evet. hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz marka bağımsızdır; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.":
    "Yes. With our deep technical expertise across resins and printers, our solutions are <b>brand-independent</b>; we can optimize parameters for your existing equipment to achieve the same result.",

  // Final CTA & Footer
  "bu görünmez kaybı": "Let's reduce this invisible loss",
  "birlikte azaltalım.": "together.",
  "mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — elinizdeki cihazlarla bile.":
    "Let's review your current workflow together; we'll identify where the loss occurs and set up the right ecosystem for you — <b class='tmr-final-white'>even with your existing equipment.</b>",
  "uzmana danış — ücretsiz": "Talk to an expert — free",
  "mash academy'yi keşfet": "Explore Mash Academy",
  "kurumsal": "Corporate",
  "ürün grupları": "Product Categories",
  "popüler kategoriler": "Popular Categories",
  "popüler markalar": "Popular Brands",
  "kaynaklar & destek": "Resources & Support",
  "yasal": "Legal",
  "hakkımızda": "About Us",
  "kvkk aydınlatma metni": "KVKK Clarification Text",
  "iade ve garanti politikası": "Return & Warranty Policy",
  "mesafeli satış sözleşmesi": "Distance Sales Agreement",
  "ticari elektronik ileti": "Commercial Electronic Message",
  "üyelik sözleşmesi": "Membership Agreement",
  "çerez politikası": "Cookie Policy",
  "dental klinik ve laboratuvarlar için entegre 3d baskı ekosistemi: yazıcı, reçine, kürleme çözümleri ve üretim uzmanlığı bir arada.":
    "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together.",
  "dental klinik ve laboratuvarlar icin entegre 3d baski ekosistemi: yazici, recine, kurleme cozumleri ve uretim uzmanligi bir arada.":
    "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together.",
  "tüm hakları saklıdır.": "All rights reserved.",
  "türkiye geneline hızlı teslimat": "Fast delivery across Turkey",
  "uzman teknik destek": "Expert technical support",
  "güvenli ödeme altyapısı": "Secure payment infrastructure",

  // Product Filters & Badges
  "filtrele": "Filter",
  "sırala": "Sort by",
  "fiyata göre (artan)": "Price: Low to High",
  "fiyata göre (azalan)": "Price: High to Low",
  "en yeniler": "Newest",
  "en çok satanlar": "Best Sellers",
  "stokta var": "In Stock",
  "tükendi": "Out of Stock",
  "stokta yok": "Out of Stock",
  "yeni": "NEW",
  "indirim": "SALE",
  "fırsat": "DEAL",
  "kategori": "Category",
  "marka": "Brand",
  "fiyat aralığı": "Price Range",
  "temizle": "Clear",
  "filtreleri temizle": "Clear Filters",
  "uygula": "Apply",
  "sonuç bulundu": "results found",
};

export const NORMALIZED_AUTO_MAP: Record<string, string> = {};
for (const [key, val] of Object.entries(AUTO_TRANSLATION_MAP)) {
  NORMALIZED_AUTO_MAP[cleanText(key)] = val;
}

export const NORMALIZED_REVERSE_MAP: Record<string, string> = {};
for (const [tr, en] of Object.entries(AUTO_TRANSLATION_MAP)) {
  NORMALIZED_REVERSE_MAP[cleanText(en)] = tr;
}

const AUTO_MAP_REVERSE: ReadonlyArray<readonly [string, string]> = Object.entries(AUTO_TRANSLATION_MAP)
  .map(([turkish, english]) => [english, turkish] as const)
  .sort(([left], [right]) => right.length - left.length);

function replaceKnownTranslations(value: string, reverse: boolean) {
  const entries: ReadonlyArray<readonly [string, string]> = reverse
    ? AUTO_MAP_REVERSE
    : Object.entries(AUTO_TRANSLATION_MAP).sort(([left], [right]) => right.length - left.length);
  return entries.reduce((result, [source, target]) => {
    const pattern = new RegExp(escapeRegExp(source), "gi");
    return result.replace(pattern, target);
  }, value);
}

export function translateForLocale(value: string, sourceLocale: Locale): string {
  const targetLocale = getCurrentLocale();
  if (sourceLocale === targetLocale || !value) return value;
  return replaceKnownTranslations(value, sourceLocale === "tr");
}

function stripHtmlTags(html?: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isPlaceholder(
  value?: string | null,
  defaultText?: string | null
): boolean {
  if (!value || !value.trim()) return true;
  const rawClean = value.trim().toUpperCase();
  const strippedClean = stripHtmlTags(value).toUpperCase();

  if (
    value.includes("<section") ||
    value.includes("tmr-section") ||
    value.includes("tmr-why-grid") ||
    value.includes("tmr-curing-keep")
  ) {
    return true;
  }

  const placeholders = new Set([
    "CURING",
    "PRODUCTION",
    "WASHING",
    "BÖLÜM ETİKETİ",
    "SECTION LABEL",
    "LABEL",
    "TAG",
    "TITLE",
    "DESCRIPTION",
    "TEXT",
  ]);

  if (
    (placeholders.has(rawClean) || placeholders.has(strippedClean)) &&
    defaultText &&
    stripHtmlTags(defaultText).length > 4
  ) {
    return true;
  }
  return false;
}

export function tProp(
  propValue: string | null | undefined,
  fallbackTr: string | undefined,
  fallbackEn: string | undefined
): string {
  const isEn = isEnglishLocale();
  const trFallback = fallbackTr || "";
  const enFallback = fallbackEn || (isEn && fallbackTr ? fallbackTr : "");

  if (isEn) {
    if (isPlaceholder(propValue, enFallback || trFallback)) {
      return enFallback || trFallback;
    }

    const cProp = cleanText(propValue);

    // 1. Direct dictionary match for the full text
    if (NORMALIZED_AUTO_MAP[cProp]) {
      return NORMALIZED_AUTO_MAP[cProp];
    }

    // 2. If prop matches the Turkish fallback, return the explicit English fallback
    if (cProp === cleanText(trFallback) && enFallback) {
      return enFallback;
    }

    // 3. If prop is Turkish and we have an English fallback, use the English fallback
    if (isTurkishText(propValue) && enFallback) {
      return enFallback;
    }

    // 4. Return user's custom English prop value or fallback
    return propValue && propValue.trim() !== "" ? propValue : (enFallback || trFallback);
  }

  if (isPlaceholder(propValue, trFallback)) {
    return trFallback;
  }

  if (propValue && propValue.trim() !== "") {
    const cProp = cleanText(propValue);
    // If prop matches the English fallback, return the Turkish fallback
    if (enFallback && cProp === cleanText(enFallback) && trFallback) {
      return trFallback;
    }
    // If prop is in English and we have a reverse translation to Turkish
    if (NORMALIZED_REVERSE_MAP[cProp]) {
      return NORMALIZED_REVERSE_MAP[cProp];
    }
    return propValue;
  }

  return trFallback;
}

/**
 * Universal text translator for template strings or dynamic chunks
 */
export function translateText(text?: string | null): string {
  if (!text) return "";
  if (!isEnglishLocale()) return text;

  const c = cleanText(text);
  if (NORMALIZED_AUTO_MAP[c]) {
    return NORMALIZED_AUTO_MAP[c];
  }

  // Check stripped HTML if text contains tags
  if (text.includes("<") && text.includes(">")) {
    const stripped = stripHtmlTags(text);
    const cStripped = cleanText(stripped);
    if (NORMALIZED_AUTO_MAP[cStripped]) {
      return NORMALIZED_AUTO_MAP[cStripped];
    }
  }

  return text;
}

/**
 * Normalizes internal site links and prepends /en/ when English locale is active.
 * This ensures the server receives /en/slug paths and renders English HTML at first paint,
 * fully eliminating the Turkish-then-English flash.
 */
export function localizedHref(path?: string | null): string {
  if (!path || typeof path !== "string") return "";
  const trimmed = path.trim();
  if (!trimmed) return "";

  if (/^(?:javascript:|data:|vbscript:|file:)/i.test(trimmed)) {
    return "#";
  }

  // External links, protocol handlers, or pure hash anchors remain unchanged
  if (
    /^(?:[a-z0-9+.-]+:|\/\/|#)/i.test(trimmed) ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("sms:") ||
    trimmed.startsWith("whatsapp:")
  ) {
    return trimmed;
  }

  // Normalise: strip any existing /en/ prefix first to avoid double-prefixing
  let bare = trimmed;
  if (bare === "/en" || bare === "/en/") {
    bare = "/";
  } else if (bare.startsWith("/en/")) {
    bare = bare.replace(/^\/en\//, "/");
  }

  // If English locale is active, prepend /en/
  if (isEnglishLocale()) {
    if (bare === "/" || bare === "") return "/en";
    return `/en${bare.startsWith("/") ? bare : `/${bare}`}`;
  }

  return bare;
}

