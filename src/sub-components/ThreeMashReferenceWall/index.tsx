interface ReferenceEntry {
  type: string;
  quoteHtml: string;
  name: string;
  detailsHtml: string;
  image: string;
  featured: boolean;
}

interface Props {
  visible: boolean;
  ariaLabel: string;
  entries: ReferenceEntry[];
}

export default function ThreeMashReferenceWall({
  visible,
  ariaLabel,
  entries,
}: Props) {
  if (!visible) return null;

  return (
    <section className="tmref-reference-wall" aria-label={ariaLabel}>
      {entries.map((item) => (
        <article
          className={`tmref-testimonial ${item.featured ? "is-featured" : ""}`}
          key={item.name}
        >
          <div className="tmref-card-topline">
            <span>{item.type}</span>
          </div>
          <div className="tmref-quote-mark">“</div>
          <p dangerouslySetInnerHTML={{ __html: item.quoteHtml }} />
          <div
            className={`tmref-person ${item.image ? "has-image" : "has-no-image"}`}
          >
            {item.image ? (
              <img src={item.image} alt={item.name} loading="lazy" />
            ) : (
              <span className="tmref-profile-placeholder" aria-hidden="true" />
            )}
            <div dangerouslySetInnerHTML={{ __html: item.detailsHtml }} />
          </div>
        </article>
      ))}
    </section>
  );
}
