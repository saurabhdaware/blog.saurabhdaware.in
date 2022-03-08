import '@fontsource/inter';
import './global.inlined.css';

document.querySelector<HTMLSpanElement>('footer span.footer-year').innerText = String(new Date().getFullYear());
