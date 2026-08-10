import type { ProductDetailTemplateData, ProductGalleryItem } from "../ThreeMashProductDetailTemplate";
import { useEffect, useMemo, useState } from "preact/hooks";

type PlainObject = Record<string, unknown>;
const SHARED_PRODUCT_DETAIL_EVENT = "three-mash:product-detail-data";

export const CRS_COMPOSITE_SLUG = "crs-composite-mukemmel-dayanimli-gecici-recinesi";
export const CRS_SPLINT_HARD_SLUG = "crs-splint-hard-resin-sert-gece-plagi-recinesi";
export const CRS_SPLINT_SOFT_SLUG = "crs-splint-soft-resin-dental-splint-gece-plak-recinesi";
export const CRS_GUIDE_SLUG = "guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber";
export const CRS_IBT_SLUG = "crs-ibt-resin-ortodontik-ibt-recinesi";
export const CRS_FLEXIT_SLUG = "crs-flexit-recin-protez-recinesi";
export const CRS_ALIGNER_SLUG = "crs-aligner-memory-shape-ozellikli-aligner-recinesi";
export const CRS_DENTURE_SLUG = "crs-denture-biouyumlu-protez-recinesi";
export const CRS_GINGIVA_SLUG = "crs-gingiva-yirtilmaz-dis-eti-recinesi";
export const CRS_MODEL_SLUG = "crs-model-yuksek-hassasiyetli-model-recinesi";
export const CRS_TRAY_SLUG = "crs-tray-resin-olcu-kasigi-3d-yazici-recinesi";
export const MASH_CLEAR_SLUG = "mash-clear-resin-dental-cerrahi-kilavuz-recinesi";
export const CRS_CAST_SLUG = "crs-cast-cekmeyen-dokum-recinesi";
export const MASH_STUDY_SLUG = "mash-study-resin-dental-model-3d-yazici-recinesi";
export const MASH_TRIAL_PINK_SLUG = "mash-trial-pink-resin-dental-try-in-gecici-recinesi";
export const MASH_TRIAL_WHITE_SLUG = "mash-trial-white-resin-gecici-dental-recinesi";
export const CREALITY_HALOT_SKY_LCD_KIT_SLUG = "creality-halot-sky-lcd-ekran-kiti-6k-mono";
export const PIOCREAT_C01_LCD_KIT_SLUG = "piocreat-c01-lcd-ekran-kiti";
export const ACF_FEP_FILM_SLUG = "seffaf-fep-film-3d-yazici";
export const MASH_P16L_MAINBOARD_SLUG = "mash-p16l-ana-kart";
export const MASH_P16L_LARGE_BUILD_PLATE_SLUG = "mash-p16l-buyuk-baski-tablasi-211x118mm";
export const MASH_P16L_SMALL_BUILD_PLATE_SLUG = "mash-p16l-kucuk-hizli-baski-tablasi";
export const MASH_P16L_LCD_SCREEN_SLUG = "mash-p16l-16k-monokrom-lcd-ekran-yedek-parca";
export const MASH_P16L_RESIN_TANK_SLUG = "mash-p16l-recine-tanki-800ml";
export const ARGENZ_ST_MULTILAYER_SLUG = "argenz-st-multilayer-zirkon-blok";
export const ARGENZ_HT_PLUS_SLUG = "argenz-ht-plus-zirkon-blok";
export const ARGENZ_HT_MULTILAYER_SLUG = "argenz-ht-multilayer-zirkon-blok";
export const CREALITY_WASH_CURE_UW03_SLUG = "creality-washcure-uw-02";
export const THREESHAPE_E2_SLUG = "3shape-e2";
export const THREESHAPE_E3_SLUG = "3shape-e3";
export const THREESHAPE_E4_SLUG = "3shape-e4";
export const NABERTHEM_LHT_02_17_LB_SPEED_SLUG = "naberthem-lht-02-17-lb-speed";
export const NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG = "naberthem-lht-01-16-turbo-fire";
export const NABERTHEM_VL_01_12_LB_PRESS_SLUG = "naberthem-vl-01-12-lb-press-firini";
export const NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG = "naberthem-vl-01-12-lb-porselen-firini";
export const MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG = "mesa-grade-5-eli-titanyum-disk";
export const TRASFORMER_COMP_FLOW_SLUG = "trasformer-comp-flow-siringa-kompozit";
export const TRASFORMER_LIGHT_GLASS_SLUG = "trasformer-light-glass-mufla-sistemi";
export const MASH_P16L_PRINTER_SLUG = "mash-p16l-385nm-16k-dental-3d-yazici";
export const MASH_CURIE_M1_DENTAL_SLUG = "mash-curie-m1-dental-3d-yazici";
export const MASH_CURIE_M1_JEWELRY_SLUG = "mash-curie-m1-jewelry-3d-printer";
export const CREALITY_HALOT_SKY_6K_SLUG = "creality-halot-sky-6k";
export const MASH_C1E_UV_CURING_SLUG = "mash-c1e-uv-kurleme-cihazi";
export const MASH_W1E_ULTRASONIC_WASH_SLUG = "mash-w1e-ultrasonik-yikama-cihazi";

const CRS_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/540/composite-resin-ce.webp",
    alt: "CRS Composite CE Class IIa sertifikalı geçici ve daimi reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/540/composite-apps-10.webp",
    alt: "CRS Composite kron uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/540/composite-apps-11.webp",
    alt: "CRS Composite köprü uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/540/composite-apps-12.webp",
    alt: "CRS Composite restorasyon",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/1080/sand-model-gecici-4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/540/sand-model-gecici-4.webp",
    alt: "CRS Composite model üzerinde geçici",
  },
];

const CRS_SPLINT_HARD_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/360/crs-splint-hard-recinesi.webp",
    alt: "CRS Splint Hard Resin sert gece plağı reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/45b5d119-bc08-42a6-8527-86f92b0abda6/1080/crs-splint-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/45b5d119-bc08-42a6-8527-86f92b0abda6/360/crs-splint-recinesi1.webp",
    alt: "CRS Splint Hard gece plağı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cd9ee7ca-ecfa-4453-bbff-ee14aaeea02f/1080/crs-splint-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cd9ee7ca-ecfa-4453-bbff-ee14aaeea02f/360/crs-splint-recinesi2.webp",
    alt: "CRS Splint Hard oklüzal splint üretimi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/664284b2-8376-4ac8-8455-f234ee158aad/1080/crs-splint-recinesi3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/664284b2-8376-4ac8-8455-f234ee158aad/360/crs-splint-recinesi3.webp",
    alt: "CRS Splint Hard bruksizm apareyi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/360/crs-splint-hard-recinesi.webp",
    alt: "CRS Splint Hard Resin ürün görseli",
  },
];

const CRS_SPLINT_SOFT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/360/crs-splint-soft-recinesi.webp",
    alt: "CRS Splint Soft Resin esnek dental splint reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c5552c6e-f346-4dd0-b974-608ccda1fba4/1080/crs-splint-recinesi-soft1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c5552c6e-f346-4dd0-b974-608ccda1fba4/360/crs-splint-recinesi-soft1.webp",
    alt: "CRS Splint Soft gece plağı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5274dd0d-1af2-4832-9eed-de9998160fc5/1080/crs-splint-recinesi-soft2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5274dd0d-1af2-4832-9eed-de9998160fc5/360/crs-splint-recinesi-soft2.webp",
    alt: "CRS Splint Soft dental splint uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/350ca24c-0572-4760-8623-871c5d67d8f9/1080/crs-splint-recinesi-soft3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/350ca24c-0572-4760-8623-871c5d67d8f9/360/crs-splint-recinesi-soft3.webp",
    alt: "CRS Splint Soft bruksizm plağı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/360/crs-splint-soft-recinesi.webp",
    alt: "CRS Splint Soft Resin ürün görseli",
  },
];

const CRS_GUIDE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/360/crs-guide-resin.webp",
    alt: "CRS Guide Resin biyouyumlu cerrahi rehber reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ddecd85-7749-449a-b564-b7ec6dc8e136/1080/crs-guide-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ddecd85-7749-449a-b564-b7ec6dc8e136/360/crs-guide-resin1.webp",
    alt: "CRS Guide Resin cerrahi rehber uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f30c711f-992d-4767-9538-ef47437dbf83/1080/crs-guide-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f30c711f-992d-4767-9538-ef47437dbf83/360/crs-guide-resin2.webp",
    alt: "CRS Guide Resin implant cerrahisi rehberi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8433fe40-ae4c-49ed-84fb-c35dbcd350d6/1080/crs-guide-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8433fe40-ae4c-49ed-84fb-c35dbcd350d6/360/crs-guide-resin3.webp",
    alt: "CRS Guide Resin şeffaf cerrahi kılavuz",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/360/crs-guide-resin.webp",
    alt: "CRS Guide Resin ürün görseli",
  },
];

const CRS_IBT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/1080/crs-ibt-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/360/crs-ibt-resin.webp",
    alt: "CRS IBT Resin ortodontik indirekt bonding tray reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: "CRS IBT Resin indirekt bonding tray uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: "CRS IBT Resin hassas braket aktarımı",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: "CRS IBT Resin ortodontik plak uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: "CRS IBT Resin uygulama görseli",
  },
];

const CRS_FLEXIT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/1080/crs-flexit-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/360/crs-flexit-resin.webp",
    alt: "CRS Flexit Reçinesi esnek protez reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bea34996-12b1-4775-96ca-0bc1880ae03a/1080/crs-flexit-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bea34996-12b1-4775-96ca-0bc1880ae03a/360/crs-flexit-recinesi1.webp",
    alt: "CRS Flexit çıkarılabilir protez uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8ef9e682-529d-4f77-8405-7844cd208187/1080/crs-flexit-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8ef9e682-529d-4f77-8405-7844cd208187/360/crs-flexit-recinesi2.webp",
    alt: "CRS Flexit parsiyel protez uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce2b0ba4-4c6e-47f1-8a27-f3450c1b6b07/1080/crs-flexit-recinesi3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce2b0ba4-4c6e-47f1-8a27-f3450c1b6b07/360/crs-flexit-recinesi3.webp",
    alt: "CRS Flexit doğal diş eti estetiği",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/42ce95b7-fceb-47a0-aad3-042c830d9935/1080/crs-flexit-recinesi4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/42ce95b7-fceb-47a0-aad3-042c830d9935/360/crs-flexit-recinesi4.webp",
    alt: "CRS Flexit esnek protez üretimi",
  },
];

const CRS_ALIGNER_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/360/aligner-resin.webp",
    alt: "CRS Aligner memory shape özellikli ortodontik reçine",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2058639a-539a-4d61-8ce6-52d094b1ea7a/1080/aligner-resin4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2058639a-539a-4d61-8ce6-52d094b1ea7a/360/aligner-resin4.webp",
    alt: "CRS Aligner direkt baskı hizalayıcı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84e0f9fe-d156-43bc-9566-2ebf6996c45e/1080/aligner-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84e0f9fe-d156-43bc-9566-2ebf6996c45e/360/aligner-resin2.webp",
    alt: "CRS Aligner kişiye özel hizalayıcı üretimi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/62e5545b-a757-4ae1-b380-835c267d4b5a/1080/aligner-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/62e5545b-a757-4ae1-b380-835c267d4b5a/360/aligner-resin3.webp",
    alt: "CRS Aligner ortodontik tedavi planlama uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/360/aligner-resin.webp",
    alt: "CRS Aligner ürün görseli",
  },
];

const CRS_DENTURE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/360/denture-resin.webp",
    alt: "CRS Denture biyouyumlu protez tabanı reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/360/3mash.webp",
    alt: "CRS Denture protez tabanı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a30d62a6-69bb-4e14-a216-dcd5eec0978e/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a30d62a6-69bb-4e14-a216-dcd5eec0978e/360/3mash.webp",
    alt: "CRS Denture doğal görünümlü protez uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/360/3mash.webp",
    alt: "CRS Denture protez uyum uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/360/denture-resin.webp",
    alt: "CRS Denture ürün görseli",
  },
];

const CRS_GINGIVA_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/360/gingiva-resin.webp",
    alt: "CRS Gingiva yırtılmaz diş eti reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/1080/composite-apps-18.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/360/composite-apps-18.webp",
    alt: "CRS Gingiva diş eti maskesi uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/09b0295a-71e9-40b7-9620-b79d70c24c2b/1080/composite-apps-19.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/09b0295a-71e9-40b7-9620-b79d70c24c2b/360/composite-apps-19.webp",
    alt: "CRS Gingiva implant modeli yumuşak doku uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/1080/composite-apps-18.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/360/composite-apps-18.webp",
    alt: "CRS Gingiva esnek diş eti model segmenti",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/360/gingiva-resin.webp",
    alt: "CRS Gingiva ürün görseli",
  },
];

const CRS_MODEL_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/360/crs-model-resin.webp",
    alt: "CRS Model yüksek hassasiyetli model reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: "CRS Model hassas dental model uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: "CRS Model ortodontik model uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: "CRS Model mock-up ve wax-up uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/360/crs-model-resin.webp",
    alt: "CRS Model ürün görseli",
  },
];

const CRS_TRAY_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/360/crs-tray-resin.webp",
    alt: "CRS Tray Resin kişiye özel ölçü kaşığı reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/360/crs-tray-recinesi.webp",
    alt: "CRS Tray Resin ölçü kaşığı uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84ae7002-2669-48b0-a7ea-627ca96b1c06/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84ae7002-2669-48b0-a7ea-627ca96b1c06/360/crs-tray-recinesi.webp",
    alt: "CRS Tray Resin implant ölçü uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9bc9c9df-e2bc-4870-afcd-4c120e55faca/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9bc9c9df-e2bc-4870-afcd-4c120e55faca/360/crs-tray-recinesi.webp",
    alt: "CRS Tray Resin kron köprü ölçü uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/360/crs-tray-resin.webp",
    alt: "CRS Tray Resin ürün görseli",
  },
];

const MASH_CLEAR_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/360/mash-clear-resin.webp",
    alt: "Mash Clear Resin şeffaf biyouyumlu cerrahi kılavuz reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/1080/mash-clear-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/360/mash-clear-recinesi1.webp",
    alt: "Mash Clear Resin dental cerrahi kılavuz uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a431f163-6d93-42e2-8609-1d801405d2dd/1080/mash-clear-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a431f163-6d93-42e2-8609-1d801405d2dd/360/mash-clear-recinesi2.webp",
    alt: "Mash Clear Resin şeffaf splint uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/1080/mash-clear-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/360/mash-clear-recinesi1.webp",
    alt: "Mash Clear Resin klinik planlama uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/360/mash-clear-resin.webp",
    alt: "Mash Clear Resin ürün görseli",
  },
];

const CRS_CAST_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/360/cast-resin.webp",
    alt: "CRS Cast çekmeyen döküm reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/360/cast-resin.webp",
    alt: "CRS Cast döküm reçinesi ürün görseli",
  },
];

const MASH_STUDY_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/1080/mash-study-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/360/mash-study-resin.webp",
    alt: "Mash Study ekonomik dental model reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/50984710-37a5-4712-a53f-7d13119f8809/1080/mash-study-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/50984710-37a5-4712-a53f-7d13119f8809/360/mash-study-resin1.webp",
    alt: "Mash Study dental model uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ef3939b-91a9-453d-ae88-8347ea14f421/1080/mash-study-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ef3939b-91a9-453d-ae88-8347ea14f421/360/mash-study-resin2.webp",
    alt: "Mash Study ortodontik model uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3151ba98-0634-4fda-adc2-de453f55217f/1080/mash-study-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3151ba98-0634-4fda-adc2-de453f55217f/360/mash-study-resin3.webp",
    alt: "Mash Study eğitim demonstrasyon modeli",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2e66b63e-0c60-4f6e-9ee1-5ddcfa1989c2/1080/mash-study-resin4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2e66b63e-0c60-4f6e-9ee1-5ddcfa1989c2/360/mash-study-resin4.webp",
    alt: "Mash Study laboratuvar çalışma modeli",
  },
];

const MASH_TRIAL_PINK_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/360/mash-trial-pink.webp",
    alt: "Mash Trial Pink dental geçici try-in reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6afb14a2-78eb-44fd-ae72-ff8dcc354809/1080/mash-trial-pink-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6afb14a2-78eb-44fd-ae72-ff8dcc354809/360/mash-trial-pink-resin1.webp",
    alt: "Mash Trial Pink geçici try-in protez uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8a60d77c-fc3b-47e6-8d44-94de3bdf7863/1080/mash-trial-pink-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8a60d77c-fc3b-47e6-8d44-94de3bdf7863/360/mash-trial-pink-resin2.webp",
    alt: "Mash Trial Pink oklüzyon kapanış kontrolü",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/518fb2c9-e468-4b96-b84f-38ad944652a6/1080/mash-trial-pink-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/518fb2c9-e468-4b96-b84f-38ad944652a6/360/mash-trial-pink-resin3.webp",
    alt: "Mash Trial Pink estetik hasta provası",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/360/mash-trial-pink.webp",
    alt: "Mash Trial Pink ürün görseli",
  },
];

const MASH_TRIAL_WHITE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/360/mash-trial-white.webp",
    alt: "Mash Trial White geçici dental reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/1080/mash-trial-white-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/360/mash-trial-white-recinesi1.webp",
    alt: "Mash Trial White geçici restorasyon provası",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7974c2d9-ca6d-4386-bf80-4a1af3cb785f/1080/mash-trial-white-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7974c2d9-ca6d-4386-bf80-4a1af3cb785f/360/mash-trial-white-recinesi2.webp",
    alt: "Mash Trial White protez uyum kontrolü",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/1080/mash-trial-white-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/360/mash-trial-white-recinesi1.webp",
    alt: "Mash Trial White klinik estetik değerlendirme",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/360/mash-trial-white.webp",
    alt: "Mash Trial White ürün görseli",
  },
];

export const CRS_COMPOSITE_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_COMPOSITE_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CE Class IIa CRS Composite'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Composite",
  },
  hero: {
    kicker: "CRS Composite · Biyouyumlu Kron-Köprü Reçinesi",
    titleHtml: 'Daimi kron artık <span class="em">baskıdan</span> çıkıyor.',
    leadHtml:
      "Geçici ve daimi kuron-köprülerin katmanlı üretimi için biyouyumlu reçine. Sektörde önde gelen rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum sağlar; yarı saydamlık-opaklık arasında dengeli translüsentliğe sahiptir. Ağız koşullarına dayanıklıdır, tat ve koku yapmaz.",
    pills: [
      { value: "144 MPa", label: "eğilme mukavemeti" },
      { value: "5000 MPa", label: "eğilme modülü" },
      { value: "CE", label: "Class IIa" },
      { label: "Sararma yapmaz" },
    ],
    galleryBadge: "CE CLASS IIa",
    gallery: CRS_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Biyouyumlu <span class="hl">geçici ve daimi</span> reçinesi.',
    sideHtml: "CRS Composite, <b>CE Class IIa</b> sertifikalı toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılabilir.",
    panelTitleHtml: "CRS Composite'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Ürünü satın alan kullanıcıların geri bildirimlerine göre.",
    items: [
      { descriptionHtml: "Baskı sonrası kürleme işleminde <b>sararma yapmadığını</b> söyledi", percent: 99 },
      { descriptionHtml: "<b>Yüksek mekanik dayanımı</b> sayesinde kırılmadan uzun süre kullanılabildiğini söyledi", percent: 97 },
      { descriptionHtml: "<b>Şırınga dolgu malzemesiyle yüksek uyum</b> sayesinde hasta ağzında geçici diş üzerinde değişiklik yapabildiğini söyledi", percent: 95 },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Baskı sonrası <span class="em">sararma yapmaz</span>, kalıcıda kullanılır.',
    sideHtml:
      "CRS Composite, kalıcı uygulamada kullanıldığını iddia eden rakip markalara göre daha yüksek dayanım sunar ve kürleme sonrası sararmaz. Değerler ISO 10477 standardına göredir.",
    items: [
      {
        name: "Eğilme Mukavemeti",
        value: "144",
        unit: "MPa",
        tag: "ISO 10477",
        caption: "Kalıcı restorasyon iddiası taşıyan birçok geçici reçinenin üzerinde; kırılmadan uzun süre kullanım.",
      },
      {
        name: "Eğilme Modülü",
        value: "5000",
        unit: "MPa",
        tag: "ISO 10477",
        caption: "Yüksek rijitlik: fonksiyon altında bükülmeye direnç, stabil oklüzyon.",
      },
      {
        name: "Biyouyumluluk",
        value: "CE",
        unit: "Class IIa",
        tag: "MDR",
        caption: "Ağız içinde belirli süre temas eden tıbbi cihaz sınıfı; toksik olmayan formülasyon.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS COMPOSITE · CE CLASS IIa · MDR",
    titleHtml: 'Porselen estetiği, <span class="em">marka bağımsız glaze.</span>',
    descriptionHtml:
      "CE Class IIa sertifikalı, toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılır. Yarı saydamlık ve opaklık arasında mükemmel bir translüsent dengeye sahiptir; marka ve renk ayırt etmeksizin <b>optik glaze</b> yapılabilir. Ağız koşullarına dayanıklıdır, <b>tat ve koku yapmaz.</b>",
    ctaText: "Renk ve boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Eğilme mukavemeti", value: "144 MPa" },
      { label: "Eğilme modülü", value: "5000 MPa" },
      { label: "Sertifikasyon", value: "CE Class IIa (MDR)" },
      { label: "Uygulama", value: "Geçici + daimi" },
      { label: "Uyum", value: "Tüm DLP / LCD" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: uygulama alanları, öne çıkan özellikler ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_GALLERY[1].src, alt: "CRS Composite ile üretilmiş kron restorasyonu", title: "Aynı gün kron", text: "Porselen benzeri güç ve estetik, tek seansta." },
      { src: CRS_GALLERY[2].src, alt: "CRS Composite ile üretilmiş köprü restorasyonu", title: "Köprü restorasyonları", text: "144 MPa dayanım; kırılmadan uzun süre kullanım." },
      { src: CRS_GALLERY[4].src, alt: "Model üzerinde CRS Composite geçici restorasyon", title: "Model üzerinde uyum", text: "Hassas marjinal uyum, net kole hatları." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi restorasyonlar?",
        items: [
          "Porselen benzeri güç ve güzelliğe sahip <b>aynı gün kron ve köprüler</b>",
          "Çok çeşitli <b>kalıcı ve geçici</b> diş restorasyonları",
          "Çıkarılabilir total protezler için <b>vakaya özel</b> tasarlanmış kuron ve köprüler",
        ],
        note: "Vakanıza uygun tasarım parametrelerini ücretsiz paylaşıyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Composite?",
        items: [
          "Yarı saydamlık-opaklık arasında dengeli <b>translüsentlik</b>",
          "Marka ve renk ayırt etmeksizin <b>optik glaze</b>",
          "Ağız koşullarına dayanıklı; <b>tat ve koku yapmaz</b>",
          "<b>CE Class IIa</b> biyouyumlu, toksik olmayan formülasyon",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "Tüm DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions <b>resmi distribütörü</b> olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini <b>ücretsiz</b> gerçekleştiriyoruz. Satış sonrası kullanıcı eğitimleri ve <b>7/24 teknik destek</b> ile yanınızdayız.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Reçine tek başına yeterli değil: <span class="em">kürleme sonucu tamamlar.</span>',
    textHtml:
      "CRS Composite'in 144 MPa dayanımını ve sararmasız rengini ortaya çıkaran şey, doğru <b>post-curing</b> protokolüdür. Reçineyi cihazınızın parametreleriyle birlikte kalibre ederek teslim ediyoruz; akıllı kürleme cihazımız bu protokolü otomatik uygular.",
    chips: ["385 nm optimize baskı", "Doğru post-curing protokolü", "Marka bağımsız kalibrasyon", "7/24 teknik destek"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Kürlemenin önemini gör →", href: "/#kurleme", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Composite hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Klinik ve laboratuvarların CRS Composite için en çok sorduğu sorular, net cevaplarla.",
    openFirst: true,
    items: [
      {
        question: "1 kg CRS Composite reçinesinden kaç üye iş alabiliriz?",
        answerHtml:
          "Bu, restorasyonun boyutuna, duvar kalınlığına ve destek yapılarına göre değişir. Tek bir kron ünitesi ortalama olarak birkaç mililitre reçine tüketir; 1 kg reçineden genellikle <b>yüzlerce üye</b> üretilebilir.",
      },
      {
        question: "CRS Composite reçinesinin kırılma direnci nedir?",
        answerHtml: "CRS Composite, ISO 10477 standardına göre <b>144 MPa eğilme mukavemeti</b> ve <b>5000 MPa eğilme modülü</b> sunar.",
      },
      { question: "CRS Composite hasta ağzında tat veya koku bırakır mı?", answerHtml: "Hayır. CRS Composite <b>ağız koşullarına dayanıklıdır, tat ve koku yapmaz.</b>" },
      {
        question: "Dirençli olması için tavsiye edilen tasarım parametreleri nelerdir?",
        answerHtml:
          "Dayanım için <b>yeterli minimum duvar kalınlığı</b>, köprülerde uygun konnektör kesiti, doğru baskı yönü ve reçineye özel doğru post-curing süresi kritik önemdedir.",
      },
      {
        question: "Klinik uygulamalar için şırınga kompozitler ile uyumlu mudur?",
        answerHtml: "Evet. CRS Composite, <b>şırınga dolgu malzemesiyle yüksek uyum</b> gösterir; hasta ağzında geçici diş üzerinde ekleme ve düzeltme yapılabilir.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Baskıdan ağza: <span class="em">süreci izleyin.</span>',
    sideHtml: "Tasarımdan baskıya, kürlemeden glaze'e; CRS Composite ile tek seans kron-köprü akışının tamamı.",
    href: "https://www.youtube.com/watch?v=IgBVfLPztPg",
    image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/3840/composite-apps-12.webp",
    imageAlt: "CRS Composite uygulama videosu",
    title: "CRS Composite ile tek seans kron-köprü",
    text: "Baskı parametreleri, post-curing protokolü ve optik glaze adımları; uygulamalı anlatım.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "HASSASİYET",
        title: "CRS Model",
        descriptionHtml: "Kron-köprü öncesi master model. Belirgin <b>kole hatları</b>, net marjinal uyum.",
        href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "CE CLASS IIa",
        tagVariant: "ce",
        title: "CRS Denture",
        descriptionHtml: "Çıkarılabilir protez tabanı; PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.",
        href: "/crs-denture-biouyumlu-protez-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "YIRTILMAZ",
        title: "CRS Gingiva",
        descriptionHtml: "İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, doğal diş eti rengi.",
        href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "16 CRS & Mash reçinesini uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Composite'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi vaka, hangi renk? Kısa bir görüşmeyle CRS Composite'i cihazınızın parametreleriyle eşleştirip doğru kürleme protokolüyle birlikte <b>ücretsiz</b> teslim edelim.",
    primaryText: "Renk ve boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_SPLINT_HARD_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_SPLINT_HARD_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Splint Hard Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Splint Hard Resin",
  },
  hero: {
    kicker: "CRS Splint Hard Resin · Sert Gece Plağı Reçinesi",
    titleHtml: 'Sert splint artık <span class="em">dijital baskıdan</span> çıkıyor.',
    leadHtml:
      "CRS Splint Hard Resin, dental uygulamalar için geliştirilmiş sert splint reçinesi olup özellikle gece plağı ve bruksizm apareyleri üretiminde kullanılır. Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskılar uzun süre formunu korur ve deformasyona karşı direnç gösterir.",
    pills: [
      { label: "Sert gece plağı" },
      { label: "Bruksizm apareyleri" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
      { label: "Tat ve koku içermez" },
    ],
    gallery: CRS_SPLINT_HARD_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Splint%20Hard%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Sert splint için <span class="hl">uzun form stabilitesi</span>.',
    sideHtml: "Yüksek dayanıklılık sunan CRS Splint Hard Resin, sert splint reçinesi arayan dental laboratuvarlar ve klinikler için geliştirilmiştir.",
    panelTitleHtml: "CRS Splint Hard Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Dental laboratuvar ve klinikler için öne çıkan kullanım özellikleri.",
    items: [
      { descriptionHtml: "Yüksek sertlik sayesinde üretilen splintlerin uzun süre <b>formunu koruduğu</b> belirtilir." },
      { descriptionHtml: "Yoğun kullanımda <b>deformasyona karşı direnç</b> göstermesi öne çıkar." },
      { descriptionHtml: "Şeffaf yüzey kalitesiyle <b>estetik açıdan başarılı</b> sonuçlar elde edilir." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Gece plağı üretiminde <span class="em">sert ve stabil</span> yapı.',
    sideHtml:
      "CRS Splint Hard Resin; sert splint reçinesi olarak gece plağı ve bruksizm apareylerinde kullanılır, 385–405 nm dalga boyunda çalışan LCD ve DLP yazıcılarla uyumludur.",
    items: [
      {
        name: "Dalga Boyu",
        value: "385",
        unit: "–405 nm",
        tag: "LCD / DLP",
        caption: "385–405 nm aralığındaki LCD ve DLP 3D yazıcılarla uyumlu baskı akışı.",
      },
      {
        name: "Uygulama",
        value: "Sert",
        unit: "Splint",
        tag: "Night Guard",
        caption: "Sert gece plağı ve bruksizm apareyi üretimine odaklanan reçine sınıfı.",
      },
      {
        name: "Konfor",
        value: "Tat",
        unit: "yok",
        tag: "Koku yok",
        caption: "Tat ve koku içermeyen yapı, hasta konforunu artırır.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS SPLINT HARD · SERT GECE PLAĞI · LCD / DLP",
    titleHtml: 'Yoğun kullanımda <span class="em">formunu koruyan splint.</span>',
    descriptionHtml:
      "Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskılar uzun süre formunu korur ve deformasyona karşı direnç gösterir. Özellikle yoğun kullanım gerektiren vakalarda güvenilir sonuçlar elde edilmesini sağlar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Gece plağı + bruksizm apareyi" },
      { label: "Malzeme karakteri", value: "Sert splint reçinesi" },
      { label: "Görünüm", value: "Şeffaf yapı" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
      { label: "Konfor", value: "Tat ve koku içermez" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: sert gece plağı uygulamaları, bruksizm apareyleri ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_SPLINT_HARD_GALLERY[2].src, alt: "CRS Splint Hard gece plağı uygulaması", title: "Sert gece plağı", text: "Night guard üretimleri için şeffaf ve stabil yapı." },
      { src: CRS_SPLINT_HARD_GALLERY[3].src, alt: "CRS Splint Hard splint uygulaması", title: "Bruksizm apareyleri", text: "Yoğun kullanımda formunu korumaya odaklanan sert reçine." },
      { src: CRS_SPLINT_HARD_GALLERY[3].src, alt: "CRS Splint Hard bruksizm apareyi", title: "Bruksizm apareyleri", text: "Mekanik dayanım ve deformasyon direnci gereken vakalar." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi apareyler?",
        items: [
          "Sert <b>gece plağı</b> üretimi",
          "<b>Bruksizm apareyleri</b>",
          "Splint, repositioner, retainer ve ağız koruyucu gibi ortodontik ve dental aygıtlar",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Splint Hard?",
        items: [
          "<b>Yüksek sertlik</b> ve mekanik dayanım",
          "Uzun süre formunu koruyan, <b>deformasyona dirençli</b> yapı",
          "Şeffaf görünüm ile estetik splint üretimi",
          "<b>Tat ve koku içermeyen</b> formülasyon",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS Splint Hard Resin, 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Sert splint sonucu <span class="em">parametreyle tamamlanır.</span>',
    textHtml:
      "Gece plağı ve bruksizm apareylerinde stabil sonuç için reçinenin doğru baskı parametreleri ve post-curing akışıyla çalışması gerekir. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "Sert splint üretimi", "Parametre uyumlaması", "7/24 teknik destek"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Splint Hard hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Sert gece plağı ve bruksizm apareyi üretimi için net kullanım cevapları.",
    openFirst: true,
    items: [
      {
        question: "CRS Splint Hard Resin hangi uygulamalar için kullanılır?",
        answerHtml: "CRS Splint Hard Resin; <b>gece plağı</b>, splint, repositioner, retainer ve ağız koruyucu gibi ortodontik ve dental aygıtların üretimi için geliştirilmiş biyouyumlu bir fotopolimer reçinedir.",
      },
      {
        question: "Hangi 3D yazıcılarla uyumludur?",
        answerHtml: "CRS Splint Hard Resin, <b>385–405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.",
      },
      {
        question: "Baskı öncesinde reçineyi karıştırmak gerekir mi?",
        answerHtml: "Evet. Şişenin dökmeden önce en az <b>1 dakika</b> kuvvetlice çalkalanması gerekir. Pigment çökelmesini yeniden dağıtmak için yumuşak bir spatula ile karıştırılması önerilir.",
      },
      {
        question: "Yoğun kullanımda neden tercih edilir?",
        answerHtml: "Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskıların uzun süre formunu koruması ve deformasyona direnç göstermesi hedeflenir.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Sert splint akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Splint Hard Resin ile sert splint üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_SPLINT_HARD_GALLERY[2].src,
    imageAlt: "CRS Splint Hard Resin uygulama videosu",
    title: "CRS Splint Hard Resin ile gece plağı üretimi",
    text: "Sert splint, bruksizm apareyi ve oklüzal splint üretimi için ürün odaklı video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "ESNEK SPLINT",
        title: "CRS Splint Soft",
        descriptionHtml: "Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.",
        href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "REHBER",
        title: "Guide Resin",
        descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.",
        href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "ORTODONTİ",
        title: "CRS IBT Resin",
        descriptionHtml: "Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.",
        href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Splint Hard'ı cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi splint vakası, hangi post-curing akışı? Kısa bir görüşmeyle CRS Splint Hard Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_SPLINT_SOFT_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_SPLINT_SOFT_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Splint Soft Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Splint Soft Resin",
  },
  hero: {
    kicker: "CRS Splint Soft Resin · Esnek Dental Splint Reçinesi",
    titleHtml: 'Esnek splint artık <span class="em">dijital baskıdan</span> çıkıyor.',
    leadHtml:
      "CRS Splint Soft Resin, ortodontik ve dental kullanım için geliştirilen biyouyumlu bir fotopolimer 3D yazıcı reçinesidir. Esnek yapısı hasta konforunu artırırken, dengeli mekanik dayanımı güvenilir ve stabil kullanım sunar.",
    pills: [
      { label: "Esnek splint" },
      { label: "Gece plağı" },
      { label: "Biyouyumlu" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
    ],
    gallery: CRS_SPLINT_SOFT_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Splint%20Soft%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Esnek yapısıyla <span class="hl">hasta konforunu</span> artırır.',
    sideHtml: "CRS Splint Soft Resin, dental splint ve gece plağı üretiminde esnek yapısı ile öne çıkan biyouyumlu bir 3D yazıcı reçinesidir.",
    panelTitleHtml: "CRS Splint Soft Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Esnek gece plağı ve dental splint üretimi için öne çıkan kullanım özellikleri.",
    items: [
      { descriptionHtml: "Esnek yapısı sayesinde üretilen gece plaklarının ağız içinde <b>daha konforlu</b> olduğu belirtilir." },
      { descriptionHtml: "Hasta adaptasyon sürecini <b>kolaylaştıran</b> kullanım hissi öne çıkar." },
      { descriptionHtml: "Doğru baskı ve kürleme sonrası dental kullanım için <b>dengeli bir yapı</b> sağlar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Gece plağı üretiminde <span class="em">esneklik ve konfor</span>.',
    sideHtml:
      "CRS Splint Soft Resin; dental splint ve gece plağı üretimi için geliştirilmiş biyouyumlu reçinedir. 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.",
    items: [
      {
        name: "Dalga Boyu",
        value: "385",
        unit: "–405 nm",
        tag: "LCD / DLP",
        caption: "385–405 nm aralığındaki LCD ve DLP 3D yazıcılarla uyumlu baskı akışı.",
      },
      {
        name: "Uygulama",
        value: "Esnek",
        unit: "Splint",
        tag: "Night Guard",
        caption: "Dental splint, gece plağı ve bruksizm plakları için esnek reçine sınıfı.",
      },
      {
        name: "Renk",
        value: "Şeffaf",
        unit: "",
        tag: "Transparent",
        caption: "Şeffaf renk seçeneği, estetik dental splint uygulamaları için uygundur.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS SPLINT SOFT · ESNEK SPLINT · LCD / DLP",
    titleHtml: 'Konfor odaklı <span class="em">esnek gece plağı.</span>',
    descriptionHtml:
      "Esnek yapısı, üretilen splintlerin ağız içinde daha iyi uyum sağlamasına ve kullanım sırasında daha konforlu bir deneyim sunmasına yardımcı olur. Dengeli mekanik özellikleri uygun kullanım koşullarında güvenilir performans sağlar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Dental splint + gece plağı" },
      { label: "Malzeme karakteri", value: "Esnek splint reçinesi" },
      { label: "Renk", value: "Şeffaf / transparent" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
      { label: "Kullanım", value: "Ağız içi dental uygulamalar" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: esnek dental splint, gece plağı, ağız koruyucu ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_SPLINT_SOFT_GALLERY[2].src, alt: "CRS Splint Soft dental splint uygulaması", title: "Dental splint", text: "Esnek yapı ile ağız içinde daha iyi uyum." },
      { src: CRS_SPLINT_SOFT_GALLERY[3].src, alt: "CRS Splint Soft bruksizm plağı", title: "Gece plağı", text: "Bruksizm plakları için konfor odaklı kullanım." },
      { src: CRS_SPLINT_SOFT_GALLERY[3].src, alt: "CRS Splint Soft ağız koruyucu uygulaması", title: "Ağız koruyucu", text: "Esnek ve şeffaf yapı ile dental aygıt üretimi." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi aygıtlar?",
        items: [
          "<b>Dental splint</b> ve gece plağı üretimi",
          "Bruksizm tedavilerinde kullanılan plaklar",
          "Ağız koruyucu ve benzeri diş hekimliği ürünleri",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Splint Soft?",
        items: [
          "<b>Esnek yapı</b> ile hasta konforu",
          "Dengeli mekanik özelliklerle güvenilir kullanım",
          "Şeffaf renk seçeneği",
          "<b>Biyouyumlu</b> fotopolimer reçine",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS Splint Soft Resin, 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Esnek splint sonucu <span class="em">parametreyle tamamlanır.</span>',
    textHtml:
      "Esnek gece plağı ve dental splint üretiminde konforlu sonuç için reçinenin doğru baskı, temizlik ve post-curing akışıyla çalışması gerekir. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "Esnek splint üretimi", "IPA temizlik", "UV post-curing"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Splint Soft hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Esnek dental splint ve gece plağı üretimi için net kullanım cevapları.",
    openFirst: true,
    items: [
      {
        question: "CRS Splint Soft Resin ne için kullanılır?",
        answerHtml: "CRS Splint Soft Resin, dental splint ve gece plağı üretimi için geliştirilmiş esnek yapılı bir 3D yazıcı reçinesidir. Özellikle bruksizm tedavilerinde kullanılan plakların üretiminde tercih edilir.",
      },
      {
        question: "Bu reçine ağız içi kullanım için uygun mu?",
        answerHtml: "Evet. CRS Splint Soft Resin, dental uygulamalarda kullanılmak üzere geliştirilmiş <b>biyouyumlu</b> bir reçinedir ve uygun üretim süreçleri sonrası ağız içi kullanıma uygundur.",
      },
      {
        question: "Soft Splint Reçinesi ile Hard Splint reçinesi arasındaki fark nedir?",
        answerHtml: "Soft Splint reçinesi esnek yapıya sahip olup hasta konforunu ön planda tutar. Hard Splint reçinesi ise daha serttir ve mekanik stabilite gerektiren durumlarda tercih edilir.",
      },
      {
        question: "Hangi 3D yazıcılarla uyumludur?",
        answerHtml: "CRS Splint Soft Resin, <b>385–405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.",
      },
      {
        question: "Baskı sonrası temizlik nasıl yapılır?",
        answerHtml: "Baskıdan çıkan parçalar izopropil alkol (IPA) ile temizlenmeli ve ardından kürleme işlemine alınmalıdır.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Esnek splint akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Splint Soft Resin ile dental splint ve gece plağı üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_SPLINT_SOFT_GALLERY[2].src,
    imageAlt: "CRS Splint Soft Resin uygulama videosu",
    title: "CRS Splint Soft Resin ile esnek gece plağı üretimi",
    text: "Esnek dental splint, gece plağı ve bruksizm plağı üretimi için ürün odaklı video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "SERT SPLINT",
        title: "CRS Splint Hard",
        descriptionHtml: "Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.",
        href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "REHBER",
        title: "Guide Resin",
        descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.",
        href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "ORTODONTİ",
        title: "CRS IBT Resin",
        descriptionHtml: "Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.",
        href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Splint Soft'u cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi gece plağı vakası, hangi post-curing akışı? Kısa bir görüşmeyle CRS Splint Soft Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_GUIDE_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_GUIDE_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Guide Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Guide Resin",
  },
  hero: {
    kicker: "CRS Guide Resin · Biyouyumlu Cerrahi Rehber Reçinesi",
    titleHtml: 'Cerrahi rehber artık <span class="em">kontrollü baskıdan</span> çıkıyor.',
    leadHtml:
      "Kılavuz reçinesi, implant cerrahisinde kullanılan cerrahi rehberlerin üretimi için geliştirilmiş biyouyumlu 3D yazıcı reçinesidir. Yüksek hassasiyet, stabil yapı ve DLP/LCD uyumluluğu ile güvenilir cerrahi rehber üretimi sağlar.",
    pills: [
      { label: "Cerrahi rehber" },
      { label: "İmplant cerrahisi" },
      { label: "Biyouyumlu" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
    ],
    gallery: CRS_GUIDE_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Guide%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'İmplant rehberlerinde <span class="hl">hassas yönlendirme</span> sağlar.',
    sideHtml: "CRS Guide Resin, cerrahi rehberlerin implant uygulamalarında güvenilir yönlendirme sağlaması için yüksek ölçü doğruluğu ve stabil yapı sunar.",
    panelTitleHtml: "CRS Guide Resin'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Cerrahi rehber üretiminde ölçü doğruluğu, stabil form ve şeffaf yapı öne çıkar.",
    items: [
      { descriptionHtml: "Yüksek ölçü doğruluğu, implant uygulamalarında <b>güvenilir yönlendirme</b> sağlar." },
      { descriptionHtml: "Mekanik dayanımı sayesinde cerrahi rehberler uygulama sırasında <b>formunu korur</b>." },
      { descriptionHtml: "Şeffaf yapı, işlem sırasında <b>görsel kontrol</b> avantajı sunar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Cerrahi rehber için <span class="em">stabil ve şeffaf</span> yapı.',
    sideHtml:
      "CRS Guide Resin, UV kürleme sonrası intraoral kullanıma uygun hale gelen biyouyumlu cerrahi rehber reçinesidir. 385–405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur.",
    items: [
      {
        name: "Dalga Boyu",
        value: "385",
        unit: "–405 nm",
        tag: "LCD / DLP",
        caption: "385–405 nm aralığındaki DLP ve LCD 3D yazıcılarla uyumlu üretim.",
      },
      {
        name: "Uygulama",
        value: "Cerrahi",
        unit: "Rehber",
        tag: "Guide Resin",
        caption: "İmplant cerrahisinde kullanılan cerrahi rehber üretimi için geliştirilmiş reçine.",
      },
      {
        name: "Biyouyumluluk",
        value: "ISO",
        unit: "10993",
        tag: "Intraoral",
        caption: "Gerekli temizlik ve UV kürleme işlemleri sonrası ağız içi kullanıma uygundur.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS GUIDE · CERRAHİ REHBER · LCD / DLP",
    titleHtml: 'Operasyon sırasında <span class="em">kontrollü yönlendirme.</span>',
    descriptionHtml:
      "Yüksek baskı hassasiyeti ve stabil yapısı sayesinde operasyon sırasında doğru yönlendirme ve kontrollü uygulama imkanı sunar. UV kürleme sonrası optimum performansa ulaşarak intraoral kullanıma uygun hale gelir.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Cerrahi rehber üretimi" },
      { label: "Kullanım", value: "İmplant cerrahisi" },
      { label: "Malzeme karakteri", value: "Şeffaf ve stabil" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
      { label: "Sterilizasyon", value: "Standart otoklav koşulları" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: implant cerrahisi, cerrahi rehber üretimi, şeffaf kontrol ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_GUIDE_GALLERY[1].src, alt: "CRS Guide Resin cerrahi rehber uygulaması", title: "Cerrahi rehber", text: "İmplantın doğru açı ve konumda yerleştirilmesine yardımcı olur." },
      { src: CRS_GUIDE_GALLERY[2].src, alt: "CRS Guide Resin implant kılavuzu", title: "İmplant kılavuzu", text: "Yüksek hassasiyet gerektiren cerrahi planların aktarımı." },
      { src: CRS_GUIDE_GALLERY[3].src, alt: "CRS Guide Resin şeffaf rehber", title: "Şeffaf kontrol", text: "Şeffaf yapı, uygulama sırasında görsel kontrol avantajı sağlar." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi rehberler?",
        items: [
          "İmplant cerrahisinde kullanılan <b>cerrahi rehberler</b>",
          "Doğru açı ve konumlandırma gerektiren kılavuz üretimi",
          "İntraoral kullanıma hazırlanan şeffaf rehberler",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Guide Resin?",
        items: [
          "<b>Yüksek baskı hassasiyeti</b> ve stabil yapı",
          "Şeffaf yapı ile görsel kontrol",
          "Biyouyumlu formülasyon",
          "Uygun koşullarda standart otoklav sterilizasyonuna dayanım",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS Guide Resin, 385–405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Cerrahi rehber sonucu <span class="em">parametreyle tamamlanır.</span>',
    textHtml:
      "Cerrahi rehber üretiminde hassasiyet, reçinenin doğru baskı, temizlik, UV kürleme ve sterilizasyon akışıyla birlikte çalışmasına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "Cerrahi rehber", "IPA temizlik", "UV post-curing", "Otoklav"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Guide Resin hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Cerrahi rehber üretimi, biyouyumluluk, baskı sonrası işlem ve yazıcı uyumu için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS Custom Guide kılavuz reçinesi ne için kullanılır?",
        answerHtml: "Kılavuz reçinesi, implant cerrahisinde kullanılan cerrahi rehberlerin üretimi için kullanılır. Bu rehberler, ameliyat sırasında implantın doğru açı ve konumda yerleştirilmesine yardımcı olur.",
      },
      {
        question: "Baskı sonrası doğrudan kullanılabilir mi?",
        answerHtml: "Hayır. Baskı sonrası IPA ile temizleme ve ardından UV kürleme işlemi uygulanmalıdır.",
      },
      {
        question: "CRS Custom Guide kılavuz reçinesi biyouyumlu mu?",
        answerHtml: "Evet. Ürün biyouyumlu olarak geliştirilmiştir ve <b>ISO 10993</b> standartlarına göre test edilmiştir.",
      },
      {
        question: "Rehber üretiminde neden özel bir reçine kullanılır?",
        answerHtml: "Cerrahi rehberler, implant yerleşiminde yüksek hassasiyet gerektirir. Bu nedenle yüksek mekanik dayanım ve ölçü doğruluğu sunan özel kılavuz reçineleri tercih edilir.",
      },
      {
        question: "Hangi 3D yazıcılarla uyumludur?",
        answerHtml: "385–405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.",
      },
      {
        question: "Ürün intraoral kullanım için uygun mu?",
        answerHtml: "Evet. Baskı sonrası gerekli temizlik ve UV kürleme işlemleri tamamlandığında intraoral kullanım için uygundur.",
      },
      {
        question: "Sterilizasyon yapılabilir mi?",
        answerHtml: "Evet. Ürün, uygun koşullarda standart otoklav sterilizasyonuna dayanıklıdır.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Cerrahi rehber akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Guide Resin ile cerrahi rehber üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_GUIDE_GALLERY[1].src,
    imageAlt: "CRS Guide Resin uygulama videosu",
    title: "CRS Guide Resin ile cerrahi rehber üretimi",
    text: "İmplant cerrahisinde kullanılan cerrahi rehberlerin üretimi için ürün odaklı video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "SERT SPLINT",
        title: "CRS Splint Hard",
        descriptionHtml: "Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.",
        href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "ORTODONTİ",
        title: "CRS IBT Resin",
        descriptionHtml: "Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.",
        href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "PROTEZ",
        title: "CRS Flexit",
        descriptionHtml: "Tam ve parsiyel çıkarılabilir protezler için esnek dental reçine.",
        href: "/crs-flexit-recin-protez-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Guide Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi cerrahi rehber vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS Guide Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_IBT_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_IBT_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS IBT Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS IBT Resin",
  },
  hero: {
    kicker: "CRS IBT Resin · Ortodontik Indirect Bonding Tray Reçinesi",
    titleHtml: 'Braket aktarımı artık <span class="em">tek seferde</span> kontrol altında.',
    leadHtml:
      "CRS IBT Resin, ortodontik tedavilerde IBT üretimi için geliştirilmiş biyouyumlu 3D yazıcı reçinesidir. Hassas konumlandırma, kontrollü esneklik ve kolay uygulama ile dijital planlamanın fiziksel ortama güvenilir şekilde aktarılmasını destekler.",
    pills: [
      { label: "Indirect bonding tray" },
      { label: "Ortodontik braket" },
      { label: "Kontrollü esneklik" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
    ],
    gallery: CRS_IBT_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-ibt-resin-ortodontik-ibt-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20IBT%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Braketleri <span class="hl">planlanan pozisyonda</span> aktarır.',
    sideHtml: "CRS IBT Resin, ortodontik braketlerin dijital planlamaya uygun şekilde tek seferde aktarılmasına destek olan esnek ve stabil bir reçinedir.",
    panelTitleHtml: "CRS IBT Resin'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Ortodontik IBT üretiminde hassas aktarım, kontrollü esneklik ve şeffaf yapı öne çıkar.",
    items: [
      { descriptionHtml: "Braketlerin planlanan pozisyonda <b>tek seferde ve yüksek doğrulukla</b> aktarılmasını destekler." },
      { descriptionHtml: "Kontrollü esnek yapı, IBT plaklarının uygulama sonrası <b>kolay çıkarılmasına</b> yardımcı olur." },
      { descriptionHtml: "Şeffaf yapı, braket ve diş yüzeylerinin uygulama sırasında <b>net görülmesini</b> sağlar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Ortodontik IBT için <span class="em">hassas ve esnek</span> yapı.',
    sideHtml:
      "CRS IBT Resin; ortodontik tedavilerde indirekt bonding tray üretimi için geliştirilmiş biyouyumlu bir 3D yazıcı reçinesidir. 385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur.",
    items: [
      {
        name: "Dalga Boyu",
        value: "385",
        unit: "–405 nm",
        tag: "LCD / DLP",
        caption: "385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumlu üretim.",
      },
      {
        name: "Uygulama",
        value: "IBT",
        unit: "Tray",
        tag: "Ortodonti",
        caption: "Braketlerin dijital planlamaya uygun şekilde aktarılması için indirekt bonding tray üretimi.",
      },
      {
        name: "Yapı",
        value: "Esnek",
        unit: "",
        tag: "Transparent",
        caption: "Kontrollü esneklik ve şeffaf yapı ile klinik kontrolü kolaylaştıran reçine karakteri.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS IBT · ORTODONTİ · LCD / DLP",
    titleHtml: 'Dijital planı <span class="em">braket aktarımına</span> taşır.',
    descriptionHtml:
      "Braketlerin doğru ve hassas şekilde konumlandırılmasını desteklerken, kontrollü esnekliği sayesinde uygulama sırasında kolay kullanım sağlar. Stabil baskı performansı, dijital planlamanın fiziksel ortama güvenilir şekilde aktarılmasına yardımcı olur.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Indirect bonding tray" },
      { label: "Klinik alan", value: "Ortodontik braket aktarımı" },
      { label: "Malzeme karakteri", value: "Kontrollü esnek + şeffaf" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
      { label: "Süreç", value: "IPA temizlik + UV post-curing" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: indirekt bonding tray üretimi, ortodontik braket aktarımı ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_IBT_GALLERY[1].src, alt: "CRS IBT Resin indirekt bonding tray uygulaması", title: "IBT üretimi", text: "Braketlerin dijital plana göre aktarılması için tray üretimi." },
      { src: CRS_IBT_GALLERY[2].src, alt: "CRS IBT Resin braket aktarımı", title: "Braket aktarımı", text: "Hassas konumlandırma gerektiren ortodontik uygulamalar." },
      { src: CRS_IBT_GALLERY[3].src, alt: "CRS IBT Resin şeffaf ortodontik plak", title: "Şeffaf kontrol", text: "Braket ve diş yüzeylerinin net görüldüğü uygulama akışı." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi plaklar?",
        items: [
          "<b>Indirect bonding tray</b> üretimi",
          "Ortodontik braketlerin tek seferde aktarımı",
          "Dijital ortodonti planlarının fiziksel ortama taşınması",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS IBT Resin?",
        items: [
          "<b>Hassas konumlandırma</b> desteği",
          "Kontrollü esneklik ile kolay çıkarma",
          "Şeffaf yapı ile klinik kontrol",
          "Dengeli mekanik yapı ve stabil baskı performansı",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS IBT Resin, 385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'IBT sonucu <span class="em">dijital planla tamamlanır.</span>',
    textHtml:
      "Ortodontik IBT üretiminde doğru sonuç, dijital planlama verisinin hassas baskı, temizlik ve UV kürleme akışıyla birlikte aktarılmasına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "IBT tray üretimi", "Şeffaf kontrol", "IPA temizlik", "UV post-curing"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS IBT Resin hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Ortodontik IBT üretimi, braket aktarımı, temizlik ve yazıcı uyumu için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS IBT Resin ne için kullanılır?",
        answerHtml: "CRS IBT Resin, ortodontik tedavilerde indirekt bonding tray (IBT) üretimi için kullanılır. Braketlerin dijital planlamaya uygun şekilde tek seferde aktarılmasını destekler.",
      },
      {
        question: "IBT (indirekt bonding tray) nedir?",
        answerHtml: "IBT, ortodontik braketlerin önceden planlanan pozisyonlarda tek seferde diş üzerine aktarılmasını sağlayan bir plak sistemidir. Dijital ortodonti süreçlerinde hassas ve hızlı uygulama imkanı sunar.",
      },
      {
        question: "CRS IBT Resin hangi 3D yazıcılarla uyumludur?",
        answerHtml: "CRS IBT Resin, <b>385 nm ve 405 nm</b> dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.",
      },
      {
        question: "Reçinenin esnekliği neden önemlidir?",
        answerHtml: "IBT plaklarının uygulama sonrası kolay çıkarılabilmesi için kontrollü esneklik gereklidir. CRS IBT Resin, bu dengeyi sağlayarak hem stabil hem de pratik kullanım sunar.",
      },
      {
        question: "Şeffaf yapı ne avantaj sağlar?",
        answerHtml: "Şeffaf yapı, uygulama sırasında braket ve diş yüzeylerinin net şekilde görülmesini sağlar. Bu sayede klinik kontrol ve doğrulama daha kolay yapılır.",
      },
      {
        question: "Baskı sonrası temizlik nasıl yapılır?",
        answerHtml: "Baskı sonrası IBT plakları izopropil alkol (IPA) ile temizlenmeli ve ardından uygun UV ışık altında kürleme işlemi uygulanmalıdır.",
      },
      {
        question: "IBT plakları baskı sonrası formunu korur mu?",
        answerHtml: "Evet. CRS IBT Resin, baskı sonrası form stabilitesi sağlayarak uygulama sürecinde deformasyona karşı direnç gösterir.",
      },
      {
        question: "CRS IBT Resin ile üretilen plaklar kolay çıkarılır mı?",
        answerHtml: "Evet. Kontrollü esneklik sayesinde IBT plakları uygulama sonrası diş yüzeyinden kolaylıkla ayrılabilir.",
      },
      {
        question: "Bu reçine dijital ortodonti süreçlerine uygun mu?",
        answerHtml: "Evet. CRS IBT Resin, dijital planlama verilerinin fiziksel ortama doğru şekilde aktarılmasını destekleyen IBT üretimi için uygundur.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'IBT üretim akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS IBT Resin ile ortodontik indirect bonding tray üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_IBT_GALLERY[1].src,
    imageAlt: "CRS IBT Resin uygulama videosu",
    title: "CRS IBT Resin ile ortodontik IBT üretimi",
    text: "Braketlerin hassas aktarımı için indirect bonding tray üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "REHBER",
        title: "Guide Resin",
        descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.",
        href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "SERT SPLINT",
        title: "CRS Splint Hard",
        descriptionHtml: "Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.",
        href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "ESNEK SPLINT",
        title: "CRS Splint Soft",
        descriptionHtml: "Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.",
        href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS IBT Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi ortodontik IBT vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS IBT Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_FLEXIT_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_FLEXIT_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Flexit Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Flexit Reçinesi",
  },
  hero: {
    kicker: "CRS Flexit Reçinesi · Esnek Protez Reçinesi",
    titleHtml: 'Esnek protez artık <span class="em">konforla</span> basılıyor.',
    leadHtml:
      "Esnek protez üretimi için geliştirilen CRS Flexit Reçinesi; dayanıklılık, biyouyumluluk ve doğal estetiği bir arada sunar. Çıkarılabilir tam ve parsiyel protezlerde dayanım ve konfor dengesine odaklanan profesyonel dental 3D yazıcı reçinesidir.",
    pills: [
      { label: "Esnek protez" },
      { label: "Tam / parsiyel protez" },
      { label: "Biyouyumlu" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
    ],
    gallery: CRS_FLEXIT_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-flexit-recin-protez-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Flexit%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Esnek yapısıyla <span class="hl">uyum ve konfor</span> sağlar.',
    sideHtml: "CRS Flexit Reçinesi, çıkarılabilir tam ve parsiyel protezlerde dayanıklılık, doğal estetik ve hasta konforu dengesine odaklanır.",
    panelTitleHtml: "CRS Flexit Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Esnek protez üretiminde konfor, form stabilitesi ve doğal diş eti görünümü öne çıkar.",
    items: [
      { descriptionHtml: "Akıllı elastikiyet özelliği, kullanım sırasında <b>esnek davranış</b> ve konfor sağlar." },
      { descriptionHtml: "Mekanik dayanımı, protezlerin uzun süreli kullanımda <b>formunu korumasına</b> yardımcı olur." },
      { descriptionHtml: "Doğal diş eti görünümünü taklit eden estetik yapı, protez sonuçlarında <b>görsel denge</b> sunar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Hareketli protez için <span class="em">dayanım ve konfor</span> dengesi.',
    sideHtml:
      "CRS Flexit Reçinesi; çıkarılabilir tam ve parsiyel protezlerin üretimi için geliştirilmiş, ışıkla kürlenen esnek dental 3D yazıcı reçinesidir. 385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP sistemlerle uyumludur.",
    items: [
      {
        name: "Dalga Boyu",
        value: "385",
        unit: "–405 nm",
        tag: "LCD / DLP",
        caption: "385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumlu üretim.",
      },
      {
        name: "Uygulama",
        value: "Tam",
        unit: "+ Parsiyel",
        tag: "Protez",
        caption: "Tam ve parsiyel çıkarılabilir protezlerin üretimi ve protez tabanı uygulamaları.",
      },
      {
        name: "Temizlik",
        value: "%98",
        unit: "IPA",
        tag: "Post-process",
        caption: "Baskı sonrası parçalar en az %98 saflıkta izopropil alkol ile temizlenmelidir.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS FLEXIT · ESNEK PROTEZ · LCD / DLP",
    titleHtml: 'Protez tabanında <span class="em">esnek ve stabil</span> sonuç.',
    descriptionHtml:
      "Akıllı elastikiyet özelliği sayesinde ortam koşullarında stabil formunu korurken, kullanım sırasında esnek davranış sergileyerek hasta konforunu artırır. Doğal diş eti görünümünü taklit eden estetik yapısı ve biyouyumlu formülasyonu ile dengeli sonuçlar sunar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Tam + parsiyel protez" },
      { label: "Malzeme karakteri", value: "Esnek dental reçine" },
      { label: "Estetik", value: "Doğal diş eti görünümü" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
      { label: "Süreç", value: "IPA temizlik + UV post-curing" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: tam protez, parsiyel protez, protez tabanı ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_FLEXIT_GALLERY[1].src, alt: "CRS Flexit çıkarılabilir protez uygulaması", title: "Tam protez", text: "Çıkarılabilir tam protez üretimi için esnek yapı." },
      { src: CRS_FLEXIT_GALLERY[2].src, alt: "CRS Flexit parsiyel protez uygulaması", title: "Parsiyel protez", text: "Hareketli parsiyel protez vakalarında dayanım ve konfor dengesi." },
      { src: CRS_FLEXIT_GALLERY[3].src, alt: "CRS Flexit doğal diş eti estetiği", title: "Diş eti estetiği", text: "Doğal diş eti görünümünü taklit eden estetik sonuçlar." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi protezler?",
        items: [
          "<b>Tam ve parsiyel</b> çıkarılabilir protez üretimi",
          "Protez tabanı uygulamaları",
          "Protez tamir ve restorasyon işlemleri",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Flexit?",
        items: [
          "<b>Esneklik ve dayanımı</b> bir arada sunan yapı",
          "Doğal diş eti görünümünü taklit eden estetik",
          "Biyouyumlu formülasyon",
          "Uzun süreli kullanımda form stabilitesi",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS Flexit Reçinesi, 385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Esnek protez sonucu <span class="em">post-curing ile tamamlanır.</span>',
    textHtml:
      "Hareketli protez üretiminde esneklik ve dayanım dengesi, doğru baskı parametresi, IPA temizlik ve UV post-curing akışıyla birlikte korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "Tam protez", "Parsiyel protez", "%98 IPA temizlik", "UV post-curing"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Flexit Reçinesi hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Esnek protez üretimi, temizlik, post-curing, biyouyumluluk ve saklama koşulları için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS Flexit reçinesi ne için kullanılır?",
        answerHtml: "CRS Flexit Reçinesi, tam ve parsiyel çıkarılabilir protezlerin üretimi ve protez tabanı uygulamaları için geliştirilmiştir. Ayrıca protez tamir ve restorasyon işlemlerinde de kullanılabilir.",
      },
      {
        question: "CRS Flexit reçinesi ağız içinde kullanıma uygun mu?",
        answerHtml: "Evet. CRS Flexit Reçinesi, uygun baskı ve post-kürleme işlemleri tamamlandıktan sonra dental uygulamalarda kullanıma uygundur. Tam kürlenmemiş ürünlerin ağız içinde kullanılması önerilmez.",
      },
      {
        question: "CRS Flexit reçinesinin en önemli avantajı nedir?",
        answerHtml: "Esneklik ve dayanımı bir arada sunmasıdır. Kullanım sırasında esnek davranarak protezin ağız içi hareketlere uyum sağlamasına yardımcı olurken, dayanıklı yapısı uzun süreli kullanım performansı sunar.",
      },
      {
        question: "Hangi 3D yazıcılarla uyumludur?",
        answerHtml: "CRS Flexit Reçinesi, <b>385 nm ve 405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumludur.",
      },
      {
        question: "Baskı sonrası temizlik nasıl yapılır?",
        answerHtml: "Baskı sonrası parçalar en az <b>%98</b> saflıkta izopropil alkol (IPA) ile temizlenmelidir. Daha iyi sonuçlar için ön yıkama ve son yıkama önerilir.",
      },
      {
        question: "Post-kürleme neden gereklidir?",
        answerHtml: "Post-kürleme işlemi, malzemenin mekanik dayanımını kazanmasını sağlar ve rezidüel monomer miktarını azaltarak daha güvenli kullanım sunar.",
      },
      {
        question: "CRS Flexit reçinesi biyouyumlu mu?",
        answerHtml: "Evet. Yapılan testlere göre sitotoksisite, irritasyon ve sistemik toksisite açısından toksik değil olarak değerlendirilmiştir.",
      },
      {
        question: "Protezler uzun süre formunu korur mu?",
        answerHtml: "Evet. Malzemenin mekanik dayanımı sayesinde protezler uzun süreli kullanımda formunu koruyacak şekilde tasarlanmıştır.",
      },
      {
        question: "Baskı sırasında nelere dikkat edilmelidir?",
        answerHtml: "Reçine kullanılmadan önce iyice karıştırılmalı, yazıcı temiz olmalı ve reçine içerisinde katı partikül bulunmamalıdır. Bu faktörler baskı kalitesini doğrudan etkiler.",
      },
      {
        question: "Reçine hangi koşullarda saklanmalıdır?",
        answerHtml: "Serin, kuru ve güneş ışığından uzak bir ortamda, orijinal ambalajında saklanmalıdır. Kullanım sonrası kapak sıkıca kapatılmalıdır.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Esnek protez akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Flexit Reçinesi ile tam ve parsiyel protez üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_FLEXIT_GALLERY[1].src,
    imageAlt: "CRS Flexit Reçinesi uygulama videosu",
    title: "CRS Flexit Reçinesi ile esnek protez üretimi",
    text: "Tam ve parsiyel çıkarılabilir protezlerde dayanım ve konfor dengesine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "MODEL",
        title: "CRS Model",
        descriptionHtml: "Dental model üretimi için hassas yüzey ve stabil ölçü reçinesi.",
        href: "/crs-model-recinesi-dental-model-uretimi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "TRAY",
        title: "CRS Tray Resin",
        descriptionHtml: "Kişiye özel ölçü kaşığı üretimi için rijit ve stabil reçine.",
        href: "/crs-tray-resin-kisiye-ozel-olcu-kasigi-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "DENTURE",
        title: "CRS Denture",
        descriptionHtml: "Çıkarılabilir protez tabanı ve PMMA uyumlu protez üretimi.",
        href: "/crs-denture-recinesi-protez-tabani-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Flexit Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi protez vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS Flexit Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_ALIGNER_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_ALIGNER_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Aligner Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Aligner",
  },
  hero: {
    kicker: "CRS Aligner · Memory Shape Ortodontik Reçine",
    titleHtml: 'Hizalayıcı artık <span class="em">direkt baskıdan</span> çıkıyor.',
    leadHtml:
      "CRS Aligner Resin, termoform tabaka tipi hizalayıcıların mevcut sınırlamalarını aşmak için tasarlanmış biyouyumlu bir ortodontik reçinedir. Direkt baskı teknolojisiyle kişiye özel hizalayıcı üretimini destekler; kuvvet, esneklik ve benzersiz memory shape fonksiyonunu bir arada sunar.",
    pills: [
      { label: "Memory shape" },
      { label: "Direkt aligner baskı" },
      { value: "70 MPa", label: "flexural strength" },
      { value: "0.5–1 mm", label: "baskı kalınlığı" },
    ],
    gallery: CRS_ALIGNER_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-aligner-memory-shape-ozellikli-aligner-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Aligner%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Tedavi planını <span class="hl">daha hızlı</span> üretime taşır.',
    sideHtml: "CRS Aligner, direkt baskı hizalayıcı üretiminde işlem adımlarını azaltarak üretim sürecini verimli hale getirmeye odaklanır.",
    panelTitleHtml: "CRS Aligner Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Direkt baskı hizalayıcı üretiminde hız, düşük son işlem ihtiyacı ve daha az manuel işlem öne çıkar.",
    items: [
      { descriptionHtml: "Yaklaşık bir saat içinde toplu baskı alınabildiği ve tedavi sürecinin <b>önemli ölçüde hızlandığı</b> belirtilir." },
      { descriptionHtml: "Dijital modelden doğrudan baskı, yıkama ve kürleme akışıyla <b>minimal son işlem</b> gerektirir." },
      { descriptionHtml: "Daha az adım ve manuel işlem ihtiyacı, üretim sürecindeki <b>iş gücü maliyetini azaltır</b>." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Kuvvetli, esnek ve <span class="em">memory shape</span> karakterli.',
    sideHtml:
      "CRS Aligner, biyouyumlu ortodontik reçine sınıfında direkt hizalayıcı baskısı için geliştirilmiştir. Teknik değerler ISO 20795-2 ve ASTM D638 referanslarıyla listelenir.",
    items: [
      {
        name: "Flexural Strength",
        value: "70",
        unit: "MPa",
        tag: "ISO 20795-2",
        caption: "Direkt hizalayıcı baskısında kuvvet ve esnekliği birlikte hedefleyen mekanik değer.",
      },
      {
        name: "Flexural Modulus",
        value: "2000",
        unit: "MPa",
        tag: "ISO 20795-2",
        caption: "Ortodontik kullanımda form kontrolünü destekleyen elastisite karakteri.",
      },
      {
        name: "Baskı Kalınlığı",
        value: "0.5",
        unit: "–1 mm",
        tag: "Aligner",
        caption: "Direkt baskı kişiye özel hizalayıcı üretimi için belirtilen baskı kalınlığı aralığı.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS ALIGNER · MEMORY SHAPE · ORTODONTİ",
    titleHtml: 'Tabaka termoform yerine <span class="em">direkt hizalayıcı baskısı.</span>',
    descriptionHtml:
      "Ortodontistlerin hizalayıcıların dayanıklılığını ve esnekliğini kontrol etmesine olanak tanır. Benzersiz hafıza şekli fonksiyonu, hastaların daha rahat bir tedavi deneyimi yaşamasını destekler.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Malzeme tipi", value: "Biyouyumlu ortodontik reçine" },
      { label: "Flexural strength", value: "70 MPa" },
      { label: "Flexural modulus", value: "2000 MPa" },
      { label: "Water solubility", value: "0.5 mg/mm³" },
      { label: "Isıya dayanıklılık", value: "100°C altı dezenfeksiyon" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: direkt aligner baskısı, kişiye özel hizalayıcı üretimi ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_ALIGNER_GALLERY[1].src, alt: "CRS Aligner direkt baskı hizalayıcı uygulaması", title: "Direkt aligner", text: "Termoform tabaka yerine kişiye özel hizalayıcı baskısı." },
      { src: CRS_ALIGNER_GALLERY[2].src, alt: "CRS Aligner kişiye özel hizalayıcı üretimi", title: "Kişiye özel üretim", text: "Dijital modelden doğrudan hasta özelinde üretim akışı." },
      { src: CRS_ALIGNER_GALLERY[3].src, alt: "CRS Aligner ortodontik tedavi planlama", title: "Tedavi planlama", text: "Toplu baskı ve daha az manuel işlemle hızlı planlama." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi hizalayıcılar?",
        items: [
          "<b>Direkt baskı</b> kişiye özel hizalayıcılar",
          "Ortodontik tedavi planlamasına bağlı aligner üretimi",
          "Memory shape fonksiyonu gerektiren ortodontik aygıtlar",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Aligner?",
        items: [
          "<b>Kuvvet ve esneklik</b> dengesi",
          "Benzersiz memory shape fonksiyonu",
          "Minimal son işlem akışı",
          "Direkt baskı ile daha az manuel işlem",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Aligner sonucu <span class="em">parametreyle tamamlanır.</span>',
    textHtml:
      "Direkt hizalayıcı üretiminde reçinenin kuvvet, esneklik ve memory shape davranışı doğru baskı, yıkama ve kürleme akışıyla birlikte korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["Memory shape", "Direkt aligner baskı", "Yıkama", "UV post-curing", "100°C altı dezenfeksiyon"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Aligner hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Direkt aligner baskısı, memory shape fonksiyonu, dezenfeksiyon ve teknik değerler için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS Aligner Resin ne için kullanılır?",
        answerHtml: "CRS Aligner Resin, direkt baskı teknolojisi kullanılarak kişiye özel ortodontik hizalayıcıların üretilmesi için kullanılır.",
      },
      {
        question: "CRS Aligner Resin'in hafıza şekli fonksiyonu nedir?",
        answerHtml: "Memory shape fonksiyonu, hizalayıcının kuvvet ve esneklik dengesini koruyarak hastanın daha rahat bir tedavi deneyimi yaşamasını destekleyen malzeme davranışıdır.",
      },
      {
        question: "CRS Aligner Resin'in dezenfeksiyonu nasıl yapılır?",
        answerHtml: "Ürün, <b>100°C altındaki</b> sıcaklıklarda dezenfeksiyona uygun olacak şekilde listelenmiştir.",
      },
      {
        question: "Teknik değerleri nelerdir?",
        answerHtml: "Flexural strength <b>70 MPa</b>, flexural modulus <b>2000 MPa</b>, water solubility <b>0.5 mg/mm³</b> ve baskı kalınlığı <b>0.5–1 mm</b> olarak listelenir.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Aligner üretim akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Aligner Resin ile direkt hizalayıcı üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_ALIGNER_GALLERY[1].src,
    imageAlt: "CRS Aligner Resin uygulama videosu",
    title: "CRS Aligner Resin ile direkt hizalayıcı üretimi",
    text: "Memory shape özellikli ortodontik reçineyle kişiye özel hizalayıcı üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "ORTODONTİ", title: "CRS IBT Resin", descriptionHtml: "Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.", href: "/crs-ibt-resin-ortodontik-ibt-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "DİŞ ETİ", title: "CRS Gingiva", descriptionHtml: "İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Aligner Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi aligner vakası, hangi yıkama ve post-curing akışı? Kısa bir görüşmeyle CRS Aligner Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_DENTURE_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_DENTURE_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Denture Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Denture",
  },
  hero: {
    kicker: "CRS Denture · Biyouyumlu Protez Tabanı Reçinesi",
    titleHtml: 'Protez tabanı artık <span class="em">doğal görünümle</span> basılıyor.',
    leadHtml:
      "CRS Denture Resin, biyouyumlu CE Class IIA sertifikalı, çıkarılabilir protez tabanları için özel olarak geliştirilmiş bir reçinedir. Doğal şeffaflık, dayanıklılık ve uzun ömür sunar; mekanik cilalama ve optik glaze işlemleri ile uyumludur.",
    pills: [
      { value: "145 MPa", label: "eğilme mukavemeti" },
      { value: "3547 MPa", label: "eğilme modülü" },
      { value: "80", label: "Shore D" },
      { label: "CE Class IIA" },
    ],
    gallery: CRS_DENTURE_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-denture-biouyumlu-protez-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Denture%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Düşük çekme oranıyla <span class="hl">mükemmel uyum</span> sağlar.',
    sideHtml: "CRS Denture, standart PMMA protez taban malzemelerine kıyasla düşük çekme oranı ve doğal şeffaflıkla protez tabanlarında uyumlu sonuç hedefler.",
    panelTitleHtml: "CRS Denture Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Protez tabanı üretiminde uyum, doğal görünüm ve kolay işlenebilirlik öne çıkar.",
    items: [
      { descriptionHtml: "Protez tabanlarının düşük çekme oranı sayesinde <b>mükemmel uyum</b> sağladığı belirtilir." },
      { descriptionHtml: "Dayanıklılığı ve doğal şeffaflığı sayesinde protezlerin <b>doğal göründüğü</b> ifade edilir." },
      { descriptionHtml: "Mekanik cilalama ve optik glaze işlemleriyle <b>kolay çalışılabildiği</b> belirtilir." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Protez tabanında <span class="em">dayanım ve doğal şeffaflık</span>.',
    sideHtml:
      "CRS Denture Reçinesi; çıkarılabilir protez tabanları için geliştirilmiş, biyouyumlu CE Class IIA sertifikalı protez reçinesidir. Teknik değerler ISO 20795 ve ASTM standartlarıyla listelenir.",
    items: [
      { name: "Eğilme Mukavemeti", value: "145", unit: "MPa", tag: "ISO 20795", caption: "Protez tabanında fonksiyonel dayanımı destekleyen eğilme mukavemeti değeri." },
      { name: "Eğilme Modülü", value: "3547", unit: "MPa", tag: "ISO 20795", caption: "Protez tabanının stabil kullanımına katkı sağlayan eğilme modülü değeri." },
      { name: "Sertlik", value: "80", unit: "Shore D", tag: "ASTM D2240", caption: "Uzun ömürlü protez tabanı üretimi için listelenen yüzey sertliği." },
    ],
  },
  specHighlight: {
    tag: "CRS DENTURE · CE CLASS IIA · PROTEZ TABANI",
    titleHtml: 'Düşük çekme oranıyla <span class="em">uyumlu protez tabanı.</span>',
    descriptionHtml:
      "Standart PMMA protez taban malzemelerine kıyasla düşük çekme oranına sahiptir. Doğal şeffaflık ve dayanıklılık ile uzun ömürlü, doğal görünümlü protezler üretmeyi destekler.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Çekme dayanımı", value: "30 MPa" },
      { label: "Esneklik modülü", value: "1287 MPa" },
      { label: "Kopma uzaması", value: "22 MPa" },
      { label: "Eğilme mukavemeti", value: "145 MPa" },
      { label: "Biyouyumluluk", value: "ISO 10993 - toksik değil" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: çıkarılabilir protez tabanı, doğal şeffaflık, cilalama/glaze uyumu ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_DENTURE_GALLERY[1].src, alt: "CRS Denture protez tabanı uygulaması", title: "Protez tabanı", text: "Çıkarılabilir protez tabanları için özel olarak geliştirilmiş reçine." },
      { src: CRS_DENTURE_GALLERY[2].src, alt: "CRS Denture doğal görünümlü protez", title: "Doğal görünüm", text: "Doğal şeffaflık ve dayanıklılıkla uzun ömürlü sonuçlar." },
      { src: CRS_DENTURE_GALLERY[3].src, alt: "CRS Denture düşük çekme uyumu", title: "Düşük çekme", text: "Standart PMMA malzemelere göre daha az çekme ile uyumlu taban." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi protezler?",
        items: [
          "<b>Çıkarılabilir protez tabanları</b>",
          "Akrilik dişlerle çalışan protez üretimi",
          "Mekanik cilalama ve optik glaze gerektiren protezler",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Denture?",
        items: [
          "<b>Düşük çekme oranı</b> ile mükemmel uyum",
          "Doğal şeffaflık ve dayanıklılık",
          "Mekanik cilalama ve optik glaze uyumu",
          "CE Class IIA biyouyumlu formülasyon",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Protez sonucu <span class="em">cilalama ve glaze ile tamamlanır.</span>',
    textHtml:
      "CRS Denture protez tabanında düşük çekme, doğal şeffaflık ve dayanıklılık; doğru baskı, temizlik, post-curing, mekanik cilalama ve optik glaze akışıyla birlikte görünür hale gelir.",
    chips: ["CE Class IIA", "Düşük çekme", "Mekanik cilalama", "Optik glaze", "ISO 10993"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Denture hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Protez tabanı üretimi, akrilik diş uyumu, cilalama ve teknik değerler için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS Denture Reçinesi ne için kullanılır?",
        answerHtml: "CRS Denture Reçinesi, çıkarılabilir protez tabanlarının üretimi için özel olarak geliştirilmiş biyouyumlu protez reçinesidir.",
      },
      {
        question: "Denture reçinesi akrilik dişlerle uyumlu mudur?",
        answerHtml: "Evet. Protez tabanı üretiminde kullanılan akrilik dişlerle çalışmaya uygun bir protez reçinesi olarak konumlandırılır.",
      },
      {
        question: "Hangi cila işlemleriyle uyumludur?",
        answerHtml: "Hem mekanik cilalama hem de optik glaze işlemleri ile uyumludur; marka fark etmeksizin tüm cila ürünleriyle çalışmaya olanak tanır.",
      },
      {
        question: "Biyouyumluluk testleri nasıldır?",
        answerHtml: "ISO 10993 kapsamında sitotoksisite, duyarlılık, irritasyon, sistemik toksisite, implantasyon ve genotoksisite başlıklarında toksik değil olarak listelenir.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Protez tabanı akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Denture Reçinesi ile protez tabanı üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=HqZ1a5tra4c",
    image: CRS_DENTURE_GALLERY[1].src,
    imageAlt: "CRS Denture Reçinesi uygulama videosu",
    title: "CRS Denture Reçinesi ile protez tabanı üretimi",
    text: "Biyouyumlu protez tabanı reçinesiyle düşük çekme ve doğal görünüm odaklı üretim videosu.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "ESNEK PROTEZ", title: "CRS Flexit", descriptionHtml: "Tam ve parsiyel çıkarılabilir protezler için esnek dental reçine.", href: "/crs-flexit-recin-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "DİŞ ETİ", title: "CRS Gingiva", descriptionHtml: "İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Denture Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi protez tabanı vakası, hangi cilalama veya glaze akışı? Kısa bir görüşmeyle CRS Denture Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_GINGIVA_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_GINGIVA_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Gingiva Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Gingiva",
  },
  hero: {
    kicker: "CRS Gingiva · Yırtılmaz Diş Eti Reçinesi",
    titleHtml: 'Diş eti maskesi artık <span class="em">doğal hissiyatla</span> basılıyor.',
    leadHtml:
      "CRS Gingiva Reçinesi, diş etini birebir taklit eden, elastik ve yüksek yırtılma direncine sahip bir reçinedir. İmplant modelleri üzerinde diş eti maskesi gibi esneklik gerektiren model segmentlerinin yazdırılmasını mümkün kılar.",
    pills: [
      { label: "Yırtılmaz yapı" },
      { label: "Elastik diş eti" },
      { label: "Boyutsal stabilite" },
      { label: "Doğal diş eti rengi" },
    ],
    gallery: CRS_GINGIVA_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Gingiva%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Doğal diş etine <span class="hl">çok yakın</span> görünüm verir.',
    sideHtml: "CRS Gingiva, implant modellerinde yumuşak doku ve diş eti maskesi üretimi için esnek, yırtılmaz ve boyutsal olarak stabil bir baskı malzemesidir.",
    panelTitleHtml: "CRS Gingiva Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Diş eti maskesi ve yumuşak doku segmentlerinde yırtılmazlık, düşük çekme ve doğal hissiyat öne çıkar.",
    items: [
      { descriptionHtml: "Yırtılmazlık özelliği sayesinde <b>uyum çalışmasının kolayca yapılabildiği</b> belirtilir." },
      { descriptionHtml: "Düşük çekme oranı sayesinde baskı sonrası <b>boyutun değişmediği</b> ifade edilir." },
      { descriptionHtml: "Esneklik özelliği sayesinde doğal diş etine <b>çok benzeyen</b> sonuçlar alınır." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Esnek, yırtılmaz ve <span class="em">boyutsal olarak stabil</span>.',
    sideHtml:
      "CRS Gingiva Reçinesi; implant modelleri için yumuşak doku ve diş eti maskesi üretiminde kullanılan elastik diş eti reçinesidir. Teknik başlıklarda ASTM D638 ve ISO 10139-2 referansları yer alır.",
    items: [
      { name: "Çekme Dayanımı", value: "ASTM", unit: "D638", tag: "Gingiva", caption: "Yırtılmaz diş eti maskesi ve uyum çalışmaları için listelenen teknik başlık." },
      { name: "Kopma Uzaması", value: "ASTM", unit: "D638", tag: "Elastik", caption: "Esnek yumuşak doku segmentlerinde kopma davranışını tanımlayan teknik başlık." },
      { name: "Shore A Değeri", value: "ISO", unit: "10139-2", tag: "Soft tissue", caption: "Doğal diş eti hissiyatına yakın elastik karakter için listelenen standart başlığı." },
    ],
  },
  specHighlight: {
    tag: "CRS GINGIVA · YIRTILMAZ · DİŞ ETİ MASKESİ",
    titleHtml: 'İmplant modellerinde <span class="em">esnek yumuşak doku.</span>',
    descriptionHtml:
      "Renk, doku ve hissiyat olarak doğal diş etine çok benzeyen baskılar almanızı sağlar. Baskı sırasında boyutsal stabiliteye sahiptir ve baskı işlemi tamamlandıktan sonra lekesizdir.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "İmplant modeli yumuşak doku" },
      { label: "Uygulama", value: "Diş eti maskesi" },
      { label: "Malzeme karakteri", value: "Elastik + yırtılmaz" },
      { label: "Stabilite", value: "Baskı sonrası boyut değiştirmez" },
      { label: "Görünüm", value: "Doğal diş eti rengi" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: implant modelleri, diş eti maskeleri, esnek yumuşak doku segmentleri ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_GINGIVA_GALLERY[1].src, alt: "CRS Gingiva diş eti maskesi uygulaması", title: "Diş eti maskesi", text: "Modelin esneklik gerektiren diş eti segmentleri için." },
      { src: CRS_GINGIVA_GALLERY[2].src, alt: "CRS Gingiva implant modeli yumuşak doku", title: "İmplant modeli", text: "İmplant modelleri için yumuşak doku uygulamaları." },
      { src: CRS_GINGIVA_GALLERY[3].src, alt: "CRS Gingiva esnek diş eti segmenti", title: "Uyum çalışması", text: "Yırtılmaz ve elastik yapı ile kolay uyum çalışması." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi segmentler?",
        items: [
          "<b>İmplant modelleri</b> için yumuşak doku",
          "Diş eti maskeleri",
          "Esneklik gerektiren model parçaları",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Gingiva?",
        items: [
          "<b>Yüksek yırtılma direnci</b>",
          "Doğal diş eti rengi, doku ve hissiyat",
          "Baskı sonrası boyutsal stabilite",
          "Elastik yapı ile kolay uyum çalışması",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Gingiva sonucu <span class="em">model doğruluğuyla tamamlanır.</span>',
    textHtml:
      "Diş eti maskesinde gerçekçi görünüm ve uyum çalışması, reçinenin elastik davranışı kadar model baskısının doğruluğuna ve doğru post-process akışına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["Diş eti maskesi", "Yumuşak doku", "Yırtılmaz yapı", "Boyutsal stabilite", "Doğal renk"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Gingiva hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Diş eti maskesi, implant modeli yumuşak doku ve elastik malzeme davranışı için net cevaplar.",
    openFirst: true,
    items: [
      {
        question: "CRS Gingiva Reçinesi ne için kullanılır?",
        answerHtml: "CRS Gingiva Reçinesi, implant modelleri için yumuşak doku ve diş eti maskesi üretiminde kullanılır.",
      },
      {
        question: "Doğal diş etine benzer mi?",
        answerHtml: "Evet. Renk, doku ve hissiyat olarak doğal diş etine çok benzeyen baskılar almak için geliştirilmiştir.",
      },
      {
        question: "Baskı sonrası boyut değiştirir mi?",
        answerHtml: "Malzeme baskı sırasında boyutsal stabiliteye sahiptir ve düşük çekme oranıyla baskı sonrası boyutun değişmediği belirtilir.",
      },
      {
        question: "Uyum çalışmaları için uygun mu?",
        answerHtml: "Evet. Elastik ve yüksek yırtılma direncine sahip yapısı sayesinde diş eti maskesi üzerinde uyum çalışması yapılmasını kolaylaştırır.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Diş eti maskesi akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Gingiva Reçinesi ile diş eti maskesi ve yumuşak doku üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=Lz3AWRKwURs",
    image: CRS_GINGIVA_GALLERY[1].src,
    imageAlt: "CRS Gingiva Reçinesi uygulama videosu",
    title: "CRS Gingiva Reçinesi ile diş eti maskesi üretimi",
    text: "İmplant modelleri için elastik ve yırtılmaz yumuşak doku segmentlerine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "PROTEZ", title: "CRS Denture", descriptionHtml: "Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", href: "/crs-denture-biouyumlu-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "REHBER", title: "Guide Resin", descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Gingiva Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi implant modeli, hangi diş eti maskesi akışı? Kısa bir görüşmeyle CRS Gingiva Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_MODEL_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_MODEL_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Model Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Model",
  },
  hero: {
    kicker: "CRS Model · Yüksek Hassasiyetli Model Reçinesi",
    titleHtml: 'Model doğruluğu artık <span class="em">referans noktanız</span> oluyor.',
    leadHtml:
      "CRS Model Resin, yüksek hassasiyetli master protez ve ortodontik modeller için idealdir. Boyutsal kararlılığı sayesinde baskı sonrası şekil değişmez; kole hatları belirgindir, marjinal uyum kolayca tespit edilir ve dijital iş akışı desteklenir.",
    pills: [
      { label: "Boyutsal kararlılık" },
      { label: "Belirgin marjin" },
      { label: "Ortodontik model" },
      { label: "Tüm DLP / LCD" },
    ],
    gallery: CRS_MODEL_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-model-yuksek-hassasiyetli-model-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Model%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Baskı sonrası <span class="hl">boyut değiştirmez</span> model reçinesi.',
    sideHtml: "CRS Model, protez ve ortodontik iş akışlarında referans model doğruluğunu korumaya odaklanan yüksek hassasiyetli dental model reçinesidir.",
    panelTitleHtml: "CRS Model Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Model baskılarında boyutsal kararlılık, implant analog uyumu ve renk seçenekleri öne çıkar.",
    items: [
      { descriptionHtml: "Baskı sonrası boyut değiştirmemesi sayesinde <b>uyum sorunu yaşanmadığı</b> belirtilir." },
      { descriptionHtml: "Yüksek doğruluğu sayesinde implant analoglarıyla <b>mükemmel uyum</b> sağladığı ifade edilir." },
      { descriptionHtml: "Renk seçenekleri, hasta ve hekimlere <b>kron renklerini göstermeyi</b> kolaylaştırır." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Marjin sınırları ve <span class="em">tüberkül detayları</span> belirgin.',
    sideHtml:
      "CRS Model ile üretilen modellerde kole çizgileri belirgindir ve marjinal oturum rahatlıkla tespit edilir. Teknik başlıklarında ISO 10477 ve ASTM D638 referansları listelenir.",
    items: [
      { name: "Eğilme Mukavemeti", value: "ISO", unit: "10477", tag: "Model", caption: "Dental model baskıları için teknik başlık olarak listelenir." },
      { name: "Esneklik Modülü", value: "ISO", unit: "10477", tag: "Stabilite", caption: "Baskı sonrası şekil değiştirmeyen model yapısını destekleyen teknik başlık." },
      { name: "Çekme Dayanımı", value: "ASTM", unit: "D638", tag: "Model", caption: "Hassas model ve kalıp üretiminde kullanılan malzeme dayanımı başlığı." },
    ],
  },
  specHighlight: {
    tag: "CRS MODEL · BOYUTSAL KARARLILIK · DLP / LCD",
    titleHtml: 'Tedavinin referans noktası <span class="em">doğru modeldir.</span>',
    descriptionHtml:
      "Bir tedavideki en önemli şey modelin doğruluğudur; diğer tüm işlemlerin referans noktası model olur. CRS Model'in yüksek boyutsal kararlılığı sayesinde protezin başlangıç noktasından emin olabilirsiniz.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Master protez modeli" },
      { label: "Uygulama", value: "Ortodontik model" },
      { label: "Detay", value: "Belirgin kole hatları" },
      { label: "İş akışı", value: "Dijital tarama gösterimleri" },
      { label: "Uyum", value: "Tüm DLP / LCD 3D yazıcılar" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: hassas modeller, ortodontik modeller, mock-up / wax-up ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_MODEL_GALLERY[1].src, alt: "CRS Model hassas dental model", title: "Hassas modeller", text: "Keskin kenar çizgileri ve temas noktaları gerektiren model üretimi." },
      { src: CRS_MODEL_GALLERY[2].src, alt: "CRS Model ortodontik model", title: "Ortodontik modeller", text: "Ortodontik planlama ve tedavi modelleri için yüksek hassasiyet." },
      { src: CRS_MODEL_GALLERY[3].src, alt: "CRS Model mock-up wax-up", title: "Mock-up / wax-up", text: "Mock-up, wax-up ve güdüklü model uygulamaları." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi modeller?",
        items: [
          "Keskin kenar çizgilerine ve temas noktalarına sahip <b>hassas modeller</b>",
          "Ortodontik modeller",
          "Mock-up, wax-up ve güdüklü modeller",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Model?",
        items: [
          "<b>Boyutsal kararlılık</b> ile baskı sonrası şekil değiştirmez",
          "Belirgin marjin sınırları ve tüberkül detayları",
          "Kum rengi ve gri renk seçenekleri",
          "Dijital iş akışına uygulanabilen 3D basılı modeller",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "Tüm DLP & LCD yazıcılarla çalışır",
      textHtml:
        "CRS Model Reçinesi tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Model doğruluğu <span class="em">tüm iş akışını taşır.</span>',
    textHtml:
      "Hassas model üretiminde model reçinesi, yazıcı parametresi ve post-process akışı birlikte çalışır. CRS Model'i kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["Boyutsal kararlılık", "Belirgin marjin", "Ortodontik model", "Mock-up", "DLP / LCD"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Model hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Hassas model üretimi, implant analog uyumu, model detayları ve yazıcı uyumu için net cevaplar.",
    openFirst: true,
    items: [
      { question: "CRS Model Reçinesi ne için kullanılır?", answerHtml: "Yüksek hassasiyetin gerekli olduğu master protez modelleri, ortodontik modeller, mock-up / wax-up uygulamaları ve güdüklü modeller için kullanılır." },
      { question: "Baskı sonrası boyut değiştirir mi?", answerHtml: "CRS Model, yüksek boyutsal kararlılığı sayesinde baskı sonrası şekil değiştirmeyen model baskıları üretmeye odaklanır." },
      { question: "İmplant analoglarıyla uyumlu mu?", answerHtml: "Yüksek doğruluğu sayesinde implant analoglarıyla uyumlu sonuçlar sağladığı belirtilir." },
      { question: "Hangi yazıcılarla uyumludur?", answerHtml: "Tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Model üretim akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Model Reçinesi ile yüksek hassasiyetli dental model üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_MODEL_GALLERY[1].src,
    imageAlt: "CRS Model Reçinesi uygulama videosu",
    title: "CRS Model Reçinesi ile hassas model üretimi",
    text: "Boyutsal kararlılık, belirgin marjin ve ortodontik model üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "DİŞ ETİ", title: "CRS Gingiva", descriptionHtml: "İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TRAY", title: "CRS Tray Resin", descriptionHtml: "Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "PROTEZ", title: "CRS Denture", descriptionHtml: "Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", href: "/crs-denture-biouyumlu-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Model Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi model uygulaması, hangi post-process akışı? Kısa bir görüşmeyle CRS Model Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_TRAY_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_TRAY_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Tray Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Tray Resin",
  },
  hero: {
    kicker: "CRS Tray Resin · Kişiye Özel Ölçü Kaşığı Reçinesi",
    titleHtml: 'Ölçü kaşığı artık <span class="em">tekrarlanabilir</span> basılıyor.',
    leadHtml:
      "CRS Tray Resin; kişiye özel ölçü kaşıklarının üretimi için geliştirilmiş, DLP ve LCD yazıcılarla uyumlu bir 3D yazıcı reçinesidir. 385–405 nm dalga boyunda çalışan sistemlerle optimize edilmiştir ve ölçü süreçlerinde güvenilir, tekrarlanabilir sonuçlar sağlar.",
    pills: [
      { label: "Ölçü kaşığı" },
      { value: "385–405 nm", label: "LCD / DLP uyumu" },
      { label: "Dijital iş akışı" },
      { label: "Tekrarlanabilir sonuç" },
    ],
    gallery: CRS_TRAY_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Tray%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Ölçü süreçlerinde <span class="hl">stabil ve tekrarlanabilir</span> sonuç.',
    sideHtml: "CRS Tray Resin, dijital tasarım sürecine uyumlu kişiye özel ölçü kaşıkları üretmek için geliştirilmiş dental reçinedir.",
    panelTitleHtml: "CRS Tray Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Ölçü kaşığı üretiminde form stabilitesi, tekrarlanabilirlik ve dijital iş akışı uyumu öne çıkar.",
    items: [
      { descriptionHtml: "Ölçü kaşıklarının baskı sonrası <b>formunu koruduğu</b> ve stabil sonuçlar sunduğu belirtilir." },
      { descriptionHtml: "Tekrarlanabilir üretim sayesinde dijital iş akışına <b>kolayca entegre edilir</b>." },
      { descriptionHtml: "Farklı dental ölçü uygulamalarında <b>güvenle tercih edilen</b> bir yapı sunar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Kişiye özel ölçü kaşığı için <span class="em">385–405 nm</span> uyum.',
    sideHtml:
      "CRS Tray Resin, baskı sonrası uygulanan işlemlerle gerekli mekanik özellikleri kazanır ve ölçü kaşığı üretiminde güvenilir kullanım sunar.",
    items: [
      { name: "Dalga Boyu", value: "385", unit: "–405 nm", tag: "LCD / DLP", caption: "385–405 nm dalga boyunda çalışan DLP ve LCD sistemlerle uyumlu üretim." },
      { name: "Uygulama", value: "Ölçü", unit: "Kaşığı", tag: "Custom tray", caption: "Kişiye özel ölçü kaşıklarının dijital tasarımdan üretimine odaklanır." },
      { name: "İş Akışı", value: "Dijital", unit: "", tag: "Tekrarlanabilir", caption: "Her baskıda aynı formun korunmasına katkı sağlayan dijital ölçü süreci." },
    ],
  },
  specHighlight: {
    tag: "CRS TRAY · ÖLÇÜ KAŞIĞI · 385–405 NM",
    titleHtml: 'Ölçü süreçlerinde <span class="em">kontrollü ve öngörülebilir</span> üretim.',
    descriptionHtml:
      "CRS Tray Reçinesi ile üretilen ölçü kaşıkları dijital tasarım sürecine uyumlu şekilde hazırlanır ve her baskıda aynı formun korunmasına katkı sağlar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Kişiye özel ölçü kaşığı" },
      { label: "Uygulama", value: "İmplant ölçü" },
      { label: "Uygulama", value: "Kron ve köprü ölçü" },
      { label: "Uygulama", value: "Ortodontik ölçü hazırlığı" },
      { label: "Uyum", value: "385–405 nm DLP / LCD" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: kişiye özel ölçü kaşığı, implant ölçü, kron-köprü ölçüleri ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_TRAY_GALLERY[1].src, alt: "CRS Tray ölçü kaşığı uygulaması", title: "Ölçü kaşığı", text: "Kişiye özel ölçü kaşığı üretimi için stabil yapı." },
      { src: CRS_TRAY_GALLERY[2].src, alt: "CRS Tray implant ölçü uygulaması", title: "İmplant ölçü", text: "İmplant ölçü uygulamaları için dijital üretim akışı." },
      { src: CRS_TRAY_GALLERY[3].src, alt: "CRS Tray kron köprü ölçü uygulaması", title: "Kron-köprü ölçü", text: "Kron ve köprü ölçü süreçlerinde tekrarlanabilir sonuçlar." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi ölçüler?",
        items: [
          "<b>Kişiye özel ölçü kaşığı</b> üretimi",
          "İmplant ölçü uygulamaları",
          "Kron-köprü ölçü süreçleri ve ortodontik ölçü hazırlıkları",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Tray Resin?",
        items: [
          "<b>385–405 nm</b> LCD / DLP uyumu",
          "Baskı sonrası form stabilitesi",
          "Dijital iş akışına uyum",
          "Güvenilir ve tekrarlanabilir ölçü süreci",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml:
        "CRS Tray Resin, 385–405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Ölçü kaşığı sonucu <span class="em">dijital akışla tamamlanır.</span>',
    textHtml:
      "Kişiye özel ölçü kaşığı üretiminde form stabilitesi, doğru yazıcı parametresi ve baskı sonrası işlem akışıyla korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.",
    chips: ["385–405 nm uyum", "Ölçü kaşığı", "İmplant ölçü", "Kron-köprü ölçü", "Dijital iş akışı"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Tray Resin hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Ölçü kaşığı üretimi, yazıcı uyumu, baskı sonrası işlem ve kullanım alanları için net cevaplar.",
    openFirst: true,
    items: [
      { question: "CRS Tray Resin nedir?", answerHtml: "CRS Tray Resin; kişiye özel ölçü kaşıklarının üretimi için geliştirilmiş, DLP ve LCD yazıcılarla uyumlu dental 3D yazıcı reçinesidir." },
      { question: "CRS Tray Resin ne için kullanılır?", answerHtml: "Kişiye özel ölçü kaşığı üretimi, implant ölçü uygulamaları, kron-köprü ölçü süreçleri ve ortodontik ölçü hazırlıkları için kullanılır." },
      { question: "Hangi yazıcılarla uyumludur?", answerHtml: "<b>385–405 nm</b> dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur." },
      { question: "Baskı sonrası işlem gerekli mi?", answerHtml: "Evet. Baskı sonrası uygulanan işlemlerle gerekli mekanik özellikleri kazanır ve ölçü kaşığı üretiminde güvenilir kullanım sunar." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Ölçü kaşığı akışını <span class="em">videoda görün.</span>',
    sideHtml: "CRS Tray Resin ile kişiye özel ölçü kaşığı üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: CRS_TRAY_GALLERY[1].src,
    imageAlt: "CRS Tray Resin uygulama videosu",
    title: "CRS Tray Resin ile kişiye özel ölçü kaşığı üretimi",
    text: "Dijital ölçü süreçleri için stabil ve tekrarlanabilir ölçü kaşığı üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "PROTEZ", title: "CRS Denture", descriptionHtml: "Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", href: "/crs-denture-biouyumlu-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "REHBER", title: "Guide Resin", descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Tray Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi ölçü uygulaması, hangi post-process akışı? Kısa bir görüşmeyle CRS Tray Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const MASH_CLEAR_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: MASH_CLEAR_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "Mash Clear Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "Mash Clear Resin",
  },
  hero: {
    kicker: "Mash Clear Resin · Şeffaf Dental Cerrahi Kılavuz Reçinesi",
    titleHtml: 'Cerrahi görüş artık <span class="em">şeffaf kılavuzla</span> güçleniyor.',
    leadHtml:
      "Mash Clear Resin, dental implant cerrahisi ve splint üretimi için geliştirilmiş, yüksek şeffaflık ve biyouyumluluk sunan profesyonel bir 3D yazıcı reçinesidir. CE Class I sertifikalı, intraoral kullanıma uygun ve otoklavlanabilir yapısıyla cerrahi kılavuz uygulamalarında güvenilir sonuçlar sunar.",
    pills: [
      { label: "Şeffaf yapı" },
      { label: "Cerrahi kılavuz" },
      { label: "Otoklavlanabilir" },
      { label: "CE Class I" },
    ],
    gallery: MASH_CLEAR_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/mash-clear-resin-dental-cerrahi-kilavuz-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=Mash%20Clear%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Şeffaf yapısıyla <span class="hl">cerrahi kontrolü</span> artırır.',
    sideHtml: "Mash Clear Resin, cerrahi kılavuz ve splint uygulamalarında şeffaf yapısı sayesinde operasyon sırasında maksimum görüş avantajı sunar.",
    panelTitleHtml: "Mash Clear Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Cerrahi kılavuzlarda şeffaf görüş, form stabilitesi ve sterilizasyon sonrası dayanım öne çıkar.",
    items: [
      { descriptionHtml: "Şeffaf yapı, operasyon sırasında çalışma alanının <b>net görülmesini</b> sağlar." },
      { descriptionHtml: "Baskı sonrası form stabilitesi, cerrahi kılavuzların <b>ağız içi uyumunu</b> destekler." },
      { descriptionHtml: "Mekanik dayanımı ve sterilizasyon süreçlerinden sonra <b>formunu koruması</b> öne çıkar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Şeffaf, biyouyumlu ve <span class="em">otoklavlanabilir</span> yapı.',
    sideHtml:
      "Mash Clear Resin, yüksek mekanik dayanımı, stabil form yapısı ve otoklavlanabilir özelliğiyle klinik ve laboratuvar süreçlerinde pratik kullanım sunar.",
    items: [
      { name: "Sertifikasyon", value: "CE", unit: "Class I", tag: "Dental", caption: "İntraoral kullanıma uygun cerrahi kılavuz ve splint reçinesi olarak listelenir." },
      { name: "Kopma Uzaması", value: "ASTM", unit: "D62", tag: "Clear", caption: "Teknik başlıklarda listelenen mekanik davranış referansı." },
      { name: "Elastisite Modülü", value: "ASTM", unit: "D638", tag: "Stabil form", caption: "Cerrahi kılavuzlarda form stabilitesini destekleyen teknik başlık." },
    ],
  },
  specHighlight: {
    tag: "MASH CLEAR · ŞEFFAF · CE CLASS I",
    titleHtml: 'Cerrahi uygulamada <span class="em">net görüş ve güvenilir sonuç.</span>',
    descriptionHtml:
      "Şeffaf yapısı sayesinde operasyon sırasında anatomik yapıların daha net değerlendirilmesine olanak tanır. Yüksek ölçü doğruluğu ve stabil baskı performansı klinik süreçlerde güvenilir ve öngörülebilir sonuçları destekler.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Dental implant cerrahisi" },
      { label: "Uygulama", value: "Cerrahi kılavuz üretimi" },
      { label: "Uygulama", value: "Splint ve geçici intraoral aparatlar" },
      { label: "Sertifikasyon", value: "CE Class I" },
      { label: "Sterilizasyon", value: "Otoklavlanabilir yapı" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: dental implant cerrahisi, cerrahi kılavuz, splint ve şeffaf dental uygulamalar.",
    photos: [
      { src: MASH_CLEAR_GALLERY[1].src, alt: "Mash Clear cerrahi kılavuz uygulaması", title: "Cerrahi kılavuz", text: "Dental implant cerrahisi için şeffaf kılavuz üretimi." },
      { src: MASH_CLEAR_GALLERY[2].src, alt: "Mash Clear splint uygulaması", title: "Splint", text: "Splint ve geçici intraoral aparatlar için şeffaf yapı." },
      { src: MASH_CLEAR_GALLERY[3].src, alt: "Mash Clear klinik planlama", title: "Klinik planlama", text: "Dijital tedavi simülasyonları ve hassas şeffaf dental uygulamalar." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi kılavuzlar?",
        items: [
          "<b>Dental implant cerrahisi</b> için cerrahi kılavuz üretimi",
          "Splint ve geçici intraoral aparatlar",
          "Klinik planlama ve dijital tedavi simülasyonları",
        ],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden Mash Clear?",
        items: [
          "<b>Yüksek şeffaflık</b> ile maksimum görüş avantajı",
          "Biyouyumlu ve intraoral kullanıma uygun yapı",
          "Otoklavlanabilir form",
          "Stabil baskı ve yüksek ölçü doğruluğu",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Şeffaf kılavuz sonucu <span class="em">sterilizasyonla tamamlanır.</span>',
    textHtml:
      "Cerrahi kılavuz üretiminde şeffaflık, form stabilitesi ve güvenli intraoral kullanım; doğru baskı, temizlik, post-curing ve sterilizasyon akışıyla birlikte çalışır.",
    chips: ["CE Class I", "Şeffaf kılavuz", "Splint", "Otoklav", "İntraoral kullanım"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'Mash Clear Resin hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "İntraoral kullanım, cerrahi kılavuz üretimi, şeffaflık, sterilizasyon ve yüzey kalitesi için net cevaplar.",
    openFirst: true,
    items: [
      { question: "Bu reçine intraoral kullanıma uygun mu?", answerHtml: "Evet. CE Class I sertifikalı, biyouyumlu ve intraoral kullanıma uygun bir dental 3D yazıcı reçinesi olarak geliştirilmiştir." },
      { question: "Cerrahi kılavuz üretimi için uygun mu?", answerHtml: "Evet. Dental implant cerrahisi için cerrahi kılavuz üretimi ve hassas uyum gerektiren şeffaf dental uygulamalar için uygundur." },
      { question: "Sterilizasyon yapılabilir mi?", answerHtml: "Evet. Otoklavlanabilir yapısı sayesinde klinik ve laboratuvar süreçlerinde güvenli kullanım sunar." },
      { question: "Uzun süre formunu korur mu?", answerHtml: "Stabil form yapısı ve mekanik dayanımı, baskı sonrası cerrahi kılavuzların formunu korumasını destekler." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Cerrahi kılavuz akışını <span class="em">videoda görün.</span>',
    sideHtml: "Mash Clear Resin ile şeffaf cerrahi kılavuz ve splint üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: MASH_CLEAR_GALLERY[1].src,
    imageAlt: "Mash Clear Resin uygulama videosu",
    title: "Mash Clear Resin ile şeffaf cerrahi kılavuz üretimi",
    text: "Dental implant cerrahisi, splint ve şeffaf intraoral aparatlar için ürün odaklı video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "REHBER", title: "Guide Resin", descriptionHtml: "Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", href: "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "SERT SPLINT", title: "CRS Splint Hard", descriptionHtml: "Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.", href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "TRAY", title: "CRS Tray Resin", descriptionHtml: "Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "Mash Clear Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi cerrahi kılavuz vakası, hangi sterilizasyon akışı? Kısa bir görüşmeyle Mash Clear Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const CRS_CAST_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: CRS_CAST_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CRS Cast Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Cast",
  },
  hero: {
    kicker: "CRS Cast · Çekmeyen Döküm Reçinesi",
    titleHtml: 'Döküm işi artık <span class="em">çekme ve kalıntı</span> sorununa takılmıyor.',
    leadHtml:
      "CRS Cast, çekmeyen ve kalıntı bırakmayan döküm reçinesi olarak dental reçine hattında yer alır. Geniş bir uygulama yelpazesinde tüm revetman markalarıyla birlikte kullanılabilen döküm akışı için konumlandırılır.",
    pills: [{ label: "Çekmeyen döküm" }, { label: "Kalıntı bırakmaz" }, { label: "Tüm revetman markaları" }, { label: "Dental döküm" }],
    gallery: CRS_CAST_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-cast-cekmeyen-dokum-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Cast%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Döküm akışında <span class="hl">çekme ve kalıntı</span> riskini azaltır.',
    sideHtml: "CRS Cast, dental döküm uygulamalarında çekmeyen ve kalıntı bırakmayan reçine karakteriyle öne çıkar.",
    panelTitleHtml: "CRS Cast Reçinesi <span class=\"em\">nerede öne çıkar?</span>",
    note: "Döküm reçinesi seçiminde çekme davranışı, kalıntı bırakmama ve revetman uyumu öne çıkar.",
    items: [
      { descriptionHtml: "Çekmeyen döküm reçinesi karakteri, hassas dental döküm iş akışlarında <b>ölçü kontrolünü</b> destekler." },
      { descriptionHtml: "Kalıntı bırakmayan yapı, döküm sonrası temizlik ve yüzey kalitesi açısından <b>pratik avantaj</b> sağlar." },
      { descriptionHtml: "Tüm revetman markalarıyla çalışabilmesi, laboratuvarın mevcut döküm sistemine <b>uyum sağlamasını</b> kolaylaştırır." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Dental döküm için <span class="em">çekmeyen ve kalıntısız</span> reçine.',
    sideHtml: "CRS Cast; çekmeyen, kalıntı bırakmayan ve tüm revetman markalarıyla çalışabilen döküm reçinesi özellikleriyle konumlandırılır.",
    items: [
      { name: "Döküm Karakteri", value: "Çekmeyen", unit: "", tag: "Cast", caption: "Dental döküm uygulamalarında çekme davranışını azaltmaya odaklanan reçine." },
      { name: "Yanma Sonrası", value: "Kalıntısız", unit: "", tag: "Residue-free", caption: "Kalıntı bırakmayan yapı, döküm sonrası temizlik ve uyumu destekler." },
      { name: "Uyum", value: "Tüm", unit: "Revetman", tag: "Investment", caption: "Geniş uygulama yelpazesinde revetman markalarıyla kullanılabilir." },
    ],
  },
  specHighlight: {
    tag: "CRS CAST · ÇEKMEYEN DÖKÜM · REVETMAN UYUMU",
    titleHtml: 'Döküm sürecinde <span class="em">kalıntısız ve uyumlu</span> akış.',
    descriptionHtml:
      "Dental laboratuvarlarda döküm reçinesi seçimi; çekme davranışı, yanma sonrası kalıntı ve revetman uyumu üzerinden belirlenir. CRS Cast bu üç başlık için konumlandırılmış döküm reçinesidir.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Ürün", value: "CRS Cast" },
      { label: "Uygulama", value: "Dental döküm" },
      { label: "Döküm karakteri", value: "Çekmeyen" },
      { label: "Yanma sonrası", value: "Kalıntı bırakmaz" },
      { label: "Uyum", value: "Tüm revetman markaları" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: dental döküm, revetman uyumu ve kalıntısız döküm akışı.",
    photos: [],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi döküm işleri?",
        items: ["<b>Dental döküm</b> uygulamaları", "Revetmanla çalışan laboratuvar döküm süreçleri", "Kalıntısız yanma gerektiren döküm işleri"],
        note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Cast?",
        items: ["<b>Çekmeyen</b> döküm reçinesi", "Kalıntı bırakmayan yapı", "Tüm revetman markalarıyla çalışma", "Geniş uygulama yelpazesi"],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Döküm sonucu <span class="em">revetman uyumuyla tamamlanır.</span>',
    textHtml:
      "CRS Cast, döküm reçinesi iş akışında baskı parametresi, revetman uyumu ve yanma sonrası temiz sonuç beklentisiyle birlikte değerlendirilir.",
    chips: ["Çekmeyen", "Kalıntı bırakmaz", "Revetman uyumu", "Dental döküm"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Cast hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Döküm reçinesi, revetman uyumu ve kalıntısız yanma akışı için net cevaplar.",
    openFirst: true,
    items: [
      { question: "CRS Cast ne için kullanılır?", answerHtml: "CRS Cast, dental döküm uygulamaları için kullanılan çekmeyen döküm reçinesidir." },
      { question: "Revetman markalarıyla uyumlu mu?", answerHtml: "Evet. Tüm revetman markalarıyla birlikte kullanılabilen döküm reçinesi olarak konumlandırılır." },
      { question: "Yanma sonrası kalıntı bırakır mı?", answerHtml: "CRS Cast, kalıntı bırakmayan döküm reçinesi olarak listelenir." },
      { question: "Hangi iş akışlarında tercih edilir?", answerHtml: "Çekme davranışı, yanma sonrası kalıntı ve revetman uyumu kritik olan dental döküm iş akışlarında tercih edilir." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Döküm akışını <span class="em">uzmanla değerlendirin.</span>',
    sideHtml: "CRS Cast için cihaz, revetman ve döküm akışınızı birlikte eşleştirelim.",
    href: "/pages/iletisim",
    image: CRS_CAST_GALLERY[0].src,
    imageAlt: "CRS Cast döküm reçinesi danışmanlık",
    title: "CRS Cast döküm reçinesi uyumlaması",
    text: "Çekmeyen ve kalıntı bırakmayan döküm reçinesi için yazıcı ve revetman uyumunu birlikte kontrol edin.",
    meta: "3MASH teknik destek",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "TRAY", title: "CRS Tray Resin", descriptionHtml: "Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "STUDY", title: "Mash Study", descriptionHtml: "Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "CRS Cast Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi revetman, hangi döküm akışı? Kısa bir görüşmeyle CRS Cast Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const MASH_STUDY_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: MASH_STUDY_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "Mash Study Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: { homeText: "Ana sayfa", homeHref: "/", categoryText: "Dental Reçineler", categoryHref: "/dental-3d-yazici-recineleri", productText: "Mash Study" },
  hero: {
    kicker: "Mash Study · Ekonomik Dental Model Reçinesi",
    titleHtml: 'Dental model artık <span class="em">uygun maliyetle</span> net çıkıyor.',
    leadHtml:
      "Mash Study Resin, dental model üretimi için geliştirilmiş ekonomik ve yüksek çözünürlüklü bir 3D yazıcı reçinesidir. Keskin kenarlar, pürüzsüz yüzeyler ve tutarlı baskı sonuçları sunar; tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur.",
    pills: [{ label: "Ekonomik model" }, { label: "Pürüzsüz yüzey" }, { label: "Stabil baskı" }, { label: "Tüm DLP / LCD" }],
    gallery: MASH_STUDY_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/mash-study-resin-dental-model-3d-yazici-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=Mash%20Study%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Uygun fiyatla <span class="hl">yüksek çözünürlüklü</span> model üretir.',
    sideHtml: "Mash Study Resin, dental laboratuvarlar ve eğitim uygulamaları için detay doğruluğu ile yüzey kalitesini dengeli şekilde sunar.",
    panelTitleHtml: "Mash Study Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Model baskılarında ekonomik üretim, marj detayı ve tarama uyumlu yüzey öne çıkar.",
    items: [
      { descriptionHtml: "Uygun fiyatlı bir model reçinesiyle <b>yüksek çözünürlüklü dijital modeller</b> elde edilebildiği belirtilir." },
      { descriptionHtml: "Kenar ve marj detaylarını net aktarması, baskı sonrası değerlendirmeleri <b>daha kolay</b> hale getirir." },
      { descriptionHtml: "Kolay temizlenebilir ve tarama uyumlu yüzey yapısı, iş süreçlerini <b>hızlandırır</b>." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Net anatomik detay ve <span class="em">yüksek ölçü doğruluğu</span>.',
    sideHtml: "Mash Study Resin ile üretilen dental modellerde diş anatomisi, marjin sınırları ve yüzey detayları net şekilde görülebilir.",
    items: [
      { name: "Eğilme Mukavemeti", value: "ASTM", unit: "D790", tag: "Study", caption: "Dental model reçinesi için listelenen mekanik teknik başlık." },
      { name: "Esneklik Modülü", value: "ASTM", unit: "D790", tag: "Model", caption: "Stabil model baskısı için teknik başlık olarak yer alır." },
      { name: "Çekme Dayanımı", value: "ASTM", unit: "D638", tag: "Model", caption: "Laboratuvar model üretiminde malzeme davranışını tanımlayan başlık." },
    ],
  },
  specHighlight: {
    tag: "MASH STUDY · MODEL · DLP / LCD",
    titleHtml: 'Ekonomik model reçinesinde <span class="em">stabil baskı performansı.</span>',
    descriptionHtml:
      "Gelişmiş reçine formülü sayesinde baskıdan kürleme aşamasına kadar yüksek stabilite sağlar. Dental laboratuvar ve eğitim uygulamalarında net kenar hatları, pürüzsüz yüzey ve yüksek ölçü doğruluğu sunar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Dental model üretimi" },
      { label: "Uygulama", value: "Ortodontik modeller" },
      { label: "Uygulama", value: "Eğitim ve demonstrasyon" },
      { label: "Yüzey", value: "Pürüzsüz + tarama uyumlu" },
      { label: "Uyum", value: "Tüm DLP / LCD yazıcılar" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: dental model, ortodontik model, eğitim modeli ve laboratuvar analizleri.",
    photos: [
      { src: MASH_STUDY_GALLERY[1].src, alt: "Mash Study dental model", title: "Dental model", text: "Yüksek detay gerektiren dental model üretimi." },
      { src: MASH_STUDY_GALLERY[2].src, alt: "Mash Study ortodontik model", title: "Ortodontik model", text: "Ortodontik model üretimi için stabil ve net yüzey." },
      { src: MASH_STUDY_GALLERY[3].src, alt: "Mash Study eğitim modeli", title: "Eğitim modeli", text: "Eğitim, demonstrasyon ve laboratuvar çalışma modelleri." },
    ],
    cards: [
      { eyebrow: "Uygulama Alanları", title: "Hangi modeller?", items: ["<b>Yüksek detay</b> gerektiren dental model üretimi", "Ortodontik modeller", "Eğitim, demonstrasyon ve laboratuvar analiz modelleri"], note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz." },
      { eyebrow: "Öne Çıkan Özellikler", title: "Neden Mash Study?", items: ["Ekonomik ve yüksek çözünürlüklü yapı", "Keskin kenarlar ve pürüzsüz yüzey", "<b>Stabil baskı performansı</b>", "Light Blue ve Peach renk seçenekleri"] },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "Tüm DLP & LCD yazıcılarla çalışır",
      textHtml: "Mash Study Resin tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [{ label: "Creality Halot-Sky" }, { label: "Phrozen Mini 8K" }, { label: "Asiga Max UV" }, { label: "Anycubic Photon Mono" }, { label: "SprintRay Pro S" }, { label: "+ tüm DLP / LCD markaları", highlighted: true }],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Study sonucu <span class="em">tarama uyumuyla tamamlanır.</span>',
    textHtml: "Dental model üretiminde net yüzey ve stabil form, doğru baskı parametresi, temizlik ve kürleme akışıyla korunur.",
    chips: ["Dental model", "Tarama uyumu", "Pürüzsüz yüzey", "DLP / LCD"],
    buttons: [{ text: "3D yazıcıları gör →", href: "/3d-yazicilar" }, { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" }],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'Mash Study hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Dental model üretimi, yüzey kalitesi, yazıcı uyumu ve post-process için net cevaplar.",
    openFirst: true,
    items: [
      { question: "Mash Study Resin ile dental modeller üretilebilir mi?", answerHtml: "Evet. Yüksek detay gerektiren dental model üretimi, ortodontik modeller ve laboratuvar çalışma modelleri için geliştirilmiştir." },
      { question: "Modeller uzun süre formunu korur mu?", answerHtml: "Gelişmiş reçine formülü baskıdan kürleme aşamasına kadar yüksek stabilite sağlar ve baskı sonrası formun korunmasına yardımcı olur." },
      { question: "Hangi yazıcılarla uyumlu?", answerHtml: "Tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur." },
      { question: "Yüzey kalitesi nasıldır?", answerHtml: "Keskin kenarlar, pürüzsüz yüzeyler ve tarama uyumlu model yüzeyi sunar." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Model üretim akışını <span class="em">videoda görün.</span>',
    sideHtml: "Mash Study Resin ile ekonomik dental model üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: MASH_STUDY_GALLERY[1].src,
    imageAlt: "Mash Study Resin uygulama videosu",
    title: "Mash Study Resin ile dental model üretimi",
    text: "Ekonomik, yüksek çözünürlüklü ve stabil dental model üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "MODEL", title: "CRS Model", descriptionHtml: "Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "DİŞ ETİ", title: "CRS Gingiva", descriptionHtml: "İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TRAY", title: "CRS Tray Resin", descriptionHtml: "Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "Mash Study Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml: "Hangi yazıcı, hangi model uygulaması, hangi temizlik ve kürleme akışı? Mash Study Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const MASH_TRIAL_PINK_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: MASH_TRIAL_PINK_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "Mash Trial Pink Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: { homeText: "Ana sayfa", homeHref: "/", categoryText: "Dental Reçineler", categoryHref: "/dental-3d-yazici-recineleri", productText: "Mash Trial Pink Resin" },
  hero: {
    kicker: "Mash Trial Pink Resin · Dental Geçici Try-in Reçinesi",
    titleHtml: 'Try-in provası artık <span class="em">klinik doğrulukla</span> basılıyor.',
    leadHtml:
      "Mash Trial Pink Resin; dental try-in uygulamaları için geliştirilmiş biyouyumlu ve yüksek performanslı bir geçici dental reçinesidir. Total ve parsiyel dişsiz hastalarda oklüzyon ve kapanış ilişkisini değerlendirmek için kullanılan geçici try-in protezlerde yüksek doğruluk sunar.",
    pills: [{ label: "Geçici try-in" }, { label: "Oklüzyon kontrolü" }, { label: "X-ray görünürlük" }, { value: "385–405 nm", label: "LCD / DLP" }],
    gallery: MASH_TRIAL_PINK_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=Mash%20Trial%20Pink%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Try-in protezlerde <span class="hl">uyum ve kapanış</span> kontrolü.',
    sideHtml: "Mash Trial Pink Resin, oklüzyon ve kapanış ilişkisini değerlendirme aşamasında yüksek doğruluk ve stabil prova sonucu sunar.",
    panelTitleHtml: "Mash Trial Pink Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Try-in protezlerde form stabilitesi, oklüzyon kontrolü ve doğal diş eti tonu öne çıkar.",
    items: [
      { descriptionHtml: "Baskı sonrası form stabilitesi sayesinde geçici try-in protezlerde <b>uyum sorunlarının minimize edildiği</b> belirtilir." },
      { descriptionHtml: "Yüksek doğruluk ile oklüzyon ve kapanış kontrollerinin <b>daha net</b> yapılabildiği ifade edilir." },
      { descriptionHtml: "Doğal diş eti tonuna yakın renk yapısı, estetik değerlendirme sürecini <b>kolaylaştırır</b>." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Dental try-in için <span class="em">stabil ve görünür</span> prova reçinesi.',
    sideHtml:
      "Mash Trial Pink Resin; düşük viskozitesi, kolay işlenebilir yapısı ve baskı sonrası form stabilitesi ile hızlı ve pratik üretim imkanı sunar.",
    items: [
      { name: "Eğilme Mukavemeti", value: "ISO", unit: "10477", tag: "Try-in", caption: "Geçici try-in protezlerde mekanik davranış için listelenen teknik başlık." },
      { name: "Sertifikasyon", value: "CE", unit: "Class I", tag: "Dental", caption: "Geçici dental try-in uygulamaları için listelenen sertifikasyon." },
      { name: "Esneklik Modülü", value: "ASTM", unit: "D790", tag: "Pink", caption: "Prova aşamasında stabil form davranışını destekleyen teknik başlık." },
    ],
  },
  specHighlight: {
    tag: "MASH TRIAL PINK · TRY-IN · 385–405 NM",
    titleHtml: 'Estetik uyum ve <span class="em">pratik prova</span> avantajı.',
    descriptionHtml:
      "Diş eti görünümünü taklit eden geçici dental reçine yapısıyla estetik değerlendirme sürecini kolaylaştırır. X-ray ile görünürlük sağlayan formülasyonu klinik değerlendirme süreçlerine destek olur.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Geçici try-in protez" },
      { label: "Kontrol", value: "Oklüzyon ve kapanış" },
      { label: "Görünürlük", value: "X-ray ile görünür" },
      { label: "Renk", value: "Doğal diş eti tonu" },
      { label: "Uyum", value: "385–405 nm DLP / LCD" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: geçici try-in protez, hasta provası, oklüzyon kontrolü ve dijital dental iş akışı.",
    photos: [
      { src: MASH_TRIAL_PINK_GALLERY[1].src, alt: "Mash Trial Pink geçici try-in protez", title: "Try-in protez", text: "Total ve parsiyel dişsiz hastalarda geçici prova." },
      { src: MASH_TRIAL_PINK_GALLERY[2].src, alt: "Mash Trial Pink oklüzyon kontrolü", title: "Oklüzyon kontrolü", text: "Kapanış ilişkisini değerlendirme aşamasında yüksek doğruluk." },
      { src: MASH_TRIAL_PINK_GALLERY[3].src, alt: "Mash Trial Pink hasta provası", title: "Hasta provası", text: "Estetik değerlendirme ve hasta provası için doğal diş eti tonu." },
    ],
    cards: [
      { eyebrow: "Uygulama Alanları", title: "Hangi provalar?", items: ["<b>Geçici try-in protez</b> üretimi", "Estetik değerlendirme ve hasta provası", "Oklüzyon ve kapanış kontrolü"], note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz." },
      { eyebrow: "Öne Çıkan Özellikler", title: "Neden Mash Trial Pink?", items: ["Biyouyumlu geçici dental reçine", "<b>X-ray görünürlüğü</b>", "Düşük viskozite ve kolay işlenebilirlik", "Baskı sonrası form stabilitesi"] },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml: "Mash Trial Pink Resin, 385–405 nm dalga boyunda çalışan tüm DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [{ label: "Creality Halot-Sky" }, { label: "Phrozen Mini 8K" }, { label: "Asiga Max UV" }, { label: "Anycubic Photon Mono" }, { label: "SprintRay Pro S" }, { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true }],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Try-in sonucu <span class="em">klinik kontrolle tamamlanır.</span>',
    textHtml: "Geçici prova üretiminde oklüzyon, kapanış ve estetik değerlendirme; doğru baskı parametresi, yıkama ve kürleme akışıyla güvenilir hale gelir.",
    chips: ["Try-in protez", "X-ray görünürlük", "Oklüzyon", "Hasta provası", "385–405 nm"],
    buttons: [{ text: "3D yazıcıları gör →", href: "/3d-yazicilar" }, { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" }],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'Mash Trial Pink hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Try-in protez, ağız içi prova, mekanik dayanım, yazıcı uyumu ve post-process için net cevaplar.",
    openFirst: true,
    items: [
      { question: "Mash Trial Pink Resin ne için kullanılır?", answerHtml: "Geçici try-in protez üretimi, estetik değerlendirme, hasta provası, oklüzyon ve kapanış kontrolü için kullanılır." },
      { question: "Ağız içinde kullanıma uygun mu?", answerHtml: "Biyouyumlu geçici dental reçine olarak geliştirilmiştir; geçici try-in uygulamaları için kullanılır." },
      { question: "Hangi 3D yazıcılarla uyumludur?", answerHtml: "<b>385–405 nm</b> dalga boyunda çalışan tüm DLP ve LCD 3D yazıcılarla uyumludur." },
      { question: "Klinik değerlendirmede avantajı nedir?", answerHtml: "X-ray görünürlüğü, oklüzyon ve kapanış değerlendirmesi ile estetik prova sürecini kolaylaştırır." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Try-in prova akışını <span class="em">videoda görün.</span>',
    sideHtml: "Mash Trial Pink Resin ile dental geçici try-in üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: MASH_TRIAL_PINK_GALLERY[1].src,
    imageAlt: "Mash Trial Pink Resin uygulama videosu",
    title: "Mash Trial Pink Resin ile geçici try-in üretimi",
    text: "Oklüzyon, kapanış ve estetik hasta provası için geçici try-in üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "TRY-IN", title: "Mash Trial White", descriptionHtml: "Geçici dental restorasyon provaları için beyaz prova reçinesi.", href: "/mash-trial-white-resin-gecici-dental-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "PROTEZ", title: "CRS Denture", descriptionHtml: "Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", href: "/crs-denture-biouyumlu-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "MODEL", title: "Mash Study", descriptionHtml: "Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "Mash Trial Pink Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml: "Hangi yazıcı, hangi try-in vaka, hangi klinik prova akışı? Mash Trial Pink Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

export const MASH_TRIAL_WHITE_PRODUCT_DETAIL_DATA: ProductDetailTemplateData = {
  key: MASH_TRIAL_WHITE_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "Mash Trial White Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: { homeText: "Ana sayfa", homeHref: "/", categoryText: "Dental Reçineler", categoryHref: "/dental-3d-yazici-recineleri", productText: "Mash Trial White Resin" },
  hero: {
    kicker: "Mash Trial White Resin · Geçici Dental Reçine",
    titleHtml: 'Geçici prova artık <span class="em">görsel netlikle</span> kontrol ediliyor.',
    leadHtml:
      "Mash Trial White Resin; geçici dental restorasyon provaları için geliştirilmiş, ışıkla kürlenen yüksek performanslı 3D yazıcı dental reçinesidir. Try-in restorasyonlar, protez provaları ve oklüzyon değerlendirmeleri için kullanılır.",
    pills: [{ label: "Geçici prova" }, { label: "Röntgen görünürlük" }, { label: "CE Class I" }, { value: "385–405 nm", label: "LCD / DLP" }],
    gallery: MASH_TRIAL_WHITE_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/mash-trial-white-resin-gecici-dental-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=Mash%20Trial%20White%20Resin%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Geçici restorasyonda <span class="hl">uyum ve estetik</span> kontrolü.',
    sideHtml: "Mash Trial White Resin, protez uyumu, oklüzyon ve estetik değerlendirmelerin klinik ortamda daha güvenilir yapılmasına yardımcı olur.",
    panelTitleHtml: "Mash Trial White Resin kullananlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Geçici restorasyon provalarında ölçü doğruluğu, güvenilir değerlendirme ve röntgen görünürlüğü öne çıkar.",
    items: [
      { descriptionHtml: "Geçici restorasyon provalarında ölçü doğruluğu sayesinde <b>uyum problemi yaşanmadığı</b> belirtilir." },
      { descriptionHtml: "Geçici prova restorasyonlarının klinik değerlendirme sürecinde <b>güvenilir sonuçlar</b> sunduğu ifade edilir." },
      { descriptionHtml: "Röntgende görünürlük sağlayan yapı, klinik kontrol ve tedavi planlamasında <b>ek avantaj</b> sunar." },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Geçici restorasyon için <span class="em">CE Class I</span> prova reçinesi.',
    sideHtml:
      "Mash Trial White Resin, özel fotopolimer formülasyonu sayesinde baskı sonrası stabil yapı ve yüksek görsel netlik sunar. 385 nm ve 405 nm UV ışık kaynağı kullanan LCD ve DLP yazıcılarla uyumludur.",
    items: [
      { name: "Eğilme Mukavemeti", value: "ASTM", unit: "D790", tag: "Trial", caption: "Geçici dental prova restorasyonları için listelenen teknik başlık." },
      { name: "Sertifikasyon", value: "CE", unit: "Class I", tag: "Dental", caption: "Geçici restorasyon provalarında güvenli kullanım sunan sertifikasyon." },
      { name: "Esneklik Modülü", value: "ASTM", unit: "D790", tag: "White", caption: "Prova restorasyonlarında stabil yapı için listelenen teknik başlık." },
    ],
  },
  specHighlight: {
    tag: "MASH TRIAL WHITE · GEÇİCİ PROVA · CE CLASS I",
    titleHtml: 'Geçici dental provalarda <span class="em">klinik kontrolü kolaylaştırır.</span>',
    descriptionHtml:
      "Protez uyumu, oklüzyon ve estetik değerlendirmelerin daha güvenilir yapılmasına destek olur. CE Class I sertifikalı yapısı ve röntgende görünür formülasyonu dijital diş hekimliği süreçlerinde pratik bir klinik çözüm sunar.",
    ctaText: "Boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Uygulama", value: "Geçici prova restorasyonu" },
      { label: "Uygulama", value: "Protez uyum kontrolü" },
      { label: "Uygulama", value: "Klinik estetik değerlendirme" },
      { label: "Sertifikasyon", value: "CE Class I" },
      { label: "Uyum", value: "385–405 nm LCD / DLP" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: geçici prova restorasyonu, protez uyum kontrolü, klinik estetik değerlendirme ve try-in cihaz üretimi.",
    photos: [
      { src: MASH_TRIAL_WHITE_GALLERY[1].src, alt: "Mash Trial White geçici restorasyon provası", title: "Geçici prova", text: "Geçici dental restorasyon provaları için yüksek görsel netlik." },
      { src: MASH_TRIAL_WHITE_GALLERY[2].src, alt: "Mash Trial White protez uyum kontrolü", title: "Protez uyumu", text: "Protez uyumu, oklüzyon ve diş dizilimi değerlendirmeleri." },
      { src: MASH_TRIAL_WHITE_GALLERY[3].src, alt: "Mash Trial White klinik estetik değerlendirme", title: "Estetik kontrol", text: "Klinik estetik değerlendirme ve tedavi planlamasına destek." },
    ],
    cards: [
      { eyebrow: "Uygulama Alanları", title: "Hangi provalar?", items: ["<b>Geçici prova restorasyonları</b>", "Protez uyum kontrolleri", "Klinik estetik değerlendirmeler ve try-in cihaz üretimi"], note: "Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz." },
      { eyebrow: "Öne Çıkan Özellikler", title: "Neden Mash Trial White?", items: ["CE Class I sertifikalı yapı", "Röntgende görünür formülasyon", "<b>Baskı sonrası stabil yapı</b>", "385–405 nm LCD / DLP uyumu"] },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "385–405 nm LCD & DLP yazıcılarla çalışır",
      textHtml: "Mash Trial White Resin, 385 nm ve 405 nm UV ışık kaynağı kullanan LCD ve DLP teknolojisine sahip 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.",
      chips: [{ label: "Creality Halot-Sky" }, { label: "Phrozen Mini 8K" }, { label: "Asiga Max UV" }, { label: "Anycubic Photon Mono" }, { label: "SprintRay Pro S" }, { label: "+ tüm 385–405 nm LCD / DLP markaları", highlighted: true }],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Geçici prova sonucu <span class="em">ölçü doğruluğuyla tamamlanır.</span>',
    textHtml: "Geçici dental prova restorasyonlarında uyum, oklüzyon ve estetik kontrol; doğru baskı, temizlik ve kürleme akışıyla güvenilir hale gelir.",
    chips: ["CE Class I", "Röntgen görünürlük", "Protez uyumu", "Oklüzyon", "385–405 nm"],
    buttons: [{ text: "3D yazıcıları gör →", href: "/3d-yazicilar" }, { text: "Uzmana danış →", href: "/pages/iletisim", variant: "line" }],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'Mash Trial White hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Geçici prova restorasyonları, kalıcı kullanım sınırı, yazıcı uyumu ve post-process için net cevaplar.",
    openFirst: true,
    items: [
      { question: "Mash Trial White Resin hangi uygulamalarda kullanılır?", answerHtml: "Geçici prova restorasyonları, protez uyum kontrolleri, klinik estetik değerlendirmeler ve try-in cihaz üretimi için kullanılır." },
      { question: "Ağız içinde kalıcı kullanım için uygun mudur?", answerHtml: "Hayır. Geçici dental restorasyon provaları ve klinik değerlendirme süreçleri için geliştirilmiş bir prova reçinesidir." },
      { question: "Hangi 3D yazıcılarla uyumludur?", answerHtml: "<b>385 nm ve 405 nm</b> UV ışık kaynağı kullanan LCD ve DLP 3D yazıcılarla uyumludur." },
      { question: "Klinik kontrol avantajı nedir?", answerHtml: "Röntgende görünür yapısı, klinik kontrol ve tedavi planlamasında ek avantaj sunar." },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Geçici prova akışını <span class="em">videoda görün.</span>',
    sideHtml: "Mash Trial White Resin ile geçici dental prova restorasyonu üretim akışını videoda izleyin.",
    href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    image: MASH_TRIAL_WHITE_GALLERY[1].src,
    imageAlt: "Mash Trial White Resin uygulama videosu",
    title: "Mash Trial White Resin ile geçici prova restorasyonu",
    text: "Protez uyumu, oklüzyon ve estetik değerlendirme için geçici dental prova üretimine odaklanan video.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      { tag: "TRY-IN", title: "Mash Trial Pink", descriptionHtml: "Dental try-in uygulamaları için pembe geçici prova reçinesi.", href: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F6E3E4,#fff)" },
      { tag: "MODEL", title: "Mash Study", descriptionHtml: "Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#EFE7D3,#fff)" },
      { tag: "PROTEZ", title: "CRS Denture", descriptionHtml: "Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", href: "/crs-denture-biouyumlu-protez-recinesi", linkText: "İncele", background: "linear-gradient(160deg,#F5DEE0,#fff)" },
      { tag: "TÜM HAT", title: "Tüm reçineler", descriptionHtml: "Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", href: "/dental-3d-yazici-recineleri", linkText: "Reçine seçici", background: "linear-gradient(160deg,#EEEEE9,#fff)" },
    ],
  },
  finalCta: {
    titleHtml: "Mash Trial White Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml: "Hangi yazıcı, hangi geçici prova restorasyonu, hangi klinik değerlendirme akışı? Mash Trial White Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.",
    primaryText: "Boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

type PrinterSparePartConfig = {
  slug: string;
  productText: string;
  kicker: string;
  titleHtml: string;
  leadHtml: string;
  pills: Array<{ label: string; value?: string }>;
  images: string[];
  galleryBadge?: string;
  summarySubject: string;
  metricTitleHtml: string;
  metricSideHtml: string;
  metrics: Array<{ name: string; value: string; unit?: string; tag?: string; caption: string }>;
  specTag: string;
  specTitleHtml: string;
  specDescriptionHtml: string;
  specRows: Array<{ label: string; value: string }>;
  useCaseSideHtml: string;
  useCasePhotos: Array<{ imageIndex?: number; title: string; text: string; alt: string }>;
  useCaseCards: Array<{ eyebrow: string; title: string; items: string[]; note?: string }>;
  devicesTitle: string;
  devicesTextHtml: string;
  deviceChips: Array<{ label: string; highlighted?: boolean }>;
  ecosystemTitleHtml: string;
  ecosystemTextHtml: string;
  ecosystemChips: string[];
  faqItems: Array<{ question: string; answerHtml: string }>;
  videoHref?: string;
  videoTitleHtml: string;
  videoSideHtml: string;
  videoTitle: string;
  videoText: string;
};

const PRINTER_SPARE_CATEGORY = {
  text: "3D Yazıcı Yedek Parçaları",
  href: "/3d-yazici-yedek-parcalari",
};

function thumbUrl(src: string) {
  return src.replace("/1080/", "/360/");
}

function normalizedGallery(images: string[], alt: string): ProductGalleryItem[] {
  const source = images.length ? images : [];
  const gallery = source.map((src) => ({ src, thumbSrc: thumbUrl(src), alt }));
  if (!gallery.length) return gallery;
  while (gallery.length < 5) {
    const item = gallery[Math.min(gallery.length - 1, Math.max(0, source.length - 1))];
    gallery.push({ ...item });
  }
  return gallery;
}

function youtubePreview(href: string | undefined, fallback: string) {
  const id = href?.match(/[?&]v=([^&]+)/)?.[1] || href?.match(/youtu\.be\/([^?&]+)/)?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : fallback;
}

function sparePhotoSrc(config: PrinterSparePartConfig, index: number | undefined) {
  const usable = config.images.slice(1);
  if (usable.length) return usable[Math.min(Math.max((index || 1) - 2, 0), usable.length - 1)];
  return config.images[0] || "";
}

function spareRelatedItems(currentSlug: string): NonNullable<ProductDetailTemplateData["related"]>["items"] {
  const all = [
    {
      tag: "P16L",
      title: "MASH P16L 16K LCD Ekran",
      descriptionHtml: "16K UHD monokrom LCD ekran; 385 nm P16L ışık sistemiyle uyumlu yedek parça.",
      href: `/${MASH_P16L_LCD_SCREEN_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#EEF2F5,#fff)",
    },
    {
      tag: "TABLA",
      title: "MASH P16L Büyük Baskı Tablası",
      descriptionHtml: "211x118 mm geniş baskı alanı; yüksek hacimli dental üretimler için standart tabla.",
      href: `/${MASH_P16L_LARGE_BUILD_PLATE_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#F3EFE7,#fff)",
    },
    {
      tag: "TANK",
      title: "MASH P16L Reçine Tankı",
      descriptionHtml: "800 ml alüminyum reçine tankı; hızlı kilit ve ısıtma sistemiyle uyumlu yapı.",
      href: `/${MASH_P16L_RESIN_TANK_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#EDEFE9,#fff)",
    },
    {
      tag: "SARF",
      title: "Şeffaf ACF Film",
      descriptionHtml: "LCD/DLP reçine yazıcılarda UV geçirgenliği ve stabil katman oluşumu için sarf film.",
      href: `/${ACF_FEP_FILM_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#EEF6F6,#fff)",
    },
    {
      tag: "KONTROL",
      title: "MASH P16L Ana Kart",
      descriptionHtml: "Motor, sensör ve veri iletişimi görevlerini yöneten merkezi kontrol kartı.",
      href: `/${MASH_P16L_MAINBOARD_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#F0F0EA,#fff)",
    },
  ];
  return all.filter((item) => item.href !== `/${currentSlug}`).slice(0, 4);
}

function printerSparePartDetail(config: PrinterSparePartConfig): ProductDetailTemplateData {
  const gallery = normalizedGallery(config.images, config.productText);
  const mainImage = config.images[0] || gallery[0]?.src || "";
  return {
    key: config.slug,
    announcement: {
      enabled: true,
      strongText: "Yedek parça desteği.",
      longText: "Uyumlu cihazı birlikte kontrol edip doğru parçayı, kurulum desteğiyle teslim ediyoruz.",
      ctaText: "Uyumluluğu kontrol et →",
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText: PRINTER_SPARE_CATEGORY.text,
      categoryHref: PRINTER_SPARE_CATEGORY.href,
      productText: config.productText,
    },
    hero: {
      kicker: config.kicker,
      titleHtml: config.titleHtml,
      leadHtml: config.leadHtml,
      pills: config.pills,
      galleryBadge: config.galleryBadge,
      gallery,
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "— uyumluluk kontrolü ve teknik destek dahil.",
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: "WhatsApp'tan sor",
      addToCartText: "Sepete ekle →",
      addingToCartText: "Ekleniyor...",
      outOfStockText: "Stok yok",
      trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
    },
    ratings: {
      index: "01",
      label: "Servis Güveni",
      titleHtml: 'Doğru parça, <span class="hl">kesintisiz üretim</span> için seçilir.',
      sideHtml: "Yazıcı yedek parçalarında kritik nokta; cihaz uyumu, doğru montaj ve baskı sürecinin tekrar stabil hale gelmesidir.",
      panelTitleHtml: `${config.productText} için <span class="em">kontrol listesi.</span>`,
      note: "Servis ve bakım iş akışında kontrol edilen temel noktalar.",
      items: [
        { descriptionHtml: "Cihaz modeli ve parça uyumu <b>satın alma öncesi</b> kontrol edilir." },
        { descriptionHtml: "Montaj sonrası baskı stabilitesi için <b>kalibrasyon ve test baskısı</b> önerilir." },
        { descriptionHtml: "Sarf ve elektronik parçalar için <b>temiz çalışma alanı</b> ve doğru kurulum sırası önemlidir." },
      ],
    },
    metrics: {
      index: "02",
      label: "Teknik Özellikler",
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: "Uyumluluğu seç →",
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: "Uygulama & Uyumluluk",
      titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
      sideHtml: config.useCaseSideHtml,
      photos: config.useCasePhotos.map((photo) => ({
        src: sparePhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
      })),
      cards: config.useCaseCards,
      devices: {
        eyebrow: "Uyumlu Cihazlar",
        title: config.devicesTitle,
        textHtml: config.devicesTextHtml,
        chips: config.deviceChips,
      },
    },
    ecosystem: {
      index: "04",
      label: "Servis Ekosistemi",
      titleHtml: config.ecosystemTitleHtml,
      textHtml: config.ecosystemTextHtml,
      chips: config.ecosystemChips,
      buttons: [
        { text: "Teknik destek al", href: "/pages/iletisim" },
        { text: "Yedek parçaları gör", href: PRINTER_SPARE_CATEGORY.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: "Sık Sorulanlar",
      titleHtml: `${config.productText} <span class="em">hakkında.</span>`,
      sideHtml: "Satın alma öncesi cihaz modeli ve parça uyumu birlikte kontrol edilmelidir.",
      openFirst: true,
      items: config.faqItems,
    },
    video: {
      index: "06",
      label: "Videoda Gör",
      titleHtml: config.videoTitleHtml,
      sideHtml: config.videoSideHtml,
      href: config.videoHref || "/pages/iletisim",
      image: config.videoHref ? youtubePreview(config.videoHref, mainImage) : mainImage,
      imageAlt: `${config.productText} video ve teknik destek`,
      title: config.videoTitle,
      text: config.videoText,
      meta: config.videoHref ? "Mash Academy · YouTube'da izle" : "3MASH teknik destek",
    },
    related: {
      index: "07",
      label: "İlgili Yedek Parçalar",
      titleHtml: 'Aynı cihazda <span class="em">birlikte çalışanlar.</span>',
      items: spareRelatedItems(config.slug),
    },
    finalCta: {
      titleHtml: `${config.productText} için <span class="em">uyumluluğu birlikte kontrol edelim.</span>`,
      textHtml:
        "Cihaz modeli, parça revizyonu ve kurulum adımlarını birlikte netleştirip doğru yedek parçayı teknik destekle teslim edelim.",
      primaryText: "Sepete dön ↑",
      primaryHref: "#satinal",
      secondaryText: "Uzmana danış",
      secondaryHref: "/pages/iletisim",
    },
  };
}

const PRINTER_SPARE_PART_CONFIGS: PrinterSparePartConfig[] = [
  {
    slug: CREALITY_HALOT_SKY_LCD_KIT_SLUG,
    productText: "Creality Halot Sky LCD Ekran Kiti",
    kicker: "Creality Halot Sky · 6K Mono LCD Ekran Kiti",
    titleHtml: 'Halot Sky baskı kalitesi <span class="em">ekranla</span> yenilenir.',
    leadHtml:
      "Creality Halot Sky 2022 ve orijinal Halot Sky modeli için 6K Mono LCD ekran kiti. Yüksek çözünürlük ve geniş dokunmatik ekranla reçine baskı performansını tekrar stabil hale getirir.",
    pills: [{ value: "6K", label: "Mono LCD" }, { value: "9.25 inç", label: "dokunmatik ekran" }, { label: "Halot Sky uyumlu" }, { label: "Orijinal yedek parça" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a1735bcc-58b6-47c0-a820-ff325b8d4902/1080/creality-halot-sky-lcd-kit.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4118cd2f-00bc-441f-b16b-39190b5d7c12/1080/creality-halot-sky-lcd-kit2.webp",
    ],
    galleryBadge: "6K MONO",
    summarySubject: "LCD ekran kiti",
    metricTitleHtml: '6K Mono ekranla <span class="em">detay geri gelir.</span>',
    metricSideHtml: "Creality Halot Sky ekran değişiminde çözünürlük, cihaz uyumu ve montaj sonrası test baskısı birlikte değerlendirilir.",
    metrics: [
      { name: "Ekran Tipi", value: "6K", unit: "Mono", tag: "LCD", caption: "Reçine baskılarda yüksek detay aktarımı için mono LCD ekran kiti." },
      { name: "Ekran Boyutu", value: "9.25", unit: "inç", tag: "Touch", caption: "Geniş dokunmatik ekran yapısı Halot Sky kullanım akışını korur." },
      { name: "Uyum", value: "Halot", unit: "Sky", tag: "2022", caption: "Halot Sky 2022 ve orijinal Halot Sky modeliyle uyumlu yapı." },
    ],
    specTag: "CREALITY · HALOT SKY · LCD KIT",
    specTitleHtml: 'Ekran değişimiyle <span class="em">stabil pozlama.</span>',
    specDescriptionHtml: "6K Mono LCD ekran kiti, Halot Sky reçine yazıcının pozlama kalitesini ve dokunmatik kontrol yüzeyini yenilemek için kullanılır. Değişim sonrası kalibrasyon ve test baskısı önerilir.",
    specRows: [
      { label: "Cihaz", value: "Creality Halot Sky" },
      { label: "Ekran", value: "6K Mono LCD" },
      { label: "Boyut", value: "9.25 inç" },
      { label: "Kullanım", value: "Bakım / onarım" },
      { label: "Kategori", value: "Yedek parça" },
    ],
    useCaseSideHtml: "Halot Sky ekran değişimi, pozlama stabilitesi ve dokunmatik kontrol için kullanılan yedek parça.",
    useCasePhotos: [
      { imageIndex: 2, title: "Ekran değişimi", text: "Hasarlı veya performansı düşen LCD ekran için yenileme.", alt: "Creality Halot Sky LCD ekran değişimi" },
      { imageIndex: 2, title: "Pozlama kontrolü", text: "Reçine baskıda katman netliği ve ışık aktarımı.", alt: "Creality Halot Sky pozlama kontrolü" },
      { imageIndex: 2, title: "Servis kurulumu", text: "Montaj sonrası kalibrasyon ve test baskısı.", alt: "Creality Halot Sky servis kurulumu" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne zaman değişir?", items: ["Ekranda ölü piksel, çizgi veya pozlama kaybı oluştuğunda", "Dokunmatik panel hasarı veya kararsızlığı görüldüğünde", "Baskı kalitesi ekran kaynaklı düştüğünde"] },
      { eyebrow: "Kurulum Notu", title: "Montajda ne kontrol edilir?", items: ["Bağlantı soketleri ve ekran yüzeyi temiz tutulur", "İlk baskı öncesi pozlama testi yapılır", "Reçine tankı filmi ve ekran yüzeyi birlikte kontrol edilir"] },
    ],
    devicesTitle: "Creality Halot Sky modelleriyle çalışır",
    devicesTextHtml: "Halot Sky 2022 ve orijinal Halot Sky cihazlarında ekran değişimi için kullanılır. Uyum için cihaz modelini ve ekran revizyonunu birlikte kontrol ediyoruz.",
    deviceChips: [{ label: "Creality Halot Sky 2022" }, { label: "Creality Halot Sky" }, { label: "Reçine LCD yazıcı" }, { label: "Uyumluluk kontrolü", highlighted: true }],
    ecosystemTitleHtml: 'Ekran değişimi, <span class="em">tek başına parça değişimi değildir.</span>',
    ecosystemTextHtml: "LCD değişiminden sonra tank filmi, ekran yüzeyi, pozlama ve ilk test baskısı birlikte kontrol edilirse baskı süreci daha güvenli ilerler.",
    ecosystemChips: ["LCD ekran", "Tank filmi", "Pozlama testi", "Servis desteği"],
    faqItems: [
      { question: "Hangi cihazlarla uyumlu?", answerHtml: "Creality Halot Sky 2022 ve orijinal Halot Sky modeliyle uyumlu LCD ekran kiti olarak listelenir." },
      { question: "Ekran değişimi sonrası ne yapılmalı?", answerHtml: "Bağlantılar, ekran yüzeyi ve pozlama testi kontrol edilmelidir." },
      { question: "Teknik destek alabilir miyim?", answerHtml: "Evet. Satın alma öncesi uyumluluk ve kurulum adımları için destek alınabilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=mDQX01qgu60",
    videoTitleHtml: 'Halot Sky akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "Creality Halot Sky LCD ekran değişimi ve cihaz bakım akışını video üzerinden inceleyin.",
    videoTitle: "Creality Halot Sky LCD ekran kiti",
    videoText: "LCD ekran değişimi, kontrol ve test baskısı sürecine odaklanan video.",
  },
  {
    slug: PIOCREAT_C01_LCD_KIT_SLUG,
    productText: "Piocreat C01 LCD Ekran Kiti",
    kicker: "Piocreat C01 · LCD Ekran Kiti",
    titleHtml: 'C01 baskı akışı <span class="em">stabil ekranla</span> sürer.',
    leadHtml:
      "Piocreat C01 3D yazıcıya özel LCD ekran kiti, baskı performansını korumaya ve üretim sürecini kesintisiz devam ettirmeye yardımcı olur. Stabil çalışma yapısı daha net ve tutarlı sonuçları destekler.",
    pills: [{ label: "C01 uyumlu" }, { label: "LCD ekran" }, { label: "Stabil baskı" }, { label: "Yedek parça" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5178138f-f83b-4c0e-b48a-78f5e04be566/1080/piocreat-lcd.webp"],
    summarySubject: "LCD ekran kiti",
    metricTitleHtml: 'C01 için <span class="em">güvenilir ekran yenileme.</span>',
    metricSideHtml: "Piocreat C01 ekran değişiminde uyum, stabil pozlama ve üretim sürekliliği öne çıkar.",
    metrics: [
      { name: "Cihaz Uyumu", value: "C01", unit: "", tag: "Piocreat", caption: "Piocreat C01 3D yazıcı için LCD ekran kiti." },
      { name: "Parça Tipi", value: "LCD", unit: "Kit", tag: "Ekran", caption: "Baskı performansını korumak için kullanılan ekran yedek parçası." },
      { name: "Amaç", value: "Stabil", unit: "baskı", tag: "Bakım", caption: "Net ve tutarlı sonuçlar için ekran yenileme çözümü." },
    ],
    specTag: "PIOCREAT C01 · LCD KIT",
    specTitleHtml: 'Üretimi kesmeden <span class="em">ekranı yenileyin.</span>',
    specDescriptionHtml: "Piocreat C01 LCD ekran kiti, cihazın baskı performansını korumak ve kararlı sonuçlar elde etmek için kullanılan yedek ekran çözümüdür.",
    specRows: [
      { label: "Cihaz", value: "Piocreat C01" },
      { label: "Parça", value: "LCD ekran kiti" },
      { label: "Kullanım", value: "Bakım / onarım" },
      { label: "Hedef", value: "Stabil baskı" },
      { label: "Kategori", value: "Yedek parça" },
    ],
    useCaseSideHtml: "Piocreat C01 LCD ekran kiti, ekran kaynaklı baskı performansı düşüşlerinde üretim sürekliliğini destekler.",
    useCasePhotos: [
      { title: "C01 ekran yenileme", text: "Cihazın LCD ekranını bakım sürecinde yenilemek için.", alt: "Piocreat C01 LCD ekran yenileme" },
      { title: "Stabil pozlama", text: "Daha net ve tutarlı baskı sonuçlarını destekler.", alt: "Piocreat C01 stabil pozlama" },
      { title: "Servis kontrolü", text: "Montaj sonrası test baskısı ve bağlantı kontrolü.", alt: "Piocreat C01 servis kontrolü" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["Piocreat C01 LCD ekran değişimi", "Baskı performansını koruma", "Ekran kaynaklı üretim kesintisini azaltma"] },
      { eyebrow: "Kurulum Notu", title: "Neye dikkat edilir?", items: ["Cihaz modeli satın alma öncesi doğrulanır", "Bağlantılar ve ekran yüzeyi temiz tutulur", "Montaj sonrası test baskısı yapılır"] },
    ],
    devicesTitle: "Piocreat C01 ile çalışır",
    devicesTextHtml: "Piocreat C01 3D yazıcı için listelenen LCD ekran kitidir. Satın alma öncesi cihaz modelini birlikte doğrulayabiliriz.",
    deviceChips: [{ label: "Piocreat C01" }, { label: "LCD ekran" }, { label: "Yedek parça" }, { label: "Uyumluluk kontrolü", highlighted: true }],
    ecosystemTitleHtml: 'LCD değişimiyle <span class="em">üretim ritmi korunur.</span>',
    ecosystemTextHtml: "Ekran yenileme, temiz montaj ve ilk test baskısı birlikte planlandığında C01 üretim akışı daha güvenli devam eder.",
    ecosystemChips: ["LCD ekran", "C01 uyumu", "Test baskısı", "Teknik destek"],
    faqItems: [
      { question: "Bu ürün hangi cihaz için?", answerHtml: "Piocreat C01 3D yazıcı için LCD ekran kiti olarak listelenir." },
      { question: "Ne zaman değiştirilir?", answerHtml: "Ekran kaynaklı baskı performansı düşüşü veya ekran hasarı olduğunda değişim değerlendirilir." },
      { question: "Kurulum desteği var mı?", answerHtml: "Cihaz modeli ve montaj adımları için teknik destek alınabilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: 'C01 servis akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "Piocreat C01 ekran değişimi ve dental LCD yazıcı bakım akışını video üzerinden değerlendirin.",
    videoTitle: "Piocreat C01 LCD ekran kiti",
    videoText: "LCD ekran, pozlama ve test baskısı kontrollerine odaklanan bakım akışı.",
  },
  {
    slug: ACF_FEP_FILM_SLUG,
    productText: "Şeffaf ACF Film",
    kicker: "LCD/DLP Reçine Yazıcılar · Şeffaf ACF Film",
    titleHtml: 'Katman ayrımı <span class="em">film yüzeyinde</span> başlar.',
    leadHtml:
      "Şeffaf ACF Film, LCD ve DLP reçine 3D yazıcılarda baskı haznesinin alt yüzeyinde kullanılan sarf malzemedir. UV ışığın reçineye dengeli iletilmesini ve stabil katman oluşumunu destekler.",
    pills: [{ label: "LCD / DLP" }, { label: "ACF Film" }, { label: "Mavi koruyucu jelatin" }, { label: "Pürüzsüz + mat yüzey" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/43979b0b-5e26-4b8e-a0e1-f751a3929374/1080/acf-fep-film.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6d2e75a0-c8f4-4e2f-9d09-7811ff446084/1080/acf-fep-film1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8e64b47c-8d24-4979-9be3-cc183a94b88e/1080/acf-fep-film2.webp",
    ],
    galleryBadge: "ACF FILM",
    summarySubject: "ACF film",
    metricTitleHtml: 'UV geçişi ve <span class="em">katman stabilitesi.</span>',
    metricSideHtml: "Film yüzeyi, reçine baskıda ışık iletimi ve katman ayrımı için kritik sarf parçasıdır.",
    metrics: [
      { name: "Uyum", value: "LCD", unit: "/ DLP", tag: "Reçine", caption: "LCD ve DLP teknolojisine sahip reçine 3D yazıcılarda kullanılır." },
      { name: "Yüzey", value: "2", unit: "tip", tag: "Mat + düz", caption: "Bir yüzeyi pürüzsüz, diğer yüzeyi mat formdadır." },
      { name: "Koruma", value: "Mavi", unit: "jelatin", tag: "Kurulum", caption: "Ürün mavi koruyucu jelatin ile gönderilir; kullanım öncesi çıkarılır." },
    ],
    specTag: "ACF FILM · LCD / DLP · SARF",
    specTitleHtml: 'Tank tabanında <span class="em">kontrollü katman oluşumu.</span>',
    specDescriptionHtml: "ACF Film, UV ışığın reçineye dengeli iletilmesine yardımcı olur. Kurulumda pürüzsüz yüzeyin reçineyle temas edecek şekilde yerleştirilmesi önerilir.",
    specRows: [
      { label: "Teknoloji", value: "LCD / DLP" },
      { label: "Parça", value: "Tank filmi" },
      { label: "Yüzey", value: "Pürüzsüz + mat" },
      { label: "Koruma", value: "Mavi jelatin" },
      { label: "Kullanım", value: "Sarf malzeme" },
    ],
    useCaseSideHtml: "Tank filmi değişimi, reçine baskıda yüzey performansı ve katman ayrımı için düzenli bakım adımıdır.",
    useCasePhotos: [
      { imageIndex: 2, title: "Tank filmi değişimi", text: "Baskı haznesinin alt yüzeyinde kullanılan sarf film.", alt: "ACF film tank filmi değişimi" },
      { imageIndex: 3, title: "UV ışık geçişi", text: "Reçineye dengeli ışık iletimini destekler.", alt: "ACF film UV ışık geçişi" },
      { imageIndex: 3, title: "Yüzey kontrolü", text: "Pürüzsüz ve mat yüzey yönü kurulumda kontrol edilir.", alt: "ACF film yüzey kontrolü" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["LCD/DLP reçine yazıcı tank tabanı", "Stabil katman oluşumu", "UV ışık iletiminin korunması"] },
      { eyebrow: "Kurulum Notu", title: "Nasıl yerleştirilir?", items: ["Mavi koruyucu jelatin kullanım öncesi çıkarılır", "Pürüzsüz yüzey reçineyle temas edecek şekilde yerleştirilir", "Film gerginliği ve tank temizliği kontrol edilir"] },
    ],
    devicesTitle: "LCD & DLP reçine yazıcılarla çalışır",
    devicesTextHtml: "LCD ve DLP teknolojisine sahip reçine 3D yazıcılarda tank filmi olarak kullanılır. Ölçü ve tank uyumunu satın alma öncesi kontrol edin.",
    deviceChips: [{ label: "LCD reçine yazıcı" }, { label: "DLP reçine yazıcı" }, { label: "Tank filmi" }, { label: "Ölçü kontrolü", highlighted: true }],
    ecosystemTitleHtml: 'Film değişimi, <span class="em">baskı güvenilirliğini korur.</span>',
    ecosystemTextHtml: "Tank filmi, reçine tankı, LCD ekran yüzeyi ve pozlama ayarı birlikte kontrol edildiğinde baskı hataları daha kolay azaltılır.",
    ecosystemChips: ["ACF Film", "Reçine tankı", "LCD ekran", "Pozlama testi"],
    faqItems: [
      { question: "ACF Film nerede kullanılır?", answerHtml: "LCD ve DLP reçine 3D yazıcılarda baskı haznesinin alt yüzeyinde kullanılır." },
      { question: "Koruyucu jelatin çıkarılmalı mı?", answerHtml: "Evet. Ürün mavi koruyucu jelatinle gönderilir ve kullanım öncesi jelatin çıkarılmalıdır." },
      { question: "Hangi yüzey reçineyle temas etmeli?", answerHtml: "Kurulum sırasında pürüzsüz yüzeyin reçine ile temas edecek şekilde yerleştirilmesi önerilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: 'Film bakım akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "LCD/DLP reçine yazıcılarda tank filmi ve baskı bakım akışını video üzerinden değerlendirin.",
    videoTitle: "ACF Film ve reçine tankı bakım akışı",
    videoText: "Tank filmi, yüzey yönü ve baskı stabilitesi kontrollerine odaklanan bakım içeriği.",
  },
  {
    slug: MASH_P16L_MAINBOARD_SLUG,
    productText: "MASH P16L Ana Kart",
    kicker: "MASH P16L · Kontrol Kartı",
    titleHtml: 'P16L kontrolü <span class="em">ana kartta</span> birleşir.',
    leadHtml:
      "MASH P16L Ana Kart, cihazın elektronik kontrol süreçlerini yöneten merkezi bileşendir. Motor kontrolü, sensör yönetimi ve veri iletişimi gibi kritik görevlerde bakım ve onarım amacıyla kullanılır.",
    pills: [{ label: "MASH P16L uyumlu" }, { label: "Kontrol kartı" }, { label: "Motor & sensör yönetimi" }, { label: "Bakım / onarım" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c9594235-74c3-4f06-9b83-84028ecc7716/1080/mash-p16l-ana-kart-kontrol-karti.webp"],
    summarySubject: "ana kart",
    metricTitleHtml: 'Elektronik kontrolün <span class="em">merkezi parçası.</span>',
    metricSideHtml: "Ana kart değişiminde cihaz revizyonu, bağlantılar ve servis kurulumu kritik kontrollerdir.",
    metrics: [
      { name: "Parça Tipi", value: "Ana", unit: "Kart", tag: "Kontrol", caption: "P16L cihazının merkezi elektronik kontrol bileşeni." },
      { name: "Görev", value: "Motor", unit: "+ sensör", tag: "I/O", caption: "Motor kontrolü, sensör yönetimi ve veri iletişimi süreçlerini yönetir." },
      { name: "Kullanım", value: "Bakım", unit: "/ onarım", tag: "Servis", caption: "Teknik servis, bakım ve arıza durumlarında değişim amacıyla kullanılır." },
    ],
    specTag: "MASH P16L · MAINBOARD · SERVICE",
    specTitleHtml: 'Motor, sensör ve iletişim <span class="em">tek kartta.</span>',
    specDescriptionHtml: "MASH P16L Ana Kart, cihazın farklı bileşenleriyle modüler şekilde çalışır. Değişim öncesi arıza teşhisi ve bağlantı uyumu kontrol edilmelidir.",
    specRows: [
      { label: "Cihaz", value: "MASH P16L" },
      { label: "Parça", value: "Ana kart" },
      { label: "Görev", value: "Kontrol yönetimi" },
      { label: "Kullanım", value: "Bakım / onarım" },
      { label: "Kategori", value: "Yedek parça" },
    ],
    useCaseSideHtml: "Ana kart değişimi, elektronik kontrol ve bağlantı kaynaklı servis süreçlerinde değerlendirilir.",
    useCasePhotos: [
      { title: "Elektronik kontrol", text: "Motor, sensör ve veri iletişimi süreçlerinin merkezi.", alt: "MASH P16L ana kart elektronik kontrol" },
      { title: "Servis değişimi", text: "Arıza teşhisi sonrası bakım/onarım için kullanılır.", alt: "MASH P16L ana kart servis değişimi" },
      { title: "Bağlantı kontrolü", text: "Modüler bağlantı noktaları montajda doğrulanır.", alt: "MASH P16L ana kart bağlantı kontrolü" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne zaman değerlendirilir?", items: ["Elektronik kontrol arızalarında", "Motor veya sensör yönetimi hatalarında", "Teknik servis bakım/onarım sürecinde"] },
      { eyebrow: "Servis Notu", title: "Neler kontrol edilir?", items: ["Cihaz revizyonu ve kart uyumu", "Kablo/soket bağlantıları", "Değişim sonrası hareket ve sensör testleri"] },
    ],
    devicesTitle: "MASH P16L ile çalışır",
    devicesTextHtml: "MASH P16L cihazının ana kontrol kartıdır. Değişim öncesi arıza belirtisini ve cihaz revizyonunu birlikte kontrol etmek gerekir.",
    deviceChips: [{ label: "MASH P16L" }, { label: "Ana kart" }, { label: "Motor / sensör" }, { label: "Servis kontrolü", highlighted: true }],
    ecosystemTitleHtml: 'Ana kart değişimi, <span class="em">servis teşhisiyle</span> yapılmalı.',
    ecosystemTextHtml: "Kontrol kartı değişiminde güç bağlantısı, motor çıkışları, sensör girişleri ve ilk çalışma testi birlikte ele alınır.",
    ecosystemChips: ["Ana kart", "Bağlantı kontrolü", "Sensör testi", "Teknik servis"],
    faqItems: [
      { question: "MASH P16L Ana Kart ne işe yarar?", answerHtml: "Cihazın elektronik kontrol süreçlerini yöneten merkezi bileşendir." },
      { question: "Hangi durumlarda değiştirilir?", answerHtml: "Teknik servis, bakım ve arıza durumlarında değişim amacıyla kullanılabilir." },
      { question: "Satın almadan önce ne kontrol edilmeli?", answerHtml: "Cihaz modeli, arıza belirtisi ve kart bağlantı uyumu kontrol edilmelidir." },
    ],
    videoTitleHtml: 'Ana kart değişimini <span class="em">uzmanla planlayın.</span>',
    videoSideHtml: "Ana kart değişimi için arıza belirtisini ve bağlantı uyumunu birlikte değerlendirelim.",
    videoTitle: "MASH P16L ana kart teknik destek",
    videoText: "Kontrol kartı değişimi, bağlantı kontrolü ve servis adımları için teknik destek alın.",
  },
  {
    slug: MASH_P16L_LARGE_BUILD_PLATE_SLUG,
    productText: "MASH P16L Büyük Baskı Tablası",
    kicker: "MASH P16L · 211x118 mm Büyük Baskı Tablası",
    titleHtml: 'Yüksek hacimli üretim <span class="em">standart tabla</span> ile akar.',
    leadHtml:
      "MASH P16L 3D yazıcının standart baskı tablası, yüksek hacimli dental üretimlerde stabilite ve yüzey kalitesi için tasarlanmıştır. 385 nm ışık kaynağıyla optimize edilmiş 211x118 mm baskı alanı sunar.",
    pills: [{ value: "211x118", label: "mm baskı alanı" }, { value: "385", label: "nm uyumlu" }, { label: "Büyük tabla" }, { label: "Dental üretim" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/588256f3-53a6-4f64-99ed-5428c3bbcaca/1080/masp16l-tabla.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a225b4ad-bd60-42e5-80da-6df960d9604f/1080/mash-p16l-building-plate.webp",
    ],
    galleryBadge: "211x118 mm",
    summarySubject: "büyük baskı tablası",
    metricTitleHtml: 'Geniş alanda <span class="em">stabil tutunma.</span>',
    metricSideHtml: "Baskı tablasında yüzey tutunması, ölçü ve 385 nm P16L uyumu birlikte değerlendirilir.",
    metrics: [
      { name: "Baskı Alanı", value: "211x118", unit: "mm", tag: "P16L", caption: "Tek seferde çok sayıda dental restorasyon üretimi için geniş tabla alanı." },
      { name: "Işık Uyumu", value: "385", unit: "nm", tag: "P16L", caption: "MASH P16L 385 nm ışık sistemiyle optimize edilmiş yapı." },
      { name: "Kullanım", value: "Yüksek", unit: "hacim", tag: "Dental", caption: "Yoğun laboratuvar üretiminde stabil baskı akışını destekler." },
    ],
    specTag: "MASH P16L · BUILD PLATE · 211x118 mm",
    specTitleHtml: 'Çoklu vaka üretiminde <span class="em">geniş yüzey.</span>',
    specDescriptionHtml: "Büyük baskı tablası, MASH P16L ile yüksek hacimli dental üretimlerde yüzey tutunması ve boyutsal doğruluğu desteklemek için kullanılır.",
    specRows: [
      { label: "Cihaz", value: "MASH P16L" },
      { label: "Ölçü", value: "211x118 mm" },
      { label: "Işık sistemi", value: "385 nm" },
      { label: "Kullanım", value: "Yüksek hacim" },
      { label: "Parça", value: "Baskı tablası" },
    ],
    useCaseSideHtml: "Büyük baskı tablası, yüksek hacimli dental üretim ve çoklu restorasyon baskıları için kullanılır.",
    useCasePhotos: [
      { imageIndex: 2, title: "Çoklu üretim", text: "Aynı baskıda daha fazla dental parça için geniş alan.", alt: "MASH P16L büyük baskı tablası çoklu üretim" },
      { imageIndex: 2, title: "Yüzey tutunması", text: "Baskı sırasında stabil tutunma ve güvenli ayrılma.", alt: "MASH P16L büyük baskı tablası yüzey tutunması" },
      { imageIndex: 2, title: "Laboratuvar akışı", text: "Yoğun üretimde standart tabla ritmini korur.", alt: "MASH P16L büyük baskı tablası laboratuvar akışı" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["Çoklu dental restorasyon baskıları", "Yüksek hacimli laboratuvar üretimi", "Standart P16L tabla değişimi"] },
      { eyebrow: "Kurulum Notu", title: "Neler kontrol edilir?", items: ["Tabla yüzeyi temizliği", "Platform hizalama/kalibrasyon", "İlk baskıda tutunma davranışı"] },
    ],
    devicesTitle: "MASH P16L ile çalışır",
    devicesTextHtml: "MASH P16L 385 nm dental 3D yazıcının büyük/standart baskı tablasıdır. Tabla yüzeyi ve hizalama ayarı kurulumda birlikte kontrol edilmelidir.",
    deviceChips: [{ label: "MASH P16L" }, { label: "211x118 mm" }, { label: "385 nm" }, { label: "Tabla kalibrasyonu", highlighted: true }],
    ecosystemTitleHtml: 'Tabla yüzeyi, <span class="em">baskı başarısını belirler.</span>',
    ecosystemTextHtml: "Baskı tablası, reçine tankı, ACF/FEP filmi ve ilk katman ayarları birlikte değerlendirildiğinde üretim güvenilirliği artar.",
    ecosystemChips: ["Baskı tablası", "Reçine tankı", "ACF Film", "İlk katman"],
    faqItems: [
      { question: "Ölçüsü nedir?", answerHtml: "MASH P16L büyük baskı tablası 211x118 mm baskı alanı için listelenir." },
      { question: "Hangi cihazla uyumlu?", answerHtml: "MASH P16L 385 nm dental 3D yazıcıyla uyumludur." },
      { question: "Kurulum sonrası ne yapılmalı?", answerHtml: "Platform hizalaması ve ilk test baskısı kontrol edilmelidir." },
    ],
    videoTitleHtml: 'Tabla kurulumunu <span class="em">uzmanla kontrol edin.</span>',
    videoSideHtml: "Baskı tablası değişimi ve ilk katman ayarı için teknik destek alın.",
    videoTitle: "MASH P16L büyük baskı tablası kurulumu",
    videoText: "Tabla yüzeyi, hizalama ve test baskısı adımlarını birlikte netleştirin.",
  },
  {
    slug: MASH_P16L_SMALL_BUILD_PLATE_SLUG,
    productText: "MASH P16L Küçük Baskı Tablası",
    kicker: "MASH P16L · Hızlı Baskı & Tekli Vaka Tablası",
    titleHtml: 'Acil vaka için <span class="em">küçük tabla</span> hız kazandırır.',
    leadHtml:
      "MASH P16L Küçük Baskı Tablası, 385 nm ışık sistemiyle uyumludur. Acil vakalar ve tekli üye üretimleri için optimize edilmiş yüzey alanı, emiş gücünü azaltarak hassas dental parçalarda hız ve başarı oranını destekler.",
    pills: [{ label: "Tekli vaka" }, { label: "Hızlı baskı" }, { value: "385", label: "nm uyumlu" }, { label: "Düşük emiş gücü" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c03e04d3-c93b-4d75-b3a0-867bcf4706b9/1080/mash-p16l-kucuk-baski-tablasi.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/838e703c-5e9f-43be-9c56-bf912454a660/1080/mash-p16l-kucuk-baski-tablasi.webp",
    ],
    galleryBadge: "FAST PLATE",
    summarySubject: "küçük baskı tablası",
    metricTitleHtml: 'Tekli vakada <span class="em">hızlı ve kontrollü</span> baskı.',
    metricSideHtml: "Küçük tabla, acil dental vakalarda yüzey alanını azaltarak baskı sürecini hızlandırmaya odaklanır.",
    metrics: [
      { name: "Kullanım", value: "Tekli", unit: "vaka", tag: "Hızlı", caption: "Acil vakalar ve tekli üye üretimleri için optimize edilmiştir." },
      { name: "Işık Uyumu", value: "385", unit: "nm", tag: "P16L", caption: "MASH P16L 385 nm ışık sistemiyle tam uyumlu yapı." },
      { name: "Baskı Davranışı", value: "Düşük", unit: "emiş", tag: "Kontrol", caption: "Küçük yüzey alanı, baskı sırasındaki emiş gücünü azaltmaya yardımcı olur." },
    ],
    specTag: "MASH P16L · FAST BUILD PLATE",
    specTitleHtml: 'Acil üretimde <span class="em">küçük yüzey avantajı.</span>',
    specDescriptionHtml: "Küçük baskı tablası, tekli üye ve acil dental üretimlerde hızlı iş akışı için kullanılır. Daha küçük yüzey alanı emiş gücünü azaltmaya yardımcı olur.",
    specRows: [
      { label: "Cihaz", value: "MASH P16L" },
      { label: "Işık sistemi", value: "385 nm" },
      { label: "Kullanım", value: "Tekli vaka" },
      { label: "Avantaj", value: "Hızlı baskı" },
      { label: "Parça", value: "Baskı tablası" },
    ],
    useCaseSideHtml: "Küçük baskı tablası, acil tekli vakalarda baskı süresini ve emiş davranışını yönetmek için kullanılır.",
    useCasePhotos: [
      { imageIndex: 2, title: "Tekli vaka", text: "Acil dental üretimlerde küçük yüzeyle hızlı iş akışı.", alt: "MASH P16L küçük baskı tablası tekli vaka" },
      { imageIndex: 3, title: "Hassas parçalar", text: "Daha kontrollü emiş davranışı hassas baskıları destekler.", alt: "MASH P16L küçük baskı tablası hassas parçalar" },
      { imageIndex: 3, title: "Hızlı değişim", text: "Tekli üretim için pratik tabla kullanımı.", alt: "MASH P16L küçük baskı tablası hızlı değişim" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["Acil tekli vaka üretimi", "Tekli üye ve küçük dental parçalar", "Baskı sırasında emiş gücünü azaltma"] },
      { eyebrow: "Kurulum Notu", title: "Neler kontrol edilir?", items: ["Tabla yüzeyi temizliği", "Platform hizalama ayarı", "İlk katman tutunma davranışı"] },
    ],
    devicesTitle: "MASH P16L ile çalışır",
    devicesTextHtml: "MASH P16L 385 nm cihazda tekli ve hızlı dental üretim için kullanılan küçük baskı tablasıdır.",
    deviceChips: [{ label: "MASH P16L" }, { label: "Tekli vaka" }, { label: "385 nm" }, { label: "Hızlı iş akışı", highlighted: true }],
    ecosystemTitleHtml: 'Küçük tabla, <span class="em">acil vaka akışını</span> hızlandırır.',
    ecosystemTextHtml: "Tekli vaka üretiminde tabla yüzeyi, reçine, tank filmi ve ilk katman ayarı birlikte kontrol edilmelidir.",
    ecosystemChips: ["Küçük tabla", "Tekli vaka", "İlk katman", "Teknik destek"],
    faqItems: [
      { question: "Küçük baskı tablası ne için kullanılır?", answerHtml: "Acil vakalar ve tekli üye üretimleri için optimize edilmiş MASH P16L baskı tablasıdır." },
      { question: "385 nm ile uyumlu mu?", answerHtml: "Evet. MASH P16L 385 nm ışık sistemiyle uyumlu olarak listelenir." },
      { question: "Neden küçük tabla tercih edilir?", answerHtml: "Küçültülmüş yüzey alanı emiş gücünü azaltmaya ve hızlı tekli üretimi desteklemeye yardımcı olur." },
    ],
    videoTitleHtml: 'Tekli vaka akışını <span class="em">uzmanla planlayın.</span>',
    videoSideHtml: "Küçük tabla kurulumu ve hızlı baskı parametreleri için teknik destek alın.",
    videoTitle: "MASH P16L küçük baskı tablası kurulumu",
    videoText: "Tekli vaka, platform hizalama ve ilk katman kontrolünü birlikte netleştirin.",
  },
  {
    slug: MASH_P16L_LCD_SCREEN_SLUG,
    productText: "MASH P16L 16K Monokrom LCD Ekran",
    kicker: "MASH P16L · 16K UHD Monokrom LCD",
    titleHtml: '16K detay seviyesi <span class="em">LCD ekranda</span> başlar.',
    leadHtml:
      "MASH P16L 16K UHD Monokrom LCD ekran, 385 nm UV ışık kaynağıyla senkronize çalışır. %12 artırılmış ışık geçirgenliği, 14x19 mikron hassasiyet ve 100°C ısı direnciyle dental üretimde yüksek detay seviyesini destekler.",
    pills: [{ value: "16K", label: "UHD Mono LCD" }, { value: "9.6 inç", label: "ekran" }, { value: "14x19 μm", label: "hassasiyet" }, { value: "100°C", label: "ısı direnci" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/25a9f313-f298-4a05-98ff-1a5ec1773515/1080/mashp16l-lcd-ekran.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0aff5337-c988-4acc-9085-c7273a837969/1080/mashp16l-lcd-ekran3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b171da53-9384-42d2-9df4-732bb10db40f/1080/mashp16l-lcd-ekran2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/93ac1e20-8bc4-457b-af02-0ccc2a1c773c/1080/mashp16l-lcd-ekran1.webp",
    ],
    galleryBadge: "16K UHD",
    summarySubject: "16K LCD ekran",
    metricTitleHtml: 'Mikron detay için <span class="em">16K monokrom LCD.</span>',
    metricSideHtml: "P16L ekran değişiminde çözünürlük, ışık geçirgenliği ve 385 nm uyumu kritik teknik değerlerdir.",
    metrics: [
      { name: "Çözünürlük", value: "16K", unit: "UHD", tag: "Mono LCD", caption: "Dental restorasyonlarda yüksek detay aktarımı için monokrom LCD ekran." },
      { name: "Hassasiyet", value: "14x19", unit: "μm", tag: "Piksel", caption: "Mikroskobik doğruluk ve yüzey kalitesini destekleyen piksel hassasiyeti." },
      { name: "Isı Direnci", value: "100", unit: "°C", tag: "LCD", caption: "Dental üretim sürecinde ısıya dayanıklı ekran yapısı." },
    ],
    specTag: "MASH P16L · 16K LCD · 385 nm",
    specTitleHtml: 'Yüksek geçirgenlik, <span class="em">net yüzey kalitesi.</span>',
    specDescriptionHtml: "%12 artırılmış ışık geçirgenliği ve 385 nm UV ışık uyumu, MASH P16L ekran değişiminde detay ve yüzey kalitesini destekler.",
    specRows: [
      { label: "Cihaz", value: "MASH P16L" },
      { label: "Ekran", value: "16K UHD Mono LCD" },
      { label: "Boyut", value: "9.6 inç" },
      { label: "Hassasiyet", value: "14x19 μm" },
      { label: "Işık", value: "385 nm" },
    ],
    useCaseSideHtml: "P16L 16K LCD ekran, dental üretimde yüksek detay ve stabil pozlama için kullanılan ana yedek parçadır.",
    useCasePhotos: [
      { imageIndex: 2, title: "16K ekran değişimi", text: "Yüksek detay seviyesi için LCD ekran yenileme.", alt: "MASH P16L 16K LCD ekran değişimi" },
      { imageIndex: 3, title: "Dental hassasiyet", text: "14x19 mikron detay seviyesini destekler.", alt: "MASH P16L 16K dental hassasiyet" },
      { imageIndex: 4, title: "Pozlama stabilitesi", text: "385 nm ışık sistemiyle senkronize çalışma.", alt: "MASH P16L LCD pozlama stabilitesi" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["P16L LCD ekran değişimi", "Dental restorasyonlarda yüksek detay üretimi", "Ekran kaynaklı pozlama kaybını gidermek"] },
      { eyebrow: "Kurulum Notu", title: "Neler kontrol edilir?", items: ["Ekran yüzeyi ve bağlantı soketleri", "385 nm ışık kaynağı ve pozlama testi", "Reçine tankı filmi ve ilk test baskısı"] },
    ],
    devicesTitle: "MASH P16L ile çalışır",
    devicesTextHtml: "MASH P16L 385 nm 16K dental 3D yazıcı için monokrom LCD ekran yedek parçasıdır.",
    deviceChips: [{ label: "MASH P16L" }, { label: "16K UHD" }, { label: "385 nm" }, { label: "14x19 μm", highlighted: true }],
    ecosystemTitleHtml: 'Ekran, tank filmi ve pozlama <span class="em">birlikte kontrol edilir.</span>',
    ecosystemTextHtml: "LCD ekran değişiminden sonra ACF/FEP film, reçine tankı, ekran yüzeyi ve test pozlaması birlikte kontrol edildiğinde detay seviyesi korunur.",
    ecosystemChips: ["16K LCD", "ACF Film", "Reçine tankı", "Pozlama testi"],
    faqItems: [
      { question: "Ekran boyutu nedir?", answerHtml: "MASH P16L 16K monokrom LCD ekran 9.6 inç olarak listelenir." },
      { question: "Hangi ışık sistemiyle uyumlu?", answerHtml: "385 nm UV ışık kaynağı ile uyumlu çalışır." },
      { question: "Isı direnci nedir?", answerHtml: "Ürün açıklamasında 100°C ısı dirençli LCD ekran olarak belirtilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: '16K ekran akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "MASH P16L LCD ekran değişimi ve baskı kontrol akışını video üzerinden değerlendirin.",
    videoTitle: "MASH P16L 16K LCD ekran",
    videoText: "16K LCD, pozlama testi ve dental üretim hassasiyeti kontrollerine odaklanan video.",
  },
  {
    slug: MASH_P16L_RESIN_TANK_SLUG,
    productText: "MASH P16L Reçine Tankı",
    kicker: "MASH P16L · 800 ml Alüminyum Reçine Tankı",
    titleHtml: 'Reçine akışı <span class="em">tankta</span> güvenceye alınır.',
    leadHtml:
      "MASH P16L alüminyum reçine tankı, 800 ml maksimum kapasite, vidasız hızlı kilit mekanizması ve dahili ısıtma sistemiyle entegre yapısıyla hassas dental üretim iş akışını destekler.",
    pills: [{ value: "800", label: "ml kapasite" }, { label: "Alüminyum tank" }, { label: "Hızlı kilit" }, { label: "Isıtma uyumlu" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0bb3ef3d-0297-4119-96c3-5bb899f82e5f/1080/mash-p16l-orijinal-recine-tanki1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/521a8f06-ba96-4122-ada9-64e0b6d06f46/1080/mash-p16l-orijinal-recine-tanki2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1b694a64-1ef3-47c4-9930-bc937f35f59c/1080/mash-p16l-orijinal-recine-tanki3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/15572ae9-48fc-477c-bd59-b8492b2d9f23/1080/mash-p16l-orijinal-recine-tanki4.webp",
    ],
    galleryBadge: "800 ml",
    summarySubject: "reçine tankı",
    metricTitleHtml: 'Tank kapasitesi ve <span class="em">hızlı kilit</span> iş akışı.',
    metricSideHtml: "Reçine tankında kapasite, kilit mekanizması ve ısıtma sistemi uyumu üretim güvenilirliği için birlikte değerlendirilir.",
    metrics: [
      { name: "Kapasite", value: "800", unit: "ml", tag: "Maksimum", caption: "Hassas dental üretim için geniş reçine kapasitesi." },
      { name: "Gövde", value: "Alüminyum", unit: "", tag: "Tank", caption: "P16L ile uyumlu alüminyum reçine tankı yapısı." },
      { name: "Kilit", value: "Hızlı", unit: "sistem", tag: "Vidasız", caption: "Vidasız hızlı kilit mekanizması iş akışını hızlandırır." },
    ],
    specTag: "MASH P16L · RESIN VAT · 800 ml",
    specTitleHtml: 'Tank, film ve ısıtma <span class="em">aynı akışta.</span>',
    specDescriptionHtml: "MASH P16L reçine tankı; 800 ml kapasite, hızlı kilit sistemi ve dahili ısıtma sistemiyle entegre yapı sunar. UV korumalı kapak avantajıyla listelenir.",
    specRows: [
      { label: "Cihaz", value: "MASH P16L" },
      { label: "Kapasite", value: "800 ml" },
      { label: "Gövde", value: "Alüminyum" },
      { label: "Kilit", value: "Vidasız hızlı kilit" },
      { label: "Uyum", value: "Isıtma sistemi" },
    ],
    useCaseSideHtml: "P16L reçine tankı, dental üretimde reçine hacmi, film değişimi ve hızlı tank kullanımı için temel yedek parçadır.",
    useCasePhotos: [
      { imageIndex: 2, title: "800 ml tank", text: "Dental üretim için geniş reçine kapasitesi.", alt: "MASH P16L reçine tankı 800 ml" },
      { imageIndex: 3, title: "Hızlı kilit", text: "Vidasız mekanizma iş akışını hızlandırır.", alt: "MASH P16L reçine tankı hızlı kilit" },
      { imageIndex: 4, title: "Film değişimi", text: "Tank filmi ve tank yüzeyi birlikte kontrol edilir.", alt: "MASH P16L reçine tankı film değişimi" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım Alanları", title: "Ne için kullanılır?", items: ["MASH P16L reçine tankı değişimi", "800 ml reçine kapasitesiyle dental üretim", "Film değişimi ve tank bakım süreçleri"] },
      { eyebrow: "Kurulum Notu", title: "Neler kontrol edilir?", items: ["Tank yüzeyi ve film gerginliği", "Hızlı kilit mekanizması", "Isıtma sistemiyle temas ve uyum"] },
    ],
    devicesTitle: "MASH P16L ile çalışır",
    devicesTextHtml: "MASH P16L cihazının alüminyum reçine tankıdır. Film, kapak ve ısıtma sistemi uyumu kurulumda birlikte kontrol edilmelidir.",
    deviceChips: [{ label: "MASH P16L" }, { label: "800 ml" }, { label: "Alüminyum tank" }, { label: "Isıtma uyumu", highlighted: true }],
    ecosystemTitleHtml: 'Tank değişimi, <span class="em">film ve pozlama kontrolüyle</span> tamamlanır.',
    ecosystemTextHtml: "Reçine tankı, ACF/FEP film, LCD ekran ve baskı tablası birlikte kontrol edildiğinde P16L üretim akışı daha güvenli ilerler.",
    ecosystemChips: ["Reçine tankı", "ACF Film", "LCD ekran", "Baskı tablası"],
    faqItems: [
      { question: "Kapasitesi nedir?", answerHtml: "MASH P16L reçine tankı 800 ml maksimum kapasiteyle listelenir." },
      { question: "Isıtma sistemiyle uyumlu mu?", answerHtml: "Evet. Ürün açıklamasında dahili ısıtma sistemiyle entegre yapı olarak belirtilir." },
      { question: "Kurulumda ne kontrol edilmeli?", answerHtml: "Tank filmi, hızlı kilit mekanizması, tank yüzeyi ve ısıtma sistemi uyumu kontrol edilmelidir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: 'Tank bakım akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "MASH P16L reçine tankı, film değişimi ve baskı kontrol akışını video üzerinden değerlendirin.",
    videoTitle: "MASH P16L reçine tankı",
    videoText: "Tank, film, hızlı kilit ve test baskısı kontrollerine odaklanan bakım akışı.",
  },
];

export const PRINTER_SPARE_PART_DETAIL_DATA_BY_SLUG: Record<string, ProductDetailTemplateData> = Object.fromEntries(
  PRINTER_SPARE_PART_CONFIGS.map((config) => [config.slug, printerSparePartDetail(config)]),
);

const PRINTER_SPARE_PART_ALIASES: Record<string, string[]> = {
  [CREALITY_HALOT_SKY_LCD_KIT_SLUG]: ["creality-halot-sky-lcd-ekran-kiti", "halot-sky-lcd-ekran-kiti", "6k-mono-lcd-ekran-kiti"],
  [PIOCREAT_C01_LCD_KIT_SLUG]: ["piocreat-c01-lcd-ekran-kiti", "c01-lcd-ekran-kiti"],
  [ACF_FEP_FILM_SLUG]: ["seffaf-acf-film", "acf-film", "fep-film", "lcd-dlp-recine-3d-yazicilar-icin", "seffaf-fep-film"],
  [MASH_P16L_MAINBOARD_SLUG]: ["mash-p16l-ana-kart", "p16l-ana-kart", "kontrol-karti"],
  [MASH_P16L_LARGE_BUILD_PLATE_SLUG]: ["mash-p16l-buyuk-baski-tablasi", "211x118mm", "211x118-mm", "p16l-buyuk-baski-tablasi"],
  [MASH_P16L_SMALL_BUILD_PLATE_SLUG]: ["mash-p16l-kucuk-baski-tablasi", "mash-p16l-kucuk-hizli-baski-tablasi", "hizli-baski", "tekli-vaka"],
  [MASH_P16L_LCD_SCREEN_SLUG]: ["mash-p16l-16k-monokrom-lcd-ekran", "p16l-16k-lcd", "p16l-lcd-ekran"],
  [MASH_P16L_RESIN_TANK_SLUG]: ["mash-p16l-recine-tanki", "p16l-recine-tanki", "800ml", "800-ml"],
};

type ZirconBlockConfig = {
  slug: string;
  productText: string;
  kicker: string;
  titleHtml: string;
  leadHtml: string;
  pills: Array<{ label: string; value?: string }>;
  images: string[];
  videoHref: string;
  metricTitleHtml: string;
  metricSideHtml: string;
  metrics: Array<{ name: string; value: string; unit?: string; tag?: string; caption: string }>;
  specTag: string;
  specTitleHtml: string;
  specDescriptionHtml: string;
  specRows: Array<{ label: string; value: string }>;
  useCaseSideHtml: string;
  useCasePhotos: Array<{ imageIndex?: number; title: string; text: string; alt: string }>;
  indicationItems: string[];
  processItems: string[];
  deviceChips: Array<{ label: string; highlighted?: boolean }>;
  faqItems: Array<{ question: string; answerHtml: string }>;
};

const ZIRCON_CATEGORY = {
  text: "Zirkon Bloklar",
  href: "/zirkon-bloklar",
};

function zirconPhotoSrc(config: ZirconBlockConfig, index: number | undefined) {
  const usable = config.images.slice(1);
  if (usable.length) return usable[Math.min(Math.max((index || 1) - 2, 0), usable.length - 1)];
  return config.images[0] || "";
}

function zirconRelatedItems(currentSlug: string): NonNullable<ProductDetailTemplateData["related"]>["items"] {
  const all = [
    {
      tag: "ST ML",
      title: "ArgenZ ST Multilayer",
      descriptionHtml: "Doğal dentin geçişini taklit eden süper translüsent multilayer zirkonya disk.",
      href: `/${ARGENZ_ST_MULTILAYER_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#F0ECE2,#fff)",
    },
    {
      tag: "HT+",
      title: "ArgenZ HT+",
      descriptionHtml: "Yüksek translüsent plus yapı; dayanım, performans ve estetik dengesi.",
      href: `/${ARGENZ_HT_PLUS_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#EEF0F3,#fff)",
    },
    {
      tag: "HT+ ML",
      title: "ArgenZ HT+ Multilayer",
      descriptionHtml: "HT+ materyal dayanımıyla doğal dentin-mine geçişini birleştiren multilayer disk.",
      href: `/${ARGENZ_HT_MULTILAYER_SLUG}`,
      linkText: "İncele",
      background: "linear-gradient(160deg,#ECE7DB,#fff)",
    },
    {
      tag: "FIRIN",
      title: "Dental Fırınlar",
      descriptionHtml: "Zirkon sinterleme ve porselen/press akışları için uyumlu fırın seçenekleri.",
      href: "/dental-firinlar",
      linkText: "Fırınları gör",
      background: "linear-gradient(160deg,#F1F1EC,#fff)",
    },
  ];
  return all.filter((item) => item.href !== `/${currentSlug}`).slice(0, 4);
}

function zirconBlockDetail(config: ZirconBlockConfig): ProductDetailTemplateData {
  const gallery = normalizedGallery(config.images, config.productText);
  return {
    key: config.slug,
    announcement: {
      enabled: true,
      strongText: "Zirkon iş akışı.",
      longText: "Blok seçimi, kalınlık ve sinterleme akışını birlikte kontrol ederek doğru ArgenZ zirkonu seçiyoruz.",
      ctaText: "Vaka uyumunu kontrol et →",
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText: ZIRCON_CATEGORY.text,
      categoryHref: ZIRCON_CATEGORY.href,
      productText: config.productText,
    },
    hero: {
      kicker: config.kicker,
      titleHtml: config.titleHtml,
      leadHtml: config.leadHtml,
      pills: config.pills,
      galleryBadge: "ARGEN",
      gallery,
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "— vaka uyumu ve teknik destek dahil.",
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: "WhatsApp'tan sor",
      addToCartText: "Sepete ekle →",
      addingToCartText: "Ekleniyor...",
      outOfStockText: "Stok yok",
      trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
    },
    ratings: {
      index: "01",
      label: "Vaka Uygunluğu",
      titleHtml: 'Doğru zirkon, <span class="hl">endikasyona</span> göre seçilir.',
      sideHtml: "Zirkon blok seçiminde restorasyon tipi, estetik beklenti, köprü açıklığı ve sinterleme protokolü birlikte değerlendirilir.",
      panelTitleHtml: `${config.productText} için <span class="em">seçim kontrolü.</span>`,
      note: "Milling ve sinterleme öncesi kontrol edilen temel başlıklar.",
      items: [
        { descriptionHtml: "Vaka endikasyonu ve köprü açıklığı <b>materyal tipine</b> göre kontrol edilir." },
        { descriptionHtml: "Renk, kalınlık ve multilayer geçişi <b>estetik beklentiyle</b> eşleştirilir." },
        { descriptionHtml: "Sinterleme fırını ve freze iş akışı <b>blok parametreleriyle</b> birlikte doğrulanır." },
      ],
    },
    metrics: {
      index: "02",
      label: "Teknik Özellikler",
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: "Renk ve kalınlık seç →",
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: "Uygulama & Uyumluluk",
      titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
      sideHtml: config.useCaseSideHtml,
      photos: config.useCasePhotos.map((photo) => ({
        src: zirconPhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
      })),
      cards: [
        { eyebrow: "Endikasyon", title: "Hangi vakalarda?", items: config.indicationItems },
        { eyebrow: "İş Akışı", title: "Neler kontrol edilir?", items: config.processItems },
      ],
      devices: {
        eyebrow: "Uyumlu Sistemler",
        title: "Dental freze ve sinterleme akışıyla çalışır",
        textHtml:
          "ArgenZ zirkon bloklarda renk, kalınlık, frezeleme stratejisi ve sinterleme protokolü birlikte planlanmalıdır. Kullandığınız freze ve fırın akışını satın alma öncesi birlikte kontrol edebiliriz.",
        chips: config.deviceChips,
      },
    },
    ecosystem: {
      index: "04",
      label: "Laboratuvar Ekosistemi",
      titleHtml: 'Zirkon blok, <span class="em">freze ve fırınla</span> tamamlanır.',
      textHtml:
        "Doğru zirkon sonucu; blok seçimi, CAM stratejisi, sinterleme çevrimi ve finishing/glaze adımlarının birlikte yönetilmesiyle alınır. Kalınlık ve renk seçimini vaka planına göre birlikte netleştirebiliriz.",
      chips: ["Zirkon blok", "CAM frezeleme", "Sinterleme", "Finishing / glaze"],
      buttons: [
        { text: "Teknik destek al", href: "/pages/iletisim" },
        { text: "Zirkonları gör", href: ZIRCON_CATEGORY.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: "Sık Sorulanlar",
      titleHtml: `${config.productText} <span class="em">hakkında.</span>`,
      sideHtml: "Renk, kalınlık ve endikasyon seçimi satın alma öncesi netleştirilmelidir.",
      openFirst: true,
      items: config.faqItems,
    },
    video: {
      index: "06",
      label: "Videoda Gör",
      titleHtml: 'Zirkon akışını <span class="em">videoda görün.</span>',
      sideHtml: "ArgenZ zirkon bloklarda milling, nesting ve sinterleme yaklaşımını video üzerinden değerlendirin.",
      href: config.videoHref,
      image: youtubePreview(config.videoHref, config.images[0] || ""),
      imageAlt: `${config.productText} video`,
      title: `${config.productText} iş akışı`,
      text: "Vaka seçimi, nesting ve laboratuvar üretim akışına odaklanan video.",
      meta: "Mash Academy · YouTube'da izle",
    },
    related: {
      index: "07",
      label: "İlgili Zirkonlar",
      titleHtml: 'Aynı laboratuvarda <span class="em">birlikte çalışanlar.</span>',
      items: zirconRelatedItems(config.slug),
    },
    finalCta: {
      titleHtml: `${config.productText} için <span class="em">vaka uyumunu birlikte kontrol edelim.</span>`,
      textHtml:
        "Renk, kalınlık, endikasyon ve sinterleme akışını kısa bir görüşmeyle netleştirip doğru ArgenZ zirkon bloğu seçelim.",
      primaryText: "Sepete dön ↑",
      primaryHref: "#satinal",
      secondaryText: "Uzmana danış",
      secondaryHref: "/pages/iletisim",
    },
  };
}

const ZIRCON_BLOCK_CONFIGS: ZirconBlockConfig[] = [
  {
    slug: ARGENZ_ST_MULTILAYER_SLUG,
    productText: "ArgenZ ST Multilayer Zirkon Blok",
    kicker: "ArgenZ ST Multilayer · Süper Translüsent Zirkonya",
    titleHtml: 'Doğal dentin geçişi <span class="em">multilayer</span> diskten gelir.',
    leadHtml:
      "ArgenZ ST Süper Translüsent Multilayer Zirkon Blok, lityum disilikata alternatif olacak yüksek geçirgenlik ve optimum dayanıklılık sunar. Doğal dentini taklit eden geçişiyle estetik restorasyonlar için kullanılır; ABD'de üretilir, izostatik preslenir ve FDA 510K onaylıdır.",
    pills: [{ value: "50%", label: "translüsentlik" }, { value: "850", label: "MPa" }, { label: "ST Multilayer" }, { label: "FDA 510K" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
    ],
    videoHref: "https://www.youtube.com/watch?v=Sg2I5yC8qBk",
    metricTitleHtml: 'Süper translüsent <span class="em">estetik zirkon.</span>',
    metricSideHtml: "ST Multilayer, doğal dentin geçişi ve estetik anterior/tek üye vakalarında yüksek geçirgenlik ihtiyacına odaklanır.",
    metrics: [
      { name: "Translüsentlik", value: "50", unit: "%", tag: "ST", caption: "Doğal dentini taklit eden yüksek geçirgenlik seviyesi." },
      { name: "Dayanım", value: "850", unit: "MPa", tag: "Zirkonya", caption: "Estetik vakalar için optimum dayanıklılık dengesi." },
      { name: "Köprü", value: "3", unit: "üyeye kadar", tag: "Anterior", caption: "Tek kronlar ve 1 pontikli 3 üyeye kadar anterior köprüler için konumlandırılır." },
    ],
    specTag: "ARGENZ ST MULTILAYER · 50% · 850 MPa",
    specTitleHtml: 'Lityum disilikata <span class="em">estetik alternatif.</span>',
    specDescriptionHtml: "Süper translüsent multilayer yapı, doğal renk geçişi ve yüksek estetik beklenti olan vakalarda kullanılmak üzere konumlandırılır.",
    specRows: [
      { label: "Materyal", value: "ST Multilayer" },
      { label: "Translüsentlik", value: "50%" },
      { label: "Dayanım", value: "850 MPa" },
      { label: "Üretim", value: "ABD / izostatik pres" },
      { label: "Onay", value: "FDA 510K" },
    ],
    useCaseSideHtml: "ST Multilayer, estetik geçiş ve doğal dentin taklidi gereken zirkon restorasyonlarında tercih edilir.",
    useCasePhotos: [
      { imageIndex: 2, title: "Anterior estetik", text: "Doğal renk geçişi ve yüksek translüsentlik.", alt: "ArgenZ ST Multilayer anterior estetik" },
      { imageIndex: 3, title: "Tek kron", text: "Lityum disilikata alternatif estetik zirkon.", alt: "ArgenZ ST Multilayer tek kron" },
      { imageIndex: 2, title: "3 üyeli köprü", text: "1 pontikli anterior köprü endikasyonu.", alt: "ArgenZ ST Multilayer anterior köprü" },
    ],
    indicationItems: ["Tek kron restorasyonları", "Yüksek estetik anterior vakalar", "1 pontikli 3 üyeye kadar anterior köprüler"],
    processItems: ["Renk ve kalınlık seçimi", "Shrinkage değerinin CAM yazılıma doğru girilmesi", "Sinterleme çevrimi ve finishing/glaze kontrolü"],
    deviceChips: [{ label: "Dental CAD/CAM freze" }, { label: "Sinterleme fırını" }, { label: "VITA Classical tonları" }, { label: "Estetik vaka", highlighted: true }],
    faqItems: [
      { question: "ArgenZ ST Multilayer ne için kullanılır?", answerHtml: "Doğal dentin geçişi ve yüksek estetik beklenti olan zirkon restorasyonlarda kullanılır." },
      { question: "Dayanım değeri nedir?", answerHtml: "ST Multilayer için 850 MPa dayanım bilgisi ürün kaynaklarında yer alır." },
      { question: "Hangi köprülerde tercih edilir?", answerHtml: "Tek kronlar ve 1 pontikli 3 üyeye kadar anterior köprüler için konumlandırılır." },
    ],
  },
  {
    slug: ARGENZ_HT_PLUS_SLUG,
    productText: "ArgenZ HT+ Zirkon Blok",
    kicker: "ArgenZ HT+ · Yüksek Translüsent Plus Zirkonya",
    titleHtml: 'Dayanım ve estetik <span class="em">HT+</span> formülde birleşir.',
    leadHtml:
      "Argen HT+ ile üretilen restorasyonlar dayanıklılık, performans ve estetik dengesi sunar. Klinik ihtiyaçlara uygun çok yönlü formülasyonu sayesinde birçok vakada zirkonyum reçeteleme imkanı sağlar.",
    pills: [{ value: "1250", label: "MPa" }, { value: "45%", label: "translüsentlik" }, { label: "HT+" }, { label: "Full contour / altyapı" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
    ],
    videoHref: "https://www.youtube.com/watch?v=kgyZhW8YC-I",
    metricTitleHtml: 'Güçlü restorasyonlar için <span class="em">HT+ zirkon.</span>',
    metricSideHtml: "HT+ materyal, dayanım ve translüsentlik dengesini geniş klinik endikasyonlarda kullanmak için konumlandırılır.",
    metrics: [
      { name: "Dayanım", value: "1250", unit: "MPa", tag: "HT+", caption: "Geleneksel HT zirkonyaya göre artırılmış dayanım seviyesi." },
      { name: "Translüsentlik", value: "45", unit: "%", tag: "HT+", caption: "Dayanım korunurken estetik ışık geçirgenliği sağlar." },
      { name: "Endikasyon", value: "Full", unit: "arch", tag: "IFU", caption: "Full contour ve altyapı restorasyonlarında geniş kullanım alanı." },
    ],
    specTag: "ARGENZ HT+ · 1250 MPa · 45%",
    specTitleHtml: 'Geniş endikasyon için <span class="em">yüksek dayanım.</span>',
    specDescriptionHtml: "HT+ zirkonya, full contour ve altyapı restorasyonlarında dayanım, performans ve estetik dengesini korumak için kullanılır.",
    specRows: [
      { label: "Materyal", value: "HT+" },
      { label: "Dayanım", value: "1250 MPa" },
      { label: "Translüsentlik", value: "45%" },
      { label: "Kullanım", value: "Full contour / altyapı" },
      { label: "Kategori", value: "Zirkon blok" },
    ],
    useCaseSideHtml: "HT+ zirkon blok, yüksek dayanım isteyen kron, köprü ve altyapı iş akışlarında kullanılır.",
    useCasePhotos: [
      { imageIndex: 2, title: "Posterior dayanım", text: "Yük taşıyan restorasyonlar için güçlü yapı.", alt: "ArgenZ HT+ posterior restorasyon" },
      { imageIndex: 3, title: "Full contour", text: "Tek parça zirkon restorasyon iş akışları.", alt: "ArgenZ HT+ full contour" },
      { imageIndex: 2, title: "Altyapı", text: "Substructure ve geniş endikasyon desteği.", alt: "ArgenZ HT+ altyapı restorasyonu" },
    ],
    indicationItems: ["Full contour restorasyonlar", "Substructure / altyapı restorasyonları", "Dayanım öncelikli kron ve köprü vakaları"],
    processItems: ["CAM shrinkage değeri kontrolü", "Keskin frez ve uygun milling stratejisi", "Sinterleme sonrası wet adjustment ve finishing kontrolü"],
    deviceChips: [{ label: "Dental CAD/CAM freze" }, { label: "Sinterleme fırını" }, { label: "HT+ shading liquids" }, { label: "Dayanım odaklı vaka", highlighted: true }],
    faqItems: [
      { question: "ArgenZ HT+ hangi restorasyonlarda kullanılır?", answerHtml: "Full contour ve altyapı restorasyonlarında, dayanım ve estetik dengesinin önemli olduğu vakalarda kullanılır." },
      { question: "Dayanım ve translüsentlik değeri nedir?", answerHtml: "HT+ için kaynaklarda 1250 MPa dayanım ve 45% translüsentlik bilgisi yer alır." },
      { question: "Sinterleme öncesi ne kontrol edilmeli?", answerHtml: "Disk üzerindeki shrinkage değeri CAM yazılımına doğru girilmeli ve sinterleme protokolü takip edilmelidir." },
    ],
  },
  {
    slug: ARGENZ_HT_MULTILAYER_SLUG,
    productText: "ArgenZ HT+ Multilayer Zirkon Blok",
    kicker: "ArgenZ HT+ Multilayer · Güçlü Doğal Gradient",
    titleHtml: 'HT+ dayanımı <span class="em">doğal multilayer</span> geçişle birleşir.',
    leadHtml:
      "ArgenZ HT+ Multilayer, HT+ materyal dayanımı ve renk doğruluğunu doğal dentin-mine geçişine benzeyen multilayer yapı ile birleştirir. Katman çizgisi oluşturmadan doğal shade gradient hedefleyen zirkon restorasyonlar için kullanılır.",
    pills: [{ value: "HT+", label: "multilayer" }, { value: "1250", label: "MPa" }, { label: "Doğal gradient" }, { label: "Shade accuracy" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
    ],
    videoHref: "https://www.youtube.com/watch?v=kgyZhW8YC-I",
    metricTitleHtml: 'Dayanım üstüne <span class="em">doğal renk geçişi.</span>',
    metricSideHtml: "HT+ Multilayer, yüksek dayanım ihtiyacı olan vakalarda doğal gradient ve shade doğruluğu hedefler.",
    metrics: [
      { name: "Yapı", value: "HT+", unit: "ML", tag: "Multilayer", caption: "HT+ materyali doğal shade gradient ile birleştiren multilayer yapı." },
      { name: "Dayanım", value: "1250", unit: "MPa", tag: "HT+", caption: "HT+ zirkonyanın yüksek dayanım sınıfını koruyan formülasyon." },
      { name: "Estetik", value: "Doğal", unit: "gradient", tag: "Shade", caption: "Dentin-mine geçişini andıran doğal renk doğruluğu hedefler." },
    ],
    specTag: "ARGENZ HT+ MULTILAYER · GRADIENT · HT+",
    specTitleHtml: 'Katman çizgisiz <span class="em">doğal geçiş.</span>',
    specDescriptionHtml: "HT+ Multilayer, güç ve shade doğruluğunu doğal gradient ile birleştirerek anterior-posterior estetik dayanım dengesinde kullanılır.",
    specRows: [
      { label: "Materyal", value: "HT+ Multilayer" },
      { label: "Dayanım", value: "1250 MPa" },
      { label: "Geçiş", value: "Doğal shade gradient" },
      { label: "Hedef", value: "Dentin-mine uyumu" },
      { label: "Kategori", value: "Zirkon blok" },
    ],
    useCaseSideHtml: "HT+ Multilayer, dayanım korunurken doğal renk geçişi istenen zirkon restorasyonlarda tercih edilir.",
    useCasePhotos: [
      { imageIndex: 2, title: "Doğal gradient", text: "Dentin-mine geçişine benzeyen multilayer yapı.", alt: "ArgenZ HT+ Multilayer doğal gradient" },
      { imageIndex: 3, title: "Shade doğruluğu", text: "Tutarlı renk geçişi ve estetik sonuç hedefi.", alt: "ArgenZ HT+ Multilayer shade doğruluğu" },
      { imageIndex: 2, title: "Güçlü estetik", text: "HT+ dayanımıyla multilayer görünüm dengesi.", alt: "ArgenZ HT+ Multilayer güçlü estetik" },
    ],
    indicationItems: ["Doğal renk geçişi istenen kron ve köprüler", "HT+ dayanım gerektiren estetik vakalar", "Shade accuracy ve gradient beklentisi olan restorasyonlar"],
    processItems: ["Disk yönü ve nesting pozisyonu", "Renk/kalınlık seçimi", "Sinterleme ve finishing/glaze protokolü"],
    deviceChips: [{ label: "Dental CAD/CAM freze" }, { label: "Sinterleme fırını" }, { label: "Multilayer nesting" }, { label: "Doğal gradient", highlighted: true }],
    faqItems: [
      { question: "HT+ Multilayer farkı nedir?", answerHtml: "HT+ materyal dayanımı ve shade doğruluğunu doğal multilayer renk geçişiyle birleştirir." },
      { question: "Hangi vakalarda tercih edilir?", answerHtml: "Dayanım korunurken doğal dentin-mine geçişi istenen zirkon restorasyonlarda tercih edilir." },
      { question: "Nesting neden önemli?", answerHtml: "Multilayer disklerde restorasyonun disk içindeki konumu renk geçişini doğrudan etkiler." },
    ],
  },
];

export const ZIRCON_BLOCK_DETAIL_DATA_BY_SLUG: Record<string, ProductDetailTemplateData> = Object.fromEntries(
  ZIRCON_BLOCK_CONFIGS.map((config) => [config.slug, zirconBlockDetail(config)]),
);

const ZIRCON_BLOCK_ALIASES: Record<string, string[]> = {
  [ARGENZ_ST_MULTILAYER_SLUG]: ["argenz-st-multilayer", "st-multilayer-zirkon", "stml"],
  [ARGENZ_HT_PLUS_SLUG]: ["argenz-ht-plus", "ht-plus-zirkon", "ht-zirkon-blok"],
  [ARGENZ_HT_MULTILAYER_SLUG]: ["argenz-ht-multilayer", "ht-plus-multilayer", "ht-multilayer-zirkon", "html"],
};

type LabProductCategory = {
  text: string;
  href: string;
  label: string;
  relatedLabel: string;
  relatedTitleHtml: string;
  announcementStrong: string;
  announcementText: string;
  ecosystemLabel: string;
  ecosystemTitleHtml: string;
  ecosystemTextHtml: string;
  ecosystemChips: string[];
};

type LabProductConfig = {
  slug: string;
  category: LabProductCategory;
  productText: string;
  kicker: string;
  titleHtml: string;
  leadHtml: string;
  pills: Array<{ label: string; value?: string }>;
  images: string[];
  galleryBadge?: string;
  metricTitleHtml: string;
  metricSideHtml: string;
  metrics: Array<{ name: string; value: string; unit?: string; tag?: string; caption: string }>;
  specTag: string;
  specTitleHtml: string;
  specDescriptionHtml: string;
  specRows: Array<{ label: string; value: string }>;
  useCaseSideHtml: string;
  useCasePhotos: Array<{ imageIndex?: number; title: string; text: string; alt: string }>;
  useCaseCards: Array<{ eyebrow: string; title: string; items: string[]; note?: string }>;
  devicesTitle: string;
  devicesTextHtml: string;
  deviceChips: Array<{ label: string; highlighted?: boolean }>;
  faqItems: Array<{ question: string; answerHtml: string }>;
  videoHref?: string;
  videoTitleHtml: string;
  videoSideHtml: string;
  videoTitle: string;
  videoText: string;
};

const WASH_CURE_CATEGORY: LabProductCategory = {
  text: "Yıkama & Kürleme Cihazları",
  href: "/yikama-kurleme-cihazlari",
  label: "Yıkama & Kürleme",
  relatedLabel: "İlgili Cihazlar",
  relatedTitleHtml: 'Aynı baskı akışında <span class="em">birlikte çalışanlar.</span>',
  announcementStrong: "Post-process kontrolü.",
  announcementText: "Yıkama ve kürleme adımlarını kullandığınız reçineyle birlikte netleştiriyoruz.",
  ecosystemLabel: "Post-Process Ekosistemi",
  ecosystemTitleHtml: 'Baskı sonucu, <span class="em">yıkama ve kürlemeyle</span> tamamlanır.',
  ecosystemTextHtml: "Reçine baskıda nihai mekanik değerler; doğru yıkama, kurutma ve UV kürleme süreciyle korunur. Cihazı reçine ve iş akışınıza göre birlikte konumlandırabiliriz.",
  ecosystemChips: ["Yıkama", "Kürleme", "365 / 405 nm", "Reçine sonrası işlem"],
};

const PRINTER_CATEGORY: LabProductCategory = {
  text: "3D Yazıcılar",
  href: "/3d-yazicilar",
  label: "3D Yazıcı",
  relatedLabel: "İlgili Yazıcılar",
  relatedTitleHtml: 'Aynı üretim ekosisteminde <span class="em">birlikte değerlendirilenler.</span>',
  announcementStrong: "Yazıcı seçimi.",
  announcementText: "Uygulama, materyal ve üretim hacminize göre doğru 3D yazıcıyı birlikte seçiyoruz.",
  ecosystemLabel: "Baskı Ekosistemi",
  ecosystemTitleHtml: 'Yazıcı seçimi, <span class="em">materyal ve post-process</span> ile tamamlanır.',
  ecosystemTextHtml: "Dental ve mücevher üretiminde yazıcı, reçine, yıkama-kürleme ve teknik parametreler birlikte çalışır. Cihaz seçimini üretim hedefinize göre birlikte netleştirebiliriz.",
  ecosystemChips: ["3D yazıcı", "Reçine", "Yıkama & kürleme", "Parametre desteği"],
};

const SCANNER_CATEGORY: LabProductCategory = {
  text: "Masaüstü Tarayıcılar",
  href: "/masasustu-tarayicilar",
  label: "Masaüstü Tarayıcı",
  relatedLabel: "İlgili Tarayıcılar",
  relatedTitleHtml: 'Aynı laboratuvarda <span class="em">birlikte değerlendirilenler.</span>',
  announcementStrong: "Tarama doğruluğu.",
  announcementText: "Laboratuvar üretim hacminize göre doğru masaüstü tarayıcıyı birlikte seçiyoruz.",
  ecosystemLabel: "Tarama Ekosistemi",
  ecosystemTitleHtml: 'Dijital iş akışı, <span class="em">doğru taramayla</span> başlar.',
  ecosystemTextHtml: "Tarama doğruluğu; model, implant bar ve tam çene iş akışlarında CAD/CAM üretimin temelini oluşturur. Tarayıcı seçimini üretim hacmi ve vaka tiplerinize göre birlikte planlayabiliriz.",
  ecosystemChips: ["Model tarama", "Doku tarama", "CAD/CAM", "Laboratuvar üretimi"],
};

const FURNACE_CATEGORY: LabProductCategory = {
  text: "Dental Fırınlar",
  href: "/dental-firinlar",
  label: "Dental Fırın",
  relatedLabel: "İlgili Fırınlar",
  relatedTitleHtml: 'Aynı laboratuvarda <span class="em">ısı akışını tamamlayanlar.</span>',
  announcementStrong: "Fırın seçimi.",
  announcementText: "Zirkon, press veya porselen iş akışınıza göre doğru fırını birlikte seçiyoruz.",
  ecosystemLabel: "Fırın Ekosistemi",
  ecosystemTitleHtml: 'Restorasyon kalitesi, <span class="em">kontrollü ısıyla</span> tamamlanır.',
  ecosystemTextHtml: "Sinterleme, press ve porselen pişiriminde doğru sıcaklık aralığı ve fırın tipi kritik rol oynar. Laboratuvar iş akışınıza göre fırın seçimini birlikte netleştirebiliriz.",
  ecosystemChips: ["Sinterleme", "Press", "Porselen", "Vakum / sıcaklık kontrolü"],
};

const TITANIUM_CATEGORY: LabProductCategory = {
  text: "Titanyum Diskler",
  href: "/titanyum-diskler",
  label: "Titanyum Disk",
  relatedLabel: "İlgili Malzemeler",
  relatedTitleHtml: 'CAD/CAM iş akışında <span class="em">birlikte kullanılanlar.</span>',
  announcementStrong: "CAD/CAM materyal seçimi.",
  announcementText: "Disk ölçüsü ve endikasyon uyumunu frezeleme akışınızla birlikte kontrol ediyoruz.",
  ecosystemLabel: "CAD/CAM Ekosistemi",
  ecosystemTitleHtml: 'Titanyum disk, <span class="em">implant üstü işlerde</span> güven verir.',
  ecosystemTextHtml: "İmplant üstü restorasyonlarda materyal seçimi, disk ölçüsü ve frezeleme stratejisi birlikte değerlendirilmelidir. Uyumlu CAD/CAM akışını satın alma öncesi netleştirebiliriz.",
  ecosystemChips: ["Grade 5 ELI", "CAD/CAM", "Ø98.5 mm", "İmplant üstü restorasyon"],
};

const SYSTEM_CATEGORY: LabProductCategory = {
  text: "Sistemler",
  href: "/sistemler",
  label: "Sistem",
  relatedLabel: "İlgili Sistemler",
  relatedTitleHtml: 'Kompozit restorasyonda <span class="em">birlikte çalışanlar.</span>',
  announcementStrong: "Kompozit sistem akışı.",
  announcementText: "Mufla, kompozit ve baskı akışını tam çene restorasyon hedefinize göre birlikte değerlendiriyoruz.",
  ecosystemLabel: "Restorasyon Ekosistemi",
  ecosystemTitleHtml: 'Tam çene kompozit işlerde <span class="em">sistem birlikte çalışır.</span>',
  ecosystemTextHtml: "Trasformer sistemi; ışık geçirgenliği, stabilite ve kompozit uygulamasını aynı restorasyon akışında birleştirir. Ürün seçimini vaka ve laboratuvar sürecinize göre birlikte netleştirebiliriz.",
  ecosystemChips: ["Light Glass mufla", "Comp Flow", "Tam çene kompozit", "Işık geçirgenliği"],
};

function labPhotoSrc(config: LabProductConfig, index: number | undefined) {
  const usable = config.images.length > 1 ? config.images.slice(1) : config.images;
  if (!usable.length) return config.images[0] || "";
  return usable[Math.min(Math.max((index || 1) - 1, 0), usable.length - 1)];
}

function labRelatedItems(config: LabProductConfig): NonNullable<ProductDetailTemplateData["related"]>["items"] {
  const related = LAB_PRODUCT_CONFIGS.filter((item) => {
    return item.category.href === config.category.href && item.slug !== config.slug;
  }).map((item) => ({
    tag: item.galleryBadge || item.category.label.toLocaleUpperCase("tr"),
    title: item.productText,
    descriptionHtml: item.leadHtml,
    href: `/${item.slug}`,
    linkText: "İncele",
    background: "linear-gradient(160deg,#F1F1EC,#fff)",
    image: item.images[0],
    imageAlt: item.productText,
  }));
  return [
    ...related,
    {
      tag: "KATEGORİ",
      title: config.category.text,
      descriptionHtml: `${config.category.text} ürünlerini birlikte karşılaştırın.`,
      href: config.category.href,
      linkText: "Kategoriye dön",
      background: "linear-gradient(160deg,#EEF0EA,#fff)",
      image: config.images[0],
      imageAlt: config.category.text,
    },
  ].slice(0, 4);
}

function labProductDetail(config: LabProductConfig): ProductDetailTemplateData {
  const gallery = normalizedGallery(config.images, config.productText);
  const mainImage = config.images[0] || gallery[0]?.src || "";
  return {
    key: config.slug,
    announcement: {
      enabled: true,
      strongText: config.category.announcementStrong,
      longText: config.category.announcementText,
      ctaText: "Uyumu kontrol et →",
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText: config.category.text,
      categoryHref: config.category.href,
      productText: config.productText,
    },
    hero: {
      kicker: config.kicker,
      titleHtml: config.titleHtml,
      leadHtml: config.leadHtml,
      pills: config.pills,
      galleryBadge: config.galleryBadge,
      gallery,
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "— uyumluluk kontrolü ve teknik destek dahil.",
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: "WhatsApp'tan sor",
      addToCartText: "Sepete ekle →",
      addingToCartText: "Ekleniyor...",
      outOfStockText: "Stok yok",
      trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
    },
    ratings: {
      index: "01",
      label: "Seçim Kontrolü",
      titleHtml: 'Doğru ürün, <span class="hl">iş akışına</span> göre seçilir.',
      sideHtml: config.metricSideHtml,
      panelTitleHtml: `${config.productText} için <span class="em">kontrol listesi.</span>`,
      note: "Satın alma öncesi kontrol edilmesi gereken başlıklar.",
      items: [
        { descriptionHtml: "Ürün, laboratuvarın mevcut cihaz ve üretim akışıyla <b>uyumlu</b> seçilmelidir." },
        { descriptionHtml: "Vaka tipi, kapasite ve teknik gereksinimler <b>satın alma öncesi</b> netleştirilmelidir." },
        { descriptionHtml: "Kurulum veya kullanım sonrası süreç için <b>teknik destek</b> planlanmalıdır." },
      ],
    },
    metrics: {
      index: "02",
      label: "Öne Çıkanlar",
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: "Seçenekleri gör →",
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: "Uygulama & Uyumluluk",
      titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
      sideHtml: config.useCaseSideHtml,
      photos: config.useCasePhotos.map((photo) => ({
        src: labPhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
      })),
      cards: config.useCaseCards,
      devices: {
        eyebrow: "Uyumlu Akış",
        title: config.devicesTitle,
        textHtml: config.devicesTextHtml,
        chips: config.deviceChips,
      },
    },
    ecosystem: {
      index: "04",
      label: config.category.ecosystemLabel,
      titleHtml: config.category.ecosystemTitleHtml,
      textHtml: config.category.ecosystemTextHtml,
      chips: config.category.ecosystemChips,
      buttons: [
        { text: "Teknik destek al", href: "/pages/iletisim" },
        { text: "Kategoriye dön", href: config.category.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: "Sık Sorulanlar",
      titleHtml: `${config.productText} <span class="em">hakkında.</span>`,
      sideHtml: "Uyumluluk, kapasite ve kullanım akışı satın alma öncesi netleştirilmelidir.",
      openFirst: true,
      items: config.faqItems,
    },
    video: {
      index: "06",
      label: "Videoda Gör",
      titleHtml: config.videoTitleHtml,
      sideHtml: config.videoSideHtml,
      href: config.videoHref || "/pages/iletisim",
      image: config.videoHref ? youtubePreview(config.videoHref, mainImage) : mainImage,
      imageAlt: `${config.productText} video ve teknik destek`,
      title: config.videoTitle,
      text: config.videoText,
      meta: config.videoHref ? "Mash Academy · YouTube'da izle" : "3MASH teknik destek",
    },
    related: {
      index: "07",
      label: config.category.relatedLabel,
      titleHtml: config.category.relatedTitleHtml,
      items: labRelatedItems(config),
    },
    finalCta: {
      titleHtml: `${config.productText} için <span class="em">uyumu birlikte kontrol edelim.</span>`,
      textHtml: "Cihaz, materyal, varyant ve laboratuvar iş akışınızı birlikte değerlendirip doğru seçeneği netleştirelim.",
      primaryText: "Sepete dön ↑",
      primaryHref: "#satinal",
      secondaryText: "Uzmana danış",
      secondaryHref: "/pages/iletisim",
    },
  };
}

const LAB_PRODUCT_CONFIGS: LabProductConfig[] = [
  {
    slug: MASH_P16L_PRINTER_SLUG,
    category: PRINTER_CATEGORY,
    productText: "MASH P16L",
    kicker: "MASH P16L · 385 nm 16K Dental 3D Yazıcı",
    titleHtml: 'Dental üretimde <span class="em">385 nm ve 16K</span> hassasiyet.',
    leadHtml:
      "MASH P16L, 385 nm profesyonel UV ışık ve 16K çözünürlük ile dental restorasyonlarda mikron hassasiyeti hedefleyen profesyonel dental 3D yazıcıdır. Maksimum hız ve mükemmel uyumu aynı üretim akışında sunmak için konumlandırılır.",
    pills: [{ value: "385", label: "nm UV" }, { value: "16K", label: "çözünürlük" }, { label: "Dental restorasyon" }, { label: "MASH" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e47e604b-5052-4935-800f-57d4ead78ced/1080/mash-p16l.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b92468e1-e607-46f2-b5fd-c7001c066fd8/1080/mash-p16l.webp",
    ],
    galleryBadge: "16K",
    metricTitleHtml: 'Mikron hassasiyet için <span class="em">profesyonel LCD.</span>',
    metricSideHtml: "P16L, dental restorasyonlarda 385 nm ışık sistemi ve 16K çözünürlükle hassas baskı akışına odaklanır.",
    metrics: [
      { name: "Işık", value: "385", unit: "nm", tag: "UV", caption: "Kaynak ürün sayfasında belirtilen profesyonel UV ışık dalga boyu." },
      { name: "Çözünürlük", value: "16K", unit: "", tag: "LCD", caption: "Dental restorasyonlarda detay ve yüzey kalitesi için yüksek çözünürlük." },
      { name: "Kullanım", value: "Dental", unit: "restorasyon", tag: "Lab", caption: "Mikron hassasiyeti ve uyum hedefleyen dental üretim akışı." },
    ],
    specTag: "MASH P16L · 385 NM · 16K",
    specTitleHtml: 'Dental restorasyonlarda <span class="em">hız ve uyum.</span>',
    specDescriptionHtml: "MASH P16L, 385 nm ışık sistemi ve 16K çözünürlükle dental restorasyon üretiminde hassasiyet, hız ve tekrarlanabilir uyum hedefler.",
    specRows: [
      { label: "Model", value: "MASH P16L" },
      { label: "Işık", value: "385 nm" },
      { label: "Çözünürlük", value: "16K" },
      { label: "Kullanım", value: "Dental restorasyon" },
      { label: "Kategori", value: "3D yazıcı" },
    ],
    useCaseSideHtml: "Dental restorasyon, reçine üretimi ve hassas laboratuvar baskı akışlarında kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Dental restorasyon", text: "Mikron hassasiyet isteyen üretimler.", alt: "MASH P16L dental restorasyon" },
      { imageIndex: 1, title: "16K detay", text: "Yüksek çözünürlüklü LCD baskı akışı.", alt: "MASH P16L 16K baskı" },
      { imageIndex: 1, title: "385 nm", text: "Dental reçine parametreleriyle uyumlu ışık sistemi.", alt: "MASH P16L 385 nm" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Dental restorasyon baskıları", "Hassas model ve aparey üretimi", "Laboratuvar seri üretim akışı"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Reçine parametresi", "Katman kalınlığı", "Yıkama ve kürleme süreci"] },
    ],
    devicesTitle: "Dental reçine ve post-process akışıyla çalışır",
    devicesTextHtml: "P16L, dental reçineler ve yıkama-kürleme cihazlarıyla birlikte kalibre edildiğinde üretim sonucu daha kontrollü ilerler.",
    deviceChips: [{ label: "Dental reçineler" }, { label: "Yıkama & kürleme" }, { label: "385 nm" }, { label: "16K", highlighted: true }],
    faqItems: [
      { question: "MASH P16L ne için kullanılır?", answerHtml: "Dental restorasyonlarda 385 nm UV ışık ve 16K çözünürlükle hassas reçine baskı üretimi için kullanılır." },
      { question: "Öne çıkan teknik bilgisi nedir?", answerHtml: "Ürün sayfasında 385 nm profesyonel UV ışık ve 16K çözünürlük vurgulanır." },
      { question: "Reçine parametresi gerekir mi?", answerHtml: "Evet. Dental reçine, yazıcı ve post-process parametreleri birlikte netleştirilmelidir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: 'P16L üretim akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "Ürün sayfasındaki video ile MASH P16L ve üretim ekosistemi akışını inceleyin.",
    videoTitle: "MASH P16L dental 3D yazıcı",
    videoText: "385 nm, 16K ve dental üretim akışına odaklanan ürün videosu.",
  },
  {
    slug: MASH_CURIE_M1_DENTAL_SLUG,
    category: PRINTER_CATEGORY,
    productText: "Mash CURIE M1 Dental",
    kicker: "Mash CURIE M1 · Dental DLP 3D Yazıcı",
    titleHtml: 'Klinik hassasiyet isteyen işler için <span class="em">yerli DLP.</span>',
    leadHtml:
      "Curie M1, dijital diş hekimliği uygulamaları için geliştirilmiş yüksek hassasiyetli DLP 3D yazıcıdır. Geçici kuron, ortodontik model, gece plağı ve implant analogları gibi klinik hassasiyet gerektiren üretimlerde istikrarlı ve tekrarlanabilir sonuçlar sağlar.",
    pills: [{ label: "DLP" }, { label: "Dental" }, { label: "Geçici kuron" }, { label: "Ortodontik model" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/302ffc22-20c4-49b7-8d16-b303e079f0cf/1080/1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cb34e574-8ace-4eeb-84bd-eb5cd8fc85c2/1080/3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/37cdcfa4-761f-4f1d-b4da-db077fc1cc91/1080/2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d00ddb3d-77b0-454b-81e5-ff967b6cb36b/1080/4.webp",
    ],
    galleryBadge: "DLP",
    metricTitleHtml: 'Dental uygulamalar için <span class="em">tekrarlanabilir DLP.</span>',
    metricSideHtml: "Curie M1 Dental; geçici kuron, ortodontik model, gece plağı ve implant analogları gibi hassas dental işlerde konumlandırılır.",
    metrics: [
      { name: "Teknoloji", value: "DLP", unit: "", tag: "Curie", caption: "Kaynak açıklamada DLP teknolojili yüksek hassasiyetli yazıcı olarak geçer." },
      { name: "Uygulama", value: "Dental", unit: "", tag: "Clinical", caption: "Dijital diş hekimliği uygulamaları için geliştirilmiştir." },
      { name: "Sonuç", value: "Stabil", unit: "", tag: "Repeat", caption: "İstikrarlı ve tekrarlanabilir sonuçlar hedefler." },
    ],
    specTag: "CURIE M1 · DENTAL DLP",
    specTitleHtml: 'Klinik hassasiyet için <span class="em">dental DLP yazıcı.</span>',
    specDescriptionHtml: "Curie M1 Dental, dijital diş hekimliği uygulamalarında stabil ve tekrarlanabilir reçine baskı üretimi için geliştirilmiştir.",
    specRows: [
      { label: "Model", value: "Curie M1 Dental" },
      { label: "Teknoloji", value: "DLP" },
      { label: "Kullanım", value: "Dijital diş hekimliği" },
      { label: "Uygulamalar", value: "Kuron / model / gece plağı" },
      { label: "Kategori", value: "3D yazıcı" },
    ],
    useCaseSideHtml: "Geçici kuron, ortodontik model, gece plağı ve implant analog üretimlerinde kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Geçici kuron", text: "Klinik hassasiyet isteyen restorasyonlar.", alt: "Curie M1 geçici kuron" },
      { imageIndex: 2, title: "Ortodontik model", text: "Tekrarlanabilir dental model üretimi.", alt: "Curie M1 ortodontik model" },
      { imageIndex: 3, title: "Gece plağı", text: "Splint ve aparey üretim akışı.", alt: "Curie M1 gece plağı" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Geçici kuron üretimi", "Ortodontik model baskıları", "Gece plağı ve implant analogları"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Dental reçine uyumu", "Baskı parametreleri", "Klinik uygulama tipi"] },
    ],
    devicesTitle: "Dental reçine ve klinik/lab üretim akışıyla çalışır",
    devicesTextHtml: "Curie M1 Dental için reçine seçimi, baskı parametresi ve post-process adımları birlikte planlanmalıdır.",
    deviceChips: [{ label: "Dental reçine" }, { label: "DLP" }, { label: "Klinik hassasiyet" }, { label: "Yerli üretim", highlighted: true }],
    faqItems: [
      { question: "Curie M1 Dental ne için kullanılır?", answerHtml: "Geçici kuron, ortodontik model, gece plağı ve implant analogları gibi dental üretimlerde kullanılır." },
      { question: "Teknolojisi nedir?", answerHtml: "Ürün açıklamasında DLP teknolojili yüksek hassasiyetli 3D yazıcı olarak belirtilir." },
      { question: "Sonuçlar tekrarlanabilir mi?", answerHtml: "Kaynak açıklamada istikrarlı ve tekrarlanabilir sonuçlar sağladığı vurgulanır." },
    ],
    videoTitleHtml: 'Curie M1 Dental için <span class="em">teknik destek alın.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için dental uygulama ve reçine uyumunu teknik destekle netleştirin.",
    videoTitle: "Curie M1 Dental teknik destek",
    videoText: "Dental reçine, uygulama ve DLP baskı parametreleri için uzman desteği alın.",
  },
  {
    slug: MASH_CURIE_M1_JEWELRY_SLUG,
    category: PRINTER_CATEGORY,
    productText: "Mash CURIE M1 Jewelry",
    kicker: "Mash CURIE M1 · Jewelry DLP 3D Printer",
    titleHtml: 'Mücevher tasarımında <span class="em">yüksek detay.</span>',
    leadHtml:
      "Curie M1 Jewelry, kuyumculuk ve mücevher tasarımı için geliştirilmiş DLP teknolojili 3D yazıcıdır. Yüksek detay hassasiyeti, kusursuz yüzey kalitesi ve geniş malzeme uyumluluğu sunar.",
    pills: [{ label: "Jewelry" }, { label: "DLP" }, { label: "Yüksek detay" }, { label: "Malzeme uyumu" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6caed2e3-e939-4ef3-8a80-7b04c5ef7d31/1080/1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a9dc7080-68cc-4114-aa76-a1e99a81c834/1080/3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6fea4dc9-2737-494b-9bc9-100a21ad5824/1080/2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7012539d-d394-4b84-b6d3-fcff9d95bc64/1080/4.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a46d0cdc-0a54-4ce8-8bdc-30d0c2c15425/1080/1.webp",
    ],
    galleryBadge: "JEWELRY",
    metricTitleHtml: 'Kuyumculukta <span class="em">detay ve yüzey kalitesi.</span>',
    metricSideHtml: "Curie M1 Jewelry, mücevher tasarımı ve kuyumculuk uygulamalarında detay hassasiyeti ve malzeme uyumluluğu için konumlandırılır.",
    metrics: [
      { name: "Teknoloji", value: "DLP", unit: "", tag: "Jewelry", caption: "Kuyumculuk için geliştirilmiş DLP teknolojili yazıcı." },
      { name: "Detay", value: "Yüksek", unit: "", tag: "Hassasiyet", caption: "Kaynak açıklamada yüksek detay hassasiyeti vurgulanır." },
      { name: "Yüzey", value: "Kusursuz", unit: "", tag: "Finish", caption: "Mücevher üretiminde yüzey kalitesi hedefler." },
    ],
    specTag: "CURIE M1 · JEWELRY DLP",
    specTitleHtml: 'Mücevher üretimi için <span class="em">hassas DLP.</span>',
    specDescriptionHtml: "Curie M1 Jewelry, kuyumculuk ve mücevher tasarımı için yüksek detay, yüzey kalitesi ve malzeme uyumluluğu hedefleyen DLP 3D yazıcıdır.",
    specRows: [
      { label: "Model", value: "Curie M1 Jewelry" },
      { label: "Teknoloji", value: "DLP" },
      { label: "Kullanım", value: "Kuyumculuk / mücevher" },
      { label: "Odak", value: "Detay hassasiyeti" },
      { label: "Kategori", value: "3D yazıcı" },
    ],
    useCaseSideHtml: "Mücevher tasarımı, döküm masterı ve yüksek detay isteyen kuyumculuk baskılarında kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Mücevher tasarımı", text: "Yüksek detay isteyen parçalar.", alt: "Curie M1 Jewelry mücevher tasarımı" },
      { imageIndex: 2, title: "Yüzey kalitesi", text: "Kusursuz yüzey hedefleyen üretimler.", alt: "Curie M1 Jewelry yüzey kalitesi" },
      { imageIndex: 3, title: "Malzeme uyumu", text: "Kuyumculuk reçine ve materyal akışı.", alt: "Curie M1 Jewelry malzeme uyumu" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Kuyumculuk model baskıları", "Mücevher tasarımı", "Yüksek detaylı küçük parçalar"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Malzeme uyumu", "Detay ve yüzey hedefi", "Döküm veya üretim akışı"] },
    ],
    devicesTitle: "Kuyumculuk reçineleri ve DLP üretim akışıyla çalışır",
    devicesTextHtml: "Curie M1 Jewelry için materyal, detay hedefi ve döküm/üretim akışı birlikte değerlendirilmelidir.",
    deviceChips: [{ label: "Jewelry resin" }, { label: "DLP" }, { label: "Yüksek detay" }, { label: "Kuyumculuk", highlighted: true }],
    faqItems: [
      { question: "Curie M1 Jewelry ne için kullanılır?", answerHtml: "Kuyumculuk ve mücevher tasarımı için yüksek detaylı DLP 3D baskı üretiminde kullanılır." },
      { question: "Öne çıkan özellikleri nelerdir?", answerHtml: "Yüksek detay hassasiyeti, kusursuz yüzey kalitesi ve geniş malzeme uyumluluğu vurgulanır." },
      { question: "Dental Curie M1 ile aynı mı?", answerHtml: "Aynı Curie M1 ailesindedir; Jewelry konfigürasyonu kuyumculuk ve mücevher tasarımı iş akışına odaklanır." },
    ],
    videoTitleHtml: 'Curie M1 Jewelry için <span class="em">teknik destek alın.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için kuyumculuk materyal uyumunu teknik destekle netleştirin.",
    videoTitle: "Curie M1 Jewelry teknik destek",
    videoText: "Mücevher baskı materyali, detay hedefi ve DLP üretim parametreleri için uzman desteği alın.",
  },
  {
    slug: CREALITY_HALOT_SKY_6K_SLUG,
    category: PRINTER_CATEGORY,
    productText: "Creality Halot-Sky 6K",
    kicker: "Creality Halot-Sky 6K · Reçine 3D Yazıcı",
    titleHtml: 'Halot-Sky 6K, <span class="em">iki cihaz geliştirmesiyle</span> seçilir.',
    leadHtml:
      "Creality Halot-Sky 6K, reçine 3D baskı için kullanılan LCD yazıcıdır. Fabrika çıkışlı versiyon ve hassasiyeti arttırılmış versiyon seçenekleriyle değerlendirilir.",
    pills: [{ value: "6K", label: "LCD" }, { label: "Fabrika çıkışlı" }, { label: "Hassasiyeti artırılmış" }, { label: "Creality" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp",
    ],
    galleryBadge: "6K",
    metricTitleHtml: 'Reçine baskıda <span class="em">6K LCD seçenekleri.</span>',
    metricSideHtml: "Halot-Sky seçimi yapılırken cihaz versiyonu, reçine uyumu ve hedeflenen hassasiyet birlikte kontrol edilmelidir.",
    metrics: [
      { name: "Çözünürlük", value: "6K", unit: "", tag: "LCD", caption: "Kategori kaynağında Creality Halot-Sky 6K olarak listelenir." },
      { name: "Versiyon", value: "2", unit: "seçenek", tag: "Variant", caption: "Fabrika çıkışlı ve hassasiyeti arttırılmış versiyonlar aynı ürün slug'ında listelenir." },
      { name: "Kullanım", value: "Reçine", unit: "baskı", tag: "LCD", caption: "LCD reçine 3D yazıcı üretim akışı için kullanılır." },
    ],
    specTag: "CREALITY HALOT-SKY · 6K",
    specTitleHtml: 'Fabrika çıkışlı veya <span class="em">hassasiyeti artırılmış.</span>',
    specDescriptionHtml: "Halot-Sky 6K, iki cihaz geliştirmesi seçeneğiyle değerlendirilir. Seçim, kullanılacak reçine ve hassasiyet beklentisine göre netleştirilmelidir.",
    specRows: [
      { label: "Model", value: "Creality Halot-Sky 6K" },
      { label: "Teknoloji", value: "LCD reçine yazıcı" },
      { label: "Seçenek", value: "Fabrika çıkışlı" },
      { label: "Seçenek", value: "Hassasiyeti arttırılmış" },
      { label: "Kategori", value: "3D yazıcı" },
    ],
    useCaseSideHtml: "Reçine baskı, dental üretim ve hassasiyet geliştirmesi isteyen LCD yazıcı akışlarında kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Fabrika çıkışlı", text: "Standart Creality Halot-Sky 6K seçeneği.", alt: "Creality Halot-Sky fabrika çıkışlı" },
      { imageIndex: 1, title: "Hassasiyet artırımı", text: "Daha kontrollü baskı hedefleyen geliştirilmiş seçenek.", alt: "Creality Halot-Sky hassasiyet arttırılmış" },
      { imageIndex: 1, title: "Reçine baskı", text: "LCD reçine üretim akışı.", alt: "Creality Halot-Sky reçine baskı" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["LCD reçine baskı", "Dental üretim başlangıç akışı", "Hassasiyet geliştirmesi isteyen uygulamalar"] },
      { eyebrow: "Seçim", title: "Hangi versiyon?", items: ["Fabrika çıkışlı versiyon", "Hassasiyeti arttırılmış versiyon", "Reçine ve uygulama ihtiyacına göre seçim"] },
    ],
    devicesTitle: "Reçine, yıkama-kürleme ve teknik kalibrasyonla çalışır",
    devicesTextHtml: "Halot-Sky 6K seçimi yapılırken cihaz geliştirmesi, reçine parametresi ve post-process akışı birlikte kontrol edilmelidir.",
    deviceChips: [{ label: "LCD reçine yazıcı" }, { label: "6K" }, { label: "Dental reçine" }, { label: "Hassasiyet seçimi", highlighted: true }],
    faqItems: [
      { question: "Halot-Sky 6K kaç seçenekle değerlendiriliyor?", answerHtml: "Fabrika çıkışlı versiyon ve hassasiyeti arttırılmış versiyon olarak iki seçenekle değerlendirilebilir." },
      { question: "Hangi versiyon seçilmeli?", answerHtml: "Kullanılacak reçine, hassasiyet beklentisi ve üretim tipi birlikte değerlendirilerek seçilmelidir." },
      { question: "Hangi versiyon seçilmeli?", answerHtml: "Kullanılacak reçine, hassasiyet beklentisi ve üretim tipi birlikte değerlendirilerek seçilmelidir." },
    ],
    videoTitleHtml: 'Halot-Sky seçimini <span class="em">birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için cihaz geliştirmesi ve reçine uyumunu teknik destekle kontrol edin.",
    videoTitle: "Creality Halot-Sky 6K teknik destek",
    videoText: "Fabrika çıkışlı veya hassasiyeti artırılmış versiyon seçimi için uzman desteği alın.",
  },
  {
    slug: MASH_W1E_ULTRASONIC_WASH_SLUG,
    category: WASH_CURE_CATEGORY,
    productText: "Mash W1E Ultrasonik Yıkama Cihazı",
    kicker: "Mash W1E · Ultrasonik Yıkama",
    titleHtml: 'Baskı sonrası yüzey <span class="em">temiz başlar.</span>',
    leadHtml:
      "Mash W1E, 3D baskı sonrası parçaların yüzeyindeki reçine kalıntılarını temizlemek için konumlanan ultrasonik yıkama cihazıdır. Kürleme öncesi yüzeyi hazırlayarak daha kontrollü bir post-process akışı kurmanıza yardımcı olur.",
    pills: [{ label: "Ultrasonik yıkama" }, { label: "Baskı sonrası temizlik" }, { label: "Reçine kalıntısı kontrolü" }, { label: "C1E ile tamamlanır" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2ed9f9dd-4203-4c95-9dd3-c9e321bdd354/1080/mash-w1e-washing-device.webp",
    ],
    galleryBadge: "W1E",
    metricTitleHtml: 'Yıkama adımı <span class="em">kürleme öncesi zemini hazırlar.</span>',
    metricSideHtml: "W1E, reçine baskı sonrası yüzeyde kalan fazla materyalin temizlenmesi için yıkama adımına odaklanır.",
    metrics: [
      { name: "İşlem", value: "Ultrasonik", unit: "yıkama", tag: "Wash", caption: "Baskı sonrası parçaların yüzey temizliği için kullanılır." },
      { name: "Akış", value: "Post", unit: "process", tag: "Baskı sonrası", caption: "Kürleme öncesi yüzey hazırlığı sağlar." },
      { name: "Uyum", value: "C1E", unit: "ile", tag: "Tamamlayıcı", caption: "W1E yıkama adımı C1E UV kürleme adımıyla birlikte planlanır." },
    ],
    specTag: "MASH W1E · ULTRASONİK YIKAMA",
    specTitleHtml: 'Yüzey temizliği için <span class="em">ayrı kontrol.</span>',
    specDescriptionHtml: "W1E, reçine baskıların kürleme öncesi temizlenmesi için baskı sonrası iş akışında konumlanır.",
    specRows: [
      { label: "Cihaz", value: "Mash W1E" },
      { label: "İşlem", value: "Ultrasonik yıkama" },
      { label: "Kullanım", value: "Reçine 3D baskı sonrası" },
      { label: "Kategori", value: "Yıkama cihazı" },
      { label: "Marka", value: "Mash" },
    ],
    useCaseSideHtml: "Reçine baskıların yüzey temizliği, kurutma ve ardından UV post-curing adımına hazırlanması için kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Yıkama", text: "Baskı üzerindeki reçine kalıntılarını temizleme.", alt: "Mash W1E ultrasonik yıkama" },
      { imageIndex: 1, title: "Hazırlık", text: "Kürleme öncesi yüzey hazırlığı.", alt: "Mash W1E kürleme öncesi hazırlık" },
      { imageIndex: 1, title: "Akış", text: "W1E yıkama, C1E kürleme adımına bağlanır.", alt: "Mash W1E post-process akışı" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Hangi adımda?", items: ["Reçine baskıların temizlenmesi", "Kürleme öncesi yüzey hazırlığı", "Dental baskı sonrası yıkama"] },
      { eyebrow: "Kontrol", title: "Neyi iyileştirir?", items: ["Yüzeydeki fazla reçineyi azaltma", "Son kürleme öncesi temizlik", "Daha tutarlı post-process akışı"] },
    ],
    devicesTitle: "Reçine baskı sonrası temizlik akışına eklenir",
    devicesTextHtml: "W1E, dental reçine baskıların yıkama adımında kullanılır. C1E UV kürleme cihazıyla birlikte konumlandığında baskı sonrası süreç daha net ayrışır.",
    deviceChips: [{ label: "Ultrasonik yıkama", highlighted: true }, { label: "Reçine baskı" }, { label: "C1E ile tamamlanır" }, { label: "Post-process" }],
    faqItems: [
      { question: "Mash W1E ne için kullanılır?", answerHtml: "Reçine 3D baskı sonrası parçaların yüzeyindeki kalıntıları temizlemek için kullanılır." },
      { question: "W1E tek başına yeterli mi?", answerHtml: "W1E yıkama adımını yönetir; reçinenin nihai mekanik özellikleri için ardından uygun UV kürleme protokolü gerekir." },
      { question: "C1E ile birlikte mi kullanılmalı?", answerHtml: "Evet. W1E temizlik, C1E UV post-curing adımına odaklanır; birlikte daha kontrollü bir baskı sonrası akış oluştururlar." },
    ],
    videoTitleHtml: 'W1E için <span class="em">akışı birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün için video yerine yıkama ve kürleme protokolünü teknik destekle netleştirmeniz önerilir.",
    videoTitle: "Mash W1E teknik destek",
    videoText: "Baskı sonrası yıkama sürecini kullandığınız reçine ve parça tipine göre birlikte planlayalım.",
  },
  {
    slug: MASH_C1E_UV_CURING_SLUG,
    category: WASH_CURE_CATEGORY,
    productText: "Mash C1E UV Kürleme Cihazı",
    kicker: "Mash C1E · UV Kürleme",
    titleHtml: 'Dental reçine baskılar <span class="em">doğru ışıkla tamamlanır.</span>',
    leadHtml:
      "Mash C1E, dental 3D baskılar için geliştirilen profesyonel UV kürleme cihazıdır. Sararmayı önlemeye yardımcı olan kürleme teknolojisi, 24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle farklı dental reçinelerle uyumlu çalışır.",
    pills: [{ value: "24", label: "LED" }, { value: "360°", label: "ışık sistemi" }, { value: "360-530", label: "nm spektrum" }, { label: "UV post-curing" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e7c22c86-93e4-4c53-92f8-969d358e0c0f/1080/mash-c1e-dental-post-cure-cihazi.webp",
    ],
    galleryBadge: "C1E",
    metricTitleHtml: 'UV kürleme <span class="em">mekanik sonucu tamamlar.</span>',
    metricSideHtml: "C1E, dental reçine baskıların son kürleme adımında ışık dağılımını ve spektrum uyumunu kontrol altına almak için konumlanır.",
    metrics: [
      { name: "LED", value: "24", unit: "adet", tag: "Işık", caption: "360° ışık sistemiyle homojen kürleme hedeflenir." },
      { name: "Açı", value: "360", unit: "°", tag: "Kapsama", caption: "Parça çevresinde daha dengeli ışık dağılımı için kullanılır." },
      { name: "Spektrum", value: "360", unit: "-530 nm", tag: "UV", caption: "Farklı dental reçine protokolleriyle uyumlu geniş spektrum desteği." },
    ],
    specTag: "MASH C1E · 24 LED / 360-530 NM",
    specTitleHtml: 'Sararmayı azaltmaya yardımcı <span class="em">kontrollü post-curing.</span>',
    specDescriptionHtml: "C1E, reçine baskıların UV post-curing adımında dayanım, yüzey kalitesi ve renk stabilitesini desteklemek için kullanılır.",
    specRows: [
      { label: "Cihaz", value: "Mash C1E" },
      { label: "İşlem", value: "UV kürleme" },
      { label: "Işık sistemi", value: "24 LED / 360°" },
      { label: "Spektrum", value: "360-530 nm" },
      { label: "Marka", value: "Mash" },
    ],
    useCaseSideHtml: "Yıkama sonrası dental reçine parçaların nihai post-curing adımında, reçine protokolüne göre kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Kürleme", text: "Dental reçine baskıların UV post-curing adımı.", alt: "Mash C1E UV kürleme" },
      { imageIndex: 1, title: "Işık dağılımı", text: "24 LED'li 360° ışık sistemi.", alt: "Mash C1E 360 derece ışık sistemi" },
      { imageIndex: 1, title: "Reçine uyumu", text: "360-530 nm geniş spektrum desteği.", alt: "Mash C1E geniş spektrum desteği" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Hangi adımda?", items: ["Yıkama sonrası UV kürleme", "Dental reçine baskıların post-curing süreci", "Renk ve mekanik stabilite hedefi"] },
      { eyebrow: "Kontrol", title: "Neyi netleştirir?", items: ["Kürleme süresi", "Reçine protokolü", "Işık spektrumu uyumu"] },
    ],
    devicesTitle: "W1E yıkama sonrası C1E ile kürleme tamamlanır",
    devicesTextHtml: "C1E, yıkanmış reçine baskıların UV post-curing adımına odaklanır. Reçine tipine göre süre ve işlem protokolünü birlikte netleştirebiliriz.",
    deviceChips: [{ label: "UV post-curing", highlighted: true }, { label: "24 LED" }, { label: "360° ışık" }, { label: "360-530 nm" }],
    faqItems: [
      { question: "Mash C1E ne için kullanılır?", answerHtml: "Dental reçine 3D baskıların yıkama sonrası UV post-curing adımında kullanılır." },
      { question: "360-530 nm spektrum ne sağlar?", answerHtml: "Geniş spektrum desteği, farklı dental reçine protokolleriyle daha uyumlu bir kürleme akışı kurmaya yardımcı olur." },
      { question: "W1E ile birlikte mi kullanılmalı?", answerHtml: "W1E yıkama adımını, C1E ise UV kürleme adımını yönetir. Dental baskı sonrası süreçte bu iki adım birbirini tamamlar." },
    ],
    videoTitleHtml: 'C1E protokolünü <span class="em">reçinenize göre netleştirin.</span>',
    videoSideHtml: "Bu ürün için video yerine kürleme protokolünü reçine ve yazıcı parametreleriyle birlikte kontrol edin.",
    videoTitle: "Mash C1E teknik destek",
    videoText: "UV post-curing süresini ve işlem akışını kullandığınız reçineye göre birlikte planlayalım.",
  },
  {
    slug: CREALITY_WASH_CURE_UW03_SLUG,
    category: WASH_CURE_CATEGORY,
    productText: "Creality Wash&Cure UW-03",
    kicker: "Creality Wash&Cure UW-03 · Yıkama ve Kürleme",
    titleHtml: 'Baskı sonrası süreç <span class="em">tek cihazda</span> tamamlanır.',
    leadHtml:
      "Creality Wash&Cure UW-03, 3D yazıcı baskıları için hızlı yıkama ve kürleme makinesidir. Baskıların doğru mekanik değerlere ulaşabilmesi için 365 nm ve 405 nm ışık dalga boyuyla kürleme yapar.",
    pills: [{ value: "365 / 405", label: "nm UV" }, { label: "Yıkama" }, { label: "Kürleme" }, { label: "Reçine baskı sonrası" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/152789ed-cca6-47ff-8018-c1ee04e645a6/1080/washcure-website-1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6b8fae85-844f-4bf6-872b-a7e32c817a0f/1080/washcure-website-5.webp",
    ],
    galleryBadge: "UW-03",
    metricTitleHtml: 'Yıkama ve kürleme <span class="em">aynı akışta.</span>',
    metricSideHtml: "UW-03, reçine baskı sonrası temizleme ve UV kürleme adımlarını tek cihazla yönetmek için kullanılır.",
    metrics: [
      { name: "Dalga Boyu", value: "365", unit: "/ 405 nm", tag: "UV", caption: "Kaynak ürün sayfasında listelenen kürleme dalga boyları." },
      { name: "Süreç", value: "Wash", unit: "& Cure", tag: "2 aşama", caption: "Baskı sonrası yıkama ve kürleme adımları için tek cihaz." },
      { name: "Kullanım", value: "Reçine", unit: "baskı", tag: "Post-process", caption: "3D yazıcı reçine baskılarının son işlem süreci için kullanılır." },
    ],
    specTag: "CREALITY UW-03 · 365 / 405 NM",
    specTitleHtml: 'Mekanik değerler için <span class="em">doğru kürleme.</span>',
    specDescriptionHtml: "UW-03, reçine baskıların yıkama sonrası UV ışıkla kürlenmesi ve nihai mekanik değerlere ulaşması için konumlandırılır.",
    specRows: [
      { label: "Cihaz", value: "Wash&Cure UW-03" },
      { label: "İşlem", value: "Yıkama + kürleme" },
      { label: "UV", value: "365 nm / 405 nm" },
      { label: "Kullanım", value: "Reçine 3D baskı" },
      { label: "Marka", value: "Creality" },
    ],
    useCaseSideHtml: "Reçine baskıların temizlenmesi, kurutulması ve UV kürlenmesi için post-process cihazı.",
    useCasePhotos: [
      { imageIndex: 1, title: "Yıkama", text: "Baskı üzerindeki reçine kalıntılarını temizleme.", alt: "Creality UW-03 yıkama" },
      { imageIndex: 2, title: "Kürleme", text: "365 ve 405 nm UV ışıkla son kürleme.", alt: "Creality UW-03 kürleme" },
      { imageIndex: 2, title: "Post-process", text: "Baskı sonrası mekanik değerleri destekleyen akış.", alt: "Creality UW-03 post-process" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Hangi adımlarda?", items: ["Reçine baskıların yıkanması", "UV ışıkla son kürleme", "Dental reçine baskılarda post-process"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Reçineye uygun süre", "Yıkama sonrası kurutma", "Kürleme dalga boyu ve çevrim"] },
    ],
    devicesTitle: "LCD ve DLP reçine baskı akışıyla çalışır",
    devicesTextHtml: "UW-03, reçine 3D baskıların baskı sonrası yıkama ve kürleme süreci için kullanılır. Reçine tipine göre süre ve işlem akışını birlikte netleştirebiliriz.",
    deviceChips: [{ label: "LCD reçine yazıcı" }, { label: "DLP reçine yazıcı" }, { label: "Dental reçineler" }, { label: "365 / 405 nm", highlighted: true }],
    faqItems: [
      { question: "Creality Wash&Cure UW-03 ne için kullanılır?", answerHtml: "Reçine 3D baskıların yıkanması ve UV ışıkla kürlenmesi için kullanılır." },
      { question: "Hangi dalga boylarında kürleme yapar?", answerHtml: "Ürün sayfasında 365 nm ve 405 nm ışık dalga boyuyla kürleme bilgisi yer alır." },
      { question: "Dental reçinelerle kullanılır mı?", answerHtml: "Reçine baskıların post-process sürecinde kullanılır; süre ve işlem akışı reçineye göre netleştirilmelidir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=b3cLqCnfKAk",
    videoTitleHtml: 'UW-03 akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "Ürün sayfasındaki UW-03 videosu ile yıkama ve kürleme akışını inceleyin.",
    videoTitle: "Creality Wash&Cure UW-03",
    videoText: "Reçine baskı sonrası yıkama ve kürleme sürecine odaklanan ürün videosu.",
  },
  {
    slug: THREESHAPE_E2_SLUG,
    category: SCANNER_CATEGORY,
    productText: "3Shape E2",
    kicker: "3Shape E2 · Masaüstü Tarayıcı",
    titleHtml: 'Üretken laboratuvarlar için <span class="em">doku taraması.</span>',
    leadHtml:
      "3Shape E2, diş laboratuvarlarının üretkenliğini artırmak ve üst düzey doku taraması yapmak için tasarlanmış masaüstü tarayıcıdır. Siyah beyaz dokuya sahip olan E2, daha fazla hassasiyet ve doğruluk sunar.",
    pills: [{ label: "Masaüstü tarayıcı" }, { label: "Doku taraması" }, { label: "Laboratuvar" }, { label: "3Shape" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d2937ac4-16ad-4c18-a76e-24a2b26ced24/1080/e2-new-red-2.webp"],
    galleryBadge: "3SHAPE",
    metricTitleHtml: 'Giriş seviyesi değil, <span class="em">üretken tarama.</span>',
    metricSideHtml: "E2, laboratuvar üretkenliğini artırmak ve doğru model taraması yapmak için konumlandırılır.",
    metrics: [
      { name: "Tarama", value: "Doku", unit: "", tag: "E2", caption: "Ürün sayfasında üst düzey doku taraması vurgulanır." },
      { name: "Kullanım", value: "Lab", unit: "", tag: "Dental", caption: "Diş laboratuvarları için masaüstü tarayıcı." },
      { name: "Odak", value: "Doğru", unit: "tarama", tag: "3Shape", caption: "Her vaka için hassasiyet ve doğruluk hedefler." },
    ],
    specTag: "3SHAPE E2 · DOKU TARAMASI",
    specTitleHtml: 'Daha doğru model için <span class="em">stabil tarama.</span>',
    specDescriptionHtml: "3Shape E2, laboratuvar model ve doku tarama işlerinde üretkenliği artırmaya odaklanan masaüstü tarayıcıdır.",
    specRows: [
      { label: "Marka", value: "3Shape" },
      { label: "Model", value: "E2" },
      { label: "Tip", value: "Masaüstü tarayıcı" },
      { label: "Odak", value: "Doku taraması" },
      { label: "Kullanım", value: "Dental laboratuvar" },
    ],
    useCaseSideHtml: "Model ve doku tarama akışında laboratuvar üretkenliğini artırmak için kullanılır.",
    useCasePhotos: [
      { title: "Model tarama", text: "Laboratuvar model tarama akışları.", alt: "3Shape E2 model tarama" },
      { title: "Doku tarama", text: "Doku detaylarının dijital ortama aktarılması.", alt: "3Shape E2 doku tarama" },
      { title: "CAD/CAM giriş", text: "Tarama datasından dijital tasarım akışı.", alt: "3Shape E2 CAD CAM" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Dental laboratuvar model taraması", "Doku tarama işleri", "CAD/CAM üretim başlangıcı"] },
      { eyebrow: "Seçim", title: "Kimler için?", items: ["Üretkenliği artırmak isteyen laboratuvarlar", "Doğru ve stabil tarama isteyen ekipler", "3Shape ekosistemine geçiş yapanlar"] },
    ],
    devicesTitle: "Dental laboratuvar CAD/CAM akışıyla çalışır",
    devicesTextHtml: "Tarayıcı verisi, tasarım ve üretim adımlarına temel oluşturur. Mevcut CAD/CAM sürecinizle uyumu birlikte değerlendirebiliriz.",
    deviceChips: [{ label: "3Shape CAD" }, { label: "Model tarama" }, { label: "Doku tarama" }, { label: "Laboratuvar", highlighted: true }],
    faqItems: [
      { question: "3Shape E2 ne için kullanılır?", answerHtml: "Dental laboratuvarlarda model ve doku taraması için kullanılan masaüstü tarayıcıdır." },
      { question: "E2'nin öne çıkan tarafı nedir?", answerHtml: "Ürün sayfasında üretkenlik, üst düzey doku taraması, hassasiyet ve doğruluk vurgulanır." },
      { question: "Hangi iş akışına bağlanır?", answerHtml: "Tarama datası CAD/CAM tasarım ve üretim iş akışının başlangıcıdır." },
    ],
    videoHref: "https://www.youtube.com/watch?v=6IUVgU336Qc",
    videoTitleHtml: '3Shape tarama akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "E serisi masaüstü tarayıcı kullanımını ürün sayfasındaki video üzerinden inceleyin.",
    videoTitle: "3Shape E2 masaüstü tarayıcı",
    videoText: "Laboratuvar tarama ve dijital iş akışı videosu.",
  },
  {
    slug: THREESHAPE_E3_SLUG,
    category: SCANNER_CATEGORY,
    productText: "3Shape E3",
    kicker: "3Shape E3 · İmplant Bar Doğruluğu",
    titleHtml: 'İmplant bar işleri için <span class="em">yüksek performans.</span>',
    leadHtml:
      "3Shape E3, uygun maliyetle yüksek performans sunan masaüstü tarayıcıdır. Özellikle implant bar doğruluğu için tasarlanmış olan E3, diş laboratuvarlarının ihtiyaçlarını karşılamak üzere üretilmiştir.",
    pills: [{ label: "İmplant bar" }, { label: "Yüksek performans" }, { label: "Masaüstü tarayıcı" }, { label: "3Shape" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0adf4e0d-a7a0-48ef-b2f2-65b9c5719703/1080/e3-new-red.webp"],
    galleryBadge: "3SHAPE",
    metricTitleHtml: 'Bar doğruluğu için <span class="em">performans dengesi.</span>',
    metricSideHtml: "E3, implant bar doğruluğu ve yüksek performans ihtiyacını uygun maliyetle karşılamak için konumlandırılır.",
    metrics: [
      { name: "Odak", value: "Bar", unit: "doğruluğu", tag: "Implant", caption: "Ürün sayfasında implant bar doğruluğu özellikle vurgulanır." },
      { name: "Performans", value: "Yüksek", unit: "", tag: "E3", caption: "Uygun maliyetle yüksek performans hedefler." },
      { name: "Kullanım", value: "Lab", unit: "", tag: "Dental", caption: "Dental laboratuvar ihtiyaçları için tasarlanmıştır." },
    ],
    specTag: "3SHAPE E3 · IMPLANT BAR",
    specTitleHtml: 'İmplant bar doğruluğu için <span class="em">doğru tarayıcı.</span>',
    specDescriptionHtml: "3Shape E3, implant bar doğruluğu ve yüksek performans gerektiren dental laboratuvar taramalarında kullanılır.",
    specRows: [
      { label: "Marka", value: "3Shape" },
      { label: "Model", value: "E3" },
      { label: "Tip", value: "Masaüstü tarayıcı" },
      { label: "Odak", value: "İmplant bar doğruluğu" },
      { label: "Kullanım", value: "Dental laboratuvar" },
    ],
    useCaseSideHtml: "İmplant bar doğruluğu, model tarama ve CAD/CAM hazırlık işlerinde kullanılır.",
    useCasePhotos: [
      { title: "İmplant bar", text: "Bar doğruluğu gereken laboratuvar işleri.", alt: "3Shape E3 implant bar" },
      { title: "Model tarama", text: "Dental model taramalarında stabil veri.", alt: "3Shape E3 model tarama" },
      { title: "CAD/CAM", text: "Dijital tasarım ve üretim akışına hazırlık.", alt: "3Shape E3 CAD CAM" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["İmplant bar işleri", "Laboratuvar model taraması", "CAD/CAM üretim hazırlığı"] },
      { eyebrow: "Seçim", title: "Kimler için?", items: ["İmplant bar doğruluğu isteyen laboratuvarlar", "Yüksek performansı uygun maliyetle arayan ekipler", "3Shape E serisi akışını kullananlar"] },
    ],
    devicesTitle: "İmplant ve CAD/CAM laboratuvar akışıyla çalışır",
    devicesTextHtml: "E3, implant bar doğruluğu gerektiren dijital işlerde tarama verisini CAD/CAM sürecine hazırlar.",
    deviceChips: [{ label: "İmplant bar" }, { label: "Dental model" }, { label: "3Shape CAD" }, { label: "Yüksek performans", highlighted: true }],
    faqItems: [
      { question: "3Shape E3 hangi işlerde öne çıkar?", answerHtml: "Ürün sayfasında özellikle implant bar doğruluğu için tasarlandığı belirtilir." },
      { question: "E3 laboratuvar için mi?", answerHtml: "Evet. Dental laboratuvar ihtiyaçlarını karşılamak üzere konumlandırılmış masaüstü tarayıcıdır." },
      { question: "E2 ile farkı nedir?", answerHtml: "E3 tarafında implant bar doğruluğu ve yüksek performans vurgusu öne çıkar." },
    ],
    videoHref: "https://www.youtube.com/watch?v=6IUVgU336Qc",
    videoTitleHtml: 'E3 tarama akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "3Shape masaüstü tarayıcı videosu ile E serisi iş akışını inceleyin.",
    videoTitle: "3Shape E3 masaüstü tarayıcı",
    videoText: "İmplant bar ve laboratuvar tarama akışına odaklanan video.",
  },
  {
    slug: THREESHAPE_E4_SLUG,
    category: SCANNER_CATEGORY,
    productText: "3Shape E4",
    kicker: "3Shape E4 · Hız ve Hassasiyet",
    titleHtml: 'Dört kamera ile <span class="em">en güçlü E serisi.</span>',
    leadHtml:
      "3Shape E4, iki kat hız, iki kat hassasiyet ve dört kamera ile E serisinin en güçlü cihazıdır. 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla yüksek hacimli laboratuvar iş akışları için konumlandırılır.",
    pills: [{ value: "4", label: "μm hassasiyet" }, { value: "9 sn", label: "tam çene" }, { value: "4", label: "kamera" }, { label: "E serisi" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f6ee476e-9d5a-4744-b561-b2990f9db4ae/1080/4-1550872.webp"],
    galleryBadge: "3SHAPE",
    metricTitleHtml: 'Hız ve hassasiyet <span class="em">aynı cihazda.</span>',
    metricSideHtml: "E4, E serisinin en güçlü cihazı olarak hızlı tam çene tarama ve yüksek hassasiyet gerektiren üretimlerde öne çıkar.",
    metrics: [
      { name: "Hassasiyet", value: "4", unit: "μm", tag: "E4", caption: "Ürün sayfasında listelenen hassasiyet değeri." },
      { name: "Tam Çene", value: "9", unit: "sn", tag: "Scan", caption: "Kaynakta belirtilen tam çene tarama hızı." },
      { name: "Kamera", value: "4", unit: "adet", tag: "E serisi", caption: "Dört kamera ile E serisinin en güçlü cihazı olarak konumlandırılır." },
    ],
    specTag: "3SHAPE E4 · 4 μM · 9 SN",
    specTitleHtml: 'Yüksek hacimli lab için <span class="em">hızlı tarama.</span>',
    specDescriptionHtml: "E4; dört kamera, 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla hızlı ve hassas laboratuvar taramalarına odaklanır.",
    specRows: [
      { label: "Marka", value: "3Shape" },
      { label: "Model", value: "E4" },
      { label: "Hassasiyet", value: "4 μm" },
      { label: "Tam çene", value: "9 sn" },
      { label: "Kamera", value: "4" },
    ],
    useCaseSideHtml: "Hızlı tam çene tarama, yüksek hassasiyet ve yoğun laboratuvar üretiminde kullanılır.",
    useCasePhotos: [
      { title: "Tam çene", text: "9 saniye tam çene tarama bilgisiyle hızlı akış.", alt: "3Shape E4 tam çene tarama" },
      { title: "Hassas tarama", text: "4 μm hassasiyet gerektiren işler.", alt: "3Shape E4 hassas tarama" },
      { title: "Yoğun lab", text: "Yüksek hacimli laboratuvar üretimi.", alt: "3Shape E4 laboratuvar üretimi" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede öne çıkar?", items: ["Tam çene tarama", "Yüksek hacimli laboratuvar akışları", "Hız ve hassasiyet isteyen CAD/CAM süreçleri"] },
      { eyebrow: "Seçim", title: "Kimler için?", items: ["E serisinin en güçlü cihazını isteyen laboratuvarlar", "Hızlı tarama ihtiyacı olan ekipler", "4 μm hassasiyet hedefleyen işler"] },
    ],
    devicesTitle: "Yüksek hacimli dental CAD/CAM akışıyla çalışır",
    devicesTextHtml: "E4, hızlı tarama datasını tasarım ve üretim sürecine taşır. Laboratuvar kapasitenize göre E2/E3/E4 seçimini birlikte netleştirebiliriz.",
    deviceChips: [{ label: "Tam çene tarama" }, { label: "4 kamera" }, { label: "3Shape CAD" }, { label: "4 μm", highlighted: true }],
    faqItems: [
      { question: "3Shape E4 neden öne çıkar?", answerHtml: "Ürün sayfasında iki kat hız, iki kat hassasiyet, dört kamera, 4 μm hassasiyet ve 9 sn tam çene tarama bilgileri yer alır." },
      { question: "E4 hangi laboratuvarlar için uygundur?", answerHtml: "Hızlı ve hassas tarama ihtiyacı yüksek olan dental laboratuvarlar için konumlandırılır." },
      { question: "E serisinin en güçlü cihazı mı?", answerHtml: "Ürün açıklamasında E serisinin en güçlü cihazı olarak belirtilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=-gsABaM06sg",
    videoTitleHtml: 'E4 hızını <span class="em">videoda görün.</span>',
    videoSideHtml: "3Shape E4 ürün sayfasındaki video ile hızlı ve hassas tarama akışını inceleyin.",
    videoTitle: "3Shape E4 masaüstü tarayıcı",
    videoText: "E4 hız, hassasiyet ve tam çene tarama akışı videosu.",
  },
  {
    slug: NABERTHEM_LHT_02_17_LB_SPEED_SLUG,
    category: FURNACE_CATEGORY,
    productText: "Naberthem LHT 02/17 LB Speed",
    kicker: "Naberthem LHT 02/17 LB Speed · Zirkon Sinterleme",
    titleHtml: 'Yarı saydam zirkonya için <span class="em">1650 °C</span> fırın.',
    leadHtml:
      "Naberthem LHT 02/17 LB Speed, maksimum 1650 °C sıcaklığı ve geniş fırın odası sayesinde yarı saydam zirkonyanın sinterlenmesi için uyumludur. Elektrikli kaldırma masası yüksek sıcaklık fırınının yüklenmesini kolaylaştırır.",
    pills: [{ value: "1650 °C", label: "maksimum" }, { label: "Zirkonya sinterleme" }, { label: "Geniş fırın odası" }, { label: "Kaldırma masası" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c72ba72c-c628-46f6-ac9d-863e3ccb6d8a/1080/firinlar2.webp"],
    galleryBadge: "1650 °C",
    metricTitleHtml: 'Yüksek sıcaklıkta <span class="em">zirkon sinterleme.</span>',
    metricSideHtml: "LHT 02/17 LB Speed, yarı saydam zirkonyanın sinterlenmesi ve geniş fırın odası ihtiyacı için konumlandırılır.",
    metrics: [
      { name: "Maks. Sıcaklık", value: "1650", unit: "°C", tag: "Speed", caption: "Ürün sayfasında belirtilen maksimum sıcaklık." },
      { name: "Uygulama", value: "Zirkon", unit: "sinter", tag: "Dental", caption: "Yarı saydam zirkonya sinterleme için kullanılır." },
      { name: "Yükleme", value: "Lift", unit: "table", tag: "Elektrikli", caption: "Elektrikle çalışan kaldırma masası yüklemeyi kolaylaştırır." },
    ],
    specTag: "LHT 02/17 LB SPEED · 1650 °C",
    specTitleHtml: 'Geniş fırın odasıyla <span class="em">sinterleme kontrolü.</span>',
    specDescriptionHtml: "LHT 02/17 LB Speed, yüksek sıcaklık ve geniş fırın odası gerektiren zirkonya sinterleme iş akışları için kullanılır.",
    specRows: [
      { label: "Model", value: "LHT 02/17 LB Speed" },
      { label: "Maksimum", value: "1650 °C" },
      { label: "Uygulama", value: "Yarı saydam zirkonya" },
      { label: "Yükleme", value: "Elektrikli kaldırma masası" },
      { label: "Kategori", value: "Dental fırın" },
    ],
    useCaseSideHtml: "Zirkonya sinterleme ve yüksek sıcaklık gerektiren dental laboratuvar işlerinde kullanılır.",
    useCasePhotos: [
      { title: "Zirkon sinterleme", text: "Yarı saydam zirkonya için yüksek sıcaklık.", alt: "LHT 02/17 zirkon sinterleme" },
      { title: "Geniş oda", text: "Laboratuvar yükleme hacmini destekleyen yapı.", alt: "LHT 02/17 geniş fırın odası" },
      { title: "Lift table", text: "Elektrikli kaldırma masasıyla kolay yükleme.", alt: "LHT 02/17 kaldırma masası" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Yarı saydam zirkonya sinterleme", "Yüksek sıcaklık dental laboratuvar işleri", "Geniş fırın odası isteyen akışlar"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Sinterleme protokolü", "Fırın hacmi ve yükleme ihtiyacı", "Zirkon blok iş akışı"] },
    ],
    devicesTitle: "Zirkon blok ve sinterleme laboratuvar akışıyla çalışır",
    devicesTextHtml: "Zirkon blok, CAM frezeleme ve sinterleme protokolü birlikte değerlendirilmelidir. Fırın seçimini zirkon kullanım hacminize göre netleştirebiliriz.",
    deviceChips: [{ label: "Zirkon blok" }, { label: "Sinterleme" }, { label: "1650 °C" }, { label: "Dental lab", highlighted: true }],
    faqItems: [
      { question: "LHT 02/17 LB Speed ne için kullanılır?", answerHtml: "Yarı saydam zirkonyanın sinterlenmesi için kullanılan yüksek sıcaklık fırınıdır." },
      { question: "Maksimum sıcaklığı nedir?", answerHtml: "Ürün sayfasında maksimum 1650 °C sıcaklık bilgisi yer alır." },
      { question: "Yükleme yapısı nasıldır?", answerHtml: "Elektrikle çalışan kaldırma masası yüksek sıcaklık fırınının yüklenmesini kolaylaştırır." },
    ],
    videoTitleHtml: 'Sinterleme akışını <span class="em">birlikte planlayın.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın seçimini netleştirebilirsiniz.",
    videoTitle: "LHT 02/17 LB Speed teknik destek",
    videoText: "Zirkon sinterleme, fırın hacmi ve sıcaklık akışı için uzman desteği alın.",
  },
  {
    slug: NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG,
    category: FURNACE_CATEGORY,
    productText: "Naberthem LHT 01/16 Turbo Fire",
    kicker: "Naberthem LHT 01/16 Turbo Fire · Hızlı Sinterleme",
    titleHtml: 'Tek kronlarda <span class="em">1 saatlik</span> hızlı sinterleme.',
    leadHtml:
      "LHT 01/16 Turbo Fire, yarı saydam zirkonyum oksitten yapılmış 1-3 tek kronun maksimum 1600 °C sıcaklığa kadar hızlı sinterlenmesi için geliştirilmiştir. Tüm sinterleme işlemi bir saat içinde tamamlanabilir.",
    pills: [{ value: "1600 °C", label: "maksimum" }, { value: "1 saat", label: "sinterleme" }, { value: "1-3", label: "tek kron" }, { label: "Turbo Fire" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cef47053-2e60-4139-9089-9aadb5855033/1080/firinlar3.webp"],
    galleryBadge: "TURBO",
    metricTitleHtml: 'Hızlı sinterleme için <span class="em">kompakt güç.</span>',
    metricSideHtml: "LHT 01/16 Turbo Fire, 1-3 tek kronluk hızlı zirkonyum oksit sinterleme akışı için geliştirilmiştir.",
    metrics: [
      { name: "Maks. Sıcaklık", value: "1600", unit: "°C", tag: "Turbo", caption: "Ürün sayfasında belirtilen maksimum sıcaklık." },
      { name: "Sinterleme", value: "1", unit: "saat", tag: "Hızlı", caption: "Tüm sinterleme işlemi bir saat içinde tamamlanabilir." },
      { name: "Kapasite", value: "1-3", unit: "tek kron", tag: "Zirkon", caption: "Yarı saydam zirkonyum oksitten tek kronlar için geliştirilmiştir." },
    ],
    specTag: "LHT 01/16 TURBO FIRE · 1600 °C",
    specTitleHtml: 'Hızlı tek kron sinterleme için <span class="em">Turbo Fire.</span>',
    specDescriptionHtml: "LHT 01/16 Turbo Fire, 1-3 tek kronluk hızlı zirkonyum oksit sinterleme döngüsünü bir saat içinde tamamlayabilen fırındır.",
    specRows: [
      { label: "Model", value: "LHT 01/16 Turbo Fire" },
      { label: "Maksimum", value: "1600 °C" },
      { label: "Kapasite", value: "1-3 tek kron" },
      { label: "Süreç", value: "1 saat içinde sinterleme" },
      { label: "Kategori", value: "Dental fırın" },
    ],
    useCaseSideHtml: "Hızlı tek kron sinterleme ve küçük vaka akışları için kullanılır.",
    useCasePhotos: [
      { title: "Tek kron", text: "1-3 tek kronluk hızlı zirkon akışı.", alt: "LHT 01/16 tek kron sinterleme" },
      { title: "Hızlı çevrim", text: "Bir saat içinde tamamlanabilen sinterleme.", alt: "LHT 01/16 hızlı çevrim" },
      { title: "Zirkonyum oksit", text: "Yarı saydam zirkonyum oksit işler.", alt: "LHT 01/16 zirkonyum oksit" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["1-3 tek kron sinterleme", "Hızlı küçük vaka akışı", "Yarı saydam zirkonyum oksit"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Sinterleme süresi", "Maksimum sıcaklık ihtiyacı", "Vaka hacmi ve fırın seçimi"] },
    ],
    devicesTitle: "Zirkon tek kron üretim akışıyla çalışır",
    devicesTextHtml: "Küçük vaka ve hızlı sinterleme ihtiyacı için zirkon blok, frezeleme ve fırın çevrimi birlikte planlanmalıdır.",
    deviceChips: [{ label: "Tek kron" }, { label: "Zirkonyum oksit" }, { label: "1600 °C" }, { label: "1 saat", highlighted: true }],
    faqItems: [
      { question: "Turbo Fire ne için geliştirilmiştir?", answerHtml: "1-3 tek kronun maksimum 1600 °C'ye kadar hızlı sinterlenmesi için geliştirilmiştir." },
      { question: "Sinterleme ne kadar sürer?", answerHtml: "Ürün açıklamasında tüm sinterleme işleminin bir saat içinde tamamlanabileceği belirtilir." },
      { question: "Hangi materyal için idealdir?", answerHtml: "Yarı saydam zirkonyum oksit için konumlandırılır." },
    ],
    videoTitleHtml: 'Hızlı sinterleme için <span class="em">uzmana danışın.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için fırın seçimini teknik destekle netleştirin.",
    videoTitle: "LHT 01/16 Turbo Fire teknik destek",
    videoText: "Hızlı sinterleme, vaka hacmi ve zirkon iş akışı için uzman desteği alın.",
  },
  {
    slug: NABERTHEM_VL_01_12_LB_PRESS_SLUG,
    category: FURNACE_CATEGORY,
    productText: "Naberthem VL 01/12 LB Pres Fırını",
    kicker: "Naberthem VL 01/12 LB · Pres Fırını",
    titleHtml: 'Press seramik işleri için <span class="em">vakumlu fırın.</span>',
    leadHtml:
      "VL 01/12 LB Pres Fırını, dental laboratuvarlarda press seramik ve kontrollü ısı gerektiren restorasyon akışları için konumlandırılır. Kaldırma tablalı yapı yükleme ve işlem kontrolünü kolaylaştırır.",
    pills: [{ label: "Pres fırını" }, { label: "Kaldırma tabla" }, { label: "Dental laboratuvar" }, { label: "Naberthem" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4112bcc1-a205-4063-bb3b-c52112d8dba2/1080/firinlar4.webp"],
    galleryBadge: "PRESS",
    metricTitleHtml: 'Press işler için <span class="em">kontrollü ısı.</span>',
    metricSideHtml: "Pres fırını seçimi, dental laboratuvarın press seramik ve restorasyon akışına göre netleştirilmelidir.",
    metrics: [
      { name: "Uygulama", value: "Press", unit: "", tag: "Dental", caption: "Press seramik restorasyon akışı için konumlandırılır." },
      { name: "Yapı", value: "Lift", unit: "table", tag: "LB", caption: "Kaldırma tablalı yapı yükleme sürecini kolaylaştırır." },
      { name: "Kullanım", value: "Lab", unit: "", tag: "Fırın", caption: "Dental laboratuvar ısı işlem akışları için kullanılır." },
    ],
    specTag: "VL 01/12 LB · PRESS",
    specTitleHtml: 'Press restorasyonlarda <span class="em">kontrollü çevrim.</span>',
    specDescriptionHtml: "VL 01/12 LB Pres Fırını, press seramik restorasyon işlerinde kontrollü fırın çevrimi için kullanılan dental laboratuvar fırınıdır.",
    specRows: [
      { label: "Model", value: "VL 01/12 LB" },
      { label: "Tip", value: "Pres fırını" },
      { label: "Yapı", value: "Kaldırma tablalı" },
      { label: "Kullanım", value: "Press seramik" },
      { label: "Kategori", value: "Dental fırın" },
    ],
    useCaseSideHtml: "Press seramik ve dental laboratuvar fırınlama akışlarında kullanılır.",
    useCasePhotos: [
      { title: "Press seramik", text: "Press restorasyon fırınlama işleri.", alt: "VL 01/12 press seramik" },
      { title: "Kaldırma tabla", text: "Yükleme ve işlem kontrolünü kolaylaştıran yapı.", alt: "VL 01/12 kaldırma tabla" },
      { title: "Laboratuvar", text: "Dental restorasyon ısı işlem akışı.", alt: "VL 01/12 dental laboratuvar" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Press seramik restorasyonlar", "Dental laboratuvar fırın çevrimleri", "Kontrollü ısı işlem akışları"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Press materyal uyumu", "Fırın çevrimi", "Laboratuvar kapasitesi"] },
    ],
    devicesTitle: "Press seramik laboratuvar akışıyla çalışır",
    devicesTextHtml: "Press materyal, fırın çevrimi ve laboratuvar üretim hacmi birlikte değerlendirilmelidir.",
    deviceChips: [{ label: "Press seramik" }, { label: "Kaldırma tabla" }, { label: "Dental lab" }, { label: "Fırın çevrimi", highlighted: true }],
    faqItems: [
      { question: "VL 01/12 LB Pres Fırını ne için kullanılır?", answerHtml: "Dental laboratuvarlarda press seramik restorasyonların fırınlanması için konumlandırılır." },
      { question: "Kaldırma tablalı yapı ne sağlar?", answerHtml: "Yükleme ve işlem kontrolünü kolaylaştırır." },
      { question: "Satın alma öncesi ne kontrol edilmeli?", answerHtml: "Press materyal, fırın çevrimi ve laboratuvar kapasitesi birlikte değerlendirilmelidir." },
    ],
    videoTitleHtml: 'Press fırın seçimini <span class="em">birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın uyumunu kontrol edebilirsiniz.",
    videoTitle: "VL 01/12 LB Pres Fırını teknik destek",
    videoText: "Press seramik iş akışı ve fırın seçimi için uzman desteği alın.",
  },
  {
    slug: NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG,
    category: FURNACE_CATEGORY,
    productText: "Naberthem VL 01/12 LB Porselen Fırını",
    kicker: "Naberthem VL 01/12 LB · Vakumlu Porselen Fırını",
    titleHtml: 'Porselen kaplamada <span class="em">vakumlu pişirim.</span>',
    leadHtml:
      "Naberthem VL 01/12 LB Porselen Fırını, geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için idealdir. Fırın odasının çepeçevre ısıtılması eşit sıcaklık homojenliği ve hızlı ısınma süreleri sağlar.",
    pills: [{ label: "Vakumlu porselen" }, { label: "Normal atmosfer" }, { label: "Çepeçevre ısıtma" }, { label: "Hızlı ısınma" }],
    images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3bfdd659-7c98-4939-8573-8fecb1408edc/1080/washcure-website-kopyasi.webp"],
    galleryBadge: "VACUUM",
    metricTitleHtml: 'Porselende <span class="em">homojen ısı.</span>',
    metricSideHtml: "VL 01/12 LB Porselen Fırını, seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır.",
    metrics: [
      { name: "Atmosfer", value: "Vakum", unit: "/ normal", tag: "Porselen", caption: "Ürün sayfasında normal atmosfer veya vakum altında pişirim bilgisi yer alır." },
      { name: "Isıtma", value: "360", unit: "° çevre", tag: "Homojen", caption: "Fırın odasının çepeçevre ısıtılması eşit sıcaklık dağılımını destekler." },
      { name: "Süreç", value: "Hızlı", unit: "ısınma", tag: "VL", caption: "Kaynak açıklamada hızlı ısınma süreleri vurgulanır." },
    ],
    specTag: "VL 01/12 LB · PORSELEN",
    specTitleHtml: 'Seramik kaplamalar için <span class="em">vakum kontrolü.</span>',
    specDescriptionHtml: "VL 01/12 LB Porselen Fırını, geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır.",
    specRows: [
      { label: "Model", value: "VL 01/12 LB" },
      { label: "Tip", value: "Porselen fırını" },
      { label: "Atmosfer", value: "Normal / vakum" },
      { label: "Isıtma", value: "Çepeçevre fırın odası" },
      { label: "Kategori", value: "Dental fırın" },
    ],
    useCaseSideHtml: "Seramik kaplama, porselen pişirim ve vakumlu dental fırınlama işlerinde kullanılır.",
    useCasePhotos: [
      { title: "Porselen pişirim", text: "Geleneksel seramik kaplamalar.", alt: "VL 01/12 porselen pişirim" },
      { title: "Vakum", text: "Vakum altında kontrollü fırınlama.", alt: "VL 01/12 vakumlu fırın" },
      { title: "Homojen ısı", text: "Çepeçevre ısıtılan fırın odası.", alt: "VL 01/12 homojen sıcaklık" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Seramik kaplama pişirimi", "Vakumlu porselen fırınlama", "Dental laboratuvar restorasyon işleri"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Vakum ihtiyacı", "Porselen materyal çevrimi", "Fırın ısınma ve homojenlik beklentisi"] },
    ],
    devicesTitle: "Porselen ve seramik dental laboratuvar akışıyla çalışır",
    devicesTextHtml: "Seramik kaplama materyali, vakum ihtiyacı ve fırın çevrimi birlikte değerlendirilmelidir.",
    deviceChips: [{ label: "Porselen" }, { label: "Vakum" }, { label: "Seramik kaplama" }, { label: "Homojen ısı", highlighted: true }],
    faqItems: [
      { question: "VL 01/12 LB Porselen Fırını ne için kullanılır?", answerHtml: "Geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır." },
      { question: "Isıtma yapısı nasıldır?", answerHtml: "Fırın odasının çepeçevre ısıtılması eşit sıcaklık homojenliğini destekler." },
      { question: "Hızlı ısınır mı?", answerHtml: "Ürün açıklamasında çok hızlı ısınma süreleri sağladığı belirtilir." },
    ],
    videoTitleHtml: 'Porselen fırın seçimini <span class="em">birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın uyumunu kontrol edebilirsiniz.",
    videoTitle: "VL 01/12 LB Porselen Fırını teknik destek",
    videoText: "Porselen pişirim, vakum ve fırın çevrimi için uzman desteği alın.",
  },
  {
    slug: MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG,
    category: TITANIUM_CATEGORY,
    productText: "MESA Titanyum Disk Grade 5 ELI",
    kicker: "MESA Grade 5 ELI · Dental CAD/CAM Titanyum Disk",
    titleHtml: 'İmplant üstü restorasyonda <span class="em">biyouyumlu titanyum.</span>',
    leadHtml:
      "MESA Grade 5 ELI titanyum disk, implant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar. Ø98.5 mm formu ile CAD/CAM sistemlerle uyumlu, dental laboratuvarlar için güvenilir bir çözümdür.",
    pills: [{ value: "Grade 5", label: "ELI" }, { value: "Ø98.5", label: "mm" }, { label: "CAD/CAM" }, { label: "İmplant üstü" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8eaf20f5-0227-4f18-b8fc-7f054422ce88/1080/mesa-titanyum-disk.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/12bb1fd1-ea51-4b79-9003-956f2298dd1c/1080/mesa-titanyum-disk.webp",
    ],
    galleryBadge: "GRADE 5",
    metricTitleHtml: 'Yüksek dayanım ve <span class="em">biyouyumluluk.</span>',
    metricSideHtml: "MESA Grade 5 ELI disk, implant üstü restorasyonlarda CAD/CAM frezeleme akışı için konumlandırılır.",
    metrics: [
      { name: "Materyal", value: "Grade", unit: "5 ELI", tag: "Titanium", caption: "Ürün adı ve açıklamasında Grade 5 ELI titanyum olarak listelenir." },
      { name: "Çap", value: "98.5", unit: "mm", tag: "CAD/CAM", caption: "Kaynak açıklamada Ø98.5 mm formu belirtilir." },
      { name: "Kullanım", value: "İmplant", unit: "üstü", tag: "Dental", caption: "İmplant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar." },
    ],
    specTag: "MESA · GRADE 5 ELI · Ø98.5 MM",
    specTitleHtml: 'CAD/CAM frezeleme için <span class="em">titanyum disk.</span>',
    specDescriptionHtml: "MESA Grade 5 ELI, implant üstü restorasyonlarda CAD/CAM sistemlerle uyumlu yüksek dayanımlı titanyum disk çözümüdür.",
    specRows: [
      { label: "Materyal", value: "Titanyum Grade 5 ELI" },
      { label: "Çap", value: "Ø98.5 mm" },
      { label: "Kullanım", value: "İmplant üstü restorasyon" },
      { label: "Uyum", value: "CAD/CAM sistemler" },
      { label: "Kategori", value: "Titanyum disk" },
    ],
    useCaseSideHtml: "İmplant üstü restorasyonlar ve CAD/CAM frezeleme iş akışlarında kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "İmplant üstü", text: "Yüksek dayanım ve biyouyumluluk isteyen restorasyonlar.", alt: "MESA titanyum implant üstü restorasyon" },
      { imageIndex: 1, title: "CAD/CAM", text: "Ø98.5 mm disk formuyla frezeleme akışı.", alt: "MESA titanyum CAD CAM" },
      { imageIndex: 1, title: "Dental lab", text: "Laboratuvar için güvenilir materyal çözümü.", alt: "MESA titanyum dental laboratuvar" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["İmplant üstü restorasyonlar", "CAD/CAM frezeleme", "Dental laboratuvar titanyum işleri"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Disk kalınlığı / boyutu", "Freze uyumu", "İmplant üstü endikasyon"] },
    ],
    devicesTitle: "Dental CAD/CAM freze sistemleriyle çalışır",
    devicesTextHtml: "Ø98.5 mm disk formu ve Grade 5 ELI titanyum materyal, implant üstü CAD/CAM restorasyon işlerinde kullanılır.",
    deviceChips: [{ label: "CAD/CAM freze" }, { label: "Ø98.5 mm" }, { label: "İmplant üstü" }, { label: "Grade 5 ELI", highlighted: true }],
    faqItems: [
      { question: "MESA Grade 5 ELI ne için kullanılır?", answerHtml: "İmplant üstü restorasyonlar için kullanılan CAD/CAM uyumlu titanyum disktir." },
      { question: "Disk çapı nedir?", answerHtml: "Ürün açıklamasında Ø98.5 mm formu belirtilir." },
      { question: "Biyouyumlu mudur?", answerHtml: "Kaynak açıklamada yüksek dayanım ve biyouyumluluk sunduğu belirtilir." },
    ],
    videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
    videoTitleHtml: 'Titanyum CAD/CAM akışını <span class="em">videoda görün.</span>',
    videoSideHtml: "Ürün sayfasındaki video ile MESA titanyum disk iş akışını inceleyin.",
    videoTitle: "MESA Grade 5 ELI titanyum disk",
    videoText: "Dental CAD/CAM titanyum disk ve implant üstü restorasyon akışı videosu.",
  },
  {
    slug: TRASFORMER_COMP_FLOW_SLUG,
    category: SYSTEM_CATEGORY,
    productText: "Trasformer Comp Flow Şırınga Kompozit",
    kicker: "CRS Trasformer Comp Flow · Şırınga Kompozit",
    titleHtml: 'Tam çene kompozitte <span class="em">akışkan restorasyon.</span>',
    leadHtml:
      "Trasformer Comp Flow Şırınga Kompozit, Trasformer Light Glass Mufla Sistemi ile birlikte tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen dijital laboratuvar akışında kullanılır.",
    pills: [{ label: "Comp Flow" }, { label: "Şırınga kompozit" }, { label: "Tam çene" }, { label: "CRS" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2eb7407c-c84b-4bf3-bb87-343b261f6854/1080/iso.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/28c424ec-645c-429c-bdcd-274c0dad3ac8/1080/1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/94af1b68-60ef-4a34-ad37-e0601e02e183/1080/2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6cc51852-fb8a-4d54-b2e6-e8d0a14cb618/1080/3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bd485d92-3abb-40e2-92f3-f7b20642bc45/1080/4.webp",
    ],
    galleryBadge: "COMP FLOW",
    metricTitleHtml: 'Kompozit restorasyonda <span class="em">akış ve stabilite.</span>',
    metricSideHtml: "Comp Flow, Trasformer sistem akışında tam çene kompozit restorasyonlar için kullanılan şırınga kompozit ürünüdür.",
    metrics: [
      { name: "Form", value: "Flow", unit: "", tag: "Şırınga", caption: "Şırınga kompozit formunda listelenir." },
      { name: "Uygulama", value: "Tam", unit: "çene", tag: "Composite", caption: "Tam çene kompozit restorasyon sistemiyle birlikte kullanılır." },
      { name: "Sistem", value: "Light", unit: "Glass", tag: "Trasformer", caption: "Mufla sistemiyle birlikte doğruluk ve ışık geçirgenliği hedefler." },
    ],
    specTag: "TRASFORMER · COMP FLOW",
    specTitleHtml: 'Light Glass sisteminde <span class="em">kompozit akışı.</span>',
    specDescriptionHtml: "Comp Flow, Trasformer Light Glass Mufla Sistemi ile birlikte tam çene kompozit restorasyonlarda kullanılmak üzere konumlandırılır.",
    specRows: [
      { label: "Ürün", value: "Şırınga kompozit" },
      { label: "Sistem", value: "Trasformer Light Glass" },
      { label: "Kullanım", value: "Tam çene kompozit restorasyon" },
      { label: "Marka", value: "CRS" },
      { label: "Kategori", value: "Sistemler" },
    ],
    useCaseSideHtml: "Tam çene kompozit restorasyon ve Light Glass mufla sistemiyle birlikte kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Comp Flow", text: "Şırınga kompozit uygulama akışı.", alt: "Trasformer Comp Flow" },
      { imageIndex: 2, title: "Tam çene", text: "Kompozit restorasyon sistemi.", alt: "Trasformer tam çene kompozit" },
      { imageIndex: 3, title: "Light Glass", text: "Mufla sistemiyle birlikte çalışma.", alt: "Trasformer Light Glass uygulama" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Tam çene kompozit restorasyonlar", "Light Glass mufla sistemi", "Dijital laboratuvar kompozit akışı"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Renk seçimi", "Mufla sistemi uyumu", "Restorasyon vaka planı"] },
    ],
    devicesTitle: "Trasformer Light Glass Mufla Sistemi ile çalışır",
    devicesTextHtml: "Comp Flow, Light Glass sistem akışındaki kompozit uygulama adımıdır. Vaka planı ve sistem uyumunu birlikte değerlendirebiliriz.",
    deviceChips: [{ label: "Light Glass" }, { label: "Comp Flow" }, { label: "Tam çene" }, { label: "CRS", highlighted: true }],
    faqItems: [
      { question: "Trasformer Comp Flow ne için kullanılır?", answerHtml: "Trasformer Light Glass sistemiyle birlikte tam çene kompozit restorasyon akışında kullanılan şırınga kompozittir." },
      { question: "Tek başına mı kullanılır?", answerHtml: "Ürün, Light Glass mufla sistemiyle birlikte çalışan restorasyon akışı içinde konumlandırılır." },
      { question: "Hangi hedeflere odaklanır?", answerHtml: "Kaynak açıklamada doğruluk, ışık geçirgenliği ve stabilite hedefleri vurgulanır." },
    ],
    videoTitleHtml: 'Comp Flow uyumunu <span class="em">birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için sistem uyumunu teknik destek üzerinden kontrol edebilirsiniz.",
    videoTitle: "Trasformer Comp Flow teknik destek",
    videoText: "Renk, sistem uyumu ve tam çene kompozit vaka akışı için uzman desteği alın.",
  },
  {
    slug: TRASFORMER_LIGHT_GLASS_SLUG,
    category: SYSTEM_CATEGORY,
    productText: "Trasformer Light Glass Mufla Sistemi",
    kicker: "CRS Trasformer Light Glass · Mufla Sistemi",
    titleHtml: 'Tam çene kompozitte <span class="em">ışık geçirgenliği ve stabilite.</span>',
    leadHtml:
      "Trasformer Light Glass Mufla Sistemi, modern dijital laboratuvarların tam çene kompozit restorasyonlarda ihtiyaç duyduğu doğruluk, ışık geçirgenliği ve stabiliteyi üst seviyede sunmak için tasarlanmıştır.",
    pills: [{ label: "Light Glass" }, { label: "Mufla sistemi" }, { label: "Tam çene" }, { label: "Kompozit restorasyon" }],
    images: [
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ee5b1f34-39b8-4ca3-b9d1-e911a6547b71/1080/tra.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/28c424ec-645c-429c-bdcd-274c0dad3ac8/1080/1.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/94af1b68-60ef-4a34-ad37-e0601e02e183/1080/2.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6cc51852-fb8a-4d54-b2e6-e8d0a14cb618/1080/3.webp",
      "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bd485d92-3abb-40e2-92f3-f7b20642bc45/1080/4.webp",
    ],
    galleryBadge: "LIGHT GLASS",
    metricTitleHtml: 'Doğruluk, ışık geçirgenliği ve <span class="em">stabilite.</span>',
    metricSideHtml: "Light Glass, tam çene kompozit restorasyonlarda modern dijital laboratuvarların ihtiyaç duyduğu sistem akışını destekler.",
    metrics: [
      { name: "Sistem", value: "Light", unit: "Glass", tag: "Mufla", caption: "Mufla sistemi olarak listelenir." },
      { name: "Uygulama", value: "Tam", unit: "çene", tag: "Composite", caption: "Tam çene kompozit restorasyon hedefler." },
      { name: "Hedef", value: "Stabil", unit: "akış", tag: "Lab", caption: "Doğruluk, ışık geçirgenliği ve stabilite vurgulanır." },
    ],
    specTag: "TRASFORMER · LIGHT GLASS",
    specTitleHtml: 'Tam çene kompozit için <span class="em">mufla sistemi.</span>',
    specDescriptionHtml: "Light Glass Mufla Sistemi, tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite ihtiyacını karşılamak için tasarlanmıştır.",
    specRows: [
      { label: "Ürün", value: "Mufla sistemi" },
      { label: "Sistem", value: "Trasformer Light Glass" },
      { label: "Kullanım", value: "Tam çene kompozit restorasyon" },
      { label: "Hedef", value: "Doğruluk / ışık geçirgenliği / stabilite" },
      { label: "Kategori", value: "Sistemler" },
    ],
    useCaseSideHtml: "Tam çene kompozit restorasyonlarda sistem stabilitesi ve ışık geçirgenliği için kullanılır.",
    useCasePhotos: [
      { imageIndex: 1, title: "Mufla sistemi", text: "Light Glass restorasyon akışı.", alt: "Trasformer Light Glass mufla sistemi" },
      { imageIndex: 2, title: "Tam çene", text: "Kompozit restorasyon planı.", alt: "Trasformer Light Glass tam çene" },
      { imageIndex: 3, title: "Stabilite", text: "Işık geçirgenliği ve doğruluk hedefi.", alt: "Trasformer Light Glass stabilite" },
    ],
    useCaseCards: [
      { eyebrow: "Kullanım", title: "Nerede kullanılır?", items: ["Tam çene kompozit restorasyonlar", "Dijital laboratuvar restorasyon akışı", "Comp Flow ile sistem çalışması"] },
      { eyebrow: "Kontrol", title: "Neler netleşir?", items: ["Mufla sistemi kullanımı", "Kompozit materyal seçimi", "Vaka planı ve restorasyon hedefi"] },
    ],
    devicesTitle: "Comp Flow ve tam çene kompozit akışıyla çalışır",
    devicesTextHtml: "Light Glass sistemi, Comp Flow kompozit ve restorasyon planıyla birlikte değerlendirilmelidir.",
    deviceChips: [{ label: "Mufla sistemi" }, { label: "Comp Flow" }, { label: "Tam çene" }, { label: "Light Glass", highlighted: true }],
    faqItems: [
      { question: "Trasformer Light Glass ne için kullanılır?", answerHtml: "Tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen mufla sistemidir." },
      { question: "Hangi ürünle birlikte çalışır?", answerHtml: "Trasformer Comp Flow şırınga kompozit ile aynı sistem akışında kullanılır." },
      { question: "Hangi laboratuvarlar için uygundur?", answerHtml: "Modern dijital laboratuvarların tam çene kompozit restorasyon akışları için konumlandırılır." },
    ],
    videoTitleHtml: 'Light Glass sistemini <span class="em">birlikte netleştirin.</span>',
    videoSideHtml: "Bu ürün sayfasında ürün videosu bulunmadığı için sistem uyumunu teknik destek üzerinden kontrol edebilirsiniz.",
    videoTitle: "Trasformer Light Glass teknik destek",
    videoText: "Mufla sistemi, Comp Flow uyumu ve tam çene kompozit vaka akışı için uzman desteği alın.",
  },
];

export const LAB_PRODUCT_DETAIL_DATA_BY_SLUG: Record<string, ProductDetailTemplateData> = Object.fromEntries(
  LAB_PRODUCT_CONFIGS.map((config) => [config.slug, labProductDetail(config)]),
);

const LAB_PRODUCT_ALIASES: Record<string, string[]> = {
  [MASH_W1E_ULTRASONIC_WASH_SLUG]: ["mash-w1e", "w1e", "ultrasonik-yikama", "washing-device"],
  [MASH_C1E_UV_CURING_SLUG]: ["mash-c1e", "c1e", "uv-kurleme", "dental-post-cure"],
  [CREALITY_WASH_CURE_UW03_SLUG]: ["creality-wash-cure-uw-03", "creality-washcure-uw-03", "uw-03", "uw-02"],
  [THREESHAPE_E2_SLUG]: ["3shape-e2", "e2-yuksek-uretkenlik"],
  [THREESHAPE_E3_SLUG]: ["3shape-e3", "implant-bar-dogrulugu"],
  [THREESHAPE_E4_SLUG]: ["3shape-e4", "hiz-ve-hassasiyet"],
  [NABERTHEM_LHT_02_17_LB_SPEED_SLUG]: ["lht-02-17-lb-speed", "nabertherm-lht-02-17"],
  [NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG]: ["lht-01-16-turbo-fire", "nabertherm-lht-01-16"],
  [NABERTHEM_VL_01_12_LB_PRESS_SLUG]: ["vl-01-12-lb-press", "vl-01-12-lb-pres", "press-firini", "pres-firini"],
  [NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG]: ["vl-01-12-lb-porselen", "porcelain-firini", "porselen-firini"],
  [MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG]: ["mesa-grade-5-eli", "titanyum-disk", "titanium-disk"],
  [TRASFORMER_COMP_FLOW_SLUG]: ["trasformer-comp-flow", "comp-flow-siringa-kompozit"],
  [TRASFORMER_LIGHT_GLASS_SLUG]: ["trasformer-light-glass", "light-glass-mufla"],
  [MASH_P16L_PRINTER_SLUG]: ["mash-p16l", "385nm-16k", "16k-dental-3d-yazici"],
  [MASH_CURIE_M1_DENTAL_SLUG]: ["mash-curie-m1-dental", "curie-m1-dental", "yerli-dental-3d-printer"],
  [MASH_CURIE_M1_JEWELRY_SLUG]: ["mash-curie-m1-jewelry", "curie-m1-jewelry", "jewelry-3d-printer", "kuyumculuk"],
  [CREALITY_HALOT_SKY_6K_SLUG]: ["creality-halot-sky", "halot-sky-6k", "fabrika-cikisli-versiyon", "hassasiyeti-arttirilmis-versiyon"],
};

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function slugifyProduct(value?: string) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productSlug(product: unknown) {
  const data = product as { slug?: unknown; handle?: unknown; url?: unknown; path?: unknown; name?: unknown } | null;
  const raw = stringValue(data?.slug) || stringValue(data?.handle) || stringValue(data?.url) || stringValue(data?.path) || slugifyProduct(stringValue(data?.name));
  const slug = raw.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop();
  if (slug) return slug;
  if (typeof window === "undefined") return "";
  return window.location.pathname.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop() || "";
}

function productLooksLikeCrsComposite(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_COMPOSITE_SLUG || name.includes("crs-composite") || name.includes("custom-composite-resin");
}

function productLooksLikeSplintHard(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_SPLINT_HARD_SLUG || name.includes("crs-splint-hard") || name.includes("sert-gece-plagi");
}

function productLooksLikeSplintSoft(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_SPLINT_SOFT_SLUG || name.includes("crs-splint-soft") || name.includes("dental-splint-gece-plak");
}

function productLooksLikeGuide(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_GUIDE_SLUG || name.includes("crs-guide-resin") || name.includes("kilavuz-recinesi") || name.includes("cerrahi-rehber");
}

function productLooksLikeIbt(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_IBT_SLUG || name.includes("crs-ibt-resin") || name.includes("ortodontik-ibt");
}

function productLooksLikeFlexit(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_FLEXIT_SLUG || name.includes("crs-flexit") || name.includes("flexit-recin");
}

function productLooksLikeAligner(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_ALIGNER_SLUG || name.includes("crs-aligner") || name.includes("memory-shape") || name.includes("aligner-recinesi");
}

function productLooksLikeDenture(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_DENTURE_SLUG || name.includes("crs-denture") || name.includes("biouyumlu-protez");
}

function productLooksLikeGingiva(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_GINGIVA_SLUG || name.includes("crs-gingiva") || name.includes("yirtilmaz-dis-eti");
}

function productLooksLikeModel(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_MODEL_SLUG || name.includes("crs-model") || name.includes("yuksek-hassasiyetli-model");
}

function productLooksLikeTray(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_TRAY_SLUG || name.includes("crs-tray") || name.includes("olcu-kasigi");
}

function productLooksLikeMashClear(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === MASH_CLEAR_SLUG || name.includes("mash-clear") || name.includes("dental-cerrahi-kilavuz");
}

function productLooksLikeCast(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === CRS_CAST_SLUG || name.includes("crs-cast") || name.includes("cekmeyen-dokum");
}

function productLooksLikeStudy(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === MASH_STUDY_SLUG || name.includes("mash-study") || name.includes("dental-model-3d-yazici");
}

function productLooksLikeTrialPink(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === MASH_TRIAL_PINK_SLUG || name.includes("mash-trial-pink") || name.includes("dental-try-in-gecici");
}

function productLooksLikeTrialWhite(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  return slug === MASH_TRIAL_WHITE_SLUG || name.includes("mash-trial-white") || name.includes("gecici-dental");
}

function printerSparePartData(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  const haystack = `${slug} ${name}`;
  const direct = PRINTER_SPARE_PART_DETAIL_DATA_BY_SLUG[slug];
  if (direct) return direct;

  for (const config of PRINTER_SPARE_PART_CONFIGS) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(PRINTER_SPARE_PART_ALIASES[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return PRINTER_SPARE_PART_DETAIL_DATA_BY_SLUG[config.slug];
    }
  }

  return undefined;
}

function zirconBlockData(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  const haystack = `${slug} ${name}`;
  const direct = ZIRCON_BLOCK_DETAIL_DATA_BY_SLUG[slug];
  if (direct) return direct;

  for (const config of ZIRCON_BLOCK_CONFIGS) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(ZIRCON_BLOCK_ALIASES[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return ZIRCON_BLOCK_DETAIL_DATA_BY_SLUG[config.slug];
    }
  }

  return undefined;
}

function labProductData(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  const haystack = `${slug} ${name}`;
  const direct = LAB_PRODUCT_DETAIL_DATA_BY_SLUG[slug];
  if (direct) return direct;

  for (const config of LAB_PRODUCT_CONFIGS) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(LAB_PRODUCT_ALIASES[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return LAB_PRODUCT_DETAIL_DATA_BY_SLUG[config.slug];
    }
  }

  return undefined;
}

function parseJson(source: unknown) {
  const text = typeof source === "string" ? source.trim() : "";
  if (!text) return undefined;
  try {
    const parsed = JSON.parse(text);
    return isPlainObject(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) return (override === undefined ? base : override) as T;
  const next: PlainObject = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) next[key] = value;
    else if (isPlainObject(value) && isPlainObject(next[key])) next[key] = deepMerge(next[key], value);
    else if (value !== undefined) next[key] = value;
  }
  return next as T;
}

export function resolveProductDetailData(product: unknown, productTemplateJson?: unknown) {
  const override = parseJson(productTemplateJson);
  const zirconData = zirconBlockData(product);
  const sparePartData = printerSparePartData(product);
  const labData = labProductData(product);
  const baseData = zirconData
    ? zirconData
    : sparePartData
      ? sparePartData
      : labData
        ? labData
    : productLooksLikeTrialWhite(product)
    ? MASH_TRIAL_WHITE_PRODUCT_DETAIL_DATA
    : productLooksLikeTrialPink(product)
      ? MASH_TRIAL_PINK_PRODUCT_DETAIL_DATA
      : productLooksLikeStudy(product)
        ? MASH_STUDY_PRODUCT_DETAIL_DATA
        : productLooksLikeCast(product)
          ? CRS_CAST_PRODUCT_DETAIL_DATA
          : productLooksLikeMashClear(product)
            ? MASH_CLEAR_PRODUCT_DETAIL_DATA
            : productLooksLikeTray(product)
              ? CRS_TRAY_PRODUCT_DETAIL_DATA
              : productLooksLikeModel(product)
                ? CRS_MODEL_PRODUCT_DETAIL_DATA
                : productLooksLikeGingiva(product)
                  ? CRS_GINGIVA_PRODUCT_DETAIL_DATA
                  : productLooksLikeDenture(product)
                    ? CRS_DENTURE_PRODUCT_DETAIL_DATA
                    : productLooksLikeAligner(product)
                      ? CRS_ALIGNER_PRODUCT_DETAIL_DATA
                      : productLooksLikeFlexit(product)
                        ? CRS_FLEXIT_PRODUCT_DETAIL_DATA
                        : productLooksLikeIbt(product)
                          ? CRS_IBT_PRODUCT_DETAIL_DATA
                          : productLooksLikeGuide(product)
                            ? CRS_GUIDE_PRODUCT_DETAIL_DATA
                            : productLooksLikeSplintSoft(product)
                              ? CRS_SPLINT_SOFT_PRODUCT_DETAIL_DATA
                              : productLooksLikeSplintHard(product)
                                ? CRS_SPLINT_HARD_PRODUCT_DETAIL_DATA
                                : productLooksLikeCrsComposite(product)
                                  ? CRS_COMPOSITE_PRODUCT_DETAIL_DATA
                                  : override
                                    ? CRS_COMPOSITE_PRODUCT_DETAIL_DATA
                                    : null;
  if (!baseData) return null;
  const data = override ? deepMerge(baseData, override) : baseData;
  return {
    ...data,
    key: `${data.key}-${productSlug(product) || "studio"}`,
  };
}

export function resolveSharedProductDetailData(product: unknown, productTemplateJson?: unknown) {
  const direct = resolveProductDetailData(product, productTemplateJson);
  if (direct) return direct;
  return currentSharedProductDetailData();
}

function currentSharedProductDetailData() {
  if (typeof window === "undefined") return null;
  const shared = (window as unknown as { __THREE_MASH_PRODUCT_DETAIL_DATA__?: unknown }).__THREE_MASH_PRODUCT_DETAIL_DATA__;
  if (!shared || typeof shared !== "object") return null;
  const data = shared as Partial<ProductDetailTemplateData>;
  return data.key && data.hero ? (shared as ProductDetailTemplateData) : null;
}

export function publishSharedProductDetailData(data: ProductDetailTemplateData | null) {
  if (typeof window === "undefined") return;
  (window as unknown as { __THREE_MASH_PRODUCT_DETAIL_DATA__?: unknown }).__THREE_MASH_PRODUCT_DETAIL_DATA__ = data;
  window.dispatchEvent(new CustomEvent(SHARED_PRODUCT_DETAIL_EVENT, { detail: data }));
}

export function useSharedProductDetailData(product: unknown, productTemplateJson?: unknown) {
  const direct = useMemo(() => resolveProductDetailData(product, productTemplateJson), [product, productTemplateJson]);
  const [shared, setShared] = useState<ProductDetailTemplateData | null>(() => (direct ? null : currentSharedProductDetailData()));

  useEffect(() => {
    if (direct || typeof window === "undefined") return undefined;
    const update = (event?: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : undefined;
      setShared(detail && typeof detail === "object" ? (detail as ProductDetailTemplateData) : currentSharedProductDetailData());
    };
    update();
    window.addEventListener(SHARED_PRODUCT_DETAIL_EVENT, update);
    return () => window.removeEventListener(SHARED_PRODUCT_DETAIL_EVENT, update);
  }, [direct?.key]);

  return direct || shared;
}
