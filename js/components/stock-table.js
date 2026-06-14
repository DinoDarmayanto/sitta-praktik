Vue.component('ba-stock-table', {
  template: window.AppTemplates.stock,

  props: ['items'],

  data() {
    return {
      bahanAjar: [],

      filterStatus: '',
      filterUpbjj: '',
      filterKategori: '',
      sortBy: '',

      showTooltip: '',
      editMode: false,
      editKode: '',

      form: {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      }
    };
  },

  created() {
    this.bahanAjar = this.items;
  },

  watch: {
    items(newValue) {
      this.bahanAjar = newValue;
    },

    filterUpbjj() {
      this.filterKategori = '';
    }
  },

  computed: {
    upbjjOptions() {
      return [...new Set(this.bahanAjar.map(item => item.upbjj))];
    },

    kategoriOptions() {
      if (this.filterUpbjj === '') {
        return [...new Set(this.bahanAjar.map(item => item.kategori))];
      }

      const data = this.bahanAjar.filter(item => item.upbjj === this.filterUpbjj);
      return [...new Set(data.map(item => item.kategori))];
    },

    filteredBahanAjar() {
      let result = [...this.bahanAjar];

      if (this.filterUpbjj !== '') {
        result = result.filter(item => item.upbjj === this.filterUpbjj);
      }

      if (this.filterKategori !== '') {
        result = result.filter(item => item.kategori === this.filterKategori);
      }

      if (this.filterStatus === 'kosong') {
        result = result.filter(item => item.qty === 0);
      } else if (this.filterStatus === 'menipis') {
        result = result.filter(item => item.qty < item.safety && item.qty > 0);
      } else if (this.filterStatus === 'aman') {
        result = result.filter(item => item.qty >= item.safety);
      }

      if (this.sortBy === 'judul') {
        result.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.sortBy === 'stok') {
        result.sort((a, b) => a.qty - b.qty);
      } else if (this.sortBy === 'harga') {
        result.sort((a, b) => a.harga - b.harga);
      }

      return result;
    }
  },

  methods: {
    formatRupiah(angka) {
      return 'Rp ' + Number(angka).toLocaleString('id-ID');
    },

    simpanData() {
      if (
        this.form.kode === '' ||
        this.form.judul === '' ||
        this.form.kategori === '' ||
        this.form.upbjj === '' ||
        this.form.lokasiRak === '' ||
        Number(this.form.harga) <= 0 ||
        Number(this.form.qty) < 0 ||
        Number(this.form.safety) <= 0 ||
        this.form.catatanHTML === ''
      ) {
        alert('Semua data wajib diisi dengan benar!');
        return;
      }

      if (this.editMode) {
        const index = this.bahanAjar.findIndex(item => item.kode === this.editKode);

        if (index !== -1) {
          this.bahanAjar.splice(index, 1, { ...this.form });
        }

        this.editMode = false;
        this.editKode = '';
      } else {
        const kodeSudahAda = this.bahanAjar.some(item => item.kode === this.form.kode);

        if (kodeSudahAda) {
          alert('Kode mata kuliah sudah ada!');
          return;
        }

        this.bahanAjar.push({ ...this.form });
      }

      this.resetForm();
    },

    editData(item) {
      this.editMode = true;
      this.editKode = item.kode;

      this.form = {
        kode: item.kode,
        judul: item.judul,
        kategori: item.kategori,
        upbjj: item.upbjj,
        lokasiRak: item.lokasiRak,
        harga: item.harga,
        qty: item.qty,
        safety: item.safety,
        catatanHTML: item.catatanHTML
      };
    },

    hapusData(item) {
      const yakin = confirm('Apakah yakin ingin menghapus data bahan ajar ini?');

      if (yakin) {
        this.bahanAjar = this.bahanAjar.filter(data => data.kode !== item.kode);
      }
    },

    resetForm() {
      this.form = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      };
    },

    resetFilter() {
      this.filterStatus = '';
      this.filterUpbjj = '';
      this.filterKategori = '';
      this.sortBy = '';
    }
  }
});