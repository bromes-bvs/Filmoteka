import { fetchGenre, fetchPopularFilm } from './fetch';
import { prepareGalleryInfo } from './renderFilmList';

import Pagination from 'tui-pagination';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { container, galleryRef } from './refs';
import 'tui-pagination/dist/tui-pagination.css';

export async function markupPopularFilms() {
  if (!localStorage.getItem('genres')) {
    await fetchGenre();
  }

  const response = await fetchPopularFilm(1);
  const { results, total_pages } = response;
  Loading.arrows();
  render(results);
  Loading.remove();

  const instance_1 = new Pagination(container, {
    totalItems: total_pages > 500 ? 500 : total_pages,
    itemsPerPage: 1,
    visiblePages: 5,
    centerAlign: true,
    page: 1,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#">' +
        '<span>...</span>' +
        '</a>',
    },
  });

  instance_1.on('afterMove', async event => {
    let currentPage = event.page;
    const { results } = await fetchPopularFilm(currentPage);
    Loading.arrows();
    render(results);
    Loading.remove();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

export function render(results) {
  const markup = results
    .map(
      ({
        poster_path,
        backdrop_path,
        original_title,
        title,
        genre_ids,
        release_date,
        vote_average,
        id,
      }) =>
        prepareGalleryInfo(
          poster_path,
          backdrop_path,
          original_title,
          title,
          genre_ids,
          release_date,
          vote_average,
          id,
          findGenres
        )
    )
    .join('');
  galleryRef.innerHTML = markup;
}

export function findGenres(genre_ids) {
  try {
    const genresObj = JSON.parse(localStorage.getItem('genres'));
    const { genres } = genresObj;
    return genres
      .filter(({ id }) => genre_ids.includes(id))
      .map(({ name }) => name || 'No genres');
  } catch (error) {
    console.log(error);
  }
}
