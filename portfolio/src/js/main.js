import '../scss/main.scss';
import {initLenis, lenis} from './lenis.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cursor.js';
import {initContactAnimation, initSkillsAnimation, initTitleAnimation} from './gsap.js';
import { updateItalianTime, updateAge, updateExperience } from './livedata.js';
import { initLoaderAnimation } from './loader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {initScrollBar} from "./scrollbar.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, left: 0 });
  initLenis();
  initLoaderAnimation();
  initScrollBar();
  initTitleAnimation();
  updateItalianTime();
  updateAge();
  updateExperience();

  setTimeout(() => {
    initScrollAnimations();
    initSkillsAnimation();
    initContactAnimation();
  }, 100);

  setInterval(updateItalianTime, 60 * 1000);
});

function initScrollAnimations() {
  const isMobile = window.innerWidth <= 768;
  const letters = Array.from(document.querySelectorAll('.hello-letter'))
      .filter(el => {
        const group = el.closest('.hello-right');
        if (group) {
          return window.getComputedStyle(group).display !== 'none';
        }
        return true;
      });

  gsap.set(letters, {
    y: '200%',
    force3D: true
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: isMobile ? '+=100vh' : '+=600vh',
      scrub: 1,
      pin: !isMobile,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
    }
  });

  tl.to('.about-me', {
    y: isMobile ? '-80vh' : '-80vh',
    ease: 'none',
    force3D: true
  }, 0);

  tl.to(letters, {
    y: '0%',
    ease: 'power2.out',
    stagger: {
      each: isMobile ? 0.15 : 0.24,
      from: 'start'
    },
    force3D: true
  }, isMobile ? '30%' : '60%');

  gsap.to('.hero-title > span:first-child', {
    x: isMobile ? '10vw' : '20vw',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: isMobile ? '+=300vh' : '+=300vh',
      scrub: true
    }
  });

  gsap.to('.hero-title > span:last-child', {
    x: isMobile ? '-10vw' : '-20vw',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: isMobile ? '+=300vh' : '+=300vh',
      scrub: true
    }
  });

  ScrollTrigger.refresh();
}


