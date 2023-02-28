const field = document.querySelector(".field");
const smile = document.querySelector('.heading__smile')
const width = 16;
let bombsAmount = 40;
let flagsCounter = 40
let timer = 0;
let isGameOver = false;
let arrayWithBombs = [];
const numbersTimerPositionArray = [
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
const numbersFieldArray = [
  "-16px -50px",
  "1px -67px",
  "-16px -67px",
  "-32px -67px",
  "-48px -67px",
  "-67px -67px",
  "-84px -67px",
  "-101px -67px",
  " -118px -67px",
];
const anotherIcons = {
  flag: "-33px -50px",
  question: "-50px -50px",
  empty: "-16px -50px",
  noBomb: "-118px -50px",
  whiteBomb: "-84px -50px",
  redBomb: "-101px -50px",
  closed: "1px -50px",
};

const smilesIcons = {
    smile: '0 -24px',
    sad: '-108px -24px',
    glasses: '-82px -24px',
    scary: '-54px -24px',
    clicked: '-28px -24px',
}


//creation html field
createField(width);

function createField(width) {
  const cellsAmount = width * width;
  field.innerHTML = '<button class="field__button"></button>'.repeat(
    cellsAmount
  );
  createResultArray();
}


//create new array
function createResultArray() {
  arrayWithBombs = Array(width * width)
    .fill(0)
    .fill("bomb", 0, bombsAmount)
    .sort(() => Math.random() - 0.5);
  console.log(arrayWithBombs);

  for (let i = 0; i < arrayWithBombs.length; i++) {
    let total = 0;
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;

    if (arrayWithBombs[i] === 0) {
      if (i > 0 && !isLeftEdge && arrayWithBombs[i - 1] === "bomb") total++;
      if (
        i > width - 1 &&
        !isRightEdge &&
        arrayWithBombs[i + 1 - width] === "bomb"
      )
        total++;
      if (i > width && arrayWithBombs[i - width] === "bomb") total++;
      if (
        i > width + 1 &&
        !isLeftEdge &&
        arrayWithBombs[i - 1 - width] === "bomb"
      )
        total++;
      if (
        i < width * width - 2 &&
        !isRightEdge &&
        arrayWithBombs[i + 1] === "bomb"
      )
        total++;
      if (
        i < width * width - width &&
        !isLeftEdge &&
        arrayWithBombs[i - 1 + width] === "bomb"
      )
        total++;
      if (
        i < width * width - width - 2 &&
        !isRightEdge &&
        arrayWithBombs[i + 1 + width] === "bomb"
      )
        total++;
      if (i < width * width - width - 1 && arrayWithBombs[i + width] === "bomb")
        total++;
      arrayWithBombs[i] = total;
    }
    console.log(arrayWithBombs);
  }
}




// functions for mousedown events
field.addEventListener("mousedown", (e) => {
smile.style.backgroundPosition = smilesIcons.scary
  e.target.style.backgroundPosition = anotherIcons.empty
});

field.addEventListener("mouseup", (e) => {
    smile.style.backgroundPosition = smilesIcons.smile
});

smile.addEventListener("mousedown", () => {
    smile.style.backgroundPosition = smilesIcons.clicked
})


//function to start timer

field.addEventListener("click", (e) => {
  const cells = Array.from(document.querySelectorAll(".field__button"));
  const currentTargetIndex = cells.indexOf(e.target);

  if (typeof arrayWithBombs[currentTargetIndex] === "number") {
    e.target.style.backgroundPosition =
      numbersFieldArray[arrayWithBombs[currentTargetIndex]];
  } else {
    e.target.style.backgroundPosition = anotherIcons.redBomb;
    for (let i = 0; i < arrayWithBombs.length; i++) {
      if (cells[i].style.backgroundPosition === anotherIcons.question) continue;
      if (
        arrayWithBombs[i] === "bomb" &&
        cells[i].style.backgroundPosition === anotherIcons.flag
      ) {
        cells[i].style.backgroundPosition = anotherIcons.noBomb;
      } else if (arrayWithBombs[i] === "bomb" && i !== currentTargetIndex) {
        cells[i].style.backgroundPosition = anotherIcons.whiteBomb;
      }
    }
    gameOver();
  }

  //   startTimer();
});

//function to contextmenu click
field.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.style.backgroundPosition === anotherIcons.flag) {
    bombsCount(+1)
    e.target.style.backgroundPosition = anotherIcons.question;
    e.target.disabled = true;
  } else if (e.target.style.backgroundPosition === anotherIcons.question) {
    e.target.style.backgroundPosition = anotherIcons.closed;
    e.target.disabled = false;
  } else {
    e.target.style.backgroundPosition = anotherIcons.flag;
    bombsCount(-1)
    e.target.disabled = true;
  }
});

function startGame() {}



smile.addEventListener('click', setupGame)
function setupGame() {
    const cells = document.querySelectorAll('.field__button')
    for (let i = 0; i < cells.length; i++){
        cells[i].style.backgroundPosition = anotherIcons.closed
    }
    smile.style.backgroundPosition = smilesIcons.smile
    timer = 0

}



function gameOver() {
smile.style.backgroundPosition = smilesIcons.sad
//   clearInterval(timerInterval);
}



// timer function
function startTimer() {
  const firstInputNumber = document.querySelector(".heading__first-time");
  const secondInputNumber = document.querySelector(".heading__second-time");
  const thirdInputNumber = document.querySelector(".heading__third-time");
  const timerInterval = setInterval(() => {
    timer++;
    if (timer < 10) {
      thirdInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[timer];
    } else if (timer >= 10 && timer < 100) {
      const secondNumber = Math.floor(timer / 10);
      const thirdNumber = timer % 10;
      secondInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[secondNumber];
      thirdInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[thirdNumber];
    } else if (timer >= 100 && timer < 1000) {
      const firstNumber = Math.floor(timer / 100);
      const secondNumber = Math.floor(timer / 10) % 10;
      const thirdNumber = (timer % 100) % 10;
      firstInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[firstNumber];
      secondInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[secondNumber];
      thirdInputNumber.style.backgroundPosition =
        numbersTimerPositionArray[thirdNumber];
      if (timer >= 1000) {
        clearInterval(timerInterval);
      }
    }
  }, 1000);
}

// bombs counter function
function bombsCount(number){
bombsAmount +=number
console.log(bombsAmount)
if (bombsAmount < 0) return
if (bombsAmount >= 10){
document.querySelector('.heading__second-number').style.backgroundPosition = numbersTimerPositionArray[Math.floor(bombsAmount / 10)]
document.querySelector('.heading__third-number').style.backgroundPosition = numbersTimerPositionArray[bombsAmount % 10]
}
else{
    document.querySelector('.heading__second-number').style.backgroundPosition = numbersTimerPositionArray[0]
    document.querySelector('.heading__third-number').style.backgroundPosition = numbersTimerPositionArray[bombsAmount]
}

}