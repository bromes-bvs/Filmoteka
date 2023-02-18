import { backdrop, closeTeamModal, openTeamModal } from './refs';

function onClickOpenTeamModal(e) {
  e.preventDefault();
  if (!e.currentTarget.classList.contains('footer-team__name')) {
    return;
  }

  backdrop.classList.add('is-open');
  backdrop.classList.remove('is-hidden');
}

function onClickCloseTeamModal(e) {
  e.preventDefault();
  if (!e.currentTarget.classList.contains('teammates')) {
    return;
  }
  backdrop.classList.remove('is-open');
  backdrop.classList.add('is-hidden');
}

openTeamModal.addEventListener('click', onClickOpenTeamModal);
closeTeamModal.addEventListener('click', onClickCloseTeamModal);
