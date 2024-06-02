// Fungsi dalam JS
function cetakNama(nama) {
    return `Hai, saya ${nama}`;
  }
  
  // Nilai statis
  const PI = 3.14;
  
  // Objek dalam JS
  const mahasiswa = {
    nama : 'Ahmad syauqi hulaimi',
    umur : 20,
    cetakMhs() {
      return `Hai, nama saya ${this.nama}, berusia ${this.umur} tahun.`;
    }
  }
  
  // Class dalam JS
  class Orang {
    constructor() {
      console.log("Objek orang telah diinstansiasi");
    }
  }
  
  // Ekspor fungsi, nilai, objek, dan class ke dokumen lain dengan fungsi module.exports
  
  /* Cara untuk ekspor satu persatu
  module.exports.cetakNama = cetakNama;
  module.exports.PI = PI;
  module.exports.mahasiswa = mahasiswa;
  module.exports.Orang = Orang;
  */
  
  // Cara ringkas dengan menggunakan notasi objek ES6
  module.exports = {
    cetakNama,
    PI,
    mahasiswa,
    Orang,
  }