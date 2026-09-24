import { isEnglishLocale, tLocalized, EN_TO_TR_ROUTE_MAP } from "../../utils/i18n";
import type { ProductDetailTemplateData, ProductGalleryItem } from "../ThreeMashProductDetailTemplate";
import { useEffect, useMemo, useState } from "preact/hooks";
import {
  p16lDentalModelImage,
  p16lPrinterOpenImage,
  p16lPrintPlateImage,
} from "../../assets/p16l-detail-media-data";
import { mashC1eDentalCureImage, mashC1eOpenImage } from "../../assets/mash-c1e-detail-media-data";
import { mashW1eControlFlowImage, mashW1eWaterTankImage } from "../../assets/mash-w1e-detail-media-data";
import { curieM1DentalPrintersImage, curieM1DentalSectionVideo } from "../../assets/curie-m1-dental-media-data";

type PlainObject = Record<string, unknown>;
const SHARED_PRODUCT_DETAIL_EVENT = "three-mash:product-detail-data";

export const CRS_COMPOSITE_SLUG = "crs-composite-mukemmel-dayanimli-gecici-recinesi";
export const CRS_SPLINT_HARD_SLUG = "crs-splint-hard-resin-sert-gece-plagi-recinesi";
export const CRS_SPLINT_SOFT_SLUG = "crs-splint-soft-resin-dental-splint-gece-plak-recinesi";
export const CRS_GUIDE_SLUG = tLocalized("guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber");
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
export const MASH_P16L_MAINBOARD_SLUG = "mash-p16l-main-board";
export const MASH_P16L_LARGE_BUILD_PLATE_SLUG = "mash-p16l-large-printing-platform";
export const MASH_P16L_SMALL_BUILD_PLATE_SLUG = "mash-p16l-small-printing-platform";
export const MASH_P16L_LCD_SCREEN_SLUG = "mash-p16l-16k-monochrome-lcd-screen";
export const MASH_P16L_RESIN_TANK_SLUG = "mash-p16l-resin-tank";
export const ARGENZ_ST_MULTILAYER_SLUG = "argenz-st-multilayer-zirconia-block";
export const ARGENZ_HT_PLUS_SLUG = "argenz-ht-plus-zirconia-block";
export const ARGENZ_HT_MULTILAYER_SLUG = "argenz-ht-plus-multilayer-zirconia-block";
export const CREALITY_WASH_CURE_UW03_SLUG = "creality-washcure-uw-02";
export const THREESHAPE_E2_SLUG = "3shape-e2";
export const THREESHAPE_E3_SLUG = "3shape-e3";
export const THREESHAPE_E4_SLUG = "3shape-e4";
export const NABERTHEM_LHT_02_17_LB_SPEED_SLUG = "naberthem-lht-02-17-lb-speed";
export const NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG = "naberthem-lht-01-16-turbo-fire";
export const NABERTHEM_VL_01_12_LB_PRESS_SLUG = "naberthem-vl-01-12-lb-press-firini";
export const NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG = "naberthem-vl-01-12-lb-porselen-firini";
export const MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG = "mesa-titanium-disk-grade-5-eli";
export const TRASFORMER_COMP_FLOW_SLUG = "transformer-comp-flow-syringe-composite";
export const TRASFORMER_LIGHT_GLASS_SLUG = "trasformer-light-glass-mufla-sistemi";
export const MASH_P16L_PRINTER_SLUG = "mash-p16l-385nm-16k-dental-3d-yazici";
export const MASH_CURIE_M1_DENTAL_SLUG = "mash-curie-m1-dental-3d-yazici";
export const MASH_CURIE_M1_JEWELRY_SLUG = "mash-curie-m1-jewelry-3d-printer";
export const CREALITY_HALOT_SKY_6K_SLUG = "creality-halot-sky-6k";
export const MASH_C1E_UV_CURING_SLUG = "mash-c1e-uv-curing-device";
export const MASH_W1E_ULTRASONIC_WASH_SLUG = "mash-w1e-ultrasonic-washing-machine";

const CRS_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/540/composite-resin-ce.webp",
    alt: tLocalized("CRS Composite CE Class IIa sertifikalı geçici ve daimi reçinesi", "CRS Composite CE Class IIa certified temporary and permanent resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/540/composite-apps-10.webp",
    alt: tLocalized("CRS Composite kron uygulaması", "CRS Composite crown application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/540/composite-apps-11.webp",
    alt: tLocalized("CRS Composite köprü uygulaması", "CRS Composite bridge application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/540/composite-apps-12.webp",
    alt: tLocalized("CRS Composite restorasyon", "CRS Composite restoration"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/1080/sand-model-gecici-4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/540/sand-model-gecici-4.webp",
    alt: tLocalized("CRS Composite model üzerinde geçici", "Temporary on the CRS Composite model"),
  },
];

const CRS_SPLINT_HARD_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/360/crs-splint-hard-recinesi.webp",
    alt: tLocalized("CRS Splint Hard Resin sert gece plağı reçinesi", "CRS Splint Hard Resin hard night guard resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/45b5d119-bc08-42a6-8527-86f92b0abda6/1080/crs-splint-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/45b5d119-bc08-42a6-8527-86f92b0abda6/360/crs-splint-recinesi1.webp",
    alt: tLocalized("CRS Splint Hard gece plağı uygulaması", "CRS Splint Hard night guard application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cd9ee7ca-ecfa-4453-bbff-ee14aaeea02f/1080/crs-splint-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cd9ee7ca-ecfa-4453-bbff-ee14aaeea02f/360/crs-splint-recinesi2.webp",
    alt: tLocalized("CRS Splint Hard oklüzal splint üretimi", "CRS Splint Hard occlusal splint production"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/664284b2-8376-4ac8-8455-f234ee158aad/1080/crs-splint-recinesi3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/664284b2-8376-4ac8-8455-f234ee158aad/360/crs-splint-recinesi3.webp",
    alt: tLocalized("CRS Splint Hard bruksizm apareyi", "CRS Splint Hard bruxism appliance"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/1080/crs-splint-hard-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6a5caf0d-41e6-4569-91d1-e3844307016b/360/crs-splint-hard-recinesi.webp",
    alt: tLocalized("CRS Splint Hard Resin ürün görseli", "CRS Splint Hard Resin product image"),
  },
];

const CRS_SPLINT_SOFT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/360/crs-splint-soft-recinesi.webp",
    alt: tLocalized("CRS Splint Soft Resin esnek dental splint reçinesi", "CRS Splint Soft Resin flexible dental splint resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c5552c6e-f346-4dd0-b974-608ccda1fba4/1080/crs-splint-recinesi-soft1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c5552c6e-f346-4dd0-b974-608ccda1fba4/360/crs-splint-recinesi-soft1.webp",
    alt: tLocalized("CRS Splint Soft gece plağı uygulaması", "CRS Splint Soft night guard application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5274dd0d-1af2-4832-9eed-de9998160fc5/1080/crs-splint-recinesi-soft2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5274dd0d-1af2-4832-9eed-de9998160fc5/360/crs-splint-recinesi-soft2.webp",
    alt: tLocalized("CRS Splint Soft dental splint uygulaması", "CRS Splint Soft dental splint application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/350ca24c-0572-4760-8623-871c5d67d8f9/1080/crs-splint-recinesi-soft3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/350ca24c-0572-4760-8623-871c5d67d8f9/360/crs-splint-recinesi-soft3.webp",
    alt: tLocalized("CRS Splint Soft bruksizm plağı uygulaması", "CRS Splint Soft bruxism plate application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/1080/crs-splint-soft-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84056e70-fddc-4ac0-a3d7-fa10ae5a8e91/360/crs-splint-soft-recinesi.webp",
    alt: tLocalized("CRS Splint Soft Resin ürün görseli", "CRS Splint Soft Resin product image"),
  },
];

const CRS_GUIDE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/360/crs-guide-resin.webp",
    alt: tLocalized("CRS Guide Resin biyouyumlu cerrahi rehber reçinesi", "CRS Guide Resin biocompatible surgical guide resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ddecd85-7749-449a-b564-b7ec6dc8e136/1080/crs-guide-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ddecd85-7749-449a-b564-b7ec6dc8e136/360/crs-guide-resin1.webp",
    alt: tLocalized("CRS Guide Resin cerrahi rehber uygulaması", "CRS Guide Resin surgical guide application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f30c711f-992d-4767-9538-ef47437dbf83/1080/crs-guide-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f30c711f-992d-4767-9538-ef47437dbf83/360/crs-guide-resin2.webp",
    alt: tLocalized("CRS Guide Resin implant cerrahisi rehberi", "CRS Guide Resin implant surgery guide"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8433fe40-ae4c-49ed-84fb-c35dbcd350d6/1080/crs-guide-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8433fe40-ae4c-49ed-84fb-c35dbcd350d6/360/crs-guide-resin3.webp",
    alt: tLocalized("CRS Guide Resin şeffaf cerrahi kılavuz", "CRS Guide Resin transparent surgical guide"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/1080/crs-guide-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9017365d-02db-416c-8f5f-20f23aacc133/360/crs-guide-resin.webp",
    alt: tLocalized("CRS Guide Resin ürün görseli", "CRS Guide Resin product image"),
  },
];

const CRS_IBT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/1080/crs-ibt-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/20106d91-ee0d-4ccd-8f0e-611c339e822c/360/crs-ibt-resin.webp",
    alt: tLocalized("CRS IBT Resin ortodontik indirekt bonding tray reçinesi", "CRS IBT Resin orthodontic indirect bonding tray resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: tLocalized("CRS IBT Resin indirekt bonding tray uygulaması", "CRS IBT Resin indirect bonding tray application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: tLocalized("CRS IBT Resin hassas braket aktarımı", "CRS IBT Resin precise bracket transfer"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: tLocalized("CRS IBT Resin ortodontik plak uygulaması", "CRS IBT Resin orthodontic tray application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/1080/crs-ibt-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f845278b-1cce-47e2-b7ee-576e27415b6a/360/crs-ibt-recinesi1.webp",
    alt: tLocalized("CRS IBT Resin uygulama görseli", "CRS IBT Resin application image"),
  },
];

const CRS_FLEXIT_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/1080/crs-flexit-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ccf1eb09-6a39-49db-9d40-9eff4edfa449/360/crs-flexit-resin.webp",
    alt: tLocalized("CRS Flexit Reçinesi esnek protez reçinesi", "CRS Flexit Resin flexible denture resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bea34996-12b1-4775-96ca-0bc1880ae03a/1080/crs-flexit-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bea34996-12b1-4775-96ca-0bc1880ae03a/360/crs-flexit-recinesi1.webp",
    alt: tLocalized("CRS Flexit çıkarılabilir protez uygulaması", "CRS Flexit removable denture application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8ef9e682-529d-4f77-8405-7844cd208187/1080/crs-flexit-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8ef9e682-529d-4f77-8405-7844cd208187/360/crs-flexit-recinesi2.webp",
    alt: tLocalized("CRS Flexit parsiyel protez uygulaması", "CRS Flexit partial denture application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce2b0ba4-4c6e-47f1-8a27-f3450c1b6b07/1080/crs-flexit-recinesi3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce2b0ba4-4c6e-47f1-8a27-f3450c1b6b07/360/crs-flexit-recinesi3.webp",
    alt: tLocalized("CRS Flexit doğal diş eti estetiği", "CRS Flexit natural gingival aesthetics"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/42ce95b7-fceb-47a0-aad3-042c830d9935/1080/crs-flexit-recinesi4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/42ce95b7-fceb-47a0-aad3-042c830d9935/360/crs-flexit-recinesi4.webp",
    alt: tLocalized("CRS Flexit esnek protez üretimi", "CRS Flexit flexible denture production"),
  },
];

const CRS_ALIGNER_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/360/aligner-resin.webp",
    alt: tLocalized("CRS Aligner memory shape özellikli ortodontik reçine", "CRS Aligner orthodontic resin with memory shape feature"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2058639a-539a-4d61-8ce6-52d094b1ea7a/1080/aligner-resin4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2058639a-539a-4d61-8ce6-52d094b1ea7a/360/aligner-resin4.webp",
    alt: tLocalized("CRS Aligner direkt baskı hizalayıcı uygulaması", "CRS Aligner direct-print aligner application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84e0f9fe-d156-43bc-9566-2ebf6996c45e/1080/aligner-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84e0f9fe-d156-43bc-9566-2ebf6996c45e/360/aligner-resin2.webp",
    alt: tLocalized("CRS Aligner kişiye özel hizalayıcı üretimi", "CRS Aligner custom aligner production"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/62e5545b-a757-4ae1-b380-835c267d4b5a/1080/aligner-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/62e5545b-a757-4ae1-b380-835c267d4b5a/360/aligner-resin3.webp",
    alt: tLocalized("CRS Aligner ortodontik tedavi planlama uygulaması", "CRS Aligner orthodontic treatment planning application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/1080/aligner-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee303d6-b35e-45f3-be3f-60c7ccb7be25/360/aligner-resin.webp",
    alt: tLocalized("CRS Aligner ürün görseli", "CRS Aligner product image"),
  },
];

const CRS_DENTURE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/360/denture-resin.webp",
    alt: tLocalized("CRS Denture biyouyumlu protez tabanı reçinesi", "CRS Denture biocompatible denture base resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/360/3mash.webp",
    alt: tLocalized("CRS Denture protez tabanı uygulaması", "CRS Denture denture base application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a30d62a6-69bb-4e14-a216-dcd5eec0978e/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a30d62a6-69bb-4e14-a216-dcd5eec0978e/360/3mash.webp",
    alt: tLocalized("CRS Denture doğal görünümlü protez uygulaması", "CRS Denture natural-looking denture application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/1080/3mash.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f244c77d-e24c-44c0-be49-6dd451219b5d/360/3mash.webp",
    alt: tLocalized("CRS Denture protez uyum uygulaması", "CRS Denture fit application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/360/denture-resin.webp",
    alt: tLocalized("CRS Denture ürün görseli", "CRS Denture product image"),
  },
];

const CRS_GINGIVA_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/360/gingiva-resin.webp",
    alt: tLocalized("CRS Gingiva yırtılmaz diş eti reçinesi", "CRS Gingiva tear-resistant gingiva resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/1080/composite-apps-18.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/360/composite-apps-18.webp",
    alt: tLocalized("CRS Gingiva diş eti maskesi uygulaması", "CRS Gingiva gingiva mask application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/09b0295a-71e9-40b7-9620-b79d70c24c2b/1080/composite-apps-19.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/09b0295a-71e9-40b7-9620-b79d70c24c2b/360/composite-apps-19.webp",
    alt: tLocalized("CRS Gingiva implant modeli yumuşak doku uygulaması", "CRS Gingiva implant model soft tissue application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/1080/composite-apps-18.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c87d1231-b79d-4ffc-a85e-f2719865a7c7/360/composite-apps-18.webp",
    alt: tLocalized("CRS Gingiva esnek diş eti model segmenti", "CRS Gingiva flexible gingiva model segment"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/360/gingiva-resin.webp",
    alt: tLocalized("CRS Gingiva ürün görseli", "CRS Gingiva product image"),
  },
];

const CRS_MODEL_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/360/crs-model-resin.webp",
    alt: tLocalized("CRS Model yüksek hassasiyetli model reçinesi", "CRS Model high-precision model resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: tLocalized("CRS Model hassas dental model uygulaması", "CRS Model precise dental model application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: tLocalized("CRS Model ortodontik model uygulaması", "CRS Model orthodontic model application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/1080/crs-model1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1ee1bb6c-f182-465c-9303-fd339f7e54d9/360/crs-model1.webp",
    alt: tLocalized("CRS Model mock-up ve wax-up uygulaması", "CRS Model mock-up and wax-up application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/360/crs-model-resin.webp",
    alt: tLocalized("CRS Model ürün görseli", "CRS Model product image"),
  },
];

const CRS_TRAY_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/360/crs-tray-resin.webp",
    alt: tLocalized("CRS Tray Resin kişiye özel ölçü kaşığı reçinesi", "CRS Tray Resin custom impression tray resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/360/crs-tray-recinesi.webp",
    alt: tLocalized("CRS Tray Resin ölçü kaşığı uygulaması", "CRS Tray Resin impression tray application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84ae7002-2669-48b0-a7ea-627ca96b1c06/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84ae7002-2669-48b0-a7ea-627ca96b1c06/360/crs-tray-recinesi.webp",
    alt: tLocalized("CRS Tray Resin implant ölçü uygulaması", "CRS Tray Resin implant impression application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9bc9c9df-e2bc-4870-afcd-4c120e55faca/1080/crs-tray-recinesi.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9bc9c9df-e2bc-4870-afcd-4c120e55faca/360/crs-tray-recinesi.webp",
    alt: tLocalized("CRS Tray Resin kron köprü ölçü uygulaması", "CRS Tray Resin crown-and-bridge impression application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/360/crs-tray-resin.webp",
    alt: tLocalized("CRS Tray Resin ürün görseli", "CRS Tray Resin product image"),
  },
];

const MASH_CLEAR_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/360/mash-clear-resin.webp",
    alt: tLocalized("Mash Clear Resin şeffaf biyouyumlu cerrahi kılavuz reçinesi", "Mash Clear Resin clear biocompatible surgical guide resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/1080/mash-clear-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/360/mash-clear-recinesi1.webp",
    alt: tLocalized("Mash Clear Resin dental cerrahi kılavuz uygulaması", "Mash Clear Resin dental surgical guide application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a431f163-6d93-42e2-8609-1d801405d2dd/1080/mash-clear-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a431f163-6d93-42e2-8609-1d801405d2dd/360/mash-clear-recinesi2.webp",
    alt: tLocalized("Mash Clear Resin şeffaf splint uygulaması", "Mash Clear Resin clear splint application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/1080/mash-clear-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4d2f825b-c913-4d32-9224-8da4aa9c1d60/360/mash-clear-recinesi1.webp",
    alt: tLocalized("Mash Clear Resin klinik planlama uygulaması", "Mash Clear Resin clinical planning application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/1080/mash-clear-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/779b7b7a-5006-4d36-ac04-e351e5aea767/360/mash-clear-resin.webp",
    alt: tLocalized("Mash Clear Resin ürün görseli", "Mash Clear Resin product image"),
  },
];

const CRS_CAST_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/360/cast-resin.webp",
    alt: tLocalized("CRS Cast çekmeyen döküm reçinesi", "CRS Cast non-shrinking casting resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/1080/cast-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c0f96a6a-1d60-4f11-81d9-abd1eeda5251/360/cast-resin.webp",
    alt: tLocalized("CRS Cast döküm reçinesi ürün görseli", "CRS Cast casting resin product image"),
  },
];

const MASH_STUDY_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/1080/mash-study-resin.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ffc36702-6ac1-462a-8fa8-7e1a679c6048/360/mash-study-resin.webp",
    alt: tLocalized("Mash Study ekonomik dental model reçinesi", "Mash Study economical dental model resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/50984710-37a5-4712-a53f-7d13119f8809/1080/mash-study-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/50984710-37a5-4712-a53f-7d13119f8809/360/mash-study-resin1.webp",
    alt: tLocalized("Mash Study dental model uygulaması", "Mash Study dental model application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ef3939b-91a9-453d-ae88-8347ea14f421/1080/mash-study-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0ef3939b-91a9-453d-ae88-8347ea14f421/360/mash-study-resin2.webp",
    alt: tLocalized("Mash Study ortodontik model uygulaması", "Mash Study orthodontic model application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3151ba98-0634-4fda-adc2-de453f55217f/1080/mash-study-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3151ba98-0634-4fda-adc2-de453f55217f/360/mash-study-resin3.webp",
    alt: tLocalized("Mash Study eğitim demonstrasyon modeli", "Mash Study education demonstration model"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2e66b63e-0c60-4f6e-9ee1-5ddcfa1989c2/1080/mash-study-resin4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2e66b63e-0c60-4f6e-9ee1-5ddcfa1989c2/360/mash-study-resin4.webp",
    alt: tLocalized("Mash Study laboratuvar çalışma modeli", "Mash Study laboratory working model"),
  },
];

const MASH_TRIAL_PINK_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/360/mash-trial-pink.webp",
    alt: tLocalized("Mash Trial Pink dental geçici try-in reçinesi", "Mash Trial Pink dental temporary try-in resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6afb14a2-78eb-44fd-ae72-ff8dcc354809/1080/mash-trial-pink-resin1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6afb14a2-78eb-44fd-ae72-ff8dcc354809/360/mash-trial-pink-resin1.webp",
    alt: tLocalized("Mash Trial Pink geçici try-in protez uygulaması", "Mash Trial Pink temporary try-in denture application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8a60d77c-fc3b-47e6-8d44-94de3bdf7863/1080/mash-trial-pink-resin2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8a60d77c-fc3b-47e6-8d44-94de3bdf7863/360/mash-trial-pink-resin2.webp",
    alt: tLocalized("Mash Trial Pink oklüzyon kapanış kontrolü", "Mash Trial Pink occlusion and bite check"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/518fb2c9-e468-4b96-b84f-38ad944652a6/1080/mash-trial-pink-resin3.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/518fb2c9-e468-4b96-b84f-38ad944652a6/360/mash-trial-pink-resin3.webp",
    alt: tLocalized("Mash Trial Pink estetik hasta provası", "Mash Trial Pink aesthetic patient try-in"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/1080/mash-trial-pink.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/887bcf78-4381-4886-a2c7-e98911483b88/360/mash-trial-pink.webp",
    alt: tLocalized("Mash Trial Pink ürün görseli", "Mash Trial Pink product image"),
  },
];

const MASH_TRIAL_WHITE_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/360/mash-trial-white.webp",
    alt: tLocalized("Mash Trial White geçici dental reçinesi", "Mash Trial White temporary dental resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/1080/mash-trial-white-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/360/mash-trial-white-recinesi1.webp",
    alt: tLocalized("Mash Trial White geçici restorasyon provası", "Mash Trial White temporary restoration try-in"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7974c2d9-ca6d-4386-bf80-4a1af3cb785f/1080/mash-trial-white-recinesi2.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7974c2d9-ca6d-4386-bf80-4a1af3cb785f/360/mash-trial-white-recinesi2.webp",
    alt: tLocalized("Mash Trial White protez uyum kontrolü", "Mash Trial White denture fit check"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/1080/mash-trial-white-recinesi1.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a6ff2e38-f629-4fc8-b288-903d7e0858e6/360/mash-trial-white-recinesi1.webp",
    alt: tLocalized("Mash Trial White klinik estetik değerlendirme", "Mash Trial White clinical aesthetic evaluation"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/1080/mash-trial-white.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4071ba6a-a939-4fa3-a13c-cae024f595ff/360/mash-trial-white.webp",
    alt: tLocalized("Mash Trial White ürün görseli", "Mash Trial White product image"),
  },
];

export function CRS_COMPOSITE_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_COMPOSITE_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CE Class IIa CRS Composite'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver the CE Class IIa CRS Composite calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Composite", "CRS Composite"),
    },
    hero: {
      kicker: tLocalized("CRS Composite · Biyouyumlu Kron-Köprü Reçinesi", "CRS Composite · Biocompatible Crown-and-Bridge Resin"),
      titleHtml: tLocalized("Daimi kron artık <span class=\"em\">baskıdan</span> çıkıyor.", "The permanent crown now comes out of a <span class=\"em\">print.</span>"),
      leadHtml:
        tLocalized("Geçici ve daimi kuron-köprülerin katmanlı üretimi için biyouyumlu reçine. Sektörde önde gelen rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum sağlar; yarı saydamlık-opaklık arasında dengeli translüsentliğe sahiptir. Ağız koşullarına dayanıklıdır, tat ve koku yapmaz.", "A biocompatible resin for layered production of temporary and permanent crowns and bridges. It provides <b>higher flexural strength</b> and precise marginal fit compared to leading competitors in the industry; it has balanced translucency between semi-transparency and opacity. It is resistant to oral conditions and produces no taste or odor."),
      pills: [
        { value: "144 MPa", label: tLocalized("eğilme mukavemeti", "flexural strength") },
        { value: "5000 MPa", label: tLocalized("eğilme modülü", "flexural modulus") },
        { value: "CE", label: tLocalized("Class IIa", "Class IIa") },
        { label: tLocalized("Sararma yapmaz", "Does not turn yellow") },
      ],
      galleryBadge: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
      gallery: CRS_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Biyouyumlu <span class=\"hl\">geçici ve daimi</span> reçinesi.", "Biocompatible <span class=\"hl\">temporary and permanent</span> resin."),
      sideHtml: tLocalized("CRS Composite, <b>CE Class IIa</b> sertifikalı toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılabilir.", "Thanks to its <b>CE Class IIa</b> certified, non-toxic formulation, CRS Composite can be used safely intraorally."),
      panelTitleHtml: tLocalized("CRS Composite'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Composite — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Ürünü satın alan kullanıcıların geri bildirimlerine göre.", "Based on feedback from customers who purchased the product."),
      items: [
        { descriptionHtml: tLocalized("Baskı sonrası kürleme işleminde <b>sararma yapmadığını</b> söyledi", "It was noted that it <b>doesn't yellow</b> during post-print curing"), percent: 99 },
        { descriptionHtml: tLocalized("<b>Yüksek mekanik dayanımı</b> sayesinde kırılmadan uzun süre kullanılabildiğini söyledi", "Said it can be used for a long time without breaking, thanks to its <b>high mechanical strength</b>"), percent: 97 },
        { descriptionHtml: tLocalized("<b>Şırınga dolgu malzemesiyle yüksek uyum</b> sayesinde hasta ağzında geçici diş üzerinde değişiklik yapabildiğini söyledi", "Said that thanks to <b>high compatibility with syringe filling material</b>, adjustments can be made to the temporary tooth in the patient's mouth"), percent: 95 },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Baskı sonrası <span class=\"em\">sararma yapmaz</span>, kalıcıda kullanılır.", "<span class=\"em\">Doesn't yellow</span> after printing, used in permanent restorations."),
      sideHtml:
        tLocalized("CRS Composite, kalıcı uygulamada kullanıldığını iddia eden rakip markalara göre daha yüksek dayanım sunar ve kürleme sonrası sararmaz. Değerler ISO 10477 standardına göredir.", "CRS Composite offers higher strength than competitor brands that claim to be usable for permanent applications, and it does not yellow after curing. Values are according to the ISO 10477 standard."),
      items: [
        {
          name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"),
          value: "144",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 10477", "ISO 10477"),
          caption: tLocalized("Kalıcı restorasyon iddiası taşıyan birçok geçici reçinenin üzerinde; kırılmadan uzun süre kullanım.", "Outperforms many temporary resins that claim to be permanent-restoration-grade; long-term use without breaking."),
        },
        {
          name: tLocalized("Eğilme Modülü", "Flexural Modulus"),
          value: "5000",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 10477", "ISO 10477"),
          caption: tLocalized("Yüksek rijitlik: fonksiyon altında bükülmeye direnç, stabil oklüzyon.", "High rigidity: resistance to bending under function, stable occlusion."),
        },
        {
          name: tLocalized("Biyouyumluluk", "Biocompatibility"),
          value: "CE",
          unit: tLocalized("Class IIa", "Class IIa"),
          tag: "MDR",
          caption: tLocalized("Ağız içinde belirli süre temas eden tıbbi cihaz sınıfı; toksik olmayan formülasyon.", "A class of medical device that has contact inside the mouth for a certain period; non-toxic formulation."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS COMPOSITE · CE CLASS IIa · MDR", "CRS COMPOSITE · CE CLASS IIa · MDR"),
      titleHtml: tLocalized("Porselen estetiği, <span class=\"em\">marka bağımsız glaze.</span>", "Porcelain aesthetics, <span class=\"em\">brand-independent glaze.</span>"),
      descriptionHtml:
        tLocalized("CE Class IIa sertifikalı, toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılır. Yarı saydamlık ve opaklık arasında mükemmel bir translüsent dengeye sahiptir; marka ve renk ayırt etmeksizin <b>optik glaze</b> yapılabilir. Ağız koşullarına dayanıklıdır, <b>tat ve koku yapmaz.</b>", "Thanks to its CE Class IIa certified, non-toxic formulation, it can be used safely intraorally. It has an excellent translucency balance between semi-transparency and opacity; <b>optical glazing</b> can be applied regardless of brand or color. It withstands oral conditions and <b>produces no taste or odor.</b>"),
      ctaText: tLocalized("Renk ve boyut seç →", "Select color and size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Eğilme mukavemeti", "Flexural strength"), value: "144 MPa" },
        { label: tLocalized("Eğilme modülü", "Flexural modulus"), value: "5000 MPa" },
        { label: tLocalized("Sertifikasyon", "Certification"), value: "CE Class IIa (MDR)" },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Geçici + daimi", "Temporary + permanent") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm DLP / LCD", "All DLP / LCD") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: uygulama alanları, öne çıkan özellikler ve uyumlu 3D yazıcılar.", "Everything at a glance: application areas, standout features, and compatible 3D printers."),
      photos: [
        { src: CRS_GALLERY[1].src, alt: tLocalized("CRS Composite ile üretilmiş kron restorasyonu", "Crown restoration produced with CRS Composite"), title: tLocalized("Aynı gün kron", "Same-day crown"), text: tLocalized("Porselen benzeri güç ve estetik, tek seansta.", "Porcelain-like strength and aesthetics, in a single session.") },
        { src: CRS_GALLERY[2].src, alt: tLocalized("CRS Composite ile üretilmiş köprü restorasyonu", "Bridge restoration produced with CRS Composite"), title: tLocalized("Köprü restorasyonları", "Bridge restorations"), text: tLocalized("144 MPa dayanım; kırılmadan uzun süre kullanım.", "144 MPa strength; long-lasting use without breaking.") },
        { src: CRS_GALLERY[4].src, alt: tLocalized("Model üzerinde CRS Composite geçici restorasyon", "CRS Composite temporary restoration on a model"), title: tLocalized("Model üzerinde uyum", "Fit on the model"), text: tLocalized("Hassas marjinal uyum, net kole hatları.", "Precise marginal fit, clear cervical lines.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi restorasyonlar?", "Which restorations?"),
          items: [
            tLocalized("Porselen benzeri güç ve güzelliğe sahip <b>aynı gün kron ve köprüler</b>", "<b>Same-day crowns and bridges</b> with porcelain-like strength and beauty"),
            tLocalized("Çok çeşitli <b>kalıcı ve geçici</b> diş restorasyonları", "A wide variety of <b>permanent and temporary</b> dental restorations"),
            tLocalized("Çıkarılabilir total protezler için <b>vakaya özel</b> tasarlanmış kuron ve köprüler", "Crowns and bridges designed <b>case-specifically</b> for removable full dentures"),
          ],
          note: tLocalized("Vakanıza uygun tasarım parametrelerini ücretsiz paylaşıyoruz.", "We share design parameters suited to your case free of charge."),
        },
        {
          eyebrow: tLocalized("ÖNE ÇIKAN ÖZELLİKLER", "KEY FEATURES"),
          title: tLocalized("Neden CRS Composite?", "Why CRS Composite?"),
          items: [
            tLocalized("Yarı saydamlık-opaklık arasında dengeli <b>translüsentlik</b>", "Balanced <b>translucency</b> between translucent and opaque"),
            tLocalized("Marka ve renk ayırt etmeksizin <b>optik glaze</b>", "<b>Optical glaze</b> regardless of brand or shade"),
            tLocalized("Ağız koşullarına dayanıklı; <b>tat ve koku yapmaz</b>", "Resistant to oral conditions; <b>no taste or odor</b>"),
            tLocalized("<b>CE Class IIa</b> biyouyumlu, toksik olmayan formülasyon", "<b>CE Class IIa</b> biocompatible, non-toxic formulation"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("Tüm DLP & LCD yazıcılarla çalışır", "Works with all DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions <b>resmi distribütörü</b> olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini <b>ücretsiz</b> gerçekleştiriyoruz. Satış sonrası kullanıcı eğitimleri ve <b>7/24 teknik destek</b> ile yanınızdayız.", "As the <b>official distributor</b> of Custom Resin Solutions, we carry out parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We are with you with post-sale user training and <b>24/7 technical support.</b>"),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Reçine tek başına yeterli değil: <span class=\"em\">kürleme sonucu tamamlar.</span>", "Resin alone is not enough: <span class=\"em\">curing completes the result.</span>"),
      textHtml:
        tLocalized("CRS Composite'in 144 MPa dayanımını ve sararmasız rengini ortaya çıkaran şey, doğru <b>post-curing</b> protokolüdür. Reçineyi cihazınızın parametreleriyle birlikte kalibre ederek teslim ediyoruz; akıllı kürleme cihazımız bu protokolü otomatik uygular.", "What brings out CRS Composite's 144 MPa strength and non-yellowing color is the correct <b>post-curing</b> protocol. We deliver the resin calibrated together with your device's parameters; our smart curing device applies this protocol automatically."),
      chips: [tLocalized("385 nm optimize baskı", "385 nm optimized printing"), tLocalized("Doğru post-curing protokolü", "The right post-curing protocol"), tLocalized("Marka bağımsız kalibrasyon", "Brand-independent calibration"), tLocalized("7/24 teknik destek", "24/7 technical support")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Kürlemenin önemini gör →", "See the importance of curing →"), href: tLocalized("/yikama-kurleme-cihazlari#neden-gerekli", "/yikama-kurleme-cihazlari#neden-gerekli"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Composite hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Composite."),
      sideHtml: tLocalized("Klinik ve laboratuvarların CRS Composite için en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from clinics and laboratories about CRS Composite, with clear answers."),
      openFirst: true,
      items: [
        {
          question: tLocalized("1 kg CRS Composite reçinesinden kaç üye iş alabiliriz?", "How many units of work can we get from 1 kg of CRS Composite resin?"),
          answerHtml:
            tLocalized("Bu, restorasyonun boyutuna, duvar kalınlığına ve destek yapılarına göre değişir. Tek bir kron ünitesi ortalama olarak birkaç mililitre reçine tüketir; 1 kg reçineden genellikle <b>yüzlerce üye</b> üretilebilir.", "This varies depending on the size of the restoration, wall thickness, and support structures. A single crown unit consumes an average of a few milliliters of resin; <b>hundreds of units</b> can typically be produced from 1 kg of resin."),
        },
        {
          question: tLocalized("CRS Composite reçinesinin kırılma direnci nedir?", "What is the fracture strength of CRS Composite resin?"),
          answerHtml: tLocalized("CRS Composite, ISO 10477 standardına göre <b>144 MPa eğilme mukavemeti</b> ve <b>5000 MPa eğilme modülü</b> sunar.", "CRS Composite offers a <b>144 MPa flexural strength</b> and a <b>5000 MPa flexural modulus</b> according to the ISO 10477 standard."),
        },
        { question: tLocalized("CRS Composite hasta ağzında tat veya koku bırakır mı?", "Does CRS Composite leave a taste or odor in the patient's mouth?"), answerHtml: tLocalized("Hayır. CRS Composite <b>ağız koşullarına dayanıklıdır, tat ve koku yapmaz.</b>", "No. CRS Composite <b>is resistant to oral conditions and does not produce any taste or odor.</b>") },
        {
          question: tLocalized("Dirençli olması için tavsiye edilen tasarım parametreleri nelerdir?", "What are the recommended design parameters for resistance?"),
          answerHtml:
            tLocalized("Dayanım için <b>yeterli minimum duvar kalınlığı</b>, köprülerde uygun konnektör kesiti, doğru baskı yönü ve reçineye özel doğru post-curing süresi kritik önemdedir.", "For strength, <b>sufficient minimum wall thickness</b>, an appropriate connector cross-section in bridges, correct print orientation, and the right resin-specific post-curing time are critically important."),
        },
        {
          question: tLocalized("Klinik uygulamalar için şırınga kompozitler ile uyumlu mudur?", "Is it compatible with syringe composites for clinical applications?"),
          answerHtml: tLocalized("Evet. CRS Composite, <b>şırınga dolgu malzemesiyle yüksek uyum</b> gösterir; hasta ağzında geçici diş üzerinde ekleme ve düzeltme yapılabilir.", "Yes. CRS Composite shows <b>high compatibility with syringe filling material</b>; additions and corrections can be made on the temporary tooth in the patient's mouth."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Baskıdan ağza: <span class=\"em\">süreci izleyin.</span>", "From print to mouth: <span class=\"em\">follow the process.</span>"),
      sideHtml: tLocalized("Tasarımdan baskıya, kürlemeden glaze'e; CRS Composite ile tek seans kron-köprü akışının tamamı.", "From design to printing, from curing to glaze; the entire single-session crown-and-bridge workflow with CRS Composite."),
      href: "https://www.youtube.com/watch?v=IgBVfLPztPg",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/3840/composite-apps-12.webp",
      imageAlt: tLocalized("CRS Composite uygulama videosu", "CRS Composite application video"),
      title: tLocalized("CRS Composite ile tek seans kron-köprü", "Single-session crown-and-bridge with CRS Composite"),
      text: tLocalized("Baskı parametreleri, post-curing protokolü ve optik glaze adımları; uygulamalı anlatım.", "Print parameters, post-curing protocol, and optical glaze steps; a hands-on walkthrough."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("HASSASİYET", "PRECISION"),
          title: tLocalized("CRS Model", "CRS Model"),
          descriptionHtml: tLocalized("Kron-köprü öncesi master model. Belirgin <b>kole hatları</b>, net marjinal uyum.", "Master model prior to crown-bridge work. Distinct <b>cervical lines</b>, clear marginal fit."),
          href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
          tagVariant: "ce",
          title: tLocalized("CRS Denture", "CRS Denture"),
          descriptionHtml: tLocalized("Çıkarılabilir protez tabanı; PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.", "Removable denture base; <b>low shrinkage</b> compared to PMMA, compatible with polishing + glazing."),
          href: "/crs-denture-biouyumlu-protez-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: "YIRTILMAZ",
          title: tLocalized("CRS Gingiva", "CRS Gingiva"),
          descriptionHtml: tLocalized("İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, doğal diş eti rengi.", "Implant model and gingiva mask. High tear resistance, natural gingiva color."),
          href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("16 CRS & Mash reçinesini uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare 16 CRS & Mash resins by application; choose the right resin."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Composite'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Composite to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi vaka, hangi renk? Kısa bir görüşmeyle CRS Composite'i cihazınızın parametreleriyle eşleştirip doğru kürleme protokolüyle birlikte <b>ücretsiz</b> teslim edelim.", "Which printer, which case, which shade? With a short conversation, let's match CRS Composite to your device's parameters and deliver it with the correct curing protocol, <b>free of charge</b>."),
      primaryText: tLocalized("Renk ve boyut seç ↑", "Select color and size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_SPLINT_HARD_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_SPLINT_HARD_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Splint Hard Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Splint Hard Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: "CRS Splint Hard Resin",
    },
    hero: {
      kicker: tLocalized("CRS Splint Hard Resin · Sert Gece Plağı Reçinesi", "CRS Splint Hard Resin · Hard Night Guard Resin"),
      titleHtml: tLocalized("Sert splint artık <span class=\"em\">dijital baskıdan</span> çıkıyor.", "Hard splints now come <span class=\"em\">out of digital printing.</span>"),
      leadHtml:
        tLocalized("CRS Splint Hard Resin, dental uygulamalar için geliştirilmiş sert splint reçinesi olup özellikle gece plağı ve bruksizm apareyleri üretiminde kullanılır. Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskılar uzun süre formunu korur ve deformasyona karşı direnç gösterir.", "CRS Splint Hard Resin is a hard splint resin developed for dental applications, and is especially used in producing night guards and bruxism appliances. Thanks to its high hardness and mechanical strength, prints retain their shape for a long time and resist deformation."),
      pills: [
        { label: tLocalized("Sert gece plağı", "Hard night guard") },
        { label: tLocalized("Bruksizm apareyleri", "Bruxism appliances") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
        { label: tLocalized("Tat ve koku içermez", "Taste- and odor-free") },
      ],
      gallery: CRS_SPLINT_HARD_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Splint%20Hard%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Splint%20Hard%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Sert splint için <span class=\"hl\">uzun form stabilitesi</span>.", "<span class=\"hl\">Long-term form stability</span> for hard splints."),
      sideHtml: tLocalized("Yüksek dayanıklılık sunan CRS Splint Hard Resin, sert splint reçinesi arayan dental laboratuvarlar ve klinikler için geliştirilmiştir.", "Offering high durability, CRS Splint Hard Resin is developed for dental laboratories and clinics looking for a hard splint resin."),
      panelTitleHtml: tLocalized("CRS Splint Hard Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Splint Hard Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Dental laboratuvar ve klinikler için öne çıkan kullanım özellikleri.", "Key usage features for dental laboratories and clinics."),
      items: [
        { descriptionHtml: tLocalized("Yüksek sertlik sayesinde üretilen splintlerin uzun süre <b>formunu koruduğu</b> belirtilir.", "It is stated that splints produced thanks to high hardness <b>keep their shape</b> for a long time.") },
        { descriptionHtml: tLocalized("Yoğun kullanımda <b>deformasyona karşı direnç</b> göstermesi öne çıkar.", "Its <b>resistance to deformation</b> under heavy use stands out.") },
        { descriptionHtml: tLocalized("Şeffaf yüzey kalitesiyle <b>estetik açıdan başarılı</b> sonuçlar elde edilir.", "Its clear surface quality delivers <b>aesthetically successful</b> results.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Gece plağı üretiminde <span class=\"em\">sert ve stabil</span> yapı.", "A <span class=\"em\">hard and stable</span> structure in night guard production."),
      sideHtml:
        tLocalized("CRS Splint Hard Resin; sert splint reçinesi olarak gece plağı ve bruksizm apareylerinde kullanılır, 385–405 nm dalga boyunda çalışan LCD ve DLP yazıcılarla uyumludur.", "CRS Splint Hard Resin is used as a hard splint resin in night guards and bruxism appliances, and is compatible with LCD and DLP printers operating at 385–405 nm wavelength."),
      items: [
        {
          name: tLocalized("Dalga Boyu", "Wavelength"),
          value: "385",
          unit: "–405 nm",
          tag: tLocalized("LCD / DLP", "LCD/DLP"),
          caption: tLocalized("385–405 nm aralığındaki LCD ve DLP 3D yazıcılarla uyumlu baskı akışı.", "A print workflow compatible with LCD and DLP 3D printers in the 385–405 nm range."),
        },
        {
          name: tLocalized("Uygulama", "APPLICATION"),
          value: "Sert",
          unit: tLocalized("Splint", "splint"),
          tag: tLocalized("Night Guard", "Night Guard"),
          caption: tLocalized("Sert gece plağı ve bruksizm apareyi üretimine odaklanan reçine sınıfı.", "A resin class focused on hard night guard and bruxism appliance production."),
        },
        {
          name: tLocalized("Konfor", "Comfort"),
          value: "Tat",
          unit: "yok",
          tag: tLocalized("Koku yok", "no smell"),
          caption: tLocalized("Tat ve koku içermeyen yapı, hasta konforunu artırır.", "A taste- and odor-free structure increases patient comfort."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS SPLINT HARD · SERT GECE PLAĞI · LCD / DLP", "CRS SPLINT HARD · HARD NIGHT GUARD · LCD / DLP"),
      titleHtml: tLocalized("Yoğun kullanımda <span class=\"em\">formunu koruyan splint.</span>", "A <span class=\"em\">splint that keeps its shape</span> under heavy use."),
      descriptionHtml:
        tLocalized("Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskılar uzun süre formunu korur ve deformasyona karşı direnç gösterir. Özellikle yoğun kullanım gerektiren vakalarda güvenilir sonuçlar elde edilmesini sağlar.", "Thanks to its structure offering high hardness and mechanical strength, prints keep their shape for a long time and resist deformation. This provides reliable results especially in cases requiring heavy use."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Gece plağı + bruksizm apareyi", "Night guard + bruxism appliance") },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Sert splint reçinesi", "Hard splint resin") },
        { label: tLocalized("Görünüm", "Appearance"), value: tLocalized("Şeffaf yapı", "Clear structure") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
        { label: tLocalized("Konfor", "Comfort"), value: tLocalized("Tat ve koku içermez", "Taste- and odor-free") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: sert gece plağı uygulamaları, bruksizm apareyleri ve uyumlu 3D yazıcılar.", "Everything at a glance: hard night guard applications, bruxism appliances, and compatible 3D printers."),
      photos: [
        { src: CRS_SPLINT_HARD_GALLERY[2].src, alt: tLocalized("CRS Splint Hard gece plağı uygulaması", "CRS Splint Hard night guard application"), title: tLocalized("Sert gece plağı", "Hard night guard"), text: tLocalized("Night guard üretimleri için şeffaf ve stabil yapı.", "A clear and stable structure for night guard production.") },
        { src: CRS_SPLINT_HARD_GALLERY[3].src, alt: tLocalized("CRS Splint Hard splint uygulaması", "CRS Splint Hard splint application"), title: tLocalized("Bruksizm apareyleri", "Bruxism appliances"), text: tLocalized("Yoğun kullanımda formunu korumaya odaklanan sert reçine.", "A hard resin focused on keeping its shape under heavy use.") },
        { src: CRS_SPLINT_HARD_GALLERY[3].src, alt: tLocalized("CRS Splint Hard bruksizm apareyi", "CRS Splint Hard bruxism appliance"), title: tLocalized("Bruksizm apareyleri", "Bruxism appliances"), text: tLocalized("Mekanik dayanım ve deformasyon direnci gereken vakalar.", "Cases requiring mechanical strength and deformation resistance.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi apareyler?", "Which devices?"),
          items: [
            tLocalized("Sert <b>gece plağı</b> üretimi", "Hard <b>night guard</b> production"),
            "<b>Bruksizm apareyleri</b>",
            tLocalized("Splint, repositioner, retainer ve ağız koruyucu gibi ortodontik ve dental aygıtlar", "Orthodontic and dental devices such as splints, repositioners, retainers, and mouthguards"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Splint Hard?", "Why CRS Splint Hard?"),
          items: [
            tLocalized("<b>Yüksek sertlik</b> ve mekanik dayanım", "<b>High hardness</b> and mechanical strength"),
            tLocalized("Uzun süre formunu koruyan, <b>deformasyona dirençli</b> yapı", "A structure that retains its shape over a long time, <b>resistant to deformation</b>"),
            tLocalized("Şeffaf görünüm ile estetik splint üretimi", "Aesthetic splint production with a clear appearance"),
            tLocalized("<b>Tat ve koku içermeyen</b> formülasyon", "A <b>taste- and odor-free</b> formulation"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS Splint Hard Resin, 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Splint Hard Resin is compatible with LCD and DLP 3D printers operating at 385–405 nm wavelength. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Sert splint sonucu <span class=\"em\">parametreyle tamamlanır.</span>", "The hard splint result <span class=\"em\">is completed with the right parameters.</span>"),
      textHtml:
        tLocalized("Gece plağı ve bruksizm apareylerinde stabil sonuç için reçinenin doğru baskı parametreleri ve post-curing akışıyla çalışması gerekir. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "For a stable result in night guards and bruxism appliances, the resin needs to work with the correct printing parameters and post-curing workflow. We calibrate the resin to match the printer you use before delivery."),
      chips: ["385–405 nm uyum", tLocalized("Sert splint üretimi", "Hard splint production"), tLocalized("Parametre uyumlaması", "Parameter calibration"), tLocalized("7/24 teknik destek", "24/7 technical support")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Splint Hard hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Splint Hard."),
      sideHtml: tLocalized("Sert gece plağı ve bruksizm apareyi üretimi için net kullanım cevapları.", "Clear usage answers for hard night guard and bruxism appliance production."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Splint Hard Resin hangi uygulamalar için kullanılır?", "Which applications is CRS Splint Hard Resin used for?"),
          answerHtml: tLocalized("CRS Splint Hard Resin; <b>gece plağı</b>, splint, repositioner, retainer ve ağız koruyucu gibi ortodontik ve dental aygıtların üretimi için geliştirilmiş biyouyumlu bir fotopolimer reçinedir.", "CRS Splint Hard Resin is a biocompatible photopolymer resin developed for producing orthodontic and dental appliances such as <b>night guards</b>, splints, repositioners, retainers, and mouthguards."),
        },
        {
          question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"),
          answerHtml: tLocalized("CRS Splint Hard Resin, <b>385–405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.", "CRS Splint Hard Resin is compatible with LCD and DLP 3D printers operating at <b>385–405 nm</b> wavelength."),
        },
        {
          question: tLocalized("Baskı öncesinde reçineyi karıştırmak gerekir mi?", "Does the resin need to be mixed before printing?"),
          answerHtml: tLocalized("Evet. Şişenin dökmeden önce en az <b>1 dakika</b> kuvvetlice çalkalanması gerekir. Pigment çökelmesini yeniden dağıtmak için yumuşak bir spatula ile karıştırılması önerilir.", "Yes. The bottle must be shaken vigorously for at least <b>1 minute</b> before pouring. It is recommended to stir with a soft spatula to redisperse any settled pigment."),
        },
        {
          question: tLocalized("Yoğun kullanımda neden tercih edilir?", "Why is it preferred for heavy use?"),
          answerHtml: tLocalized("Yüksek sertlik ve mekanik dayanım sunan yapısı sayesinde baskıların uzun süre formunu koruması ve deformasyona direnç göstermesi hedeflenir.", "Thanks to its structure offering high hardness and mechanical strength, prints are designed to keep their shape for a long time and resist deformation."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Sert splint akışını <span class=\"em\">videoda görün.</span>", "See the hard splint workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Splint Hard Resin ile sert splint üretim akışını videoda izleyin.", "Watch the hard splint production workflow with CRS Splint Hard Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_SPLINT_HARD_GALLERY[2].src,
      imageAlt: tLocalized("CRS Splint Hard Resin uygulama videosu", "CRS Splint Hard Resin application video"),
      title: tLocalized("CRS Splint Hard Resin ile gece plağı üretimi", "Night guard production with CRS Splint Hard Resin"),
      text: tLocalized("Sert splint, bruksizm apareyi ve oklüzal splint üretimi için ürün odaklı video.", "A product-focused video for hard splint, bruxism appliance, and occlusal splint production."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("ESNEK SPLINT", "FLEXIBLE SPLINT"),
          title: tLocalized("CRS Splint Soft", "CRS Splint Soft"),
          descriptionHtml: tLocalized("Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.", "Flexible and biocompatible splint / night guard resin; comfortable use."),
          href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("REHBER", "GUIDE"),
          title: tLocalized("Guide Resin", "Guide Resin"),
          descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."),
          href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"),
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: tLocalized("ORTODONTİ", "ORTHODONTICS"),
          title: tLocalized("CRS IBT Resin", "CRS IBT Resin"),
          descriptionHtml: tLocalized("Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.", "A precise and flexible indirect bonding tray resin for orthodontic bracket placement."),
          href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Splint Hard'ı cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Splint Hard to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi splint vakası, hangi post-curing akışı? Kısa bir görüşmeyle CRS Splint Hard Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which splint case, which post-curing workflow? With a short conversation, let's match CRS Splint Hard Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_SPLINT_SOFT_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_SPLINT_SOFT_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Splint Soft Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Splint Soft Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: "CRS Splint Soft Resin",
    },
    hero: {
      kicker: tLocalized("CRS Splint Soft Resin · Esnek Dental Splint Reçinesi", "CRS Splint Soft Resin · Flexible Dental Splint Resin"),
      titleHtml: tLocalized("Esnek splint artık <span class=\"em\">dijital baskıdan</span> çıkıyor.", "Flexible splints now come <span class=\"em\">from digital printing.</span>"),
      leadHtml:
        tLocalized("CRS Splint Soft Resin, ortodontik ve dental kullanım için geliştirilen biyouyumlu bir fotopolimer 3D yazıcı reçinesidir. Esnek yapısı hasta konforunu artırırken, dengeli mekanik dayanımı güvenilir ve stabil kullanım sunar.", "CRS Splint Soft Resin is a biocompatible photopolymer 3D printer resin developed for orthodontic and dental use. Its flexible structure increases patient comfort, while its balanced mechanical strength offers reliable and stable use."),
      pills: [
        { label: tLocalized("Esnek splint", "flexible splint") },
        { label: tLocalized("Gece plağı", "night guard") },
        { label: tLocalized("Biyouyumlu", "Biocompatible") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
      ],
      gallery: CRS_SPLINT_SOFT_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Splint%20Soft%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Splint%20Soft%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Esnek yapısıyla <span class=\"hl\">hasta konforunu</span> artırır.", "Increases <span class=\"hl\">patient comfort</span> with its flexible structure."),
      sideHtml: tLocalized("CRS Splint Soft Resin, dental splint ve gece plağı üretiminde esnek yapısı ile öne çıkan biyouyumlu bir 3D yazıcı reçinesidir.", "CRS Splint Soft Resin is a biocompatible 3D printer resin that stands out with its flexible structure in dental splint and night guard production."),
      panelTitleHtml: tLocalized("CRS Splint Soft Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Splint Soft Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Esnek gece plağı ve dental splint üretimi için öne çıkan kullanım özellikleri.", "Standout usage features for flexible night guard and dental splint production."),
      items: [
        { descriptionHtml: tLocalized("Esnek yapısı sayesinde üretilen gece plaklarının ağız içinde <b>daha konforlu</b> olduğu belirtilir.", "Thanks to its flexible structure, night guards produced with it are stated to be <b>more comfortable</b> in the mouth.") },
        { descriptionHtml: tLocalized("Hasta adaptasyon sürecini <b>kolaylaştıran</b> kullanım hissi öne çıkar.", "A wearing feel that <b>eases</b> the patient's adaptation process stands out.") },
        { descriptionHtml: tLocalized("Doğru baskı ve kürleme sonrası dental kullanım için <b>dengeli bir yapı</b> sağlar.", "Provides a <b>balanced structure</b> for dental use after correct printing and curing.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Gece plağı üretiminde <span class=\"em\">esneklik ve konfor</span>.", "<span class=\"em\">Flexibility and comfort</span> in night guard production."),
      sideHtml:
        tLocalized("CRS Splint Soft Resin; dental splint ve gece plağı üretimi için geliştirilmiş biyouyumlu reçinedir. 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.", "CRS Splint Soft Resin is a biocompatible resin developed for dental splint and night guard production. It is compatible with LCD and DLP 3D printers operating at 385–405 nm wavelength."),
      items: [
        {
          name: tLocalized("Dalga Boyu", "Wavelength"),
          value: "385",
          unit: "–405 nm",
          tag: tLocalized("LCD / DLP", "LCD/DLP"),
          caption: tLocalized("385–405 nm aralığındaki LCD ve DLP 3D yazıcılarla uyumlu baskı akışı.", "A print workflow compatible with LCD and DLP 3D printers in the 385–405 nm range."),
        },
        {
          name: tLocalized("Uygulama", "APPLICATION"),
          value: "Esnek",
          unit: tLocalized("Splint", "splint"),
          tag: tLocalized("Night Guard", "Night Guard"),
          caption: tLocalized("Dental splint, gece plağı ve bruksizm plakları için esnek reçine sınıfı.", "Flexible resin class for dental splints, night guards, and bruxism splints."),
        },
        {
          name: tLocalized("Renk", "Colour"),
          value: tLocalized("Şeffaf", "Transparent"),
          unit: "",
          tag: tLocalized("Transparent", "transparent"),
          caption: tLocalized("Şeffaf renk seçeneği, estetik dental splint uygulamaları için uygundur.", "The clear shade option is suitable for aesthetic dental splint applications."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS SPLINT SOFT · ESNEK SPLINT · LCD / DLP", "CRS SPLINT SOFT FLEXIBLE SPLINT LCD / DLP"),
      titleHtml: tLocalized("Konfor odaklı <span class=\"em\">esnek gece plağı.</span>", "Comfort-focused <span class=\"em\">flexible night guard.</span>"),
      descriptionHtml:
        tLocalized("Esnek yapısı, üretilen splintlerin ağız içinde daha iyi uyum sağlamasına ve kullanım sırasında daha konforlu bir deneyim sunmasına yardımcı olur. Dengeli mekanik özellikleri uygun kullanım koşullarında güvenilir performans sağlar.", "Its flexible structure helps splints achieve a better intraoral fit and offer a more comfortable experience during use. Its balanced mechanical properties provide reliable performance under proper usage conditions."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Dental splint + gece plağı", "Dental splint + night guard") },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Esnek splint reçinesi", "Flexible splint resin") },
        { label: tLocalized("Renk", "Colour"), value: tLocalized("Şeffaf / transparent", "Transparent / clear") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Ağız içi dental uygulamalar", "Intraoral dental applications") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: esnek dental splint, gece plağı, ağız koruyucu ve uyumlu 3D yazıcılar.", "Everything at a glance: flexible dental splints, night guards, mouthguards, and compatible 3D printers."),
      photos: [
        { src: CRS_SPLINT_SOFT_GALLERY[2].src, alt: tLocalized("CRS Splint Soft dental splint uygulaması", "CRS Splint Soft dental splint application"), title: tLocalized("Dental splint", "dental splint"), text: tLocalized("Esnek yapı ile ağız içinde daha iyi uyum.", "Better intraoral fit thanks to the flexible structure.") },
        { src: CRS_SPLINT_SOFT_GALLERY[3].src, alt: tLocalized("CRS Splint Soft bruksizm plağı", "CRS Splint Soft bruxism plate"), title: tLocalized("Gece plağı", "night guard"), text: tLocalized("Bruksizm plakları için konfor odaklı kullanım.", "Comfort-focused use for bruxism splints.") },
        { src: CRS_SPLINT_SOFT_GALLERY[3].src, alt: tLocalized("CRS Splint Soft ağız koruyucu uygulaması", "CRS Splint Soft mouthguard application"), title: tLocalized("Ağız koruyucu", "Mouthguard"), text: tLocalized("Esnek ve şeffaf yapı ile dental aygıt üretimi.", "Dental appliance production with a flexible and transparent structure.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi aygıtlar?", "Which devices?"),
          items: [
            tLocalized("<b>Dental splint</b> ve gece plağı üretimi", "<b>Dental splint</b> and night guard production"),
            tLocalized("Bruksizm tedavilerinde kullanılan plaklar", "Plates used in bruxism treatments"),
            tLocalized("Ağız koruyucu ve benzeri diş hekimliği ürünleri", "Mouthguards and similar dental products"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Splint Soft?", "Why CRS Splint Soft?"),
          items: [
            tLocalized("<b>Esnek yapı</b> ile hasta konforu", "Patient comfort with a <b>flexible structure</b>"),
            tLocalized("Dengeli mekanik özelliklerle güvenilir kullanım", "Reliable use with balanced mechanical properties"),
            tLocalized("Şeffaf renk seçeneği", "Clear shade option"),
            tLocalized("<b>Biyouyumlu</b> fotopolimer reçine", "<b>Biocompatible</b> photopolymer resin"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS Splint Soft Resin, 385–405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Splint Soft Resin is compatible with LCD and DLP 3D printers operating at 385–405 nm wavelength. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Esnek splint sonucu <span class=\"em\">parametreyle tamamlanır.</span>", "The flexible splint result <span class=\"em\">is completed with the right parameters.</span>"),
      textHtml:
        tLocalized("Esnek gece plağı ve dental splint üretiminde konforlu sonuç için reçinenin doğru baskı, temizlik ve post-curing akışıyla çalışması gerekir. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "For a comfortable result in flexible night guard and dental splint production, the resin needs to work with the correct printing, cleaning, and post-curing workflow. We calibrate the resin to match the printer you use before delivery."),
      chips: ["385–405 nm uyum", tLocalized("Esnek splint üretimi", "Flexible splint production"), "IPA temizlik", tLocalized("UV post-curing", "UV post-curing")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Splint Soft hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Splint Soft."),
      sideHtml: tLocalized("Esnek dental splint ve gece plağı üretimi için net kullanım cevapları.", "Clear usage answers for flexible dental splint and night guard production."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Splint Soft Resin ne için kullanılır?", "What is CRS Splint Soft Resin used for?"),
          answerHtml: tLocalized("CRS Splint Soft Resin, dental splint ve gece plağı üretimi için geliştirilmiş esnek yapılı bir 3D yazıcı reçinesidir. Özellikle bruksizm tedavilerinde kullanılan plakların üretiminde tercih edilir.", "CRS Splint Soft Resin is a flexible 3D printer resin developed for producing dental splints and night guards. It is especially preferred for producing plates used in bruxism treatments."),
        },
        {
          question: tLocalized("Bu reçine ağız içi kullanım için uygun mu?", "Is this resin suitable for intraoral use?"),
          answerHtml: tLocalized("Evet. CRS Splint Soft Resin, dental uygulamalarda kullanılmak üzere geliştirilmiş <b>biyouyumlu</b> bir reçinedir ve uygun üretim süreçleri sonrası ağız içi kullanıma uygundur.", "Yes. CRS Splint Soft Resin is a <b>biocompatible</b> resin developed for use in dental applications, and is suitable for intraoral use after proper production processes."),
        },
        {
          question: tLocalized("Soft Splint Reçinesi ile Hard Splint reçinesi arasındaki fark nedir?", "What is the difference between Soft Splint Resin and Hard Splint resin?"),
          answerHtml: tLocalized("Soft Splint reçinesi esnek yapıya sahip olup hasta konforunu ön planda tutar. Hard Splint reçinesi ise daha serttir ve mekanik stabilite gerektiren durumlarda tercih edilir.", "Soft Splint resin has a flexible structure that prioritizes patient comfort. Hard Splint resin, on the other hand, is more rigid and is preferred in situations requiring mechanical stability."),
        },
        {
          question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"),
          answerHtml: tLocalized("CRS Splint Soft Resin, <b>385–405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcılarla uyumludur.", "CRS Splint Soft Resin is compatible with LCD and DLP 3D printers operating at <b>385–405 nm</b> wavelength."),
        },
        {
          question: tLocalized("Baskı sonrası temizlik nasıl yapılır?", "How is post-print cleaning done?"),
          answerHtml: tLocalized("Baskıdan çıkan parçalar izopropil alkol (IPA) ile temizlenmeli ve ardından kürleme işlemine alınmalıdır.", "Parts fresh off the printer should be cleaned with isopropyl alcohol (IPA) and then cured."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Esnek splint akışını <span class=\"em\">videoda görün.</span>", "See the flexible splint workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Splint Soft Resin ile dental splint ve gece plağı üretim akışını videoda izleyin.", "Watch the dental splint and night guard production workflow with CRS Splint Soft Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_SPLINT_SOFT_GALLERY[2].src,
      imageAlt: tLocalized("CRS Splint Soft Resin uygulama videosu", "CRS Splint Soft Resin application video"),
      title: tLocalized("CRS Splint Soft Resin ile esnek gece plağı üretimi", "Flexible night guard production with CRS Splint Soft Resin"),
      text: tLocalized("Esnek dental splint, gece plağı ve bruksizm plağı üretimi için ürün odaklı video.", "A product-focused video for flexible dental splint, night guard, and bruxism splint production."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("SERT SPLINT", "HARD SPLINT"),
          title: tLocalized("CRS Splint Hard", "CRS Splint Hard"),
          descriptionHtml: tLocalized("Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.", "A stable splint resin for hard night guards and bruxism appliances."),
          href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("REHBER", "GUIDE"),
          title: tLocalized("Guide Resin", "Guide Resin"),
          descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."),
          href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"),
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: tLocalized("ORTODONTİ", "ORTHODONTICS"),
          title: tLocalized("CRS IBT Resin", "CRS IBT Resin"),
          descriptionHtml: tLocalized("Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.", "A precise and flexible indirect bonding tray resin for orthodontic bracket placement."),
          href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Splint Soft'u cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Splint Soft to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi gece plağı vakası, hangi post-curing akışı? Kısa bir görüşmeyle CRS Splint Soft Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which night guard case, which post-curing workflow? With a short conversation, let's match CRS Splint Soft Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_GUIDE_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_GUIDE_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Guide Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Guide Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: "CRS Guide Resin",
    },
    hero: {
      kicker: tLocalized("CRS Guide Resin · Biyouyumlu Cerrahi Rehber Reçinesi", "CRS Guide Resin · Biocompatible Surgical Guide Resin"),
      titleHtml: tLocalized("Cerrahi rehber artık <span class=\"em\">kontrollü baskıdan</span> çıkıyor.", "The surgical guide now comes out of a <span class=\"em\">controlled print.</span>"),
      leadHtml:
        tLocalized("Kılavuz reçinesi, implant cerrahisinde kullanılan cerrahi rehberlerin üretimi için geliştirilmiş biyouyumlu 3D yazıcı reçinesidir. Yüksek hassasiyet, stabil yapı ve DLP/LCD uyumluluğu ile güvenilir cerrahi rehber üretimi sağlar.", "Guide resin is a biocompatible 3D printer resin developed for producing surgical guides used in implant surgery. With high precision, a stable structure, and DLP/LCD compatibility, it provides reliable surgical guide production."),
      pills: [
        { label: tLocalized("Cerrahi rehber", "surgical guide") },
        { label: tLocalized("İmplant cerrahisi", "Implant surgery") },
        { label: tLocalized("Biyouyumlu", "Biocompatible") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
      ],
      gallery: CRS_GUIDE_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"),
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Guide%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Guide%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("İmplant rehberlerinde <span class=\"hl\">hassas yönlendirme</span> sağlar.", "Provides <span class=\"hl\">precise guidance</span> in implant guides."),
      sideHtml: tLocalized("CRS Guide Resin, cerrahi rehberlerin implant uygulamalarında güvenilir yönlendirme sağlaması için yüksek ölçü doğruluğu ve stabil yapı sunar.", "CRS Guide Resin offers high dimensional accuracy and a stable structure so surgical guides provide reliable guidance in implant procedures."),
      panelTitleHtml: tLocalized("CRS Guide Resin'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Guide Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Cerrahi rehber üretiminde ölçü doğruluğu, stabil form ve şeffaf yapı öne çıkar.", "Dimensional accuracy, stable form, and transparent structure stand out in surgical guide production."),
      items: [
        { descriptionHtml: tLocalized("Yüksek ölçü doğruluğu, implant uygulamalarında <b>güvenilir yönlendirme</b> sağlar.", "High dimensional accuracy provides <b>reliable guidance</b> in implant applications.") },
        { descriptionHtml: tLocalized("Mekanik dayanımı sayesinde cerrahi rehberler uygulama sırasında <b>formunu korur</b>.", "Thanks to its mechanical strength, surgical guides <b>maintain their form</b> during application.") },
        { descriptionHtml: tLocalized("Şeffaf yapı, işlem sırasında <b>görsel kontrol</b> avantajı sunar.", "The clear structure provides a <b>visual control</b> advantage during the procedure.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Cerrahi rehber için <span class=\"em\">stabil ve şeffaf</span> yapı.", "A <span class=\"em\">stable and transparent</span> structure for the surgical guide."),
      sideHtml:
        tLocalized("CRS Guide Resin, UV kürleme sonrası intraoral kullanıma uygun hale gelen biyouyumlu cerrahi rehber reçinesidir. 385–405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur.", "CRS Guide Resin is a biocompatible surgical guide resin that becomes suitable for intraoral use after UV curing. It is compatible with DLP and LCD printers operating at 385–405 nm wavelength."),
      items: [
        {
          name: tLocalized("Dalga Boyu", "Wavelength"),
          value: "385",
          unit: "–405 nm",
          tag: tLocalized("LCD / DLP", "LCD/DLP"),
          caption: tLocalized("385–405 nm aralığındaki DLP ve LCD 3D yazıcılarla uyumlu üretim.", "Production compatible with DLP and LCD 3D printers in the 385–405 nm range."),
        },
        {
          name: tLocalized("Uygulama", "APPLICATION"),
          value: "Cerrahi",
          unit: tLocalized("Rehber", "Guide"),
          tag: tLocalized("Guide Resin", "Guide Resin"),
          caption: tLocalized("İmplant cerrahisinde kullanılan cerrahi rehber üretimi için geliştirilmiş reçine.", "A resin developed for producing surgical guides used in implant surgery."),
        },
        {
          name: tLocalized("Biyouyumluluk", "Biocompatibility"),
          value: "ISO",
          unit: "10993",
          tag: tLocalized("Intraoral", "intraoral"),
          caption: tLocalized("Gerekli temizlik ve UV kürleme işlemleri sonrası ağız içi kullanıma uygundur.", "Suitable for intraoral use after the necessary cleaning and UV curing processes."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS GUIDE · CERRAHİ REHBER · LCD / DLP", "CRS GUIDE · SURGICAL GUIDE · LCD / DLP"),
      titleHtml: tLocalized("Operasyon sırasında <span class=\"em\">kontrollü yönlendirme.</span>", "<span class=\"em\">Controlled guidance</span> during the operation."),
      descriptionHtml:
        tLocalized("Yüksek baskı hassasiyeti ve stabil yapısı sayesinde operasyon sırasında doğru yönlendirme ve kontrollü uygulama imkanı sunar. UV kürleme sonrası optimum performansa ulaşarak intraoral kullanıma uygun hale gelir.", "Thanks to its high print precision and stable structure, it offers accurate guidance and controlled application during the procedure. It reaches optimum performance after UV curing, making it suitable for intraoral use."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Cerrahi rehber üretimi", "Surgical guide production") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("İmplant cerrahisi", "Implant surgery") },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Şeffaf ve stabil", "Clear and stable") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
        { label: tLocalized("Sterilizasyon", "Sterilization"), value: tLocalized("Standart otoklav koşulları", "Standard autoclave conditions") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: implant cerrahisi, cerrahi rehber üretimi, şeffaf kontrol ve uyumlu 3D yazıcılar.", "Everything at a glance: implant surgery, surgical guide production, clear verification, and compatible 3D printers."),
      photos: [
        { src: CRS_GUIDE_GALLERY[1].src, alt: tLocalized("CRS Guide Resin cerrahi rehber uygulaması", "CRS Guide Resin surgical guide application"), title: tLocalized("Cerrahi rehber", "surgical guide"), text: tLocalized("İmplantın doğru açı ve konumda yerleştirilmesine yardımcı olur.", "Helps place the implant at the correct angle and position.") },
        { src: CRS_GUIDE_GALLERY[2].src, alt: tLocalized("CRS Guide Resin implant kılavuzu", "CRS Guide Resin implant guide"), title: tLocalized("İmplant kılavuzu", "Implant guide"), text: tLocalized("Yüksek hassasiyet gerektiren cerrahi planların aktarımı.", "Transfer of surgical plans requiring high precision.") },
        { src: CRS_GUIDE_GALLERY[3].src, alt: tLocalized("CRS Guide Resin şeffaf rehber", "CRS Guide Resin transparent guide"), title: tLocalized("Şeffaf kontrol", "Transparent control"), text: tLocalized("Şeffaf yapı, uygulama sırasında görsel kontrol avantajı sağlar.", "The clear structure provides a visual control advantage during application.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi rehberler?", "Which guides?"),
          items: [
            tLocalized("İmplant cerrahisinde kullanılan <b>cerrahi rehberler</b>", "<b>Surgical guides</b> used in implant surgery"),
            tLocalized("Doğru açı ve konumlandırma gerektiren kılavuz üretimi", "Guide production requiring the right angle and positioning"),
            tLocalized("İntraoral kullanıma hazırlanan şeffaf rehberler", "Transparent guides prepared for intraoral use"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Guide Resin?", "Why CRS Guide Resin?"),
          items: [
            tLocalized("<b>Yüksek baskı hassasiyeti</b> ve stabil yapı", "<b>High print precision</b> and a stable structure"),
            tLocalized("Şeffaf yapı ile görsel kontrol", "Visual control with a clear structure"),
            tLocalized("Biyouyumlu formülasyon", "Biocompatible formulation"),
            tLocalized("Uygun koşullarda standart otoklav sterilizasyonuna dayanım", "Resistance to standard autoclave sterilization under suitable conditions"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS Guide Resin, 385–405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Guide Resin is compatible with DLP and LCD 3D printers operating at 385–405 nm wavelength. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Cerrahi rehber sonucu <span class=\"em\">parametreyle tamamlanır.</span>", "The surgical guide result is <span class=\"em\">completed with the right parameters.</span>"),
      textHtml:
        tLocalized("Cerrahi rehber üretiminde hassasiyet, reçinenin doğru baskı, temizlik, UV kürleme ve sterilizasyon akışıyla birlikte çalışmasına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "Precision in surgical guide production depends on the resin working together with the correct print, cleaning, UV curing, and sterilization workflow. We deliver the resin calibrated according to the printer you use."),
      chips: ["385–405 nm uyum", tLocalized("Cerrahi rehber", "surgical guide"), "IPA temizlik", tLocalized("UV post-curing", "UV post-curing"), "Otoklav"],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Guide Resin hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Guide Resin."),
      sideHtml: tLocalized("Cerrahi rehber üretimi, biyouyumluluk, baskı sonrası işlem ve yazıcı uyumu için net cevaplar.", "Clear answers on surgical guide production, biocompatibility, post-print processing, and printer compatibility."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Custom Guide kılavuz reçinesi ne için kullanılır?", "What is CRS Custom Guide guide resin used for?"),
          answerHtml: tLocalized("Kılavuz reçinesi, implant cerrahisinde kullanılan cerrahi rehberlerin üretimi için kullanılır. Bu rehberler, ameliyat sırasında implantın doğru açı ve konumda yerleştirilmesine yardımcı olur.", "Guide resin is used to produce surgical guides used in implant surgery. These guides help place the implant at the correct angle and position during surgery."),
        },
        {
          question: tLocalized("Baskı sonrası doğrudan kullanılabilir mi?", "Can it be used directly after printing?"),
          answerHtml: tLocalized("Hayır. Baskı sonrası IPA ile temizleme ve ardından UV kürleme işlemi uygulanmalıdır.", "No. After printing, cleaning with IPA followed by UV curing must be applied."),
        },
        {
          question: tLocalized("CRS Custom Guide kılavuz reçinesi biyouyumlu mu?", "Is CRS Custom Guide guide resin biocompatible?"),
          answerHtml: tLocalized("Evet. Ürün biyouyumlu olarak geliştirilmiştir ve <b>ISO 10993</b> standartlarına göre test edilmiştir.", "Yes. The product has been developed to be biocompatible and tested according to <b>ISO 10993</b> standards."),
        },
        {
          question: tLocalized("Rehber üretiminde neden özel bir reçine kullanılır?", "Why is a special resin used in guide production?"),
          answerHtml: tLocalized("Cerrahi rehberler, implant yerleşiminde yüksek hassasiyet gerektirir. Bu nedenle yüksek mekanik dayanım ve ölçü doğruluğu sunan özel kılavuz reçineleri tercih edilir.", "Surgical guides require high precision in implant placement. For this reason, dedicated guide resins that offer high mechanical strength and dimensional accuracy are preferred."),
        },
        {
          question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"),
          answerHtml: tLocalized("385–405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.", "Compatible with DLP and LCD 3D printers operating at 385–405 nm wavelengths."),
        },
        {
          question: tLocalized("Ürün intraoral kullanım için uygun mu?", "Is the product suitable for intraoral use?"),
          answerHtml: tLocalized("Evet. Baskı sonrası gerekli temizlik ve UV kürleme işlemleri tamamlandığında intraoral kullanım için uygundur.", "Yes. It is suitable for intraoral use once the necessary post-print cleaning and UV curing steps are completed."),
        },
        {
          question: tLocalized("Sterilizasyon yapılabilir mi?", "Can it be sterilized?"),
          answerHtml: tLocalized("Evet. Ürün, uygun koşullarda standart otoklav sterilizasyonuna dayanıklıdır.", "Yes. Under proper conditions, the product withstands standard autoclave sterilization."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Cerrahi rehber akışını <span class=\"em\">videoda görün.</span>", "<span class=\"em\">Watch the video</span> for the surgical guide workflow."),
      sideHtml: tLocalized("CRS Guide Resin ile cerrahi rehber üretim akışını videoda izleyin.", "Watch the surgical guide production workflow with CRS Guide Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_GUIDE_GALLERY[1].src,
      imageAlt: tLocalized("CRS Guide Resin uygulama videosu", "CRS Guide Resin application video"),
      title: tLocalized("CRS Guide Resin ile cerrahi rehber üretimi", "Surgical guide production with CRS Guide Resin"),
      text: tLocalized("İmplant cerrahisinde kullanılan cerrahi rehberlerin üretimi için ürün odaklı video.", "A product-focused video for producing surgical guides used in implant surgery."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("SERT SPLINT", "HARD SPLINT"),
          title: tLocalized("CRS Splint Hard", "CRS Splint Hard"),
          descriptionHtml: tLocalized("Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.", "A stable splint resin for hard night guards and bruxism appliances."),
          href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("ORTODONTİ", "ORTHODONTICS"),
          title: tLocalized("CRS IBT Resin", "CRS IBT Resin"),
          descriptionHtml: tLocalized("Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.", "A precise and flexible indirect bonding tray resin for orthodontic bracket placement."),
          href: "/crs-ibt-resin-ortodontik-ibt-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: "PROTEZ",
          title: tLocalized("CRS Flexit", "CRS Flexit"),
          descriptionHtml: tLocalized("Tam ve parsiyel çıkarılabilir protezler için esnek dental reçine.", "A flexible dental resin for full and partial removable dentures."),
          href: "/crs-flexit-recin-protez-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Guide Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Guide Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi cerrahi rehber vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS Guide Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which surgical guide case, which cleaning and post-curing workflow? With a short conversation, let's match CRS Guide Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_IBT_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_IBT_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS IBT Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS IBT Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS IBT Resin", "CRS IBT Resin"),
    },
    hero: {
      kicker: tLocalized("CRS IBT Resin · Ortodontik Indirect Bonding Tray Reçinesi", "CRS IBT Resin · Orthodontic Indirect Bonding Tray Resin"),
      titleHtml: tLocalized("Braket aktarımı artık <span class=\"em\">tek seferde</span> kontrol altında.", "Bracket transfer is now under control <span class=\"em\">in a single step.</span>"),
      leadHtml:
        tLocalized("CRS IBT Resin, ortodontik tedavilerde IBT üretimi için geliştirilmiş biyouyumlu 3D yazıcı reçinesidir. Hassas konumlandırma, kontrollü esneklik ve kolay uygulama ile dijital planlamanın fiziksel ortama güvenilir şekilde aktarılmasını destekler.", "CRS IBT Resin is a biocompatible 3D printer resin developed for IBT production in orthodontic treatments. With precise positioning, controlled flexibility, and easy application, it supports the reliable transfer of digital planning to the physical setting."),
      pills: [
        { label: tLocalized("Indirect bonding tray", "Indirect bonding tray") },
        { label: tLocalized("Ortodontik braket", "orthodontic bracket") },
        { label: tLocalized("Kontrollü esneklik", "Controlled flexibility") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
      ],
      gallery: CRS_IBT_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-ibt-resin-ortodontik-ibt-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20IBT%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20IBT%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Braketleri <span class=\"hl\">planlanan pozisyonda</span> aktarır.", "Transfers brackets to their <span class=\"hl\">planned position.</span>"),
      sideHtml: tLocalized("CRS IBT Resin, ortodontik braketlerin dijital planlamaya uygun şekilde tek seferde aktarılmasına destek olan esnek ve stabil bir reçinedir.", "CRS IBT Resin is a flexible and stable resin that supports transferring orthodontic brackets in a single step in line with digital planning."),
      panelTitleHtml: tLocalized("CRS IBT Resin'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS IBT Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Ortodontik IBT üretiminde hassas aktarım, kontrollü esneklik ve şeffaf yapı öne çıkar.", "Precise transfer, controlled flexibility, and a clear structure stand out in orthodontic IBT production."),
      items: [
        { descriptionHtml: tLocalized("Braketlerin planlanan pozisyonda <b>tek seferde ve yüksek doğrulukla</b> aktarılmasını destekler.", "Supports transferring brackets to their planned position <b>in a single step and with high accuracy</b>.") },
        { descriptionHtml: tLocalized("Kontrollü esnek yapı, IBT plaklarının uygulama sonrası <b>kolay çıkarılmasına</b> yardımcı olur.", "The controlled flexible structure helps IBT trays to be <b>easily removed</b> after application.") },
        { descriptionHtml: tLocalized("Şeffaf yapı, braket ve diş yüzeylerinin uygulama sırasında <b>net görülmesini</b> sağlar.", "The clear structure allows brackets and tooth surfaces to be <b>seen clearly</b> during application.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Ortodontik IBT için <span class=\"em\">hassas ve esnek</span> yapı.", "<span class=\"em\">Precise and flexible</span> structure for orthodontic IBT."),
      sideHtml:
        tLocalized("CRS IBT Resin; ortodontik tedavilerde indirekt bonding tray üretimi için geliştirilmiş biyouyumlu bir 3D yazıcı reçinesidir. 385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur.", "CRS IBT Resin is a biocompatible 3D printer resin developed for indirect bonding tray production in orthodontic treatments. It is compatible with DLP and LCD printers operating at 385 nm and 405 nm wavelengths."),
      items: [
        {
          name: tLocalized("Dalga Boyu", "Wavelength"),
          value: "385",
          unit: "–405 nm",
          tag: tLocalized("LCD / DLP", "LCD/DLP"),
          caption: tLocalized("385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumlu üretim.", "Production compatible with DLP and LCD 3D printers operating at 385 nm and 405 nm wavelengths."),
        },
        {
          name: tLocalized("Uygulama", "APPLICATION"),
          value: "IBT",
          unit: "Tray",
          tag: tLocalized("Ortodonti", "Orthodontics"),
          caption: tLocalized("Braketlerin dijital planlamaya uygun şekilde aktarılması için indirekt bonding tray üretimi.", "Indirect bonding tray production for transferring brackets in line with the digital plan."),
        },
        {
          name: tLocalized("Yapı", "Structure"),
          value: "Esnek",
          unit: "",
          tag: tLocalized("Transparent", "transparent"),
          caption: tLocalized("Kontrollü esneklik ve şeffaf yapı ile klinik kontrolü kolaylaştıran reçine karakteri.", "A resin character that simplifies clinical control with controlled flexibility and a clear structure."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS IBT · ORTODONTİ · LCD / DLP", "CRS IBT · ORTHODONTICS · LCD / DLP"),
      titleHtml: tLocalized("Dijital planı <span class=\"em\">braket aktarımına</span> taşır.", "Transfers the digital plan <span class=\"em\">into bracket placement.</span>"),
      descriptionHtml:
        tLocalized("Braketlerin doğru ve hassas şekilde konumlandırılmasını desteklerken, kontrollü esnekliği sayesinde uygulama sırasında kolay kullanım sağlar. Stabil baskı performansı, dijital planlamanın fiziksel ortama güvenilir şekilde aktarılmasına yardımcı olur.", "While supporting accurate and precise positioning of brackets, its controlled flexibility provides ease of use during application. Stable print performance helps reliably transfer the digital plan into the physical environment."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Indirect bonding tray", "Indirect bonding tray") },
        { label: tLocalized("Klinik alan", "clinical area"), value: tLocalized("Ortodontik braket aktarımı", "Orthodontic bracket transfer") },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Kontrollü esnek + şeffaf", "Controlled flexible + clear") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
        { label: tLocalized("Süreç", "Process"), value: "IPA temizlik + UV post-curing" },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: indirekt bonding tray üretimi, ortodontik braket aktarımı ve uyumlu 3D yazıcılar.", "Everything at a glance: indirect bonding tray production, orthodontic bracket transfer, and compatible 3D printers."),
      photos: [
        { src: CRS_IBT_GALLERY[1].src, alt: tLocalized("CRS IBT Resin indirekt bonding tray uygulaması", "CRS IBT Resin indirect bonding tray application"), title: tLocalized("IBT üretimi", "IBT production"), text: tLocalized("Braketlerin dijital plana göre aktarılması için tray üretimi.", "Tray production for transferring brackets according to the digital plan.") },
        { src: CRS_IBT_GALLERY[2].src, alt: tLocalized("CRS IBT Resin braket aktarımı", "CRS IBT Resin bracket transfer"), title: tLocalized("Braket aktarımı", "Bracket transfer"), text: tLocalized("Hassas konumlandırma gerektiren ortodontik uygulamalar.", "Orthodontic applications requiring precise positioning.") },
        { src: CRS_IBT_GALLERY[3].src, alt: tLocalized("CRS IBT Resin şeffaf ortodontik plak", "CRS IBT Resin transparent orthodontic tray"), title: tLocalized("Şeffaf kontrol", "Transparent control"), text: tLocalized("Braket ve diş yüzeylerinin net görüldüğü uygulama akışı.", "An application workflow where brackets and tooth surfaces are clearly visible.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi plaklar?", "Which records?"),
          items: [
            tLocalized("<b>Indirect bonding tray</b> üretimi", "<b>Indirect bonding tray</b> production"),
            tLocalized("Ortodontik braketlerin tek seferde aktarımı", "One-step transfer of orthodontic brackets"),
            tLocalized("Dijital ortodonti planlarının fiziksel ortama taşınması", "Transferring digital orthodontic plans to a physical setting"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS IBT Resin?", "Why CRS IBT Resin?"),
          items: [
            tLocalized("<b>Hassas konumlandırma</b> desteği", "<b>Precise positioning</b> support"),
            tLocalized("Kontrollü esneklik ile kolay çıkarma", "Easy removal with controlled flexibility"),
            tLocalized("Şeffaf yapı ile klinik kontrol", "Clinical control with a clear structure"),
            tLocalized("Dengeli mekanik yapı ve stabil baskı performansı", "Balanced mechanical structure and stable print performance"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS IBT Resin, 385 nm ve 405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS IBT Resin is compatible with DLP and LCD 3D printers operating at 385 nm and 405 nm wavelengths. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("IBT sonucu <span class=\"em\">dijital planla tamamlanır.</span>", "The IBT result <span class=\"em\">is completed with a digital plan.</span>"),
      textHtml:
        tLocalized("Ortodontik IBT üretiminde doğru sonuç, dijital planlama verisinin hassas baskı, temizlik ve UV kürleme akışıyla birlikte aktarılmasına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "The correct result in orthodontic IBT production depends on transferring the digital planning data accurately through the printing, cleaning, and UV curing workflow together. We deliver the resin calibrated to the printer you use."),
      chips: ["385–405 nm uyum", tLocalized("IBT tray üretimi", "IBT tray production"), tLocalized("Şeffaf kontrol", "Transparent control"), "IPA temizlik", tLocalized("UV post-curing", "UV post-curing")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS IBT Resin hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS IBT Resin."),
      sideHtml: tLocalized("Ortodontik IBT üretimi, braket aktarımı, temizlik ve yazıcı uyumu için net cevaplar.", "Clear answers on orthodontic IBT production, bracket transfer, cleaning, and printer compatibility."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS IBT Resin ne için kullanılır?", "What is CRS IBT Resin used for?"),
          answerHtml: tLocalized("CRS IBT Resin, ortodontik tedavilerde indirekt bonding tray (IBT) üretimi için kullanılır. Braketlerin dijital planlamaya uygun şekilde tek seferde aktarılmasını destekler.", "CRS IBT Resin is used for producing indirect bonding trays (IBT) in orthodontic treatments. It supports transferring brackets in a single step in line with digital planning."),
        },
        {
          question: tLocalized("IBT (indirekt bonding tray) nedir?", "What is IBT (indirect bonding tray)?"),
          answerHtml: tLocalized("IBT, ortodontik braketlerin önceden planlanan pozisyonlarda tek seferde diş üzerine aktarılmasını sağlayan bir plak sistemidir. Dijital ortodonti süreçlerinde hassas ve hızlı uygulama imkanı sunar.", "IBT is a tray system that allows orthodontic brackets to be transferred onto the teeth in previously planned positions in a single step. It offers precise and fast application in digital orthodontic processes."),
        },
        {
          question: tLocalized("CRS IBT Resin hangi 3D yazıcılarla uyumludur?", "Which 3D printers is CRS IBT Resin compatible with?"),
          answerHtml: tLocalized("CRS IBT Resin, <b>385 nm ve 405 nm</b> dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.", "CRS IBT Resin is compatible with DLP and LCD 3D printers operating at <b>385 nm and 405 nm</b> wavelengths."),
        },
        {
          question: tLocalized("Reçinenin esnekliği neden önemlidir?", "Why is the flexibility of the resin important?"),
          answerHtml: tLocalized("IBT plaklarının uygulama sonrası kolay çıkarılabilmesi için kontrollü esneklik gereklidir. CRS IBT Resin, bu dengeyi sağlayarak hem stabil hem de pratik kullanım sunar.", "Controlled flexibility is required so that IBT trays can be easily removed after application. CRS IBT Resin provides this balance, offering both stable and practical use."),
        },
        {
          question: tLocalized("Şeffaf yapı ne avantaj sağlar?", "What advantage does the clear structure provide?"),
          answerHtml: tLocalized("Şeffaf yapı, uygulama sırasında braket ve diş yüzeylerinin net şekilde görülmesini sağlar. Bu sayede klinik kontrol ve doğrulama daha kolay yapılır.", "The clear structure allows brackets and tooth surfaces to be seen clearly during application. This makes clinical control and verification easier."),
        },
        {
          question: tLocalized("Baskı sonrası temizlik nasıl yapılır?", "How is post-print cleaning done?"),
          answerHtml: tLocalized("Baskı sonrası IBT plakları izopropil alkol (IPA) ile temizlenmeli ve ardından uygun UV ışık altında kürleme işlemi uygulanmalıdır.", "After printing, IBT plates should be cleaned with isopropyl alcohol (IPA) and then cured under the appropriate UV light."),
        },
        {
          question: tLocalized("IBT plakları baskı sonrası formunu korur mu?", "Do IBT trays retain their shape after printing?"),
          answerHtml: tLocalized("Evet. CRS IBT Resin, baskı sonrası form stabilitesi sağlayarak uygulama sürecinde deformasyona karşı direnç gösterir.", "Yes. CRS IBT Resin provides post-print form stability and resists deformation during the application process."),
        },
        {
          question: tLocalized("CRS IBT Resin ile üretilen plaklar kolay çıkarılır mı?", "Are the trays produced with CRS IBT Resin easy to remove?"),
          answerHtml: tLocalized("Evet. Kontrollü esneklik sayesinde IBT plakları uygulama sonrası diş yüzeyinden kolaylıkla ayrılabilir.", "Yes. Thanks to controlled flexibility, IBT plates can be easily removed from the tooth surface after application."),
        },
        {
          question: tLocalized("Bu reçine dijital ortodonti süreçlerine uygun mu?", "Is this resin suitable for digital orthodontic processes?"),
          answerHtml: tLocalized("Evet. CRS IBT Resin, dijital planlama verilerinin fiziksel ortama doğru şekilde aktarılmasını destekleyen IBT üretimi için uygundur.", "Yes. CRS IBT Resin is suitable for IBT production, supporting the accurate transfer of digital planning data into the physical setting."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("IBT üretim akışını <span class=\"em\">videoda görün.</span>", "See the IBT production workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS IBT Resin ile ortodontik indirect bonding tray üretim akışını videoda izleyin.", "Watch the orthodontic indirect bonding tray production workflow with CRS IBT Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_IBT_GALLERY[1].src,
      imageAlt: tLocalized("CRS IBT Resin uygulama videosu", "CRS IBT Resin application video"),
      title: tLocalized("CRS IBT Resin ile ortodontik IBT üretimi", "Orthodontic IBT production with CRS IBT Resin"),
      text: tLocalized("Braketlerin hassas aktarımı için indirect bonding tray üretimine odaklanan video.", "A video focused on indirect bonding tray production for precise bracket transfer."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("REHBER", "GUIDE"),
          title: tLocalized("Guide Resin", "Guide Resin"),
          descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."),
          href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"),
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: tLocalized("SERT SPLINT", "HARD SPLINT"),
          title: tLocalized("CRS Splint Hard", "CRS Splint Hard"),
          descriptionHtml: tLocalized("Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.", "A stable splint resin for hard night guards and bruxism appliances."),
          href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("ESNEK SPLINT", "FLEXIBLE SPLINT"),
          title: tLocalized("CRS Splint Soft", "CRS Splint Soft"),
          descriptionHtml: tLocalized("Esnek ve biyouyumlu splint / gece plağı reçinesi; konforlu kullanım.", "Flexible and biocompatible splint / night guard resin; comfortable use."),
          href: "/crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS IBT Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS IBT Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi ortodontik IBT vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS IBT Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which orthodontic IBT case, which cleaning and post-curing workflow? With a short conversation, let's match CRS IBT Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_FLEXIT_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_FLEXIT_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Flexit Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Flexit Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Flexit Reçinesi", "CRS Flexit Resin"),
    },
    hero: {
      kicker: tLocalized("CRS Flexit Reçinesi · Esnek Protez Reçinesi", "CRS Flexit Resin · Flexible Denture Resin"),
      titleHtml: tLocalized("Esnek protez artık <span class=\"em\">konforla</span> basılıyor.", "Flexible dentures are now printed <span class=\"em\">with comfort.</span>"),
      leadHtml:
        tLocalized("Esnek protez üretimi için geliştirilen CRS Flexit Reçinesi; dayanıklılık, biyouyumluluk ve doğal estetiği bir arada sunar. Çıkarılabilir tam ve parsiyel protezlerde dayanım ve konfor dengesine odaklanan profesyonel dental 3D yazıcı reçinesidir.", "CRS Flexit Resin, developed for flexible denture production, offers durability, biocompatibility, and natural aesthetics together. It is a professional dental 3D printer resin focused on the balance of strength and comfort in removable full and partial dentures."),
      pills: [
        { label: tLocalized("Esnek protez", "flexible prosthesis") },
        { label: tLocalized("Tam / parsiyel protez", "Full/partial denture") },
        { label: tLocalized("Biyouyumlu", "Biocompatible") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
      ],
      gallery: CRS_FLEXIT_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-flexit-recin-protez-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Flexit%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Flexit%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Esnek yapısıyla <span class=\"hl\">uyum ve konfor</span> sağlar.", "Provides <span class=\"hl\">fit and comfort</span> with its flexible structure."),
      sideHtml: tLocalized("CRS Flexit Reçinesi, çıkarılabilir tam ve parsiyel protezlerde dayanıklılık, doğal estetik ve hasta konforu dengesine odaklanır.", "CRS Flexit Resin focuses on balancing durability, natural aesthetics, and patient comfort in removable full and partial dentures."),
      panelTitleHtml: tLocalized("CRS Flexit Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Flexit Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Esnek protez üretiminde konfor, form stabilitesi ve doğal diş eti görünümü öne çıkar.", "Comfort, form stability, and a natural gum appearance stand out in flexible denture production."),
      items: [
        { descriptionHtml: tLocalized("Akıllı elastikiyet özelliği, kullanım sırasında <b>esnek davranış</b> ve konfor sağlar.", "The smart elasticity feature provides <b>flexible behavior</b> and comfort during use.") },
        { descriptionHtml: tLocalized("Mekanik dayanımı, protezlerin uzun süreli kullanımda <b>formunu korumasına</b> yardımcı olur.", "Its mechanical strength helps dentures <b>maintain their form</b> during long-term use.") },
        { descriptionHtml: tLocalized("Doğal diş eti görünümünü taklit eden estetik yapı, protez sonuçlarında <b>görsel denge</b> sunar.", "An aesthetic structure that mimics a natural gum appearance provides <b>visual balance</b> in prosthetic results.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Hareketli protez için <span class=\"em\">dayanım ve konfor</span> dengesi.", "A balance of <span class=\"em\">durability and comfort</span> for removable dentures."),
      sideHtml:
        tLocalized("CRS Flexit Reçinesi; çıkarılabilir tam ve parsiyel protezlerin üretimi için geliştirilmiş, ışıkla kürlenen esnek dental 3D yazıcı reçinesidir. 385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP sistemlerle uyumludur.", "CRS Flexit Resin is a light-cured, flexible dental 3D printer resin developed for producing removable full and partial dentures. It is compatible with LCD and DLP systems operating at 385 nm and 405 nm wavelengths."),
      items: [
        {
          name: tLocalized("Dalga Boyu", "Wavelength"),
          value: "385",
          unit: "–405 nm",
          tag: tLocalized("LCD / DLP", "LCD/DLP"),
          caption: tLocalized("385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumlu üretim.", "Production compatible with LCD and DLP 3D printer systems operating at 385 nm and 405 nm wavelengths."),
        },
        {
          name: tLocalized("Uygulama", "APPLICATION"),
          value: "Tam",
          unit: "+ Parsiyel",
          tag: tLocalized("Protez", "Denture"),
          caption: tLocalized("Tam ve parsiyel çıkarılabilir protezlerin üretimi ve protez tabanı uygulamaları.", "Production of full and partial removable dentures and denture base applications."),
        },
        {
          name: tLocalized("Temizlik", "Cleaning"),
          value: "%98",
          unit: "IPA",
          tag: tLocalized("Post-process", "post-processing"),
          caption: tLocalized("Baskı sonrası parçalar en az %98 saflıkta izopropil alkol ile temizlenmelidir.", "After printing, parts should be cleaned with isopropyl alcohol at a purity of at least 98%."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS FLEXIT · ESNEK PROTEZ · LCD / DLP", "CRS FLEXIT · FLEXIBLE PROSTHESIS · LCD / DLP"),
      titleHtml: tLocalized("Protez tabanında <span class=\"em\">esnek ve stabil</span> sonuç.", "A <span class=\"em\">flexible and stable</span> result in the denture base."),
      descriptionHtml:
        tLocalized("Akıllı elastikiyet özelliği sayesinde ortam koşullarında stabil formunu korurken, kullanım sırasında esnek davranış sergileyerek hasta konforunu artırır. Doğal diş eti görünümünü taklit eden estetik yapısı ve biyouyumlu formülasyonu ile dengeli sonuçlar sunar.", "Thanks to its smart elasticity, it retains a stable form under ambient conditions while exhibiting flexible behavior during use, increasing patient comfort. With its aesthetic structure that mimics the natural appearance of gums and its biocompatible formulation, it offers balanced results."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: "Tam + parsiyel protez" },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Esnek dental reçine", "Flexible dental resin") },
        { label: tLocalized("Estetik", "Aesthetic"), value: tLocalized("Doğal diş eti görünümü", "Natural gum appearance") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
        { label: tLocalized("Süreç", "Process"), value: "IPA temizlik + UV post-curing" },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: tam protez, parsiyel protez, protez tabanı ve uyumlu 3D yazıcılar.", "Everything at a glance: full dentures, partial dentures, denture bases, and compatible 3D printers."),
      photos: [
        { src: CRS_FLEXIT_GALLERY[1].src, alt: tLocalized("CRS Flexit çıkarılabilir protez uygulaması", "CRS Flexit removable denture application"), title: tLocalized("Tam protez", "full denture"), text: tLocalized("Çıkarılabilir tam protez üretimi için esnek yapı.", "Flexible structure for removable full denture production.") },
        { src: CRS_FLEXIT_GALLERY[2].src, alt: tLocalized("CRS Flexit parsiyel protez uygulaması", "CRS Flexit partial denture application"), title: tLocalized("Parsiyel protez", "partial denture"), text: tLocalized("Hareketli parsiyel protez vakalarında dayanım ve konfor dengesi.", "Balance of durability and comfort in removable partial denture cases.") },
        { src: CRS_FLEXIT_GALLERY[3].src, alt: tLocalized("CRS Flexit doğal diş eti estetiği", "CRS Flexit natural gingival aesthetics"), title: tLocalized("Diş eti estetiği", "Gingival aesthetics"), text: tLocalized("Doğal diş eti görünümünü taklit eden estetik sonuçlar.", "Aesthetic results that mimic a natural gum appearance.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi protezler?", "Which prostheses?"),
          items: [
            tLocalized("<b>Tam ve parsiyel</b> çıkarılabilir protez üretimi", "<b>Full and partial</b> removable denture production"),
            tLocalized("Protez tabanı uygulamaları", "Denture base applications"),
            tLocalized("Protez tamir ve restorasyon işlemleri", "Denture repair and restoration procedures"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Flexit?", "Why CRS Flexit?"),
          items: [
            tLocalized("<b>Esneklik ve dayanımı</b> bir arada sunan yapı", "A structure offering <b>flexibility and strength</b> together"),
            tLocalized("Doğal diş eti görünümünü taklit eden estetik", "Aesthetics that mimic a natural gum appearance"),
            tLocalized("Biyouyumlu formülasyon", "Biocompatible formulation"),
            tLocalized("Uzun süreli kullanımda form stabilitesi", "Shape stability during long-term use"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS Flexit Reçinesi, 385 nm ve 405 nm dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Flexit Resin is compatible with LCD and DLP 3D printer systems operating at 385 nm and 405 nm wavelengths. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Esnek protez sonucu <span class=\"em\">post-curing ile tamamlanır.</span>", "The flexible denture result <span class=\"em\">is completed with post-curing.</span>"),
      textHtml:
        tLocalized("Hareketli protez üretiminde esneklik ve dayanım dengesi, doğru baskı parametresi, IPA temizlik ve UV post-curing akışıyla birlikte korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "In removable denture production, the balance of flexibility and durability is maintained together with the correct printing parameters, IPA cleaning, and UV post-curing workflow. We calibrate the resin according to your printer and deliver it accordingly."),
      chips: ["385–405 nm uyum", tLocalized("Tam protez", "full denture"), tLocalized("Parsiyel protez", "partial denture"), "%98 IPA temizlik", tLocalized("UV post-curing", "UV post-curing")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Flexit Reçinesi hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Flexit Resin."),
      sideHtml: tLocalized("Esnek protez üretimi, temizlik, post-curing, biyouyumluluk ve saklama koşulları için net cevaplar.", "Clear answers on flexible denture production, cleaning, post-curing, biocompatibility, and storage conditions."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Flexit reçinesi ne için kullanılır?", "What is CRS Flexit resin used for?"),
          answerHtml: tLocalized("CRS Flexit Reçinesi, tam ve parsiyel çıkarılabilir protezlerin üretimi ve protez tabanı uygulamaları için geliştirilmiştir. Ayrıca protez tamir ve restorasyon işlemlerinde de kullanılabilir.", "CRS Flexit Resin was developed for producing full and partial removable dentures and for denture base applications. It can also be used in denture repair and restoration procedures."),
        },
        {
          question: tLocalized("CRS Flexit reçinesi ağız içinde kullanıma uygun mu?", "Is CRS Flexit resin suitable for intraoral use?"),
          answerHtml: tLocalized("Evet. CRS Flexit Reçinesi, uygun baskı ve post-kürleme işlemleri tamamlandıktan sonra dental uygulamalarda kullanıma uygundur. Tam kürlenmemiş ürünlerin ağız içinde kullanılması önerilmez.", "Yes. CRS Flexit Resin is suitable for use in dental applications once proper printing and post-curing processes are completed. Using incompletely cured products intraorally is not recommended."),
        },
        {
          question: tLocalized("CRS Flexit reçinesinin en önemli avantajı nedir?", "What is the most important advantage of CRS Flexit resin?"),
          answerHtml: tLocalized("Esneklik ve dayanımı bir arada sunmasıdır. Kullanım sırasında esnek davranarak protezin ağız içi hareketlere uyum sağlamasına yardımcı olurken, dayanıklı yapısı uzun süreli kullanım performansı sunar.", "It offers flexibility and strength together. By behaving flexibly during use, it helps the denture adapt to intraoral movements, while its durable structure delivers long-term performance."),
        },
        {
          question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"),
          answerHtml: tLocalized("CRS Flexit Reçinesi, <b>385 nm ve 405 nm</b> dalga boyunda çalışan LCD ve DLP 3D yazıcı sistemleriyle uyumludur.", "CRS Flexit Resin is compatible with LCD and DLP 3D printer systems operating at <b>385 nm and 405 nm</b> wavelengths."),
        },
        {
          question: tLocalized("Baskı sonrası temizlik nasıl yapılır?", "How is post-print cleaning done?"),
          answerHtml: tLocalized("Baskı sonrası parçalar en az <b>%98</b> saflıkta izopropil alkol (IPA) ile temizlenmelidir. Daha iyi sonuçlar için ön yıkama ve son yıkama önerilir.", "After printing, parts should be cleaned with isopropyl alcohol (IPA) at a purity of at least <b>98%</b>. A pre-wash and a final wash are recommended for better results."),
        },
        {
          question: tLocalized("Post-kürleme neden gereklidir?", "Why is post-curing necessary?"),
          answerHtml: tLocalized("Post-kürleme işlemi, malzemenin mekanik dayanımını kazanmasını sağlar ve rezidüel monomer miktarını azaltarak daha güvenli kullanım sunar.", "The post-curing process allows the material to gain its mechanical strength and offers safer use by reducing the amount of residual monomer."),
        },
        {
          question: tLocalized("CRS Flexit reçinesi biyouyumlu mu?", "Is CRS Flexit resin biocompatible?"),
          answerHtml: tLocalized("Evet. Yapılan testlere göre sitotoksisite, irritasyon ve sistemik toksisite açısından toksik değil olarak değerlendirilmiştir.", "Yes. Based on the tests performed, it has been evaluated as non-toxic in terms of cytotoxicity, irritation, and systemic toxicity."),
        },
        {
          question: tLocalized("Protezler uzun süre formunu korur mu?", "Do dentures retain their form over time?"),
          answerHtml: tLocalized("Evet. Malzemenin mekanik dayanımı sayesinde protezler uzun süreli kullanımda formunu koruyacak şekilde tasarlanmıştır.", "Yes. Thanks to the material's mechanical strength, dentures are designed to retain their form over long-term use."),
        },
        {
          question: tLocalized("Baskı sırasında nelere dikkat edilmelidir?", "What should be watched for during printing?"),
          answerHtml: tLocalized("Reçine kullanılmadan önce iyice karıştırılmalı, yazıcı temiz olmalı ve reçine içerisinde katı partikül bulunmamalıdır. Bu faktörler baskı kalitesini doğrudan etkiler.", "The resin should be thoroughly mixed before use, the printer should be clean, and there should be no solid particles in the resin. These factors directly affect print quality."),
        },
        {
          question: tLocalized("Reçine hangi koşullarda saklanmalıdır?", "Under what conditions should the resin be stored?"),
          answerHtml: tLocalized("Serin, kuru ve güneş ışığından uzak bir ortamda, orijinal ambalajında saklanmalıdır. Kullanım sonrası kapak sıkıca kapatılmalıdır.", "Should be stored in a cool, dry place away from sunlight, in its original packaging. The cap should be tightly closed after use."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Esnek protez akışını <span class=\"em\">videoda görün.</span>", "See the flexible denture workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Flexit Reçinesi ile tam ve parsiyel protez üretim akışını videoda izleyin.", "Watch the full and partial denture production workflow with CRS Flexit Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_FLEXIT_GALLERY[1].src,
      imageAlt: tLocalized("CRS Flexit Reçinesi uygulama videosu", "CRS Flexit Resin application video"),
      title: tLocalized("CRS Flexit Reçinesi ile esnek protez üretimi", "Flexible denture production with CRS Flexit Resin"),
      text: tLocalized("Tam ve parsiyel çıkarılabilir protezlerde dayanım ve konfor dengesine odaklanan video.", "A video focused on the balance of strength and comfort in full and partial removable dentures."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: "MODEL",
          title: tLocalized("CRS Model", "CRS Model"),
          descriptionHtml: tLocalized("Dental model üretimi için hassas yüzey ve stabil ölçü reçinesi.", "A resin with a precise surface and stable dimensions for dental model production."),
          href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: "TRAY",
          title: tLocalized("CRS Tray Resin", "CRS Tray Resin"),
          descriptionHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi için rijit ve stabil reçine.", "Rigid and stable resin for custom impression tray production."),
          href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: "DENTURE",
          title: tLocalized("CRS Denture", "CRS Denture"),
          descriptionHtml: tLocalized("Çıkarılabilir protez tabanı ve PMMA uyumlu protez üretimi.", "Removable denture base and PMMA-compatible denture production."),
          href: "/crs-denture-biouyumlu-protez-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Flexit Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Flexit Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi protez vakası, hangi temizlik ve post-curing akışı? Kısa bir görüşmeyle CRS Flexit Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which denture case, which cleaning and post-curing workflow? With a short conversation, let's match CRS Flexit Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_ALIGNER_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_ALIGNER_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Aligner Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Aligner Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Aligner", "CRS Aligner"),
    },
    hero: {
      kicker: tLocalized("CRS Aligner · Memory Shape Ortodontik Reçine", "CRS Aligner · Memory Shape Orthodontic Resin"),
      titleHtml: tLocalized("Hizalayıcı artık <span class=\"em\">direkt baskıdan</span> çıkıyor.", "The aligner now comes <span class=\"em\">straight from direct printing</span>."),
      leadHtml:
        tLocalized("CRS Aligner Resin, termoform tabaka tipi hizalayıcıların mevcut sınırlamalarını aşmak için tasarlanmış biyouyumlu bir ortodontik reçinedir. Direkt baskı teknolojisiyle kişiye özel hizalayıcı üretimini destekler; kuvvet, esneklik ve benzersiz memory shape fonksiyonunu bir arada sunar.", "CRS Aligner Resin is a biocompatible orthodontic resin designed to overcome the current limitations of thermoform sheet-type aligners. It supports custom aligner production with direct printing technology, offering force, flexibility, and a unique memory shape function together."),
      pills: [
        { label: tLocalized("Memory shape", "memory shape") },
        { label: tLocalized("Direkt aligner baskı", "Direct aligner printing") },
        { value: "70 MPa", label: tLocalized("flexural strength", "flexural strength") },
        { value: "0.5–1 mm", label: tLocalized("baskı kalınlığı", "print thickness") },
      ],
      gallery: CRS_ALIGNER_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-aligner-memory-shape-ozellikli-aligner-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Aligner%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Aligner%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Tedavi planını <span class=\"hl\">daha hızlı</span> üretime taşır.", "Moves the treatment plan to production <span class=\"hl\">faster.</span>"),
      sideHtml: tLocalized("CRS Aligner, direkt baskı hizalayıcı üretiminde işlem adımlarını azaltarak üretim sürecini verimli hale getirmeye odaklanır.", "CRS Aligner focuses on making the production process more efficient by reducing process steps in direct-print aligner production."),
      panelTitleHtml: tLocalized("CRS Aligner Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Aligner Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Direkt baskı hizalayıcı üretiminde hız, düşük son işlem ihtiyacı ve daha az manuel işlem öne çıkar.", "Speed, low post-processing needs, and less manual work stand out in direct-print aligner production."),
      items: [
        { descriptionHtml: tLocalized("Yaklaşık bir saat içinde toplu baskı alınabildiği ve tedavi sürecinin <b>önemli ölçüde hızlandığı</b> belirtilir.", "It is stated that batch printing can be done in about an hour and the treatment process is <b>significantly accelerated</b>.") },
        { descriptionHtml: tLocalized("Dijital modelden doğrudan baskı, yıkama ve kürleme akışıyla <b>minimal son işlem</b> gerektirir.", "Requires <b>minimal post-processing</b> with a workflow of printing, washing, and curing directly from the digital model.") },
        { descriptionHtml: tLocalized("Daha az adım ve manuel işlem ihtiyacı, üretim sürecindeki <b>iş gücü maliyetini azaltır</b>.", "Fewer steps and less need for manual handling <b>reduce labor costs</b> in the production process.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Kuvvetli, esnek ve <span class=\"em\">memory shape</span> karakterli.", "Strong, flexible, and with a <span class=\"em\">memory shape</span> character."),
      sideHtml:
        tLocalized("CRS Aligner, biyouyumlu ortodontik reçine sınıfında direkt hizalayıcı baskısı için geliştirilmiştir. Teknik değerler ISO 20795-2 ve ASTM D638 referanslarıyla listelenir.", "CRS Aligner was developed for direct aligner printing in the biocompatible orthodontic resin class. Technical values are listed with reference to ISO 20795-2 and ASTM D638."),
      items: [
        {
          name: tLocalized("Flexural Strength", "Flexural Strength"),
          value: "70",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 20795-2", "ISO 20795-2"),
          caption: tLocalized("Direkt hizalayıcı baskısında kuvvet ve esnekliği birlikte hedefleyen mekanik değer.", "A mechanical value targeting both strength and flexibility in direct aligner printing."),
        },
        {
          name: tLocalized("Flexural Modulus", "Flexural Modulus"),
          value: "2000",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 20795-2", "ISO 20795-2"),
          caption: tLocalized("Ortodontik kullanımda form kontrolünü destekleyen elastisite karakteri.", "An elasticity character that supports form control in orthodontic use."),
        },
        {
          name: tLocalized("Baskı Kalınlığı", "Print Thickness"),
          value: "0.5",
          unit: "–1 mm",
          tag: tLocalized("Aligner", "Aligner"),
          caption: tLocalized("Direkt baskı kişiye özel hizalayıcı üretimi için belirtilen baskı kalınlığı aralığı.", "The specified print thickness range for direct-print patient-specific aligner production."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS ALIGNER · MEMORY SHAPE · ORTODONTİ", "CRS ALIGNER · MEMORY SHAPE · ORTHODONTICS"),
      titleHtml: tLocalized("Tabaka termoform yerine <span class=\"em\">direkt hizalayıcı baskısı.</span>", "<span class=\"em\">Direct aligner printing</span> instead of thermoformed sheets."),
      descriptionHtml:
        tLocalized("Ortodontistlerin hizalayıcıların dayanıklılığını ve esnekliğini kontrol etmesine olanak tanır. Benzersiz hafıza şekli fonksiyonu, hastaların daha rahat bir tedavi deneyimi yaşamasını destekler.", "Allows orthodontists to check the durability and flexibility of the aligners. Its unique memory shape function supports a more comfortable treatment experience for patients."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Malzeme tipi", "Material type"), value: tLocalized("Biyouyumlu ortodontik reçine", "Biocompatible orthodontic resin") },
        { label: tLocalized("Flexural strength", "Flexural strength"), value: "70 MPa" },
        { label: tLocalized("Flexural modulus", "Flexural modulus"), value: "2000 MPa" },
        { label: tLocalized("Water solubility", "water solubility"), value: "0.5 mg/mm³" },
        { label: tLocalized("Isıya dayanıklılık", "Heat resistance"), value: tLocalized("100°C altı dezenfeksiyon", "Disinfection below 100°C") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: direkt aligner baskısı, kişiye özel hizalayıcı üretimi ve uyumlu 3D yazıcılar.", "Everything at a glance: direct aligner printing, custom aligner production, and compatible 3D printers."),
      photos: [
        { src: CRS_ALIGNER_GALLERY[1].src, alt: tLocalized("CRS Aligner direkt baskı hizalayıcı uygulaması", "CRS Aligner direct-print aligner application"), title: tLocalized("Direkt aligner", "direct aligner"), text: tLocalized("Termoform tabaka yerine kişiye özel hizalayıcı baskısı.", "Custom aligner printing instead of thermoformed sheets.") },
        { src: CRS_ALIGNER_GALLERY[2].src, alt: tLocalized("CRS Aligner kişiye özel hizalayıcı üretimi", "CRS Aligner custom aligner production"), title: tLocalized("Kişiye özel üretim", "Custom production"), text: tLocalized("Dijital modelden doğrudan hasta özelinde üretim akışı.", "Patient-specific production workflow directly from the digital model.") },
        { src: CRS_ALIGNER_GALLERY[3].src, alt: tLocalized("CRS Aligner ortodontik tedavi planlama", "CRS Aligner orthodontic treatment planning"), title: tLocalized("Tedavi planlama", "Treatment planning"), text: tLocalized("Toplu baskı ve daha az manuel işlemle hızlı planlama.", "Fast planning with batch printing and less manual work.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi hizalayıcılar?", "Which aligners?"),
          items: [
            tLocalized("<b>Direkt baskı</b> kişiye özel hizalayıcılar", "<b>Directly printed</b> custom aligners"),
            tLocalized("Ortodontik tedavi planlamasına bağlı aligner üretimi", "Aligner production based on orthodontic treatment planning"),
            tLocalized("Memory shape fonksiyonu gerektiren ortodontik aygıtlar", "Orthodontic devices requiring memory shape function"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Aligner?", "Why CRS Aligner?"),
          items: [
            tLocalized("<b>Kuvvet ve esneklik</b> dengesi", "A balance of <b>strength and flexibility</b>"),
            "Benzersiz memory shape fonksiyonu",
            tLocalized("Minimal son işlem akışı", "Minimal post-processing workflow"),
            tLocalized("Direkt baskı ile daha az manuel işlem", "Less manual work with direct printing"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("DLP & LCD yazıcılarla çalışır", "Works with DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.", "As the official distributor of Custom Resin Solutions, we perform parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We build the production workflow together with post-sale user training and technical support."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Aligner sonucu <span class=\"em\">parametreyle tamamlanır.</span>", "The aligner result <span class=\"em\">is completed with the right parameters.</span>"),
      textHtml:
        tLocalized("Direkt hizalayıcı üretiminde reçinenin kuvvet, esneklik ve memory shape davranışı doğru baskı, yıkama ve kürleme akışıyla birlikte korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "In direct aligner production, the resin's strength, flexibility, and memory shape behavior are preserved together with the right printing, washing, and curing workflow. We calibrate the resin to match the printer you use before delivery."),
      chips: [tLocalized("Memory shape", "memory shape"), tLocalized("Direkt aligner baskı", "Direct aligner printing"), tLocalized("Yıkama", "Washing"), tLocalized("UV post-curing", "UV post-curing"), tLocalized("100°C altı dezenfeksiyon", "Disinfection below 100°C")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Aligner hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Aligner."),
      sideHtml: tLocalized("Direkt aligner baskısı, memory shape fonksiyonu, dezenfeksiyon ve teknik değerler için net cevaplar.", "Clear answers on direct aligner printing, memory shape function, disinfection, and technical values."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Aligner Resin ne için kullanılır?", "What is CRS Aligner Resin used for?"),
          answerHtml: tLocalized("CRS Aligner Resin, direkt baskı teknolojisi kullanılarak kişiye özel ortodontik hizalayıcıların üretilmesi için kullanılır.", "CRS Aligner Resin is used to produce custom orthodontic aligners using direct printing technology."),
        },
        {
          question: tLocalized("CRS Aligner Resin'in hafıza şekli fonksiyonu nedir?", "What is the memory shape function of CRS Aligner Resin?"),
          answerHtml: tLocalized("Memory shape fonksiyonu, hizalayıcının kuvvet ve esneklik dengesini koruyarak hastanın daha rahat bir tedavi deneyimi yaşamasını destekleyen malzeme davranışıdır.", "Memory shape function is a material behavior that supports a more comfortable treatment experience for the patient by preserving the aligner's balance of force and flexibility."),
        },
        {
          question: tLocalized("CRS Aligner Resin'in dezenfeksiyonu nasıl yapılır?", "How is CRS Aligner Resin disinfected?"),
          answerHtml: tLocalized("Ürün, <b>100°C altındaki</b> sıcaklıklarda dezenfeksiyona uygun olacak şekilde listelenmiştir.", "The product is listed as suitable for disinfection at temperatures <b>below 100°C</b>."),
        },
        {
          question: tLocalized("Teknik değerleri nelerdir?", "What are the technical values?"),
          answerHtml: tLocalized("Flexural strength <b>70 MPa</b>, flexural modulus <b>2000 MPa</b>, water solubility <b>0.5 mg/mm³</b> ve baskı kalınlığı <b>0.5–1 mm</b> olarak listelenir.", "Flexural strength is listed as <b>70 MPa</b>, flexural modulus <b>2000 MPa</b>, water solubility <b>0.5 mg/mm³</b>, and print thickness <b>0.5–1 mm</b>."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Aligner üretim akışını <span class=\"em\">videoda görün.</span>", "See the aligner production workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Aligner Resin ile direkt hizalayıcı üretim akışını videoda izleyin.", "Watch the direct aligner production workflow with CRS Aligner Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_ALIGNER_GALLERY[1].src,
      imageAlt: tLocalized("CRS Aligner Resin uygulama videosu", "CRS Aligner Resin application video"),
      title: tLocalized("CRS Aligner Resin ile direkt hizalayıcı üretimi", "Direct aligner production with CRS Aligner Resin"),
      text: tLocalized("Memory shape özellikli ortodontik reçineyle kişiye özel hizalayıcı üretimine odaklanan video.", "A video focused on producing custom aligners with memory shape orthodontic resin."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("ORTODONTİ", "ORTHODONTICS"), title: tLocalized("CRS IBT Resin", "CRS IBT Resin"), descriptionHtml: tLocalized("Ortodontik braket yerleştirme için hassas ve esnek indirect bonding tray reçinesi.", "A precise and flexible indirect bonding tray resin for orthodontic bracket placement."), href: "/crs-ibt-resin-ortodontik-ibt-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: tLocalized("DİŞ ETİ", "GINGIVA"), title: tLocalized("CRS Gingiva", "CRS Gingiva"), descriptionHtml: tLocalized("İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", "An elastic, tear-resistant gingiva resin for implant models."), href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Aligner Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Aligner Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi aligner vakası, hangi yıkama ve post-curing akışı? Kısa bir görüşmeyle CRS Aligner Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which aligner case, which washing and post-curing workflow? With a short conversation, let's match CRS Aligner Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_DENTURE_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_DENTURE_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Denture Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Denture Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Denture", "CRS Denture"),
    },
    hero: {
      kicker: tLocalized("CRS Denture · Biyouyumlu Protez Tabanı Reçinesi", "CRS Denture · Biocompatible Denture Base Resin"),
      titleHtml: tLocalized("Protez tabanı artık <span class=\"em\">doğal görünümle</span> basılıyor.", "The denture base is now printed <span class=\"em\">with a natural look.</span>"),
      leadHtml:
        tLocalized("CRS Denture Resin, biyouyumlu CE Class IIA sertifikalı, çıkarılabilir protez tabanları için özel olarak geliştirilmiş bir reçinedir. Doğal şeffaflık, dayanıklılık ve uzun ömür sunar; mekanik cilalama ve optik glaze işlemleri ile uyumludur.", "CRS Denture Resin is a biocompatible, CE Class IIA certified resin specially developed for removable denture bases. It offers natural translucency, durability, and a long lifespan, and is compatible with mechanical polishing and optical glazing."),
      pills: [
        { value: "145 MPa", label: tLocalized("eğilme mukavemeti", "flexural strength") },
        { value: "3547 MPa", label: tLocalized("eğilme modülü", "flexural modulus") },
        { value: "80", label: tLocalized("Shore D", "Shore D") },
        { label: tLocalized("CE Class IIA", "CE Class IIA") },
      ],
      gallery: CRS_DENTURE_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-denture-biouyumlu-protez-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Denture%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Denture%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Düşük çekme oranıyla <span class=\"hl\">mükemmel uyum</span> sağlar.", "Provides <span class=\"hl\">perfect fit</span> with a low shrinkage rate."),
      sideHtml: tLocalized("CRS Denture, standart PMMA protez taban malzemelerine kıyasla düşük çekme oranı ve doğal şeffaflıkla protez tabanlarında uyumlu sonuç hedefler.", "Compared to standard PMMA denture base materials, CRS Denture aims for a well-fitting result in denture bases with a low shrinkage rate and natural translucency."),
      panelTitleHtml: tLocalized("CRS Denture Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Denture Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Protez tabanı üretiminde uyum, doğal görünüm ve kolay işlenebilirlik öne çıkar.", "Fit, natural appearance, and ease of processing stand out in denture base production."),
      items: [
        { descriptionHtml: tLocalized("Protez tabanlarının düşük çekme oranı sayesinde <b>mükemmel uyum</b> sağladığı belirtilir.", "Thanks to their low shrinkage rate, denture bases are noted to provide <b>excellent fit</b>.") },
        { descriptionHtml: tLocalized("Dayanıklılığı ve doğal şeffaflığı sayesinde protezlerin <b>doğal göründüğü</b> ifade edilir.", "Thanks to its durability and natural translucency, dentures are said to <b>look natural.</b>") },
        { descriptionHtml: tLocalized("Mekanik cilalama ve optik glaze işlemleriyle <b>kolay çalışılabildiği</b> belirtilir.", "It is noted to be <b>easy to work with</b> using mechanical polishing and optical glaze processes.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Protez tabanında <span class=\"em\">dayanım ve doğal şeffaflık</span>.", "<span class=\"em\">Strength and natural translucency</span> in the denture base."),
      sideHtml:
        tLocalized("CRS Denture Reçinesi; çıkarılabilir protez tabanları için geliştirilmiş, biyouyumlu CE Class IIA sertifikalı protez reçinesidir. Teknik değerler ISO 20795 ve ASTM standartlarıyla listelenir.", "CRS Denture Resin is a biocompatible, CE Class IIA certified denture resin developed for removable denture bases. Technical values are listed according to ISO 20795 and ASTM standards."),
      items: [
        { name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"), value: "145", unit: tLocalized("MPa", "MPa"), tag: tLocalized("ISO 20795", "ISO 20795"), caption: tLocalized("Protez tabanında fonksiyonel dayanımı destekleyen eğilme mukavemeti değeri.", "The flexural strength value that supports functional durability in the denture base.") },
        { name: tLocalized("Eğilme Modülü", "Flexural Modulus"), value: "3547", unit: tLocalized("MPa", "MPa"), tag: tLocalized("ISO 20795", "ISO 20795"), caption: tLocalized("Protez tabanının stabil kullanımına katkı sağlayan eğilme modülü değeri.", "The flexural modulus value that contributes to the stable use of the denture base.") },
        { name: tLocalized("Sertlik", "Hardness"), value: "80", unit: tLocalized("Shore D", "Shore D"), tag: tLocalized("ASTM D2240", "ASTM D2240"), caption: tLocalized("Uzun ömürlü protez tabanı üretimi için listelenen yüzey sertliği.", "The surface hardness listed for producing a long-lasting denture base.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS DENTURE · CE CLASS IIA · PROTEZ TABANI", "CRS DENTURE · CE CLASS IIA · PROSTHESIS BASE"),
      titleHtml: tLocalized("Düşük çekme oranıyla <span class=\"em\">uyumlu protez tabanı.</span>", "<span class=\"em\">A well-fitting denture base</span> with a low shrinkage rate."),
      descriptionHtml:
        tLocalized("Standart PMMA protez taban malzemelerine kıyasla düşük çekme oranına sahiptir. Doğal şeffaflık ve dayanıklılık ile uzun ömürlü, doğal görünümlü protezler üretmeyi destekler.", "It has a low shrinkage rate compared to standard PMMA denture base materials. With its natural translucency and durability, it supports producing long-lasting, natural-looking dentures."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Çekme dayanımı", "Tensile strength"), value: "30 MPa" },
        { label: tLocalized("Esneklik modülü", "Flexural modulus"), value: "1287 MPa" },
        { label: tLocalized("Kopma uzaması", "Elongation at break"), value: "22 MPa" },
        { label: tLocalized("Eğilme mukavemeti", "Flexural strength"), value: "145 MPa" },
        { label: tLocalized("Biyouyumluluk", "Biocompatibility"), value: tLocalized("ISO 10993 - toksik değil", "ISO 10993 - non-toxic") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: çıkarılabilir protez tabanı, doğal şeffaflık, cilalama/glaze uyumu ve uyumlu 3D yazıcılar.", "Everything at a glance: removable denture bases, natural translucency, polishing/glaze compatibility, and compatible 3D printers."),
      photos: [
        { src: CRS_DENTURE_GALLERY[1].src, alt: tLocalized("CRS Denture protez tabanı uygulaması", "CRS Denture denture base application"), title: tLocalized("Protez tabanı", "Denture base"), text: tLocalized("Çıkarılabilir protez tabanları için özel olarak geliştirilmiş reçine.", "A resin specially developed for removable denture bases.") },
        { src: CRS_DENTURE_GALLERY[2].src, alt: tLocalized("CRS Denture doğal görünümlü protez", "CRS Denture natural-looking denture"), title: tLocalized("Doğal görünüm", "Natural appearance"), text: tLocalized("Doğal şeffaflık ve dayanıklılıkla uzun ömürlü sonuçlar.", "Long-lasting results with natural transparency and durability.") },
        { src: CRS_DENTURE_GALLERY[3].src, alt: tLocalized("CRS Denture düşük çekme uyumu", "CRS Denture low-shrinkage compatibility"), title: tLocalized("Düşük çekme", "Low shrinkage"), text: tLocalized("Standart PMMA malzemelere göre daha az çekme ile uyumlu taban.", "A compatible base with less shrinkage compared to standard PMMA materials.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi protezler?", "Which prostheses?"),
          items: [
            tLocalized("<b>Çıkarılabilir protez tabanları</b>", "<b>Removable denture bases</b>"),
            tLocalized("Akrilik dişlerle çalışan protez üretimi", "Denture production working with acrylic teeth"),
            tLocalized("Mekanik cilalama ve optik glaze gerektiren protezler", "Dentures requiring mechanical polishing and optical glaze"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Denture?", "Why CRS Denture?"),
          items: [
            tLocalized("<b>Düşük çekme oranı</b> ile mükemmel uyum", "Perfect fit with a <b>low shrinkage rate</b>"),
            tLocalized("Doğal şeffaflık ve dayanıklılık", "Natural transparency and durability"),
            tLocalized("Mekanik cilalama ve optik glaze uyumu", "Mechanical polishing and optical glaze compatibility"),
            tLocalized("CE Class IIA biyouyumlu formülasyon", "CE Class IIA biocompatible formulation"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("DLP & LCD yazıcılarla çalışır", "Works with DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.", "As the official distributor of Custom Resin Solutions, we perform parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We build the production workflow together with post-sale user training and technical support."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Protez sonucu <span class=\"em\">cilalama ve glaze ile tamamlanır.</span>", "The denture result <span class=\"em\">is completed with polishing and glaze.</span>"),
      textHtml:
        tLocalized("CRS Denture protez tabanında düşük çekme, doğal şeffaflık ve dayanıklılık; doğru baskı, temizlik, post-curing, mekanik cilalama ve optik glaze akışıyla birlikte görünür hale gelir.", "Low shrinkage, natural translucency, and durability in the CRS Denture denture base become visible together with the correct print, cleaning, post-curing, mechanical polishing, and optical glaze workflow."),
      chips: [tLocalized("CE Class IIA", "CE Class IIA"), tLocalized("Düşük çekme", "Low shrinkage"), "Mekanik cilalama", tLocalized("Optik glaze", "optik glaze"), tLocalized("ISO 10993", "ISO 10993")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Denture hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Denture."),
      sideHtml: tLocalized("Protez tabanı üretimi, akrilik diş uyumu, cilalama ve teknik değerler için net cevaplar.", "Clear answers on denture base production, acrylic tooth fit, polishing, and technical values."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Denture Reçinesi ne için kullanılır?", "What is CRS Denture Resin used for?"),
          answerHtml: tLocalized("CRS Denture Reçinesi, çıkarılabilir protez tabanlarının üretimi için özel olarak geliştirilmiş biyouyumlu protez reçinesidir.", "CRS Denture Resin is a biocompatible denture resin specially developed for producing removable denture bases."),
        },
        {
          question: tLocalized("Denture reçinesi akrilik dişlerle uyumlu mudur?", "Is the denture resin compatible with acrylic teeth?"),
          answerHtml: tLocalized("Evet. Protez tabanı üretiminde kullanılan akrilik dişlerle çalışmaya uygun bir protez reçinesi olarak konumlandırılır.", "Yes. It is positioned as a denture resin suitable for use with the acrylic teeth used in denture base production."),
        },
        {
          question: tLocalized("Hangi cila işlemleriyle uyumludur?", "Which polishing processes is it compatible with?"),
          answerHtml: tLocalized("Hem mekanik cilalama hem de optik glaze işlemleri ile uyumludur; marka fark etmeksizin tüm cila ürünleriyle çalışmaya olanak tanır.", "It is compatible with both mechanical polishing and optical glaze processes; it allows working with all polishing products regardless of brand."),
        },
        {
          question: tLocalized("Biyouyumluluk testleri nasıldır?", "What are the biocompatibility tests like?"),
          answerHtml: tLocalized("ISO 10993 kapsamında sitotoksisite, duyarlılık, irritasyon, sistemik toksisite, implantasyon ve genotoksisite başlıklarında toksik değil olarak listelenir.", "Under ISO 10993, it is listed as non-toxic in the categories of cytotoxicity, sensitization, irritation, systemic toxicity, implantation, and genotoxicity."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Protez tabanı akışını <span class=\"em\">videoda görün.</span>", "See the denture base workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Denture Reçinesi ile protez tabanı üretim akışını videoda izleyin.", "Watch the denture base production workflow with CRS Denture Resin in the video."),
      href: "https://www.youtube.com/watch?v=HqZ1a5tra4c",
      image: CRS_DENTURE_GALLERY[1].src,
      imageAlt: tLocalized("CRS Denture Reçinesi uygulama videosu", "CRS Denture Resin application video"),
      title: tLocalized("CRS Denture Reçinesi ile protez tabanı üretimi", "Denture base production with CRS Denture Resin"),
      text: tLocalized("Biyouyumlu protez tabanı reçinesiyle düşük çekme ve doğal görünüm odaklı üretim videosu.", "A production video focused on a biocompatible denture base resin with low shrinkage and a natural appearance."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("ESNEK PROTEZ", "FLEXIBLE PROSTHESIS"), title: tLocalized("CRS Flexit", "CRS Flexit"), descriptionHtml: tLocalized("Tam ve parsiyel çıkarılabilir protezler için esnek dental reçine.", "A flexible dental resin for full and partial removable dentures."), href: "/crs-flexit-recin-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: tLocalized("DİŞ ETİ", "GINGIVA"), title: tLocalized("CRS Gingiva", "CRS Gingiva"), descriptionHtml: tLocalized("İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", "An elastic, tear-resistant gingiva resin for implant models."), href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Denture Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Denture Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi protez tabanı vakası, hangi cilalama veya glaze akışı? Kısa bir görüşmeyle CRS Denture Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which denture base case, which polishing or glaze workflow? With a short conversation, let's match CRS Denture Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_GINGIVA_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_GINGIVA_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Gingiva Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Gingiva Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Gingiva", "CRS Gingiva"),
    },
    hero: {
      kicker: tLocalized("CRS Gingiva · Yırtılmaz Diş Eti Reçinesi", "CRS Gingiva · Tear-Resistant Gingiva Resin"),
      titleHtml: tLocalized("Diş eti maskesi artık <span class=\"em\">doğal hissiyatla</span> basılıyor.", "Gingiva masks are now printed <span class=\"em\">with a natural feel.</span>"),
      leadHtml:
        tLocalized("CRS Gingiva Reçinesi, diş etini birebir taklit eden, elastik ve yüksek yırtılma direncine sahip bir reçinedir. İmplant modelleri üzerinde diş eti maskesi gibi esneklik gerektiren model segmentlerinin yazdırılmasını mümkün kılar.", "CRS Gingiva Resin is an elastic resin with high tear resistance that precisely mimics gingival tissue. It makes it possible to print model segments requiring flexibility, such as gingiva masks, on implant models."),
      pills: [
        { label: tLocalized("Yırtılmaz yapı", "Tear-resistant structure") },
        { label: tLocalized("Elastik diş eti", "Elastic gingiva") },
        { label: tLocalized("Boyutsal stabilite", "Dimensional stability") },
        { label: tLocalized("Doğal diş eti rengi", "Natural gum color") },
      ],
      gallery: CRS_GINGIVA_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Gingiva%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Gingiva%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Doğal diş etine <span class=\"hl\">çok yakın</span> görünüm verir.", "Gives an appearance <span class=\"hl\">very close</span> to natural gum."),
      sideHtml: tLocalized("CRS Gingiva, implant modellerinde yumuşak doku ve diş eti maskesi üretimi için esnek, yırtılmaz ve boyutsal olarak stabil bir baskı malzemesidir.", "CRS Gingiva is a flexible, tear-resistant, and dimensionally stable printing material for producing soft tissue and gingiva masks on implant models."),
      panelTitleHtml: tLocalized("CRS Gingiva Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Gingiva Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Diş eti maskesi ve yumuşak doku segmentlerinde yırtılmazlık, düşük çekme ve doğal hissiyat öne çıkar.", "Tear resistance, low shrinkage, and a natural feel stand out in gingiva masks and soft tissue segments."),
      items: [
        { descriptionHtml: tLocalized("Yırtılmazlık özelliği sayesinde <b>uyum çalışmasının kolayca yapılabildiği</b> belirtilir.", "It is stated that the tear-resistant feature allows <b>fit trials to be done easily</b>.") },
        { descriptionHtml: tLocalized("Düşük çekme oranı sayesinde baskı sonrası <b>boyutun değişmediği</b> ifade edilir.", "Thanks to the low shrinkage rate, it is stated that <b>the dimension does not change</b> after printing.") },
        { descriptionHtml: tLocalized("Esneklik özelliği sayesinde doğal diş etine <b>çok benzeyen</b> sonuçlar alınır.", "Thanks to its flexibility, results that are <b>very similar</b> to natural gum are achieved.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Esnek, yırtılmaz ve <span class=\"em\">boyutsal olarak stabil</span>.", "Flexible, tear-resistant, and <span class=\"em\">dimensionally stable</span>."),
      sideHtml:
        tLocalized("CRS Gingiva Reçinesi; implant modelleri için yumuşak doku ve diş eti maskesi üretiminde kullanılan elastik diş eti reçinesidir. Teknik başlıklarda ASTM D638 ve ISO 10139-2 referansları yer alır.", "CRS Gingiva Resin is an elastic gingiva resin used to produce soft tissue and gingiva masks for implant models. Technical specifications reference ASTM D638 and ISO 10139-2."),
      items: [
        { name: tLocalized("Çekme Dayanımı", "Tensile Strength"), value: "ASTM", unit: "D638", tag: tLocalized("Gingiva", "gingiva"), caption: tLocalized("Yırtılmaz diş eti maskesi ve uyum çalışmaları için listelenen teknik başlık.", "Technical heading listed for tear-resistant gingiva masks and fit trials.") },
        { name: tLocalized("Kopma Uzaması", "Elongation at Break"), value: "ASTM", unit: "D638", tag: tLocalized("Elastik", "Elastic"), caption: tLocalized("Esnek yumuşak doku segmentlerinde kopma davranışını tanımlayan teknik başlık.", "The technical title describing tear behavior in flexible soft-tissue segments.") },
        { name: tLocalized("Shore A Değeri", "Shore A Value"), value: "ISO", unit: "10139-2", tag: tLocalized("Soft tissue", "soft tissue"), caption: tLocalized("Doğal diş eti hissiyatına yakın elastik karakter için listelenen standart başlığı.", "The standard title listed for an elastic character close to natural gum feel.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS GINGIVA · YIRTILMAZ · DİŞ ETİ MASKESİ", "CRS GINGIVA · TEAR-RESISTANT · GINGIVA MASK"),
      titleHtml: tLocalized("İmplant modellerinde <span class=\"em\">esnek yumuşak doku.</span>", "<span class=\"em\">Flexible soft tissue</span> in implant models."),
      descriptionHtml:
        tLocalized("Renk, doku ve hissiyat olarak doğal diş etine çok benzeyen baskılar almanızı sağlar. Baskı sırasında boyutsal stabiliteye sahiptir ve baskı işlemi tamamlandıktan sonra lekesizdir.", "Allows you to get prints that closely resemble natural gum tissue in color, texture, and feel. It has dimensional stability during printing and is stain-free once printing is complete."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("İmplant modeli yumuşak doku", "Implant model soft tissue") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Diş eti maskesi", "Gingiva mask") },
        { label: tLocalized("Malzeme karakteri", "Material character"), value: tLocalized("Elastik + yırtılmaz", "Elastic + tear-resistant") },
        { label: tLocalized("Stabilite", "stability"), value: tLocalized("Baskı sonrası boyut değiştirmez", "Doesn't change size after printing") },
        { label: tLocalized("Görünüm", "Appearance"), value: tLocalized("Doğal diş eti rengi", "Natural gum color") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: implant modelleri, diş eti maskeleri, esnek yumuşak doku segmentleri ve uyumlu 3D yazıcılar.", "Everything at a glance: implant models, gingiva masks, flexible soft-tissue segments, and compatible 3D printers."),
      photos: [
        { src: CRS_GINGIVA_GALLERY[1].src, alt: tLocalized("CRS Gingiva diş eti maskesi uygulaması", "CRS Gingiva gingiva mask application"), title: tLocalized("Diş eti maskesi", "Gingiva mask"), text: tLocalized("Modelin esneklik gerektiren diş eti segmentleri için.", "For gum segments of the model that require flexibility.") },
        { src: CRS_GINGIVA_GALLERY[2].src, alt: tLocalized("CRS Gingiva implant modeli yumuşak doku", "CRS Gingiva implant model soft tissue"), title: tLocalized("İmplant modeli", "Implant model"), text: tLocalized("İmplant modelleri için yumuşak doku uygulamaları.", "Soft tissue applications for implant models.") },
        { src: CRS_GINGIVA_GALLERY[3].src, alt: tLocalized("CRS Gingiva esnek diş eti segmenti", "CRS Gingiva flexible gingiva segment"), title: tLocalized("Uyum çalışması", "Fit trial"), text: tLocalized("Yırtılmaz ve elastik yapı ile kolay uyum çalışması.", "Easy fit trials thanks to a tear-resistant, elastic structure.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi segmentler?", "Which segments?"),
          items: [
            tLocalized("<b>İmplant modelleri</b> için yumuşak doku", "Soft tissue for <b>implant models</b>"),
            tLocalized("Diş eti maskeleri", "Gingiva masks"),
            tLocalized("Esneklik gerektiren model parçaları", "Model parts that require flexibility"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Gingiva?", "Why CRS Gingiva?"),
          items: [
            tLocalized("<b>Yüksek yırtılma direnci</b>", "<b>High tear resistance</b>"),
            tLocalized("Doğal diş eti rengi, doku ve hissiyat", "Natural gum color, texture, and feel"),
            tLocalized("Baskı sonrası boyutsal stabilite", "Dimensional stability after printing"),
            tLocalized("Elastik yapı ile kolay uyum çalışması", "Easy fit testing with an elastic structure"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("DLP & LCD yazıcılarla çalışır", "Works with DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.", "As the official distributor of Custom Resin Solutions, we perform parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We build the production workflow together with post-sale user training and technical support."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Gingiva sonucu <span class=\"em\">model doğruluğuyla tamamlanır.</span>", "The gingiva result <span class=\"em\">is completed with model accuracy.</span>"),
      textHtml:
        tLocalized("Diş eti maskesinde gerçekçi görünüm ve uyum çalışması, reçinenin elastik davranışı kadar model baskısının doğruluğuna ve doğru post-process akışına bağlıdır. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "A realistic look and fit test on gingiva masks depends not only on the resin's elastic behavior but also on the accuracy of the model print and the correct post-processing workflow. We calibrate the resin to match the printer you use before delivery."),
      chips: [tLocalized("Diş eti maskesi", "Gingiva mask"), tLocalized("Yumuşak doku", "Soft tissue"), tLocalized("Yırtılmaz yapı", "Tear-resistant structure"), tLocalized("Boyutsal stabilite", "Dimensional stability"), tLocalized("Doğal renk", "Natural color")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Gingiva hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Gingiva."),
      sideHtml: tLocalized("Diş eti maskesi, implant modeli yumuşak doku ve elastik malzeme davranışı için net cevaplar.", "Clear answers on gingiva masks, implant model soft tissue, and elastic material behavior."),
      openFirst: true,
      items: [
        {
          question: tLocalized("CRS Gingiva Reçinesi ne için kullanılır?", "What is CRS Gingiva Resin used for?"),
          answerHtml: tLocalized("CRS Gingiva Reçinesi, implant modelleri için yumuşak doku ve diş eti maskesi üretiminde kullanılır.", "CRS Gingiva Resin is used to produce soft tissue and gingiva masks for implant models."),
        },
        {
          question: tLocalized("Doğal diş etine benzer mi?", "Does it resemble natural gum?"),
          answerHtml: tLocalized("Evet. Renk, doku ve hissiyat olarak doğal diş etine çok benzeyen baskılar almak için geliştirilmiştir.", "Yes. It has been developed to produce prints that closely resemble natural gum in color, texture, and feel."),
        },
        {
          question: tLocalized("Baskı sonrası boyut değiştirir mi?", "Does it change size after printing?"),
          answerHtml: tLocalized("Malzeme baskı sırasında boyutsal stabiliteye sahiptir ve düşük çekme oranıyla baskı sonrası boyutun değişmediği belirtilir.", "The material has dimensional stability during printing, and it is stated that with its low shrinkage rate the post-print dimensions do not change."),
        },
        {
          question: tLocalized("Uyum çalışmaları için uygun mu?", "Is it suitable for fit trials?"),
          answerHtml: tLocalized("Evet. Elastik ve yüksek yırtılma direncine sahip yapısı sayesinde diş eti maskesi üzerinde uyum çalışması yapılmasını kolaylaştırır.", "Yes. Thanks to its elastic, high tear-resistant structure, it makes fit testing on the gingiva mask easier."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Diş eti maskesi akışını <span class=\"em\">videoda görün.</span>", "See the gingiva mask workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Gingiva Reçinesi ile diş eti maskesi ve yumuşak doku üretim akışını videoda izleyin.", "Watch the gingiva mask and soft tissue production workflow with CRS Gingiva Resin in the video."),
      href: "https://www.youtube.com/watch?v=Lz3AWRKwURs",
      image: CRS_GINGIVA_GALLERY[1].src,
      imageAlt: tLocalized("CRS Gingiva Reçinesi uygulama videosu", "CRS Gingiva Resin application video"),
      title: tLocalized("CRS Gingiva Reçinesi ile diş eti maskesi üretimi", "Gingiva mask production with CRS Gingiva Resin"),
      text: tLocalized("İmplant modelleri için elastik ve yırtılmaz yumuşak doku segmentlerine odaklanan video.", "A video focused on the elastic, tear-resistant soft-tissue segments for implant models."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "PROTEZ", title: tLocalized("CRS Denture", "CRS Denture"), descriptionHtml: tLocalized("Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", "Biocompatible denture resin for removable denture bases."), href: "/crs-denture-biouyumlu-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: tLocalized("REHBER", "GUIDE"), title: tLocalized("Guide Resin", "Guide Resin"), descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."), href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"), linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Gingiva Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Gingiva Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi implant modeli, hangi diş eti maskesi akışı? Kısa bir görüşmeyle CRS Gingiva Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which implant model, which gingiva mask workflow? With a short conversation, let's match CRS Gingiva Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_MODEL_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_MODEL_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Model Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Model Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Model", "CRS Model"),
    },
    hero: {
      kicker: tLocalized("CRS Model · Yüksek Hassasiyetli Model Reçinesi", "CRS Model · High-Precision Model Resin"),
      titleHtml: tLocalized("Model doğruluğu artık <span class=\"em\">referans noktanız</span> oluyor.", "Model accuracy now becomes <span class=\"em\">your reference point.</span>"),
      leadHtml:
        tLocalized("CRS Model Resin, yüksek hassasiyetli master protez ve ortodontik modeller için idealdir. Boyutsal kararlılığı sayesinde baskı sonrası şekil değişmez; kole hatları belirgindir, marjinal uyum kolayca tespit edilir ve dijital iş akışı desteklenir.", "CRS Model Resin is ideal for high-precision master prosthetic and orthodontic models. Thanks to its dimensional stability, its shape does not change after printing; cervical margins are clear, marginal fit is easy to identify, and the digital workflow is supported."),
      pills: [
        { label: tLocalized("Boyutsal kararlılık", "Dimensional stability") },
        { label: tLocalized("Belirgin marjin", "significant margin") },
        { label: tLocalized("Ortodontik model", "orthodontic model") },
        { label: tLocalized("Tüm DLP / LCD", "All DLP / LCD") },
      ],
      gallery: CRS_MODEL_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-model-yuksek-hassasiyetli-model-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Model%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Model%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Baskı sonrası <span class=\"hl\">boyut değiştirmez</span> model reçinesi.", "Model resin that <span class=\"hl\">doesn't change size</span> after printing."),
      sideHtml: tLocalized("CRS Model, protez ve ortodontik iş akışlarında referans model doğruluğunu korumaya odaklanan yüksek hassasiyetli dental model reçinesidir.", "CRS Model is a high-precision dental model resin focused on preserving reference model accuracy in prosthetic and orthodontic workflows."),
      panelTitleHtml: tLocalized("CRS Model Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Model Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Model baskılarında boyutsal kararlılık, implant analog uyumu ve renk seçenekleri öne çıkar.", "Dimensional stability, implant analog compatibility, and color options stand out in model prints."),
      items: [
        { descriptionHtml: tLocalized("Baskı sonrası boyut değiştirmemesi sayesinde <b>uyum sorunu yaşanmadığı</b> belirtilir.", "Because it doesn't change size after printing, <b>no fit issues occur</b>, it's noted."), percent: 99 },
        { descriptionHtml: tLocalized("Yüksek doğruluğu sayesinde implant analoglarıyla <b>mükemmel uyum</b> sağladığı ifade edilir.", "It is stated that, thanks to its high accuracy, it provides <b>excellent fit</b> with implant analogs."), percent: 97 },
        { descriptionHtml: tLocalized("Renk seçenekleri, hasta ve hekimlere <b>kron renklerini göstermeyi</b> kolaylaştırır.", "Color options make it easier to <b>show crown colors</b> to patients and clinicians."), percent: 96 },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Marjin sınırları ve <span class=\"em\">tüberkül detayları</span> belirgin.", "Margin boundaries and <span class=\"em\">cusp details</span> are distinct."),
      sideHtml:
        tLocalized("CRS Model ile üretilen modellerde kole çizgileri belirgindir ve marjinal oturum rahatlıkla tespit edilir. Teknik başlıklarında ISO 10477 ve ASTM D638 referansları listelenir.", "Cervical lines are clear in models produced with CRS Model, and marginal fit is easily identified. Its technical specifications list references to ISO 10477 and ASTM D638."),
      items: [
        { name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"), value: "ISO", unit: "10477", tag: tLocalized("Model", "Model"), caption: tLocalized("Dental model baskıları için teknik başlık olarak listelenir.", "Listed as a technical spec for dental model prints.") },
        { name: tLocalized("Esneklik Modülü", "Flexural Modulus"), value: "ISO", unit: "10477", tag: tLocalized("Stabilite", "stability"), caption: tLocalized("Baskı sonrası şekil değiştirmeyen model yapısını destekleyen teknik başlık.", "A technical heading supporting a model structure that doesn't deform after printing.") },
        { name: tLocalized("Çekme Dayanımı", "Tensile Strength"), value: "ASTM", unit: "D638", tag: tLocalized("Model", "Model"), caption: tLocalized("Hassas model ve kalıp üretiminde kullanılan malzeme dayanımı başlığı.", "Heading on material durability used in precise model and mold production.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS MODEL · BOYUTSAL KARARLILIK · DLP / LCD", "CRS MODEL DIMENSIONAL STABILITY DLP / LCD"),
      titleHtml: tLocalized("Tedavinin referans noktası <span class=\"em\">doğru modeldir.</span>", "The treatment's reference point <span class=\"em\">is the correct model.</span>"),
      descriptionHtml:
        tLocalized("Bir tedavideki en önemli şey modelin doğruluğudur; diğer tüm işlemlerin referans noktası model olur. CRS Model'in yüksek boyutsal kararlılığı sayesinde protezin başlangıç noktasından emin olabilirsiniz.", "The most important thing in a treatment is the accuracy of the model; it becomes the reference point for all other procedures. Thanks to CRS Model's high dimensional stability, you can be confident in the starting point of the prosthesis."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: "Master protez modeli" },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Ortodontik model", "orthodontic model") },
        { label: tLocalized("Detay", "Detail"), value: tLocalized("Belirgin kole hatları", "Distinct cervical lines") },
        { label: tLocalized("İş akışı", "Workflow"), value: tLocalized("Dijital tarama gösterimleri", "Digital scan demonstrations") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm DLP / LCD 3D yazıcılar", "All DLP / LCD 3D printers") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: hassas modeller, ortodontik modeller, mock-up / wax-up ve uyumlu 3D yazıcılar.", "Everything at a glance: precise models, orthodontic models, mock-up / wax-up, and compatible 3D printers."),
      photos: [
        { src: CRS_MODEL_GALLERY[1].src, alt: tLocalized("CRS Model hassas dental model", "CRS Model precision dental model"), title: tLocalized("Hassas modeller", "Precision models"), text: tLocalized("Keskin kenar çizgileri ve temas noktaları gerektiren model üretimi.", "Model production requiring sharp edge lines and contact points.") },
        { src: CRS_MODEL_GALLERY[2].src, alt: tLocalized("CRS Model ortodontik model", "CRS Model orthodontic model"), title: tLocalized("Ortodontik modeller", "Orthodontic models"), text: tLocalized("Ortodontik planlama ve tedavi modelleri için yüksek hassasiyet.", "High precision for orthodontic planning and treatment models.") },
        { src: CRS_MODEL_GALLERY[3].src, alt: tLocalized("CRS Model mock-up wax-up", "CRS Model mock-up wax-up"), title: tLocalized("Mock-up / wax-up", "Mock-up / wax-up"), text: tLocalized("Mock-up, wax-up ve güdüklü model uygulamaları.", "Mock-up, wax-up, and die model applications.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi modeller?", "Which models?"),
          items: [
            tLocalized("Keskin kenar çizgilerine ve temas noktalarına sahip <b>hassas modeller</b>", "<b>Precise models</b> with sharp edge lines and contact points"),
            tLocalized("Ortodontik modeller", "Orthodontic models"),
            tLocalized("Mock-up, wax-up ve güdüklü modeller", "Mock-up, wax-up, and die models"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Model?", "Why CRS Model?"),
          items: [
            tLocalized("<b>Boyutsal kararlılık</b> ile baskı sonrası şekil değiştirmez", "Retains its shape after printing thanks to <b>dimensional stability</b>"),
            tLocalized("Belirgin marjin sınırları ve tüberkül detayları", "Distinct margin lines and cusp detail"),
            tLocalized("Kum rengi ve gri renk seçenekleri", "Sand and gray color options"),
            tLocalized("Dijital iş akışına uygulanabilen 3D basılı modeller", "3D printed models applicable to the digital workflow"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("Tüm DLP & LCD yazıcılarla çalışır", "Works with all DLP & LCD printers"),
        textHtml:
          tLocalized("CRS Model Reçinesi tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Model Resin is compatible with all DLP or LCD 3D printer brands. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Model doğruluğu <span class=\"em\">tüm iş akışını taşır.</span>", "Model accuracy <span class=\"em\">carries the entire workflow.</span>"),
      textHtml:
        tLocalized("Hassas model üretiminde model reçinesi, yazıcı parametresi ve post-process akışı birlikte çalışır. CRS Model'i kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "In precise model production, model resin, printer parameters, and the post-process workflow work together. We calibrate CRS Model according to your printer and deliver it accordingly."),
      chips: [tLocalized("Boyutsal kararlılık", "Dimensional stability"), tLocalized("Belirgin marjin", "significant margin"), tLocalized("Ortodontik model", "orthodontic model"), "Mock-up", "DLP / LCD"],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Model hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Model."),
      sideHtml: tLocalized("Hassas model üretimi, implant analog uyumu, model detayları ve yazıcı uyumu için net cevaplar.", "Clear answers on precise model production, implant analog fit, model details, and printer compatibility."),
      openFirst: true,
      items: [
        { question: tLocalized("CRS Model Reçinesi ne için kullanılır?", "What is CRS Model Resin used for?"), answerHtml: tLocalized("Yüksek hassasiyetin gerekli olduğu master protez modelleri, ortodontik modeller, mock-up / wax-up uygulamaları ve güdüklü modeller için kullanılır.", "Used for master denture models, orthodontic models, mock-up / wax-up applications, and stump models that require high precision.") },
        { question: tLocalized("Baskı sonrası boyut değiştirir mi?", "Does it change size after printing?"), answerHtml: tLocalized("CRS Model, yüksek boyutsal kararlılığı sayesinde baskı sonrası şekil değiştirmeyen model baskıları üretmeye odaklanır.", "Thanks to its high dimensional stability, CRS Model focuses on producing model prints that do not deform after printing.") },
        { question: tLocalized("İmplant analoglarıyla uyumlu mu?", "Is it compatible with implant analogs?"), answerHtml: tLocalized("Yüksek doğruluğu sayesinde implant analoglarıyla uyumlu sonuçlar sağladığı belirtilir.", "It is stated that, thanks to its high accuracy, it provides compatible results with implant analogs.") },
        { question: tLocalized("Hangi yazıcılarla uyumludur?", "Which printers is it compatible with?"), answerHtml: tLocalized("Tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur.", "Compatible with all DLP or LCD 3D printer brands.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Model üretim akışını <span class=\"em\">videoda görün.</span>", "See the model production workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Model Reçinesi ile yüksek hassasiyetli dental model üretim akışını videoda izleyin.", "Watch the high-precision dental model production workflow with CRS Model Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_MODEL_GALLERY[1].src,
      imageAlt: tLocalized("CRS Model Reçinesi uygulama videosu", "CRS Model Resin application video"),
      title: tLocalized("CRS Model Reçinesi ile hassas model üretimi", "Precise model production with CRS Model Resin"),
      text: tLocalized("Boyutsal kararlılık, belirgin marjin ve ortodontik model üretimine odaklanan video.", "A video focused on dimensional stability, distinct margins, and orthodontic model production."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("DİŞ ETİ", "GINGIVA"), title: tLocalized("CRS Gingiva", "CRS Gingiva"), descriptionHtml: tLocalized("İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", "An elastic, tear-resistant gingiva resin for implant models."), href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: "TRAY", title: tLocalized("CRS Tray Resin", "CRS Tray Resin"), descriptionHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", "DLP / LCD compatible resin for custom impression tray production."), href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: "PROTEZ", title: tLocalized("CRS Denture", "CRS Denture"), descriptionHtml: tLocalized("Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", "Biocompatible denture resin for removable denture bases."), href: "/crs-denture-biouyumlu-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Model Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Model Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi model uygulaması, hangi post-process akışı? Kısa bir görüşmeyle CRS Model Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which model application, which post-process workflow? With a short conversation, let's match CRS Model Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_TRAY_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_TRAY_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Tray Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Tray Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Tray Resin", "CRS Tray Resin"),
    },
    hero: {
      kicker: tLocalized("CRS Tray Resin · Kişiye Özel Ölçü Kaşığı Reçinesi", "CRS Tray Resin · Custom Impression Tray Resin"),
      titleHtml: tLocalized("Ölçü kaşığı artık <span class=\"em\">tekrarlanabilir</span> basılıyor.", "Impression trays are now printed <span class=\"em\">repeatably.</span>"),
      leadHtml:
        tLocalized("CRS Tray Resin; kişiye özel ölçü kaşıklarının üretimi için geliştirilmiş, DLP ve LCD yazıcılarla uyumlu bir 3D yazıcı reçinesidir. 385–405 nm dalga boyunda çalışan sistemlerle optimize edilmiştir ve ölçü süreçlerinde güvenilir, tekrarlanabilir sonuçlar sağlar.", "CRS Tray Resin is a 3D printer resin developed for producing custom impression trays, compatible with DLP and LCD printers. It is optimized for systems operating at 385–405 nm wavelength and provides reliable, repeatable results in impression procedures."),
      pills: [
        { label: tLocalized("Ölçü kaşığı", "impression tray") },
        { value: "385–405 nm", label: tLocalized("LCD / DLP uyumu", "LCD / DLP uyumu") },
        { label: tLocalized("Dijital iş akışı", "Digital workflow") },
        { label: tLocalized("Tekrarlanabilir sonuç", "Repeatable result") },
      ],
      gallery: CRS_TRAY_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Tray%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Tray%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Ölçü süreçlerinde <span class=\"hl\">stabil ve tekrarlanabilir</span> sonuç.", "<span class=\"hl\">Stable and repeatable</span> results for impression processes."),
      sideHtml: tLocalized("CRS Tray Resin, dijital tasarım sürecine uyumlu kişiye özel ölçü kaşıkları üretmek için geliştirilmiş dental reçinedir.", "CRS Tray Resin is a dental resin developed to produce custom impression trays compatible with the digital design process."),
      panelTitleHtml: tLocalized("CRS Tray Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Tray Resin — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Ölçü kaşığı üretiminde form stabilitesi, tekrarlanabilirlik ve dijital iş akışı uyumu öne çıkar.", "Shape stability, repeatability, and digital workflow compatibility stand out in impression tray production."),
      items: [
        { descriptionHtml: tLocalized("Ölçü kaşıklarının baskı sonrası <b>formunu koruduğu</b> ve stabil sonuçlar sunduğu belirtilir.", "It is stated that impression trays <b>keep their shape</b> after printing and deliver stable results.") },
        { descriptionHtml: tLocalized("Tekrarlanabilir üretim sayesinde dijital iş akışına <b>kolayca entegre edilir</b>.", "Thanks to repeatable production, it is <b>easily integrated</b> into the digital workflow.") },
        { descriptionHtml: tLocalized("Farklı dental ölçü uygulamalarında <b>güvenle tercih edilen</b> bir yapı sunar.", "Offers a structure that is <b>confidently preferred</b> in different dental impression applications.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Kişiye özel ölçü kaşığı için <span class=\"em\">385–405 nm</span> uyum.", "<span class=\"em\">385–405 nm</span> compatibility for custom impression trays."),
      sideHtml:
        tLocalized("CRS Tray Resin, baskı sonrası uygulanan işlemlerle gerekli mekanik özellikleri kazanır ve ölçü kaşığı üretiminde güvenilir kullanım sunar.", "CRS Tray Resin gains the required mechanical properties through post-print processing and offers reliable use in impression tray production."),
      items: [
        { name: tLocalized("Dalga Boyu", "Wavelength"), value: "385", unit: "–405 nm", tag: tLocalized("LCD / DLP", "LCD/DLP"), caption: tLocalized("385–405 nm dalga boyunda çalışan DLP ve LCD sistemlerle uyumlu üretim.", "Production compatible with DLP and LCD systems operating at 385–405 nm wavelengths.") },
        { name: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Ölçü", "Measurement"), unit: tLocalized("Kaşığı", "Tray"), tag: tLocalized("Custom tray", "custom tray"), caption: tLocalized("Kişiye özel ölçü kaşıklarının dijital tasarımdan üretimine odaklanır.", "Focuses on producing custom impression trays from digital design to final part.") },
        { name: tLocalized("İş Akışı", "Workflow"), value: "Dijital", unit: "", tag: tLocalized("Tekrarlanabilir", "repeatable"), caption: tLocalized("Her baskıda aynı formun korunmasına katkı sağlayan dijital ölçü süreci.", "A digital impression process that helps preserve the same shape in every print.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS TRAY · ÖLÇÜ KAŞIĞI · 385–405 NM", "CRS TRAY · IMPRESSION TRAY · 385–405 NM"),
      titleHtml: tLocalized("Ölçü süreçlerinde <span class=\"em\">kontrollü ve öngörülebilir</span> üretim.", "<span class=\"em\">Controlled and predictable</span> production for impression processes."),
      descriptionHtml:
        tLocalized("CRS Tray Reçinesi ile üretilen ölçü kaşıkları dijital tasarım sürecine uyumlu şekilde hazırlanır ve her baskıda aynı formun korunmasına katkı sağlar.", "Impression trays produced with CRS Tray Resin are prepared in line with the digital design process and help preserve the same form in every print."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Kişiye özel ölçü kaşığı", "Custom impression tray") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("İmplant ölçü", "Implant impression") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Kron ve köprü ölçü", "Crown and bridge impression") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Ortodontik ölçü hazırlığı", "Orthodontic impression preparation") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm DLP / LCD" },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: kişiye özel ölçü kaşığı, implant ölçü, kron-köprü ölçüleri ve uyumlu 3D yazıcılar.", "Everything at a glance: custom impression trays, implant impressions, crown-bridge impressions, and compatible 3D printers."),
      photos: [
        { src: CRS_TRAY_GALLERY[1].src, alt: tLocalized("CRS Tray ölçü kaşığı uygulaması", "CRS Tray impression tray application"), title: tLocalized("Ölçü kaşığı", "impression tray"), text: tLocalized("Kişiye özel ölçü kaşığı üretimi için stabil yapı.", "Stable structure for custom impression tray production.") },
        { src: CRS_TRAY_GALLERY[2].src, alt: tLocalized("CRS Tray implant ölçü uygulaması", "CRS Tray implant impression application"), title: tLocalized("İmplant ölçü", "Implant impression"), text: tLocalized("İmplant ölçü uygulamaları için dijital üretim akışı.", "A digital production workflow for implant impression applications.") },
        { src: CRS_TRAY_GALLERY[3].src, alt: tLocalized("CRS Tray kron köprü ölçü uygulaması", "CRS Tray crown-and-bridge impression application"), title: tLocalized("Kron-köprü ölçü", "Crown-bridge impression"), text: tLocalized("Kron ve köprü ölçü süreçlerinde tekrarlanabilir sonuçlar.", "Repeatable results in crown and bridge impression processes.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi ölçüler?", "Which dimensions?"),
          items: [
            tLocalized("<b>Kişiye özel ölçü kaşığı</b> üretimi", "<b>Custom impression tray</b> production"),
            tLocalized("İmplant ölçü uygulamaları", "Implant impression applications"),
            tLocalized("Kron-köprü ölçü süreçleri ve ortodontik ölçü hazırlıkları", "Crown-bridge impression processes and orthodontic impression preparation"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Tray Resin?", "Why CRS Tray Resin?"),
          items: [
            "<b>385–405 nm</b> LCD / DLP uyumu",
            tLocalized("Baskı sonrası form stabilitesi", "Form stability after printing"),
            tLocalized("Dijital iş akışına uyum", "Compatibility with the digital workflow"),
            tLocalized("Güvenilir ve tekrarlanabilir ölçü süreci", "Reliable and repeatable impression process"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml:
          tLocalized("CRS Tray Resin, 385–405 nm dalga boyunda çalışan DLP ve LCD yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "CRS Tray Resin is compatible with DLP and LCD printers operating at 385–405 nm wavelength. We provide parameter calibration <b>free of charge</b> based on the printer you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Ölçü kaşığı sonucu <span class=\"em\">dijital akışla tamamlanır.</span>", "The impression tray result is <span class=\"em\">completed with a digital workflow.</span>"),
      textHtml:
        tLocalized("Kişiye özel ölçü kaşığı üretiminde form stabilitesi, doğru yazıcı parametresi ve baskı sonrası işlem akışıyla korunur. Reçineyi kullandığınız yazıcıya göre kalibre ederek teslim ediyoruz.", "In custom impression tray production, form stability is preserved through the correct printer parameters and post-printing workflow. We calibrate the resin according to your printer and deliver it accordingly."),
      chips: ["385–405 nm uyum", tLocalized("Ölçü kaşığı", "impression tray"), tLocalized("İmplant ölçü", "Implant impression"), tLocalized("Kron-köprü ölçü", "Crown-bridge impression"), tLocalized("Dijital iş akışı", "Digital workflow")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Tray Resin hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Tray Resin."),
      sideHtml: tLocalized("Ölçü kaşığı üretimi, yazıcı uyumu, baskı sonrası işlem ve kullanım alanları için net cevaplar.", "Clear answers on impression tray production, printer compatibility, post-processing, and areas of use."),
      openFirst: true,
      items: [
        { question: tLocalized("CRS Tray Resin nedir?", "What is CRS Tray Resin?"), answerHtml: tLocalized("CRS Tray Resin; kişiye özel ölçü kaşıklarının üretimi için geliştirilmiş, DLP ve LCD yazıcılarla uyumlu dental 3D yazıcı reçinesidir.", "CRS Tray Resin is a dental 3D printer resin developed for producing custom impression trays, compatible with DLP and LCD printers.") },
        { question: tLocalized("CRS Tray Resin ne için kullanılır?", "What is CRS Tray Resin used for?"), answerHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi, implant ölçü uygulamaları, kron-köprü ölçü süreçleri ve ortodontik ölçü hazırlıkları için kullanılır.", "Used for custom impression tray production, implant impression applications, crown-bridge impression processes, and orthodontic impression preparation.") },
        { question: tLocalized("Hangi yazıcılarla uyumludur?", "Which printers is it compatible with?"), answerHtml: tLocalized("<b>385–405 nm</b> dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.", "Compatible with DLP and LCD 3D printers operating at <b>385–405 nm</b> wavelengths.") },
        { question: tLocalized("Baskı sonrası işlem gerekli mi?", "Is post-processing required after printing?"), answerHtml: tLocalized("Evet. Baskı sonrası uygulanan işlemlerle gerekli mekanik özellikleri kazanır ve ölçü kaşığı üretiminde güvenilir kullanım sunar.", "Yes. It gains the necessary mechanical properties through post-print processing and offers reliable use in impression tray production.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Ölçü kaşığı akışını <span class=\"em\">videoda görün.</span>", "See the impression tray workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("CRS Tray Resin ile kişiye özel ölçü kaşığı üretim akışını videoda izleyin.", "Watch the custom impression tray production workflow with CRS Tray Resin in the video."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: CRS_TRAY_GALLERY[1].src,
      imageAlt: tLocalized("CRS Tray Resin uygulama videosu", "CRS Tray Resin application video"),
      title: tLocalized("CRS Tray Resin ile kişiye özel ölçü kaşığı üretimi", "Custom impression tray production with CRS Tray Resin"),
      text: tLocalized("Dijital ölçü süreçleri için stabil ve tekrarlanabilir ölçü kaşığı üretimine odaklanan video.", "A video focused on producing stable and repeatable impression trays for digital impression processes."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "PROTEZ", title: tLocalized("CRS Denture", "CRS Denture"), descriptionHtml: tLocalized("Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", "Biocompatible denture resin for removable denture bases."), href: "/crs-denture-biouyumlu-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: tLocalized("REHBER", "GUIDE"), title: tLocalized("Guide Resin", "Guide Resin"), descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."), href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"), linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Tray Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Tray Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi ölçü uygulaması, hangi post-process akışı? Kısa bir görüşmeyle CRS Tray Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which impression application, which post-process workflow? With a short conversation, let's match CRS Tray Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function MASH_CLEAR_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: MASH_CLEAR_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("Mash Clear Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver Mash Clear Resin calibrated to your device's parameters, along with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: "Mash Clear Resin",
    },
    hero: {
      kicker: tLocalized("Mash Clear Resin · Şeffaf Dental Cerrahi Kılavuz Reçinesi", "Mash Clear Resin · Clear Dental Surgical Guide Resin"),
      titleHtml: tLocalized("Cerrahi görüş artık <span class=\"em\">şeffaf kılavuzla</span> güçleniyor.", "Surgical visibility is now strengthened with a <span class=\"em\">transparent guide.</span>"),
      leadHtml:
        tLocalized("Mash Clear Resin, dental implant cerrahisi ve splint üretimi için geliştirilmiş, yüksek şeffaflık ve biyouyumluluk sunan profesyonel bir 3D yazıcı reçinesidir. CE Class I sertifikalı, intraoral kullanıma uygun ve otoklavlanabilir yapısıyla cerrahi kılavuz uygulamalarında güvenilir sonuçlar sunar.", "Mash Clear Resin is a professional 3D printer resin developed for dental implant surgery and splint production, offering high transparency and biocompatibility. With its CE Class I certification, suitability for intraoral use, and autoclavable structure, it delivers reliable results in surgical guide applications."),
      pills: [
        { label: tLocalized("Şeffaf yapı", "Clear structure") },
        { label: tLocalized("Cerrahi kılavuz", "Surgical guide") },
        { label: tLocalized("Otoklavlanabilir", "autoclavable") },
        { label: tLocalized("CE Class I", "CE Class I") },
      ],
      gallery: MASH_CLEAR_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/mash-clear-resin-dental-cerrahi-kilavuz-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=Mash%20Clear%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=Mash%20Clear%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Şeffaf yapısıyla <span class=\"hl\">cerrahi kontrolü</span> artırır.", "Its <span class=\"hl\">clear structure</span> improves surgical control."),
      sideHtml: tLocalized("Mash Clear Resin, cerrahi kılavuz ve splint uygulamalarında şeffaf yapısı sayesinde operasyon sırasında maksimum görüş avantajı sunar.", "Thanks to its clear structure, Mash Clear Resin offers maximum visibility during the operation in surgical guide and splint applications."),
      panelTitleHtml: tLocalized("Mash Clear Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "What do buyers of Mash Clear Resin <span class=\"em\">say about it?</span>"),
      note: tLocalized("Cerrahi kılavuzlarda şeffaf görüş, form stabilitesi ve sterilizasyon sonrası dayanım öne çıkar.", "Transparent visibility, form stability, and post-sterilization strength stand out in surgical guides."),
      items: [
        { descriptionHtml: tLocalized("Şeffaf yapı, operasyon sırasında çalışma alanının <b>net görülmesini</b> sağlar.", "The clear structure allows the working area to be <b>seen clearly</b> during the procedure.") },
        { descriptionHtml: tLocalized("Baskı sonrası form stabilitesi, cerrahi kılavuzların <b>ağız içi uyumunu</b> destekler.", "Form stability after printing supports the <b>intraoral fit</b> of surgical guides.") },
        { descriptionHtml: tLocalized("Mekanik dayanımı ve sterilizasyon süreçlerinden sonra <b>formunu koruması</b> öne çıkar.", "Its mechanical strength and ability to <b>maintain its form</b> after sterilization processes stand out.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Şeffaf, biyouyumlu ve <span class=\"em\">otoklavlanabilir</span> yapı.", "A clear, biocompatible, and <span class=\"em\">autoclavable</span> structure."),
      sideHtml:
        tLocalized("Mash Clear Resin, yüksek mekanik dayanımı, stabil form yapısı ve otoklavlanabilir özelliğiyle klinik ve laboratuvar süreçlerinde pratik kullanım sunar.", "With its high mechanical strength, stable form, and autoclavable feature, Mash Clear Resin offers practical use in clinical and laboratory processes."),
      items: [
        { name: tLocalized("Sertifikasyon", "Certification"), value: "CE", unit: "Class I", tag: tLocalized("Dental", "dental"), caption: tLocalized("İntraoral kullanıma uygun cerrahi kılavuz ve splint reçinesi olarak listelenir.", "Listed as suitable for intraoral use as a surgical guide and splint resin.") },
        { name: tLocalized("Kopma Uzaması", "Elongation at Break"), value: "ASTM", unit: "D62", tag: tLocalized("Clear", "Clear"), caption: tLocalized("Teknik başlıklarda listelenen mekanik davranış referansı.", "The mechanical behavior reference listed in the technical specifications.") },
        { name: tLocalized("Elastisite Modülü", "Modulus of Elasticity"), value: "ASTM", unit: "D638", tag: tLocalized("Stabil form", "stable form"), caption: tLocalized("Cerrahi kılavuzlarda form stabilitesini destekleyen teknik başlık.", "A technical spec that supports form stability in surgical guides.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("MASH CLEAR · ŞEFFAF · CE CLASS I", "MASH CLEAR · CLEAR · CE CLASS I"),
      titleHtml: tLocalized("Cerrahi uygulamada <span class=\"em\">net görüş ve güvenilir sonuç.</span>", "<span class=\"em\">Clear visibility and a reliable result</span> in surgical procedures."),
      descriptionHtml:
        tLocalized("Şeffaf yapısı sayesinde operasyon sırasında anatomik yapıların daha net değerlendirilmesine olanak tanır. Yüksek ölçü doğruluğu ve stabil baskı performansı klinik süreçlerde güvenilir ve öngörülebilir sonuçları destekler.", "Thanks to its clear structure, it allows anatomical structures to be assessed more clearly during the procedure. High dimensional accuracy and stable print performance support reliable, predictable results in clinical processes."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Dental implant cerrahisi", "Dental implant surgery") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Cerrahi kılavuz üretimi", "Surgical guide production") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Splint ve geçici intraoral aparatlar", "Splints and temporary intraoral appliances") },
        { label: tLocalized("Sertifikasyon", "Certification"), value: tLocalized("CE Class I", "CE Class I") },
        { label: tLocalized("Sterilizasyon", "Sterilization"), value: tLocalized("Otoklavlanabilir yapı", "Autoclavable structure") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: dental implant cerrahisi, cerrahi kılavuz, splint ve şeffaf dental uygulamalar.", "Everything at a glance: dental implant surgery, surgical guides, splints, and clear dental applications."),
      photos: [
        { src: MASH_CLEAR_GALLERY[1].src, alt: tLocalized("Mash Clear cerrahi kılavuz uygulaması", "Mash Clear surgical guide application"), title: tLocalized("Cerrahi kılavuz", "Surgical guide"), text: tLocalized("Dental implant cerrahisi için şeffaf kılavuz üretimi.", "Transparent guide production for dental implant surgery.") },
        { src: MASH_CLEAR_GALLERY[2].src, alt: tLocalized("Mash Clear splint uygulaması", "Mash Clear splint application"), title: tLocalized("Splint", "splint"), text: tLocalized("Splint ve geçici intraoral aparatlar için şeffaf yapı.", "A clear structure for splints and temporary intraoral appliances.") },
        { src: MASH_CLEAR_GALLERY[3].src, alt: tLocalized("Mash Clear klinik planlama", "Mash Clear clinical planning"), title: tLocalized("Klinik planlama", "clinical planning"), text: tLocalized("Dijital tedavi simülasyonları ve hassas şeffaf dental uygulamalar.", "Digital treatment simulations and precise clear dental applications.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi kılavuzlar?", "Which guides?"),
          items: [
            tLocalized("<b>Dental implant cerrahisi</b> için cerrahi kılavuz üretimi", "Surgical guide production for <b>dental implant surgery</b>"),
            tLocalized("Splint ve geçici intraoral aparatlar", "Splints and temporary intraoral appliances"),
            tLocalized("Klinik planlama ve dijital tedavi simülasyonları", "Clinical planning and digital treatment simulations"),
          ],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden Mash Clear?", "Why Mash Clear?"),
          items: [
            tLocalized("<b>Yüksek şeffaflık</b> ile maksimum görüş avantajı", "Maximum visibility advantage with <b>high transparency</b>"),
            tLocalized("Biyouyumlu ve intraoral kullanıma uygun yapı", "A biocompatible structure suitable for intraoral use"),
            "Otoklavlanabilir form",
            tLocalized("Stabil baskı ve yüksek ölçü doğruluğu", "Stable printing and high dimensional accuracy"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("DLP & LCD yazıcılarla çalışır", "Works with DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz. Satış sonrası kullanıcı eğitimleri ve teknik destek ile üretim akışını birlikte kuruyoruz.", "As the official distributor of Custom Resin Solutions, we perform parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We build the production workflow together with post-sale user training and technical support."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Şeffaf kılavuz sonucu <span class=\"em\">sterilizasyonla tamamlanır.</span>", "The clear guide result <span class=\"em\">is completed with sterilization.</span>"),
      textHtml:
        tLocalized("Cerrahi kılavuz üretiminde şeffaflık, form stabilitesi ve güvenli intraoral kullanım; doğru baskı, temizlik, post-curing ve sterilizasyon akışıyla birlikte çalışır.", "In surgical guide production, transparency, form stability, and safe intraoral use work together with the correct print, cleaning, post-curing, and sterilization workflow."),
      chips: [tLocalized("CE Class I", "CE Class I"), tLocalized("Şeffaf kılavuz", "Clear guide"), tLocalized("Splint", "splint"), "Otoklav", tLocalized("İntraoral kullanım", "Intraoral use")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("Mash Clear Resin hakkında <span class=\"em\">merak edilenler.</span>", "Frequently asked questions <span class=\"em\">about Mash Clear Resin.</span>"),
      sideHtml: tLocalized("İntraoral kullanım, cerrahi kılavuz üretimi, şeffaflık, sterilizasyon ve yüzey kalitesi için net cevaplar.", "Clear answers on intraoral use, surgical guide production, transparency, sterilization, and surface quality."),
      openFirst: true,
      items: [
        { question: tLocalized("Bu reçine intraoral kullanıma uygun mu?", "Is this resin suitable for intraoral use?"), answerHtml: tLocalized("Evet. CE Class I sertifikalı, biyouyumlu ve intraoral kullanıma uygun bir dental 3D yazıcı reçinesi olarak geliştirilmiştir.", "Yes. It has been developed as a CE Class I certified, biocompatible dental 3D printer resin suitable for intraoral use.") },
        { question: tLocalized("Cerrahi kılavuz üretimi için uygun mu?", "Is it suitable for surgical guide production?"), answerHtml: tLocalized("Evet. Dental implant cerrahisi için cerrahi kılavuz üretimi ve hassas uyum gerektiren şeffaf dental uygulamalar için uygundur.", "Yes. It is suitable for surgical guide production for dental implant surgery and for clear dental applications that require a precise fit.") },
        { question: tLocalized("Sterilizasyon yapılabilir mi?", "Can it be sterilized?"), answerHtml: tLocalized("Evet. Otoklavlanabilir yapısı sayesinde klinik ve laboratuvar süreçlerinde güvenli kullanım sunar.", "Yes. Thanks to its autoclavable structure, it offers safe use in clinical and laboratory processes.") },
        { question: tLocalized("Uzun süre formunu korur mu?", "Does it retain its shape over a long time?"), answerHtml: tLocalized("Stabil form yapısı ve mekanik dayanımı, baskı sonrası cerrahi kılavuzların formunu korumasını destekler.", "Its stable form structure and mechanical strength support surgical guides in maintaining their form after printing.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Cerrahi kılavuz akışını <span class=\"em\">videoda görün.</span>", "<span class=\"em\">Watch the video</span> for the surgical guide workflow."),
      sideHtml: tLocalized("Mash Clear Resin ile şeffaf cerrahi kılavuz ve splint üretim akışını videoda izleyin.", "Watch the video for the clear surgical guide and splint production workflow with Mash Clear Resin."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: MASH_CLEAR_GALLERY[1].src,
      imageAlt: tLocalized("Mash Clear Resin uygulama videosu", "Mash Clear Resin application video"),
      title: tLocalized("Mash Clear Resin ile şeffaf cerrahi kılavuz üretimi", "Clear surgical guide production with Mash Clear Resin"),
      text: tLocalized("Dental implant cerrahisi, splint ve şeffaf intraoral aparatlar için ürün odaklı video.", "Product-focused video for dental implant surgery, splints, and transparent intraoral appliances."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("REHBER", "GUIDE"), title: tLocalized("Guide Resin", "Guide Resin"), descriptionHtml: tLocalized("Cerrahi rehber için biyouyumlu ve hassas kılavuz reçinesi.", "A biocompatible and precise guide resin for the surgical guide."), href: tLocalized("/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber", "/guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber"), linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("SERT SPLINT", "HARD SPLINT"), title: tLocalized("CRS Splint Hard", "CRS Splint Hard"), descriptionHtml: tLocalized("Sert gece plağı ve bruksizm apareyleri için stabil splint reçinesi.", "A stable splint resin for hard night guards and bruxism appliances."), href: "/crs-splint-hard-resin-sert-gece-plagi-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "TRAY", title: tLocalized("CRS Tray Resin", "CRS Tray Resin"), descriptionHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", "DLP / LCD compatible resin for custom impression tray production."), href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("Mash Clear Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's <span class=\"em\">calibrate Mash Clear Resin to your device together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi cerrahi kılavuz vakası, hangi sterilizasyon akışı? Kısa bir görüşmeyle Mash Clear Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which surgical guide case, which sterilization workflow? With a short conversation, let's match Mash Clear Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function CRS_CAST_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: CRS_CAST_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CRS Cast Reçinesi'ni cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver CRS Cast Resin calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Cast", "CRS Cast"),
    },
    hero: {
      kicker: tLocalized("CRS Cast · Çekmeyen Döküm Reçinesi", "CRS Cast · Non-Shrinking Casting Resin"),
      titleHtml: tLocalized("Döküm işi artık <span class=\"em\">çekme ve kalıntı</span> sorununa takılmıyor.", "Casting work is no longer held back by <span class=\"em\">shrinkage and residue</span> issues."),
      leadHtml:
        tLocalized("CRS Cast, çekmeyen ve kalıntı bırakmayan döküm reçinesi olarak dental reçine hattında yer alır. Geniş bir uygulama yelpazesinde tüm revetman markalarıyla birlikte kullanılabilen döküm akışı için konumlandırılır.", "CRS Cast is part of the dental resin line as a non-shrinking, residue-free casting resin. It is positioned for a casting workflow that can be used with all investment material brands across a wide range of applications."),
      pills: [{ label: tLocalized("Çekmeyen döküm", "Non-shrinking casting") }, { label: tLocalized("Kalıntı bırakmaz", "Leaves no residue") }, { label: tLocalized("Tüm revetman markaları", "All investment material brands") }, { label: tLocalized("Dental döküm", "Dental casting") }],
      gallery: CRS_CAST_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-cast-cekmeyen-dokum-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Cast%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Cast%20Reçinesi%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Döküm akışında <span class=\"hl\">çekme ve kalıntı</span> riskini azaltır.", "Reduces the risk of <span class=\"hl\">shrinkage and residue</span> in the casting workflow."),
      sideHtml: tLocalized("CRS Cast, dental döküm uygulamalarında çekmeyen ve kalıntı bırakmayan reçine karakteriyle öne çıkar.", "CRS Cast stands out in dental casting applications with its non-shrinking, residue-free resin character."),
      panelTitleHtml: tLocalized("CRS Cast Reçinesi <span class=\"em\">nerede öne çıkar?</span>", "Where does CRS Cast Resin <span class=\"em\">stand out?</span>"),
      note: tLocalized("Döküm reçinesi seçiminde çekme davranışı, kalıntı bırakmama ve revetman uyumu öne çıkar.", "Shrinkage behavior, residue-free burnout, and investment compatibility stand out when choosing a casting resin."),
      items: [
        { descriptionHtml: tLocalized("Çekmeyen döküm reçinesi karakteri, hassas dental döküm iş akışlarında <b>ölçü kontrolünü</b> destekler.", "The non-shrinking casting resin character supports <b>dimensional control</b> in precise dental casting workflows.") },
        { descriptionHtml: tLocalized("Kalıntı bırakmayan yapı, döküm sonrası temizlik ve yüzey kalitesi açısından <b>pratik avantaj</b> sağlar.", "The residue-free structure provides a <b>practical advantage</b> in terms of post-casting cleaning and surface quality.") },
        { descriptionHtml: tLocalized("Tüm revetman markalarıyla çalışabilmesi, laboratuvarın mevcut döküm sistemine <b>uyum sağlamasını</b> kolaylaştırır.", "Being able to work with all investment material brands makes it easier for the laboratory to <b>adapt</b> to its existing casting system.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Dental döküm için <span class=\"em\">çekmeyen ve kalıntısız</span> reçine.", "A <span class=\"em\">non-shrinking, residue-free</span> resin for dental casting."),
      sideHtml: tLocalized("CRS Cast; çekmeyen, kalıntı bırakmayan ve tüm revetman markalarıyla çalışabilen döküm reçinesi özellikleriyle konumlandırılır.", "CRS Cast is positioned with the features of a casting resin that is non-shrinking, residue-free, and compatible with all investment material brands."),
      items: [
        { name: tLocalized("Döküm Karakteri", "Casting Character"), value: tLocalized("Çekmeyen", "Non-shrinking"), unit: "", tag: tLocalized("Cast", "casting"), caption: tLocalized("Dental döküm uygulamalarında çekme davranışını azaltmaya odaklanan reçine.", "A resin focused on reducing shrinkage behavior in dental casting applications.") },
        { name: tLocalized("Yanma Sonrası", "Post-Burnout"), value: tLocalized("Kalıntısız", "Residue-free"), unit: "", tag: tLocalized("Residue-free", "residue-free"), caption: tLocalized("Kalıntı bırakmayan yapı, döküm sonrası temizlik ve uyumu destekler.", "The residue-free structure supports post-casting cleaning and fit.") },
        { name: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm", "All"), unit: "Revetman", tag: tLocalized("Investment", "investment"), caption: tLocalized("Geniş uygulama yelpazesinde revetman markalarıyla kullanılabilir.", "Can be used with investment brands across a wide range of applications.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS CAST · ÇEKMEYEN DÖKÜM · REVETMAN UYUMU", "CRS CAST · NON-SHRINKING CASTING · INVESTMENT COMPATIBILITY"),
      titleHtml: tLocalized("Döküm sürecinde <span class=\"em\">kalıntısız ve uyumlu</span> akış.", "A <span class=\"em\">residue-free and compatible</span> workflow in the casting process."),
      descriptionHtml:
        tLocalized("Dental laboratuvarlarda döküm reçinesi seçimi; çekme davranışı, yanma sonrası kalıntı ve revetman uyumu üzerinden belirlenir. CRS Cast bu üç başlık için konumlandırılmış döküm reçinesidir.", "In dental labs, casting resin selection is determined by shrinkage behavior, post-burnout residue, and investment compatibility. CRS Cast is a casting resin positioned for these three criteria."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Ürün", "Product"), value: tLocalized("CRS Cast", "CRS Cast") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Dental döküm", "Dental casting") },
        { label: tLocalized("Döküm karakteri", "Casting character"), value: tLocalized("Çekmeyen", "Non-shrinking") },
        { label: tLocalized("Yanma sonrası", "Post-burnout"), value: tLocalized("Kalıntı bırakmaz", "Leaves no residue") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm revetman markaları", "All investment material brands") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: dental döküm, revetman uyumu ve kalıntısız döküm akışı.", "Everything at a glance: dental casting, investment compatibility, and a residue-free casting workflow."),
      photos: [],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi döküm işleri?", "Which casting jobs?"),
          items: [tLocalized("<b>Dental döküm</b> uygulamaları", "<b>Dental casting</b> applications"), tLocalized("Revetmanla çalışan laboratuvar döküm süreçleri", "Laboratory casting processes that work with investment material"), tLocalized("Kalıntısız yanma gerektiren döküm işleri", "Casting jobs requiring residue-free burnout")],
          note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Cast?", "Why CRS Cast?"),
          items: [tLocalized("<b>Çekmeyen</b> döküm reçinesi", "<b>Non-shrinking</b> casting resin"), tLocalized("Kalıntı bırakmayan yapı", "Residue-free structure"), tLocalized("Tüm revetman markalarıyla çalışma", "Works with all investment material brands"), tLocalized("Geniş uygulama yelpazesi", "Wide range of applications")],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("DLP & LCD yazıcılarla çalışır", "Works with DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions resmi distribütörü olarak kullandığınız 3D yazıcı markası fark etmeksizin parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "As the official distributor of Custom Resin Solutions, we perform parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use."),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Asiga Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Döküm sonucu <span class=\"em\">revetman uyumuyla tamamlanır.</span>", "The casting result <span class=\"em\">is completed with investment compatibility.</span>"),
      textHtml:
        tLocalized("CRS Cast, döküm reçinesi iş akışında baskı parametresi, revetman uyumu ve yanma sonrası temiz sonuç beklentisiyle birlikte değerlendirilir.", "CRS Cast is evaluated within the casting resin workflow together with print parameters, investment compatibility, and the expectation of a clean result after burnout."),
      chips: [tLocalized("Çekmeyen", "Non-shrinking"), tLocalized("Kalıntı bırakmaz", "Leaves no residue"), "Revetman uyumu", tLocalized("Dental döküm", "Dental casting")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Cast hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Cast."),
      sideHtml: tLocalized("Döküm reçinesi, revetman uyumu ve kalıntısız yanma akışı için net cevaplar.", "Clear answers on casting resin, investment compatibility, and residue-free burnout."),
      openFirst: true,
      items: [
        { question: tLocalized("CRS Cast ne için kullanılır?", "What is CRS Cast used for?"), answerHtml: tLocalized("CRS Cast, dental döküm uygulamaları için kullanılan çekmeyen döküm reçinesidir.", "CRS Cast is a non-shrinking casting resin used for dental casting applications.") },
        { question: tLocalized("Revetman markalarıyla uyumlu mu?", "Is it compatible with investment material brands?"), answerHtml: tLocalized("Evet. Tüm revetman markalarıyla birlikte kullanılabilen döküm reçinesi olarak konumlandırılır.", "Yes. It is positioned as a casting resin that can be used with all investment brands.") },
        { question: tLocalized("Yanma sonrası kalıntı bırakır mı?", "Does it leave a residue after burnout?"), answerHtml: tLocalized("CRS Cast, kalıntı bırakmayan döküm reçinesi olarak listelenir.", "CRS Cast is listed as a residue-free casting resin.") },
        { question: tLocalized("Hangi iş akışlarında tercih edilir?", "In which workflows is it preferred?"), answerHtml: tLocalized("Çekme davranışı, yanma sonrası kalıntı ve revetman uyumu kritik olan dental döküm iş akışlarında tercih edilir.", "Preferred in dental casting workflows where tensile behavior, burnout residue, and investment compatibility are critical.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Döküm akışını <span class=\"em\">uzmanla değerlendirin.</span>", "Evaluate the casting workflow <span class=\"em\">with an expert.</span>"),
      sideHtml: tLocalized("CRS Cast için cihaz, revetman ve döküm akışınızı birlikte eşleştirelim.", "Let's match your device, investment material, and casting workflow together for CRS Cast."),
      href: tLocalized("/pages/iletisim", "/pages/iletisim"),
      image: CRS_CAST_GALLERY[0].src,
      imageAlt: tLocalized("CRS Cast döküm reçinesi danışmanlık", "CRS Cast casting resin consultation"),
      title: tLocalized("CRS Cast döküm reçinesi uyumlaması", "CRS Cast casting resin calibration"),
      text: tLocalized("Çekmeyen ve kalıntı bırakmayan döküm reçinesi için yazıcı ve revetman uyumunu birlikte kontrol edin.", "Check printer and investment compatibility together for a casting resin that doesn't shrink and leaves no residue."),
      meta: tLocalized("3MASH teknik destek", "3MASH technical support"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "TRAY", title: tLocalized("CRS Tray Resin", "CRS Tray Resin"), descriptionHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", "DLP / LCD compatible resin for custom impression tray production."), href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: "STUDY", title: tLocalized("Mash Study", "Mash Study"), descriptionHtml: tLocalized("Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", "An economical, high-resolution dental model resin."), href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Cast Reçinesi'ni cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Cast Resin to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi revetman, hangi döküm akışı? Kısa bir görüşmeyle CRS Cast Reçinesi'ni cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which investment material, which casting workflow? With a short conversation, let's match CRS Cast Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function MASH_STUDY_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: MASH_STUDY_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("Mash Study Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver Mash Study Resin calibrated to your device's parameters, along with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: { homeText: tLocalized("Ana sayfa", "Home"), homeHref: "/", categoryText: tLocalized("Dental Reçineler", "Dental Resins"), categoryHref: "/dental-3d-yazici-recineleri", productText: tLocalized("Mash Study", "Mash Study") },
    hero: {
      kicker: tLocalized("Mash Study · Ekonomik Dental Model Reçinesi", "Mash Study · Economical Dental Model Resin"),
      titleHtml: tLocalized("Dental model artık <span class=\"em\">uygun maliyetle</span> net çıkıyor.", "The dental model now comes out sharp <span class=\"em\">at an affordable cost.</span>"),
      leadHtml:
        tLocalized("Mash Study Resin, dental model üretimi için geliştirilmiş ekonomik ve yüksek çözünürlüklü bir 3D yazıcı reçinesidir. Keskin kenarlar, pürüzsüz yüzeyler ve tutarlı baskı sonuçları sunar; tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur.", "Mash Study Resin is an economical, high-resolution 3D printer resin developed for dental model production. It offers sharp edges, smooth surfaces, and consistent print results, and is compatible with all DLP or LCD 3D printer brands."),
      pills: [{ label: tLocalized("Ekonomik model", "Economic model") }, { label: tLocalized("Pürüzsüz yüzey", "Smooth surface") }, { label: tLocalized("Stabil baskı", "Stable printing") }, { label: tLocalized("Tüm DLP / LCD", "All DLP / LCD") }],
      gallery: MASH_STUDY_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/mash-study-resin-dental-model-3d-yazici-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=Mash%20Study%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=Mash%20Study%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Uygun fiyatla <span class=\"hl\">yüksek çözünürlüklü</span> model üretir.", "Produces <span class=\"hl\">high-resolution</span> models at an affordable price."),
      sideHtml: tLocalized("Mash Study Resin, dental laboratuvarlar ve eğitim uygulamaları için detay doğruluğu ile yüzey kalitesini dengeli şekilde sunar.", "Mash Study Resin offers a balanced combination of detail accuracy and surface quality for dental laboratories and training applications."),
      panelTitleHtml: tLocalized("Mash Study Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "What do buyers of Mash Study Resin <span class=\"em\">say about it?</span>"),
      note: tLocalized("Model baskılarında ekonomik üretim, marj detayı ve tarama uyumlu yüzey öne çıkar.", "Economical production, margin detail, and scan-compatible surface stand out in model prints."),
      items: [
        { descriptionHtml: tLocalized("Uygun fiyatlı bir model reçinesiyle <b>yüksek çözünürlüklü dijital modeller</b> elde edilebildiği belirtilir.", "It is stated that <b>high-resolution digital models</b> can be achieved with an affordable model resin.") },
        { descriptionHtml: tLocalized("Kenar ve marj detaylarını net aktarması, baskı sonrası değerlendirmeleri <b>daha kolay</b> hale getirir.", "Clearly reproducing edge and margin details makes post-print evaluation <b>easier</b>.") },
        { descriptionHtml: tLocalized("Kolay temizlenebilir ve tarama uyumlu yüzey yapısı, iş süreçlerini <b>hızlandırır</b>.", "An easy-to-clean, scan-compatible surface structure <b>speeds up</b> your workflow.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Net anatomik detay ve <span class=\"em\">yüksek ölçü doğruluğu</span>.", "Clear anatomical detail and <span class=\"em\">high dimensional accuracy</span>."),
      sideHtml: tLocalized("Mash Study Resin ile üretilen dental modellerde diş anatomisi, marjin sınırları ve yüzey detayları net şekilde görülebilir.", "Tooth anatomy, margin lines, and surface details are clearly visible in dental models produced with Mash Study Resin."),
      items: [
        { name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"), value: "ASTM", unit: "D790", tag: tLocalized("Study", "Study"), caption: tLocalized("Dental model reçinesi için listelenen mekanik teknik başlık.", "A mechanical technical spec listed for dental model resin.") },
        { name: tLocalized("Esneklik Modülü", "Flexural Modulus"), value: "ASTM", unit: "D790", tag: tLocalized("Model", "Model"), caption: tLocalized("Stabil model baskısı için teknik başlık olarak yer alır.", "Listed as a technical heading for stable model printing.") },
        { name: tLocalized("Çekme Dayanımı", "Tensile Strength"), value: "ASTM", unit: "D638", tag: tLocalized("Model", "Model"), caption: tLocalized("Laboratuvar model üretiminde malzeme davranışını tanımlayan başlık.", "A heading describing material behavior in laboratory model production.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("MASH STUDY · MODEL · DLP / LCD", "MASH STUDY · MODEL · DLP / LCD"),
      titleHtml: tLocalized("Ekonomik model reçinesinde <span class=\"em\">stabil baskı performansı.</span>", "<span class=\"em\">Stable print performance</span> in the economical model resin."),
      descriptionHtml:
        tLocalized("Gelişmiş reçine formülü sayesinde baskıdan kürleme aşamasına kadar yüksek stabilite sağlar. Dental laboratuvar ve eğitim uygulamalarında net kenar hatları, pürüzsüz yüzey ve yüksek ölçü doğruluğu sunar.", "Thanks to the advanced resin formula, it provides high stability from printing through curing. It offers sharp edge lines, a smooth surface, and high dimensional accuracy in dental laboratory and training applications."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Dental model üretimi", "Dental model production") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Ortodontik modeller", "Orthodontic models") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Eğitim ve demonstrasyon", "Training and demonstration") },
        { label: tLocalized("Yüzey", "Surface"), value: tLocalized("Pürüzsüz + tarama uyumlu", "Smooth + scan-compatible") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm DLP / LCD yazıcılar", "All DLP / LCD printers") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: dental model, ortodontik model, eğitim modeli ve laboratuvar analizleri.", "Everything at a glance: dental models, orthodontic models, training models, and laboratory analyses."),
      photos: [
        { src: MASH_STUDY_GALLERY[1].src, alt: tLocalized("Mash Study dental model", "Mash Study dental model"), title: tLocalized("Dental model", "dental model"), text: tLocalized("Yüksek detay gerektiren dental model üretimi.", "Dental model production requiring high detail.") },
        { src: MASH_STUDY_GALLERY[2].src, alt: tLocalized("Mash Study ortodontik model", "Mash Study orthodontic model"), title: tLocalized("Ortodontik model", "orthodontic model"), text: tLocalized("Ortodontik model üretimi için stabil ve net yüzey.", "A stable and clear surface for orthodontic model production.") },
        { src: MASH_STUDY_GALLERY[3].src, alt: tLocalized("Mash Study eğitim modeli", "Mash Study education model"), title: tLocalized("Eğitim modeli", "Training model"), text: tLocalized("Eğitim, demonstrasyon ve laboratuvar çalışma modelleri.", "Training, demonstration, and laboratory working models.") },
      ],
      cards: [
        { eyebrow: tLocalized("Uygulama Alanları", "Application Areas"), title: tLocalized("Hangi modeller?", "Which models?"), items: [tLocalized("<b>Yüksek detay</b> gerektiren dental model üretimi", "Dental model production requiring <b>high detail</b>"), tLocalized("Ortodontik modeller", "Orthodontic models"), tLocalized("Eğitim, demonstrasyon ve laboratuvar analiz modelleri", "Training, demonstration, and laboratory analysis models")], note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration.") },
        { eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"), title: tLocalized("Neden Mash Study?", "Why Mash Study?"), items: [tLocalized("Ekonomik ve yüksek çözünürlüklü yapı", "Economical and high-resolution structure"), tLocalized("Keskin kenarlar ve pürüzsüz yüzey", "Sharp edges and smooth surface"), tLocalized("<b>Stabil baskı performansı</b>", "<b>Stable print performance</b>"), tLocalized("Light Blue ve Peach renk seçenekleri", "Light Blue and Peach color options")] },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("Tüm DLP & LCD yazıcılarla çalışır", "Works with all DLP & LCD printers"),
        textHtml: tLocalized("Mash Study Resin tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "Mash Study Resin is compatible with all DLP or LCD 3D printer brands. We perform parameter calibration for your printer <b>free of charge</b>."),
        chips: [{ label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") }, { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") }, { label: tLocalized("Asiga Max UV", "Asiga Max UV") }, { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") }, { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") }, { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true }],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Study sonucu <span class=\"em\">tarama uyumuyla tamamlanır.</span>", "The Study result <span class=\"em\">is completed with scan compatibility.</span>"),
      textHtml: tLocalized("Dental model üretiminde net yüzey ve stabil form, doğru baskı parametresi, temizlik ve kürleme akışıyla korunur.", "In dental model production, a clean surface and stable form are maintained through the right printing parameters, cleaning, and curing workflow."),
      chips: [tLocalized("Dental model", "dental model"), "Tarama uyumu", tLocalized("Pürüzsüz yüzey", "Smooth surface"), "DLP / LCD"],
      buttons: [{ text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" }, { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" }],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("Mash Study hakkında <span class=\"em\">merak edilenler.</span>", "Frequently asked questions <span class=\"em\">about Mash Study.</span>"),
      sideHtml: tLocalized("Dental model üretimi, yüzey kalitesi, yazıcı uyumu ve post-process için net cevaplar.", "Clear answers on dental model production, surface quality, printer compatibility, and post-processing."),
      openFirst: true,
      items: [
        { question: tLocalized("Mash Study Resin ile dental modeller üretilebilir mi?", "Can dental models be produced with Mash Study Resin?"), answerHtml: tLocalized("Evet. Yüksek detay gerektiren dental model üretimi, ortodontik modeller ve laboratuvar çalışma modelleri için geliştirilmiştir.", "Yes. It has been developed for dental model production, orthodontic models, and laboratory working models that require high detail.") },
        { question: tLocalized("Modeller uzun süre formunu korur mu?", "Do the models retain their form over time?"), answerHtml: tLocalized("Gelişmiş reçine formülü baskıdan kürleme aşamasına kadar yüksek stabilite sağlar ve baskı sonrası formun korunmasına yardımcı olur.", "The advanced resin formula provides high stability from printing through the curing stage and helps preserve the form after printing.") },
        { question: tLocalized("Hangi yazıcılarla uyumlu?", "Which printers is it compatible with?"), answerHtml: tLocalized("Tüm DLP veya LCD 3D yazıcı markalarıyla uyumludur.", "Compatible with all DLP or LCD 3D printer brands.") },
        { question: tLocalized("Yüzey kalitesi nasıldır?", "What is the surface quality like?"), answerHtml: tLocalized("Keskin kenarlar, pürüzsüz yüzeyler ve tarama uyumlu model yüzeyi sunar.", "Offers sharp edges, smooth surfaces, and a scan-compatible model surface.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Model üretim akışını <span class=\"em\">videoda görün.</span>", "See the model production workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("Mash Study Resin ile ekonomik dental model üretim akışını videoda izleyin.", "Watch the video for the economical dental model production workflow with Mash Study Resin."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: MASH_STUDY_GALLERY[1].src,
      imageAlt: tLocalized("Mash Study Resin uygulama videosu", "Mash Study Resin application video"),
      title: tLocalized("Mash Study Resin ile dental model üretimi", "Dental model production with Mash Study Resin"),
      text: tLocalized("Ekonomik, yüksek çözünürlüklü ve stabil dental model üretimine odaklanan video.", "A video focused on economical, high-resolution, and stable dental model production."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: "MODEL", title: tLocalized("CRS Model", "CRS Model"), descriptionHtml: tLocalized("Yüksek hassasiyetli master protez ve ortodontik model reçinesi.", "High-precision master denture and orthodontic model resin."), href: "/crs-model-yuksek-hassasiyetli-model-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: tLocalized("DİŞ ETİ", "GINGIVA"), title: tLocalized("CRS Gingiva", "CRS Gingiva"), descriptionHtml: tLocalized("İmplant modelleri için elastik ve yırtılmaz diş eti reçinesi.", "An elastic, tear-resistant gingiva resin for implant models."), href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: "TRAY", title: tLocalized("CRS Tray Resin", "CRS Tray Resin"), descriptionHtml: tLocalized("Kişiye özel ölçü kaşığı üretimi için DLP / LCD uyumlu reçine.", "DLP / LCD compatible resin for custom impression tray production."), href: "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("Mash Study Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's <span class=\"em\">calibrate Mash Study Resin to your device together.</span>"),
      textHtml: tLocalized("Hangi yazıcı, hangi model uygulaması, hangi temizlik ve kürleme akışı? Mash Study Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which model application, which cleaning and curing workflow? Let's match Mash Study Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function MASH_TRIAL_PINK_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: MASH_TRIAL_PINK_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("Mash Trial Pink Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver Mash Trial Pink Resin calibrated to your device's parameters, along with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: { homeText: tLocalized("Ana sayfa", "Home"), homeHref: "/", categoryText: tLocalized("Dental Reçineler", "Dental Resins"), categoryHref: "/dental-3d-yazici-recineleri", productText: "Mash Trial Pink Resin" },
    hero: {
      kicker: tLocalized("Mash Trial Pink Resin · Dental Geçici Try-in Reçinesi", "Mash Trial Pink Resin · Dental Temporary Try-in Resin"),
      titleHtml: tLocalized("Try-in provası artık <span class=\"em\">klinik doğrulukla</span> basılıyor.", "Try-in restorations are now printed <span class=\"em\">with clinical accuracy.</span>"),
      leadHtml:
        tLocalized("Mash Trial Pink Resin; dental try-in uygulamaları için geliştirilmiş biyouyumlu ve yüksek performanslı bir geçici dental reçinesidir. Total ve parsiyel dişsiz hastalarda oklüzyon ve kapanış ilişkisini değerlendirmek için kullanılan geçici try-in protezlerde yüksek doğruluk sunar.", "Mash Trial Pink Resin is a biocompatible, high-performance temporary dental resin developed for dental try-in applications. It offers high accuracy in temporary try-in dentures used to evaluate the occlusion and bite relationship in fully and partially edentulous patients."),
      pills: [{ label: tLocalized("Geçici try-in", "Temporary try-in") }, { label: tLocalized("Oklüzyon kontrolü", "Occlusion check") }, { label: tLocalized("X-ray görünürlük", "X-ray visibility") }, { value: "385–405 nm", label: tLocalized("LCD / DLP", "LCD/DLP") }],
      gallery: MASH_TRIAL_PINK_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=Mash%20Trial%20Pink%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=Mash%20Trial%20Pink%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Try-in protezlerde <span class=\"hl\">uyum ve kapanış</span> kontrolü.", "<span class=\"hl\">Fit and bite</span> check in try-in dentures."),
      sideHtml: tLocalized("Mash Trial Pink Resin, oklüzyon ve kapanış ilişkisini değerlendirme aşamasında yüksek doğruluk ve stabil prova sonucu sunar.", "Mash Trial Pink Resin offers high accuracy and a stable try-in result when evaluating occlusion and bite relationship."),
      panelTitleHtml: tLocalized("Mash Trial Pink Reçinesi'ni satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "What do buyers of Mash Trial Pink Resin <span class=\"em\">say about it?</span>"),
      note: tLocalized("Try-in protezlerde form stabilitesi, oklüzyon kontrolü ve doğal diş eti tonu öne çıkar.", "Form stability, occlusion check, and natural gum tone stand out in try-in dentures."),
      items: [
        { descriptionHtml: tLocalized("Baskı sonrası form stabilitesi sayesinde geçici try-in protezlerde <b>uyum sorunlarının minimize edildiği</b> belirtilir.", "Thanks to form stability after printing, it's noted that <b>fit issues are minimized</b> in temporary try-in prostheses.") },
        { descriptionHtml: tLocalized("Yüksek doğruluk ile oklüzyon ve kapanış kontrollerinin <b>daha net</b> yapılabildiği ifade edilir.", "It is stated that occlusion and bite checks can be performed <b>more clearly</b> thanks to high accuracy.") },
        { descriptionHtml: tLocalized("Doğal diş eti tonuna yakın renk yapısı, estetik değerlendirme sürecini <b>kolaylaştırır</b>.", "A color structure close to natural gum tone <b>facilitates</b> the aesthetic evaluation process.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Dental try-in için <span class=\"em\">stabil ve görünür</span> prova reçinesi.", "<span class=\"em\">Stable and visible</span> try-in resin for dental try-in."),
      sideHtml:
        tLocalized("Mash Trial Pink Resin; düşük viskozitesi, kolay işlenebilir yapısı ve baskı sonrası form stabilitesi ile hızlı ve pratik üretim imkanı sunar.", "With its low viscosity, easy-to-work structure, and post-print form stability, Mash Trial Pink Resin offers fast and practical production."),
      items: [
        { name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"), value: "ISO", unit: "10477", tag: tLocalized("Try-in", "Try-in"), caption: tLocalized("Geçici try-in protezlerde mekanik davranış için listelenen teknik başlık.", "The technical title listed for mechanical behavior in temporary try-in dentures.") },
        { name: tLocalized("Sertifikasyon", "Certification"), value: "CE", unit: "Class I", tag: tLocalized("Dental", "dental"), caption: tLocalized("Geçici dental try-in uygulamaları için listelenen sertifikasyon.", "The certification listed for temporary dental try-in applications.") },
        { name: tLocalized("Esneklik Modülü", "Flexural Modulus"), value: "ASTM", unit: "D790", tag: tLocalized("Pink", "Pink"), caption: tLocalized("Prova aşamasında stabil form davranışını destekleyen teknik başlık.", "A technical heading that supports stable form behavior during the try-in stage.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("MASH TRIAL PINK · TRY-IN · 385–405 NM", "MASH TRIAL PINK · TRY-IN · 385–405 NM"),
      titleHtml: tLocalized("Estetik uyum ve <span class=\"em\">pratik prova</span> avantajı.", "Aesthetic fit and the advantage of a <span class=\"em\">practical try-in.</span>"),
      descriptionHtml:
        tLocalized("Diş eti görünümünü taklit eden geçici dental reçine yapısıyla estetik değerlendirme sürecini kolaylaştırır. X-ray ile görünürlük sağlayan formülasyonu klinik değerlendirme süreçlerine destek olur.", "Facilitates the aesthetic evaluation process with a temporary dental resin structure that mimics gum appearance. Its X-ray-visible formulation supports clinical evaluation processes."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Geçici try-in protez", "Temporary try-in denture") },
        { label: tLocalized("Kontrol", "Control"), value: tLocalized("Oklüzyon ve kapanış", "Occlusion and bite") },
        { label: tLocalized("Görünürlük", "Visibility"), value: tLocalized("X-ray ile görünür", "Visible under X-ray") },
        { label: tLocalized("Renk", "Colour"), value: tLocalized("Doğal diş eti tonu", "Natural gum tone") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm DLP / LCD" },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: geçici try-in protez, hasta provası, oklüzyon kontrolü ve dijital dental iş akışı.", "Everything at a glance: temporary try-in dentures, patient try-in, occlusion checks, and digital dental workflow."),
      photos: [
        { src: MASH_TRIAL_PINK_GALLERY[1].src, alt: tLocalized("Mash Trial Pink geçici try-in protez", "Mash Trial Pink temporary try-in denture"), title: tLocalized("Try-in protez", "Try-in prosthesis"), text: tLocalized("Total ve parsiyel dişsiz hastalarda geçici prova.", "Temporary try-in for fully and partially edentulous patients.") },
        { src: MASH_TRIAL_PINK_GALLERY[2].src, alt: tLocalized("Mash Trial Pink oklüzyon kontrolü", "Mash Trial Pink occlusion check"), title: tLocalized("Oklüzyon kontrolü", "Occlusion check"), text: tLocalized("Kapanış ilişkisini değerlendirme aşamasında yüksek doğruluk.", "High accuracy during the occlusal relationship evaluation stage.") },
        { src: MASH_TRIAL_PINK_GALLERY[3].src, alt: tLocalized("Mash Trial Pink hasta provası", "Mash Trial Pink patient try-in"), title: tLocalized("Hasta provası", "Patient try-in"), text: tLocalized("Estetik değerlendirme ve hasta provası için doğal diş eti tonu.", "A natural gum tone for aesthetic evaluation and patient try-in.") },
      ],
      cards: [
        { eyebrow: tLocalized("Uygulama Alanları", "Application Areas"), title: tLocalized("Hangi provalar?", "Which rehearsals?"), items: [tLocalized("<b>Geçici try-in protez</b> üretimi", "<b>Temporary try-in prosthesis</b> production"), tLocalized("Estetik değerlendirme ve hasta provası", "Aesthetic evaluation and patient try-in"), tLocalized("Oklüzyon ve kapanış kontrolü", "Occlusion and bite check")], note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration.") },
        { eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"), title: tLocalized("Neden Mash Trial Pink?", "Why Mash Trial Pink?"), items: [tLocalized("Biyouyumlu geçici dental reçine", "Biocompatible temporary dental resin"), tLocalized("<b>X-ray görünürlüğü</b>", "<b>X-ray visibility</b>"), tLocalized("Düşük viskozite ve kolay işlenebilirlik", "Low viscosity and easy workability"), tLocalized("Baskı sonrası form stabilitesi", "Form stability after printing")] },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml: tLocalized("Mash Trial Pink Resin, 385–405 nm dalga boyunda çalışan tüm DLP ve LCD 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "Mash Trial Pink Resin is compatible with all DLP and LCD 3D printers operating at a 385–405 nm wavelength. We perform parameter calibration for your printer <b>free of charge</b>."),
        chips: [{ label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") }, { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") }, { label: tLocalized("Asiga Max UV", "Asiga Max UV") }, { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") }, { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") }, { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true }],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Try-in sonucu <span class=\"em\">klinik kontrolle tamamlanır.</span>", "The try-in result <span class=\"em\">is completed with clinical control.</span>"),
      textHtml: tLocalized("Geçici prova üretiminde oklüzyon, kapanış ve estetik değerlendirme; doğru baskı parametresi, yıkama ve kürleme akışıyla güvenilir hale gelir.", "Occlusion, bite, and aesthetic evaluation in temporary try-in production become reliable with the correct printing parameters, washing, and curing workflow."),
      chips: [tLocalized("Try-in protez", "Try-in prosthesis"), tLocalized("X-ray görünürlük", "X-ray visibility"), tLocalized("Oklüzyon", "Occlusion"), tLocalized("Hasta provası", "Patient try-in"), "385–405 nm"],
      buttons: [{ text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" }, { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" }],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("Mash Trial Pink hakkında <span class=\"em\">merak edilenler.</span>", "Frequently asked questions <span class=\"em\">about Mash Trial Pink.</span>"),
      sideHtml: tLocalized("Try-in protez, ağız içi prova, mekanik dayanım, yazıcı uyumu ve post-process için net cevaplar.", "Clear answers on try-in dentures, intraoral try-in, mechanical strength, printer compatibility, and post-processing."),
      openFirst: true,
      items: [
        { question: tLocalized("Mash Trial Pink Resin ne için kullanılır?", "What is Mash Trial Pink Resin used for?"), answerHtml: tLocalized("Geçici try-in protez üretimi, estetik değerlendirme, hasta provası, oklüzyon ve kapanış kontrolü için kullanılır.", "Used for temporary try-in denture production, aesthetic evaluation, patient try-in, occlusion, and bite checks.") },
        { question: tLocalized("Ağız içinde kullanıma uygun mu?", "Is it suitable for intraoral use?"), answerHtml: tLocalized("Biyouyumlu geçici dental reçine olarak geliştirilmiştir; geçici try-in uygulamaları için kullanılır.", "Developed as a biocompatible temporary dental resin; used for temporary try-in applications.") },
        { question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"), answerHtml: tLocalized("<b>385–405 nm</b> dalga boyunda çalışan tüm DLP ve LCD 3D yazıcılarla uyumludur.", "Compatible with all DLP and LCD 3D printers operating at <b>385–405 nm</b> wavelengths.") },
        { question: tLocalized("Klinik değerlendirmede avantajı nedir?", "What is its advantage in clinical evaluation?"), answerHtml: tLocalized("X-ray görünürlüğü, oklüzyon ve kapanış değerlendirmesi ile estetik prova sürecini kolaylaştırır.", "X-ray visibility makes occlusion and bite assessment as well as the aesthetic try-in process easier.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Try-in prova akışını <span class=\"em\">videoda görün.</span>", "See the try-in workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("Mash Trial Pink Resin ile dental geçici try-in üretim akışını videoda izleyin.", "Watch the video for the dental temporary try-in production workflow with Mash Trial Pink Resin."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: MASH_TRIAL_PINK_GALLERY[1].src,
      imageAlt: tLocalized("Mash Trial Pink Resin uygulama videosu", "Mash Trial Pink Resin application video"),
      title: tLocalized("Mash Trial Pink Resin ile geçici try-in üretimi", "Temporary try-in production with Mash Trial Pink Resin"),
      text: tLocalized("Oklüzyon, kapanış ve estetik hasta provası için geçici try-in üretimine odaklanan video.", "A video focused on temporary try-in production for occlusion, bite, and aesthetic patient try-ins."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("TRY-IN", "TRY-IN"), title: tLocalized("Mash Trial White", "Mash Trial White"), descriptionHtml: tLocalized("Geçici dental restorasyon provaları için beyaz prova reçinesi.", "White try-in resin for temporary dental restoration try-ins."), href: "/mash-trial-white-resin-gecici-dental-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "PROTEZ", title: tLocalized("CRS Denture", "CRS Denture"), descriptionHtml: tLocalized("Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", "Biocompatible denture resin for removable denture bases."), href: "/crs-denture-biouyumlu-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: "MODEL", title: tLocalized("Mash Study", "Mash Study"), descriptionHtml: tLocalized("Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", "An economical, high-resolution dental model resin."), href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("Mash Trial Pink Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's <span class=\"em\">calibrate Mash Trial Pink Resin to your device together.</span>"),
      textHtml: tLocalized("Hangi yazıcı, hangi try-in vaka, hangi klinik prova akışı? Mash Trial Pink Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which try-in case, which clinical trial workflow? Let's match Mash Trial Pink Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

export function MASH_TRIAL_WHITE_PRODUCT_DETAIL_DATA(): ProductDetailTemplateData {
  return {
    key: MASH_TRIAL_WHITE_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("Mash Trial White Resin'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver Mash Trial White Resin calibrated to your device's parameters, along with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: { homeText: tLocalized("Ana sayfa", "Home"), homeHref: "/", categoryText: tLocalized("Dental Reçineler", "Dental Resins"), categoryHref: "/dental-3d-yazici-recineleri", productText: "Mash Trial White Resin" },
    hero: {
      kicker: tLocalized("Mash Trial White Resin · Geçici Dental Reçine", "Mash Trial White Resin · Temporary Dental Resin"),
      titleHtml: tLocalized("Geçici prova artık <span class=\"em\">görsel netlikle</span> kontrol ediliyor.", "Temporary try-ins are now checked <span class=\"em\">with visual clarity.</span>"),
      leadHtml:
        tLocalized("Mash Trial White Resin; geçici dental restorasyon provaları için geliştirilmiş, ışıkla kürlenen yüksek performanslı 3D yazıcı dental reçinesidir. Try-in restorasyonlar, protez provaları ve oklüzyon değerlendirmeleri için kullanılır.", "Mash Trial White Resin is a light-curing, high-performance 3D printer dental resin developed for temporary dental restoration try-ins. It is used for try-in restorations, denture try-ins, and occlusion evaluations."),
      pills: [{ label: tLocalized("Geçici prova", "Temporary try-in") }, { label: tLocalized("Röntgen görünürlük", "Radiopacity") }, { label: tLocalized("CE Class I", "CE Class I") }, { value: "385–405 nm", label: tLocalized("LCD / DLP", "LCD/DLP") }],
      gallery: MASH_TRIAL_WHITE_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/mash-trial-white-resin-gecici-dental-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=Mash%20Trial%20White%20Resin%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=Mash%20Trial%20White%20Resin%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Geçici restorasyonda <span class=\"hl\">uyum ve estetik</span> kontrolü.", "<span class=\"hl\">Fit and aesthetic</span> control in temporary restorations."),
      sideHtml: tLocalized("Mash Trial White Resin, protez uyumu, oklüzyon ve estetik değerlendirmelerin klinik ortamda daha güvenilir yapılmasına yardımcı olur.", "Mash Trial White Resin helps make denture fit, occlusion, and aesthetic evaluations more reliable in a clinical setting."),
      panelTitleHtml: tLocalized("Mash Trial White Resin kullananlar <span class=\"em\">nasıl değerlendirdi?</span>", "What do users of Mash Trial White Resin <span class=\"em\">say about it?</span>"),
      note: tLocalized("Geçici restorasyon provalarında ölçü doğruluğu, güvenilir değerlendirme ve röntgen görünürlüğü öne çıkar.", "Dimensional accuracy, reliable evaluation, and X-ray visibility stand out in temporary restoration try-ins."),
      items: [
        { descriptionHtml: tLocalized("Geçici restorasyon provalarında ölçü doğruluğu sayesinde <b>uyum problemi yaşanmadığı</b> belirtilir.", "Thanks to dimensional accuracy in temporary restoration try-ins, it is stated that <b>no fit issues occur</b>.") },
        { descriptionHtml: tLocalized("Geçici prova restorasyonlarının klinik değerlendirme sürecinde <b>güvenilir sonuçlar</b> sunduğu ifade edilir.", "It is stated that temporary try-in restorations provide <b>reliable results</b> in the clinical evaluation process.") },
        { descriptionHtml: tLocalized("Röntgende görünürlük sağlayan yapı, klinik kontrol ve tedavi planlamasında <b>ek avantaj</b> sunar.", "Its radiopaque structure offers an <b>additional advantage</b> in clinical control and treatment planning.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Geçici restorasyon için <span class=\"em\">CE Class I</span> prova reçinesi.", "<span class=\"em\">CE Class I</span> try-in resin for temporary restorations."),
      sideHtml:
        tLocalized("Mash Trial White Resin, özel fotopolimer formülasyonu sayesinde baskı sonrası stabil yapı ve yüksek görsel netlik sunar. 385 nm ve 405 nm UV ışık kaynağı kullanan LCD ve DLP yazıcılarla uyumludur.", "Thanks to its special photopolymer formulation, Mash Trial White Resin offers a stable structure and high visual clarity after printing. It is compatible with LCD and DLP printers that use a 385 nm or 405 nm UV light source."),
      items: [
        { name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"), value: "ASTM", unit: "D790", tag: tLocalized("Trial", "trial"), caption: tLocalized("Geçici dental prova restorasyonları için listelenen teknik başlık.", "The technical title listed for temporary dental try-in restorations.") },
        { name: tLocalized("Sertifikasyon", "Certification"), value: "CE", unit: "Class I", tag: tLocalized("Dental", "dental"), caption: tLocalized("Geçici restorasyon provalarında güvenli kullanım sunan sertifikasyon.", "The certification that offers safe use in temporary restoration try-ins.") },
        { name: tLocalized("Esneklik Modülü", "Flexural Modulus"), value: "ASTM", unit: "D790", tag: tLocalized("White", "White"), caption: tLocalized("Prova restorasyonlarında stabil yapı için listelenen teknik başlık.", "A technical heading listed for stable structure in try-in restorations.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("MASH TRIAL WHITE · GEÇİCİ PROVA · CE CLASS I", "MASH TRIAL WHITE · TEMPORARY TRIAL · CE CLASS I"),
      titleHtml: tLocalized("Geçici dental provalarda <span class=\"em\">klinik kontrolü kolaylaştırır.</span>", "<span class=\"em\">Makes clinical control easier</span> in temporary dental try-ins."),
      descriptionHtml:
        tLocalized("Protez uyumu, oklüzyon ve estetik değerlendirmelerin daha güvenilir yapılmasına destek olur. CE Class I sertifikalı yapısı ve röntgende görünür formülasyonu dijital diş hekimliği süreçlerinde pratik bir klinik çözüm sunar.", "Supports more reliable evaluation of denture fit, occlusion, and aesthetics. Its CE Class I certified structure and radiopaque formulation offer a practical clinical solution in digital dentistry processes."),
      ctaText: tLocalized("Boyut seç →", "Select size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Geçici prova restorasyonu", "Temporary try-in restoration") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Protez uyum kontrolü", "Denture fit check") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Klinik estetik değerlendirme", "Clinical aesthetic evaluation") },
        { label: tLocalized("Sertifikasyon", "Certification"), value: tLocalized("CE Class I", "CE Class I") },
        { label: tLocalized("Uyum", "Compatibility"), value: "385–405 nm LCD / DLP" },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Hepsi tek bakışta: geçici prova restorasyonu, protez uyum kontrolü, klinik estetik değerlendirme ve try-in cihaz üretimi.", "Everything at a glance: temporary trial restorations, denture fit checks, clinical aesthetic evaluation, and try-in appliance production."),
      photos: [
        { src: MASH_TRIAL_WHITE_GALLERY[1].src, alt: tLocalized("Mash Trial White geçici restorasyon provası", "Mash Trial White temporary restoration try-in"), title: tLocalized("Geçici prova", "Temporary try-in"), text: tLocalized("Geçici dental restorasyon provaları için yüksek görsel netlik.", "High visual clarity for temporary dental restoration try-ins.") },
        { src: MASH_TRIAL_WHITE_GALLERY[2].src, alt: tLocalized("Mash Trial White protez uyum kontrolü", "Mash Trial White denture fit check"), title: tLocalized("Protez uyumu", "Prosthetic fit"), text: tLocalized("Protez uyumu, oklüzyon ve diş dizilimi değerlendirmeleri.", "Denture fit, occlusion, and tooth arrangement evaluations.") },
        { src: MASH_TRIAL_WHITE_GALLERY[3].src, alt: tLocalized("Mash Trial White klinik estetik değerlendirme", "Mash Trial White clinical aesthetic evaluation"), title: tLocalized("Estetik kontrol", "Aesthetic control"), text: tLocalized("Klinik estetik değerlendirme ve tedavi planlamasına destek.", "Support for clinical aesthetic evaluation and treatment planning.") },
      ],
      cards: [
        { eyebrow: tLocalized("Uygulama Alanları", "Application Areas"), title: tLocalized("Hangi provalar?", "Which rehearsals?"), items: [tLocalized("<b>Geçici prova restorasyonları</b>", "<b>Temporary try-in restorations</b>"), "Protez uyum kontrolleri", tLocalized("Klinik estetik değerlendirmeler ve try-in cihaz üretimi", "Clinical aesthetic evaluations and try-in appliance production")], note: tLocalized("Cihazınıza uygun baskı parametrelerini ücretsiz uyumlamayla teslim ediyoruz.", "We deliver the print parameters suited to your device with free calibration.") },
        { eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"), title: tLocalized("Neden Mash Trial White?", "Why Mash Trial White?"), items: [tLocalized("CE Class I sertifikalı yapı", "CE Class I certified structure"), tLocalized("Röntgende görünür formülasyon", "Radiopaque formulation"), tLocalized("<b>Baskı sonrası stabil yapı</b>", "<b>Stable structure after printing</b>"), "385–405 nm LCD / DLP uyumu"] },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("385–405 nm LCD & DLP yazıcılarla çalışır", "Works with 385–405 nm LCD & DLP printers"),
        textHtml: tLocalized("Mash Trial White Resin, 385 nm ve 405 nm UV ışık kaynağı kullanan LCD ve DLP teknolojisine sahip 3D yazıcılarla uyumludur. Kullandığınız yazıcıya göre parametre uyumlamasını <b>ücretsiz</b> yapıyoruz.", "Mash Trial White Resin is compatible with LCD and DLP-technology 3D printers that use a 385 nm or 405 nm UV light source. We perform parameter calibration for your printer <b>free of charge</b>."),
        chips: [{ label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") }, { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") }, { label: tLocalized("Asiga Max UV", "Asiga Max UV") }, { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") }, { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") }, { label: tLocalized("+ tüm 385–405 nm LCD / DLP markaları", "+ all 385–405 nm LCD / DLP brands"), highlighted: true }],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Geçici prova sonucu <span class=\"em\">ölçü doğruluğuyla tamamlanır.</span>", "The temporary try-in result <span class=\"em\">is completed with dimensional accuracy.</span>"),
      textHtml: tLocalized("Geçici dental prova restorasyonlarında uyum, oklüzyon ve estetik kontrol; doğru baskı, temizlik ve kürleme akışıyla güvenilir hale gelir.", "Fit, occlusion, and aesthetic checks in temporary dental try-in restorations become reliable with the correct printing, cleaning, and curing workflow."),
      chips: [tLocalized("CE Class I", "CE Class I"), tLocalized("Röntgen görünürlük", "Radiopacity"), tLocalized("Protez uyumu", "Prosthetic fit"), tLocalized("Oklüzyon", "Occlusion"), "385–405 nm"],
      buttons: [{ text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" }, { text: tLocalized("Uzmana danış →", "Consult an expert →"), href: tLocalized("/pages/iletisim", "/pages/iletisim"), variant: "line" }],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("Mash Trial White hakkında <span class=\"em\">merak edilenler.</span>", "Frequently asked questions <span class=\"em\">about Mash Trial White.</span>"),
      sideHtml: tLocalized("Geçici prova restorasyonları, kalıcı kullanım sınırı, yazıcı uyumu ve post-process için net cevaplar.", "Clear answers on temporary try-in restorations, permanent-use limits, printer compatibility, and post-processing."),
      openFirst: true,
      items: [
        { question: tLocalized("Mash Trial White Resin hangi uygulamalarda kullanılır?", "In which applications is Mash Trial White Resin used?"), answerHtml: tLocalized("Geçici prova restorasyonları, protez uyum kontrolleri, klinik estetik değerlendirmeler ve try-in cihaz üretimi için kullanılır.", "Used for temporary try-in restorations, denture fit checks, clinical aesthetic evaluations, and try-in appliance production.") },
        { question: tLocalized("Ağız içinde kalıcı kullanım için uygun mudur?", "Is it suitable for permanent use in the mouth?"), answerHtml: tLocalized("Hayır. Geçici dental restorasyon provaları ve klinik değerlendirme süreçleri için geliştirilmiş bir prova reçinesidir.", "No. It is a trial resin developed for temporary dental restoration try-ins and clinical evaluation processes.") },
        { question: tLocalized("Hangi 3D yazıcılarla uyumludur?", "Which 3D printers is it compatible with?"), answerHtml: tLocalized("<b>385 nm ve 405 nm</b> UV ışık kaynağı kullanan LCD ve DLP 3D yazıcılarla uyumludur.", "Compatible with LCD and DLP 3D printers using a <b>385 nm and 405 nm</b> UV light source.") },
        { question: tLocalized("Klinik kontrol avantajı nedir?", "What is the clinical control advantage?"), answerHtml: tLocalized("Röntgende görünür yapısı, klinik kontrol ve tedavi planlamasında ek avantaj sunar.", "Its radiopaque structure offers an additional advantage in clinical control and treatment planning.") },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Geçici prova akışını <span class=\"em\">videoda görün.</span>", "See the temporary try-in workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("Mash Trial White Resin ile geçici dental prova restorasyonu üretim akışını videoda izleyin.", "Watch the video for the temporary dental try-in restoration production workflow with Mash Trial White Resin."),
      href: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      image: MASH_TRIAL_WHITE_GALLERY[1].src,
      imageAlt: tLocalized("Mash Trial White Resin uygulama videosu", "Mash Trial White Resin application video"),
      title: tLocalized("Mash Trial White Resin ile geçici prova restorasyonu", "Temporary try-in restoration with Mash Trial White Resin"),
      text: tLocalized("Protez uyumu, oklüzyon ve estetik değerlendirme için geçici dental prova üretimine odaklanan video.", "A video focused on temporary dental try-in production for denture fit, occlusion, and aesthetic evaluation."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        { tag: tLocalized("TRY-IN", "TRY-IN"), title: tLocalized("Mash Trial Pink", "Mash Trial Pink"), descriptionHtml: tLocalized("Dental try-in uygulamaları için pembe geçici prova reçinesi.", "Pink temporary try-in resin for dental try-in applications."), href: "/mash-trial-pink-resin-dental-try-in-gecici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F6E3E4,#fff)" },
        { tag: "MODEL", title: tLocalized("Mash Study", "Mash Study"), descriptionHtml: tLocalized("Ekonomik ve yüksek çözünürlüklü dental model reçinesi.", "An economical, high-resolution dental model resin."), href: "/mash-study-resin-dental-model-3d-yazici-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#EFE7D3,#fff)" },
        { tag: "PROTEZ", title: tLocalized("CRS Denture", "CRS Denture"), descriptionHtml: tLocalized("Çıkarılabilir protez tabanları için biyouyumlu protez reçinesi.", "Biocompatible denture resin for removable denture bases."), href: "/crs-denture-biouyumlu-protez-recinesi", linkText: tLocalized("İncele", "Explore"), background: "linear-gradient(160deg,#F5DEE0,#fff)" },
        { tag: tLocalized("TÜM HAT", "FULL RANGE"), title: tLocalized("Tüm reçineler", "All resins"), descriptionHtml: tLocalized("Dental reçineleri uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare dental resins by application and choose the right one."), href: "/dental-3d-yazici-recineleri", linkText: tLocalized("Reçine seçici", "Resin selector"), background: "linear-gradient(160deg,#EEEEE9,#fff)" },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("Mash Trial White Resin'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's <span class=\"em\">calibrate Mash Trial White Resin to your device together.</span>"),
      textHtml: tLocalized("Hangi yazıcı, hangi geçici prova restorasyonu, hangi klinik değerlendirme akışı? Mash Trial White Resin'i cihazınızın parametreleriyle eşleştirip <b>ücretsiz</b> uyumlama desteğiyle teslim edelim.", "Which printer, which temporary trial restoration, which clinical evaluation workflow? Let's match Mash Trial White Resin to your device's parameters and deliver it with <b>free</b> calibration support."),
      primaryText: tLocalized("Boyut seç ↑", "Choose size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

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

function getPrinterSpareCategory() {
  return {
    text: tLocalized("3D Yazıcı Yedek Parçaları", "3D Printer Spare Parts"),
    href: "/3d-yazici-yedek-parcalari",
  };
}

function thumbUrl(src: string) {
  return src.replace("/1080/", "/360/");
}

function normalizedGallery(images: string[], alt: string): ProductGalleryItem[] {
  const source = Array.from(new Set(images.filter(Boolean)));
  const gallery = source.map((src) => ({ src, thumbSrc: thumbUrl(src), alt }));
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
      tag: tLocalized("P16L", "P16L"),
      title: tLocalized("MASH P16L 16K LCD Ekran", "MASH P16L 16K LCD Screen"),
      descriptionHtml: tLocalized("16K UHD monokrom LCD ekran; 385 nm P16L ışık sistemiyle uyumlu yedek parça.", "16K UHD monochrome LCD screen; a spare part compatible with the 385 nm P16L light system."),
      href: `/${MASH_P16L_LCD_SCREEN_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#EEF2F5,#fff)",
    },
    {
      tag: "TABLA",
      title: tLocalized("MASH P16L Büyük Baskı Tablası", "MASH P16L Large Build Plate"),
      descriptionHtml: tLocalized("211x118 mm geniş baskı alanı; yüksek hacimli dental üretimler için standart tabla.", "211x118 mm large print area; the standard platform for high-volume dental production."),
      href: `/${MASH_P16L_LARGE_BUILD_PLATE_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#F3EFE7,#fff)",
    },
    {
      tag: "TANK",
      title: tLocalized("MASH P16L Reçine Tankı", "MASH P16L Resin Tank"),
      descriptionHtml: tLocalized("800 ml alüminyum reçine tankı; hızlı kilit ve ısıtma sistemiyle uyumlu yapı.", "800 ml aluminum resin tank; a design compatible with the quick-lock and heating system."),
      href: `/${MASH_P16L_RESIN_TANK_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#EDEFE9,#fff)",
    },
    {
      tag: "SARF",
      title: tLocalized("Şeffaf ACF Film", "Clear ACF Film"),
      descriptionHtml: tLocalized("LCD/DLP reçine yazıcılarda UV geçirgenliği ve stabil katman oluşumu için sarf film.", "Consumable film for UV transmittance and stable layer formation in LCD/DLP resin printers."),
      href: `/${ACF_FEP_FILM_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#EEF6F6,#fff)",
    },
    {
      tag: "KONTROL",
      title: tLocalized("MASH P16L Ana Kart", "MASH P16L Main Board"),
      descriptionHtml: tLocalized("Motor, sensör ve veri iletişimi görevlerini yöneten merkezi kontrol kartı.", "The central control board that manages motor, sensor, and data communication tasks."),
      href: `/${MASH_P16L_MAINBOARD_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#F0F0EA,#fff)",
    },
  ];
  return all.filter((item) => item.href !== `/${currentSlug}`).slice(0, 4);
}

function printerSparePartDetail(config: PrinterSparePartConfig): ProductDetailTemplateData {
  const printerSpareCategory = getPrinterSpareCategory();
  const gallery = normalizedGallery(config.images, config.productText);
  const mainImage = config.images[0] || gallery[0]?.src || "";
  return {
    key: config.slug,
    announcement: {
      enabled: true,
      strongText: tLocalized("Yedek parça desteği.", "Spare part support."),
      longText: tLocalized("Uyumlu cihazı birlikte kontrol edip doğru parçayı, kurulum desteğiyle teslim ediyoruz.", "We check the compatible device together and deliver the right part with installation support."),
      ctaText: tLocalized("Uyumluluğu kontrol et →", "Check compatibility →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: printerSpareCategory.text,
      categoryHref: printerSpareCategory.href,
      productText: config.productText,
    },
    hero: {
      kicker: config.kicker,
      titleHtml: config.titleHtml,
      leadHtml: config.leadHtml,
      pills: config.pills,
      galleryBadge: config.galleryBadge,
      gallery,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— uyumluluk kontrolü ve teknik destek dahil.", "— including compatibility check and technical support."),
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Servis Güveni", "Service Confidence"),
      titleHtml: tLocalized("Doğru parça, <span class=\"hl\">kesintisiz üretim</span> için seçilir.", "The right part is chosen for <span class=\"hl\">uninterrupted production.</span>"),
      sideHtml: tLocalized("Yazıcı yedek parçalarında kritik nokta; cihaz uyumu, doğru montaj ve baskı sürecinin tekrar stabil hale gelmesidir.", "The critical point with printer spare parts is device compatibility, correct installation, and getting the print process stable again."),
      panelTitleHtml: `${config.productText} için <span class="em">kontrol listesi.</span>`,
      note: tLocalized("Servis ve bakım iş akışında kontrol edilen temel noktalar.", "Key items checked in the service and maintenance workflow."),
      items: [
        { descriptionHtml: tLocalized("Cihaz modeli ve parça uyumu <b>satın alma öncesi</b> kontrol edilir.", "Device model and part compatibility are checked <b>before purchase.</b>") },
        { descriptionHtml: tLocalized("Montaj sonrası baskı stabilitesi için <b>kalibrasyon ve test baskısı</b> önerilir.", "<b>Calibration and a test print</b> are recommended for print stability after installation.") },
        { descriptionHtml: tLocalized("Sarf ve elektronik parçalar için <b>temiz çalışma alanı</b> ve doğru kurulum sırası önemlidir.", "A <b>clean work area</b> and the correct installation order are important for consumables and electronic parts.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: tLocalized("Uyumluluğu seç →", "Select compatibility →"),
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: config.useCaseSideHtml,
      photos: config.useCasePhotos.map((photo) => ({
        src: sparePhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
      })),
      cards: config.useCaseCards,
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: config.devicesTitle,
        textHtml: config.devicesTextHtml,
        chips: config.deviceChips,
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Servis Ekosistemi", "Service Ecosystem"),
      titleHtml: config.ecosystemTitleHtml,
      textHtml: config.ecosystemTextHtml,
      chips: config.ecosystemChips,
      buttons: [
        { text: tLocalized("Teknik destek al", "Get technical support"), href: tLocalized("/pages/iletisim", "/pages/iletisim") },
        { text: tLocalized("Yedek parçaları gör", "See spare parts"), href: printerSpareCategory.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulanlar", "Frequently Asked Questions"),
      titleHtml: `${config.productText} <span class="em">hakkında.</span>`,
      sideHtml: tLocalized("Satın alma öncesi cihaz modeli ve parça uyumu birlikte kontrol edilmelidir.", "The device model and part compatibility should be checked together before purchase."),
      openFirst: true,
      items: config.faqItems,
    },
    video: config.videoHref
      ? {
        index: "06",
        label: tLocalized("Videoda Gör", "Watch Video"),
        titleHtml: config.videoTitleHtml,
        sideHtml: config.videoSideHtml,
        href: config.videoHref,
        image: youtubePreview(config.videoHref, ""),
        imageAlt: `${config.productText} video`,
        title: config.videoTitle,
        text: config.videoText,
        meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
      }
      : undefined,
    related: {
      index: "07",
      label: tLocalized("İlgili Yedek Parçalar", "Related Spare Parts"),
      titleHtml: tLocalized("Aynı cihazda <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same device."),
      items: spareRelatedItems(config.slug),
    },
    finalCta: {
      titleHtml: `${config.productText} için <span class="em">uyumluluğu birlikte kontrol edelim.</span>`,
      textHtml:
        tLocalized("Cihaz modeli, parça revizyonu ve kurulum adımlarını birlikte netleştirip doğru yedek parçayı teknik destekle teslim edelim.", "Let's clarify the device model, part revision, and installation steps together, and deliver the right spare part with technical support."),
      primaryText: tLocalized("Sepete dön ↑", "Back to cart ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış", "Consult an expert"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

function printerSparePartConfigs(): PrinterSparePartConfig[] {
  return [
    {
      slug: CREALITY_HALOT_SKY_LCD_KIT_SLUG,
      productText: tLocalized("Creality Halot Sky LCD Ekran Kiti", "Creality Halot Sky LCD ekran kiti"),
      kicker: tLocalized("Creality Halot Sky · 6K Mono LCD Ekran Kiti", "Creality Halot Sky · 6K Mono LCD Screen Kit"),
      titleHtml: tLocalized("Halot Sky baskı kalitesi <span class=\"em\">ekranla</span> yenilenir.", "Halot Sky print quality is renewed <span class=\"em\">with the screen.</span>"),
      leadHtml:
        tLocalized("Creality Halot Sky 2022 ve orijinal Halot Sky modeli için 6K Mono LCD ekran kiti. Yüksek çözünürlük ve geniş dokunmatik ekranla reçine baskı performansını tekrar stabil hale getirir.", "A 6K Mono LCD screen kit for the Creality Halot Sky 2022 and the original Halot Sky model. It restores stable resin print performance with high resolution and a large touchscreen."),
      pills: [{ value: tLocalized("6K", "6K"), label: tLocalized("Mono LCD", "Mono LCD") }, { value: tLocalized("9.25 inç", "9.25 inches"), label: tLocalized("dokunmatik ekran", "touch screen") }, { label: tLocalized("Halot Sky uyumlu", "Halot Sky compatible") }, { label: tLocalized("Orijinal yedek parça", "Original spare part") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a1735bcc-58b6-47c0-a820-ff325b8d4902/1080/creality-halot-sky-lcd-kit.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4118cd2f-00bc-441f-b16b-39190b5d7c12/1080/creality-halot-sky-lcd-kit2.webp",
      ],
      galleryBadge: tLocalized("6K MONO", "6K MONO"),
      summarySubject: tLocalized("LCD ekran kiti", "LCD display kit"),
      metricTitleHtml: tLocalized("6K Mono ekranla <span class=\"em\">detay geri gelir.</span>", "With the 6K Mono screen, <span class=\"em\">detail comes back.</span>"),
      metricSideHtml: tLocalized("Creality Halot Sky ekran değişiminde çözünürlük, cihaz uyumu ve montaj sonrası test baskısı birlikte değerlendirilir.", "In a Creality Halot Sky screen replacement, resolution, device compatibility, and the post-installation test print are evaluated together."),
      metrics: [
        { name: tLocalized("Ekran Tipi", "Screen Type"), value: tLocalized("6K", "6K"), unit: "Mono", tag: "LCD", caption: tLocalized("Reçine baskılarda yüksek detay aktarımı için mono LCD ekran kiti.", "A mono LCD screen kit for high detail transfer in resin prints.") },
        { name: tLocalized("Ekran Boyutu", "Screen Size"), value: "9.25", unit: tLocalized("inç", "inch"), tag: tLocalized("Touch", "touch"), caption: tLocalized("Geniş dokunmatik ekran yapısı Halot Sky kullanım akışını korur.", "The large touchscreen structure preserves the Halot Sky usage workflow.") },
        { name: tLocalized("Uyum", "Compatibility"), value: "Halot", unit: "Sky", tag: "2022", caption: tLocalized("Halot Sky 2022 ve orijinal Halot Sky modeliyle uyumlu yapı.", "A structure compatible with the Halot Sky 2022 and the original Halot Sky model.") },
      ],
      specTag: "CREALITY · HALOT SKY · LCD KIT",
      specTitleHtml: tLocalized("Ekran değişimiyle <span class=\"em\">stabil pozlama.</span>", "<span class=\"em\">Stable exposure</span> with screen replacement."),
      specDescriptionHtml: tLocalized("6K Mono LCD ekran kiti, Halot Sky reçine yazıcının pozlama kalitesini ve dokunmatik kontrol yüzeyini yenilemek için kullanılır. Değişim sonrası kalibrasyon ve test baskısı önerilir.", "The 6K Mono LCD screen kit is used to renew the exposure quality and touch control surface of the Halot Sky resin printer. Calibration and a test print are recommended after replacement."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("Creality Halot Sky", "Creality Halot Sky") },
        { label: tLocalized("Ekran", "Screen"), value: "6K Mono LCD" },
        { label: tLocalized("Boyut", "Dimension"), value: tLocalized("9.25 inç", "9.25 inches") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Bakım / onarım", "Maintenance / repair") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Yedek parça", "spare parts") },
      ],
      useCaseSideHtml: tLocalized("Halot Sky ekran değişimi, pozlama stabilitesi ve dokunmatik kontrol için kullanılan yedek parça.", "A spare part used for Halot Sky screen replacement, exposure stability, and touch control."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Ekran değişimi", "Screen replacement"), text: tLocalized("Hasarlı veya performansı düşen LCD ekran için yenileme.", "Replacement for a damaged or underperforming LCD screen."), alt: tLocalized("Creality Halot Sky LCD ekran değişimi", "Creality Halot Sky LCD screen replacement") },
        { imageIndex: 2, title: tLocalized("Pozlama kontrolü", "Exposure check"), text: tLocalized("Reçine baskıda katman netliği ve ışık aktarımı.", "Layer clarity and light transmission in resin printing."), alt: tLocalized("Creality Halot Sky pozlama kontrolü", "Creality Halot Sky exposure control") },
        { imageIndex: 2, title: tLocalized("Servis kurulumu", "Service installation"), text: tLocalized("Montaj sonrası kalibrasyon ve test baskısı.", "Calibration and test print after installation."), alt: tLocalized("Creality Halot Sky servis kurulumu", "Creality Halot Sky service installation") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne zaman değişir?", "When does it change?"), items: [tLocalized("Ekranda ölü piksel, çizgi veya pozlama kaybı oluştuğunda", "When dead pixels, lines, or exposure loss occur on the screen"), tLocalized("Dokunmatik panel hasarı veya kararsızlığı görüldüğünde", "When touch panel damage or instability is observed"), tLocalized("Baskı kalitesi ekran kaynaklı düştüğünde", "When print quality drops due to the screen")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Montajda ne kontrol edilir?", "What is checked during assembly?"), items: [tLocalized("Bağlantı soketleri ve ekran yüzeyi temiz tutulur", "Connection sockets and screen surface are kept clean"), tLocalized("İlk baskı öncesi pozlama testi yapılır", "An exposure test is performed before the first print"), tLocalized("Reçine tankı filmi ve ekran yüzeyi birlikte kontrol edilir", "The resin tank film and screen surface are checked together")] },
      ],
      devicesTitle: tLocalized("Creality Halot Sky modelleriyle çalışır", "Works with Creality Halot Sky models"),
      devicesTextHtml: tLocalized("Halot Sky 2022 ve orijinal Halot Sky cihazlarında ekran değişimi için kullanılır. Uyum için cihaz modelini ve ekran revizyonunu birlikte kontrol ediyoruz.", "Used for screen replacement on the Halot Sky 2022 and original Halot Sky devices. We check the device model and screen revision together for compatibility."),
      deviceChips: [{ label: tLocalized("Creality Halot Sky 2022", "Creality Halot Sky 2022") }, { label: tLocalized("Creality Halot Sky", "Creality Halot Sky") }, { label: tLocalized("Reçine LCD yazıcı", "Resin LCD printer") }, { label: tLocalized("Uyumluluk kontrolü", "Compatibility check"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Ekran değişimi, <span class=\"em\">tek başına parça değişimi değildir.</span>", "Screen replacement <span class=\"em\">is not just a part swap.</span>"),
      ecosystemTextHtml: tLocalized("LCD değişiminden sonra tank filmi, ekran yüzeyi, pozlama ve ilk test baskısı birlikte kontrol edilirse baskı süreci daha güvenli ilerler.", "The printing process proceeds more safely if the tank film, screen surface, exposure, and the first test print are checked together after an LCD replacement."),
      ecosystemChips: [tLocalized("LCD ekran", "LCD screen"), tLocalized("Tank filmi", "tank movie"), "Pozlama testi", tLocalized("Servis desteği", "Service support")],
      faqItems: [
        { question: tLocalized("Hangi cihazlarla uyumlu?", "What devices is it compatible with?"), answerHtml: tLocalized("Creality Halot Sky 2022 ve orijinal Halot Sky modeliyle uyumlu LCD ekran kiti olarak listelenir.", "Listed as an LCD screen kit compatible with the Creality Halot Sky 2022 and the original Halot Sky model.") },
        { question: tLocalized("Ekran değişimi sonrası ne yapılmalı?", "What should be done after screen replacement?"), answerHtml: tLocalized("Bağlantılar, ekran yüzeyi ve pozlama testi kontrol edilmelidir.", "Connections, screen surface, and exposure test should be checked.") },
        { question: tLocalized("Teknik destek alabilir miyim?", "Can I get technical support?"), answerHtml: tLocalized("Evet. Satın alma öncesi uyumluluk ve kurulum adımları için destek alınabilir.", "Yes. Support is available for compatibility checks and setup steps before purchase.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=mDQX01qgu60",
      videoTitleHtml: tLocalized("Halot Sky akışını <span class=\"em\">videoda görün.</span>", "See the Halot Sky workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("Creality Halot Sky LCD ekran değişimi ve cihaz bakım akışını video üzerinden inceleyin.", "Review the Creality Halot Sky LCD screen replacement and device maintenance workflow via video."),
      videoTitle: tLocalized("Creality Halot Sky LCD ekran kiti", "Creality Halot Sky LCD display kit"),
      videoText: tLocalized("LCD ekran değişimi, kontrol ve test baskısı sürecine odaklanan video.", "A video focused on the LCD screen replacement, check, and test-print process."),
    },
    {
      slug: PIOCREAT_C01_LCD_KIT_SLUG,
      productText: tLocalized("Piocreat C01 LCD Ekran Kiti", "Piocret C01 LCD Screen Kit"),
      kicker: tLocalized("Piocreat C01 · LCD Ekran Kiti", "Piocret C01 · LCD Screen Kit"),
      titleHtml: tLocalized("C01 baskı akışı <span class=\"em\">stabil ekranla</span> sürer.", "The C01 print workflow runs with a <span class=\"em\">stable screen.</span>"),
      leadHtml:
        tLocalized("Piocreat C01 3D yazıcıya özel LCD ekran kiti, baskı performansını korumaya ve üretim sürecini kesintisiz devam ettirmeye yardımcı olur. Stabil çalışma yapısı daha net ve tutarlı sonuçları destekler.", "The LCD screen kit specific to the Piocreat C01 3D printer helps preserve print performance and keep the production process running without interruption. Its stable operating structure supports clearer and more consistent results."),
      pills: [{ label: tLocalized("C01 uyumlu", "C01 compatible") }, { label: tLocalized("LCD ekran", "LCD screen") }, { label: tLocalized("Stabil baskı", "Stable printing") }, { label: tLocalized("Yedek parça", "spare parts") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/5178138f-f83b-4c0e-b48a-78f5e04be566/1080/piocreat-lcd.webp"],
      summarySubject: tLocalized("LCD ekran kiti", "LCD display kit"),
      metricTitleHtml: tLocalized("C01 için <span class=\"em\">güvenilir ekran yenileme.</span>", "<span class=\"em\">Reliable screen replacement</span> for the C01."),
      metricSideHtml: tLocalized("Piocreat C01 ekran değişiminde uyum, stabil pozlama ve üretim sürekliliği öne çıkar.", "Compatibility, stable exposure, and production continuity stand out in Piocreat C01 screen replacement."),
      metrics: [
        { name: tLocalized("Cihaz Uyumu", "Device Compatibility"), value: "C01", unit: "", tag: tLocalized("Piocreat", "Piocreat"), caption: tLocalized("Piocreat C01 3D yazıcı için LCD ekran kiti.", "LCD screen kit for the Piocreat C01 3D printer.") },
        { name: tLocalized("Parça Tipi", "Part Type"), value: "LCD", unit: "Kit", tag: tLocalized("Ekran", "Screen"), caption: tLocalized("Baskı performansını korumak için kullanılan ekran yedek parçası.", "The screen spare part used to preserve print performance.") },
        { name: tLocalized("Amaç", "Purpose"), value: "Stabil", unit: tLocalized("baskı", "print"), tag: tLocalized("Bakım", "Maintenance"), caption: tLocalized("Net ve tutarlı sonuçlar için ekran yenileme çözümü.", "A screen replacement solution for clear and consistent results.") },
      ],
      specTag: "PIOCREAT C01 · LCD KIT",
      specTitleHtml: tLocalized("Üretimi kesmeden <span class=\"em\">ekranı yenileyin.</span>", "Refresh the <span class=\"em\">screen</span> without stopping production."),
      specDescriptionHtml: tLocalized("Piocreat C01 LCD ekran kiti, cihazın baskı performansını korumak ve kararlı sonuçlar elde etmek için kullanılan yedek ekran çözümüdür.", "The Piocreat C01 LCD screen kit is a replacement screen solution used to preserve the device's print performance and achieve stable results."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("Piocreat C01", "Piocret C01") },
        { label: tLocalized("Parça", "Part"), value: tLocalized("LCD ekran kiti", "LCD display kit") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Bakım / onarım", "Maintenance / repair") },
        { label: tLocalized("Hedef", "Aim"), value: tLocalized("Stabil baskı", "Stable printing") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Yedek parça", "spare parts") },
      ],
      useCaseSideHtml: tLocalized("Piocreat C01 LCD ekran kiti, ekran kaynaklı baskı performansı düşüşlerinde üretim sürekliliğini destekler.", "The Piocreat C01 LCD screen kit supports production continuity in cases of screen-related declines in print performance."),
      useCasePhotos: [
        { title: tLocalized("C01 ekran yenileme", "C01 screen refresh"), text: tLocalized("Cihazın LCD ekranını bakım sürecinde yenilemek için.", "For replacing the device's LCD screen during maintenance."), alt: tLocalized("Piocreat C01 LCD ekran yenileme", "Piocret C01 LCD screen renewal") },
        { title: tLocalized("Stabil pozlama", "stable exposure"), text: tLocalized("Daha net ve tutarlı baskı sonuçlarını destekler.", "Supports clearer and more consistent print results."), alt: tLocalized("Piocreat C01 stabil pozlama", "Piocret C01 stable exposure") },
        { title: tLocalized("Servis kontrolü", "Service check"), text: tLocalized("Montaj sonrası test baskısı ve bağlantı kontrolü.", "Test print and connection check after installation."), alt: tLocalized("Piocreat C01 servis kontrolü", "Piocreat C01 service check") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("Piocreat C01 LCD ekran değişimi", "Piocreat C01 LCD screen replacement"), tLocalized("Baskı performansını koruma", "Preserving print performance"), tLocalized("Ekran kaynaklı üretim kesintisini azaltma", "Reducing screen-related production downtime")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Neye dikkat edilir?", "What to pay attention to?"), items: [tLocalized("Cihaz modeli satın alma öncesi doğrulanır", "The device model is verified before purchase"), tLocalized("Bağlantılar ve ekran yüzeyi temiz tutulur", "Connections and screen surface are kept clean"), tLocalized("Montaj sonrası test baskısı yapılır", "A test print is performed after installation")] },
      ],
      devicesTitle: tLocalized("Piocreat C01 ile çalışır", "Works with the Piocreat C01"),
      devicesTextHtml: tLocalized("Piocreat C01 3D yazıcı için listelenen LCD ekran kitidir. Satın alma öncesi cihaz modelini birlikte doğrulayabiliriz.", "This is the LCD screen kit listed for the Piocreat C01 3D printer. We can verify the device model together before purchase."),
      deviceChips: [{ label: tLocalized("Piocreat C01", "Piocret C01") }, { label: tLocalized("LCD ekran", "LCD screen") }, { label: tLocalized("Yedek parça", "spare parts") }, { label: tLocalized("Uyumluluk kontrolü", "Compatibility check"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("LCD değişimiyle <span class=\"em\">üretim ritmi korunur.</span>", "<span class=\"em\">Production rhythm is preserved</span> with LCD replacement."),
      ecosystemTextHtml: tLocalized("Ekran yenileme, temiz montaj ve ilk test baskısı birlikte planlandığında C01 üretim akışı daha güvenli devam eder.", "When screen renewal, clean assembly, and the first test print are planned together, the C01 production workflow continues more safely."),
      ecosystemChips: [tLocalized("LCD ekran", "LCD screen"), "C01 uyumu", tLocalized("Test baskısı", "Test print"), tLocalized("Teknik destek", "Technical support")],
      faqItems: [
        { question: tLocalized("Bu ürün hangi cihaz için?", "Which device is this product for?"), answerHtml: tLocalized("Piocreat C01 3D yazıcı için LCD ekran kiti olarak listelenir.", "Listed as an LCD screen kit for the Piocreat C01 3D printer.") },
        { question: tLocalized("Ne zaman değiştirilir?", "When is it replaced?"), answerHtml: tLocalized("Ekran kaynaklı baskı performansı düşüşü veya ekran hasarı olduğunda değişim değerlendirilir.", "Replacement is considered when there is a screen-related drop in print performance or screen damage.") },
        { question: tLocalized("Kurulum desteği var mı?", "Is installation support available?"), answerHtml: tLocalized("Cihaz modeli ve montaj adımları için teknik destek alınabilir.", "Technical support is available for the device model and assembly steps.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("C01 servis akışını <span class=\"em\">videoda görün.</span>", "<span class=\"em\">Watch the video</span> for the C01 service workflow."),
      videoSideHtml: tLocalized("Piocreat C01 ekran değişimi ve dental LCD yazıcı bakım akışını video üzerinden değerlendirin.", "Review the Piocreat C01 screen replacement and dental LCD printer maintenance workflow via video."),
      videoTitle: tLocalized("Piocreat C01 LCD ekran kiti", "Piocreat C01 LCD Ekran Kiti"),
      videoText: tLocalized("LCD ekran, pozlama ve test baskısı kontrollerine odaklanan bakım akışı.", "A maintenance workflow focused on LCD screen, exposure, and test-print checks."),
    },
    {
      slug: ACF_FEP_FILM_SLUG,
      productText: tLocalized("Şeffaf ACF Film", "Clear ACF Film"),
      kicker: tLocalized("LCD/DLP Reçine Yazıcılar · Şeffaf ACF Film", "LCD/DLP Resin Printers · Clear ACF Film"),
      titleHtml: tLocalized("Katman ayrımı <span class=\"em\">film yüzeyinde</span> başlar.", "Layer separation begins <span class=\"em\">at the film surface.</span>"),
      leadHtml:
        tLocalized("Şeffaf ACF Film, LCD ve DLP reçine 3D yazıcılarda baskı haznesinin alt yüzeyinde kullanılan sarf malzemedir. UV ışığın reçineye dengeli iletilmesini ve stabil katman oluşumunu destekler.", "Clear ACF Film is a consumable used on the bottom surface of the print vat in LCD and DLP resin 3D printers. It supports balanced transmission of UV light into the resin and stable layer formation."),
      pills: [{ label: tLocalized("LCD / DLP", "LCD/DLP") }, { label: tLocalized("ACF Film", "ACF Film") }, { label: tLocalized("Mavi koruyucu jelatin", "Blue preservative gelatin") }, { label: tLocalized("Pürüzsüz + mat yüzey", "Smooth + matte surface") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/43979b0b-5e26-4b8e-a0e1-f751a3929374/1080/acf-fep-film.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6d2e75a0-c8f4-4e2f-9d09-7811ff446084/1080/acf-fep-film1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8e64b47c-8d24-4979-9be3-cc183a94b88e/1080/acf-fep-film2.webp",
      ],
      galleryBadge: tLocalized("ACF FILM", "ACF Film"),
      summarySubject: tLocalized("ACF film", "ACF Film"),
      metricTitleHtml: tLocalized("UV geçişi ve <span class=\"em\">katman stabilitesi.</span>", "UV transmission and <span class=\"em\">layer stability.</span>"),
      metricSideHtml: tLocalized("Film yüzeyi, reçine baskıda ışık iletimi ve katman ayrımı için kritik sarf parçasıdır.", "The film surface is a critical consumable part for light transmission and layer separation in resin printing."),
      metrics: [
        { name: tLocalized("Uyum", "Compatibility"), value: "LCD", unit: "/ DLP", tag: tLocalized("Reçine", "Resin"), caption: tLocalized("LCD ve DLP teknolojisine sahip reçine 3D yazıcılarda kullanılır.", "Used in resin 3D printers with LCD and DLP technology.") },
        { name: tLocalized("Yüzey", "Surface"), value: "2", unit: "tip", tag: tLocalized("Mat + düz", "Matte + flat"), caption: tLocalized("Bir yüzeyi pürüzsüz, diğer yüzeyi mat formdadır.", "One surface is smooth, the other has a matte finish.") },
        { name: tLocalized("Koruma", "Protection"), value: "Mavi", unit: "jelatin", tag: tLocalized("Kurulum", "Setup"), caption: tLocalized("Ürün mavi koruyucu jelatin ile gönderilir; kullanım öncesi çıkarılır.", "The product is shipped with a blue protective gelatin film; remove before use.") },
      ],
      specTag: "ACF FILM · LCD / DLP · SARF",
      specTitleHtml: tLocalized("Tank tabanında <span class=\"em\">kontrollü katman oluşumu.</span>", "<span class=\"em\">Controlled layer formation</span> at the base of the tank."),
      specDescriptionHtml: tLocalized("ACF Film, UV ışığın reçineye dengeli iletilmesine yardımcı olur. Kurulumda pürüzsüz yüzeyin reçineyle temas edecek şekilde yerleştirilmesi önerilir.", "ACF Film helps transmit UV light to the resin evenly. During installation, it's recommended to position it so the smooth surface is in contact with the resin."),
      specRows: [
        { label: tLocalized("Teknoloji", "Technology"), value: tLocalized("LCD / DLP", "LCD/DLP") },
        { label: tLocalized("Parça", "Part"), value: tLocalized("Tank filmi", "tank movie") },
        { label: tLocalized("Yüzey", "Surface"), value: tLocalized("Pürüzsüz + mat", "Smooth + matte") },
        { label: tLocalized("Koruma", "Protection"), value: "Mavi jelatin" },
        { label: tLocalized("Kullanım", "Usage"), value: "Sarf malzeme" },
      ],
      useCaseSideHtml: tLocalized("Tank filmi değişimi, reçine baskıda yüzey performansı ve katman ayrımı için düzenli bakım adımıdır.", "Tank film replacement is a regular maintenance step for surface performance and layer separation in resin printing."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Tank filmi değişimi", "Tank film replacement"), text: tLocalized("Baskı haznesinin alt yüzeyinde kullanılan sarf film.", "The consumable film used on the bottom surface of the print vat."), alt: tLocalized("ACF film tank filmi değişimi", "ACF film tank film replacement") },
        { imageIndex: 3, title: tLocalized("UV ışık geçişi", "UV light transmission"), text: tLocalized("Reçineye dengeli ışık iletimini destekler.", "Supports balanced light transmission to the resin."), alt: tLocalized("ACF film UV ışık geçişi", "ACF film UV light transmission") },
        { imageIndex: 3, title: tLocalized("Yüzey kontrolü", "Surface control"), text: tLocalized("Pürüzsüz ve mat yüzey yönü kurulumda kontrol edilir.", "The smooth and matte surface orientation is checked during setup."), alt: tLocalized("ACF film yüzey kontrolü", "ACF film surface check") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("LCD/DLP reçine yazıcı tank tabanı", "LCD/DLP resin printer tank base"), tLocalized("Stabil katman oluşumu", "Stable layer formation"), tLocalized("UV ışık iletiminin korunması", "Preservation of UV light transmission")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Nasıl yerleştirilir?", "How is it positioned?"), items: [tLocalized("Mavi koruyucu jelatin kullanım öncesi çıkarılır", "The blue protective film is removed before use"), tLocalized("Pürüzsüz yüzey reçineyle temas edecek şekilde yerleştirilir", "The smooth surface is positioned to be in contact with the resin"), tLocalized("Film gerginliği ve tank temizliği kontrol edilir", "Film tension and tank cleanliness are checked")] },
      ],
      devicesTitle: tLocalized("LCD & DLP reçine yazıcılarla çalışır", "Works with LCD & DLP resin printers"),
      devicesTextHtml: tLocalized("LCD ve DLP teknolojisine sahip reçine 3D yazıcılarda tank filmi olarak kullanılır. Ölçü ve tank uyumunu satın alma öncesi kontrol edin.", "Used as tank film in resin 3D printers with LCD and DLP technology. Check the dimensions and tank compatibility before purchasing."),
      deviceChips: [{ label: tLocalized("LCD reçine yazıcı", "LCD resin printer") }, { label: tLocalized("DLP reçine yazıcı", "DLP resin printer") }, { label: tLocalized("Tank filmi", "tank movie") }, { label: tLocalized("Ölçü kontrolü", "Dimensional control"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Film değişimi, <span class=\"em\">baskı güvenilirliğini korur.</span>", "Film replacement <span class=\"em\">preserves print reliability.</span>"),
      ecosystemTextHtml: tLocalized("Tank filmi, reçine tankı, LCD ekran yüzeyi ve pozlama ayarı birlikte kontrol edildiğinde baskı hataları daha kolay azaltılır.", "When the tank film, resin tank, LCD screen surface, and exposure setting are checked together, print errors are more easily reduced."),
      ecosystemChips: [tLocalized("ACF Film", "ACF Film"), tLocalized("Reçine tankı", "Resin tank"), tLocalized("LCD ekran", "LCD screen"), "Pozlama testi"],
      faqItems: [
        { question: tLocalized("ACF Film nerede kullanılır?", "Where is ACF Film used?"), answerHtml: tLocalized("LCD ve DLP reçine 3D yazıcılarda baskı haznesinin alt yüzeyinde kullanılır.", "Used on the underside of the build tank in LCD and DLP resin 3D printers.") },
        { question: tLocalized("Koruyucu jelatin çıkarılmalı mı?", "Should the protective film be removed?"), answerHtml: tLocalized("Evet. Ürün mavi koruyucu jelatinle gönderilir ve kullanım öncesi jelatin çıkarılmalıdır.", "Yes. The product is shipped with a blue protective gelatin coating, which must be removed before use.") },
        { question: tLocalized("Hangi yüzey reçineyle temas etmeli?", "Which surface should be in contact with the resin?"), answerHtml: tLocalized("Kurulum sırasında pürüzsüz yüzeyin reçine ile temas edecek şekilde yerleştirilmesi önerilir.", "During installation, it is recommended to position the smooth surface so that it makes contact with the resin.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("Film bakım akışını <span class=\"em\">videoda görün.</span>", "See the film maintenance workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("LCD/DLP reçine yazıcılarda tank filmi ve baskı bakım akışını video üzerinden değerlendirin.", "Review the tank film and print maintenance workflow for LCD/DLP resin printers via video."),
      videoTitle: tLocalized("ACF Film ve reçine tankı bakım akışı", "ACF Film and resin tank maintenance workflow"),
      videoText: tLocalized("Tank filmi, yüzey yönü ve baskı stabilitesi kontrollerine odaklanan bakım içeriği.", "Maintenance content focused on tank film, surface orientation, and print stability checks."),
    },
    {
      slug: MASH_P16L_MAINBOARD_SLUG,
      productText: tLocalized("MASH P16L Ana Kart", "MASH P16L Main Board"),
      kicker: tLocalized("MASH P16L · Kontrol Kartı", "MASH P16L · Control Board"),
      titleHtml: tLocalized("P16L kontrolü <span class=\"em\">ana kartta</span> birleşir.", "P16L control is unified <span class=\"em\">on the mainboard.</span>"),
      leadHtml:
        tLocalized("MASH P16L Ana Kart, cihazın elektronik kontrol süreçlerini yöneten merkezi bileşendir. Motor kontrolü, sensör yönetimi ve veri iletişimi gibi kritik görevlerde bakım ve onarım amacıyla kullanılır.", "The MASH P16L Mainboard is the central component that manages the device's electronic control processes. It is used for maintenance and repair purposes in critical tasks such as motor control, sensor management, and data communication."),
      pills: [{ label: tLocalized("MASH P16L uyumlu", "MASH P16L compatible") }, { label: tLocalized("Kontrol kartı", "Control board") }, { label: tLocalized("Motor & sensör yönetimi", "Motor & sensor management") }, { label: tLocalized("Bakım / onarım", "Maintenance / repair") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c9594235-74c3-4f06-9b83-84028ecc7716/1080/mash-p16l-ana-kart-kontrol-karti.webp"],
      summarySubject: tLocalized("ana kart", "Ana kart"),
      metricTitleHtml: tLocalized("Elektronik kontrolün <span class=\"em\">merkezi parçası.</span>", "The <span class=\"em\">central component</span> of the electronic control."),
      metricSideHtml: tLocalized("Ana kart değişiminde cihaz revizyonu, bağlantılar ve servis kurulumu kritik kontrollerdir.", "In a mainboard replacement, device revision, connections, and service setup are critical checks."),
      metrics: [
        { name: tLocalized("Parça Tipi", "Part Type"), value: "Ana", unit: "Kart", tag: tLocalized("Kontrol", "Control"), caption: tLocalized("P16L cihazının merkezi elektronik kontrol bileşeni.", "The central electronic control component of the P16L device.") },
        { name: tLocalized("Görev", "Task"), value: "Motor", unit: tLocalized("+ sensör", "+ sensor"), tag: tLocalized("I/O", "I/O"), caption: tLocalized("Motor kontrolü, sensör yönetimi ve veri iletişimi süreçlerini yönetir.", "Manages motor control, sensor management, and data communication processes.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Bakım", "Maintenance"), unit: tLocalized("/ onarım", "/ repair"), tag: tLocalized("Servis", "Service"), caption: tLocalized("Teknik servis, bakım ve arıza durumlarında değişim amacıyla kullanılır.", "Used for replacement during technical service, maintenance, and malfunction situations.") },
      ],
      specTag: "MASH P16L · MAINBOARD · SERVICE",
      specTitleHtml: tLocalized("Motor, sensör ve iletişim <span class=\"em\">tek kartta.</span>", "Motor, sensor, and communication <span class=\"em\">on a single board.</span>"),
      specDescriptionHtml: tLocalized("MASH P16L Ana Kart, cihazın farklı bileşenleriyle modüler şekilde çalışır. Değişim öncesi arıza teşhisi ve bağlantı uyumu kontrol edilmelidir.", "The MASH P16L Mainboard works modularly with the device's various components. Before replacement, fault diagnosis and connection compatibility should be checked."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Parça", "Part"), value: tLocalized("Ana kart", "main board") },
        { label: tLocalized("Görev", "Task"), value: tLocalized("Kontrol yönetimi", "Control management") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Bakım / onarım", "Maintenance / repair") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Yedek parça", "spare parts") },
      ],
      useCaseSideHtml: tLocalized("Ana kart değişimi, elektronik kontrol ve bağlantı kaynaklı servis süreçlerinde değerlendirilir.", "Mainboard replacement is assessed in service processes caused by electronics checks and connections."),
      useCasePhotos: [
        { title: tLocalized("Elektronik kontrol", "electronic control"), text: tLocalized("Motor, sensör ve veri iletişimi süreçlerinin merkezi.", "The center of motor, sensor, and data communication processes."), alt: tLocalized("MASH P16L ana kart elektronik kontrol", "MASH P16L main board electronic control") },
        { title: tLocalized("Servis değişimi", "Service replacement"), text: tLocalized("Arıza teşhisi sonrası bakım/onarım için kullanılır.", "Used for maintenance/repair after fault diagnosis."), alt: tLocalized("MASH P16L ana kart servis değişimi", "MASH P16L mainboard service replacement") },
        { title: tLocalized("Bağlantı kontrolü", "Connection check"), text: tLocalized("Modüler bağlantı noktaları montajda doğrulanır.", "The modular connection points are verified during assembly."), alt: tLocalized("MASH P16L ana kart bağlantı kontrolü", "MASH P16L mainboard connection check") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne zaman değerlendirilir?", "When is it evaluated?"), items: [tLocalized("Elektronik kontrol arızalarında", "In case of electronic control faults"), tLocalized("Motor veya sensör yönetimi hatalarında", "For motor or sensor management errors"), tLocalized("Teknik servis bakım/onarım sürecinde", "During technical service maintenance/repair")] },
        { eyebrow: tLocalized("Servis Notu", "Service Note"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: [tLocalized("Cihaz revizyonu ve kart uyumu", "Device revision and board compatibility"), tLocalized("Kablo/soket bağlantıları", "Cable/socket connections"), tLocalized("Değişim sonrası hareket ve sensör testleri", "Movement and sensor tests after replacement")] },
      ],
      devicesTitle: tLocalized("MASH P16L ile çalışır", "Works with the MASH P16L"),
      devicesTextHtml: tLocalized("MASH P16L cihazının ana kontrol kartıdır. Değişim öncesi arıza belirtisini ve cihaz revizyonunu birlikte kontrol etmek gerekir.", "It is the main control board of the MASH P16L device. Before replacement, the fault symptoms and the device revision should be checked together."),
      deviceChips: [{ label: tLocalized("MASH P16L", "MASH P16L") }, { label: tLocalized("Ana kart", "main board") }, { label: tLocalized("Motor / sensör", "Motor / sensor") }, { label: tLocalized("Servis kontrolü", "Service check"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Ana kart değişimi, <span class=\"em\">servis teşhisiyle</span> yapılmalı.", "The mainboard replacement should be done <span class=\"em\">with a service diagnosis.</span>"),
      ecosystemTextHtml: tLocalized("Kontrol kartı değişiminde güç bağlantısı, motor çıkışları, sensör girişleri ve ilk çalışma testi birlikte ele alınır.", "During control board replacement, the power connection, motor outputs, sensor inputs, and initial run test are all handled together."),
      ecosystemChips: [tLocalized("Ana kart", "main board"), tLocalized("Bağlantı kontrolü", "Connection check"), tLocalized("Sensör testi", "Sensor test"), tLocalized("Teknik servis", "Technical service")],
      faqItems: [
        { question: tLocalized("MASH P16L Ana Kart ne işe yarar?", "What does the MASH P16L Mainboard do?"), answerHtml: tLocalized("Cihazın elektronik kontrol süreçlerini yöneten merkezi bileşendir.", "It is the central component that manages the device's electronic control processes.") },
        { question: tLocalized("Hangi durumlarda değiştirilir?", "In which situations is it replaced?"), answerHtml: tLocalized("Teknik servis, bakım ve arıza durumlarında değişim amacıyla kullanılabilir.", "Can be used for replacement during technical service, maintenance, and malfunction situations.") },
        { question: tLocalized("Satın almadan önce ne kontrol edilmeli?", "What should be checked before purchasing?"), answerHtml: tLocalized("Cihaz modeli, arıza belirtisi ve kart bağlantı uyumu kontrol edilmelidir.", "The device model, fault symptom, and board connection compatibility should be checked.") },
      ],
      videoTitleHtml: tLocalized("Ana kart değişimini <span class=\"em\">uzmanla planlayın.</span>", "<span class=\"em\">Plan the mainboard replacement with an expert.</span>"),
      videoSideHtml: tLocalized("Ana kart değişimi için arıza belirtisini ve bağlantı uyumunu birlikte değerlendirelim.", "Let's evaluate the fault symptom and connection compatibility together for the mainboard replacement."),
      videoTitle: tLocalized("MASH P16L ana kart teknik destek", "MASH P16L mainboard technical support"),
      videoText: tLocalized("Kontrol kartı değişimi, bağlantı kontrolü ve servis adımları için teknik destek alın.", "Get technical support for control board replacement, connection checks, and service steps."),
    },
    {
      slug: MASH_P16L_LARGE_BUILD_PLATE_SLUG,
      productText: tLocalized("MASH P16L Büyük Baskı Tablası", "MASH P16L Large Build Plate"),
      kicker: tLocalized("MASH P16L · 211x118 mm Büyük Baskı Tablası", "MASH P16L · 211x118 mm Large Build Plate"),
      titleHtml: tLocalized("Yüksek hacimli üretim <span class=\"em\">standart tabla</span> ile akar.", "High-volume production flows with a <span class=\"em\">standard tray.</span>"),
      leadHtml:
        tLocalized("MASH P16L 3D yazıcının standart baskı tablası, yüksek hacimli dental üretimlerde stabilite ve yüzey kalitesi için tasarlanmıştır. 385 nm ışık kaynağıyla optimize edilmiş 211x118 mm baskı alanı sunar.", "The standard build plate of the MASH P16L 3D printer is designed for stability and surface quality in high-volume dental production. It offers a 211x118 mm build area optimized for the 385 nm light source."),
      pills: [{ value: "211x118", label: tLocalized("mm baskı alanı", "mm print area") }, { value: "385", label: tLocalized("nm uyumlu", "nm compatible") }, { label: tLocalized("Büyük tabla", "Large plate") }, { label: tLocalized("Dental üretim", "Dental production") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/588256f3-53a6-4f64-99ed-5428c3bbcaca/1080/masp16l-tabla.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a225b4ad-bd60-42e5-80da-6df960d9604f/1080/mash-p16l-building-plate.webp",
      ],
      galleryBadge: tLocalized("211x118 mm", "211x118mm"),
      summarySubject: tLocalized("büyük baskı tablası", "large print tray"),
      metricTitleHtml: tLocalized("Geniş alanda <span class=\"em\">stabil tutunma.</span>", "<span class=\"em\">Stable adhesion</span> over a wide area."),
      metricSideHtml: tLocalized("Baskı tablasında yüzey tutunması, ölçü ve 385 nm P16L uyumu birlikte değerlendirilir.", "Surface adhesion, measurements, and 385 nm P16L compatibility are evaluated together on the print platform."),
      metrics: [
        { name: tLocalized("Baskı Alanı", "Build Volume"), value: "211x118", unit: "mm", tag: tLocalized("P16L", "P16L"), caption: tLocalized("Tek seferde çok sayıda dental restorasyon üretimi için geniş tabla alanı.", "A large build platform for producing multiple dental restorations at once.") },
        { name: tLocalized("Işık Uyumu", "Light Compatibility"), value: "385", unit: "nm", tag: tLocalized("P16L", "P16L"), caption: tLocalized("MASH P16L 385 nm ışık sistemiyle optimize edilmiş yapı.", "A structure optimized for the MASH P16L 385 nm light system.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Yüksek", "High"), unit: "hacim", tag: tLocalized("Dental", "dental"), caption: tLocalized("Yoğun laboratuvar üretiminde stabil baskı akışını destekler.", "Supports a stable print flow in high-volume laboratory production.") },
      ],
      specTag: "MASH P16L · BUILD PLATE · 211x118 mm",
      specTitleHtml: tLocalized("Çoklu vaka üretiminde <span class=\"em\">geniş yüzey.</span>", "<span class=\"em\">Large surface</span> for multi-case production."),
      specDescriptionHtml: tLocalized("Büyük baskı tablası, MASH P16L ile yüksek hacimli dental üretimlerde yüzey tutunması ve boyutsal doğruluğu desteklemek için kullanılır.", "The large build plate is used with the MASH P16L to support surface adhesion and dimensional accuracy in high-volume dental production."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Ölçü", "Measurement"), value: tLocalized("211x118 mm", "211x118mm") },
        { label: tLocalized("Işık sistemi", "Light system"), value: tLocalized("385 nm", "385nm") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Yüksek hacim", "High volume") },
        { label: tLocalized("Parça", "Part"), value: tLocalized("Baskı tablası", "Print platform") },
      ],
      useCaseSideHtml: tLocalized("Büyük baskı tablası, yüksek hacimli dental üretim ve çoklu restorasyon baskıları için kullanılır.", "The large build plate is used for high-volume dental production and multi-restoration prints."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Çoklu üretim", "Multiple production"), text: tLocalized("Aynı baskıda daha fazla dental parça için geniş alan.", "A large area for more dental parts in the same print."), alt: tLocalized("MASH P16L büyük baskı tablası çoklu üretim", "MASH P16L large build plate multi-part production") },
        { imageIndex: 2, title: tLocalized("Yüzey tutunması", "Surface adhesion"), text: tLocalized("Baskı sırasında stabil tutunma ve güvenli ayrılma.", "Stable adhesion and safe release during printing."), alt: tLocalized("MASH P16L büyük baskı tablası yüzey tutunması", "MASH P16L large build plate surface adhesion") },
        { imageIndex: 2, title: tLocalized("Laboratuvar akışı", "Laboratory workflow"), text: tLocalized("Yoğun üretimde standart tabla ritmini korur.", "Maintains standard tray rhythm in intensive production."), alt: tLocalized("MASH P16L büyük baskı tablası laboratuvar akışı", "MASH P16L large build plate laboratory workflow") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("Çoklu dental restorasyon baskıları", "Multiple dental restoration prints"), tLocalized("Yüksek hacimli laboratuvar üretimi", "High-volume laboratory production"), tLocalized("Standart P16L tabla değişimi", "Standard P16L platform replacement")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: [tLocalized("Tabla yüzeyi temizliği", "Platform surface cleaning"), "Platform hizalama/kalibrasyon", tLocalized("İlk baskıda tutunma davranışı", "First-print adhesion behavior")] },
      ],
      devicesTitle: tLocalized("MASH P16L ile çalışır", "Works with the MASH P16L"),
      devicesTextHtml: tLocalized("MASH P16L 385 nm dental 3D yazıcının büyük/standart baskı tablasıdır. Tabla yüzeyi ve hizalama ayarı kurulumda birlikte kontrol edilmelidir.", "It is the large/standard build plate of the MASH P16L 385 nm dental 3D printer. The plate surface and alignment setting should be checked together during installation."),
      deviceChips: [{ label: tLocalized("MASH P16L", "MASH P16L") }, { label: tLocalized("211x118 mm", "211x118mm") }, { label: tLocalized("385 nm", "385nm") }, { label: tLocalized("Tabla kalibrasyonu", "Table calibration"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Tabla yüzeyi, <span class=\"em\">baskı başarısını belirler.</span>", "Platform surface <span class=\"em\">determines print success.</span>"),
      ecosystemTextHtml: tLocalized("Baskı tablası, reçine tankı, ACF/FEP filmi ve ilk katman ayarları birlikte değerlendirildiğinde üretim güvenilirliği artar.", "Production reliability increases when the print platform, resin tank, ACF/FEP film, and first-layer settings are evaluated together."),
      ecosystemChips: [tLocalized("Baskı tablası", "Print platform"), tLocalized("Reçine tankı", "Resin tank"), tLocalized("ACF Film", "ACF Film"), tLocalized("İlk katman", "First layer")],
      faqItems: [
        { question: tLocalized("Ölçüsü nedir?", "What is its size?"), answerHtml: tLocalized("MASH P16L büyük baskı tablası 211x118 mm baskı alanı için listelenir.", "The MASH P16L large build plate is listed for a 211x118 mm build area.") },
        { question: tLocalized("Hangi cihazla uyumlu?", "Which device is it compatible with?"), answerHtml: tLocalized("MASH P16L 385 nm dental 3D yazıcıyla uyumludur.", "It is compatible with the MASH P16L 385 nm dental 3D printer.") },
        { question: tLocalized("Kurulum sonrası ne yapılmalı?", "What should be done after installation?"), answerHtml: tLocalized("Platform hizalaması ve ilk test baskısı kontrol edilmelidir.", "Platform alignment and the first test print should be checked.") },
      ],
      videoTitleHtml: 'Tabla kurulumunu <span class="em">uzmanla kontrol edin.</span>',
      videoSideHtml: tLocalized("Baskı tablası değişimi ve ilk katman ayarı için teknik destek alın.", "Get technical support for print platform replacement and first-layer setup."),
      videoTitle: tLocalized("MASH P16L büyük baskı tablası kurulumu", "MASH P16L large build plate installation"),
      videoText: tLocalized("Tabla yüzeyi, hizalama ve test baskısı adımlarını birlikte netleştirin.", "Clarify the platform surface, alignment, and test print steps together."),
    },
    {
      slug: MASH_P16L_SMALL_BUILD_PLATE_SLUG,
      productText: tLocalized("MASH P16L Küçük Baskı Tablası", "MASH P16L Small Build Plate"),
      kicker: tLocalized("MASH P16L · Hızlı Baskı & Tekli Vaka Tablası", "MASH P16L · Fast Printing & Single Case Plate"),
      titleHtml: tLocalized("Acil vaka için <span class=\"em\">küçük tabla</span> hız kazandırır.", "For urgent cases, the <span class=\"em\">small platform</span> adds speed."),
      leadHtml:
        tLocalized("MASH P16L Küçük Baskı Tablası, 385 nm ışık sistemiyle uyumludur. Acil vakalar ve tekli üye üretimleri için optimize edilmiş yüzey alanı, emiş gücünü azaltarak hassas dental parçalarda hız ve başarı oranını destekler.", "The MASH P16L Small Build Plate is compatible with the 385 nm light system. Its surface area, optimized for urgent cases and single-unit production, reduces suction force and supports speed and success rate for precise dental parts."),
      pills: [{ label: tLocalized("Tekli vaka", "single case") }, { label: tLocalized("Hızlı baskı", "Fast printing") }, { value: "385", label: tLocalized("nm uyumlu", "nm compatible") }, { label: tLocalized("Düşük emiş gücü", "Low suction power") }],
      images: [
        tLocalized("https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp", "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/054c5d66-5ea4-4cc9-a177-35c74d54798a/1080/mash-p16l-kucuk-baski-tablasi.webp"),
        tLocalized("https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c03e04d3-c93b-4d75-b3a0-867bcf4706b9/1080/mash-p16l-kucuk-baski-tablasi.webp", "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c03e04d3-c93b-4d75-b3a0-867bcf4706b9/1080/mash-p16l-kucuk-baski-tablasi.webp"),
        tLocalized("https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/838e703c-5e9f-43be-9c56-bf912454a660/1080/mash-p16l-kucuk-baski-tablasi.webp", "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/838e703c-5e9f-43be-9c56-bf912454a660/1080/mash-p16l-kucuk-baski-tablasi.webp"),
      ],
      galleryBadge: "FAST PLATE",
      summarySubject: tLocalized("küçük baskı tablası", "small print tray"),
      metricTitleHtml: tLocalized("Tekli vakada <span class=\"em\">hızlı ve kontrollü</span> baskı.", "<span class=\"em\">Fast and controlled</span> printing for single cases."),
      metricSideHtml: tLocalized("Küçük tabla, acil dental vakalarda yüzey alanını azaltarak baskı sürecini hızlandırmaya odaklanır.", "The small plate focuses on speeding up the printing process by reducing surface area in urgent dental cases."),
      metrics: [
        { name: tLocalized("Kullanım", "Usage"), value: "Tekli", unit: "vaka", tag: tLocalized("Hızlı", "Fast"), caption: tLocalized("Acil vakalar ve tekli üye üretimleri için optimize edilmiştir.", "Optimized for urgent cases and single-unit production.") },
        { name: tLocalized("Işık Uyumu", "Light Compatibility"), value: "385", unit: "nm", tag: tLocalized("P16L", "P16L"), caption: tLocalized("MASH P16L 385 nm ışık sistemiyle tam uyumlu yapı.", "A structure fully compatible with the MASH P16L 385 nm light system.") },
        { name: tLocalized("Baskı Davranışı", "Print Behavior"), value: tLocalized("Düşük", "Low"), unit: tLocalized("emiş", "suction"), tag: tLocalized("Kontrol", "Control"), caption: tLocalized("Küçük yüzey alanı, baskı sırasındaki emiş gücünü azaltmaya yardımcı olur.", "The small surface area helps reduce suction force during printing.") },
      ],
      specTag: "MASH P16L · FAST BUILD PLATE",
      specTitleHtml: tLocalized("Acil üretimde <span class=\"em\">küçük yüzey avantajı.</span>", "The <span class=\"em\">small-surface advantage</span> in urgent production."),
      specDescriptionHtml: tLocalized("Küçük baskı tablası, tekli üye ve acil dental üretimlerde hızlı iş akışı için kullanılır. Daha küçük yüzey alanı emiş gücünü azaltmaya yardımcı olur.", "The small build plate is used for a fast workflow in single-unit and urgent dental production. Its smaller surface area helps reduce suction force."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Işık sistemi", "Light system"), value: tLocalized("385 nm", "385nm") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Tekli vaka", "single case") },
        { label: tLocalized("Avantaj", "Advantage"), value: tLocalized("Hızlı baskı", "Fast printing") },
        { label: tLocalized("Parça", "Part"), value: tLocalized("Baskı tablası", "Print platform") },
      ],
      useCaseSideHtml: tLocalized("Küçük baskı tablası, acil tekli vakalarda baskı süresini ve emiş davranışını yönetmek için kullanılır.", "The small build plate is used to manage print time and suction behavior in urgent single-unit cases."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Tekli vaka", "single case"), text: tLocalized("Acil dental üretimlerde küçük yüzeyle hızlı iş akışı.", "A fast workflow with a small surface for urgent dental production."), alt: tLocalized("MASH P16L küçük baskı tablası tekli vaka", "MASH P16L small build plate single case") },
        { imageIndex: 3, title: tLocalized("Hassas parçalar", "Precise parts"), text: tLocalized("Daha kontrollü emiş davranışı hassas baskıları destekler.", "More controlled suction behavior supports precise prints."), alt: tLocalized("MASH P16L küçük baskı tablası hassas parçalar", "MASH P16L small build plate precise parts") },
        { imageIndex: 3, title: tLocalized("Hızlı değişim", "Quick change"), text: tLocalized("Tekli üretim için pratik tabla kullanımı.", "Practical platform use for single-unit production."), alt: tLocalized("MASH P16L küçük baskı tablası hızlı değişim", "MASH P16L small build plate quick change") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("Acil tekli vaka üretimi", "Urgent single-case production"), tLocalized("Tekli üye ve küçük dental parçalar", "Single units and small dental parts"), tLocalized("Baskı sırasında emiş gücünü azaltma", "Reducing suction force during printing")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: [tLocalized("Tabla yüzeyi temizliği", "Platform surface cleaning"), tLocalized("Platform hizalama ayarı", "Platform alignment setting"), tLocalized("İlk katman tutunma davranışı", "First-layer adhesion behavior")] },
      ],
      devicesTitle: tLocalized("MASH P16L ile çalışır", "Works with the MASH P16L"),
      devicesTextHtml: tLocalized("MASH P16L 385 nm cihazda tekli ve hızlı dental üretim için kullanılan küçük baskı tablasıdır.", "It is the small build plate used on the MASH P16L 385 nm device for single-unit and fast dental production."),
      deviceChips: [{ label: tLocalized("MASH P16L", "MASH P16L") }, { label: tLocalized("Tekli vaka", "single case") }, { label: tLocalized("385 nm", "385nm") }, { label: tLocalized("Hızlı iş akışı", "Fast workflow"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Küçük tabla, <span class=\"em\">acil vaka akışını</span> hızlandırır.", "The small plate speeds up the <span class=\"em\">urgent-case workflow.</span>"),
      ecosystemTextHtml: tLocalized("Tekli vaka üretiminde tabla yüzeyi, reçine, tank filmi ve ilk katman ayarı birlikte kontrol edilmelidir.", "Platform surface, resin, tank film, and first-layer settings should be checked together in single-case production."),
      ecosystemChips: [tLocalized("Küçük tabla", "Small plate"), tLocalized("Tekli vaka", "single case"), tLocalized("İlk katman", "First layer"), tLocalized("Teknik destek", "Technical support")],
      faqItems: [
        { question: tLocalized("Küçük baskı tablası ne için kullanılır?", "What is the small build plate used for?"), answerHtml: tLocalized("Acil vakalar ve tekli üye üretimleri için optimize edilmiş MASH P16L baskı tablasıdır.", "The MASH P16L print platform is optimized for urgent cases and single-unit production.") },
        { question: tLocalized("385 nm ile uyumlu mu?", "Is it compatible with 385 nm?"), answerHtml: tLocalized("Evet. MASH P16L 385 nm ışık sistemiyle uyumlu olarak listelenir.", "Yes. It is listed as compatible with the MASH P16L 385 nm light system.") },
        { question: tLocalized("Neden küçük tabla tercih edilir?", "Why is a small build platform preferred?"), answerHtml: tLocalized("Küçültülmüş yüzey alanı emiş gücünü azaltmaya ve hızlı tekli üretimi desteklemeye yardımcı olur.", "The reduced surface area helps lower suction force and supports fast single-unit production.") },
      ],
      videoTitleHtml: tLocalized("Tekli vaka akışını <span class=\"em\">uzmanla planlayın.</span>", "<span class=\"em\">Plan your single-case workflow with an expert.</span>"),
      videoSideHtml: tLocalized("Küçük tabla kurulumu ve hızlı baskı parametreleri için teknik destek alın.", "Get technical support for small-plate setup and fast-print parameters."),
      videoTitle: tLocalized("MASH P16L küçük baskı tablası kurulumu", "MASH P16L small build plate installation"),
      videoText: tLocalized("Tekli vaka, platform hizalama ve ilk katman kontrolünü birlikte netleştirin.", "Clarify the single case, platform alignment, and first-layer check together."),
    },
    {
      slug: MASH_P16L_LCD_SCREEN_SLUG,
      productText: tLocalized("MASH P16L 16K Monokrom LCD Ekran", "MASH P16L 16K Monochrome LCD Display"),
      kicker: tLocalized("MASH P16L · 16K UHD Monokrom LCD", "MASH P16L 16K UHD Monochrome LCD"),
      titleHtml: tLocalized("16K detay seviyesi <span class=\"em\">LCD ekranda</span> başlar.", "16K-level detail starts <span class=\"em\">with the LCD screen</span>."),
      leadHtml:
        tLocalized("MASH P16L 16K UHD Monokrom LCD ekran, 385 nm UV ışık kaynağıyla senkronize çalışır. %12 artırılmış ışık geçirgenliği, 14x19 mikron hassasiyet ve 100°C ısı direnciyle dental üretimde yüksek detay seviyesini destekler.", "The MASH P16L 16K UHD Monochrome LCD screen works in sync with the 385 nm UV light source. With 12% increased light transmittance, 14x19 micron precision, and 100°C heat resistance, it supports a high level of detail in dental production."),
      pills: [{ value: tLocalized("16K", "16K"), label: tLocalized("UHD Mono LCD", "UHD Mono LCD") }, { value: tLocalized("9.6 inç", "9.6 inches"), label: "ekran" }, { value: tLocalized("14x19 μm", "14x19μm"), label: "hassasiyet" }, { value: "100°C", label: tLocalized("ısı direnci", "heat resistance") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/25a9f313-f298-4a05-98ff-1a5ec1773515/1080/mashp16l-lcd-ekran.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0aff5337-c988-4acc-9085-c7273a837969/1080/mashp16l-lcd-ekran3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b171da53-9384-42d2-9df4-732bb10db40f/1080/mashp16l-lcd-ekran2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/93ac1e20-8bc4-457b-af02-0ccc2a1c773c/1080/mashp16l-lcd-ekran1.webp",
      ],
      galleryBadge: tLocalized("16K UHD", "16K UHD"),
      summarySubject: "16K LCD ekran",
      metricTitleHtml: tLocalized("Mikron detay için <span class=\"em\">16K monokrom LCD.</span>", "A <span class=\"em\">16K monochrome LCD</span> for micron-level detail."),
      metricSideHtml: tLocalized("P16L ekran değişiminde çözünürlük, ışık geçirgenliği ve 385 nm uyumu kritik teknik değerlerdir.", "Resolution, light transmission, and 385 nm compatibility are critical technical values in P16L screen replacement."),
      metrics: [
        { name: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("16K", "16K"), unit: "UHD", tag: tLocalized("Mono LCD", "Mono LCD"), caption: tLocalized("Dental restorasyonlarda yüksek detay aktarımı için monokrom LCD ekran.", "Monochrome LCD screen for high detail transfer in dental restorations.") },
        { name: tLocalized("Hassasiyet", "Accuracy"), value: "14x19", unit: "μm", tag: tLocalized("Piksel", "pixel"), caption: tLocalized("Mikroskobik doğruluk ve yüzey kalitesini destekleyen piksel hassasiyeti.", "Pixel precision supporting microscopic accuracy and surface quality.") },
        { name: tLocalized("Isı Direnci", "Heat Resistance"), value: "100", unit: "°C", tag: "LCD", caption: tLocalized("Dental üretim sürecinde ısıya dayanıklı ekran yapısı.", "Heat-resistant screen structure for the dental production process.") },
      ],
      specTag: tLocalized("MASH P16L · 16K LCD · 385 nm", "MASH P16L 16K LCD 385 nm"),
      specTitleHtml: tLocalized("Yüksek geçirgenlik, <span class=\"em\">net yüzey kalitesi.</span>", "High permeability, <span class=\"em\">clear surface quality.</span>"),
      specDescriptionHtml: tLocalized("%12 artırılmış ışık geçirgenliği ve 385 nm UV ışık uyumu, MASH P16L ekran değişiminde detay ve yüzey kalitesini destekler.", "12% increased light transmittance and 385 nm UV light compatibility support detail and surface quality in the MASH P16L screen replacement."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Ekran", "Screen"), value: "16K UHD Mono LCD" },
        { label: tLocalized("Boyut", "Dimension"), value: tLocalized("9.6 inç", "9.6 inches") },
        { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("14x19 μm", "14x19μm") },
        { label: tLocalized("Işık", "Light"), value: tLocalized("385 nm", "385nm") },
      ],
      useCaseSideHtml: tLocalized("P16L 16K LCD ekran, dental üretimde yüksek detay ve stabil pozlama için kullanılan ana yedek parçadır.", "The P16L 16K LCD screen is the main spare part used for high detail and stable exposure in dental production."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("16K ekran değişimi", "16K screen replacement"), text: tLocalized("Yüksek detay seviyesi için LCD ekran yenileme.", "LCD screen refresh for a high level of detail."), alt: tLocalized("MASH P16L 16K LCD ekran değişimi", "MASH P16L 16K LCD screen replacement") },
        { imageIndex: 3, title: tLocalized("Dental hassasiyet", "dental sensitivity"), text: tLocalized("14x19 mikron detay seviyesini destekler.", "Supports a 14x19 micron level of detail."), alt: tLocalized("MASH P16L 16K dental hassasiyet", "MASH P16L 16K dental precision") },
        { imageIndex: 4, title: tLocalized("Pozlama stabilitesi", "Exposure stability"), text: tLocalized("385 nm ışık sistemiyle senkronize çalışma.", "Works in sync with the 385 nm light system."), alt: tLocalized("MASH P16L LCD pozlama stabilitesi", "MASH P16L LCD exposure stability") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("P16L LCD ekran değişimi", "P16L LCD screen replacement"), tLocalized("Dental restorasyonlarda yüksek detay üretimi", "High-detail production in dental restorations"), tLocalized("Ekran kaynaklı pozlama kaybını gidermek", "Fixing screen-related exposure loss")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: [tLocalized("Ekran yüzeyi ve bağlantı soketleri", "Screen surface and connection sockets"), tLocalized("385 nm ışık kaynağı ve pozlama testi", "385 nm light source and exposure test"), tLocalized("Reçine tankı filmi ve ilk test baskısı", "Resin tank film and first test print")] },
      ],
      devicesTitle: tLocalized("MASH P16L ile çalışır", "Works with the MASH P16L"),
      devicesTextHtml: tLocalized("MASH P16L 385 nm 16K dental 3D yazıcı için monokrom LCD ekran yedek parçasıdır.", "It is a monochrome LCD screen replacement part for the MASH P16L 385 nm 16K dental 3D printer."),
      deviceChips: [{ label: tLocalized("MASH P16L", "MASH P16L") }, { label: tLocalized("16K UHD", "16K UHD") }, { label: tLocalized("385 nm", "385nm") }, { label: tLocalized("14x19 μm", "14x19μm"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Ekran, tank filmi ve pozlama <span class=\"em\">birlikte kontrol edilir.</span>", "The screen, tank film, and exposure <span class=\"em\">are checked together.</span>"),
      ecosystemTextHtml: tLocalized("LCD ekran değişiminden sonra ACF/FEP film, reçine tankı, ekran yüzeyi ve test pozlaması birlikte kontrol edildiğinde detay seviyesi korunur.", "The level of detail is preserved when the ACF/FEP film, resin tank, screen surface, and test exposure are checked together after replacing the LCD screen."),
      ecosystemChips: [tLocalized("16K LCD", "16K LCD"), tLocalized("ACF Film", "ACF Film"), tLocalized("Reçine tankı", "Resin tank"), "Pozlama testi"],
      faqItems: [
        { question: tLocalized("Ekran boyutu nedir?", "What is the screen size?"), answerHtml: tLocalized("MASH P16L 16K monokrom LCD ekran 9.6 inç olarak listelenir.", "The MASH P16L 16K monochrome LCD screen is listed as 9.6 inches.") },
        { question: tLocalized("Hangi ışık sistemiyle uyumlu?", "Which light system is it compatible with?"), answerHtml: tLocalized("385 nm UV ışık kaynağı ile uyumlu çalışır.", "Works compatibly with a 385 nm UV light source.") },
        { question: tLocalized("Isı direnci nedir?", "What is the heat resistance?"), answerHtml: tLocalized("Ürün açıklamasında 100°C ısı dirençli LCD ekran olarak belirtilir.", "Stated in the product description as a heat-resistant LCD screen rated up to 100°C.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("16K ekran akışını <span class=\"em\">videoda görün.</span>", "See the 16K screen workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("MASH P16L LCD ekran değişimi ve baskı kontrol akışını video üzerinden değerlendirin.", "Review the MASH P16L LCD screen replacement and print-control workflow via video."),
      videoTitle: tLocalized("MASH P16L 16K LCD ekran", "MASH P16L 16K LCD Ekran"),
      videoText: tLocalized("16K LCD, pozlama testi ve dental üretim hassasiyeti kontrollerine odaklanan video.", "A video focused on 16K LCD, exposure testing, and dental production precision checks."),
    },
    {
      slug: MASH_P16L_RESIN_TANK_SLUG,
      productText: tLocalized("MASH P16L Reçine Tankı", "MASH P16L Resin Tank"),
      kicker: tLocalized("MASH P16L · 800 ml Alüminyum Reçine Tankı", "MASH P16L · 800 ml Aluminum Resin Tank"),
      titleHtml: tLocalized("Reçine akışı <span class=\"em\">tankta</span> güvenceye alınır.", "Resin flow is secured <span class=\"em\">in the tank.</span>"),
      leadHtml:
        tLocalized("MASH P16L alüminyum reçine tankı, 800 ml maksimum kapasite, vidasız hızlı kilit mekanizması ve dahili ısıtma sistemiyle entegre yapısıyla hassas dental üretim iş akışını destekler.", "The MASH P16L aluminum resin tank supports precise dental production workflows with its 800 ml maximum capacity, screwless quick-lock mechanism, and integrated structure with a built-in heating system."),
      pills: [{ value: "800", label: tLocalized("ml kapasite", "ml capacity") }, { label: tLocalized("Alüminyum tank", "Aluminum tank") }, { label: tLocalized("Hızlı kilit", "Quick lock") }, { label: tLocalized("Isıtma uyumlu", "Heating compatible") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0bb3ef3d-0297-4119-96c3-5bb899f82e5f/1080/mash-p16l-orijinal-recine-tanki1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/521a8f06-ba96-4122-ada9-64e0b6d06f46/1080/mash-p16l-orijinal-recine-tanki2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1b694a64-1ef3-47c4-9930-bc937f35f59c/1080/mash-p16l-orijinal-recine-tanki3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/15572ae9-48fc-477c-bd59-b8492b2d9f23/1080/mash-p16l-orijinal-recine-tanki4.webp",
      ],
      galleryBadge: tLocalized("800 ml", "800ml"),
      summarySubject: tLocalized("reçine tankı", "resin tank"),
      metricTitleHtml: tLocalized("Tank kapasitesi ve <span class=\"em\">hızlı kilit</span> iş akışı.", "Tank capacity and <span class=\"em\">quick-lock</span> workflow."),
      metricSideHtml: tLocalized("Reçine tankında kapasite, kilit mekanizması ve ısıtma sistemi uyumu üretim güvenilirliği için birlikte değerlendirilir.", "Capacity, locking mechanism, and heating system compatibility of the resin tank are evaluated together for production reliability."),
      metrics: [
        { name: tLocalized("Kapasite", "Capacity"), value: "800", unit: "ml", tag: tLocalized("Maksimum", "Maximum"), caption: tLocalized("Hassas dental üretim için geniş reçine kapasitesi.", "Large resin capacity for precise dental production.") },
        { name: tLocalized("Gövde", "Body"), value: tLocalized("Alüminyum", "Aluminum"), unit: "", tag: tLocalized("Tank", "Tank"), caption: tLocalized("P16L ile uyumlu alüminyum reçine tankı yapısı.", "An aluminum resin tank structure compatible with the P16L.") },
        { name: tLocalized("Kilit", "Lock"), value: tLocalized("Hızlı", "Fast"), unit: "sistem", tag: tLocalized("Vidasız", "Screwless"), caption: tLocalized("Vidasız hızlı kilit mekanizması iş akışını hızlandırır.", "The screwless quick-lock mechanism speeds up the workflow.") },
      ],
      specTag: "MASH P16L · RESIN VAT · 800 ml",
      specTitleHtml: tLocalized("Tank, film ve ısıtma <span class=\"em\">aynı akışta.</span>", "Tank, film, and heating <span class=\"em\">in the same workflow.</span>"),
      specDescriptionHtml: tLocalized("MASH P16L reçine tankı; 800 ml kapasite, hızlı kilit sistemi ve dahili ısıtma sistemiyle entegre yapı sunar. UV korumalı kapak avantajıyla listelenir.", "The MASH P16L resin tank offers an integrated structure with 800 ml capacity, a quick-lock system, and a built-in heating system. It is listed with the advantage of a UV-protected lid."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Kapasite", "Capacity"), value: tLocalized("800 ml", "800ml") },
        { label: tLocalized("Gövde", "Body"), value: tLocalized("Alüminyum", "Aluminum") },
        { label: tLocalized("Kilit", "Lock"), value: tLocalized("Vidasız hızlı kilit", "Screwless quick lock") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Isıtma sistemi", "Heating system") },
      ],
      useCaseSideHtml: tLocalized("P16L reçine tankı, dental üretimde reçine hacmi, film değişimi ve hızlı tank kullanımı için temel yedek parçadır.", "The P16L resin tank is a key spare part for resin volume, film replacement, and quick tank use in dental production."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("800 ml tank", "800ml tank"), text: tLocalized("Dental üretim için geniş reçine kapasitesi.", "Large resin capacity for dental production."), alt: tLocalized("MASH P16L reçine tankı 800 ml", "MASH P16L resin tank 800 ml") },
        { imageIndex: 3, title: tLocalized("Hızlı kilit", "Quick lock"), text: tLocalized("Vidasız mekanizma iş akışını hızlandırır.", "The screwless mechanism speeds up the workflow."), alt: tLocalized("MASH P16L reçine tankı hızlı kilit", "MASH P16L resin tank quick lock") },
        { imageIndex: 4, title: tLocalized("Film değişimi", "Film replacement"), text: tLocalized("Tank filmi ve tank yüzeyi birlikte kontrol edilir.", "Tank film and tank surface are checked together."), alt: tLocalized("MASH P16L reçine tankı film değişimi", "MASH P16L resin tank film replacement") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım Alanları", "Application Areas"), title: tLocalized("Ne için kullanılır?", "What is it used for?"), items: [tLocalized("MASH P16L reçine tankı değişimi", "MASH P16L resin tank replacement"), tLocalized("800 ml reçine kapasitesiyle dental üretim", "Dental production with 800 ml resin capacity"), tLocalized("Film değişimi ve tank bakım süreçleri", "Film replacement and tank maintenance processes")] },
        { eyebrow: tLocalized("Kurulum Notu", "Installation Note"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: [tLocalized("Tank yüzeyi ve film gerginliği", "Tank surface and film tension"), tLocalized("Hızlı kilit mekanizması", "Quick-lock mechanism"), tLocalized("Isıtma sistemiyle temas ve uyum", "Contact and compatibility with the heating system")] },
      ],
      devicesTitle: tLocalized("MASH P16L ile çalışır", "Works with the MASH P16L"),
      devicesTextHtml: tLocalized("MASH P16L cihazının alüminyum reçine tankıdır. Film, kapak ve ısıtma sistemi uyumu kurulumda birlikte kontrol edilmelidir.", "It is the aluminum resin tank of the MASH P16L device. Film, lid, and heating system compatibility should be checked together during installation."),
      deviceChips: [{ label: tLocalized("MASH P16L", "MASH P16L") }, { label: tLocalized("800 ml", "800ml") }, { label: tLocalized("Alüminyum tank", "Aluminum tank") }, { label: tLocalized("Isıtma uyumu", "Heating compatibility"), highlighted: true }],
      ecosystemTitleHtml: tLocalized("Tank değişimi, <span class=\"em\">film ve pozlama kontrolüyle</span> tamamlanır.", "Tank replacement is completed <span class=\"em\">with film and exposure checks.</span>"),
      ecosystemTextHtml: tLocalized("Reçine tankı, ACF/FEP film, LCD ekran ve baskı tablası birlikte kontrol edildiğinde P16L üretim akışı daha güvenli ilerler.", "When the resin tank, ACF/FEP film, LCD screen, and build platform are checked together, the P16L production workflow proceeds more safely."),
      ecosystemChips: [tLocalized("Reçine tankı", "Resin tank"), tLocalized("ACF Film", "ACF Film"), tLocalized("LCD ekran", "LCD screen"), tLocalized("Baskı tablası", "Print platform")],
      faqItems: [
        { question: tLocalized("Kapasitesi nedir?", "What is its capacity?"), answerHtml: tLocalized("MASH P16L reçine tankı 800 ml maksimum kapasiteyle listelenir.", "The MASH P16L resin tank is listed with an 800 ml maximum capacity.") },
        { question: tLocalized("Isıtma sistemiyle uyumlu mu?", "Is it compatible with the heating system?"), answerHtml: tLocalized("Evet. Ürün açıklamasında dahili ısıtma sistemiyle entegre yapı olarak belirtilir.", "Yes. The product description states it has a structure integrated with an internal heating system.") },
        { question: tLocalized("Kurulumda ne kontrol edilmeli?", "What to check during installation?"), answerHtml: tLocalized("Tank filmi, hızlı kilit mekanizması, tank yüzeyi ve ısıtma sistemi uyumu kontrol edilmelidir.", "Tank film, quick-lock mechanism, tank surface, and heating system compatibility should be checked.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("Tank bakım akışını <span class=\"em\">videoda görün.</span>", "See the tank maintenance workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("MASH P16L reçine tankı, film değişimi ve baskı kontrol akışını video üzerinden değerlendirin.", "Review the MASH P16L resin tank, film replacement, and print-control workflow via video."),
      videoTitle: tLocalized("MASH P16L reçine tankı", "MASH P16L Reçine Tankı"),
      videoText: tLocalized("Tank, film, hızlı kilit ve test baskısı kontrollerine odaklanan bakım akışı.", "A maintenance workflow focused on tank, film, quick-lock, and test print checks."),
    },
  ];
}

let cachedPrinterSpareLocale: "tr" | "en" | null = null;
let cachedPrinterSpareData: Record<string, ProductDetailTemplateData> | null = null;

export function printerSparePartDetailDataBySlug(): Record<string, ProductDetailTemplateData> {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedPrinterSpareLocale === locale && cachedPrinterSpareData) return cachedPrinterSpareData;
  cachedPrinterSpareLocale = locale;
  cachedPrinterSpareData = Object.fromEntries(
    printerSparePartConfigs().map((config) => [config.slug, printerSparePartDetail(config)]),
  );
  return cachedPrinterSpareData;
}

function printerSparePartAliases(): Record<string, string[]> {
  return {
    [CREALITY_HALOT_SKY_LCD_KIT_SLUG]: ["creality-halot-sky-lcd-ekran-kiti", "halot-sky-lcd-ekran-kiti", "6k-mono-lcd-ekran-kiti", "creality-halot-sky-lcd-screen-kit-6k-mono"],
    [PIOCREAT_C01_LCD_KIT_SLUG]: ["piocreat-c01-lcd-ekran-kiti", "c01-lcd-ekran-kiti", "piocreat-c01-lcd-screen-kit"],
    [ACF_FEP_FILM_SLUG]: ["seffaf-acf-film", "acf-film", "fep-film", tLocalized("lcd-dlp-recine-3d-yazicilar-icin", "lcd-dlp-recine-3d-yazicilar-icin"), "seffaf-fep-film", "seffaf-fep-film-3d-yazici", "transparent-fep-film-3d-printer", "transparent-acf-film"],
    [MASH_P16L_MAINBOARD_SLUG]: ["mash-p16l-ana-kart", "p16l-ana-kart", "kontrol-karti", "mash-p16l-motherboard"],
    [MASH_P16L_LARGE_BUILD_PLATE_SLUG]: [tLocalized("mash-p16l-buyuk-baski-tablasi", "mash-p16l-buyuk-baski-tablasi"), "211x118mm", "211x118-mm", tLocalized("p16l-buyuk-baski-tablasi", "p16l-buyuk-baski-tablasi"), "mash-p16l-large-build-platform-211x118mm", "mash-p16l-buyuk-baski-tablasi-211x118mm"],
    [MASH_P16L_SMALL_BUILD_PLATE_SLUG]: [tLocalized("mash-p16l-kucuk-baski-tablasi", "mash-p16l-kucuk-baski-tablasi"), tLocalized("mash-p16l-kucuk-hizli-baski-tablasi", "mash-p16l-kucuk-hizli-baski-tablasi"), tLocalized("hizli-baski", "hizli-baski"), "tekli-vaka", "mash-p16l-small-build-platform", "mash-p16l-small-fast-build-platform", "mash-p16l-kucuk-baski-tablasi", "mash-p16l-kucuk-hizli-baski-tablasi"],
    [MASH_P16L_LCD_SCREEN_SLUG]: ["mash-p16l-16k-monokrom-lcd-ekran", "p16l-16k-lcd", "p16l-lcd-ekran", "mash-p16l-16k-monokrom-lcd-ekran-yedek-parca", "mash-p16l-16k-monochrome-lcd-screen-spare-part"],
    [MASH_P16L_RESIN_TANK_SLUG]: ["mash-p16l-recine-tanki", "p16l-recine-tanki", "800ml", "800-ml", "mash-p16l-recine-tanki-800ml", "mash-p16l-resin-tank-800ml"],
  };
}

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
  text: tLocalized("Zirkon Bloklar", "Zirconia Blocks"),
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
      tag: tLocalized("ST ML", "STML"),
      title: tLocalized("ArgenZ ST Multilayer", "ArgenZ ST Multilayer"),
      descriptionHtml: tLocalized("Doğal dentin geçişini taklit eden süper translüsent multilayer zirkonya disk.", "A super-translucent multilayer zirconia disk that mimics natural dentin transition."),
      href: `/${ARGENZ_ST_MULTILAYER_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#F0ECE2,#fff)",
    },
    {
      tag: tLocalized("HT+", "HT+"),
      title: tLocalized("ArgenZ HT+", "ArgenZ HT+"),
      descriptionHtml: tLocalized("Yüksek translüsent plus yapı; dayanım, performans ve estetik dengesi.", "High translucent plus structure; a balance of strength, performance, and aesthetics."),
      href: `/${ARGENZ_HT_PLUS_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#EEF0F3,#fff)",
    },
    {
      tag: tLocalized("HT+ ML", "HT+ML"),
      title: tLocalized("ArgenZ HT+ Multilayer", "ArgenZ HT+ Multilayer"),
      descriptionHtml: tLocalized("HT+ materyal dayanımıyla doğal dentin-mine geçişini birleştiren multilayer disk.", "A multilayer disk that combines HT+ material strength with a natural dentin-enamel transition."),
      href: `/${ARGENZ_HT_MULTILAYER_SLUG}`,
      linkText: tLocalized("İncele", "Explore"),
      background: "linear-gradient(160deg,#ECE7DB,#fff)",
    },
    {
      tag: "FIRIN",
      title: tLocalized("Dental Fırınlar", "Dental Furnaces"),
      descriptionHtml: tLocalized("Zirkon sinterleme ve porselen/press akışları için uyumlu fırın seçenekleri.", "Compatible furnace options for zirconia sintering and porcelain/press workflows."),
      href: "/dental-firinlar",
      linkText: tLocalized("Fırınları gör", "See furnaces"),
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
      strongText: tLocalized("Zirkon iş akışı.", "Zirconia workflow."),
      longText: tLocalized("Blok seçimi, kalınlık ve sinterleme akışını birlikte kontrol ederek doğru ArgenZ zirkonu seçiyoruz.", "We choose the right ArgenZ zirconia by checking block selection, thickness, and sintering workflow together."),
      ctaText: tLocalized("Vaka uyumunu kontrol et →", "Check case compliance →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
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
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— vaka uyumu ve teknik destek dahil.", "— including case fit and technical support."),
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Vaka Uygunluğu", "Case Suitability"),
      titleHtml: tLocalized("Doğru zirkon, <span class=\"hl\">endikasyona</span> göre seçilir.", "The right zirconia is selected <span class=\"hl\">according to the indication.</span>"),
      sideHtml: tLocalized("Zirkon blok seçiminde restorasyon tipi, estetik beklenti, köprü açıklığı ve sinterleme protokolü birlikte değerlendirilir.", "Restoration type, aesthetic expectations, bridge span, and sintering protocol are all considered together when choosing a zirconia block."),
      panelTitleHtml: `${config.productText} için <span class="em">seçim kontrolü.</span>`,
      note: tLocalized("Milling ve sinterleme öncesi kontrol edilen temel başlıklar.", "Key items checked before milling and sintering."),
      items: [
        { descriptionHtml: tLocalized("Vaka endikasyonu ve köprü açıklığı <b>materyal tipine</b> göre kontrol edilir.", "The case indication and bridge span are checked based on <b>material type</b>.") },
        { descriptionHtml: tLocalized("Renk, kalınlık ve multilayer geçişi <b>estetik beklentiyle</b> eşleştirilir.", "Color, thickness, and multilayer gradient are matched to <b>aesthetic expectations</b>.") },
        { descriptionHtml: tLocalized("Sinterleme fırını ve freze iş akışı <b>blok parametreleriyle</b> birlikte doğrulanır.", "The sintering furnace and milling workflow are verified together with <b>block parameters</b>.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: tLocalized("Renk ve kalınlık seç →", "Select color and thickness →"),
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: config.useCaseSideHtml,
      photos: config.useCasePhotos.map((photo) => ({
        src: zirconPhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
      })),
      cards: [
        { eyebrow: tLocalized("Endikasyon", "Indication"), title: tLocalized("Hangi vakalarda?", "In what cases?"), items: config.indicationItems },
        { eyebrow: tLocalized("İş Akışı", "Workflow"), title: tLocalized("Neler kontrol edilir?", "What to check?"), items: config.processItems },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Sistemler", "Compatible Systems"),
        title: tLocalized("Dental freze ve sinterleme akışıyla çalışır", "Works with the dental milling and sintering workflow"),
        textHtml:
          tLocalized("ArgenZ zirkon bloklarda renk, kalınlık, frezeleme stratejisi ve sinterleme protokolü birlikte planlanmalıdır. Kullandığınız freze ve fırın akışını satın alma öncesi birlikte kontrol edebiliriz.", "Color, thickness, milling strategy, and sintering protocol should be planned together for ArgenZ zirconia blocks. We can check your milling and furnace workflow together before purchase."),
        chips: config.deviceChips,
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Laboratuvar Ekosistemi", "Laboratory Ecosystem"),
      titleHtml: tLocalized("Zirkon blok, <span class=\"em\">freze ve fırınla</span> tamamlanır.", "The zirconia block is completed with <span class=\"em\">milling and firing.</span>"),
      textHtml:
        tLocalized("Doğru zirkon sonucu; blok seçimi, CAM stratejisi, sinterleme çevrimi ve finishing/glaze adımlarının birlikte yönetilmesiyle alınır. Kalınlık ve renk seçimini vaka planına göre birlikte netleştirebiliriz.", "The right zirconia result is achieved by managing block choice, CAM strategy, sintering cycle, and finishing/glaze steps together. We can clarify the thickness and color choice together based on the case plan."),
      chips: [tLocalized("Zirkon blok", "zirconia block"), "CAM frezeleme", tLocalized("Sinterleme", "sintering"), "Finishing / glaze"],
      buttons: [
        { text: tLocalized("Teknik destek al", "Get technical support"), href: tLocalized("/pages/iletisim", "/pages/iletisim") },
        { text: tLocalized("Zirkonları gör", "See zirconia"), href: ZIRCON_CATEGORY.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulanlar", "Frequently Asked Questions"),
      titleHtml: `${config.productText} <span class="em">hakkında.</span>`,
      sideHtml: tLocalized("Renk, kalınlık ve endikasyon seçimi satın alma öncesi netleştirilmelidir.", "Color, thickness, and indication selection should be clarified before purchase."),
      openFirst: true,
      items: config.faqItems,
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Zirkon akışını <span class=\"em\">videoda görün.</span>", "See the zirconia workflow <span class=\"em\">in the video.</span>"),
      sideHtml: tLocalized("ArgenZ zirkon bloklarda milling, nesting ve sinterleme yaklaşımını video üzerinden değerlendirin.", "Evaluate the milling, nesting, and sintering approach for ArgenZ zirconia blocks via video."),
      href: config.videoHref,
      image: youtubePreview(config.videoHref, config.images[0] || ""),
      imageAlt: `${config.productText} video`,
      title: `${config.productText} iş akışı`,
      text: tLocalized("Vaka seçimi, nesting ve laboratuvar üretim akışına odaklanan video.", "A video focused on case selection, nesting, and the lab production workflow."),
      meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Zirkonlar", "Related Zirconia"),
      titleHtml: tLocalized("Aynı laboratuvarda <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> in the same lab."),
      items: zirconRelatedItems(config.slug),
    },
    finalCta: {
      titleHtml: `${config.productText} için <span class="em">vaka uyumunu birlikte kontrol edelim.</span>`,
      textHtml:
        tLocalized("Renk, kalınlık, endikasyon ve sinterleme akışını kısa bir görüşmeyle netleştirip doğru ArgenZ zirkon bloğu seçelim.", "Let's clarify color, thickness, indication, and sintering workflow in a short call and select the right ArgenZ zirconia block."),
      primaryText: tLocalized("Sepete dön ↑", "Back to cart ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış", "Consult an expert"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

let cachedZirconLocale: "tr" | "en" | null = null;
let cachedZirconConfigs: ZirconBlockConfig[] | null = null;

function zirconBlockConfigs(): ZirconBlockConfig[] {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedZirconLocale === locale && cachedZirconConfigs) return cachedZirconConfigs;

  cachedZirconLocale = locale;
  cachedZirconConfigs = [
    {
      slug: ARGENZ_ST_MULTILAYER_SLUG,
      productText: tLocalized("ArgenZ ST Multilayer Zirkon Blok", "ArgenZ ST Multilayer Zircon Block"),
      kicker: tLocalized("ArgenZ ST Multilayer · Süper Translüsent Zirkonya", "ArgenZ ST Multilayer · Super Translucent Zirconia"),
      titleHtml: tLocalized("Doğal dentin geçişi <span class=\"em\">multilayer</span> diskten gelir.", "Natural dentin transition comes from the <span class=\"em\">multilayer</span> disk."),
      leadHtml:
        tLocalized("ArgenZ ST Süper Translüsent Multilayer Zirkon Blok, lityum disilikata alternatif olacak yüksek geçirgenlik ve optimum dayanıklılık sunar. Doğal dentini taklit eden geçişiyle estetik restorasyonlar için kullanılır; ABD'de üretilir, izostatik preslenir ve FDA 510K onaylıdır.", "ArgenZ ST Super Translucent Multilayer Zirconia Block offers high translucency and optimum durability as an alternative to lithium disilicate. Used for aesthetic restorations with a transition that mimics natural dentin; made in the USA, isostatically pressed, and FDA 510K approved."),
      pills: [{ value: "50%", label: tLocalized("translüsentlik", "translucency") }, { value: "850", label: tLocalized("MPa", "MPa") }, { label: tLocalized("ST Multilayer", "ST Multilayer") }, { label: tLocalized("FDA 510K", "FDA 510K") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ce6a0485-2b4f-4d5d-82db-b7410f337570/540/5.webp",
      ],
      videoHref: "https://www.youtube.com/watch?v=Sg2I5yC8qBk",
      metricTitleHtml: tLocalized("Süper translüsent <span class=\"em\">estetik zirkon.</span>", "Super-translucent <span class=\"em\">aesthetic zirconia.</span>"),
      metricSideHtml: tLocalized("ST Multilayer, doğal dentin geçişi ve estetik anterior/tek üye vakalarında yüksek geçirgenlik ihtiyacına odaklanır.", "ST Multilayer focuses on the need for natural dentin transition and high translucency in aesthetic anterior/single-unit cases."),
      metrics: [
        { name: tLocalized("Translüsentlik", "Translucency"), value: "50", unit: "%", tag: "ST", caption: tLocalized("Doğal dentini taklit eden yüksek geçirgenlik seviyesi.", "A high translucency level that mimics natural dentin.") },
        { name: tLocalized("Dayanım", "Strength"), value: "850", unit: tLocalized("MPa", "MPa"), tag: tLocalized("Zirkonya", "zirconia"), caption: tLocalized("Estetik vakalar için optimum dayanıklılık dengesi.", "An optimal balance of durability for aesthetic cases.") },
        { name: tLocalized("Köprü", "Bridge"), value: "3", unit: tLocalized("üyeye kadar", "up to members"), tag: tLocalized("Anterior", "anterior"), caption: tLocalized("Tek kronlar ve 1 pontikli 3 üyeye kadar anterior köprüler için konumlandırılır.", "Positioned for single crowns and anterior bridges with up to 3 units and 1 pontic.") },
      ],
      specTag: "ARGENZ ST MULTILAYER · 50% · 850 MPa",
      specTitleHtml: 'Lityum disilikata <span class="em">estetik alternatif.</span>',
      specDescriptionHtml: tLocalized("Süper translüsent multilayer yapı, doğal renk geçişi ve yüksek estetik beklenti olan vakalarda kullanılmak üzere konumlandırılır.", "The super-translucent multilayer structure is positioned for use in cases with natural color transition and high aesthetic expectations."),
      specRows: [
        { label: tLocalized("Materyal", "Materiel"), value: tLocalized("ST Multilayer", "ST Multilayer") },
        { label: tLocalized("Translüsentlik", "Translucency"), value: "50%" },
        { label: tLocalized("Dayanım", "Strength"), value: "850 MPa" },
        { label: tLocalized("Üretim", "Production"), value: "ABD / izostatik pres" },
        { label: tLocalized("Onay", "Approval"), value: tLocalized("FDA 510K", "FDA 510K") },
      ],
      useCaseSideHtml: tLocalized("ST Multilayer, estetik geçiş ve doğal dentin taklidi gereken zirkon restorasyonlarında tercih edilir.", "ST Multilayer is preferred in zirconia restorations that require aesthetic transition and natural dentin imitation."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Anterior estetik", "Anterior aesthetics"), text: tLocalized("Doğal renk geçişi ve yüksek translüsentlik.", "Natural color transition and high translucency."), alt: tLocalized("ArgenZ ST Multilayer anterior estetik", "ArgenZ ST Multilayer anterior aesthetics") },
        { imageIndex: 3, title: tLocalized("Tek kron", "single crown"), text: tLocalized("Lityum disilikata alternatif estetik zirkon.", "Aesthetic zirconia alternative to lithium disilicate."), alt: tLocalized("ArgenZ ST Multilayer tek kron", "ArgenZ ST Multilayer single crown") },
        { imageIndex: 2, title: tLocalized("3 üyeli köprü", "3-unit bridge"), text: tLocalized("1 pontikli anterior köprü endikasyonu.", "Indication for a 1-pontic anterior bridge."), alt: tLocalized("ArgenZ ST Multilayer anterior köprü", "ArgenZ ST Multilayer anterior bridge") },
      ],
      indicationItems: [tLocalized("Tek kron restorasyonları", "Single crown restorations"), tLocalized("Yüksek estetik anterior vakalar", "High-aesthetic anterior cases"), tLocalized("1 pontikli 3 üyeye kadar anterior köprüler", "Anterior bridges of up to 3 units with 1 pontic")],
      processItems: [tLocalized("Renk ve kalınlık seçimi", "Color and thickness selection"), tLocalized("Shrinkage değerinin CAM yazılıma doğru girilmesi", "Entering the correct shrinkage value into the CAM software"), tLocalized("Sinterleme çevrimi ve finishing/glaze kontrolü", "Sintering cycle and finishing/glaze check")],
      deviceChips: [{ label: tLocalized("Dental CAD/CAM freze", "Dental CAD/CAM milling") }, { label: tLocalized("Sinterleme fırını", "Sintering furnace") }, { label: tLocalized("VITA Classical tonları", "VITA Classical shades") }, { label: tLocalized("Estetik vaka", "aesthetic case"), highlighted: true }],
      faqItems: [
        { question: tLocalized("ArgenZ ST Multilayer ne için kullanılır?", "What is ArgenZ ST Multilayer used for?"), answerHtml: tLocalized("Doğal dentin geçişi ve yüksek estetik beklenti olan zirkon restorasyonlarda kullanılır.", "Used in zirconia restorations that require natural dentin transition and high aesthetic expectations.") },
        { question: tLocalized("Dayanım değeri nedir?", "What is the strength value?"), answerHtml: tLocalized("ST Multilayer için 850 MPa dayanım bilgisi ürün kaynaklarında yer alır.", "The 850 MPa strength value for ST Multilayer is stated in the product resources.") },
        { question: tLocalized("Hangi köprülerde tercih edilir?", "Which bridges is it preferred for?"), answerHtml: tLocalized("Tek kronlar ve 1 pontikli 3 üyeye kadar anterior köprüler için konumlandırılır.", "Positioned for single crowns and anterior bridges with up to 3 units and 1 pontic.") },
      ],
    },
    {
      slug: ARGENZ_HT_PLUS_SLUG,
      productText: tLocalized("ArgenZ HT+ Zirkon Blok", "ArgenZ HT+ Zircon Block"),
      kicker: tLocalized("ArgenZ HT+ · Yüksek Translüsent Plus Zirkonya", "ArgenZ HT+ · High Translucency Plus Zirconia"),
      titleHtml: tLocalized("Dayanım ve estetik <span class=\"em\">HT+</span> formülde birleşir.", "Strength and aesthetics come together in the <span class=\"em\">HT+</span> formula."),
      leadHtml:
        tLocalized("Argen HT+ ile üretilen restorasyonlar dayanıklılık, performans ve estetik dengesi sunar. Klinik ihtiyaçlara uygun çok yönlü formülasyonu sayesinde birçok vakada zirkonyum reçeteleme imkanı sağlar.", "Restorations produced with Argen HT+ offer a balance of durability, performance, and aesthetics. Its versatile formulation, suited to clinical needs, enables zirconia prescribing in many cases."),
      pills: [{ value: "1250", label: tLocalized("MPa", "MPa") }, { value: "45%", label: tLocalized("translüsentlik", "translucency") }, { label: tLocalized("HT+", "HT+") }, { label: tLocalized("Full contour / altyapı", "Full contour / substructure") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bb246f06-b3c4-4a10-b35c-9bf224734b73/540/6.webp",
      ],
      videoHref: "https://www.youtube.com/watch?v=kgyZhW8YC-I",
      metricTitleHtml: tLocalized("Güçlü restorasyonlar için <span class=\"em\">HT+ zirkon.</span>", "<span class=\"em\">HT+ zirconia</span> for strong restorations."),
      metricSideHtml: tLocalized("HT+ materyal, dayanım ve translüsentlik dengesini geniş klinik endikasyonlarda kullanmak için konumlandırılır.", "HT+ material is positioned for use across a wide range of clinical indications, balancing strength and translucency."),
      metrics: [
        { name: tLocalized("Dayanım", "Strength"), value: "1250", unit: tLocalized("MPa", "MPa"), tag: tLocalized("HT+", "HT+"), caption: tLocalized("Geleneksel HT zirkonyaya göre artırılmış dayanım seviyesi.", "An increased strength level compared to conventional HT zirconia.") },
        { name: tLocalized("Translüsentlik", "Translucency"), value: "45", unit: "%", tag: tLocalized("HT+", "HT+"), caption: tLocalized("Dayanım korunurken estetik ışık geçirgenliği sağlar.", "Provides aesthetic light transmission while preserving strength.") },
        { name: tLocalized("Endikasyon", "Indication"), value: "Full", unit: "arch", tag: "IFU", caption: tLocalized("Full contour ve altyapı restorasyonlarında geniş kullanım alanı.", "Wide range of use in full contour and substructure restorations.") },
      ],
      specTag: tLocalized("ARGENZ HT+ · 1250 MPa · 45%", "ARGENZ HT+ · 1250 MPa · 45%"),
      specTitleHtml: tLocalized("Geniş endikasyon için <span class=\"em\">yüksek dayanım.</span>", "<span class=\"em\">High strength</span> for a wide range of indications."),
      specDescriptionHtml: tLocalized("HT+ zirkonya, full contour ve altyapı restorasyonlarında dayanım, performans ve estetik dengesini korumak için kullanılır.", "HT+ zirconia is used to maintain the balance of strength, performance, and aesthetics in full contour and substructure restorations."),
      specRows: [
        { label: tLocalized("Materyal", "Materiel"), value: tLocalized("HT+", "HT+") },
        { label: tLocalized("Dayanım", "Strength"), value: "1250 MPa" },
        { label: tLocalized("Translüsentlik", "Translucency"), value: "45%" },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Full contour / altyapı", "Full contour / substructure") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Zirkon blok", "zirconia block") },
      ],
      useCaseSideHtml: tLocalized("HT+ zirkon blok, yüksek dayanım isteyen kron, köprü ve altyapı iş akışlarında kullanılır.", "HT+ zirconia block is used in crown, bridge, and substructure workflows that require high strength."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Posterior dayanım", "Posterior strength"), text: tLocalized("Yük taşıyan restorasyonlar için güçlü yapı.", "A strong structure for load-bearing restorations."), alt: tLocalized("ArgenZ HT+ posterior restorasyon", "ArgenZ HT+ posterior restoration") },
        { imageIndex: 3, title: tLocalized("Full contour", "full contour"), text: tLocalized("Tek parça zirkon restorasyon iş akışları.", "Monolithic zirconia restoration workflows."), alt: tLocalized("ArgenZ HT+ full contour", "ArgenZ HT+ full contour") },
        { imageIndex: 2, title: tLocalized("Altyapı", "Infrastructure"), text: tLocalized("Substructure ve geniş endikasyon desteği.", "Substructure and broad indication support."), alt: tLocalized("ArgenZ HT+ altyapı restorasyonu", "ArgenZ HT+ substructure restoration") },
      ],
      indicationItems: ["Full contour restorasyonlar", tLocalized("Substructure / altyapı restorasyonları", "Substructure / framework restorations"), tLocalized("Dayanım öncelikli kron ve köprü vakaları", "Strength-priority crown and bridge cases")],
      processItems: [tLocalized("CAM shrinkage değeri kontrolü", "CAM shrinkage value control"), tLocalized("Keskin frez ve uygun milling stratejisi", "Sharp bur and appropriate milling strategy"), tLocalized("Sinterleme sonrası wet adjustment ve finishing kontrolü", "Wet adjustment and finishing check after sintering")],
      deviceChips: [{ label: tLocalized("Dental CAD/CAM freze", "Dental CAD/CAM milling") }, { label: tLocalized("Sinterleme fırını", "Sintering furnace") }, { label: tLocalized("HT+ shading liquids", "HT+ shading liquids") }, { label: tLocalized("Dayanım odaklı vaka", "Strength-focused case"), highlighted: true }],
      faqItems: [
        { question: tLocalized("ArgenZ HT+ hangi restorasyonlarda kullanılır?", "In which restorations is ArgenZ HT+ used?"), answerHtml: tLocalized("Full contour ve altyapı restorasyonlarında, dayanım ve estetik dengesinin önemli olduğu vakalarda kullanılır.", "Used in full contour and substructure restorations, in cases where the balance of strength and aesthetics is important.") },
        { question: tLocalized("Dayanım ve translüsentlik değeri nedir?", "What is the strength and translucency value?"), answerHtml: tLocalized("HT+ için kaynaklarda 1250 MPa dayanım ve 45% translüsentlik bilgisi yer alır.", "Sources list HT+ with 1250 MPa strength and 45% translucency.") },
        { question: tLocalized("Sinterleme öncesi ne kontrol edilmeli?", "What should be checked before sintering?"), answerHtml: tLocalized("Disk üzerindeki shrinkage değeri CAM yazılımına doğru girilmeli ve sinterleme protokolü takip edilmelidir.", "The shrinkage value on the disk must be entered correctly into the CAM software and the sintering protocol must be followed.") },
      ],
    },
    {
      slug: ARGENZ_HT_MULTILAYER_SLUG,
      productText: tLocalized("ArgenZ HT+ Multilayer Zirkon Blok", "ArgenZ HT+ Multilayer Zircon Block"),
      kicker: tLocalized("ArgenZ HT+ Multilayer · Güçlü Doğal Gradient", "ArgenZ HT+ Multilayer · Strong Natural Gradient"),
      titleHtml: tLocalized("HT+ dayanımı <span class=\"em\">doğal multilayer</span> geçişle birleşir.", "HT+ strength combines with a <span class=\"em\">natural multilayer</span> transition."),
      leadHtml:
        tLocalized("ArgenZ HT+ Multilayer, HT+ materyal dayanımı ve renk doğruluğunu doğal dentin-mine geçişine benzeyen multilayer yapı ile birleştirir. Katman çizgisi oluşturmadan doğal shade gradient hedefleyen zirkon restorasyonlar için kullanılır.", "ArgenZ HT+ Multilayer combines HT+ material strength and color accuracy with a multilayer structure resembling the natural dentin-enamel transition. Used for zirconia restorations targeting a natural shade gradient without a visible layer line."),
      pills: [{ value: tLocalized("HT+", "HT+"), label: "multilayer" }, { value: "1250", label: tLocalized("MPa", "MPa") }, { label: tLocalized("Doğal gradient", "Natural gradient") }, { label: tLocalized("Shade accuracy", "Shade accuracy") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/363b392e-4c9b-499b-8590-a5b1f6ad7b85/540/4.webp",
      ],
      videoHref: "https://www.youtube.com/watch?v=kgyZhW8YC-I",
      metricTitleHtml: tLocalized("Dayanım üstüne <span class=\"em\">doğal renk geçişi.</span>", "<span class=\"em\">Natural color gradient</span> on top of strength."),
      metricSideHtml: tLocalized("HT+ Multilayer, yüksek dayanım ihtiyacı olan vakalarda doğal gradient ve shade doğruluğu hedefler.", "HT+ Multilayer targets natural gradient and shade accuracy in cases requiring high strength."),
      metrics: [
        { name: tLocalized("Yapı", "Structure"), value: tLocalized("HT+", "HT+"), unit: "ML", tag: tLocalized("Multilayer", "Multilayer"), caption: tLocalized("HT+ materyali doğal shade gradient ile birleştiren multilayer yapı.", "A multilayer structure combining HT+ material with a natural shade gradient.") },
        { name: tLocalized("Dayanım", "Strength"), value: "1250", unit: tLocalized("MPa", "MPa"), tag: tLocalized("HT+", "HT+"), caption: tLocalized("HT+ zirkonyanın yüksek dayanım sınıfını koruyan formülasyon.", "A formulation that preserves the high-strength class of HT+ zirconia.") },
        { name: tLocalized("Estetik", "Aesthetic"), value: tLocalized("Doğal", "Natural"), unit: "gradient", tag: tLocalized("Shade", "Shade"), caption: tLocalized("Dentin-mine geçişini andıran doğal renk doğruluğu hedefler.", "Aims for natural color accuracy reminiscent of the dentin-enamel transition.") },
      ],
      specTag: "ARGENZ HT+ MULTILAYER · GRADIENT · HT+",
      specTitleHtml: tLocalized("Katman çizgisiz <span class=\"em\">doğal geçiş.</span>", "A <span class=\"em\">natural transition</span> with no layer lines."),
      specDescriptionHtml: tLocalized("HT+ Multilayer, güç ve shade doğruluğunu doğal gradient ile birleştirerek anterior-posterior estetik dayanım dengesinde kullanılır.", "HT+ Multilayer combines strength and shade accuracy with a natural gradient, used for the aesthetic-strength balance in anterior-posterior cases."),
      specRows: [
        { label: tLocalized("Materyal", "Materiel"), value: tLocalized("HT+ Multilayer", "HT+ Multilayer") },
        { label: tLocalized("Dayanım", "Strength"), value: "1250 MPa" },
        { label: tLocalized("Geçiş", "Transition"), value: tLocalized("Doğal shade gradient", "Natural shade gradient") },
        { label: tLocalized("Hedef", "Aim"), value: "Dentin-mine uyumu" },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Zirkon blok", "zirconia block") },
      ],
      useCaseSideHtml: tLocalized("HT+ Multilayer, dayanım korunurken doğal renk geçişi istenen zirkon restorasyonlarda tercih edilir.", "HT+ Multilayer is preferred in zirconia restorations where a natural color transition is desired while strength is preserved."),
      useCasePhotos: [
        { imageIndex: 2, title: tLocalized("Doğal gradient", "Natural gradient"), text: tLocalized("Dentin-mine geçişine benzeyen multilayer yapı.", "Multilayer structure resembling the dentin-enamel transition."), alt: tLocalized("ArgenZ HT+ Multilayer doğal gradient", "ArgenZ HT+ Multilayer natural gradient") },
        { imageIndex: 3, title: tLocalized("Shade doğruluğu", "Shade accuracy"), text: tLocalized("Tutarlı renk geçişi ve estetik sonuç hedefi.", "The goal of consistent color transition and an aesthetic result."), alt: tLocalized("ArgenZ HT+ Multilayer shade doğruluğu", "ArgenZ HT+ Multilayer shade accuracy") },
        { imageIndex: 2, title: tLocalized("Güçlü estetik", "Strong aesthetics"), text: tLocalized("HT+ dayanımıyla multilayer görünüm dengesi.", "A balance of multilayer appearance with HT+ strength."), alt: tLocalized("ArgenZ HT+ Multilayer güçlü estetik", "ArgenZ HT+ Multilayer strong aesthetics") },
      ],
      indicationItems: [tLocalized("Doğal renk geçişi istenen kron ve köprüler", "Crowns and bridges requiring a natural color transition"), tLocalized("HT+ dayanım gerektiren estetik vakalar", "Aesthetic cases requiring HT+ strength"), tLocalized("Shade accuracy ve gradient beklentisi olan restorasyonlar", "Restorations with shade accuracy and gradient expectations")],
      processItems: [tLocalized("Disk yönü ve nesting pozisyonu", "Disk orientation and nesting position"), tLocalized("Renk/kalınlık seçimi", "Color/thickness selection"), tLocalized("Sinterleme ve finishing/glaze protokolü", "Sintering and finishing/glaze protocol")],
      deviceChips: [{ label: tLocalized("Dental CAD/CAM freze", "Dental CAD/CAM milling") }, { label: tLocalized("Sinterleme fırını", "Sintering furnace") }, { label: tLocalized("Multilayer nesting", "Multilayer nesting") }, { label: tLocalized("Doğal gradient", "Natural gradient"), highlighted: true }],
      faqItems: [
        { question: tLocalized("HT+ Multilayer farkı nedir?", "What is the difference with HT+ Multilayer?"), answerHtml: tLocalized("HT+ materyal dayanımı ve shade doğruluğunu doğal multilayer renk geçişiyle birleştirir.", "HT+ combines material strength and shade accuracy with a natural multilayer color transition.") },
        { question: tLocalized("Hangi vakalarda tercih edilir?", "In which cases is it preferred?"), answerHtml: tLocalized("Dayanım korunurken doğal dentin-mine geçişi istenen zirkon restorasyonlarda tercih edilir.", "Preferred in zirconia restorations where a natural dentin-enamel transition is desired while preserving strength.") },
        { question: tLocalized("Nesting neden önemli?", "Why is nesting important?"), answerHtml: tLocalized("Multilayer disklerde restorasyonun disk içindeki konumu renk geçişini doğrudan etkiler.", "In multilayer discs, the restoration's position within the disc directly affects the color gradient.") },
      ],
    },
  ];
  return cachedZirconConfigs;
}

let cachedZirconDataLocale: "tr" | "en" | null = null;
let cachedZirconData: Record<string, ProductDetailTemplateData> | null = null;

export function zirconBlockDetailDataBySlug(): Record<string, ProductDetailTemplateData> {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedZirconDataLocale === locale && cachedZirconData) return cachedZirconData;
  cachedZirconDataLocale = locale;
  cachedZirconData = Object.fromEntries(zirconBlockConfigs().map((config) => [config.slug, zirconBlockDetail(config)]));
  return cachedZirconData;
}

const ZIRCON_BLOCK_ALIASES: Record<string, string[]> = {
  [ARGENZ_ST_MULTILAYER_SLUG]: ["argenz-st-multilayer", "st-multilayer-zirkon", "stml", "argenz-st-multilayer-zirkon-blok", "argenz-st-multilayer-zirconia-disc"],
  [ARGENZ_HT_PLUS_SLUG]: ["argenz-ht-plus", "ht-plus-zirkon", "ht-zirkon-blok", "argenz-ht-plus-zirkon-blok", "argenz-ht-plus-zirconia-disc"],
  [ARGENZ_HT_MULTILAYER_SLUG]: ["argenz-ht-multilayer", "ht-plus-multilayer", "ht-multilayer-zirkon", "html", "argenz-ht-multilayer-zirkon-blok", "argenz-ht-plus-multilayer-zirconia-disc"],
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
  useCasePhotoLayout?: "uniform" | "bleed";
  useCasePhotos: Array<{
    imageIndex?: number;
    imageSrc?: string;
    imageFit?: "contain" | "cover";
    imageOffsetY?: string;
    imageScale?: string;
    imageBackground?: "white";
    mediaType?: "image" | "video";
    title: string;
    text: string;
    alt: string;
  }>;
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

type LabCategories = {
  washCure: LabProductCategory;
  printer: LabProductCategory;
  scanner: LabProductCategory;
  furnace: LabProductCategory;
  titanium: LabProductCategory;
  system: LabProductCategory;
};

let cachedLabCategoriesLocale: "tr" | "en" | null = null;
let cachedLabCategories: LabCategories | null = null;

function getLabCategories(): LabCategories {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedLabCategoriesLocale === locale && cachedLabCategories) return cachedLabCategories;

  cachedLabCategoriesLocale = locale;
  cachedLabCategories = {
    washCure: {
      text: tLocalized("Yıkama & Kürleme Cihazları", "Washing & Curing Devices"),
      href: tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
      label: tLocalized("Yıkama & Kürleme", "Wash & Cure"),
      relatedLabel: tLocalized("İlgili Cihazlar", "Related Devices"),
      relatedTitleHtml: tLocalized("Aynı baskı akışında <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> in the same print workflow."),
      announcementStrong: tLocalized("Post-process kontrolü.", "Post-process check."),
      announcementText: tLocalized("Yıkama ve kürleme adımlarını kullandığınız reçineyle birlikte netleştiriyoruz.", "We clarify the washing and curing steps together with the resin you use."),
      ecosystemLabel: tLocalized("Post-Process Ekosistemi", "Post-Process Ecosystem"),
      ecosystemTitleHtml: tLocalized("Baskı sonucu, <span class=\"em\">yıkama ve kürlemeyle</span> tamamlanır.", "The print result is completed with <span class=\"em\">washing and curing.</span>"),
      ecosystemTextHtml: tLocalized("Reçine baskıda nihai mekanik değerler; doğru yıkama, kurutma ve UV kürleme süreciyle korunur. Cihazı reçine ve iş akışınıza göre birlikte konumlandırabiliriz.", "The final mechanical values in resin printing are preserved through the correct washing, drying, and UV curing process. We can position the device together according to your resin and workflow."),
      ecosystemChips: [tLocalized("Yıkama", "Washing"), tLocalized("Kürleme", "Curing"), tLocalized("365 / 405 nm", "365/405nm"), tLocalized("Reçine sonrası işlem", "Post-resin processing")],
    },
    printer: {
      text: tLocalized("3D Yazıcılar", "3D Printers"),
      href: "/3d-yazicilar",
      label: tLocalized("3D Yazıcı", "3D Printer"),
      relatedLabel: tLocalized("İlgili Yazıcılar", "Related Printers"),
      relatedTitleHtml: tLocalized("Aynı üretim ekosisteminde <span class=\"em\">birlikte değerlendirilenler.</span>", "Those <span class=\"em\">evaluated together</span> in the same production ecosystem."),
      announcementStrong: tLocalized("Yazıcı seçimi.", "Printer selection."),
      announcementText: tLocalized("Uygulama, materyal ve üretim hacminize göre doğru 3D yazıcıyı birlikte seçiyoruz.", "We help you choose the right 3D printer together, based on your application, material, and production volume."),
      ecosystemLabel: tLocalized("Baskı Ekosistemi", "Print Ecosystem"),
      ecosystemTitleHtml: tLocalized("Yazıcı seçimi, <span class=\"em\">materyal ve post-process</span> ile tamamlanır.", "Printer selection is completed with <span class=\"em\">material and post-process.</span>"),
      ecosystemTextHtml: tLocalized("Dental ve mücevher üretiminde yazıcı, reçine, yıkama-kürleme ve teknik parametreler birlikte çalışır. Cihaz seçimini üretim hedefinize göre birlikte netleştirebiliriz.", "In dental and jewelry production, the printer, resin, wash-cure process, and technical parameters work together. We can clarify your device choice together based on your production goals."),
      ecosystemChips: [tLocalized("3D yazıcı", "3D printer"), tLocalized("Reçine", "Resin"), tLocalized("Yıkama & kürleme", "Washing & curing"), tLocalized("Parametre desteği", "Parameter support")],
    },
    scanner: {
      text: tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"),
      href: "/masasustu-tarayicilar",
      label: tLocalized("Masaüstü Tarayıcı", "Desktop Scanner"),
      relatedLabel: tLocalized("İlgili Tarayıcılar", "Related Scanners"),
      relatedTitleHtml: tLocalized("Aynı laboratuvarda <span class=\"em\">birlikte değerlendirilenler.</span>", "Those <span class=\"em\">evaluated together</span> in the same lab."),
      announcementStrong: tLocalized("Tarama doğruluğu.", "Scanning accuracy."),
      announcementText: tLocalized("Laboratuvar üretim hacminize göre doğru masaüstü tarayıcıyı birlikte seçiyoruz.", "We select the right desktop scanner together, based on your laboratory production volume."),
      ecosystemLabel: "Tarama Ekosistemi",
      ecosystemTitleHtml: tLocalized("Dijital iş akışı, <span class=\"em\">doğru taramayla</span> başlar.", "The digital workflow starts <span class=\"em\">with the right scan.</span>"),
      ecosystemTextHtml: tLocalized("Tarama doğruluğu; model, implant bar ve tam çene iş akışlarında CAD/CAM üretimin temelini oluşturur. Tarayıcı seçimini üretim hacmi ve vaka tiplerinize göre birlikte planlayabiliriz.", "Scanning accuracy forms the foundation of CAD/CAM production in model, implant bar, and full-arch workflows. We can plan scanner selection together based on your production volume and case types."),
      ecosystemChips: [tLocalized("Model tarama", "Model scanning"), tLocalized("Doku tarama", "tissue scanning"), tLocalized("CAD/CAM", "CAD/CAM"), tLocalized("Laboratuvar üretimi", "Laboratory production")],
    },
    furnace: {
      text: tLocalized("Dental Fırınlar", "Dental Furnaces"),
      href: "/dental-firinlar",
      label: tLocalized("Dental Fırın", "Dental Furnace"),
      relatedLabel: tLocalized("İlgili Fırınlar", "Related Furnaces"),
      relatedTitleHtml: tLocalized("Aynı laboratuvarda <span class=\"em\">ısı akışını tamamlayanlar.</span>", "Those who <span class=\"em\">complete the heat workflow</span> in the same lab."),
      announcementStrong: tLocalized("Fırın seçimi.", "Furnace selection."),
      announcementText: tLocalized("Zirkon, press veya porselen iş akışınıza göre doğru fırını birlikte seçiyoruz.", "We choose the right furnace together based on your zirconia, press, or porcelain workflow."),
      ecosystemLabel: tLocalized("Fırın Ekosistemi", "Furnace Ecosystem"),
      ecosystemTitleHtml: tLocalized("Restorasyon kalitesi, <span class=\"em\">kontrollü ısıyla</span> tamamlanır.", "Restoration quality is completed <span class=\"em\">with controlled heat.</span>"),
      ecosystemTextHtml: tLocalized("Sinterleme, press ve porselen pişiriminde doğru sıcaklık aralığı ve fırın tipi kritik rol oynar. Laboratuvar iş akışınıza göre fırın seçimini birlikte netleştirebiliriz.", "The correct temperature range and furnace type play a critical role in sintering, press, and porcelain firing. We can clarify furnace selection together according to your laboratory workflow."),
      ecosystemChips: [tLocalized("Sinterleme", "sintering"), tLocalized("Press", "press"), tLocalized("Porselen", "Porcelain"), tLocalized("Vakum / sıcaklık kontrolü", "Vacuum / temperature control")],
    },
    titanium: {
      text: tLocalized("Titanyum Diskler", "Titanium Discs"),
      href: "/titanyum-diskler",
      label: tLocalized("Titanyum Disk", "Titanium Disc"),
      relatedLabel: tLocalized("İlgili Malzemeler", "Related Materials"),
      relatedTitleHtml: tLocalized("CAD/CAM iş akışında <span class=\"em\">birlikte kullanılanlar.</span>", "<span class=\"em\">Used together</span> in the CAD/CAM workflow."),
      announcementStrong: tLocalized("CAD/CAM materyal seçimi.", "CAD/CAM material selection."),
      announcementText: tLocalized("Disk ölçüsü ve endikasyon uyumunu frezeleme akışınızla birlikte kontrol ediyoruz.", "We check disk size and indication compatibility together with your milling workflow."),
      ecosystemLabel: "CAD/CAM Ekosistemi",
      ecosystemTitleHtml: tLocalized("Titanyum disk, <span class=\"em\">implant üstü işlerde</span> güven verir.", "Titanium disc provides confidence <span class=\"em\">in implant-supported work.</span>"),
      ecosystemTextHtml: tLocalized("İmplant üstü restorasyonlarda materyal seçimi, disk ölçüsü ve frezeleme stratejisi birlikte değerlendirilmelidir. Uyumlu CAD/CAM akışını satın alma öncesi netleştirebiliriz.", "Material selection, disc size, and milling strategy should be evaluated together for implant-supported restorations. We can clarify the compatible CAD/CAM workflow before purchase."),
      ecosystemChips: [tLocalized("Grade 5 ELI", "Grade 5 ELI"), tLocalized("CAD/CAM", "CAD/CAM"), tLocalized("Ø98.5 mm", "Ø98.5mm"), tLocalized("İmplant üstü restorasyon", "Implant-supported restoration")],
    },
    system: {
      text: tLocalized("Sistemler", "Systems"),
      href: "/sistemler",
      label: tLocalized("Sistem", "System"),
      relatedLabel: tLocalized("İlgili Sistemler", "Related Systems"),
      relatedTitleHtml: tLocalized("Kompozit restorasyonda <span class=\"em\">birlikte çalışanlar.</span>", "<span class=\"em\">Products that work together</span> in composite restoration."),
      announcementStrong: tLocalized("Kompozit sistem akışı.", "Composite system workflow."),
      announcementText: tLocalized("Mufla, kompozit ve baskı akışını tam çene restorasyon hedefinize göre birlikte değerlendiriyoruz.", "We evaluate the muffle, composite, and printing workflow together according to your full-arch restoration goal."),
      ecosystemLabel: "Restorasyon Ekosistemi",
      ecosystemTitleHtml: tLocalized("Tam çene kompozit işlerde <span class=\"em\">sistem birlikte çalışır.</span>", "In full-arch composite work, <span class=\"em\">the system works together.</span>"),
      ecosystemTextHtml: tLocalized("Trasformer sistemi; ışık geçirgenliği, stabilite ve kompozit uygulamasını aynı restorasyon akışında birleştirir. Ürün seçimini vaka ve laboratuvar sürecinize göre birlikte netleştirebiliriz.", "The Trasformer system combines light transmission, stability, and composite application in the same restoration workflow. We can clarify product selection together according to your case and laboratory process."),
      ecosystemChips: ["Light Glass mufla", tLocalized("Comp Flow", "Comp Flow"), tLocalized("Tam çene kompozit", "Full-arch composite"), tLocalized("Işık geçirgenliği", "Light transmittance")],
    },
  };

  return cachedLabCategories;
}

const MASH_C1E_MAIN_IMAGE =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e7c22c86-93e4-4c53-92f8-969d358e0c0f/1080/mash-c1e-dental-post-cure-cihazi.webp";

const MASH_W1E_MAIN_IMAGE =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2ed9f9dd-4203-4c95-9dd3-c9e321bdd354/1080/mash-w1e-washing-device.webp";

function labPhotoSrc(config: LabProductConfig, index: number | undefined) {
  const usable = config.images.length > 1 ? config.images.slice(1) : config.images;
  if (!usable.length) return config.images[0] || "";
  return usable[Math.min(Math.max((index || 1) - 1, 0), usable.length - 1)];
}

function labRelatedItems(config: LabProductConfig): NonNullable<ProductDetailTemplateData["related"]>["items"] {
  return labProductConfigs().filter((item) => {
    return item.category.href === config.category.href && item.slug !== config.slug;
  }).map((item) => ({
    tag: item.galleryBadge || item.category.label.toLocaleUpperCase("tr"),
    title: item.productText,
    descriptionHtml: item.leadHtml,
    href: `/${item.slug}`,
    linkText: tLocalized("İncele", "Explore"),
    background: "linear-gradient(160deg,#F1F1EC,#fff)",
    image: item.images[0],
    imageAlt: item.productText,
  })).slice(0, 4);
}

function labProductDetail(config: LabProductConfig): ProductDetailTemplateData {
  const {
    washCure: WASH_CURE_CATEGORY,
    printer: PRINTER_CATEGORY,
    scanner: SCANNER_CATEGORY,
    furnace: FURNACE_CATEGORY,
    system: SYSTEM_CATEGORY,
  } = getLabCategories();
  const gallery = normalizedGallery(config.images, config.productText);
  const mainImage = config.images[0] || gallery[0]?.src || "";
  const quoteOnly = config.category === PRINTER_CATEGORY || config.category === WASH_CURE_CATEGORY;
  const isWashCureProduct = [MASH_W1E_ULTRASONIC_WASH_SLUG, MASH_C1E_UV_CURING_SLUG, CREALITY_WASH_CURE_UW03_SLUG].includes(config.slug);
  const productText = config.slug === MASH_W1E_ULTRASONIC_WASH_SLUG
    ? tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device")
    : config.slug === MASH_C1E_UV_CURING_SLUG
      ? tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device")
      : config.slug === CREALITY_WASH_CURE_UW03_SLUG
        ? tLocalized("Creality Wash&Cure UW-03", "Creality Wash&Cure UW-03")
        : config.productText;
  const categoryText = isWashCureProduct
    ? tLocalized("Yıkama & Kürleme Cihazları", "Washing & Curing Devices")
    : config.category === PRINTER_CATEGORY
      ? tLocalized("3D Yazıcılar", "3D Printers")
      : config.category === SCANNER_CATEGORY
        ? tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners")
        : config.category === FURNACE_CATEGORY
          ? tLocalized("Dental Fırınlar", "Dental Furnaces")
          : config.category === SYSTEM_CATEGORY
            ? tLocalized("Sistemler", "Systems")
            : config.category.text;
  const announcementStrong = isWashCureProduct
    ? tLocalized("Post-process kontrolü.", "Post-process check.")
    : config.category === PRINTER_CATEGORY
      ? tLocalized("Yazıcı seçimi.", "Printer selection.")
      : config.category.announcementStrong;
  const announcementText = isWashCureProduct
    ? tLocalized("Yıkama ve kürleme adımlarını kullandığınız reçineyle birlikte netleştiriyoruz.", "We clarify the washing and curing steps together with the resin you use.")
    : config.category === PRINTER_CATEGORY
      ? tLocalized("Uygulama, materyal ve üretim hacminize göre doğru 3D yazıcıyı birlikte seçiyoruz.", "We help you choose the right 3D printer together, based on your application, material, and production volume.")
      : config.category.announcementText;
  return {
    key: config.slug,
    announcement: {
      enabled: true,
      strongText: announcementStrong,
      longText: announcementText,
      ctaText: tLocalized("Uyumu kontrol et →", "Check compatibility →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText,
      categoryHref: config.category.href,
      productText,
    },
    hero: {
      kicker: config.kicker,
      titleHtml: config.titleHtml,
      leadHtml: config.leadHtml,
      pills: config.pills,
      galleryBadge: config.galleryBadge,
      gallery,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— uyumluluk kontrolü ve teknik destek dahil.", "— including compatibility check and technical support."),
      buyHrefBase: `/${config.slug}`,
      whatsappHref: `https://wa.me/905314326577?text=${encodeURIComponent(`${config.productText} hakkında bilgi almak istiyorum`)}`,
      whatsappText: quoteOnly ? tLocalized("Teklif alın", "Get a quote") : tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      disableAddToCart: quoteOnly,
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Seçim Kontrolü", "Selection Check"),
      titleHtml: tLocalized("Doğru ürün, <span class=\"hl\">iş akışına</span> göre seçilir.", "The right product is selected <span class=\"hl\">according to the workflow.</span>"),
      sideHtml: config.metricSideHtml,
      panelTitleHtml: tLocalized(
        `${config.productText} için <span class="em">kontrol listesi.</span>`,
        `Checklist for <span class="em">${config.productText}.</span>`,
      ),
      note: tLocalized("Satın alma öncesi kontrol edilmesi gereken başlıklar.", "Items that should be checked before purchase."),
      items: [
        { descriptionHtml: tLocalized("Ürün, laboratuvarın mevcut cihaz ve üretim akışıyla <b>uyumlu</b> seçilmelidir.", "The product should be chosen to be <b>compatible</b> with the lab's existing devices and production workflow.") },
        { descriptionHtml: tLocalized("Vaka tipi, kapasite ve teknik gereksinimler <b>satın alma öncesi</b> netleştirilmelidir.", "Case type, capacity, and technical requirements should be clarified <b>before purchase</b>.") },
        { descriptionHtml: tLocalized("Kurulum veya kullanım sonrası süreç için <b>teknik destek</b> planlanmalıdır.", "<b>Technical support</b> should be arranged for the installation or post-use process.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Öne Çıkanlar", "Featured"),
      titleHtml: config.metricTitleHtml,
      sideHtml: config.metricSideHtml,
      items: config.metrics,
    },
    specHighlight: {
      tag: config.specTag,
      titleHtml: config.specTitleHtml,
      descriptionHtml: config.specDescriptionHtml,
      ctaText: tLocalized("Seçenekleri gör →", "See options →"),
      ctaHref: "#satinal",
      rows: config.specRows,
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: config.useCaseSideHtml,
      layout: config.useCasePhotoLayout,
      photos: config.useCasePhotos.map((photo) => ({
        src: photo.imageSrc || labPhotoSrc(config, photo.imageIndex),
        alt: photo.alt,
        title: photo.title,
        text: photo.text,
        imageFit: photo.imageFit,
        imageOffsetY: photo.imageOffsetY,
        imageScale: photo.imageScale,
        imageBackground: photo.imageBackground,
        mediaType: photo.mediaType,
      })),
      cards: config.useCaseCards,
      devices: {
        eyebrow: tLocalized("Uyumlu Akış", "Compatible Workflow"),
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
        { text: tLocalized("Teknik destek al", "Get technical support"), href: tLocalized("/pages/iletisim", "/pages/iletisim") },
        { text: tLocalized("Kategoriye dön", "Back to category"), href: config.category.href, variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulanlar", "Frequently Asked Questions"),
      titleHtml: tLocalized(
        `${config.productText} <span class="em">hakkında.</span>`,
        `About <span class="em">${config.productText}.</span>`,
      ),
      sideHtml: tLocalized("Uyumluluk, kapasite ve kullanım akışı satın alma öncesi netleştirilmelidir.", "Compatibility, capacity, and usage workflow should be clarified before purchase."),
      openFirst: true,
      items: config.faqItems,
    },
    video: config.videoHref
      ? {
        index: "06",
        label: tLocalized("Videoda Gör", "Watch Video"),
        titleHtml: config.videoTitleHtml,
        sideHtml: config.videoSideHtml,
        href: config.videoHref,
        image: youtubePreview(config.videoHref, mainImage),
        imageAlt: `${config.productText} video`,
        title: config.videoTitle,
        text: config.videoText,
        meta: tLocalized("Mash Academy · YouTube'da izle", "Mash Academy · Watch on YouTube"),
      }
      : undefined,
    related: {
      index: "07",
      label: config.category.relatedLabel,
      titleHtml: config.category.relatedTitleHtml,
      items: labRelatedItems(config),
    },
    finalCta: {
      titleHtml: tLocalized(
        `${config.productText} için <span class=\"em\">uyumu birlikte kontrol edelim.</span>`,
        `<span class=\"em\">Let's check compatibility</span> for ${config.productText} together.`,
      ),
      textHtml: tLocalized("Cihaz, materyal, varyant ve laboratuvar iş akışınızı birlikte değerlendirip doğru seçeneği netleştirelim.", "Let's evaluate your device, material, variant, and lab workflow together and clarify the right option."),
      primaryText: tLocalized("Sepete dön ↑", "Back to cart ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış", "Consult an expert"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

let cachedLabLocale: "tr" | "en" | null = null;
let cachedLabConfigs: LabProductConfig[] | null = null;

function labProductConfigs(): LabProductConfig[] {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedLabLocale === locale && cachedLabConfigs) return cachedLabConfigs;

  cachedLabLocale = locale;
  const {
    washCure: WASH_CURE_CATEGORY,
    printer: PRINTER_CATEGORY,
    scanner: SCANNER_CATEGORY,
    furnace: FURNACE_CATEGORY,
    titanium: TITANIUM_CATEGORY,
    system: SYSTEM_CATEGORY,
  } = getLabCategories();
  cachedLabConfigs = [
    {
      slug: MASH_P16L_PRINTER_SLUG,
      category: PRINTER_CATEGORY,
      productText: tLocalized("MASH P16L", "MASH P16L"),
      kicker: tLocalized("MASH P16L · 385 nm 16K Dental 3D Yazıcı", "MASH P16L · 385 nm 16K Dental 3D Printer"),
      titleHtml: tLocalized("Dental üretimde <span class=\"em\">385 nm ve 16K</span> hassasiyet.", "<span class=\"em\">385 nm and 16K</span> precision in dental production."),
      leadHtml:
        tLocalized("MASH P16L, 385 nm profesyonel UV ışık ve 16K çözünürlük ile dental restorasyonlarda mikron hassasiyeti hedefleyen profesyonel dental 3D yazıcıdır. Maksimum hız ve mükemmel uyumu aynı üretim akışında sunmak için konumlandırılır.", "The MASH P16L is a professional dental 3D printer that targets micron-level precision in dental restorations with 385 nm professional UV light and 16K resolution. It is positioned to deliver maximum speed and perfect fit within the same production workflow."),
      pills: [{ value: "385", label: tLocalized("nm UV", "nm UV") }, { value: tLocalized("16K", "16K"), label: tLocalized("çözünürlük", "resolution") }, { label: tLocalized("Dental restorasyon", "dental restoration") }, { label: "MASH" }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/e47e604b-5052-4935-800f-57d4ead78ced/1080/mash-p16l.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b92468e1-e607-46f2-b5fd-c7001c066fd8/1080/mash-p16l.webp",
        p16lPrinterOpenImage,
      ],
      metricTitleHtml: tLocalized("Mikron hassasiyet için <span class=\"em\">profesyonel LCD.</span>", "A <span class=\"em\">professional LCD</span> for micron-level precision."),
      metricSideHtml: tLocalized("P16L, dental restorasyonlarda 385 nm ışık sistemi ve 16K çözünürlükle hassas baskı akışına odaklanır.", "The P16L focuses on a precise printing workflow for dental restorations with a 385 nm light system and 16K resolution."),
      metrics: [
        { name: tLocalized("Işık", "Light"), value: "385", unit: "nm", tag: "UV", caption: tLocalized("Kaynak ürün sayfasında belirtilen profesyonel UV ışık dalga boyu.", "The professional UV light wavelength specified on the source product page.") },
        { name: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("16K", "16K"), unit: "", tag: "LCD", caption: tLocalized("Dental restorasyonlarda detay ve yüzey kalitesi için yüksek çözünürlük.", "High resolution for detail and surface quality in dental restorations.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental", "dental"), unit: "restorasyon", tag: tLocalized("Lab", "laboratory"), caption: tLocalized("Mikron hassasiyeti ve uyum hedefleyen dental üretim akışı.", "A dental production workflow targeting micron-level precision and fit.") },
      ],
      specTag: "MASH P16L · 385 NM · 16K",
      specTitleHtml: tLocalized("Dental restorasyonlarda <span class=\"em\">hız ve uyum.</span>", "<span class=\"em\">Speed and fit</span> in dental restorations."),
      specDescriptionHtml: tLocalized("MASH P16L, 385 nm ışık sistemi ve 16K çözünürlükle dental restorasyon üretiminde hassasiyet, hız ve tekrarlanabilir uyum hedefler.", "The MASH P16L targets precision, speed, and repeatable fit in dental restoration production with its 385 nm light system and 16K resolution."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: tLocalized("MASH P16L", "MASH P16L") },
        { label: tLocalized("Işık", "Light"), value: tLocalized("385 nm", "385nm") },
        { label: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("16K", "16K") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental restorasyon", "dental restoration") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("3D yazıcı", "3D Printer") },
      ],
      useCaseSideHtml: tLocalized("Dental restorasyon, reçine üretimi ve hassas laboratuvar baskı akışlarında kullanılır.", "Used in dental restoration, resin production, and precise laboratory printing workflows."),
      useCasePhotos: [
        {
          imageSrc: p16lPrinterOpenImage,
          title: tLocalized("Dental restorasyon", "dental restoration"),
          text: tLocalized("Mikron hassasiyet isteyen üretimler.", "Production requiring micron-level precision."),
          alt: tLocalized("MASH P16L dental restorasyon", "MASH P16L dental restoration"),
        },
        {
          imageSrc: p16lDentalModelImage,
          title: tLocalized("16K detay", "16K detail"),
          text: tLocalized("Yüksek çözünürlüklü LCD baskı akışı.", "High-resolution LCD printing workflow."),
          alt: tLocalized("MASH P16L 16K baskı", "MASH P16L 16K printing"),
        },
        {
          imageSrc: p16lPrintPlateImage,
          title: tLocalized("385 nm", "385nm"),
          text: tLocalized("Dental reçine parametreleriyle uyumlu ışık sistemi.", "Light system compatible with dental resin parameters."),
          alt: tLocalized("MASH P16L 385 nm", "MASH P16L 385nm"),
        },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Dental restorasyon baskıları", "Dental restoration prints"), tLocalized("Hassas model ve aparey üretimi", "Precise model and appliance production"), tLocalized("Laboratuvar seri üretim akışı", "Laboratory batch-production workflow")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Reçine parametresi", "Resin parameter"), tLocalized("Katman kalınlığı", "Layer thickness"), tLocalized("Yıkama ve kürleme süreci", "Washing and curing process")] },
      ],
      devicesTitle: tLocalized("Dental reçine ve post-process akışıyla çalışır", "Works with the dental resin and post-processing workflow"),
      devicesTextHtml: tLocalized("P16L, dental reçineler ve yıkama-kürleme cihazlarıyla birlikte kalibre edildiğinde üretim sonucu daha kontrollü ilerler.", "When the P16L is calibrated together with dental resins and washing-curing devices, the production result proceeds in a more controlled manner."),
      deviceChips: [{ label: tLocalized("Dental reçineler", "Dental resins") }, { label: tLocalized("Yıkama & kürleme", "Washing & curing") }, { label: tLocalized("385 nm", "385nm") }, { label: tLocalized("16K", "16K"), highlighted: true }],
      faqItems: [
        { question: tLocalized("MASH P16L ne için kullanılır?", "What is the MASH P16L used for?"), answerHtml: tLocalized("Dental restorasyonlarda 385 nm UV ışık ve 16K çözünürlükle hassas reçine baskı üretimi için kullanılır.", "Used for precise resin print production in dental restorations with 385 nm UV light and 16K resolution.") },
        { question: tLocalized("Öne çıkan teknik bilgisi nedir?", "What is the featured technical information?"), answerHtml: tLocalized("Ürün sayfasında 385 nm profesyonel UV ışık ve 16K çözünürlük vurgulanır.", "The product page highlights professional 385 nm UV light and 16K resolution.") },
        { question: tLocalized("Reçine parametresi gerekir mi?", "Is a resin parameter required?"), answerHtml: tLocalized("Evet. Dental reçine, yazıcı ve post-process parametreleri birlikte netleştirilmelidir.", "Yes. The dental resin, printer, and post-process parameters should be clarified together.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("P16L üretim akışını <span class=\"em\">videoda görün.</span>", "See the P16L production workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("MASH P16L'in 385 nm ve 16K baskı yaklaşımını kısa videoda görün.", "See the MASH P16L's 385 nm and 16K printing approach in a short video."),
      videoTitle: tLocalized("MASH P16L dental 3D yazıcı", "MASH P16L dental 3D printer"),
      videoText: tLocalized("385 nm, 16K ve dental üretim akışına odaklanan ürün videosu.", "A product video focused on 385 nm, 16K, and the dental production workflow."),
    },
    {
      slug: MASH_CURIE_M1_DENTAL_SLUG,
      category: PRINTER_CATEGORY,
      productText: "Mash CURIE M1 Dental",
      kicker: tLocalized("Mash CURIE M1 · Dental DLP 3D Yazıcı", "Mash CURIE M1 · Dental DLP 3D Printer"),
      titleHtml: tLocalized("Klinik hassasiyet isteyen işler için <span class=\"em\">yerli DLP.</span>", "<span class=\"em\">Domestic DLP</span> for jobs requiring clinical precision."),
      leadHtml:
        tLocalized("Curie M1, dijital diş hekimliği uygulamaları için geliştirilmiş yüksek hassasiyetli DLP 3D yazıcıdır. Geçici kuron, ortodontik model, gece plağı ve implant analogları gibi klinik hassasiyet gerektiren üretimlerde istikrarlı ve tekrarlanabilir sonuçlar sağlar.", "The Curie M1 is a high-precision DLP 3D printer developed for digital dentistry applications. It provides consistent and repeatable results in productions requiring clinical precision, such as temporary crowns, orthodontic models, night guards, and implant analogs."),
      pills: [{ label: "DLP" }, { label: tLocalized("Dental", "dental") }, { label: tLocalized("Geçici kuron", "Temporary crown") }, { label: tLocalized("Ortodontik model", "orthodontic model") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/302ffc22-20c4-49b7-8d16-b303e079f0cf/1080/1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cb34e574-8ace-4eeb-84bd-eb5cd8fc85c2/1080/3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/37cdcfa4-761f-4f1d-b4da-db077fc1cc91/1080/2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d00ddb3d-77b0-454b-81e5-ff967b6cb36b/1080/4.webp",
      ],
      galleryBadge: "DLP",
      metricTitleHtml: tLocalized("Dental uygulamalar için <span class=\"em\">tekrarlanabilir DLP.</span>", "<span class=\"em\">Repeatable DLP</span> for dental applications."),
      metricSideHtml: tLocalized("Curie M1 Dental; geçici kuron, ortodontik model, gece plağı ve implant analogları gibi hassas dental işlerde konumlandırılır.", "The Curie M1 Dental is positioned for precise dental work such as temporary crowns, orthodontic models, night guards, and implant analogs."),
      metrics: [
        { name: tLocalized("Teknoloji", "Technology"), value: "DLP", unit: "", tag: tLocalized("Curie", "curie"), caption: tLocalized("Kaynak açıklamada DLP teknolojili yüksek hassasiyetli yazıcı olarak geçer.", "In the source description, it is referred to as a high-precision printer with DLP technology.") },
        { name: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Dental", "dental"), unit: "", tag: tLocalized("Clinical", "Clinical"), caption: tLocalized("Dijital diş hekimliği uygulamaları için geliştirilmiştir.", "Developed for digital dentistry applications.") },
        { name: tLocalized("Sonuç", "Result"), value: "Stabil", unit: "", tag: tLocalized("Repeat", "Repeat"), caption: tLocalized("İstikrarlı ve tekrarlanabilir sonuçlar hedefler.", "Aims for stable, repeatable results.") },
      ],
      specTag: "CURIE M1 · DENTAL DLP",
      specTitleHtml: tLocalized("Klinik hassasiyet için <span class=\"em\">dental DLP yazıcı.</span>", "<span class=\"em\">Dental DLP printer</span> for clinical precision."),
      specDescriptionHtml: tLocalized("Curie M1 Dental, dijital diş hekimliği uygulamalarında stabil ve tekrarlanabilir reçine baskı üretimi için geliştirilmiştir.", "The Curie M1 Dental was developed for stable and repeatable resin print production in digital dentistry applications."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: tLocalized("Curie M1 Dental", "Curie M1 Dental") },
        { label: tLocalized("Teknoloji", "Technology"), value: "DLP" },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dijital diş hekimliği", "Digital dentistry") },
        { label: tLocalized("Uygulamalar", "Applications"), value: tLocalized("Kuron / model / gece plağı", "Crown / model / night guard") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("3D yazıcı", "3D Printer") },
      ],
      useCaseSideHtml: tLocalized("Geçici kuron, ortodontik model, gece plağı ve implant analog üretimlerinde kullanılır.", "Used in the production of temporary crowns, orthodontic models, night guards, and implant analogs."),
      useCasePhotos: [
        { imageIndex: 1, title: tLocalized("Curie M1 Dental", "Curie M1 Dental"), text: tLocalized("Klinik ve laboratuvar işleri için yerli DLP yazıcı.", "Domestic DLP printer for clinical and laboratory work."), alt: tLocalized("Curie M1 Dental 3D yazıcı", "Curie M1 Dental 3D printer") },
        { imageSrc: curieM1DentalSectionVideo, mediaType: "video", title: tLocalized("Baskı hazırlığı", "Print preparation"), text: tLocalized("Baskı tablası ve üretim sürecinden kısa görüntü.", "A short clip of the print platform and production process."), alt: tLocalized("Curie M1 Dental baskı hazırlığı videosu", "Curie M1 Dental print preparation video") },
        { imageSrc: curieM1DentalPrintersImage, imageFit: "contain", title: tLocalized("Yan yana üretim", "Side-by-side production"), text: tLocalized("Birden fazla Curie M1 ile seri dental üretim.", "Serial dental production with multiple Curie M1 units."), alt: tLocalized("Yan yana çalışan üç Curie M1 Dental yazıcı", "Three Curie M1 Dental printers working side by side") },
      ],
      useCaseCards: [],
      devicesTitle: tLocalized("Dental reçine ve klinik/lab üretim akışıyla çalışır", "Works with the dental resin and clinical/lab production workflow"),
      devicesTextHtml: tLocalized("Curie M1 Dental için reçine seçimi, baskı parametresi ve post-process adımları birlikte planlanmalıdır.", "Resin selection, print parameters, and post-process steps should be planned together for the Curie M1 Dental."),
      deviceChips: [{ label: tLocalized("Dental reçine", "Dental resin") }, { label: "DLP" }, { label: tLocalized("Klinik hassasiyet", "Clinical sensitivity") }, { label: tLocalized("Yerli üretim", "Local production"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Curie M1 Dental ne için kullanılır?", "What is the Curie M1 Dental used for?"), answerHtml: tLocalized("Geçici kuron, ortodontik model, gece plağı ve implant analogları gibi dental üretimlerde kullanılır.", "Used in dental production such as temporary crowns, orthodontic models, night guards, and implant analogs.") },
        { question: tLocalized("Teknolojisi nedir?", "What is its technology?"), answerHtml: tLocalized("Ürün açıklamasında DLP teknolojili yüksek hassasiyetli 3D yazıcı olarak belirtilir.", "Stated in the product description as a high-precision DLP-technology 3D printer.") },
        { question: tLocalized("Sonuçlar tekrarlanabilir mi?", "Are the results repeatable?"), answerHtml: tLocalized("Kaynak açıklamada istikrarlı ve tekrarlanabilir sonuçlar sağladığı vurgulanır.", "The source description emphasizes that it provides consistent and repeatable results.") },
      ],
      videoTitleHtml: tLocalized("Curie M1 Dental için <span class=\"em\">teknik destek alın.</span>", "<span class=\"em\">Get technical support</span> for the Curie M1 Dental."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için dental uygulama ve reçine uyumunu teknik destekle netleştirin.", "Since there is no product video on this product page, clarify the dental application and resin compatibility with technical support."),
      videoTitle: tLocalized("Curie M1 Dental teknik destek", "Curie M1 Dental technical support"),
      videoText: tLocalized("Dental reçine, uygulama ve DLP baskı parametreleri için uzman desteği alın.", "Get expert support for dental resin, application, and DLP printing parameters."),
    },
    {
      slug: MASH_CURIE_M1_JEWELRY_SLUG,
      category: PRINTER_CATEGORY,
      productText: "Mash CURIE M1 Jewelry",
      kicker: tLocalized("Mash CURIE M1 · Jewelry DLP 3D Printer", "Mash CURIE M1 · Jewelry DLP 3D Printer"),
      titleHtml: tLocalized("Mücevher tasarımında <span class=\"em\">yüksek detay.</span>", "<span class=\"em\">High detail</span> in jewelry design."),
      leadHtml:
        tLocalized("Curie M1 Jewelry, kuyumculuk ve mücevher tasarımı için geliştirilmiş DLP teknolojili 3D yazıcıdır. Yüksek detay hassasiyeti, kusursuz yüzey kalitesi ve geniş malzeme uyumluluğu sunar.", "The Curie M1 Jewelry is a DLP-technology 3D printer developed for jewelry-making and jewelry design. It offers high detail precision, flawless surface quality, and broad material compatibility."),
      pills: [{ label: tLocalized("Jewelry", "jewelry") }, { label: "DLP" }, { label: tLocalized("Yüksek detay", "High detail") }, { label: tLocalized("Malzeme uyumu", "Material compatibility") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6caed2e3-e939-4ef3-8a80-7b04c5ef7d31/1080/1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a9dc7080-68cc-4114-aa76-a1e99a81c834/1080/3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6fea4dc9-2737-494b-9bc9-100a21ad5824/1080/2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7012539d-d394-4b84-b6d3-fcff9d95bc64/1080/4.webp",
      ],
      galleryBadge: "JEWELRY",
      metricTitleHtml: tLocalized("Kuyumculukta <span class=\"em\">detay ve yüzey kalitesi.</span>", "<span class=\"em\">Detail and surface quality</span> in jewelry."),
      metricSideHtml: tLocalized("Curie M1 Jewelry, mücevher tasarımı ve kuyumculuk uygulamalarında detay hassasiyeti ve malzeme uyumluluğu için konumlandırılır.", "The Curie M1 Jewelry is positioned for detail precision and material compatibility in jewelry design and jewelry-making applications."),
      metrics: [
        { name: tLocalized("Teknoloji", "Technology"), value: "DLP", unit: "", tag: tLocalized("Jewelry", "jewelry"), caption: tLocalized("Kuyumculuk için geliştirilmiş DLP teknolojili yazıcı.", "A DLP-technology printer developed for jewelry.") },
        { name: tLocalized("Detay", "Detail"), value: tLocalized("Yüksek", "High"), unit: "", tag: tLocalized("Hassasiyet", "Accuracy"), caption: tLocalized("Kaynak açıklamada yüksek detay hassasiyeti vurgulanır.", "The source description emphasizes high detail precision.") },
        { name: tLocalized("Yüzey", "Surface"), value: "Kusursuz", unit: "", tag: tLocalized("Finish", "Finish"), caption: tLocalized("Mücevher üretiminde yüzey kalitesi hedefler.", "Targets surface quality in jewelry production.") },
      ],
      specTag: "CURIE M1 · JEWELRY DLP",
      specTitleHtml: tLocalized("Mücevher üretimi için <span class=\"em\">hassas DLP.</span>", "<span class=\"em\">Precise DLP</span> for jewelry production."),
      specDescriptionHtml: tLocalized("Curie M1 Jewelry, kuyumculuk ve mücevher tasarımı için yüksek detay, yüzey kalitesi ve malzeme uyumluluğu hedefleyen DLP 3D yazıcıdır.", "The Curie M1 Jewelry is a DLP 3D printer aimed at high detail, surface quality, and material compatibility for jewelry-making and jewelry design."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: "Curie M1 Jewelry" },
        { label: tLocalized("Teknoloji", "Technology"), value: "DLP" },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Kuyumculuk / mücevher", "Jewelry / jewellery") },
        { label: tLocalized("Odak", "Focus"), value: tLocalized("Detay hassasiyeti", "Detail precision") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("3D yazıcı", "3D Printer") },
      ],
      useCaseSideHtml: tLocalized("Mücevher tasarımı, döküm masterı ve yüksek detay isteyen kuyumculuk baskılarında kullanılır.", "Used in jewelry design, casting masters, and jewelry prints requiring high detail."),
      useCasePhotos: [
        {
          imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a46d0cdc-0a54-4ce8-8bdc-30d0c2c15425/1080/1.webp",
          title: tLocalized("Mücevher tasarımı", "Jewelry design"),
          text: tLocalized("Yüksek detay isteyen parçalar.", "Parts requiring high detail."),
          alt: tLocalized("Curie M1 Jewelry mücevher tasarımı", "Curie M1 Jewelry jewelry design"),
          imageFit: "cover",
        },
        { imageIndex: 1, title: tLocalized("Yüzey kalitesi", "Surface quality"), text: tLocalized("Kusursuz yüzey hedefleyen üretimler.", "Productions aiming for a flawless surface."), alt: tLocalized("Curie M1 Jewelry yüzey kalitesi", "Curie M1 Jewelry surface quality") },
        { imageIndex: 3, title: tLocalized("Malzeme uyumu", "Material compatibility"), text: tLocalized("Kuyumculuk reçine ve materyal akışı.", "Jewelry resin and material workflow."), alt: tLocalized("Curie M1 Jewelry malzeme uyumu", "Curie M1 Jewelry material compatibility") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Kuyumculuk model baskıları", "Jewelry model prints"), tLocalized("Mücevher tasarımı", "Jewelry design"), tLocalized("Yüksek detaylı küçük parçalar", "Small, highly detailed parts")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Malzeme uyumu", "Material compatibility"), tLocalized("Detay ve yüzey hedefi", "Detail and surface goal"), tLocalized("Döküm veya üretim akışı", "Casting or production workflow")] },
      ],
      devicesTitle: tLocalized("Kuyumculuk reçineleri ve DLP üretim akışıyla çalışır", "Works with jewelry resins and the DLP production workflow"),
      devicesTextHtml: tLocalized("Curie M1 Jewelry için materyal, detay hedefi ve döküm/üretim akışı birlikte değerlendirilmelidir.", "Material, detail target, and casting/production workflow should be evaluated together for the Curie M1 Jewelry."),
      deviceChips: [{ label: tLocalized("Jewelry resin", "jewelry resin") }, { label: "DLP" }, { label: tLocalized("Yüksek detay", "High detail") }, { label: tLocalized("Kuyumculuk", "Jewelry"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Curie M1 Jewelry ne için kullanılır?", "What is the Curie M1 Jewelry used for?"), answerHtml: tLocalized("Kuyumculuk ve mücevher tasarımı için yüksek detaylı DLP 3D baskı üretiminde kullanılır.", "Used in high-detail DLP 3D printing production for jewelry and jewelry design.") },
        { question: tLocalized("Öne çıkan özellikleri nelerdir?", "What are the key features?"), answerHtml: tLocalized("Yüksek detay hassasiyeti, kusursuz yüzey kalitesi ve geniş malzeme uyumluluğu vurgulanır.", "High detail precision, flawless surface quality, and broad material compatibility are highlighted.") },
        { question: tLocalized("Dental Curie M1 ile aynı mı?", "Is it the same as the Dental Curie M1?"), answerHtml: tLocalized("Aynı Curie M1 ailesindedir; Jewelry konfigürasyonu kuyumculuk ve mücevher tasarımı iş akışına odaklanır.", "Part of the same Curie M1 family; the Jewelry configuration focuses on jewelry-making and jewelry design workflows.") },
      ],
      videoTitleHtml: tLocalized("Curie M1 Jewelry için <span class=\"em\">teknik destek alın.</span>", "<span class=\"em\">Get technical support</span> for the Curie M1 Jewelry."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için kuyumculuk materyal uyumunu teknik destekle netleştirin.", "Since there is no product video on this product page, clarify jewelry material compatibility with technical support."),
      videoTitle: tLocalized("Curie M1 Jewelry teknik destek", "Curie M1 Jewelry technical support"),
      videoText: tLocalized("Mücevher baskı materyali, detay hedefi ve DLP üretim parametreleri için uzman desteği alın.", "Get expert support for jewelry printing material, detail targets, and DLP production parameters."),
    },
    {
      slug: CREALITY_HALOT_SKY_6K_SLUG,
      category: PRINTER_CATEGORY,
      productText: tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K"),
      kicker: tLocalized("Creality Halot-Sky 6K · Reçine 3D Yazıcı", "Creality Halot-Sky 6K · Resin 3D Printer"),
      titleHtml: tLocalized("Halot-Sky 6K, <span class=\"em\">iki cihaz geliştirmesiyle</span> seçilir.", "The Halot-Sky 6K is chosen <span class=\"em\">with two device upgrade options.</span>"),
      leadHtml:
        tLocalized("Creality Halot-Sky 6K, reçine 3D baskı için kullanılan LCD yazıcıdır. Fabrika çıkışlı versiyon ve hassasiyeti arttırılmış versiyon seçenekleriyle değerlendirilir.", "The Creality Halot-Sky 6K is an LCD printer used for resin 3D printing. It is available with factory version and enhanced-precision version options."),
      pills: [{ value: tLocalized("6K", "6K"), label: "LCD" }, { label: tLocalized("Fabrika çıkışlı", "Factory default") }, { label: tLocalized("Hassasiyeti artırılmış", "Increased precision") }, { label: tLocalized("Creality", "creality") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/050b4cbc-44eb-4c21-a80d-9e993f43bd9c/1080/creality-halot-sky-cl-89-recine-3d-yaz-fa-283.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3f2e9ecc-cda1-42c8-b85e-f9380c335cca/1080/creality-halot-sky-cl-89-recine-3d-yaz-4f83-9.webp",
      ],
      galleryBadge: tLocalized("6K", "6K"),
      metricTitleHtml: tLocalized("Reçine baskıda <span class=\"em\">6K LCD seçenekleri.</span>", "<span class=\"em\">6K LCD options</span> for resin printing."),
      metricSideHtml: tLocalized("Halot-Sky seçimi yapılırken cihaz versiyonu, reçine uyumu ve hedeflenen hassasiyet birlikte kontrol edilmelidir.", "When choosing the Halot-Sky, the device version, resin compatibility, and target precision should be checked together."),
      metrics: [
        { name: tLocalized("Çözünürlük", "Resolution"), value: tLocalized("6K", "6K"), unit: "", tag: "LCD", caption: tLocalized("Kategori kaynağında Creality Halot-Sky 6K olarak listelenir.", "Listed as the Creality Halot-Sky 6K in the category source.") },
        { name: tLocalized("Versiyon", "Version"), value: "2", unit: tLocalized("seçenek", "Seçenek"), tag: tLocalized("Variant", "variant"), caption: tLocalized("Fabrika çıkışlı ve hassasiyeti arttırılmış versiyonlar aynı ürün slug'ında listelenir.", "The factory-default and precision-enhanced versions are listed under the same product slug.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Reçine", "Resin"), unit: tLocalized("baskı", "print"), tag: "LCD", caption: tLocalized("LCD reçine 3D yazıcı üretim akışı için kullanılır.", "Used for the LCD resin 3D printer production workflow.") },
      ],
      specTag: "CREALITY HALOT-SKY · 6K",
      specTitleHtml: tLocalized("Fabrika çıkışlı veya <span class=\"em\">hassasiyeti artırılmış.</span>", "Factory-default or <span class=\"em\">precision-enhanced.</span>"),
      specDescriptionHtml: tLocalized("Halot-Sky 6K, iki cihaz geliştirmesi seçeneğiyle değerlendirilir. Seçim, kullanılacak reçine ve hassasiyet beklentisine göre netleştirilmelidir.", "The Halot-Sky 6K is evaluated with two device upgrade options. The choice should be clarified based on the resin to be used and precision expectations."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K") },
        { label: tLocalized("Teknoloji", "Technology"), value: tLocalized("LCD reçine yazıcı", "LCD resin printer") },
        { label: tLocalized("Seçenek", "Option"), value: tLocalized("Fabrika çıkışlı", "Factory default") },
        { label: tLocalized("Seçenek", "Option"), value: tLocalized("Hassasiyeti artırılmış", "Increased precision") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("3D yazıcı", "3D Printer") },
      ],
      useCaseSideHtml: tLocalized("Halot-Sky 6K; reçine baskı, dental üretime giriş ve hassasiyet ayarı isteyen LCD yazıcı akışlarında konumlanır.", "The Halot-Sky 6K is positioned for LCD printer workflows involving resin printing, entry into dental production, and precision adjustment needs."),
      useCasePhotos: [
        {
          imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/360/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp",
          imageFit: "contain",
          imageOffsetY: "-42px",
          imageScale: "0.76",
          imageBackground: "white",
          title: tLocalized("Cihaz görünümü", "Device view"),
          text: tLocalized("Halot-Sky 6K gövde ve ekran düzeni.", "Halot-Sky 6K body and screen layout."),
          alt: tLocalized("Creality Halot-Sky 6K cihaz görünümü", "Creality Halot-Sky 6K device view"),
        },
        {
          imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/050b4cbc-44eb-4c21-a80d-9e993f43bd9c/360/creality-halot-sky-cl-89-recine-3d-yaz-fa-283.webp",
          imageFit: "contain",
          imageOffsetY: "-42px",
          imageScale: "0.76",
          imageBackground: "white",
          title: tLocalized("LCD reçine baskı", "LCD resin printing"),
          text: tLocalized("6K ekranla katman ve yüzey detayının kontrolü.", "Control of layer and surface detail with the 6K screen."),
          alt: tLocalized("Creality Halot-Sky 6K LCD reçine baskı", "Creality Halot-Sky 6K LCD resin printing"),
        },
        {
          imageSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3f2e9ecc-cda1-42c8-b85e-f9380c335cca/360/creality-halot-sky-cl-89-recine-3d-yaz-4f83-9.webp",
          imageFit: "contain",
          imageOffsetY: "-42px",
          imageScale: "0.76",
          imageBackground: "white",
          title: tLocalized("Versiyon seçimi", "Version selection"),
          text: tLocalized("Fabrika çıkışlı veya hassasiyeti artırılmış seçenek.", "Factory-default or precision-enhanced option."),
          alt: tLocalized("Creality Halot-Sky 6K versiyon seçimi", "Creality Halot-Sky 6K version selection"),
        },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("LCD reçine baskı", "LCD resin printing"), tLocalized("Dental üretim başlangıç akışı", "Getting-started workflow for dental production"), tLocalized("Hassasiyet geliştirmesi isteyen uygulamalar", "Applications requiring improved precision")] },
        { eyebrow: tLocalized("Seçim", "Selection"), title: tLocalized("Hangi versiyon?", "Which version?"), items: [tLocalized("Fabrika çıkışlı versiyon", "Factory-default version"), tLocalized("Hassasiyeti arttırılmış versiyon", "Version with increased precision"), tLocalized("Reçine ve uygulama ihtiyacına göre seçim", "Selection based on resin and application needs")] },
      ],
      devicesTitle: tLocalized("Reçine, yıkama-kürleme ve teknik kalibrasyonla çalışır", "Works with resin, washing-curing, and technical calibration"),
      devicesTextHtml: tLocalized("Halot-Sky 6K seçimi yapılırken cihaz geliştirmesi, reçine parametresi ve post-process akışı birlikte kontrol edilmelidir.", "When choosing the Halot-Sky 6K, the device upgrade, resin parameters, and post-process workflow should be checked together."),
      deviceChips: [{ label: tLocalized("LCD reçine yazıcı", "LCD resin printer") }, { label: tLocalized("6K", "6K") }, { label: tLocalized("Dental reçine", "Dental resin") }, { label: tLocalized("Hassasiyet seçimi", "Precision selection"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Halot-Sky 6K kaç seçenekle değerlendiriliyor?", "How many options is the Halot-Sky 6K evaluated with?"), answerHtml: tLocalized("Fabrika çıkışlı versiyon ve hassasiyeti arttırılmış versiyon olarak iki seçenekle değerlendirilebilir.", "It can be considered with two options: the factory-default version and the precision-enhanced version.") },
        { question: tLocalized("Hangi versiyon seçilmeli?", "Which version should be chosen?"), answerHtml: tLocalized("Kullanılacak reçine, hedeflenen detay seviyesi ve üretim tipi birlikte değerlendirilerek seçilmelidir.", "The resin to be used should be selected by evaluating the targeted level of detail and the production type together.") },
        { question: tLocalized("Satın alma öncesi ne kontrol edilmeli?", "What should be checked before purchase?"), answerHtml: tLocalized("Cihaz geliştirmesi, reçine parametreleri, yıkama-kürleme akışı ve teknik destek ihtiyacı satın alma öncesi netleştirilmelidir.", "Device firmware, resin parameters, washing-curing workflow, and the need for technical support should be clarified before purchase.") },
      ],
      videoTitleHtml: tLocalized("Halot-Sky seçimini <span class=\"em\">birlikte netleştirin.</span>", "Clarify your Halot-Sky choice <span class=\"em\">together with us.</span>"),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için cihaz geliştirmesi ve reçine uyumunu teknik destekle kontrol edin.", "Since there is no product video on this product page, check device firmware and resin compatibility with technical support."),
      videoTitle: tLocalized("Creality Halot-Sky 6K teknik destek", "Creality Halot-Sky 6K technical support"),
      videoText: tLocalized("Fabrika çıkışlı veya hassasiyeti artırılmış versiyon seçimi için uzman desteği alın.", "Get expert support to choose between the factory-default or precision-enhanced version."),
    },
    {
      slug: MASH_W1E_ULTRASONIC_WASH_SLUG,
      category: WASH_CURE_CATEGORY,
      productText: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
      kicker: tLocalized("Mash W1E · Ultrasonik Yıkama", "Mash W1E · Ultrasonic Washing"),
      titleHtml: tLocalized("Baskı sonrası yüzey <span class=\"em\">temiz başlar.</span>", "The post-print surface <span class=\"em\">starts out clean.</span>"),
      leadHtml:
        tLocalized("Mash W1E, 3D baskı sonrası parçaların yüzeyindeki reçine kalıntılarını temizlemek için konumlanan ultrasonik yıkama cihazıdır. Kürleme öncesi yüzeyi hazırlayarak daha kontrollü bir post-process akışı kurmanıza yardımcı olur.", "The Mash W1E is an ultrasonic washing device designed to clean resin residue from the surface of parts after 3D printing. It helps you establish a more controlled post-processing workflow by preparing the surface before curing."),
      pills: [{ label: tLocalized("Ultrasonik yıkama", "Ultrasonic washing") }, { label: tLocalized("Baskı sonrası temizlik", "Post-print cleaning") }, { label: tLocalized("Reçine kalıntısı kontrolü", "Resin residue check") }, { label: tLocalized("C1E ile tamamlanır", "Completed with the C1E") }],
      images: [
        MASH_W1E_MAIN_IMAGE,
        mashW1eWaterTankImage,
        mashW1eControlFlowImage,
      ],
      galleryBadge: "W1E",
      metricTitleHtml: tLocalized("Yıkama adımı <span class=\"em\">kürleme öncesi zemini hazırlar.</span>", "The washing step <span class=\"em\">prepares the surface before curing.</span>"),
      metricSideHtml: tLocalized("W1E, reçine baskı sonrası yüzeyde kalan fazla materyalin temizlenmesi için yıkama adımına odaklanır.", "The W1E focuses on the washing step to clean excess material remaining on the surface after resin printing."),
      metrics: [
        { name: tLocalized("İşlem", "Process"), value: "Ultrasonik", unit: tLocalized("yıkama", "Washing"), tag: tLocalized("Wash", "wash"), caption: tLocalized("Baskı sonrası parçaların yüzey temizliği için kullanılır.", "Used for surface cleaning of parts after printing.") },
        { name: tLocalized("Akış", "Workflow"), value: "Post", unit: "process", tag: tLocalized("Baskı sonrası", "After printing"), caption: tLocalized("Kürleme öncesi yüzey hazırlığı sağlar.", "Provides surface preparation before curing.") },
        { name: tLocalized("Uyum", "Compatibility"), value: "C1E", unit: tLocalized("ile", "with"), tag: tLocalized("Tamamlayıcı", "Complementary"), caption: tLocalized("W1E yıkama adımı C1E UV kürleme adımıyla birlikte planlanır.", "The W1E washing step is planned together with the C1E UV curing step.") },
      ],
      specTag: tLocalized("MASH W1E · ULTRASONİK YIKAMA", "MASH W1E · ULTRASONIC WASHING"),
      specTitleHtml: tLocalized("Yüzey temizliği için <span class=\"em\">ayrı kontrol.</span>", "<span class=\"em\">Separate control</span> for surface cleaning."),
      specDescriptionHtml: tLocalized("W1E, reçine baskıların kürleme öncesi temizlenmesi için baskı sonrası iş akışında konumlanır.", "The W1E is positioned in the post-print workflow for cleaning resin prints before curing."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("Mash W1E", "Mash W1E") },
        { label: tLocalized("İşlem", "Process"), value: tLocalized("Ultrasonik yıkama", "Ultrasonic washing") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Reçine 3D baskı sonrası", "After resin 3D printing") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Yıkama cihazı", "Washing Unit") },
        { label: tLocalized("Marka", "Brand"), value: "Mash" },
      ],
      useCaseSideHtml: tLocalized("Reçine baskıların yüzey temizliği, kurutma ve ardından UV post-curing adımına hazırlanması için kullanılır.", "Used for surface cleaning and drying of resin prints, and preparing them for the subsequent UV post-curing step."),
      useCasePhotoLayout: "bleed",
      useCasePhotos: [
        { imageSrc: MASH_W1E_MAIN_IMAGE, imageFit: "contain", imageBackground: "white", title: tLocalized("W1E cihaz görünümü", "W1E device view"), text: tLocalized("Ultrasonik yıkama adımı için konumlanan Mash W1E cihazı.", "The Mash W1E device positioned for the ultrasonic washing step."), alt: tLocalized("Mash W1E ultrasonik yıkama cihazı", "Mash W1E ultrasonic washing device") },
        { imageSrc: mashW1eWaterTankImage, imageFit: "contain", imageBackground: "white", imageOffsetY: "28px", imageScale: "0.64", title: tLocalized("Yıkama haznesi", "Washing tank"), text: tLocalized("Reçine baskı sonrası parçaların yüzey temizliği için kullanılan hazne.", "The chamber used for surface cleaning of parts after resin printing."), alt: tLocalized("Mash W1E yıkama haznesi", "Mash W1E washing chamber") },
        { imageSrc: mashW1eControlFlowImage, imageFit: "contain", imageBackground: "white", imageOffsetY: "-68px", imageScale: "0.42", title: tLocalized("Kontrollü yıkama", "Controlled washing"), text: tLocalized("Yıkama süresi ve işlem akışının cihaz üzerinden kontrol edilmesi.", "Controlling the washing time and process flow via the device."), alt: tLocalized("Mash W1E kontrollü yıkama akışı", "Mash W1E controlled washing workflow") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Hangi adımda?", "At which step?"), items: [tLocalized("Reçine baskıların temizlenmesi", "Cleaning of resin prints"), tLocalized("Kürleme öncesi yüzey hazırlığı", "Surface preparation before curing"), tLocalized("Dental baskı sonrası yıkama", "Post-print washing for dental prints")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neyi iyileştirir?", "What does it improve?"), items: [tLocalized("Yüzeydeki fazla reçineyi azaltma", "Reducing excess resin on the surface"), tLocalized("Son kürleme öncesi temizlik", "Cleaning before final curing"), tLocalized("Daha tutarlı post-process akışı", "A more consistent post-process workflow")] },
      ],
      devicesTitle: tLocalized("Reçine baskı sonrası temizlik akışına eklenir", "Added to the cleaning workflow after resin printing"),
      devicesTextHtml: tLocalized("W1E, dental reçine baskıların yıkama adımında kullanılır. C1E UV kürleme cihazıyla birlikte konumlandığında baskı sonrası süreç daha net ayrışır.", "The W1E is used in the washing step of dental resin prints. When positioned together with the C1E UV curing device, the post-print process is more clearly separated."),
      deviceChips: [{ label: tLocalized("Ultrasonik yıkama", "Ultrasonic washing"), highlighted: true }, { label: tLocalized("Reçine baskı", "Resin printing") }, { label: tLocalized("C1E ile tamamlanır", "Completed with the C1E") }, { label: tLocalized("Post-process", "post-processing") }],
      faqItems: [
        { question: tLocalized("Mash W1E ne için kullanılır?", "What is the Mash W1E used for?"), answerHtml: tLocalized("Reçine 3D baskı sonrası parçaların yüzeyindeki kalıntıları temizlemek için kullanılır.", "Used to clean residue from the surface of parts after resin 3D printing.") },
        { question: tLocalized("W1E tek başına yeterli mi?", "Is the W1E sufficient on its own?"), answerHtml: tLocalized("W1E yıkama adımını yönetir; reçinenin nihai mekanik özellikleri için ardından uygun UV kürleme protokolü gerekir.", "The W1E manages the washing step; the appropriate UV curing protocol is then required for the resin's final mechanical properties.") },
        { question: tLocalized("C1E ile birlikte mi kullanılmalı?", "Should it be used together with the C1E?"), answerHtml: tLocalized("Evet. W1E temizlik, C1E UV post-curing adımına odaklanır; birlikte daha kontrollü bir baskı sonrası akış oluştururlar.", "Yes. The W1E focuses on cleaning and the C1E on the UV post-curing step; together they create a more controlled post-print workflow.") },
      ],
      videoTitleHtml: tLocalized("W1E için <span class=\"em\">akışı birlikte netleştirin.</span>", "For the W1E <span class=\"em\">let's clarify the workflow together.</span>"),
      videoSideHtml: tLocalized("Bu ürün için video yerine yıkama ve kürleme protokolünü teknik destekle netleştirmeniz önerilir.", "Instead of a video for this product, we recommend clarifying the washing and curing protocol with technical support."),
      videoTitle: tLocalized("Mash W1E teknik destek", "Mash W1E technical support"),
      videoText: tLocalized("Baskı sonrası yıkama sürecini kullandığınız reçine ve parça tipine göre birlikte planlayalım.", "Let's plan the post-print washing process together based on the resin and part type you use."),
    },
    {
      slug: MASH_C1E_UV_CURING_SLUG,
      category: WASH_CURE_CATEGORY,
      productText: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
      kicker: tLocalized("Mash C1E · UV Kürleme", "Mash C1E · UV Curing"),
      titleHtml: tLocalized("Dental reçine baskılar <span class=\"em\">doğru ışıkla tamamlanır.</span>", "Dental resin prints <span class=\"em\">are completed with the right light.</span>"),
      leadHtml:
        tLocalized("Mash C1E, dental 3D baskılar için geliştirilen profesyonel UV kürleme cihazıdır. Sararmayı önlemeye yardımcı olan kürleme teknolojisi, 24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle farklı dental reçinelerle uyumlu çalışır.", "The Mash C1E is a professional UV curing device developed for dental 3D prints. Its curing technology, which helps prevent yellowing, works compatibly with different dental resins thanks to its 24-LED 360° light system and wide 360-530 nm spectrum support."),
      pills: [{ value: "24", label: "LED" }, { value: "360°", label: tLocalized("ışık sistemi", "light system") }, { value: "360-530", label: tLocalized("nm spektrum", "nm spectrum") }, { label: tLocalized("UV post-curing", "UV post-curing") }],
      images: [
        MASH_C1E_MAIN_IMAGE,
        mashC1eOpenImage,
        mashC1eDentalCureImage,
      ],
      galleryBadge: "C1E",
      metricTitleHtml: tLocalized("UV kürleme <span class=\"em\">mekanik sonucu tamamlar.</span>", "UV curing <span class=\"em\">completes the mechanical result.</span>"),
      metricSideHtml: tLocalized("C1E, dental reçine baskıların son kürleme adımında ışık dağılımını ve spektrum uyumunu kontrol altına almak için konumlanır.", "The C1E is positioned to keep light distribution and spectrum compatibility under control in the final curing step of dental resin prints."),
      metrics: [
        { name: "LED", value: "24", unit: tLocalized("adet", "pcs"), tag: tLocalized("Işık", "Light"), caption: tLocalized("360° ışık sistemiyle homojen kürleme hedeflenir.", "Homogeneous curing is targeted with the 360° light system.") },
        { name: tLocalized("Açı", "Angle"), value: "360", unit: "°", tag: tLocalized("Kapsama", "Coverage"), caption: tLocalized("Parça çevresinde daha dengeli ışık dağılımı için kullanılır.", "Used for more balanced light distribution around the part.") },
        { name: tLocalized("Spektrum", "Spectrum"), value: "360", unit: "-530 nm", tag: "UV", caption: tLocalized("Farklı dental reçine protokolleriyle uyumlu geniş spektrum desteği.", "Wide spectrum support compatible with different dental resin protocols.") },
      ],
      specTag: "MASH C1E · 24 LED / 360-530 NM",
      specTitleHtml: tLocalized("Sararmayı azaltmaya yardımcı <span class=\"em\">kontrollü post-curing.</span>", "<span class=\"em\">Controlled post-curing</span> that helps reduce yellowing."),
      specDescriptionHtml: tLocalized("C1E, reçine baskıların UV post-curing adımında dayanım, yüzey kalitesi ve renk stabilitesini desteklemek için kullanılır.", "The C1E is used to support strength, surface quality, and color stability in the UV post-curing step of resin prints."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: tLocalized("Mash C1E", "Mash C1E") },
        { label: tLocalized("İşlem", "Process"), value: tLocalized("UV kürleme", "UV curing") },
        { label: tLocalized("Işık sistemi", "Light system"), value: "24 LED / 360°" },
        { label: tLocalized("Spektrum", "Spectrum"), value: tLocalized("360-530 nm", "360-530nm") },
        { label: tLocalized("Marka", "Brand"), value: "Mash" },
      ],
      useCaseSideHtml: tLocalized("Yıkama sonrası dental reçine parçaların nihai post-curing adımında, reçine protokolüne göre kullanılır.", "Used according to the resin protocol in the final post-curing step of dental resin parts after washing."),
      useCasePhotoLayout: "uniform",
      useCasePhotos: [
        {
          imageSrc: MASH_C1E_MAIN_IMAGE,
          imageFit: "contain",
          imageBackground: "white",
          title: tLocalized("C1E cihaz görünümü", "C1E device view"),
          text: tLocalized("UV kürleme adımı için konumlanan Mash C1E cihaz gövdesi.", "The Mash C1E device body positioned for the UV curing step."),
          alt: tLocalized("Mash C1E UV kürleme cihazı", "Mash C1E UV curing device"),
        },
        {
          imageSrc: mashC1eOpenImage,
          imageFit: "contain",
          imageBackground: "white",
          imageOffsetY: "-82px",
          imageScale: "0.60",
          title: tLocalized("UV kürleme cihazı", "UV curing device"),
          text: tLocalized("Yıkama sonrası parçaların kontrollü UV post-curing adımı için kullanılır.", "Used for the controlled UV post-curing step of parts after washing."),
          alt: tLocalized("Mash C1E kapağı açık UV kürleme cihazı", "Mash C1E UV curing device with open lid"),
        },
        {
          imageSrc: mashC1eDentalCureImage,
          imageFit: "contain",
          imageBackground: "white",
          title: tLocalized("Dental parça kürleme", "Dental part curing"),
          text: tLocalized("Dental reçine parçalar, cihaz içindeki ışık düzeniyle kürleme sürecine alınır.", "Dental resin parts are cured using the light arrangement inside the device."),
          alt: tLocalized("Mash C1E içinde dental reçine parça kürleme", "Curing dental resin parts inside the Mash C1E"),
        },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Hangi adımda?", "At which step?"), items: [tLocalized("Yıkama sonrası UV kürleme", "Post-wash UV curing"), tLocalized("Dental reçine baskıların post-curing süreci", "Post-curing process of dental resin prints"), tLocalized("Renk ve mekanik stabilite hedefi", "Color and mechanical stability goal")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neyi netleştirir?", "What does it clarify?"), items: [tLocalized("Kürleme süresi", "Curing time"), tLocalized("Reçine protokolü", "Resin protocol"), tLocalized("Işık spektrumu uyumu", "Light spectrum compatibility")] },
      ],
      devicesTitle: tLocalized("W1E yıkama sonrası C1E ile kürleme tamamlanır", "Curing with the C1E is completed after W1E washing"),
      devicesTextHtml: tLocalized("C1E, yıkanmış reçine baskıların UV post-curing adımına odaklanır. Reçine tipine göre süre ve işlem protokolünü birlikte netleştirebiliriz.", "The C1E focuses on the UV post-curing step of washed resin prints. We can work out the duration and process protocol together based on the resin type."),
      deviceChips: [{ label: tLocalized("UV post-curing", "UV post-curing"), highlighted: true }, { label: tLocalized("24 LED", "24 LEDs") }, { label: tLocalized("360° ışık", "360° light") }, { label: tLocalized("360-530 nm", "360-530nm") }],
      faqItems: [
        { question: tLocalized("Mash C1E ne için kullanılır?", "What is the Mash C1E used for?"), answerHtml: tLocalized("Dental reçine 3D baskıların yıkama sonrası UV post-curing adımında kullanılır.", "Used in the UV post-curing step after washing dental resin 3D prints.") },
        { question: tLocalized("360-530 nm spektrum ne sağlar?", "What does the 360-530 nm spectrum provide?"), answerHtml: tLocalized("Geniş spektrum desteği, farklı dental reçine protokolleriyle daha uyumlu bir kürleme akışı kurmaya yardımcı olur.", "Wide spectrum support helps establish a curing workflow that is more compatible with different dental resin protocols.") },
        { question: tLocalized("W1E ile birlikte mi kullanılmalı?", "Should it be used together with the W1E?"), answerHtml: tLocalized("W1E yıkama adımını, C1E ise UV kürleme adımını yönetir. Dental baskı sonrası süreçte bu iki adım birbirini tamamlar.", "The W1E manages the washing step, while the C1E manages the UV curing step. These two steps complement each other in the dental post-print process.") },
      ],
      videoTitleHtml: tLocalized("C1E protokolünü <span class=\"em\">reçinenize göre netleştirin.</span>", "<span class=\"em\">Clarify the C1E protocol based on your resin.</span>"),
      videoSideHtml: tLocalized("Bu ürün için video yerine kürleme protokolünü reçine ve yazıcı parametreleriyle birlikte kontrol edin.", "Instead of a video for this product, check the curing protocol together with the resin and printer parameters."),
      videoTitle: tLocalized("Mash C1E teknik destek", "Mash C1E technical support"),
      videoText: tLocalized("UV post-curing süresini ve işlem akışını kullandığınız reçineye göre birlikte planlayalım.", "Let's plan the UV post-curing time and workflow together based on the resin you use."),
    },
    {
      slug: CREALITY_WASH_CURE_UW03_SLUG,
      category: WASH_CURE_CATEGORY,
      productText: "Creality Wash&Cure UW-03",
      kicker: tLocalized("Creality Wash&Cure UW-03 · Yıkama ve Kürleme", "Creality Wash&Cure UW-03 · Washing and Curing"),
      titleHtml: tLocalized("Baskı sonrası süreç <span class=\"em\">tek cihazda</span> tamamlanır.", "The post-print process is completed <span class=\"em\">on a single device.</span>"),
      leadHtml:
        tLocalized("Creality Wash&Cure UW-03, 3D yazıcı baskıları için hızlı yıkama ve kürleme makinesidir. Baskıların doğru mekanik değerlere ulaşabilmesi için 365 nm ve 405 nm ışık dalga boyuyla kürleme yapar.", "The Creality Wash&Cure UW-03 is a fast washing and curing machine for 3D printer prints. It cures with 365 nm and 405 nm light wavelengths so prints reach the correct mechanical values."),
      pills: [{ value: "365 / 405", label: tLocalized("nm UV", "nm UV") }, { label: tLocalized("Yıkama", "Washing") }, { label: tLocalized("Kürleme", "Curing") }, { label: tLocalized("Reçine baskı sonrası", "After resin printing") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d984fa46-ceee-4778-aca0-2d2fe65b4a73/1080/washcure-website-4.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/152789ed-cca6-47ff-8018-c1ee04e645a6/1080/washcure-website-1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6b8fae85-844f-4bf6-872b-a7e32c817a0f/1080/washcure-website-5.webp",
      ],
      galleryBadge: "UW-03",
      metricTitleHtml: tLocalized("Yıkama ve kürleme <span class=\"em\">aynı akışta.</span>", "Washing and curing <span class=\"em\">in the same flow.</span>"),
      metricSideHtml: tLocalized("UW-03, reçine baskı sonrası temizleme ve UV kürleme adımlarını tek cihazla yönetmek için kullanılır.", "The UW-03 is used to manage the cleaning and UV curing steps after resin printing with a single device."),
      metrics: [
        { name: tLocalized("Dalga Boyu", "Wavelength"), value: "365", unit: "/ 405 nm", tag: "UV", caption: tLocalized("Kaynak ürün sayfasında listelenen kürleme dalga boyları.", "The curing wavelengths listed on the source product page.") },
        { name: tLocalized("Süreç", "Process"), value: tLocalized("Wash", "wash"), unit: "& Cure", tag: tLocalized("2 aşama", "2 stages"), caption: tLocalized("Baskı sonrası yıkama ve kürleme adımları için tek cihaz.", "A single device for the post-print washing and curing steps.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Reçine", "Resin"), unit: tLocalized("baskı", "print"), tag: tLocalized("Post-process", "post-processing"), caption: tLocalized("3D yazıcı reçine baskılarının son işlem süreci için kullanılır.", "Used for the post-processing of 3D printer resin prints.") },
      ],
      specTag: "CREALITY UW-03 · 365 / 405 NM",
      specTitleHtml: tLocalized("Mekanik değerler için <span class=\"em\">doğru kürleme.</span>", "The right curing <span class=\"em\">for optimal mechanical values.</span>"),
      specDescriptionHtml: tLocalized("UW-03, reçine baskıların yıkama sonrası UV ışıkla kürlenmesi ve nihai mekanik değerlere ulaşması için konumlandırılır.", "The UW-03 is positioned for post-wash UV curing of resin prints to achieve their final mechanical values."),
      specRows: [
        { label: tLocalized("Cihaz", "Device"), value: "Wash&Cure UW-03" },
        { label: tLocalized("İşlem", "Process"), value: tLocalized("Yıkama + kürleme", "Washing + curing") },
        { label: "UV", value: "365 nm / 405 nm" },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Reçine 3D baskı", "Resin 3D printing") },
        { label: tLocalized("Marka", "Brand"), value: tLocalized("Creality", "creality") },
      ],
      useCaseSideHtml: tLocalized("Reçine baskıların temizlenmesi, kurutulması ve UV kürlenmesi için post-process cihazı.", "A post-processing device for cleaning, drying, and UV-curing resin prints."),
      useCasePhotos: [
        { imageIndex: 1, title: tLocalized("Yıkama", "Washing"), text: tLocalized("Baskı üzerindeki reçine kalıntılarını temizleme.", "Cleaning resin residue off the print."), alt: tLocalized("Creality UW-03 yıkama", "Creality UW-03 washing") },
        { imageIndex: 2, title: tLocalized("Kürleme", "Curing"), text: tLocalized("365 ve 405 nm UV ışıkla son kürleme.", "Final curing with 365 and 405 nm UV light."), alt: tLocalized("Creality UW-03 kürleme", "Creality UW-03 curing") },
        { imageIndex: 2, title: tLocalized("Post-process", "post-processing"), text: tLocalized("Baskı sonrası mekanik değerleri destekleyen akış.", "A workflow that supports mechanical values after printing."), alt: tLocalized("Creality UW-03 post-process", "Creality UW-03 post-processing") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Hangi adımlarda?", "At which steps?"), items: [tLocalized("Reçine baskıların yıkanması", "Washing of resin prints"), tLocalized("UV ışıkla son kürleme", "Final curing with UV light"), tLocalized("Dental reçine baskılarda post-process", "Post-processing in dental resin prints")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Reçineye uygun süre", "The appropriate duration for the resin"), tLocalized("Yıkama sonrası kurutma", "Post-wash drying"), tLocalized("Kürleme dalga boyu ve çevrim", "Curing wavelength and cycle")] },
      ],
      devicesTitle: tLocalized("LCD ve DLP reçine baskı akışıyla çalışır", "Works with the LCD and DLP resin printing workflow"),
      devicesTextHtml: tLocalized("UW-03, reçine 3D baskıların baskı sonrası yıkama ve kürleme süreci için kullanılır. Reçine tipine göre süre ve işlem akışını birlikte netleştirebiliriz.", "The UW-03 is used for the post-print washing and curing process of resin 3D prints. We can clarify the duration and workflow together based on the resin type."),
      deviceChips: [{ label: tLocalized("LCD reçine yazıcı", "LCD resin printer") }, { label: tLocalized("DLP reçine yazıcı", "DLP resin printer") }, { label: tLocalized("Dental reçineler", "Dental resins") }, { label: tLocalized("365 / 405 nm", "365/405nm"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Creality Wash&Cure UW-03 ne için kullanılır?", "What is the Creality Wash&Cure UW-03 used for?"), answerHtml: tLocalized("Reçine 3D baskıların yıkanması ve UV ışıkla kürlenmesi için kullanılır.", "Used for washing and UV-curing resin 3D prints.") },
        { question: tLocalized("Hangi dalga boylarında kürleme yapar?", "At which wavelengths does it cure?"), answerHtml: tLocalized("Ürün sayfasında 365 nm ve 405 nm ışık dalga boyuyla kürleme bilgisi yer alır.", "The product page includes curing information at 365 nm and 405 nm light wavelengths.") },
        { question: tLocalized("Dental reçinelerle kullanılır mı?", "Can it be used with dental resins?"), answerHtml: tLocalized("Reçine baskıların post-process sürecinde kullanılır; süre ve işlem akışı reçineye göre netleştirilmelidir.", "Used in the post-processing of resin prints; duration and workflow should be clarified according to the resin.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=b3cLqCnfKAk",
      videoTitleHtml: tLocalized("UW-03 akışını <span class=\"em\">videoda görün.</span>", "See the UW-03 workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("Ürün sayfasındaki UW-03 videosu ile yıkama ve kürleme akışını inceleyin.", "Watch the UW-03 video on the product page to see the washing and curing workflow."),
      videoTitle: "Creality Wash&Cure UW-03",
      videoText: tLocalized("Reçine baskı sonrası yıkama ve kürleme sürecine odaklanan ürün videosu.", "A product video focused on the washing and curing process after resin printing."),
    },
    {
      slug: THREESHAPE_E2_SLUG,
      category: SCANNER_CATEGORY,
      productText: tLocalized("3Shape E2", "3Shape E2"),
      kicker: tLocalized("3Shape E2 · Masaüstü Tarayıcı", "3Shape E2 · Desktop Scanner"),
      titleHtml: tLocalized("Üretken laboratuvarlar için <span class=\"em\">doku taraması.</span>", "<span class=\"em\">Tissue scanning</span> for productive laboratories."),
      leadHtml:
        tLocalized("3Shape E2, diş laboratuvarlarının üretkenliğini artırmak ve üst düzey doku taraması yapmak için tasarlanmış masaüstü tarayıcıdır. Siyah beyaz dokuya sahip olan E2, daha fazla hassasiyet ve doğruluk sunar.", "The 3Shape E2 is a desktop scanner designed to increase dental labs' productivity and perform high-level texture scanning. With black-and-white texture, the E2 offers greater precision and accuracy."),
      pills: [{ label: tLocalized("Masaüstü tarayıcı", "Desktop scanner") }, { label: tLocalized("Doku taraması", "Tissue scanning") }, { label: tLocalized("Laboratuvar", "Lab") }, { label: tLocalized("3Shape", "3Shape") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d2937ac4-16ad-4c18-a76e-24a2b26ced24/1080/e2-new-red-2.webp"],
      galleryBadge: "3SHAPE",
      metricTitleHtml: tLocalized("Giriş seviyesi değil, <span class=\"em\">üretken tarama.</span>", "Not entry-level — <span class=\"em\">productive scanning.</span>"),
      metricSideHtml: tLocalized("E2, laboratuvar üretkenliğini artırmak ve doğru model taraması yapmak için konumlandırılır.", "The E2 is positioned to increase lab productivity and provide accurate model scanning."),
      metrics: [
        { name: tLocalized("Tarama", "Scanning"), value: "Doku", unit: "", tag: tLocalized("E2", "E2"), caption: tLocalized("Ürün sayfasında üst düzey doku taraması vurgulanır.", "The product page highlights top-tier tissue scanning.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Lab", "laboratory"), unit: "", tag: tLocalized("Dental", "dental"), caption: tLocalized("Diş laboratuvarları için masaüstü tarayıcı.", "Desktop scanner for dental laboratories.") },
        { name: tLocalized("Odak", "Focus"), value: tLocalized("Doğru", "Correct"), unit: "tarama", tag: tLocalized("3Shape", "3Shape"), caption: tLocalized("Her vaka için hassasiyet ve doğruluk hedefler.", "Aims for precision and accuracy in every case.") },
      ],
      specTag: "3SHAPE E2 · DOKU TARAMASI",
      specTitleHtml: tLocalized("Daha doğru model için <span class=\"em\">stabil tarama.</span>", "<span class=\"em\">Stable scanning</span> for a more accurate model."),
      specDescriptionHtml: tLocalized("3Shape E2, laboratuvar model ve doku tarama işlerinde üretkenliği artırmaya odaklanan masaüstü tarayıcıdır.", "The 3Shape E2 is a desktop scanner focused on increasing productivity in lab model and texture scanning work."),
      specRows: [
        { label: tLocalized("Marka", "Brand"), value: tLocalized("3Shape", "3Shape") },
        { label: tLocalized("Model", "Model"), value: tLocalized("E2", "E2") },
        { label: tLocalized("Tip", "Medicine"), value: tLocalized("Masaüstü tarayıcı", "Desktop scanner") },
        { label: tLocalized("Odak", "Focus"), value: tLocalized("Doku taraması", "Tissue scanning") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental laboratuvar", "dental laboratory") },
      ],
      useCaseSideHtml: tLocalized("Model ve doku tarama akışında laboratuvar üretkenliğini artırmak için kullanılır.", "Used to increase laboratory productivity in model and tissue scanning workflows."),
      useCasePhotos: [
        { title: tLocalized("Model tarama", "Model scanning"), text: tLocalized("Laboratuvar model tarama akışları.", "Laboratory model scanning workflows."), alt: tLocalized("3Shape E2 model tarama", "3Shape E2 model scanning") },
        { title: tLocalized("Doku tarama", "tissue scanning"), text: tLocalized("Doku detaylarının dijital ortama aktarılması.", "Transferring tissue details into a digital environment."), alt: tLocalized("3Shape E2 doku tarama", "3Shape E2 texture scanning") },
        { title: tLocalized("CAD/CAM giriş", "CAD/CAM entry"), text: tLocalized("Tarama datasından dijital tasarım akışı.", "Digital design workflow from scan data."), alt: tLocalized("3Shape E2 CAD CAM", "3Shape E2 CAD CAM") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Dental laboratuvar model taraması", "Dental lab model scanning"), tLocalized("Doku tarama işleri", "Tissue scanning work"), tLocalized("CAD/CAM üretim başlangıcı", "CAD/CAM production start")] },
        { eyebrow: tLocalized("Seçim", "Selection"), title: tLocalized("Kimler için?", "Who is it for?"), items: [tLocalized("Üretkenliği artırmak isteyen laboratuvarlar", "Laboratories looking to boost productivity"), tLocalized("Doğru ve stabil tarama isteyen ekipler", "Teams that need accurate and stable scanning"), tLocalized("3Shape ekosistemine geçiş yapanlar", "Those switching to the 3Shape ecosystem")] },
      ],
      devicesTitle: tLocalized("Dental laboratuvar CAD/CAM akışıyla çalışır", "Works with the dental lab CAD/CAM workflow"),
      devicesTextHtml: tLocalized("Tarayıcı verisi, tasarım ve üretim adımlarına temel oluşturur. Mevcut CAD/CAM sürecinizle uyumu birlikte değerlendirebiliriz.", "Scanner data forms the basis for the design and production steps. We can evaluate compatibility with your existing CAD/CAM process together."),
      deviceChips: [{ label: tLocalized("3Shape CAD", "3Shape CAD") }, { label: tLocalized("Model tarama", "Model scanning") }, { label: tLocalized("Doku tarama", "tissue scanning") }, { label: tLocalized("Laboratuvar", "Lab"), highlighted: true }],
      faqItems: [
        { question: tLocalized("3Shape E2 ne için kullanılır?", "What is the 3Shape E2 used for?"), answerHtml: tLocalized("Dental laboratuvarlarda model ve doku taraması için kullanılan masaüstü tarayıcıdır.", "A desktop scanner used for model and tissue scanning in dental laboratories.") },
        { question: tLocalized("E2'nin öne çıkan tarafı nedir?", "What stands out about the E2?"), answerHtml: tLocalized("Ürün sayfasında üretkenlik, üst düzey doku taraması, hassasiyet ve doğruluk vurgulanır.", "The product page highlights productivity, top-tier tissue scanning, precision, and accuracy.") },
        { question: tLocalized("Hangi iş akışına bağlanır?", "Which workflow does it connect to?"), answerHtml: tLocalized("Tarama datası CAD/CAM tasarım ve üretim iş akışının başlangıcıdır.", "Scan data is the starting point of the CAD/CAM design and production workflow.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=6IUVgU336Qc",
      videoTitleHtml: tLocalized("3Shape tarama akışını <span class=\"em\">videoda görün.</span>", "See the 3Shape scanning workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("E serisi masaüstü tarayıcı kullanımını ürün sayfasındaki video üzerinden inceleyin.", "Review the use of the E series desktop scanner through the video on the product page."),
      videoTitle: tLocalized("3Shape E2 masaüstü tarayıcı", "3Shape E2 desktop scanner"),
      videoText: tLocalized("Laboratuvar tarama ve dijital iş akışı videosu.", "Laboratory scanning and digital workflow video."),
    },
    {
      slug: THREESHAPE_E3_SLUG,
      category: SCANNER_CATEGORY,
      productText: tLocalized("3Shape E3", "3Shape E3"),
      kicker: tLocalized("3Shape E3 · İmplant Bar Doğruluğu", "3Shape E3 · Implant Bar Accuracy"),
      titleHtml: tLocalized("İmplant bar işleri için <span class=\"em\">yüksek performans.</span>", "<span class=\"em\">High performance</span> for implant bar work."),
      leadHtml:
        tLocalized("3Shape E3, uygun maliyetle yüksek performans sunan masaüstü tarayıcıdır. Özellikle implant bar doğruluğu için tasarlanmış olan E3, diş laboratuvarlarının ihtiyaçlarını karşılamak üzere üretilmiştir.", "The 3Shape E3 is a desktop scanner offering high performance at an affordable cost. Designed specifically for implant bar accuracy, the E3 is built to meet the needs of dental labs."),
      pills: [{ label: tLocalized("İmplant bar", "Implant bar") }, { label: tLocalized("Yüksek performans", "High performance") }, { label: tLocalized("Masaüstü tarayıcı", "Desktop scanner") }, { label: tLocalized("3Shape", "3Shape") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0adf4e0d-a7a0-48ef-b2f2-65b9c5719703/1080/e3-new-red.webp"],
      galleryBadge: "3SHAPE",
      metricTitleHtml: tLocalized("Bar doğruluğu için <span class=\"em\">performans dengesi.</span>", "<span class=\"em\">A performance balance</span> for bar accuracy."),
      metricSideHtml: tLocalized("E3, implant bar doğruluğu ve yüksek performans ihtiyacını uygun maliyetle karşılamak için konumlandırılır.", "The E3 is positioned to meet the need for implant bar accuracy and high performance at an affordable cost."),
      metrics: [
        { name: tLocalized("Odak", "Focus"), value: "Bar", unit: tLocalized("doğruluğu", "accuracy"), tag: tLocalized("Implant", "implant"), caption: tLocalized("Ürün sayfasında implant bar doğruluğu özellikle vurgulanır.", "It is stated on the product page that it is specifically designed for implant bar accuracy.") },
        { name: tLocalized("Performans", "Performance"), value: tLocalized("Yüksek", "High"), unit: "", tag: tLocalized("E3", "E3"), caption: tLocalized("Uygun maliyetle yüksek performans hedefler.", "Targets high performance at an affordable cost.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Lab", "laboratory"), unit: "", tag: tLocalized("Dental", "dental"), caption: tLocalized("Dental laboratuvar ihtiyaçları için tasarlanmıştır.", "Designed for dental laboratory needs.") },
      ],
      specTag: "3SHAPE E3 · IMPLANT BAR",
      specTitleHtml: tLocalized("İmplant bar doğruluğu için <span class=\"em\">doğru tarayıcı.</span>", "The <span class=\"em\">right scanner</span> for implant bar accuracy."),
      specDescriptionHtml: tLocalized("3Shape E3, implant bar doğruluğu ve yüksek performans gerektiren dental laboratuvar taramalarında kullanılır.", "The 3Shape E3 is used in dental lab scans requiring implant bar accuracy and high performance."),
      specRows: [
        { label: tLocalized("Marka", "Brand"), value: tLocalized("3Shape", "3Shape") },
        { label: tLocalized("Model", "Model"), value: tLocalized("E3", "E3") },
        { label: tLocalized("Tip", "Medicine"), value: tLocalized("Masaüstü tarayıcı", "Desktop scanner") },
        { label: tLocalized("Odak", "Focus"), value: tLocalized("İmplant bar doğruluğu", "Implant bar accuracy") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Dental laboratuvar", "dental laboratory") },
      ],
      useCaseSideHtml: tLocalized("İmplant bar doğruluğu, model tarama ve CAD/CAM hazırlık işlerinde kullanılır.", "Used in implant bar accuracy, model scanning, and CAD/CAM preparation work."),
      useCasePhotos: [
        { title: tLocalized("İmplant bar", "Implant bar"), text: tLocalized("Bar doğruluğu gereken laboratuvar işleri.", "Lab work requiring bar accuracy."), alt: tLocalized("3Shape E3 implant bar", "3Shape E3 implant bar") },
        { title: tLocalized("Model tarama", "Model scanning"), text: tLocalized("Dental model taramalarında stabil veri.", "Stable data in dental model scans."), alt: tLocalized("3Shape E3 model tarama", "3Shape E3 model scanning") },
        { title: tLocalized("CAD/CAM", "CAD/CAM"), text: tLocalized("Dijital tasarım ve üretim akışına hazırlık.", "Preparation for the digital design and production workflow."), alt: tLocalized("3Shape E3 CAD CAM", "3Shape E3 CAD CAM") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("İmplant bar işleri", "Implant bar work"), tLocalized("Laboratuvar model taraması", "Laboratory model scanning"), tLocalized("CAD/CAM üretim hazırlığı", "CAD/CAM production preparation")] },
        { eyebrow: tLocalized("Seçim", "Selection"), title: tLocalized("Kimler için?", "Who is it for?"), items: [tLocalized("İmplant bar doğruluğu isteyen laboratuvarlar", "Laboratories seeking implant bar accuracy"), tLocalized("Yüksek performansı uygun maliyetle arayan ekipler", "Teams seeking high performance at an affordable cost"), tLocalized("3Shape E serisi akışını kullananlar", "Those using the 3Shape E series workflow")] },
      ],
      devicesTitle: tLocalized("İmplant ve CAD/CAM laboratuvar akışıyla çalışır", "Works with the implant and CAD/CAM lab workflow"),
      devicesTextHtml: tLocalized("E3, implant bar doğruluğu gerektiren dijital işlerde tarama verisini CAD/CAM sürecine hazırlar.", "The E3 prepares scan data for the CAD/CAM process in digital work requiring implant bar accuracy."),
      deviceChips: [{ label: tLocalized("İmplant bar", "Implant bar") }, { label: tLocalized("Dental model", "dental model") }, { label: tLocalized("3Shape CAD", "3Shape CAD") }, { label: tLocalized("Yüksek performans", "High performance"), highlighted: true }],
      faqItems: [
        { question: tLocalized("3Shape E3 hangi işlerde öne çıkar?", "In which jobs does the 3Shape E3 stand out?"), answerHtml: tLocalized("Ürün sayfasında özellikle implant bar doğruluğu için tasarlandığı belirtilir.", "The product page states that it is specifically designed for implant bar accuracy.") },
        { question: tLocalized("E3 laboratuvar için mi?", "Is the E3 for the lab?"), answerHtml: tLocalized("Evet. Dental laboratuvar ihtiyaçlarını karşılamak üzere konumlandırılmış masaüstü tarayıcıdır.", "Yes. It is a desktop scanner positioned to meet dental laboratory needs.") },
        { question: tLocalized("E2 ile farkı nedir?", "What is the difference from the E2?"), answerHtml: tLocalized("E3 tarafında implant bar doğruluğu ve yüksek performans vurgusu öne çıkar.", "On the E3 side, the emphasis is on implant bar accuracy and high performance.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=6IUVgU336Qc",
      videoTitleHtml: tLocalized("E3 tarama akışını <span class=\"em\">videoda görün.</span>", "See the E3 scanning workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("3Shape masaüstü tarayıcı videosu ile E serisi iş akışını inceleyin.", "Review the E series workflow with the 3Shape desktop scanner video."),
      videoTitle: tLocalized("3Shape E3 masaüstü tarayıcı", "3Shape E3 desktop scanner"),
      videoText: tLocalized("İmplant bar ve laboratuvar tarama akışına odaklanan video.", "A video focused on implant bar and laboratory scanning workflow."),
    },
    {
      slug: THREESHAPE_E4_SLUG,
      category: SCANNER_CATEGORY,
      productText: tLocalized("3Shape E4", "3Shape E4"),
      kicker: tLocalized("3Shape E4 · Hız ve Hassasiyet", "3Shape E4 · Speed and Precision"),
      titleHtml: tLocalized("Dört kamera ile <span class=\"em\">en güçlü E serisi.</span>", "<span class=\"em\">The most powerful E series</span> with four cameras."),
      leadHtml:
        tLocalized("3Shape E4, iki kat hız, iki kat hassasiyet ve dört kamera ile E serisinin en güçlü cihazıdır. 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla yüksek hacimli laboratuvar iş akışları için konumlandırılır.", "The 3Shape E4 is the most powerful device in the E series, with double the speed, double the precision, and four cameras. It's positioned for high-volume lab workflows with 4 μm precision and a 9-second full-arch scanning speed."),
      pills: [{ value: "4", label: tLocalized("μm hassasiyet", "μm precision") }, { value: "9 sn", label: tLocalized("tam çene", "full arch") }, { value: "4", label: "kamera" }, { label: tLocalized("E serisi", "E series") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/f6ee476e-9d5a-4744-b561-b2990f9db4ae/1080/4-1550872.webp"],
      galleryBadge: "3SHAPE",
      metricTitleHtml: tLocalized("Hız ve hassasiyet <span class=\"em\">aynı cihazda.</span>", "Speed and precision <span class=\"em\">in the same device.</span>"),
      metricSideHtml: tLocalized("E4, E serisinin en güçlü cihazı olarak hızlı tam çene tarama ve yüksek hassasiyet gerektiren üretimlerde öne çıkar.", "As the most powerful device in the E series, the E4 stands out in production requiring fast full-arch scanning and high precision."),
      metrics: [
        { name: tLocalized("Hassasiyet", "Accuracy"), value: "4", unit: "μm", tag: tLocalized("E4", "E4"), caption: tLocalized("Ürün sayfasında listelenen hassasiyet değeri.", "The precision value listed on the product page.") },
        { name: tLocalized("Tam Çene", "Full Arch"), value: "9", unit: "sn", tag: tLocalized("Scan", "scan"), caption: tLocalized("Kaynakta belirtilen tam çene tarama hızı.", "The full-arch scanning speed specified in the source.") },
        { name: tLocalized("Kamera", "Camera"), value: "4", unit: tLocalized("adet", "pcs"), tag: tLocalized("E serisi", "E series"), caption: tLocalized("Dört kamera ile E serisinin en güçlü cihazı olarak konumlandırılır.", "Positioned as the most powerful device in the E series, with four cameras.") },
      ],
      specTag: tLocalized("3SHAPE E4 · 4 μM · 9 SN", "3SHAPE E4 4 μM 9 SEC"),
      specTitleHtml: tLocalized("Yüksek hacimli lab için <span class=\"em\">hızlı tarama.</span>", "<span class=\"em\">Fast scanning</span> for high-volume labs."),
      specDescriptionHtml: tLocalized("E4; dört kamera, 4 μm hassasiyet ve 9 saniye tam çene tarama hızıyla hızlı ve hassas laboratuvar taramalarına odaklanır.", "The E4 focuses on fast and precise lab scans with four cameras, 4 μm precision, and a 9-second full-arch scanning speed."),
      specRows: [
        { label: tLocalized("Marka", "Brand"), value: tLocalized("3Shape", "3Shape") },
        { label: tLocalized("Model", "Model"), value: tLocalized("E4", "E4") },
        { label: tLocalized("Hassasiyet", "Accuracy"), value: tLocalized("4 μm", "4μm") },
        { label: tLocalized("Tam çene", "Full arch"), value: "9 sn" },
        { label: tLocalized("Kamera", "Camera"), value: "4" },
      ],
      useCaseSideHtml: tLocalized("Hızlı tam çene tarama, yüksek hassasiyet ve yoğun laboratuvar üretiminde kullanılır.", "Used for fast full-arch scanning, high precision, and high-volume laboratory production."),
      useCasePhotos: [
        { title: tLocalized("Tam çene", "Full arch"), text: tLocalized("9 saniye tam çene tarama bilgisiyle hızlı akış.", "A fast workflow with 9-second full-arch scanning."), alt: tLocalized("3Shape E4 tam çene tarama", "3Shape E4 full-arch scanning") },
        { title: tLocalized("Hassas tarama", "Precise scanning"), text: tLocalized("4 μm hassasiyet gerektiren işler.", "Jobs requiring 4 μm precision."), alt: tLocalized("3Shape E4 hassas tarama", "3Shape E4 precision scanning") },
        { title: tLocalized("Yoğun lab", "Busy lab"), text: tLocalized("Yüksek hacimli laboratuvar üretimi.", "High-volume laboratory production."), alt: tLocalized("3Shape E4 laboratuvar üretimi", "3Shape E4 lab production") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede öne çıkar?", "Where does it stand out?"), items: [tLocalized("Tam çene tarama", "Full-arch scanning"), tLocalized("Yüksek hacimli laboratuvar akışları", "High-volume laboratory workflows"), tLocalized("Hız ve hassasiyet isteyen CAD/CAM süreçleri", "CAD/CAM processes that require speed and precision")] },
        { eyebrow: tLocalized("Seçim", "Selection"), title: tLocalized("Kimler için?", "Who is it for?"), items: [tLocalized("E serisinin en güçlü cihazını isteyen laboratuvarlar", "Laboratories that want the most powerful device in the E series"), tLocalized("Hızlı tarama ihtiyacı olan ekipler", "Teams that need fast scanning"), tLocalized("4 μm hassasiyet hedefleyen işler", "Jobs targeting 4 μm precision")] },
      ],
      devicesTitle: tLocalized("Yüksek hacimli dental CAD/CAM akışıyla çalışır", "Works with high-volume dental CAD/CAM workflows"),
      devicesTextHtml: tLocalized("E4, hızlı tarama datasını tasarım ve üretim sürecine taşır. Laboratuvar kapasitenize göre E2/E3/E4 seçimini birlikte netleştirebiliriz.", "The E4 carries fast scan data into the design and production process. We can clarify your E2/E3/E4 choice together based on your lab capacity."),
      deviceChips: [{ label: tLocalized("Tam çene tarama", "Full-arch scanning") }, { label: tLocalized("4 kamera", "4 cameras") }, { label: tLocalized("3Shape CAD", "3Shape CAD") }, { label: tLocalized("4 μm", "4μm"), highlighted: true }],
      faqItems: [
        { question: tLocalized("3Shape E4 neden öne çıkar?", "Why does the 3Shape E4 stand out?"), answerHtml: tLocalized("Ürün sayfasında iki kat hız, iki kat hassasiyet, dört kamera, 4 μm hassasiyet ve 9 sn tam çene tarama bilgileri yer alır.", "The product page includes information on firing under normal atmosphere or vacuum.") },
        { question: tLocalized("E4 hangi laboratuvarlar için uygundur?", "Which laboratories is the E4 suitable for?"), answerHtml: tLocalized("Hızlı ve hassas tarama ihtiyacı yüksek olan dental laboratuvarlar için konumlandırılır.", "Positioned for dental laboratories with a high need for fast and precise scanning.") },
        { question: tLocalized("E serisinin en güçlü cihazı mı?", "Is it the most powerful device in the E series?"), answerHtml: tLocalized("Ürün açıklamasında E serisinin en güçlü cihazı olarak belirtilir.", "Stated in the product description as the most powerful device in the E series.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=-gsABaM06sg",
      videoTitleHtml: tLocalized("E4 hızını <span class=\"em\">videoda görün.</span>", "See the E4's speed <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("3Shape E4 ürün sayfasındaki video ile hızlı ve hassas tarama akışını inceleyin.", "Review the fast and precise scanning workflow with the video on the 3Shape E4 product page."),
      videoTitle: tLocalized("3Shape E4 masaüstü tarayıcı", "3Shape E4 desktop scanner"),
      videoText: tLocalized("E4 hız, hassasiyet ve tam çene tarama akışı videosu.", "A video on the E4's speed, precision, and full-arch scanning workflow."),
    },
    {
      slug: NABERTHEM_LHT_02_17_LB_SPEED_SLUG,
      category: FURNACE_CATEGORY,
      productText: tLocalized("Naberthem LHT 02/17 LB Speed", "Naberthem LHT 02/17 LB Speed"),
      kicker: tLocalized("Naberthem LHT 02/17 LB Speed · Zirkon Sinterleme", "Naberthem LHT 02/17 LB Speed ​​Zircon Sintering"),
      titleHtml: tLocalized("Yarı saydam zirkonya için <span class=\"em\">1650 °C</span> fırın.", "A <span class=\"em\">1650 °C</span> furnace for translucent zirconia."),
      leadHtml:
        tLocalized("Naberthem LHT 02/17 LB Speed, maksimum 1650 °C sıcaklığı ve geniş fırın odası sayesinde yarı saydam zirkonyanın sinterlenmesi için uyumludur. Elektrikli kaldırma masası yüksek sıcaklık fırınının yüklenmesini kolaylaştırır.", "The Naberthem LHT 02/17 LB Speed is suitable for sintering translucent zirconia thanks to its maximum temperature of 1650 °C and large furnace chamber. The electric lift table makes it easy to load the high-temperature furnace."),
      pills: [{ value: tLocalized("1650 °C", "1650 °C"), label: "maksimum" }, { label: tLocalized("Zirkonya sinterleme", "Zirconia sintering") }, { label: tLocalized("Geniş fırın odası", "Large furnace chamber") }, { label: tLocalized("Kaldırma masası", "Lift table") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c72ba72c-c628-46f6-ac9d-863e3ccb6d8a/1080/firinlar2.webp"],
      galleryBadge: tLocalized("1650 °C", "1650 °C"),
      metricTitleHtml: tLocalized("Yüksek sıcaklıkta <span class=\"em\">zirkon sinterleme.</span>", "<span class=\"em\">Zirconia sintering</span> at high temperature."),
      metricSideHtml: tLocalized("LHT 02/17 LB Speed, yarı saydam zirkonyanın sinterlenmesi ve geniş fırın odası ihtiyacı için konumlandırılır.", "The LHT 02/17 LB Speed is positioned for sintering translucent zirconia and for needs requiring a large furnace chamber."),
      metrics: [
        { name: tLocalized("Maks. Sıcaklık", "Max. Temperature"), value: "1650", unit: "°C", tag: tLocalized("Speed", "speed"), caption: tLocalized("Ürün sayfasında belirtilen maksimum sıcaklık.", "The maximum temperature stated on the product page.") },
        { name: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Zirkon", "Zirconia"), unit: "sinter", tag: tLocalized("Dental", "dental"), caption: tLocalized("Yarı saydam zirkonya sinterleme için kullanılır.", "Used for sintering translucent zirconia.") },
        { name: tLocalized("Yükleme", "Loading"), value: "Lift", unit: "table", tag: tLocalized("Elektrikli", "Electric"), caption: tLocalized("Elektrikle çalışan kaldırma masası yüklemeyi kolaylaştırır.", "The electrically operated lifting table makes loading easier.") },
      ],
      specTag: "LHT 02/17 LB SPEED · 1650 °C",
      specTitleHtml: tLocalized("Geniş fırın odasıyla <span class=\"em\">sinterleme kontrolü.</span>", "<span class=\"em\">Sintering control</span> with a large furnace chamber."),
      specDescriptionHtml: tLocalized("LHT 02/17 LB Speed, yüksek sıcaklık ve geniş fırın odası gerektiren zirkonya sinterleme iş akışları için kullanılır.", "The LHT 02/17 LB Speed is used for zirconia sintering workflows that require high temperature and a large furnace chamber."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: "LHT 02/17 LB Speed" },
        { label: tLocalized("Maksimum", "Maximum"), value: tLocalized("1650 °C", "1650 °C") },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Yarı saydam zirkonya", "Translucent zirconia") },
        { label: tLocalized("Yükleme", "Loading"), value: tLocalized("Elektrikli kaldırma masası", "Electric lifting table") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Dental fırın", "Dental Furnace") },
      ],
      useCaseSideHtml: tLocalized("Zirkonya sinterleme ve yüksek sıcaklık gerektiren dental laboratuvar işlerinde kullanılır.", "Used in dental laboratory work requiring zirconia sintering and high temperature."),
      useCasePhotos: [
        { title: tLocalized("Zirkon sinterleme", "Zircon sintering"), text: tLocalized("Yarı saydam zirkonya için yüksek sıcaklık.", "High temperature for translucent zirconia."), alt: tLocalized("LHT 02/17 zirkon sinterleme", "LHT 02/17 zirconia sintering") },
        { title: tLocalized("Geniş oda", "Large chamber"), text: tLocalized("Laboratuvar yükleme hacmini destekleyen yapı.", "A structure that supports laboratory loading volume."), alt: tLocalized("LHT 02/17 geniş fırın odası", "LHT 02/17 large furnace chamber") },
        { title: tLocalized("Lift table", "lift table"), text: tLocalized("Elektrikli kaldırma masasıyla kolay yükleme.", "Easy loading with the electric lifting table."), alt: tLocalized("LHT 02/17 kaldırma masası", "LHT 02/17 lift table") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Yarı saydam zirkonya sinterleme", "Translucent zirconia sintering"), tLocalized("Yüksek sıcaklık dental laboratuvar işleri", "High-temperature dental laboratory work"), tLocalized("Geniş fırın odası isteyen akışlar", "Workflows that need a large furnace chamber")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Sinterleme protokolü", "Sintering protocol"), tLocalized("Fırın hacmi ve yükleme ihtiyacı", "Furnace volume and loading needs"), tLocalized("Zirkon blok iş akışı", "Zirconia block workflow")] },
      ],
      devicesTitle: tLocalized("Zirkon blok ve sinterleme laboratuvar akışıyla çalışır", "Works with the zirconia block and sintering lab workflow"),
      devicesTextHtml: tLocalized("Zirkon blok, CAM frezeleme ve sinterleme protokolü birlikte değerlendirilmelidir. Fırın seçimini zirkon kullanım hacminize göre netleştirebiliriz.", "The zirconia block, CAM milling, and sintering protocol should be evaluated together. We can clarify furnace selection based on your zirconia usage volume."),
      deviceChips: [{ label: tLocalized("Zirkon blok", "zirconia block") }, { label: tLocalized("Sinterleme", "sintering") }, { label: tLocalized("1650 °C", "1650 °C") }, { label: tLocalized("Dental lab", "dental lab"), highlighted: true }],
      faqItems: [
        { question: tLocalized("LHT 02/17 LB Speed ne için kullanılır?", "What is the LHT 02/17 LB Speed used for?"), answerHtml: tLocalized("Yarı saydam zirkonyanın sinterlenmesi için kullanılan yüksek sıcaklık fırınıdır.", "A high-temperature furnace used for sintering translucent zirconia.") },
        { question: tLocalized("Maksimum sıcaklığı nedir?", "What is the maximum temperature?"), answerHtml: tLocalized("Ürün sayfasında maksimum 1650 °C sıcaklık bilgisi yer alır.", "The product page states a maximum temperature of 1650 °C.") },
        { question: tLocalized("Yükleme yapısı nasıldır?", "What is the loading structure like?"), answerHtml: tLocalized("Elektrikle çalışan kaldırma masası yüksek sıcaklık fırınının yüklenmesini kolaylaştırır.", "The electrically operated lifting table makes loading the high-temperature furnace easier.") },
      ],
      videoTitleHtml: tLocalized("Sinterleme akışını <span class=\"em\">birlikte planlayın.</span>", "<span class=\"em\">Plan your sintering workflow together</span> with us."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın seçimini netleştirebilirsiniz.", "Since there is no product video on this product page, you can clarify furnace selection through technical support."),
      videoTitle: tLocalized("LHT 02/17 LB Speed teknik destek", "LHT 02/17 LB Speed technical support"),
      videoText: tLocalized("Zirkon sinterleme, fırın hacmi ve sıcaklık akışı için uzman desteği alın.", "Get expert support for zirconia sintering, furnace volume, and temperature flow."),
    },
    {
      slug: NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG,
      category: FURNACE_CATEGORY,
      productText: tLocalized("Naberthem LHT 01/16 Turbo Fire", "Naberthem LHT 01/16 Turbo Fire"),
      kicker: tLocalized("Naberthem LHT 01/16 Turbo Fire · Hızlı Sinterleme", "Naberthem LHT 01/16 Turbo Fire · Fast Sintering"),
      titleHtml: tLocalized("Tek kronlarda <span class=\"em\">1 saatlik</span> hızlı sinterleme.", "<span class=\"em\">1-hour</span> fast sintering for single crowns."),
      leadHtml:
        tLocalized("LHT 01/16 Turbo Fire, yarı saydam zirkonyum oksitten yapılmış 1-3 tek kronun maksimum 1600 °C sıcaklığa kadar hızlı sinterlenmesi için geliştirilmiştir. Tüm sinterleme işlemi bir saat içinde tamamlanabilir.", "The LHT 01/16 Turbo Fire has been developed for the fast sintering of 1–3 single crowns made from translucent zirconium oxide, up to a maximum temperature of 1600 °C. The entire sintering process can be completed within one hour."),
      pills: [{ value: tLocalized("1600 °C", "1600 °C"), label: "maksimum" }, { value: tLocalized("1 saat", "1 hour"), label: "sinterleme" }, { value: "1-3", label: tLocalized("tek kron", "single crown") }, { label: tLocalized("Turbo Fire", "Turbo Fire") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/cef47053-2e60-4139-9089-9aadb5855033/1080/firinlar3.webp"],
      galleryBadge: "TURBO",
      metricTitleHtml: tLocalized("Hızlı sinterleme için <span class=\"em\">kompakt güç.</span>", "<span class=\"em\">Compact power</span> for fast sintering."),
      metricSideHtml: tLocalized("LHT 01/16 Turbo Fire, 1-3 tek kronluk hızlı zirkonyum oksit sinterleme akışı için geliştirilmiştir.", "The LHT 01/16 Turbo Fire has been developed for a fast zirconium oxide sintering workflow of 1–3 single crowns."),
      metrics: [
        { name: tLocalized("Maks. Sıcaklık", "Max. Temperature"), value: "1600", unit: "°C", tag: tLocalized("Turbo", "Turbo"), caption: tLocalized("Ürün sayfasında belirtilen maksimum sıcaklık.", "The maximum temperature stated on the product page.") },
        { name: tLocalized("Sinterleme", "sintering"), value: "1", unit: "saat", tag: tLocalized("Hızlı", "Fast"), caption: tLocalized("Tüm sinterleme işlemi bir saat içinde tamamlanabilir.", "The entire sintering process can be completed within one hour.") },
        { name: tLocalized("Kapasite", "Capacity"), value: "1-3", unit: tLocalized("tek kron", "single crown"), tag: tLocalized("Zirkon", "Zirconia"), caption: tLocalized("Yarı saydam zirkonyum oksitten tek kronlar için geliştirilmiştir.", "Developed for single crowns made from translucent zirconium oxide.") },
      ],
      specTag: "LHT 01/16 TURBO FIRE · 1600 °C",
      specTitleHtml: tLocalized("Hızlı tek kron sinterleme için <span class=\"em\">Turbo Fire.</span>", "<span class=\"em\">Turbo Fire</span> for fast single-crown sintering."),
      specDescriptionHtml: tLocalized("LHT 01/16 Turbo Fire, 1-3 tek kronluk hızlı zirkonyum oksit sinterleme döngüsünü bir saat içinde tamamlayabilen fırındır.", "The LHT 01/16 Turbo Fire is a furnace that can complete a fast zirconium oxide sintering cycle of 1–3 single crowns within one hour."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: "LHT 01/16 Turbo Fire" },
        { label: tLocalized("Maksimum", "Maximum"), value: tLocalized("1600 °C", "1600 °C") },
        { label: tLocalized("Kapasite", "Capacity"), value: "1-3 tek kron" },
        { label: tLocalized("Süreç", "Process"), value: tLocalized("1 saat içinde sinterleme", "Sintering within 1 hour") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Dental fırın", "Dental Furnace") },
      ],
      useCaseSideHtml: tLocalized("Hızlı tek kron sinterleme ve küçük vaka akışları için kullanılır.", "Used for fast single-crown sintering and small-case workflows."),
      useCasePhotos: [
        { title: tLocalized("Tek kron", "single crown"), text: tLocalized("1-3 tek kronluk hızlı zirkon akışı.", "Fast zirconia workflow for 1-3 single crowns."), alt: tLocalized("LHT 01/16 tek kron sinterleme", "LHT 01/16 single crown sintering") },
        { title: tLocalized("Hızlı çevrim", "Fast cycle"), text: tLocalized("Bir saat içinde tamamlanabilen sinterleme.", "Sintering that can be completed within an hour."), alt: tLocalized("LHT 01/16 hızlı çevrim", "LHT 01/16 fast cycle") },
        { title: tLocalized("Zirkonyum oksit", "Zirconium oxide"), text: tLocalized("Yarı saydam zirkonyum oksit işler.", "Processes translucent zirconium oxide."), alt: tLocalized("LHT 01/16 zirkonyum oksit", "LHT 01/16 zirconium oxide") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: ["1-3 tek kron sinterleme", tLocalized("Hızlı küçük vaka akışı", "Fast small-case workflow"), tLocalized("Yarı saydam zirkonyum oksit", "Translucent zirconium oxide")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Sinterleme süresi", "Sintering time"), tLocalized("Maksimum sıcaklık ihtiyacı", "Maximum temperature requirement"), tLocalized("Vaka hacmi ve fırın seçimi", "Case volume and furnace selection")] },
      ],
      devicesTitle: tLocalized("Zirkon tek kron üretim akışıyla çalışır", "Works with the zirconia single-crown production workflow"),
      devicesTextHtml: tLocalized("Küçük vaka ve hızlı sinterleme ihtiyacı için zirkon blok, frezeleme ve fırın çevrimi birlikte planlanmalıdır.", "For small cases and the need for fast sintering, the zirconia block, milling, and furnace cycle should be planned together."),
      deviceChips: [{ label: tLocalized("Tek kron", "single crown") }, { label: tLocalized("Zirkonyum oksit", "Zirconium oxide") }, { label: tLocalized("1600 °C", "1600 °C") }, { label: tLocalized("1 saat", "1 hour"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Turbo Fire ne için geliştirilmiştir?", "What was Turbo Fire developed for?"), answerHtml: tLocalized("1-3 tek kronun maksimum 1600 °C'ye kadar hızlı sinterlenmesi için geliştirilmiştir.", "Developed for fast sintering of 1-3 single crowns at up to a maximum of 1600 °C.") },
        { question: tLocalized("Sinterleme ne kadar sürer?", "How long does sintering take?"), answerHtml: tLocalized("Ürün açıklamasında tüm sinterleme işleminin bir saat içinde tamamlanabileceği belirtilir.", "Stated in the product description that the entire sintering process can be completed within an hour.") },
        { question: tLocalized("Hangi materyal için idealdir?", "Which material is it ideal for?"), answerHtml: tLocalized("Yarı saydam zirkonyum oksit için konumlandırılır.", "Positioned for translucent zirconium oxide.") },
      ],
      videoTitleHtml: tLocalized("Hızlı sinterleme için <span class=\"em\">uzmana danışın.</span>", "<span class=\"em\">Consult an expert</span> for fast sintering."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için fırın seçimini teknik destekle netleştirin.", "Since there is no product video on this product page, clarify furnace selection with technical support."),
      videoTitle: tLocalized("LHT 01/16 Turbo Fire teknik destek", "LHT 01/16 Turbo Fire technical support"),
      videoText: tLocalized("Hızlı sinterleme, vaka hacmi ve zirkon iş akışı için uzman desteği alın.", "Get expert support for fast sintering, case volume, and your zirconia workflow."),
    },
    {
      slug: NABERTHEM_VL_01_12_LB_PRESS_SLUG,
      category: FURNACE_CATEGORY,
      productText: tLocalized("Naberthem VL 01/12 LB Pres Fırını", "Naberthem VL 01/12 LB Press Furnace"),
      kicker: tLocalized("Naberthem VL 01/12 LB · Pres Fırını", "Naberthem VL 01/12 LB · Press Furnace"),
      titleHtml: tLocalized("Press seramik işleri için <span class=\"em\">vakumlu fırın.</span>", "A <span class=\"em\">vacuum furnace</span> for press ceramic work."),
      leadHtml:
        tLocalized("VL 01/12 LB Pres Fırını, dental laboratuvarlarda press seramik ve kontrollü ısı gerektiren restorasyon akışları için konumlandırılır. Kaldırma tablalı yapı yükleme ve işlem kontrolünü kolaylaştırır.", "The VL 01/12 LB Press Furnace is positioned for press ceramic and restoration workflows requiring controlled heat in dental laboratories. Its lift-tray structure makes loading and process control easier."),
      pills: [{ label: tLocalized("Pres fırını", "Press furnace") }, { label: tLocalized("Kaldırma tabla", "Lift plate") }, { label: tLocalized("Dental laboratuvar", "dental laboratory") }, { label: tLocalized("Naberthem", "Naberthem") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/4112bcc1-a205-4063-bb3b-c52112d8dba2/1080/firinlar4.webp"],
      galleryBadge: "PRESS",
      metricTitleHtml: tLocalized("Press işler için <span class=\"em\">kontrollü ısı.</span>", "<span class=\"em\">Controlled heat</span> for press work."),
      metricSideHtml: tLocalized("Pres fırını seçimi, dental laboratuvarın press seramik ve restorasyon akışına göre netleştirilmelidir.", "Press furnace selection should be clarified according to the dental laboratory's press ceramic and restoration workflow."),
      metrics: [
        { name: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Press", "press"), unit: "", tag: tLocalized("Dental", "dental"), caption: tLocalized("Press seramik restorasyon akışı için konumlandırılır.", "Positioned for the press ceramic restoration workflow.") },
        { name: tLocalized("Yapı", "Structure"), value: "Lift", unit: "table", tag: "LB", caption: tLocalized("Kaldırma tablalı yapı yükleme sürecini kolaylaştırır.", "The lift-plate structure makes the loading process easier.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("Lab", "laboratory"), unit: "", tag: tLocalized("Fırın", "Furnace"), caption: tLocalized("Dental laboratuvar ısı işlem akışları için kullanılır.", "Used for dental laboratory heat-treatment workflows.") },
      ],
      specTag: "VL 01/12 LB · PRESS",
      specTitleHtml: tLocalized("Press restorasyonlarda <span class=\"em\">kontrollü çevrim.</span>", "<span class=\"em\">Controlled cycle</span> for press restorations."),
      specDescriptionHtml: tLocalized("VL 01/12 LB Pres Fırını, press seramik restorasyon işlerinde kontrollü fırın çevrimi için kullanılan dental laboratuvar fırınıdır.", "The VL 01/12 LB Press Furnace is a dental laboratory furnace used for controlled firing cycles in press ceramic restoration work."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: "VL 01/12 LB" },
        { label: tLocalized("Tip", "Medicine"), value: tLocalized("Pres fırını", "Press furnace") },
        { label: tLocalized("Yapı", "Structure"), value: tLocalized("Kaldırma tablalı", "With a lift plate") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Press seramik", "Press ceramic") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Dental fırın", "Dental Furnace") },
      ],
      useCaseSideHtml: tLocalized("Press seramik ve dental laboratuvar fırınlama akışlarında kullanılır.", "Used in press ceramic and dental laboratory firing workflows."),
      useCasePhotos: [
        { title: tLocalized("Press seramik", "Press ceramic"), text: tLocalized("Press restorasyon fırınlama işleri.", "Press restoration firing work."), alt: tLocalized("VL 01/12 press seramik", "VL 01/12 press ceramic") },
        { title: tLocalized("Kaldırma tabla", "Lift plate"), text: tLocalized("Yükleme ve işlem kontrolünü kolaylaştıran yapı.", "A structure that makes loading and process control easier."), alt: tLocalized("VL 01/12 kaldırma tabla", "VL 01/12 lift tray") },
        { title: tLocalized("Laboratuvar", "Lab"), text: tLocalized("Dental restorasyon ısı işlem akışı.", "Dental restoration heat treatment workflow."), alt: tLocalized("VL 01/12 dental laboratuvar", "VL 01/12 dental laboratory") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: ["Press seramik restorasyonlar", tLocalized("Dental laboratuvar fırın çevrimleri", "Dental lab furnace cycles"), tLocalized("Kontrollü ısı işlem akışları", "Controlled heat-treatment workflows")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: ["Press materyal uyumu", tLocalized("Fırın çevrimi", "Furnace cycle"), "Laboratuvar kapasitesi"] },
      ],
      devicesTitle: tLocalized("Press seramik laboratuvar akışıyla çalışır", "Works with the press ceramic laboratory workflow"),
      devicesTextHtml: tLocalized("Press materyal, fırın çevrimi ve laboratuvar üretim hacmi birlikte değerlendirilmelidir.", "Press material, furnace cycle, and laboratory production volume should be evaluated together."),
      deviceChips: [{ label: tLocalized("Press seramik", "Press ceramic") }, { label: tLocalized("Kaldırma tabla", "Lift plate") }, { label: tLocalized("Dental lab", "dental lab") }, { label: tLocalized("Fırın çevrimi", "Furnace cycle"), highlighted: true }],
      faqItems: [
        { question: tLocalized("VL 01/12 LB Pres Fırını ne için kullanılır?", "What is the VL 01/12 LB Press Furnace used for?"), answerHtml: tLocalized("Dental laboratuvarlarda press seramik restorasyonların fırınlanması için konumlandırılır.", "Positioned for firing press-ceramic restorations in dental laboratories.") },
        { question: tLocalized("Kaldırma tablalı yapı ne sağlar?", "What does the lift-plate structure provide?"), answerHtml: tLocalized("Yükleme ve işlem kontrolünü kolaylaştırır.", "Makes loading and process control easier.") },
        { question: tLocalized("Satın alma öncesi ne kontrol edilmeli?", "What should be checked before purchase?"), answerHtml: tLocalized("Press materyal, fırın çevrimi ve laboratuvar kapasitesi birlikte değerlendirilmelidir.", "Press material, furnace cycle, and laboratory capacity should be evaluated together.") },
      ],
      videoTitleHtml: tLocalized("Press fırın seçimini <span class=\"em\">birlikte netleştirin.</span>", "<span class=\"em\">Clarify your press furnace selection together</span> with us."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın uyumunu kontrol edebilirsiniz.", "Since there is no product video on this product page, you can check furnace compatibility through technical support."),
      videoTitle: tLocalized("VL 01/12 LB Pres Fırını teknik destek", "VL 01/12 LB Press Furnace technical support"),
      videoText: tLocalized("Press seramik iş akışı ve fırın seçimi için uzman desteği alın.", "Get expert support for the press ceramic workflow and furnace selection."),
    },
    {
      slug: NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG,
      category: FURNACE_CATEGORY,
      productText: tLocalized("Naberthem VL 01/12 LB Porselen Fırını", "Naberthem VL 01/12 LB Porcelain Furnace"),
      kicker: tLocalized("Naberthem VL 01/12 LB · Vakumlu Porselen Fırını", "Naberthem VL 01/12 LB · Vacuum Porcelain Furnace"),
      titleHtml: tLocalized("Porselen kaplamada <span class=\"em\">vakumlu pişirim.</span>", "<span class=\"em\">Vacuum firing</span> for porcelain veneers."),
      leadHtml:
        tLocalized("Naberthem VL 01/12 LB Porselen Fırını, geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için idealdir. Fırın odasının çepeçevre ısıtılması eşit sıcaklık homojenliği ve hızlı ısınma süreleri sağlar.", "The Naberthem VL 01/12 LB Porcelain Furnace is ideal for firing traditional ceramic veneers under normal atmosphere or vacuum. All-round heating of the furnace chamber ensures even temperature homogeneity and fast heat-up times."),
      pills: [{ label: tLocalized("Vakumlu porselen", "vacuum porcelain") }, { label: tLocalized("Normal atmosfer", "normal atmosphere") }, { label: tLocalized("Çepeçevre ısıtma", "All-round heating") }, { label: tLocalized("Hızlı ısınma", "Fast heating") }],
      images: ["https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/3bfdd659-7c98-4939-8573-8fecb1408edc/1080/washcure-website-kopyasi.webp"],
      galleryBadge: "VACUUM",
      metricTitleHtml: tLocalized("Porselende <span class=\"em\">homojen ısı.</span>", "<span class=\"em\">Homogeneous heat</span> for porcelain."),
      metricSideHtml: tLocalized("VL 01/12 LB Porselen Fırını, seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır.", "The VL 01/12 LB Porcelain Furnace is used to fire ceramic veneers under normal atmosphere or vacuum."),
      metrics: [
        { name: tLocalized("Atmosfer", "Atmosphere"), value: tLocalized("Vakum", "Vacuum"), unit: "/ normal", tag: tLocalized("Porselen", "Porcelain"), caption: tLocalized("Ürün sayfasında normal atmosfer veya vakum altında pişirim bilgisi yer alır.", "The product page includes firing information under normal atmosphere or vacuum.") },
        { name: tLocalized("Isıtma", "Heating"), value: "360", unit: tLocalized("° çevre", "° ambient"), tag: tLocalized("Homojen", "Homogeneous"), caption: tLocalized("Fırın odasının çepeçevre ısıtılması eşit sıcaklık dağılımını destekler.", "All-around heating of the furnace chamber supports even temperature distribution.") },
        { name: tLocalized("Süreç", "Process"), value: tLocalized("Hızlı", "Fast"), unit: tLocalized("ısınma", "heating"), tag: "VL", caption: tLocalized("Kaynak açıklamada hızlı ısınma süreleri vurgulanır.", "The source description emphasizes fast heating times.") },
      ],
      specTag: "VL 01/12 LB · PORSELEN",
      specTitleHtml: tLocalized("Seramik kaplamalar için <span class=\"em\">vakum kontrolü.</span>", "<span class=\"em\">Vacuum control</span> for ceramic veneers."),
      specDescriptionHtml: tLocalized("VL 01/12 LB Porselen Fırını, geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır.", "The VL 01/12 LB Porcelain Furnace is used to fire traditional ceramic veneers under normal atmosphere or vacuum."),
      specRows: [
        { label: tLocalized("Model", "Model"), value: "VL 01/12 LB" },
        { label: tLocalized("Tip", "Medicine"), value: tLocalized("Porselen fırını", "Porcelain furnace") },
        { label: tLocalized("Atmosfer", "Atmosphere"), value: "Normal / vakum" },
        { label: tLocalized("Isıtma", "Heating"), value: tLocalized("Çepeçevre fırın odası", "All-round furnace chamber") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Dental fırın", "Dental Furnace") },
      ],
      useCaseSideHtml: tLocalized("Seramik kaplama, porselen pişirim ve vakumlu dental fırınlama işlerinde kullanılır.", "Used in ceramic veneer, porcelain firing, and vacuum dental firing work."),
      useCasePhotos: [
        { title: tLocalized("Porselen pişirim", "Porcelain firing"), text: tLocalized("Geleneksel seramik kaplamalar.", "Traditional ceramic coatings."), alt: tLocalized("VL 01/12 porselen pişirim", "VL 01/12 porcelain firing") },
        { title: tLocalized("Vakum", "Vacuum"), text: tLocalized("Vakum altında kontrollü fırınlama.", "Controlled firing under vacuum."), alt: tLocalized("VL 01/12 vakumlu fırın", "VL 01/12 vacuum furnace") },
        { title: tLocalized("Homojen ısı", "Homogeneous heat"), text: tLocalized("Çepeçevre ısıtılan fırın odası.", "An all-round heated furnace chamber."), alt: tLocalized("VL 01/12 homojen sıcaklık", "VL 01/12 homogeneous temperature") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Seramik kaplama pişirimi", "Ceramic veneer firing"), tLocalized("Vakumlu porselen fırınlama", "Vacuum porcelain firing"), tLocalized("Dental laboratuvar restorasyon işleri", "Dental lab restoration work")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Vakum ihtiyacı", "Vacuum requirement"), tLocalized("Porselen materyal çevrimi", "Porcelain material cycle"), tLocalized("Fırın ısınma ve homojenlik beklentisi", "Furnace heating and homogeneity expectations")] },
      ],
      devicesTitle: tLocalized("Porselen ve seramik dental laboratuvar akışıyla çalışır", "Works with porcelain and ceramic dental laboratory workflows"),
      devicesTextHtml: tLocalized("Seramik kaplama materyali, vakum ihtiyacı ve fırın çevrimi birlikte değerlendirilmelidir.", "Ceramic veneer material, vacuum requirement, and furnace cycle should be evaluated together."),
      deviceChips: [{ label: tLocalized("Porselen", "Porcelain") }, { label: tLocalized("Vakum", "Vacuum") }, { label: tLocalized("Seramik kaplama", "ceramic coating") }, { label: tLocalized("Homojen ısı", "Homogeneous heat"), highlighted: true }],
      faqItems: [
        { question: tLocalized("VL 01/12 LB Porselen Fırını ne için kullanılır?", "What is the VL 01/12 LB Porcelain Furnace used for?"), answerHtml: tLocalized("Geleneksel seramik kaplamaların normal atmosfer veya vakum altında pişirilmesi için kullanılır.", "Used for firing conventional ceramic veneers under normal atmosphere or vacuum.") },
        { question: tLocalized("Isıtma yapısı nasıldır?", "What is the heating structure like?"), answerHtml: tLocalized("Fırın odasının çepeçevre ısıtılması eşit sıcaklık homojenliğini destekler.", "All-around heating of the furnace chamber supports even temperature homogeneity.") },
        { question: tLocalized("Hızlı ısınır mı?", "Does it heat up quickly?"), answerHtml: tLocalized("Ürün açıklamasında çok hızlı ısınma süreleri sağladığı belirtilir.", "Stated in the product description as providing very fast heating times.") },
      ],
      videoTitleHtml: tLocalized("Porselen fırın seçimini <span class=\"em\">birlikte netleştirin.</span>", "<span class=\"em\">Clarify your porcelain furnace selection together</span> with us."),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için teknik destek üzerinden fırın uyumunu kontrol edebilirsiniz.", "Since there is no product video on this product page, you can check furnace compatibility through technical support."),
      videoTitle: tLocalized("VL 01/12 LB Porselen Fırını teknik destek", "VL 01/12 LB Porcelain Furnace technical support"),
      videoText: tLocalized("Porselen pişirim, vakum ve fırın çevrimi için uzman desteği alın.", "Get expert support for porcelain firing, vacuum, and furnace cycle."),
    },
    {
      slug: MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG,
      category: TITANIUM_CATEGORY,
      productText: "MESA Titanyum Disk Grade 5 ELI",
      kicker: tLocalized("MESA Grade 5 ELI · Dental CAD/CAM Titanyum Disk", "MESA Grade 5 ELI · Dental CAD/CAM Titanium Disc"),
      titleHtml: tLocalized("İmplant üstü restorasyonda <span class=\"em\">biyouyumlu titanyum.</span>", "<span class=\"em\">Biocompatible titanium</span> for implant-supported restorations."),
      leadHtml:
        tLocalized("MESA Grade 5 ELI titanyum disk, implant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar. Ø98.5 mm formu ile CAD/CAM sistemlerle uyumlu, dental laboratuvarlar için güvenilir bir çözümdür.", "The MESA Grade 5 ELI titanium disk offers high strength and biocompatibility for implant-supported restorations. With its Ø98.5 mm form, it is compatible with CAD/CAM systems and is a reliable solution for dental laboratories."),
      pills: [{ value: "Grade 5", label: "ELI" }, { value: "Ø98.5", label: "mm" }, { label: tLocalized("CAD/CAM", "CAD/CAM") }, { label: tLocalized("İmplant üstü", "Implant-supported") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/8eaf20f5-0227-4f18-b8fc-7f054422ce88/1080/mesa-titanyum-disk.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/12bb1fd1-ea51-4b79-9003-956f2298dd1c/1080/mesa-titanyum-disk.webp",
      ],
      galleryBadge: "GRADE 5",
      metricTitleHtml: tLocalized("Yüksek dayanım ve <span class=\"em\">biyouyumluluk.</span>", "High strength and <span class=\"em\">biocompatibility.</span>"),
      metricSideHtml: tLocalized("MESA Grade 5 ELI disk, implant üstü restorasyonlarda CAD/CAM frezeleme akışı için konumlandırılır.", "The MESA Grade 5 ELI disk is positioned for the CAD/CAM milling workflow in implant-supported restorations."),
      metrics: [
        { name: tLocalized("Materyal", "Materiel"), value: "Grade", unit: "5 ELI", tag: tLocalized("Titanium", "titanium"), caption: tLocalized("Ürün adı ve açıklamasında Grade 5 ELI titanyum olarak listelenir.", "Listed as Grade 5 ELI titanium in the product name and description.") },
        { name: tLocalized("Çap", "Diameter"), value: "98.5", unit: "mm", tag: tLocalized("CAD/CAM", "CAD/CAM"), caption: tLocalized("Kaynak açıklamada Ø98.5 mm formu belirtilir.", "The source description specifies the Ø98.5 mm form.") },
        { name: tLocalized("Kullanım", "Usage"), value: tLocalized("İmplant", "Implant"), unit: tLocalized("üstü", "above"), tag: tLocalized("Dental", "dental"), caption: tLocalized("İmplant üstü restorasyonlar için yüksek dayanım ve biyouyumluluk sunar.", "Offers high strength and biocompatibility for implant-supported restorations.") },
      ],
      specTag: tLocalized("MESA · GRADE 5 ELI · Ø98.5 MM", "MESA · GRADE 5 HAND · Ø98.5 MM"),
      specTitleHtml: tLocalized("CAD/CAM frezeleme için <span class=\"em\">titanyum disk.</span>", "<span class=\"em\">Titanium disc</span> for CAD/CAM milling."),
      specDescriptionHtml: tLocalized("MESA Grade 5 ELI, implant üstü restorasyonlarda CAD/CAM sistemlerle uyumlu yüksek dayanımlı titanyum disk çözümüdür.", "The MESA Grade 5 ELI is a high-strength titanium disk solution compatible with CAD/CAM systems for implant-supported restorations."),
      specRows: [
        { label: tLocalized("Materyal", "Materiel"), value: "Titanyum Grade 5 ELI" },
        { label: tLocalized("Çap", "Diameter"), value: tLocalized("Ø98.5 mm", "Ø98.5mm") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("İmplant üstü restorasyon", "Implant-supported restoration") },
        { label: tLocalized("Uyum", "Compatibility"), value: "CAD/CAM sistemler" },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Titanyum disk", "Titanium Disc") },
      ],
      useCaseSideHtml: tLocalized("İmplant üstü restorasyonlar ve CAD/CAM frezeleme iş akışlarında kullanılır.", "Used in implant-supported restorations and CAD/CAM milling workflows."),
      useCasePhotos: [
        { imageIndex: 1, title: tLocalized("İmplant üstü", "Implant-supported"), text: tLocalized("Yüksek dayanım ve biyouyumluluk isteyen restorasyonlar.", "Restorations requiring high strength and biocompatibility."), alt: tLocalized("MESA titanyum implant üstü restorasyon", "MESA titanium implant-supported restoration") },
        { imageIndex: 1, title: tLocalized("CAD/CAM", "CAD/CAM"), text: tLocalized("Ø98.5 mm disk formuyla frezeleme akışı.", "Milling workflow with the Ø98.5 mm disc form."), alt: tLocalized("MESA titanyum CAD CAM", "MESA titanium CAD CAM") },
        { imageIndex: 1, title: tLocalized("Dental lab", "dental lab"), text: tLocalized("Laboratuvar için güvenilir materyal çözümü.", "A reliable material solution for the laboratory."), alt: tLocalized("MESA titanyum dental laboratuvar", "MESA titanium dental laboratory") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("İmplant üstü restorasyonlar", "Implant-supported restorations"), "CAD/CAM frezeleme", tLocalized("Dental laboratuvar titanyum işleri", "Dental lab titanium work")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Disk kalınlığı / boyutu", "Disk thickness / size"), "Freze uyumu", tLocalized("İmplant üstü endikasyon", "Implant-supported indication")] },
      ],
      devicesTitle: tLocalized("Dental CAD/CAM freze sistemleriyle çalışır", "Works with dental CAD/CAM milling systems"),
      devicesTextHtml: tLocalized("Ø98.5 mm disk formu ve Grade 5 ELI titanyum materyal, implant üstü CAD/CAM restorasyon işlerinde kullanılır.", "The Ø98.5 mm disc form and Grade 5 ELI titanium material are used in implant-supported CAD/CAM restoration work."),
      deviceChips: [{ label: tLocalized("CAD/CAM freze", "CAD/CAM milling") }, { label: tLocalized("Ø98.5 mm", "Ø98.5mm") }, { label: tLocalized("İmplant üstü", "Implant-supported") }, { label: tLocalized("Grade 5 ELI", "Grade 5 ELI"), highlighted: true }],
      faqItems: [
        { question: tLocalized("MESA Grade 5 ELI ne için kullanılır?", "What is the MESA Grade 5 ELI used for?"), answerHtml: tLocalized("İmplant üstü restorasyonlar için kullanılan CAD/CAM uyumlu titanyum disktir.", "A CAD/CAM-compatible titanium disc used for implant-supported restorations.") },
        { question: tLocalized("Disk çapı nedir?", "What is the disk diameter?"), answerHtml: tLocalized("Ürün açıklamasında Ø98.5 mm formu belirtilir.", "The Ø98.5 mm form is stated in the product description.") },
        { question: tLocalized("Biyouyumlu mudur?", "Is it biocompatible?"), answerHtml: tLocalized("Kaynak açıklamada yüksek dayanım ve biyouyumluluk sunduğu belirtilir.", "The source description states that it offers high strength and biocompatibility.") },
      ],
      videoHref: "https://www.youtube.com/watch?v=dNPHy_sd9aQ",
      videoTitleHtml: tLocalized("Titanyum CAD/CAM akışını <span class=\"em\">videoda görün.</span>", "See the titanium CAD/CAM workflow <span class=\"em\">in the video.</span>"),
      videoSideHtml: tLocalized("Ürün sayfasındaki video ile MESA titanyum disk iş akışını inceleyin.", "Watch the video on the product page to see the MESA titanium disc workflow."),
      videoTitle: "MESA Grade 5 ELI titanyum disk",
      videoText: tLocalized("Dental CAD/CAM titanyum disk ve implant üstü restorasyon akışı videosu.", "Video of the dental CAD/CAM titanium disc and implant-supported restoration workflow."),
    },
    {
      slug: TRASFORMER_COMP_FLOW_SLUG,
      category: SYSTEM_CATEGORY,
      productText: tLocalized("Trasformer Comp Flow Şırınga Kompozit", "Trasformer Comp Flow Syringe Composite"),
      kicker: tLocalized("CRS Trasformer Comp Flow · Şırınga Kompozit", "CRS Trasformer Comp Flow · Syringe Composite"),
      titleHtml: tLocalized("Tam çene kompozitte <span class=\"em\">akışkan restorasyon.</span>", "<span class=\"em\">Flowable restoration</span> in full-arch composite."),
      leadHtml:
        tLocalized("Trasformer Comp Flow Şırınga Kompozit, Trasformer Light Glass Mufla Sistemi ile birlikte tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen dijital laboratuvar akışında kullanılır.", "Trasformer Comp Flow Syringe Composite is used together with the Trasformer Light Glass Muffle System in a digital laboratory workflow targeting accuracy, light transmission, and stability in full-arch composite restorations."),
      pills: [{ label: tLocalized("Comp Flow", "Comp Flow") }, { label: tLocalized("Şırınga kompozit", "Syringe composite") }, { label: tLocalized("Tam çene", "Full arch") }, { label: "CRS" }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2eb7407c-c84b-4bf3-bb87-343b261f6854/1080/iso.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/28c424ec-645c-429c-bdcd-274c0dad3ac8/1080/1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/94af1b68-60ef-4a34-ad37-e0601e02e183/1080/2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6cc51852-fb8a-4d54-b2e6-e8d0a14cb618/1080/3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bd485d92-3abb-40e2-92f3-f7b20642bc45/1080/4.webp",
      ],
      galleryBadge: tLocalized("COMP FLOW", "COMP FLOW"),
      metricTitleHtml: tLocalized("Kompozit restorasyonda <span class=\"em\">akış ve stabilite.</span>", "<span class=\"em\">Flow and stability</span> in composite restoration."),
      metricSideHtml: tLocalized("Comp Flow, Trasformer sistem akışında tam çene kompozit restorasyonlar için kullanılan şırınga kompozit ürünüdür.", "Comp Flow is a syringe composite product used for full-arch composite restorations in the Trasformer system workflow."),
      metrics: [
        { name: tLocalized("Form", "Form"), value: "Flow", unit: "", tag: tLocalized("Şırınga", "Syringe"), caption: tLocalized("Şırınga kompozit formunda listelenir.", "Listed in syringe composite form.") },
        { name: tLocalized("Uygulama", "APPLICATION"), value: "Tam", unit: tLocalized("çene", "jaw"), tag: tLocalized("Composite", "Composite"), caption: tLocalized("Tam çene kompozit restorasyon sistemiyle birlikte kullanılır.", "Used together with the full-arch composite restoration system.") },
        { name: tLocalized("Sistem", "System"), value: "Light", unit: "Glass", tag: tLocalized("Trasformer", "transformer"), caption: tLocalized("Mufla sistemiyle birlikte doğruluk ve ışık geçirgenliği hedefler.", "Targets accuracy and light transmission together with the muffle system.") },
      ],
      specTag: "TRASFORMER · COMP FLOW",
      specTitleHtml: tLocalized("Light Glass sisteminde <span class=\"em\">kompozit akışı.</span>", "<span class=\"em\">Composite workflow</span> in the Light Glass system."),
      specDescriptionHtml: tLocalized("Comp Flow, Trasformer Light Glass Mufla Sistemi ile birlikte tam çene kompozit restorasyonlarda kullanılmak üzere konumlandırılır.", "Comp Flow is positioned to be used together with the Trasformer Light Glass Muffle System for full-arch composite restorations."),
      specRows: [
        { label: tLocalized("Ürün", "Product"), value: tLocalized("Şırınga kompozit", "Syringe composite") },
        { label: tLocalized("Sistem", "System"), value: tLocalized("Trasformer Light Glass", "TRASFORMER LIGHT GLASS") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Tam çene kompozit restorasyon", "Full-arch composite restoration") },
        { label: tLocalized("Marka", "Brand"), value: "CRS" },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Sistemler", "Systems") },
      ],
      useCaseSideHtml: tLocalized("Tam çene kompozit restorasyon ve Light Glass mufla sistemiyle birlikte kullanılır.", "Used together with the full-arch composite restoration and Light Glass muffle system."),
      useCasePhotos: [
        { imageIndex: 1, title: tLocalized("Comp Flow", "Comp Flow"), text: tLocalized("Şırınga kompozit uygulama akışı.", "Syringe composite application workflow."), alt: tLocalized("Trasformer Comp Flow", "Trasformer Comp Flow") },
        { imageIndex: 2, title: tLocalized("Tam çene", "Full arch"), text: tLocalized("Kompozit restorasyon sistemi.", "Composite restoration system."), alt: tLocalized("Trasformer tam çene kompozit", "Trasformer full-arch composite") },
        { imageIndex: 3, title: tLocalized("Light Glass", "Light Glass"), text: tLocalized("Mufla sistemiyle birlikte çalışma.", "Working together with the muffle system."), alt: tLocalized("Trasformer Light Glass uygulama", "Transformer Light Glass application") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Tam çene kompozit restorasyonlar", "Full-arch composite restorations"), "Light Glass mufla sistemi", tLocalized("Dijital laboratuvar kompozit akışı", "Digital laboratory composite workflow")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Renk seçimi", "Color selection"), "Mufla sistemi uyumu", tLocalized("Restorasyon vaka planı", "Restoration case plan")] },
      ],
      devicesTitle: tLocalized("Trasformer Light Glass Mufla Sistemi ile çalışır", "Works with the Trasformer Light Glass Muffle System"),
      devicesTextHtml: tLocalized("Comp Flow, Light Glass sistem akışındaki kompozit uygulama adımıdır. Vaka planı ve sistem uyumunu birlikte değerlendirebiliriz.", "Comp Flow is the composite application step in the Light Glass system workflow. We can evaluate the case plan and system compatibility together."),
      deviceChips: [{ label: tLocalized("Light Glass", "Light Glass") }, { label: tLocalized("Comp Flow", "Comp Flow") }, { label: tLocalized("Tam çene", "Full arch") }, { label: "CRS", highlighted: true }],
      faqItems: [
        { question: tLocalized("Trasformer Comp Flow ne için kullanılır?", "What is Trasformer Comp Flow used for?"), answerHtml: tLocalized("Trasformer Light Glass sistemiyle birlikte tam çene kompozit restorasyon akışında kullanılan şırınga kompozittir.", "This is a syringe composite used together with the Trasformer Light Glass system in the full-arch composite restoration workflow.") },
        { question: tLocalized("Tek başına mı kullanılır?", "Is it used on its own?"), answerHtml: tLocalized("Ürün, Light Glass mufla sistemiyle birlikte çalışan restorasyon akışı içinde konumlandırılır.", "The product is positioned within a restoration workflow that works together with the Light Glass muffle system.") },
        { question: tLocalized("Hangi hedeflere odaklanır?", "Which goals does it focus on?"), answerHtml: tLocalized("Kaynak açıklamada doğruluk, ışık geçirgenliği ve stabilite hedefleri vurgulanır.", "The source description emphasizes accuracy, light transmittance, and stability targets.") },
      ],
      videoTitleHtml: tLocalized("Comp Flow uyumunu <span class=\"em\">birlikte netleştirin.</span>", "<span class=\"em\">Clarify Comp Flow compatibility together.</span>"),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için sistem uyumunu teknik destek üzerinden kontrol edebilirsiniz.", "Since there is no product video on this product page, you can check system compatibility through technical support."),
      videoTitle: tLocalized("Trasformer Comp Flow teknik destek", "Trasformer Comp Flow technical support"),
      videoText: tLocalized("Renk, sistem uyumu ve tam çene kompozit vaka akışı için uzman desteği alın.", "Get expert support for color, system compatibility, and full-arch composite case workflow."),
    },
    {
      slug: TRASFORMER_LIGHT_GLASS_SLUG,
      category: SYSTEM_CATEGORY,
      productText: tLocalized("Trasformer Light Glass Mufla Sistemi", "Transformer Light Glass Muffle System"),
      kicker: tLocalized("CRS Trasformer Light Glass · Mufla Sistemi", "CRS Transformer Light Glass · Muffle System"),
      titleHtml: tLocalized("Tam çene kompozitte <span class=\"em\">ışık geçirgenliği ve stabilite.</span>", "<span class=\"em\">Light transmission and stability</span> in full-arch composite."),
      leadHtml:
        tLocalized("Trasformer Light Glass Mufla Sistemi, modern dijital laboratuvarların tam çene kompozit restorasyonlarda ihtiyaç duyduğu doğruluk, ışık geçirgenliği ve stabiliteyi üst seviyede sunmak için tasarlanmıştır.", "The Trasformer Light Glass Muffle System is designed to deliver, at a high level, the accuracy, light transmission, and stability that modern digital laboratories need in full-arch composite restorations."),
      pills: [{ label: tLocalized("Light Glass", "Light Glass") }, { label: tLocalized("Mufla sistemi", "Muffle system") }, { label: tLocalized("Tam çene", "Full arch") }, { label: tLocalized("Kompozit restorasyon", "composite restoration") }],
      images: [
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/ee5b1f34-39b8-4ca3-b9d1-e911a6547b71/1080/tra.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/28c424ec-645c-429c-bdcd-274c0dad3ac8/1080/1.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/94af1b68-60ef-4a34-ad37-e0601e02e183/1080/2.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6cc51852-fb8a-4d54-b2e6-e8d0a14cb618/1080/3.webp",
        "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/bd485d92-3abb-40e2-92f3-f7b20642bc45/1080/4.webp",
      ],
      galleryBadge: tLocalized("LIGHT GLASS", "LIGHT GLASS"),
      metricTitleHtml: tLocalized("Doğruluk, ışık geçirgenliği ve <span class=\"em\">stabilite.</span>", "Accuracy, light transmission, and <span class=\"em\">stability.</span>"),
      metricSideHtml: tLocalized("Light Glass, tam çene kompozit restorasyonlarda modern dijital laboratuvarların ihtiyaç duyduğu sistem akışını destekler.", "Light Glass supports the system workflow that modern digital laboratories need for full-arch composite restorations."),
      metrics: [
        { name: tLocalized("Sistem", "System"), value: "Light", unit: "Glass", tag: tLocalized("Mufla", "muffle"), caption: tLocalized("Mufla sistemi olarak listelenir.", "It is listed as muffle system.") },
        { name: tLocalized("Uygulama", "APPLICATION"), value: "Tam", unit: tLocalized("çene", "jaw"), tag: tLocalized("Composite", "Composite"), caption: tLocalized("Tam çene kompozit restorasyon hedefler.", "Targets full-arch composite restoration.") },
        { name: tLocalized("Hedef", "Aim"), value: "Stabil", unit: tLocalized("akış", "Akış"), tag: tLocalized("Lab", "laboratory"), caption: tLocalized("Doğruluk, ışık geçirgenliği ve stabilite vurgulanır.", "Accuracy, light transmission, and stability are emphasized.") },
      ],
      specTag: "TRASFORMER · LIGHT GLASS",
      specTitleHtml: tLocalized("Tam çene kompozit için <span class=\"em\">mufla sistemi.</span>", "A <span class=\"em\">muffle system</span> for full-arch composite."),
      specDescriptionHtml: tLocalized("Light Glass Mufla Sistemi, tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite ihtiyacını karşılamak için tasarlanmıştır.", "The Light Glass Muffle System is designed to meet the need for accuracy, light transmittance, and stability in full-arch composite restorations."),
      specRows: [
        { label: tLocalized("Ürün", "Product"), value: tLocalized("Mufla sistemi", "Muffle system") },
        { label: tLocalized("Sistem", "System"), value: tLocalized("Trasformer Light Glass", "TRASFORMER LIGHT GLASS") },
        { label: tLocalized("Kullanım", "Usage"), value: tLocalized("Tam çene kompozit restorasyon", "Full-arch composite restoration") },
        { label: tLocalized("Hedef", "Aim"), value: tLocalized("Doğruluk / ışık geçirgenliği / stabilite", "Accuracy / light transmission / stability") },
        { label: tLocalized("Kategori", "Category"), value: tLocalized("Sistemler", "Systems") },
      ],
      useCaseSideHtml: tLocalized("Tam çene kompozit restorasyonlarda sistem stabilitesi ve ışık geçirgenliği için kullanılır.", "Used for system stability and light transmission in full-arch composite restorations."),
      useCasePhotos: [
        { imageIndex: 1, title: tLocalized("Mufla sistemi", "Muffle system"), text: tLocalized("Light Glass restorasyon akışı.", "Light Glass restoration workflow."), alt: tLocalized("Trasformer Light Glass mufla sistemi", "Transformer Light Glass muffle system") },
        { imageIndex: 2, title: tLocalized("Tam çene", "Full arch"), text: tLocalized("Kompozit restorasyon planı.", "Composite restoration plan."), alt: tLocalized("Trasformer Light Glass tam çene", "Trasformer Light Glass full arch") },
        { imageIndex: 3, title: tLocalized("Stabilite", "stability"), text: tLocalized("Işık geçirgenliği ve doğruluk hedefi.", "Light transmittance and accuracy target."), alt: tLocalized("Trasformer Light Glass stabilite", "Transformer Light Glass stability") },
      ],
      useCaseCards: [
        { eyebrow: tLocalized("Kullanım", "Usage"), title: tLocalized("Nerede kullanılır?", "Where is it used?"), items: [tLocalized("Tam çene kompozit restorasyonlar", "Full-arch composite restorations"), tLocalized("Dijital laboratuvar restorasyon akışı", "Digital laboratory restoration workflow"), tLocalized("Comp Flow ile sistem çalışması", "System operation with Comp Flow")] },
        { eyebrow: tLocalized("Kontrol", "Control"), title: tLocalized("Neler netleşir?", "What will be clarified?"), items: [tLocalized("Mufla sistemi kullanımı", "Muffle system usage"), tLocalized("Kompozit materyal seçimi", "Composite material selection"), tLocalized("Vaka planı ve restorasyon hedefi", "Case plan and restoration goal")] },
      ],
      devicesTitle: tLocalized("Comp Flow ve tam çene kompozit akışıyla çalışır", "Works with the Comp Flow and full-arch composite workflow"),
      devicesTextHtml: tLocalized("Light Glass sistemi, Comp Flow kompozit ve restorasyon planıyla birlikte değerlendirilmelidir.", "The Light Glass system should be evaluated together with the Comp Flow composite and the restoration plan."),
      deviceChips: [{ label: tLocalized("Mufla sistemi", "Muffle system") }, { label: tLocalized("Comp Flow", "Comp Flow") }, { label: tLocalized("Tam çene", "Full arch") }, { label: tLocalized("Light Glass", "Light Glass"), highlighted: true }],
      faqItems: [
        { question: tLocalized("Trasformer Light Glass ne için kullanılır?", "What is Trasformer Light Glass used for?"), answerHtml: tLocalized("Tam çene kompozit restorasyonlarda doğruluk, ışık geçirgenliği ve stabilite hedefleyen mufla sistemidir.", "A muffle system targeting accuracy, light transmission, and stability in full-arch composite restorations.") },
        { question: tLocalized("Hangi ürünle birlikte çalışır?", "Which product does it work together with?"), answerHtml: tLocalized("Trasformer Comp Flow şırınga kompozit ile aynı sistem akışında kullanılır.", "Used in the same system workflow as the syringe composite.") },
        { question: tLocalized("Hangi laboratuvarlar için uygundur?", "Which laboratories is it suitable for?"), answerHtml: tLocalized("Modern dijital laboratuvarların tam çene kompozit restorasyon akışları için konumlandırılır.", "Positioned for the full-arch composite restoration workflows of modern digital laboratories.") },
      ],
      videoTitleHtml: tLocalized("Light Glass sistemini <span class=\"em\">birlikte netleştirin.</span>", "<span class=\"em\">Clarify the Light Glass system together.</span>"),
      videoSideHtml: tLocalized("Bu ürün sayfasında ürün videosu bulunmadığı için sistem uyumunu teknik destek üzerinden kontrol edebilirsiniz.", "Since there is no product video on this product page, you can check system compatibility through technical support."),
      videoTitle: tLocalized("Trasformer Light Glass teknik destek", "Trasformer Light Glass technical support"),
      videoText: tLocalized("Mufla sistemi, Comp Flow uyumu ve tam çene kompozit vaka akışı için uzman desteği alın.", "Get expert support for the muffle system, Comp Flow compatibility, and the full-arch composite case workflow."),
    },
  ];
  return cachedLabConfigs;
}

let cachedLabDataLocale: "tr" | "en" | null = null;
let cachedLabData: Record<string, ProductDetailTemplateData> | null = null;

export function labProductDetailDataBySlug(): Record<string, ProductDetailTemplateData> {
  const locale = isEnglishLocale() ? "en" : "tr";
  if (cachedLabDataLocale === locale && cachedLabData) return cachedLabData;
  cachedLabDataLocale = locale;
  cachedLabData = Object.fromEntries(labProductConfigs().map((config) => [config.slug, labProductDetail(config)]));
  return cachedLabData;
}

const LAB_PRODUCT_ALIASES: Record<string, string[]> = {
  [MASH_W1E_ULTRASONIC_WASH_SLUG]: ["mash-w1e", "w1e", tLocalized("ultrasonik-yikama", "ultrasonik-yikama"), "washing-device", "washing-unit", "mash-w1e-ultrasonic-washing-unit", "ultrasonic-washing-unit", "mash-w1e-ultrasonik-yikama-cihazi", "mash-w1e-ultrasonic-washing-machine"],
  [MASH_C1E_UV_CURING_SLUG]: ["mash-c1e", "c1e", tLocalized("uv-kurleme", "uv-kurleme"), "dental-post-cure", "mash-c1e-uv-kurleme-cihazi", "mash-c1e-uv-curing-device", "mash-c1e-smart-uv-curing-unit"],
  [CREALITY_WASH_CURE_UW03_SLUG]: ["creality-wash-cure-uw-03", "creality-washcure-uw-03", "uw-03", "uw-02", "creality-washcure-uw-02", "creality-wash-and-cure-uw-02", "creality-wash-and-cure-uw-03"],
  [THREESHAPE_E2_SLUG]: ["3shape-e2", "e2-yuksek-uretkenlik"],
  [THREESHAPE_E3_SLUG]: ["3shape-e3", "implant-bar-dogrulugu"],
  [THREESHAPE_E4_SLUG]: ["3shape-e4", tLocalized("hiz-ve-hassasiyet", "hiz-ve-hassasiyet")],
  [NABERTHEM_LHT_02_17_LB_SPEED_SLUG]: ["lht-02-17-lb-speed", "nabertherm-lht-02-17", "naberthem-lht-02-17-lb-speed", "nabertherm-lht-02-17-lb-speed"],
  [NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG]: ["lht-01-16-turbo-fire", "nabertherm-lht-01-16", "naberthem-lht-01-16-turbo-fire", "nabertherm-lht-01-16-turbo-fire"],
  [NABERTHEM_VL_01_12_LB_PRESS_SLUG]: ["vl-01-12-lb-press", "vl-01-12-lb-press-furnace", "vl-01-12-lb-pres", "press-furnace", "press-firini", "pres-firini", "naberthem-vl-01-12-lb-press-firini", "nabertherm-vl-01-12-lb-press-firini"],
  [NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG]: ["vl-01-12-lb-porcelain", "vl-01-12-lb-porcelain-furnace", "porcelain-furnace", "porselen-firini", "naberthem-vl-01-12-lb-porselen-firini", "nabertherm-vl-01-12-lb-porselen-firini"],
  [MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG]: ["mesa-grade-5-eli", "titanyum-disk", "titanium-disk", "mesa-grade-5-eli-titanyum-disk", "mesa-grade-5-eli-titanium-disc", "mesa-titanium-disk-grade-5-eli"],
  [TRASFORMER_COMP_FLOW_SLUG]: ["trasformer-comp-flow", "comp-flow-siringa-kompozit", "trasformer-comp-flow-siringa-kompozit", "trasformer-comp-flow-syringe-composite", "transformer-comp-flow-syringe-composite"],
  [TRASFORMER_LIGHT_GLASS_SLUG]: ["trasformer-light-glass", "light-glass-mufla", "trasformer-light-glass-mufla-sistemi"],
  [MASH_P16L_PRINTER_SLUG]: ["mash-p16l", "385nm-16k", "16k-dental-3d-yazici", "mash-p16l-385nm-16k-dental-3d-printer"],
  [MASH_CURIE_M1_DENTAL_SLUG]: ["mash-curie-m1-dental", "curie-m1-dental", "yerli-dental-3d-printer", "mash-curie-m1-dental-3d-printer", "curie-m1-dental-3d-printer", "mash-curie-m1-dental-dlp-3d-printer"],
  [MASH_CURIE_M1_JEWELRY_SLUG]: ["mash-curie-m1-jewelry", "curie-m1-jewelry", "jewelry-3d-printer", "kuyumculuk"],
  [CREALITY_HALOT_SKY_6K_SLUG]: ["creality-halot-sky", "halot-sky-6k", "fabrika-cikisli-versiyon", "hassasiyeti-arttirilmis-versiyon", "creality-halot-sky-6k-1", "creality-halot-sky-6k-dental-3d-printer"],
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
  let slug = raw.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop();
  if (!slug && typeof window !== "undefined") {
    slug = window.location.pathname.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop() || "";
  }
  if (slug) {
    const trMapped = EN_TO_TR_ROUTE_MAP[`/${slug}`] || EN_TO_TR_ROUTE_MAP[slug];
    if (trMapped) {
      return trMapped.replace(/^\/+/, "");
    }
    return slug;
  }
  return "";
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
  return slug === CRS_GUIDE_SLUG || name.includes("crs-guide-resin") || name.includes("kilavuz-recinesi") || name.includes(tLocalized("cerrahi-rehber", "cerrahi-rehber"));
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
  return slug === CRS_CAST_SLUG || slug.includes("crs-cast") || name.includes("crs-cast") || name.includes("cekmeyen-dokum") || name.includes("casting-resin");
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
  const detailData = printerSparePartDetailDataBySlug();
  const configs = printerSparePartConfigs();
  const aliasesBySlug = printerSparePartAliases();
  const direct = detailData[slug];
  if (direct) return direct;

  for (const config of configs) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(aliasesBySlug[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return detailData[config.slug];
    }
  }

  return undefined;
}

function zirconBlockData(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  const haystack = `${slug} ${name}`;
  const direct = zirconBlockDetailDataBySlug()[slug];
  if (direct) return direct;

  for (const config of zirconBlockConfigs()) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(ZIRCON_BLOCK_ALIASES[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return zirconBlockDetailDataBySlug()[config.slug];
    }
  }

  return undefined;
}

function labProductData(product: unknown) {
  const slug = productSlug(product);
  const name = slugifyProduct(stringValue((product as { name?: unknown } | null)?.name));
  const haystack = `${slug} ${name}`;
  const direct = labProductDetailDataBySlug()[slug];
  if (direct) return direct;

  for (const config of labProductConfigs()) {
    const productText = slugifyProduct(config.productText);
    const aliases = [config.slug, productText, ...(LAB_PRODUCT_ALIASES[config.slug] || [])];
    if (aliases.some((alias) => alias && haystack.includes(alias))) {
      return labProductDetailDataBySlug()[config.slug];
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

const ENGLISH_REMOVED_PRODUCT_SLUGS = new Set([
  "argenz-ht-plus-multilayer-zirconia-block",
  "argenz-ht-plus-zirconia-block",
  "argenz-st-multilayer-zirconia-block",

  "mesa-titanium-disk-grade-5-eli",
  // English aliases used by the storefront/header routing.
  "argenz-ht-plus-zirconia-disc",
  "argenz-st-multilayer-zirconia-disc",
  "argenz-ht-plus-multilayer-zirconia-disc",
]);

function isEnglishRemovedProduct(product: unknown): boolean {
  if (!isEnglishLocale()) return false;
  const slug = productSlug(product).toLocaleLowerCase("tr");
  return ENGLISH_REMOVED_PRODUCT_SLUGS.has(slug);
}

export function resolveProductDetailData(product: unknown, productTemplateJson?: unknown) {
  const override = parseJson(productTemplateJson);

  const zirconData = zirconBlockData(product);
  const sparePartData = printerSparePartData(product);
  const labData = labProductData(product);

  const looksLikeCrsComposite = productLooksLikeCrsComposite(product);

  const baseData = zirconData
    ? zirconData
    : sparePartData
      ? sparePartData
      : labData
        ? labData
        : productLooksLikeTrialWhite(product)
          ? MASH_TRIAL_WHITE_PRODUCT_DETAIL_DATA()
          : productLooksLikeTrialPink(product)
            ? MASH_TRIAL_PINK_PRODUCT_DETAIL_DATA()
            : productLooksLikeStudy(product)
              ? MASH_STUDY_PRODUCT_DETAIL_DATA()
              : productLooksLikeCast(product)
                ? CRS_CAST_PRODUCT_DETAIL_DATA()
                : productLooksLikeMashClear(product)
                  ? MASH_CLEAR_PRODUCT_DETAIL_DATA()
                  : productLooksLikeTray(product)
                    ? CRS_TRAY_PRODUCT_DETAIL_DATA()
                    : productLooksLikeModel(product)
                      ? CRS_MODEL_PRODUCT_DETAIL_DATA()
                      : productLooksLikeGingiva(product)
                        ? CRS_GINGIVA_PRODUCT_DETAIL_DATA()
                        : productLooksLikeDenture(product)
                          ? CRS_DENTURE_PRODUCT_DETAIL_DATA()
                          : productLooksLikeAligner(product)
                            ? CRS_ALIGNER_PRODUCT_DETAIL_DATA()
                            : productLooksLikeFlexit(product)
                              ? CRS_FLEXIT_PRODUCT_DETAIL_DATA()
                              : productLooksLikeIbt(product)
                                ? CRS_IBT_PRODUCT_DETAIL_DATA()
                                : productLooksLikeGuide(product)
                                  ? CRS_GUIDE_PRODUCT_DETAIL_DATA()
                                  : productLooksLikeSplintSoft(product)
                                    ? CRS_SPLINT_SOFT_PRODUCT_DETAIL_DATA()
                                    : productLooksLikeSplintHard(product)
                                      ? CRS_SPLINT_HARD_PRODUCT_DETAIL_DATA()
                                      : looksLikeCrsComposite
                                        ? CRS_COMPOSITE_PRODUCT_DETAIL_DATA()
                                        : null;

  if (!baseData) return null;

  const data =
    zirconData || sparePartData || labData
      ? baseData
      : override
        ? deepMerge(baseData, override)
        : baseData;

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
