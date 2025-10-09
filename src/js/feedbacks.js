import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Підключаємо базові стилі Swiper
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Ініціалізація Swiper
const swiper = new Swiper('.swiper-div', {
  modules: [Navigation, Pagination],
  loop: true,
//   slidesPerView: 1,
  spaceBetween: 24,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    addIcons: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
