const BlogPostComponent = {
  template: '#blog-post-template',
  props: ['id'],
  data() {
    return {
      blogPostTitle: null,
      blogPostBody: null,
      blogPostImgTitle: null,
      blogPostImgUrl: null,
    }
  },
  created() {
    // axios.get('api/posts/' + this.id)
    // .then(response => {
    //   this.blogPost = response.data
    // })

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
  }
}

new Vue({
  el: '#app',
  components: {
    'blog-post': BlogPostComponent
  }, 
  data: {
    id: [1,2,3]
  }
})