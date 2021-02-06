// IIFE with jQuery Wrapper
(function ($) {
  "use strict";

  //Hero Slider
  $(".hero-slider").slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: "<button type='button' class='prevArrow'></button>",
    nextArrow: "<button type='button' class='nextArrow'></button>",
    dots: false,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
  $(".hero-slider").slickAnimation();

  // testimonial slider
  $(".testimonial-slider").slick({
    arrows: false,
    dots: false,
  });

  $(".blog-slider").slick({
    arrows: false,
    dots: true,
    autoplay: true,
  });

  /*
   *----------------------------------
   * Document Ready
   *----------------------------------
   */

  $(document).ready(function () {
    AOS.init();
    // console.log(AOS);
    const elems = [...document.getElementsByClassName("opacity-0")];
    const secondStart = 25;
    const svg1 = elems.filter((elem, index) => index < secondStart);
    const svg2 = elems.filter((elem, index) => index >= secondStart);
    const entireSvg1 = document.querySelector(".svg1");
    const entireSvg2 = document.querySelector(".svg2");

    var Dat = new Date();

    elems.forEach((x, index) => {
      x.addEventListener("webkitAnimationEnd", () => {
        // console.log("animation dead", x);
        if (index < secondStart) myEndFunction1(index);
        else myEndFunction2(index - secondStart);
        // Dat = new Date();
      });
    });

    function swapElements(obj1, obj2) {
      // create marker element and insert it where obj1 is
      var temp = document.createElement("div");
      obj1.parentNode.insertBefore(temp, obj1);

      // move obj1 to right before obj2
      obj2.parentNode.insertBefore(obj1, obj2);

      // move obj2 to right before where obj1 used to be
      temp.parentNode.insertBefore(obj2, temp);

      // remove temporary marker node
      temp.parentNode.removeChild(temp);
    }

    function myEndFunction1(index) {
      try {
        if (
          index === 1 ||
          index === 4 ||
          index === 7 ||
          index === 16 ||
          index === 22
        ) {
          setTimeout(() => {
            svg1[++index].classList.add("animate1");
            svg1[index].classList.remove("opacity-0");
          }, 75);
        } else {
          svg1[++index].classList.add("animate1");
          svg1[index].classList.remove("opacity-0");
        }
      } catch (e) {
        // console.log(e);
        // $(".svg1").remove();
        console.log(svg1);
        svg1.forEach((elem) => {
          elem.classList.remove("animate1");
          elem.classList.add("opacity-0");
        });

        swapElements(entireSvg1, entireSvg2);

        svg2[0].classList.add("animate");
        svg2[0].classList.remove("opacity-0");
      }
    }

    function myEndFunction2(index) {
      try {
        if (index === 6 || index === 8 || index === 11 || index === 15) {
          setTimeout(() => {
            svg2[++index].classList.add("animate");
            svg2[index].classList.remove("opacity-0");
          }, 75);
        } else {
          svg2[++index].classList.add("animate");
          svg2[index].classList.remove("opacity-0");
        }
      } catch (e) {
        console.log(svg2);
        svg2.forEach((elem) => {
          elem.classList.remove("animate");
          elem.classList.add("opacity-0");
        });

        swapElements(entireSvg2, entireSvg1);

        svg1[0].classList.add("animate1");
        svg1[0].classList.remove("opacity-0");
      }
    }

    function next() {
      // console.log("Hello");
      // console.log(elems);
      var i = 0;
      elems[i].classList.add("animate1");
      elems[i].classList.remove("opacity-0");
    }

    window.addEventListener("load", next);

    //SCROLL animations
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      // console.log(scroll);

      if (scroll == 0)
        document.querySelector(".navbar").style.backgroundColor = "";
      if (scroll > 0) {
        //console.log('a');
        $(".navigation").addClass("sticky-header");
      } else {
        //console.log('a');
        $(".navigation").removeClass("sticky-header");
      }
    });

    var i = 0;
    var j = 0;
    var txts = ["We are the Literary Circle!", "Welcome to Our team page."];
    var speed = 85;

    function typeWriter() {
      if (i < txts[j].length) {
        document.getElementById("demo").innerHTML += txts[j].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        i = 0;
        setTimeout(() => {
          console.log("Hello");
          document.getElementById("demo").innerHTML = "";
          if (j === 0) j = 1;
          else j = 0;

          setTimeout(typeWriter, speed);
        }, 750);
      }
    }

    window.addEventListener("load", typeWriter);

    var init = 1;
    $(".navbar").hover(() => {
      console.log("Hovering");
      var scroll = $(window).scrollTop();

      if (scroll === 0) {
        if (init) {
          init = 0;
          $(".navigation").addClass("sticky-header");
        } else {
          init = 1;
          $(".navigation").removeClass("sticky-header");
        }
      }
    });

    $(document).ready(function () {
      var previousScroll = 0;
      $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll < 100) {
          showNav();
        } else if (
          currentScroll > 0 &&
          currentScroll < $(document).height() - $(window).height()
        ) {
          if (currentScroll > previousScroll) {
            hideNav();
          } else {
            showNav();
          }
          previousScroll = currentScroll;
          // console.log(previousScroll);
        }
      });

      function hideNav() {
        $(".navbar").removeClass("is-visible").addClass("is-hidden");
      }

      function showNav() {
        $(".navbar")
          .removeClass("is-hidden")
          .addClass("is-visible")
          .addClass("scrolling");
      }
    });

    // mouse hover effect
    // filter
    $(document).ready(function () {
      var containerEl = document.querySelector(".filtr-container");
      var filterizd;
      if (containerEl) {
        filterizd = $(".filtr-container").filterizr({});
      }
      //Active changer
      $(".filter").on("click", function () {
        $(".filter").removeClass("active");
        $(this).addClass("active");
      });
    });

    /* Popup Video */
    $("#th-video").magnificPopup({
      items: [
        {
          src: "video/ocean.mp4",
          type: "iframe", // this overrides default type
        },
      ],
      gallery: {
        enabled: true,
      },
      type: "image", // this is default type
    });

    /* Popup Image */
    $(".image-link").magnificPopup({
      type: "image",
    });

    // DOM Content Load Event Actions;
    $(window).load(function () {
      $("div.loading").remove();
      $("body").removeClass("loading");
    });
  }); // DOM Ready
})(jQuery); // IIFE
