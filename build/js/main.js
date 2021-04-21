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
      $(document).on("ready", scrollHeader);
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
        spaceBetween: 0,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG4gICAgXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgcHJvbW9cbiAgY29uc3QgcHJvbW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXByb21vLXNsaWRlclwiKTtcblxuICBpZiAocHJvbW8pIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlcyA9IHByb21vLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMVwiKTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlSGFuZGxlcih0aW1lcikge1xuICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gcHJvbW8ucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuXG4gICAgICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgICB9XG5cbiAgICB9XG4gICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDMwMCk7XG5cbiAgICBteVN3aXBlci5vbignc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZUNoYW5nZUhhbmRsZXIoNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zYWxlLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWVcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgbmV3R29vZHNcbiAgY29uc3QgbmV3R29vZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW5ldy1nb29kcy1zbGlkZXJcIik7XG5cbiAgaWYgKG5ld0dvb2RzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLW5ldy1nb29kcy1zbGlkZXIgLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA0NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDcwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBmb290ZXJGb3JtID0gKCkgPT4ge1xuICBjb25zdCAkZm9vdGVyRm9ybSA9ICQoXCIuZm9vdGVyIGZvcm1cIik7XG4gIGlmICghJGZvb3RlckZvcm0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dHMgPSAkZm9vdGVyRm9ybS5maW5kKFwiaW5wdXRcIik7XG5cbiAgaW5wdXRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgaW5wdXQgPSAkKHRoaXMpO1xuXG4gICAgaW5wdXQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5wdXQudmFsKCkgIT09IGBgKSB7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb290ZXJGb3JtO1xuIiwiY29uc3QgZGVza01lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0Lgg0LfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDRgSDQv9C+0LzQvtGJ0YzRjiBmYWRlXG4gIGNvbnN0ICRoZWFkZXJNZW51ID0gJChcIi5qcy1kZXNrLW1lbnVcIik7XG5cbiAgaWYoISRoZWFkZXJNZW51KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtZGVzay1tZW51LWJ0blwiKTtcblxuICBjb25zdCBrZXlDb2RlID0ge1xuICAgIEVTQzogMjcsXG4gIH07XG5cbiAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZURvd24oMzAwKTtcbiAgICAkaGVhZGVyTWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfTtcblxuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZVVwKDMwMCk7XG4gICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJGJ0bi5ibHVyKCk7XG4gIH07XG5cbiAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNpemVUb3BDb29yZGluYXRlKCk7XG4gICAgICBvcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LrQsCDQutC+0L7RgNC00LjQvdCw0YLRiyB0b3Ag0LTQu9GPIGhlYWRlci1tZW51XG4gIGNvbnN0IHJlc2l6ZVRvcENvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgbGV0IGhlaWdodCA9ICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IGEgPSBoZWlnaHQgKyBcInB4XCI7XG5cbiAgICAkaGVhZGVyTWVudS5jc3MoXCJ0b3BcIiwgYSk7XG4gIH07XG4gIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgcmVzaXplVG9wQ29vcmRpbmF0ZSk7XG4gICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LLQvdC1INC80LXQvdGOXG4gICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnVcIikgPT09IG51bGwgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudS1idG5cIikgPT09IG51bGwpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0L4gRVNDXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmtleUNvZGUgPT09IGtleUNvZGUuRVNDICYmICRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtzID0gJGhlYWRlck1lbnUuZmluZChcIi5qcy1kZXNrLW1lbnUtbGlua3MgYVwiKTtcbiAgY29uc3QgY29udGVudHMgPSAkaGVhZGVyTWVudS5maW5kKFwiLmRlc2stbWVudV9fY29udGVudFwiKTtcblxuICBmdW5jdGlvbiBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluaykge1xuICAgIGxpbmsuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGNvbnN0IGlkID0gbGluay5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAgIHJlc2V0Q29udGVudCgpO1xuICAgIGxldCBjb250ZW50ID0gJGhlYWRlck1lbnUuZmluZChgLmRlc2stbWVudV9fY29udGVudFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcbiAgICBjb250ZW50LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgfVxuICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UoJChsaW5rc1swXSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0SG92ZXIoKSB7XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBsaW5rID0gJCh0aGlzKTtcbiAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0Q29udGVudCgpIHtcbiAgICBjb250ZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgaXRlbS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxpbmsub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc2V0SG92ZXIoKTtcbiAgICAgIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKTtcbiAgICB9KTtcblxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVza01lbnU7XG4iLCJjb25zdCBwaGFybWFjeUdldCA9ICgpID0+IHtcbiAgY29uc3QgcGhhcm1hY3lCbG9jayA9ICQoXCIucGhhcm1hY2llc1wiKTtcblxuICBpZiAoIXBoYXJtYWN5QmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3J0TGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlua3MgYVwiKTtcbiAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFxuICAgICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaGFybWFjeUdldDtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBkZXNrTWVudSBmcm9tICcuL2Rlc2stbWVudSc7XG5pbXBvcnQgcGhhcm1hY3lHZXQgZnJvbSAnLi9waGFybWFjeS1nZXQnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBkZXNrTWVudSgpO1xuICAgIHBoYXJtYWN5R2V0KCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJCIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsImVhY2giLCIkYnRuIiwic2Nyb2xsSGVhZGVyIiwiaGFzQ2xhc3MiLCJzY3JvbGxUb3AiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xpY2siLCJwb3MiLCJwYXJzZUludCIsImF0dHIiLCJyZW1vdmVBdHRyIiwic2Nyb2xsVG8iLCJzZXRUaW1lb3V0IiwicGFnZVBvcyIsIm9uIiwiaGVhZGVyU2Nyb2xsIiwibWFpbiIsImludHJvVG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2xpZGVycyIsIlN3aXBlciIsInByb21vIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwidGl0bGVzIiwic2xpZGVDaGFuZ2VIYW5kbGVyIiwidGltZXIiLCJhY3RpdmVTbGlkZSIsInRpdGxlIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJzYWxlQmxvY2siLCJuZXdHb29kcyIsImJyZWFrcG9pbnRzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwiY3NzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwidmFsdWUiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb290ZXJGb3JtIiwiJGZvb3RlckZvcm0iLCJpbnB1dHMiLCJmaW5kIiwidmFsIiwiZGVza01lbnUiLCIkaGVhZGVyTWVudSIsImtleUNvZGUiLCJFU0MiLCJvcGVuIiwic2xpZGVEb3duIiwiY2xvc2UiLCJzbGlkZVVwIiwiYmx1ciIsInJlc2l6ZVRvcENvb3JkaW5hdGUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImEiLCJldnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGlua3MiLCJjb250ZW50cyIsImRlc2tNZW51Q29udGVudENoYW5nZSIsImxpbmsiLCJpZCIsInJlc2V0Q29udGVudCIsImNvbnRlbnQiLCJyZXNldEhvdmVyIiwiaXRlbSIsInByZXZlbnREZWZhdWx0IiwicGhhcm1hY3lHZXQiLCJwaGFybWFjeUJsb2NrIiwic29ydExpbmtzIiwiQXBwIl0s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
