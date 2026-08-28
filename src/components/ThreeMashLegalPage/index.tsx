import { legalPages, type LegalPageKey } from '../ThreeMashPageData/sourceData';
import { translateText } from '../../utils/i18n';
import { Props } from './types';

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === 'number' ? value : fallback;
}

function pageKey(mode: string | undefined): LegalPageKey {
  return mode === 'iade' || mode === 'mesafeli' || mode === 'ticari' || mode === 'uyelik' ? mode : 'kvkk';
}

function normalizeContentHtml(key: LegalPageKey, contentHtml: string) {
  if (key !== 'ticari') return contentHtml;
  return contentHtml
    .replace(/^(?:<h2><br><\/h2>\s*)+/i, '')
    .replace(/^<h2>.*?<\/h2>\s*/i, '')
    .replace(/^<p><br>\s*/i, '')
    .trim();
}

function titleText(key: LegalPageKey, value: string | undefined, fallback: string) {
  if (key === 'ticari') return 'TİCARİ ELEKTRONİK İLETİ ONAYI';
  return text(value, fallback);
}

function hasEmbeddedHeading(contentHtml: string) {
  return /<h[1-6][\s>]/i.test(contentHtml.slice(0, 900));
}

const membershipDefaults = {
  agreementTitleText: 'ÜYELİK SÖZLEŞMESİ',
  partiesTitleText: 'Taraflar',
  partyCompanyHtml:
    '<p>a)3mash.com internet sitesinin faaliyetlerini yürüten Kızıltoprak Mah. 919 Sok. No: 19A Muratpaşa, Antalya adresinde mukim 3 MASH TEKNOLOJİ A.Ş. (Bundan böyle “3 MASH” olarak anılacaktır).</p>',
  partyMemberHtml: '<p>b)3mash.com internet sitesine üye olan internet kullanıcısı ("Üye")</p>',
  subjectTitleText: 'Sözleşmenin Konusu',
  subjectHtml:
    "<p>İşbu Sözleşme’nin konusu 3 MASH'in sahip olduğu internet sitesi www.3mash.com ‘den üyenin faydalanma şartlarının belirlenmesidir.</p>",
  rightsTitleText: 'Tarafların Hak ve Yükümlülükleri',
  rightsHtml:
    "<p>3.1. Üye, www.3mash.com internet sitesine üye olurken verdiği kişisel ve diğer sair bilgilerin kanunlar önünde doğru olduğunu, 3 MASH'in bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları aynen ve derhal tazmin edeceğini beyan ve taahhüt eder.</p><p>3.2. Üye, 3 MASH tarafından kendisine verilmiş olan şifreyi başka kişi ya da kuruluşlara veremez, üyenin söz konusu şifreyi kullanma hakkı bizzat kendisine aittir.</p><p>3.3. Üye www.3mash.com internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve taahhüt eder.</p><p>3.4. Üye, www.3mash.com internet sitesini hiçbir şekilde kamu düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, yasalara aykırı bir amaç için kullanamaz.</p><p>3.5. www.3mash.com internet sitesinde üyeler tarafından beyan edilen fikir ve düşünceler tamamen üyelerin kendi kişisel görüşleridir ve görüş sahibini bağlar.</p><p>3.6. 3 MASH, üye verilerinin yetkisiz kişilerce okunmasından ve üye yazılım ve verilerine gelebilecek zararlardan dolayı sorumlu olmayacaktır.</p><p>3.7. Üye, diğer internet kullanıcılarının yazılımlarına ve verilerine izinsiz olarak ulaşmamayı veya bunları kullanmamayı kabul etmiştir.</p><p>3.8. İşbu üyelik sözleşmesi içerisinde sayılan maddelerden bir ya da birkaçını ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen sorumludur.</p><p>3.9. 3 MASH'in her zaman tek taraflı olarak gerektiğinde üyenin üyeliğini silme, müşteriye ait dosya, belge ve bilgileri silme hakkı vardır.</p><p>3.10. www.3mash.com internet sitesi yazılım ve tasarımı 3 MASH mülkiyetinde olup, ilgili haklar kanunlarca korunmaktadır.</p><p>3.11. 3 MASH tarafından siteye erişim ve kullanım bilgileri iyileştirme, geliştirme ve yasal mevzuat kapsamında toplanabilir.</p><p>3.12. 3 MASH kullanıcılarına daha iyi hizmet sunmak, ürünlerini ve hizmetlerini iyileştirmek ve sitenin kullanımını kolaylaştırmak için üyelerin kişisel bilgilerini kullanabilir.</p><p>3.13. 3 MASH'e üye olan kişi, yürürlükte bulunan uygulamalar kapsamında ürün ve hizmet tanıtımları, kampanyalar ve müşteri memnuniyeti uygulamaları sunulmasına izin verdiğini beyan ve kabul eder. Üye, kişisel verileri ile ilgili detaylı bilgiye https://3mash.com/pages/gizlilik-politikasi-ve-kvkk adresinden ulaşabilir.</p><p>3.14. 3 MASH, üyenin kişisel bilgilerini yasal bir zorunluluk olarak istendiğinde veya haklarını ve mülkiyetini korumak için gerekli olduğuna iyi niyetle kanaat getirdiği hallerde açıklayabilir.</p><p>3.15. 3 MASH web sitesinin virüs ve benzeri amaçlı yazılımlardan arındırılmış olması için mevcut imkanlar dahilinde tedbir alınmıştır.</p><p>3.16. 3 MASH, sitenin içeriğini dilediği zaman değiştirme, kullanıcılara sağlanan hizmeti değiştirme ya da sona erdirme hakkını saklı tutar.</p><p>3.17. 3 MASH, üyelik sözleşmesinin koşullarını ön ihbara gerek kalmaksızın her zaman değiştirebilir, güncelleyebilir veya iptal edebilir.</p><p>3.18. Taraflar, 3 MASH'e ait tüm bilgisayar kayıtlarının tek ve gerçek münhasır delil olarak esas alınacağını kabul ve beyan eder.</p><p>3.19. 3 MASH, işbu üyelik sözleşmesi uyarınca üyelerine bilgilendirme e-postaları ve SMS’leri gönderme yetkisine sahiptir. Üye mail ve/veya SMS almaktan vazgeçmek istemesi durumunda info@3mash.com adresine elektronik posta göndererek iptal işlemini gerçekleştirebilecektir.</p>",
  terminationTitleText: 'Sözleşmenin Feshi',
  terminationHtml:
    '<p>İşbu sözleşme üyenin üyeliğini iptal etmesi veya 3 MASH tarafından üyeliğinin iptal edilmesine kadar yürürlükte kalacaktır. 3 MASH üyenin üyelik sözleşmesinin herhangi bir hükmünü ihlal etmesi durumunda üyenin üyeliğini iptal ederek sözleşmeyi tek taraflı olarak feshedebilecektir.</p>',
  disputeTitleText: 'İhtilaflerin Halli',
  disputeHtml: '<p>İşbu sözleşmeye ilişkin ihtilaflerde Antalya Mahkemeleri ve İcra Daireleri yetkilidir.</p>',
  enforcementTitleText: 'Yürürlük',
  enforcementHtml:
    '<p>Üyenin, üyelik kaydı yapması üyenin üyelik sözleşmesinde yer alan tüm maddeleri okuduğu ve üyelik sözleşmesinde yer alan maddeleri kabul ettiği anlamına gelir. İşbu Sözleşme üyenin üye olması anında akdedilmiş ve karşılıklı olarak yürürlülüğe girmiştir.</p>',
};

