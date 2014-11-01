var json = ""; 

$( document ).ready( function () {
    var $interpret = $( '.interpretation' );
    var $linter = $( '.jsonLin' );
    var $errMsg = $( '.errInvalidJSON');
    
    $( '.submit' ).click( function (evt) {
        json = $( 'textarea' ).val();
        evt.preventDefault();
        
        try {
            json = JSON.parse(json);
            
            // If no error
            var currentDepth = 1;
            
            var interpretJSON = function (obj, depth) {

                for (var i in obj) {

                    // If you've reached something that isn't an array or object, append the value
                    if (typeof obj[i] !== 'object') {
                        $interpret.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                              i + ' => "' + obj[i] + '"' +
                              '</p></div>');   
                    }

                    // If you reach another object
                    else {
                        if (obj[i] === 'null') {
                              $interpret.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                                  i + '=> "null"' +
                                  '</p></div>');         
                        }
                        else if (obj[i] instanceof Array) {
                            $interpret.append('<div class="data array depth-' + depth + '"><p>' +
                                  i + ' => "array"' +
                                  '</p></div>');
                            interpretJSON(obj[i], depth+1);            
                        }
                        else {
                            $interpret.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                                  i + ' => "' + typeof obj[i] + '"' +
                                  '</p></div>');
                            interpretJSON(obj[i], depth+1);
                        } 
                        
                    }
                }
            };
            
            interpretJSON(json, currentDepth);
        }
        catch (err) {
            console.log(err);   
        }
    });
    
    
}); // End .ready()