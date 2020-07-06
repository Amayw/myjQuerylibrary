window.$ = window.jQuery = function (selectorOrArray) {
  let elements;
  if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  } else if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  }

  const api = Object.create(jQuery.prototype);
  // api.elements = elements;
  // api.oldApi = selectorOrArray.oldApi;
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      array = array.concat(
        Array.from(this.elements[i].querySelectorAll(selector))
      );
    }
    //   return array;
    //若返回数组就无法继续使用API，故应该将array传给jQuery，重新返回一个操作array的API
    array.oldApi = this;
    return jQuery(array);
  },
  //返回上一级api
  end() {
    return this.oldApi;
  },
};
