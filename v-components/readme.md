# Components
Components are reusable Vue instances with a name.
Their purpose is to encapsulate some functionality of our application, and they can be anything,
from big parts, like a whole page or a navigation bar, to tiny parts,
like a button or a special formatted text.

In app.js we need create a component by typing: 
Vue.component(name, {})
This is a function that accepts the name of the component, in the first argument, 
and an object with the options in the second argument.
The same options like we are using when we mounting a Vue instance to a DOM element. 
But components are reusable elements, so we don't mount them to an dom element with el property.
A Vue component has its own template that can be defined in many ways.

One way is using a string.
template: '<button @click="count++">{{count}}</button>'
Now we need a count in our data.
Notice here that the data option is not an object, as it is in regular Vue instances.

A components data must be a function that returns an object, so each instances of the component, 
can maintain an indipendent copy of the returned data object.
data() {
  return {
    
  }
}

Now we can use our component name, as a custom HTML element.

## x-template way to define a template
Is the best for getting started.
We can add a script element in the html, and set its type to text/x-template.
We also need to give it an id, so we can refernce it. 
In Vue.js, the components template must be a single root element.
https://vuejs.org/v2/guide/syntax
