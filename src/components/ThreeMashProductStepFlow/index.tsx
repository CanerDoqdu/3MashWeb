import { Props } from "./types";

function trimmedText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function ThreeMashProductStepFlow(props: Props) {
  const index = trimmedText(props.sectionIndex, "07");
  const label = trimmedText(props.sectionLabel, "DİJİTAL İŞ AKIŞI");
  const titleHtml = trimmedText(
    props.titleHtml,
    '4 adımda hatasız <span class="em">üretim süreci.</span>'
  );
  const sideHtml = trimmedText(
    props.sideHtml,
    "CAD tasarımından son hasta teslimine kadar tam entegre, tekrarlanabilir ve hızlı akış."
  );

  const steps = [
    {
      num: trimmedText(props.step1Number, "01"),
      title: trimmedText(props.step1Title, "1. Adım Başlığı"),
      desc: trimmedText(props.step1Description, "İş akışının 1. aşaması (örn: CAD tarama ve dilimleme hazırlığı)."),
      tag: trimmedText(props.step1Tag, "TASARIM"),
    },
    {
      num: trimmedText(props.step2Number, "02"),
      title: trimmedText(props.step2Title, "2. Adım Başlığı"),
      desc: trimmedText(props.step2Description, "İş akışının 2. aşaması (örn: Yüksek hassasiyetli 3D baskı işlemi)."),
      tag: trimmedText(props.step2Tag, "BASKI"),
    },
    {
      num: trimmedText(props.step3Number, "03"),
      title: trimmedText(props.step3Title, "3. Adım Başlığı"),
      desc: trimmedText(props.step3Description, "İş akışının 3. aşaması (örn: Ultrasonik yıkama ve 360° homojen UV kürleme)."),
      tag: trimmedText(props.step3Tag, "POST-CURE"),
    },
    {
      num: trimmedText(props.step4Number, "04"),
      title: trimmedText(props.step4Title, "4. Adım Başlığı"),
      desc: trimmedText(props.step4Description, "İş akışının 4. aşaması (örn: Polisaj, simantasyon ve hasta teslimi)."),
      tag: trimmedText(props.step4Tag, "TESLİMAT"),
    },
  ];

  const ctaTitle = trimmedText(props.ctaTitle, "İş Akışınızı Birlikte Optimize Edelim");
  const ctaDesc = trimmedText(
    props.ctaDescription,
    "Mevcut klinik ve laboratuvar donanımınızla bu akışı nasıl kurabileceğinizi uzmanlarımıza danışın."
  );
  const ctaBtnText = trimmedText(props.ctaButtonText, "Ücretsiz Danışmanlık Alın →");
  const ctaBtnHref = trimmedText(
    props.ctaButtonHref,
    "https://wa.me/905314326577?text=Dijital%20is%20akisi%20hakkinda%20bilgi%20almak%20istiyorum"
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
