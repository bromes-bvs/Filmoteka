const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.form');
const containerElem = document.querySelector('.modal__wrapper');

const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');

const goTop = document.getElementById('go-top');
const headerContainer = document.querySelector('.header__container');

const footerModal = document.querySelector('.footer__modal');
const openTeamModal = document.querySelector('.footer-team__name');
const closeTeamModal = document.querySelector('#teammates');
const backdrop = document.querySelector('.backdrop__footer');

const clickBox = document.querySelector('#theme-switch-toggle');
const inputChangeTheme = document.querySelector('.theme-switch__toggle');

const notifyRef = document.querySelector('.form__search-fail');
const container = document.getElementById('tui-pagination-container');

const openModalAuth = document.querySelector('[data-auth-open]');
const closeLoginBtn = document.querySelector('[data-login-close]');
const closeRegBtn = document.querySelector('[data-register-close]');
const closeResultBtn = document.querySelector('[data-result-close]');
const modalAuth = document.querySelector('[data-auth-modal]');
const headerLibrary = document.querySelector('.library-item');

export {
  galleryRef,
  formRef,
  openModalBtn,
  closeModalBtn,
  modal,
  containerElem,
  goTop,
  headerContainer,
  footerModal,
  openTeamModal,
  closeTeamModal,
  backdrop,
  openModalAuth,
  closeLoginBtn,
  closeRegBtn,
  closeResultBtn,
  modalAuth,
  clickBox,
  inputChangeTheme,
  headerLibrary,
  notifyRef,
  container,
};
