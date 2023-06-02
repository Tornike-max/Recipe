import icons from 'url:../../img/icons.svg';
import View from './View.js'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;


  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if(!btn) return
      const goToPage = +btn.dataset.goto
      console.log(goToPage)
      console.log(btn)
      handler(goToPage)
    })
  }

  _generateMarkup(){
    console.log(this._data,'🤷‍♂️')
    const numPages = Math.ceil(this._data.results.length / this._data.resPerPage)

    const currentPage = this._data.page;

    if(currentPage === numPages && currentPage > 1){
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
            </svg>
           <span>${currentPage - 1}</span>
        </button>
        `
    }

    if(currentPage > 0 && currentPage === 1){
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>       
        `
    }

    if(currentPage > 1 && currentPage < 6){
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
            </svg>
           <span>${currentPage - 1}</span>
        </button>
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
        `
    }

    return ''

  }
  
  

}

export default new PaginationView();