import { renderUploadImageComponent } from '../components/upload-image-component.js';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = '';
  const render = () => {
    const container = document.createElement('div');
    container.classList.add('page-container');
    container.innerHTML = `
      <div class="header-container"></div>
      <form class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="upload-image-container"></div>
        <input type="text" id="description-input" placeholder="Описание поста" />
      </form>
      <button class="button" id="add-button">Добавить</button>
    `;

    appEl.innerHTML = '';
    appEl.append(container);

    renderUploadImageComponent({
      element: appEl.querySelector('.upload-image-container'),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    container.querySelector('#add-button').addEventListener('click', () => {
      if (!imageUrl || !appEl.querySelector('#description-input').value) {
        return;
      }
      onAddPostClick({
        description: appEl.querySelector('#description-input').value,
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
