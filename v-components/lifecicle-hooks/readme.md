# Component Lifecycle Hooks
Each Vue inctance goes through a series of initialization steps, when it's created.
For example, it needs to set up data observation, mount the instance to the DOM, and so on.
Along the way, it also runs functions called lifecicle hooks, 
giving us the opportunity to add our own code at specific stages.
For example if you have a BlogPost component, and need to fetch the post from an API, 
you can do so in the created lifecicle hook.

Let's assume that we get the id of the post in a props, and we want to fetch the actual post from our API,
and set it to a data property blogPost.
Now we want to run code when the component is created, so we will use the created hook.

The hook are functions just like the data. Inside the hook function we have access to the component instance, as this.
So, we have the id of the post we want to get in a prop,
we could make a call to the api url slash the id of the blogpost, using this.id.
Then we get the responce and we can set the blogPost data equal to return post.

