Vue.component('status-badge', {
  template: window.AppTemplates.badge,

  props: ['qty', 'safety'],

  computed: {
    statusText() {
      if (this.qty === 0) {
        return '🔴 Kosong';
      }

      if (this.qty < this.safety) {
        return '🟠 Menipis';
      }

      return '🟢 Aman';
    },

    statusClass() {
      if (this.qty === 0) {
        return 'status-kosong';
      }

      if (this.qty < this.safety) {
        return 'status-menipis';
      }

      return 'status-aman';
    }
  }
});