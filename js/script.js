// =======================
// LOGIN
// =======================

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // VALIDASI KOSONG

    if (email === '' || password === '') {
      alert('Email dan Password wajib diisi!');
      return;
    }

    // LOGIN BERHASIL

    if (email === 'admin@gmail.com' && password === '12345') {
      alert('Login berhasil!');

      window.location.href = 'dashboard.html';
    }

    // LOGIN GAGAL
    else {
      alert('email/password yang anda masukkan salah');
    }
  });
}

// =======================
// GREETING DASHBOARD
// =======================

const greeting = document.getElementById('greeting');

if (greeting) {
  const jam = new Date().getHours();

  if (jam < 12) {
    greeting.innerHTML = 'Selamat Pagi';
  } else if (jam < 18) {
    greeting.innerHTML = 'Selamat Siang';
  } else {
    greeting.innerHTML = 'Selamat Malam';
  }
}

// =======================
// MODAL REGISTER
// =======================

const registerLink = document.getElementById('registerLink');

const registerModal = document.getElementById('registerModal');

const closeRegister = document.getElementById('closeRegister');

// BUKA MODAL

if (registerLink) {
  registerLink.addEventListener('click', function (e) {
    e.preventDefault();

    registerModal.style.display = 'block';
  });
}

// TUTUP MODAL

if (closeRegister) {
  closeRegister.addEventListener('click', function () {
    registerModal.style.display = 'none';
  });
}

// KLIK LUAR MODAL

window.addEventListener('click', function (e) {
  if (e.target == registerModal) {
    registerModal.style.display = 'none';
  }
});

// =======================
// BUTTON DAFTAR
// =======================

const daftarButton = document.getElementById('daftarButton');

if (daftarButton) {
  daftarButton.addEventListener('click', function () {
    alert('Pendaftaran berhasil!');

    window.location.href = 'dashboard.html';
  });
}
// =======================
// TRACKING
// =======================

const cariTracking = document.getElementById('cariTracking');

if (cariTracking) {
  cariTracking.addEventListener('click', function () {
    const nomorDO = document.getElementById('nomorDO').value;

    const hasilTracking = document.getElementById('hasilTracking');

    const data = dataTracking[nomorDO];

    // VALIDASI

    if (!data) {
      hasilTracking.innerHTML = `
        <p style="color:red;">
          Nomor Delivery Order tidak ditemukan
        </p>
      `;

      return;
    }

    // TIMELINE

    let timelineHTML = '';

    data.perjalanan.forEach(function (item) {
      timelineHTML += `
        <div class="timeline-item">

          <h4>${item.waktu}</h4>

          <p>${item.keterangan}</p>

        </div>
      `;
    });

    // HASIL

    hasilTracking.innerHTML = `

      <div class="tracking-card">

        <h2>${data.nama}</h2>

        <p><strong>Nomor DO:</strong> ${data.nomorDO}</p>

        <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>

        <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>

        <p><strong>Jenis Paket:</strong> ${data.paket}</p>

        <p><strong>Total Pembayaran:</strong> ${data.total}</p>

        <div class="status-box">

          <div class="status-text">
            Status: ${data.status}
          </div>

          <div class="progress">

            <div class="progress-bar">
              ${data.status}
            </div>

          </div>

        </div>

      </div>

      <div class="timeline">

        <h2>Perjalanan Paket</h2>

        ${timelineHTML}

      </div>

    `;
  });
}
// =======================
// STOK BAHAN AJAR
// =======================

const listBahanAjar = document.getElementById('listBahanAjar');

// FUNCTION TAMPILKAN DATA

function tampilkanBahanAjar() {
  if (!listBahanAjar) return;

  listBahanAjar.innerHTML = '';

  dataBahanAjar.forEach(function (item) {
    listBahanAjar.innerHTML += `

      <div class="bahan-card">

        <img src="${item.cover}" alt="${item.namaBarang}">

        <div class="info-item">
          <h4>Kode Lokasi</h4>
          <p>${item.kodeLokasi}</p>
        </div>

        <div class="info-item">
          <h4>Kode Barang</h4>
          <p>${item.kodeBarang}</p>
        </div>

        <div class="info-item">
          <h4>Nama Barang</h4>
          <p>${item.namaBarang}</p>
        </div>

        <div class="info-item">
          <h4>Jenis Barang</h4>
          <p>${item.jenisBarang}</p>
        </div>

        <div class="info-item">
          <h4>Edisi</h4>
          <p>${item.edisi}</p>
        </div>

        <div class="info-item">
          <h4>Stok</h4>
          <p>${item.stok}</p>
        </div>

      </div>

    `;
  });
}

// TAMPILKAN AWAL

tampilkanBahanAjar();

// =======================
// TAMBAH DATA BARU
// =======================

const tambahBarang = document.getElementById('tambahBarang');

if (tambahBarang) {
  tambahBarang.addEventListener('click', function () {
    const kodeBarang = document.getElementById('kodeBarang').value;

    const namaBarang = document.getElementById('namaBarang').value;

    const stokBarang = document.getElementById('stokBarang').value;

    // VALIDASI

    if (kodeBarang === '' || namaBarang === '' || stokBarang === '') {
      alert('Semua field wajib diisi!');
      return;
    }

    // PUSH DATA BARU

    dataBahanAjar.push({
      kodeLokasi: 'CUSTOM',

      kodeBarang: kodeBarang,

      namaBarang: namaBarang,

      jenisBarang: 'BMP',

      edisi: '1',

      stok: stokBarang,

      cover: 'https://via.placeholder.com/400x200',
    });

    // REFRESH

    tampilkanBahanAjar();

    // RESET FORM

    document.getElementById('kodeBarang').value = '';

    document.getElementById('namaBarang').value = '';

    document.getElementById('stokBarang').value = '';

    alert('Data berhasil ditambahkan!');
  });
}
