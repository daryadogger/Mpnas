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
          470: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          991: {
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
        close();
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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgY29uc3QgY2FyZEluZm8gPSAkKFwiLmpzLWNhcmQtaW5mb1wiKTtcblxuICBpZiAoY2FyZEluZm8pIHtcbiAgICBjb25zdCBzaGFkZSA9ICQoXCIuanMtaW5mb1wiKTtcblxuICAgIGNhcmRJbmZvLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBpdGVtID0gJCh0aGlzKTtcblxuICAgICAgaXRlbS5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNoYWRlLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG4gICAgXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cbiAgICAvL9CU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0YDQuCDRhdC+0LLQtdGA0LUg0L3QsCDQv9GD0L3QutGC0Ysg0LzQtdC90Y5cbiAgICBjb25zdCAkaXRlbSA9ICQoXCIubmF2X19pdGVtXCIpO1xuXG4gICAgJGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRzdWJtZW51ID0gJCh0aGlzKS5maW5kKFwiLnN1Ym1lbnVcIik7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcImRpc3BsYXlcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzKS5vbihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwiZGlzcGxheVwiKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgcHJvbW9cbiAgY29uc3QgcHJvbW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXByb21vLXNsaWRlclwiKTtcblxuICBpZiAocHJvbW8pIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlcyA9IHByb21vLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMVwiKTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlSGFuZGxlcih0aW1lcikge1xuICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gcHJvbW8ucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuXG4gICAgICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgICB9XG5cbiAgICB9XG4gICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDMwMCk7XG5cbiAgICBteVN3aXBlci5vbignc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZUNoYW5nZUhhbmRsZXIoNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2xpZGVyIG5ld0dvb2RzXG4gIGNvbnN0IG5ld0dvb2RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyXCIpO1xuXG4gIGlmIChuZXdHb29kcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA0NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDcwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBmb290ZXJGb3JtID0gKCkgPT4ge1xuICBjb25zdCAkZm9vdGVyRm9ybSA9ICQoXCIuZm9vdGVyIGZvcm1cIik7XG4gIGlmICghJGZvb3RlckZvcm0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dHMgPSAkZm9vdGVyRm9ybS5maW5kKFwiaW5wdXRcIik7XG5cbiAgaW5wdXRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgaW5wdXQgPSAkKHRoaXMpO1xuXG4gICAgaW5wdXQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5wdXQudmFsKCkgIT09IGBgKSB7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb290ZXJGb3JtO1xuIiwiY29uc3QgZGVza01lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0Lgg0LfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDRgSDQv9C+0LzQvtGJ0YzRjiBmYWRlXG4gIGNvbnN0ICRoZWFkZXJNZW51ID0gJChcIi5qcy1kZXNrLW1lbnVcIik7XG5cbiAgaWYoISRoZWFkZXJNZW51KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtZGVzay1tZW51LWJ0blwiKTtcblxuICBjb25zdCBrZXlDb2RlID0ge1xuICAgIEVTQzogMjcsXG4gIH07XG5cbiAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZURvd24oMzAwKTtcbiAgICAkaGVhZGVyTWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfTtcblxuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZVVwKDMwMCk7XG4gICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJGJ0bi5ibHVyKCk7XG4gIH07XG5cbiAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNpemVUb3BDb29yZGluYXRlKCk7XG4gICAgICBvcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LrQsCDQutC+0L7RgNC00LjQvdCw0YLRiyB0b3Ag0LTQu9GPIGhlYWRlci1tZW51XG4gIGNvbnN0IHJlc2l6ZVRvcENvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgbGV0IGhlaWdodCA9ICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IGEgPSBoZWlnaHQgKyBcInB4XCI7XG5cbiAgICAkaGVhZGVyTWVudS5jc3MoXCJ0b3BcIiwgYSk7XG4gIH07XG4gIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgcmVzaXplVG9wQ29vcmRpbmF0ZSk7XG4gICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LLQvdC1INC80LXQvdGOXG4gICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnVcIikgPT09IG51bGwgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudS1idG5cIikgPT09IG51bGwpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0L4gRVNDXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmtleUNvZGUgPT09IGtleUNvZGUuRVNDICYmICRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtzID0gJGhlYWRlck1lbnUuZmluZChcIi5qcy1kZXNrLW1lbnUtbGlua3MgYVwiKTtcbiAgY29uc3QgY29udGVudHMgPSAkaGVhZGVyTWVudS5maW5kKFwiLmRlc2stbWVudV9fY29udGVudFwiKTtcblxuICBmdW5jdGlvbiBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluaykge1xuICAgIGxpbmsuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGNvbnN0IGlkID0gbGluay5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAgIHJlc2V0Q29udGVudCgpO1xuICAgIGxldCBjb250ZW50ID0gJGhlYWRlck1lbnUuZmluZChgLmRlc2stbWVudV9fY29udGVudFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcbiAgICBjb250ZW50LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgfVxuICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UoJChsaW5rc1swXSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0SG92ZXIoKSB7XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBsaW5rID0gJCh0aGlzKTtcbiAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0Q29udGVudCgpIHtcbiAgICBjb250ZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgaXRlbS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxpbmsub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc2V0SG92ZXIoKTtcbiAgICAgIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKTtcbiAgICB9KTtcblxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVza01lbnU7XG4iLCJjb25zdCBwaGFybWFjeUdldCA9ICgpID0+IHtcbiAgY29uc3QgcGhhcm1hY3lCbG9jayA9ICQoXCIucGhhcm1hY2llc1wiKTtcblxuICBpZiAoIXBoYXJtYWN5QmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3J0TGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlua3MgYVwiKTtcbiAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFxuICAgICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaGFybWFjeUdldDtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBkZXNrTWVudSBmcm9tICcuL2Rlc2stbWVudSc7XG5pbXBvcnQgcGhhcm1hY3lHZXQgZnJvbSAnLi9waGFybWFjeS1nZXQnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBkZXNrTWVudSgpO1xuICAgIHBoYXJtYWN5R2V0KCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImNhcmRJbmZvIiwiJCIsInNoYWRlIiwiZWFjaCIsIml0ZW0iLCJvbiIsImNzcyIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCIkaXRlbSIsIiRzdWJtZW51IiwiZmluZCIsInNsaWRlcnMiLCJTd2lwZXIiLCJwcm9tbyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInBhZ2luYXRpb24iLCJlbCIsImNsaWNrYWJsZSIsInRpdGxlcyIsInNsaWRlQ2hhbmdlSGFuZGxlciIsInRpbWVyIiwiYWN0aXZlU2xpZGUiLCJ0aXRsZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbnRhaW5zIiwicmVtb3ZlIiwic2FsZUJsb2NrIiwibmV3R29vZHMiLCJzaW11bGF0ZVRvdWNoIiwiYnJlYWtwb2ludHMiLCJudW1iZXIiLCIkbnVtYmVycyIsIiR0aGlzcyIsImJ0blVwIiwic2Nyb2xsIiwiaXMiLCJvcGFjaXR5IiwiZmFkZUluIiwic3RvcCIsImZhZGVPdXQiLCJhbmltYXRlIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJ2YWx1ZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvb3RlckZvcm0iLCIkZm9vdGVyRm9ybSIsImlucHV0cyIsInZhbCIsImRlc2tNZW51IiwiJGhlYWRlck1lbnUiLCJrZXlDb2RlIiwiRVNDIiwib3BlbiIsInNsaWRlRG93biIsImNsb3NlIiwic2xpZGVVcCIsImJsdXIiLCJyZXNpemVUb3BDb29yZGluYXRlIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJhIiwiZXZ0IiwidGFyZ2V0IiwiY2xvc2VzdCIsImxpbmtzIiwiY29udGVudHMiLCJkZXNrTWVudUNvbnRlbnRDaGFuZ2UiLCJsaW5rIiwiaWQiLCJyZXNldENvbnRlbnQiLCJjb250ZW50IiwicmVzZXRIb3ZlciIsInByZXZlbnREZWZhdWx0IiwicGhhcm1hY3lHZXQiLCJwaGFybWFjeUJsb2NrIiwic29ydExpbmtzIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLENBQW5COztFQUVBLE1BQUlGLFVBQVUsQ0FBQ0gsTUFBZixFQUF1QjtFQUVyQkcsSUFBQUEsVUFBVSxDQUFDUCxPQUFYLENBQW1CLFVBQVNVLFNBQVQsRUFBb0I7RUFDckMsVUFBTUMsS0FBSyxHQUFHRCxTQUFTLENBQUNFLGFBQVYsQ0FBd0IsaUJBQXhCLENBQWQ7O0VBRUEsVUFBR0QsS0FB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
