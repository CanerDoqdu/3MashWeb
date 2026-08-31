import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";

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

export function ThreeMashProductPackageContent(props: Props) {
  const index = trimmedText(props.sectionIndex, "06");
  const label = trimmedText(props.sectionLabel, tLocalized("BÖLÜM ETİKETİ", "SECTION LABEL"));
  const titleHtml = trimmedText(
    props.titleHtml,
    tLocalized('Paket ve kutu içeriği <span class="em">başlığı buraya gelecek.</span>', 'Package and box contents <span class="em">title goes here.</span>')
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    tLocalized("Kutu ve paket içeriği bölümünün sağ üst genel açıklama metni buraya gelecek.", "General description text for the package and box contents section goes here.")
  );

  const packageImage = imageSource(
    props.packageImage,
    "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp"
  );
  const packageBadge = trimmedText(props.packageBadge, tLocalized("ÖNE ÇIKAN SET", "FEATURED SET"));
  const packageTitle = trimmedText(props.packageTitle, tLocalized("Paket Ana Başlığı", "Package Main Title"));
  const packageSubtitle = trimmedText(
    props.packageSubtitle,
    tLocalized("Paket veya setin genel kapsamı ve avantajlarını anlatan kısa açıklama metni.", "Short description explaining the overall scope and advantages of the package or set.")
  );

  const items = [
    {
      num: trimmedText(props.item1Number, "01"),
      title: trimmedText(props.item1Title, tLocalized("1. Paket Maddesi Başlığı", "Item 1 Package Title")),
      desc: trimmedText(props.item1Description, tLocalized("Paket içeriğine dahil olan 1. ana ürün veya donanım açıklaması buraya gelecek.", "Description for main product or hardware included in package 1.")),
      tag: trimmedText(props.item1Tag, tLocalized("ANA DONANIM", "MAIN HARDWARE")),
    },
    {
      num: trimmedText(props.item2Number, "02"),
      title: trimmedText(props.item2Title, tLocalized("2. Paket Maddesi Başlığı", "Item 2 Package Title")),
      desc: trimmedText(props.item2Description, tLocalized("Paket içeriğine dahil olan 2. sarf veya aksesuar açıklaması buraya gelecek.", "Description for consumable or accessory included in package 2.")),
      tag: trimmedText(props.item2Tag, tLocalized("SARF MALZEME", "CONSUMABLE")),
    },
    {
      num: trimmedText(props.item3Number, "03"),
      title: trimmedText(props.item3Title, tLocalized("3. Paket Maddesi Başlığı", "Item 3 Package Title")),
      desc: trimmedText(props.item3Description, tLocalized("Paket içeriğine dahil olan 3. alet veya kalibrasyon seti açıklaması buraya gelecek.", "Description for tool or calibration set included in package 3.")),
      tag: trimmedText(props.item3Tag, tLocalized("KALİBRASYON", "CALIBRATION")),
    },
    {
      num: trimmedText(props.item4Number, "04"),
      title: trimmedText(props.item4Title, tLocalized("4. Paket Maddesi Başlığı", "Item 4 Package Title")),
      desc: trimmedText(props.item4Description, tLocalized("Paket içeriğine dahil olan 4. yedek parça veya aksesuar açıklaması buraya gelecek.", "Description for spare part or accessory included in package 4.")),
      tag: trimmedText(props.item4Tag, tLocalized("YEDEK PARÇA", "SPARE PART")),
    },
    {
      num: trimmedText(props.item5Number, "05"),
      title: trimmedText(props.item5Title, tLocalized("5. Paket Maddesi Başlığı", "Item 5 Package Title")),
      desc: trimmedText(props.item5Description, tLocalized("Paket içeriğine dahil olan 5. eğitim veya danışmanlık hizmeti açıklaması buraya gelecek.", "Description for training or consulting service included in package 5.")),
      tag: trimmedText(props.item5Tag, tLocalized("EĞİTİM", "TRAINING")),
    },
    {
      num: trimmedText(props.item6Number, "06"),
      title: trimmedText(props.item6Title, tLocalized("6. Paket Maddesi Başlığı", "6. Package Item Title")),
      desc: trimmedText(props.item6Description, tLocalized("Paket içeriğine dahil olan 6. teknik destek veya garanti kapsamı açıklaması buraya gelecek.", "The description of the 6th technical support or warranty coverage included in the package will go here.")),
      tag: trimmedText(props.item6Tag, tLocalized("GARANTİ", "WARRANTY")),
    },
  ];

  const bannerTitle = trimmedText(props.bottomBannerTitle, tLocalized("Alt Garanti Bandı Başlığı", "Bottom Warranty Band Title"));
  const bannerBadge = trimmedText(props.bottomBannerBadge, tLocalized("ÖZEL ROZET", "SPECIAL BADGE"));
  const bannerText = trimmedText(
    props.bottomBannerText,
    tLocalized("Kutu içeriği veya teslimat garantisi ile ilgili alt bilgilendirme metni buraya gelecek.", "Footer information text about box contents or delivery guarantee will go here.")
  );
  const ctaText = trimmedText(props.ctaText, tLocalized("Aksiyon Butonu Metni →", "Action Button Text →"));
  const ctaHref = trimmedText(
    props.ctaHref,
    "#"
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
                alt={packageTitle || tLocalized("Paket İçeriği Görseli", "Package Content Image")}
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
