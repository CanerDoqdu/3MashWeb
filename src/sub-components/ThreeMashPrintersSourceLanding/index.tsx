import { useLayoutEffect } from "preact/hooks";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import { isEnglishLocale, translateText, tLocalized, localizedHref } from "../../utils/i18n";
import { safeNavigationHref, safeRedirect } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { resolveThemeColor } from "../../utils/themeColor";
import {
  getDefaultSrc,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  type IkasImage,
  type IkasProduct,
  type IkasProductList,
} from "@ikas/bp-storefront";
import type { CategoryLandingOverrides } from "../ThreeMashCategoryLanding";
import { printersCategoryData } from "../ThreeMashCategoryLanding/presets";

const curieM1MainImage =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/302ffc22-20c4-49b7-8d16-b303e079f0cf/1080/1.webp";

const halotSkyPrinterImage =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp";

type AnnouncementWindow = Window & {
  __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: {
    enabled?: boolean;
    highlightText?: string;
    text?: string;
    ctaText?: string;
    href?: string;
  };
};

type Props = CategoryLandingOverrides & {
  productList?: IkasProductList;
  printerProduct1Status?: string;
  printerProduct1StatusEn?: string;
  printerProduct2Status?: string;
  printerProduct2StatusEn?: string;
  printerProduct3Status?: string;
  printerProduct3StatusEn?: string;
};

function textValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? translateText(trimmed) : translateText(fallback);
}

function localizedTextValue(value: string | undefined, valueEn: string | undefined, fallback: string) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return localizedValue?.trim() ? translateText(localizedValue.trim()) : translateText(fallback);
}

function localizedHtmlValue(value: string | undefined, valueEn: string | undefined, fallback: string) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return localizedValue?.trim() ? localizedValue : fallback;
}

function normalizedProductName(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR").replace(/\s+/g, " ");
}

function liveProductDescription(product: IkasProduct) {
  const productContent = product as IkasProduct & { shortDescription?: string; description?: string };
  return productContent.shortDescription || productContent.description || "";
}

function smoothAnchorClick(event: Event, rawHref: string) {
  if (typeof window === "undefined" || !rawHref.startsWith("#") || rawHref.length <= 1) return;

  const target = document.getElementById(rawHref.slice(1));
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();
  target.scrollIntoView({ behavior: "smooth", block: "center" });
}

// `path` must already be the final, locale-resolved path (use localePath()).
function crossPageAnchorClick(event: Event, path: string, sectionId: string, block: ScrollLogicalPosition = "center") {
  if (typeof window === "undefined") return;

  event.preventDefault();
  event.stopPropagation();
  try {
    localStorage.setItem("tmcl-pending-anchor-scroll", JSON.stringify({ sectionId, block }));
  } catch {
    // Continue with normal route navigation if storage is unavailable.
  }
  window.location.href = safeRedirect(path);
}

// Returns the Turkish path on the TR site and the English path on the EN site.
function localePath(turkishPath: string, englishPath: string) {
  return isEnglishLocale() ? englishPath : turkishPath;
}

function printerProductHref(turkishPath: string, englishPath: string) {
  return localePath(turkishPath, englishPath);
}

