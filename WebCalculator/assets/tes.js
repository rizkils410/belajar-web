
    x = 9;       // ini akan dianggap error karena variabel belum dideklarasikan
    showAngka();   // ini akan dianggap error karena function belum dideklarasikan
     
    function showAngka() {
      var x = 9;
      alert(x);
    }