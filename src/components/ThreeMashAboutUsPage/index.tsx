import { aboutPage } from '../ThreeMashPageData/sourceData';
import { Props } from './types';

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === 'number' ? value : fallback;
}

function html(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

export function ThreeMashAboutUsPage(props: Props) {
  const blocks = aboutPage.blocks.map((block, index) => ({
    ...block,
    html: html((props as any)[`block${index + 1}Html`], block.html),
    imageUrl: text((props as any)[`block${index + 1}ImageUrl`], block.imageUrl),
    imageAlt: text((props as any)[`block${index + 1}ImageAlt`], block.imageAlt),
  }));
  const values = aboutPage.values.map((value, index) => ({
    ...value,
    title: text((props as any)[`value${index + 1}Title`], value.title),
    subTitle: text((props as any)[`value${index + 1}SubTitle`], value.subTitle),
    imageUrl: text((props as any)[`value${index + 1}ImageUrl`], value.imageUrl),
    imageAlt: text((props as any)[`value${index + 1}ImageAlt`], value.imageAlt),
  }));
  const style = {
    '--tmabout-bg': text(props.backgroundColor, '#ffffff'),
    '--tmabout-text': text(props.textColor, '#2b2b2b'),
    '--tmabout-muted': text(props.mutedTextColor, '#5f5f5f'),
    '--tmabout-panel': text(props.panelColor, '#f7f7f7'),
    '--tmabout-max': String(numberValue(props.maxWidth, 1320)) + 'px',
  } as any;

  return (
    <section className="three-mash-about-page" style={style}>
      <div className="tmabout-shell">
        <div id="0">
          <div className="tmabout-text-view-main tmabout-pt-12 tmabout-pb-12 tmabout-flex tmabout-items-center tmabout-justify-center tmabout-flex-col">
            <div
              className="tmabout-title tmabout-text-center tmabout-unreset"
              dangerouslySetInnerHTML={{ __html: html(props.introTitleHtml, aboutPage.introTitleHtml) }}
            />
            <div
              className="tmabout-content tmabout-unreset tmabout-unreset-reset tmabout-text-view-scroll"
              dangerouslySetInnerHTML={{ __html: html(props.introContentHtml, aboutPage.introContentHtml) }}
            />
          </div>
        </div>

        {blocks.map((block, index) => (
          <div id={String(index + 1)} key={index}>
            <div className="tmabout-image-card-container" style={block.reverse ? { flexDirection: 'row-reverse' } : undefined}>
              <div className="tmabout-card-content">
                <div className="tmabout-title tmabout-unreset tmabout-unreset-reset" dangerouslySetInnerHTML={{ __html: block.html }} />
              </div>
              <div className={block.reverse ? 'tmabout-image-container' : 'tmabout-image-container is-reverse'}>
                <img className="tmabout-image" src={block.imageUrl} alt={block.imageAlt || 'Image'} loading="lazy" />
              </div>
            </div>
          </div>
        ))}

        <div id="3">
          <div className="tmabout-container tmabout-flex tmabout-flex-col tmabout-mx-auto tmabout-relative tmabout-px-4">
            <div>
              <div className="tmabout-flex tmabout-justify-center tmabout-text-center tmabout-flex-col tmabout-mb-10 tmabout-mt-4">
                <h1 className="tmabout-font-bold tmabout-text-2xl">{text(props.valuesTitle, aboutPage.valuesTitle)}</h1>
                <p className="tmabout-font-light tmabout-text-base tmabout-mt-2" />
              </div>
              <div className="tmabout-flex tmabout-w-full tmabout-flex-wrap tmabout-gap-x-6 tmabout-values-grid">
                {values.map((value) => (
                  <div className="tmabout-lb-image-main tmabout-lb-image-only tmabout-relative tmabout-mb-3 tmabout-mx-auto" key={value.title}>
                    {value.imageUrl ? <img className="tmabout-value-image" src={value.imageUrl} alt={value.imageAlt || 'Görsel'} loading="lazy" /> : null}
                    <div className="tmabout-value-text tmabout-flex tmabout-flex-col tmabout-justify-center tmabout-text-center tmabout-lookbook-title-main">
                      <p className="tmabout-font-bold tmabout-mt-4">{value.title}</p>
                      <p className="tmabout-font-light tmabout-text-sm">{value.subTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashAboutUsPage;
