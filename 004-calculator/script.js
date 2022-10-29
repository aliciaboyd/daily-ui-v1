// calculator class construction

class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }


  clear() {
    this.currentText = "";
    this.previousText = "";
    this.operation = undefined;
  }

  delete() {
    this.currentText = this.currentText.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentText.includes(".")) {
      return;
    } else if (number === "(" && this.currentText.slice(-1) === "(") {
      return;
    } else if (number === ")" && !this.currentText.includes("(")) {
      return;
    } else if (number === ")" && this.currentText.slice(-1) === ")") 
    return;
    this.currentText = this.currentText.toString() + number.toString();
  }

  chooseOperation(operation) {

    if (this.currentText === '') return;
    if (this.previousText !== '') {
      this.compute()
    };
    this.operation = operation;
    this.previousText = this.currentText;
    this.currentText = '';

  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousText);
    const current = parseFloat(this.currentText);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current
        break

      case "×":
        computation = prev * current
        break
      
      case "÷":
        computation = prev / current
        break
      
      case "-":
        computation = prev - current
        break

      default:
        return
      };

    this.currentText = computation;
    this.operation = undefined;
    this.previousText = "";
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.currentText;
    this.previousTextElement.innerText = this.previousText;

    if (this.operation != null) {
      this.previousTextElement.innerText =
      `${this.previousText} ${this.operation}`
    }
  }

}


const inputButtons = document.querySelectorAll("[data-input]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear");
const delButton = document.querySelector("[data-delete");
const equalsButton = document.querySelector("[data-equals]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");



const calc = new Calculator(previousTextElement, currentTextElement);


inputButtons.forEach(button => {
  button.addEventListener("click", () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  })
});


operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calc.chooseOperation(button.innerText);
    calc.updateDisplay();
  })
});


equalsButton.addEventListener("click", () => {
  calc.compute();
  calc.updateDisplay();
})


clearButton.addEventListener('click', button => {
  calc.clear()
  calc.updateDisplay()
})

delButton.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay()
})