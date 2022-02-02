class Github {
  constructor() {
    this.url = "https://api.github.com/users/";
  }
  async getRequest(username) {
    const response = await fetch(this.url + username);
    const responseUser = await response.json();
    const repos = await fetch(this.url + username + "/repos");
    const responseRepo = await repos.json();
    return { user: responseUser, repo: responseRepo };
  }
}
