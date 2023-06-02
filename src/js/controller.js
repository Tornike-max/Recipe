import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpier();

    // ვანახლებ ნაჩვენები შედეგს ახლით.
    resultsView.update(model.getSearchResultPage())
    bookmarksView.update(model.state.bookmarks)

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResult = async function () {
  try {
    resultsView.renderSpier()
    
    const query = searchView.getQuery();
    if(!query) return

    await model.loadSearchResults(query);
    

    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage())

    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
};

const controllPagination = function(goToPage){
  resultsView.render(model.getSearchResultPage(goToPage))

  //render pagination buttons
  paginationView.render(model.state.search)
}


const controllServings = function(updateTo){
  model.updateServings(updateTo)

  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmarks = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)  
    
  recipeView.render(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  recipeView.addHandlerServings(controllServings);
  recipeView.addHandlerBookmarks(controlAddBookmarks);
  searchView.addHandlerSearchResult(controllSearchResult);
  paginationView.addHandlerClick(controllPagination);
};

init();
