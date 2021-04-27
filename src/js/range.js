const range = () => {
  // Input type range
  // http://ionden.com/a/plugins/ion.rangeSlider/start.html
  const minPrice = 9;
  const maxPrice = 3999;
  const fromPrice = 9;
  const toPrice = 3999;


  $(".js-range").ionRangeSlider({
    type: "double",
    skin: "round",
    grid: false,
    min: minPrice,
    max: maxPrice,
    from: fromPrice,
    to: toPrice,
    hide_min_max: true,
    hide_from_to: true,
  });

};

export default range;
