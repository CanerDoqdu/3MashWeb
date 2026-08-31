import { Props } from "./types";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";

function trimmedText(value: unknown, fallback = ""): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return fallback;
  if (isEnglishLocale() && isTurkishText(trimmed)) return fallback;
  return trimmed;
}

export function ThreeMashProductStepFlow(props: Props) {
  const index = trimmedText(props.sectionIndex, "07");
  const label = trimmedText(props.sectionLabel, tLocalized("BÖLÜM ETİKETİ", "SECTION LABEL"));
  const titleHtml = trimmedText(
    props.titleHtml,
    tLocalized('Adım adım iş akışı <span class="em">başlığı buraya gelecek.</span>', 'Step-by-step workflow <span class="em">title goes here.</span>')
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    tLocalized("İş akışı ve üretim süreçlerinin aşamalarını anlatan genel açıklama metni buraya gelecek.", "General description explaining the workflow and production stages goes here."
    )
  );

  const steps = [
    {
      num: trimmedText(props.step1Number, "01"),
      title: trimmedText(props.step1Title, tLocalized("1. Aşama Başlığı", "Stage 1 Title")),
      desc: trimmedText(props.step1Description, tLocalized("İş akışının 1. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 1 goes here.")),
      tag: trimmedText(props.step1Tag, tLocalized("1. AŞAMA", "STAGE 1")),
    },
    {
      num: trimmedText(props.step2Number, "02"),
      title: trimmedText(props.step2Title, tLocalized("2. Aşama Başlığı", "Stage 2 Title")),
      desc: trimmedText(props.step2Description, tLocalized("İş akışının 2. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 2 goes here.")),
      tag: trimmedText(props.step2Tag, tLocalized("2. AŞAMA", "STAGE 2")),
    },
    {
      num: trimmedText(props.step3Number, "03"),
      title: trimmedText(props.step3Title, tLocalized("3. Aşama Başlığı", "Stage 3 Title")),
      desc: trimmedText(props.step3Description, tLocalized("İş akışının 3. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 3 goes here.")),
      tag: trimmedText(props.step3Tag, tLocalized("3. AŞAMA", "STAGE 3")),
    },
    {
      num: trimmedText(props.step4Number, "04"),
      title: trimmedText(props.step4Title, tLocalized("4. Aşama Başlığı", "Stage 4 Title")),
      desc: trimmedText(props.step4Description, tLocalized("İş akışının 4. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 4 goes here.")),
      tag: trimmedText(props.step4Tag, tLocalized("4. AŞAMA", "STAGE 4")),
    },
  ];

  const ctaTitle = trimmedText(props.ctaTitle, tLocalized("Alt Aksiyon Kartı Başlığı", "Bottom Action Card Title"));
  const ctaDesc = trimmedText(
    props.ctaDescription,
    tLocalized("İş akışı ile ilgili danışmanlık veya teklif almak isteyenler için alt açıklama metni.", "Bottom description text for those seeking workflow consulting or a quote."
    )
  );
  const ctaBtnText = trimmedText(props.ctaButtonText, tLocalized("Aksiyon Buton Metni →", "Action Button Text →"));
  const ctaBtnHref = trimmedText(
    props.ctaButtonHref,
    "#"
  );

  return (
    <section className="tm-flow-section">
      <div className="tm-flow-wrap">
        <div className="tm-flow-idx">
          <span className="tm-flow-idx-n">{index}</span>
          <span className="tm-flow-idx-t">{label}</span>
          <span className="tm-flow-idx-ln" />
        </div>

        <div className="tm-flow-head">
          <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="tm-flow-side" dangerouslySetInnerHTML={{ __html: sideHtml }} />
        </div>

        <div className="tm-flow-steps">
          {steps.map((step, idx) => (
            <article className="tm-flow-card" key={idx}>
              <div className="tm-flow-card-top">
                <span className="tm-flow-step-num">{step.num}</span>
                {step.tag ? <span className="tm-flow-step-tag">{step.tag}</span> : null}
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="tm-flow-cta-card">
          <div className="tm-flow-cta-copy">
            <h4>{ctaTitle}</h4>
            <p>{ctaDesc}</p>
          </div>
          {ctaBtnText ? (
            <a className="tm-flow-cta-btn" href={ctaBtnHref} target="_blank" rel="noopener noreferrer">
              {ctaBtnText}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductStepFlow;
