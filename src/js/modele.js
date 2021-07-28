import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks:[],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    //
    //let recipe = data.data.recipe;
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
    //console.log(state.recipe);
  } catch (error) {
    //temperory error handling
    //console.log(`${error} !!! oooohhh mG`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    //console.log(` here is the pizza search test :`);
    //console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
    //console.log(state.search.results);
  } catch (error) {
    //console.log(`${error} !!! oooohhh mG`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  console.log(state.search.resultsPerPage, start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  //reach the state recipe ingredients
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //new Qty=oldQunty *NewServing/OldServings // 2*8/4=2*2=4
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function(recipe){
  //add bookmark
  state.bookmarks.push(recipe);

  //mark the current recipe as bookmarked
  //set a new property to the recipe object
  if(recipe.id===state.recipe.id) state.recipe.bookmarked=true ;
}