Vue.component('order-form', {
  template: window.AppTemplates.order,

  props: {
    paket: {
      type: Array,
      default: function () {
        return [];
      }
    },

    ekspedisi: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      form: {
        nim: '',
        nama: '',
        ekspedisi: '',
        kodePaket: '',
        tanggalKirim: new Date().toISOString().slice(0, 10)
      },

      pesanValidasi: ''
    };
  },

  watch: {
    'form.kodePaket'() {
      this.pesanValidasi = '';
    },

    'form.ekspedisi'() {
      this.pesanValidasi = '';
    }
  },

  computed: {
    paketTerpilih() {
      return this.paket.find((item) => {
        return item.kode === this.form.kodePaket;
      });
    },

    totalHarga() {
      if (!this.paketTerpilih) {
        return 0;
      }

      return Number(this.paketTerpilih.harga) || 0;
    },

    nomorDOPreview() {
      const tahun = new Date().getFullYear();
      const sequence = String(Date.now()).slice(-3);

      return 'DO' + tahun + '-' + sequence;
    }
  },

  methods: {
    buatPesanan() {
      if (!this.validasiForm()) {
        alert(this.pesanValidasi);
        return;
      }

      const dataPesanan = {
        nomorDO: this.nomorDOPreview,
        nim: this.form.nim,
        nama: this.form.nama,
        ekspedisi: this.form.ekspedisi,
        paket: this.form.kodePaket,
        tanggalKirim: this.form.tanggalKirim,
        status: 'Diproses',
        totalHarga: this.totalHarga,
        perjalanan: [
          {
            waktu: this.formatWaktuSekarang(),
            keterangan: 'Pesanan bahan ajar berhasil dibuat'
          }
        ]
      };

      this.$emit('created', dataPesanan);

      alert('Pesanan berhasil dibuat dengan nomor ' + dataPesanan.nomorDO);

      this.resetForm();
    },

    validasiForm() {
      if (this.form.nim.trim() === '') {
        this.pesanValidasi = 'NIM wajib diisi!';
        return false;
      }

      if (this.form.nama.trim() === '') {
        this.pesanValidasi = 'Nama wajib diisi!';
        return false;
      }

      if (this.form.ekspedisi === '') {
        this.pesanValidasi = 'Ekspedisi wajib dipilih!';
        return false;
      }

      if (this.form.kodePaket === '') {
        this.pesanValidasi = 'Paket bahan ajar wajib dipilih!';
        return false;
      }

      if (this.form.tanggalKirim === '') {
        this.pesanValidasi = 'Tanggal kirim wajib diisi!';
        return false;
      }

      if (!this.paketTerpilih) {
        this.pesanValidasi = 'Paket bahan ajar tidak valid!';
        return false;
      }

      this.pesanValidasi = '';
      return true;
    },

    resetForm() {
      this.form = {
        nim: '',
        nama: '',
        ekspedisi: '',
        kodePaket: '',
        tanggalKirim: new Date().toISOString().slice(0, 10)
      };
    },

    formatRupiah(angka) {
      return 'Rp ' + Number(angka || 0).toLocaleString('id-ID');
    },

    formatWaktuSekarang() {
      const date = new Date();

      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  }
});