interface Props {
  eyebrowHtml: string;
  titleHtml: string;
  descriptionHtml: string;
  showActions: boolean;
  actionsAriaLabel: string;
  showPrimaryButton: boolean;
  primaryHref: string;
  primaryButtonText: string;
  showSecondaryButton: boolean;
  secondaryHref: string;
  secondaryButtonText: string;
  showProofSummary: boolean;
  proofAriaLabel: string;
  proofEyebrow: string;
  proofTitle: string;
  proofDescription: string;
  proofCategories: string[];
  proofStats: { value: string; label: string }[];
  showTrustLogos: boolean;
  logosAriaLabel: string;
  logos: string[];
}

function ActionLink({
  href,
  children,
  variant,
}: {
  href: string;
  children: string;
  variant: "primary" | "secondary";
}) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      className={`tmref-action tmref-action-${variant}`}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function ThreeMashReferencesLead(props: Props) {
  return (
    <>
      <div className="tmref-hero">
        <div className="tmref-hero-copy">
          <div
            className="tmref-eyebrow"
            dangerouslySetInnerHTML={{ __html: props.eyebrowHtml }}
          />
          <h2 dangerouslySetInnerHTML={{ __html: props.titleHtml }} />
          <p dangerouslySetInnerHTML={{ __html: props.descriptionHtml }} />
          {props.showActions && (
            <div
              className="tmref-actions"
              aria-label={props.actionsAriaLabel}
            >
              {props.showPrimaryButton && (
                <ActionLink href={props.primaryHref} variant="primary">
                  {props.primaryButtonText}
                </ActionLink>
              )}
              {props.showSecondaryButton && (
                <ActionLink href={props.secondaryHref} variant="secondary">
                  {props.secondaryButtonText}
                </ActionLink>
              )}
            </div>
          )}
        </div>
        {props.showProofSummary && (
          <div className="tmref-hero-proof" aria-label={props.proofAriaLabel}>
            <div className="tmref-proof-panel">
              <span>{props.proofEyebrow}</span>
              <strong>{props.proofTitle}</strong>
              <p>{props.proofDescription}</p>
            </div>
            <div className="tmref-proof-categories">
              {props.proofCategories.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="tmref-stat-row">
              {props.proofStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {props.showTrustLogos && (
        <div className="tmref-logo-strip" aria-label={props.logosAriaLabel}>
          {props.logos.map((logo, index) => (
            <div className="tmref-logo-cell" key={index}>
              <img src={logo} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
