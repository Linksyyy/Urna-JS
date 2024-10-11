const candidatos = fetchData().then(data => data);
const errorMessage = document.querySelector('.error');
let counter = 1;
let qntDisplays = 5;

setDisplays(qntDisplays);
console.log()

async function fetchData() {
  let candidatos = (await fetch('candidatos.json')).json();
  return candidatos;
}

document.addEventListener("click", (e) => {
  let el = e.target;

  if (el.classList.contains("btn-num")) {
    try {
      showOnDisplay(el.innerText, counter);
    } catch (err) {
      errorMessage.innerText = 'CAMPOS JÁ PREENCHIDOS';
    }
    counter++;
  }
  if (el.classList.contains("corrige")) {
    errorMessage.innerText = '';
    for (let i = 1; i <= qntDisplays; i++) {
      showOnDisplay('', i);
    }
    counter = 1;
  }
  if (el.classList.contains("confirma")) {
    if (checkNumberLength()) {

    } else {
      errorMessage.innerText = 'CAMPOS NAO FORAM COMPLETAMENTE PREENCHIDOS'
    }
  }
});


function showOnDisplay(num, selector) {
  let display = document.querySelector(`.input${selector}`).querySelector('h1');
  display.innerText = num;
}

function setDisplays(qntd) {
  for (let i = 1; i <= qntd; i++) {
    let elPai = document.querySelector('.selecao');
    let newh1 = document.createElement('h1');
    let newDiv = document.createElement('div');

    newDiv.classList.add(`input${i}`);
    newDiv.classList.add('numeroIn');
    newDiv.appendChild(newh1);
    elPai.appendChild(newDiv);
  }
}

function getNumbersOnDisplay() {
  let numbers = new String();

  for (let i = 3; i <= qntDisplays + 2; i++) {
    numbers += document.querySelector('.selecao').childNodes[i].childNodes[0].innerText;
  }

  return numbers;
}

function checkNumberLength() {
  return getNumbersOnDisplay().length === qntDisplays;
}