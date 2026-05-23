const app = Vue.createApp({
  data() {
    return {
      bahanAjar: dataSitta.stok,

      filterStatus: "",
      filterUpbjj: "",
      filterKategori: "",
      sortBy: "",

      form: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        qty: 0,
        safety: 0,
        catatanHTML: ""
      }
    }
  },

  computed: {
    upbjjOptions() {
      return dataSitta.upbjjList
    },

    kategoriOptions() {
      if (this.filterUpbjj === "") {
        return dataSitta.kategoriList
      }

      const data = this.bahanAjar.filter(
        item => item.upbjj === this.filterUpbjj
      )

      return [...new Set(data.map(item => item.kategori))]
    },

    filteredBahanAjar() {
      let result = [...this.bahanAjar]

      if (this.filterUpbjj !== "") {
        result = result.filter(item => item.upbjj === this.filterUpbjj)
      }

      if (this.filterKategori !== "") {
        result = result.filter(item => item.kategori === this.filterKategori)
      }

      if (this.filterStatus === "kosong") {
        result = result.filter(item => item.qty === 0)
      } else if (this.filterStatus === "menipis") {
        result = result.filter(item => item.qty < item.safety && item.qty > 0)
      } else if (this.filterStatus === "aman") {
        result = result.filter(item => item.qty >= item.safety)
      }

      if (this.sortBy === "judul") {
        result.sort((a, b) => a.judul.localeCompare(b.judul))
      } else if (this.sortBy === "stok") {
        result.sort((a, b) => a.qty - b.qty)
      } else if (this.sortBy === "harga") {
        result.sort((a, b) => a.harga - b.harga)
      }

      return result
    }
  },

  watch: {
    filterUpbjj() {
      this.filterKategori = ""
    }
  },

  methods: {
    tambahBarang() {
      if (
        this.form.kode === "" ||
        this.form.judul === "" ||
        this.form.kategori === "" ||
        this.form.upbjj === "" ||
        this.form.lokasiRak === "" ||
        Number(this.form.qty) < 0 ||
        Number(this.form.safety) <= 0 ||
        this.form.catatanHTML === ""
      ) {
        alert("Semua data wajib diisi dengan benar!")
        return
      }

      this.bahanAjar.push({
        kode: this.form.kode,
        judul: this.form.judul,
        kategori: this.form.kategori,
        upbjj: this.form.upbjj,
        lokasiRak: this.form.lokasiRak,
        qty: Number(this.form.qty),
        safety: Number(this.form.safety),
        harga: 100000,
        catatanHTML: this.form.catatanHTML
      })

      this.form.kode = ""
      this.form.judul = ""
      this.form.kategori = ""
      this.form.upbjj = ""
      this.form.lokasiRak = ""
      this.form.qty = 0
      this.form.safety = 0
      this.form.catatanHTML = ""
    },

    resetFilter() {
      this.filterStatus = ""
      this.filterUpbjj = ""
      this.filterKategori = ""
      this.sortBy = ""
    },

    editStok(item) {
      const qtyBaru = prompt("Masukkan jumlah stok baru:", item.qty)

      if (qtyBaru !== null && qtyBaru !== "") {
        item.qty = Number(qtyBaru)
      }
    }
  }
})

app.mount("#app")