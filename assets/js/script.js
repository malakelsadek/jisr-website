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
})();
