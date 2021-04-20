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

  // Slider sale
  const saleBlock = document.querySelector(".js-sale-slider");

  if (saleBlock) {
    const mySwiper = new Swiper(".js-sale-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      navigation: {
        nextEl: ".js-sale-slider .swiper-button-next",
        prevEl: ".js-sale-slider .swiper-button-prev",
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  }

  // Slider newGoods
  const newGoods = document.querySelector(".js-new-goods-slider");

  if (newGoods) {
    const mySwiper = new Swiper(".js-new-goods-slider .swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 400,
      navigation: {
        nextEl: ".js-new-goods-slider .swiper-button-next",
        prevEl: ".js-new-goods-slider .swiper-button-prev",
      },
      breakpoints: {
        470: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    });
  }

};

export default sliders;
