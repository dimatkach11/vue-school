const GitHubUserCardComponent = {
  template: '#github-user-card-template',
  props: ['username'],
  data() {
    return {
      githubName: null,
      avatar_url: null,
      html_url: null,
      created_at: null,
      bio: null,
      public_repos: null,
      public_repos_url: null,
    }
  },
  created() {
    fetch('https://api.github.com/users/' + this.username)
    .then(response => response.json())
    .then(json => {
      this.avatar_url = json.avatar_url 
      this.githubName = json.name
      this.html_url = json.html_url
      this.created_at = json.created_at.split('-')[0]
      this.bio = json.bio
      this.public_repos = json.public_repos
      this.public_repos_url = this.html_url + '/?tab=repositories'
    })
  }
}

new Vue({
  el: '#app',
  components: {
    'github-user-card': GitHubUserCardComponent
  },
})