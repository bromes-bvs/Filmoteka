import { fetchMovie } from './fetch';
import { findGenres, render } from './gallery';
import { prepareGalleryInfo, renderFilmList } from './renderFilmList';
import { loadFromLS } from './storage.js';
import { galleryRef } from './refs';

const watchedBtn = document.querySelector('[data-id="watched-btn"]');
const queueBtn = document.querySelector('[data-id="queue-btn"]');
const watchedSet = document.querySelector('.library-buttons__wrapper');

watchedSet.addEventListener('click', makeActiveBtn);

function makeActiveBtn(e) {
  if (e.target.classList.contains('is-active')) {
    return;
  }
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
  return;
}

//============= повідомлення при порожній колекції ===============
const noImgCollectionUrl = new URL(
  '../images/gallery/empty-collection-min.png',
  import.meta.url
);

function emptyCollectionMarkup() {
  const markupcollection =
    `<li><img class="empty-collection-img" width="240" src=${noImgCollectionUrl.pathname}></li><li><p class="empty-collection-text">Collection is empty. You need to add a movie.</p></li>`;
    galleryRef.innerHTML = markupcollection;
    galleryRef.classList.add('empty-gallery');
}

//============= Кнопка Watched ====================================
const LOCALSTORAGE_KEY_WATCHED = 'watch';

onWatchedBtnClick();

function onWatchedBtnClick() {
  galleryRef.innerHTML = '';
  if (!localStorage[LOCALSTORAGE_KEY_WATCHED]) {
    emptyCollectionMarkup();
    return;
  }
 
  if (localStorage[LOCALSTORAGE_KEY_WATCHED]) {
    const arrayFromLSWatch = loadFromLS(LOCALSTORAGE_KEY_WATCHED);
    if (arrayFromLSWatch.length === 0) {
      emptyCollectionMarkup();
      return;
    }
    if (galleryRef.classList.contains('empty-gallery')) {
      galleryRef.classList.remove('empty-gallery');
    }
    const filmPromisesWatch = arrayFromLSWatch.map(id => fetchMovie(id));

    Promise.all(filmPromisesWatch).then(results => {
      const markup = results
        .map(
          ({
            poster_path,
            backdrop_path,
            original_title,
            title,
            genres,
            release_date,
            vote_average,
            id,
          }) => {
            const genres_ids = genres.map(genre => genre.id);
            return prepareGalleryInfo(
              poster_path,
              backdrop_path,
              original_title,
              title,
              genres_ids,
              release_date,
              vote_average,
              id,
              findGenres
            );
          }
        )
        .join('');
      galleryRef.innerHTML = markup;
    });
  }
}

watchedBtn.addEventListener('click', onWatchedBtnClick);

//============= Кнопка Queue ====================================
const LOCALSTORAGE_KEY_QUEUE = 'queue';

function onQueueBtnClick() {
  galleryRef.innerHTML = '';
  if (!localStorage[LOCALSTORAGE_KEY_QUEUE]) {
    emptyCollectionMarkup();
    return;
  }
  if (localStorage[LOCALSTORAGE_KEY_QUEUE]) {
    const arrayFromLSQueue = loadFromLS(LOCALSTORAGE_KEY_QUEUE);
    if (arrayFromLSQueue.length === 0) {
      emptyCollectionMarkup();
      return;
    }
    if (galleryRef.classList.contains('empty-gallery')) {
      galleryRef.classList.remove('empty-gallery');
    }
    const filmPromisesQueue = arrayFromLSQueue.map(id => fetchMovie(id));

    Promise.all(filmPromisesQueue).then(results => {
      const markup = results
        .map(
          ({
            poster_path,
            backdrop_path,
            original_title,
            title,
            genres,
            release_date,
            vote_average,
            id,
          }) => {
            const genres_ids = genres.map(genre => genre.id);
            return prepareGalleryInfo(
              poster_path,
              backdrop_path,
              original_title,
              title,
              genres_ids,
              release_date,
              vote_average,
              id,
              findGenres
            );
          }
        )
        .join('');
      galleryRef.innerHTML = markup;
    });
  }
}

queueBtn.addEventListener('click', onQueueBtnClick);
