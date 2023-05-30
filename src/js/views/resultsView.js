import icons from 'url:../../img/icons.svg';


class ResultsView {
    _parentElement = document.querySelector('.results');
    _data;
    #Errormessage = 'No recipes found for your query. Please try again!';
    #message = '';


    render(data) {
        this._data = data;
        console.log(this._data,'❇️❇️❇️');
        const markup = this._generateMarkup();
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

      renderError(message = this.#Errormessage) {
        const markup = `
         <div class="error">
         <div>
           <svg>
             <use href="${icons}#icon-alert-triangle"></use>
           </svg>
         </div>
         <p>${message}</p>
       </div>     
         `;
         this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

    _generateMarkup(){
        return `
        <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
        `
    }

}


export default new ResultsView();