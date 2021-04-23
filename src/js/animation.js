const animation = () => {
  //wow
  const animations = new window.WOW().init();

  const cardInfo = $(".js-card-info");

  if (cardInfo) {
    const shade = $(".js-info");

    cardInfo.each(function() {
      const item = $(this);

      item.on("mouseenter", function() {
        shade.css("opacity", "1");
      });

      item.on("mouseleave", function() {
        shade.css("opacity", "0");
      });
    });
  }
};

export default animation;
