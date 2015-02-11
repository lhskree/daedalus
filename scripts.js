var json = "";

$(document).ready(function() {
  var $interpret = $('.interpretation');
  var $linter = $('.jsonLint');
  var $errMsg = $('.errInvalidJSON');

  $linter.hide();
  $errMsg.hide();

  $('.submit').click(function(evt) {
    json = $('textarea').val();
    evt.preventDefault();

    try {
      json = JSON.parse(json);

      // If no error
      var currentDepth = 1;
      // Hide the error message (if the previous attempt threw an error)
      $errMsg.fadeOut('slow');
      $linter.slideUp('slow');

      var interpretJSON = function(obj, depth, parent) {

        for (var i in obj) {

          // If you've reached something that isn't an array or object, append the value
          if (typeof obj[i] !== 'object') {
            parent.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
              i + ' => "' + obj[i] + '"' +
              '</p></div>');
          }

          // If you reach another object
          else {
            if (obj[i] === null) {
              parent.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                i + '=> "null"' +
                '</p></div>');
            } else if (obj[i] instanceof Array) {
              parent.append('<div class="data array depth-' + depth + '"><p>' +
                i + ' => "array"' +
                '</p></div>');

              // Recursive call
              interpretJSON(obj[i], depth + 1, parent.children('div:last-child'));
            } else {
              parent.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                i + ' => "' + typeof obj[i] + '"' +
                '</p></div>');

              // Recursive call
              interpretJSON(obj[i], depth + 1, parent.children('div:last-child'));
            }
          }
        }
      };

      interpretJSON(json, currentDepth, $interpret);
      // Hide all non-first-level items
      var divs = $('div');
      $interpret.find(divs).each(function(index) {
        if (!$(this).hasClass('depth-1')) {
          $(this).hide();
        }
      });
    }
    // Catch syntax error (invalid JSON)
    catch (err) {
      $errMsg.fadeIn('slow');
      $linter.slideDown('slow');
    }

    // Click handler to display objects
    $('.interpretation p').click(function() {
      if (!$(this).hasClass('shown')) {
        $(this).parent().children().slideDown('slow');
        $(this).addClass('shown');
      } else {
        $(this).parent().find('div').slideUp('slow');
        $(this).removeClass('shown');
      }
    });
  });

  //


}); // End .ready()