import axios from "axios";

//import { openBookModal, fetchBookId } from "./book-modal"

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
  const screenWidth = window.innerWidth;
  return screenWidth >= 1440 ? 24 : 10;
}

function renderBooks() {
  if (!allBooksData.length) {
    booksList.innerHTML = "<li>No books found</li>";
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

async function loadCategories() {
  booksCategoriesDesktopList.innerHTML = '<li>Loading categories...</li>';
  booksCategoriesDropdownList.innerHTML = '<li>Loading categories...</li>';

  try {
    const response = await axios.get('/category-list');
    const data = response.data;

    let desktopCategoriesHtml = '<li class="category-list-item active" data-category-name="all">All categories</li>';
    let dropdownCategoriesHtml = '<li class="category-list-item active" data-category-name="all">All categories</li>';

    data.forEach(category => {
      if (category.list_name && category.list_name.trim()) {
        desktopCategoriesHtml += `<li class="category-list-item" data-category-name="${category.list_name}">${category.list_name}</li>`;
        dropdownCategoriesHtml += `<li class="category-list-item" data-category-name="${category.list_name}">${category.list_name}</li>`;
      }
    });

    booksCategoriesDesktopList.innerHTML = desktopCategoriesHtml;
    booksCategoriesDropdownList.innerHTML = dropdownCategoriesHtml;

    booksCategoriesDesktopList.querySelectorAll('.category-list-item').forEach(item => {
      item.addEventListener('click', event => {
        setActiveCategory(booksCategoriesDesktopList, event.target);
        loadBooks(event.target.dataset.categoryName);
      });
    });

    booksCategoriesDropdownList.querySelectorAll('.category-list-item').forEach(item => {
      item.addEventListener('click', event => {
        setActiveCategory(booksCategoriesDropdownList, event.target);
        loadBooks(event.target.dataset.categoryName);
        const dropdownText = categoriesDropdownBtn.querySelector('.categories-dropdown-text');
        dropdownText.textContent = event.target.textContent;
        booksCategoriesDropdownList.classList.add('books-hidden');
      });
    });

    const initialActive = booksCategoriesDropdownList.querySelector('.category-list-item.active');
    if (initialActive) {
      const dropdownText = categoriesDropdownBtn.querySelector('.categories-dropdown-text');
      dropdownText.textContent = initialActive.textContent;
    }

  } catch (error) {
    booksCategoriesDesktopList.innerHTML = '<li>Error loading categories</li>';
    booksCategoriesDropdownList.innerHTML = '<li>Error loading categories</li>';
  }
}

function setActiveCategory(container, clickedItem) {
  const currentActive = container.querySelector('.category-list-item.active');
  if (currentActive) currentActive.classList.remove('active');
  clickedItem.classList.add('active');
}

async function loadBooks(category, isLoadMore = false) {
  if (!isLoadMore) {
    booksList.innerHTML = "<li>Loading books...</li>";
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
      const response = await axios.get(url);
      const data = response.data;

      let tempAllBooks = [];

      if (category === "all") {
        data.forEach(cat => {
          if (cat.books && Array.isArray(cat.books)) tempAllBooks.push(...cat.books);
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
    booksList.innerHTML = "<li>Error loading books</li>";
    booksShown.textContent = "Error";
    booksLoadMoreBtn.classList.add('books-hidden');
  }
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

booksLoadMoreBtn.addEventListener('click', () => loadBooks(currentCategory, true));

categoriesDropdownBtn.addEventListener('click', () => booksCategoriesDropdownList.classList.toggle('books-hidden'));

document.addEventListener('click', event => {
  if (!categoriesDropdownWrapper.contains(event.target) && !booksCategoriesDropdownList.classList.contains('books-hidden')) {
    booksCategoriesDropdownList.classList.add('books-hidden');
  }
});

loadCategories().then(() => loadBooks("all"));


booksList.addEventListener('click', event => {
  if (!event.target.classList.contains('book-item-btn')) return
  
  const bookId = event.target.dataset.bookId;

  console.log(bookId);

  //openBookModal();
  //await fetchBookId(bookId);
})