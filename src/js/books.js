import axios from "axios";

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
  if (!allBooksData || allBooksData.length === 0) {
    booksList.innerHTML = "<li>No books found</li>";
    booksShown.textContent = "0 books";
    booksLoadMoreBtn.classList.add('hidden');
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
  `).join("");

  booksShown.textContent = `Showing ${booksToRender.length} of ${allBooksData.length} books`;

  if (currentBooksLimit < allBooksData.length) {
    booksLoadMoreBtn.classList.remove('hidden');
  } else {
    booksLoadMoreBtn.classList.add('hidden');
  }
}

async function loadCategories() {
  booksCategoriesDesktopList.innerHTML = '<li>Loading categories...</li>';
  booksCategoriesDropdownList.innerHTML = '<li>Loading categories...</li>';

  try {
    const response = await axios.get('/category-list');
    const data = response.data;

    let desktopCategoriesHtml = `
      <li class="category-list-item active" data-category-name="all">All categories</li>
    `;
    let dropdownCategoriesHtml = `
      <li class="category-list-item active" data-category-name="all">All categories</li>
    `;

    data.forEach(category => {
      if (!category.list_name || !category.list_name.trim()) return;

      desktopCategoriesHtml += `
        <li class="category-list-item" data-category-name="${category.list_name}">
          ${category.list_name}
        </li>
      `;
      dropdownCategoriesHtml += `
        <li class="category-list-item" data-category-name="${category.list_name}">
          ${category.list_name}
        </li>
      `;
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
        categoriesDropdownBtn.innerHTML = `${event.target.textContent} <span class="dropdown-arrow"></span>`;
        booksCategoriesDropdownList.classList.add('hidden');
      });
    });

    const initialActiveCategory = booksCategoriesDropdownList.querySelector('.category-list-item.active');
    if (initialActiveCategory) {
      categoriesDropdownBtn.innerHTML = `${initialActiveCategory.textContent} <span class="dropdown-arrow"></span>`;
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
    booksLoadMoreBtn.classList.add('hidden');
    currentBooksLimit = getInitialBooksLimit();
    allBooksData = [];
    currentCategory = category;
  } else {
    currentBooksLimit += SHOW_MORE_QUANTITY;
  }

  let url = category === "all" || category === "" ? '/top-books' : `/category?category=${category}`;

  try {
    if (allBooksData.length === 0 || !isLoadMore) {
      const response = await axios.get(url);
      let data = response.data;

      if (category === "all" || category === "") {
        let tempAllBooks = [];
        data.forEach(category => {
          if (category.books && Array.isArray(category.books)) tempAllBooks.push(...category.books);
        });
        allBooksData = tempAllBooks;
      } else {
        allBooksData = data;
      }
    }

    renderBooks();

  } catch (error) {
    booksList.innerHTML = "<li>Error loading books</li>";
    booksShown.textContent = "Error";
    booksLoadMoreBtn.classList.add('hidden');
  }
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

booksLoadMoreBtn.addEventListener('click', () => loadBooks(currentCategory, true));

categoriesDropdownBtn.addEventListener('click', () => booksCategoriesDropdownList.classList.toggle('hidden'));

document.addEventListener('click', (event) => {
  if (!categoriesDropdownWrapper.contains(event.target) && !booksCategoriesDropdownList.classList.contains('hidden')) {
    booksCategoriesDropdownList.classList.add('hidden');
  }
});

loadCategories().then(() => loadBooks("all"));
