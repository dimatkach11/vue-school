const BlogPostComponent = {
  template: '#blog-post-template',
  props: ['id'],
  data() {
    return {
      testingHookString: 'generic string',
      blogPostTitle: null,
      blogPostBody: null,
      blogPostImgTitle: null,
      blogPostImgUrl: null,
    }
  },
  beforeCreate() {
    console.log('beforeCreate:', this.testingHookString);
  },
  created() {// Greate time for fetch data.
    console.log('created:', this.testingHookString);
    // Fake REST - API 
    // https://jsonplaceholder.typicode.com/
    fetch('https://jsonplaceholder.typicode.com/posts/' + this.id)
    .then(response => response.json())
    .then(json => {
      this.blogPostTitle = json.title
      this.blogPostBody = json.body
    })
    fetch('https://jsonplaceholder.typicode.com/photos/' + this.id)
    .then(response => response.json())
    .then(json => {
      this.blogPostImgTitle = json.title
      this.blogPostImgUrl = json.thumbnailUrl
    })
  },
  beforeMount() {
    console.log('beforeMount:', this.testingHookString);
  },
  mounted() {
    console.log('mounted:', this.testingHookString, this.$el);
  }
}

new Vue({
  el: '#app',
  components: {
    'blog-post': BlogPostComponent
  }, 
  data: {
    // id: [1,2,3]
    id: [1]
  }
})