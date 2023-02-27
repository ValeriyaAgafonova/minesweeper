createField(16, 40)

function createField(width, mines){
const field = document.querySelector('.field')
const cellsAmount = width * width
field.innerHTML ='<button class="field__button"></button>'.repeat(cellsAmount)
}