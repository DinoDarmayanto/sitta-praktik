var Api = {
  getData() {
    return fetch('data/dataBahanAjar.json')
      .then(function(response) {

        if (!response.ok) {
          throw new Error(
            'Gagal membaca dataBahanAjar.json : ' + response.status
          );
        }

        return response.json();
      })
      .catch(function(error) {
        console.error('API ERROR:', error);
        return {
          stok: [],
          tracking: {},
          paket: [],
          pengirimanList: []
        };
      });
  }
};