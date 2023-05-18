import { html } from 'code-tag';

import Base from './base.view';

class PreviewView extends Base {
  _parentEl = '';

  _generateMarkup() {
    const curId = window.location.hash.slice(1);

    const { id, title, image, publisher } = this._data;

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

export default new PreviewView();
