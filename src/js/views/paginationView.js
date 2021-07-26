import View from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  
  
  addHandlerClick(handler){
      this._parentElement.addEventListener('click', function(e){
          
      })
  }
  _generateMarkup(){
      const curPage = this._data.page;
      const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);
      //console.log(numPages);
      
      // page 1 and there are other pages
      if(curPage ===1 && numPages>1) return `
      <button class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
      
      // Last Page 
      if(curPage === numPages && numPages>1) 
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage-1}</span>
     </button>
    `;
      
      //other pages 
      if(curPage <numPages) return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${curPage-1}</span>
   </button>
   <button class="btn--inline pagination__btn--next">
   <span>Page ${curPage+1}</span>
   <svg class="search__icon">
     <use href="${icons}#icon-arrow-right"></use>
   </svg>
 </button>
 `;
      
      
      // page 1 and there are NO Other pages
      return ``;
    }
}

export default new PaginationView();