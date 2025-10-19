// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let draggedItem = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

items.forEach((item, idx) => {
  item.style.position = 'absolute';
  item.style.display = 'inline-flex';
  
  const cols = 5;
  const itemWidth = 200;
  const gap = 0;
  const containerPadding = 100;
  
  const row = Math.floor(idx / cols);
  const col = idx % cols;
  const x = col * itemWidth + containerPadding;
  const y = row * (item.offsetHeight + gap) + containerPadding;
  
  item.style.left = x + 'px';
  item.style.top = y + 'px';
  item.style.cursor = 'grab';
});

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    draggedItem = item;
    isDragging = true;
    container.classList.add('active');
    
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    item.style.zIndex = '1000';
    item.style.cursor = 'grabbing';
    
    e.preventDefault();
  });
});

document.addEventListener('mousemove', (e) => {
  if (!draggedItem || !isDragging) return;
  
  const containerRect = container.getBoundingClientRect();
  
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;
  
  const itemWidth = draggedItem.offsetWidth;
  const itemHeight = draggedItem.offsetHeight;
  
  x = Math.max(0, Math.min(x, containerRect.width - itemWidth));
  y = Math.max(0, Math.min(y, containerRect.height - itemHeight));
  
  draggedItem.style.left = x + 'px';
  draggedItem.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (draggedItem) {
    draggedItem.style.zIndex = 'auto';
    draggedItem.style.cursor = 'grab';
    draggedItem = null;
    isDragging = false;
    container.classList.remove('active');
  }
});