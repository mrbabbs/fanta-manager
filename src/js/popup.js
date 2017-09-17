(function () {
  const websites = {
    gazzetta:"http://www.gazzetta.it/Calcio/prob_form/",
    fantagazzetta: "https://www.fantagazzetta.com/probabili-formazioni-serie-a",
  };
  const showMainPage = () => {};
  const showSetMyTeamPage = () => {};
  const notify = () => { console.log('hello') };

  function bindClick(id, url) {
    document.querySelector(`#${id}`)
      .addEventListener('click', () => opentab(url, notify));
  }

  function opentab(url, callback) {
    chrome.tabs.create({ url, active: false }, callback)
  }

  function init() {
    const myTeam = chrome.storage.local.get('MyTeam', notify);

    if (myTeam) {
      showMainPage();
    } else {
      showSetMyTeamPage();
    }

    Object.keys(websites).forEach((key) => bindClick(key, websites[key]));
  }

  init();
})();
