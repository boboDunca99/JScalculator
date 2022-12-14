let display = document.getElementById("display");
let number = document.querySelectorAll(".numbers button");
let operator = document.querySelectorAll(".operators button");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let displayedResult = false;

ADD = (a, b) => a + b;
SUBSTRACT = (a, b) => a - b;
MULTIPLY = (a, b) => a * b;
DIVIDE = (a, b) => a / b;

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function populate(e) {
    let operationChain = display.innerHTML;
    let lastChar = operationChain[operationChain.length - 1];

    if (displayedResult === false) {
      display.innerHTML += e.target.innerHTML;
    } else if (
      (displayedResult === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      displayedResult = false;
      display.innerHTML += e.target.innerHTML;
    } else {
      displayedResult = true;
      display.innerHTML = "";
      display.innerHTML += e.target.innerHTML;
    }
  });
}

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function populate(e) {
    let operationChain = display.innerHTML;
    let lastChar = operationChain[operationChain.length - 1];

    // replace operator
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newChain =
        operationChain.substring(0, operationChain.length - 1) +
        e.target.innerHTML;
      display.innerHTML = newChain;
    } else if (operationChain.length === 0) {
      console.log("need number first");
    } else {
      display.innerHTML += e.target.innerHTML;
    }
  });
}

// 'equal' button functionality
equal.addEventListener("click", function () {
  let storedInput = display.innerHTML;

  let numbers = storedInput.split(/\+|\-|\×|\÷/g);
  let operators = storedInput.replace(/[0-9]|\./g, "").split("");

  console.log(storedInput);
  console.log(operators);
  console.log(numbers);

  // last element in the array =  output
  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, DIVIDE(numbers[divide], numbers[divide + 1]));
    operators.splice(divide, 1);
    divide = operators.indexOf("÷"); // divide might = -1;
  }

  let times = operators.indexOf("×");
  while (times !== -1) {
    numbers.splice(times, 2, MULTIPLY(numbers[times], numbers[times + 1]));
    operators.splice(times, 1);
    times = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(
      subtract,
      2,
      SUBSTRACT(numbers[subtract], numbers[subtract + 1])
    );
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(
      add,
      2,
      ADD(parseFloat(numbers[add]), parseFloat(numbers[add + 1]))
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  display.innerHTML = numbers[0]; // displaying the output, last element

  resultDisplayed = true;
});

clear.addEventListener("click", function clear() {
  display.innerHTML = "";
});
