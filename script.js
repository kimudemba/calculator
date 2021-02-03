class Calculator { /* this is setting these text elements to our calculator class */
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
}
clear(){
    this.currentOperand = ' '
    this.previousOperand = ' '
    this.operation = undefined /*since they dont have any operation selected if its clear */
}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1)/* here we are taking the value of the current operand turning it into a string and using the slice function to slice all of the characters from the first (0), all the way to the 2nd to last number (-1) and save it as the currentOperand*/

}

appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return /* this makes it so that if we add a decimal once we cannot add it again, and the return will make it so that the function does not go any further */
    this.currentOperand = this.currentOperand.toString() + number.toString() /* we are changing this to string so that java appends the numbers and doesnt add them. i.e 1+1 = 11 and not 2 */
}

chooseOperation(operation){
    if (this.currentOperand === '') return /*will not let us execute any further */
    if (this.previousOperand !== ''){
        this.compute() /*this makes it so that even if you add another operation after the first one, previous operation gets computed */
    }
 this.operation = operation /* so that our calculator knows which operation to use */
 this.previousOperand = this.currentOperand /* because once we are done with our current operand it gets stored back to the previous operand */
 this.currentOperand = ' ' /* we are essentially just clearing out this value */ 

}

compute(){
    let computation /* result of compute function */
    const prev = parseFloat(this.previousOperand) /* The parseFloat() function parses a string and returns a floating point number. This function determines if the first character in the specified string is a number. If it is, it parses the string until it reaches the end of the number, and returns the number as a number, not as a string.*/
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return /* if previous and current operands ar enot numbers dont execute */
    switch (this.operation){
        case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case '/':
            computation = prev / current
            break
            case '*':
            computation = prev * current
            break
        default: 
        return /* this is so that if an operation other than those listed above then don't compute anything */ 

}
this.currentOperand = computation /* the current operation is equal to the result of the computation */
this.operation = undefined
this.previousOperand = '' /*previous operation clears out */
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      console.log(integerDisplay)
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
}

updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` /*this makes it so that the operation is appended to the previous operand on the display screen */
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

    



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/* this is accessing the number buttons and going through all of them. we add event listener so that whenever the user 'click' we want to do some action */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) /* we want to append the number of whatever is inside that button */
        calculator.updateDisplay() /* this makes it so that the display is updated everytime we click a number */
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) /* <=passing the text of that operation */
        calculator.updateDisplay() 
    })
})

equalsButton.addEventListener('click', button => { /* when we click the equals button the calculator will compute the operation and update the display */
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => { 
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { 
    calculator.delete()
    calculator.updateDisplay()
})




