(function ($) {
  "use strict";

  var windowOn = $(window);

  ////////////////////////////////////////////////////
  // 01. PreLoader Js

  $(".preloader__logo img").addClass("logo-blink");

  (function () {
    function id(v) {
      return document.getElementById(v);
    }
    function loadbar() {
      var ovrl = id("loading"),
        prog = id("tp-loading-line"),
        img = document.images,
        c = 0,
        tot = img.length;
      if (tot == 0) return doneLoading();

      function imgLoaded() {
        c += 1;
        var perc = (((100 / tot) * c) << 0) + "%";
        prog.style.width = perc;

        if (c === tot) return doneLoading();
      }
      function doneLoading() {
        setTimeout(function () {
          $("#loading").fadeOut(500);
        }, 100);
      }
      for (var i = 0; i < tot; i++) {
        var tImg = new Image();
        tImg.onload = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src = img[i].src;
      }
    }
    document.addEventListener("DOMContentLoaded", loadbar, false);
  })();

  ////////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  // 03. Offcanvas Js
  $(".offcanvas-open-btn").on("click", function () {
    $(".offcanvas__area").addClass("offcanvas-opened");
    $(".offcanvas__full").addClass("offcanvas-full-opened");
    $(".body-overlay").addClass("opened");
  });

  $(".offcanvas-close-btn").on("click", function () {
    $(".offcanvas__area").removeClass("offcanvas-opened");
    $(".offcanvas__full").removeClass("offcanvas-full-opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 03. Offcanvas Js
  $(".cartmini-open-btn").on("click", function () {
    $(".cartmini__area").addClass("cartmini-opened");
    $(".body-overlay").addClass("opened");
  });

  $(".cartmini-close-btn").on("click", function () {
    $(".cartmini__area").removeClass("cartmini-opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 03. Search Js
  $(".search-open-btn").on("click", function () {
    $(".search__popup").addClass("search-opened");
  });

  $(".search-close-btn").on("click", function () {
    $(".search__popup").removeClass("search-opened");
  });

  $(".job-form-open-btn").on("click", function () {
    $(".job__form").slideToggle("job__form");
  });

  // for header
  if ($("#tp-header-lang-toggle").length > 0) {
    window.addEventListener("click", function (e) {
      if (document.getElementById("tp-header-lang-toggle").contains(e.target)) {
        $(".tp-lang-list").toggleClass("tp-lang-list-open");
      } else {
        $(".tp-lang-list").removeClass("tp-lang-list-open");
      }
    });
  }

  // for footer
  if ($("#tp-footer-lang-toggle").length > 0) {
    window.addEventListener("click", function (e) {
      if (document.getElementById("tp-footer-lang-toggle").contains(e.target)) {
        $(".tp-lang-list-2").toggleClass("tp-lang-list-open-2");
      } else {
        $(".tp-lang-list-2").removeClass("tp-lang-list-open-2");
      }
    });
  }

  ////////////////////////////////////////////////////
  // 04. Body overlay Js
  $(".body-overlay").on("click", function () {
    $(".offcanvas__area").removeClass("offcanvas-opened");
    $(".offcanvas__full").removeClass("offcanvas-full-opened");
    $(".cartmini__area").removeClass("cartmini-opened");
    $(".body-overlay").removeClass("opened");
  });

  function smoothSctollTop() {
    $(".smooth a").on("click", function (event) {
      var target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - 150,
            },
            1000
          );
      }
    });
  }
  smoothSctollTop();

  ////////////////////////////////////////////////////
  // 06. Sticky Header Js
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $("#header-sticky").removeClass("header-sticky");
    } else {
      $("#header-sticky").addClass("header-sticky");
    }
  });

  var btn = $("#back_to_top");
  var btn_wrapper = $(".back-to-top-wrapper");

  windowOn.scroll(function () {
    if (windowOn.scrollTop() > 300) {
      btn_wrapper.addClass("back-to-top-btn-show");
    } else {
      btn_wrapper.removeClass("back-to-top-btn-show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  ////////////////////////////////////////////////////
  // 07. Data CSS Js
  $("[data-background").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )"
    );
  });

  $("[data-width]").each(function () {
    $(this).css("width", $(this).attr("data-width"));
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  ////////////////////////////////////////////////////
  // 13. Masonary Js
  if ($(".tp-portfolio-load-more").length > 0) {
    $(".grid").imagesLoaded(function () {
      // init Isotope
      var $grid = $(".grid").isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: ".grid-item",
        },
      });

      // filter items on button click
      $(".masonary-menu").on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });

      //for menu active class
      $(".masonary-menu button").on("click", function (event) {
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
      });

      var show_item = $(".tp-portfolio-load-more").attr("data-show");
      var count_item = show_item;
      var isotop_call = $grid.data("isotope");

      loadMore(show_item);

      function loadMore(showing) {
        $grid.find(".hidden").removeClass("hidden");

        var hidden = isotop_call.filteredItems
          .slice(showing, isotop_call.filteredItems.length)
          .map(function (item) {
            return item.element;
          });

        $(hidden).addClass("hidden");
        $grid.isotope("layout");

        if (hidden.length == 0) {
          jQuery("#tp-load-more").hide();
        } else {
          jQuery("#tp-load-more").show();
        }
      }

      $("#tp-load-more").on("click", function () {
        if ($(".masonary-menu").data("clicked")) {
          count_item = show_item;
          $(".masonary-menu").data("clicked", false);
        } else {
          count_item = count_item;
        }

        count_item = count_item + show_item;

        loadMore(count_item);
      });

      $(".masonary-menu").on("click", function () {
        $(this).data("clicked", true);

        loadMore(show_item);
      });
    });
  } else {
  }

  ////////////////////////////////////////////////////
  // 14. Wow Js
  new WOW().init();

  ////////////////////////////////////////////////////
  // 16. Cart Quantity Js

  $(".tp-cart-minus").on("click", function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });

  $(".tp-cart-plus").on("click", function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

  ////////////////////////////////////////////////////
  // 17. Show Login Toggle Js
  $("#showlogin").on("click", function () {
    $("#checkout-login").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 18. Show Coupon Toggle Js
  $("#showcoupon").on("click", function () {
    $("#checkout_coupon").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 19. Create An Account Toggle Js
  $("#cbox").on("click", function () {
    $("#cbox_info").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 20. Shipping Box Toggle Js
  $("#ship-box").on("click", function () {
    $("#ship-box-info").slideToggle(1000);
  });

  ////////////////////////////////////////////////////
  // 22. Parallax Js
  if ($(".scene").length > 0) {
    $(".scene").parallax({
      scalarX: 10.0,
      scalarY: 15.0,
    });
  }

  if ($(".scene-2").length > 0) {
    $(".scene-2").parallax({
      scalarX: 15.0,
      scalarY: 15.0,
    });
  }

  ////////////////////////////////////////////////////
  // 23. InHover Active Js
  $(".hover__active").on("mouseenter", function () {
    $(this)
      .addClass("test__active")
      .parent()
      .find(".hover__active")
      .removeClass("test__active");
  });

  // product countdown
  if ($("countdown").length > 0) {
    $(".countdown").countdown();
  }

  if ($("#nft-slider").length > 0) {
    var stepsSlider = document.getElementById("nft-slider");
    var input0 = document.getElementById("input-with-keypress-0");
    var input1 = document.getElementById("input-with-keypress-1");
    var inputs = [input0, input1];

    noUiSlider.create(stepsSlider, {
      start: [0, 4],
      connect: true,
      range: {
        min: [0],
        max: 10,
      },
    });

    stepsSlider.noUiSlider.on("update", function (values, handle) {
      inputs[handle].value = values[handle];
    });
  }

  $(".portfolio__item-8").on("mouseenter", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("#portfolio-bg-img").removeClass().addClass($(this).attr("rel"));
  });

  $(".services-item-link").on("click", function () {
    $("#services-item-thumb").removeClass().addClass($(this).attr("rel"));
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".features-item-content").on("click", function () {
    $("#features-item-thumb").removeClass().addClass($(this).attr("rel"));
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".portfolio__item-6").on("mouseenter", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".portfolio__item-6").on("mouseleave", function () {
    $(".portfolio__item-6").removeClass("active").addClass("active");
  });

  $(".slider__product-thumb-sm").on("click", function () {
    $("#product_wrapper").removeClass().addClass($(this).attr("rel"));
    $(this).addClass("active").siblings().removeClass("active");
  });

  if ($(".jarallax").length > 0) {
    $(".jarallax").jarallax({
      speed: 0.2,
      imgWidth: 1366,
      imgHeight: 768,
    });
  }

  if ($("#marker").length > 0) {
    function tp_tab_line() {
      var marker = document.querySelector("#marker");
      var item = document.querySelectorAll(".tp-tab-menu button");
      var itemActive = document.querySelector(".tp-tab-menu .nav-link.active");

      // rtl settings
      var tp_rtl = localStorage.getItem("tp_dir");
      let rtl_setting = tp_rtl == "rtl" ? "right" : "left";

      function indicator(e) {
        marker.style.left = e.offsetLeft + "px";
        marker.style.width = e.offsetWidth + "px";
      }

      item.forEach((link) => {
        link.addEventListener("click", (e) => {
          indicator(e.target);
        });
      });

      var activeNav = $(".nav-link.active");
      var activewidth = $(activeNav).width();
      var activePadLeft = parseFloat($(activeNav).css("padding-left"));
      var activePadRight = parseFloat($(activeNav).css("padding-right"));
      var totalWidth = activewidth + activePadLeft + activePadRight;

      var precedingAnchorWidth = anchorWidthCounter();

      $(marker).css("display", "block");

      $(marker).css("width", totalWidth);

      function anchorWidthCounter() {
        var anchorWidths = 0;
        var a;
        var aWidth;
        var aPadLeft;
        var aPadRight;
        var aTotalWidth;
        $(".tp-tab-menu button").each(function (index, elem) {
          var activeTest = $(elem).hasClass("active");
          marker.style.left = elem.offsetLeft + "px";
          if (activeTest) {
            // Break out of the each function.
            return false;
          }

          a = $(elem).find("button");
          aWidth = a.width();
          aPadLeft = parseFloat(a.css("padding-left"));
          aPadRight = parseFloat(a.css("padding-right"));
          aTotalWidth = aWidth + aPadLeft + aPadRight;

          anchorWidths = anchorWidths + aTotalWidth;
        });

        return anchorWidths;
      }
    }
    tp_tab_line();
  }

  if ($("#marker-vertical").length > 0) {
    function tp_tab_line_2() {
      var marker = document.querySelector("#marker-vertical");
      var item = document.querySelectorAll(".tp-tab-menu button");
      var itemActive = document.querySelector(".tp-tab-menu .nav-link.active");

      function indicator(e) {
        marker.style.top = e.offsetTop + "px";
        marker.style.height = e.offsetHeight + "px";
      }

      item.forEach((link) => {
        link.addEventListener("click", (e) => {
          indicator(e.target);
        });
      });
      var activeNav = $(".nav-link.active");
      var activewidth = $(activeNav).height();
      var activePadLeft = parseFloat($(activeNav).css("padding-top"));
      var activePadRight = parseFloat($(activeNav).css("padding-bottom"));
      var totalWidth = activewidth + activePadLeft + activePadRight;

      var precedingAnchorWidth = anchorWidthCounter();

      $(marker).css("display", "block");

      $(marker).css("height", totalWidth);

      // // 14. Wow Js
      new WOW().init();

      // // 21. Counter Js
      // new PureCounter();
      // new PureCounter({
      //   filesizing: true,
      //   selector: ".filesizecount",
      //   pulse: 2,
      // });

      function anchorWidthCounter() {
        var anchorWidths = 0;
        var a;
        var aWidth;
        var aPadLeft;
        var aPadRight;
        var aTotalWidth;
        $(".tp-tab-menu button").each(function (index, elem) {
          var activeTest = $(elem).hasClass("active");
          marker.style.top = elem.offsetTop + "px";
          if (activeTest) {
            // Break out of the each function.
            return false;
          }

          a = $(elem).find("button");
          aWidth = a.width();
          aPadLeft = parseFloat(a.css("padding-top"));
          aPadRight = parseFloat(a.css("padding-bottom"));
          aTotalWidth = aWidth + aPadLeft + aPadRight;

          anchorWidths = anchorWidths + aTotalWidth;
        });

        return anchorWidths;
      }
    }
    tp_tab_line_2();
  }
})(jQuery);
