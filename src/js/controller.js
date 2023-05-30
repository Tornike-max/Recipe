import * as model from './model.js'
import recipeView from './views/recipeView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime'



const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controllRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id)

    if(!id) return
    recipeView.renderSpier()

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)
   
   
  }catch(err){
    console.error(err.message)
  }
};


['hashchange', 'load'].forEach(event=> window.addEventListener(event, controllRecipe))