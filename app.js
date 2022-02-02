const lastList = document.getElementById("last-users");
const form = document.getElementById("github-form");
const userNameInput = document.getElementById("githubname");
const clearAll = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();
function eventListeners() {
  form.addEventListener("submit", getDataFromGithub);
  document.addEventListener("DOMContentLoaded", getDataFromStorages);
  clearAll.addEventListener("click", clearAllDatas);
}
function getDataFromGithub(e) {
  let userName = userNameInput.value.trim();
  if (userName === "") alert("Bir Veri Giriniz");
  else {
    github
      .getRequest(userName)
      .then((response) => {
        if (response.user.message != "Not Found") {
          ui.addUserToUI(response.user);
          Storage.addDataToStorage(userName);
          ui.addReposToUI(response.repo);
          ui.addsearchedUsers(userName);
          ui.clearInput();
          ui.displayMessages("success", "Başarıyla Eklendi");
        } else ui.displayMessages("danger", "Kullanıcı Bulunamadı");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  e.preventDefault();
}
function getDataFromStorages() {
  let users = Storage.getDataFromStorage();
  let result = "";
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML += result;
}

function clearAllDatas() {
  if (localStorage.getItem("searched") != null) {
    if (confirm("Gerçekten Silmek İstediğinize Emin misiniz?")) {
      localStorage.removeItem("searched");
      document.location.reload();
    }
  }
}
