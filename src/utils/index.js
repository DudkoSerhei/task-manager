/* eslint-disable */
import md5 from 'md5';
import { TOKEN } from '../env';

const invokeAll = (...funcs) => (...args) => funcs.forEach(func => func(...args));

const cutText = (text, symbols) => {
  if (text.length > symbols) {
    return `${text.substring(0, symbols)}...`;
  }

  return text;
};

const fromArray = (key, array) => {
  const object = {};
  array.forEach((el) => {
    object[el[key]] = el;
  });

  return object;
};

const getPages = (count) => {
  const pages = Math.ceil(count / 3);
  const array = [...Array(pages).keys()].map(x => x + 1);

  return array;
};

const checkImageSize = (image) => {
  const _URL = window.URL || window.webkitURL;

  const img = new Image();
  img.onload = function () {
    if (this.width >= 320 && this.height >= 240) {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL(image.type);

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    } else return image;
  };
  img.src = _URL.createObjectURL(image);
};

function encode (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

const getSignature = (data) => {
  const { status, text } = data;

  let signature =
    `${encode('status')}=${encode(status)}&${encode('text')}=${encode(text)}&${encode('token')}=${encode(TOKEN)}`;

  signature = md5(signature);

  return signature;
};

const sortData = (data) => {
  const { status, text } = data;
  const signature = getSignature(data);
  const formData = new FormData();
  const sortArray = [];
  const newData = { status, text, signature };

  for (const key in newData) {
    sortArray.push([key, newData[key]]);
  }

  sortArray.sort((a, b) => {
    return a[1] - b[1];
  });

  sortArray.forEach((item) => {
    formData.append(item[0], item[1]);
  });

  formData.append('token', TOKEN);

  return formData;
};

const getImageSrc = (file) => {
  const reader  = new FileReader();
  let src = '';

  reader.onloadend = () => {
    src = reader.result;
  }

  reader.readAsDataURL(file);

  return src;
};

const Utils = {
  invokeAll,
  cutText,
  fromArray,
  getPages,
  getSignature,
  sortData,
  encode,
  getImageSrc,
  checkImageSize,
};

export default Utils;

