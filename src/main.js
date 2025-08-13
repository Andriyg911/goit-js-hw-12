// Головна логіка: пошук, пагінація, нотифікації
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

// Нові правильні селектори
const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

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
        message: "We're sorry, but you've reached the end of search results.",
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
  }
}

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
        message: "We're sorry, but you've reached the end of search results.",
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

function smoothScroll() {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}