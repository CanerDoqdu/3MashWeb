interface PartnerCard {
  name: string;
  title: string;
  descriptionHtml: string;
  image: string;
}

interface Props {
  visible: boolean;
  id?: string;
  titleId?: string;
  kicker: string;
  title: string;
  cards: PartnerCard[];
}

export default function ThreeMashReferencesPartners({
  visible,
  id,
  titleId = "tmref-partners-title",
  kicker,
  title,
  cards,
}: Props) {
  if (!visible) return null;

  return (
    <section id={id} className="tmref-partners" aria-labelledby={titleId}>
      <div className="tmref-section-heading">
        <div className="tmref-section-kicker">{kicker}</div>
        <h3 id={titleId}>{title}</h3>
      </div>
      <div className="tmref-partner-grid">
        {cards.map((item) => (
          <article className="tmref-partner-card" key={item.name}>
            <div className="tmref-partner-image">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div>
              <span>{item.name}</span>
              <h4>{item.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
