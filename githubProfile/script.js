const APIURL = "https://api.github.com/users/";
const container = document.querySelector(".container");
const form = document.querySelector(".form");
const input = document.querySelector(".search");

const getUser = async function (username) {
  const response = await fetch(APIURL + username);
  const data = await response.json();

  createUserCard(data);
  console.log(data);
};

const createUserCard = function (user) {
  container.innerHTML = "";
  const markup = `
    <div class="main-card">
    <img src="${user["avatar_url"]}" alt="${user["name"]}" />
    <div class="user-info">
      <div class="name">
        <h2>${user["name"]}</h2>
        <span>${user["company"] ? user["company"] : user["blog"]}</span>
      </div>
      <div class="description">
        <p>
         ${user["bio"]}
        </p>
      </div>
      <ul class="info">
        <li>${user["followers"]} Followers</li>
        <li>${user["following"]} Following</li>
        <li>${user["public_repos"]} Repository</li>
      </ul>
      <div class="repository">
      </div>
    </div>
  </div>
    `;
  container.insertAdjacentHTML("beforeend", markup);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = input.value;
  getUser(user);
  getRepos(user);
});

const getRepos = async function (username) {
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();

  createUserRepo(data);
  console.log(data);
};

const createUserRepo = function (repos) {
  console.log(repos);
  const markup = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .map((user) => {
      return `<a href="${user["html_url"]}" target="_blank">${user["name"]}</a>`;
    })
    .join("");
  console.log(markup);

  const repo = document.querySelector(".repository");
  repo.insertAdjacentHTML("afterbegin", markup);
};
