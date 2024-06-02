// Import modul yargs untuk manajemen argumen dari baris perintah
import yargs from "yargs";

// Import modul hideBin dari yargs/helpers untuk menyembunyikan argumen baris perintah
import { hideBin } from "yargs/helpers";

// Import modul contact dari file "./contacts.js" untuk mengakses fungsi-fungsi terkait kontak
import * as contact from "./contacts.js";

// Konfigurasi yargs dengan argumen yang disembunyikan menggunakan hideBin
yargs(hideBin(process.argv))
  // Perintah untuk menambahkan data kontak
  .command(
    "add",
    "Menambahkan kontak baru",
    {
      nama: {
        describe: "Nama",
        demandOption: true,
        type: "string",
      },
      surel: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noTelp: {
        describe: "Nomor telepon",
        demandOption: true,
        type: "string",
      },
    },
    // Fungsi callback untuk menangani perintah "add" dengan memanggil fungsi simpanKontak dari modul contact
    (argv) => {
      contact.simpanKontak(argv.nama, argv.surel, argv.noTelp);
    }
  )
  // Perintah untuk menampilkan daftar data kontak
  .command(
    "ls",
    "Menampilkan daftar kontak tersimpan",
    // Fungsi callback untuk menangani perintah "ls" dengan memanggil fungsi daftarKontak dari modul contact
    () => {
      contact.daftarKontak();
    }
  )
  // Perintah untuk menampilkan detail salah satu kontak
  .command(
    "detail",
    "Menampilkan detail kontak berdasarkan nama",
    {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    // Fungsi callback untuk menangani perintah "detail" dengan memanggil fungsi detailKontak dari modul contact
    (argv) => {
      contact.detailKontak(argv.nama);
    }
  )
  // Perintah untuk menghapus data kontak
  .command(
    "rm",
    "Menghapus data kontak berdasarkan nama",
    {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    // Fungsi callback untuk menangani perintah "rm" dengan memanggil fungsi hapusKontak dari modul contact
    (argv) => {
      contact.hapusKontak(argv.nama);
    }
  )
  // Menuntut adanya perintah yang diberikan
  .demandCommand()
  // Memproses perintah-perintah yang telah ditentukan
  .parse();