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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tb2ItbWVudS5qcyIsInNyYy9qcy9hY2NvcmRpb24uanMiLCJzcmMvanMvcmFuZ2UuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIGNvbnN0IGNhcmRJbmZvID0gJChcIi5qcy1jYXJkLWluZm9cIik7XG5cbiAgaWYgKGNhcmRJbmZvKSB7XG4gICAgY29uc3Qgc2hhZGUgPSAkKFwiLmpzLWluZm9cIik7XG5cbiAgICBjYXJkSW5mby5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaXRlbSA9ICQodGhpcyk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdGVtLm9uKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2hhZGUuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IGhlYWRlclNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG4gIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICBpZiAoJGhlYWRlcikge1xuICAgIFxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG4gICAgLy/QlNC+0LHQsNCy0LvQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9GA0Lgg0YXQvtCy0LXRgNC1INC90LAg0L/Rg9C90LrRgtGLINC80LXQvdGOXG4gICAgY29uc3QgJGl0ZW0gPSAkKFwiLm5hdl9faXRlbVwiKTtcblxuICAgICRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkc3VibWVudSA9ICQodGhpcykuZmluZChcIi5zdWJtZW51XCIpO1xuXG4gICAgICAkKHRoaXMpLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN1Ym1lbnUuYWRkQ2xhc3MoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHN1Ym1lbnUuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5yZW1vdmVDbGFzcyhcImRpc3BsYXlcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlclNjcm9sbDtcbiIsImNvbnN0IHNsaWRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IFN3aXBlciA9IHdpbmRvdy5Td2lwZXI7XG5cbiAgLy8gU2xpZGVyIHByb21vXG4gIGNvbnN0IHByb21vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1wcm9tby1zbGlkZXJcIik7XG5cbiAgaWYgKHByb21vKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWVcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB0aXRsZXMgPSBwcm9tby5xdWVyeVNlbGVjdG9yQWxsKFwiaDFcIik7XG5cbiAgICBmdW5jdGlvbiBzbGlkZUNoYW5nZUhhbmRsZXIodGltZXIpIHtcbiAgICAgIGxldCBhY3RpdmVTbGlkZSA9IHByb21vLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXNsaWRlLWFjdGl2ZVwiKTtcblxuICAgICAgaWYgKGFjdGl2ZVNsaWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBhY3RpdmVTbGlkZS5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgfSwgdGltZXIpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIHNsaWRlQ2hhbmdlSGFuZGxlcigzMDApO1xuXG4gICAgbXlTd2lwZXIub24oJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdGl0bGVzLmZvckVhY2goZnVuY3Rpb24odGl0bGUpIHtcbiAgICAgICAgaWYgKHRpdGxlLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDUwMCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgc2FsZVxuICBjb25zdCBzYWxlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNhbGUtc2xpZGVyXCIpO1xuXG4gIGlmIChzYWxlQmxvY2spIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtc2FsZS1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICBzcGVlZDogNjAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zYWxlLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBuZXdHb29kc1xuICBjb25zdCBuZXdHb29kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbmV3LWdvb2RzLXNsaWRlclwiKTtcblxuICBpZiAobmV3R29vZHMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgc2ltdWxhdGVUb3VjaDogZmFsc2UsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTcwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA4NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDExMDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGdvb2RRdWFudGl0eSA9ICgpID0+IHtcbiAgLy8g0KPQstC10LvQuNGH0LXQvdC40LUg0Lgg0YPQvNC10L3RjNGI0LXQvdC40LUg0YLQvtCy0LDRgNC+0LJcbiAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcXVhbnRpdHlcIik7XG4gIGlmIChjb250YWluZXJzLmxlbmd0aCA8IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBidG5JbmNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWluY3JlYXNlXCIpO1xuICAgIGNvbnN0IGJ0bkRlY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZGVjcmVhc2VcIik7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBjb25zdCBidG5JbmNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gKyt2YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlID4gMSkge1xuICAgICAgICBidG5EZWNyZWFzZS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgYnRuRGVjcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IC0tdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA8PSAxKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gMTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAxO1xuICAgICAgICBidG5EZWNyZWFzZS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBidG5JbmNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuSW5jcmVhc2VIYW5kbGVyKTtcbiAgICBidG5EZWNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuRGVjcmVhc2VIYW5kbGVyKTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJ0bkluY3JlYXNlSGFuZGxlcigpO1xuICAgICAgYnRuRGVjcmVhc2VIYW5kbGVyKCk7XG4gICAgfSlcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdvb2RRdWFudGl0eTtcbiIsImNvbnN0IGZvb3RlckZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0ICRmb290ZXJGb3JtID0gJChcIi5mb290ZXIgZm9ybVwiKTtcbiAgaWYgKCEkZm9vdGVyRm9ybSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0cyA9ICRmb290ZXJGb3JtLmZpbmQoXCJpbnB1dFwiKTtcblxuICBpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dCA9ICQodGhpcyk7XG5cbiAgICBpbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckZvcm07XG4iLCJjb25zdCBkZXNrTWVudSA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQuCDQt9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INGBINC/0L7QvNC+0YnRjNGOIGZhZGVcbiAgY29uc3QgJGhlYWRlck1lbnUgPSAkKFwiLmpzLWRlc2stbWVudVwiKTtcblxuICBpZighJGhlYWRlck1lbnUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCAkYnRuID0gJChcIi5qcy1kZXNrLW1lbnUtYnRuXCIpO1xuXG4gIGNvbnN0IGtleUNvZGUgPSB7XG4gICAgRVNDOiAyNyxcbiAgfTtcblxuICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlRG93bigzMDApO1xuICAgICRoZWFkZXJNZW51LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAkYnRuLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9O1xuXG4gIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlVXAoMzAwKTtcbiAgICAkaGVhZGVyTWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkYnRuLmJsdXIoKTtcbiAgfTtcblxuICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcbiAgICAgIG9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCe0L/RgNC10LTQtdC70LXQvdC40LUg0Lgg0YPRgdGC0LDQvdC+0LLQutCwINC60L7QvtGA0LTQuNC90LDRgtGLIHRvcCDQtNC70Y8gaGVhZGVyLW1lbnVcbiAgY29uc3QgcmVzaXplVG9wQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICBsZXQgaGVpZ2h0ID0gJChcIi5oZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgYSA9IGhlaWdodCArIFwicHhcIjtcblxuICAgICRoZWFkZXJNZW51LmNzcyhcInRvcFwiLCBhKTtcbiAgfTtcbiAgcmVzaXplVG9wQ29vcmRpbmF0ZSgpO1xuXG4gICQod2luZG93KS5vbihcInJlc2l6ZVwiLCByZXNpemVUb3BDb29yZGluYXRlKTtcbiAgJChkb2N1bWVudCkub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgICRoZWFkZXJNZW51LmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICRidG4uYmx1cigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LLQvdC1INC80LXQvdGOXG4gICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnVcIikgPT09IG51bGwgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudS1idG5cIikgPT09IG51bGwpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0L4gRVNDXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmtleUNvZGUgPT09IGtleUNvZGUuRVNDICYmICRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtzID0gJGhlYWRlck1lbnUuZmluZChcIi5qcy1kZXNrLW1lbnUtbGlua3MgYVwiKTtcbiAgY29uc3QgY29udGVudHMgPSAkaGVhZGVyTWVudS5maW5kKFwiLmRlc2stbWVudV9fY29udGVudFwiKTtcblxuICBmdW5jdGlvbiBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluaykge1xuICAgIGxpbmsuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGNvbnN0IGlkID0gbGluay5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAgIHJlc2V0Q29udGVudCgpO1xuICAgIGxldCBjb250ZW50ID0gJGhlYWRlck1lbnUuZmluZChgLmRlc2stbWVudV9fY29udGVudFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcbiAgICBjb250ZW50LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgfVxuICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UoJChsaW5rc1swXSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0SG92ZXIoKSB7XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBsaW5rID0gJCh0aGlzKTtcbiAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0Q29udGVudCgpIHtcbiAgICBjb250ZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgaXRlbS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxpbmsub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc2V0SG92ZXIoKTtcbiAgICAgIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKTtcbiAgICB9KTtcblxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVza01lbnU7XG4iLCJjb25zdCBwaGFybWFjeUdldCA9ICgpID0+IHtcbiAgY29uc3QgcGhhcm1hY3lCbG9jayA9ICQoXCIucGhhcm1hY2llc1wiKTtcblxuICBpZiAoIXBoYXJtYWN5QmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3J0TGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlua3MgYVwiKTtcbiAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFxuICAgICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaGFybWFjeUdldDtcbiIsImNvbnN0IG1vYk1lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidG4gPSAkKFwiLmpzLW1vYi1tZW51LWJ0blwiKTtcblxuICBpZiAoJGJ0bikge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tb2ItbWVudVwiKTtcbiAgICBjb25zdCAkYnRuQ2xvc2UgPSAkKFwiLm1vYi1tZW51IC5qcy1idG4tY2xvc2VcIik7XG5cbiAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICB9LCA0NTApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGJ0bkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9iTWVudTtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICgkYWNjb3JkaW9ucykge1xuICAgICRhY2NvcmRpb25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuICAgICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICAgIGNvbnN0ICRtYWluID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2NvbnRlbnRgKTtcblxuICAgICAgJHNpZGUub24oYGNsaWNrYCwgKGV2dCkgPT4ge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoJHNpZGUuaGFzQ2xhc3MoYGlzLW9wZW5gKSkge1xuICAgICAgICAgICRtYWluLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICAgJHNpZGUuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICAgJG1haW4uc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCAkaW5uZXJBY2NvcmRpb25zID0gJChgLmFjY29yZGlvbi1pbm5lcl9faXRlbWApO1xuICBpZiAoJGlubmVyQWNjb3JkaW9ucykge1xuICAgICRpbm5lckFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uLWlubmVyX19sYWJlbGApO1xuICAgICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbi1pbm5lcl9fY29udGVudGApO1xuXG4gICAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbjtcbiIsImNvbnN0IHJhbmdlID0gKCkgPT4ge1xuICAvLyBJbnB1dCB0eXBlIHJhbmdlXG4gIC8vIGh0dHA6Ly9pb25kZW4uY29tL2EvcGx1Z2lucy9pb24ucmFuZ2VTbGlkZXIvc3RhcnQuaHRtbFxuICBjb25zdCBtaW5QcmljZSA9IDk7XG4gIGNvbnN0IG1heFByaWNlID0gMzk5OTtcbiAgY29uc3QgZnJvbVByaWNlID0gOTtcbiAgY29uc3QgdG9QcmljZSA9IDM5OTk7XG5cblxuICAkKFwiLmpzLXJhbmdlXCIpLmlvblJhbmdlU2xpZGVyKHtcbiAgICB0eXBlOiBcImRvdWJsZVwiLFxuICAgIHNraW46IFwicm91bmRcIixcbiAgICBncmlkOiBmYWxzZSxcbiAgICBtaW46IG1pblByaWNlLFxuICAgIG1heDogbWF4UHJpY2UsXG4gICAgZnJvbTogZnJvbVByaWNlLFxuICAgIHRvOiB0b1ByaWNlLFxuICAgIGhpZGVfbWluX21heDogdHJ1ZSxcbiAgICBoaWRlX2Zyb21fdG86IHRydWUsXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCByYW5nZTtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBkZXNrTWVudSBmcm9tICcuL2Rlc2stbWVudSc7XG5pbXBvcnQgcGhhcm1hY3lHZXQgZnJvbSAnLi9waGFybWFjeS1nZXQnO1xuaW1wb3J0IG1vYk1lbnUgZnJvbSAnLi9tb2ItbWVudSc7XG5pbXBvcnQgYWNjb3JkaW9uIGZyb20gJy4vYWNjb3JkaW9uJztcbmltcG9ydCByYW5nZSBmcm9tICcuL3JhbmdlJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBzbGlkZXJzKCk7XG4gICAgbnVtYmVyKCk7XG4gICAgYnRuVXAoKTtcbiAgICBnb29kUXVhbnRpdHkoKTtcbiAgICBmb290ZXJGb3JtKCk7XG4gICAgZGVza01lbnUoKTtcbiAgICBwaGFybWFjeUdldCgpO1xuICAgIG1vYk1lbnUoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgICByYW5nZSgpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJjYXJkSW5mbyIsIiQiLCJzaGFkZSIsImVhY2giLCJpdGVtIiwib24iLCJjc3MiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwiaGVhZGVyU2Nyb2xsIiwibWFpbiIsImludHJvVG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiJGl0ZW0iLCIkc3VibWVudSIsImZpbmQiLCJzbGlkZXJzIiwiU3dpcGVyIiwicHJvbW8iLCJteVN3aXBlciIsImRpcmVjdGlvbiIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJzcGVlZCIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJwYWdpbmF0aW9uIiwiZWwiLCJjbGlja2FibGUiLCJ0aXRsZXMiLCJzbGlkZUNoYW5nZUhhbmRsZXIiLCJ0aW1lciIsImFjdGl2ZVNsaWRlIiwidGl0bGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb250YWlucyIsInJlbW92ZSIsInNhbGVCbG9jayIsIm5ld0dvb2RzIiwic2ltdWxhdGVUb3VjaCIsImJyZWFrcG9pbnRzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwidmFsdWUiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb290ZXJGb3JtIiwiJGZvb3RlckZvcm0iLCJpbnB1dHMiLCJ2YWwiLCJkZXNrTWVudSIsIiRoZWFkZXJNZW51Iiwia2V5Q29kZSIsIkVTQyIsIm9wZW4iLCJzbGlkZURvd24iLCJjbG9zZSIsInNsaWRlVXAiLCJibHVyIiwicmVzaXplVG9wQ29vcmRpbmF0ZSIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwiYSIsImV2dCIsInRhcmdldCIsImNsb3Nlc3QiLCJsaW5rcyIsImNvbnRlbnRzIiwiZGVza01lbnVDb250ZW50Q2hhbmdlIiwibGluayIsImlkIiwicmVzZXRDb250ZW50IiwiY29udGVudCIsInJlc2V0SG92ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInBoYXJtYWN5R2V0IiwicGhhcm1hY3lCbG9jayIsInNvcnRMaW5rcyIsIm1vYk1lbnUiLCIkYnRuQ2xvc2UiLCJhY2NvcmRpb24iLCIkYWNjb3JkaW9ucyIsIiRzaWRlIiwiJG1haW4iLCIkaW5uZXJBY2NvcmRpb25zIiwicmFuZ2UiLCJtaW5QcmljZSIsIm1heFByaWNlIiwiZnJvbVByaWNlIiwidG9QcmljZSIsImlvblJhbmdlU2xpZGVyIiwidHlwZSIsInNraW4iLCJncmlkIiwibWluIiwibWF4IiwiZnJvbSIsInRvIiwiaGlkZV9taW5fbWF4IiwiaGlkZV9mcm9tX3RvIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLENBQW5COztFQUVBLE1BQUlGLFVBQVUsQ0FBQ0gsTUFBZixFQUF1QjtFQUVyQkcsSUFBQUEsVUFBVSxDQUFDUCxPQUFYLENBQW1CLFVBQVNVLFNBQVQsRUFBb0I7RUFDckMsVUFBTUMsS0FBSyxHQUFHRCxTQUFTLENBQUNFLGFBQVYsQ0FBd0IsaUJBQXhCLENBQWQ7O0VBRUEsVUFBR0QsS0FBSCxFQUFVO0VBQ1IsWUFBTUUs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
