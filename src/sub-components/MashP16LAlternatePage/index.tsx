import referenceMarkup from "./reference-sections";
import { useEffect, useRef } from "preact/hooks";
import { isEnglishLocale } from "../../utils/i18n";
import referenceImages from "../../assets/mashp16l-reference-image-data";

const LOCAL_REFERENCE_IMAGES: Record<string, string> = {
  "1_313957f2-afd3-4a55-b05f-963379ed2909.jpg": referenceImages["mashp16l-media-11.webp"],
  "1200X400_b9cb22f8-d183-416b-8d31-2abaea77558e.jpg": referenceImages["mashp16l-media-01.webp"],
  "4_4f15777c-6886-4fab-b9fa-7469b326f2c0.jpg": referenceImages["mashp16l-media-14.webp"],
  "6_e7c94ae0-e61c-467f-8020-c74849103007.jpg": referenceImages["mashp16l-media-15.webp"],
  "7_d10f48bf-459f-4145-88c2-1e53147cb3f6.jpg": referenceImages["mashp16l-media-16.webp"],
  "8_12072ff8-ab23-4b56-8132-43fc9782ba31.jpg": referenceImages["mashp16l-media-18.webp"],
  "preview_images/af6e767938594e2abcb37c1974eb7229.thumbnail.0000000000_small.jpg":
    referenceImages["mashp16l-media-20.webp"],
  "13_f9b26c9a-2929-4c00-bd73-759728774bf3.png": referenceImages["mashp16l-media-02.webp"],
  "14_9cbc36e9-bbd2-428e-bf8d-6c2df5ed3256.png": referenceImages["mashp16l-media-03.webp"],
  "15_2eae67f6-f5f8-4e44-be77-7273c3b9043e.png": referenceImages["mashp16l-media-04.webp"],
  "16_a65b10ed-bfb8-4ef1-9dcb-f364ed3211db.png": referenceImages["mashp16l-media-05.webp"],
  "17_181ae95e-4760-49f7-a791-579a9a135397.jpg": referenceImages["mashp16l-media-07.webp"],
  "17_1671171a-cfa4-42bf-b1ba-de9c0040cc9f.png": referenceImages["mashp16l-media-06.webp"],
  "18_5357ee5a-b9fa-4e41-aeda-6ac2cb063601.png": referenceImages["mashp16l-media-08.webp"],
  "19.png": referenceImages["mashp16l-media-09.webp"],
  "20.png": referenceImages["mashp16l-media-12.webp"],
  "800x800.jpg": referenceImages["mashp16l-media-10.webp"],
  "eb5e74d7183fac10d8f52fe61222f410.jpg": referenceImages["mashp16l-media-13.webp"],
  "44f40df1f842a490e615564f09ea4772.jpg": referenceImages["mashp16l-media-17.webp"],
  "19_709aebbe-6e46-49aa-bba8-f8e8f5c89cc3.jpg": referenceImages["mashp16l-media-19.webp"],
};

function localizeReferenceImages(markup: string): string {
  return markup.replace(
    /\b(src|poster)="https:\/\/uniformation3d\.com\/cdn\/shop\/files\/([^"?]+)[^"]*"/g,
    (attribute, name: string, fileName: string) => {
      const localImage = LOCAL_REFERENCE_IMAGES[fileName];
      if (!localImage) {
        throw new Error(`No local MASH P16L image found for ${fileName}.`);
      }
      return `${name}="${localImage}"`;
    }
  );
}

