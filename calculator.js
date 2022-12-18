let display = document.getElementById("display"),
  number = document.querySelectorAll(".numbers button"),
  operator = document.querySelectorAll(".operators button"),
  equal = document.getElementById("equal"),
  clear = document.getElementById("clear"),
  operands = document.querySelectorAll(".operands button"),
  displayedResult = false;

const manageNumbers = (lastCh, e) => {
  if (displayedResult === false) {
    display.innerHTML += e.target.innerHTML;
  } else if (
    (displayedResult === true && lastCh === "+") ||
    lastCh === "-" ||
    lastCh === "×" ||
    lastCh === "÷"
  ) {
    displayedResult = false;
    display.innerHTML += e.target.innerHTML;
  } else {
    displayedResult = true;
    display.innerHTML = "";
    display.innerHTML += e.target.innerHTML;
  }
};

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    let operationChain = display.innerHTML;
    let lastChar = operationChain[operationChain.length - 1];

    manageNumbers(lastChar, e);
  });
}

const manageOperators = (string, lastCh, e) => {
  if (lastCh === "+" || lastCh === "-" || lastCh === "×" || lastCh === "÷") {
    let newChain = string.substring(0, string.length - 1) + e.target.innerHTML;
    display.innerHTML = newChain;
  } else if (string.length === 0) {
    console.log("need number first");
  } else {
    display.innerHTML += e.target.innerHTML;
  }
};

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    let operationChain = display.innerHTML;
    let lastChar = operationChain[operationChain.length - 1];

    manageOperators(operationChain, lastChar, e);
  });
}

const manageOperands = (operationChain, lastChar, e) => {
  if ((operationChain.length === 1 && lastChar === "0") || lastChar === ".") {
    display.innerHTML = e.target.innerHTML;
  } else if (
    operationChain.length > 1 &&
    lastChar === "." &&
    e.target.innerHTML === "."
  ) {
    console.log("DO NOTHING");
  } else if (
    operationChain.length > 1 &&
    lastChar === "." &&
    e.target.innerHTML === "0"
  ) {
    display.innerHTML += e.target.innerHTML;
  } else {
    display.innerHTML += e.target.innerHTML;
  }
};

for (let i = 0; i < operands.length; i++) {
  operands[i].addEventListener("click", function (e) {
    let operationChain = display.innerHTML;
    let lastChar = operationChain[operationChain.length - 1];

    manageOperands(operationChain, lastChar, e);
  });
}

const limitDecimals = (number) => +parseFloat(number.toFixed(4));

ADD = (a, b) => limitDecimals(a + b);
SUBTRACT = (a, b) => limitDecimals(a - b);
MULTIPLY = (a, b) => limitDecimals(a * b);
DIVIDE = (a, b) => limitDecimals(a / b);

const checkIfDivision = (divide, numbers, operators) => {
  while (divide != -1) {
    numbers.splice(divide, 2, DIVIDE(numbers[divide], numbers[divide + 1]));
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
};

const checkIfMultiply = (times, numbers, operators) => {
  while (times !== -1) {
    numbers.splice(times, 2, MULTIPLY(numbers[times], numbers[times + 1]));
    operators.splice(times, 1);
    times = operators.indexOf("×");
  }
};

const checkIfSubtraction = (subtract, numbers, operators) => {
  while (subtract != -1) {
    numbers.splice(
      subtract,
      2,
      SUBTRACT(numbers[subtract], numbers[subtract + 1])
    );
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }
};

const checkIfAddition = (add, numbers, operators) => {
  while (add != -1) {
    numbers.splice(
      add,
      2,
      ADD(parseFloat(numbers[add]), parseFloat(numbers[add + 1]))
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }
};

// 'equal' button functionality
equal.addEventListener("click", function () {
  let storedInput = display.innerHTML;
  let numbers = storedInput.split(/\+|\-|\×|\÷/g);
  let operators = storedInput.replace(/[0-9]|\./g, "").split("");

  // last element in the array =  output
  let divide = operators.indexOf("÷");
  checkIfDivision(divide, numbers, operators);

  let times = operators.indexOf("×");
  checkIfMultiply(times, numbers, operators);

  let subtract = operators.indexOf("-");
  checkIfSubtraction(subtract, numbers, operators);

  let add = operators.indexOf("+");
  checkIfAddition(add, numbers, operators);

  display.innerHTML = numbers[0];
  resultDisplayed = true;
});

clear.addEventListener("click", function clear() {
  display.innerHTML = "";
});
