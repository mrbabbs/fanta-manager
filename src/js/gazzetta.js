(function () {
  const CONTAINER_SELECTOR = '.probabiliFormazioni';
  const REGULARS_SELECTOR = '.team-players li .team-player';
  const SUBSTITUTIONS_HOME_SELECTOR = '.homeDetails>p';
  const SUBSTITUTIONS_AWAY_SELECTOR = '.awayDetails>p';

  const extractRegulars = _.compose(
    Utils.toLowerCase,
    _.map(Utils.normalize),
    _.map(Utils.extractText),
    Utils.getDOMElements(REGULARS_SELECTOR),
  );
  const getSubstitutions = container => _.concat(
    Array.from(Utils.getDOMElements(SUBSTITUTIONS_HOME_SELECTOR, container)),
    Array.from(Utils.getDOMElements(SUBSTITUTIONS_AWAY_SELECTOR, container)),
  );

  const extractSubstitutions = _.compose(
    Utils.toLowerCase,
    _.map(Utils.normalize),
    _.map(Utils.extractText),
    getSubstitutions,
  );

  function init() {
    const container = Utils.getContainer(CONTAINER_SELECTOR);
    const data = {
      regulars: extractRegulars(container),
      substitutions: extractSubstitutions(container),
      updateDate: Utils.getCurrentTimestamp(),
    }
  }

  init();
})();
