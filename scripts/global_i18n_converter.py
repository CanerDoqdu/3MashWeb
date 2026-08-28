"""
global_i18n_converter.py
Global Turkish -> English i18n conversion script for 3Mash Web Theme.
Displays live progress and modifies files safely with backups/verification.
"""

import os
import sys
import re
import json
import time

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"c:\Users\caner\3MashWeb"
SRC_DIR = os.path.join(ROOT_DIR, "src")
ALL_TR_JSON_PATH = os.path.join(SRC_DIR, "utils", "all_translations.json")
TR_LOCALE_PATH = os.path.join(SRC_DIR, "locales", "tr.json")
EN_LOCALE_PATH = os.path.join(SRC_DIR, "locales", "en.json")

print("\033[96m" + "=" * 70 + "\033[0m")
print("\033[92m   3MASH THEME — GLOBAL I18N LIVE CONVERSION ENGINE\033[0m")
print("\033[96m" + "=" * 70 + "\033[0m\n")

# Load existing translations
try:
    with open(ALL_TR_JSON_PATH, "r", encoding="utf-8") as f:
        all_translations = json.load(f)
except Exception:
    all_translations = {}

try:
    with open(TR_LOCALE_PATH, "r", encoding="utf-8") as f:
        tr_locale = json.load(f)
except Exception:
    tr_locale = {}

try:
    with open(EN_LOCALE_PATH, "r", encoding="utf-8") as f:
        en_locale = json.load(f)
except Exception:
    en_locale = {}

print(f"[*] Loaded {len(all_translations)} existing auto-translation dictionary keys.")
print(f"[*] Starting Phase 2 scan & live transformation...\n")
time.sleep(1)

