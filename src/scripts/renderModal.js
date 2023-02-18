import { containerElem } from './refs';

function renderModal({
  title,
  vote_average,
  vote_count,
  popularity,

  original_title,
  genres,
  overview,
  poster_path,
}) {
  const ganresMarkup = genres
    .map(genre => {
      return genre.name;
    })
    .join(', ');
  const markup = `<div class ="film__content-wrapper"><img class="film__poster" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="Poster to film ${original_title}" />
          <div class="film__content-wrapper--main">
            <h1 class="film__title">${title.toUpperCase()}</h1>
            <ul class="film__properties-list">
              <li class="film__properties-item">
                <p class="film__propertie-name">Vote/Votes</p>
                <span class="film__vote-text">${vote_average.toFixed(1)}</span>
                <p class="film__propertie-name--slesh">/</p>
                <span class="film__votes-text">${vote_count}</span>
              </li>
              <li class="film__properties-item">
                <p class="film__propertie-name">Popularity</p>
                <span class="film__popularity-text">${popularity.toFixed(
                  2
                )}</span>
              </li>
              <li class="film__properties-item">
                <p class="film__propertie-name">Original Title</p>
                <span class="film__original-text">${original_title.toUpperCase()}</span>
              </li>
              <li class="film__properties-item">
                <p class="film__propertie-name">Genre</p>
                <span class="film__genre-text">${ganresMarkup}</span>
              </li>
            </ul>
            <h2 class="film__about">ABOUT</h2>
            <p class="film__about-text">${overview}</p><button class="film__button-add-to-watch" type="button">
            ADD TO WATCHED
          </button>
          <button class="film__button-add-to-queue" type="button">
            ADD TO QUEUE
          </button> <button class="film__button-trailer" type="button">
            WATCH TRAILER<span class="youtube-icon"></span>
          </button></div></div><div class="film__trailer-place"></div>`;

  containerElem.insertAdjacentHTML('afterbegin', markup);
}

export default renderModal;
