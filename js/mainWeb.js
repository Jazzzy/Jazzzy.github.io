Config = {
  Debug: false,
  ComplexCircles: false
};

$(document).ready(onReadyDocument);
$(window).resize(onResizeWindow);

function onReadyDocument() {
  setUpParallax();
  setUpTabs();
  setUpBanners();

  window.scrollTo(1, 1);

}

function onResizeWindow() {
  setUpBanners();
  setUpParallax();
}

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
