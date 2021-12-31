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

