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

const Utils = {
  invokeAll,
  cutText,
  fromArray,
  getPages,
};

export default Utils;

