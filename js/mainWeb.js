$( document ).ready( onReadyDocument );
$( window ).resize( onResizeWindow );

function onReadyDocument() {
  setUpParallax();
  setUpTabs();
}

function onResizeWindow() {
  setUpParallax();
}

function setUpTabs() {
  $( 'ul.tabs' ).tabs();
}

/*
  The images with a parallax effect should have a ratio bigger than 3/2 more or
  less since the parallax window is 3/1
*/
function setUpParallax() {
  $( ".parallax" ).parallax( 115 ); //We can change this value to change the parallax speed

  var w_heigth = $( window ).height();
  var w_width = $( window ).width();

  $( ".parallax-container" ).height( w_width / 3 );
}
