import { Props } from "./types";
import ThreeMashReferencesPartners from "../../sub-components/ThreeMashReferencesPartners";
import { machineP16L, resinBottle } from "../../assets/remaining-assets-data";
import { tLocalized } from "../../utils/i18n";
import {
  localizedReferenceText,
  referenceImage,
  referenceRichHtml,
  referencesRootStyle,
} from "../../utils/threeMashReferencesStandalone";

export function ReferanslarSayfasiCozumOrtaklari(props: Props) {
  const partnerSources = [
    {
      name: props.partner1NameText,
      nameEn: props.partner1NameTextEn,
      title: props.partner1TitleText,
      titleEn: props.partner1TitleTextEn,
      description: props.partner1DescriptionHtml,
      descriptionEn: props.partner1DescriptionHtmlEn,
      image: props.partner1ImageUrl,
      fallbackImage: machineP16L,
      show: props.showPartner1,
    },
    {
      name: props.partner2NameText,
      nameEn: props.partner2NameTextEn,
      title: props.partner2TitleText,
      titleEn: props.partner2TitleTextEn,
      description: props.partner2DescriptionHtml,
      descriptionEn: props.partner2DescriptionHtmlEn,
      image: props.partner2ImageUrl,
      fallbackImage: resinBottle,
      show: props.showPartner2,
    },
  ];
  const cards = partnerSources.flatMap((item) => {
    if (item.show === false) return [];
    const image = referenceImage(item.image, item.fallbackImage);
    return image ? [{
      name: localizedReferenceText(item.name, item.nameEn, tLocalized("Çözüm ortağı", "Solution partner")),
      title: localizedReferenceText(item.title, item.titleEn, tLocalized("Dental üretim ekosistemi", "Dental production ecosystem")),
      descriptionHtml: referenceRichHtml(localizedReferenceText(item.description, item.descriptionEn, tLocalized("Ürün, eğitim ve teknik destek aynı iş akışında buluşur.", "Products, training, and technical support come together in one workflow."))),
      image,
    }] : [];
  });

  if (props.showPartner3 === true) {
    const image = referenceImage(props.partner3ImageUrl);
    if (image) {
      cards.push({
        name: localizedReferenceText(props.partner3NameText, props.partner3NameTextEn, tLocalized("Yeni Çözüm Ortağı", "New Solution Partner")),
        title: localizedReferenceText(props.partner3TitleText, props.partner3TitleTextEn, tLocalized("Yeni iş ortağı başlığı", "New partner headline")),
        descriptionHtml: referenceRichHtml(localizedReferenceText(
          props.partner3DescriptionHtml,
          props.partner3DescriptionHtmlEn,
          tLocalized("İş ortağınızı ve sunduğu değeri buraya tanıtın.", "Introduce the partner and the value they provide here."),
        )),
        image,
      });
    }
  }
  const id = props.sectionAnchorId?.trim() || "referanslar-ortaklar";

  return (
    <section id={id} className="three-mash-references" style={referencesRootStyle(props)}>
      <div className="tmref-shell">
        <ThreeMashReferencesPartners
          visible={props.showPartners !== false && cards.length > 0}
          id={`${id}-content`}
          titleId={`${id}-title`}
          kicker={localizedReferenceText(props.partnersKicker, props.partnersKickerEn, tLocalized("Çözüm ortakları", "Solution Partners"))}
          title={localizedReferenceText(props.partnersTitle, props.partnersTitleEn, tLocalized("Cihaz, reçine ve teknik destek aynı iş akışında buluşur.", "Hardware, resin, and technical support unite in the same workflow."))}
          cards={cards}
        />
      </div>
    </section>
  );
}

export default ReferanslarSayfasiCozumOrtaklari;
