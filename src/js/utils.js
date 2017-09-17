window.Utils = (function () {
  const STORE = 'store';
  const log = _.curry((type, x) => { console.log(type, x); return x; });
  const getContainer = selector => document.querySelector(selector);
  const extractText = node => node.textContent;
  const getDOMElements =
    _.curry((selector, node) => node.querySelectorAll(selector));
  const normalize = str => str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ');
  const toLowerCase = str => `${str}`.toLowerCase();
  const getCurrentTimestamp = () => Date.now();
  const NOOP = () => {};
  const fp = _.noConflict();
  const querySelector =
    _.curry((selector, node) => node.querySelector(selector));
  const querySelectorAll =
    _.curry((selector, node) => node.querySelectorAll(selector));
  const value = node => node.value;

  function save(key, value, callback) {
    const cb = callback || NOOP;
    chrome.storage.local.set(key, value, cb);
  }

  function load(key, callback) {
    const cb = callback || NOOP;
    chrome.storage.local.get(key, cb);
  }

  return {
    log,
    getContainer,
    extractText,
    normalize,
    toLowerCase,
    getDOMElements,
    getCurrentTimestamp,
    save,
    load,
    NOOP,
    fp,
    querySelector,
    querySelectorAll,
    value,
  };
})();
