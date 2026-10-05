interface WorkflowCard {
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
  descriptionHtml: string;
  cards: WorkflowCard[];
}

export default function ThreeMashReferencesWorkflow({
  visible,
  id = "referanslar-isleyis",
  titleId = "tmref-workflow-title",
  kicker,
  title,
  descriptionHtml,
  cards,
}: Props) {
  if (!visible) return null;

  return (
    <section
      className="tmref-workflow"
      id={id}
      aria-labelledby={titleId}
    >
      <div className="tmref-workflow-copy">
        <div className="tmref-section-kicker">{kicker}</div>
        <h3 id={titleId}>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
      <div className="tmref-workflow-grid">
        {cards.map((item) => (
          <article className="tmref-workflow-card" key={item.title}>
            <div className="tmref-workflow-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <h4>{item.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
          </article>
        ))}
      </div>
    </section>
  );
}
