import Swiper from 'swiper/bundle';
import { openBtnContactModal } from './contact-modal';


const eventsSlider = new Swiper('.events-swiper', {
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.events-button-next',
    prevEl: '.events-button-prev',
  },
  keyboard: {
    enabled: true, // Увімкнути керування з клавіатури
    onlyInViewport: true, // Працює лише коли слайдер у полі зору
  },
  grabCursor: true,
  breakpoints: {
    375: {
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


//  JS-code for section Events Booksy

const eventList = document.querySelector('.events-list');
eventList.addEventListener("click", (event) => {
  const openBtn = event.target.closest(".event-btn");
  if (!openBtn) {
    return;
  }
  const eventItem = openBtn.closest(".event-item");
  if (!eventItem) {
    return;
  }
  const eventTitle = eventItem.querySelector(".event-subtitle").textContent;
  // subtitleModal.textContent = eventTitle;

  openBtnContactModal(eventTitle);
});

