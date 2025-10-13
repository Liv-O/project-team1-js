import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const contactModal = document.querySelector('.backdrop-contact-modal');
const closeBtnContactModal = document.querySelector('.modal-close-btn');
const subtitleModal = document.querySelector('.contact-modal-text');

//  JS-code for section Events Booksy

// const eventList = document.querySelector('.events-list');
// eventList.addEventListener("click", (event) => {
//   const openBtn = event.target.closest(".event-btn");
//   if (!openBtn) {
//     return;
//   }
//   const eventItem = openBtn.closest(".event-item");
//   if (!eventItem) {
//     return;
//   }
//   const eventTitle = eventItem.querySelector(".event-subtitle").textContent;
//   subtitleModal.textContent = eventTitle;

//   openBtnContactModal();
// });


export function openBtnContactModal(eventTitle) {
  subtitleModal.textContent = eventTitle;
  contactModal.classList.remove("window-is-invisible");
  document.body.classList.add("not-scrolling-page");

  document.addEventListener("keydown", onEscKeyPress);
}

closeBtnContactModal.addEventListener('click', closeContactModal);

contactModal.addEventListener('click', event => {
  if (event.target === contactModal) {
    closeContactModal();
  }
});

function closeContactModal() {
  contactModal.classList.add('window-is-invisible');
  document.body.classList.remove('not-scrolling-page');

  document.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeContactModal();
  }
}

//  Submit Contact Form

const contactModalForm = document.querySelector('.contact-modal-form');
contactModalForm.addEventListener('submit', event => {
  event.preventDefault();

  const userName = contactModalForm.elements.name.value.trim().toLowerCase();
  const userEmail = contactModalForm.elements.email.value.trim().toLowerCase();
  const userMessage = contactModalForm.elements.message.value
    .trim()
    .toLowerCase();

  if (!userName || !userEmail) {
    iziToast.error({
      title: 'Error',
      message: 'Please, fill in the Name and Email fields!',
      position: 'topRight',
    });
    return;
  }

  iziToast.success({
    title: 'Congratulations!',
    message: 'Data sent. Have a nice day)',
    position: 'topRight',
  });

  const userData = {
    name: userName,
    email: userEmail,
    message: userMessage,
  };
  console.log(userData);

  contactModalForm.reset();
});
