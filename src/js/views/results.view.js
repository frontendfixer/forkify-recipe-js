import Base from './base.view';
import previewView from './preview.view';

class ResultsView extends Base {
  _parentEl = document.querySelector('.results');

  _errorMessage = 'No recipe found for this query. Please try another one!';

  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    const recipes = this._data;
    return recipes.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
