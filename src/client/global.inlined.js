// GA Script
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-125454191-1');

// Dark Mode. This has to be inlined in head so that there isn't flash of wrong themed site
function toggleTheme(toggleButton) {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    window.localStorage.setItem('prefers-theme', 'light');
    if (toggleButton) {
      toggleButton.setAttribute('aria-pressed', false);
      toggleButton.setAttribute('aria-label', 'Activate Dark Mode');
    }
  } else {
    document.body.classList.add('dark');
    window.localStorage.setItem('prefers-theme', 'dark');
    if (toggleButton) {
      toggleButton.setAttribute('aria-pressed', true);
      toggleButton.setAttribute('aria-label', 'Activate Light Mode');
    }
  }


  const themeChangeEvent = new Event('theme-change');
  window.dispatchEvent(themeChangeEvent);
}

const localPreference = window.localStorage.getItem('prefers-theme');

// Set initial theme by preference
if (localPreference) {
  if (localPreference === 'light') document.body.classList.remove('dark');
  else document.body.classList.add('dark');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.body.classList.add('dark');
}