import { sendLike } from '../api/index.js';
import { formatDate } from '../helpers/index.js';
export const postTemplate = (post) => {
  const { createdAt, description, id, imageUrl, isLiked, likes, user } = post;

  const el = document.createElement('li');
  el.classList.add('post');
  el.innerHTML = `
    <div class="post-header" data-user-id="${user.id}">
      <img src="${user.imageUrl}" class="post-header__user-image">
      <p class="post-header__user-name">${user.name}</p>
    </div>
    <div class="post-image-container">
    <img class="post-image" src="${imageUrl}">
    </div>
    <div class="post-likes">
    <button data-post-id="${id}" class="like-button">
      <img src="./assets/images/like${isLiked ? '-active' : '-not-active'}.svg">
    </button>
    <p class="post-likes-text">
      Нравится: <strong>${likes.length}</strong>
    </p>
    </div>
    <p class="post-text">
    <span class="user-name">${user.name}</span>
      ${description}
    </p>
    <p class="post-date">
    ${formatDate(new Date(createdAt))}
    </p>
  `;

  el.querySelector('.like-button').addEventListener('click', () => {
    const like = el.querySelector('.like-button img');
    const counter = el.querySelector('.post-likes-text strong');
    sendLike(id, isLiked);
    if (like.src.split('/')[like.src.split('/').length - 1] !== 'like-active.svg') {
      like.src = './assets/images/like-active.svg';
      counter.textContent = +counter.textContent + 1;
    } else {
      like.src = './assets/images/like-not-active.svg';
      counter.textContent = +counter.textContent - 1;
    }
  });

  return el;
};
