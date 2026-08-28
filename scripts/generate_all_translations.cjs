const fs = require('fs');
const path = require('path');

const extractedPath = path.join(__dirname, 'extracted_turkish_strings.json');
const rawData = JSON.parse(fs.readFileSync(extractedPath, 'utf-8'));

// Common dictionary for words and phrases
const dictionary = {
  // Navigation & General
  "Anasayfa": "Home",
  "Ürünler": "Products",
  "Tüm Ürünler": "All Products",
  "Hakkımızda": "About Us",
  "İletişim": "Contact",
  "Blog": "Blog",
  "Mash Academy": "Mash Academy",
  "Sepet": "Cart",
  "Sepetim": "My Cart",
  "Hesabım": "My Account",
  "Giriş Yap": "Sign In",
  "Giriş": "Sign In",
  "Kayıt Ol": "Sign Up",
  "Kayıt": "Register",
  "Çıkış Yap": "Sign Out",
  "Çıkış": "Sign Out",
  "Arama": "Search",
  "Ara...": "Search...",
  "Ürün Ara": "Search Product",
  "Menü": "Menu",
  "Kapat": "Close",
  "Filtrele": "Filter",
  "Filtreler": "Filters",
  "Sırala": "Sort by",
  "Temizle": "Clear",
  "Uygula": "Apply",
  "Vazgeç": "Cancel",
  "Kaydet": "Save",
  "Güncelle": "Update",
  "Sil": "Delete",
  "Düzenle": "Edit",
  "Ekle": "Add",
  "Sepete Ekle": "Add to Cart",
  "Hemen Al": "Buy Now",
  "Satın Al": "Buy Now",
  "İncele": "Explore",
  "Detaylı İncele": "View Details",
  "Detaylar": "Details",
  "Devamını Oku": "Read More",
  "Daha Fazla": "More",
  "Daha Fazla Göster": "Show More",
  "Tümünü Gör": "View All",
  "Geri Dön": "Go Back",
  "Sonraki": "Next",
  "Önceki": "Previous",
  "Sonuç": "Result",
  "Sonuçlar": "Results",
  "sonuç bulundu": "results found",

  // Account
  "Kişisel Bilgilerim": "My Personal Information",
  "Hesap Bilgilerim": "My Account Information",
  "Adreslerim": "My Addresses",
  "Yeni Adres Ekle": "Add New Address",
  "Siparişlerim": "My Orders",
  "Sipariş Detayı": "Order Details",
  "Beğendiğim Ürünler": "My Favorites",
  "Favorilerim": "My Favorites",
  "Favori Ürünler": "Favorite Products",
  "Şifremi Unuttum": "Forgot Password",
  "Şifremi Kurtar": "Recover Password",
  "Şifre Değiştir": "Change Password",
  "E-posta": "Email",
  "E-posta Adresi": "Email Address",
  "Şifre": "Password",
  "Şifre Tekrarı": "Confirm Password",
  "Ad": "First Name",
  "Soyad": "Last Name",
  "Ad Soyad": "Full Name",
  "Telefon": "Phone",
  "Telefon Numarası": "Phone Number",
  "Adres Başlığı": "Address Title",
  "Şehir": "City",
  "İlçe": "District",
  "Posta Kodu": "Postal Code",
  "Adres": "Address",
  "Varsayılan Adres": "Default Address",

  // Categories & Equipment
  "3D Yazıcılar": "3D Printers",
  "3D Yazıcı": "3D Printer",
  "Dental 3D Yazıcılar": "Dental 3D Printers",
  "Dental Reçineler": "Dental Resins",
  "Dental Reçine": "Dental Resin",
  "Yıkama & Kürleme": "Wash & Cure",
  "Yıkama ve Kürleme": "Wash and Cure",
  "Yıkama Kürleme": "Wash and Cure",
  "Yıkama Cihazı": "Washing Unit",
  "Kürleme Cihazı": "Curing Unit",
  "Masaüstü Tarayıcılar": "Desktop Scanners",
  "Masaüstü Tarayıcı": "Desktop Scanner",
  "Zirkon Bloklar": "Zirconia Blocks",
  "Zirkon Blok": "Zirconia Block",
  "Dental Fırınlar": "Dental Furnaces",
  "Dental Fırın": "Dental Furnace",
  "Sinterleme Fırınları": "Sintering Furnaces",
  "Titanyum Diskler": "Titanium Discs",
  "Titanyum Disk": "Titanium Disc",
  "Yazıcı Yedek Parça": "Printer Spare Parts",
  "Sistemler": "Systems",
  "Sarf Malzemeler": "Consumables",
  "Aksesuarlar": "Accessories",
  "Yedek Parçalar": "Spare Parts",

  // Brands
  "MARKA KOLEKSİYONU": "BRAND COLLECTION",
  "3Shape ekosistemi için canlı ürün envanteri.": "Live product inventory for the 3Shape ecosystem.",
  "Creality ekosistemi için canlı ürün envanteri.": "Live product inventory for the Creality ecosystem.",
  "Argen ekosistemi için canlı ürün envanteri.": "Live product inventory for the Argen ecosystem.",
  "Nabertherm ekosistemi için canlı ürün envanteri.": "Live product inventory for the Nabertherm ecosystem.",
  "CRS ekosistemi için canlı ürün envanteri.": "Live product inventory for the CRS ecosystem.",
  "MASH ekosistemi için canlı ürün envanteri.": "Live product inventory for the MASH ecosystem.",

  // Product Details
  "Özellikler": "Features",
  "Teknik Özellikler": "Technical Specifications",
  "Ürün Özellikleri": "Product Features",
  "Kutu İçeriği": "Package Contents",
  "Paket İçeriği": "Package Contents",
  "Ürün Kutu ve Paket İçeriği": "Package and Box Contents",
  "Dijital İş Akışı": "Digital Workflow",
  "Ürün Dijital İş Akışı": "Product Digital Workflow",
  "Karşılaştırma": "Comparison",
  "Ürün Karşılaştırması": "Product Comparison",
  "Sertifikalar ve Raporlar": "Certificates and Reports",
  "Sertifikalar": "Certificates",
  "Raporlar": "Reports",
  "Kullanıcı Deneyimi": "User Experience",
  "Yorumlar": "Reviews",
  "Müşteri Yorumları": "Customer Reviews",
  "Değerlendirmeler": "Ratings",
  "Stok Durumu": "Stock Status",
  "Stokta Var": "In Stock",
  "Tükendi": "Out of Stock",
  "Stokta Yok": "Out of Stock",
  "Kargo": "Shipping",
  "Ücretsiz Kargo": "Free Shipping",
  "Garanti": "Warranty",
  "2 Yıl Garanti": "2-Year Warranty",
  "Hızlı Teslimat": "Fast Delivery",
  "Teknik Destek": "Technical Support",
  "Adet": "Quantity",
  "Birim Fiyat": "Unit Price",
  "Toplam Fiyat": "Total Price",
  "KDV Dahil": "VAT Included",
  "KDV Hariç": "VAT Excluded",
  "Taksit Seçenekleri": "Installment Options",
  "İlgili Ürünler": "Related Products",
  "Benzer Ürünler": "Similar Products",
  "Tamamlayıcı Ürünler": "Complementary Products",

  // Academy & Events
  "Bilgiyle büyüyen ekosistem.": "An ecosystem powered by knowledge.",
  "Misyon ve vizyon": "Mission and vision",
  "Geçmiş Etkinlikler": "Past Events",
  "Gelecek Etkinlikler": "Upcoming Events",
  "Eğitimler": "Trainings",
  "Webinarlar": "Webinars",
  "Atölyeler": "Workshops",
  "Seminerler": "Seminars",
  "Eğitmenler": "Instructors",
  "Katılımcı Yorumları": "Participant Reviews",
  "Sertifika Programı": "Certificate Program",
  "Kayıt Olun": "Register Now",
  "Eğitime Katıl": "Join Training",
  "Etkinlik Raporu": "Event Report",

  // Legal & Policy
  "KVKK Aydınlatma Metni": "KVKK Clarification Text",
  "Gizlilik Politikası": "Privacy Policy",
  "İade ve Garanti Politikası": "Return & Warranty Policy",
  "Mesafeli Satış Sözleşmesi": "Distance Sales Agreement",
  "Ticari Elektronik İleti": "Commercial Electronic Message",
  "Üyelik Sözleşmesi": "Membership Agreement",
  "Çerez Politikası": "Cookie Policy",
  "Kullanım Koşulları": "Terms of Use",
  "Tüm hakları saklıdır.": "All rights reserved.",

  // 404 & Empty states
  "Sayfa Bulunamadı": "Page Not Found",
  "Aradığınız sayfa mevcut değil veya taşınmış olabilir.": "The page you are looking for does not exist or may have been moved.",
  "Anasayfaya Dön": "Back to Home",
  "Aramanızla eşleşen ürün bulunamadı.": "No products matched your search.",
  "Sepetinizde ürün bulunmamaktadır.": "There are no products in your cart.",
  "Henüz siparişiniz bulunmamaktadır.": "You have no orders yet.",
  "Henüz kayıtlı adresiniz bulunmamaktadır.": "You have no saved addresses yet.",
  "Henüz favori ürününüz bulunmamaktadır.": "You have no favorite products yet."
};

// Automatic rule-based translation for compound patterns
function translateString(str) {
  if (!str) return str;
  const trimmed = str.trim();
  if (dictionary[trimmed]) return dictionary[trimmed];

  // Try lowercased clean match
  for (const [k, v] of Object.entries(dictionary)) {
    if (k.toLowerCase() === trimmed.toLowerCase()) return v;
  }

  // Handle common prefixes/suffixes
  let res = trimmed;
  for (const [k, v] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${k}\\b`, 'gi');
    res = res.replace(regex, v);
  }

  return res !== trimmed ? res : null;
}

const translations = { ...dictionary };

for (const rawStr of Object.keys(rawData)) {
  const trans = translateString(rawStr);
  if (trans) {
    translations[rawStr] = trans;
  }
}

const outputPath = path.join(__dirname, '..', 'src', 'utils', 'all_translations.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf-8');
console.log(`Generated master translation dictionary with ${Object.keys(translations).length} mapped items at ${outputPath}`);
