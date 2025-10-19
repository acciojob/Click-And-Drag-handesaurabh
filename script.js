// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let draggedItem = null;
let offsetX = 0;
let startScrollLeft = 0;
let isDragging = false;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    draggedItem = item;
    isDragging = true;
    startScrollLeft = container.scrollLeft;
    container.classList.add('active');
    
    offsetX = e.pageX;
    
    item.style.cursor = 'grabbing';
    
    e.preventDefault();
  });
});

document.addEventListener('mousemove', (e) => {
  if (!draggedItem || !isDragging) return;
  
  const diff = offsetX - e.pageX;
  const newScrollLeft = startScrollLeft + diff;
 
  const maxScroll = container.scrollWidth - container.clientWidth;
  const constrainedScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));
  
  container.scrollLeft = constrainedScroll;
});

document.addEventListener('mouseup', () => {
  if (draggedItem) {
    draggedItem.style.cursor = 'grab';
    draggedItem = null;
    isDragging = false;
    container.classList.remove('active');
  }
});