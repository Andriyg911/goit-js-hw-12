// Головна логіка: сабміт, пагінація, нотифікації, скрол
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
  getGalleryElement,
  getLoadMoreButton,
} from './js/render-functions.js';
import './css/styles.css';

const PER_PAGE = 15;

const formEl = document.getElementById('search-form');
const galleryEl = getGalleryElement();
const loadMoreBtnEl = getLoadMoreButton();

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let totalPages = 0;

/* Обробник сабміту пошуку */
formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearchSubmit(e) {
  e.preventDefault();

  const formData = new FormData(formEl);
  const query = String(formData.get('query') || '').trim();

  if (!query) {
    iziToast.warning({
      title: 'Увага',
      message: 'Введіть пошуковий запит.',
      position: 'topRight',
    });
    return;
  }

  // Скидаємо стан
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  totalPages = 0;

  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = Number(data.totalHits || 0);
    totalPages = Math.ceil(totalHits / PER_PAGE);

    const hits = Array.isArray(data.hits) ? data.hits : [];

    if (hits.length === 0) {
      iziToast.info({
        title: 'Нічого не знайдено',
        message: 'Спробуйте уточнити запит.',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    // Кнопка: показуємо лише якщо є що підвантажувати
    if (currentPage < totalPages && hits.length === PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      // Кінець колекції може бути і на першій сторінці
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Помилка',
      message: 'Сталася помилка запиту. Спробуйте пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

/* Обробник кнопки Load more */
async function onLoadMore() {
  // Безпечний гард
  if (!currentQuery) return;

  showLoader();

  try {
    currentPage += 1;

    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = Array.isArray(data.hits) ? data.hits : [];

    if (hits.length === 0) {
      // Немає нових результатів — ховаємо кнопку і повідомляємо
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    // Плавний скрол на дві висоти першої картки
    smoothScrollByTwoCards();

    // Якщо це була остання сторінка — ховаємо кнопку і сповіщення
    const noMorePages = currentPage >= totalPages || hits.length < PER_PAGE;
    if (noMorePages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити більше зображень. Спробуйте пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

/* Плавний скрол: 2 висоти першої картки галереї */
function smoothScrollByTwoCards() {
  const firstCard = galleryEl.firstElementChild;
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}