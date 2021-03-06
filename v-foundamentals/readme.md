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

### v-if and v-else directives
Let us conditionally render elements.
We can use it in our app to show a message if we don't have any shopping list items.
In our template we can add a paragraph tag with a v-if,
that only shows when there are no items. 

What if we want to show two different states?
Let's how to do that by hiding our add item form when we're not using it.
Let's start by adding a state property to our data.
We'll use this to manage when we should be toogling the add item form.
We can initialize it to a string of "default"
LOOK THE COODE FROM HERE...

### How make dinamic somethig like an href ?
Well, with the v-bind directive, we can couple any HTML attribute to our data.
For example, let's add a link to our template, use the v-bind on the href, and then reference newItem.
v-bind:href="newItem"
Now we can build templates where any attributes responds to our data.
v-bind: === :

We can use v-bind for every attribut, there are some special cases.
When we are using attribute bindings, classes are a special case because we can pass additional data, so they can determine when to apply certain classes.

Let's add a strikeout to our shopping list items, as we purchase them.
To start we need to refactor our items from a simple Array to Array of Objects,
so we can keep track of their purchased state.
We need to update our saveItem method and how are template is rendering the items.

Now we can add our dinamic classes. Vue has two ways for adding dinamic classes.
Array and Object syntax.

The Object syntax is the simpler, more concise way to add a dinamic class.
:class="{strikeout: item.purchased}"

Array sintax more verbose but offer us more flexibility for toogling between different classes:
:class="[item.purchased ? strikeout : '']"

It's possible to toogle multiple classes with both syntaxes.
If we added a hightPriority property to our items, we could see that our class bindings can keep track of both conditionals.

The Object syntax
:class="{
  strikeout: item.purchased,
  priority: item.hightPriority,
}"

The Array syntax
:class="[
  item.purchased ? 'strikeout' : '',
  item.hightPriority ? 'priority' : '',
]"

### Computed Properties
Computed properties are another powerful feature from Vue that allows us 
to transform or perform calculations on our data and then easily reuse the result
as an up-to-date variable in our template. Computed properties are very useful 
and should replace complex in-template expressions.

We can create a computed property that would calculate the length of the text in an input. 
For example if we wanted to enforce a character limit to our newItem field 
and wanted to show our users how many characters they had left,

We could use a computed property to calculate that for us, based on our current data implementation. 
It's import to return a value from computed property.
We'll need to carefull no to change our actual data in data object.  
Remember that computed properties are only for transforming data for our presentation layer.
They should not alter or change the existing data.
To avoid that, we can use slice(0) to make a copy of the array.
Accindentally changing or mutating an underlying data value in a computed property, 
is a big source of headachess and bugs.  

In Vue devtools we can see that there's a new section for computed properties now.

Now we can use our reversedItems instead of Items in our template in v-for place.
v-for="item in items"
v-for="item in reversedItems"

When you need to change data you will use a method.
When you need to change a presentation of existing data, you we'll use computed properties. 


