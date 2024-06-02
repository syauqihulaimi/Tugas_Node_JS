// Import modul fs untuk mengakses file sistem dari Node.js
import * as fs from "node:fs";

// Import modul chalk untuk memberikan warna pada teks yang ditampilkan di konsol
import chalk from "chalk";

// Import modul validator untuk melakukan validasi format surel dan nomor telepon
import validator from "validator";

// Cek apakah direktori "data" sudah ada, jika tidak, maka buat direktori baru
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Tentukan jalur file untuk menyimpan data kontak, jika file tidak ada, maka buat file baru
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Fungsi untuk memuat data kontak dari file
export const muatKontak = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// Fungsi untuk menyimpan kontak baru
export const simpanKontak = (nama, email, noTelp) => {
  const contacts = muatKontak();
  const contact = { nama, email, noTelp };

  // Cek apakah ada duplikat kontak berdasarkan nama
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.redBright.bold("Kontak sudah terdaftar, masukkan data lain")
    );
    return false;
  }

  // Validasi surel jika diisi
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.redBright.bold.inverse("Alamat email tidak valid"));
      return false;
    }
  }

  // Validasi nomor telepon jika diisi
  if (noTelp) {
    if (!validator.isMobilePhone(noTelp, "id-ID")) {
      console.log(chalk.redBright.bold.inverse("Nomor telepon tidak valid"));
      return false;
    }
  }

  // Tambahkan kontak baru ke dalam array dan tulis kembali ke file
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8");

  // Konfirmasi penyimpanan kontak
  console.log(chalk.green.bold.inverse("Data sudah dicatat, terima kasih!"));
};

// Fungsi untuk menampilkan daftar kontak
export const daftarKontak = () => {
  const contacts = muatKontak();
  console.log(chalk.green.bold("Daftar kontak : "));
  contacts.forEach((contact, i) => {
    console.log(
      `${i + 1}. ${contact.nama}: ${contact.email} - ${contact.noTelp}`
    );
  });
};

// Fungsi untuk menampilkan detail kontak berdasarkan nama
export const detailKontak = (nama) => {
  const contacts = muatKontak();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse(`Kontak ${nama} tidak ditemukan!`));
    return false;
  } else {
    // Tampilkan detail kontak dengan menggunakan modul chalk untuk memberikan warna pada teks
    const dataKontak = `
    ${chalk.blue.bold("Nama")}  : ${contact.nama}
    ${chalk.yellow.bold("email")} : ${contact.surel}
    ${chalk.cyan.bold("No.Telp")} : ${contact.noTelp}
    `;
    console.log(chalk.green.bold("  Detail kontak : "));
    console.log(dataKontak);
    return true;
  }
};

// Fungsi untuk menghapus kontak berdasarkan nama
export const hapusKontak = (nama) => {
  const contacts = muatKontak();
  // Filter kontak yang akan dihapus berdasarkan nama
  const filteredContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  // Jika jumlah kontak tidak berubah setelah penghapusan, tampilkan pesan error
  if (contacts.length === filteredContacts.length) {
    console.log(chalk.red.inverse(`Kontak ${nama} tidak ditemukan!`));
    return false;
  } else {
    // Jika kontak berhasil dihapus, tulis kembali ke file dan tampilkan pesan konfirmasi
    fs.writeFileSync(
      "data/contacts.json",
      JSON.stringify(filteredContacts),
      "utf-8"
    );
    console.log(
      chalk.blueBright.bold.inverse(`Kontak ${nama} berhasil dihapus!`)
    );
  }
};