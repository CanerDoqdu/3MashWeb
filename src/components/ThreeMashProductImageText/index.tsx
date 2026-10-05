import { getDefaultSrc } from "@ikas/bp-storefront";
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
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function localizedOverride(trValue: unknown, enValue: unknown, fallback = ""): string {
  return trimmedText(isEnglishLocale() ? enValue : trValue) || fallback;
}

function isSectionVisible(value: unknown): boolean {
  return value !== false && value !== "false";
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

  // 01. Bölüm Başlığı
  const index = trimmedText(props.sectionIndex) || currentUseCases.index || "";
  const label = localizedOverride(props.sectionLabel, props.sectionLabelEn, currentUseCases.label || "");
  const titleHtml = localizedOverride(props.titleHtml, props.titleHtmlEn, currentUseCases.titleHtml || "");
  const sideHtml = localizedOverride(props.sideHtml, props.sideHtmlEn, currentUseCases.sideHtml || "");

  // 02. 1-3 Fotoğraflar
  const photos = [...(currentUseCases.photos || [])];
  const photoOverrides = [
    { image: props.photo1Image, title: props.photo1Title, titleEn: props.photo1TitleEn, text: props.photo1Text, textEn: props.photo1TextEn, alt: props.photo1Alt, altEn: props.photo1AltEn },
    { image: props.photo2Image, title: props.photo2Title, titleEn: props.photo2TitleEn, text: props.photo2Text, textEn: props.photo2TextEn, alt: props.photo2Alt, altEn: props.photo2AltEn },
    { image: props.photo3Image, title: props.photo3Title, titleEn: props.photo3TitleEn, text: props.photo3Text, textEn: props.photo3TextEn, alt: props.photo3Alt, altEn: props.photo3AltEn },
  ];
  for (const [index, override] of photoOverrides.entries()) {
    const existing = photos[index];
    const src = imageSource(override.image);
    if (!src && !existing?.src) continue;
    photos[index] = {
      ...existing,
      src: src || existing?.src || "",
      alt: localizedOverride(override.alt, override.altEn, existing?.alt || ""),
      title: localizedOverride(override.title, override.titleEn, existing?.title || ""),
      text: localizedOverride(override.text, override.textEn, existing?.text || ""),
    };
  }

  // 03. Kullanım Kartı ve Maddeler
  const cards = [...(currentUseCases.cards || [])];
  const bulletOverrides = [
    { tr: props.bullet1Text, en: props.bullet1TextEn },
    { tr: props.bullet2Text, en: props.bullet2TextEn },
    { tr: props.bullet3Text, en: props.bullet3TextEn },
    { tr: props.bullet4Text, en: props.bullet4TextEn },
    { tr: props.bullet5Text, en: props.bullet5TextEn },
    { tr: props.bullet6Text, en: props.bullet6TextEn },
  ];
  const existingCard1 = cards[0];
  const card1HasOverrides = [
    localizedOverride(props.cardEyebrow, props.cardEyebrowEn),
    localizedOverride(props.cardTitle, props.cardTitleEn),
    ...bulletOverrides.map(({ tr, en }) => localizedOverride(tr, en)),
    localizedOverride(props.cardNote, props.cardNoteEn),
  ].some(Boolean);
  if (existingCard1 || card1HasOverrides) {
    const existing = existingCard1 || { eyebrow: "", title: "", items: [] };
    const items = Array.from(
      { length: Math.max(existing.items.length, bulletOverrides.length) },
      (_, index) => localizedOverride(bulletOverrides[index]?.tr, bulletOverrides[index]?.en, existing.items[index] || ""),
    ).filter(Boolean);
    cards[0] = {
      ...existing,
      eyebrow: localizedOverride(props.cardEyebrow, props.cardEyebrowEn, existing.eyebrow),
      title: localizedOverride(props.cardTitle, props.cardTitleEn, existing.title),
      items,
      note: localizedOverride(props.cardNote, props.cardNoteEn, existing.note || ""),
    };
  }

  const card2ContentHtml = localizedOverride(props.card2ContentHtml, props.card2ContentHtmlEn);
  if (card2ContentHtml) {
    const existing = cards[1] || { eyebrow: "", title: "", items: [] };
    cards[1] = { ...existing, contentHtml: card2ContentHtml };
  }

  // 04. Cihaz Uyumluluğu
  const currentDevices = currentUseCases.devices || { eyebrow: "", title: "", textHtml: "", chips: [] };
  const devicesEyebrow = localizedOverride(props.devicesEyebrow, props.devicesEyebrowEn, currentDevices.eyebrow);
  const devicesTitle = localizedOverride(props.devicesTitle, props.devicesTitleEn, currentDevices.title);
  const devicesTextHtml = localizedOverride(props.devicesTextHtml, props.devicesTextHtmlEn, currentDevices.textHtml);
  const rawChips = localizedOverride(props.devicesChips, props.devicesChipsEn);

  const chips = rawChips
    ? rawChips.split(/[\n,;]+/).map((s) => ({ label: s.trim() })).filter((x) => x.label.length > 0)
    : currentDevices.chips;

  const devices = {
    eyebrow: devicesEyebrow,
    title: devicesTitle,
    textHtml: devicesTextHtml,
    chips,
  };

  // 05. Tarama Ekosistemi (Ecosystem) Overrides
  const currentEcosystem = baseData.ecosystem;
  const existingButtons = currentEcosystem?.buttons || [];
  const ecoIndex = trimmedText(props.ecoIndex);
  const ecoLabel = localizedOverride(props.ecoLabel, props.ecoLabelEn);
  const ecoTitleHtml = localizedOverride(props.ecoTitleHtml, props.ecoTitleHtmlEn);
  const ecoTextHtml = localizedOverride(props.ecoTextHtml, props.ecoTextHtmlEn);
  const rawEcoChips = localizedOverride(props.ecoChips, props.ecoChipsEn);
  const ecoButton1Text = localizedOverride(props.ecoButton1Text, props.ecoButton1TextEn);
  const ecoButton1Href = trimmedText(props.ecoButton1Href);
  const ecoButton2Text = localizedOverride(props.ecoButton2Text, props.ecoButton2TextEn);
  const ecoButton2Href = trimmedText(props.ecoButton2Href);
  const hasEcoOverrides = [
    ecoIndex, ecoLabel, ecoTitleHtml, ecoTextHtml, rawEcoChips,
    ecoButton1Text, ecoButton1Href, ecoButton2Text, ecoButton2Href,
  ].some(Boolean);
  let ecosystem = currentEcosystem;

  if (currentEcosystem || hasEcoOverrides) {
    const existingChips = currentEcosystem?.chips || [];
    const parsedEcoChips = rawEcoChips
      ? rawEcoChips.split(/[\n,;]+/).map((s) => s.trim()).filter((s) => s.length > 0)
      : existingChips;

    const buttons = [...existingButtons];
    if (existingButtons[0] || ecoButton1Text || ecoButton1Href) {
      buttons[0] = {
        text: ecoButton1Text || existingButtons[0]?.text || "",
        href: ecoButton1Href || existingButtons[0]?.href || "",
      };
    }
    if (existingButtons[1] || ecoButton2Text || ecoButton2Href) {
      buttons[1] = {
        text: ecoButton2Text || existingButtons[1]?.text || "",
        href: ecoButton2Href || existingButtons[1]?.href || "",
        variant: existingButtons[1]?.variant || "line",
      };
    }

    ecosystem = {
      index: ecoIndex || currentEcosystem?.index || "",
      label: ecoLabel || currentEcosystem?.label || "",
      titleHtml: ecoTitleHtml || currentEcosystem?.titleHtml || "",
      textHtml: ecoTextHtml || currentEcosystem?.textHtml || "",
      chips: parsedEcoChips,
      buttons: buttons.filter((button) => button.text.trim() !== "" && button.href.trim() !== ""),
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
  const isStudio = isStudioEnvironment();
  const sharedData = useSharedProductDetailData(props.product, props.productTemplateJson);
  const fallbackData = props.product ? resolveProductDetailData(props.product, props.productTemplateJson) : null;
  const rawData = sharedData || fallbackData || (isStudio ? makePlaceholderUseCases() : null);

  if (!rawData) return null;

  const data = overrideUseCasesData(rawData, props) || rawData;

  return (
    <ProductDetailSectionScope
      data={data}
      colorOverrides={{
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
        accentColor: props.accentColor,
      }}
    >
      <ProductDetailUseCasesSection
        data={data}
        visibility={{
          photos: isSectionVisible(props.showPhotos),
          card1: isSectionVisible(props.showUseCard1),
          card2: isSectionVisible(props.showUseCard2),
          devices: isSectionVisible(props.showDevices),
        }}
      />
      <ProductDetailEcosystemSection data={data} visible={isSectionVisible(props.showEcosystem)} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductImageText;
