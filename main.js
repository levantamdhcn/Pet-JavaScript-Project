"use strict";
// Khi ký tự cuối cùng của input đang là 1 operator,
// người dùng tiếp tục nhập 1 operator thì thay thế ký tự đó bằng operator mới

const input = document.querySelector('.input')
const numbers = document.querySelectorAll('.number')
const clearButton = document.getElementById('clear-btn')
const operators = document.querySelectorAll('.calculation')
const resultBtn = document.querySelector('.result')
const ce = document.querySelector('.clear-last-btn')
var isResultDisplay = false
Array.from(operators).forEach((operator) => {
    operator.onclick = (e) => {
        var currentString = input.innerText
        var lastChar = currentString[currentString.length - 1]
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0,currentString.length - 1) + e.target.innerHTML
            input.innerHTML = newString
            console.log(lastChar)
        }
        else if (currentString == ''){
            input.innerHTML = ''
        }
        else {
            input.innerHTML += e.target.innerHTML
        }
    }
})

Array.from(numbers).forEach((number,index) => {
    number.onclick = (e) => {
        var currentString = input.innerHTML
        var lastChar = currentString[currentString.length - 1]
        if (isResultDisplay === true) {
            isResultDisplay = false
            input.innerHTML = ''
            input.innerHTML += e.target.innerHTML
        }
        else if (isResultDisplay == true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
            isResultDisplay == false 
            input.innerHTML += e.target.innerHTML
        }
        else {
            input.innerHTML += e.target.innerHTML
        }

    }
})

resultBtn.onclick = () => {

    let inputString = input.innerHTML
    // input.innerHTML = eval(String(input.innerHTML))
    // isResultDisplay = true
    let numbers = inputString.split(/\+|\-|\×|\÷/g)
    let operators = inputString.replace(/[0-9]|\./g,"").split("")

    var divide = operators.indexOf('÷')
    while(divide != -1) {
        numbers.splice(divide,2,numbers[divide]/numbers[divide+1])
        operators.splice(divide,1)
        divide = operators.indexOf('÷')
    }

    var multiple = operators.indexOf('×')
    while(multiple != -1) {
        numbers.splice(multiple,2,numbers[multiple]*numbers[multiple+1])
        operators.splice(multiple,1)
        multiple = operators.indexOf('/')
    }

    var substract = operators.indexOf('-')
    while(substract != -1) {
        numbers.splice(substract,2,numbers[substract]-numbers[substract+1])
        operators.splice(substract,1)
        substract = operators.indexOf('-')
    }

    var add = operators.indexOf('+')
    while(add != -1){
        numbers.splice(add,2,parseFloat(numbers[add])+parseFloat(numbers[add+1]))
        operators.splice(add,1)
        add = operators.indexOf('+')
    }
    
    input.innerHTML = numbers[0]

    isResultDisplay = true
}

ce.onclick = () => {
    var currentString = input.innerHTML
    var newString = currentString.slice(0,input.innerHTML.length-1)
    input.innerHTML = newString
}

clearButton.onclick = () => {
    input.innerHTML = ''
}

