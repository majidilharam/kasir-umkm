const produk = [
  {
    nama: "Indomie",
    harga: 3500
  },
  {
    nama: "Teh Botol",
    harga: 5000
  },
  {
    nama: "Kopi",
    harga: 2000
  }
];

// ======================
// TABEL PRODUK
// ======================

function renderProdukTable() {

  const table =
    document.getElementById("tableProduk");

  if (!table) return;

  table.innerHTML = "";

  produk.forEach((item) => {

    table.innerHTML += `

      <tr class="border-b">

        <td class="p-4">
          ${item.nama}
        </td>

        <td class="p-4">
          Rp ${item.harga}
        </td>

      </tr>

    `;

  });

}

// ======================
// LIST PRODUK TRANSAKSI
// ======================

function renderProdukTransaksi() {

  const produkList =
    document.getElementById("produkList");

  if (!produkList) return;

  produkList.innerHTML = "";

  produk.forEach((item, index) => {

    produkList.innerHTML += `

      <div class="bg-white p-5 rounded-xl shadow">

        <h2 class="text-xl font-bold mb-2">
          ${item.nama}
        </h2>

        <p class="mb-4">
          Harga: Rp ${item.harga}
        </p>

        <button
          onclick="tambahKeranjang(${index})"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Tambah
        </button>

      </div>

    `;

  });

}