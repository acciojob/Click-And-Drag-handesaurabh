// Your code here.
 document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const cubes = document.querySelectorAll('.cube');

    let activeCube = null;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    function dragStart(e) {
        activeCube = e.target.closest('.cube');
        if (!activeCube) return;

        activeCube.classList.add('dragging');
        
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        initialX = clientX;
        initialY = clientY;
        xOffset = initialX - activeCube.getBoundingClientRect().left + containerRect.left;
        yOffset = initialY - activeCube.getBoundingClientRect().top + containerRect.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);
    }

    function drag(e) {
        if (!activeCube) return;
        
        e.preventDefault();

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        currentX = clientX - xOffset;
        currentY = clientY - yOffset;

        setTranslate(currentX, currentY, activeCube);
    }

    function dragEnd(e) {
        if (!activeCube) return;
        
        activeCube.classList.remove('dragging');
        activeCube = null;
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', dragEnd);
    }
    
    function setTranslate(xPos, yPos, el) {
        const cubeWidth = el.offsetWidth;
        const cubeHeight = el.offsetHeight;

        let finalX = xPos;
        if (finalX < 0) {
            finalX = 0; 
        } else if (finalX + cubeWidth > containerWidth) {
            finalX = containerWidth - cubeWidth; 
        }

        let finalY = yPos;
        if (finalY < 0) {
            finalY = 0; 
        } else if (finalY + cubeHeight > containerHeight) {
            finalY = containerHeight - cubeHeight; 
        }

        el.style.left = finalX + 'px';
        el.style.top = finalY + 'px';
    }

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', dragStart);
        cube.addEventListener('touchstart', dragStart, { passive: false });
    });
});