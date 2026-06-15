Vue.component('do-tracking', {
  template: window.AppTemplates.tracking,

  props: {
    data: {
      type: [Object, Array],
      default: function () {
        return {};
      }
    },

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
      tracking: {},

      keyword: '',
      hasilTracking: null,
      pesanError: '',
      progressText: '',

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
  },

  watch: {
    data: {
      handler(newValue) {
        this.tracking = newValue || {};
      },
      deep: true
    },

    keyword() {
      this.pesanError = '';
    },

    'form.kodePaket'() {
      this.pesanError = '';
    },

    'form.ekspedisi'() {
      this.pesanError = '';
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

    trackingList() {
      if (Array.isArray(this.tracking)) {
        return this.tracking.map((item) => {
          return {
            nomorDO: item.nomorDO,
            nim: item.nim,
            nama: item.nama,
            ekspedisi: item.ekspedisi,
            paket: item.paket,
            tanggalKirim: item.tanggalKirim,
            status: item.status,
            totalHarga: item.totalHarga || item.total || 0,
            perjalanan: item.perjalanan || []
          };
        });
      }

      return Object.keys(this.tracking).map((nomorDO) => {
        const item = this.tracking[nomorDO];

        return {
          nomorDO: nomorDO,
          nim: item.nim,
          nama: item.nama,
          ekspedisi: item.ekspedisi,
          paket: item.paket,
          tanggalKirim: item.tanggalKirim,
          status: item.status,
          totalHarga: item.totalHarga || item.total || 0,
          perjalanan: item.perjalanan || []
        };
      });
    }
  },

  methods: {
    cariTracking() {
      this.hasilTracking = null;
      this.pesanError = '';

      const keyword = this.keyword.trim().toLowerCase();

      if (keyword === '') {
        this.pesanError = 'Nomor DO atau NIM wajib diisi!';
        return;
      }

      const hasil = this.trackingList.find((item) => {
        return (
          String(item.nomorDO).toLowerCase() === keyword ||
          String(item.nim).toLowerCase() === keyword
        );
      });

      if (!hasil) {
        this.pesanError = 'Data Delivery Order tidak ditemukan.';
        return;
      }

      this.hasilTracking = hasil;
    },

    resetSearch() {
      this.keyword = '';
      this.hasilTracking = null;
      this.pesanError = '';
      this.progressText = '';
    },

    generateNomorDO() {
      const tahun = new Date().getFullYear();
      const nomorUrut = this.trackingList.length + 1;
      const sequence = String(nomorUrut).padStart(3, '0');

      return 'DO' + tahun + '-' + sequence;
    },

    tambahDO() {
      if (!this.validasiFormDO()) {
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

      this.hasilTracking = dataBaru;
      this.keyword = nomorDOBaru;

      alert('Delivery Order berhasil ditambahkan dengan nomor ' + nomorDOBaru);

      this.resetFormDO();
    },

    tambahProgress() {
      if (!this.hasilTracking) {
        alert('Cari data DO terlebih dahulu!');
        return;
      }

      if (this.progressText.trim() === '') {
        alert('Keterangan progress wajib diisi!');
        return;
      }

      const progressBaru = {
        waktu: this.formatWaktuSekarang(),
        keterangan: this.progressText.trim()
      };

      if (!this.hasilTracking.perjalanan) {
        this.$set(this.hasilTracking, 'perjalanan', []);
      }

      this.hasilTracking.perjalanan.push(progressBaru);
      this.hasilTracking.status = this.progressText.trim();

      if (!Array.isArray(this.tracking) && this.hasilTracking.nomorDO) {
        const nomorDO = this.hasilTracking.nomorDO;

        if (this.tracking[nomorDO]) {
          this.$set(this.tracking[nomorDO], 'perjalanan', this.hasilTracking.perjalanan);
          this.$set(this.tracking[nomorDO], 'status', this.hasilTracking.status);
        }
      }

      this.progressText = '';
    },

    validasiFormDO() {
      if (
        this.form.nim.trim() === '' ||
        this.form.nama.trim() === '' ||
        this.form.ekspedisi === '' ||
        this.form.kodePaket === '' ||
        this.form.tanggalKirim === ''
      ) {
        alert('Semua data Delivery Order wajib diisi!');
        return false;
      }

      if (!this.paketTerpilih) {
        alert('Paket bahan ajar belum valid!');
        return false;
      }

      return true;
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
      return 'Rp ' + Number(angka || 0).toLocaleString('id-ID');
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