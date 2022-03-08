import { throttle } from "../build-ts/utils";
import 'highlightjs-calvera-dark/theme.css';
import './blog.css';
let sentSunflowers = 0;

const HOST = '';

const sharePopupEl = document.querySelector('.share-popup');
const overlayEl = document.querySelector('.overlay');
const copyButton = document.querySelector('.copy-button');
const sunflowerCount = document.querySelector<HTMLSpanElement>('.sunflowers > .sunflower-count');

const BLOG_KEY = location.pathname.replace(/\//g, '')
const STORAGE_KEY = 'sunclick-' + BLOG_KEY;
const LOCAL_SUNFLOWER_COUNT = Number(localStorage.getItem(STORAGE_KEY))

let initialSunflowerCount = Number(sunflowerCount.innerText);
sentSunflowers = initialSunflowerCount;


// Example POST method implementation:
async function postSunflowerData(sunflowerCount) {
  const ENDPOINT = '/.netlify/functions/add-sunflower';
  const data = {
    blog: BLOG_KEY,
    sunflowerCount
  }

  const response = await fetch(HOST + ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

// main functions
function sunflowerClickHandler() {
  const totalSunflowersSentByUser = Number(sunflowerCount.innerText) + LOCAL_SUNFLOWER_COUNT - initialSunflowerCount;
  if (totalSunflowersSentByUser >= 50) {
    alert("That's a lot of positivity. Keep some sunflowers for yourself :)");
    return;
  }
  
  sunflowerCount.innerText = String(Number(sunflowerCount.innerText) + 1);

  throttle(() => {
    localStorage.setItem(STORAGE_KEY , String(Number(sunflowerCount.innerText) + LOCAL_SUNFLOWER_COUNT - initialSunflowerCount));
    postSunflowerData(Number(sunflowerCount.innerText) - sentSunflowers)
      .catch(err => {
        console.log("Couldn't add sunflowers");
        console.log(err);
      })
    sentSunflowers = Number(sunflowerCount.innerText);
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
  const dbRes = await fetch(`${HOST}/.netlify/functions/get-sunflower?blog=${BLOG_KEY}`).then(res => res.json());
  if (!dbRes.sunflowerCount) {
    dbRes.sunflowerCount = 0;
  }
  sunflowerCount.innerText = dbRes.sunflowerCount;
  initialSunflowerCount = dbRes.sunflowerCount;
  sentSunflowers = dbRes.sunflowerCount;
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