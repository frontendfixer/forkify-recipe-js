import { MODEL_CLOSE_SEC } from './config';
import * as model from './model';
import addRecipeView from './views/add-recipe.view';
import bookmarksView from './views/bookmarks.view';
import paginationView from './views/pagination.view';
import recipeView from './views/recipe.view';
import resultsView from './views/results.view';
import searchView from './views/search.view';

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    recipeView.renderSpinner();

    // 1) Update bookmark view
    bookmarksView.update(model.state.bookmarks);

    // 2) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    // 3) Loading recipe
    await model.loadRecipe(recipeId);
    const { recipe } = model.state;

    // 4) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
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

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add /remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload New recipe
    await model.uploadRecipe(newRecipe);

    // Render upload recipe
    recipeView.render(model.state.recipe);

    // Add success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close from window
    setTimeout(() => addRecipeView.toggleWindow(), MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🎇', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  addRecipeView.addHandlerSubmit(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRecipe(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
