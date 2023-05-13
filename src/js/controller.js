import * as model from './model';
import recipeView from './views/recipe.view.js';
import searchView from './views/search.view.js';
import resultsView from './views/results.view.js';
import paginationView from './views/pagination.view';

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

const controlSearchResults = async function () {
  resultsView.renderSpinner();

  // 1) Load Search
  const query = searchView.getQuery();
  if (!query) return;

  // 2) Load Search Result
  await model.loadSearchResults(query);

  // 3) render  search result
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultPage());

  // 4) render initial pagination button
  paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
  // 3) Render new  search result
  resultsView.render(model.getSearchResultPage(goToPage));

  // 4) Render new pagination button
  paginationView.render(model.state.search);
};

const init = (function () {
  recipeView.addHandlerRecipe(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();
