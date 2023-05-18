/* eslint-disable import/no-extraneous-dependencies */
import { html } from 'code-tag';
import fracty from 'fracty';

import Base from './base.view';
import icons from '../../img/icons.svg';

class RecipeView extends Base {
  _parentEl = document.querySelector('.recipe');

  _errorMessage = 'This recipe is not found. Please try another one!';

  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  addHandlerRecipe(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    const {
      title,
      publisher,
      sourceUrl,
      image,
      servings,
      cookingTime,
      ingredients,
    } = this._data;

    return html`
      <figure class="recipe__fig">
        <img src=${image} alt=${title} class="recipe__img" />
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes"
            >${cookingTime}</span
          >
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people"
            >${servings}</span
          >
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button
              class="btn--tiny btn--update-servings"
              data-update-to=${servings - 1}
            >
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button
              class="btn--tiny btn--update-servings"
              data-update-to=${servings + 1}
            >
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated"></div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use
              href="${icons}#icon-bookmark${this._data.bookmarked
                ? '-fill'
                : ''}"
            ></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredients
            .map(ingredient => this.#generateMarkupIngredient(ingredient))
            .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href=${sourceUrl} target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  #generateMarkupIngredient(ing) {
    const { description, unit, quantity } = ing;

    return html`
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${quantity ? fracty(quantity) : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
