let keranjang = [];

// ======================
// TAMBAH KE KERANJANG
// ======================

function tambahKeranjang(index) {

  const item = produk[index];

  // cek apakah produk sudah ada
  const produkAda = keranjang.find(
    (p) => p.nama === item.nama
  );

  // kalau sudah ada
  if (produkAda) {

    produkAda.qty += 1;

  } else {

    keranjang.push({
      ...item,
      qty: 1
    });

  }

  renderKeranjang();

}

// ======================
// KURANGI KERANJANG
// ======================

function kurangiKeranjang(index) {

  // kurangi qty
  keranjang[index].qty -= 1;

  // kalau qty habis
  if (keranjang[index].qty <= 0) {

    keranjang.splice(index, 1);

  }

  renderKeranjang();

}

// ======================
// RENDER KERANJANG
// ======================

function renderKeranjang() {

  const keranjangDiv =
    document.getElementById("keranjang");

  let total = 0;

  // kosongkan isi
  keranjangDiv.innerHTML = "";

  keranjang.forEach((item, index) => {

    const subtotal =
      item.harga * item.qty;

    total += subtotal;

    keranjangDiv.innerHTML += `

      <div class="flex justify-between items-center border-b py-3">

        <div>

          <p class="font-bold text-lg">
            ${item.nama}
          </p>

          <p class="text-sm text-gray-500">
            Rp ${item.harga} x ${item.qty}
          </p>

        </div>

        <div class="flex items-center gap-3">

          <button
            onclick="kurangiKeranjang(${index})"
            class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-lg"
          >
            -
          </button>

          <div class="font-bold">
            Rp ${subtotal}
          </div>

        </div>

      </div>

    `;

  });

  document.getElementById("total")
    .innerText = total;

}

// ======================
// PEMBAYARAN
// ======================

function prosesPembayaran() {

  const uangBayar =
    parseInt(
      document.getElementById("bayar").value
    );

  let total = 0;

  keranjang.forEach((item) => {

    total += item.harga * item.qty;

  });

  // validasi
  if (keranjang.length === 0) {

    alert("Keranjang kosong!");

    return;

  }

  if (!uangBayar) {

    alert("Masukkan uang pembayaran!");

    return;

  }

  if (uangBayar < total) {

    alert("Uang kurang!");

    return;

  }

  // hitung kembalian
  const kembalian =
    uangBayar - total;

  // tampilkan kembalian
  document.getElementById("kembalian")
    .innerText = kembalian;

  // ======================
  // QR PEMBAYARAN
  // ======================

  const qrDiv =
    document.getElementById("qrcode");

  // kosongkan dulu
  qrDiv.innerHTML = "";

  // buat data pembayaran
  const paymentData = `
Pembayaran UMKM
Total: Rp ${total}
Bayar: Rp ${uangBayar}
`;

  // generate QR
  new QRCode(qrDiv, {
    text: paymentData,
    width: 200,
    height: 200
  });

  // ======================
  // SIMPAN RIWAYAT
  // ======================

  const transaksi = {

    tanggal: new Date().toLocaleString(),

    items: [...keranjang],

    total,

    bayar: uangBayar,

    kembalian

  };

  const riwayat =
    JSON.parse(localStorage.getItem("riwayat")) || [];

  riwayat.push(transaksi);

  localStorage.setItem(
    "riwayat",
    JSON.stringify(riwayat)
  );

  // ======================
  // BUAT STRUK
  // ======================

  const strukDiv =
    document.getElementById("struk");

  let strukHTML = `

    <h2 class="text-2xl font-bold text-center mb-4">
      STRUK PEMBELIAN
    </h2>

    <p class="text-center text-gray-500 mb-5">
      ${transaksi.tanggal}
    </p>

  `;

  keranjang.forEach((item) => {

    strukHTML += `

      <div class="flex justify-between border-b py-2">

        <span>
          ${item.nama} x ${item.qty}
        </span>

        <span>
          Rp ${item.harga * item.qty}
        </span>

      </div>

    `;

  });

  strukHTML += `

    <div class="mt-5 space-y-2 font-bold">

      <div class="flex justify-between">

        <span>Total</span>

        <span>Rp ${total}</span>

      </div>

      <div class="flex justify-between">

        <span>Bayar</span>

        <span>Rp ${uangBayar}</span>

      </div>

      <div class="flex justify-between text-green-600">

        <span>Kembalian</span>

        <span>Rp ${kembalian}</span>

      </div>

    </div>

  `;

  strukDiv.innerHTML = strukHTML;

  strukDiv.classList.remove("hidden");

  // reset keranjang
  keranjang = [];

  renderKeranjang();

  document.getElementById("bayar").value = "";

  alert("Pembayaran berhasil!");

}

// ======================
// RENDER RIWAYAT
// ======================

function renderRiwayat() {

  const riwayatList =
    document.getElementById("riwayatList");

  if (!riwayatList) return;

  const riwayat =
    JSON.parse(localStorage.getItem("riwayat")) || [];

  riwayatList.innerHTML = "";

  if (riwayat.length === 0) {

    riwayatList.innerHTML = `

      <div class="bg-white p-5 rounded-xl shadow">

        Belum ada transaksi

      </div>

    `;

    return;

  }

  riwayat.reverse().forEach((trx) => {

    let itemsHTML = "";

    trx.items.forEach((item) => {

      itemsHTML += `

        <div class="flex justify-between py-1">

          <span>
            ${item.nama} x ${item.qty}
          </span>

          <span>
            Rp ${item.harga * item.qty}
          </span>

        </div>

      `;

    });

    riwayatList.innerHTML += `

      <div class="bg-white p-5 rounded-xl shadow">

        <div class="flex justify-between mb-4">

          <h2 class="text-xl font-bold">

            Transaksi

          </h2>

          <span class="text-sm text-gray-500">

            ${trx.tanggal}

          </span>

        </div>

        ${itemsHTML}

        <div class="border-t mt-4 pt-4 font-bold space-y-2">

          <div class="flex justify-between">

            <span>Total</span>

            <span>Rp ${trx.total}</span>

          </div>

          <div class="flex justify-between">

            <span>Bayar</span>

            <span>Rp ${trx.bayar}</span>

          </div>

          <div class="flex justify-between text-green-600">

            <span>Kembalian</span>

            <span>Rp ${trx.kembalian}</span>

          </div>

        </div>

      </div>

    `;

  });

}