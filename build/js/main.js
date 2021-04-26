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
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tb2ItbWVudS5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgY29uc3QgY2FyZEluZm8gPSAkKFwiLmpzLWNhcmQtaW5mb1wiKTtcblxuICBpZiAoY2FyZEluZm8pIHtcbiAgICBjb25zdCBzaGFkZSA9ICQoXCIuanMtaW5mb1wiKTtcblxuICAgIGNhcmRJbmZvLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBpdGVtID0gJCh0aGlzKTtcblxuICAgICAgaXRlbS5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNoYWRlLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG4gICAgXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cbiAgICAvL9CU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0YDQuCDRhdC+0LLQtdGA0LUg0L3QsCDQv9GD0L3QutGC0Ysg0LzQtdC90Y5cbiAgICBjb25zdCAkaXRlbSA9ICQoXCIubmF2X19pdGVtXCIpO1xuXG4gICAgJGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRzdWJtZW51ID0gJCh0aGlzKS5maW5kKFwiLnN1Ym1lbnVcIik7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcImRpc3BsYXlcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzKS5vbihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwiZGlzcGxheVwiKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgcHJvbW9cbiAgY29uc3QgcHJvbW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXByb21vLXNsaWRlclwiKTtcblxuICBpZiAocHJvbW8pIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlcyA9IHByb21vLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMVwiKTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlSGFuZGxlcih0aW1lcikge1xuICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gcHJvbW8ucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuXG4gICAgICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgICB9XG5cbiAgICB9XG4gICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDMwMCk7XG5cbiAgICBteVN3aXBlci5vbignc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZUNoYW5nZUhhbmRsZXIoNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2xpZGVyIG5ld0dvb2RzXG4gIGNvbnN0IG5ld0dvb2RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyXCIpO1xuXG4gIGlmIChuZXdHb29kcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA0NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDcwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBmb290ZXJGb3JtID0gKCkgPT4ge1xuICBjb25zdCAkZm9vdGVyRm9ybSA9ICQoXCIuZm9vdGVyIGZvcm1cIik7XG4gIGlmICghJGZvb3RlckZvcm0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dHMgPSAkZm9vdGVyRm9ybS5maW5kKFwiaW5wdXRcIik7XG5cbiAgaW5wdXRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgaW5wdXQgPSAkKHRoaXMpO1xuXG4gICAgaW5wdXQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5wdXQudmFsKCkgIT09IGBgKSB7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb290ZXJGb3JtO1xuIiwiY29uc3QgZGVza01lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0Lgg0LfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDRgSDQv9C+0LzQvtGJ0YzRjiBmYWRlXG4gIGNvbnN0ICRoZWFkZXJNZW51ID0gJChcIi5qcy1kZXNrLW1lbnVcIik7XG5cbiAgaWYoISRoZWFkZXJNZW51KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtZGVzay1tZW51LWJ0blwiKTtcblxuICBjb25zdCBrZXlDb2RlID0ge1xuICAgIEVTQzogMjcsXG4gIH07XG5cbiAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZURvd24oMzAwKTtcbiAgICAkaGVhZGVyTWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfTtcblxuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZVVwKDMwMCk7XG4gICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJGJ0bi5ibHVyKCk7XG4gIH07XG5cbiAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNpemVUb3BDb29yZGluYXRlKCk7XG4gICAgICBvcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LrQsCDQutC+0L7RgNC00LjQvdCw0YLRiyB0b3Ag0LTQu9GPIGhlYWRlci1tZW51XG4gIGNvbnN0IHJlc2l6ZVRvcENvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgbGV0IGhlaWdodCA9ICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IGEgPSBoZWlnaHQgKyBcInB4XCI7XG5cbiAgICAkaGVhZGVyTWVudS5jc3MoXCJ0b3BcIiwgYSk7XG4gIH07XG4gIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgcmVzaXplVG9wQ29vcmRpbmF0ZSk7XG4gICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICAkaGVhZGVyTWVudS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICRoZWFkZXJNZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAkYnRuLmJsdXIoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCX0LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0L/RgNC4INC90LDQttCw0YLQuNC4INCy0L3QtSDQvNC10L3RjlxuICAkKGRvY3VtZW50KS5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZGVzay1tZW51XCIpID09PSBudWxsICYmIGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnUtYnRuXCIpID09PSBudWxsKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9C+IEVTQ1xuICAkKGRvY3VtZW50KS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXlDb2RlID09PSBrZXlDb2RlLkVTQyAmJiAkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBsaW5rcyA9ICRoZWFkZXJNZW51LmZpbmQoXCIuanMtZGVzay1tZW51LWxpbmtzIGFcIik7XG4gIGNvbnN0IGNvbnRlbnRzID0gJGhlYWRlck1lbnUuZmluZChcIi5kZXNrLW1lbnVfX2NvbnRlbnRcIik7XG5cbiAgZnVuY3Rpb24gZGVza01lbnVDb250ZW50Q2hhbmdlKGxpbmspIHtcbiAgICBsaW5rLmFkZENsYXNzKFwiaG92ZXJcIik7XG5cbiAgICBjb25zdCBpZCA9IGxpbmsuYXR0cihcImRhdGEtaWRcIik7XG5cbiAgICByZXNldENvbnRlbnQoKTtcbiAgICBsZXQgY29udGVudCA9ICRoZWFkZXJNZW51LmZpbmQoYC5kZXNrLW1lbnVfX2NvbnRlbnRbZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG4gICAgY29udGVudC5hZGRDbGFzcyhcInNob3dcIik7XG4gIH1cbiAgZGVza01lbnVDb250ZW50Q2hhbmdlKCQobGlua3NbMF0pKTtcblxuICBmdW5jdGlvbiByZXNldEhvdmVyKCkge1xuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgbGluayA9ICQodGhpcyk7XG4gICAgICBsaW5rLnJlbW92ZUNsYXNzKFwiaG92ZXJcIik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldENvbnRlbnQoKSB7XG4gICAgY29udGVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBpdGVtID0gJCh0aGlzKTtcbiAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICBsZXQgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBsaW5rLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNldEhvdmVyKCk7XG4gICAgICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluayk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlc2tNZW51O1xuIiwiY29uc3QgcGhhcm1hY3lHZXQgPSAoKSA9PiB7XG4gIGNvbnN0IHBoYXJtYWN5QmxvY2sgPSAkKFwiLnBoYXJtYWNpZXNcIik7XG5cbiAgaWYgKCFwaGFybWFjeUJsb2NrKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc29ydExpbmtzID0gcGhhcm1hY3lCbG9jay5maW5kKFwiLnBoYXJtYWNpZXNfX2xpbmtzIGFcIik7XG4gIHNvcnRMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBcbiAgICAgIHNvcnRMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGhhcm1hY3lHZXQ7XG4iLCJjb25zdCBtb2JNZW51ID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnRuID0gJChcIi5qcy1tb2ItbWVudS1idG5cIik7XG5cbiAgaWYgKCRidG4pIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubW9iLW1lbnVcIik7XG4gICAgY29uc3QgJGJ0bkNsb3NlID0gJChcIi5tb2ItbWVudSAuanMtYnRuLWNsb3NlXCIpO1xuXG4gICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgfSwgNDUwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRidG5DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vYk1lbnU7XG4iLCJpbXBvcnQgbm9kZUxpc3RGb3JFYWNoIGZyb20gJy4vbm9kZS1saXN0LWZvci1lYWNoJztcbmltcG9ydCB0ZWwgZnJvbSAnLi90ZWwnO1xuaW1wb3J0IGFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbic7XG5pbXBvcnQgbWVudU9wZW4gZnJvbSAnLi9tZW51LW9wZW4nO1xuaW1wb3J0IGhlYWRlclNjcm9sbCBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgc2xpZGVycyBmcm9tICcuL3NsaWRlcnMnO1xuaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlcic7XG5pbXBvcnQgYnRuVXAgZnJvbSAnLi9idG4tdXAnO1xuaW1wb3J0IGdvb2RRdWFudGl0eSBmcm9tICcuL2dvb2QtcXVhbnRpdHknO1xuaW1wb3J0IGZvb3RlckZvcm0gZnJvbSAnLi9mb290ZXItZm9ybSc7XG5pbXBvcnQgZGVza01lbnUgZnJvbSAnLi9kZXNrLW1lbnUnO1xuaW1wb3J0IHBoYXJtYWN5R2V0IGZyb20gJy4vcGhhcm1hY3ktZ2V0JztcbmltcG9ydCBtb2JNZW51IGZyb20gJy4vbW9iLW1lbnUnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBkZXNrTWVudSgpO1xuICAgIHBoYXJtYWN5R2V0KCk7XG4gICAgbW9iTWVudSgpO1xuICB9XG59XG5cblxuQXBwLmluaXQoKTtcbndpbmRvdy5BcHAgPSBBcHA7XG4iXSwibmFtZXMiOlsibm9kZUxpc3RGb3JFYWNoIiwid2luZG93IiwiTm9kZUxpc3QiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwiaSIsImxlbmd0aCIsImNhbGwiLCJ0ZWwiLCJmb3JtQmxvY2tzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybUJsb2NrIiwiaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwicGhvbmVNYXNrIiwiSU1hc2siLCJtYXNrIiwiYW5pbWF0aW9uIiwiYW5pbWF0aW9ucyIsIldPVyIsImluaXQiLCJjYXJkSW5mbyIsIiQiLCJzaGFkZSIsImVhY2giLCJpdGVtIiwib24iLCJjc3MiLCJtZW51T3BlbiIsIiRidXR0b25zTWVudSIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwiaGVhZGVyU2Nyb2xsIiwibWFpbiIsImludHJvVG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiJGl0ZW0iLCIkc3VibWVudSIsImZpbmQiLCJzbGlkZXJzIiwiU3dpcGVyIiwicHJvbW8iLCJteVN3aXBlciIsImRpcmVjdGlvbiIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJzcGVlZCIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJwYWdpbmF0aW9uIiwiZWwiLCJjbGlja2FibGUiLCJ0aXRsZXMiLCJzbGlkZUNoYW5nZUhhbmRsZXIiLCJ0aW1lciIsImFjdGl2ZVNsaWRlIiwidGl0bGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb250YWlucyIsInJlbW92ZSIsInNhbGVCbG9jayIsIm5ld0dvb2RzIiwic2ltdWxhdGVUb3VjaCIsImJyZWFrcG9pbnRzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwidmFsdWUiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb290ZXJGb3JtIiwiJGZvb3RlckZvcm0iLCJpbnB1dHMiLCJ2YWwiLCJkZXNrTWVudSIsIiRoZWFkZXJNZW51Iiwia2V5Q29kZSIsIkVTQyIsIm9wZW4iLCJzbGlkZURvd24iLCJjbG9zZSIsInNsaWRlVXAiLCJibHVyIiwicmVzaXplVG9wQ29vcmRpbmF0ZSIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwiYSIsImV2dCIsInRhcmdldCIsImNsb3Nlc3QiLCJsaW5rcyIsImNvbnRlbnRzIiwiZGVza01lbnVDb250ZW50Q2hhbmdlIiwibGluayIsImlkIiwicmVzZXRDb250ZW50IiwiY29udGVudCIsInJlc2V0SG92ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInBoYXJtYWN5R2V0IiwicGhhcm1hY3lCbG9jayIsInNvcnRMaW5rcyIsIm1vYk1lbnUiLCIkYnRuQ2xvc2UiLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07RUFDNUIsTUFBSSxjQUFjQyxNQUFkLElBQXdCLENBQUNDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBaEQsRUFBeUQ7RUFDdkRGLElB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
