import { isEnglishLocale, tLocalized, tProp } from "../../utils/i18n";
import { useMemo } from "preact/hooks";
import { getDefaultSrc } from "@ikas/bp-storefront";
import { renderFooterHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { ThreeMashCookieConsent } from "../ThreeMashCookieConsent";
import { ThreeMashAiBanner } from "../ThreeMashAiBanner";
import { safeJsonLdScript } from "../../utils/sanitizeHtml";
import { Props } from "./types";

function organizationJsonLd(props: Props): string {
  const descriptionText = tProp(
    props.descriptionText,
    "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme çözümleri ve üretim uzmanlığı bir arada.",
    "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together.",
  )
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const logo = props.logoImageUrl
    ? getDefaultSrc(props.logoImageUrl)
    : "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tLocalized("3MASH", "3MASH"),
    legalName: "3MASH Dental & 3D Technologies",
    url: "https://3mash.com",
    logo,
    description: descriptionText,
    address: {
      "@type": "PostalAddress",
      addressLocality: tLocalized("Antalya", "Antalya"),
      addressRegion: tLocalized("Konyaaltı", "Konyaaltı"),
      addressCountry: "TR",
      streetAddress: tLocalized("Antalya Teknokent, Konyaaltı", "Antalya Teknokent, Konyaaltı"),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+905314326577",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
    sameAs: [
      "https://www.instagram.com/3mashdental",
      "https://www.linkedin.com/company/3mash",
    ],
  };

  return safeJsonLdScript(schema);
}

export function ThreeMashFooter(props: Props) {
  const liveFooterProps = { ...props, sectionHtml: "" };
  const locale = isEnglishLocale();
  const jsonLd = useMemo(
    () => organizationJsonLd(props),
    [
      locale,
      props.descriptionText,
      props.descriptionTextEn,
      props.logoImageUrl,
    ],
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ThreeMashStaticSection props={{ ...liveFooterProps, sectionHtml: renderFooterHtml(liveFooterProps) }} />
      <ThreeMashCookieConsent />
    </>
  );
}

export default ThreeMashFooter;
