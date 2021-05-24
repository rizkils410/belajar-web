// Display data kalkulator
const calculator = {
    displayNumber           : '0',  // tempat menyimpan data dan kondisi kalkulator
    operator                : null, // nilai pertama diberi null dahulu karena akan diberikan nilai ketika pengguna melakukan aksi
    firstNumber             : null, // kondisi menunggu pengguna menentukan angka kedua
    waitingForSecondNumber  : false
};

// fungsi umum kalkulator, mengupdate angka dan menghapus
function updateDisplay (){
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber            = `0`;
    calculator.operator                 = null;
    calculator.firstNumber              = null;
    calculator.waitingForSecondNumber   = false;    
}

// fungsi untuk memasukan angka ke nilai displayNumber
function inputDigit(digit){
    if (calculator.displayNumber === `0`) {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
    
}

//Membuat var buttons dengan nilai seluruh elemen button dan memberikan event click tiap elemennya
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
   button.addEventListener('click', function(event) {
 
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        // membuat fungsi clear
        if (target.classList.contains(`clear`)){
            clearCalculator();
            updateDisplay();
            return;
        }
        // membuat fungsi negative,operator dan equals (=)
        if (target.classList.contains(`negative`)) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if (target.classList.contains(`equals`)) {
            performCalculation();
            updateDisplay();
            return;
        }
        if (target.classList.contains(`operator`)) {
            handleOperator(target.innerText);
            return;
        }
       inputDigit(target.innerText);
       updateDisplay()
   });
}

// inversenumber 
function inverseNumber() {
    if (calculator.displayNumber === `0`){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// fungsi  operator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number agar tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = `0`;
    } else {
        alert (`Operator sudah ditetapkan`)
    }
}

// fungsi melakukan kalkulasi terhadap nilai yg ada di objek kalkulator
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null){
        alert ("Anda belum menetapkan Operator");
        return;
    }
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);    
    }else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }


// objek data history yang akan dikirimkan sebagain fungsi put history()
    const history = {
        firstNumber : calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator    : calculator.operator,
        result      : result
    }
    putHistory(history);
    calculator.displayNumber = result ;
    renderHistory();
}