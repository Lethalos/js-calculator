window.addEventListener("keydown", (event) => {
  const numRegex = /[0-9]/;
  const operatorRegex = /[+\-*\/]/;

  if (numRegex.test(event.key)) {
    displayNumber(event);
  } else if (operatorRegex.test(event.key)) {
    displayResult();
    setOperator(event);
    setOperatorColor(event);
  } else if (event.key == "Enter") {
    displayResult();
  } else if (event.key == "." || event.key == ",") {
    displayFloatingPoint();
  } else if (event.key == "Escape") {
    clearCalculator();
  } else if (event.key == "Backspace") {
    displayBackspace();
  }
});

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  num1 = Number(num1);
  num2 = Number(num2);

  if (operator == "+") {
    return add(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "*") {
    return multiply(num1, num2);
  } else if (operator == "/") {
    return divide(num1, num2);
  }
};

const digitDivs = document.querySelectorAll(".digit");
const operatorDivs = document.querySelectorAll(".operator");
const resultDiv = document.querySelector(".result");
const equalBtn = document.querySelector(".equal");
const floatBtn = document.querySelector(".floating-point");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");

resultDiv.innerText = "0";
let num1 = resultDiv.innerText;
let num2 = "";
let operator = "";
let isOperatorSelected = false;
let newNumberFlag = false;
let isReachMaxNumLimit = false;

const updateNumber = (isOperatorSelected) => {
  if (isOperatorSelected == false) {
    num1 = resultDiv.innerText;
  } else {
    num2 = resultDiv.innerText;
  }
};

const displayNumber = (event) => {
  if (isReachMaxNumLimit == true && newNumberFlag == false) {
    return;
  }

  let numberToDisplayed;
  if (event.type == "keydown") {
    numberToDisplayed = event.key;
  } else {
    numberToDisplayed = event.target.innerText;
  }

  if (
    (resultDiv.innerText == 0 && resultDiv.innerText.length == 1) ||
    newNumberFlag == true
  ) {
    resultDiv.innerText = numberToDisplayed;
    newNumberFlag = false;
  } else {
    resultDiv.innerText += numberToDisplayed;
  }

  updateNumber(isOperatorSelected);

  if (resultDiv.innerText.length > 20) {
    isReachMaxNumLimit = true;
  } else {
    isReachMaxNumLimit = false;
  }
};

digitDivs.forEach((digitDiv) => {
  digitDiv.addEventListener("click", displayNumber);
});

const setOperator = (event) => {
  if (event.type == "keydown") {
    operator = event.key;
  } else {
    operator = event.target.getAttribute("data-operator");
  }
  isOperatorSelected = true;
  newNumberFlag = true;
};

const setOperatorColor = (event) => {
  operatorDivs.forEach(
    (operatorDiv) => (operatorDiv.style.backgroundColor = "#8b3e8c")
  );

  if (event != undefined && event.type != "keydown") {
    event.currentTarget.style.backgroundColor = "#611863";
  }
};

operatorDivs.forEach((operatorDiv) => {
  operatorDiv.addEventListener("click", (event) => {
    displayResult();
    setOperator(event);
    setOperatorColor(event);
  });
});

const displayResult = () => {
  if (isOperatorSelected && num1 != "" && num2 != "") {
    let resultNumber = parseFloat(
      operate(operator, num1, num2).toFixed(6)
    ).toString();
    resultDiv.innerText = resultNumber;
    num1 = resultDiv.innerText;
    num2 = "";
    newNumberFlag = true;
    operator = "";
    isOperatorSelected = false;
    setOperatorColor();
    isReachMaxNumLimit = false;
  }
};

equalBtn.addEventListener("click", displayResult);

const displayFloatingPoint = () => {
  if (isReachMaxNumLimit == true) {
    return;
  }

  if (newNumberFlag == true) {
    resultDiv.innerText = "0.";
    newNumberFlag = false;
    return;
  }

  if (/\./.test(resultDiv.innerText)) {
    return;
  }

  resultDiv.innerText += ".";

  if (resultDiv.innerText.length > 20) {
    isReachMaxNumLimit = true;
  } else {
    isReachMaxNumLimit = false;
  }
};

floatBtn.addEventListener("click", displayFloatingPoint);

const clearCalculator = () => {
  resultDiv.innerText = "0";
  num1 = resultDiv.innerText;
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  newNumberFlag = false;
  setOperatorColor();
  isReachMaxNumLimit = false;
};

clearBtn.addEventListener("click", clearCalculator);

const displayBackspace = () => {
  if (resultDiv.innerText.length == 1) {
    resultDiv.innerText = 0;
    updateNumber(isOperatorSelected);
    return;
  }

  if (resultDiv.innerText[resultDiv.innerText.length - 2] == ".") {
    resultDiv.innerText = resultDiv.innerText.slice(0, -2);
    updateNumber(isOperatorSelected);
    return;
  }

  resultDiv.innerText = resultDiv.innerText.slice(0, -1);
  updateNumber(isOperatorSelected);
  isReachMaxNumLimit = false;
};

backspaceBtn.addEventListener("click", displayBackspace);
