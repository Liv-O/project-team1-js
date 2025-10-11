import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.hero-slider', {
  slidesPerView: 1,
  slidesPerGroup: 1,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  navigation: {
    nextEl: '.hero-button-next',
    prevEl: '.hero-button-prev',
  },
});

const prevButton = document.querySelector('.hero-button-prev');
const nextButton = document.querySelector('.hero-button-next');

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
