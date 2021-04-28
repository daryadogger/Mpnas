(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var nodeListForEach = function nodeListForEach() {
    if ('NodeList' in window && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
  };

  var tel = function tel() {
    // Mask for tel
    var formBlocks = document.querySelectorAll(".fieldset");

    if (formBlocks.length) {
      formBlocks.forEach(function (formBlock) {
        var input = formBlock.querySelector("input[name=tel]");

        if (input) {
          var phoneMask = IMask(input, {
            mask: "+{7} 000 000-00-00"
          });
        }
      });
    }
  };

  var animation = function animation() {
    //wow
    var animations = new window.WOW().init();
    var cardInfo = $(".js-card-info");

    if (cardInfo) {
      var shade = $(".js-info");
      cardInfo.each(function () {
        var item = $(this);
        item.on("mouseenter", function () {
          shade.css("opacity", "1");
        });
        item.on("mouseleave", function () {
          shade.css("opacity", "0");
        });
      });
    }
  };

  var menuOpen = function menuOpen() {
    // Открытие моб меню
    var $buttonsMenu = $(".js-open-menu");

    if ($buttonsMenu.length) {
      var $menu = $(".menu");
      var $buttonClose = $(".js-btn-close");
      var $header = $(".header");
      $buttonsMenu.each(function () {
        var $btn = $(this);

        var scrollHeader = function scrollHeader() {
          if ($menu.hasClass("is-show")) {
            if ($menu.scrollTop() > 1) {
              $header.addClass("scroll");
            } else {
              $header.removeClass("scroll");
            }
          }
        };

        $btn.click(function () {
          // если открыто меню
          if ($menu.hasClass("is-show")) {
            var pos = parseInt($("body").attr("data-scroll"), 10);
            $menu.removeClass("is-show");
            $btn.removeClass("is-show");
            $header.removeClass("scroll");
            $("body").removeClass("is-menu-open").removeAttr("data-scroll");
            window.scrollTo(0, pos); // если закрыто меню
          } else {
            $menu.addClass("is-show");

            if ($menu.scrollTop() > 1) {
              $header.addClass("scroll");
            }

            setTimeout(function () {
              $btn.addClass("is-show");
            }, 100);
            setTimeout(function () {
              var pagePos = $(window).scrollTop();
              $("body").addClass("is-menu-open").attr("data-scroll", pagePos);
            }, 450);
          }
        });
        $(".menu").on("scroll", scrollHeader);
      });
      $buttonClose.click(function () {
        var pos = parseInt($("body").attr("data-scroll"), 10);
        $menu.removeClass("is-show");
        $buttonsMenu.each(function () {
          var $btn = $(this);
          $btn.removeClass("is-show");
        });
        $("body").removeClass("is-menu-open").removeAttr("data-scroll");
        window.scrollTo(0, pos);
      });
    }
  };

  var headerScroll = function headerScroll() {
    var main = document.querySelector("main");
    var $header = $(".header");

    if ($header) {
      // Header меняет цвета при скролле. Он уже fixed изначально
      var scrollHeader = function scrollHeader() {
        var introTop = main.getBoundingClientRect().top;

        if (introTop < -1) {
          $header.addClass("scroll");
        } else if ($header.hasClass("scroll") && introTop > -1) {
          $header.removeClass("scroll");
        }
      };

      $(window).on("scroll", scrollHeader);
      $(document).on("ready", scrollHeader); //Добавление классов при ховере на пункты меню

      var $item = $(".nav__item");
      $item.each(function () {
        var $submenu = $(this).find(".submenu");
        $(this).on("mouseenter", function () {
          $submenu.addClass("display");
          setTimeout(function () {
            $submenu.addClass("show");
          }, 100);
        });
        $(this).on("mouseleave", function () {
          $submenu.removeClass("show");
          setTimeout(function () {
            $submenu.removeClass("display");
          }, 100);
        });
      });
    }
  };

  var sliders = function sliders() {
    var Swiper = window.Swiper; // Slider promo

    var promo = document.querySelector(".js-promo-slider");

    if (promo) {
      var mySwiper = new Swiper(".js-promo-slider .swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        navigation: {
          nextEl: ".js-promo-slider .swiper-button-next",
          prevEl: ".js-promo-slider .swiper-button-prev"
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
      var titles = promo.querySelectorAll("h1");

      function slideChangeHandler(timer) {
        var activeSlide = promo.querySelector(".swiper-slide-active");

        if (activeSlide) {
          setTimeout(function () {
            var title = activeSlide.querySelector("h1");
            title.classList.add("active");
          }, timer);
        }
      }

      slideChangeHandler(300);
      mySwiper.on('slideChangeTransitionStart', function () {
        titles.forEach(function (title) {
          if (title.classList.contains("active")) {
            title.classList.remove("active");
          }
        });
        slideChangeHandler(500);
      });
    } // Slider sale


    var saleBlock = document.querySelector(".js-sale-slider");

    if (saleBlock) {
      var _mySwiper = new Swiper(".js-sale-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 15,
        speed: 600,
        navigation: {
          nextEl: ".js-sale-slider .swiper-button-next",
          prevEl: ".js-sale-slider .swiper-button-prev"
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    } // Slider newGoods


    var newGoods = document.querySelector(".js-new-goods-slider");

    if (newGoods) {
      var _mySwiper2 = new Swiper(".js-new-goods-slider .swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 400,
        simulateTouch: false,
        navigation: {
          nextEl: ".js-new-goods-slider .swiper-button-next",
          prevEl: ".js-new-goods-slider .swiper-button-prev"
        },
        breakpoints: {
          570: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          870: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 15
          }
        }
      });
    }
  };

  var number = function number() {
    //Разрешает ввод только цифр в input
    var $numbers = $(".js-number");

    if (!$numbers) {
      return;
    }

    $numbers.each(function () {
      var $thiss = $(this);
      $thiss.mask('0#');
    });
  };

  var btnUp = function btnUp() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        if ($('#upbutton').is(':hidden')) {
          $('#upbutton').css({
            opacity: 0.9
          }).fadeIn('fast');
        }
      } else {
        $('#upbutton').stop(true, false).fadeOut('fast');
      }
    });
    $('#upbutton').click(function () {
      $('html, body').stop().animate({
        scrollTop: 0
      }, 300);
    });
  };

  var goodQuantity = function goodQuantity() {
    // Увеличение и уменьшение товаров
    var containers = document.querySelectorAll(".js-quantity");

    if (containers.length < 0) {
      return;
    }

    containers.forEach(function (container) {
      var input = container.querySelector("input");
      var btnIncrease = container.querySelector(".js-increase");
      var btnDecrease = container.querySelector(".js-decrease");
      var value;

      var btnIncreaseHandler = function btnIncreaseHandler() {
        value = input.value;
        var newValue = ++value;

        if (newValue > 1) {
          btnDecrease.removeAttribute("disabled");
        }

        input.value = newValue;
      };

      var btnDecreaseHandler = function btnDecreaseHandler() {
        value = input.value;
        var newValue = --value;

        if (newValue <= 1) {
          newValue = 1;
          input.value = 1;
          btnDecrease.setAttribute("disabled", "disabled");
        }

        input.value = newValue;
      };

      btnIncrease.addEventListener("click", btnIncreaseHandler);
      btnDecrease.addEventListener("click", btnDecreaseHandler);
      input.addEventListener("change", function () {
        btnIncreaseHandler();
        btnDecreaseHandler();
      });
    });
  };

  var footerForm = function footerForm() {
    var $footerForm = $(".footer form");

    if (!$footerForm) {
      return;
    }

    var inputs = $footerForm.find("input");
    inputs.each(function () {
      var input = $(this);
      input.on("change", function () {
        if (input.val() !== "") {
          input.addClass("has-value");
        } else {
          input.removeClass("has-value");
        }
      });
    });
  };

  var deskMenu = function deskMenu() {
    // Открытие и закрытие header-menu с помощью fade
    var $headerMenu = $(".js-desk-menu");

    if (!$headerMenu) {
      return;
    }

    var $btn = $(".js-desk-menu-btn");
    var keyCode = {
      ESC: 27
    };

    var open = function open() {
      $headerMenu.slideDown(300);
      $headerMenu.addClass("show");
      $btn.addClass("active");
    };

    var close = function close() {
      $headerMenu.slideUp(300);
      $headerMenu.removeClass("show");
      $btn.removeClass("active");
      $btn.blur();
    };

    $btn.click(function () {
      if ($headerMenu.hasClass("show")) {
        close();
      } else {
        resizeTopCoordinate();
        open();
      }
    }); // Определение и установка координаты top для header-menu

    var resizeTopCoordinate = function resizeTopCoordinate() {
      var height = $(".header").outerHeight();
      var a = height + "px";
      $headerMenu.css("top", a);
    };

    resizeTopCoordinate();
    $(window).on("resize", resizeTopCoordinate);
    $(document).on("scroll", function () {
      if ($headerMenu.hasClass("show")) {
        $headerMenu.css("display", "none");
        $headerMenu.removeClass("show");
        $btn.removeClass("active");
        $btn.blur();
      }
    }); // Закрытие header-menu при нажатии вне меню

    $(document).on('mouseup', function (evt) {
      if (evt.target.closest(".js-desk-menu") === null && evt.target.closest(".js-desk-menu-btn") === null) {
        close();
      }
    }); // Закрытие header-menu по ESC

    $(document).on("keydown", function (evt) {
      if (evt.keyCode === keyCode.ESC && $headerMenu.hasClass("show")) {
        close();
      }
    });
    var links = $headerMenu.find(".js-desk-menu-links a");
    var contents = $headerMenu.find(".desk-menu__content");

    function deskMenuContentChange(link) {
      link.addClass("hover");
      var id = link.attr("data-id");
      resetContent();
      var content = $headerMenu.find(".desk-menu__content[data-id=\"".concat(id, "\"]"));
      content.addClass("show");
    }

    deskMenuContentChange($(links[0]));

    function resetHover() {
      links.each(function () {
        var link = $(this);
        link.removeClass("hover");
      });
    }

    function resetContent() {
      contents.each(function () {
        var item = $(this);
        item.removeClass("show");
      });
    }

    links.each(function () {
      var link = $(this);
      link.on("click", function (evt) {
        evt.preventDefault();
      });
      link.on("mouseenter", function () {
        resetHover();
        deskMenuContentChange(link);
      });
    });
  };

  var pharmacyGet = function pharmacyGet() {
    var pharmacyBlock = $(".pharmacies");

    if (!pharmacyBlock) {
      return;
    }

    var sortLinks = pharmacyBlock.find(".pharmacies__links a");
    sortLinks.each(function () {
      var link = $(this);
      link.on("click", function (evt) {
        evt.preventDefault();
        sortLinks.each(function () {
          $(this).removeClass("active");
        });
        link.addClass("active");
      });
    });
  };

  var mobMenu = function mobMenu() {
    // Открытие моб меню
    var $btn = $(".js-mob-menu-btn");

    if ($btn) {
      var $menu = $(".mob-menu");
      var $btnClose = $(".mob-menu .js-btn-close");
      $btn.click(function () {
        // если открыто меню
        if ($menu.hasClass("is-show")) {
          var pos = parseInt($("body").attr("data-scroll"), 10);
          $menu.removeClass("is-show");
          $btn.removeClass("is-show");
          $("body").removeClass("is-menu-open").removeAttr("data-scroll");
          window.scrollTo(0, pos); // если закрыто меню
        } else {
          $menu.addClass("is-show");
          setTimeout(function () {
            var pagePos = $(window).scrollTop();
            $("body").addClass("is-menu-open").attr("data-scroll", pagePos);
          }, 450);
        }
      });
      $btnClose.click(function () {
        var pos = parseInt($("body").attr("data-scroll"), 10);
        $menu.removeClass("is-show");
        $btn.removeClass("is-show");
        $("body").removeClass("is-menu-open").removeAttr("data-scroll");
        window.scrollTo(0, pos);
      });
    }
  };

  var accordion = function accordion() {
    var $accordions = $(".accordion__item");

    if ($accordions) {
      $accordions.each(function () {
        var $thiss = $(this);
        var $side = $thiss.find(".accordion__label");
        var $main = $thiss.find(".accordion__content");
        $side.on("click", function (evt) {
          evt.preventDefault();

          if ($side.hasClass("is-open")) {
            $main.slideUp("slow");
            $side.removeClass("is-open");
            $side.blur();
          } else {
            $side.addClass("is-open");
            $main.slideDown("slow");
          }
        });
      });
    }

    var $innerAccordions = $(".accordion-inner__item");

    if ($innerAccordions) {
      $innerAccordions.each(function () {
        var $thiss = $(this);
        var $side = $thiss.find(".accordion-inner__label");
        var $main = $thiss.find(".accordion-inner__content");
        $side.on("click", function (evt) {
          evt.preventDefault();

          if ($side.hasClass("is-open")) {
            $main.slideUp("slow");
            $side.removeClass("is-open");
            $side.blur();
          } else {
            $side.addClass("is-open");
            $main.slideDown("slow");
          }
        });
      });
    }
  };

  var range = function range() {
    // Input type range
    // http://ionden.com/a/plugins/ion.rangeSlider/start.html
    var minPrice = 9;
    var maxPrice = 3999;
    var fromPrice = 9;
    var toPrice = 3999;
    $(".js-range").ionRangeSlider({
      type: "double",
      skin: "round",
      grid: false,
      min: minPrice,
      max: maxPrice,
      from: fromPrice,
      to: toPrice,
      hide_min_max: true,
      hide_from_to: true
    });
  };

  var tabs = function tabs() {
    var tabsBlock = document.querySelector(".tabs");

    if (!tabsBlock) {
      return;
    }

    var tab = new Tabby("[data-tabs]");
  };

  var App = /*#__PURE__*/function () {
    function App() {
      _classCallCheck(this, App);
    }

    _createClass(App, null, [{
      key: "init",
      value: function init() {
        nodeListForEach();
        tel();
        animation();
        menuOpen();
        headerScroll();
        sliders();
        number();
        btnUp();
        goodQuantity();
        footerForm();
        deskMenu();
        pharmacyGet();
        mobMenu();
        accordion();
        range();
        tabs();
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tb2ItbWVudS5qcyIsInNyYy9qcy9hY2NvcmRpb24uanMiLCJzcmMvanMvcmFuZ2UuanMiLCJzcmMvanMvdGFicy5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgY29uc3QgY2FyZEluZm8gPSAkKFwiLmpzLWNhcmQtaW5mb1wiKTtcblxuICBpZiAoY2FyZEluZm8pIHtcbiAgICBjb25zdCBzaGFkZSA9ICQoXCIuanMtaW5mb1wiKTtcblxuICAgIGNhcmRJbmZvLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBpdGVtID0gJCh0aGlzKTtcblxuICAgICAgaXRlbS5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNoYWRlLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG4gICAgXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cbiAgICAvL9CU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0YDQuCDRhdC+0LLQtdGA0LUg0L3QsCDQv9GD0L3QutGC0Ysg0LzQtdC90Y5cbiAgICBjb25zdCAkaXRlbSA9ICQoXCIubmF2X19pdGVtXCIpO1xuXG4gICAgJGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRzdWJtZW51ID0gJCh0aGlzKS5maW5kKFwiLnN1Ym1lbnVcIik7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcImRpc3BsYXlcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzKS5vbihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwiZGlzcGxheVwiKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgcHJvbW9cbiAgY29uc3QgcHJvbW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXByb21vLXNsaWRlclwiKTtcblxuICBpZiAocHJvbW8pIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlcyA9IHByb21vLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMVwiKTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlSGFuZGxlcih0aW1lcikge1xuICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gcHJvbW8ucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuXG4gICAgICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgICB9XG5cbiAgICB9XG4gICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDMwMCk7XG5cbiAgICBteVN3aXBlci5vbignc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZUNoYW5nZUhhbmRsZXIoNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2xpZGVyIG5ld0dvb2RzXG4gIGNvbnN0IG5ld0dvb2RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyXCIpO1xuXG4gIGlmIChuZXdHb29kcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA1NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDg3MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgMTEwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVycztcbiIsImNvbnN0IG51bWJlciA9ICgpID0+IHtcbiAgLy/QoNCw0LfRgNC10YjQsNC10YIg0LLQstC+0LQg0YLQvtC70YzQutC+INGG0LjRhNGAINCyIGlucHV0XG4gIGNvbnN0ICRudW1iZXJzID0gJChcIi5qcy1udW1iZXJcIik7XG4gIGlmICghJG51bWJlcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkbnVtYmVycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG5cbiAgICAkdGhpc3MubWFzaygnMCMnKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlcjtcbiIsImNvbnN0IGJ0blVwID0gKCkgPT4ge1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgaWYgKCQoJyN1cGJ1dHRvbicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICQoJyN1cGJ1dHRvbicpLmNzcyh7b3BhY2l0eSA6IDAuOX0pLmZhZGVJbignZmFzdCcpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHsgJCgnI3VwYnV0dG9uJykuc3RvcCh0cnVlLCBmYWxzZSkuZmFkZU91dCgnZmFzdCcpOyB9XG4gIH0pO1xuXG4gICQoJyN1cGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3AgOiAwfSwgMzAwKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ0blVwO1xuIiwiY29uc3QgZ29vZFF1YW50aXR5ID0gKCkgPT4ge1xuICAvLyDQo9Cy0LXQu9C40YfQtdC90LjQtSDQuCDRg9C80LXQvdGM0YjQtdC90LjQtSDRgtC+0LLQsNGA0L7QslxuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1xdWFudGl0eVwiKTtcbiAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoIDwgMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGNvbnN0IGJ0bkluY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtaW5jcmVhc2VcIik7XG4gICAgY29uc3QgYnRuRGVjcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1kZWNyZWFzZVwiKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGNvbnN0IGJ0bkluY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSArK3ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPiAxKSB7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBidG5EZWNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gLS12YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlIDw9IDEpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAxO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGJ0bkluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5JbmNyZWFzZUhhbmRsZXIpO1xuICAgIGJ0bkRlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5EZWNyZWFzZUhhbmRsZXIpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYnRuSW5jcmVhc2VIYW5kbGVyKCk7XG4gICAgICBidG5EZWNyZWFzZUhhbmRsZXIoKTtcbiAgICB9KVxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ29vZFF1YW50aXR5O1xuIiwiY29uc3QgZm9vdGVyRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgJGZvb3RlckZvcm0gPSAkKFwiLmZvb3RlciBmb3JtXCIpO1xuICBpZiAoISRmb290ZXJGb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXRzID0gJGZvb3RlckZvcm0uZmluZChcImlucHV0XCIpO1xuXG4gIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcblxuICAgIGlucHV0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0LnZhbCgpICE9PSBgYCkge1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9vdGVyRm9ybTtcbiIsImNvbnN0IGRlc2tNZW51ID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC4INC30LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0YEg0L/QvtC80L7RidGM0Y4gZmFkZVxuICBjb25zdCAkaGVhZGVyTWVudSA9ICQoXCIuanMtZGVzay1tZW51XCIpO1xuXG4gIGlmKCEkaGVhZGVyTWVudSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0ICRidG4gPSAkKFwiLmpzLWRlc2stbWVudS1idG5cIik7XG5cbiAgY29uc3Qga2V5Q29kZSA9IHtcbiAgICBFU0M6IDI3LFxuICB9O1xuXG4gIGNvbnN0IG9wZW4gPSAoKSA9PiB7XG4gICAgJGhlYWRlck1lbnUuc2xpZGVEb3duKDMwMCk7XG4gICAgJGhlYWRlck1lbnUuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIH07XG5cbiAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgJGhlYWRlck1lbnUuc2xpZGVVcCgzMDApO1xuICAgICRoZWFkZXJNZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAkYnRuLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICRidG4uYmx1cigpO1xuICB9O1xuXG4gICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKCRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzaXplVG9wQ29vcmRpbmF0ZSgpO1xuICAgICAgb3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQuCDRg9GB0YLQsNC90L7QstC60LAg0LrQvtC+0YDQtNC40L3QsNGC0YsgdG9wINC00LvRjyBoZWFkZXItbWVudVxuICBjb25zdCByZXNpemVUb3BDb29yZGluYXRlID0gKCkgPT4ge1xuICAgIGxldCBoZWlnaHQgPSAkKFwiLmhlYWRlclwiKS5vdXRlckhlaWdodCgpO1xuICAgIGxldCBhID0gaGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgJGhlYWRlck1lbnUuY3NzKFwidG9wXCIsIGEpO1xuICB9O1xuICByZXNpemVUb3BDb29yZGluYXRlKCk7XG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHJlc2l6ZVRvcENvb3JkaW5hdGUpO1xuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgJGhlYWRlck1lbnUuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAkaGVhZGVyTWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgJGJ0bi5ibHVyKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQstC90LUg0LzQtdC90Y5cbiAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudVwiKSA9PT0gbnVsbCAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZGVzay1tZW51LWJ0blwiKSA9PT0gbnVsbCkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCX0LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0L/QviBFU0NcbiAgJChkb2N1bWVudCkub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQua2V5Q29kZSA9PT0ga2V5Q29kZS5FU0MgJiYgJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbGlua3MgPSAkaGVhZGVyTWVudS5maW5kKFwiLmpzLWRlc2stbWVudS1saW5rcyBhXCIpO1xuICBjb25zdCBjb250ZW50cyA9ICRoZWFkZXJNZW51LmZpbmQoXCIuZGVzay1tZW51X19jb250ZW50XCIpO1xuXG4gIGZ1bmN0aW9uIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKSB7XG4gICAgbGluay5hZGRDbGFzcyhcImhvdmVyXCIpO1xuXG4gICAgY29uc3QgaWQgPSBsaW5rLmF0dHIoXCJkYXRhLWlkXCIpO1xuXG4gICAgcmVzZXRDb250ZW50KCk7XG4gICAgbGV0IGNvbnRlbnQgPSAkaGVhZGVyTWVudS5maW5kKGAuZGVzay1tZW51X19jb250ZW50W2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICAgIGNvbnRlbnQuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICB9XG4gIGRlc2tNZW51Q29udGVudENoYW5nZSgkKGxpbmtzWzBdKSk7XG5cbiAgZnVuY3Rpb24gcmVzZXRIb3ZlcigpIHtcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuICAgICAgbGluay5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRDb250ZW50KCkge1xuICAgIGNvbnRlbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaXRlbSA9ICQodGhpcyk7XG4gICAgICBpdGVtLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbGluay5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVzZXRIb3ZlcigpO1xuICAgICAgZGVza01lbnVDb250ZW50Q2hhbmdlKGxpbmspO1xuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZXNrTWVudTtcbiIsImNvbnN0IHBoYXJtYWN5R2V0ID0gKCkgPT4ge1xuICBjb25zdCBwaGFybWFjeUJsb2NrID0gJChcIi5waGFybWFjaWVzXCIpO1xuXG4gIGlmICghcGhhcm1hY3lCbG9jaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNvcnRMaW5rcyA9IHBoYXJtYWN5QmxvY2suZmluZChcIi5waGFybWFjaWVzX19saW5rcyBhXCIpO1xuICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgXG4gICAgICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBoYXJtYWN5R2V0O1xuIiwiY29uc3QgbW9iTWVudSA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtbW9iLW1lbnUtYnRuXCIpO1xuXG4gIGlmICgkYnRuKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1vYi1tZW51XCIpO1xuICAgIGNvbnN0ICRidG5DbG9zZSA9ICQoXCIubW9iLW1lbnUgLmpzLWJ0bi1jbG9zZVwiKTtcblxuICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgIH0sIDQ1MCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYnRuQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2JNZW51O1xuIiwiY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xuICBjb25zdCAkYWNjb3JkaW9ucyA9ICQoYC5hY2NvcmRpb25fX2l0ZW1gKTtcbiAgaWYgKCRhY2NvcmRpb25zKSB7XG4gICAgJGFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19sYWJlbGApO1xuICAgICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fY29udGVudGApO1xuXG4gICAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0ICRpbm5lckFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uLWlubmVyX19pdGVtYCk7XG4gIGlmICgkaW5uZXJBY2NvcmRpb25zKSB7XG4gICAgJGlubmVyQWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0ICRzaWRlID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb24taW5uZXJfX2xhYmVsYCk7XG4gICAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uLWlubmVyX19jb250ZW50YCk7XG5cbiAgICAgICRzaWRlLm9uKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgICAkbWFpbi5zbGlkZVVwKFwic2xvd1wiKTtcbiAgICAgICAgICAkc2lkZS5yZW1vdmVDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2lkZS5hZGRDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgcmFuZ2UgPSAoKSA9PiB7XG4gIC8vIElucHV0IHR5cGUgcmFuZ2VcbiAgLy8gaHR0cDovL2lvbmRlbi5jb20vYS9wbHVnaW5zL2lvbi5yYW5nZVNsaWRlci9zdGFydC5odG1sXG4gIGNvbnN0IG1pblByaWNlID0gOTtcbiAgY29uc3QgbWF4UHJpY2UgPSAzOTk5O1xuICBjb25zdCBmcm9tUHJpY2UgPSA5O1xuICBjb25zdCB0b1ByaWNlID0gMzk5OTtcblxuXG4gICQoXCIuanMtcmFuZ2VcIikuaW9uUmFuZ2VTbGlkZXIoe1xuICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgc2tpbjogXCJyb3VuZFwiLFxuICAgIGdyaWQ6IGZhbHNlLFxuICAgIG1pbjogbWluUHJpY2UsXG4gICAgbWF4OiBtYXhQcmljZSxcbiAgICBmcm9tOiBmcm9tUHJpY2UsXG4gICAgdG86IHRvUHJpY2UsXG4gICAgaGlkZV9taW5fbWF4OiB0cnVlLFxuICAgIGhpZGVfZnJvbV90bzogdHJ1ZSxcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJhbmdlO1xuIiwiY29uc3QgdGFicyA9ICgpID0+IHtcbiAgY29uc3QgdGFic0Jsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhYnNgKTtcblxuICBpZiAoIXRhYnNCbG9jaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB0YWIgPSBuZXcgVGFiYnkoYFtkYXRhLXRhYnNdYCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcbmltcG9ydCBmb290ZXJGb3JtIGZyb20gJy4vZm9vdGVyLWZvcm0nO1xuaW1wb3J0IGRlc2tNZW51IGZyb20gJy4vZGVzay1tZW51JztcbmltcG9ydCBwaGFybWFjeUdldCBmcm9tICcuL3BoYXJtYWN5LWdldCc7XG5pbXBvcnQgbW9iTWVudSBmcm9tICcuL21vYi1tZW51JztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBzbGlkZXJzKCk7XG4gICAgbnVtYmVyKCk7XG4gICAgYnRuVXAoKTtcbiAgICBnb29kUXVhbnRpdHkoKTtcbiAgICBmb290ZXJGb3JtKCk7XG4gICAgZGVza01lbnUoKTtcbiAgICBwaGFybWFjeUdldCgpO1xuICAgIG1vYk1lbnUoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgICByYW5nZSgpO1xuICAgIHRhYnMoKTtcbiAgfVxufVxuXG5cbkFwcC5pbml0KCk7XG53aW5kb3cuQXBwID0gQXBwO1xuIl0sIm5hbWVzIjpbIm5vZGVMaXN0Rm9yRWFjaCIsIndpbmRvdyIsIk5vZGVMaXN0IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGxiYWNrIiwidGhpc0FyZyIsImkiLCJsZW5ndGgiLCJjYWxsIiwidGVsIiwiZm9ybUJsb2NrcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1CbG9jayIsImlucHV0IiwicXVlcnlTZWxlY3RvciIsInBob25lTWFzayIsIklNYXNrIiwibWFzayIsImFuaW1hdGlvbiIsImFuaW1hdGlvbnMiLCJXT1ciLCJpbml0IiwiY2FyZEluZm8iLCIkIiwic2hhZGUiLCJlYWNoIiwiaXRlbSIsIm9uIiwiY3NzIiwibWVudU9wZW4iLCIkYnV0dG9uc01lbnUiLCIkbWVudSIsIiRidXR0b25DbG9zZSIsIiRoZWFkZXIiLCIkYnRuIiwic2Nyb2xsSGVhZGVyIiwiaGFzQ2xhc3MiLCJzY3JvbGxUb3AiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xpY2siLCJwb3MiLCJwYXJzZUludCIsImF0dHIiLCJyZW1vdmVBdHRyIiwic2Nyb2xsVG8iLCJzZXRUaW1lb3V0IiwicGFnZVBvcyIsImhlYWRlclNjcm9sbCIsIm1haW4iLCJpbnRyb1RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsIiRpdGVtIiwiJHN1Ym1lbnUiLCJmaW5kIiwic2xpZGVycyIsIlN3aXBlciIsInByb21vIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwidGl0bGVzIiwic2xpZGVDaGFuZ2VIYW5kbGVyIiwidGltZXIiLCJhY3RpdmVTbGlkZSIsInRpdGxlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJzYWxlQmxvY2siLCJuZXdHb29kcyIsInNpbXVsYXRlVG91Y2giLCJicmVha3BvaW50cyIsIm51bWJlciIsIiRudW1iZXJzIiwiJHRoaXNzIiwiYnRuVXAiLCJzY3JvbGwiLCJpcyIsIm9wYWNpdHkiLCJmYWRlSW4iLCJzdG9wIiwiZmFkZU91dCIsImFuaW1hdGUiLCJnb29kUXVhbnRpdHkiLCJjb250YWluZXJzIiwiY29udGFpbmVyIiwiYnRuSW5jcmVhc2UiLCJidG5EZWNyZWFzZSIsInZhbHVlIiwiYnRuSW5jcmVhc2VIYW5kbGVyIiwibmV3VmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5EZWNyZWFzZUhhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9vdGVyRm9ybSIsIiRmb290ZXJGb3JtIiwiaW5wdXRzIiwidmFsIiwiZGVza01lbnUiLCIkaGVhZGVyTWVudSIsImtleUNvZGUiLCJFU0MiLCJvcGVuIiwic2xpZGVEb3duIiwiY2xvc2UiLCJzbGlkZVVwIiwiYmx1ciIsInJlc2l6ZVRvcENvb3JkaW5hdGUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImEiLCJldnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGlua3MiLCJjb250ZW50cyIsImRlc2tNZW51Q29udGVudENoYW5nZSIsImxpbmsiLCJpZCIsInJlc2V0Q29udGVudCIsImNvbnRlbnQiLCJyZXNldEhvdmVyIiwicHJldmVudERlZmF1bHQiLCJwaGFybWFjeUdldCIsInBoYXJtYWN5QmxvY2siLCJzb3J0TGlua3MiLCJtb2JNZW51IiwiJGJ0bkNsb3NlIiwiYWNjb3JkaW9uIiwiJGFjY29yZGlvbnMiLCIkc2lkZSIsIiRtYWluIiwiJGlubmVyQWNjb3JkaW9ucyIsInJhbmdlIiwibWluUHJpY2UiLCJtYXhQcmljZSIsImZyb21QcmljZSIsInRvUHJpY2UiLCJpb25SYW5nZVNsaWRlciIsInR5cGUiLCJza2luIiwiZ3JpZCIsIm1pbiIsIm1heCIsImZyb20iLCJ0byIsImhpZGVfbWluX21heCIsImhpZGVfZnJvbV90byIsInRhYnMiLCJ0YWJzQmxvY2siLCJ0YWIiLCJUYWJieSIsIkFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtFQUM1QixNQUFJLGNBQWNDLE1BQWQsSUFBd0IsQ0FBQ0MsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxPQUFoRCxFQUF5RDtFQUN2REYsSUFBQUEsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxPQUFuQixHQUE2QixVQUFVQyxRQUFWLEVBQW9CQyxPQUFwQixFQUE2QjtFQUMxREEsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUlMLE1BQXJCOztFQUNBLFdBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLQyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztFQUN0Q0YsUUFBQUEsUUFBUSxDQUFDSSxJQUFULENBQWNILE9BQWQsRUFBdUIsS0FBS0MsQ0FBTCxDQUF2QixFQUFnQ0EsQ0FBaEMsRUFBbUMsSUFBbkM7RUFDQztFQUNBLEtBTEQ7RUFNRDtFQUNGLENB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
