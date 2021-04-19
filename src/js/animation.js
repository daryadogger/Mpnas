const animation = () => {
  //wow
  const animations = new window.WOW().init();

  const cards = $(".card--good");

  if (cards) {
    cards.each(function() {
      const card = $(this);
      const cardSide = card.find(".card__side");

      card.on("mouseenter", function() {

      });

      card.on("mouseleave", function() {
      
      });
    });
  }

};

export default animation;