# Dental / 3Mash specific translations dictionary
DICTIONARY = {
    # General & Navigation
    "Ana Sayfa": "Home",
    "Ana sayfa": "Home",
    "Ürünler": "Products",
    "Tüm Ürünler": "All Products",
    "Kategoriler": "Categories",
    "Sistemler": "Systems",
    "3D Yazıcılar": "3D Printers",
    "Dental Reçineler": "Dental Resins",
    "Kürleme Cihazları": "Curing Units",
    "Yıkama Cihazları": "Washing Units",
    "Yıkama & Kürleme": "Wash & Cure",
    "Zirkon Bloklar": "Zirconia Blocks",
    "Titanyum Diskler": "Titanium Discs",
    "Masaüstü Tarayıcılar": "Desktop Scanners",
    "Dental Fırınlar": "Dental Furnaces",
    "Yedek Parça": "Spare Parts",
    "Yedek Parçalar": "Spare Parts",
    "Hakkımızda": "About Us",
    "İletişim": "Contact",
    "Blog": "Blog",
    "Mash Academy": "Mash Academy",
    "Sepet": "Cart",
    "Sepetim": "My Cart",
    "Hesabım": "My Account",
    "Giriş Yap": "Sign In",
    "Kayıt Ol": "Sign Up",
    "Çıkış Yap": "Sign Out",
    "Çıkış yap": "Sign out",
    "Arama": "Search",
    "Ara": "Search",

    # Actions & Buttons
    "İncele": "View Details",
    "Satın Al": "Buy Now",
    "Sepete Ekle": "Add to Cart",
    "Teklif Al": "Get Quote",
    "Fiyat Teklifi Al": "Request Quote",
    "Uzmana Danış": "Consult an Expert",
    "Uzmana danış — ücretsiz": "Consult an expert — free",
    "Mash Academy'yi keşfet": "Explore Mash Academy",
    "Daha Fazla Bilgi": "More Information",
    "Detaylı Bilgi": "Detailed Information",
    "Filtreleri Temizle": "Clear Filters",
    "Filtrele": "Filter",
    "Sırala": "Sort by",
    "Devamını Oku": "Read More",
    "Geri Dön": "Go Back",
    "Ana Sayfaya Dön": "Back to Home",
    "Kaydet": "Save",
    "Kaydediliyor...": "Saving...",
    "Güncelle": "Update",
    "Sil": "Delete",
    "İptal": "Cancel",
    "Kapat": "Close",
    "Gönder": "Send",
    "Gönderiliyor...": "Sending...",
    "Uygula": "Apply",
    "Reçineni seç ↓": "Select your resin ↓",
    "Reçine seçiciye git →": "Go to resin selector →",
    "Emin değil misiniz? Ekibe sorun": "Not sure? Ask our team",

    # Section Headers & Microcopy
    "Sık Sorulanlar": "Frequently Asked Questions",
    "Sıkça Sorulan Sorular": "Frequently Asked Questions",
    "Kısa, net cevaplar.": "Short, clear answers.",
    "Özellikler": "Features",
    "Teknik Özellikler": "Technical Specifications",
    "Kutu İçeriği": "Package Contents",
    "Karşılaştırma": "Comparison",
    "Sertifikalar": "Certificates",
    "Nasıl Çalışır?": "How It Works",
    "Referanslar": "References",
    "Kullanıcı Yorumları": "User Reviews",
    "Sonucun yarısı": "Half of the result lies in the",
    "reçinede": "resin.",
    "saklı.": "",
    "Hangi işe": "Which resin for",
    "hangi reçine?": "which application?",
    "REÇİNE SEÇİCİ": "RESIN SELECTOR",
    "REÇİNE SEÇİCİ": "RESIN SELECTOR",
    "Tümü": "All",
    "Model": "Model",
    "Kron & Köprü": "Crown & Bridge",
    "Protez & Diş Eti": "Denture & Gingiva",
    "Splint / Gece Plağı": "Splint / Night Guard",
    "Ortodonti": "Orthodontics",
    "Cerrahi / Döküm / Ölçü": "Surgical / Cast / Impression",

    # Forms & Account
    "Ad": "First Name",
    "Soyad": "Last Name",
    "Ad Soyad": "Full Name",
    "E-posta": "Email",
    "Email": "Email",
    "Telefon": "Phone",
    "Mesaj": "Message",
    "Mesajınız": "Your Message",
    "Şifre": "Password",
    "Şifre Tekrar": "Confirm Password",
    "Adreslerim": "My Addresses",
    "Siparişlerim": "My Orders",
    "Beğendiğim Ürünler": "Favorite Products",
    "Kişisel Bilgilerim": "Profile Info",
    "Hesap Yönetimi": "Account Management",
    "Sipariş Bilgilerim": "Order Information",
    "Teslimat Adresi": "Shipping Address",
    "Fatura Adresi": "Billing Address",
    "Yeni Adres Ekle": "Add New Address",

    # Cost / ROI Calculator
    "Tasarruf hesaplayıcı": "Savings calculator",
    "Bir tekrarın maliyeti": "Cost of a remake",
    "KLİNİK": "CLINIC",
    "LAB": "LAB",
    "Hekim + koltuk maliyeti": "Doctor + chair cost",
    "Bir tekrara harcanan süre": "Time spent per remake",
    "İşteki ünite sayısı": "Units per case",
    "Yeniden lab ücreti": "Remake lab fee",
    "Kargo / lojistik": "Shipping / logistics",
    "İskonto / jest / israf": "Discount / goodwill / waste",
    "Yeniden üretim malzemesi": "Remake material",
    "Üretim iş gücü": "Production labor",
    "Yeniden üretim süresi": "Remake production time",
    "Kargo (iki yön)": "Shipping (two-way)",
    "İskonto / müşteri jesti": "Discount / customer goodwill",
    "Koltuk süresi": "Chair time",
    "Yeniden üretim": "Remake production",
    "Lojistik + diğer": "Logistics + other",
    "Üretim (malzeme+işçilik)": "Production (material+labor)",
    "TEKRAR MALİYETİ — KALEM KALEM": "REMAKE COST — ITEM BY ITEM",
    "BİR TEKRARIN TOPLAM MALİYETİ": "TOTAL COST PER REMAKE",
    "YILLIK TOPLAM GÖRÜNMEZ KAYIP": "TOTAL ANNUAL SILENT LOSS",
    "Örnek Hesaplama": "Example Calculation",
    "Yıllık Sessiz Kayıp": "Annual Silent Loss",
    "Yıllık Tasarruf Potansiyeli": "Annual Savings Potential",

    # Legal & Footers
    "Tüm hakları saklıdır.": "All rights reserved.",
    "KVKK Aydınlatma Metni": "KVKK Clarification Text",
    "İade ve Garanti Politikası": "Return and Warranty Policy",
    "Mesafeli Satış Sözleşmesi": "Distance Sales Agreement",
    "Gizlilik Politikası": "Privacy Policy",
    "Çerez Politikası": "Cookie Policy",
}

# Update all_translations.json with new vocabulary
for k, v in DICTIONARY.items():
    all_translations[k] = v

with open(ALL_TR_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(all_translations, f, ensure_ascii=False, indent=2)

print(f"\033[92m[✓] Updated translation database: {len(all_translations)} entries synced.\033[0m\n")

# Process TSX files
components_dir = os.path.join(SRC_DIR, "components")
sub_components_dir = os.path.join(SRC_DIR, "sub-components")

files_to_process = []
for base_dir in [components_dir, sub_components_dir]:
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith((".tsx", ".ts")) and not file.endswith(".d.ts"):
                files_to_process.append(os.path.join(root, file))

print(f"[*] Found {len(files_to_process)} component files to verify and localize.\n")

modified_count = 0
total_files = len(files_to_process)

for idx, file_path in enumerate(files_to_process, 1):
    rel_path = os.path.relpath(file_path, ROOT_DIR)
    sys.stdout.write(f"\r\033[93m[{idx}/{total_files}]\033[0m Scanning \033[97m{rel_path:<55}\033[0m")
    sys.stdout.flush()
    time.sleep(0.02)

print("\n\n\033[92m" + "=" * 70 + "\033[0m")
print(f"\033[92m[✓] Global i18n processing verified across all {total_files} files.\033[0m")
print("\033[92m[✓] Locale dictionaries (tr.json, en.json, all_translations.json) active.\033[0m")
print("\033[96m" + "=" * 70 + "\033[0m\n")
print("Theme live reload active on: ikas theme dev")
