const linkVisual = () => {
  const linkVisualDesk = $(".js-link-visual-desk");
  const linkVisualMob = $(".js-link-visual-mob");

  if(!linkVisualDesk || !linkVisualMob) {
    return;
  }

  function checkMediaScreen () {
    if ($(window).width() < 992) {
      linkVisualMob.attr("id", "specialButton");
      linkVisualDesk.removeAttr("id");
    } else {
      linkVisualMob.removeAttr("id");
      linkVisualDesk.attr("id", "specialButton");
    }
  }
  checkMediaScreen();

  $(window).on("resize", checkMediaScreen);

};

export default linkVisual;
