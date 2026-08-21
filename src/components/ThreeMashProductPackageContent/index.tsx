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

export function ThreeMashProductPackageContent(props: Props) {
  const index = trimmedText(props.sectionIndex, "06");
  const label = trimmedText(props.sectionLabel, "PAKET İÇERİĞİ");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Kutudan çıktığı an <span class="em">üretime hazır.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "İhtiyacınız olan tüm donanım, kalibrasyon araçları, başlangıç sarfları ve teknik eğitim pakete dahildir."
  );

  const packageImage = imageSource(
    props.packageImage,
    "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp"
  );
  const packageBadge = trimmedText(props.packageBadge, "HER ŞEY DAHİL SET");
  const packageTitle = trimmedText(props.packageTitle, "Eksiksiz Üretim Kiti");
  const packageSubtitle = trimmedText(
    props.packageSubtitle,
    "Cihaz, aksesuarlar, kalibrasyon araçları ve 1 yıllık sınırsız Mash Academy desteği tek pakette."
  );

  const items = [
    {
      num: trimmedText(props.item1Number, "01"),
      title: trimmedText(props.item1Title, "1. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item1Description, "Paket içeriğine dahil olan 1. ana ürün veya donanım açıklaması."),
      tag: trimmedText(props.item1Tag, "ANA DONANIM"),
    },
    {
      num: trimmedText(props.item2Number, "02"),
      title: trimmedText(props.item2Title, "2. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item2Description, "Paket içeriğine dahil olan 2. sarf veya aksesuar açıklaması."),
      tag: trimmedText(props.item2Tag, "SARF / REÇİNE"),
    },
    {
      num: trimmedText(props.item3Number, "03"),
      title: trimmedText(props.item3Title, "3. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item3Description, "Paket içeriğine dahil olan 3. alet veya kalibrasyon seti açıklaması."),
      tag: trimmedText(props.item3Tag, "KALİBRASYON"),
    },
    {
      num: trimmedText(props.item4Number, "04"),
      title: trimmedText(props.item4Title, "4. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item4Description, "Paket içeriğine dahil olan 4. yedek parça veya tank açıklaması."),
      tag: trimmedText(props.item4Tag, "YEDEK PARÇA"),
    },
    {
      num: trimmedText(props.item5Number, "05"),
      title: trimmedText(props.item5Title, "5. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item5Description, "Klinik veya laboratuvara özel canlı kurulum ve eğitim desteği."),
      tag: trimmedText(props.item5Tag, "MASH ACADEMY"),
    },
    {
      num: trimmedText(props.item6Number, "06"),
      title: trimmedText(props.item6Title, "6. Paket Maddesi Başlığı"),
      desc: trimmedText(props.item6Description, "2 Yıl resmi garanti, parça temini ve mühendis destek hattı."),
      tag: trimmedText(props.item6Tag, "TEKNİK DESTEK"),
    },
  ];

  const bannerTitle = trimmedText(props.bottomBannerTitle, "Kurulum & Entegrasyon Garantisi");
  const bannerBadge = trimmedText(props.bottomBannerBadge, "ÜCRETSİZ DESTEK");
  const bannerText = trimmedText(
    props.bottomBannerText,
    "Siparişiniz ulaştığında uzman teknisyenlerimiz cihazınızı uzaktan veya yerinde kurup ilk baskıyı sizinle birlikte alır."
  );
  const ctaText = trimmedText(props.ctaText, "Uzmana Danışın →");
  const ctaHref = trimmedText(
    props.ctaHref,
    "https://wa.me/905314326577?text=Paket%20icerigi%20hakkinda%20bilgi%20almak%20istiyorum"
  );

  return (
    <section className="tm-pkg-section">
      <div className="tm-pkg-wrap">
        <div className="tm-pkg-idx">
          <span className="tm-pkg-idx-n">{index}</span>
          <span className="tm-pkg-idx-t">{label}</span>
          <span className="tm-pkg-idx-ln" />
        </div>

        <div className="tm-pkg-head">
          <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="tm-pkg-side" dangerouslySetInnerHTML={{ __html: sideHtml }} />
        </div>

        <div className="tm-pkg-grid">
          <div className="tm-pkg-hero-card">
            <span className="tm-pkg-hero-badge">{packageBadge}</span>
            <div className="tm-pkg-hero-media">
              <img
                src={packageImage}
                alt={props.packageImageAlt || "Paket İçeriği Görseli"}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="tm-pkg-hero-copy">
              <h3>{packageTitle}</h3>
              <p>{packageSubtitle}</p>
            </div>
          </div>

          <div className="tm-pkg-items-grid">
            {items.map((item, idx) => (
              <article className="tm-pkg-item-card" key={idx}>
                <div className="tm-pkg-item-top">
                  <span className="tm-pkg-item-num">{item.num}</span>
                  {item.tag ? <span className="tm-pkg-item-tag">{item.tag}</span> : null}
                </div>
                <div>
                  <h4 className="tm-pkg-item-title">{item.title}</h4>
                  <p className="tm-pkg-item-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="tm-pkg-banner">
          <div className="tm-pkg-banner-body">
            <h4>
              {bannerTitle}
              {bannerBadge ? <span className="tm-pkg-banner-badge">{bannerBadge}</span> : null}
            </h4>
            <p>{bannerText}</p>
          </div>
          {ctaText ? (
            <a className="tm-pkg-banner-btn" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductPackageContent;
