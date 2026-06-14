Vue.component('do-tracking', {
  template: window.AppTemplates.tracking,

  props: ['data'],

  data() {
    return {
      tracking: {},

      keyword: '',
      hasilTracking: null,
      pesanError: '',
      progressText: '',

      paket: [],
      ekspedisi: ['JNE Regular', 'JNE Express'],

      form: {
        nim: '',
        nama: '',
        ekspedisi: '',
        kodePaket: '',
        tanggalKirim: new Date().toISOString().slice(0, 10)
      }
    };
  },

  created() {
    this.tracking = this.data || {};

    if (window.app && window.app.state) {
      this.paket = window.app.state.paket || [];
    }
  },

  watch: {
    data(newValue) {
      this.tracking = newValue || {};
    },

    keyword() {
      this.pesanError = '';
    },

    'form.kodePaket'() {
      this.hasilTracking = null;
      this.pesanError = '';
    }
  },

  computed: {
    paketTerpilih() {
      return this.paket.find(item => item.kode === this.form.kodePaket);
    },

    totalHarga() {
      return this.paketTerpilih ? this.paketTerpilih.harga : 0;
    },

    trackingList() {
      if (Array.isArray(this.tracking)) {
        return this.tracking;
      }

      return Object.keys(this.tracking).map(nomorDO => ({
        nomorDO: nomorDO,
        ...this.tracking[nomorDO],
        totalHarga: this.tracking[nomorDO].total || this.tracking[nomorDO].totalHarga || 0
      }));
    }
  },

  methods: {
    cariTracking() {
      this.hasilTracking = null;
      this.pesanError = '';

      if (this.keyword === '') {
        this.pesanError = 'Nomor DO atau NIM wajib diisi!';
        return;
      }

      const keywordLower = this.keyword.toLowerCase();

      const hasil = this.trackingList.find(item => {
        return (
          item.nomorDO.toLowerCase() === keywordLower ||
          String(item.nim).toLowerCase() === keywordLower
        );
      });

      if (!hasil) {
        this.pesanError = 'Data Delivery Order tidak ditemukan';
        return;
      }

      this.hasilTracking = hasil;
    },

    resetSearch() {
      this.keyword = '';
      this.hasilTracking = null;
      this.pesanError = '';
    },

    generateNomorDO() {
      const tahun = new Date().getFullYear();
      const nomorUrut = this.trackingList.length + 1;
      const sequence = String(nomorUrut).padStart(3, '0');

      return 'DO' + tahun + '-' + sequence;
    },

    tambahDO() {
      if (
        this.form.nim === '' ||
        this.form.nama === '' ||
        this.form.ekspedisi === '' ||
        this.form.kodePaket === '' ||
        this.form.tanggalKirim === ''
      ) {
        alert('Semua data Delivery Order wajib diisi!');
        return;
      }

      const nomorDOBaru = this.generateNomorDO();

      const dataBaru = {
        nomorDO: nomorDOBaru,
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
            keterangan: 'Delivery Order berhasil dibuat'
          }
        ]
      };

      if (Array.isArray(this.tracking)) {
        this.tracking.push(dataBaru);
      } else {
        this.$set(this.tracking, nomorDOBaru, {
          nim: dataBaru.nim,
          nama: dataBaru.nama,
          ekspedisi: dataBaru.ekspedisi,
          paket: dataBaru.paket,
          tanggalKirim: dataBaru.tanggalKirim,
          status: dataBaru.status,
          totalHarga: dataBaru.totalHarga,
          perjalanan: dataBaru.perjalanan
        });
      }

      alert('Delivery Order berhasil ditambahkan dengan nomor ' + nomorDOBaru);

      this.resetFormDO();
    },

    tambahProgress() {
      if (!this.hasilTracking) {
        alert('Cari data DO terlebih dahulu!');
        return;
      }

      if (this.progressText === '') {
        alert('Keterangan progress wajib diisi!');
        return;
      }

      const progressBaru = {
        waktu: this.formatWaktuSekarang(),
        keterangan: this.progressText
      };

      if (!this.hasilTracking.perjalanan) {
        this.$set(this.hasilTracking, 'perjalanan', []);
      }

      this.hasilTracking.perjalanan.push(progressBaru);
      this.hasilTracking.status = this.progressText;

      this.progressText = '';
    },

    resetFormDO() {
      this.form = {
        nim: '',
        nama: '',
        ekspedisi: '',
        kodePaket: '',
        tanggalKirim: new Date().toISOString().slice(0, 10)
      };
    },

    formatRupiah(angka) {
      return 'Rp ' + Number(angka).toLocaleString('id-ID');
    },

    formatTanggal(tanggal) {
      if (!tanggal) {
        return '-';
      }

      const date = new Date(tanggal);

      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
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