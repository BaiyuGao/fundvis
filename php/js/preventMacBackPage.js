(function ($) {

  // This code is only valid for Mac
  if (!navigator.userAgent.match(/Macintosh/)) {
    return;
  }

  // Detect browsers
  // http://stackoverflow.com/questions/5899783/detect-safari-using-jquery
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

  // Handle scroll events in Chrome, Safari, and Firefox
  if (is_chrome || is_safari || is_firefox) {

    // TODO: This only prevents scroll when reaching the topmost or leftmost
    // positions of a container. It doesn't handle rightmost or bottom,
    // and Lion scroll can be triggered by scrolling right (or bottom) and then
    // scrolling left without raising your fingers from the scroll position.
    $(window).mousewheel(function (e, d, x, y) {

      var prevent_left, prevent_up;

      // If none of the parents can be scrolled left when we try to scroll left
      prevent_left = x < 0 && !_($(e.target).parents()).detect(function (el) {
        return $(el).scrollLeft() > 0;
      });

      // If none of the parents can be scrolled up when we try to scroll up
      prevent_up = y > 0 && !_($(e.target).parents()).detect(function  (el) {
        return $(el).scrollTop() > 0;
      });

      // Prevent futile scroll, which would trigger the Back/Next page event
      if (prevent_left || prevent_up) {
        e.preventDefault();
      }
    });

  }

}(jQuery));