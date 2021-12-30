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