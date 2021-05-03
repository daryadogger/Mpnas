const filter = () => {
  //Открытие фильтра в каталоге
  const $filterBtn = $(".js-filter-btn")
  if (!$filterBtn) {
    return;
  }

  const $filter = $(".js-filter");
  const $btnClose = $(".js-close-filter");
  const $overlay = $(".overlay");

  $filterBtn.on("click", function (evt) {
    evt.preventDefault();
    if ($filter.hasClass("open")) {
      $filter.removeClass("open");
      $overlay.fadeOut(300);
    } else {
      $filter.addClass("open");
      $overlay.fadeIn(300);
    }
  });

  $btnClose.on("click", function () {
    if ($filter.hasClass("open")) {
      $filter.removeClass("open");
      $overlay.fadeOut(300);
    }
  });

  $(document).on('mouseup', function(evt) {
    if (evt.target.closest(".js-filter") === null && evt.target.closest(".js-close-filter") === null) {
      if ($filter.hasClass("open")) {
        $filter.removeClass("open");
        $overlay.fadeOut(300);
      }
    }
  });

};

export default filter;
