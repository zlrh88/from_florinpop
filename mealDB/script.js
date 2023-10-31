const favMeals = document.querySelector(".fav-meals");
const searchMeal = document.querySelector("header input");
const btnSearch = document.querySelector("header button");
const randomContainer = document.querySelector(".random-container");
const list = document.querySelector(".meal-info-container");

const getRandomMeal = async function () {
  const respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  const data = await respone.json();
  const mealData = data.meals[0];

  addMeal(mealData);
};

const getMealBySearch = async function (search) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const data = await response.json();

  const meals = data.meals;
  return meals;
};

const getMealBySearchId = async function (id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();

  const meal = data.meals[0];

  return meal;
};

const addMeal = function (mealData) {
  const markup = `
            <div class="random-meal">
              <div class="image">
                <span>Random Meals </span>
                <img
                  src="${mealData.strMealThumb}"
                  alt="${mealData.Meal}"
                />
              </div>
              <div class="description">
                <h3 class="text">${mealData.strMeal}</h3>
                <button class="favorite">
                  <i class="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
        `;
  randomContainer.insertAdjacentHTML("afterbegin", markup);
  const meal = randomContainer.querySelector(".image");
  mealInfo(mealData, meal);
  btnFav(mealData);
};

const btnFav = function (meal) {
  const btn = document.querySelector(".favorite");
  btn.addEventListener("click", function (e) {
    if (btn.classList.contains("active")) {
      removeMealLS(meal.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(meal.idMeal);
      btn.classList.add("active");
    }

    favMeals.innerHTML = "";
    fetchFavMeal();
  });
};

const addMealToFav = function (meal) {
  const markup = `
          <li>
              <img
                  src="${meal.strMealThumb}"
                  alt="${meal.strMeal}"
              />
              <span>${meal.strMeal}</span>
              <button class="clear"> <i class="fas fa-window-close"> </i></button>
          </li>
      `;
  favMeals.insertAdjacentHTML("afterbegin", markup);
  const btn = favMeals.querySelector("li .clear");
  btn.addEventListener("click", (e) => {
    removeMealLS(meal.idMeal);
    fetchFavMeal();
  });
  const img = favMeals.querySelector("li img");
  img.addEventListener("click", function (e) {
    mealInfo(meal, img);
  });
};

const addMealLS = function (mealId) {
  const mealIds = getMealLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

const getMealLS = function () {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
};

const removeMealLS = function (mealId) {
  const mealIds = getMealLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
};

const fetchFavMeal = async function () {
  favMeals.innerHTML = "";
  const mealIds = getMealLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const mealData = await getMealBySearchId(mealId);

    addMealToFav(mealData);
  }
};

const mealInfo = function (mealData, meal) {
  //   const data = Object.entries(mealData);
  //   const bahan = data.filter((ing) => {
  //     if (ing[0].includes("strIngredient") && ing[1] !== "") return ing;
  //   });
  //   const measures = data.filter((measure) => {
  //     if (measure[0].includes("strMeasure") && measure[1] !== "") return measure;
  //   });

  //   const ingredients = bahan.map((_, i) => `${measures[i][1]} - ${bahan[i][1]}`);

  const ingredients = [];
  for (let i = 0; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strMeasure" + i]} - ${mealData["strIngredient" + i]}`
      );
    }
  }

  const markup = `
                  <div class="meal-info">
                  <button class="clear"> <i class="fas fa-window-close"> </i></button>
                      <div class="image">
                      <img src="${mealData.strMealThumb}" />
                      </div>
                      <div class="description">
                      <h2 class="text">${mealData.strMeal}</h3>
                      <h4>Meal ingredients</h4>
                      <ul class="ingredients">
                      ${ingredients.map((i) => `<li>✔ ${i}</li>`).join("")}
                          </ul>
                      </div>
                  </div>

        `;

  meal.addEventListener("click", function (e) {
    list.innerHTML = markup;
    list.style.display = "flex";
    const btn = list.querySelector(".clear");
    btn.addEventListener("click", function (e) {
      list.style.display = "none";
    });
  });
};

getRandomMeal();
fetchFavMeal();
btnSearch.addEventListener("click", async function (e) {
  const data = searchMeal.value;
  const responses = await getMealBySearch(data);

  randomContainer.innerHTML = "";
  responses.forEach((response) => addMeal(response));
});
