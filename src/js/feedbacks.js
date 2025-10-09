// Імпортуємо Swiper і потрібні модулі
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Імпортуємо стилі
import 'swiper/css';
// cd

// Ініціалізація Swiper
const swiper = new Swiper('.swiper-div', {
  modules: [Navigation, Pagination], // додаємо модулі
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    addIcons: false,
  },

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
