const NotificationMessageComponent = {
  template: '#notification-message-template',
  props: {
    header: {
      type: String,
      default: 'Information!'
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      hidden: false
    }
  },
  methods: {
    hide() {
      this.hidden = true
    }
  },
  
}

new Vue({
  el: '#app',
  components: {
    'notification-message': NotificationMessageComponent
  }
})