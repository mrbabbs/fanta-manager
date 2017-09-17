(function () {
  function normalize(str) {
    return str.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ')
  }
  function extractRegulars() {
    const list = document.querySelectorAll('.team-players li .team-player');
    const names= [];

    list.forEach(el => names.push(el.textContent.trim().toLowerCase()));

    return names;
  }

  function extractSubstitutions() {
    const listHome = document.querySelectorAll('.homeDetails p')[0].textContent.split(',');
    const listAway = document.querySelectorAll('.awayDetails p')[0].textContent.split(',');
    const names = [];
    const extractName = (name) => normalize(name).match(/[0-9]+\ ([A-Z\ -]+)/);

    listHome.forEach(el => names.push(extractName));

    return names;
  }

  function extractIndecisions() {

  }

  function extractNotAvailable() {

  }

  function init() {
    const data = {
      regulars: extractRegulars(),
      substitutions: extractSubstitutions(),
    }

    console.log(data);
  }

  init();

})();
