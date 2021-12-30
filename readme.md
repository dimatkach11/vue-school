Create a div with the id = shopping-list where our Vue app will live. 
Now create a script tag under the vue import where we can create a new Vue instance.
new Vue();
And pass throught a config object {}
new Vue({});
Now we should to tell the Vue instance where it should exist on the page.
el: '#shopping-list' -->  added earlier 
Vue is now instantiated and we are ready to start using it.
Lets display some data on the page. We'll add a data property to our config object.
data: {}, with a header property set to "Vue is ready to party!".
The data property is where we are store data for our Vue instance to use.

# Reactivity System 
We can create an input field and use the Vue's v-model directive to bind our header to the input,
v-model="header"
Text in the input is in-sync with the header data. So if we change the input's value, we see our h1's content change instantly.
Let's assign our Vue instance to a variable (shoppingList) and then use it in our browser console. 
shoppingList.$data.header = 'Hi from the console!'

We've already used Vue's templating syntax to bind data to the DOM, but it turns out that it's much more powerful than that.  
Inside of those double mustaches "{{}}", we can use the full power of JavaScript expressions.
So, if we wanted to uppercase our header, we'd just have to add the .toLocaleUpperCase() method.
There are some limitation to use in our double mustaches "{{}}".
The biggest is that we can only evalute one expression at a time,
we also can't declare variables or evaluate if statement in them,
but if needed we can use a short-hand if statement, otherwhise known as a ternary statement.
header ? header : 'welcome!'

### Adding Items to our shopp list app
To do that, we'll add an Array of items as property to our data.
items : [
  '10 party hats',
  '2 board games',
  '20 cups',
]
Vue makes it super easy to loop over and render Arrays and Objects in our template,
with a directive called v-for. We can add it to our HTML just like we did with v-model earler.
We'll create a ul and then use v-for to add a bunch of li's.
<li v-for="item in items">
  {{ item }}
</li>
We'd like an li "for each" item, in our items Array.
v-for is reactive as well.
In console we can push some data to our items Array.
shoppingList.$data.items.push('A data from console')
We also can remove a data from our items Array, as well.
shoppingList.$data.items.pop()





