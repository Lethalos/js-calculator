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

resultDiv.innerText = "0";
let num1 = "";
let num2 = "";
let operator = "";
let isOperatorSelected = false;
let num2Flag = false;

const displayNumber = (event) => {
  const result = resultDiv.innerText;
  console.log(result);

  if (result == 0 || num2Flag == true) {
    resultDiv.innerText = event.target.innerText;
    num2Flag = false;
  } else {
    resultDiv.innerText += event.target.innerText;
  }

  if (isOperatorSelected == false) {
    num1 = resultDiv.innerText;
  } else {
    num2 = resultDiv.innerText;
  }
  console.log("Num1: " + num1 + " Num2: " + num2 + " Operator: " + operator);
};

digitDivs.forEach((digitDiv) => {
  digitDiv.addEventListener("click", displayNumber);
});

const setOperator = (event) => {
  operator = event.target.innerText;
  isOperatorSelected = true;
  num2Flag = true;
};

operatorDivs.forEach((operatorDiv) => {
  operatorDiv.addEventListener("click", (event) => {
    displayResult();
    setOperator(event);
  });
});

const displayResult = () => {
  if (isOperatorSelected && num1 != "" && num2 != "") {
    resultDiv.innerText = operate(operator, num1, num2);
    num1 = resultDiv.innerText;
    num2 = "";
  }
};

equalBtn.addEventListener("click", () => {
  displayResult();
});
