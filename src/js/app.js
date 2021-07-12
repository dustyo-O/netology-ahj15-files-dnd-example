import { mdConvert } from 'md-converter'
import Sortable from './components/sortable/sortable';

import Upload from './components/upload/upload';

const pre = document.querySelector('.pre');
const md = document.querySelector('.md');
const image = document.querySelector('.image');
const video = document.querySelector('.video');

// const upload = new Upload(
//   '.upload',
//   'text',
//   (content) => { pre.textContent = content; },
// );

// const upload = new Upload(
//   '.upload',
//   'text',
//   (content) => {
//     const markdown = content;
//     md.innerHTML = mdConvert(markdown);
//   },
// );

// const upload = new Upload(
//   '.upload',
//   'image',
//   (content) => {
//     image.src = content;
//   },
// );

// const upload = new Upload(
//   '.upload',
//   'file',
//   (file) => {
//     const url = URL.createObjectURL(file);

//     image.src = url;
//   },
// );

// const upload = new Upload(
//   '.upload',
//   'file',
//   (file) => {
//     const url = URL.createObjectURL(file);

//     const link = document.createElement('a');

//     link.href = url;
//     link.rel = 'noopener';
//     link.download = file.name;

//     link.click();

//     URL.revokeObjectURL(url);
//   },
// );

// const upload = new Upload(
//   '.upload',
//   'file',
//   (file) => {
//     const url = URL.createObjectURL(file);

//     video.src = url;
//   },
// );

const upload = new Upload(
  '.upload',
  'video',
  (content) => {
    video.src = content;
  },
);

const sortable = new Sortable('.items');