export default function ThreeMashPrintersSourceLanding(props: Props) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: props.showAnnouncement !== false,
      highlightText: textValue(props.eyebrowText, tLocalized("⚡ Hangi yazıcı size uygun?", "⚡ Which printer suits you?")),
      text: textValue(props.announcementText, tLocalized("Hız, çözünürlük ve bütçeye göre karşılaştırın; emin değilseniz ekibimiz eşleştirir.", "Compare based on speed, resolution, and budget; if you're not sure, our team will match you with the right option.")),
      ctaText: textValue(props.announcementCtaText, tLocalized("Karşılaştırmaya git →", "Go to comparison →")),
      href: safeNavigationHref(props.announcementHref, "#karsilastirma-tablosu"),
    };
    const targetWindow = window as AnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      window.requestAnimationFrame(() => {
        if (targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ !== payload) return;
        delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
        window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
      });
    };
  }, [props.eyebrowText, props.announcementText, props.announcementCtaText, props.announcementHref, props.showAnnouncement]);

  const compareHref = "#karsilastirma-tablosu";
  const primaryButtonHref = safeNavigationHref(props.primaryButtonHref, compareHref);
  const contactHref = localePath("/pages/iletisim", "/en/pages/iletisim");
  const resinsHref = localePath("/dental-3d-yazici-recineleri", "/en/dental-resins");
  const washCureHref = localePath("/yikama-kurleme-cihazlari", "/en/wash-and-cure-devices");
  const wavelengthBlogHref = localePath(
    "/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi",
    "/en/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi"
  );
  const p16lHref = printerProductHref("/mash-p16l-385nm-16k-dental-3d-yazici", "/en/mash-p16l-385nm-16k-dental-3d-printer");
  const printerData = printersCategoryData();
  const presetProducts = printerData.selector.products;
  const liveProducts = props.productList?.data || [];
  const defaultImages = [p16lPrimaryImage, curieM1MainImage, halotSkyPrinterImage];
  const defaultHrefs = [
    p16lHref,
    printerProductHref("/mash-curie-m1-dental-3d-yazici", "/en/mash-curie-m1-dental-3d-printer"),
    printerProductHref("/creality-halot-sky-6k", "/en/creality-halot-sky-6k-1"),
  ];
  const printerCards = (liveProducts.length ? liveProducts : presetProducts).map((product, index) => {
    const liveProduct = liveProducts.length ? product as IkasProduct : undefined;
    const productName = liveProduct?.name || (product as typeof presetProducts[number]).title;
    const preset = presetProducts.find((card) => normalizedProductName(card.title) === normalizedProductName(productName))
      || presetProducts[index];
    const slot = index + 1;
    const slotTitle = slot <= 3 ? props[`selectorProduct${slot}Title` as keyof Props] as string | undefined : undefined;
    const slotTitleEn = slot <= 3 ? props[`selectorProduct${slot}TitleEn` as keyof Props] as string | undefined : undefined;
    const slotHref = slot <= 3 ? props[`selectorProduct${slot}Href` as keyof Props] as string | undefined : undefined;
    const slotImage = slot <= 3 ? props[`selectorProduct${slot}Image` as keyof Props] as IkasImage | null | undefined : undefined;
    const slotImageAlt = slot <= 3 ? props[`selectorProduct${slot}ImageAlt` as keyof Props] as string | undefined : undefined;
    const slotImageAltEn = slot <= 3 ? props[`selectorProduct${slot}ImageAltEn` as keyof Props] as string | undefined : undefined;
    const legacyImage = [props.printerP16lImage, props.printerCurieImage, props.printerHalotImage][index];
    const legacyImageAlt = [
      [props.printerP16lImageAlt, props.printerP16lImageAltEn],
      [props.printerCurieImageAlt, props.printerCurieImageAltEn],
      [props.printerHalotImageAlt, props.printerHalotImageAltEn],
    ][index] || [];
    const slotDescription = slot <= 3 ? props[`selectorProduct${slot}DescriptionHtml` as keyof Props] as string | undefined : undefined;
    const slotDescriptionEn = slot <= 3 ? props[`selectorProduct${slot}DescriptionHtmlEn` as keyof Props] as string | undefined : undefined;
    const slotTag = slot <= 3 ? props[`selectorProduct${slot}Tag` as keyof Props] as string | undefined : undefined;
    const slotTagEn = slot <= 3 ? props[`selectorProduct${slot}TagEn` as keyof Props] as string | undefined : undefined;
    const status = slot <= 3
      ? props[`printerProduct${slot}Status` as keyof Props] as string | undefined
      : undefined;
    const statusEn = slot <= 3
      ? props[`printerProduct${slot}StatusEn` as keyof Props] as string | undefined
      : undefined;
    const variant = liveProduct
      ? getSelectedProductVariant(liveProduct) || liveProduct.variants?.[0] || null
      : null;
    const media = variant ? getProductVariantMainImage(variant) : undefined;
    const studioImageSrc = slotImage ? getDefaultSrc(slotImage) : "";
    const liveHref = liveProduct ? getProductHref(liveProduct) || "" : "";
    const fallbackHref = defaultHrefs[index] || preset?.href || "#";
    const dynamicTag = liveProduct?.brand?.name || liveProduct?.categories?.[0]?.name || "";
    const slotVisible = slot <= 3
      ? props[`selectorProduct${slot}Visible` as keyof Props] !== false
      : true;
    const specOverrides = slot <= 3
      ? [1, 2, 3].map((specIndex) => {
          const base = `selectorProduct${slot}Spec${specIndex}`;
          return {
            label: localizedTextValue(
              props[`${base}Label` as keyof Props] as string | undefined,
              props[`${base}LabelEn` as keyof Props] as string | undefined,
              preset?.specs?.[specIndex - 1]?.label || "",
            ),
            value: localizedTextValue(
              props[`${base}Value` as keyof Props] as string | undefined,
              props[`${base}ValueEn` as keyof Props] as string | undefined,
              preset?.specs?.[specIndex - 1]?.value || "",
            ),
          };
        })
      : (preset?.specs || []);
    const isLivePreset = Boolean(liveProduct && preset && normalizedProductName(preset.title) === normalizedProductName(productName));
    const liveStatus = variant ? getProductVariantFormattedFinalPrice(variant) : "";
    return {
      index,
      visible: slotVisible,
      hot: preset?.hot || index === 0,
      title: localizedTextValue(slotTitle, slotTitleEn, productName),
      href: safeNavigationHref(slotHref, liveHref || fallbackHref),
      imageSrc: studioImageSrc || (legacyImage ? getDefaultSrc(legacyImage) : media?.image ? getDefaultSrc(media.image) : defaultImages[index] || ""),
      imageAlt: localizedTextValue(
        slotImageAlt,
        slotImageAltEn,
        localizedTextValue(legacyImageAlt[0], legacyImageAlt[1], media?.image?.altText || preset?.imageAlt || productName),
      ),
      imageClass: index === 0 ? "printer-img-p16l" : index === 1 ? "printer-img-curie" : index === 2 ? "printer-img-halot" : "",
      tag: localizedTextValue(slotTag, slotTagEn, liveProduct ? dynamicTag : preset?.tag || ""),
      status: localizedTextValue(status, statusEn, liveProduct ? liveStatus : preset?.status || ""),
      descriptionHtml: localizedHtmlValue(
        slotDescription,
        slotDescriptionEn,
        liveProduct ? liveProductDescription(liveProduct) || preset?.descriptionHtml || "" : preset?.descriptionHtml || "",
      ),
      specs: isLivePreset || !liveProduct
        ? specOverrides.filter((spec) => spec.label || spec.value)
        : [],
    };
  }).filter((card) => card.visible);
  const printerCompare = printerData.selector.compare;
  const compareColumns = printerCompare?.columns.map((column, index) => {
    const title = props[`selectorCompareColumn${index + 1}Title` as keyof Props] as string | undefined;
    const titleEn = props[`selectorCompareColumn${index + 1}TitleEn` as keyof Props] as string | undefined;
    const subtitle = props[`selectorCompareColumn${index + 1}Subtitle` as keyof Props] as string | undefined;
    const subtitleEn = props[`selectorCompareColumn${index + 1}SubtitleEn` as keyof Props] as string | undefined;
    return {
      title: localizedTextValue(title, titleEn, column.title),
      subtitle: localizedTextValue(subtitle, subtitleEn, column.subtitle || ""),
    };
  }) || [];
  const compareRows = Array.from({ length: 7 }, (_, index) => {
    const rowNumber = index + 1;
    const defaultRow = printerCompare?.rows[index];
    const label = props[`selectorCompareRow${rowNumber}Label` as keyof Props] as string | undefined;
    const labelEn = props[`selectorCompareRow${rowNumber}LabelEn` as keyof Props] as string | undefined;
    const values = [1, 2, 3].map((column) => {
      const value = props[`selectorCompareRow${rowNumber}Value${column}` as keyof Props] as string | undefined;
      const valueEn = props[`selectorCompareRow${rowNumber}Value${column}En` as keyof Props] as string | undefined;
      return localizedHtmlValue(value, valueEn, defaultRow?.values[column - 1] || "");
    });
    return {
      label: localizedTextValue(label, labelEn, defaultRow?.label || ""),
      values,
    };
  }).filter((row) => row.label || row.values.some((value) => value.trim()));

  return (
    <div className="three-mash-printers-source" style={{
      "--p-bg": resolveThemeColor(props.backgroundColor) || "var(--tm-theme-bg, #FAFAF7)",
      "--p-ink": resolveThemeColor(props.textColor) || "#0d0d0b",
      "--p-sub": resolveThemeColor(props.mutedTextColor) || "#4f514a",
      "--p-line": resolveThemeColor(props.lineColor) || "#deded6",
      "--p-lime": resolveThemeColor(props.accentColor) || "#c7f136",
    } as any}>
      {props.showHero !== false && <div className="hero">
        <div className="wrap">
          <div className="crumb">
            <a href={safeNavigationHref(props.breadcrumbHomeHref, localizedHref("/"))}>
              {localizedTextValue(props.breadcrumbHomeLabel, props.breadcrumbHomeLabelEn, tLocalized("Ana sayfa", "Home"))}
            </a>
            &nbsp;/&nbsp;
            <a href={safeNavigationHref(props.breadcrumbParentHref, localizedHref("/search"))}>
              {localizedTextValue(props.breadcrumbParentLabel, props.breadcrumbParentLabelEn, tLocalized("Ürünler", "Products"))}
            </a>
            &nbsp;/&nbsp;
            <span aria-current="page">
              {localizedTextValue(props.breadcrumbCurrentLabel, props.breadcrumbCurrentLabelEn, tLocalized("3D Yazıcılar", "3D Printers"))}
            </span>
          </div>
          <h1>
            {textValue(props.heroTitlePrefix, tLocalized("±20 mikron", "±20 microns"))} <span className="em">{textValue(props.heroTitleEmphasis, tLocalized("burada doğar.", "is born here."))}</span>
          </h1>
          <p className="sub" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.heroDescriptionHtml || tLocalized("Hassasiyet tesadüf değildir; <b>doğru dalga boyu</b>, termal stabilite ve kalibrasyonla kurulur. 3mash yazıcıları malzemeye göre tasarlanır: <b>385 nm</b> ışık reçinenin kürlenme spektrumuna tam uyar, entegre ısıtma viskoziteyi sabitler. Üstelik <b>gizli lisans veya RFID ücreti yok</b> — istediğiniz reçineyle çalışırsınız.", "Precision is not a coincidence; it's built with <b>the right wavelength</b>, thermal stability, and calibration. 3mash printers are designed around the material: <b>385 nm</b> light matches the resin's curing spectrum exactly, and integrated heating stabilizes viscosity. What's more, <b>there are no hidden license or RFID fees</b> — you can work with any resin you want.")) }} />
          <div className="cta">
            {props.showSelector !== false && <a className="btn lime" href={primaryButtonHref} onClick={(event) => smoothAnchorClick(event, primaryButtonHref)}>{props.primaryButtonText || tLocalized("Yazıcıları karşılaştır ↓", "Compare printers ↓")}</a>}
            <a className="btn line" href={isEnglishLocale() ? contactHref : safeNavigationHref(props.secondaryButtonHref, contactHref)}>{props.secondaryButtonText || tLocalized("Bana uygun olanı öner", "Recommend the right one for me")}</a>
          </div>
          {props.showMetrics !== false && <div className="vstrip">
            <div>
              <div className="v">{textValue(props.metric1Value, "385")} <em>{textValue(props.metric1Emphasis, "nm")}</em></div>
              <div className="l">{textValue(props.metric1Label, tLocalized("reçine kürlenme spektrumuna tam uyum · keskin marjin", "perfect match to the resin's curing spectrum · sharp margin"))}</div>
            </div>
            <div>
              <div className="v">{textValue(props.metric2Value, "14×19")} <em>{textValue(props.metric2Emphasis, "µm")}</em></div>
              <div className="l">{textValue(props.metric2Label, tLocalized("MASH P16L · 16K XY çözünürlük", "MASH P16L · 16K XY resolution"))}</div>
            </div>
            <div>
              <div className="v">{textValue(props.metric3Value, "±20")} <em>{textValue(props.metric3Emphasis, "µm")}</em></div>
              <div className="l">{textValue(props.metric3Label, tLocalized("CURIE M1 · tekrarlanabilir doğruluk", "CURIE M1 · repeatable accuracy"))}</div>
            </div>
            <div>
              <div className="v">{textValue(props.metric4Value, "0")} <em>{textValue(props.metric4Emphasis, tLocalized("gizli ücret", "hidden fee"))}</em></div>
              <div className="l">{textValue(props.metric4Label, tLocalized("lisans / RFID kilidi yok · marka bağımsız reçine", "no license / RFID lock · brand-independent resin"))}</div>
            </div>
          </div>}
        </div>
      </div>}

      {props.showSelector !== false && (
      <section id="karsilastir">
        <div className="wrap">
          <div className="idx"><span className="n">{textValue(props.selectorNumber, "01")}</span>          <span className="t">{textValue(props.selectorLabel, tLocalized("CİHAZLAR", "DEVICES"))}</span><span className="ln" /></div>
          <div className="shead">
            <h2>{textValue(props.selectorTitlePrefix, tLocalized("İhtiyacınıza göre", "Based on your needs,"))} <span className="em">{textValue(props.selectorTitleEmphasis, tLocalized("üç yol.", "three options."))}</span>{props.selectorTitleSuffix}</h2>
            <div className="side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.selectorSideHtml || tLocalized("En yüksek çözünürlük, en yüksek hız ya da en uygun giriş — üçü de aynı 3mash desteğiyle ve <b>gizli ücret olmadan</b> gelir.", "Highest resolution, highest speed, or the best entry point — all three come with the same 3mash support and <b>without hidden fees</b>.")) }} />
          </div>
          <div className="pgrid">
            {printerCards.map((card) => (
              <div className={`pc${card.hot ? " hot" : ""}`} key={`${card.title}-${card.href}`}>
                <div className={`ph${card.index === 2 ? " ph-halot" : ""}`}>
                  {card.tag ? <span className={`tag${card.hot ? " hot" : ""}`}>{card.tag}</span> : null}
                  {card.status ? <span className="st">{card.status}</span> : null}
                  {card.imageSrc ? <img className={`printer-img ${card.imageClass}`} src={card.imageSrc} alt={card.imageAlt} loading="lazy" /> : null}
                </div>
                <div className="bd">
                  <h3>{card.title}</h3>
                  <div className="ds" dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.descriptionHtml) }} />
                  {card.specs.length ? (
                    <div className="kv">
                      {card.specs.map((spec, specIndex) => (
                        <div key={`${spec.label}-${specIndex}`}>
                          <span>{spec.label}</span>
                          <b dangerouslySetInnerHTML={{ __html: sanitizeHtml(spec.value) }} />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <a className="go" href={card.href}>
                    {textValue(props.selectorCardCtaText, tLocalized("İncele", "View"))} <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {props.selectorCompareVisible !== false ? <>
          <div className="cmp" id="karsilastirma-tablosu">
            <table>
              <thead><tr>
                {compareColumns.map((column, index) => (
                  <th key={`${column.title}-${index}`}>
                    {column.title}
                    {column.subtitle ? <span className="t">{column.subtitle}</span> : null}
                  </th>
                ))}
              </tr></thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((value, index) => (
                      <td dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} key={`${row.label}-${index}`} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note" dangerouslySetInnerHTML={{ __html: sanitizeHtml(localizedHtmlValue(props.selectorCompareNoteHtml, props.selectorCompareNoteHtmlEn, printerCompare?.noteHtml || "")) }} />
          </> : null}
        </div>
      </section>
      )}

      {props.showFeature !== false && (
      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">{textValue(props.featureNumber, "02")}</span>          <span className="t">{textValue(props.featureLabel, tLocalized("ÖNE ÇIKAN", "FEATURED"))}</span><span className="ln" /></div>
          <div className="flag">
            <div>
              <div className="tag">{textValue(props.featureEyebrow, tLocalized("MASH P16L · 385nm · 16K", "MASH P16L · 385 nm · 16K"))}</div>
              <h3>{textValue(props.featureTitlePrefix, tLocalized("Marjin hattı,", "Margin line,"))} <span className="em">{textValue(props.featureTitleEmphasis, tLocalized("saç telinden ince.", "thinner than a strand of hair."))}</span>{props.featureTitleSuffix}</h3>
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.featureDescriptionHtml || tLocalized("Profesyonel 385 nm UV kaynağı reçinelerin kürlenme spektrumuna tam uyar; parazit ışığı minimize ederek <b>keskin marjin hatları</b> sunar. 16K çözünürlük 14×19 µm XY hassasiyet getirir; entegre termal kontrol reçine viskozitesini sabitleyerek <b>her baskıda</b> aynı sonucu güvence altına alır.", "The professional 385 nm UV source matches the curing spectrum of resins and minimizes stray light for <b>sharp margin lines</b>. 16K resolution brings 14×19 µm XY precision; integrated thermal control stabilizes resin viscosity, so you get the same result <b>with every print</b>.")) }} />
              <a className="go" href={safeNavigationHref(props.featureHref, p16lHref)}>{textValue(props.featureCtaText, tLocalized("Ürün detayına git →", "Go to product details →"))}</a>
            </div>
            <div className="spectbl">
              <div><span>{textValue(props.featureSpec1Label, tLocalized("XY çözünürlük", "XY resolution"))}</span><b>{textValue(props.featureSpec1Value, "14×19 µm (16K)")}</b></div>
              <div><span>{textValue(props.featureSpec2Label, tLocalized("Işık kaynağı", "Light source"))}</span><b>{textValue(props.featureSpec2Value, "385 nm UV")}</b></div>
              <div><span>{textValue(props.featureSpec3Label, tLocalized("Termal kontrol", "Thermal control"))}</span><b>{textValue(props.featureSpec3Value, tLocalized("Entegre (25/30°C)", "Integrated (25/30°C)"))}</b></div>
              <div><span>{textValue(props.featureSpec4Label, tLocalized("Kalibrasyon", "Calibration"))}</span><b>{textValue(props.featureSpec4Value, tLocalized("8 nokta dikey kilit", "8-point vertical lock"))}</b></div>
            </div>
          </div>
        </div>
      </section>
      )}

      {props.showDetail !== false && (
      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">{textValue(props.detailNumber, "03")}</span>          <span className="t">{textValue(props.detailLabel, tLocalized("NEDEN 3MASH YAZICILARI FARKLI", "WHY 3MASH PRINTERS ARE DIFFERENT"))}</span><span className="ln" /></div>
          <div className="shead">
            <h2>{textValue(props.detailTitlePrefix, tLocalized("İyi cihaz değil,", "Not just a good device,"))} <span className="em">{textValue(props.detailTitleEmphasis, tLocalized("doğru sistem.", "the right system."))}</span>{props.detailTitleSuffix}</h2>
            <div className="side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailSideHtml || tLocalized("Hassasiyet dört şeyin bir araya gelmesiyle çıkar. 3mash yazıcıları bunları baştan düşünülerek tasarlanır.", "Precision comes from the combination of four things. 3mash printers are designed with these in mind from the start.")) }} />
          </div>
          <div className="whygrid">
            <div className="why"><div className="n">01</div><h4>{textValue(props.detailCard1Title, tLocalized("Malzemeye göre ışık", "Light matched to the material"))}</h4><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailCard1DescriptionHtml || tLocalized("<b>385 nm</b> dalga boyu reçine kimyasına uyar; parazit ışığı azaltır, marjini keskinleştirir. (P16L)", "The <b>385 nm</b> wavelength matches the resin chemistry; it reduces stray light and sharpens the margin. (P16L)")) }} /></div>
            <div className="why"><div className="n">02</div><h4>{textValue(props.detailCard2Title, tLocalized("Termal stabilite", "Thermal stability"))}</h4><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailCard2DescriptionHtml || tLocalized("Entegre ısıtma <b>reçine viskozitesini</b> sabitler; baskıdan baskıya sonucu tekrar edilebilir kılar.", "Integrated heating stabilizes <b>resin viscosity</b> and keeps results repeatable from print to print.")) }} /></div>
            <div className="why"><div className="n">03</div><h4>{textValue(props.detailCard3Title, tLocalized("Kalibrasyon derdi yok", "No calibration hassle"))}</h4><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailCard3DescriptionHtml || tLocalized("8 nokta dikey kilit ve <b>6 aya kadar</b> kalibrasyon gerektirmeyen yapı — her gün aynı doğruluk.", "8-point vertical lock and <b>up to 6 months</b> of calibration-free operation — the same accuracy, every day.")) }} /></div>
            <div className="why"><div className="n">04</div><h4>{textValue(props.detailCard4Title, tLocalized("Kilitlenme yok", "No lock-in"))}</h4><p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailCard4DescriptionHtml || tLocalized("<b>Gizli lisans / RFID ücreti yok.</b> İstediğiniz marka reçineyle çalışır, bir ekosisteme mahkûm olmazsınız.", "<b>No hidden license / RFID fee.</b> Works with the resin brand you want, so you're not locked into one ecosystem.")) }} /></div>
          </div>

          <div className="cure">
            <div className="tx">
              <h3>{textValue(props.detailCalloutTitlePrefix, tLocalized("Yazıcı, hikâyenin", "The printer is"))} <span className="em">{textValue(props.detailCalloutTitleEmphasis, tLocalized("üçte biri.", "only one-third of the story."))}</span>{props.detailCalloutTitleSuffix}</h3>
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.detailCalloutDescriptionHtml || tLocalized("En iyi cihaz bile yanlış reçine veya yanlış kürlemeyle hassasiyeti kaybeder. Kuronun oturması <b>yazıcı + reçine + kürlemenin</b> senkronuna bağlıdır — biz üçünü birlikte kalibre ediyoruz.", "Even the best device loses precision with the wrong resin or the wrong curing. Whether a crown seats properly depends on the synchronization of <b>printer + resin + curing</b> — we calibrate all three together.")) }} />
            </div>
            <div className="lk">
              <a className="btn" href={safeNavigationHref(props.detailCalloutButton1Href, resinsHref)}>{textValue(props.detailCalloutButton1Text, tLocalized("Uyumlu reçineler →", "Compatible resins →"))}</a>
              <a
                className="btn line"
                href={props.detailCalloutButton2Href ? safeNavigationHref(props.detailCalloutButton2Href, `${washCureHref}#neden-gerekli`) : `${washCureHref}#neden-gerekli`}
                onClick={props.detailCalloutButton2Href ? undefined : (event) => crossPageAnchorClick(event, washCureHref, "neden-gerekli")}
              >
                {textValue(props.detailCalloutButton2Text, tLocalized("Kürlemenin önemi →", "The importance of curing →"))}
              </a>
            </div>
          </div>
        </div>
      </section>
      )}

      {props.showFaq !== false && (
      <section className="section-no-top" id="sss">
        <div className="wrap">
          <div className="idx"><span className="n">{textValue(props.faqNumber, "04")}</span>          <span className="t">{textValue(props.faqLabel, tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS"))}</span><span className="ln" /></div>
          <div className="shead"><h2>{textValue(props.faqTitle, tLocalized("Yazıcı seçerken merak edilenler.", "Frequently asked questions when choosing a printer."))}</h2><div className="side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faqSideHtml || tLocalized("Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from dentists and labs, with clear answers.")) }} /></div>
          <div className="faq">
            <div className="qa"><details open><summary>{textValue(props.faq1Question, tLocalized("Hangi dental 3D yazıcıyı seçmeliyim?", "Which dental 3D printer should I choose?"))}<span className="pl">+</span></summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faq1AnswerHtml || tLocalized("İhtiyacınıza göre: en yüksek çözünürlük ve keskin marjin için <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); hız ve düşük toplam maliyet için yerli <b>Mash CURIE M1</b> (±20 µm, 14 dk'da geçici kron); dijitale ekonomik giriş için <b>Creality Halot-Sky 6K</b> (arttırılmış versiyonda ±15 µm). Emin değilseniz yukarıdaki <a href=\"#karsilastir\">karşılaştırmayı</a> kullanın veya ekibimize danışın.", "It depends on your needs: for the highest resolution and sharpest margins, choose the <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); for speed and low total cost, the domestic <b>Mash CURIE M1</b> (±20 µm, temporary crown in 14 min); for an economical entry into digital, the <b>Creality Halot-Sky 6K</b> (±15 µm in the enhanced version). If you're not sure, check out <a href=\"#karsilastir\">the comparison</a> above or consult our team.")) }} /></details></div>
            <div className="qa"><details><summary>{textValue(props.faq2Question, tLocalized("385 nm mi, 405 nm mi? Fark ne?", "385 nm or 405 nm? What's the difference?"))}<span className="pl">+</span></summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faq2AnswerHtml || tLocalized(`<b>385 nm</b> dalga boyu, çoğu dental reçinenin kürlenme spektrumuna daha iyi uyar; parazit ışığı azaltır ve daha keskin marjinler sağlar. MASH P16L bu yüzden profesyonel 385 nm UV kaynağı kullanır. Detaylı karşılaştırma için Mash Academy'deki <a href="${wavelengthBlogHref}">385nm mi 405nm mi?</a> yazısına bakabilirsiniz.`, `<b>385 nm</b> wavelength better matches the curing spectrum of most dental resins; it reduces stray light and provides sharper margins. This is why the MASH P16L uses a professional 385 nm UV source. For a detailed comparison, see the Mash Academy article <a href="${wavelengthBlogHref}">385nm or 405nm?</a>.`)) }} /></details></div>
            <div className="qa"><details><summary>{textValue(props.faq3Question, tLocalized("Gizli lisans veya RFID reçine ücreti var mı?", "Is there a hidden license or RFID resin fee?"))}<span className="pl">+</span></summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faq3AnswerHtml || tLocalized("<b>Hayır.</b> 3mash yazıcılarında gizli lisans veya RFID kilidi yoktur. Cihazı bir marka reçineye mahkûm etmiyoruz; dilediğiniz reçineyle çalışabilir, maliyetinizi kendiniz kontrol edebilirsiniz.", "<b>No.</b> 3mash printers have no hidden license or RFID lock. We don't tie the device to a single resin brand; you can work with any resin you like and control your own costs.")) }} /></details></div>
            <div className="qa"><details><summary>{textValue(props.faq4Question, tLocalized("Ne sıklıkta kalibrasyon gerekir?", "How often is calibration required?"))}<span className="pl">+</span></summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faq4AnswerHtml || tLocalized("Sık sık değil. MASH P16L <b>8 nokta dikey kilit</b> sayesinde aylarca stabil kalır; Mash CURIE M1 <b>6 aya kadar</b> kalibrasyon gerektirmez. Böylece her gün aynı doğrulukta baskı alırsınız.", "Not often. The MASH P16L's <b>8-point vertical lock</b> keeps it stable for months; the Mash CURIE M1 goes <b>up to 6 months</b> without calibration. That way you get the same print accuracy every day.")) }} /></details></div>
            <div className="qa"><details><summary>{textValue(props.faq5Question, tLocalized("Başka marka reçineyle çalışır mı?", "Does it work with another brand's resin?"))}<span className="pl">+</span></summary>
              <div className="a" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.faq5AnswerHtml || tLocalized("Evet. 3mash yazıcıları marka bağımsızdır. Dahası teknik ekibimiz, kullandığınız reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> en iyi sonucu almanızı sağlar.", "Yes. 3mash printers are brand-independent. What's more, our technical team helps you get the best result with the resin you use by <b>calibrating it together with your device's parameters</b>.")) }} /></details></div>
          </div>
        </div>
      </section>
      )}

      {props.showFinalCta !== false && (
      <section className="final">
        <div className="wrap">
          <h2>{textValue(props.finalTitlePrefix, tLocalized("Doğru yazıcıyı", "Let's choose the right printer"))} <span className="em">{textValue(props.finalTitleEmphasis, tLocalized("birlikte seçelim.", "together."))}</span>{props.finalTitleSuffix}</h2>
          <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.finalDescriptionHtml || tLocalized("Hangi işler, hangi hacim, hangi bütçe? Kısa bir görüşmeyle size en uygun cihazı, reçineyi ve doğru parametreleri <b>ücretsiz</b> önerelim — elinizdeki cihazı da değerlendiririz.", "What kind of work, what volume, what budget? In a short conversation we'll recommend the right device, resin, and parameters for you <b>free of charge</b> — and we'll evaluate the device you already own, too.")) }} />
          <div className="cta">
            <a className="btn lime" href={safeNavigationHref(props.finalPrimaryButtonHref, contactHref)}>{textValue(props.finalPrimaryButtonText, tLocalized("Uzmana danış — ücretsiz", "Consult an expert — free"))}</a>
            <a className="btn inv" href={props.finalSecondaryButtonHref ? safeNavigationHref(props.finalSecondaryButtonHref, compareHref) : compareHref} onClick={props.finalSecondaryButtonHref ? undefined : (event) => smoothAnchorClick(event, compareHref)}>{textValue(props.finalSecondaryButtonText, tLocalized("Karşılaştırmaya dön", "Back to comparison"))}</a>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
