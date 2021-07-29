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
  bookmarks:[],//recipe that are bookmarked
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
    
    if(state.bookmarks.some(bookmark=> bookmark.id===id))//some means here any
      state.recipe.bookmarked=true;
      else state.recipe.bookmarked=false;
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
  //console.log(state.search.resultsPerPage, start, end);
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


const persistBookmarks  = function (){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
};
export const addBookmark = function(recipe){
  //add bookmark
  state.bookmarks.push(recipe);

  //mark the current recipe as bookmarked
  //set a new property to the recipe object
  if(recipe.id===state.recipe.id) state.recipe.bookmarked=true ;
  
  persistBookmarks();
}

export const deleteBookmark=function(id){
  //delete Bookmark
  const index = state.bookmarks.findIndex(bookmark=>bookmark.id===id)
  state.bookmarks.splice(index,1);
  
  //mark the current recipe as NOT  bookmarked
  if(id===state.recipe.id) state.recipe.bookmarked=false ;
  
  persistBookmarks();
};

// const init=function(){
//  const storage =  localStorage.getItem('bookmarks');
 
//  if(storage) state.bookmarks=JSON.parse(storage);
// };

const init = function () {
  console.log('test');
   const storage =  localStorage.getItem('bookmarks');
 
 if(storage) state.bookmarks=JSON.parse(storage);
}
init();

// console.log(state.bookmarks);

const clearBookmarks= function(){
  localStorage.clear('bookmarks');
}
// clearBookmarks();

export const uploadRecipe= async function(newRecipe){
  try {
    //console.log(Object.entries(newRecipe));
    const ingredients= Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !=='')
    .map(ing =>
      {
        const ingArr=ing[1].replaceAll(' ','')
        .split(',');
        if(ingArr.length !==3) throw new Error('Wrong ingredient format, please use the correct format');
        
        const [quantity,unit, description] =ingArr;
       
       return { quantity: quantity? +quantity:null ,unit, description};
        
    });
    
    console.log(ingredients);

  } catch (error) {
    throw error;
    
  }
  
  const recipe={
    
  }
}


  