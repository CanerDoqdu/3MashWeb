import { Props } from "./types";

function trimmedText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function ThreeMashProductStepFlow(props: Props) {
  const index = trimmedText(props.sectionIndex, "07");
  const label = trimmedText(props.sectionLabel, "BÖLÜM ETİKETİ");
  const titleHtml = trimmedText(
    props.titleHtml,
    'Adım adım iş akışı <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "İş akışı ve üretim süreçlerinin aşamalarını anlatan genel açıklama metni buraya gelecek."
  );

  const steps = [
    {
      num: trimmedText(props.step1Number, "01"),
      title: trimmedText(props.step1Title, "1. Aşama Başlığı"),
      desc: trimmedText(props.step1Description, "İş akışının 1. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek."),
      tag: trimmedText(props.step1Tag, "1. AŞAMA"),
    },
    {
      num: trimmedText(props.step2Number, "02"),
      title: trimmedText(props.step2Title, "2. Aşama Başlığı"),
      desc: trimmedText(props.step2Description, "İş akışının 2. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek."),
      tag: trimmedText(props.step2Tag, "2. AŞAMA"),
    },
    {
      num: trimmedText(props.step3Number, "03"),
      title: trimmedText(props.step3Title, "3. Aşama Başlığı"),
      desc: trimmedText(props.step3Description, "İş akışının 3. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek."),
      tag: trimmedText(props.step3Tag, "3. AŞAMA"),
    },
    {
      num: trimmedText(props.step4Number, "04"),
      title: trimmedText(props.step4Title, "4. Aşama Başlığı"),
      desc: trimmedText(props.step4Description, "İş akışının 4. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek."),
      tag: trimmedText(props.step4Tag, "4. AŞAMA"),
    },
  ];

  const ctaTitle = trimmedText(props.ctaTitle, "Alt Aksiyon Kartı Başlığı");
  const ctaDesc = trimmedText(
    props.ctaDescription,
    "İş akışı ile ilgili danışmanlık veya teklif almak isteyenler için alt açıklama metni."
  );
  const ctaBtnText = trimmedText(props.ctaButtonText, "Aksiyon Buton Metni →");
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
