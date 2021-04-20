const pharmacyGet = () => {
  const pharmacyBlock = $(".pharmacies");

  if (!pharmacyBlock) {
    return;
  }

  const sortLinks = pharmacyBlock.find(".pharmacies__links a");
  sortLinks.each(function() {
    const link = $(this);

    link.on("click", function(evt) {
      evt.preventDefault();
      
      sortLinks.each(function() {
        $(this).removeClass("active");
      });

      link.addClass("active");
    });
  });
};

export default pharmacyGet;
