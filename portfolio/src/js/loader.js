import { gsap, Power2 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from './lenis.js';

export function initLoaderAnimation() {
  lenis.stop();

  const obj = { value: 0 };
  const el  = document.querySelector('.loader-number');

  gsap.to(obj, {
    value: 100,
    duration: 2,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(obj.value);
    },
    onComplete: () => {
      gsap.to('#loader', {
        y: '-100%',
        duration: 1.2,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        onComplete: () => {
          lenis.start();
          ScrollTrigger.refresh();
        }
      });
    }
  });
}

