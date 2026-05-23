// =======================
// ELEMENT MODAL REGISTER
// =======================

const registerLink = document.getElementById('registerLink');
const registerModal = document.getElementById('registerModal');
const closeRegister = document.getElementById('closeRegister');
const daftarButton = document.getElementById('daftarButton');

// =======================
// BUKA MODAL REGISTER
// =======================

if (registerLink && registerModal) {
  registerLink.addEventListener('click', function (e) {
    e.preventDefault();
    registerModal.style.display = 'block';
  });
}

// =======================
// TUTUP MODAL REGISTER
// =======================

if (closeRegister && registerModal) {
  closeRegister.addEventListener('click', function () {
    registerModal.style.display = 'none';
  });
}

// =======================
// KLIK LUAR MODAL
// =======================

if (registerModal) {
  window.addEventListener('click', function (e) {
    if (e.target === registerModal) {
      registerModal.style.display = 'none';
    }
  });
}

// =======================
// REGISTER USER
// =======================

if (daftarButton) {
  daftarButton.addEventListener('click', function () {
    const nama = document.getElementById('registerNama').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (nama === '' || email === '' || password === '') {
      alert('Semua field wajib diisi!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const emailSudahAda = users.find(function (user) {
      return user.email === email;
    });

    if (emailSudahAda) {
      alert('Email sudah terdaftar!');
      return;
    }

    users.push({
      nama: nama,
      email: email,
      password: password
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Pendaftaran berhasil!');

    document.getElementById('registerNama').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';

    registerModal.style.display = 'none';
  });
}

// =======================
// LOGIN
// =======================

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
      alert('Email dan Password wajib diisi!');
      return;
    }

    if (email === 'admin@gmail.com' && password === '12345') {
      alert('Login berhasil!');
      window.location.href = 'dashboard.html';
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userDitemukan = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (userDitemukan) {
      alert('Login berhasil!');
      window.location.href = 'dashboard.html';
    } else {
      alert('Email/password yang anda masukkan salah');
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