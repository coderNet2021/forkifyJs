import * as model from './modele.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

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

    //0 update results view to mark selected search recipe
    resultsView.update(model.getSearchResultsPage());
    //updating bookmark view
    bookmarkView.update(model.state.bookmarks);
    
    //1 load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
    
    
    //console.log(recipe);

    // //test
    // controlServings();
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
    resultsView.render(model.getSearchResultsPage());

    //4 ) render iniial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    recipeView.renderError(); //`error : ${error} !!! OMG`
  }
};

const controlPagination = function (goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4 ) render new pagination buttons
  // new btns should render
  paginationView.render(model.state.search);

  //console.log('goToPage', goToPage);
};

const controlServings = function (newServings) {
  //update the recipe servings in the state
  model.updateServings(newServings);

  //update the view : recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};


//when it will happen? when we click -> view
const controlAddBookmark = function () {
  //1 - add or remove bookmark
  if(!model.state.recipe.bookmarked)
  model.addBookmark(model.state.recipe);
  
  else model.deleteBookmark(model.state.recipe.id)
  //console.log(model.state.recipe);
  
  //2 - update recipe view
  recipeView.update(model.state.recipe);
  
  //3 - render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmarks);
}


const controlAddRecipe = async function( newRecipe){
  
  try {
    console.log(newRecipe);
  
  await model.uploadRecipe(newRecipe);
  //upload the new recipe data
    
  } catch (error) {
    console.error('test error :  ',error);
    addRecipeView.renderError(error.message);
    
  }
  
}

// controlRecepies();
//controlSearchResults();
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  
  recipeView.addHandlerRender(controlRecepies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
  
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener('hashchange', controlRecepies);
