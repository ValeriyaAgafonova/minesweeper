const field = document.querySelector(".field");

createField(16, 40);

function createField(width, mines) {
  const cellsAmount = width * width;
  field.innerHTML = '<button class="field__button"></button>'.repeat(
    cellsAmount
  );
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
