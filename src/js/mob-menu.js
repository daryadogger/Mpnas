const mobMenu = () => {
  // Открытие моб меню
  const $btn = $(".js-mob-menu-btn");

  if ($btn) {
    const $menu = $(".mob-menu");
    const $btnClose = $(".mob-menu .js-btn-close");

    $btn.click(function() {
      // если открыто меню
      if ($menu.hasClass("is-show")) {
        const pos = parseInt($("body").attr("data-scroll"), 10);
        $menu.removeClass("is-show");
        $btn.removeClass("is-show");

        $("body").removeClass("is-menu-open").removeAttr("data-scroll");
        window.scrollTo(0, pos);

        // если закрыто меню
      } else {
        $menu.addClass("is-show");

        setTimeout(function () {
          const pagePos = $(window).scrollTop();
          $("body").addClass("is-menu-open").attr("data-scroll", pagePos);
        }, 450);
      }
    });

    $btnClose.click(function () {
      const pos = parseInt($("body").attr("data-scroll"), 10);
      $menu.removeClass("is-show");
      $btn.removeClass("is-show");

      $("body").removeClass("is-menu-open").removeAttr("data-scroll");
      window.scrollTo(0, pos);
    });

  }

};

export default mobMenu;
