const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  modalWin: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlayEl: document.querySelector('.lightbox__overlay'),
}

const galleryMarkup = createGalleryMarkup(galleryItems);
let indexActiveImage = 0;

refs.galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryRef.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', onClickCloseBtn);
refs.overlayEl.addEventListener('click', onOverlayClick);



function createGalleryMarkup(images) {
  return images.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
</li>`
  }).join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  const isGalleryImageEl = event.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }

  refs.modalWin.classList.add('is-open');
  refs.modalImg.src = event.target.dataset.source;
  refs.modalImg.alt = event.target.alt;
  window.addEventListener('keydown', onPushEscape);
  window.addEventListener('keydown', onKeybrdDownArrow);
}

function onClickCloseBtn() {
  refs.modalWin.classList.remove('is-open');
  refs.modalImg.src = "#";
  refs.modalImg.alt = "";
  window.removeEventListener('keydown', onPushEscape);
}

function onOverlayClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    onClickCloseBtn();
  }
}

function onPushEscape(event) {
  if (event.code === 'Escape') {
    onClickCloseBtn();
  }
}

function onKeybrdDownArrow(event) {
  if (event.code === 'ArrowRight') {
    event.target.index += 1;
}
if (event.code === 'ArrowLeft') {
    event.target -= 1;
}
  console.log(event.path[1]);
}
 