function html(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function membershipSection(title: string | undefined, titleFallback: string, body: string | undefined, bodyFallback: string) {
  return `<p><b>${escapeHtml(text(title, titleFallback))}</b></p>${html(body, bodyFallback)}`;
}

function membershipAgreementHtml(props: Props) {
  return [
    `<h2>${escapeHtml(text(props.agreementTitleText, membershipDefaults.agreementTitleText))}</h2>`,
    membershipSection(
      props.partiesTitleText,
      membershipDefaults.partiesTitleText,
      [html(props.partyCompanyHtml, membershipDefaults.partyCompanyHtml), html(props.partyMemberHtml, membershipDefaults.partyMemberHtml)].join(''),
      ''
    ),
    membershipSection(props.subjectTitleText, membershipDefaults.subjectTitleText, props.subjectHtml, membershipDefaults.subjectHtml),
    membershipSection(props.rightsTitleText, membershipDefaults.rightsTitleText, props.rightsHtml, membershipDefaults.rightsHtml),
    membershipSection(props.terminationTitleText, membershipDefaults.terminationTitleText, props.terminationHtml, membershipDefaults.terminationHtml),
    membershipSection(props.disputeTitleText, membershipDefaults.disputeTitleText, props.disputeHtml, membershipDefaults.disputeHtml),
    membershipSection(props.enforcementTitleText, membershipDefaults.enforcementTitleText, props.enforcementHtml, membershipDefaults.enforcementHtml),
  ].join('');
}

export function ThreeMashLegalPage(props: Props) {
  const key = pageKey(props.mode);
  const page = legalPages[key];
  const configuredContent =
    key === 'mesafeli'
      ? page.contentHtml
      : props.contentHtml?.trim() || (key === 'uyelik' ? membershipAgreementHtml(props) : page.contentHtml);
  const contentHtml = normalizeContentHtml(
    key,
    configuredContent
  );
  const showStandaloneTitle = !hasEmbeddedHeading(contentHtml);
  const isKvkk = key === 'kvkk';
  const style = {
    '--tmlp-bg': text(props.backgroundColor, '#ffffff'),
    '--tmlp-text': text(props.textColor, '#000000'),
    '--tmlp-muted': text(props.mutedTextColor, '#6d6d6d'),
    '--tmlp-max': String(numberValue(props.maxWidth, key === 'mesafeli' || isKvkk ? 1505 : 1120)) + 'px',
    '--tmlp-pt': String(numberValue(props.paddingTop, key === 'mesafeli' ? 0 : isKvkk ? 16 : 56)) + 'px',
    '--tmlp-pb': String(numberValue(props.paddingBottom, key === 'mesafeli' ? 0 : isKvkk ? 16 : 80)) + 'px',
  } as any;

  return (
    <section className={`three-mash-legal-page is-${key}`} style={style}>
      <article className="tmlp-shell">
        {showStandaloneTitle ? <h1>{translateText(titleText(key, props.titleText, page.title))}</h1> : null}
        <div className="tmlp-content" dangerouslySetInnerHTML={{ __html: translateText(contentHtml) }} />
      </article>
    </section>
  );
}

export default ThreeMashLegalPage;
