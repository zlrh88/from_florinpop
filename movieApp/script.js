const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const containerMovies = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getMovies = async function (keyword, URL = APIURL) {
  containerMovies.innerHTML = "";
  const response = await fetch(keyword ? SEARCHAPI + keyword : URL);
  const data = await response.json();

  const movies = data.results;
  console.log(movies);

  //   movies.forEach((movie) => {
  //     // const img = `<img src=${IMGPATH + movie.poster_path}></img>`;
  //     // document.body.insertAdjacentHTML("afterbegin", img);
  //     const image = document.createElement("img");
  //     image.src = IMGPATH + movie.poster_path;

  //     document.body.appendChild(image);
  //   });

  movies.forEach((movie) => {
    if (!movie.poster_path) return;
    const markup = `
            <div class="movie">
                <img
                    src=${IMGPATH + movie.poster_path}
                    alt="${movie.title}"
                />
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class=${getClassByRate(movie.vote_average)}> ${
      movie.vote_average
    }</span>
                </div>
                <div class="overview">
                    <h4>Overview</h4>
                    <p>${movie.overview}</p>
                </div>
            </div>
      `;
    containerMovies.insertAdjacentHTML("beforeend", markup);
  });

  return movies;
};

// const getMoviesBySearch = async function (keyword, URL = APIURL) {
//   containerMovies.innerHTML = "";
//   const response = await fetch(SEARCHAPI + keyword);
//   const data = await response.json();

//   const movies = data.results;
//   console.log(movies);

//   movies.forEach((movie) => {
//     const markup = `
//             <div class="movie">
//                 <img
//                     src=${IMGPATH + movie.poster_path}
//                     alt="${movie.title}"
//                 />
//                 <div class="movie-info">
//                     <h3>${movie.title}</h3>
//                     <span class=${getClassByRate(movie.vote_average)}>${
//       movie.vote_average
//     }</span>
//                 </div>
//             </div>
//       `;
//     containerMovies.insertAdjacentHTML("afterbegin", markup);
//   });

//   return movies;
// };

const getClassByRate = function (vote) {
  if (vote >= 8) return "green";
  if (vote < 8 && vote > 5) return "yellow";
  return "red";
};

getMovies();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = search.value;
  getMovies(keyword);
});
