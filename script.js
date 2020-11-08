class Calculator{

    constructor(prevTextElement, currTextElement){
        this.previousTextElement = prevTextElement;
        this.currentTextElement = currTextElement;
        this.clear();
    }

    clear(){
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    appendNumber(number){
        if (number === "." && this.currentOperand.includes(".") == true) return
        this.currentOperand += number;
    }

    delete(){
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length -1);
    }

    updateDisplay(){
        this.previousTextElement.innerText = this.previousOperand + (this.operation == undefined ? "" : " " + this.operation);
        this.currentTextElement.innerText = this.currentOperand;
    }

    compute(operator){
        if (this.currentOperand == "") {
            this.operation = operator;
            return
        }

        if (this.operation == undefined){
            this.operation = operator;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";
        } else {
            switch(this.operation){
                case "+":
                    this.previousOperand =  Number(this.previousOperand) + Number(this.currentOperand)
                    this.currentOperand = "";
                    this.operation = operator;
                    break
                case "-":
                   
                    this.previousOperand =  Number(this.previousOperand) - Number(this.currentOperand)
                    this.currentOperand = "";
                    this.operation = operator;
                    break

                case "÷":
                   
                    this.previousOperand =  Number(this.previousOperand) / Number(this.currentOperand)
                    this.currentOperand = "";
                    this.operation = operator;
                    break

                case "*":
                   
                    this.previousOperand =  Number(this.previousOperand) * Number(this.currentOperand)
                    this.currentOperand = "";
                    this.operation = operator;
                    break

            }

        }
    }

}


let numbers = document.querySelectorAll("[data-number]");
let operators = document.querySelectorAll("[data-operation]");
let equalsButton = document.querySelector('[data-equals]');
let deleteButton = document.querySelector('[data-delete]');
let allClearButton = document.querySelector('[data-all-clear]');
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})


allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        calculator.compute(operator.innerText);
        calculator.updateDisplay();
    })
})