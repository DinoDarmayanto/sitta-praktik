const app = Vue.createApp({
  data() {
    return {
      ...dataSitta,

      keywordDO: "",
      hasilTracking: null,
      pesanError: "",

      form: {
        nim: "",
        nama: "",
        ekspedisi: "",
        kodePaket: "",
        tanggalKirim: new Date().toISOString().slice(0, 10)
      }
    }
  },

  computed: {
    paketTerpilih() {
      return this.paket.find(item => item.kode === this.form.kodePaket)
    },

    totalHarga() {
      return this.paketTerpilih ? this.paketTerpilih.harga : 0
    },

    trackingList() {
      return Object.keys(this.tracking).map(nomorDO => ({
        nomorDO,
        ...this.tracking[nomorDO],
        totalHarga: this.tracking[nomorDO].total
      }))
    }
  },

  watch: {
    "form.kodePaket"() {
      this.hasilTracking = null
      this.pesanError = ""
    },

    keywordDO() {
      this.pesanError = ""
    }
  },

  methods: {
    cariTracking() {
      this.hasilTracking = null
      this.pesanError = ""

      if (this.keywordDO === "") {
        this.pesanError = "Nomor Delivery Order wajib diisi!"
        return
      }

      const data = this.tracking[this.keywordDO]

      if (!data) {
        this.pesanError = "Nomor Delivery Order tidak ditemukan"
        return
      }

      this.hasilTracking = {
        nomorDO: this.keywordDO,
        ...data,
        totalHarga: data.total
      }
    },

    generateNomorDO() {
      const tahun = new Date().getFullYear()
      const nomorUrut = Object.keys(this.tracking).length + 1
      const sequence = String(nomorUrut).padStart(3, "0")

      return `DO${tahun}-${sequence}`
    },

    tambahDO() {
      if (
        this.form.nim === "" ||
        this.form.nama === "" ||
        this.form.ekspedisi === "" ||
        this.form.kodePaket === "" ||
        this.form.tanggalKirim === ""
      ) {
        alert("Semua data Delivery Order wajib diisi!")
        return
      }
    
      const nomorDOBaru = this.generateNomorDO()
    
      this.tracking = {
        ...this.tracking,
        [nomorDOBaru]: {
          nim: this.form.nim,
          nama: this.form.nama,
          ekspedisi: this.form.ekspedisi,
          paket: this.form.kodePaket,
          tanggalKirim: this.form.tanggalKirim,
          status: "Diproses",
          total: this.totalHarga,
          perjalanan: [
            {
              waktu: this.form.tanggalKirim + " 09:00:00",
              keterangan: "Delivery Order berhasil dibuat"
            },
            {
              waktu: this.form.tanggalKirim + " 10:12:20",
              keterangan: "Penerimaan di Loket: TANGSEL"
            },
            {
              waktu: this.form.tanggalKirim + " 14:07:56",
              keterangan: "Tiba di Hub: JAKSEL"
            },
            {
              waktu: this.form.tanggalKirim + " 16:30:10",
              keterangan: "Diteruskan ke Kantor Tujuan"
            }
          ]
        }
      }
    
      alert("Delivery Order berhasil ditambahkan dengan nomor " + nomorDOBaru)
    
      this.form.nim = ""
      this.form.nama = ""
      this.form.ekspedisi = ""
      this.form.kodePaket = ""
      this.form.tanggalKirim = new Date().toISOString().slice(0, 10)
    }
  }
})

app.mount("#app")