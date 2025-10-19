// Your code here.
const container = document.querySelector('.items');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const x = e.pageX;
  const walk = startX - x;
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  const newScroll = scrollLeft + walk;
  
  container.scrollLeft = Math.max(0, Math.min(newScroll, maxScroll));
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  container.classList.remove('active');
}, true);