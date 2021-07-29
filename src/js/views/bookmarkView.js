                 
import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  
  addHandlerRender(handlerFunc){
    window.addEventListener('load',handlerFunc);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(bookmark => previewView.render(bookmark,false)).join('');
  }

  
}

export default new BookmarkView();
