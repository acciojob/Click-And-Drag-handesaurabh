// Your code here.
const container=document.querySelector(".items");
const cubes =document.querySelectorAll(".item");

let selectedCube=null;
let offsetX=0;
let offsetY=0;

cubes.forEach(cube=>{
	cube.style.position="absolute";
	const rect=cube.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	cube.style.left=`${rect.left-containerRect.left}px`;
	cube.style.top=`${rect.top-containerRect.top}px`;

	cube.addEventListener("mousedown",(e)=>{
	selectedCube = cube;
    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;
    cube.style.zIndex = 1000; 
    e.preventDefault();
	});
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) {
	  return;
  }
	  
  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;
  const maxLeft = containerRect.width - cubeRect.width;
  const maxTop = containerRect.height - cubeRect.height;

  if (newLeft < 0) {
	  newLeft = 0;
  }
  if (newTop < 0) {
	  newTop = 0;
  }
  if (newLeft > maxLeft) {
	  newLeft = maxLeft;
  }
  if (newTop > maxTop) {
	  newTop = maxTop;
  }

  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});