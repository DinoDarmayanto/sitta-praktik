Vue.component('app-modal', {
  template: window.AppTemplates.modal,

  data() {
    return {
      visible: false,
      title: '',
      message: '',
      callback: null
    };
  },

  methods: {
    open(title, message, callback) {
      this.visible = true;
      this.title = title;
      this.message = message;
      this.callback = callback;
    },

    close() {
      this.visible = false;
    },

    confirm() {
      if (this.callback) {
        this.callback();
      }

      this.visible = false;
    }
  }
});