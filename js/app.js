new Vue({
    el: '#app',
  
    data: {
      tab: 'stok',
      state: {
        stok: [],
        tracking: {},
        paket: [],
        pengirimanList: []
      }
    },
  
    created() {
      Api.getData().then((data) => {
        this.state.stok = data.stok || [];
        this.state.tracking = data.tracking || {};
        this.state.paket = data.paket || [];
        this.state.pengirimanList = data.pengirimanList || [];
      });
    },
  
    methods: {
      handleNewDO(dataBaru) {
        this.$set(this.state.tracking, dataBaru.nomorDO, dataBaru);
        this.tab = 'tracking';
      }
    }
  });