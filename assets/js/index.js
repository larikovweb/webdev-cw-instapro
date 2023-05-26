import { getPosts, getUserPosts, sendPost } from './api/index.js';
import { renderAddPostPageComponent } from './pages/add-post-page-component.js';
import { renderAuthPageComponent } from './pages/auth-page-component.js';
import { renderUserPostsPageComponent } from './pages/user-page-component.js';
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
  routes,
} from './utils/routes.js';
import { renderPostsPageComponent } from './pages/posts-page-component.js';
import { renderLoadingPageComponent } from './pages/loading-page-component.js';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from './helpers/index.js';

export let user = getUserFromLocalStorage();
export let page = null;
export let posts = [];

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  if (routes.includes(newPage)) {
    if (newPage === ADD_POSTS_PAGE) {
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      renderApp();
      return;
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;

      getPosts()
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
      return;
    }

    if (newPage === USER_POSTS_PAGE) {
      page = USER_POSTS_PAGE;

      getUserPosts(data.userId)
        .then((newPosts) => {
          page = USER_POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
      return;
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error('страницы не существует');
};

const renderApp = () => {
  const appEl = document.getElementById('app');

  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      onAddPostClick({ description, imageUrl }) {
        sendPost({ description, imageUrl });

        goToPage(POSTS_PAGE);
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
    });
  }

  if (page === USER_POSTS_PAGE) {
    return renderUserPostsPageComponent({
      appEl,
    });
  }
};

goToPage(POSTS_PAGE);
