document.addEventListener('DOMContentLoaded', () => {
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        document.body.appendChild(cursor);
    }
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
    const speed = 0.2;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        cursor.style.left = `${posX}px`;
        cursor.style.top  = `${posY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter',  () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
});
