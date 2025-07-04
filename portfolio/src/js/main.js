import '../scss/main.scss';
import { initLenis } from './lenis.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cursor.js';
import { initTitleAnimation} from './gsap.js';
import { updateItalianTime, updateAge, updateExperience } from './livedata.js';
import { initLoaderAnimation } from './loader.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoaderAnimation();
  initLenis();
  initTitleAnimation();
  updateItalianTime();
  updateAge();
  updateExperience();
  setInterval(updateItalianTime, 60 * 1000);
});
