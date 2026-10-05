import { Props } from "./types";
import ThreeMashReferencesCaseStudy from "../../sub-components/ThreeMashReferencesCaseStudy";
import crsCompositeSararmaImage from "../../assets/crs-composite-sararma-data";
import { tLocalized } from "../../utils/i18n";
import {
  localizedReferenceText,
  referenceImage,
  referenceRichHtml,
  referencesRootStyle,
} from "../../utils/threeMashReferencesStandalone";

export function ReferanslarSayfasiKlinikVaka(props: Props) {
  const id = props.sectionAnchorId?.trim() || "referanslar-vaka";
  const pointConfigs = [
    { value: props.storyPoint1Text, valueEn: props.storyPoint1TextEn, show: props.showStoryPoint1 },
    { value: props.storyPoint2Text, valueEn: props.storyPoint2TextEn, show: props.showStoryPoint2 },
    { value: props.storyPoint3Text, valueEn: props.storyPoint3TextEn, show: props.showStoryPoint3 },
    { value: props.storyPoint4Text, valueEn: props.storyPoint4TextEn, show: props.showStoryPoint4 },
    { value: props.storyPoint5Text, valueEn: props.storyPoint5TextEn, show: props.showStoryPoint5 },
  ];
  const storyPoints = pointConfigs.flatMap((item, index) => {
    const isNewSlot = index >= 3;
    if (isNewSlot ? item.show !== true : item.show === false) return [];
    const fallback = isNewSlot
      ? tLocalized("Yeni vaka bilgisini buraya ekleyin.", "Add a new case detail here.")
      : [
          tLocalized("Üst ve alt All-on-Six geçici restorasyon üretimi", "Upper and lower All-on-Six provisional restoration fabrication"),
          tLocalized("Metal bar üzerinde 3D baskılı kompozit köprü yaklaşımı", "3D-printed composite bridge on metal bar framework"),
          tLocalized("Düşük ağırlık, takip edilebilir dijital iş akışı ve klinik adaptasyon odağı", "Low weight, traceable digital workflow, and clinical adaptation focus"),
        ][index];
    const value = localizedReferenceText(item.value, item.valueEn, fallback);
    return value.trim() ? [value] : [];
  });

  return (
    <section id={id} className="three-mash-references" style={referencesRootStyle(props)}>
      <div className="tmref-shell">
        <ThreeMashReferencesCaseStudy
          visible={props.showCaseStudy !== false}
          id={`${id}-content`}
          titleId={`${id}-title`}
          kicker={localizedReferenceText(props.caseKicker, props.caseKickerEn, tLocalized("Klinik başarı hikayesi", "Clinical Success Story"))}
          title={localizedReferenceText(props.caseTitle, props.caseTitleEn, tLocalized("Dr. Barbaros Baran ile All-on-Six geçici restorasyon.", "All-on-Six temporary restoration with Dr. Barbaros Baran."))}
          descriptionHtml={referenceRichHtml(localizedReferenceText(
            props.caseDescription,
            props.caseDescriptionEn,
            tLocalized(
              "CRS Composite Resin ile tamamen dijital olarak üretilen geçici restorasyon; hafif yapı, kontrollü üretim süreci ve klinik adaptasyon odağıyla 3MASH ekosisteminin sahadaki karşılığını gösterir.",
              "The provisional restoration produced entirely digitally with CRS Composite Resin demonstrates the field value of the 3MASH ecosystem through lightweight design, controlled manufacturing, and clinical precision.",
            ),
          ))}
          storyPoints={storyPoints}
          image={referenceImage(props.caseImageUrl, crsCompositeSararmaImage)}
          imageAlt={localizedReferenceText(props.caseImageAlt, props.caseImageAltEn, tLocalized("CRS Composite Resin ile dijital restorasyon çalışması", "Digital restoration study with CRS Composite Resin"))}
          captionTitle={localizedReferenceText(props.caseCaptionTitle, props.caseCaptionTitleEn, tLocalized("CRS Composite Resin", "CRS Composite Resin"))}
          captionText={localizedReferenceText(props.caseCaptionText, props.caseCaptionTextEn, tLocalized("Dijital geçici restorasyon ve klinik takip süreci", "Digital provisional restoration and clinical follow-up"))}
        />
      </div>
    </section>
  );
}

export default ReferanslarSayfasiKlinikVaka;
