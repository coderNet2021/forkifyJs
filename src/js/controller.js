import * as model from './modele.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const { recip } = require('prelude-ls');
//console.log(icons);
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/*
npm init
npm  i parcel -D

npm run start
 if we have errorrs : npm install sass@1.26.10
 ana ma ken 3ande errors

 install packages for polifilling Es6 back to es5
 npm i core-js regenerator-runtime



*/

//console.log('Test!!!');
//using el destructuring
// const showReceipe = async function () {
//   try {
//     const res = await fetch(
//       'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
//     );
//     const data1 = await res.json();

//     if (!res.ok) throw new Error(`${data1.message}`);
//     console.log(res, data1);
//     console.log(data1.data.recipe);
//     console.log(data1.status);
//     const { data } = data1;
//     console.log(data);
//     console.log(data.recipe.servings);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const showReceipe = async function () {
//   try {
//     const res = await fetch(
//       'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
//     );
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}`);
//     console.log(res, data);
//     console.log(data.data.recipe);
//     console.log(data.status);
//     const { status, ...data1 } = data;
//     console.log('data 1', data1);
//     console.log(data.data.recipe.servings);
//   } catch (error) {
//     console.log(error);
//   }
// };

const controlRecepies = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    //1 load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
    //console.log(recipe);
  } catch (error) {
    //console.error(error);
    recipeView.renderError(); //`error : ${error} !!! OMG`
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) get search query
    const query = searchView.GetQuery();
    if (!query) return;

    //2) load search results
    await model.loadSearchResults(query);

    //3) render Results
    //console.log(model.state.search.results);
    //all results
    //resultsView.render(model.state.search.results);
    //some results : 
    resultsView.render(model.getSearchResultsPage(6));
    
    //4 ) render iniial pagination buttons
    paginationView.render(model.state.search)
  } catch (error) {
    console.error(error);
    recipeView.renderError(); //`error : ${error} !!! OMG`
  }
};
// controlRecepies();
//controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecepies);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', controlRecepies);
