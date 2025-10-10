
const openModalBtns = document.querySelectorAll('[data-modal-open]');
const modal = document.querySelector('#register-modal');
const closeModalBtn = modal.querySelector('.modal-close');

openModalBtns.forEach(btn =>
  btn.addEventListener('click', () => {
    modal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  })
);

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('is-hidden');
  document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('is-hidden');
    document.body.style.overflow = '';
  }
});
