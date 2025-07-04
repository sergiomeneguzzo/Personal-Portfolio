import { gsap, Power2 } from 'gsap';

export function initLoaderAnimation() {
  const el = document.querySelector('.loader-number');
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: 100,
    duration: 2,
    ease: Power2.easeOut,
    roundProps: 'value',
    onUpdate() {
      el.textContent = obj.value;
    },
    onComplete() {
      gsap.to('#loader', {
        y: '-100%',
        duration: 1.2,
        ease: Power2.easeInOut,
        pointerEvents: 'none',
      });
    },
  });
}
