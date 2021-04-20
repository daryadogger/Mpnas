const sliders = () => {
  const Swiper = window.Swiper;

  // Slider promo
  const promo = document.querySelector(".js-promo-slider");

  if (promo) {
    const mySwiper = new Swiper(".js-promo-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      navigation: {
        nextEl: ".js-promo-slider .swiper-button-next",
        prevEl: ".js-promo-slider .swiper-button-prev",
      },
    });
  }

};

export default sliders;
