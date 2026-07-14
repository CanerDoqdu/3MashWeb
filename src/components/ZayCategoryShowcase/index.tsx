import { categoryImg01, categoryImg02, categoryImg03 } from "../../assets/zay-images";
import { Props } from "./types";

export function ZayCategoryShowcase({
  heading,
  description,
  category1ImageUrl,
  category1ImageAlt,
  category1Title,
  category1Href = "/shop",
  category1ButtonText,
  category2ImageUrl,
  category2ImageAlt,
  category2Title,
  category2Href = "/shop",
  category2ButtonText,
  category3ImageUrl,
  category3ImageAlt,
  category3Title,
  category3Href = "/shop",
  category3ButtonText,
  backgroundColor = "#ffffff",
  textColor = "#212934",
  mutedTextColor = "#525b66",
  buttonBackgroundColor = "#59ab6e",
  buttonTextColor = "#ffffff",
}: Props) {
  const categories = [
    {
      image: category1ImageUrl || categoryImg01,
      alt: category1ImageAlt,
      title: category1Title,
      href: category1Href,
      buttonText: category1ButtonText,
    },
    {
      image: category2ImageUrl || categoryImg02,
      alt: category2ImageAlt,
      title: category2Title,
      href: category2Href,
      buttonText: category2ButtonText,
    },
    {
      image: category3ImageUrl || categoryImg03,
      alt: category3ImageAlt,
      title: category3Title,
      href: category3Href,
      buttonText: category3ButtonText,
    },
  ].filter((category) => category.title || category.image);

  const rootStyle = {
    backgroundColor,
    color: textColor,
    "--zay-category-muted": mutedTextColor,
    "--zay-category-button-bg": buttonBackgroundColor,
    "--zay-category-button-text": buttonTextColor,
  } as any;

  return (
    <section className="zay-category-showcase" style={rootStyle}>
      <div className="zay-category-showcase__container">
        <div className="zay-category-showcase__intro">
          {heading && <h2 className="zay-category-showcase__heading">{heading}</h2>}
          {description && (
            <div className="zay-category-showcase__description" dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </div>

        <div className="zay-category-showcase__grid">
          {categories.map((category) => (
            <article className="zay-category-showcase__card" key={category.title || category.image}>
              <a className="zay-category-showcase__image-link" href={category.href}>
                <img className="zay-category-showcase__image" src={category.image} alt={category.alt} />
              </a>
              {category.title && <h3 className="zay-category-showcase__title">{category.title}</h3>}
              {category.buttonText && (
                <p className="zay-category-showcase__button-row">
                  <a className="zay-category-showcase__button" href={category.href}>
                    {category.buttonText}
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ZayCategoryShowcase;
