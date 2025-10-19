// Your code here.
const container = document.querySelector('.items');
let isDragging = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.style.cursor = 'grabbing';
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX; 
  container.scrollLeft = scrollLeft - walk;
});
