/* eslint-disable import/no-extraneous-dependencies */
import { html } from 'code-tag';

import Base from './base.view';

class ResultsView extends Base {
  _parentEl = document.querySelector('.results');

  _errorMessage = 'No recipe found for this query. Please try another one!';

  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    const recipes = this._data;
    return recipes.map(recipe => this._generateMarkupPreview(recipe)).join('');
  }

  _generateMarkupPreview({ id, title, image, publisher }) {
    const curId = window.location.hash.slice(1);

    return html`
      <li class="preview">
        <a
          class="preview__link
          ${curId === id ? 'preview__link--active' : ''}"
          href="#${id}"
        >
          <figure class="preview__fig">
            <img src=${image} alt=${title} />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
