import { html } from 'code-tag';

import Base from './base.view';
import icons from '../../img/icons.svg';

class PaginationView extends Base {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this.#generateMarkupButton('next');
    // Last page
    if (curPage === numPages && numPages > 1)
      return this.#generateMarkupButton('prev');
    //Other page
    if (curPage < numPages) return this.#generateMarkupButton('both');
    // Page 1, and there are no other pages
    return '';
  }
  #generateMarkupButton(type) {
    const curPage = this._data.page;
    if (type === 'next') {
      return html`
        <button
          class="btn--inline pagination__btn--next"
          data-goto="${curPage + 1}"
        >
          <span> Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    if (type === 'prev') {
      return html`
        <button
          class="btn--inline pagination__btn--prev"
          data-goto="${curPage - 1}"
        >
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    if (type === 'both') {
      return html`
        <button
          class="btn--inline pagination__btn--prev"
          data-goto="${curPage - 1}"
        >
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button
          class="btn--inline pagination__btn--next"
          data-goto="${curPage + 1}"
        >
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
  }
}

export default new PaginationView();
