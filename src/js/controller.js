import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpier();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if(!query) return

    await model.loadSearchResults(query);
    console.log(model.state.search.results)

    resultsView.render(model.state.search.results)
    resultsView.renderError()
  } catch (err) {
    console.log(err)
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearchResult(controllSearchResult);
};
init();
