const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/*
npm init
npm  i parcel -D

npm run start
 if we have errorrs : npm install sass@1.26.10
 ana ma ken 3ande errors


*/

console.log('Test!!!');
