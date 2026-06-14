Vue.component('order-form', {
  template: window.AppTemplates.order,

  props: ['paket', 'ekspedisi'],

  data() {
    return {
      form: {
        nim: '',
        nama: '',
        ekspedisi: '',
        kodePaket: ''
      }
    };
  },

  computed: {
    paketTerpilih() {
      return this.paket.find(item => item.kode === this.form.kodePaket);
    },

    totalHarga() {
      return this.paketTerpilih ? this.paketTerpilih.harga : 0;
    }
  },

  methods: {
    buatPesanan() {
      if (
        this.form.nim === '' ||
        this.form.nama === '' ||
        this.form.ekspedisi === '' ||
        this.form.kodePaket === ''
      ) {
        alert('Semua data pemesanan wajib diisi!');
        return;
      }

      this.$emit('created', {
        nomorDO: 'DO' + new Date().getFullYear() + '-' + String(Date.now()).slice(-3),
        nim: this.form.nim,
        nama: this.form.nama,
        ekspedisi: this.form.ekspedisi,
        paket: this.form.kodePaket,
        tanggalKirim: new Date().toISOString().slice(0, 10),
        status: 'Diproses',
        totalHarga: this.totalHarga,
        perjalanan: []
      });

      alert('Pesanan berhasil dibuat!');
    },

    formatRupiah(angka) {
      return 'Rp ' + Number(angka).toLocaleString('id-ID');
    }
  }
});