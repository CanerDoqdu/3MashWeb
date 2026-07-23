import { faqSections } from '../ThreeMashPageData/sourceData';
import { Props } from './types';

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === 'number' ? value : fallback;
}

function propText(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function sectionsFromProps(props: Props) {
  const resin = faqSections[0];
  const printer = faqSections[1];

  return [
    {
      title: propText(props.resinSectionTitle, resin.title),
      questions: resin.questions.map((item, index) => ({
        question: propText((props as any)[`resinQuestion${index + 1}`], item.question),
      })),
    },
    {
      title: propText(props.printerSectionTitle, printer.title),
      questions: printer.questions.map((item, index) => ({
        question: propText((props as any)[`printerQuestion${index + 1}`], item.question),
      })),
    },
  ];
}

export function ThreeMashFaqPage(props: Props) {
  const sections = sectionsFromProps(props);
  const style = {
    '--tmfaq-bg': text(props.backgroundColor, '#ffffff'),
    '--tmfaq-text': text(props.textColor, '#101010'),
    '--tmfaq-muted': text(props.mutedTextColor, '#6f6f6f'),
    '--tmfaq-panel': text(props.panelColor, '#ebebeb'),
    '--tmfaq-line': text(props.lineColor, '#e5e5e5'),
    '--tmfaq-max': String(numberValue(props.maxWidth, 1280)) + 'px',
  } as any;

  return (
    <section className="three-mash-faq-page" style={style}>
      <div className="tmfaq-shell">
        {props.showPageTitle && props.titleText ? <h1>{props.titleText}</h1> : null}
        {sections.map((section, sectionIndex) => (
          <div className="tmfaq-section" key={section.title}>
            <h2>{section.title}</h2>
            <div className="tmfaq-list">
              {section.questions.map((item, itemIndex) => (
                <article className="tmfaq-item" key={`${sectionIndex}-${itemIndex}`}>
                  <div className="tmfaq-row">
                    <span className="tmfaq-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      </svg>
                    </span>
                    <span>{item.question}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThreeMashFaqPage;
