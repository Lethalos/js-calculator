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

let value = 0;
resultDiv.innerText = value;

const checkOperator = (str) => {
  const char = str.split(" ")[1];
  if (isNaN(char) && char != undefined) {
    return true;
  }

  return false;
};

const display = (event) => {
  value = event.target.innerText;

  if (checkOperator(resultDiv.innerText)) {
    resultDiv.innerText += ` ${value}`;
  } else {
    resultDiv.innerText = value;
  }
};

digitDivs.forEach((digit) => {
  digit.addEventListener("click", display);
});

operatorDivs.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (checkOperator(resultDiv.innerText)) {
      return;
    }
    resultDiv.innerText += ` ${event.target.innerText}`;
  });
});

equalBtn.addEventListener("click", () => {
  const temp = resultDiv.innerText.split(" ");
  let num1 = temp[0];
  let num2 = temp[2];
  let operator = temp[1];

  resultDiv.innerText = operate(operator, num1, num2);
});
