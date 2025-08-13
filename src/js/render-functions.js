// Функції UI-рендеру та керування видимістю елементів + SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

/**
 * Створює та додає розмітку карток галереї за одну операцію.
 * @param {Array<Object>} images
 */
export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${escapeHtml(tags)}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${likes ?? 0}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${views ?? 0}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${comments ?? 0}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${downloads ?? 0}</span>
          </div>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

/** Очищає галерею */
export function clearGallery() {
  galleryEl.innerHTML = '';
}

/** Показати лоадер */
export function showLoader() {
  loaderEl.classList.remove('is-hidden');
  loaderEl.setAttribute('aria-hidden', 'false');
}

/** Приховати лоадер */
export function hideLoader() {
  loaderEl.classList.add('is-hidden');
  loaderEl.setAttribute('aria-hidden', 'true');
}

/** Показати кнопку Load more */
export function showLoadMoreButton() {
  loadMoreBtnEl.classList.remove('is-hidden');
}

/** Приховати кнопку Load more */
export function hideLoadMoreButton() {
  loadMoreBtnEl.classList.add('is-hidden');
}

/** Елемент галереї (для скролу) */
export function getGalleryElement() {
  return galleryEl;
}

/** Кнопка Load more (для обробника) */
export function getLoadMoreButton() {
  return loadMoreBtnEl;
}

/* Втеча спецсимволів у alt/текстах */
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}