import { getDefaultSrc } from "@ikas/bp-storefront";
import { tLocalized } from "../../utils/i18n";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailEcosystemSection,
  ProductDetailSectionScope,
  ProductDetailUseCasesSection,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderUseCases } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { isEnglishLocale, isTurkishText } from "../../utils/i18n";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function imageSource(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || "";
  } catch {
    return "";
  }
}

function overrideUseCasesData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentUseCases = baseData.useCases;
  if (!currentUseCases) return baseData;

  const p = props as any;

  // 01. Bölüm Başlığı
  const index = trimmedText(p.sectionIndex) || currentUseCases.index || "03";
  const label = trimmedText(p.sectionLabel) || currentUseCases.label || "UYGULAMA ALANLARI";
  const titleHtml = trimmedText(p.titleHtml) || currentUseCases.titleHtml || "";
  const sideHtml = trimmedText(p.sideHtml) || currentUseCases.sideHtml || "";

  // 02. 1-3 Fotoğraflar
  const photos = [...(currentUseCases.photos || [])];
  for (let i = 1; i <= 3; i++) {
    const rawImg = p[`photo${i}Image`];
    const imgSrc = imageSource(rawImg);
    const rawTitle = p[`photo${i}Title`];
    const title = trimmedText(rawTitle);
    const rawText = p[`photo${i}Text`];
    const text = trimmedText(rawText);

    if (imgSrc || title || text) {
      const idx = i - 1;
      const existing = photos[idx] || { src: "", alt: "", title: "", text: "" };
      photos[idx] = {
        ...existing,
        src: imgSrc || existing.src,
        title: title || existing.title,
        text: text || existing.text,
      };
    }
  }

  // 03. Kullanım Kartı ve Maddeler
  const cards = [...(currentUseCases.cards || [])];
  const cardEyebrow = trimmedText(p.cardEyebrow);
  const cardTitle = trimmedText(p.cardTitle);
  const cardNote = trimmedText(p.cardNote);
  const overrideBullets = [
    trimmedText(p.bullet1Text),
    trimmedText(p.bullet2Text),
    trimmedText(p.bullet3Text),
    trimmedText(p.bullet4Text),
    trimmedText(p.bullet5Text),
    trimmedText(p.bullet6Text),
  ].filter(Boolean);

  if (cardEyebrow || cardTitle || overrideBullets.length || cardNote) {
    const existing = cards[0] || { eyebrow: tLocalized("KULLANIM ALANLARI", "APPLICATION AREAS"), title: "", items: [] };
    cards[0] = {
      eyebrow: cardEyebrow || existing.eyebrow,
      title: cardTitle || existing.title,
      items: overrideBullets.length ? overrideBullets : existing.items,
      note: cardNote || existing.note,
    };
  }

  // 04. Cihaz Uyumluluğu
  const currentDevices = currentUseCases.devices || { eyebrow: tLocalized("CİHAZ UYUMLULUĞU", "DEVICE COMPATIBILITY"), title: "", textHtml: "", chips: [] };
  const devicesEyebrow = trimmedText(p.devicesEyebrow);
  const devicesTitle = trimmedText(p.devicesTitle);
  const devicesTextHtml = trimmedText(p.devicesTextHtml);
  const rawChips = trimmedText(p.devicesChips);

  const chips = rawChips
    ? rawChips.split(/[\n,;]+/).map((s) => ({ label: s.trim() })).filter((x) => x.label.length > 0)
    : currentDevices.chips;

  const devices = {
    eyebrow: devicesEyebrow || currentDevices.eyebrow,
    title: devicesTitle || currentDevices.title,
    textHtml: devicesTextHtml || currentDevices.textHtml,
    chips,
  };

  // 05. Tarama Ekosistemi (Ecosystem) Overrides
  let ecosystem = baseData.ecosystem ? { ...baseData.ecosystem } : undefined;
  const ecoIndex = trimmedText(p.ecoIndex);
  const ecoLabel = trimmedText(p.ecoLabel);
  const ecoTitleHtml = trimmedText(p.ecoTitleHtml);
  const ecoTextHtml = trimmedText(p.ecoTextHtml);
  const rawEcoChips = trimmedText(p.ecoChips);
  const ecoButton1Text = trimmedText(p.ecoButton1Text);
  const ecoButton1Href = trimmedText(p.ecoButton1Href);
  const ecoButton2Text = trimmedText(p.ecoButton2Text);
  const ecoButton2Href = trimmedText(p.ecoButton2Href);

  if (ecoIndex || ecoLabel || ecoTitleHtml || ecoTextHtml || rawEcoChips || ecoButton1Text || ecoButton2Text) {
    const existingChips = ecosystem?.chips || [];
    const parsedEcoChips = rawEcoChips
      ? rawEcoChips.split(/[\n,;]+/).map((s) => s.trim()).filter((s) => s.length > 0)
      : existingChips;

    const buttons = [...(ecosystem?.buttons || [])];
    if (ecoButton1Text || ecoButton1Href) {
      buttons[0] = {
        text: ecoButton1Text || buttons[0]?.text || tLocalized("İletişime Geç", "Get in Touch"),
        href: ecoButton1Href || buttons[0]?.href || tLocalized("#iletisim", "#iletisim"),
      };
    }
    if (ecoButton2Text || ecoButton2Href) {
      buttons[1] = {
        text: ecoButton2Text || buttons[1]?.text || tLocalized("Dokümanı İncele", "View Document"),
        href: ecoButton2Href || buttons[1]?.href || tLocalized("#dokuman", "#dokuman"),
        variant: "line",
      };
    }

    ecosystem = {
      index: ecoIndex || ecosystem?.index || "04",
      label: ecoLabel || ecosystem?.label || tLocalized("TARAMA EKOSİSTEMİ", "SCANNING ECOSYSTEM"),
      titleHtml: ecoTitleHtml || ecosystem?.titleHtml || "",
      textHtml: ecoTextHtml || ecosystem?.textHtml || "",
      chips: parsedEcoChips,
      buttons,
    };
  }

  return {
    ...baseData,
    useCases: {
      ...currentUseCases,
      index,
      label,
      titleHtml,
      sideHtml,
      photos,
      cards,
      devices,
    },
    ecosystem,
  };
}

export function ThreeMashProductImageText(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData || makePlaceholderUseCases();

  const data = overrideUseCasesData(rawData, props) || makePlaceholderUseCases();

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailUseCasesSection data={data} />
      {data.ecosystem ? <ProductDetailEcosystemSection data={data} /> : null}
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductImageText;
