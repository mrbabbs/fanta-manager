(function () {
  const fp = Utils.fp;
  const TEAM_CONFIG = {
    "P": { count: 3, id: "goalkeepers" },
    "D": { count: 8, id: "defensers" },
    "M": { count: 8, id: "middlefielders" },
    "S": { count: 6, id: "strikers"},
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
    const myTeam = Utils.load(MY_TEAM);
    fp.map(appendPlayer, myTeam || generateEmptyTeam(TEAM_CONFIG));
    const form = Utils.getContainer(FORM_ID);

    form.addEventListener('submit', ev => {
      ev.preventDefault();
      Utils.save(MY_TEAM, mapPlayersFromForm(form));
    });
  }

  init();
})();
