import { throttle } from "../build-ts/utils";
import 'highlightjs-calvera-dark/theme.css';
import './blog.css';
import { getSunflowers, storeSunflowers } from "./counter";
let sentSunflowers = 0;

const HOST = '';

const sharePopupEl = document.querySelector('.share-popup');
const overlayEl = document.querySelector('.overlay');
const copyButton = document.querySelector('.copy-button');
const sunflowerCountEl = document.querySelector<HTMLSpanElement>('.sunflowers > .sunflower-count');

const BLOG_KEY = location.pathname.replace(/\//g, '')
const STORAGE_KEY = 'sunclick-' + BLOG_KEY;
const LOCAL_SUNFLOWER_COUNT = Number(localStorage.getItem(STORAGE_KEY))

let initialSunflowerCount = Number(sunflowerCountEl.innerText);
sentSunflowers = initialSunflowerCount;


// Example POST method implementation:
async function postSunflowerData(sunflowerCount) {
  return storeSunflowers(sunflowerCount);
}

// main functions
function sunflowerClickHandler() {
  const totalSunflowersSentByUser = Number(sunflowerCountEl.innerText) + LOCAL_SUNFLOWER_COUNT - initialSunflowerCount;
  if (totalSunflowersSentByUser >= 50) {
    alert("That's a lot of positivity. Keep some sunflowers for yourself :)");
    return;
  }
  
  sunflowerCountEl.innerText = String(Number(sunflowerCountEl.innerText) + 1);

  throttle(() => {
    localStorage.setItem(STORAGE_KEY , String(Number(sunflowerCountEl.innerText) + LOCAL_SUNFLOWER_COUNT - initialSunflowerCount));
    postSunflowerData(Number(sunflowerCountEl.innerText) - sentSunflowers)
      .catch(err => {
        console.log("Couldn't add sunflowers");
        console.log(err);
      })
    sentSunflowers = Number(sunflowerCountEl.innerText);
  }, 3000);
}

function toggleSharePopup() {
  if (sharePopupEl.classList.contains('show')) {
    overlayEl.classList.remove('show')
  } else {
    overlayEl.classList.add('show')
  }
  sharePopupEl.classList.toggle('show');

  copyButton.innerHTML = 'Copy Link'
}

function copyButtonHandler() {
  const tempInput = document.createElement('input');
  tempInput.id = 'delete-this-input';
  document.body.appendChild(tempInput);
  tempInput.value = location.href;
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  tempInput.outerHTML = '';
  copyButton.innerHTML += ' <small>(URL Copied)</small>';
}


async function fetchAndSetInitialSunflowers() {
  const sunflowerCount = await getSunflowers();
  sunflowerCountEl.innerText = String(sunflowerCount);
  initialSunflowerCount = sunflowerCount;
  sentSunflowers = sunflowerCount;
}

function setCommentsTheme(themeName: 'dark' | 'light') {
  const message = {
    type: 'set-theme',
    theme: themeName === 'dark' ? 'github-dark' : 'github-light'
  };
  const utterances = document.querySelector<HTMLIFrameElement>('iframe.utterances-frame').contentWindow; // try event.source instead
  utterances.postMessage(message, 'https://utteranc.es');
}

const makeHeadingLinks = () => {
  const headings = document.querySelectorAll<HTMLHeadingElement>('.content h2, .content h3, .content h4, .content h5, .content h6');
  headings.forEach((heading) => {
    heading.id = heading.innerText.toLowerCase().replace(/ /g, '-').replace(/[?]/g, '');
    heading.innerHTML += ` <a class="heading-link" href="#${heading.id}">#</a>`
  })
}



document.querySelector('.sunflowers').addEventListener('click', sunflowerClickHandler);
document.querySelector('button.share').addEventListener('click', toggleSharePopup);
overlayEl.addEventListener('click', () => {
  sharePopupEl.classList.remove('show')
  overlayEl.classList.remove('show');
})

window.addEventListener('theme-change', () => {
  setCommentsTheme(document.body.classList.contains('dark') ? 'dark' : 'light')
})

window.addEventListener('message', () => 
  setCommentsTheme(document.body.classList.contains('dark') ? 'dark' : 'light')
);
copyButton.addEventListener('click', copyButtonHandler);
fetchAndSetInitialSunflowers();
makeHeadingLinks();