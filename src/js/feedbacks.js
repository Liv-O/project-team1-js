import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';

// Підключаємо базові стилі Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Ініціалізація Swiper
const swiperDiv = new Swiper('.swiper-div', {
  modules: [Navigation, Pagination, Keyboard, Mousewheel],
  loop: false,
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
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  mousewheel: {
    forceToAxis: true,
  },

  simulateTouch: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});

const swiperUL = document.querySelector('.swiper-wrapper');

swiperUL.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    event.preventDefault();

    if (event.shiftKey) {
      swiperDiv.slidePrev();
    } else {
      swiperDiv.slideNext();
    }
  }
});
