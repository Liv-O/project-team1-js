import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import axios from 'axios';

const bookModal = document.querySelector('.backdrop-book-modal');
const closeBtnBookModal = document.querySelector('.book-modal-close-btn');

const bookImgContainer = document.querySelector('.book-img-container');
const bookModalInfo = document.querySelector('.book-modal-info');

const BASE_URL = 'https://books-backend.p.goit.global/';

// JS-code for section Books List

// bookList я бачив в тебе вже є, цей можеш видалити, це я для себе писав
// const bookList = document.querySelector('.books-list');
// bookList.addEventListener('click', async event => {
//   if (!event.target.classList.contains('book-item-btn')) {
//     return;
//   }

//   openBookModal();
//   const bookId = event.target.dataset.bookId;
//   await fetchBookId(bookId);
// });

// function openBookModal() {
//   bookModal.classList.remove('window-is-invisible');
//   document.body.classList.add('not-scrolling-page');

//   document.addEventListener('keydown', onEscKeyPressInBookModal);
// }

export async function fetchBookId(id) {
  try {
    const response = await axios.get(`${BASE_URL}books/${id}`);
    const book = response.data;

    renderBook(book);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error while querying',
      position: 'topRight',
    });
    console.error('Error while querying: ', error);
  }
}

function renderBook(book) {
  bookImgContainer.innerHTML = `<img src="${book.book_image}" alt="${book.title}" class="book-img" />`;
  bookModalInfo.innerHTML = `
  <h2 class="book-title">${book.title}</h2>
  <p class="book-author">${book.author}</p>
  <p class="book-price">$${book.price}</p>
  `;
}

export function openBookModal() {
  bookModal.classList.remove('window-is-invisible');
  document.body.classList.add('not-scrolling-page');

  document.addEventListener('keydown', onEscKeyPressInBookModal);
}

closeBtnBookModal.addEventListener('click', closeBookModal);

bookModal.addEventListener('click', event => {
  if (event.target === bookModal) {
    closeBookModal();
  }
});

function closeBookModal() {
  bookModal.classList.add('window-is-invisible');
  document.body.classList.remove('not-scrolling-page');

  document.removeEventListener('keydown', onEscKeyPressInBookModal);
}

function onEscKeyPressInBookModal(event) {
  if (event.key === 'Escape') {
    closeBookModal();
  }
}

// Form quantity book

const quantityInput = document.querySelector('#quantity');
const minusBtn = document.querySelector('.neg-book-btn');
const plusBtn = document.querySelector('.add-book-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const buyNowBtn = document.querySelector('.buy-now-btn');

function getQuantity() {
  return Number(quantityInput.value);
}

plusBtn.addEventListener('click', () => {
  quantityInput.value = getQuantity() + 1;
});

minusBtn.addEventListener('click', () => {
  const currentValue = getQuantity();
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

addToCartBtn.addEventListener('click', event => {
  event.preventDefault();

  console.log('Number of selected books:', getQuantity());

  iziToast.success({
    title: 'Success',
    message: `Added ${getQuantity()} book(s) to cart`,
    position: 'topRight',
  });
});

buyNowBtn.addEventListener('click', event => {
  event.preventDefault();

  iziToast.info({
    title: '',
    message: 'Thank you for your purchase',
    position: 'topRight',
  });
});

new Accordion('.accordion-container', {
  duration: 300,
  showMultiple: true,
});
