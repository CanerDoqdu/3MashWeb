import { useEffect, useMemo, useState } from "preact/hooks";
import { bannerImg01, bannerImg02, bannerImg03 } from "../../assets/zay-images";
import { Props } from "./types";

function asDelay(value?: number) {
  const delay = Number(value);
  return Number.isFinite(delay) && delay > 999 ? delay : 6000;
}

function asEnabled(value?: boolean) {
  return (value as unknown) !== false && (value as unknown) !== "false";
}

export function ZayHeroCarousel({
  slide1ImageUrl,
  slide1ImageAlt,
  slide1Title,
  slide1Subtitle,
  slide1Description,
  slide2ImageUrl,
  slide2ImageAlt,
  slide2Title,
  slide2Subtitle,
  slide2Description,
  slide3ImageUrl,
  slide3ImageAlt,
  slide3Title,
  slide3Subtitle,
  slide3Description,
  autoPlay = true,
  autoPlayDelay = 6000,
  previousAriaLabel,
  nextAriaLabel,
  backgroundColor = "#efefef",
  textColor = "#212934",
  accentColor = "#59ab6e",
  indicatorColor = "#59ab6e",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () =>
      [
        {
          image: slide1ImageUrl || bannerImg01,
          alt: slide1ImageAlt,
          title: slide1Title,
          subtitle: slide1Subtitle,
          description: slide1Description,
        },
        {
          image: slide2ImageUrl || bannerImg02,
          alt: slide2ImageAlt,
          title: slide2Title,
          subtitle: slide2Subtitle,
          description: slide2Description,
        },
        {
          image: slide3ImageUrl || bannerImg03,
          alt: slide3ImageAlt,
          title: slide3Title,
          subtitle: slide3Subtitle,
          description: slide3Description,
        },
      ].filter((slide) => slide.title || slide.subtitle || slide.description || slide.image),
    [
      slide1Description,
      slide1ImageAlt,
      slide1ImageUrl,
      slide1Subtitle,
      slide1Title,
      slide2Description,
      slide2ImageAlt,
      slide2ImageUrl,
      slide2Subtitle,
      slide2Title,
      slide3Description,
      slide3ImageAlt,
      slide3ImageUrl,
      slide3Subtitle,
      slide3Title,
    ]
  );

  useEffect(() => {
    if (!asEnabled(autoPlay) || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, asDelay(autoPlayDelay));

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayDelay, slides.length]);

  useEffect(() => {
    if (activeIndex > slides.length - 1) setActiveIndex(0);
  }, [activeIndex, slides.length]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex];
  const rootStyle = {
    backgroundColor,
    color: textColor,
    "--zay-hero-accent": accentColor,
    "--zay-hero-indicator": indicatorColor,
  } as any;

  return (
    <section className="zay-hero-carousel" style={rootStyle}>
      <div className="zay-hero-carousel__viewport">
        <div className="zay-hero-carousel__container">
          <div className="zay-hero-carousel__slide">
            <div className="zay-hero-carousel__image-wrap">
              <img className="zay-hero-carousel__image" src={activeSlide.image} alt={activeSlide.alt} />
            </div>

            <div className="zay-hero-carousel__content">
              {activeSlide.title && (
                <h1 className="zay-hero-carousel__title" dangerouslySetInnerHTML={{ __html: activeSlide.title }} />
              )}
              {activeSlide.subtitle && <h2 className="zay-hero-carousel__subtitle">{activeSlide.subtitle}</h2>}
              {activeSlide.description && (
                <div
                  className="zay-hero-carousel__description"
                  dangerouslySetInnerHTML={{ __html: activeSlide.description }}
                />
              )}
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              className="zay-hero-carousel__control zay-hero-carousel__control--prev"
              type="button"
              aria-label={previousAriaLabel}
              onClick={() => setActiveIndex((index) => (index - 1 + slides.length) % slides.length)}
            >
              <span />
            </button>
            <button
              className="zay-hero-carousel__control zay-hero-carousel__control--next"
              type="button"
              aria-label={nextAriaLabel}
              onClick={() => setActiveIndex((index) => (index + 1) % slides.length)}
            >
              <span />
            </button>
            <div className="zay-hero-carousel__indicators">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  className={`zay-hero-carousel__indicator${
                    index === activeIndex ? " zay-hero-carousel__indicator--active" : ""
                  }`}
                  type="button"
                  aria-label={slide.alt}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ZayHeroCarousel;
