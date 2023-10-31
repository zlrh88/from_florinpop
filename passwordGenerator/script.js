const passField = document.querySelector(".pw-field");
const passLength = document.querySelector(".form-control #length");
const passUpper = document.querySelector(".form-control #upper");
const passLower = document.querySelector(".form-control #lower");
const passNumber = document.querySelector(".form-control #number");
const passSymbol = document.querySelector(".form-control #symbol");
const btnGenerate = document.querySelector("#generate");
const copyBtn = document.querySelector("#copy");
const resetBtn = document.querySelector("#reset");

const randomNumbers = function () {
  const num = Math.floor(Math.random() * 10);
  return num;
};

const randomUpperLetters = function () {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const letter = Math.floor(Math.random() * 26);

  return alphabet[letter];
};

const randomLowerLetters = function () {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const letter = Math.floor(Math.random() * 26);

  return alphabet[letter].toLocaleLowerCase();
};

const randomSymbols = function () {
  const symbols = [".", ",", "/", "!", "@", "#", "$", "%", "&", "*"];

  const symbol = Math.floor(Math.random() * symbols.length);

  return symbols[symbol];
};

const passGen = function () {
  const length = passLength.value;
  const randomFunction = [];
  let pass = "";
  if (
    !passUpper.checked &&
    !passLower.checked &&
    !passNumber.checked &&
    !passSymbol.checked
  ) {
    randomFunction.push(
      randomUpperLetters,
      randomLowerLetters,
      randomNumbers,
      randomSymbols
    );
  }
  if (passUpper.checked) randomFunction.push(randomUpperLetters);
  if (passLower.checked) randomFunction.push(randomLowerLetters);
  if (passNumber.checked) randomFunction.push(randomNumbers);
  if (passSymbol.checked) randomFunction.push(randomSymbols);

  for (let i = 0; i < length; i++) {
    const num = Math.floor(Math.random() * randomFunction.length);
    const passFunc = randomFunction[num];

    pass += passFunc();
  }
  passField.innerHTML = pass;
};

const copyPass = function () {
  const pass = passField.innerHTML;
  navigator.clipboard.writeText(pass);
};

const resetPass = function () {
  passField.innerHTML = "";
};

btnGenerate.addEventListener("click", passGen);
copyBtn.addEventListener("click", copyPass);
resetBtn.addEventListener("click", resetPass);
