interface Props {
  visible: boolean;
  id?: string;
  titleId?: string;
  kicker: string;
  title: string;
  descriptionHtml: string;
  storyPoints: string[];
  image: string;
  imageAlt: string;
  captionTitle: string;
  captionText: string;
}

export default function ThreeMashReferencesCaseStudy({
  visible,
  id = "referanslar-vaka",
  titleId = "tmref-case-title",
  kicker,
  title,
  descriptionHtml,
  storyPoints,
  image,
  imageAlt,
  captionTitle,
  captionText,
}: Props) {
  if (!visible) return null;

  return (
    <section
      className="tmref-case"
      id={id}
      aria-labelledby={titleId}
    >
      <div className="tmref-case-copy">
        <div className="tmref-section-kicker">{kicker}</div>
        <h3 id={titleId}>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        {storyPoints.length > 0 && (
          <ul className="tmref-story-list">
            {storyPoints.map((item, index) => (
              <li key={`${index}-${item}`}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="tmref-case-media">
        <img src={image} alt={imageAlt} />
        <div className="tmref-media-caption">
          <strong>{captionTitle}</strong>
          <span>{captionText}</span>
        </div>
      </div>
    </section>
  );
}
