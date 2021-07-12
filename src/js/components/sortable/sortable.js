/* eslint-disable class-methods-use-this */
export default class Sortable {
  constructor(element) {
    if (typeof element === 'string') {
      // eslint-disable-next-line no-param-reassign
      element = document.querySelector(element);
    }

    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);
    this.onDrag = this.onDrag.bind(this);

    this.element = element;
    this.items = [...this.element.children];

    this.element.classList.add('sortable');

    this.element.addEventListener('mousedown', this.onStartDrag);
    document.documentElement.addEventListener('mouseup', this.onDragDrop);
  }

  onStartDrag(e) {
    e.preventDefault();
    const { target } = e;

    target.classList.add('sortable__dragged');

    this.currentItem = target;
    document.documentElement.addEventListener('mousemove', this.onDrag);

    this.onDrag(e);
  }

  onDragDrop(e) {
    document.documentElement.removeEventListener('mousemove', this.onDrag);

    const target = document.elementFromPoint(e.clientX, e.clientY);
    let listItem = this.items.find((item) => item === target);

    console.log(listItem);

    if (!listItem) return;

    const { top, bottom } = listItem.getBoundingClientRect();

    const toBottom = bottom - e.clientY;
    const toTop = e.clientY - top;

    console.log(toTop);
    console.log(toBottom);

    if (toTop > toBottom) {
      listItem = listItem.nextElementSibling;

      if (listItem === this.currentItem) listItem = listItem.nextElementSibling;
    }

    console.log(listItem);

    this.element.insertBefore(this.currentItem, listItem);
    this.currentItem.classList.remove('sortable__dragged');
    this.currentItem = undefined;
  }

  onDrag(e) {
    console.log(e);

    this.currentItem.style.left = `${e.clientX + 5}px`;
    this.currentItem.style.top = `${e.clientY + 5}px`;
  }
}
