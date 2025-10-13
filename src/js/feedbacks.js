import Swiper from 'swiper/bundle';

const feedbackSlider = new Swiper('.swiper-div', {
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

const swiperUL = document.querySelector('.feedbacks');

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

const prevButton = document.querySelector('.feedbacks-button-prev');
const nextButton = document.querySelector('.feedbacks-button-next');

function handleButtonClick(button) {
  if (button) {
    window.requestAnimationFrame(() => button.blur());
  }
}

if (prevButton) {
  prevButton.addEventListener('click', function () {
    handleButtonClick(this);
  });
}

if (nextButton) {
  nextButton.addEventListener('click', function () {
    handleButtonClick(this);
  });
}
