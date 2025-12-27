// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;
let initialX = 0;
let initialY = 0;

// Position items in a grid initially
items.forEach((item, index) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  
  // Store initial positions
  item.style.position = 'relative';
  item.style.left = '0';
  item.style.top = '0';
  
  item.addEventListener('mousedown', (e) => {
    e.preventDefault();
    
    // Store initial position
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    initialX = rect.left - containerRect.left;
    initialY = rect.top - containerRect.top;
    
    activeItem = item;
    
    // Calculate offset from mouse position to item's top-left corner
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Switch to absolute positioning for dragging
    item.classList.add('dragging');
    
    // Update position to absolute with current position
    item.style.left = `${initialX}px`;
    item.style.top = `${initialY}px`;
  });
});

// Ensure items are positioned in grid initially
function positionItemsInGrid() {
  setTimeout(() => {
    items.forEach((item, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      
      // Position items in grid initially
      item.style.position = 'absolute';
      item.style.left = `${col * 110}px`;
      item.style.top = `${row * 110}px`;
    });
  }, 10); // Small delay to ensure layout is calculated
}

// Position items after DOM loads and after a short delay
positionItemsInGrid();

// Mouse move event for dragging
document.addEventListener('mousemove', (e) => {
  if (!activeItem) return;
  
  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  
  // Calculate new position based on mouse position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;
  
  // Apply boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - itemRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - itemRect.height));
  
  // Update item position
  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    // Remove dragging class to reset cursor and z-index
    activeItem.classList.remove('dragging');
    activeItem = null;
  }
});

// Handle mouseup outside the window
document.addEventListener('mouseleave', () => {
  if (activeItem) {
    activeItem.classList.remove('dragging');
    activeItem = null;
  }
});

// Prevent text selection during drag
document.addEventListener('selectstart', (e) => {
  if (activeItem) e.preventDefault();
});
