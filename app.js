const word = document.getElementById("word-input");
const formatted = document.getElementById("formatted-input");
const btnFormatted = document.getElementById("button-input");
const btnCopy = document.getElementById("btn-copy");
let time = null;

function camelCaseToSnakeUpperCase(texto) {
  const regexExclui = new RegExp(/[\d\A-Z\W]/g);
  const regexIncluso = new RegExp(/[^$^_^A-Z^\d^a-z]/g);
  const regexEspace = new RegExp(/_{2,}/g);

  let snakeCase = texto
    .normalize("NFD")
    .replace(regexExclui, "_$&")
    .replace(regexIncluso, "")
    .replace(regexEspace, "_");
  if (snakeCase.indexOf("_") === 0) {
    snakeCase = snakeCase.substring(1);
  }
  if (snakeCase.lastIndexOf("_") === snakeCase.length - 1) {
    snakeCase = snakeCase.substring(0, snakeCase.length - 1);
  }
  snakeCase = snakeCase.toUpperCase();
  return snakeCase;
}

function changeResultInputValue(text) {
  formatted.value = camelCaseToSnakeUpperCase(text.value);
}

// Evento ao acionar botão Formatar
btnFormatted.addEventListener("click", () => {
  changeResultInputValue(word);
});

// Evento ao acionar botão Copiar
btnCopy.addEventListener("click", () => {
  formatted.select();
  document.execCommand("copy");
});

// Evento ao se passar 2 segundos sem escrever
word.addEventListener("keyup", () => {
  clearTimeout(time);
  time = setTimeout(() => {
    changeResultInputValue(word);
  }, 2000);
});
