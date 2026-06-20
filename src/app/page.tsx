"use client";

import { useEffect, useState, useRef } from "react";

// ─── Language ─────────────────────────────────────────────────────────────────
type Lang = "ru" | "en";

const t = {
  ru: {
    nav: ["Главная", "О нас", "Гестхаус", "Туры", "Цены", "Галерея", "Отзывы", "FAQ", "Контакты"],
    hero_title: "Живи ближе.\nЧувствуй глубже.",
    hero_sub: "Ваш дом в Кыргызстане",
    hero_cta: "Смотреть туры",
    hero_wa: "Написать в WhatsApp",
    feat1: "Уютные номера",
    feat2: "Природа",
    feat3: "Гостеприимство",
    feat4: "Конные туры",
    about_title: "О нас",
    about_p1: "Nomad Place — это не просто гестхаус. Это место, где горы встречаются с гостеприимством, а каждый гость становится частью нашей истории.",
    about_p2: "Мы живём в деревне Кызарт, у подножия Тянь-Шаня, и каждый день просыпаемся с видом на бесконечные пастбища. Наша семья принимает путешественников уже много лет, делясь настоящей кыргызской культурой, традиционной кухней и любовью к природе.",
    about_p3: "Мы верим, что лучший способ познать Кыргызстан — это седло лошади, запах горного воздуха и чашка кумыса у юрты.",
    gh_title: "Гестхаус",
    gh_sub: "Комфорт в объятиях природы",
    gh_room1: "Стандартный номер",
    gh_room1_d: "Уютная комната с традиционными элементами кыргызского декора, свежим постельным бельём и видом на горы.",
    gh_room2: "Семейный номер",
    gh_room2_d: "Просторная комната для семей и пар. Отдельные кровати, дополнительное место для хранения вещей.",
    gh_room3: "Юрта",
    gh_room3_d: "Настоящая кыргызская юрта во дворе. Незабываемый опыт ночёвки под звёздным небом.",
    gh_amenities: ["Домашняя кыргызская кухня", "Горячий душ", "Wi-Fi", "Парковка", "Трансфер", "Стирка"],
    tours_title: "Конные туры",
    tours_sub: "Откройте Сон-Куль на коне",
    tour2_title: "2-дневный тур",
    tour2_sub: "Конный тур к озеру Сон-Куль",
    tour3_title: "3-дневный тур",
    tour3_sub: "Конный тур к озеру Сон-Куль",
    tour_ind_title: "Индивидуальный тур",
    tour_ind_sub: "Ваш маршрут, ваш темп",
    included: "Включено:",
    t2_inc: ["Конь и снаряжение", "Местный гид", "Ночёвка в юрте", "3-разовое питание", "Кыргызская кухня", "Горы и озеро"],
    t3_inc: ["Конь и снаряжение", "Местный гид", "Приватная юрта для каждой группы / пары", "3-разовое питание", "Кыргызская кухня", "Горы и озеро", "Туалет и горячий душ в лагере"],
    t_ind_inc: ["Индивидуальные маршруты", "Гибкая продолжительность", "Для опытных и начинающих", "Полная приватность", "Особые пожелания учитываются"],
    price_discuss: "Цена обсуждается индивидуально",
    contact_us: "Связаться с нами",
    eng_guide: "Англоязычный гид:",
    per_day: "в день",
    per_person: "с человека",
    prices_title: "Цены",
    prices_sub: "Прозрачные цены без скрытых доплат",
    gallery_title: "Галерея",
    gallery_sub: "Живые фотографии из наших туров",
    reviews_title: "Отзывы",
    reviews_sub: "Что говорят наши гости",
    faq_title: "Частые вопросы",
    faq_sub: "Ответы на всё, что вас интересует",
    contacts_title: "Контакты",
    contacts_sub: "Мы всегда рады помочь",
    wa_btn: "Написать в WhatsApp",
    location: "Деревня Кызарт, Нарынская область, Кыргызстан",
    footer: "© 2024 Nomad Place Guest House. Все права защищены.",
    faq_items: [
      { q: "Нужна ли физическая подготовка для конного тура?", a: "Нет! Наши туры подходят как для начинающих, так и для опытных всадников. Мы подберём лошадь под ваш уровень и расскажем всё необходимое перед отправлением." },
      { q: "Как добраться до вас из Бишкека?", a: "Из Бишкека до Нарына около 6 часов на машине. Мы можем организовать трансфер — напишите нам в WhatsApp. Также можно доехать на маршрутке до Нарына, а затем взять такси до Кызарта." },
      { q: "Что взять с собой в тур?", a: "Тёплую одежду (в горах холодно даже летом), непромокаемую куртку, удобную обувь для верховой езды, солнцезащитный крем, личную аптечку. Остальное предоставляем мы." },
      { q: "Можно ли забронировать тур для детей?", a: "Да, дети с 8 лет могут участвовать в турах под присмотром взрослых. Для детей есть более спокойные лошади." },
      { q: "Принимаете ли вы оплату картой?", a: "В основном работаем наличными (сомы или доллары США). Небольшой депозит можно перевести через WhatsApp для подтверждения бронирования." },
      { q: "Что входит в стоимость проживания в гестхаусе?", a: "Проживание включает завтрак, Wi-Fi, парковку. Ужин и обед заказываются дополнительно — готовим традиционные кыргызские блюда." },
    ],
    review_items: [
      { name: "Анна М.", country: "Россия", text: "Невероятный опыт! Лошади добрые, гид профессиональный, еда вкусная. Сон-Куль — это что-то нереальное. Обязательно вернусь!", stars: 5 },
      { name: "Thomas B.", country: "Germany", text: "Best experience in Kyrgyzstan! The family is so welcoming and warm. The 3-day horse tour to Son-Kul was life-changing. Highly recommend!", stars: 5 },
      { name: "Юлия К.", country: "Казахстан", text: "Прекрасное место. Уютный гестхаус, вкусная домашняя еда, потрясающие виды. Спасибо семье за такое тёплое гостеприимство!", stars: 5 },
      { name: "Maria S.", country: "Spain", text: "Absolutely magical. Woke up in a yurt with mountains all around. The horses were gentle and the guide very knowledgeable. 10/10!", stars: 5 },
      { name: "Алексей Р.", country: "Украина", text: "Ехали 3 дня на конях к Сон-Кулю. Это незабываемо. Природа, юрты, звёздное небо — всё как в сказке. Отличный сервис!", stars: 5 },
      { name: "Lucas F.", country: "France", text: "Nomad Place is a hidden gem. Simple, authentic, beautiful. The horseback ride to Son-Kul is worth every dollar.", stars: 5 },
    ],
  },
  en: {
    nav: ["Home", "About", "Guest House", "Tours", "Prices", "Gallery", "Reviews", "FAQ", "Contacts"],
    hero_title: "Stay Close.\nLive Deeper.",
    hero_sub: "Your Home in Kyrgyzstan",
    hero_cta: "Discover Tours",
    hero_wa: "Message on WhatsApp",
    feat1: "Comfortable Rooms",
    feat2: "Stunning Nature",
    feat3: "Warm Hospitality",
    feat4: "Horse Treks & Tours",
    about_title: "About Us",
    about_p1: "Nomad Place is more than a guesthouse. It's a place where mountains meet hospitality and every guest becomes part of our story.",
    about_p2: "We live in Kyzart village, at the foothills of the Tian Shan mountains, waking up every day to endless alpine pastures. Our family has been welcoming travellers for many years, sharing authentic Kyrgyz culture, traditional cuisine and a deep love of nature.",
    about_p3: "We believe the best way to experience Kyrgyzstan is from a horse's saddle, breathing mountain air with a cup of kumiss beside a yurt.",
    gh_title: "Guest House",
    gh_sub: "Comfort in the embrace of nature",
    gh_room1: "Standard Room",
    gh_room1_d: "A cosy room with traditional Kyrgyz décor, fresh linen and mountain views.",
    gh_room2: "Family Room",
    gh_room2_d: "A spacious room for families and couples. Separate beds and extra storage.",
    gh_room3: "Yurt",
    gh_room3_d: "An authentic Kyrgyz yurt in our courtyard. An unforgettable night under the stars.",
    gh_amenities: ["Home Kyrgyz Cuisine", "Hot Shower", "Wi-Fi", "Parking", "Transfer", "Laundry"],
    tours_title: "Horse Tours",
    tours_sub: "Discover Son-Kul on Horseback",
    tour2_title: "2-Day Tour",
    tour2_sub: "Horse tour to Son-Kul lake",
    tour3_title: "3-Day Tour",
    tour3_sub: "Horse tour to Son-Kul lake",
    tour_ind_title: "Individual Tour",
    tour_ind_sub: "Your route, your pace",
    included: "Included:",
    t2_inc: ["Horse & equipment", "Local guide", "Yurt accommodation", "3 meals per day", "Traditional Kyrgyz cuisine", "Mountains & lake"],
    t3_inc: ["Horse & equipment", "Local guide", "Private yurt per group/couple", "3 meals (breakfast, lunch, dinner)", "Traditional Kyrgyz cuisine", "Mountains & lake", "Toilet & hot shower at camp"],
    t_ind_inc: ["Individual routes", "Flexible duration", "Beginners & experienced", "Full privacy", "Special wishes considered"],
    price_discuss: "Price on request",
    contact_us: "Contact Us",
    eng_guide: "English-speaking guide:",
    per_day: "per day",
    per_person: "per person",
    prices_title: "Prices",
    prices_sub: "Transparent pricing, no hidden fees",
    gallery_title: "Gallery",
    gallery_sub: "Real photos from our tours",
    reviews_title: "Reviews",
    reviews_sub: "What our guests say",
    faq_title: "FAQ",
    faq_sub: "Answers to your questions",
    contacts_title: "Contacts",
    contacts_sub: "We're always happy to help",
    wa_btn: "Message on WhatsApp",
    location: "Kyzart Village, Naryn Region, Kyrgyzstan",
    footer: "© 2024 Nomad Place Guest House. All rights reserved.",
    faq_items: [
      { q: "Do I need riding experience for a horse tour?", a: "Not at all! Our tours are suitable for beginners and experienced riders alike. We'll match you with the right horse and give you a full briefing before departure." },
      { q: "How do I get to you from Bishkek?", a: "It's about 6 hours by car from Bishkek. We can arrange a transfer — just message us on WhatsApp. You can also take a shared taxi to Naryn and then a local taxi to Kyzart." },
      { q: "What should I pack for a tour?", a: "Warm layers (mountains are cold even in summer), a waterproof jacket, comfortable boots, sunscreen, and a personal first-aid kit. We provide everything else." },
      { q: "Can children join the tours?", a: "Yes, children aged 8+ can participate under adult supervision. We have calm and gentle horses suitable for younger riders." },
      { q: "Do you accept card payments?", a: "We mainly work with cash (som or USD). A small deposit can be transferred via WhatsApp to confirm your booking." },
      { q: "What's included in guesthouse accommodation?", a: "Accommodation includes breakfast, Wi-Fi and parking. Lunch and dinner can be ordered separately — we cook fresh traditional Kyrgyz food." },
    ],
    review_items: [
      { name: "Анна М.", country: "Russia", text: "Невероятный опыт! Лошади добрые, гид профессиональный, еда вкусная. Сон-Куль — это что-то нереальное. Обязательно вернусь!", stars: 5 },
      { name: "Thomas B.", country: "Germany", text: "Best experience in Kyrgyzstan! The family is so welcoming and warm. The 3-day horse tour to Son-Kul was life-changing. Highly recommend!", stars: 5 },
      { name: "Юлия К.", country: "Kazakhstan", text: "Прекрасное место. Уютный гестхаус, вкусная домашняя еда, потрясающие виды. Спасибо семье за такое тёплое гостеприимство!", stars: 5 },
      { name: "Maria S.", country: "Spain", text: "Absolutely magical. Woke up in a yurt with mountains all around. The horses were gentle and the guide very knowledgeable. 10/10!", stars: 5 },
      { name: "Алексей Р.", country: "Ukraine", text: "Ехали 3 дня на конях к Сон-Кулю. Это незабываемо. Природа, юрты, звёздное небо — всё как в сказке. Отличный сервис!", stars: 5 },
      { name: "Lucas F.", country: "France", text: "Nomad Place is a hidden gem. Simple, authentic, beautiful. The horseback ride to Son-Kul is worth every dollar.", stars: 5 },
    ],
  },
};

