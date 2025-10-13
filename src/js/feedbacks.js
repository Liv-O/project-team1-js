import Swiper from 'swiper/bundle';

const feedbackSlider = new Swiper('.swiper-div', {
  // modules: [Navigation, Pagination, Keyboard, Mousewheel],
  loop: false,
  spaceBetween: 24,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.feedbacks-button-next',
    prevEl: '.feedbacks-button-prev',
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
      feedbackSlider.slidePrev();
    } else {
      feedbackSlider.slideNext();
    }
  }
});
