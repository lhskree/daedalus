var json = "";

$( document ).ready( function () {
    var $i = $( '.interpretation' );
    
    $( '.submit' ).click( function (evt) {
        json = $( 'textarea' ).val();
        evt.preventDefault();
        
        try {
            json = JSON.parse(json);
            
            // If no error
            var depth = 1;
            
            interpretJSON = function (depth) {
                
                
                for (var i in json) {
                    
                    // If you've reached something that isn't an array or object, append the value
                    if (typeof json[i] !== 'object') {
                        $i.append('<div class="data ' + typeof json[i] + ' depth-' + depth + '"><p>' +
                                  i + ': contains "' + json[i] + '"' +
                                  '</p></div>');   
                    }
                    else {
                        //   
                    }
                }
                
                   
            };
            interpretJSON(depth);
        }
        catch (err) {
            console.log(err);   
        }
    });
    
    
}); // End .ready()