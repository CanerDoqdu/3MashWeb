import { Props } from "./types";
import ThreeMashReferencesWorkflow from "../../sub-components/ThreeMashReferencesWorkflow";
import { crsModelBottleImage } from "../../assets/crs-model-data";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import { machineUW02 } from "../../assets/remaining-assets-data";
import { tLocalized } from "../../utils/i18n";
import {
  localizedReferenceText,
  referenceImage,
  referenceRichHtml,
  referencesRootStyle,
} from "../../utils/threeMashReferencesStandalone";

export function ReferanslarSayfasiIsAkisi(props: Props) {
  const id = props.sectionAnchorId?.trim() || "referanslar-isleyis";
  const cardConfigs = [
    {
      title: props.workflow1TitleText,
      titleEn: props.workflow1TitleTextEn,
      description: props.workflow1DescriptionHtml,
      descriptionEn: props.workflow1DescriptionHtmlEn,
      image: props.workflow1ImageUrl,
      fallback: p16lPrimaryImage,
      show: props.showWorkflowCard1,
      titleFallback: tLocalized("Cihaz", "Hardware"),
      descriptionFallback: tLocalized("3D yazıcı, yıkama-kürleme ve tarayıcı seçimi üretim hedefiyle birlikte planlanır.", "3D printer, wash-cure, and scanner selections are planned alongside production goals."),
    },
    {
      title: props.workflow2TitleText,
      titleEn: props.workflow2TitleTextEn,
      description: props.workflow2DescriptionHtml,
      descriptionEn: props.workflow2DescriptionHtmlEn,
      image: props.workflow2ImageUrl,
      fallback: crsModelBottleImage,
      show: props.showWorkflowCard2,
      titleFallback: tLocalized("Malzeme", "Material"),
      descriptionFallback: tLocalized("CRS reçine hattı; model, kompozit, tray ve restoratif uygulamalarda doğru parametreyle çalışır.", "The CRS resin line operates with validated parameters for model, composite, tray, and restorative applications."),
    },
    {
      title: props.workflow3TitleText,
      titleEn: props.workflow3TitleTextEn,
      description: props.workflow3DescriptionHtml,
      descriptionEn: props.workflow3DescriptionHtmlEn,
      image: props.workflow3ImageUrl,
      fallback: machineUW02,
      show: props.showWorkflowCard3,
      titleFallback: tLocalized("Destek", "Support"),
      descriptionFallback: tLocalized("Kurulum, eğitim, reçine uyumlama ve satış sonrası teknik destek aynı ekip tarafından takip edilir.", "Installation, training, resin profiling, and after-sales support are handled by the same team."),
    },
  ];
  const cards = cardConfigs.flatMap((item) => {
    if (item.show === false) return [];
    const image = referenceImage(item.image, item.fallback);
    return image ? [{
      title: localizedReferenceText(item.title, item.titleEn, item.titleFallback),
      descriptionHtml: referenceRichHtml(localizedReferenceText(item.description, item.descriptionEn, item.descriptionFallback)),
      image,
    }] : [];
  });

  if (props.showWorkflowCard4 === true) {
    const image = referenceImage(props.workflow4ImageUrl);
    if (image) {
      cards.push({
        title: localizedReferenceText(props.workflow4TitleText, props.workflow4TitleTextEn, tLocalized("Yeni İş Akışı Adımı", "New Workflow Step")),
        descriptionHtml: referenceRichHtml(localizedReferenceText(
          props.workflow4DescriptionHtml,
          props.workflow4DescriptionHtmlEn,
          tLocalized("Yeni üretim aşamasını açıklayın.", "Describe the new production step."),
        )),
        image,
      });
    }
  }

  return (
    <section id={id} className="three-mash-references" style={referencesRootStyle(props)}>
      <div className="tmref-shell">
        <ThreeMashReferencesWorkflow
          visible={props.showWorkflow !== false && cards.length > 0}
          id={`${id}-content`}
          titleId={`${id}-title`}
          kicker={localizedReferenceText(props.workflowKicker, props.workflowKickerEn, tLocalized("3MASH ile üretim akışı", "Production Workflow with 3MASH"))}
          title={localizedReferenceText(props.workflowTitle, props.workflowTitleEn, tLocalized("Referansların ortak noktası ürün değil, çalışan sistem.", "The common thread of references isn't just a product—a working system."))}
          descriptionHtml={referenceRichHtml(localizedReferenceText(
            props.workflowDescription,
            props.workflowDescriptionEn,
            tLocalized(
              "Başarılı sonuç yalnızca bir cihaz veya tek bir reçineyle oluşmaz. Laboratuvarda tekrarlanabilir kalite için donanım, malzeme, eğitim ve teknik destek birlikte ilerler.",
              "Successful results don't come from a single printer or resin alone. Hardware, materials, training, and support work together for repeatable quality in the lab.",
            ),
          ))}
          cards={cards}
        />
      </div>
    </section>
  );
}

export default ReferanslarSayfasiIsAkisi;
