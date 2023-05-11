import * as model from './model';
import recipeView from './views/recipe.view';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

// /////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(recipeId);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(`error from control = ${err}`);
  }
};

['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
