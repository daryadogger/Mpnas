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
        if (partname === "/") {
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
        if (partname === "/") {
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

  var filter = function filter() {
    //Открытие фильтра в каталоге
    var $filterBtn = $(".js-filter-btn");

    if (!$filterBtn) {
      return;
    }

    var $filter = $(".js-filter");
    var $btnClose = $(".js-close-filter");
    var $overlay = $(".overlay");
    $filterBtn.on("click", function (evt) {
      evt.preventDefault();

      if ($filter.hasClass("open")) {
        $filter.removeClass("open");
        $overlay.fadeOut(300);
      } else {
        $filter.addClass("open");
        $overlay.fadeIn(300);
      }
    });
    $btnClose.on("click", function () {
      if ($filter.hasClass("open")) {
        $filter.removeClass("open");
        $overlay.fadeOut(300);
      }
    });
    $(document).on('mouseup', function (evt) {
      if (evt.target.closest(".js-filter") === null && evt.target.closest(".js-close-filter") === null) {
        if ($filter.hasClass("open")) {
          $filter.removeClass("open");
          $overlay.fadeOut(300);
        }
      }
    });
  };

  var sort = function sort() {
    var $viewLinks = $(".js-link-view");

    if ($viewLinks) {
      $viewLinks.on("click", function (evt) {
        evt.preventDefault();

        if ($(this).hasClass("active")) ; else {
          $viewLinks.toggleClass("active");
          $(".js-catalog-content").toggleClass("catalog-content--row");
        }
      });

      function removeRow() {
        if ($(window).width() < 992) {
          $(".catalog-content").removeClass("catalog-content--row");
          $(".js-row").removeClass("active");
          $(".js-col").addClass("active");
        }
      }

      removeRow();
      $(window).on("resize", function () {
        removeRow();
      });
    }
  };

  var linkVisual = function linkVisual() {
    var linkVisualDesk = $(".js-link-visual-desk");
    var linkVisualMob = $(".js-link-visual-mob");

    if (!linkVisualDesk || !linkVisualMob) {
      return;
    }

    function checkMediaScreen() {
      if ($(window).width() < 992) {
        linkVisualMob.attr("id", "specialButton");
        linkVisualDesk.removeAttr("id");
      } else {
        linkVisualMob.removeAttr("id");
        linkVisualDesk.attr("id", "specialButton");
      }
    }

    checkMediaScreen();
    $(window).on("resize", checkMediaScreen);
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
        filter();
        sort();
        linkVisual();
      }
    }]);

    return App;
  }();

  App.init();
  window.App = App;

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL25vZGUtbGlzdC1mb3ItZWFjaC5qcyIsInNyYy9qcy90ZWwuanMiLCJzcmMvanMvYW5pbWF0aW9uLmpzIiwic3JjL2pzL21lbnUtb3Blbi5qcyIsInNyYy9qcy9oZWFkZXIuanMiLCJzcmMvanMvc2xpZGVycy5qcyIsInNyYy9qcy9udW1iZXIuanMiLCJzcmMvanMvYnRuLXVwLmpzIiwic3JjL2pzL2dvb2QtcXVhbnRpdHkuanMiLCJzcmMvanMvZm9vdGVyLWZvcm0uanMiLCJzcmMvanMvZGVzay1tZW51LmpzIiwic3JjL2pzL3BoYXJtYWN5LWdldC5qcyIsInNyYy9qcy9tb2ItbWVudS5qcyIsInNyYy9qcy9hY2NvcmRpb24uanMiLCJzcmMvanMvcmFuZ2UuanMiLCJzcmMvanMvdGFicy5qcyIsInNyYy9qcy9hbmtvcnMuanMiLCJzcmMvanMvbW9kYWwuanMiLCJzcmMvanMvZmlsdGVyLW9wZW4uanMiLCJzcmMvanMvc29ydC5qcyIsInNyYy9qcy9saW5rLXZpc3VhbC5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVMaXN0Rm9yRWFjaCA9ICgpID0+IHtcbiAgaWYgKCdOb2RlTGlzdCcgaW4gd2luZG93ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVMaXN0Rm9yRWFjaDtcbiIsImNvbnN0IHRlbCA9ICgpID0+IHtcbiAgLy8gTWFzayBmb3IgdGVsXG4gIGNvbnN0IGZvcm1CbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpZWxkc2V0XCIpO1xuXG4gIGlmIChmb3JtQmxvY2tzLmxlbmd0aCkge1xuXG4gICAgZm9ybUJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1CbG9jaykge1xuICAgICAgY29uc3QgaW5wdXQgPSBmb3JtQmxvY2sucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9dGVsXVwiKTtcblxuICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcGhvbmVNYXNrID0gSU1hc2soIGlucHV0LCB7XG4gICAgICAgICAgbWFzazogXCIrezd9IDAwMCAwMDAtMDAtMDBcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGVsO1xuIiwiY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAvL3dvd1xuICBjb25zdCBhbmltYXRpb25zID0gbmV3IHdpbmRvdy5XT1coKS5pbml0KCk7XG5cbiAgY29uc3QgY2FyZEluZm8gPSAkKFwiLmpzLWNhcmQtaW5mb1wiKTtcblxuICBpZiAoY2FyZEluZm8pIHtcbiAgICBjb25zdCBzaGFkZSA9ICQoXCIuanMtaW5mb1wiKTtcblxuICAgIGNhcmRJbmZvLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBpdGVtID0gJCh0aGlzKTtcblxuICAgICAgaXRlbS5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNoYWRlLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0ZW0ub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGFkZS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRpb247XG4iLCJjb25zdCBtZW51T3BlbiA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ1dHRvbnNNZW51ID0gJChcIi5qcy1vcGVuLW1lbnVcIik7XG5cbiAgaWYgKCRidXR0b25zTWVudS5sZW5ndGgpIHtcbiAgICBjb25zdCAkbWVudSA9ICQoXCIubWVudVwiKTtcbiAgICBjb25zdCAkYnV0dG9uQ2xvc2UgPSAkKFwiLmpzLWJ0bi1jbG9zZVwiKTtcbiAgICBjb25zdCAkaGVhZGVyID0gJChcIi5oZWFkZXJcIik7XG5cbiAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkYnRuID0gJCh0aGlzKTtcblxuICAgICAgY29uc3Qgc2Nyb2xsSGVhZGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoJG1lbnUuaGFzQ2xhc3MoXCJpcy1zaG93XCIpKSB7XG5cbiAgICAgICAgICBpZigkbWVudS5zY3JvbGxUb3AoKSA+IDEpIHtcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoXCJzY3JvbGxcIik7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINC10YHQu9C4INC+0YLQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICAgIGlmICgkbWVudS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgIGNvbnN0IHBvcyA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSwgMTApO1xuICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC60YDRi9GC0L4g0LzQtdC90Y5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICRtZW51LmFkZENsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAgIGlmKCRtZW51LnNjcm9sbFRvcCgpID4gMSkge1xuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcyhcInNjcm9sbFwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRidG4uYWRkQ2xhc3MoXCJpcy1zaG93XCIpO1xuXG4gICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbWVudS1vcGVuXCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCBwYWdlUG9zKTtcbiAgICAgICAgICB9LCA0NTApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIi5tZW51XCIpLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhlYWRlcik7XG4gICAgfSk7XG5cbiAgICAkYnV0dG9uQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnV0dG9uc01lbnUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICB9KTtcblxuICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lbnVPcGVuO1xuIiwiY29uc3QgaGVhZGVyU2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbiAgY29uc3QgJGhlYWRlciA9ICQoXCIuaGVhZGVyXCIpO1xuXG4gIGlmICgkaGVhZGVyKSB7XG4gICAgXG4gICAgLy8gSGVhZGVyINC80LXQvdGP0LXRgiDRhtCy0LXRgtCwINC/0YDQuCDRgdC60YDQvtC70LvQtS4g0J7QvSDRg9C20LUgZml4ZWQg0LjQt9C90LDRh9Cw0LvRjNC90L5cbiAgICBjb25zdCBzY3JvbGxIZWFkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbnRyb1RvcCA9IG1haW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAoaW50cm9Ub3AgPCAtMSkge1xuICAgICAgICAkaGVhZGVyLmFkZENsYXNzKFwic2Nyb2xsXCIpO1xuXG4gICAgICB9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoXCJzY3JvbGxcIikgJiYgaW50cm9Ub3AgPiAtMSkge1xuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKFwic2Nyb2xsXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGVhZGVyKTtcbiAgICAkKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIHNjcm9sbEhlYWRlcik7XG5cbiAgICAvL9CU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0YDQuCDRhdC+0LLQtdGA0LUg0L3QsCDQv9GD0L3QutGC0Ysg0LzQtdC90Y5cbiAgICBjb25zdCAkaXRlbSA9ICQoXCIubmF2X19pdGVtXCIpO1xuXG4gICAgJGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICRzdWJtZW51ID0gJCh0aGlzKS5maW5kKFwiLnN1Ym1lbnVcIik7XG5cbiAgICAgICQodGhpcykub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcImRpc3BsYXlcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc3VibWVudS5hZGRDbGFzcyhcInNob3dcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcblxuICAgICAgJCh0aGlzKS5vbihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKFwiZGlzcGxheVwiKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyU2Nyb2xsO1xuIiwiY29uc3Qgc2xpZGVycyA9ICgpID0+IHtcbiAgY29uc3QgU3dpcGVyID0gd2luZG93LlN3aXBlcjtcblxuICAvLyBTbGlkZXIgcHJvbW9cbiAgY29uc3QgcHJvbW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXByb21vLXNsaWRlclwiKTtcblxuICBpZiAocHJvbW8pIHtcbiAgICBjb25zdCBteVN3aXBlciA9IG5ldyBTd2lwZXIoXCIuanMtcHJvbW8tc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc3BlZWQ6IDYwMCxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1wcm9tby1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXByb21vLXNsaWRlciAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gICAgICB9LFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlcyA9IHByb21vLnF1ZXJ5U2VsZWN0b3JBbGwoXCJoMVwiKTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlQ2hhbmdlSGFuZGxlcih0aW1lcikge1xuICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gcHJvbW8ucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItc2xpZGUtYWN0aXZlXCIpO1xuXG4gICAgICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IGFjdGl2ZVNsaWRlLnF1ZXJ5U2VsZWN0b3IoXCJoMVwiKTtcbiAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCB0aW1lcik7XG4gICAgICB9XG5cbiAgICB9XG4gICAgc2xpZGVDaGFuZ2VIYW5kbGVyKDMwMCk7XG5cbiAgICBteVN3aXBlci5vbignc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbih0aXRsZSkge1xuICAgICAgICBpZiAodGl0bGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZUNoYW5nZUhhbmRsZXIoNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciBzYWxlXG4gIGNvbnN0IHNhbGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2FsZS1zbGlkZXJcIik7XG5cbiAgaWYgKHNhbGVCbG9jaykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1zYWxlLXNsaWRlci5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgIHNwZWVkOiA2MDAsXG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIG5leHRFbDogXCIuanMtc2FsZS1zbGlkZXIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgICBwcmV2RWw6IFwiLmpzLXNhbGUtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2xpZGVyIG5ld0dvb2RzXG4gIGNvbnN0IG5ld0dvb2RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyXCIpO1xuXG4gIGlmIChuZXdHb29kcykge1xuICAgIGNvbnN0IG15U3dpcGVyID0gbmV3IFN3aXBlcihcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItY29udGFpbmVyXCIsIHtcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgIHNwZWVkOiA0MDAsXG4gICAgICBzaW11bGF0ZVRvdWNoOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgbmV4dEVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgICAgcHJldkVsOiBcIi5qcy1uZXctZ29vZHMtc2xpZGVyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcbiAgICAgIH0sXG4gICAgICBicmVha3BvaW50czoge1xuICAgICAgICA1NzA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDg3MDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgICAgMTEwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2xpZGVycztcbiIsImNvbnN0IG51bWJlciA9ICgpID0+IHtcbiAgLy/QoNCw0LfRgNC10YjQsNC10YIg0LLQstC+0LQg0YLQvtC70YzQutC+INGG0LjRhNGAINCyIGlucHV0XG4gIGNvbnN0ICRudW1iZXJzID0gJChcIi5qcy1udW1iZXJcIik7XG4gIGlmICghJG51bWJlcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAkbnVtYmVycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG5cbiAgICAkdGhpc3MubWFzaygnMCMnKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlcjtcbiIsImNvbnN0IGJ0blVwID0gKCkgPT4ge1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgaWYgKCQoJyN1cGJ1dHRvbicpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICQoJyN1cGJ1dHRvbicpLmNzcyh7b3BhY2l0eSA6IDAuOX0pLmZhZGVJbignZmFzdCcpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHsgJCgnI3VwYnV0dG9uJykuc3RvcCh0cnVlLCBmYWxzZSkuZmFkZU91dCgnZmFzdCcpOyB9XG4gIH0pO1xuXG4gICQoJyN1cGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3AgOiAwfSwgMzAwKTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ0blVwO1xuIiwiY29uc3QgZ29vZFF1YW50aXR5ID0gKCkgPT4ge1xuICAvLyDQo9Cy0LXQu9C40YfQtdC90LjQtSDQuCDRg9C80LXQvdGM0YjQtdC90LjQtSDRgtC+0LLQsNGA0L7QslxuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1xdWFudGl0eVwiKTtcbiAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoIDwgMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgIGNvbnN0IGJ0bkluY3JlYXNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtaW5jcmVhc2VcIik7XG4gICAgY29uc3QgYnRuRGVjcmVhc2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1kZWNyZWFzZVwiKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGNvbnN0IGJ0bkluY3JlYXNlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICBsZXQgbmV3VmFsdWUgPSArK3ZhbHVlO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPiAxKSB7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBidG5EZWNyZWFzZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgbGV0IG5ld1ZhbHVlID0gLS12YWx1ZTtcblxuICAgICAgaWYgKG5ld1ZhbHVlIDw9IDEpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAxO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgIGJ0bkRlY3JlYXNlLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIGlucHV0LnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfTtcblxuICAgIGJ0bkluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5JbmNyZWFzZUhhbmRsZXIpO1xuICAgIGJ0bkRlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidG5EZWNyZWFzZUhhbmRsZXIpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYnRuSW5jcmVhc2VIYW5kbGVyKCk7XG4gICAgICBidG5EZWNyZWFzZUhhbmRsZXIoKTtcbiAgICB9KVxuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZ29vZFF1YW50aXR5O1xuIiwiY29uc3QgZm9vdGVyRm9ybSA9ICgpID0+IHtcbiAgY29uc3QgJGZvb3RlckZvcm0gPSAkKFwiLmZvb3RlciBmb3JtXCIpO1xuICBpZiAoISRmb290ZXJGb3JtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXRzID0gJGZvb3RlckZvcm0uZmluZChcImlucHV0XCIpO1xuXG4gIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKTtcblxuICAgIGlucHV0Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlucHV0LnZhbCgpICE9PSBgYCkge1xuICAgICAgICBpbnB1dC5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9vdGVyRm9ybTtcbiIsImNvbnN0IGRlc2tNZW51ID0gKCkgPT4ge1xuICAvLyDQntGC0LrRgNGL0YLQuNC1INC4INC30LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0YEg0L/QvtC80L7RidGM0Y4gZmFkZVxuICBjb25zdCAkaGVhZGVyTWVudSA9ICQoXCIuanMtZGVzay1tZW51XCIpO1xuXG4gIGlmKCEkaGVhZGVyTWVudSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0ICRidG4gPSAkKFwiLmpzLWRlc2stbWVudS1idG5cIik7XG5cbiAgY29uc3Qga2V5Q29kZSA9IHtcbiAgICBFU0M6IDI3LFxuICB9O1xuXG4gIGNvbnN0IG9wZW4gPSAoKSA9PiB7XG4gICAgJGhlYWRlck1lbnUuc2xpZGVEb3duKDMwMCk7XG4gICAgJGhlYWRlck1lbnUuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICRidG4uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIH07XG5cbiAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgJGhlYWRlck1lbnUuc2xpZGVVcCgzMDApO1xuICAgICRoZWFkZXJNZW51LnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAkYnRuLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICRidG4uYmx1cigpO1xuICB9O1xuXG4gICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKCRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzaXplVG9wQ29vcmRpbmF0ZSgpO1xuICAgICAgb3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQuCDRg9GB0YLQsNC90L7QstC60LAg0LrQvtC+0YDQtNC40L3QsNGC0YsgdG9wINC00LvRjyBoZWFkZXItbWVudVxuICBjb25zdCByZXNpemVUb3BDb29yZGluYXRlID0gKCkgPT4ge1xuICAgIGxldCBoZWlnaHQgPSAkKFwiLmhlYWRlclwiKS5vdXRlckhlaWdodCgpO1xuICAgIGxldCBhID0gaGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgJGhlYWRlck1lbnUuY3NzKFwidG9wXCIsIGEpO1xuICB9O1xuICByZXNpemVUb3BDb29yZGluYXRlKCk7XG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHJlc2l6ZVRvcENvb3JkaW5hdGUpO1xuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCRoZWFkZXJNZW51Lmhhc0NsYXNzKFwic2hvd1wiKSkge1xuICAgICAgJGhlYWRlck1lbnUuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAkaGVhZGVyTWVudS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgJGJ0bi5ibHVyKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDQl9Cw0LrRgNGL0YLQuNC1IGhlYWRlci1tZW51INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQstC90LUg0LzQtdC90Y5cbiAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LnRhcmdldC5jbG9zZXN0KFwiLmpzLWRlc2stbWVudVwiKSA9PT0gbnVsbCAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZGVzay1tZW51LWJ0blwiKSA9PT0gbnVsbCkge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vINCX0LDQutGA0YvRgtC40LUgaGVhZGVyLW1lbnUg0L/QviBFU0NcbiAgJChkb2N1bWVudCkub24oXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQua2V5Q29kZSA9PT0ga2V5Q29kZS5FU0MgJiYgJGhlYWRlck1lbnUuaGFzQ2xhc3MoXCJzaG93XCIpKSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbGlua3MgPSAkaGVhZGVyTWVudS5maW5kKFwiLmpzLWRlc2stbWVudS1saW5rcyBhXCIpO1xuICBjb25zdCBjb250ZW50cyA9ICRoZWFkZXJNZW51LmZpbmQoXCIuZGVzay1tZW51X19jb250ZW50XCIpO1xuXG4gIGZ1bmN0aW9uIGRlc2tNZW51Q29udGVudENoYW5nZShsaW5rKSB7XG4gICAgbGluay5hZGRDbGFzcyhcImhvdmVyXCIpO1xuXG4gICAgY29uc3QgaWQgPSBsaW5rLmF0dHIoXCJkYXRhLWlkXCIpO1xuXG4gICAgcmVzZXRDb250ZW50KCk7XG4gICAgbGV0IGNvbnRlbnQgPSAkaGVhZGVyTWVudS5maW5kKGAuZGVzay1tZW51X19jb250ZW50W2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICAgIGNvbnRlbnQuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICB9XG4gIGRlc2tNZW51Q29udGVudENoYW5nZSgkKGxpbmtzWzBdKSk7XG5cbiAgZnVuY3Rpb24gcmVzZXRIb3ZlcigpIHtcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuICAgICAgbGluay5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRDb250ZW50KCkge1xuICAgIGNvbnRlbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaXRlbSA9ICQodGhpcyk7XG4gICAgICBpdGVtLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0IGxpbmsgPSAkKHRoaXMpO1xuXG4gICAgbGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbGluay5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVzZXRIb3ZlcigpO1xuICAgICAgZGVza01lbnVDb250ZW50Q2hhbmdlKGxpbmspO1xuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZXNrTWVudTtcbiIsImNvbnN0IHBoYXJtYWN5R2V0ID0gKCkgPT4ge1xuICBjb25zdCBwaGFybWFjeUJsb2NrID0gJChcIi5waGFybWFjaWVzXCIpO1xuXG4gIGlmICghcGhhcm1hY3lCbG9jaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNvcnRMaW5rcyA9IHBoYXJtYWN5QmxvY2suZmluZChcIi5waGFybWFjaWVzX19saW5rcyBhXCIpO1xuXG4gIGlmIChzb3J0TGlua3MpIHtcbiAgICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSAkKHRoaXMpO1xuICBcbiAgICAgIGxpbmsub24oXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBzb3J0TGlua3MuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9KTtcbiAgXG4gICAgICAgIGxpbmsuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBoYXJtYWNpZXNMaW5rcyA9IHBoYXJtYWN5QmxvY2suZmluZChcIi5waGFybWFjaWVzX19saXN0IGFcIik7XG4gIFxuICBpZiAocGhhcm1hY2llc0xpbmtzKSB7XG4gICAgcGhhcm1hY2llc0xpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsaW5rID0gJCh0aGlzKTtcbiAgXG4gICAgICBsaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgcGhhcm1hY2llc0xpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBsaW5rLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBoYXJtYWN5R2V0O1xuIiwiY29uc3QgbW9iTWVudSA9ICgpID0+IHtcbiAgLy8g0J7RgtC60YDRi9GC0LjQtSDQvNC+0LEg0LzQtdC90Y5cbiAgY29uc3QgJGJ0biA9ICQoXCIuanMtbW9iLW1lbnUtYnRuXCIpO1xuXG4gIGlmICgkYnRuKSB7XG4gICAgY29uc3QgJG1lbnUgPSAkKFwiLm1vYi1tZW51XCIpO1xuICAgIGNvbnN0ICRidG5DbG9zZSA9ICQoXCIubW9iLW1lbnUgLmpzLWJ0bi1jbG9zZVwiKTtcblxuICAgICRidG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyDQtdGB0LvQuCDQvtGC0LrRgNGL0YLQviDQvNC10L3RjlxuICAgICAgaWYgKCRtZW51Lmhhc0NsYXNzKFwiaXMtc2hvd1wiKSkge1xuICAgICAgICBjb25zdCBwb3MgPSBwYXJzZUludCgkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiksIDEwKTtcbiAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zY3JvbGxcIik7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBwb3MpO1xuXG4gICAgICAgIC8vINC10YHQu9C4INC30LDQutGA0YvRgtC+INC80LXQvdGOXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbWVudS5hZGRDbGFzcyhcImlzLXNob3dcIik7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3QgcGFnZVBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1lbnUtb3BlblwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgcGFnZVBvcyk7XG4gICAgICAgIH0sIDQ1MCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYnRuQ2xvc2UuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcG9zID0gcGFyc2VJbnQoJChcImJvZHlcIikuYXR0cihcImRhdGEtc2Nyb2xsXCIpLCAxMCk7XG4gICAgICAkbWVudS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAkYnRuLnJlbW92ZUNsYXNzKFwiaXMtc2hvd1wiKTtcblxuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJpcy1tZW51LW9wZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2Nyb2xsXCIpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHBvcyk7XG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2JNZW51O1xuIiwiY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xuICBjb25zdCAkYWNjb3JkaW9ucyA9ICQoYC5hY2NvcmRpb25fX2l0ZW1gKTtcbiAgaWYgKCRhY2NvcmRpb25zKSB7XG4gICAgJGFjY29yZGlvbnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICR0aGlzcyA9ICQodGhpcyk7XG4gICAgICBjb25zdCAkc2lkZSA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uX19sYWJlbGApO1xuICAgICAgY29uc3QgJG1haW4gPSAkdGhpc3MuZmluZChgLmFjY29yZGlvbl9fY29udGVudGApO1xuXG4gICAgICAkc2lkZS5vbihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgkc2lkZS5oYXNDbGFzcyhgaXMtb3BlbmApKSB7XG4gICAgICAgICAgJG1haW4uc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgJHNpZGUucmVtb3ZlQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkc2lkZS5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNpZGUuYWRkQ2xhc3MoYGlzLW9wZW5gKTtcbiAgICAgICAgICAkbWFpbi5zbGlkZURvd24oXCJzbG93XCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0ICRpbm5lckFjY29yZGlvbnMgPSAkKGAuYWNjb3JkaW9uLWlubmVyX19pdGVtYCk7XG4gIGlmICgkaW5uZXJBY2NvcmRpb25zKSB7XG4gICAgJGlubmVyQWNjb3JkaW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJHRoaXNzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0ICRzaWRlID0gJHRoaXNzLmZpbmQoYC5hY2NvcmRpb24taW5uZXJfX2xhYmVsYCk7XG4gICAgICBjb25zdCAkbWFpbiA9ICR0aGlzcy5maW5kKGAuYWNjb3JkaW9uLWlubmVyX19jb250ZW50YCk7XG5cbiAgICAgICRzaWRlLm9uKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCRzaWRlLmhhc0NsYXNzKGBpcy1vcGVuYCkpIHtcbiAgICAgICAgICAkbWFpbi5zbGlkZVVwKFwic2xvd1wiKTtcbiAgICAgICAgICAkc2lkZS5yZW1vdmVDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAgICRzaWRlLmJsdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2lkZS5hZGRDbGFzcyhgaXMtb3BlbmApO1xuICAgICAgICAgICRtYWluLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9uO1xuIiwiY29uc3QgcmFuZ2UgPSAoKSA9PiB7XG4gIC8vIElucHV0IHR5cGUgcmFuZ2VcbiAgLy8gaHR0cDovL2lvbmRlbi5jb20vYS9wbHVnaW5zL2lvbi5yYW5nZVNsaWRlci9zdGFydC5odG1sXG4gIGNvbnN0IG1pblByaWNlID0gOTtcbiAgY29uc3QgbWF4UHJpY2UgPSAzOTk5O1xuICBjb25zdCBmcm9tUHJpY2UgPSA5O1xuICBjb25zdCB0b1ByaWNlID0gMzk5OTtcblxuXG4gICQoXCIuanMtcmFuZ2VcIikuaW9uUmFuZ2VTbGlkZXIoe1xuICAgIHR5cGU6IFwiZG91YmxlXCIsXG4gICAgc2tpbjogXCJyb3VuZFwiLFxuICAgIGdyaWQ6IGZhbHNlLFxuICAgIG1pbjogbWluUHJpY2UsXG4gICAgbWF4OiBtYXhQcmljZSxcbiAgICBmcm9tOiBmcm9tUHJpY2UsXG4gICAgdG86IHRvUHJpY2UsXG4gICAgaGlkZV9taW5fbWF4OiB0cnVlLFxuICAgIGhpZGVfZnJvbV90bzogdHJ1ZSxcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJhbmdlO1xuIiwiY29uc3QgdGFicyA9ICgpID0+IHtcbiAgY29uc3QgdGFic0Jsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhYnNgKTtcblxuICBpZiAoIXRhYnNCbG9jaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCB0YWIgPSBuZXcgVGFiYnkoYFtkYXRhLXRhYnNdYCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIiwiY29uc3QgYW5rb3JzID0gKCkgPT4ge1xuICBjb25zdCBsaW5rcyA9ICQoXCIuanMtYW5rb3JcIik7XG4gIGlmICghbGlua3MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwYXJ0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAvL9Cf0YDQvtCy0LXRgNGP0LXQvCDQvdCwIGRvY3VtZW50LnJlYWR5INC90LDQu9C40YfQuNC1ICNoYXNodGFnINCyIHVybCwg0Lgg0LXRgdC70Lgg0LXRgdGC0YwsINGB0LrRgNC+0LvQu9C40Lwg0LTQviDQvdGD0LbQvdC+0Lkg0YHQtdC60YbQuNC4XG4gIGNvbnN0IGNoZWNrSGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgICBpZiAoJChoYXNoKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gMTgwKSxcbiAgICAgICAgICB9LCA5MDAsICdzd2luZycpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkKGRvY3VtZW50KS5yZWFkeShjaGVja0hhc2gpO1xuXG4gIC8vINCd0LAg0LrQvdC+0L/QutC4INCy0LXRiNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XG4gIGxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgaWYgKHBhcnRuYW1lID09PSBcIi9cIikge1xuXG4gICAgICAgIC8vINCd0YPQttC90L4sINGH0YLQvtCx0Ysg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQu9C+0YHRjCDQuCDRgdGC0YDQsNC90LjRhtCwINGB0LrRgNC+0LvQu9C40LvQsNGB0Ywg0LTQviDRgdC10LrRhtC40LhcbiAgICAgICAgaWYgKCQoXCIubWVudVwiKS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1tZW51LW9wZW4nKS5yZW1vdmVBdHRyKCdkYXRhLXNjcm9sbCcpO1xuICAgICAgICAgIGNoZWNrSGFzaCgpO1xuXG4gICAgICAgIC8vINCe0LHRi9GH0L3Ri9C5INGB0LrRgNC40L/RgiDRgdC60YDQvtC70LvQsCDQtNC+INC90LXQvtCx0YXQvtC00LjQvNC+0Lkg0YHQtdC60YbQuNC4INCyIGRhdGEg0LDRgtGA0LjQsdGD0YLQtSDQsdC10Lcg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaHJlZicpO1xuXG4gICAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gMTgwKSxcbiAgICAgICAgICAgICAgfSwgOTAwLCAnc3dpbmcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgaWYgKHBhcnRuYW1lID09PSBcIi9cIikge1xuXG4gICAgICAgIC8vINCd0YPQttC90L4sINGH0YLQvtCx0Ysg0LzQtdC90Y4g0LfQsNC60YDRi9Cy0LDQu9C+0YHRjCDQuCDRgdGC0YDQsNC90LjRhtCwINGB0LrRgNC+0LvQu9C40LvQsNGB0Ywg0LTQviDRgdC10LrRhtC40LhcbiAgICAgICAgaWYgKCQoXCIubWVudVwiKS5oYXNDbGFzcyhcImlzLXNob3dcIikpIHtcblxuICAgICAgICAgICQoXCIubWVudVwiKS5yZW1vdmVDbGFzcyhcImlzLXNob3dcIik7XG4gICAgICAgICAgJChcIi5qcy1vcGVuLW1lbnVcIikucmVtb3ZlQ2xhc3MoXCJpcy1zaG93XCIpO1xuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtbWVudS1vcGVuJykucmVtb3ZlQXR0cignZGF0YS1zY3JvbGwnKTtcbiAgICAgICAgICBjaGVja0hhc2goKTtcblxuICAgICAgICAvLyDQntCx0YvRh9C90YvQuSDRgdC60YDQuNC/0YIg0YHQutGA0L7Qu9C70LAg0LTQviDQvdC10L7QsdGF0L7QtNC40LzQvtC5INGB0LXQutGG0LjQuCDQsiBkYXRhINCw0YLRgNC40LHRg9GC0LUg0LHQtdC3INC/0LXRgNC10LfQsNCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKCdkYXRhLWhyZWYnKTtcblxuICAgICAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICgkKGhhc2gpLm9mZnNldCgpLnRvcCAtIDE4MCksXG4gICAgICAgICAgICAgIH0sIDkwMCwgJ3N3aW5nJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFua29ycztcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xuICBjb25zdCAkYnV0dG9ucyA9ICQoJ1tqcy1wb3B1cC1vcGVuXScpO1xuXG4gIGlmICgkYnV0dG9ucy5sZW5ndGgpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICRidXR0b25zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCAkYnV0dG9uID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWUsXG4gICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgYnRuVHBsIDoge1xuICAgICAgICAgIHNtYWxsQnRuIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gIEFkZCBhbm90aGVyIGJnIGNvbG9yXG4gICAgICAgICAgJCgnLmZhbmN5Ym94LWJnJykuYWRkQ2xhc3MoJGJ1dHRvbi5kYXRhKCdzcmMnKS5zbGljZSgxKSk7XG5cbiAgICAgICAgICBjb25zdCBib2R5U3R5bGVzID0ge1xuICAgICAgICAgICAgJ292ZXJmbG93LXknOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCBhdXRvJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgJGJvZHkuY3NzKGJvZHlTdHlsZXMpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCcuZmFuY3lib3gtYmcnKS5yZW1vdmVDbGFzcygkYnV0dG9uLmRhdGEoJ3NyYycpLnNsaWNlKDEpKTtcblxuICAgICAgICAgIGNvbnN0IGJvZHlTdHlsZXMgPSB7XG4gICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICAgICAgICAgICdtYXJnaW4nOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgICAkYm9keS5jc3MoYm9keVN0eWxlcyk7XG5cbiAgICAgICAgICAkKCRidXR0b24uZGF0YSgnc3JjJykpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgJGJ1dHRvbi5mYW5jeWJveChvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9kYWw7XG4iLCJjb25zdCBmaWx0ZXIgPSAoKSA9PiB7XG4gIC8v0J7RgtC60YDRi9GC0LjQtSDRhNC40LvRjNGC0YDQsCDQsiDQutCw0YLQsNC70L7Qs9C1XG4gIGNvbnN0ICRmaWx0ZXJCdG4gPSAkKFwiLmpzLWZpbHRlci1idG5cIilcbiAgaWYgKCEkZmlsdGVyQnRuKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgJGZpbHRlciA9ICQoXCIuanMtZmlsdGVyXCIpO1xuICBjb25zdCAkYnRuQ2xvc2UgPSAkKFwiLmpzLWNsb3NlLWZpbHRlclwiKTtcbiAgY29uc3QgJG92ZXJsYXkgPSAkKFwiLm92ZXJsYXlcIik7XG5cbiAgJGZpbHRlckJ0bi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoJGZpbHRlci5oYXNDbGFzcyhcIm9wZW5cIikpIHtcbiAgICAgICRmaWx0ZXIucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICAgICAgJG92ZXJsYXkuZmFkZU91dCgzMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZmlsdGVyLmFkZENsYXNzKFwib3BlblwiKTtcbiAgICAgICRvdmVybGF5LmZhZGVJbigzMDApO1xuICAgIH1cbiAgfSk7XG5cbiAgJGJ0bkNsb3NlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICgkZmlsdGVyLmhhc0NsYXNzKFwib3BlblwiKSkge1xuICAgICAgJGZpbHRlci5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG4gICAgICAkb3ZlcmxheS5mYWRlT3V0KDMwMCk7XG4gICAgfVxuICB9KTtcblxuICAkKGRvY3VtZW50KS5vbignbW91c2V1cCcsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZmlsdGVyXCIpID09PSBudWxsICYmIGV2dC50YXJnZXQuY2xvc2VzdChcIi5qcy1jbG9zZS1maWx0ZXJcIikgPT09IG51bGwpIHtcbiAgICAgIGlmICgkZmlsdGVyLmhhc0NsYXNzKFwib3BlblwiKSkge1xuICAgICAgICAkZmlsdGVyLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgICAgICAgJG92ZXJsYXkuZmFkZU91dCgzMDApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZpbHRlcjtcbiIsImNvbnN0IHNvcnQgPSAoKSA9PiB7XG4gIGNvbnN0ICR2aWV3TGlua3MgPSAkKFwiLmpzLWxpbmstdmlld1wiKTtcblxuICBpZiAoJHZpZXdMaW5rcykge1xuXG4gICAgJHZpZXdMaW5rcy5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge31cbiAgICAgIGVsc2Uge1xuICAgICAgICAkdmlld0xpbmtzLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAkKFwiLmpzLWNhdGFsb2ctY29udGVudFwiKS50b2dnbGVDbGFzcyhcImNhdGFsb2ctY29udGVudC0tcm93XCIpO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiByZW1vdmVSb3coKSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTIpIHtcbiAgICAgICAgJChcIi5jYXRhbG9nLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJjYXRhbG9nLWNvbnRlbnQtLXJvd1wiKTtcbiAgICAgICAgICAkKFwiLmpzLXJvd1wiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKFwiLmpzLWNvbFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlUm93KCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHJlbW92ZVJvdygpO1xuICB9KTtcbiAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3J0O1xuIiwiY29uc3QgbGlua1Zpc3VhbCA9ICgpID0+IHtcbiAgY29uc3QgbGlua1Zpc3VhbERlc2sgPSAkKFwiLmpzLWxpbmstdmlzdWFsLWRlc2tcIik7XG4gIGNvbnN0IGxpbmtWaXN1YWxNb2IgPSAkKFwiLmpzLWxpbmstdmlzdWFsLW1vYlwiKTtcblxuICBpZighbGlua1Zpc3VhbERlc2sgfHwgIWxpbmtWaXN1YWxNb2IpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja01lZGlhU2NyZWVuICgpIHtcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTIpIHtcbiAgICAgIGxpbmtWaXN1YWxNb2IuYXR0cihcImlkXCIsIFwic3BlY2lhbEJ1dHRvblwiKTtcbiAgICAgIGxpbmtWaXN1YWxEZXNrLnJlbW92ZUF0dHIoXCJpZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlua1Zpc3VhbE1vYi5yZW1vdmVBdHRyKFwiaWRcIik7XG4gICAgICBsaW5rVmlzdWFsRGVzay5hdHRyKFwiaWRcIiwgXCJzcGVjaWFsQnV0dG9uXCIpO1xuICAgIH1cbiAgfVxuICBjaGVja01lZGlhU2NyZWVuKCk7XG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGNoZWNrTWVkaWFTY3JlZW4pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsaW5rVmlzdWFsO1xuIiwiaW1wb3J0IG5vZGVMaXN0Rm9yRWFjaCBmcm9tICcuL25vZGUtbGlzdC1mb3ItZWFjaCc7XG5pbXBvcnQgdGVsIGZyb20gJy4vdGVsJztcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IG1lbnVPcGVuIGZyb20gJy4vbWVudS1vcGVuJztcbmltcG9ydCBoZWFkZXJTY3JvbGwgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IHNsaWRlcnMgZnJvbSAnLi9zbGlkZXJzJztcbmltcG9ydCBudW1iZXIgZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGJ0blVwIGZyb20gJy4vYnRuLXVwJztcbmltcG9ydCBnb29kUXVhbnRpdHkgZnJvbSAnLi9nb29kLXF1YW50aXR5JztcbmltcG9ydCBmb290ZXJGb3JtIGZyb20gJy4vZm9vdGVyLWZvcm0nO1xuaW1wb3J0IGRlc2tNZW51IGZyb20gJy4vZGVzay1tZW51JztcbmltcG9ydCBwaGFybWFjeUdldCBmcm9tICcuL3BoYXJtYWN5LWdldCc7XG5pbXBvcnQgbW9iTWVudSBmcm9tICcuL21vYi1tZW51JztcbmltcG9ydCBhY2NvcmRpb24gZnJvbSAnLi9hY2NvcmRpb24nO1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHRhYnMgZnJvbSAnLi90YWJzJztcbmltcG9ydCBhbmtvcnMgZnJvbSAnLi9hbmtvcnMnO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IGZpbHRlciBmcm9tICcuL2ZpbHRlci1vcGVuJztcbmltcG9ydCBzb3J0IGZyb20gJy4vc29ydCc7XG5pbXBvcnQgbGlua1Zpc3VhbCBmcm9tICcuL2xpbmstdmlzdWFsJztcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbm9kZUxpc3RGb3JFYWNoKCk7XG4gICAgdGVsKCk7XG4gICAgYW5pbWF0aW9uKCk7XG4gICAgbWVudU9wZW4oKTtcbiAgICBoZWFkZXJTY3JvbGwoKTtcbiAgICBzbGlkZXJzKCk7XG4gICAgbnVtYmVyKCk7XG4gICAgYnRuVXAoKTtcbiAgICBnb29kUXVhbnRpdHkoKTtcbiAgICBmb290ZXJGb3JtKCk7XG4gICAgZGVza01lbnUoKTtcbiAgICBwaGFybWFjeUdldCgpO1xuICAgIG1vYk1lbnUoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgICByYW5nZSgpO1xuICAgIHRhYnMoKTtcbiAgICBhbmtvcnMoKTtcbiAgICBtb2RhbCgpO1xuICAgIGZpbHRlcigpO1xuICAgIHNvcnQoKTtcbiAgICBsaW5rVmlzdWFsKCk7XG4gIH1cbn1cblxuXG5BcHAuaW5pdCgpO1xud2luZG93LkFwcCA9IEFwcDtcbiJdLCJuYW1lcyI6WyJub2RlTGlzdEZvckVhY2giLCJ3aW5kb3ciLCJOb2RlTGlzdCIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsYmFjayIsInRoaXNBcmciLCJpIiwibGVuZ3RoIiwiY2FsbCIsInRlbCIsImZvcm1CbG9ja3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtQmxvY2siLCJpbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG9uZU1hc2siLCJJTWFzayIsIm1hc2siLCJhbmltYXRpb24iLCJhbmltYXRpb25zIiwiV09XIiwiaW5pdCIsImNhcmRJbmZvIiwiJCIsInNoYWRlIiwiZWFjaCIsIml0ZW0iLCJvbiIsImNzcyIsIm1lbnVPcGVuIiwiJGJ1dHRvbnNNZW51IiwiJG1lbnUiLCIkYnV0dG9uQ2xvc2UiLCIkaGVhZGVyIiwiJGJ0biIsInNjcm9sbEhlYWRlciIsImhhc0NsYXNzIiwic2Nyb2xsVG9wIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwicG9zIiwicGFyc2VJbnQiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInNjcm9sbFRvIiwic2V0VGltZW91dCIsInBhZ2VQb3MiLCJoZWFkZXJTY3JvbGwiLCJtYWluIiwiaW50cm9Ub3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCIkaXRlbSIsIiRzdWJtZW51IiwiZmluZCIsInNsaWRlcnMiLCJTd2lwZXIiLCJwcm9tbyIsIm15U3dpcGVyIiwiZGlyZWN0aW9uIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInNwZWVkIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsInBhZ2luYXRpb24iLCJlbCIsImNsaWNrYWJsZSIsInRpdGxlcyIsInNsaWRlQ2hhbmdlSGFuZGxlciIsInRpbWVyIiwiYWN0aXZlU2xpZGUiLCJ0aXRsZSIsImNsYXNzTGlzdCIsImFkZCIsImNvbnRhaW5zIiwicmVtb3ZlIiwic2FsZUJsb2NrIiwibmV3R29vZHMiLCJzaW11bGF0ZVRvdWNoIiwiYnJlYWtwb2ludHMiLCJudW1iZXIiLCIkbnVtYmVycyIsIiR0aGlzcyIsImJ0blVwIiwic2Nyb2xsIiwiaXMiLCJvcGFjaXR5IiwiZmFkZUluIiwic3RvcCIsImZhZGVPdXQiLCJhbmltYXRlIiwiZ29vZFF1YW50aXR5IiwiY29udGFpbmVycyIsImNvbnRhaW5lciIsImJ0bkluY3JlYXNlIiwiYnRuRGVjcmVhc2UiLCJ2YWx1ZSIsImJ0bkluY3JlYXNlSGFuZGxlciIsIm5ld1ZhbHVlIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRuRGVjcmVhc2VIYW5kbGVyIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvb3RlckZvcm0iLCIkZm9vdGVyRm9ybSIsImlucHV0cyIsInZhbCIsImRlc2tNZW51IiwiJGhlYWRlck1lbnUiLCJrZXlDb2RlIiwiRVNDIiwib3BlbiIsInNsaWRlRG93biIsImNsb3NlIiwic2xpZGVVcCIsImJsdXIiLCJyZXNpemVUb3BDb29yZGluYXRlIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJhIiwiZXZ0IiwidGFyZ2V0IiwiY2xvc2VzdCIsImxpbmtzIiwiY29udGVudHMiLCJkZXNrTWVudUNvbnRlbnRDaGFuZ2UiLCJsaW5rIiwiaWQiLCJyZXNldENvbnRlbnQiLCJjb250ZW50IiwicmVzZXRIb3ZlciIsInByZXZlbnREZWZhdWx0IiwicGhhcm1hY3lHZXQiLCJwaGFybWFjeUJsb2NrIiwic29ydExpbmtzIiwicGhhcm1hY2llc0xpbmtzIiwibW9iTWVudSIsIiRidG5DbG9zZSIsImFjY29yZGlvbiIsIiRhY2NvcmRpb25zIiwiJHNpZGUiLCIkbWFpbiIsIiRpbm5lckFjY29yZGlvbnMiLCJyYW5nZSIsIm1pblByaWNlIiwibWF4UHJpY2UiLCJmcm9tUHJpY2UiLCJ0b1ByaWNlIiwiaW9uUmFuZ2VTbGlkZXIiLCJ0eXBlIiwic2tpbiIsImdyaWQiLCJtaW4iLCJtYXgiLCJmcm9tIiwidG8iLCJoaWRlX21pbl9tYXgiLCJoaWRlX2Zyb21fdG8iLCJ0YWJzIiwidGFic0Jsb2NrIiwidGFiIiwiVGFiYnkiLCJhbmtvcnMiLCJwYXJ0bmFtZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJjaGVja0hhc2giLCJoYXNoIiwib2Zmc2V0IiwicmVhZHkiLCJtb2RhbCIsIiRidXR0b25zIiwiJGJvZHkiLCIkYnV0dG9uIiwib3B0aW9ucyIsImhpZGVTY3JvbGxiYXIiLCJ0b3VjaCIsImJ0blRwbCIsInNtYWxsQnRuIiwiYmVmb3JlU2hvdyIsImRhdGEiLCJzbGljZSIsImJvZHlTdHlsZXMiLCJhZnRlckNsb3NlIiwiZmFuY3lib3giLCJmaWx0ZXIiLCIkZmlsdGVyQnRuIiwiJGZpbHRlciIsIiRvdmVybGF5Iiwic29ydCIsIiR2aWV3TGlua3MiLCJ0b2dnbGVDbGFzcyIsInJlbW92ZVJvdyIsIndpZHRoIiwibGlua1Zpc3VhbCIsImxpbmtWaXN1YWxEZXNrIiwibGlua1Zpc3VhbE1vYiIsImNoZWNrTWVkaWFTY3JlZW4iLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07RUFDNUIsTUFBSSxjQUFjQyxNQUFkLElBQXdCLENBQUNDLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBaEQsRUFBeUQ7RUFDdkRGLElBQUFBLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsT0FBbkIsR0FBNkIsVUFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7RUFDMURBLE1BQUFBLE9BQU8s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
