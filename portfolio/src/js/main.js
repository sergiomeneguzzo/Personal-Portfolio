import '../scss/main.scss';
import { initLenis, lenis } from './lenis.js';
import './cursor.js';
import {
  initContactAnimation,
  initSkillsAnimation,
  initTitleAnimation,
} from './gsap.js';
import { updateItalianTime, updateAge, updateExperience } from './livedata.js';
import { initLoaderAnimation } from './loader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollBar } from './scrollbar.js';
import { fetchHeaderContent } from './cms/header.js';

if (location.hash) {
  history.replaceState(null, '', location.pathname + location.search);
}

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', async() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }
  initLenis();
  lenis.scrollTo(0, { immediate: true });
  initLoaderAnimation();
  initScrollBar();
  await fetchHeaderContent();
  updateItalianTime();
  updateAge();
  updateExperience();
  initButtonHover3D();
  initTextSwapHover('.contact-socials .social-link', '-20%');
  initTextSwapHover('.top-bar .nav-links a', '-100%');

  document.fonts.ready.then(() => {
    initTitleAnimation();
    setTimeout(() => {
      initScrollAnimations();
      initSkillsAnimation();
      initContactAnimation();
    }, 100);
    ScrollTrigger.refresh();
  });

  setInterval(updateItalianTime, 60 * 1000);
});

function initScrollAnimations() {
  const isMobile = window.innerWidth <= 768;
  const letters = Array.from(document.querySelectorAll('.hello-letter')).filter(
    (el) => {
      const group = el.closest('.hello-right');
      if (group) {
        return window.getComputedStyle(group).display !== 'none';
      }
      return true;
    },
  );

  gsap.set(letters, {
    y: '200%',
    force3D: true,
  });

  if (isMobile) {
    gsap.to('.hero-title > span:first-child', {
      x: '120vw',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '+=100vh',
        scrub: 1.5,
      },
    });

    gsap.to('.hero-title > span:last-child', {
      x: '-120vw',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '+=100vh',
        scrub: 1.5,
      },
    });

    gsap.to(letters, {
      y: '0%',
      ease: 'power2.out',
      stagger: {
        each: 0.2,
        from: 'start',
      },
      force3D: true,
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: '40% top',
        end: '+=150vh',
        scrub: 2,
      },
    });
  } else {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '+=600vh',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
    });

    tl.to(
      '.about-me',
      {
        y: '-80vh',
        ease: 'none',
        force3D: true,
      },
      0,
    );

    tl.to(
      letters,
      {
        y: '0%',
        ease: 'power2.out',
        stagger: {
          each: 0.4,
          from: 'start',
          scrub: 2,
        },
        force3D: true,
      },
      '60%',
    );

    gsap.to('.hero-title > span:first-child', {
      x: '20vw',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '+=300vh',
        scrub: true,
      },
    });

    gsap.to('.hero-title > span:last-child', {
      x: '-20vw',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '+=300vh',
        scrub: true,
      },
    });
  }

  ScrollTrigger.refresh();
}

function initButtonHover3D() {
  const button = document.querySelector('.more-link');
  if (!button) return;

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.05,
      y: y * 0.2,
      rotationY: x * 0.05,
      rotationX: -y * 0.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}

function initTextSwapHover(selector, secondaryEndY = '0%') {
  document.querySelectorAll(selector).forEach((link) => {
    const primary = link.querySelector('.text-primary');
    const secondary = link.querySelector('.text-secondary');
    if (!primary || !secondary) return;

    // stato iniziale
    gsap.set(primary, { y: '0%', opacity: 1 });
    gsap.set(secondary, { y: '100%', opacity: 0 });

    // timeline con parametro
    const tl = gsap.timeline({ paused: true });
    tl.to(
      primary,
      {
        y: '-100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
      },
      0,
    ).to(
      secondary,
      {
        y: secondaryEndY,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
      },
      0,
    );

    link.addEventListener('mouseenter', () => tl.play());
    link.addEventListener('mouseleave', () => tl.reverse());
  });
}
