export function initTitleAnimation() {
    const letters = Array.from(document.querySelectorAll('.hero-title .letter'));
    const dirs    = ['left','right','up','down'];
    const duration = 1000;

    // 1) dopo che il CSS è stato applicato, fisso dimensioni container
    window.requestAnimationFrame(() => {
        letters.forEach(container => {
            const front = container.querySelector('.front');
            container.style.width  = `${front.offsetWidth}px`;
            container.style.height = `${front.offsetHeight}px`;
        });
    });

    function animateOne() {
        const container = letters[Math.floor(Math.random() * letters.length)];
        const front     = container.querySelector('.front');
        const back      = container.querySelector('.back');
        const d         = dirs[Math.floor(Math.random() * dirs.length)];
        const outCls    = `animate-out-${d}`;
        const inCls     = `animate-in-${d}`;

        if (front.classList.contains(outCls)) return;

        front.classList.add(outCls);
        back .classList.add(inCls);

        setTimeout(() => {
            front.classList.remove(outCls);
            back .classList.remove(inCls);
            front.style.transform = '';
            back .style.transform  = '';
        }, duration);
    }

    (function loop() {
        animateOne();
        const delay = 5000 + Math.random() * 5000;
        setTimeout(loop, delay);
    })();
}
