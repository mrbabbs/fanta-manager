(function () {
  const fp = Utils.fp;
  const TEAM_CONFIG = {
    "P": { count: 3, position: "goalkeepers", players: [] },
    "D": { count: 8, position: "defensers", players: [] },
    "M": { count: 8, position: "middlefielders", players: [] },
    "S": { count: 6, position: "strikers", players: [] },
  };
  const MY_TEAM = 'myTeam';
  const FORM_ID = "#myTeam";
  const PLAYERS_CONTAINER = '.players';
  const EMPTY_PLAYER = {
    number: 0,
    position: '',
    name: '',
    price: 0,
    mark: 0,
    markF: 0,
  };

  const optionPlayer =
    name => `<option value="${name}">${_.capitalize(name)}</option>`;

  function selectPlayer(config) {
    return `
    <div class="col-xs-3">
      <div class="input-group">
        <select id="${config.position}Select"
          name="${config.position}Select"
          class="selectpicker form-control"
          multiple
          data-live-search="true"
          title="Choose a ${_.capitalize(config.position)}"
          data-selected-text-format="count"
        >
        ${config.players.reduce(
          (acc, curr) => `${acc}${optionPlayer(curr)}`, ''
        )}
        </select>
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">
            &nbsp;
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            &nbsp;
          </button>
        </span>
      </div>
    </div>
    `;
  }

  function playerField(player, editable) {
    return `
    <div class="row form-group player" id="player-${player.number}">
      <div class="col-xs-6">
        <div class="input-group">
          <span class="input-group-addon" id="sizing-addon2">
            ${player.position}
          </span>

          <input type="text" class="form-control name" value="${player.name}"
            "${editable ? 'disabled' : ''}" placeholder="Name"
            aria-describedby="sizing-addon2">
        </div>
      </div>

      <div class="col-xs-2">
        <input type="text" class="form-control price" value="${player.price}"
          "${editable ? 'disabled' : ''}">
      </div>

      <div class="col-xs-2">
        <input type="text" class="form-control mark" value="${player.mark}"
          disabled>
      </div>

      <div class="col-xs-2">
        <input type="text" class="form-control mark-f"
          value="${player.markF}" disabled>
      </div>
    </div>
    `
  }

  const getTeamPositionId = position => TEAM_CONFIG[position].id;
  const emptyPlayer =
    (position, number) => _.assign({}, EMPTY_PLAYER, { position, number });
  const generateTeamPositions =
    (position, count) => fp.map(() => position, _.range(count));
  const generateEmptyTeam = fp.compose(
    list => _.map(list, emptyPlayer),
    _.flatten,
    fp.map((pos) => generateTeamPositions(pos, TEAM_CONFIG[pos].count)),
    _.keys);
  const appendNode = fp.curry((node, strHtml) => node.innerHTML += strHtml);
  const appendPlayer = player => appendNode(
      Utils.getContainer(
        `#${getTeamPositionId(player.position)} ${PLAYERS_CONTAINER}`
      ),
      playerField(player, false),
    );
  const getPlayerName = fp.compose(Utils.value, Utils.querySelector('.name'));
  const getPlayerPrice =
    fp.compose(Number, Utils.value, Utils.querySelector('.price'));
  const mapPlayerToData = (node) => _.assign(
    {},
    EMPTY_PLAYER,
    {
      name: getPlayerName(node),
      price: getPlayerPrice(node),
    }
  );

  const mapPlayersFromForm = fp.compose(
    fp.map(mapPlayerToData),
    Utils.querySelectorAll(`${PLAYERS_CONTAINER} .player`),
  );

  function init() {
    // const myTeam = Utils.load(MY_TEAM);
    // fp.map(appendPlayer, myTeam || generateEmptyTeam(TEAM_CONFIG));
    // const form = Utils.getContainer(FORM_ID);
    const containerSelectors = Utils.getContainer('.container-selectors');
    _.mapValues(
      TEAM_CONFIG,
      fp.compose(appendNode(containerSelectors), selectPlayer, Utils.log('hello'))
    );

    form.addEventListener('submit', ev => {
      ev.preventDefault();
      Utils.save(MY_TEAM, mapPlayersFromForm(form));
    });
  }

  init();
})();
