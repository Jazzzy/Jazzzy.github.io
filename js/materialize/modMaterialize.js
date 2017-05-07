/*
Image preloading
*/
(function ($) {
  $.fn.preload = function () {
    this.each(function () {
      $('<img/>')[0].src = this;
    });
  }
})(jQuery);
// We can just create the array and call .preload() on it
//$(['img1.jpg','img2.jpg','img3.jpg']).preload();


/*
Parallax with speed
*/
(function ($) {

  $.fn.parallax = function (speed) {

    var parallaxSpeed = function (speed) {
      if (isNaN(speed)) {
        return 1;
      } else {
        return (speed / 100);
      }
    };


    var window_width = $(window).width();

    if (this != undefined)
      return this.each(function (i) {

        var $this = $(this);

        $this.addClass('parallax');

        function updateParallax(initial) {

          var _canvas;

          if ($this.find("canvas").length > 0) {
            _canvas = true;
          } else {
            _canvas = false;
          }

          var container_height;
          if (window_width < 601) {

            if (_canvas) {
              container_height = ($this.height() > 0) ? $this.height() : $this.children("canvas").height();
            } else {
              container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
            }

          } else {
            container_height = ($this.height() > 0) ? $this.height() : 500;
          }


          if (_canvas) {
            var $img = $this.children("canvas").first();
          } else {
            var $img = $this.children("img").first();
          }
          var img_height = $img.height();
          var parallax_dist = img_height - container_height;
          var bottom = $this.offset().top + container_height;
          var top = $this.offset().top;
          var scrollTop = $(window).scrollTop();
          var windowHeight = window.innerHeight;
          var windowBottom = scrollTop + windowHeight;
          var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
          var parallax = Math.round((parallax_dist * percentScrolled) * parallaxSpeed(speed));

          if (initial) {
            $img.css('display', 'block');
          }

          if (_canvas) {
            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
              $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
            }
          } else {
            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
              $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
            }
          }
        }

        var callFunc = updateParallax;
        callFunc(true);
        //@TODO: Fix weird canvas jump on resizing

        $this.children("img").one("load", function () {
          updateParallax(true);
        }).each(function () {
          if (this.complete) $(this).trigger("load");
        });

        updateParallax(true);

        $(window).scroll(function () {
          window_width = $(window).width();
          updateParallax(false);
        });

        $(window).resize(function () {
          window_width = $(window).width();
          updateParallax(false);
        });

      });

  };
}(jQuery));

console.log("Materialize Mods loaded");
