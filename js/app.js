new Vue({
  el: '#app',

  data: {
    tab: 'stok',

    state: {
      stok: [],
      tracking: {},
      paket: [],
      pengirimanList: []
    },

    loading: true,
    errorMessage: ''
  },

  created() {
    this.loadData();
  },

  watch: {
    tab(newValue) {
      console.log('Tab aktif:', newValue);
    },

    'state.tracking': {
      handler() {
        console.log('Data tracking berubah');
      },
      deep: true
    }
  },

  computed: {
    totalStok() {
      return this.state.stok.length;
    },

    totalTracking() {
      return Object.keys(this.state.tracking).length;
    }
  },

  methods: {
    loadData() {
      Api.getData()
        .then((data) => {
          this.state.stok = data.stok || [];
          this.state.tracking = data.tracking || {};
          this.state.paket = data.paket || [];
          this.state.pengirimanList = data.pengirimanList || [];
          this.loading = false;
        })
        .catch((error) => {
          this.errorMessage = 'Gagal memuat data aplikasi.';
          this.loading = false;
          console.error(error);
        });
    },

    handleNewDO(dataBaru) {
      if (!dataBaru || !dataBaru.nomorDO) {
        alert('Data pesanan tidak valid!');
        return;
      }

      this.$set(this.state.tracking, dataBaru.nomorDO, dataBaru);
      this.tab = 'tracking';
    },

    changeTab(tabName) {
      this.tab = tabName;
    }
  }
});