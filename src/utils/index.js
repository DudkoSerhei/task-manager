const invokeAll = (...funcs) => (...args) => funcs.forEach(func => func(...args));

const cutText = (text, symbols) => {
  if (text.length > symbols) {
    return `${text.substring(0, symbols)}...`;
  }

  return text;
};

const Utils = {
  invokeAll,
  cutText,
};

export default Utils;

