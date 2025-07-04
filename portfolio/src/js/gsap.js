import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initTitleAnimation() {
  const letters = Array.from(document.querySelectorAll('.hero-title .letter'));
  const dirs = ['left', 'right', 'up', 'down'];
  const duration = 600;
  window.requestAnimationFrame(() => {
    letters.forEach((container) => {
      const front = container.querySelector('.front');
      container.style.width = `${front.offsetWidth}px`;
      container.style.height = `${front.offsetHeight}px`;
    });
  });

  function animateOne() {
    const container = letters[Math.floor(Math.random() * letters.length)];
    const front = container.querySelector('.front');
    const back = container.querySelector('.back');
    const d = dirs[Math.floor(Math.random() * dirs.length)];
    const outCls = `animate-out-${d}`;
    const inCls = `animate-in-${d}`;

    if (front.classList.contains(outCls)) return;

    front.classList.add(outCls);
    back.classList.add(inCls);

    setTimeout(() => {
      front.classList.remove(outCls);
      back.classList.remove(inCls);
      front.style.transform = '';
      back.style.transform = '';
    }, duration);
  }

  (function loop() {
    animateOne();
    const delay = 2000 + Math.random() * 2000;
    setTimeout(loop, delay);
  })();
}

