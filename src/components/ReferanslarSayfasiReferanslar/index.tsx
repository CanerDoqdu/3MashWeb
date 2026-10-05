import { Props } from "./types";
import ThreeMashReferenceWall from "../../sub-components/ThreeMashReferenceWall";
import { profileBerkan, profileGoksel, profileMehmet } from "../../assets/remaining-assets-data";
import { tLocalized } from "../../utils/i18n";
import {
  escapeReferenceHtml,
  localizedReferenceText,
  referenceImage,
  referenceRichHtml,
  referencesRootStyle,
} from "../../utils/threeMashReferencesStandalone";

const profileFallbacks = [profileMehmet, profileBerkan, profileGoksel];

export function ReferanslarSayfasiReferanslar(props: Props) {
  const referenceProps = [
    { type: props.reference1TypeText, typeEn: props.reference1TypeTextEn, quote: props.reference1QuoteHtml, quoteEn: props.reference1QuoteHtmlEn, name: props.reference1NameText, nameEn: props.reference1NameTextEn, details: props.reference1DetailsHtml, detailsEn: props.reference1DetailsHtmlEn, image: props.reference1ImageUrl, show: props.showReference1 },
    { type: props.reference2TypeText, typeEn: props.reference2TypeTextEn, quote: props.reference2QuoteHtml, quoteEn: props.reference2QuoteHtmlEn, name: props.reference2NameText, nameEn: props.reference2NameTextEn, details: props.reference2DetailsHtml, detailsEn: props.reference2DetailsHtmlEn, image: props.reference2ImageUrl, show: props.showReference2 },
    { type: props.reference3TypeText, typeEn: props.reference3TypeTextEn, quote: props.reference3QuoteHtml, quoteEn: props.reference3QuoteHtmlEn, name: props.reference3NameText, nameEn: props.reference3NameTextEn, details: props.reference3DetailsHtml, detailsEn: props.reference3DetailsHtmlEn, image: props.reference3ImageUrl, show: props.showReference3 },
    { type: props.reference4TypeText, typeEn: props.reference4TypeTextEn, quote: props.reference4QuoteHtml, quoteEn: props.reference4QuoteHtmlEn, name: props.reference4NameText, nameEn: props.reference4NameTextEn, details: props.reference4DetailsHtml, detailsEn: props.reference4DetailsHtmlEn, image: props.reference4ImageUrl, show: props.showReference4 },
    { type: props.reference5TypeText, typeEn: props.reference5TypeTextEn, quote: props.reference5QuoteHtml, quoteEn: props.reference5QuoteHtmlEn, name: props.reference5NameText, nameEn: props.reference5NameTextEn, details: props.reference5DetailsHtml, detailsEn: props.reference5DetailsHtmlEn, image: props.reference5ImageUrl, show: props.showReference5 },
    { type: props.reference6TypeText, typeEn: props.reference6TypeTextEn, quote: props.reference6QuoteHtml, quoteEn: props.reference6QuoteHtmlEn, name: props.reference6NameText, nameEn: props.reference6NameTextEn, details: props.reference6DetailsHtml, detailsEn: props.reference6DetailsHtmlEn, image: props.reference6ImageUrl, show: props.showReference6 },
    { type: props.reference7TypeText, typeEn: props.reference7TypeTextEn, quote: props.reference7QuoteHtml, quoteEn: props.reference7QuoteHtmlEn, name: props.reference7NameText, nameEn: props.reference7NameTextEn, details: props.reference7DetailsHtml, detailsEn: props.reference7DetailsHtmlEn, image: props.reference7ImageUrl, show: props.showReference7 },
    { type: props.reference8TypeText, typeEn: props.reference8TypeTextEn, quote: props.reference8QuoteHtml, quoteEn: props.reference8QuoteHtmlEn, name: props.reference8NameText, nameEn: props.reference8NameTextEn, details: props.reference8DetailsHtml, detailsEn: props.reference8DetailsHtmlEn, image: props.reference8ImageUrl, show: props.showReference8 },
    { type: props.reference9TypeText, typeEn: props.reference9TypeTextEn, quote: props.reference9QuoteHtml, quoteEn: props.reference9QuoteHtmlEn, name: props.reference9NameText, nameEn: props.reference9NameTextEn, details: props.reference9DetailsHtml, detailsEn: props.reference9DetailsHtmlEn, image: props.reference9ImageUrl, show: props.showReference9 },
    { type: props.reference10TypeText, typeEn: props.reference10TypeTextEn, quote: props.reference10QuoteHtml, quoteEn: props.reference10QuoteHtmlEn, name: props.reference10NameText, nameEn: props.reference10NameTextEn, details: props.reference10DetailsHtml, detailsEn: props.reference10DetailsHtmlEn, image: props.reference10ImageUrl, show: props.showReference10 },
    { type: props.reference11TypeText, typeEn: props.reference11TypeTextEn, quote: props.reference11QuoteHtml, quoteEn: props.reference11QuoteHtmlEn, name: props.reference11NameText, nameEn: props.reference11NameTextEn, details: props.reference11DetailsHtml, detailsEn: props.reference11DetailsHtmlEn, image: props.reference11ImageUrl, show: props.showReference11 },
  ];
  const entries = referenceProps.flatMap((item, index) => {
    const isNewSlot = index >= 9;
    if (isNewSlot ? item.show !== true : item.show === false) return [];

    const name = localizedReferenceText(item.name, item.nameEn, tLocalized("Yeni Referans", "New Reference"));
    const quote = localizedReferenceText(item.quote, item.quoteEn, tLocalized("Yeni referans metnini buraya ekleyin.", "Add the new reference text here."));
    if (isNewSlot && (!name.trim() || !quote.trim())) return [];

    const details = localizedReferenceText(
      item.details,
      item.detailsEn,
      tLocalized("<span>Kuruluş / görev</span><small>Referans bilgisi</small>", "<span>Organization / role</span><small>Reference details</small>"),
    );
    return [{
      type: localizedReferenceText(item.type, item.typeEn, tLocalized("Kullanıcı yorumu", "User Review")),
      quoteHtml: referenceRichHtml(quote),
      name,
      detailsHtml: referenceRichHtml(`<strong>${escapeReferenceHtml(name)}</strong>${details}`),
      image: referenceImage(item.image, profileFallbacks[index] ?? ""),
      featured: index === 0,
    }];
  });
  const id = props.sectionAnchorId?.trim() || "referanslar-duvar";

  return (
    <section id={id} className="three-mash-references" style={referencesRootStyle(props)}>
      <div className="tmref-shell">
        <ThreeMashReferenceWall
          visible={props.showReferenceWall !== false && entries.length > 0}
          ariaLabel={localizedReferenceText(
            props.referencesAriaLabel,
            props.referencesAriaLabelEn,
            tLocalized("3MASH referans yorumları", "3MASH reference reviews"),
          )}
          entries={entries}
        />
      </div>
    </section>
  );
}

export default ReferanslarSayfasiReferanslar;
