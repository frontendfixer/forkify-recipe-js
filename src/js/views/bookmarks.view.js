import Base from './base.view';
import previewView from './preview.view';

class BookmarksView extends Base {
  _parentEl = document.querySelector('.bookmarks__list');

  _errorMessage = 'No recipe found in bookmarks. Please add one!';

  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const recipes = this._data;
    return recipes
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
