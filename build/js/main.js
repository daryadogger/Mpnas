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
      var mySwiper = new Swiper(".js-promo-slider.swiper-container", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        navigation: {
          nextEl: ".js-promo-slider .swiper-button-next",
          prevEl: ".js-promo-slider .swiper-button-prev"
        }
      });
    } // Slider newGoods


    var newGoods = document.querySelector(".js-new-goods-slider");

    if (newGoods) {
      var _mySwiper = new Swiper(".js-new-goods-slider .swiper-container", {
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
            spaceBetween: 35
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGlvbjtcbiIsImNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnV0dG9uc01lbnUgPSAkKFwiLmpzLW9wZW4tbWVudVwiKTtcblxuICBpZiAoJGJ1dHRvbnNNZW51Lmxlbmd0aCkge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tZW51XCIpO1xuICAgIGNvbnN0ICRidXR0b25DbG9zZSA9ICQoXCIuanMtYnRuLWNsb3NlXCIpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuXG4gICAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICAgIH0sIDQ1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLm1lbnVcIikub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICB9KTtcblxuICAgICRidXR0b25DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudU9wZW47XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcbiAgICBcbiAgICAvLyBIZWFkZXIg0LzQtdC90Y/QtdGCINGG0LLQtdGC0LAg0L/RgNC4INGB0LrRgNC+0LvQu9C1LiDQntC9INGD0LbQtSBmaXhlZCDQuNC30L3QsNGH0LDQu9GM0L3QvlxuICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGludHJvVG9wID0gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChpbnRyb1RvcCA8IC0xKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgIH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcyhcInNjcm9sbFwiKSAmJiBpbnRyb1RvcCA+IC0xKSB7XG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgICQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIFNsaWRlciBwcm9tb1xuICBjb25zdCBwcm9tbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcHJvbW8tc2xpZGVyXCIpO1xuXG4gIGlmIChwcm9tbykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1wcm9tby1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBuZXdHb29kc1xuICBjb25zdCBuZXdHb29kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbmV3LWdvb2RzLXNsaWRlclwiKTtcblxuICBpZiAobmV3R29vZHMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLW5ldy1nb29kcy1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLW5ldy1nb29kcy1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDQ3MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgNzAwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA5OTE6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGdvb2RRdWFudGl0eSA9ICgpID0+IHtcbiAgLy8g0KPQstC10LvQuNGH0LXQvdC40LUg0Lgg0YPQvNC10L3RjNGI0LXQvdC40LUg0YLQvtCy0LDRgNC+0LJcbiAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcXVhbnRpdHlcIik7XG4gIGlmIChjb250YWluZXJzLmxlbmd0aCA8IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBidG5JbmNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWluY3JlYXNlXCIpO1xuICAgIGNvbnN0IGJ0bkRlY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZGVjcmVhc2VcIik7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBjb25zdCBidG5JbmNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gKyt2YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlID4gMSkge1xuICAgICAgICBidG5EZWNyZWFzZS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgYnRuRGVjcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IC0tdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA8PSAxKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gMTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAxO1xuICAgICAgICBidG5EZWNyZWFzZS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBidG5JbmNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuSW5jcmVhc2VIYW5kbGVyKTtcbiAgICBidG5EZWNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuRGVjcmVhc2VIYW5kbGVyKTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJ0bkluY3JlYXNlSGFuZGxlcigpO1xuICAgICAgYnRuRGVjcmVhc2VIYW5kbGVyKCk7XG4gICAgfSlcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdvb2RRdWFudGl0eTtcbiIsImNvbnN0IGZvb3RlckZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0ICRmb290ZXJGb3JtID0gJChcIi5mb290ZXIgZm9ybVwiKTtcbiAgaWYgKCEkZm9vdGVyRm9ybSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0cyA9ICRmb290ZXJGb3JtLmZpbmQoXCJpbnB1dFwiKTtcblxuICBpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dCA9ICQodGhpcyk7XG5cbiAgICBpbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckZvcm07XG4iLCJjb25zdCBkZXNrTWVudSA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQuCDQt9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INGBINC/0L7QvNC+0YnRjNGOIGZhZGVcbiAgY29uc3QgJGhlYWRlck1lbnUgPSAkKFwiLmpzLWRlc2stbWVudVwiKTtcblxuICBpZighJGhlYWRlck1lbnUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCAkYnRuID0gJChcIi5qcy1kZXNrLW1lbnUtYnRuXCIpO1xuXG4gIGNvbnN0IGtleUNvZGUgPSB7XG4gICAgRVNDOiAyNyxcbiAgfTtcblxuICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlRG93bigzMDApO1xuICAgICRoZWFkZXJNZW51LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAkYnRuLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9O1xuXG4gIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlVXAoMzAwKTtcbiAgICAkaGVhZGVyTWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkYnRuLmJsdXIoKTtcbiAgfTtcblxuICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcbiAgICAgIG9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCe0L/RgNC10LTQtdC70LXQvdC40LUg0Lgg0YPRgdGC0LDQvdC+0LLQutCwINC60L7QvtGA0LTQuNC90LDRgtGLIHRvcCDQtNC70Y8gaGVhZGVyLW1lbnVcbiAgY29uc3QgcmVzaXplVG9wQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICBsZXQgaGVpZ2h0ID0gJChcIi5oZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgYSA9IGhlaWdodCArIFwicHhcIjtcblxuICAgICRoZWFkZXJNZW51LmNzcyhcInRvcFwiLCBhKTtcbiAgfTtcbiAgcmVzaXplVG9wQ29vcmRpbmF0ZSgpO1xuXG4gICQod2luZG93KS5vbihcInJlc2l6ZVwiLCByZXNpemVUb3BDb29yZGluYXRlKTtcbiAgJChkb2N1bWVudCkub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQstC90LUg0LzQtdC90Y5cbiAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudVwiKSA9PT0gbnVsbCAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZGVzay1tZW51LWJ0blwiKSA9PT0gbnVsbCkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCX0LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0L/QviBFU0NcbiAgJChkb2N1bWVudCkub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQua2V5Q29kZSA9PT0ga2V5Q29kZS5FU0MgJiYgJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbGlua3MgPSAkaGVhZGVyTWVudS5maW5kKFwiLmpzLWRlc2stbWVudS1saW5rcyBhXCIpO1xuICBjb25zdCBjb250ZW50cyA9ICRoZWFkZXJNZW51LmZpbmQoXCIuZGVzay1tZW51X19jb250ZW50XCIpO1xuXG4gIGZ1bmN0aW9uIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKSB7XG4gICAgbGluay5hZGRDbGFzcyhcImhvdmVyXCIpO1xuXG4gICAgY29uc3QgaWQgPSBsaW5rLmF0dHIoXCJkYXRhLWlkXCIpO1xuXG4gICAgcmVzZXRDb250ZW50KCk7XG4gICAgbGV0IGNvbnRlbnQgPSAkaGVhZGVyTWVudS5maW5kKGAuZGVzay1tZW51X19jb250ZW50W2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICAgIGNvbnRlbnQuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICB9XG4gIGRlc2tNZW51Q29udGVudENoYW5nZSgkKGxpbmtzWzBdKSk7XG5cbiAgZnVuY3Rpb24gcmVzZXRIb3ZlcigpIHtcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuICAgICAgbGluay5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRDb250ZW50KCkge1xuICAgIGNvbnRlbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaXRlbSA9ICQodGhpcyk7XG4gICAgICBpdGVtLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbGluay5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVzZXRIb3ZlcigpO1xuICAgICAgZGVza01lbnVDb250ZW50Q2hhbmdlKGxpbmspO1xuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZXNrTWVudTtcbiIsImNvbnN0IHBoYXJtYWN5R2V0ID0gKCkgPT4ge1xuICBjb25zdCBwaGFybWFjeUJsb2NrID0gJChcIi5waGFybWFjaWVzXCIpO1xuXG4gIGlmICghcGhhcm1hY3lCbG9jaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNvcnRMaW5rcyA9IHBoYXJtYWN5QmxvY2suZmluZChcIi5waGFybWFjaWVzX19saW5rcyBhXCIpO1xuICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgXG4gICAgICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBoYXJtYWN5R2V0O1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcbmltcG9ydCBmb290ZXJGb3JtIGZyb20gJy4vZm9vdGVyLWZvcm0nO1xuaW1wb3J0IGRlc2tNZW51IGZyb20gJy4vZGVzay1tZW51JztcbmltcG9ydCBwaGFybWFjeUdldCBmcm9tICcuL3BoYXJtYWN5LWdldCc7XG5cbmNsYXNzIEFwcCB7XG4gIHN0YXRpYyBpbml0KCkge1xuICAgIG5vZGVMaXN0Rm9yRWFjaCgpO1xuICAgIHRlbCgpO1xuICAgIGFuaW1hdGlvbigpO1xuICAgIG1lbnVPcGVuKCk7XG4gICAgaGVhZGVyU2Nyb2xsKCk7XG4gICAgc2xpZGVycygpO1xuICAgIG51bWJlcigpO1xuICAgIGJ0blVwKCk7XG4gICAgZ29vZFF1YW50aXR5KCk7XG4gICAgZm9vdGVyRm9ybSgpO1xuICAgIGRlc2tNZW51KCk7XG4gICAgcGhhcm1hY3lHZXQoKTtcbiAgfVxufVxuXG5cbkFwcC5pbml0KCk7XG53aW5kb3cuQXBwID0gQXBwO1xuIl0sIm5hbWVzIjpbIm5vZGVMaXN0Rm9yRWFjaCIsIndpbmRvdyIsIk5vZGVMaXN0IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGxiYWNrIiwidGhpc0FyZyIsImkiLCJsZW5ndGgiLCJjYWxsIiwidGVsIiwiZm9ybUJsb2NrcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1CbG9jayIsImlucHV0IiwicXVlcnlTZWxlY3RvciIsInBob25lTWFzayIsIklNYXNrIiwibWFzayIsImFuaW1hdGlvbiIsImFuaW1hdGlvbnMiLCJXT1ciLCJpbml0IiwibWVudU9wZW4iLCIkYnV0dG9uc01lbnUiLCIkIiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiZWFjaCIsIiRidG4iLCJzY3JvbGxIZWFkZXIiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbGljayIsInBvcyIsInBhcnNlSW50IiwiYXR0ciIsInJlbW92ZUF0dHIiLCJzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJwYWdlUG9zIiwib24iLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJzbGlkZXJzIiwiU3dpcGVyIiwicHJvbW8iLCJteVN3aXBlciIsImRpcmVjdGlvbiIsInNsaWRlc1BlclZpZXciLCJzcGFjZUJldHdlZW4iLCJzcGVlZCIsIm5hdmlnYXRpb24iLCJuZXh0RWwiLCJwcmV2RWwiLCJuZXdHb29kcyIsImJyZWFrcG9pbnRzIiwibnVtYmVyIiwiJG51bWJlcnMiLCIkdGhpc3MiLCJidG5VcCIsInNjcm9sbCIsImlzIiwiY3NzIiwib3BhY2l0eSIsImZhZGVJbiIsInN0b3AiLCJmYWRlT3V0IiwiYW5pbWF0ZSIsImdvb2RRdWFudGl0eSIsImNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJidG5JbmNyZWFzZSIsImJ0bkRlY3JlYXNlIiwidmFsdWUiLCJidG5JbmNyZWFzZUhhbmRsZXIiLCJuZXdWYWx1ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImJ0bkRlY3JlYXNlSGFuZGxlciIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb290ZXJGb3JtIiwiJGZvb3RlckZvcm0iLCJpbnB1dHMiLCJmaW5kIiwidmFsIiwiZGVza01lbnUiLCIkaGVhZGVyTWVudSIsImtleUNvZGUiLCJFU0MiLCJvcGVuIiwic2xpZGVEb3duIiwiY2xvc2UiLCJzbGlkZVVwIiwiYmx1ciIsInJlc2l6ZVRvcENvb3JkaW5hdGUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImEiLCJldnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGlua3MiLCJjb250ZW50cyIsImRlc2tNZW51Q29udGVudENoYW5nZSIsImxpbmsiLCJpZCIsInJlc2V0Q29udGVudCIsImNvbnRlbnQiLCJyZXNldEhvdmVyIiwiaXRlbSIsInByZXZlbnREZWZhdWx0IiwicGhhcm1hY3lHZXQiLCJwaGFybWFjeUJsb2NrIiwic29ydExpbmtzIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0VBQzVCLE1BQUksY0FBY0MsTUFBZCxJQUF3QixDQUFDQyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQWhELEVBQXlEO0VBQ3ZERixJQUFBQSxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLE9BQW5CLEdBQTZCLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQTZCO0VBQzFEQSxNQUFBQSxPQUFPLEdBQUdBLE9BQU8sSUFBSUwsTUFBckI7O0VBQ0EsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtDLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0VBQ3RDRixRQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY0gsT0FBZCxFQUF1QixLQUFLQyxDQUFMLENBQXZCLEVBQWdDQSxDQUFoQyxFQUFtQyxJQUFuQztFQUNDO0VBQ0EsS0FMRDtFQU1EO0VBQ0YsQ0FURDs7RUNBQSxJQUFNRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUFNO0VBQ2hCO0VBQ0EsTUFBTUMsVUFBVSxHQUFHQyxR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
