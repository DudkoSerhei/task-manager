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

const checkImageSize = (file, callback) => {
  if (file && file.type && file.type.match('image.*')) {
    const fileReader = new FileReader();

    const fileLoader = (fileReader, callback) => {
      fileReader.onload = (readerEvent) => {
        const image = new Image();
  
        const imageLoader = (image, callback) => {
          image.onload = () => {
            let resizeImage = new Image();
            const canvas = document.createElement('canvas');
            const { width, height } = image;
  
              if (width >= 320 && height >= 240) {
                canvas.width = 320;
                canvas.height = 240;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
  
                const blobBin = atob(canvas.toDataURL(file.type).split(',')[1]);
                const array = [];
  
                for (var i = 0; i < blobBin.length; i++) {
                  array.push(blobBin.charCodeAt(i));
                }
  
                resizeImage = new Blob([new Uint8Array(array)], { type: file.type });
              } else {
                resizeImage = file;
              }
              callback(resizeImage);
          };
        };
        image.src = readerEvent.target.result;
        imageLoader(image, value => callback(value));
      };
    };
    fileReader.readAsDataURL(file);
    fileLoader(fileReader, value => {
      callback(value);
    });
  }
  callback();
};

function encode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
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

const Utils = {
  invokeAll,
  cutText,
  fromArray,
  getPages,
  getSignature,
  sortData,
  encode,
  checkImageSize,
};

export default Utils;
