const tabs = () => {
  const tabsBlock = document.querySelector(`.tabs`);

  if (!tabsBlock) {
    return;
  }

  let tab = new Tabby(`[data-tabs]`);
};

export default tabs;
