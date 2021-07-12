/* eslint-disable class-methods-use-this */
export default class Upload {
  constructor(element, type = 'text', handler = () => {}) {
    if (typeof element === 'string') {
      // eslint-disable-next-line no-param-reassign
      element = document.querySelector(element);
    }

    this.onClick = this.onClick.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);

    this.element = element;
    this.type = type;
    this.handler = handler;
    this.input = this.element.querySelector('.upload__input');

    this.element.addEventListener('click', this.onClick);
    this.element.addEventListener('dragover', this.onDragOver);
    this.element.addEventListener('drop', this.onDragDrop);
    this.input.addEventListener('input', this.onUpload);
  }

  onClick(e) {
    console.log('click', e);

    this.input.dispatchEvent(new MouseEvent('click'));
  }

  onUpload(e) {
    console.log(e);

    const { target } = e;
    const file = target.files && target.files[0];

    console.log(file);

    if (!file) return;

    if (this.type === 'file') {
      this.handler(file);

      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const content = e.target.result;

      this.handler(content);
    });

    const method = {
      text: 'readAsText',
      image: 'readAsDataURL',
      video: 'readAsDataURL',
    }[this.type];

    reader[method](file);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragDrop(e) {
    e.preventDefault();

    this.onUpload({ target: e.dataTransfer });
  }
}
