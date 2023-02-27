const field = document.querySelector(".field");

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

field.addEventListener("mousedown", () => {
  document
    .querySelector(".heading__smile")
    .classList.add("heading__smile_scary");
});

field.addEventListener("mouseup", () => {
  document
    .querySelector(".heading__smile")
    .classList.remove("heading__smile_scary");
});
