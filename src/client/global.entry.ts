import '@fontsource/inter';
import { countPageVisit } from './counter';
import './global.inlined.css';

document.querySelector<HTMLSpanElement>('footer span.footer-year').innerText = String(new Date().getFullYear());

window.addEventListener('load', () => {
  countPageVisit();
})