
const resultEle = document.getElementById('result');
const clipboardEle = document.getElementById('clipboard');
const lengthEle = document.getElementById('length');
const generateEle = document.getElementById('generate');
const lowercaseEle = document.getElementById('lowercase');
const uppercaseEle = document.getElementById('uppercase');
const numbersEle = document.getElementById('numbers');
const symbolsEle = document.getElementById('symbols');

// From here functions (for the values) will be invoked
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function getRandomLower() {
    const x = Math.floor(Math.random() * 26);
    return String.fromCharCode(x + 97);
}

function getRandomUpper() {
    const x = Math.floor(Math.random() * 26);
    return String.fromCharCode(x + 65);
}

function getRandomNumber() {
    const x = Math.floor(Math.random() * 10);
    return String.fromCharCode(x + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=/,.<>';
    const size = symbols.length;
    const x = Math.floor(Math.random() * size);
    return symbols[x];
}

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());

// When clicked on generate Button
generateEle.addEventListener('click', () => {
    const length = parseInt(lengthEle.value);
    const isLower = lowercaseEle.checked;
    const isUpper = uppercaseEle.checked;
    const isNumber = numbersEle.checked;
    const isSymbol = symbolsEle.checked;

    resultEle.innerText = generatePassword(isLower, isUpper, isNumber, isSymbol, length);
})

// When you want to copy
clipboardEle.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEle.innerText;

    if(!password) {return}

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Copied !');

})


function generatePassword(lower, upper, number, symbol, length) {
    let currentPassword = '';
    // how many of check is clicked ? 
    const typesCount = lower + upper + number + symbol;

    // If nothing is checked 
    if(typesCount === 0) {
        return '';
    }

    // Only getting the true value in our "arr" array..
    // Enumerable properties are those properties whose internal enumerable flag is set to true
    // Object.values() returns enumerable property values of a simple array or an array like object..
    const arr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    for(let i = 0; i < length; i += typesCount) {
        arr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // Calls the function : randomFunc and passes the index, and () for further function call.
            currentPassword += randomFunc[funcName]();
        })
    }

    // The length we wanted in our final password..
    const finalPassword = currentPassword.slice(0, length);
    return finalPassword;
}

















































