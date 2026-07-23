import { legalPages, type LegalPageKey } from '../ThreeMashPageData/sourceData';
import { Props } from './types';

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === 'number' ? value : fallback;
}

function pageKey(mode: string | undefined): LegalPageKey {
  return mode === 'iade' || mode === 'mesafeli' || mode === 'ticari' || mode === 'uyelik' ? mode : 'kvkk';
}

function normalizeContentHtml(key: LegalPageKey, contentHtml: string) {
  if (key !== 'ticari') return contentHtml;
  return contentHtml
    .replace(/^(?:<h2><br><\/h2>\s*)+/i, '')
    .replace(/^<h2>.*?<\/h2>\s*/i, '')
    .replace(/^<p><br>\s*/i, '')
    .trim();
}

function titleText(key: LegalPageKey, value: string | undefined, fallback: string) {
  if (key === 'ticari') return 'TİCARİ ELEKTRONİK İLETİ ONAYI';
  return text(value, fallback);
}

function hasEmbeddedHeading(contentHtml: string) {
  return /<h[1-6][\s>]/i.test(contentHtml.slice(0, 900));
}

export function ThreeMashLegalPage(props: Props) {
  const key = pageKey(props.mode);
  const page = legalPages[key];
  const contentHtml = normalizeContentHtml(key, props.contentHtml?.trim() || page.contentHtml);
  const showStandaloneTitle = !hasEmbeddedHeading(contentHtml);
  const isKvkk = key === 'kvkk';
  const style = {
    '--tmlp-bg': text(props.backgroundColor, '#ffffff'),
    '--tmlp-text': text(props.textColor, '#000000'),
    '--tmlp-muted': text(props.mutedTextColor, '#6d6d6d'),
    '--tmlp-max': String(numberValue(props.maxWidth, key === 'mesafeli' || isKvkk ? 1505 : 1120)) + 'px',
    '--tmlp-pt': String(numberValue(props.paddingTop, key === 'mesafeli' ? 0 : isKvkk ? 16 : 56)) + 'px',
    '--tmlp-pb': String(numberValue(props.paddingBottom, key === 'mesafeli' ? 0 : isKvkk ? 16 : 80)) + 'px',
  } as any;

  return (
    <section className={`three-mash-legal-page is-${key}`} style={style}>
      <article className="tmlp-shell">
        {showStandaloneTitle ? <h1>{titleText(key, props.titleText, page.title)}</h1> : null}
        <div className="tmlp-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </section>
  );
}

export default ThreeMashLegalPage;
