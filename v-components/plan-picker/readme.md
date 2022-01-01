## Props
In our HTML markup we have a list of available plans.
All these divs have the exact same markup, and their purpose is to display a single plan.
If we had a component here like plan, we would be able to type something like that.
```html
<plan></plan>
```

## plan component
```js
Vue.component('plan', {
  template: 'plan-template',
})

new Vue({
  el: '#app',
})
```
In HTML: 
```html
<script type="text/x-template" id="plan-template">
```
Where we insert our repetible html component.

Now pass the name to our component like this:
```html
<plan name="The Single"></plan>
```
This is called a prop.
Props are custom attributes that you can register on a component.
In orden to then use a prop, you have to define it in the list of props that the component accepts,
using the props option.
```js
props: ['name']
```
Now, we can access the value of props as if they where data properties.
```html
<span class="title">{{ name }}</span>
```
Now we can create an Array with the plans names in the main Vue instance,
and pass them dinamically, instead of hardcoding the plan names in the markup.
```js
data: {
  plans: ['The Single', 'The Curios', 'The Addict']
}
```
```html
<plan v-for="plan in plans" :name="plan"></plan>
```

Props is something you will use very often, so it's good to know best practices.
The props option can be an Array, but for more control, we need to using an object.
Here the keys are the name of the props, 
the value can be the type of props.
```js
props: {
  name: String,
  price: Number,
}
```
For more controll we can make the value of the prop an object, that has a key of type 
and unlocks many possibilities. For example we can define a defaul value, we can make the prop required.
```js
name: {
  type: String,
  default: 'Dima',
  required: true
} 
```
https://vuejs.org/v2/guide/components-props

## Nested Components
Components allow us to encapsulate functionality and easily reuse them in multiple places in our applications. 
It is common to have components inside other components to compose the bigger features of our apps.

Look at plan-picker component.

## Global vs Local Components
There are two ways to register a component, global and local.
Global registration often is not ideal.
For example if you are using a build system like Webpack, globally registering all components,
meabs that even if you stop using a component, it can still be included in your final build.
This unnecessarily increases the amount of JavaScript, your users have to download.
Additionally, for some some components, it doesn't make sense to have them registered globally.
For instance, we will not use the plan component, outside of plan picker.

In cases like this, we can define the component as a javascript object,
and register it when we need to use it.
```js
const PlanComponent = {
  template: '#plan-template',
  ...
}
```
Now inside the parent component plan-picker, we will use the components option, 
to register the Plan locally.
The components is an object where the keys are the name of the components, 
and the value is the options object.
```js
Vue.component('plan-picker', {
  template: '#plan-picker-template',
  components: {
    plan: PlanComponent
  },
  ...
}
```
Now that our component is registered locally inside plan-picker, we cannot use it anymore outside of plan pickers template.

We can also register the plan picker component locally, since most likelly,
we don't need to use it in every page of our website.
!important note
```js
components: {'plan-picker': PlanPickerComponent},
```
is equivalent to type like
```js
components: {PlanPicker: PlanPickerComponent},
```
or 
```js
components: {planPicker: PlanPickerComponent},
```
You can register globally something like a BaseButton or an Input, and register locally all the rest.

## Communication Between Components with Custom Events
We know how to pass data to a child component through props.
In this lesson, we'll learn how to communicate from a child to a parent component through custom events.
https://vuejs.org/v2/guide/components-custom-events
We will use a custom event to notify the plan-picker of which plan has been selected,
and make sure we have the right logic in place so the user can only select one plan at a time.

When we have nested components we need a way to comunicate, and send data between them.
We know that we can pass data to child components using props, but we don't know yet, 
how to pass data from child to parent. 
Example: 
In Our plan picker we wanto to be able to pick a plan. How can we do this?

We can add data property to the plan component to define if the plan is selected.
We can also have a method to update the selected data.
Let's call this method when user clicks on plan, and bind a class when the element is selected.

Now we need to somehow make the select method, the previous selected plan, if there is one.
But, how can we know inside the component, if there is another plan selected?
We need to let the parent compnent know when the user selects a plan.
To do that in Vue.js, we use custom events.
To send a custom event, we use the special $emit method in our plan component.
```js
methods: {
  select() {
    this.$emit('name of event')
  }
}
```
The first argument is the name of the event we want to emit.
We can inspect all the emitted events using Vue devtools. 
Every time we click to a plan we can see the emitted event by plan.
The second argument of the event is the data we want to pass along with the event.
It is optional, but, in our case we will pass the name of the plan, 
so the parent knows which plan got selected.
Event data is often called payload.

Now, we can listen for the select event in the parent, which is the plan-picker component, using v-on.
As we do for the DOM events, like the click and the keydown.
```html
 <plan v-for="plan in plans" :name="plan" @select="selectPlan"></plan>
```

So we will say @select equals and then pass it an expression to run, when the event takes place.
That's it, when the select event take place trigger the selectPlan method.

Now, the plan picker needs to know which plan the user has selected.
To store that, we will add a data property, selectedPlan.
Let's also add the selectPlan method that will recive the plan, coming from the event payload, 
and will set it to the selectedPlan.

now go to plan and, now that the parent knows which plan is selected,
we don't need to store it twice, in parent and child component.
So we remove the selected data and will add the prop, so the parent pass down the selectedPlan. 
With that in place, we need to know when the active plan is selected, 
so we dinamically add this class. One way to do that, is to check if the selectedPlan and the current plan are the same.
We can do that in the template, but you can also use a computed property, 
since components are capable of doing whatever a Vue instance can do.
We called it isSelected() and here, we will return the check we need.
Now we need to pass the selectedPlan to our component.
:selectedPlan="selectedPlan"
Html property is case insensitive, so we can write ::selectedPlan === :selected-plan.

### Review:
When the plan is clicked => planComponent select() method $emit a custom event called 'select',
and we pass the plan name as the payload.
```js
select() {
  this.$emit('select', this.name)
}
```
Then, in the parent, we listen for the select event, and when it happens
we call the selectPlan() method of planPickerComponent methods.
```html
<plan v-for="plan in plans" :name="plan" @select="selectPlan" :selected-plan="selectedPlan"></plan>
```
```js
methods: {
  selectPlan(plan) {
    this.selectedPlan = plan
  }
}
```
This method gets the plan name from the payload, and it sets it to the data selectedPlan.
This data, selectedPlan, is the one we pass to the planComponent like a prop, 
so it knows if it is selected or not, by a computed method that return this boolean result.
```js
computed: {
  isSelected() {
    return this.name === this.selectedPlan
  }
}
```
Lastly in the template, we use a class binding, to conditionally apply the active-class, 
based on if the plan is selected.
```html
:class="{'active-plan': isSelected  }"
```

A calculated property caches its value based on its dependencies, that is, 
when the value of the main property changes in his father (selectedPlan) 
it causes all its child components to recalculate the value of its computed property 
due to its validation (return this.name === this. ** selectedPlan **). 
Every time the main node changes its property (selectedPlan) 
the children will have to execute that operation again to obtain the value 
of their calculated property, that way in the html with the class binding 
it detects the value of that property to apply a css class or not.

## Component Naming Best Practices
https://vuejs.org/v2/style-guide/

Component names should always be multy-word, exept for root app components.
This prevent conflicts with existing and future HTML elements.

In our case plan become plan-item. Beacuse we register the component locally inside plan-picker, 
the property name is also the name of the component. 

Order of the names in the components name.
Name should start with the most general words, and end with descriptive modifying words.

