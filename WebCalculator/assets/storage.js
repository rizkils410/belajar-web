// key untuk mengakses dan menyimpan data pada local storage
const CACHE_KEY = "calculation_history";

//fungsi checkforstorage dengan mengembalikan nilai boolean dari pengecekan fitur storage pada browser
function checkforStorage () {
    return typeof(Storage) !== "undefined";
}

// fungsi untuk menyimpan data riwayat kalkulasi pada local storage
function putHistory(data){
    if (checkforStorage()) {
        let historyData = null ;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); // digunakan untuk mengubah nilai objek kedalam bentuk string kembali pada benjtuk object javascript
        }

        historyData.unshift(data); //unshift fungsi untuk menambah nilai baru pada array pada awal index

        if (historyData.length > 5) {
            historyData.pop(); // pop fungsi untuk menghapus nilai index terakhir pada array
        }


        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); // mengubah objek javascript ke dalam bentuk string karena local storage hanya menyimpan data primitf seperti string
    }
}

// fungsi untuk mendapatkan data dari local storage
function showHistory () {
    if (checkforStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}
// fungsi untuk merender data riwayat kalkulasi pada tabel html
function renderHistory (){
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus kontek HTML pada elemen history list agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData){
        let row = document.createElement('tr');
        row.innerHTML = "<td>"  + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}
renderHistory();