(function () {
  const STORAGE_KEY = 'jisr-lang';
  const toggleBtn = document.getElementById('lang-toggle');

  function applyLang(lang) {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    toggleBtn.textContent = isAr ? 'EN' : 'AR';

    document.querySelectorAll('[data-ar]').forEach((el) => {
      el.textContent = isAr ? el.dataset.ar : el.dataset.en;
    });

    document.querySelectorAll('[data-ar-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', isAr ? el.dataset.arPlaceholder : el.dataset.enPlaceholder);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.lang;
    applyLang(current === 'ar' ? 'en' : 'ar');
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) applyLang(saved);

  const THEME_KEY = 'jisr-theme';
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
