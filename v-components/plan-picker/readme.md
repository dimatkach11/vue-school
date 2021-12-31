## Props
In our HTML markup we have a list of available plans.
All these divs have the exact same markup, and their purpose is to display a single plan.
If we had a component here like plan, we would be able to type something like that.
```sh
<plan></plan>
```

## plan component
```sh
Vue.component('plan', {
  template: 'plan-template',
})

new Vue({
  el: '#app',
})
```
In HTML: 
```sh
<script type="text/x-template" id="plan-template">
```
Where we insert our repetible html component.

Now pass the name to our component like this:
```sh
<plan name="The Single"></plan>
```
This is called a prop.
Props are custom attributes that you can register on a component.
In orden to then use a prop, you have to define it in the list of props that the component accepts,
using the props option.
```sh
props: ['name']
```
Now, we can access the value of props as if they where data properties.
```sh
<span class="title">{{ name }}</span>
```
Now we can create an Array with the plans names in the main Vue instance,
and pass them dinamically, instead of hardcoding the plan names in the markup.
```sh
data: {
  plans: ['The Single', 'The Curios', 'The Addict']
}
```
```sh
<plan v-for="plan in plans" :name="plan"></plan>
```

Props is something you will use very often, so it's good to know best practices.
The props option can be an Array, but for more control, we need to using an object.
Here the keys are the name of the props, 
the value can be the type of props.
```sh
props: {
  name: String,
  price: Number,
}
```
For more controll we can make the value of the prop an object, that has a key of type 
and unlocks many possibilities. For example we can define a defaul value, we can make the prop required.
```sh
name: {
  type: String,
  default: 'Dima',
  required: true
} 
```
https://vuejs.org/v2/guide/components-props

