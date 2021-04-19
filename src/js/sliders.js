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

    const titles = promo.querySelectorAll("h1");

    function slideChangeHandler(timer) {
      let activeSlide = promo.querySelector(".swiper-slide-active");

      if (activeSlide) {
        setTimeout(function() {
          const title = activeSlide.querySelector("h1");
          title.classList.add("active");
        }, timer);
      }

    }
    slideChangeHandler(300);

    mySwiper.on('slideChangeTransitionStart', function () {
      titles.forEach(function(title) {
        if (title.classList.contains("active")) {
          title.classList.remove("active");
        }
      });
      slideChangeHandler(500);
    });

    const brandsSwiper = new Swiper(".js-brands-slider.swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 600,
      centered: true,
      breakpoints: {
        410: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        490: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        700: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        950: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        991: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      },
    });
  }

  // Slider popular
  const popular = document.querySelector(".js-popular-slider");

  if (popular) {
    const mySwiper = new Swiper(".js-popular-slider .swiper-container", {
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 400,
      navigation: {
        nextEl: ".js-popular-slider .swiper-button-next",
        prevEl: ".js-popular-slider .swiper-button-prev",
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
          spaceBetween: 8,
        },
      },
    });
  }
};

export default sliders;