// ─── Unsplash images ──────────────────────────────────────────────────────────
const IMGS = {
  hero: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=1600&q=80",
  about: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=900&q=80",
  room1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  room2: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  yurt: "https://images.unsplash.com/photo-1535530706009-72dca7ab6c18?w=600&q=80",
  tour1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  tour2: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  tour3: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80",
    "https://images.unsplash.com/photo-1535530706009-72dca7ab6c18?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=600&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  ],
  cta_bg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80",
};

const WA_LINK = "https://wa.me/996704100104";
const SECTIONS = ["home", "about", "guesthouse", "tours", "prices", "gallery", "reviews", "faq", "contacts"];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 20V12a2 2 0 012-2h16a2 2 0 012 2v8M2 16h20M7 12V9a5 5 0 0110 0v3" />
  </svg>
);
const IconMountain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l5-8 4 5 3-4 6 7H3z" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const IconHorse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c1.5 0 3 .5 4 1.5L18 6l2 1-1 3-2-1-1 2v3l-1 1H9l-1-1V11L7 9 5 10 4 7l2-1 2-1.5C9.5 3.5 10.5 3 12 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15v3l-1 3h2l1-2 1 2h2l-1-3v-3" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconWA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const IconInsta = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const IconStar = ({ filled = true }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NomadPlace() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const text = t[lang];
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 100) setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const brown = "#5C3D1E";
  const gold = "#C9A84C";
  const green = "#2D5016";
  const beige = "#F5EED7";
  const cream = "#FDFAF2";
  const textDark = "#2C1810";
  const textMuted = "#6B4C35";

  return (
    <div style={{ background: cream, color: textDark }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(253,250,242,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${beige}` : "none",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(92,61,30,0.08)" : "none",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <button onClick={() => scrollTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="white" width={20} height={20}>
                <path d="M3 20l5-8 4 5 3-4 6 7H3z" />
              </svg>
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: 15, fontWeight: 700, color: brown }}>NOMAD PLACE</div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: textMuted, textTransform: "uppercase" }}>GUEST HOUSE</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden lg:flex">
            {text.nav.map((label, i) => (
              <button key={i} onClick={() => scrollTo(SECTIONS[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 12px", borderRadius: 6, fontSize: 13,
                color: activeSection === SECTIONS[i] ? gold : textMuted,
                fontWeight: activeSection === SECTIONS[i] ? 600 : 400,
                transition: "all 0.2s",
              }}>{label}</button>
            ))}
            <button onClick={() => setLang(lang === "ru" ? "en" : "ru")} style={{
              marginLeft: 8, background: gold, color: "white", border: "none",
              borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1,
            }}>{lang === "ru" ? "EN" : "RU"}</button>
          </div>

          {/* Mobile controls */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="flex lg:hidden">
            <button onClick={() => setLang(lang === "ru" ? "en" : "ru")} style={{
              background: gold, color: "white", border: "none",
              borderRadius: 6, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>{lang === "ru" ? "EN" : "RU"}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={brown} strokeWidth={2} width={24} height={24}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: cream, borderTop: `1px solid ${beige}`, padding: "12px 0" }}>
            {text.nav.map((label, i) => (
              <button key={i} onClick={() => scrollTo(SECTIONS[i])} style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                padding: "12px 24px", fontSize: 15,
                color: activeSection === SECTIONS[i] ? gold : textDark,
                fontWeight: activeSection === SECTIONS[i] ? 600 : 400,
              }}>{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMGS.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(44,24,16,0.55) 0%, rgba(44,24,16,0.7) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-block", background: "rgba(201,168,76,0.25)", border: `1px solid ${gold}`, borderRadius: 100, padding: "6px 18px", marginBottom: 24, fontSize: 12, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 600 }}>
              Kyrgyzstan · Kyzart Village
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(42px,7vw,80px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 20, whiteSpace: "pre-line" }}>
              {text.hero_title}
            </h1>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,0.85)", marginBottom: 40, fontStyle: "italic", letterSpacing: 1 }}>
              {text.hero_sub}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("tours")} style={{
                background: gold, color: "white", border: "none", borderRadius: 8,
                padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer",
                transition: "all 0.25s", letterSpacing: 0.5,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b8932d")}
                onMouseLeave={e => (e.currentTarget.style.background = gold)}
              >{text.hero_cta}</button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#25D366", color: "white", borderRadius: 8,
                padding: "14px 32px", fontSize: 16, fontWeight: 600, textDecoration: "none",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1ea855")}
                onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
              >
                <IconWA />{text.hero_wa}
              </a>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(44,24,16,0.85)", backdropFilter: "blur(10px)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}
            className="grid-cols-2 sm:grid-cols-4">
            {[
              { icon: <IconBed />, label: text.feat1 },
              { icon: <IconMountain />, label: text.feat2 },
              { icon: <IconHeart />, label: text.feat3 },
              { icon: <IconHorse />, label: text.feat4 },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "white", textAlign: "center", padding: "8px 4px" }}>
                <div style={{ color: gold }}>{f.icon}</div>
                <span style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, opacity: 0.9 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 24px", background: cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div className="reveal">
            <div style={{ display: "inline-block", background: beige, borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>
              {text.about_title}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, lineHeight: 1.2, marginBottom: 28 }}>
              {lang === "ru" ? "История нашей семьи" : "Our Family Story"}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: textMuted, marginBottom: 20 }}>{text.about_p1}</p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: textMuted, marginBottom: 20 }}>{text.about_p2}</p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: textMuted, fontStyle: "italic" }}>{text.about_p3}</p>
            <div style={{ marginTop: 36, display: "flex", gap: 40 }}>
              {[["10+", lang === "ru" ? "лет опыта" : "years exp."], ["500+", lang === "ru" ? "довольных гостей" : "happy guests"], ["3", lang === "ru" ? "вида туров" : "tour types"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-playfair)", fontSize: 36, fontWeight: 700, color: gold }}>{n}</div>
                  <div style={{ fontSize: 12, color: textMuted, letterSpacing: 0.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
              <img src={IMGS.about} alt="Nomad Place family and yurt" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              background: gold, borderRadius: 16, padding: "20px 24px",
              boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
            }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700, color: "white" }}>★ 5.0</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: 1 }}>{lang === "ru" ? "Средняя оценка" : "Average rating"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUEST HOUSE ───────────────────────────────────────────────── */}
      <section id="guesthouse" style={{ padding: "100px 24px", background: beige }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "white", borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.gh_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.gh_sub}</h2>
          </div>

          {/* Rooms */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, marginBottom: 60 }} className="grid-cols-1 md:grid-cols-3">
            {[
              { img: IMGS.room1, title: text.gh_room1, desc: text.gh_room1_d, alt: "Standard room at Nomad Place" },
              { img: IMGS.room2, title: text.gh_room2, desc: text.gh_room2_d, alt: "Family room at Nomad Place" },
              { img: IMGS.yurt, title: text.gh_room3, desc: text.gh_room3_d, alt: "Traditional Kyrgyz yurt at Nomad Place" },
            ].map((room, i) => (
              <div key={i} className="reveal" style={{
                background: "white", borderRadius: 16, overflow: "hidden",
                boxShadow: "0 4px 24px rgba(92,61,30,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(92,61,30,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(92,61,30,0.08)"; }}
              >
                <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
                  <img src={room.img} alt={room.alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "")} loading="lazy" />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 700, color: brown, marginBottom: 8 }}>{room.title}</h3>
                  <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.7 }}>{room.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="reveal" style={{ background: "white", borderRadius: 20, padding: "36px 40px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 22, color: brown, marginBottom: 28, fontWeight: 700 }}>
              {lang === "ru" ? "Удобства" : "Amenities"}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {text.gh_amenities.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: beige, borderRadius: 100, padding: "10px 20px", fontSize: 14, fontWeight: 500, color: textMuted }}>
                  <div style={{ color: green }}><IconCheck /></div>{a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOURS ─────────────────────────────────────────────────────── */}
      <section id="tours" style={{ padding: "100px 24px", background: cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: beige, borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.tours_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.tours_sub}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 28 }} className="grid-cols-1 md:grid-cols-2">
            {/* 2-day */}
            <div className="reveal" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(92,61,30,0.1)", background: "white" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <img src={IMGS.tour1} alt="2-day horse tour to Son-Kul" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,24,16,0.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24, color: "white" }}>
                  <div style={{ fontFamily: "var(--font-playfair)", fontSize: 26, fontWeight: 700 }}>{text.tour2_title}</div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>{text.tour2_sub}</div>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: gold, color: "white", borderRadius: 100, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>
                  {lang === "ru" ? "от 150 USD" : "from $150"}
                </div>
              </div>
              <div style={{ padding: "28px" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>{text.included}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {text.t2_inc.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: textMuted }}>
                      <span style={{ color: green }}><IconCheck /></span>{item}
                    </li>
                  ))}
                </ul>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, background: "#25D366", color: "white", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1ea855")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
                >
                  <IconWA />{text.hero_wa}
                </a>
              </div>
            </div>

            {/* 3-day */}
            <div className="reveal" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(92,61,30,0.1)", background: "white" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <img src={IMGS.tour2} alt="3-day horse tour to Son-Kul" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,24,16,0.8) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24, color: "white" }}>
                  <div style={{ fontFamily: "var(--font-playfair)", fontSize: 26, fontWeight: 700 }}>{text.tour3_title}</div>
                  <div style={{ fontSize: 13, opacity: 0.85 }}>{text.tour3_sub}</div>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: brown, color: "white", borderRadius: 100, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>
                  {lang === "ru" ? "от 180 USD" : "from $180"}
                </div>
              </div>
              <div style={{ padding: "28px" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>{text.included}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {text.t3_inc.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: textMuted }}>
                      <span style={{ color: green }}><IconCheck /></span>{item}
                    </li>
                  ))}
                </ul>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, background: "#25D366", color: "white", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1ea855")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
                >
                  <IconWA />{text.hero_wa}
                </a>
              </div>
            </div>
          </div>

          {/* Individual */}
          <div className="reveal" style={{
            borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr",
            boxShadow: "0 4px 24px rgba(92,61,30,0.1)", background: "white",
          }}>
            <div style={{ position: "relative", minHeight: 240, overflow: "hidden" }} className="md:col-span-1">
              <img src={IMGS.tour3} alt="Individual horse tour Kyrgyzstan" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} loading="lazy" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(44,24,16,0.5)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center", padding: 24 }}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: 30, fontWeight: 700 }}>{text.tour_ind_title}</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>{text.tour_ind_sub}</div>
              </div>
            </div>
            <div style={{ padding: "36px 40px", display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }} className="md:col-span-2">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 200 }}>
                {text.t_ind_inc.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: textMuted }}>
                    <span style={{ color: green }}><IconCheck /></span>{item}
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: "center", minWidth: 180 }}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700, color: brown, marginBottom: 6 }}>{text.price_discuss}</div>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 12, background: "#25D366", color: "white", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  <IconWA />{text.contact_us}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICES ────────────────────────────────────────────────────── */}
      <section id="prices" style={{ padding: "100px 24px", background: beige }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "white", borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.prices_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.prices_sub}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-cols-1 md:grid-cols-2">
            {/* 2-day prices */}
            <div className="reveal" style={{ background: "white", borderRadius: 20, padding: "36px", boxShadow: "0 4px 24px rgba(92,61,30,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, color: brown, fontWeight: 700, marginBottom: 6 }}>{text.tour2_title}</h3>
              <p style={{ fontSize: 13, color: textMuted, marginBottom: 28 }}>{text.tour2_sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  [lang === "ru" ? "1 человек (приватный)" : "1 person (private)", "180 USD"],
                  [lang === "ru" ? "Группа 2–3 человека" : "Group 2–3 people", "160 USD"],
                  [lang === "ru" ? "Группа 4+ человек" : "Group 4+ people", "150 USD"],
                ].map(([label, price], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 2 ? `1px solid ${beige}` : "none" }}>
                    <span style={{ fontSize: 14, color: textMuted }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700, color: brown }}>{price}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: "12px 16px", background: beige, borderRadius: 10, fontSize: 13, color: textMuted }}>
                  <strong style={{ color: brown }}>{text.eng_guide}</strong> +25 USD {text.per_day}
                </div>
              </div>
            </div>

            {/* 3-day prices */}
            <div className="reveal" style={{ background: "white", borderRadius: 20, padding: "36px", boxShadow: "0 4px 24px rgba(92,61,30,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, color: brown, fontWeight: 700, marginBottom: 6 }}>{text.tour3_title}</h3>
              <p style={{ fontSize: 13, color: textMuted, marginBottom: 28 }}>{text.tour3_sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  [lang === "ru" ? "Группа 4+ человека" : "Group 4+ people", "180 USD"],
                  [lang === "ru" ? "Группа 3 человека" : "Group 3 people", "190 USD"],
                  [lang === "ru" ? "Группа 2 человека" : "Group 2 people", "200 USD"],
                  [lang === "ru" ? "1 человек (приватный)" : "1 person (private)", "250 USD"],
                ].map(([label, price], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${beige}` : "none" }}>
                    <span style={{ fontSize: 14, color: textMuted }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700, color: brown }}>{price}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: "12px 16px", background: beige, borderRadius: 10, fontSize: 13, color: textMuted }}>
                  <strong style={{ color: brown }}>{text.eng_guide}</strong> +20 USD {text.per_day}
                </div>
              </div>
            </div>
          </div>

          {/* Individual CTA */}
          <div className="reveal" style={{ marginTop: 32, background: brown, borderRadius: 20, padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, color: "white", fontWeight: 700, marginBottom: 6 }}>{text.tour_ind_title}</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>{text.price_discuss}</p>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "#25D366", color: "white", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
              <IconWA />{text.contact_us}
            </a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section id="gallery" style={{ padding: "100px 24px", background: cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: beige, borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.gallery_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.gallery_sub}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="grid-cols-2 sm:grid-cols-4">
            {IMGS.gallery.map((src, i) => (
              <div key={i} className="reveal" style={{ borderRadius: 12, overflow: "hidden", aspectRatio: i % 5 === 0 ? "1/1.3" : "1/1", cursor: "pointer", gridRow: i % 5 === 0 ? "span 2" : "span 1" }}>
                <img src={src} alt={`Nomad Place Kyrgyzstan photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "")} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "100px 24px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.cta_bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(44,24,16,0.78)" }} />
        <div className="reveal" style={{ position: "relative", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, color: "white", marginBottom: 20, lineHeight: 1.2 }}>
            {lang === "ru" ? "Готовы к приключению?" : "Ready for an adventure?"}
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.82)", marginBottom: 36, lineHeight: 1.7 }}>
            {lang === "ru"
              ? "Напишите нам сейчас и мы подберём идеальный тур для вас. Отвечаем быстро!"
              : "Write to us now and we'll find the perfect tour for you. We respond quickly!"}
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "white", borderRadius: 12, padding: "16px 40px", fontSize: 18, fontWeight: 700, textDecoration: "none" }}>
            <IconWA />{text.wa_btn}
          </a>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: "100px 24px", background: beige }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "white", borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.reviews_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.reviews_sub}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-cols-1 md:grid-cols-3">
            {text.review_items.map((r, i) => (
              <div key={i} className="reveal" style={{
                background: "white", borderRadius: 16, padding: "28px",
                boxShadow: "0 2px 16px rgba(92,61,30,0.07)",
                transition: "transform 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}
              >
                <div style={{ display: "flex", gap: 2, color: gold, marginBottom: 16 }}>
                  {Array.from({ length: r.stars }).map((_, j) => <IconStar key={j} />)}
                </div>
                <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, ${brown})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: textDark, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: textMuted }}>{r.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: "100px 24px", background: cream }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: beige, borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.faq_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: brown, marginBottom: 12 }}>{text.faq_sub}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {text.faq_items.map((item, i) => (
              <div key={i} className="reveal" style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(92,61,30,0.06)" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: faqOpen === i ? gold : textDark, lineHeight: 1.4 }}>{item.q}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={2} width={20} height={20} style={{ flexShrink: 0, transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: textMuted, lineHeight: 1.8, borderTop: `1px solid ${beige}`, paddingTop: 16 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ──────────────────────────────────────────────────── */}
      <section id="contacts" style={{ padding: "100px 24px", background: brown }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "rgba(201,168,76,0.2)", border: `1px solid ${gold}`, borderRadius: 100, padding: "6px 18px", marginBottom: 16, fontSize: 11, letterSpacing: 3, color: gold, textTransform: "uppercase", fontWeight: 700 }}>{text.contacts_title}</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "white", marginBottom: 12 }}>{text.contacts_sub}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
            {/* Info */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { icon: <IconPhone />, label: lang === "ru" ? "Телефон / WhatsApp" : "Phone / WhatsApp", value: "+996 704 100 104\n+996 507 887 269", href: WA_LINK },
                { icon: <IconInsta />, label: "Instagram", value: "@Nomad_place_", href: "https://instagram.com/Nomad_place_" },
                { icon: <IconPin />, label: lang === "ru" ? "Адрес" : "Address", value: text.location, href: "https://maps.google.com/?q=Kyzart,Naryn,Kyrgyzstan" },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", gap: 16, alignItems: "flex-start", textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(201,168,76,0.2)", border: `1px solid rgba(201,168,76,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", color: gold, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: gold, fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{c.value}</div>
                  </div>
                </a>
              ))}

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#25D366", color: "white", borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, textDecoration: "none", marginTop: 8 }}>
                <IconWA />{text.wa_btn}
              </a>
            </div>

            {/* Map embed */}
            <div className="reveal" style={{ borderRadius: 20, overflow: "hidden", height: 360, border: `2px solid rgba(201,168,76,0.3)` }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96000!2d75.5!3d41.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b9ab6ef8b0f0c1%3A0x3e6c6d79b0f0e0!2sKyzart%2C%20Naryn%20Region%2C%20Kyrgyzstan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nomad Place location - Kyzart Village, Naryn, Kyrgyzstan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background: "#1A0E08", padding: "28px 24px", textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
        <div style={{ marginBottom: 8, fontFamily: "var(--font-playfair)", color: gold, fontSize: 16, letterSpacing: 2 }}>NOMAD PLACE</div>
        {text.footer}
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ───────────────────────────────────── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          width: 60, height: 60, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.65)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.5)"; }}
      >
        <svg viewBox="0 0 24 24" fill="white" width={30} height={30}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Pulse ring */}
        <span style={{
          position: "absolute", inset: -4, borderRadius: "50%",
          border: "2px solid rgba(37,211,102,0.5)",
          animation: "pulse 2s ease-out infinite",
        }} />
      </a>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 768px) {
          .grid-cols-1 { grid-template-columns: 1fr !important; }
          .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
        }
        .hidden { display: none; }
        @media (min-width: 1024px) { .hidden { display: flex !important; } }
        .flex.lg\\:hidden { display: flex; }
        @media (min-width: 1024px) { .flex.lg\\:hidden { display: none !important; } }
      `}</style>
    </div>
  );
}
