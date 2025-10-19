// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  container.classList.add('active');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  const newScroll = Math.max(0, Math.min(scrollLeft - walk, maxScroll));
  
  container.scrollLeft = newScroll;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  container.classList.remove('active');
});