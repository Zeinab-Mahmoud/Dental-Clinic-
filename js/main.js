(() => {
  const cfg = clinicConfig;
  const page = document.body.dataset.page;

  /* ---------- أيقونات (SVG مضمّنة) ---------- */
  const PATHS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    calendarX: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M10 14l4 4M14 14l-4 4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17v4M17 19h4"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    stethoscope: '<path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    baby: '<circle cx="12" cy="12" r="9"/><path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5M12 3c2 0 3.5 1.1 3.5 2.5"/>',
  };
  const icon = (name, size = 20) =>
    `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || PATHS.smile}</svg>`;

  /* ---------- أدوات ---------- */
  const whatsappLink = (msg = cfg.contact.whatsappMessage) =>
    `https://wa.me/${cfg.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  const waButton = (label = 'تواصلي معنا عبر واتساب', variant = 'gold', msg) =>
    `<a class="btn btn-${variant}" href="${whatsappLink(msg)}" target="_blank" rel="noopener noreferrer">${icon('chat')} ${label}</a>`;
  const sectionHeading = (eyebrow, title, subtitle) =>
    `<div class="section-heading"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><span class="gold-line"></span><p>${subtitle}</p></div>`;
  const reveal = (html, delay = 0) => `<div class="reveal" style="transition-delay:${delay}ms">${html}</div>`;

  /* ---------- الهيدر ---------- */
  const navLinks = [
    ['index.html', 'الرئيسية', page === 'home'],
    ['index.html#about', 'عن الطبيبة', false],
    ['index.html#services', 'الخدمات', false],
    ['appointments.html', 'المواعيد المتاحة', page === 'appointments'],
    ['index.html#contact', 'تواصل معنا', false],
  ];
  const header = `
  <header class="navbar" id="navbar"><div class="container nav-inner">
    <a href="index.html" class="brand" aria-label="${cfg.clinicName}"><img src="assets/logo.png" alt="" /><span>${cfg.clinicName}</span></a>
    <nav class="nav-links" id="nav-links" aria-label="التنقل الرئيسي">
      ${navLinks.map(([href, label, active]) => `<a href="${href}" class="${active ? 'active' : ''}">${label}</a>`).join('')}
      <a href="appointments.html" class="btn btn-gold nav-cta">${icon('calendar', 18)} احجزي موعدك</a>
    </nav>
    <button class="menu-toggle" id="menu-toggle" aria-label="فتح القائمة" aria-expanded="false">${icon('menu', 26)}</button>
  </div></header>`;

  /* ---------- الفوتر ---------- */
  const footer = `
  <footer class="footer">
    <div class="container footer-grid">
      <div><img class="footer-logo" src="assets/logo.png" alt="${cfg.clinicName}" /><p>${cfg.tagline}</p></div>
      <div><h4>روابط سريعة</h4><ul>
        <li><a href="index.html">الرئيسية</a></li><li><a href="index.html#services">الخدمات</a></li>
        <li><a href="appointments.html">المواعيد المتاحة</a></li><li><a href="index.html#contact">تواصل معنا</a></li></ul></div>
      <div><h4>معلومات التواصل</h4><ul class="footer-contact">
        <li>${icon('phone', 16)} <span dir="ltr">${cfg.contact.phone}</span></li>
        <li>${icon('pin', 16)} ${cfg.contact.address}</li></ul></div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} ${cfg.clinicName}. جميع الحقوق محفوظة.</div>
  </footer>`;

  /* ---------- الصفحة الرئيسية ---------- */
  const homePage = () => {
    const { hero, dentist, services, contact } = cfg;
    const photo = dentist.photo
      ? `<img src="${dentist.photo}" alt="${dentist.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius)" />`
      : `<span class="about-initial">R</span><small>[مكان صورة الطبيبة]</small>`;
    const phone = contact.phoneDial ? `<a href="tel:${contact.phoneDial}" dir="ltr">${contact.phone}</a>` : `<span dir="ltr">${contact.phone}</span>`;
    return `
    <section class="hero"><div class="container hero-grid">
      <div class="hero-text">
        <span class="eyebrow">${icon('sparkles', 16)} ${cfg.tagline}</span>
        <h1>${hero.headline}</h1><p>${hero.intro}</p>
        <div class="hero-actions">
          <a href="appointments.html" class="btn btn-gold">${icon('calendar')} المواعيد المتاحة</a>
          ${waButton('واتساب', 'outline')}
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true"><span class="blob blob-1"></span><span class="blob blob-2"></span>
        <div class="hero-card"><img src="assets/logo.png" alt="" /></div></div>
    </div></section>

    <section id="about" class="section"><div class="container about-grid">
      ${reveal(`<div class="about-photo">${photo}</div>`)}
      ${reveal(`<span class="eyebrow">عن الطبيبة</span><h2 class="about-name">${dentist.name}</h2>
        <p class="about-title">${dentist.title} — ${cfg.clinicName}</p>
        ${dentist.bio.map((p) => `<p class="about-bio">${p}</p>`).join('')}
        <ul class="checklist">${dentist.highlights.map((h) => `<li>${icon('check')} ${h}</li>`).join('')}</ul>`, 100)}
    </div></section>

    <section id="services" class="section section-tint"><div class="container">
      ${sectionHeading('خدماتنا', 'رعاية متكاملة لأسنانكِ', 'نقدّم مجموعة من الخدمات العلاجية والتجميلية بأحدث الأساليب.')}
      <div class="services-grid">
        ${services.map((s, i) => reveal(`<article class="card service-card"><span class="icon-badge">${icon(s.icon, 26)}</span><h3>${s.title}</h3><p>${s.description}</p></article>`, i * 70)).join('')}
      </div>
    </div></section>

    <section id="contact" class="section"><div class="container">
      ${sectionHeading('تواصل معنا', 'يسعدنا استقبالكِ', 'للحجز أو الاستفسار، تواصلي معنا في أي وقت.')}
      ${reveal(`<div class="contact-grid">
        <div class="card contact-item">${icon('phone', 26)}<h3>الهاتف</h3>${phone}</div>
        <div class="card contact-item">${icon('pin', 26)}<h3>العنوان</h3><span>${contact.address}</span></div>
        <div class="card contact-item contact-wa"><h3>واتساب</h3><p>أسرع طريقة لحجز موعد</p>${waButton('ابدئي المحادثة')}</div>
      </div>`)}
    </div></section>`;
  };

  /* ---------- صفحة المواعيد ---------- */
  const appointmentsPage = () => {
    const { pageTitle, pageSubtitle, note, days } = cfg.appointments;
    const dayCard = (d, i) => reveal(`
      <article class="card day-card ${d.closed ? 'is-closed' : ''}">
        <header><h3>${d.day}</h3>
          ${d.closed ? '<span class="badge badge-off">إجازة</span>' : `<span class="badge">${icon('clock', 14)} ${d.open} – ${d.close}</span>`}
        </header>
        ${d.closed ? `<p class="closed-msg">${icon('calendarX', 18)} العيادة مغلقة في هذا اليوم</p>`
          : d.slots && d.slots.length
            ? `<ul class="slots">${d.slots.map((s) => `<li><a href="${whatsappLink(`مرحبًا، أودّ حجز موعد يوم ${d.day} الساعة ${s}.`)}" target="_blank" rel="noopener noreferrer">${s}</a></li>`).join('')}</ul>`
            : '<p class="closed-msg">لا توجد مواعيد متاحة حاليًا</p>'}
      </article>`, (i % 3) * 70);
    return `
    <section class="page-hero"><div class="container"><span class="eyebrow">احجزي زيارتكِ</span><h1>${pageTitle}</h1><p>${pageSubtitle}</p></div></section>
    <section class="section"><div class="container">
      <p class="note">${icon('info', 18)} ${note}</p>
      <div class="days-grid">${days.map(dayCard).join('')}</div>
      <div class="appt-cta"><h3>جاهزة للحجز؟</h3><p>اضغطي على الموعد المناسب أو راسلينا مباشرة عبر واتساب.</p>${waButton('استفسار عن موعد')}</div>
    </div></section>`;
  };

  /* ---------- التشغيل ---------- */
  document.title = page === 'appointments' ? `${cfg.appointments.pageTitle} | ${cfg.clinicName}` : `${cfg.clinicName} | ${cfg.tagline}`;
  document.getElementById('app').innerHTML = `${header}<main>${page === 'appointments' ? appointmentsPage() : homePage()}</main>${footer}`;

  // قائمة الموبايل
  const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  const setMenu = (open) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    toggle.innerHTML = icon(open ? 'x' : 'menu', 26);
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  links.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));

  // ظل الهيدر عند التمرير
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ظهور ناعم للعناصر
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // الانتقال لقسم معيّن (#services) بعد بناء الصفحة
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
  }
})();
