import { legalPages, type LegalPageKey } from '../ThreeMashPageData/sourceData';
import { translateText, tLocalized } from '../../utils/i18n';
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
  if (key === 'ticari') return tLocalized("TİCARİ ELEKTRONİK İLETİ ONAYI", "COMMERCIAL ELECTRONIC MESSAGE CONSENT");
  return text(value, fallback);
}

function hasEmbeddedHeading(contentHtml: string) {
  return /<h[1-6][\s>]/i.test(contentHtml.slice(0, 900));
}

const membershipDefaults = {
  agreementTitleText: tLocalized("ÜYELİK SÖZLEŞMESİ", "MEMBERSHIP AGREEMENT"),
  partiesTitleText: tLocalized('Taraflar', 'Parties'),
  partyCompanyHtml:
    tLocalized("<p>a)3mash.com internet sitesinin faaliyetlerini yürüten Kızıltoprak Mah. 919 Sok. No: 19A Muratpaşa, Antalya adresinde mukim 3 MASH TEKNOLOJİ A.Ş. (Bundan böyle “3 MASH” olarak anılacaktır).</p>", "<p>a) 3 MASH TEKNOLOJİ A.Ş. (hereinafter referred to as \"3 MASH\"), which operates the website 3mash.com, resident at Kızıltoprak Mah. 919 Sok. No: 19A Muratpaşa, Antalya.</p>"),
  partyMemberHtml: tLocalized("<p>b)3mash.com internet sitesine üye olan internet kullanıcısı (\"Üye\")</p>", "<p>b) The internet user who is a member of the 3mash.com website (\"Member\")</p>"),
  subjectTitleText: tLocalized("Sözleşmenin Konusu", "Subject of the Agreement"),
  subjectHtml:
    tLocalized("<p>İşbu Sözleşme’nin konusu 3 MASH'in sahip olduğu internet sitesi www.3mash.com ‘den üyenin faydalanma şartlarının belirlenmesidir.</p>", "<p>The subject of this Agreement is to determine the terms under which the member may benefit from 3 MASH's website, www.3mash.com.</p>"),
  rightsTitleText: tLocalized("Tarafların Hak ve Yükümlülükleri", "Rights and Obligations of the Parties"),
  rightsHtml:
    tLocalized(
      "<p>3.1. Üye, www.3mash.com internet sitesine üye olurken verdiği kişisel ve diğer sair bilgilerin kanunlar önünde doğru olduğunu, 3 MASH'in bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları aynen ve derhal tazmin edeceğini beyan ve taahhüt eder.</p><p>3.2. Üye, 3 MASH tarafından kendisine verilmiş olan şifreyi başka kişi ya da kuruluşlara veremez, üyenin söz konusu şifreyi kullanma hakkı bizzat kendisine aittir.</p><p>3.3. Üye www.3mash.com internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve taahhüt eder.</p><p>3.4. Üye, www.3mash.com internet sitesini hiçbir şekilde kamu düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, yasalara aykırı bir amaç için kullanamaz.</p><p>3.5. www.3mash.com internet sitesinde üyeler tarafından beyan edilen fikir ve düşünceler tamamen üyelerin kendi kişisel görüşleridir ve görüş sahibini bağlar.</p><p>3.6. 3 MASH, üye verilerinin yetkisiz kişilerce okunmasından ve üye yazılım ve verilerine gelebilecek zararlardan dolayı sorumlu olmayacaktır.</p><p>3.7. Üye, diğer internet kullanıcılarının yazılımlarına ve verilerine izinsiz olarak ulaşmamayı veya bunları kullanmamayı kabul etmiştir.</p><p>3.8. İşbu üyelik sözleşmesi içerisinde sayılan maddelerden bir ya da birkaçını ihlal eden üye işbu ihlal nedeniyle cezai ve hukuki olarak şahsen sorumludur.</p><p>3.9. 3 MASH'in her zaman tek taraflı olarak gerektiğinde üyenin üyeliğini silme, müşteriye ait dosya, belge ve bilgileri silme hakkı vardır.</p><p>3.10. www.3mash.com internet sitesi yazılım ve tasarımı 3 MASH mülkiyetinde olup, ilgili haklar kanunlarca korunmaktadır.</p><p>3.11. 3 MASH tarafından siteye erişim ve kullanım bilgileri iyileştirme, geliştirme ve yasal mevzuat kapsamında toplanabilir.</p><p>3.12. 3 MASH kullanıcılarına daha iyi hizmet sunmak, ürünlerini ve hizmetlerini iyileştirmek ve sitenin kullanımını kolaylaştırmak için üyelerin kişisel bilgilerini kullanabilir.</p><p>3.13. 3 MASH'e üye olan kişi, yürürlükte bulunan uygulamalar kapsamında ürün ve hizmet tanıtımları, kampanyalar ve müşteri memnuniyeti uygulamaları sunulmasına izin verdiğini beyan ve kabul eder. Üye, kişisel verileri ile ilgili detaylı bilgiye https://3mash.com/pages/gizlilik-politikasi-ve-kvkk adresinden ulaşabilir.</p><p>3.14. 3 MASH, üyenin kişisel bilgilerini yasal bir zorunluluk olarak istendiğinde veya haklarını ve mülkiyetini korumak için gerekli olduğuna iyi niyetle kanaat getirdiği hallerde açıklayabilir.</p><p>3.15. 3 MASH web sitesinin virüs ve benzeri amaçlı yazılımlardan arındırılmış olması için mevcut imkanlar dahilinde tedbir alınmıştır.</p><p>3.16. 3 MASH, sitenin içeriğini dilediği zaman değiştirme, kullanıcılara sağlanan hizmeti değiştirme ya da sona erdirme hakkını saklı tutar.</p><p>3.17. 3 MASH, üyelik sözleşmesinin koşullarını ön ihbara gerek kalmaksızın her zaman değiştirebilir, güncelleyebilir veya iptal edebilir.</p><p>3.18. Taraflar, 3 MASH'e ait tüm bilgisayar kayıtlarının tek ve gerçek münhasır delil olarak esas alınacağını kabul ve beyan eder.</p><p>3.19. 3 MASH, işbu üyelik sözleşmesi uyarınca üyelerine bilgilendirme e-postaları ve SMS’leri gönderme yetkisine sahiptir. Üye mail ve/veya SMS almaktan vazgeçmek istemesi durumunda info@3mash.com adresine elektronik posta göndererek iptal işlemini gerçekleştirebilecektir.</p>",
      "<p>3.1. The Member declares and undertakes that the personal and other information provided when registering on www.3mash.com is accurate under the law and undertakes to compensate all damages that 3 MASH may incur due to the inaccuracy of this information.</p><p>3.2. The Member cannot give the password provided by 3 MASH to other individuals or organizations; the right to use the password belongs solely to the Member. Therefore, 3 MASH reserves the right to claim compensation for any damages and other claims that may be asserted by third parties or competent authorities due to unauthorized use of the password.</p><p>3.3. The Member agrees to comply with the legal regulations while using www.3mash.com and not to violate them. Otherwise, all legal and criminal liabilities arising from such violations will be solely binding on the Member.</p><p>3.4. The Member cannot use www.3mash.com in a manner that disrupts public order, is contrary to general morality, is disturbing and harassing to others, for an illegal purpose, or in violation of the intellectual and copyright rights of others. In addition, the Member cannot engage in activities that prevent or complicate others' use of services (spam, virus, trojan horse, etc.).</p><p>3.5. The ideas and thoughts expressed, written, and used by members on www.3mash.com are solely the personal opinions of the members and bind the owner of the opinion. These opinions and thoughts have no connection or association with 3 MASH. 3 MASH has no responsibility for any damages that may occur to third parties due to the ideas and opinions declared by the member and for any damages that the member may incur due to the ideas and opinions declared by third parties.</p><p>3.6. 3 MASH is not responsible for the unauthorized reading of member data and any damages to member software and data. The Member agrees not to claim compensation from 3 MASH for any damages that may arise from the use of www.3mash.com.</p><p>3.7. The Member agrees not to access unauthorized software and data of other internet users or use them without permission. Otherwise, all legal and criminal responsibilities arising from this will be entirely the responsibility of the Member.</p><p>3.8. The Member who violates one or more of the articles mentioned in this membership agreement is personally responsible for the violation, and 3 MASH will be exempt from the legal and criminal consequences of these violations. In addition, in the event of the matter being brought to the legal field due to this violation, 3 MASH reserves the right to claim compensation from the member for non-compliance with the membership agreement.</p><p>3.9. 3 MASH has the right to unilaterally delete the membership of the member, delete files, documents, and information belonging to the customer when necessary. The member accepts this disposition in advance. In this case, 3 MASH has no responsibility.</p><p>3.10. The software and design of the www.3mash.com website are owned by 3 MASH, and their copyright and/or other intellectual property rights are protected by relevant laws. They cannot be used, acquired, or modified by the member without permission. Other companies and products mentioned on this website are trademarks of their respective owners and are also protected under intellectual property rights.</p><p>3.11. For the improvement and development of the www.3mash.com website by 3 MASH, or within the framework of legal regulations, certain information such as the name of the Internet service provider used to access the site, the Internet Protocol (IP) address, the date and time of access, the pages accessed during the visit, and the Internet address of the website that directly connects to the site may be collected.</p><p>3.12. To provide better service to its users, improve its products and services, and facilitate the use of the site, 3 MASH may use the personal information of users for studies related to their special preferences and interests. 3 MASH reserves the right to keep records of the actions performed by the member on www.3mash.com.</p><p>3.13. The person who becomes a member of 3 MASH declares and accepts that he/she allows all companies affiliated with 3 MASH under the current and/or future applications to present product and service promotions, advertisements, campaigns, advantages, surveys, and other customer satisfaction practices. The member declares and accepts that he/she allows the collection, sharing, use, and archiving of personal and shopping information given when becoming a member, and given or will be given in the future, for the above-mentioned purposes, by all companies affiliated with 3 MASH. The member declares and accepts that, unless otherwise stated, he/she allows 3 MASH and all companies affiliated with 3 MASH to contact him/her through internet, telephone, SMS, etc. communication channels. The member can access detailed information about personal data at https://3mash.com/pages/gizlilik-politikasi-ve-kvkk.</p><p>3.14. When requested as a legal obligation or in cases where 3 MASH deems it necessary in good faith to (a) comply with legal requirements and comply with legal proceedings notified to 3 MASH; (b) protect and defend the rights and property of 3 MASH and the 3 MASH website family, 3 MASH may disclose the member's personal information.</p><p>3.15. 3 MASH has taken precautions within the possibilities to ensure that the content of the site is free from viruses and similar software. In addition, for the ultimate security, the user is responsible for providing his/her own virus protection system and ensuring the necessary protection. In this context, the member is deemed to have accepted that he/she is directly responsible for any errors in his/her software and operating systems that may occur as a result of entering the 3 MASH website.</p><p>3.16. 3 MASH reserves the right to change the content of the site, modify or terminate any service provided to users, or delete user information and data registered on the 3 MASH website at any time.</p><p>3.17. 3 MASH can change, update, or cancel the terms of the membership agreement at any time without the need for prior notice or warning. The changed, updated, or repealed provision will be effective for all members as of the publication date.</p><p>3.18. The parties accept and declare that all computer records belonging to 3 MASH will be taken as the sole and real evidence in accordance with Article 287 of the HUMK, and these records constitute an evidence agreement.</p><p>3.19. 3 MASH is authorized to send information emails and SMS messages to its members in accordance with this membership agreement. If the member wishes to opt out of receiving emails and/or SMS, they may cancel this by sending an email to info@3mash.com.</p>"
    ),
  terminationTitleText: tLocalized("Sözleşmenin Feshi", "Termination of the Agreement"),
  terminationHtml:
    tLocalized("<p>İşbu sözleşme üyenin üyeliğini iptal etmesi veya 3 MASH tarafından üyeliğinin iptal edilmesine kadar yürürlükte kalacaktır. 3 MASH üyenin üyelik sözleşmesinin herhangi bir hükmünü ihlal etmesi durumunda üyenin üyeliğini iptal ederek sözleşmeyi tek taraflı olarak feshedebilecektir.</p>", "<p>This agreement will remain in effect until the member cancels their membership or their membership is cancelled by 3 MASH. Should the member violate any provision of the membership agreement, 3 MASH may cancel the member's membership and unilaterally terminate the agreement.</p>"),
  disputeTitleText: tLocalized("İhtilaflerin Halli", "Dispute Resolution"),
  disputeHtml: tLocalized("<p>İşbu sözleşmeye ilişkin ihtilaflerde Antalya Mahkemeleri ve İcra Daireleri yetkilidir.</p>", "<p>The Courts and Enforcement Offices of Antalya have jurisdiction over disputes related to this agreement.</p>"),
  enforcementTitleText: tLocalized("Yürürlük", "Effective date"),
  enforcementHtml:
    tLocalized("<p>Üyenin, üyelik kaydı yapması üyenin üyelik sözleşmesinde yer alan tüm maddeleri okuduğu ve üyelik sözleşmesinde yer alan maddeleri kabul ettiği anlamına gelir. İşbu Sözleşme üyenin üye olması anında akdedilmiş ve karşılıklı olarak yürürlülüğe girmiştir.</p>", "<p>A member completing their membership registration means that the member has read all the clauses in the membership agreement and has accepted the clauses contained in the membership agreement. This Agreement was executed and came into mutual effect the moment the member became a member.</p>"),
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
