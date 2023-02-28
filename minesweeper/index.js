const field = document.querySelector(".field");
const width = 16;
const bombsAmount = 40;
let timer = 0;
let isGameOVer = false;
const numbersPositionArray = [
  "-126px top",
  "0px top",
  "-14px top",
  "-28px top",
  "-42px top",
  "-56px top",
  "-70px top",
  "-84px top",
  "-98px top",
  "-112px top",
];


//creation html field
createField(width);

function createField(width) {
  const cellsAmount = width * width;
  field.innerHTML = '<button class="field__button"></button>'.repeat(
    cellsAmount
  );
 createResultArray()
}


//create new array
function createResultArray(){
    const arrayWithBombs = Array(width * width)
    .fill(0)
    .fill('bomb', 0, bombsAmount - 1)
    .sort(() => Math.random() - 0.5);
console.log(arrayWithBombs)

for (let i = 0; i < arrayWithBombs.length; i++) {
    let total = 0
    const isLeftEdge = (i % width === 0)
    const isRightEdge = (i % width === width - 1)

    if (arrayWithBombs[i] === 0) {
      if (i > 0 && !isLeftEdge && arrayWithBombs[i -1] === 'bomb') total ++
      if (i > (width - 1) && !isRightEdge && arrayWithBombs[i +1 -width] === 'bomb') total ++
      if (i > width && arrayWithBombs[i -width] === 'bomb') total ++
      if (i > width + 1 && !isLeftEdge && arrayWithBombs[i -1 -width] === 'bomb') total ++
      if (i < (width * width -2) && !isRightEdge && arrayWithBombs[i +1] === 'bomb') total ++
      if (i < (width * width - width) && !isLeftEdge && arrayWithBombs[i -1 +width] === 'bomb') total ++
      if (i < (width * width - width - 2) && !isRightEdge && arrayWithBombs[i +1 +width] === 'bomb') total ++
      if (i < (width * width - width - 1) && arrayWithBombs[i +width] === 'bomb') total ++
      arrayWithBombs[i] =  total
    }
    console.log(arrayWithBombs)
  }
}

// functions to change state of smile
field.addEventListener("mousedown", (e) => {
  document
    .querySelector(".heading__smile")
    .classList.add("heading__smile_scary");
  e.target.classList.add("field__button_empty");
});

field.addEventListener("mouseup", (e) => {
  document
    .querySelector(".heading__smile")
    .classList.remove("heading__smile_scary");
  e.target.classList.remove("field__button_empty");
});

//function to start timer

field.addEventListener("click", (e) => {
  const cells = Array.from(document.querySelectorAll(".field__button"));
  const currentTargetIndex = cells.indexOf(e.target);
  startTimer();
});


//function to contextmenu click
field.addEventListener("contextmenu", (e) => {
    e.preventDefault()
  console.log("cont");
  if (e.target.classList.contains("field__button_flag")) {
    e.target.classList = "field__button field__button_question";
    e.target.disabled = true;
  } else if (e.target.classList.contains("field__button_question")) {
    e.target.classList = "field__button";
    e.target.disabled = false;
  } else {
    e.target.classList = "field__button field__button_flag";
    e.target.disabled = true;
  }
});

function startGame() {}

function setupGame() {}


// timer function
function startTimer() {
  const firstInputNumber = document.querySelector(".heading__first-time");
  const secondInputNumber = document.querySelector(".heading__second-time");
  const thirdInputNumber = document.querySelector(".heading__third-time");
  const timerInterval = setInterval(() => {
    timer++;
    if (timer < 10) {
      thirdInputNumber.style.backgroundPosition = numbersPositionArray[timer];
    } else if (timer >= 10 && timer < 100) {
      const secondNumber = Math.floor(timer / 10);
      const thirdNumber = timer % 10;
      secondInputNumber.style.backgroundPosition =
        numbersPositionArray[secondNumber];
      thirdInputNumber.style.backgroundPosition =
        numbersPositionArray[thirdNumber];
    } else if (timer >= 100 && timer < 1000) {
      const firstNumber = Math.floor(timer / 100);
      const secondNumber = Math.floor(timer / 10) % 10;
      const thirdNumber = (timer % 100) % 10;
      firstInputNumber.style.backgroundPosition =
        numbersPositionArray[firstNumber];
      secondInputNumber.style.backgroundPosition =
        numbersPositionArray[secondNumber];
      thirdInputNumber.style.backgroundPosition =
        numbersPositionArray[thirdNumber];
      if (timer >= 1000) {
        clearInterval(timerInterval);
      }
    }
  }, 1000);
}
