
import { API_URL } from './config.js';
import { getJSON } from './views/helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resPerPage: 10,
    page: 1,
  },
  bookmarks:[],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // აქ ვამოწმებთ bookmarks- ერეიში თუ არის რომელიმე bookmark-ი, რომელიც იდენტური იმ აიდის რომელიც ამ ფუნქციას გადაეცემა,
    // თუ არის მაშინ state.recipe-ში ვქმნით bookmarked-ს და ვანიჭებთ true-ს, რადგან ვიცოდეთ ეს კონკრეტული რეცეპტი მონიშნულია თუ არა
    // შესაბამისად წვდომა გვექნება იმ დატაზე რომელიც გვიბრუნდება და შეგვიძლია იქიდანაც გავიგოთ.
    if(state.bookmarks.some(bookmark=> bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe)
  } catch (err) {
    console.log(err.message, '💥💥💥💥');
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
       return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.log(err.message, '💥💥💥💥');
    throw err;
  }
};

export const getSearchResultPage = function(page = state.search.page){
  state.search.page = page
  const start = (page - 1) * state.search.resPerPage;
  const end =  page * state.search.resPerPage;

  return state.search.results.slice(start,end)
}

export const updateServings = function(newServings){
  console.log(state.recipe.servings)
  state.recipe.ingredients.forEach(ing=>{
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings
  })
  state.recipe.servings = newServings ;
}

export const addBookmark = function(recipe){
  state.bookmarks.push(recipe);

  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

export const deleteBookmark = function(id){
  const index = state.bookmarks.findIndex(el=> el.id === id)
  state.bookmarks.splice(index, 1)
  if(id === state.recipe.id) state.recipe.bookmarked = false;
}