const TURKISH_REFERENCE_COPY: Record<string, string> = {
  "385nm Light Source": "385nm Işık Kaynağı",
  "High-Precision": "Yüksek Hassasiyet",
  "Pro-level Light Control for Sharper Results": "Daha Keskin Sonuçlar İçin Profesyonel Düzeyde Işık Kontrolü",
  "The Highlights": "Öne Çıkan Özellikler",
  "385nm UV Light Source": "385nm UV Işık Kaynağı",
  "High-Transmission Screen": "Yüksek Işık Geçirgenliğine Sahip Ekran",
  "Industrial-Grade Ball Screw": "Endüstriyel Sınıf Vidalı Mil",
  "16K Exquisite Details": "16K Kusursuz Detaylar",
  "Smart Auto Heating": "Akıllı Otomatik Isıtma",
  "Live Monitoring &amp; Timelapse": "Canlı İzleme ve Hızlandırılmış Çekim",
  "Auto Resin Feeding System": "Otomatik Reçine Besleme Sistemi",
  "UV Light Source": "UV Işık Kaynağı",
  "Effectively eliminates light scattering and prevents parasitic curing": "Işık saçılımını etkili biçimde ortadan kaldırır ve reçinenin fazla nüfuz etmesinden kaynaklanan istenmeyen kürlenmeyi önler.",
  "caused by resin over-penetration.The result is sharper edges,tighter": "Sonuç olarak daha keskin kenarlar, daha dar",
  "tolerances,and absolute consistency across every print.": "toleranslar ve her baskıda mutlak tutarlılık elde edilir.",
  "16K Studio-grade Precision": "16K Stüdyo Seviyesinde Hassasiyet",
  "Resolution": "Çözünürlük",
  "Pixel Size": "Piksel Boyutu",
  "Light Uniformity": "Işık Düzgünlüğü",
  "Contrast Ratio": "Kontrast Oranı",
  "The intelligent auto-heating system automatically keeps resin at its ideal working temperature, ensuring smooth flow, reliable curing, and consistently exceptional print quality—regardless of the weather.": "Akıllı otomatik ısıtma sistemi, reçineyi ideal çalışma sıcaklığında tutarak akışkanlığı ve güvenilir kürlenmeyi destekler. Hava koşullarından bağımsız olarak her baskıda tutarlı ve yüksek kalite sunar.",
  "Auto Heating": "Otomatik Isıtma",
  "Quick Preheat": "Hızlı Ön Isıtma",
  "Boost Efficiency": "Verimliliği Artırın",
  "Reliable Printing": "Güvenilir Baskı",
  "16K High-Transmission Screen": "16K Yüksek Işık Geçirgenliğine Sahip Ekran",
  "Equipped with a high-transparency, heat-resistant polarizer, the LCD delivers up to": "Yüksek şeffaflığa ve ısı direncine sahip polarizörle donatılan LCD ekran,",
  "12% greater light transmission": "%12'ye kadar daha fazla ışık geçirgenliği sağlar",
  "and operates reliably at temperatures up to": "ve ",
  "100°C": "100°C'ye kadar sıcaklıklarda güvenilir biçimde çalışır",
  ". With": ". Ayrıca standart ekranlara kıyasla ",
  "43% higher heat resistance": "%43 daha yüksek ısı direnciyle",
  "than standard screens, it supports consistent printing performance and a longer service life.": "tutarlı baskı performansı ve daha uzun kullanım ömrü sunar.",
  "Higher Transparency": "Daha Yüksek Şeffaflık",
  "High Heat Resistance": "Yüksek Isı Direnci",
  "Higher Performance": "Daha Yüksek Performans",
  "Longer Lifespan": "Daha Uzun Kullanım Ömrü",
  "Boost Productivity,Designed for Efficiency": "Üretkenliği Artırın, Verimlilik İçin Tasarlandı",
  "90° Rotatable Screen &amp; Hidden Buttons": "90° Döndürülebilir Ekran ve Gizli Düğmeler",
  "Enjoy flexible viewing angles while hidden buttons help prevent accidental touches.": "Gizli düğmeler yanlışlıkla dokunmayı önlerken ekranı farklı açılarda rahatça görüntüleyin.",
  "Resin Drip Hanger": "Reçine Damlatma Askısı",
  "Drain excess resin directly into the vat for a cleaner, more efficient workflow.": "Fazla reçineyi doğrudan hazneye akıtarak daha temiz ve verimli bir iş akışı sağlayın.",
  "Quick-Release Design": "Hızlı Sökülebilir Tasarım",
  "Quick-release design for the build plate and resin vat, fast replacement for a smoother experience.": "Baskı platformu ve reçine haznesindeki hızlı sökme tasarımı, değişimi kolaylaştırarak kullanım deneyimini iyileştirir.",
  "Built-in High-Brightness Lighting": "Dahili Yüksek Parlaklıklı Aydınlatma",
  "Improving Operational Visibility, Enhancing Ease of Use and Monitoring Efficiency": "Çalışma alanını daha görünür kılar; kullanım kolaylığını ve izleme verimliliğini artırır.",
  "Factory Calibration": "Kalibrasyon Yardımı",
  "Only simple check are needed before use upon unboxing.": "Kutudan çıkardıktan sonra kullanıma başlamadan önce yalnızca basit bir kontrol yeterlidir.",
  "Built-in Air Purifier": "Dahili Hava Temizleyici",
  "Large-Size Activated Carbon,Reduces Environmental Pollution": "Geniş hacimli aktif karbon, ortam kirliliğini azaltmaya yardımcı olur.",
};

