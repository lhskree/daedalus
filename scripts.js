var json = "";

$( document ).ready( function () {
    var $interpret = $( '.interpretation' );
    
    $( '.submit' ).click( function (evt) {
        json = $( 'textarea' ).val();
        evt.preventDefault();
        
        try {
            json = JSON.parse(json);
            
            // If no error
            var currentDepth = 1;
            
            interpretJSON = function (obj, depth) {
                var depth = depth;
                
                for (var i in obj) {
                    
                    // If you've reached something that isn't an array or object, append the value
                    if (typeof obj[i] !== 'object') {
                        $interpret.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                                  i + ': contains "' + obj[i] + '"' +
                                  '</p></div>');   
                    }
                    
                    // If you reach another object
                    else {
                        $interpret.append('<div class="data ' + typeof obj[i] + ' depth-' + depth + '"><p>' +
                                  i + ': contains "' + typeof obj[i] + '"' +
                                  '</p></div>');
                        interpretJSON(obj[i], depth+1);
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