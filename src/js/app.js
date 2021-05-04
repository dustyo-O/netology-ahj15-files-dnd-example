/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
// TODO: write code here

import { mdConvert } from 'md-converter';

class Upload {
  constructor(elem, uploadCb) {
    if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }

    this.onClick = this.onClick.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
    this.onFileSelectObjectUrl = this.onFileSelectObjectUrl.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);

    this.cb = uploadCb;
    this.container = elem;
    this.input = this.container.querySelector('.upload__input');

    this.container.addEventListener('click', this.onClick);
    this.container.addEventListener('drop', this.onDragDrop);
    this.container.addEventListener('dragover', this.onDragOver);
    //    this.input.addEventListener('input', this.onFileSelect);
    this.input.addEventListener('input', this.onFileSelectObjectUrl);
  }

  onClick(event) {
    console.log('container click');
    console.log(event);

    this.input.dispatchEvent(new MouseEvent('click'));
  }

  readFile(file) {
    const reader = new FileReader();

    reader.addEventListener('load', (e) => this.onFileLoad(e, file));

    reader.readAsBinaryString(file);
  }

  onFileSelect(event) {
    console.log('onFileSelect');
    console.log(event);

    const target = this.input;

    const file = target.files && target.files[0];

    if (!file) return;

    console.log(file);

    this.readFile(file);
  }

  onFileSelectObjectUrl() {
    const target = this.input;

    const file = target.files && target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    console.log(url);

    this.cb.call(null, url, file);

    // URL.revokeObjectURL(url);
  }

  onFileLoad(event, file) {
    const result = event.target && event.target.result;

    console.log(result);

    this.cb.call(null, result, file);
  }

  onDragDrop(event) {
    event.preventDefault();

    console.log('dragdrop');

    console.log(event);
    console.log(event.dataTransfer);

    const target = event.dataTransfer;

    const file = target.files && target.files[0];

    if (!file) return;

    this.readFile(file);
  }

  onDragOver(event) {
    event.preventDefault();

    console.log(event);
  }
}

function displayMdToHtml(binarymd) {
  const base64md = btoa(binarymd);
  console.log(base64md);
  const md = atob(base64md);
  console.log(md);
  const mdElem = document.querySelector('.md');

  mdElem.innerHTML = mdConvert(md);
}

function displayImagePreview(imageData, file) {
  const dataURL = `data:${file.type};base64,${btoa(imageData)}`;
  const image = document.querySelector('.image');

  image.src = dataURL;
}

function displayImageUrlPreview(url, file) {
  const image = document.querySelector('.image');

  image.src = url;

  const link = document.createElement('a');

  link.href = url;
  link.rel = 'noopener';
  link.download = file.name;

  link.click();
}

function displayVideoPreview(data, file) {
  const dataURL = data.startsWith('blob:') ? data : `data:${file.type};base64,${btoa(data)}`;

  const video = document.querySelector('.video');

  video.src = dataURL;
}

// const upload = new Upload('.upload', displayMdToHtml);
// const upload = new Upload('.upload', displayImagePreview);
// const upload = new Upload('.upload', displayImageUrlPreview);
const upload = new Upload('.upload', displayVideoPreview);

window.upload = upload;

class Sortable {
  constructor(elem) {
    if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMove = this.onDragMove.bind(this);

    this.container = elem;
    this.elements = [...this.container.children];

    this.container.addEventListener('touchstart', this.onDragStart);
  }

  onDragStart(event) {
    event.preventDefault();
    console.log(event);
    const target = event.target;

    this.currentDraggedElement = target;
    this.currentDraggedElement.classList.add('dragged');

    document.body.addEventListener('touchmove', this.onDragMove);
    document.body.addEventListener('touchend', this.onDragEnd);

    this.onDragMove(event);
  }

  elementInTouch(coords) {
    console.log(coords);
    const element = document.elementFromPoint(coords.x, coords.y);

    return this.elements.find((el) => el === element);
  }

  onDragEnd(event) {
    const dropItem = this.elementInTouch({ x: this.lastTouch.clientX, y: this.lastTouch.clientY });

    if (dropItem) {
      this.container.insertBefore(this.currentDraggedElement, dropItem);
    }

    this.currentDraggedElement.classList.remove('dragged');
    this.currentDraggedElement = undefined;

    document.body.removeEventListener('touchmove', this.onDragMove);
    document.body.removeEventListener('touchend', this.onDragEnd);
  }

  onDragMove(event) {
    const touch = event.touches && event.touches[0];

    this.lastTouch = touch;
    console.log(this.lastTouch);

    this.currentDraggedElement.style.top = `${touch.clientY + 5}px`;
    this.currentDraggedElement.style.left = `${touch.clientX + 5}px`;
  }
}

const sortable = new Sortable('.items');

window.sortable = sortable;
