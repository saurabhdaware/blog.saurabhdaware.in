/**
 * Common Static JS file
 */
window.addEventListener(
  "keydown",
  (e) => e.keyCode === 9 && document.body.classList.add("user-is-tabbing")
);

// Syntax highlight if hljs is imported
try {
  hljs.initHighlightingOnLoad();
} catch (err) {
  if (err.message !== "hljs is not defined") {
    throw err;
  }
}

function setCommentsTheme(themeName) {
  const message = {
    type: 'set-theme',
    theme: themeName === 'dark' ? 'github-dark' : 'github-light'
  };
  const utterances = document.querySelector('iframe.utterances-frame').contentWindow; // try event.source instead
  utterances.postMessage(message, 'https://utteranc.es');
}

window.addEventListener('message', () => 
  setCommentsTheme(document.body.classList.contains('dark') ? 'dark' : 'light')
);

window.addEventListener('theme-change', () => {
  console.log('theme change!!');
  console.log(document.body.classList.contains('dark'));

  setCommentsTheme(document.body.classList.contains('dark') ? 'dark' : 'light')
})