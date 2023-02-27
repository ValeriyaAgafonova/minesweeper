const field = document.querySelector(".field");
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
let timer = 989;
createField(16, 40);

function createField(width, mines) {
  const cellsAmount = width * width;
  field.innerHTML = '<button class="field__button"></button>'.repeat(
    cellsAmount
  );
  const bombs = Array(cellsAmount)
    .fill(0)
    .fill(1, 0, mines - 1)
    .sort(() => Math.random() - 0.5);
  console.log(bombs);
}

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

field.addEventListener("click", (e) => {
  const cells = Array.from(document.querySelectorAll(".field__button"));
  const currentTargetIndex = cells.indexOf(e.target);
  startTimer();
});

field.addEventListener("contextmenu", (e) => {
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
