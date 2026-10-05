import { Props } from "./types";
import { isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

function trimmedText(value: unknown, fallback = ""): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return fallback;
  if (isEnglishLocale() && isTurkishText(trimmed)) return fallback;
  return trimmed;
}

function localizedText(value: unknown, englishValue: unknown, turkishFallback: string, englishFallback: string): string {
  const english = isEnglishLocale();
  return trimmedText(english ? englishValue : value, english ? englishFallback : turkishFallback);
}

export function ThreeMashProductStepFlow(props: Props) {
  const index = trimmedText(props.sectionIndex, "07");
  const label = localizedText(props.sectionLabel, props.sectionLabelEn, "DİJİTAL İŞ AKIŞI", "DIGITAL WORKFLOW");
  const titleHtml = trimmedText(
    isEnglishLocale() ? props.titleHtmlEn : props.titleHtml,
    isEnglishLocale()
      ? 'Step-by-step workflow <span class="em">title goes here.</span>'
      : 'Adım adım iş akışı <span class="em">başlığı buraya gelecek.</span>'
  );
  const sideHtml = trimmedText(
    isEnglishLocale() ? props.sideHtmlEn : props.sideHtml,
    isEnglishLocale()
      ? "General description explaining the workflow and production stages goes here."
      : "İş akışı ve üretim süreçlerinin aşamalarını anlatan genel açıklama metni buraya gelecek."
  );

  const steps = [
    {
      num: trimmedText(props.step1Number, "01"),
      title: localizedText(props.step1Title, props.step1TitleEn, "1. Aşama Başlığı", "Stage 1 Title"),
      desc: localizedText(props.step1Description, props.step1DescriptionEn, "İş akışının 1. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 1 goes here."),
      tag: localizedText(props.step1Tag, props.step1TagEn, "TASARIM", "DESIGN"),
      show: props.showStep1 !== false,
    },
    {
      num: trimmedText(props.step2Number, "02"),
      title: localizedText(props.step2Title, props.step2TitleEn, "2. Aşama Başlığı", "Stage 2 Title"),
      desc: localizedText(props.step2Description, props.step2DescriptionEn, "İş akışının 2. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 2 goes here."),
      tag: localizedText(props.step2Tag, props.step2TagEn, "BASKI", "PRINTING"),
      show: props.showStep2 !== false,
    },
    {
      num: trimmedText(props.step3Number, "03"),
      title: localizedText(props.step3Title, props.step3TitleEn, "3. Aşama Başlığı", "Stage 3 Title"),
      desc: localizedText(props.step3Description, props.step3DescriptionEn, "İş akışının 3. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 3 goes here."),
      tag: localizedText(props.step3Tag, props.step3TagEn, "POST-CURE", "POST-CURE"),
      show: props.showStep3 !== false,
    },
    {
      num: trimmedText(props.step4Number, "04"),
      title: localizedText(props.step4Title, props.step4TitleEn, "4. Aşama Başlığı", "Stage 4 Title"),
      desc: localizedText(props.step4Description, props.step4DescriptionEn, "İş akışının 4. adımında yapılan işlemlerin detaylı açıklaması buraya gelecek.", "Detailed description for stage 4 goes here."),
      tag: localizedText(props.step4Tag, props.step4TagEn, "TESLİMAT", "DELIVERY"),
      show: props.showStep4 !== false,
    },
  ];

  const ctaTitle = localizedText(props.ctaTitle, props.ctaTitleEn, "İş Akışınızı Birlikte Optimize Edelim", "Let's Optimize Your Workflow Together");
  const ctaDesc = trimmedText(
    isEnglishLocale() ? props.ctaDescriptionEn : props.ctaDescription,
    isEnglishLocale()
      ? "Bottom description text for those seeking workflow consulting or a quote."
      : "İş akışı ile ilgili danışmanlık veya teklif almak isteyenler için alt açıklama metni."
  );
  const ctaBtnText = localizedText(props.ctaButtonText, props.ctaButtonTextEn, "Ücretsiz Danışmanlık Alın →", "Get Free Consultation →");
  const ctaBtnHref = safeNavigationHref(props.ctaButtonHref, "#");

  return (
    <section className="tm-flow-section">
      <div className="tm-flow-wrap">
        <div className="tm-flow-idx">
          <span className="tm-flow-idx-n">{index}</span>
          <span className="tm-flow-idx-t">{label}</span>
          <span className="tm-flow-idx-ln" />
        </div>

        <div className="tm-flow-head">
          <h2 dangerouslySetInnerHTML={{ __html: sanitizeHtml(titleHtml) }} />
          <p className="tm-flow-side" dangerouslySetInnerHTML={{ __html: sanitizeHtml(sideHtml) }} />
        </div>

        <div className="tm-flow-steps">
          {steps.filter((step) => step.show).map((step, idx) => (
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

        {props.showWorkflowCta !== false ? (
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
        ) : null}
      </div>
    </section>
  );
}

export default ThreeMashProductStepFlow;
