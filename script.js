// Your code here.
 const container = document.querySelector('.items');
let isDragging = false, startX = 0, startScroll = 0;

container.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.pageX || e.clientX;
  startScroll = container.scrollLeft;
  container.classList.add('active');
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const currentX = e.pageX || e.clientX;
  const distance = startX - currentX;
  const newScroll = startScroll + distance;
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.scrollLeft = Math.max(0, Math.min(newScroll, maxScroll));
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  container.classList.remove('active');
});
