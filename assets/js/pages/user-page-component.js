import { USER_POSTS_PAGE } from '../utils/routes.js';
import { renderHeaderComponent } from '../components/header-component.js';
import { posts, goToPage } from '../index.js';
import { postTemplate } from '../components/post-template-component.js';

export function renderUserPostsPageComponent({ appEl }, userId) {
  // TODO: реализовать рендер постов из api
  console.log('Актуальный список постов:', posts);
  console.log(appEl);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const container = document.createElement('div');
  container.classList.add('page-container');
  container.innerHTML = `
      <div class="header-container"></div>
      <h1>Посты пользователя ${posts[0].user.name}</h1>
      <img width="200" src="${posts[0].user.imageUrl}"/>
      <ul class="posts"></ul>
  `;

  posts.forEach((post) => container.querySelector('.posts').append(postTemplate(post)));

  appEl.innerHTML = '';
  appEl.append(container);

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  for (let userEl of document.querySelectorAll('.post-header')) {
    userEl.addEventListener('click', () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
