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

### Adding items from application 
We'll start by adding a newItem property to our data.
In our input we use v-model to bind newItem to our input.
Just like that we've established a two-way data binding between our input and the newItem data, so they always stay in-sync.

### Vue.js devtools chrome extension
To make worked the vue extension for pages opened via file://protocol, we''l need to modify devtools settings.
In browser go to extensions and click on Vue Devtools and make sure that "Allow access to file URLs" is checked.

In Vue devtools in the first panel we can see all of our Vue instances.
In the <Root> instances we can see the data that we've defined for our shopping list app.

Vue devtools injects our Vue instances into the console for us, so we can test and manipulate them,
without relying on setting them to a variable.

Now if we selecting the Vue instance and go to our console we can inspect it by typing $vm0
For example we can see our items by typing $vm0.items.

Now try to add a new item using Vue devtools and console by:
$vm0.newItem = 'new item using dev tools and console'
$vm0.items.push($vm0.newItem)

### Implement logic of adding items in the app 
Add button, and then we capture the click event. 
With the Vue directive v-on we can specify what to do whenever an action takes place, such as a user click a button,
submitting a form or hovering over an element ecc.
In our we'll want to listen for a click event, that gets triggered when user press the button.
To do that we can add v-on:click action and the code to do, like:
v-on:click="items.push(newItem)
Vue let's us respond to every event that JavaScript can.
So, we could respond to tab, esc, delete keys, or right and cmd clicks, focus and mousover, and more.
v-on has a short-hand syntax 
v-on: === @

### Extract in line persistance JavaScript into Vue methods
Inside a Vue instansce we can define a methods Object 
where we can add methods that encapsulate specific functionality for our Vue instance.
We can add a property called saveItem and set it equal to a function.
Inside the function we add a JavaScript logic.
We're moving template logic into this method.
One thing to note is that inside of our methods we do not have automatic access to our Vue instance data like we did it in the v-on.
Instead, we we'll need to explicitly reference it using the this keyword,
much like we used $vm0 in the console earlier.  

we can also debug our method in the vue console by so:
shoppingList.newItem = 'new item from console'
shoppingList.saveItem()
OR:
Select the our instance from Vue devtools and than:
$vm0.newItem = 'new item using dev tools and console'
$vm0.saveItem()

