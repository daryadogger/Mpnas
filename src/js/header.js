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
  }

};

export default headerScroll;
