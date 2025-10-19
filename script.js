// Your code here.
  const container = document.querySelector('.items');
let activeItem = null;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

container.addEventListener('mousedown', dragStart, false);
document.addEventListener('mouseup', dragEnd, false);
document.addEventListener('mousemove', drag, false);

function dragStart(e) {
  activeItem = e.target.closest('.item');
  if (!activeItem) return;

  const itemRect = activeItem.getBoundingClientRect();
  const initialLeft = activeItem.offsetLeft;
  const initialTop = activeItem.offsetTop;

  if (activeItem.style.position !== 'absolute') {
    activeItem.style.position = 'absolute';
    activeItem.style.left = `${initialLeft}px`;
    activeItem.style.top = `${initialTop}px`;
  }
  
  offsetX = e.clientX - itemRect.left;
  offsetY = e.clientY - itemRect.top;

  activeItem.style.zIndex = 1000;
  activeItem.style.cursor = 'grabbing';
  isDragging = true;
}

function dragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  
  if (activeItem) {
    activeItem.style.zIndex = '';
    activeItem.style.cursor = 'pointer';
  }
  
  activeItem = null;
}

function drag(e) {
  if (!isDragging || !activeItem) return;

  e.preventDefault();

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  const minX = 0;
  const minY = 0;
  const maxX = container.clientWidth - itemRect.width;
  const maxY = container.clientHeight - itemRect.height;

  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));

  activeItem.style.left = `${newX}px`;
  activeItem.style.top = `${newY}px`;
}