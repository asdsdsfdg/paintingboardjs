const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600; //반복해서 사용하게 되는 값은 실수 방지를 위해 변수를 따로 정의해준다.

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //먼저 fillstyle를 하얀색으로 해준 뒤 fillRect로 canvassize만큼을 하얀색으로 채워줌
//이 과정을 안하면 이미지 저장시에 배경색을 넣지 않으면 누끼가 따지기 때문
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //브러쉬 굵기 초기값

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //console.log(event.target.style)에서 관련 요소인 backgroundColor를 찾음
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
//먼저 console.log(event)로 이벤트 정보를 확인, target 란을 펼쳐서 원하는 요소인 value를 확인

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCM(event) {
  //캔버스에 우클릭 방지하는 함수
  event.preventDefault(); //이벤트 발생을 중지시킴
}

function handleSaveClick() {
  const image = canvas.toDataURL(); //캔버스의 데이타를 이미지로 저장
  const link = document.createElement("a"); //<a>태그 생성
  link.href = image;
  link.download = "PaintJS[🎨]"; //<a> 태그의 attribute중 하나로 href는 브라우저에게 랭크로 이동하라고 하지만 down는 url를 다운하라고 지시함
  link.click();
}

if (canvas) {
  //if 구문으로 조건을 확실히 해주는 습관을 들이자
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //contextmenu는 우클릭할때 나타나는 목록을 말함
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
//array.from은 해당 오브젝트로부터 배열을 만들어줌. 이과정을 생략하면 console.log(colors)의 결과가 html 컬렉션으로 나옴.

if (range) {
  range.addEventListener("input", handleRangeChange);
} //html에 input에 따라 조정되야 하기 때문에

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
