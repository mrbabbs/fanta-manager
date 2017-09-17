(function eventPage() {
  const URL_MAIN_PAGE = 'src/html/main.html';
  const tabs = () => chrome.tabs;
  const extension = () => chrome.extension;
  const browserAction = () => chrome.browserAction;

  function openMainPage() {
    tabs().create({ url: URL_MAIN_PAGE }, Utils.NOOP);
  }

  function activeTab(tab) {
    tabs().update(tab.id, { active: true }, Utils.NOOP);
  }

  function onClickBrowserAction() {
    const extentsionTabs = extension().getViews({ type: 'tab' });

    if (extentsionTabs.length) {
      extentsionTabs[0].chrome.tabs.getCurrent(activeTab);
    } else {
      openMainPage();
    }
  }

  function init() {
    browserAction().onClicked.addListener(onClickBrowserAction);
  }

  init();
})();
