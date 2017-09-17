window.Utils = (function () {
  const log = _.curry((type, x) => { console.log(type, x); return x; });
  const getContainer = selector => document.querySelector(selector);
  const extractText = node => node.textContent;
  const getDOMElements =
    _.curry((selector, node) => node.querySelectorAll(selector));
  const normalize = str => str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ');
  const toLowerCase = str => `${str}`.toLowerCase();

  return {
    log,
    getContainer,
    extractText,
    normalize,
    toLowerCase,
    getDOMElements,
  };
})();
