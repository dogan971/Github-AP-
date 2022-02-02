class Storage {
  static getDataFromStorage() {
    let users;
    if (localStorage.getItem("searched") === null) users = [];
    else users = JSON.parse(localStorage.getItem("searched"));
    return users;
  }
  static addDataToStorage(userName) {
    let users = this.getDataFromStorage();
    if (users.indexOf(userName) === -1) {
      users.push(userName);
      localStorage.setItem("searched", JSON.stringify(users));
    }
  }
}