function localizedImageAltText(markup: string): string {
  return markup.replace(/<img\b[^>]*>/g, (tag) =>
    /\balt="[^"]*"/.test(tag)
      ? tag.replace(/\balt="[^"]*"/, 'alt="MASH P16L"')
      : tag.replace("<img", '<img alt="MASH P16L"')
  );
}

function localizedReferenceMarkup(): string {
  const localizedImages = localizeReferenceImages(referenceMarkup);
  if (isEnglishLocale()) return localizedImageAltText(localizedImages);

  const translatedMarkup = localizedImages
    .replace(/>([^<>]+)</g, (match, text: string) => {
      const key = text.replace(/\s+/g, " ").trim();
      const translation = TURKISH_REFERENCE_COPY[key];
      if (!translation) return match;

      const leadingWhitespace = text.match(/^\s*/)?.[0] ?? "";
      const trailingWhitespace = text.match(/\s*$/)?.[0] ?? "";
      return `>${leadingWhitespace}${translation}${trailingWhitespace}<`;
    })
    .replace('aria-label="Select a slide to show"', 'aria-label="Gösterilecek slaydı seçin"');

  return localizedImageAltText(translatedMarkup);
}

export default function MashP16LAlternatePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sixteenKSection = root.querySelector<HTMLElement>(
      "#shopify-section-template--22081489600729__jxs_hero_video_text_overlay_iUMTeq"
    );
    const sixteenKVideo = sixteenKSection?.querySelector<HTMLVideoElement>(".hero__video-wrapper video");
    if (sixteenKSection && sixteenKVideo) {
      const externalVideoLink = [...sixteenKSection.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')].find(
        (link) => link.href === sixteenKVideo.src
      );
      externalVideoLink?.remove();
    }

    const section = sixteenKSection;
    const spacer = section?.querySelector<HTMLElement>(".pin-spacer");
    const hero = spacer?.querySelector<HTMLElement>("hero-video-text-overlay");
    const wrapper = hero?.querySelector<HTMLElement>(".hero__video-wrapper");
    const heading = hero?.querySelector<HTMLElement>(".hero__video-heading");
    const overlay = hero?.querySelector<SVGSVGElement>(".hero__overlay");
    const overlayText = overlay?.querySelector<SVGTextElement>("mask text");
    const subheading = hero?.querySelector<HTMLElement>(".hero__overlay-subheading");
    const video = hero?.querySelector<HTMLVideoElement>("video");

    if (!section || !spacer || !hero || !wrapper || !heading || !overlay || !overlayText || !subheading || !video) {
      throw new Error("The MASH P16L 16K video section is missing required animation elements.");
    }

    [spacer, hero, wrapper, heading, overlay, subheading].forEach((element) => {
      element.removeAttribute("style");
    });
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.removeAttribute("controls");

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateAnimation = () => {
      frame = 0;
      const shouldAnimate = desktop.matches && !reducedMotion.matches;
      section.classList.toggle("mashp16l-16k-scroll", shouldAnimate);
      video.autoplay = !reducedMotion.matches;

      if (!shouldAnimate) {
        overlayText.removeAttribute("transform");
        overlay.style.opacity = "1";
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const animationDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / animationDistance));
      const scale = 1 + progress * 17;
      overlayText.setAttribute("transform", `translate(50 50) scale(${scale}) translate(-50 -50)`);
      overlay.style.opacity = String(1 - Math.max(0, (progress - 0.88) / 0.12));
    };

    const requestAnimationUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateAnimation);
    };

    updateAnimation();
    window.addEventListener("scroll", requestAnimationUpdate, { passive: true });
    window.addEventListener("resize", requestAnimationUpdate);
    desktop.addEventListener("change", requestAnimationUpdate);
    reducedMotion.addEventListener("change", requestAnimationUpdate);

    return () => {
      window.removeEventListener("scroll", requestAnimationUpdate);
      window.removeEventListener("resize", requestAnimationUpdate);
      desktop.removeEventListener("change", requestAnimationUpdate);
      reducedMotion.removeEventListener("change", requestAnimationUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="mashp16l-reference"
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: localizedReferenceMarkup() }}
    />
  );
}
