import { featureProd01, featureProd02, featureProd03 } from "../../assets/zay-images";
import { Props } from "./types";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`zay-featured-products__star${filled ? " zay-featured-products__star--filled" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    </svg>
  );
}

function normalizeRating(value?: number) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 0;
  return Math.max(0, Math.min(5, Math.round(rating)));
}

export function ZayFeaturedProducts({
  heading,
  description,
  product1ImageUrl,
  product1ImageAlt,
  product1Href = "/shop-single",
  product1Title,
  product1Price,
  product1Rating,
  product1Description,
  product1ReviewsText,
  product2ImageUrl,
  product2ImageAlt,
  product2Href = "/shop-single",
  product2Title,
  product2Price,
  product2Rating,
  product2Description,
  product2ReviewsText,
  product3ImageUrl,
  product3ImageAlt,
  product3Href = "/shop-single",
  product3Title,
  product3Price,
  product3Rating,
  product3Description,
  product3ReviewsText,
  backgroundColor = "#e9eef5",
  cardBackgroundColor = "#ffffff",
  textColor = "#212934",
  mutedTextColor = "#bcbcbc",
  starColor = "#ede861",
}: Props) {
  const products = [
    {
      image: product1ImageUrl || featureProd01,
      alt: product1ImageAlt,
      href: product1Href,
      title: product1Title,
      price: product1Price,
      rating: product1Rating,
      description: product1Description,
      reviewsText: product1ReviewsText,
    },
    {
      image: product2ImageUrl || featureProd02,
      alt: product2ImageAlt,
      href: product2Href,
      title: product2Title,
      price: product2Price,
      rating: product2Rating,
      description: product2Description,
      reviewsText: product2ReviewsText,
    },
    {
      image: product3ImageUrl || featureProd03,
      alt: product3ImageAlt,
      href: product3Href,
      title: product3Title,
      price: product3Price,
      rating: product3Rating,
      description: product3Description,
      reviewsText: product3ReviewsText,
    },
  ].filter((product) => product.title || product.image);

  const rootStyle = {
    backgroundColor,
    color: textColor,
    "--zay-feature-card-bg": cardBackgroundColor,
    "--zay-feature-muted": mutedTextColor,
    "--zay-feature-star": starColor,
  } as any;

  return (
    <section className="zay-featured-products" style={rootStyle}>
      <div className="zay-featured-products__container">
        <div className="zay-featured-products__intro">
          {heading && <h2 className="zay-featured-products__heading">{heading}</h2>}
          {description && (
            <div className="zay-featured-products__description" dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>

        <div className="zay-featured-products__grid">
          {products.map((product) => {
            const rating = normalizeRating(product.rating);
            return (
              <article className="zay-featured-products__card" key={product.title || product.image}>
                <a className="zay-featured-products__image-link" href={product.href}>
                  <img className="zay-featured-products__image" src={product.image} alt={product.alt} />
                </a>
                <div className="zay-featured-products__body">
                  <div className="zay-featured-products__meta">
                    <div className="zay-featured-products__stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon key={index} filled={index < rating} />
                      ))}
                    </div>
                    {product.price && <span className="zay-featured-products__price">{product.price}</span>}
                  </div>
                  {product.title && (
                    <a className="zay-featured-products__title" href={product.href}>
                      {product.title}
                    </a>
                  )}
                  {product.description && (
                    <div
                      className="zay-featured-products__copy"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                  {product.reviewsText && <p className="zay-featured-products__reviews">{product.reviewsText}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ZayFeaturedProducts;
