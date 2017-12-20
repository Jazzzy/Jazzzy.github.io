/* Colors in our pallete that are not black to white */
var base16_colors = ['#f2777a', '#f99157', '#ffcc66', '#99cc99', '#66cccc', '#6699cc', '#cc99cc', '#d27b53'];

function letterAndColor() {


    $("#letter-title").lettering();

    $('#letter-title').children('span').each(function(i) {
        if (i + 1 != $("#letter-title").children().length)
            $(this).css('color', base16_colors[i % base16_colors.length]);
    });

}


function writeHeading() {

    var ended = false;

    /*Console Block*/
    var visible = true;

    var child_elements = $("#letter-title").children();
    var con = child_elements[child_elements.length - 1];
    child_elements = child_elements.slice(0, -1);


    child_elements.each(function(i) {

        child_elements[i].style.display = "none";

    });



    var consoleInterval = window.setInterval(function() {

        if (visible === true) {
            con.style.visibility = "hidden";
            visible = false;

        } else {
            con.style.visibility = "visible";
            visible = true;
            if (ended) {
                //con.style.display = "none";
                //con.style.visibility = "hidden";
                clearInterval(consoleInterval);
                return;
            }

        }
    }, 500);


    window.setTimeout(function() {
        var char_index = 0;

        var writingInterval = window.setInterval(function() {
            child_elements[char_index++].style.display = "inline";
            if (char_index >= child_elements.length) {

                window.setTimeout(function() {
                    ended = true;
                }, 3000);

                clearInterval(writingInterval);
            }
        }, 100);

    }, 2000);

    console.log(child_elements);
}


$(document).ready(letterAndColor);
$(document).ready(writeHeading);