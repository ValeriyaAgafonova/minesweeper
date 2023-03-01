const field = document.querySelector(".field");
const smile = document.querySelector(".heading__smile");

const firstInputNumber = document.querySelector(".heading__first-time");
const secondInputNumber = document.querySelector(".heading__second-time");
const thirdInputNumber = document.querySelector(".heading__third-time");

const secondBombNumber = document.querySelector(".heading__second-number");
const thirdBombNumber = document.querySelector(".heading__third-number");
let cells = [];
const width = 16;
const bombsAmount = 40;
let bombsWithFlags = 40;
let flagsCounter = 40;
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
  smile: "0 -24px",
  sad: "-108px -24px",
  glasses: "-82px -24px",
  scary: "-54px -24px",
  clicked: "-28px -24px",
};

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
        i < width * width - 1 &&
        !isRightEdge &&
        arrayWithBombs[i + 1] === "bomb"
      )
        total++;
      if (
        i < width * width - width + 1 &&
        !isLeftEdge &&
        arrayWithBombs[i - 1 + width] === "bomb"
      )
        total++;
      if (
        i < width * width - width - 1 &&
        !isRightEdge &&
        arrayWithBombs[i + 1 + width] === "bomb"
      )
        total++;
      if (i < width * width - width && arrayWithBombs[i + width] === "bomb")
        total++;
      arrayWithBombs[i] = total;
    }
  }
  cells = Array.from(document.querySelectorAll(".field__button"));
}

// functions for mousedown events
field.addEventListener("mousedown", (e) => {
  if (isGameOver) return;
  smile.style.backgroundPosition = smilesIcons.scary;
  e.target.style.backgroundPosition = anotherIcons.empty;
});

field.addEventListener("mouseup", (e) => {
  if (isGameOver) return;
  smile.style.backgroundPosition = smilesIcons.smile;
});

smile.addEventListener("mousedown", () => {
  smile.style.backgroundPosition = smilesIcons.clicked;
});

//function to start game

field.addEventListener("click", (e) => {
  if (isGameOver) return;
  if (timer === 0) {
    startTimer();
  }
  const currentTargetIndex = cells.indexOf(e.target);
  renderCell(currentTargetIndex);
});

function renderCell(currentTargetIndex) {
  if (cells[currentTargetIndex].classList.contains("checked")) return;
  if (typeof arrayWithBombs[currentTargetIndex] === "number") {
    cells[currentTargetIndex].classList.add("checked");
    if (arrayWithBombs[currentTargetIndex] !== 0) {
      cells[currentTargetIndex].style.backgroundPosition =
        numbersFieldArray[arrayWithBombs[currentTargetIndex]];
    } else {
      cells[currentTargetIndex].style.backgroundPosition =
        numbersFieldArray[arrayWithBombs[currentTargetIndex]];
      checkCell(currentTargetIndex);
    }
  } else {
    cells[currentTargetIndex].style.backgroundPosition = anotherIcons.redBomb;
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
    smile.style.backgroundPosition = smilesIcons.sad;
    isGameOver = true;
  }
}

//function to contextmenu click
field.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.style.backgroundPosition === anotherIcons.flag) {
    bombsCount(+1);
    e.target.style.backgroundPosition = anotherIcons.question;
    e.target.disabled = true;
  } else if (e.target.style.backgroundPosition === anotherIcons.question) {
    e.target.style.backgroundPosition = anotherIcons.closed;
    e.target.disabled = false;
  } else {
    e.target.style.backgroundPosition = anotherIcons.flag;
    bombsCount(-1);
    e.target.disabled = true;
  }
  matchBombs();
});

// setup game
smile.addEventListener("click", setupGame);
function setupGame() {
  createResultArray();
  bombsWithFlags = 40;
  isGameOver = false;
  timer = 0;
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundPosition = anotherIcons.closed;
    cells[i].classList.remove("checked");
  }
  smile.style.backgroundPosition = smilesIcons.smile;

  secondBombNumber.style.backgroundPosition = numbersTimerPositionArray[4];
  thirdBombNumber.style.backgroundPosition = numbersTimerPositionArray[0];
  
  firstInputNumber.style.backgroundPosition = numbersTimerPositionArray[0];
  secondInputNumber.style.backgroundPosition = numbersTimerPositionArray[0];
  thirdInputNumber.style.backgroundPosition = numbersTimerPositionArray[0];
}

// timer function
function startTimer() {
  const timerInterval = setInterval(() => {
    timer++;
    if (timer >= 1000 || isGameOver === true) {
      clearInterval(timerInterval);
    }
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
    }
  }, 1000);
}

// bombs counter function
function bombsCount(number) {
  bombsWithFlags += number;

  if (bombsWithFlags < 0) return;
  if (bombsWithFlags >= 10) {
    document.querySelector(".heading__second-number").style.backgroundPosition =
      numbersTimerPositionArray[Math.floor(bombsWithFlags / 10)];
    document.querySelector(".heading__third-number").style.backgroundPosition =
      numbersTimerPositionArray[bombsWithFlags % 10];
  } else {
    document.querySelector(".heading__second-number").style.backgroundPosition =
      numbersTimerPositionArray[0];
    document.querySelector(".heading__third-number").style.backgroundPosition =
      numbersTimerPositionArray[bombsWithFlags];
  }
}

//checking cells around
function checkCell(currentIndex) {
  const isLeftEdge = currentIndex % width === 0;
  const isRightEdge = currentIndex % width === width - 1;

  setTimeout(() => {
    if (currentIndex > 0 && !isLeftEdge) {
      const newIndex = parseInt(currentIndex) - 1;
      renderCell(newIndex);
    }
    if (currentIndex > width - 1 && !isRightEdge) {
      const newIndex = parseInt(currentIndex) + 1 - width;
      renderCell(newIndex);
    }
    if (currentIndex > width) {
      const newIndex = parseInt(currentIndex - width);
      renderCell(newIndex);
    }
    if (currentIndex > width + 1 && !isLeftEdge) {
      const newIndex = parseInt(currentIndex) - 1 - width;
      renderCell(newIndex);
    }
    if (currentIndex < width * width - 1 && !isRightEdge) {
      const newIndex = parseInt(currentIndex) + 1;
      renderCell(newIndex);
    }
    if (currentIndex < width * width - width + 1 && !isLeftEdge) {
      const newIndex = parseInt(currentIndex) - 1 + width;
      renderCell(newIndex);
    }
    if (currentIndex < width * width - width - 1 && !isRightEdge) {
      const newIndex = parseInt(currentIndex) + 1 + width;
      renderCell(newIndex);
    }
    if (currentIndex < width * width - width) {
      const newIndex = parseInt(currentIndex) + width;
      renderCell(newIndex);
    }
  }, 10);
}


// check matches bombs with flags
function matchBombs() {
  let matches = 0;
  for (let i = 0; i < arrayWithBombs.length; i++) {
    if (
      cells[i].style.backgroundPosition === anotherIcons.flag &&
      arrayWithBombs[i] === "bomb"
    ) {
      matches++;
    }
    if (matches === bombsAmount) {
      smile.style.backgroundPosition = smilesIcons.glasses
      isGameOver = true;
    }
  }
}
