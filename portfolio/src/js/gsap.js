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
      container.style.width = `${front.offsetWidth + 6}px`;
      container.style.height = `${front.offsetHeight + 6}px`;
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

export function initSkillsAnimation() {
  const skills = document.querySelectorAll('.skills-section .skill');

  skills.forEach((skill, index) => {
    const dir = index % 2 === 0 ? 1 : -1;
    const distance = 100;
    const baseDuration = 20;

    gsap.set(skill, {
      xPercent: dir > 0 ? -distance : distance
    });

    if (dir > 0) {
      skill.style.transform = 'scaleX(-1)';
    }

    const tween = gsap.to(skill, {
      xPercent: dir > 0 ? distance : -distance,
      duration: baseDuration,
      ease: 'none',
      repeat: -1
    });

    let lastY = window.scrollY;

    ScrollTrigger.create({
      trigger: '.skills-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;
        lastY = currentY;

        const velocity = gsap.utils.clamp(0.5, 10, 1 + Math.abs(delta) / 10);
        tween.timeScale(velocity);
      }
    });
  });
}

export function initContactAnimation() {
  const letters = document.querySelectorAll('.contact-letter');

  gsap.set(letters, {
    y: '150%',
    force3D: true
  });

  if (window.innerWidth > 768) {
    gsap.to(letters, {
      y: '0%',
      ease: 'power2.out',
      stagger: {
        each: 0.15,
        from: 'start'
      },
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top+=200 center',
        end: 'top+=400 center',
        scrub: 1,
        markers: false
      }
    });
  } else {
    gsap.to(letters, {
      y: '0%',
      ease: 'power2.out',
      stagger: {
        each: 0.15,
        from: 'start'
      },
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top bottom',
        end: 'top center',
        scrub: 0.2,
        markers: false
      }
    });
  }
}


