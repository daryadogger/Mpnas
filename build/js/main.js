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

    if (sortLinks) {
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
    }

    var pharmaciesLinks = pharmacyBlock.find(".pharmacies__list a");

    if (pharmaciesLinks) {
      pharmaciesLinks.each(function () {
        var link = $(this);
        link.on("click", function (evt) {
          evt.preventDefault();
          pharmaciesLinks.each(function () {
            $(this).removeClass("active");
          });
          link.addClass("active");
        });
      });
    }
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

  var ankors = function ankors() {
    var links = $(".js-ankor");

    if (!links) {
      return;
    }

    var partname = window.location.pathname; //Проверяем на document.ready наличие #hashtag в url, и если есть, скроллим до нужной секции

    var checkHash = function checkHash() {
      if (window.location.hash) {
        var hash = window.location.hash;

        if ($(hash).length) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 180
          }, 900, 'swing');
        }
      }
    };

    $(document).ready(checkHash); // На кнопки вешаем обработчики событий

    links.each(function () {
      $(this).on("click", function (evt) {
        if (partname === "/main.html") {
          // Нужно, чтобы меню закрывалось и страница скроллилась до секции
          if ($(".menu").hasClass("is-show")) {
            $(".menu").removeClass("is-show");
            $('body').removeClass('is-menu-open').removeAttr('data-scroll');
            checkHash(); // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
          } else {
            evt.preventDefault();
            var hash = $(this).attr('data-href');

            if ($(hash).length) {
              $('html, body').animate({
                scrollTop: $(hash).offset().top - 180
              }, 900, 'swing');
            }
          }
        }
      });
      $(this).on("focus", function (evt) {
        if (partname === "/main.html") {
          // Нужно, чтобы меню закрывалось и страница скроллилась до секции
          if ($(".menu").hasClass("is-show")) {
            $(".menu").removeClass("is-show");
            $(".js-open-menu").removeClass("is-show");
            $('body').removeClass('is-menu-open').removeAttr('data-scroll');
            checkHash(); // Обычный скрипт скролла до необходимой секции в data атрибуте без перезагрузки страницы
          } else {
            evt.preventDefault();
            var hash = $(this).attr('data-href');

            if ($(hash).length) {
              $('html, body').animate({
                scrollTop: $(hash).offset().top - 180
              }, 900, 'swing');
            }
          }
        }
      });
    });
  };

  var modal = function modal() {
    var $buttons = $('[js-popup-open]');

    if ($buttons.length) {
      var $body = $('body');
      $buttons.each(function () {
        var $button = $(this);
        var options = {
          hideScrollbar: true,
          touch: false,
          btnTpl: {
            smallBtn: ''
          },
          beforeShow: function beforeShow() {
            //  Add another bg color
            $('.fancybox-bg').addClass($button.data('src').slice(1));
            var bodyStyles = {
              'overflow-y': 'hidden',
              'margin': '0 auto'
            };
            $body.css(bodyStyles);
            setTimeout(function () {
              $($button.data('src')).addClass("show");
            }, 100);
          },
          afterClose: function afterClose() {
            $('.fancybox-bg').removeClass($button.data('src').slice(1));
            var bodyStyles = {
              'overflow-y': 'visible',
              'padding-right': 0,
              'margin': 0
            };
            $body.css(bodyStyles);
            $($button.data('src')).removeClass("show");
          }
        };
        $button.fancybox(options);
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
        accordion();
        range();
        tabs();
        ankors();
        modal();
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tb2ItbWVudS5qcyIsInNyYy9qcy9hY2NvcmRpb24uanMiLCJzcmMvanMvcmFuZ2UuanMiLCJzcmMvanMvdGFicy5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbW9kYWwuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlTGlzdEZvckVhY2ggPSAoKSA9PiB7XG4gIGlmICgnTm9kZUxpc3QnIGluIHdpbmRvdyAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlTGlzdEZvckVhY2g7XG4iLCJjb25zdCB0ZWwgPSAoKSA9PiB7XG4gIC8vIE1hc2sgZm9yIHRlbFxuICBjb25zdCBmb3JtQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWVsZHNldFwiKTtcblxuICBpZiAoZm9ybUJsb2Nrcy5sZW5ndGgpIHtcblxuICAgIGZvcm1CbG9ja3MuZm9yRWFjaChmdW5jdGlvbihmb3JtQmxvY2spIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZm9ybUJsb2NrLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPXRlbF1cIik7XG5cbiAgICAgIGlmKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHBob25lTWFzayA9IElNYXNrKCBpbnB1dCwge1xuICAgICAgICAgIG1hc2s6IFwiK3s3fSAwMDAgMDAwLTAwLTAwXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRlbDtcbiIsImNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgLy93b3dcbiAgY29uc3QgYW5pbWF0aW9ucyA9IG5ldyB3aW5kb3cuV09XKCkuaW5pdCgpO1xuXG4gIGNvbnN0IGNhcmRJbmZvID0gJChcIi5qcy1jYXJkLWluZm9cIik7XG5cbiAgaWYgKGNhcmRJbmZvKSB7XG4gICAgY29uc3Qgc2hhZGUgPSAkKFwiLmpzLWluZm9cIik7XG5cbiAgICBjYXJkSW5mby5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgaXRlbSA9ICQodGhpcyk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdGVtLm9uKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2hhZGUuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uO1xuIiwiY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidXR0b25zTWVudSA9ICQoXCIuanMtb3Blbi1tZW51XCIpO1xuXG4gIGlmICgkYnV0dG9uc01lbnUubGVuZ3RoKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1lbnVcIik7XG4gICAgY29uc3QgJGJ1dHRvbkNsb3NlID0gJChcIi5qcy1idG4tY2xvc2VcIik7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGJ0biA9ICQodGhpcyk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuXG4gICAgICAgICAgaWYoJG1lbnUuc2Nyb2xsVG9wKCkgPiAxKSB7XG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkYnRuLmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgICAgfSwgNDUwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIubWVudVwiKS5vbihcInNjcm9sbFwiLCBzY3JvbGxIZWFkZXIpO1xuICAgIH0pO1xuXG4gICAgJGJ1dHRvbkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ1dHRvbnNNZW51LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICB9KTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51T3BlbjtcbiIsImNvbnN0IGhlYWRlclNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG4gIGNvbnN0ICRoZWFkZXIgPSAkKFwiLmhlYWRlclwiKTtcblxuICBpZiAoJGhlYWRlcikge1xuICAgIFxuICAgIC8vIEhlYWRlciDQvNC10L3Rj9C10YIg0YbQstC10YLQsCDQv9GA0Lgg0YHQutGA0L7Qu9C70LUuINCe0L0g0YPQttC1IGZpeGVkINC40LfQvdCw0YfQsNC70YzQvdC+XG4gICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW50cm9Ub3AgPSBtYWluLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKGludHJvVG9wIDwgLTEpIHtcbiAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcblxuICAgICAgfSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKFwic2Nyb2xsXCIpICYmIGludHJvVG9wID4gLTEpIHtcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgJChkb2N1bWVudCkub24oXCJyZWFkeVwiLCBzY3JvbGxIZWFkZXIpO1xuXG4gICAgLy/QlNC+0LHQsNCy0LvQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9GA0Lgg0YXQvtCy0LXRgNC1INC90LAg0L/Rg9C90LrRgtGLINC80LXQvdGOXG4gICAgY29uc3QgJGl0ZW0gPSAkKFwiLm5hdl9faXRlbVwiKTtcblxuICAgICRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkc3VibWVudSA9ICQodGhpcykuZmluZChcIi5zdWJtZW51XCIpO1xuXG4gICAgICAkKHRoaXMpLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHN1Ym1lbnUuYWRkQ2xhc3MoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHN1Ym1lbnUuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5yZW1vdmVDbGFzcyhcImRpc3BsYXlcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhlYWRlclNjcm9sbDtcbiIsImNvbnN0IHNsaWRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IFN3aXBlciA9IHdpbmRvdy5Td2lwZXI7XG5cbiAgLy8gU2xpZGVyIHByb21vXG4gIGNvbnN0IHByb21vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1wcm9tby1zbGlkZXJcIik7XG5cbiAgaWYgKHByb21vKSB7XG4gICAgY29uc3QgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tcHJldlwiLFxuICAgICAgfSxcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICBjbGlja2FibGU6IHRydWVcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB0aXRsZXMgPSBwcm9tby5xdWVyeVNlbGVjdG9yQWxsKFwiaDFcIik7XG5cbiAgICBmdW5jdGlvbiBzbGlkZUNoYW5nZUhhbmRsZXIodGltZXIpIHtcbiAgICAgIGxldCBhY3RpdmVTbGlkZSA9IHByb21vLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXNsaWRlLWFjdGl2ZVwiKTtcblxuICAgICAgaWYgKGFjdGl2ZVNsaWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBhY3RpdmVTbGlkZS5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgfSwgdGltZXIpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIHNsaWRlQ2hhbmdlSGFuZGxlcigzMDApO1xuXG4gICAgbXlTd2lwZXIub24oJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdGl0bGVzLmZvckVhY2goZnVuY3Rpb24odGl0bGUpIHtcbiAgICAgICAgaWYgKHRpdGxlLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDUwMCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTbGlkZXIgc2FsZVxuICBjb25zdCBzYWxlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNhbGUtc2xpZGVyXCIpO1xuXG4gIGlmIChzYWxlQmxvY2spIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtc2FsZS1zbGlkZXIuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICBzcGVlZDogNjAwLFxuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1zYWxlLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBuZXdHb29kc1xuICBjb25zdCBuZXdHb29kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbmV3LWdvb2RzLXNsaWRlclwiKTtcblxuICBpZiAobmV3R29vZHMpIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWNvbnRhaW5lclwiLCB7XG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICBzcGVlZDogNDAwLFxuICAgICAgc2ltdWxhdGVUb3VjaDogZmFsc2UsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHByZXZFbDogXCIuanMtbmV3LWdvb2RzLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgNTcwOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICB9LFxuICAgICAgICA4NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDExMDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcnM7XG4iLCJjb25zdCBudW1iZXIgPSAoKSA9PiB7XG4gIC8v0KDQsNC30YDQtdGI0LDQtdGCINCy0LLQvtC0INGC0L7Qu9GM0LrQviDRhtC40YTRgCDQsiBpbnB1dFxuICBjb25zdCAkbnVtYmVycyA9ICQoXCIuanMtbnVtYmVyXCIpO1xuICBpZiAoISRudW1iZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgJG51bWJlcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuXG4gICAgJHRoaXNzLm1hc2soJzAjJyk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBudW1iZXI7XG4iLCJjb25zdCBidG5VcCA9ICgpID0+IHtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGlmICgkKCcjdXBidXR0b24nKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkKCcjdXBidXR0b24nKS5jc3Moe29wYWNpdHkgOiAwLjl9KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7ICQoJyN1cGJ1dHRvbicpLnN0b3AodHJ1ZSwgZmFsc2UpLmZhZGVPdXQoJ2Zhc3QnKTsgfVxuICB9KTtcblxuICAkKCcjdXBidXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDMwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBidG5VcDtcbiIsImNvbnN0IGdvb2RRdWFudGl0eSA9ICgpID0+IHtcbiAgLy8g0KPQstC10LvQuNGH0LXQvdC40LUg0Lgg0YPQvNC10L3RjNGI0LXQvdC40LUg0YLQvtCy0LDRgNC+0LJcbiAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcXVhbnRpdHlcIik7XG4gIGlmIChjb250YWluZXJzLmxlbmd0aCA8IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBidG5JbmNyZWFzZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpzLWluY3JlYXNlXCIpO1xuICAgIGNvbnN0IGJ0bkRlY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZGVjcmVhc2VcIik7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBjb25zdCBidG5JbmNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gKyt2YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlID4gMSkge1xuICAgICAgICBidG5EZWNyZWFzZS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgYnRuRGVjcmVhc2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IC0tdmFsdWU7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA8PSAxKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gMTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAxO1xuICAgICAgICBidG5EZWNyZWFzZS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBidG5JbmNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuSW5jcmVhc2VIYW5kbGVyKTtcbiAgICBidG5EZWNyZWFzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnRuRGVjcmVhc2VIYW5kbGVyKTtcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJ0bkluY3JlYXNlSGFuZGxlcigpO1xuICAgICAgYnRuRGVjcmVhc2VIYW5kbGVyKCk7XG4gICAgfSlcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdvb2RRdWFudGl0eTtcbiIsImNvbnN0IGZvb3RlckZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0ICRmb290ZXJGb3JtID0gJChcIi5mb290ZXIgZm9ybVwiKTtcbiAgaWYgKCEkZm9vdGVyRm9ybSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0cyA9ICRmb290ZXJGb3JtLmZpbmQoXCJpbnB1dFwiKTtcblxuICBpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbnB1dCA9ICQodGhpcyk7XG5cbiAgICBpbnB1dC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbnB1dC52YWwoKSAhPT0gYGApIHtcbiAgICAgICAgaW5wdXQuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckZvcm07XG4iLCJjb25zdCBkZXNrTWVudSA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQuCDQt9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INGBINC/0L7QvNC+0YnRjNGOIGZhZGVcbiAgY29uc3QgJGhlYWRlck1lbnUgPSAkKFwiLmpzLWRlc2stbWVudVwiKTtcblxuICBpZighJGhlYWRlck1lbnUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCAkYnRuID0gJChcIi5qcy1kZXNrLW1lbnUtYnRuXCIpO1xuXG4gIGNvbnN0IGtleUNvZGUgPSB7XG4gICAgRVNDOiAyNyxcbiAgfTtcblxuICBjb25zdCBvcGVuID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlRG93bigzMDApO1xuICAgICRoZWFkZXJNZW51LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAkYnRuLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9O1xuXG4gIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICRoZWFkZXJNZW51LnNsaWRlVXAoMzAwKTtcbiAgICAkaGVhZGVyTWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgJGJ0bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkYnRuLmJsdXIoKTtcbiAgfTtcblxuICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc2l6ZVRvcENvb3JkaW5hdGUoKTtcbiAgICAgIG9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCe0L/RgNC10LTQtdC70LXQvdC40LUg0Lgg0YPRgdGC0LDQvdC+0LLQutCwINC60L7QvtGA0LTQuNC90LDRgtGLIHRvcCDQtNC70Y8gaGVhZGVyLW1lbnVcbiAgY29uc3QgcmVzaXplVG9wQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICBsZXQgaGVpZ2h0ID0gJChcIi5oZWFkZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgYSA9IGhlaWdodCArIFwicHhcIjtcblxuICAgICRoZWFkZXJNZW51LmNzcyhcInRvcFwiLCBhKTtcbiAgfTtcbiAgcmVzaXplVG9wQ29vcmRpbmF0ZSgpO1xuXG4gICQod2luZG93KS5vbihcInJlc2l6ZVwiLCByZXNpemVUb3BDb29yZGluYXRlKTtcbiAgJChkb2N1bWVudCkub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICgkaGVhZGVyTWVudS5oYXNDbGFzcyhcInNob3dcIikpIHtcbiAgICAgICRoZWFkZXJNZW51LmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgJGhlYWRlck1lbnUucmVtb3ZlQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICRidG4uYmx1cigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0JfQsNC60YDRi9GC0LjQtSBoZWFkZXItbWVudSDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LLQvdC1INC80LXQvdGOXG4gICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1kZXNrLW1lbnVcIikgPT09IG51bGwgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudS1idG5cIikgPT09IG51bGwpIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0L4gRVNDXG4gICQoZG9jdW1lbnQpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmtleUNvZGUgPT09IGtleUNvZGUuRVNDICYmICRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxpbmtzID0gJGhlYWRlck1lbnUuZmluZChcIi5qcy1kZXNrLW1lbnUtbGlua3MgYVwiKTtcbiAgY29uc3QgY29udGVudHMgPSAkaGVhZGVyTWVudS5maW5kKFwiLmRlc2stbWVudV9fY29udGVudFwiKTtcblxuICBmdW5jdGlvbiBkZXNrTWVudUNvbnRlbnRDaGFuZ2UobGluaykge1xuICAgIGxpbmsuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGNvbnN0IGlkID0gbGluay5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAgIHJlc2V0Q29udGVudCgpO1xuICAgIGxldCBjb250ZW50ID0gJGhlYWRlck1lbnUuZmluZChgLmRlc2stbWVudV9fY29udGVudFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcbiAgICBjb250ZW50LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgfVxuICBkZXNrTWVudUNvbnRlbnRDaGFuZ2UoJChsaW5rc1swXSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0SG92ZXIoKSB7XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGxldCBsaW5rID0gJCh0aGlzKTtcbiAgICAgIGxpbmsucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0Q29udGVudCgpIHtcbiAgICBjb250ZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgaXRlbS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGxldCBsaW5rID0gJCh0aGlzKTtcblxuICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxpbmsub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc2V0SG92ZXIoKTtcbiAgICAgIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKTtcbiAgICB9KTtcblxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVza01lbnU7XG4iLCJjb25zdCBwaGFybWFjeUdldCA9ICgpID0+IHtcbiAgY29uc3QgcGhhcm1hY3lCbG9jayA9ICQoXCIucGhhcm1hY2llc1wiKTtcblxuICBpZiAoIXBoYXJtYWN5QmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3J0TGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlua3MgYVwiKTtcblxuICBpZiAoc29ydExpbmtzKSB7XG4gICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcbiAgXG4gICAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgc29ydExpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBwaGFybWFjaWVzTGlua3MgPSBwaGFybWFjeUJsb2NrLmZpbmQoXCIucGhhcm1hY2llc19fbGlzdCBhXCIpO1xuICBcbiAgaWYgKHBoYXJtYWNpZXNMaW5rcykge1xuICAgIHBoYXJtYWNpZXNMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbGluayA9ICQodGhpcyk7XG4gIFxuICAgICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIHBoYXJtYWNpZXNMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0pO1xuICBcbiAgICAgICAgbGluay5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwaGFybWFjeUdldDtcbiIsImNvbnN0IG1vYk1lbnUgPSAoKSA9PiB7XG4gIC8vINCe0YLQutGA0YvRgtC40LUg0LzQvtCxINC80LXQvdGOXG4gIGNvbnN0ICRidG4gPSAkKFwiLmpzLW1vYi1tZW51LWJ0blwiKTtcblxuICBpZiAoJGJ0bikge1xuICAgIGNvbnN0ICRtZW51ID0gJChcIi5tb2ItbWVudVwiKTtcbiAgICBjb25zdCAkYnRuQ2xvc2UgPSAkKFwiLm1vYi1tZW51IC5qcy1idG4tY2xvc2VcIik7XG5cbiAgICAkYnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8g0LXRgdC70Lgg0L7RgtC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcblxuICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG1lbnUuYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikuYXR0cihcImRhdGEtc2Nyb2xsXCIsIHBhZ2VQb3MpO1xuICAgICAgICB9LCA0NTApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGJ0bkNsb3NlLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgJGJ0bi5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiaXMtbWVudS1vcGVuXCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNjcm9sbFwiKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9iTWVudTtcbiIsImNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcbiAgY29uc3QgJGFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uX19pdGVtYCk7XG4gIGlmICgkYWNjb3JkaW9ucykge1xuICAgICRhY2NvcmRpb25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkdGhpc3MgPSAkKHRoaXMpO1xuICAgICAgY29uc3QgJHNpZGUgPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fbGFiZWxgKTtcbiAgICAgIGNvbnN0ICRtYWluID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb25fX2NvbnRlbnRgKTtcblxuICAgICAgJHNpZGUub24oYGNsaWNrYCwgKGV2dCkgPT4ge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoJHNpZGUuaGFzQ2xhc3MoYGlzLW9wZW5gKSkge1xuICAgICAgICAgICRtYWluLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAgICRzaWRlLnJlbW92ZUNsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICAgJHNpZGUuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzaWRlLmFkZENsYXNzKGBpcy1vcGVuYCk7XG4gICAgICAgICAgJG1haW4uc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCAkaW5uZXJBY2NvcmRpb25zID0gJChgLmFjY29yZGlvbi1pbm5lcl9faXRlbWApO1xuICBpZiAoJGlubmVyQWNjb3JkaW9ucykge1xuICAgICRpbm5lckFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uLWlubmVyX19sYWJlbGApO1xuICAgICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbi1pbm5lcl9fY29udGVudGApO1xuXG4gICAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbjtcbiIsImNvbnN0IHJhbmdlID0gKCkgPT4ge1xuICAvLyBJbnB1dCB0eXBlIHJhbmdlXG4gIC8vIGh0dHA6Ly9pb25kZW4uY29tL2EvcGx1Z2lucy9pb24ucmFuZ2VTbGlkZXIvc3RhcnQuaHRtbFxuICBjb25zdCBtaW5QcmljZSA9IDk7XG4gIGNvbnN0IG1heFByaWNlID0gMzk5OTtcbiAgY29uc3QgZnJvbVByaWNlID0gOTtcbiAgY29uc3QgdG9QcmljZSA9IDM5OTk7XG5cblxuICAkKFwiLmpzLXJhbmdlXCIpLmlvblJhbmdlU2xpZGVyKHtcbiAgICB0eXBlOiBcImRvdWJsZVwiLFxuICAgIHNraW46IFwicm91bmRcIixcbiAgICBncmlkOiBmYWxzZSxcbiAgICBtaW46IG1pblByaWNlLFxuICAgIG1heDogbWF4UHJpY2UsXG4gICAgZnJvbTogZnJvbVByaWNlLFxuICAgIHRvOiB0b1ByaWNlLFxuICAgIGhpZGVfbWluX21heDogdHJ1ZSxcbiAgICBoaWRlX2Zyb21fdG86IHRydWUsXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCByYW5nZTtcbiIsImNvbnN0IHRhYnMgPSAoKSA9PiB7XG4gIGNvbnN0IHRhYnNCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50YWJzYCk7XG5cbiAgaWYgKCF0YWJzQmxvY2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgdGFiID0gbmV3IFRhYmJ5KGBbZGF0YS10YWJzXWApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGFicztcbiIsImNvbnN0IGFua29ycyA9ICgpID0+IHtcbiAgY29uc3QgbGlua3MgPSAkKFwiLmpzLWFua29yXCIpO1xuICBpZiAoIWxpbmtzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGFydG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgLy/Qn9GA0L7QstC10YDRj9C10Lwg0L3QsCBkb2N1bWVudC5yZWFkeSDQvdCw0LvQuNGH0LjQtSAjaGFzaHRhZyDQsiB1cmwsINC4INC10YHQu9C4INC10YHRgtGMLCDRgdC60YDQvtC70LvQuNC8INC00L4g0L3Rg9C20L3QvtC5INGB0LXQutGG0LjQuFxuICBjb25zdCBjaGVja0hhc2ggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDE4MCksXG4gICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgJChkb2N1bWVudCkucmVhZHkoY2hlY2tIYXNoKTtcblxuICAvLyDQndCwINC60L3QvtC/0LrQuCDQstC10YjQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxuICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGlmIChwYXJ0bmFtZSA9PT0gXCIvbWFpbi5odG1sXCIpIHtcblxuICAgICAgICAvLyDQndGD0LbQvdC+LCDRh9GC0L7QsdGLINC80LXQvdGOINC30LDQutGA0YvQstCw0LvQvtGB0Ywg0Lgg0YHRgtGA0LDQvdC40YbQsCDRgdC60YDQvtC70LvQuNC70LDRgdGMINC00L4g0YHQtdC60YbQuNC4XG4gICAgICAgIGlmICgkKFwiLm1lbnVcIikuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG4gIFxuICAgICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1tZW51LW9wZW4nKS5yZW1vdmVBdHRyKCdkYXRhLXNjcm9sbCcpO1xuICAgICAgICAgIGNoZWNrSGFzaCgpO1xuICBcbiAgICAgICAgLy8g0J7QsdGL0YfQvdGL0Lkg0YHQutGA0LjQv9GCINGB0LrRgNC+0LvQu9CwINC00L4g0L3QtdC+0LHRhdC+0LTQuNC80L7QuSDRgdC10LrRhtC40Lgg0LIgZGF0YSDQsNGC0YDQuNCx0YPRgtC1INCx0LXQtyDQv9C10YDQtdC30LDQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICB9IGVsc2Uge1xuICBcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgXG4gICAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaHJlZicpO1xuICBcbiAgICAgICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoJChoYXNoKS5vZmZzZXQoKS50b3AgLSAxODApLFxuICAgICAgICAgICAgICB9LCA5MDAsICdzd2luZycpO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGlmIChwYXJ0bmFtZSA9PT0gXCIvbWFpbi5odG1sXCIpIHtcblxuICAgICAgICAvLyDQndGD0LbQvdC+LCDRh9GC0L7QsdGLINC80LXQvdGOINC30LDQutGA0YvQstCw0LvQvtGB0Ywg0Lgg0YHRgtGA0LDQvdC40YbQsCDRgdC60YDQvtC70LvQuNC70LDRgdGMINC00L4g0YHQtdC60YbQuNC4XG4gICAgICAgIGlmICgkKFwiLm1lbnVcIikuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG4gIFxuICAgICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJChcIi5qcy1vcGVuLW1lbnVcIikucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtbWVudS1vcGVuJykucmVtb3ZlQXR0cignZGF0YS1zY3JvbGwnKTtcbiAgICAgICAgICBjaGVja0hhc2goKTtcbiAgXG4gICAgICAgIC8vINCe0LHRi9GH0L3Ri9C5INGB0LrRgNC40L/RgiDRgdC60YDQvtC70LvQsCDQtNC+INC90LXQvtCx0YXQvtC00LjQvNC+0Lkg0YHQtdC60YbQuNC4INCyIGRhdGEg0LDRgtGA0LjQsdGD0YLQtSDQsdC10Lcg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBlbHNlIHtcbiAgXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKCdkYXRhLWhyZWYnKTtcbiAgXG4gICAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gMTgwKSxcbiAgICAgICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmtvcnM7XG4iLCJjb25zdCBtb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgJGJ1dHRvbnMgPSAkKCdbanMtcG9wdXAtb3Blbl0nKTtcblxuICBpZiAoJGJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAkYnV0dG9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBoaWRlU2Nyb2xsYmFyOiB0cnVlLFxuICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgIGJ0blRwbCA6IHtcbiAgICAgICAgICBzbWFsbEJ0biA6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vICBBZGQgYW5vdGhlciBiZyBjb2xvclxuICAgICAgICAgICQoJy5mYW5jeWJveC1iZycpLmFkZENsYXNzKCRidXR0b24uZGF0YSgnc3JjJykuc2xpY2UoMSkpO1xuXG4gICAgICAgICAgY29uc3QgYm9keVN0eWxlcyA9IHtcbiAgICAgICAgICAgICdvdmVyZmxvdy15JzogJ2hpZGRlbicsXG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgYXV0bydcbiAgICAgICAgICB9O1xuICAgICAgICAgICRib2R5LmNzcyhib2R5U3R5bGVzKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykucmVtb3ZlQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAndmlzaWJsZScsXG4gICAgICAgICAgICAncGFkZGluZy1yaWdodCc6IDAsXG4gICAgICAgICAgICAnbWFyZ2luJzogMFxuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgJCgkYnV0dG9uLmRhdGEoJ3NyYycpKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidXR0b24uZmFuY3lib3gob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsO1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcbmltcG9ydCBmb290ZXJGb3JtIGZyb20gJy4vZm9vdGVyLWZvcm0nO1xuaW1wb3J0IGRlc2tNZW51IGZyb20gJy4vZGVzay1tZW51JztcbmltcG9ydCBwaGFybWFjeUdldCBmcm9tICcuL3BoYXJtYWN5LWdldCc7XG5pbXBvcnQgbW9iTWVudSBmcm9tICcuL21vYi1tZW51JztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzJztcbmltcG9ydCBhbmtvcnMgZnJvbSAnLi9hbmtvcnMnO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kYWwnO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBub2RlTGlzdEZvckVhY2goKTtcbiAgICB0ZWwoKTtcbiAgICBhbmltYXRpb24oKTtcbiAgICBtZW51T3BlbigpO1xuICAgIGhlYWRlclNjcm9sbCgpO1xuICAgIHNsaWRlcnMoKTtcbiAgICBudW1iZXIoKTtcbiAgICBidG5VcCgpO1xuICAgIGdvb2RRdWFudGl0eSgpO1xuICAgIGZvb3RlckZvcm0oKTtcbiAgICBkZXNrTWVudSgpO1xuICAgIHBoYXJtYWN5R2V0KCk7XG4gICAgbW9iTWVudSgpO1xuICAgIGFjY29yZGlvbigpO1xuICAgIHJhbmdlKCk7XG4gICAgdGFicygpO1xuICAgIGFua29ycygpO1xuICAgIG1vZGFsKCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImNhcmRJbmZvIiwiJCIsInNoYWRlIiwiZWFjaCIsIml0ZW0iLCJvbiIsImNzcyIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCIkaXRlbSIsIiRzdWJtZW51IiwiZmluZCIsInNsaWRlcnMiLCJTd2lwZXIiLCJwcm9tbyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInBhZ2luYXRpb24iLCJlbCIsImNsaWNrYWJsZSIsInRpdGxlcyIsInNsaWRlQ2hhbmdlSGFuZGxlciIsInRpbWVyIiwiYWN0aXZlU2xpZGUiLCJ0aXRsZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbnRhaW5zIiwicmVtb3ZlIiwic2FsZUJsb2NrIiwibmV3R29vZHMiLCJzaW11bGF0ZVRvdWNoIiwiYnJlYWtwb2ludHMiLCJudW1iZXIiLCIkbnVtYmVycyIsIiR0aGlzcyIsImJ0blVwIiwic2Nyb2xsIiwiaXMiLCJvcGFjaXR5IiwiZmFkZUluIiwic3RvcCIsImZhZGVPdXQiLCJhbmltYXRlIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJ2YWx1ZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvb3RlckZvcm0iLCIkZm9vdGVyRm9ybSIsImlucHV0cyIsInZhbCIsImRlc2tNZW51IiwiJGhlYWRlck1lbnUiLCJrZXlDb2RlIiwiRVNDIiwib3BlbiIsInNsaWRlRG93biIsImNsb3NlIiwic2xpZGVVcCIsImJsdXIiLCJyZXNpemVUb3BDb29yZGluYXRlIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJhIiwiZXZ0IiwidGFyZ2V0IiwiY2xvc2VzdCIsImxpbmtzIiwiY29udGVudHMiLCJkZXNrTWVudUNvbnRlbnRDaGFuZ2UiLCJsaW5rIiwiaWQiLCJyZXNldENvbnRlbnQiLCJjb250ZW50IiwicmVzZXRIb3ZlciIsInByZXZlbnREZWZhdWx0IiwicGhhcm1hY3lHZXQiLCJwaGFybWFjeUJsb2NrIiwic29ydExpbmtzIiwicGhhcm1hY2llc0xpbmtzIiwibW9iTWVudSIsIiRidG5DbG9zZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsIiRpbm5lckFjY29yZGlvbnMiLCJyYW5nZSIsIm1pblByaWNlIiwibWF4UHJpY2UiLCJmcm9tUHJpY2UiLCJ0b1ByaWNlIiwiaW9uUmFuZ2VTbGlkZXIiLCJ0eXBlIiwic2tpbiIsImdyaWQiLCJtaW4iLCJtYXgiLCJmcm9tIiwidG8iLCJoaWRlX21pbl9tYXgiLCJoaWRlX2Zyb21fdG8iLCJ0YWJzIiwidGFic0Jsb2NrIiwidGFiIiwiVGFiYnkiLCJhbmtvcnMiLCJwYXJ0bmFtZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjaGVja0hhc2giLCJoYXNoIiwib2Zmc2V0IiwicmVhZHkiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCIkYnV0dG9uIiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07RUFDNUIsTUFBSSxjQUFjQyxNQUFkLElBQXdCLENBQUNDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBaEQsRUFBeUQ7RUFDdkRGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBbkIsR0FBNkIsVUFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7RUFDMURBLE1BQUFBLE9BQU8sR0FBR0EsT0FBTyxJQUFJTCxNQUFyQjs7RUFDQSxXQUFL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
