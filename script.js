// Your code here.
 const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

const gridSize = 120;
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 6);
  const col = index % 6;
  cube.style.left = `${col * gridSize}px`;
  cube.style.top = `${row * gridSize}px`;

  cube.addEventListener('mousedown', (e) => {
    e.preventDefault();
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.cursor = 'grabbing';
    cube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeRect.height));

  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.cursor = 'grab';
    activeCube.style.zIndex = 1;
    activeCube = null;
  }
});
