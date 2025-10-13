import axios from "axios";

import { openBookModal, fetchBookId } from "./book-modal"

const booksCategoriesDesktopList = document.querySelector('#books-categories-desktop-list');
const categoriesDropdownWrapper = document.querySelector('.categories-dropdown-wrapper');
const categoriesDropdownBtn = document.querySelector('.categories-dropdown-btn');
const booksCategoriesDropdownList = document.querySelector('#books-categories-dropdown-list');
const booksList = document.querySelector('.books-list');
const booksShown = document.querySelector('.books-shown-quantity');
const booksLoadMoreBtn = document.querySelector('.books-load-more');

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books';

let currentBooksLimit = 0;
let allBooksData = []; 
let currentCategory = "all";
const SHOW_MORE_QUANTITY = 4;

function getInitialBooksLimit() {
  return window.innerWidth >= 1440 ? 24 : 10;
}

function renderBooks() {
  if (!allBooksData.length) {
    booksList.innerHTML = "<li class='books-list-problem'>No books found</li>";
    booksShown.textContent = "0 books";
    booksLoadMoreBtn.classList.add('books-hidden');
    return;
  }

  const booksToRender = allBooksData.slice(0, currentBooksLimit);

  booksList.innerHTML = booksToRender.map(book => `
      <li class="book-list-item">
          <img class="book-item-img" src="${book.book_image}" alt="${book.title}" />
          <div class="book-item-description">
            <div class="book-description-text">
              <div class="book-title-and-author">
                <h3 class="book-item-title">${toTitleCase(book.title) || "No Title"}</h3>
                <p class="book-item-author">${book.author || "Unknown Author"}</p>
              </div>
              <p class="book-item-price">$${parseInt(book.price)}</p>
            </div>
            <button class="book-item-btn" type="button" data-book-id="${book._id}">Learn More</button>
          </div>
      </li>
  `).join('');

  booksShown.textContent = `Showing ${booksToRender.length} of ${allBooksData.length} books`;
  booksLoadMoreBtn.classList.toggle('books-hidden', currentBooksLimit >= allBooksData.length);
}

function createCategoryHtml(categories) {
  let html = `<li class="category-list-item active" data-category-name="all">All categories</li>`;
  categories.forEach(cat => {
    if (cat.list_name?.trim()) {
      html += `<li class="category-list-item" data-category-name="${cat.list_name}">${cat.list_name}</li>`;
    }
  });
  return html;
}

function setActiveCategory(container, clickedItem) {
  const currentActive = container.querySelector('.category-list-item.active');
  if (currentActive) currentActive.classList.remove('active');
  clickedItem.classList.add('active');
}

function addCategoryListeners(container, isDropdown = false) {
  container.querySelectorAll('.category-list-item').forEach(item => {
    item.addEventListener('click', event => {
      setActiveCategory(container, event.target);
      loadBooks(event.target.dataset.categoryName);

      if (isDropdown) {
        const dropdownText = categoriesDropdownBtn.querySelector('.categories-dropdown-text');
        dropdownText.textContent = event.target.textContent;
        container.classList.add('books-hidden');
      }
    });
  });
}

async function loadCategories() {
  const isMobile = window.innerWidth < 1440;
  const activeContainer = isMobile ? booksCategoriesDropdownList : booksCategoriesDesktopList;

  activeContainer.innerHTML = '<li>Loading categories...</li>';

  try {
    const { data } = await axios.get('/category-list');
    const html = createCategoryHtml(data);
    activeContainer.innerHTML = html;

    addCategoryListeners(activeContainer, isMobile);

    if (isMobile) {
      const dropdownText = categoriesDropdownBtn.querySelector('.categories-dropdown-text');
      const initialActive = activeContainer.querySelector('.category-list-item.active');
      dropdownText.textContent = initialActive?.textContent || 'All categories';
    }

  } catch (error) {
    activeContainer.innerHTML = '<li>Error loading categories</li>';
  }
}

async function loadBooks(category, isLoadMore = false) {
  if (!isLoadMore) {
    booksList.innerHTML = "<li class='books-list-problem'>Loading books...</li>";
    booksShown.textContent = "";
    booksLoadMoreBtn.classList.add('books-hidden');
    currentBooksLimit = getInitialBooksLimit();
    allBooksData = [];
    currentCategory = category;
  } else {
    currentBooksLimit += SHOW_MORE_QUANTITY;
  }

  const url = category === "all" ? '/top-books' : `/category?category=${category}`;

  try {
    if (!allBooksData.length || !isLoadMore) {
      const { data } = await axios.get(url);

      let tempAllBooks = [];
      if (category === "all") {
        data.forEach(cat => {
          if (cat.books?.length) tempAllBooks.push(...cat.books);
        });
      } else {
        tempAllBooks = data;
      }

      const seenTitles = new Set();
      allBooksData = tempAllBooks.filter(book => {
        const key = (book.title || "").toLowerCase().trim();
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      });
    }

    renderBooks();

  } catch (error) {
    booksList.innerHTML = "<li class='books-list-problem'>Error loading books</li>";
    booksShown.textContent = "Error";
    booksLoadMoreBtn.classList.add('books-hidden');
  }
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

booksLoadMoreBtn.addEventListener('click', () => loadBooks(currentCategory, true));
categoriesDropdownBtn.addEventListener('click', () => booksCategoriesDropdownList.classList.toggle('books-hidden'));

document.addEventListener('click', e => {
  if (!categoriesDropdownWrapper.contains(e.target) && !booksCategoriesDropdownList.classList.contains('books-hidden')) {
    booksCategoriesDropdownList.classList.add('books-hidden');
  }
});

booksList.addEventListener('click', async e => {
  if (!e.target.classList.contains('book-item-btn')) return;
  const bookId = e.target.dataset.bookId;
  openBookModal();
  await fetchBookId(bookId);
});

loadCategories().then(() => loadBooks("all"));
