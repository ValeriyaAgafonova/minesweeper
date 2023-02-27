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

field.addEventListener("mousedown", (e) => {
  document
    .querySelector(".heading__smile")
    .classList.add("heading__smile_scary");
    e.target.classList.add('field__button_empty')
});

field.addEventListener("mouseup", (e) => {
  document
    .querySelector(".heading__smile")
    .classList.remove("heading__smile_scary");
    e.target.classList.remove('field__button_empty')
});

field.addEventListener('click', (e) => {
const cells = Array.from(document.querySelectorAll('.field__button'))
const currentTargetIndex = cells.indexOf(e.target)

})

field.addEventListener('contextmenu', (e) => {
    console.log('cont')
    if (e.target.classList.contains('field__button_flag')){
        e.target.classList = 'field__button field__button_question'
    }
    else if (e.target.classList.contains('field__button_question')){
        e.target.classList = 'field__button'
    }
else{
    e.target.classList = 'field__button field__button_flag'
}
})