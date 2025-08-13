// Поліфіл для глобальної змінної (вирішує "global is not defined" у браузері)
window.global = window;

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import './css/styles.css';

const PER_PAGE = 15;

// Правильні селектори згідно з новим HTML
const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

// Події
formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

// Пошук зображень
async function onSearchSubmit(e) {
  e.preventDefault();

  const query = e.target.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Увага',
      message: 'Введіть пошуковий запит',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader(loaderEl);

  try {
    const { hits, totalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (hits.length === 0) {
      iziToast.info({
        title: 'Нічого не знайдено',
        message: 'Спробуйте інший запит',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    totalPages = Math.ceil(totalHits / PER_PAGE);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "Ми вибачаємося, але ви досягли кінця результатів пошуку.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося отримати дані з Pixabay',
      position: 'topRight',
    });
  } finally {
    hideLoader(loaderEl);
    e.target.reset();
  }
}

// Завантаження додаткових зображень
async function onLoadMore() {
  currentPage += 1;
  showLoader(loaderEl);

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    createGallery(hits);
    smoothScroll();

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "Ми вибачаємося, але ви досягли кінця результатів пошуку.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити більше результатів',
      position: 'topRight',
    });
  } finally {
    hideLoader(loaderEl);
  }
}

// Плавний скрол після додавання нових карток
function smoothScroll() {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}