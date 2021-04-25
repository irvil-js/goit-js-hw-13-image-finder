import servise from './apiService';
import cardImages from '../templates/templates.hbs';
import refs from './refs';

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();
  servise.searchQuery = input.value;

  servise.fetchImages().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  servise.fetchImages().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
    window.scrollTo(0, 1000);

    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}
function insertListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
function buildListItemsTemplate(items) {
  return cardImages(items);
}
function clearListItems() {
  refs.gallery.innerHTML = '';
}
