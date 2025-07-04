import {lenis} from "./lenis.js";

export function initScrollBar() {
    const bar = document.querySelector('.scroll-bar__progress');

    if (lenis) {
        lenis.on('scroll', ({ scroll, limit }) => {
            const ratio = limit ? scroll / limit : 0;
            bar.style.transform = `scaleX(${ratio})`;
        });
    } else {
        const update = () => {
            const max = document.documentElement.scrollWidth - window.innerWidth;
            const ratio = max ? window.scrollX / max : 0;
            bar.style.transform = `scaleX(${ratio})`;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
}