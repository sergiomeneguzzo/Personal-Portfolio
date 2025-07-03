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

export function initNavHoverEffect() {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const txt = link.textContent.trim();
    // Avvolgi automaticamente il testo in due span
    link.innerHTML = `
      <span class="link-text">
        <span class="front">${txt}</span>
        <span class="back">${txt}</span>
      </span>
    `;

    const front = link.querySelector('.front');
    const back = link.querySelector('.back');

    link.addEventListener('mouseenter', () => {
      gsap.to(front, { y: '-100%', duration: 0.6, ease: 'power2.out' });
      gsap.to(back, { y: '0%', duration: 0.6, ease: 'power2.out' });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(front, { y: '0%', duration: 0.6, ease: 'power2.out' });
      gsap.to(back, { y: '100%', duration: 0.6, ease: 'power2.out' });
    });
  });
}
