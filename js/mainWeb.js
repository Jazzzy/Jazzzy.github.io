Config = {
  Debug: false,
  ComplexCircles: false
};

$(document).ready(onReadyDocument);
$(window).resize(onResizeWindow);
$(window).resize($.debounce(250, afterResizeWindow));

function onReadyDocument() {
  setUpParallax();
  setUpTabs();
  setUpBanners();

  animateToTop();
}

function animateToTop() {
  $('html, body').animate({
    scrollTop: 200000000
  }, 1);
  $('html, body').animate({
    scrollTop: 0
  }, 2000);
}

function onResizeWindow() {
  setUpBanners();
  setUpParallax();
}

function afterResizeWindow() {}

function setUpTabs() {
  $('ul.tabs').tabs();
}

/*
  The images with a parallax effect should have a ratio bigger than 3/2 more or
  less since the parallax window is 3/1
*/
function setUpParallax() {
  $(".parallax").parallax(130); //We can change this value to change the parallax speed
}
