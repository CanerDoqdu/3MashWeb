// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  eyebrowText?: string;
  titleBeforeAmount?: string;
  titleAfterAmount?: string;
  titleEmphasis?: string;
  subtitleStart?: string;
  subtitleStrongOne?: string;
  subtitleMiddle?: string;
  subtitleStrongTwo?: string;
  subtitleEnd?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  hintText?: string;
  /** Hesaplayıcı bölümünün benzersiz HTML kimliği; sayfa içi bağlantılar bu kimliğe yönlenebilir. */
  calculatorAnchorId?: string;
  calculatorEyebrow?: string;
  calculatorBadgeText?: string;
  clinicModeText?: string;
  labModeText?: string;
  clinicWorkLabel?: string;
  labWorkLabel?: string;
  currentLossLabel?: string;
  currentLossNote?: string;
  targetLossLabel?: string;
  targetLossNote?: string;
  savingsEyebrow?: string;
  alreadyTargetText?: string;
  fineTextBeforeLink?: string;
  fineLinkText?: string;
  fineLinkHref?: string;
  fineTextAfterLink?: string;
  currencyPrefix?: string;
  percentPrefix?: string;
  negativePrefix?: string;
  positivePrefix?: string;
  locale?: string;
  /** Klinik vaka slider alt sınırı; 0 veya üzeri ve üst sınırdan küçük olmalıdır. */
  clinicWorkMin?: number;
  /** Klinik vaka slider üst sınırı; alt sınırdan büyük olmalıdır. */
  clinicWorkMax?: number;
  /** Klinik vaka slider artış miktarı sıfırdan büyük olmalıdır. */
  clinicWorkStep?: number;
  /** Klinik vaka başlangıç değeri; alt ve üst sınırlar arasında olmalıdır. */
  clinicWorkDefault?: number;
  /** Klinik başlangıç tekrar oranı yüzdesi; slider sınırları arasında olmalıdır. */
  clinicRptDefault?: number;
  /** Klinik tekrar maliyeti slider alt sınırı; 0 veya üzeri ve üst sınırdan küçük olmalıdır. */
  clinicCostMin?: number;
  /** Klinik tekrar maliyeti slider üst sınırı; alt sınırdan büyük olmalıdır. */
  clinicCostMax?: number;
  /** Klinik maliyet slider artış miktarı sıfırdan büyük olmalıdır. */
  clinicCostStep?: number;
  /** Klinik tekrar maliyeti başlangıç değeri; alt ve üst sınırlar arasında olmalıdır. */
  clinicCostDefault?: number;
  /** Laboratuvar üretim slider alt sınırı; 0 veya üzeri ve üst sınırdan küçük olmalıdır. */
  labWorkMin?: number;
  /** Laboratuvar üretim slider üst sınırı; alt sınırdan büyük olmalıdır. */
  labWorkMax?: number;
  /** Laboratuvar üretim slider artış miktarı sıfırdan büyük olmalıdır. */
  labWorkStep?: number;
  /** Laboratuvar üretim başlangıç değeri; alt ve üst sınırlar arasında olmalıdır. */
  labWorkDefault?: number;
  /** Laboratuvar başlangıç tekrar oranı yüzdesi; slider sınırları arasında olmalıdır. */
  labRptDefault?: number;
  /** Laboratuvar tekrar maliyeti slider alt sınırı; 0 veya üzeri ve üst sınırdan küçük olmalıdır. */
  labCostMin?: number;
  /** Laboratuvar tekrar maliyeti slider üst sınırı; alt sınırdan büyük olmalıdır. */
  labCostMax?: number;
  /** Laboratuvar maliyet slider artış miktarı sıfırdan büyük olmalıdır. */
  labCostStep?: number;
  /** Laboratuvar tekrar maliyeti başlangıç değeri; alt ve üst sınırlar arasında olmalıdır. */
  labCostDefault?: number;
  stat1Value?: string;
  stat1Suffix?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Suffix?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Suffix?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Suffix?: string;
  stat4Label?: string;
  /** Desktop-only underline visibility. */
  showTitleUnderline?: boolean;
  /** Görseli buradan yükleyin; boyut, konum ve efektler görsel kontrol grubundan yönetilir. */
  titleUnderlineImageUrl?: IkasImage | null;
  titleUnderlineImageAlt?: string;
  titleUnderlineImageWidth?: number;
  titleUnderlineImageHeight?: number;
  titleUnderlineImageXOffset?: number;
  titleUnderlineImageYOffset?: number;
  titleUnderlineImageFit?: LogoImageFit;
  titleUnderlineImageOpacity?: number;
  titleUnderlineImageBrightness?: number;
  titleUnderlineImageContrast?: number;
  titleUnderlineImageSaturation?: number;
  titleUnderlineImageHue?: number;
  titleUnderlineImageInvert?: number;
  clinicRptLabel?: string;
  /** Klinik tekrar oranı alt sınırı yüzde olarak girilir; üst sınırdan küçük olmalıdır. */
  clinicRptMin?: number;
  /** Klinik tekrar oranı üst sınırı yüzde olarak girilir; alt sınırdan büyük olmalıdır. */
  clinicRptMax?: number;
  /** Klinik tekrar oranı slider artış miktarı sıfırdan büyük olmalıdır. */
  clinicRptStep?: number;
  clinicCostLabel?: string;
  clinicCostDetailText?: string;
  /** Hesaplama sayfasının site içi adresi; klinik modu uygulama tarafından URL sonuna eklenir. */
  clinicCostDetailHref?: string;
  labRptLabel?: string;
  /** Laboratuvar tekrar oranı alt sınırı yüzde olarak girilir; üst sınırdan küçük olmalıdır. */
  labRptMin?: number;
  /** Laboratuvar tekrar oranı üst sınırı yüzde olarak girilir; alt sınırdan büyük olmalıdır. */
  labRptMax?: number;
  /** Laboratuvar tekrar oranı slider artış miktarı sıfırdan büyük olmalıdır. */
  labRptStep?: number;
  labCostLabel?: string;
  labCostDetailText?: string;
  /** Hesaplama sayfasının site içi adresi; laboratuvar modu uygulama tarafından URL sonuna eklenir. */
  labCostDetailHref?: string;
  /** Tasarruf hesabında kullanılan hedef klinik tekrar yüzdesi; slider aralığında ve 0-100 arasında olmalıdır. */
  clinicTargetRepeatRate?: number;
  /** Tasarruf hesabında kullanılan hedef laboratuvar tekrar yüzdesi; slider aralığında ve 0-100 arasında olmalıdır. */
  labTargetRepeatRate?: number;
  titleUnderlineTabletWidth?: number;
  titleUnderlineTabletXOffset?: number;
  titleUnderlineTabletHeight?: number;
  titleUnderlineTabletYOffset?: number;
  titleUnderlineMobileXOffset?: number;
  titleUnderlineMobileWidth?: number;
  titleUnderlineMobileHeight?: number;
  titleUnderlineMobileYOffset?: number;
  showTitleUnderlineTablet?: boolean;
  showTitleUnderlineMobile?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
  labTitleBeforeAmount?: string;
  titleLossConnectorText?: string;
  titleLossPeriodText?: string;
  showCalculator?: boolean;
  showStats?: boolean;
  showCta?: boolean;
  showStat1?: boolean;
  showStat2?: boolean;
  showStat3?: boolean;
  showStat4?: boolean;
  /** Gösterilmesi için 5. metrik alanlarından en az biri doldurulmalıdır; tümü boşsa kart render edilmez. */
  showStat5?: boolean;
  /** Gösterilmesi için 6. metrik alanlarından en az biri doldurulmalıdır; tümü boşsa kart render edilmez. */
  showStat6?: boolean;
  stat5Value?: string;
  stat5Suffix?: string;
  stat5Label?: string;
  stat6Suffix?: string;
  stat6Label?: string;
  stat6Value?: string;
  eyebrowTextEn?: string;
  titleBeforeAmountEn?: string;
  titleAfterAmountEn?: string;
  titleEmphasisEn?: string;
  subtitleStartEn?: string;
  subtitleStrongOneEn?: string;
  subtitleMiddleEn?: string;
  subtitleStrongTwoEn?: string;
  subtitleEndEn?: string;
  primaryButtonTextEn?: string;
  secondaryButtonTextEn?: string;
  hintTextEn?: string;
  calculatorEyebrowEn?: string;
  calculatorBadgeTextEn?: string;
  clinicModeTextEn?: string;
  labModeTextEn?: string;
  clinicWorkLabelEn?: string;
  labWorkLabelEn?: string;
  currentLossLabelEn?: string;
  currentLossNoteEn?: string;
  targetLossLabelEn?: string;
  targetLossNoteEn?: string;
  savingsEyebrowEn?: string;
  alreadyTargetTextEn?: string;
  fineTextBeforeLinkEn?: string;
  fineLinkTextEn?: string;
  fineTextAfterLinkEn?: string;
  stat1LabelEn?: string;
  stat2LabelEn?: string;
  stat3LabelEn?: string;
  labRptLabelEn?: string;
  stat6LabelEn?: string;
  titleUnderlineImageAltEn?: string;
  titleLossConnectorTextEn?: string;
  clinicRptLabelEn?: string;
  clinicCostDetailTextEn?: string;
  stat4LabelEn?: string;
  labCostLabelEn?: string;
  clinicCostLabelEn?: string;
  labTitleBeforeAmountEn?: string;
  stat5LabelEn?: string;
  titleLossPeriodTextEn?: string;
  labCostDetailTextEn?: string;
}
