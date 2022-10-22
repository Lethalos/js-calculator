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

const updateNumber = (isOperatorSelected) => {
  if (isOperatorSelected == false) {
    num1 = resultDiv.innerText;
  } else {
    num2 = resultDiv.innerText;
  }
};

const displayNumber = (event) => {
  const result = resultDiv.innerText;

  if ((result == 0 && result.length == 1) || newNumberFlag == true) {
    resultDiv.innerText = event.target.innerText;
    newNumberFlag = false;
  } else {
    resultDiv.innerText += event.target.innerText;
  }

  updateNumber(isOperatorSelected);
};

digitDivs.forEach((digitDiv) => {
  digitDiv.addEventListener("click", displayNumber);
});

const setOperator = (event) => {
  operator = event.target.getAttribute("data-operator");
  isOperatorSelected = true;
  newNumberFlag = true;
};

const setOperatorColor = (event) => {
  operatorDivs.forEach(
    (operatorDiv) => (operatorDiv.style.backgroundColor = "#8b3e8c")
  );

  if (event != undefined) {
    event.currentTarget.style.backgroundColor = "#611863";
  }
};

operatorDivs.forEach((operatorDiv) => {
  operatorDiv.addEventListener(
    "click",
    (event) => {
      displayResult();
      setOperator(event);
      setOperatorColor(event);
    },
    false
  );
});

const displayResult = () => {
  if (isOperatorSelected && num1 != "" && num2 != "") {
    resultDiv.innerText = parseFloat(operate(operator, num1, num2).toFixed(6));
    num1 = resultDiv.innerText;
    num2 = "";
    newNumberFlag = true;
    operator = "";
    isOperatorSelected = false;
    setOperatorColor();
  }
};

equalBtn.addEventListener("click", displayResult);

const clearCalculator = () => {
  resultDiv.innerText = "0";
  num1 = resultDiv.innerText;
  num2 = "";
  operator = "";
  isOperatorSelected = false;
  newNumberFlag = false;
  setOperatorColor();
};

clearBtn.addEventListener("click", clearCalculator);

const displayFloatingPoint = () => {
  if (newNumberFlag == true) {
    resultDiv.innerText = "0.";
    newNumberFlag = false;
    return;
  }

  if (/\./.test(resultDiv.innerText)) {
    return;
  }

  resultDiv.innerText += ".";
};

floatBtn.addEventListener("click", displayFloatingPoint);

backspaceBtn.addEventListener("click", () => {
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
});
