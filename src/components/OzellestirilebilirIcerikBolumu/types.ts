// This file is auto-generated — do not edit manually.
import type { IkasImage, IkasVideo } from "@ikas/bp-storefront";
import type { BolumTuru, GorselSigdirma, GorselYaziDuzeni, MedyaGenisligi, VideoGorselDuzeni, VideoYaziDuzeni, YaziHizalamasi } from "../../global-types";

export interface Props {
  bolumTuru?: BolumTuru;
  backgroundColor?: string;
  textColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  /** Piksel, rem, em, yüzde veya vw birimi kullanabilirsiniz. */
  icerikGenisligi?: string;
  /** Piksel, rem, vh, yüzde veya auto kullanabilirsiniz. */
  bolumMinYuksekligi?: string;
  /** Piksel cinsinden boşluk. */
  masaustuUstBosluk?: number;
  /** Piksel cinsinden boşluk. */
  masaustuAltBosluk?: number;
  /** Piksel cinsinden boşluk. */
  masaustuYanBosluk?: number;
  /** Piksel cinsinden boşluk. */
  mobilUstBosluk?: number;
  /** Piksel cinsinden boşluk. */
  mobilAltBosluk?: number;
  /** Piksel cinsinden boşluk. */
  mobilYanBosluk?: number;
  yaziHizalamasi?: YaziHizalamasi;
  /** Piksel cinsinden yazı boyutu. */
  baslikYaziBoyutu?: number;
  /** Piksel cinsinden yazı boyutu. */
  aciklamaYaziBoyutu?: number;
  /** Piksel cinsinden değer; en fazla 64 olabilir. */
  medyaKoseYumusakligi?: number;
  medyaGoster?: boolean;
  butonlariGoster?: boolean;
  videoKontrolleriniGoster?: boolean;
  videoSessizOynat?: boolean;
  videoDonguluOynat?: boolean;
  gorselYaziDuzeni?: GorselYaziDuzeni;
  gorselYaziGorseli?: IkasImage | null;
  gorselYaziGorselAciklamasi?: string;
  gorselYaziBaslik?: string;
  gorselYaziAciklama?: string;
  gorselYaziDugmeMetni?: string;
  /** Güvenli web adresi veya mağaza içi bağlantı girin. */
  gorselYaziDugmeBaglantisi?: string;
  gorselYaziBaslikIngilizce?: string;
  gorselYaziAciklamaIngilizce?: string;
  gorselYaziDugmeMetniIngilizce?: string;
  gorselYaziGorselAciklamasiIngilizce?: string;
  yaziHizaliBaslik?: string;
  yaziHizaliAciklama?: string;
  yaziHizaliDugmeMetni?: string;
  /** Güvenli web adresi veya mağaza içi bağlantı girin. */
  yaziHizaliDugmeBaglantisi?: string;
  yaziHizaliBaslikIngilizce?: string;
  yaziHizaliAciklamaIngilizce?: string;
  yaziHizaliDugmeMetniIngilizce?: string;
  videoYaziDuzeni?: VideoYaziDuzeni;
  /** Doğrudan oynatılabilir video seçin. */
  videoYaziVideo?: IkasVideo | null;
  videoYaziKapakGorseli?: IkasImage | null;
  videoYaziVideoAciklamasi?: string;
  videoYaziBaslik?: string;
  videoYaziAciklama?: string;
  videoYaziDugmeMetni?: string;
  /** Güvenli web adresi veya mağaza içi bağlantı girin. */
  videoYaziDugmeBaglantisi?: string;
  videoYaziBaslikIngilizce?: string;
  videoYaziAciklamaIngilizce?: string;
  videoYaziDugmeMetniIngilizce?: string;
  videoYaziVideoAciklamasiIngilizce?: string;
  /** Doğrudan oynatılabilir video seçin. */
  yalnizcaVideo?: IkasVideo | null;
  yalnizcaVideoKapakGorseli?: IkasImage | null;
  yalnizcaVideoAciklamasi?: string;
  yalnizcaVideoAciklamasiIngilizce?: string;
  videoGorselDuzeni?: VideoGorselDuzeni;
  /** Doğrudan oynatılabilir video seçin. */
  videoGorselVideo?: IkasVideo | null;
  videoGorselVideoKapak?: IkasImage | null;
  videoGorselVideoAciklamasi?: string;
  videoGorselVideoAciklamasiIngilizce?: string;
  videoGorselGorseli?: IkasImage | null;
  videoGorselAlternatifMetni?: string;
  videoGorselAlternatifMetniIngilizce?: string;
  yalnizcaGorsel?: IkasImage | null;
  yalnizcaGorselAciklamasi?: string;
  yalnizcaGorselAciklamasiIngilizce?: string;
  yalnizcaGorselSigdirma?: GorselSigdirma;
  tekMedyaGenisligi?: MedyaGenisligi;
}
