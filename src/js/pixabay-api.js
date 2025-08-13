import axios from 'axios';

// 🔹 Твій ключ прописаний напряму
const API_KEY = '51566476-370d8ae35b5995096aee585ea';
const BASE_URL = 'https://pixabay.com/api/';
const DEFAULT_PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

/**
 * Отримати зображення за запитом
 * @param {string} query - пошукове слово
 * @param {number} page - номер сторінки
 * @returns {Promise<Object>}
 */
export async function getImagesByQuery(query, page) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      ...DEFAULT_PARAMS,
    },
  });

  return data;
}