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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGlvbjtcbiIsImNvbnN0IG1lbnVPcGVuID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC80L7QsSDQvNC10L3RjlxuICBjb25zdCAkYnV0dG9uc01lbnUgPSAkKFwiLmpzLW9wZW4tbWVudVwiKTtcblxuICBpZiAoJGJ1dHRvbnNNZW51Lmxlbmd0aCkge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tZW51XCIpO1xuICAgIGNvbnN0ICRidXR0b25DbG9zZSA9ICQoXCIuanMtYnRuLWNsb3NlXCIpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuXG4gICAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG5cbiAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICAgIH0sIDQ1MCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLm1lbnVcIikub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICB9KTtcblxuICAgICRidXR0b25DbG9zZS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICRidXR0b25zTWVudS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG4gICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgfSk7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVudU9wZW47XG4iLCJjb25zdCBoZWFkZXJTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgaWYgKCRoZWFkZXIpIHtcbiAgICBcbiAgICAvLyBIZWFkZXIg0LzQtdC90Y/QtdGCINGG0LLQtdGC0LAg0L/RgNC4INGB0LrRgNC+0LvQu9C1LiDQntC9INGD0LbQtSBmaXhlZCDQuNC30L3QsNGH0LDQu9GM0L3QvlxuICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGludHJvVG9wID0gbWFpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChpbnRyb1RvcCA8IC0xKSB7XG4gICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgIH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcyhcInNjcm9sbFwiKSAmJiBpbnRyb1RvcCA+IC0xKSB7XG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgICQoZG9jdW1lbnQpLm9uKFwicmVhZHlcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJTY3JvbGw7XG4iLCJjb25zdCBzbGlkZXJzID0gKCkgPT4ge1xuICBjb25zdCBTd2lwZXIgPSB3aW5kb3cuU3dpcGVyO1xuXG4gIC8vIFNsaWRlciBwcm9tb1xuICBjb25zdCBwcm9tbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcHJvbW8tc2xpZGVyXCIpO1xuXG4gIGlmIChwcm9tbykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1wcm9tby1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1zYWxlLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWVcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgbmV3R29vZHNcbiAgY29uc3QgbmV3R29vZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW5ldy1nb29kcy1zbGlkZXJcIik7XG5cbiAgaWYgKG5ld0dvb2RzKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLW5ldy1nb29kcy1zbGlkZXIgLnN3aXBlci1jb250YWluZXJcIiwge1xuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA0NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDcwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgOTkxOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbGlkZXJzO1xuIiwiY29uc3QgbnVtYmVyID0gKCkgPT4ge1xuICAvL9Cg0LDQt9GA0LXRiNCw0LXRgiDQstCy0L7QtCDRgtC+0LvRjNC60L4g0YbQuNGE0YAg0LIgaW5wdXRcbiAgY29uc3QgJG51bWJlcnMgPSAkKFwiLmpzLW51bWJlclwiKTtcbiAgaWYgKCEkbnVtYmVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gICRudW1iZXJzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcblxuICAgICR0aGlzcy5tYXNrKCcwIycpO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVtYmVyO1xuIiwiY29uc3QgYnRuVXAgPSAoKSA9PiB7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBpZiAoJCgnI3VwYnV0dG9uJykuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgJCgnI3VwYnV0dG9uJykuY3NzKHtvcGFjaXR5IDogMC45fSkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgeyAkKCcjdXBidXR0b24nKS5zdG9wKHRydWUsIGZhbHNlKS5mYWRlT3V0KCdmYXN0Jyk7IH1cbiAgfSk7XG5cbiAgJCgnI3VwYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcCA6IDB9LCAzMDApO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYnRuVXA7XG4iLCJjb25zdCBnb29kUXVhbnRpdHkgPSAoKSA9PiB7XG4gIC8vINCj0LLQtdC70LjRh9C10L3QuNC1INC4INGD0LzQtdC90YzRiNC10L3QuNC1INGC0L7QstCw0YDQvtCyXG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXF1YW50aXR5XCIpO1xuICBpZiAoY29udGFpbmVycy5sZW5ndGggPCAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgY29uc3QgYnRuSW5jcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1pbmNyZWFzZVwiKTtcbiAgICBjb25zdCBidG5EZWNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWRlY3JlYXNlXCIpO1xuXG4gICAgbGV0IHZhbHVlO1xuXG4gICAgY29uc3QgYnRuSW5jcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9ICsrdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA+IDEpIHtcbiAgICAgICAgYnRuRGVjcmVhc2UucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGJ0bkRlY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSAtLXZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IDE7XG4gICAgICAgIGlucHV0LnZhbHVlID0gMTtcbiAgICAgICAgYnRuRGVjcmVhc2Uuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgYnRuSW5jcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkluY3JlYXNlSGFuZGxlcik7XG4gICAgYnRuRGVjcmVhc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ0bkRlY3JlYXNlSGFuZGxlcik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBidG5JbmNyZWFzZUhhbmRsZXIoKTtcbiAgICAgIGJ0bkRlY3JlYXNlSGFuZGxlcigpO1xuICAgIH0pXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBnb29kUXVhbnRpdHk7XG4iLCJjb25zdCBmb290ZXJGb3JtID0gKCkgPT4ge1xuICBjb25zdCAkZm9vdGVyRm9ybSA9ICQoXCIuZm9vdGVyIGZvcm1cIik7XG4gIGlmICghJGZvb3RlckZvcm0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dHMgPSAkZm9vdGVyRm9ybS5maW5kKFwiaW5wdXRcIik7XG5cbiAgaW5wdXRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgaW5wdXQgPSAkKHRoaXMpO1xuXG4gICAgaW5wdXQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW5wdXQudmFsKCkgIT09IGBgKSB7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb290ZXJGb3JtO1xuIiwiY29uc3QgZGVza01lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0Lgg0LfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDRgSDQv9C+0LzQvtGJ0YzRjiBmYWRlXG4gIGNvbnN0ICRoZWFkZXJNZW51ID0gJChcIi5qcy1kZXNrLW1lbnVcIik7XG5cbiAgaWYoISRoZWFkZXJNZW51KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtZGVzay1tZW51LWJ0blwiKTtcblxuICBjb25zdCBrZXlDb2RlID0ge1xuICAgIEVTQzogMjcsXG4gIH07XG5cbiAgY29uc3Qgb3BlbiA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZURvd24oMzAwKTtcbiAgICAkaGVhZGVyTWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfTtcblxuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAkaGVhZGVyTWVudS5zbGlkZVVwKDMwMCk7XG4gICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4ucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJGJ0bi5ibHVyKCk7XG4gIH07XG5cbiAgJGJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNpemVUb3BDb29yZGluYXRlKCk7XG4gICAgICBvcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LrQsCDQutC+0L7RgNC00LjQvdCw0YLRiyB0b3Ag0LTQu9GPIGhlYWRlci1tZW51XG4gIGNvbnN0IHJlc2l6ZVRvcENvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgbGV0IGhlaWdodCA9ICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XG4gICAgbGV0IGEgPSBoZWlnaHQgKyBcInB4XCI7XG5cbiAgICAkaGVhZGVyTWVudS5jc3MoXCJ0b3BcIiwgYSk7XG4gIH07XG4gIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcblxuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgcmVzaXplVG9wQ29vcmRpbmF0ZSk7XG4gICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LLQvdC1INC80LXQvdGOXG4gICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnVcIikgPT09IG51bGwgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudS1idG5cIikgPT09IG51bGwpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0L4gRVNDXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmtleUNvZGUgPT09IGtleUNvZGUuRVNDICYmICRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtzID0gJGhlYWRlck1lbnUuZmluZChcIi5qcy1kZXNrLW1lbnUtbGlua3MgYVwiKTtcbiAgY29uc3QgY29udGVudHMgPSAkaGVhZGVyTWVudS5maW5kKFwiLmRlc2stbWVudV9fY29udGVudFwiKTtcblxuICBmdW5jdGlvbiBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluaykge1xuICAgIGxpbmsuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGNvbnN0IGlkID0gbGluay5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAgIHJlc2V0Q29udGVudCgpO1xuICAgIGxldCBjb250ZW50ID0gJGhlYWRlck1lbnUuZmluZChgLmRlc2stbWVudV9fY29udGVudFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcbiAgICBjb250ZW50LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgfVxuICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UoJChsaW5rc1swXSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0SG92ZXIoKSB7XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBsaW5rID0gJCh0aGlzKTtcbiAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0Q29udGVudCgpIHtcbiAgICBjb250ZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgaXRlbS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxpbmsub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc2V0SG92ZXIoKTtcbiAgICAgIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKTtcbiAgICB9KTtcblxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVza01lbnU7XG4iLCJjb25zdCBwaGFybWFjeUdldCA9ICgpID0+IHtcbiAgY29uc3QgcGhhcm1hY3lCbG9jayA9ICQoXCIucGhhcm1hY2llc1wiKTtcblxuICBpZiAoIXBoYXJtYWN5QmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3J0TGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlua3MgYVwiKTtcbiAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGluayA9ICQodGhpcyk7XG5cbiAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFxuICAgICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaGFybWFjeUdldDtcbiIsImltcG9ydCBub2RlTGlzdEZvckVhY2ggZnJvbSAnLi9ub2RlLWxpc3QtZm9yLWVhY2gnO1xuaW1wb3J0IHRlbCBmcm9tICcuL3RlbCc7XG5pbXBvcnQgYW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBtZW51T3BlbiBmcm9tICcuL21lbnUtb3Blbic7XG5pbXBvcnQgaGVhZGVyU2Nyb2xsIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbGlkZXJzIGZyb20gJy4vc2xpZGVycyc7XG5pbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBidG5VcCBmcm9tICcuL2J0bi11cCc7XG5pbXBvcnQgZ29vZFF1YW50aXR5IGZyb20gJy4vZ29vZC1xdWFudGl0eSc7XG5pbXBvcnQgZm9vdGVyRm9ybSBmcm9tICcuL2Zvb3Rlci1mb3JtJztcbmltcG9ydCBkZXNrTWVudSBmcm9tICcuL2Rlc2stbWVudSc7XG5pbXBvcnQgcGhhcm1hY3lHZXQgZnJvbSAnLi9waGFybWFjeS1nZXQnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBkZXNrTWVudSgpO1xuICAgIHBoYXJtYWN5R2V0KCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJCIsIiRtZW51IiwiJGJ1dHRvbkNsb3NlIiwiJGhlYWRlciIsImVhY2giLCIkYnRuIiwic2Nyb2xsSGVhZGVyIiwiaGFzQ2xhc3MiLCJzY3JvbGxUb3AiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xpY2siLCJwb3MiLCJwYXJzZUludCIsImF0dHIiLCJyZW1vdmVBdHRyIiwic2Nyb2xsVG8iLCJzZXRUaW1lb3V0IiwicGFnZVBvcyIsIm9uIiwiaGVhZGVyU2Nyb2xsIiwibWFpbiIsImludHJvVG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2xpZGVycyIsIlN3aXBlciIsInByb21vIiwibXlTd2lwZXIiLCJkaXJlY3Rpb24iLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwic3BlZWQiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwic2FsZUJsb2NrIiwicGFnaW5hdGlvbiIsImVsIiwiY2xpY2thYmxlIiwibmV3R29vZHMiLCJicmVha3BvaW50cyIsIm51bWJlciIsIiRudW1iZXJzIiwiJHRoaXNzIiwiYnRuVXAiLCJzY3JvbGwiLCJpcyIsImNzcyIsIm9wYWNpdHkiLCJmYWRlSW4iLCJzdG9wIiwiZmFkZU91dCIsImFuaW1hdGUiLCJnb29kUXVhbnRpdHkiLCJjb250YWluZXJzIiwiY29udGFpbmVyIiwiYnRuSW5jcmVhc2UiLCJidG5EZWNyZWFzZSIsInZhbHVlIiwiYnRuSW5jcmVhc2VIYW5kbGVyIiwibmV3VmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJidG5EZWNyZWFzZUhhbmRsZXIiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9vdGVyRm9ybSIsIiRmb290ZXJGb3JtIiwiaW5wdXRzIiwiZmluZCIsInZhbCIsImRlc2tNZW51IiwiJGhlYWRlck1lbnUiLCJrZXlDb2RlIiwiRVNDIiwib3BlbiIsInNsaWRlRG93biIsImNsb3NlIiwic2xpZGVVcCIsImJsdXIiLCJyZXNpemVUb3BDb29yZGluYXRlIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJhIiwiZXZ0IiwidGFyZ2V0IiwiY2xvc2VzdCIsImxpbmtzIiwiY29udGVudHMiLCJkZXNrTWVudUNvbnRlbnRDaGFuZ2UiLCJsaW5rIiwiaWQiLCJyZXNldENvbnRlbnQiLCJjb250ZW50IiwicmVzZXRIb3ZlciIsIml0ZW0iLCJwcmV2ZW50RGVmYXVsdCIsInBoYXJt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
