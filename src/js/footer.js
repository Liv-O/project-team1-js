import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { smoothScroll } from './header';

const emailInput = document.querySelector('#footerMail');
const emailForm = document.querySelector('#formFooter');
const footerLinks = document.querySelectorAll('.footer-anchor-link');

footerLinks.forEach((link) => link.addEventListener('click', smoothScroll));

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

emailForm.addEventListener('submit', e => {
  e.preventDefault();
  iziToast.destroy();

  const valueEmail = emailInput.value.trim().toLowerCase();
  if (valueEmail === '') {
    iziToast.show({
      message: 'Поле e-mail не може бути порожнім!',
      color: 'red',
      timeout: 5000,

      position: 'center',
    });
    return;
  }

  if (!emailPattern.test(valueEmail)) {
    iziToast.show({
      message: 'Некоректний e-mail!',
      color: 'red',
      timeout: 2500,

      position: 'center',
    });
    return;
  }

  iziToast.show({
    message: `Дякуємо, ваш e-mail "${valueEmail}" успішно відправлено!`,
    color: 'green',
    timeout: 4000,

    position: 'center',
  });

  emailInput.value = '';
});
