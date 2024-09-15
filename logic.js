
class Calculator{

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

clear(){
    this.currentOperand = '';
    this.previousOperand= '';
    this.operation = undefined;

}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0 , -1)

}

appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

choseOperation(operation){
    if(this.currentOperand === ' ') return;

    if(this.previousOperand !== '' ){
        this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
}

compute(){

    let result 
    const prev = parseFloat(this.previousOperand)
    const curr = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(curr) ) return

    switch(this.operation){
        case '+':
        result = prev+curr;
        break

        case '-':
            result = prev-curr;
            break

        case '÷':
            result = prev/curr;
            break
        case '*':
            result = prev*curr;
            break
             
        default:
            return      
    }

    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
}

getDisplayNumber(number){
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum.split('.')[0])
    const decimalDigits = stringNum.split('.')[1]
    let integerDisplay 
    
    if(isNaN(integerDigits)){
        integerDisplay = ''
    }
    else{
        integerDisplay = integerDigits.toLocaleString('en' , {
            maximumFractionDigits: 0 
        })
    }

    if(decimalDigits != null ){
        return `${integerDisplay}.${decimalDigits}`
    }
    else{
        return integerDisplay
    }
}

updateDisplay(){
    this.currentOperandTextElement.innerText =this.getDisplayNumber( this.currentOperand);
    if(this.operation !=null){
        this.previousOperandTextElement.innerText =`${this.getDisplayNumber( this.previousOperand)} ${this.operation}`
    }
    else{
        this.previousOperandTextElement.innerText = ''
    }

}

}


const numbers= document.querySelectorAll('[data-number]')
const  equals = document.querySelector('[data-equals]')
const  del = document.querySelector('[data-delete]')
const  allClear = document.querySelector('[data-all-clear]')
const previousOperand= document.querySelector('[data-previous-operand]')
const currentOperand= document.querySelector('[data-current-operand]')
const operations = document.querySelectorAll('[data-operation]') 


const calculator = new Calculator(previousOperand , currentOperand);

numbers.forEach(button => {
    button.addEventListener('click', ()=> {

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});


operations.forEach(button => {
    button.addEventListener('click', ()=> {

        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
});


equals.addEventListener('click' ,() => {
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click' ,() => {
    calculator.clear()
    calculator.updateDisplay()
})

del.addEventListener('click' ,() => {
    calculator.delete()
    calculator.updateDisplay()
})


