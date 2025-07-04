import '../scss/main.scss';
import { initLenis } from './lenis.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cursor.js';
import { initTitleAnimation} from './gsap.js';
import { updateItalianTime, updateAge, updateExperience } from './livedata.js';
import { initLoaderAnimation } from './loader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initLoaderAnimation();
  initLenis();
  ScrollTrigger.update();
  ScrollTrigger.refresh();
  initTitleAnimation();
  updateItalianTime();
  updateAge();
  updateExperience();

  ScrollTrigger.create({
    trigger: '.hero-wrapper',
    start: 'top -20%',
    end: '+=150vh',
    scrub: true,
    pin: true,
    anticipatePin: 1
  });

  gsap.to('.about-me', {
    y: '-80vh',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top -20%',
      end: '+=150vh',
      scrub:  true
    }
  });

  setInterval(updateItalianTime, 60 * 1000);
});
