import { tLocalized } from "../../utils/i18n";
import { useMemo } from "preact/hooks";
import { renderFooterHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

function organizationJsonLd(props: Props): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3MASH",
    legalName: "3MASH Dental & 3D Technologies",
    url: "https://3mash.com",
    logo: "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp",
    description: props.descriptionText || tLocalized("Dental 3D yazıcılar, biyouyumlu reçineler, tarama ve kürleme cihazları ekosistemi.", "Ecosystem of dental 3D printers, biocompatible resins, scanning and curing devices."),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Antalya",
      addressRegion: tLocalized("Konyaaltı", "Konyaalti"),
      addressCountry: "TR",
      streetAddress: tLocalized("Antalya Teknokent, Konyaaltı", "Antalya Technopark, Konyaalti"),
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

  return JSON.stringify(schema);
}

export function ThreeMashFooter(props: Props) {
  const liveFooterProps = { ...props, sectionHtml: "" };
  const jsonLd = useMemo(() => organizationJsonLd(props), [props.descriptionText, props.logoText]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ThreeMashStaticSection props={{ ...liveFooterProps, sectionHtml: renderFooterHtml(liveFooterProps) }} />
    </>
  );
}

export default ThreeMashFooter;
