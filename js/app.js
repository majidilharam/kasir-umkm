async function loadPage(page) {

  const response = await fetch(`pages/${page}.html`);

  const html = await response.text();

  document.getElementById("content").innerHTML = html;

  // render produk
  if (page === "produk") {
    renderProdukTable();
  }

  // render transaksi
  if (page === "transaksi") {
    renderProdukTransaksi();
  }

  // render riwayat
  if (page === "riwayat") {
    renderRiwayat();
  }

}

loadPage("dashboard");