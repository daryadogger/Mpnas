const headerScroll = () => {
  const main = document.querySelector("main");

  const $header = $(".header");

  if ($header) {
    
    // Header меняет цвета при скролле. Он уже fixed изначально
    const scrollHeader = () => {
      const introTop = main.getBoundingClientRect().top;

      if (introTop < -1) {
        $header.addClass("scroll");

      } else if ($header.hasClass("scroll") && introTop > -1) {
        $header.removeClass("scroll");
      }
    };

    $(window).on("scroll", scrollHeader);
    $(document).on("ready", scrollHeader);

    //Добавление классов при ховере на пункты меню
    const $item = $(".nav__item");

    $item.each(function() {
      const $submenu = $(this).find(".submenu");

      $(this).on("mouseenter", function() {
        $submenu.addClass("display");

        setTimeout(function() {
          $submenu.addClass("show");
        }, 100);
      });

      $(this).on("mouseleave", function() {
        $submenu.removeClass("show");

        setTimeout(function() {
          $submenu.removeClass("display");
        }, 100);
      });

    });
  }

};

export default headerScroll;
