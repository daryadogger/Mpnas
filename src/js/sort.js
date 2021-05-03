const sort = () => {
  const $viewLinks = $(".js-link-view");

  if ($viewLinks) {

    $viewLinks.on("click", function(evt) {
      evt.preventDefault();
      if ($(this).hasClass("active")) {}
      else {
        $viewLinks.toggleClass("active");
        $(".js-catalog-content").toggleClass("catalog-content--row");
      }
    })

    function removeRow() {
      if ($(window).width() < 992) {
        $(".catalog-content").removeClass("catalog-content--row");
          $(".js-row").removeClass("active");
          $(".js-col").addClass("active");
      }
    }
    removeRow();

    $(window).on("resize", function(){
      removeRow();
  });
  }

};

export default sort;
