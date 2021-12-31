const PlanComponent = {
  template: '#plan-template',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}

const PlanPickerComponent = {
  template: '#plan-picker-template',
  components: {
    Plan: PlanComponent
  },
  data() {
    return {
      plans: ['The Single', 'The Curios', 'The Addict']
    }
  }
}


new Vue({
  el: '#app',
  components: {
    PlanPicker: PlanPickerComponent
  },
})