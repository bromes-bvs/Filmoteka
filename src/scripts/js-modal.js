import { galleryRef, containerElem, closeModalBtn, modal } from './refs';
import { fetchMovie, fetchTrailerFilm } from './fetch';
import renderModal from './renderModal';

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';
const QUEUE_LIST_TYPE = 'QUEUE';
const WATCH_LIST_TYPE = 'WATCHED';
let searchId;

closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  modal.classList.remove('is-hidden-modal');
  document.body.classList.add('stop-scroll');
  window.addEventListener('click', handleClickOnBackdrop);
  window.addEventListener('keydown', handleKeyPress);

  const addWatchBtn = document.querySelector('.film__button-add-to-watch');
  const addQueueBtn = document.querySelector('.film__button-add-to-queue');
  const trailerBtn = document.querySelector('.film__button-trailer');

  const isAddToWatch = isAdded(LOCAL_STORAGE_WATCH_KEY, searchId);
  const isAddToQueue = isAdded(LOCAL_STORAGE_QUEUE_KEY, searchId);

  trailerBtn.addEventListener('click', handleBtnTrailerClick);

  if (isAddToWatch) {
    renderBtnAppearance(addWatchBtn, WATCH_LIST_TYPE, true);
    addWatchBtn.addEventListener('click', handleRemoveWatch);
  } else {
    renderBtnAppearance(addWatchBtn, WATCH_LIST_TYPE, false);
    addWatchBtn.addEventListener('click', handleWatchClick);
  }
  if (isAddToQueue) {
    renderBtnAppearance(addQueueBtn, QUEUE_LIST_TYPE, true);
    addQueueBtn.addEventListener('click', handleRemoveQueue);
  } else {
    renderBtnAppearance(addQueueBtn, QUEUE_LIST_TYPE, false);
    addQueueBtn.addEventListener('click', handleQueueClick);
  }
}

function closeModal() {
  modal.classList.add('is-hidden-modal');
  document.body.classList.remove('stop-scroll');
  window.removeEventListener('click', handleClickOnBackdrop);
  window.removeEventListener('keydown', handleKeyPress);

  const addWatchBtn = document.querySelector('.film__button-add-to-watch');
  const addQueueBtn = document.querySelector('.film__button-add-to-queue');
  addWatchBtn.removeEventListener('click', handleWatchClick);
  addQueueBtn.removeEventListener('click', handleQueueClick);

  containerElem.innerHTML = '';
}

function handleKeyPress(e) {
  console.log(e.key);
  if (e.key === 'Escape') {
    closeModal();
  }
}

function handleClickOnBackdrop(e) {
  if (e.target === modal) {
    closeModal();
  }
}

galleryRef.addEventListener('click', handleFilmClick);

async function handleFilmClick(e) {
  if (!e.target.closest('li')) {
    return;
  }
  if (e.target.closest('li')) {
    const id = e.target.closest('li').dataset.id;
    searchId = id;
    await fetchMovie(id).then(data => renderModal(data));
    openModal();
  }
}

function handleWatchClick(e) {
  updateLocalStorageList(e, LOCAL_STORAGE_WATCH_KEY, WATCH_LIST_TYPE);
  e.target.removeEventListener('click', handleWatchClick);
  e.target.addEventListener('click', handleRemoveWatch);
}

function handleQueueClick(e) {
  updateLocalStorageList(e, LOCAL_STORAGE_QUEUE_KEY, QUEUE_LIST_TYPE);
  e.target.removeEventListener('click', handleQueueClick);
  e.target.addEventListener('click', handleRemoveQueue);
}

function handleRemoveWatch(e) {
  removeFromLocalStorage(e, LOCAL_STORAGE_WATCH_KEY, WATCH_LIST_TYPE);
  e.target.removeEventListener('click', handleRemoveWatch);
  e.target.addEventListener('click', handleWatchClick);
}

function handleRemoveQueue(e) {
  removeFromLocalStorage(e, LOCAL_STORAGE_QUEUE_KEY, QUEUE_LIST_TYPE);
  e.target.removeEventListener('click', handleRemoveQueue);
  e.target.addEventListener('click', handleQueueClick);
}

function updateLocalStorageList(event, key, listType) {
  const id = searchId;
  const loadAddedList = localStorage.getItem(key);
  const parsedIdList = JSON.parse(loadAddedList);
  const renderBtn = event.target;

  if (!loadAddedList) {
    const watchSetting = [id];
    setToLocalStorage(watchSetting, key);
    renderBtnAppearance(renderBtn, listType, true);
  }
  if (loadAddedList) {
    parsedIdList.push(searchId);
    setToLocalStorage(parsedIdList, key);
    renderBtnAppearance(renderBtn, listType, true);
  }
}

function setToLocalStorage(idArray, key) {
  localStorage.setItem(key, JSON.stringify(idArray));
}

function isAdded(key, id) {
  const idArray = JSON.parse(localStorage.getItem(key));
  const isAdd = idArray ? idArray.find(value => value === id) : false;
  return isAdd;
}

function renderBtnAppearance(button, type, isActive) {
  if (isActive) {
    button.classList.add('film__button--already-in-list');
    button.textContent = `REMOVE FROM ${type} LIST`;
  } else {
    button.classList.remove('film__button--already-in-list');
    button.textContent = `ADD TO ${type}`;
  }
}

function removeFromLocalStorage(event, key, listType) {
  const findeId = searchId;
  const renderBtn = event.target;
  const includesId = JSON.parse(localStorage.getItem(key));
  const updateId = includesId.filter(id => id !== findeId);
  setToLocalStorage(updateId, key);
  renderBtnAppearance(renderBtn, listType, false);
}

function handleBtnTrailerClick(e) {
  const placeContainerElem = document.querySelector('.film__trailer-place');
  const id = searchId;
  fetchTrailerFilm(id).then(({ results }) => {
    let key = results[0].key;
    placeContainerElem.innerHTML = `<iframe class ="film__trailer" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
  e.target.setAttribute('disabled', true);
}
