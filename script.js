// Your code here.
const items = document.querySelector('.items');
let isDown = false, startX = 0, scrollLeft = 0;

items.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = items.scrollLeft;
  items.classList.add('active');
});

items.addEventListener('mouseleave', () => {
  isDown = false;
  items.classList.remove('active');
});

items.addEventListener('mouseup', () => {
  isDown = false;
  items.classList.remove('active');
});

items.addEventListener('mousemove', e => {
  if (!isDown) return;
  const walk = (e.pageX - startX) * 1.5;
  items.scrollLeft = scrollLeft - walk;
});
