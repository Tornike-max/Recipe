import icons from 'url:../../img/icons.svg';
import View from './View.js'

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _data;
    _Errormessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
    _message = '';

    
    _generateMarkup(){
      console.log(this._data)
      return this._data.map(this._generateMarkupView).join('')
    }

    _generateMarkupView(result){
      const id = window.location.hash.slice(1)
      return `
        <li class="preview">
        <a class="preview__link ${result.id === id ?'preview__link--active' : ''}" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            
          </div>
        </a>
      </li>
        `
    }

}


export default new BookmarksView();