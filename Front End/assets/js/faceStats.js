$(document).on('change', '#file', function()
{
    var property = document.getElementById("file").files[0]; //Get the file
 
    var form_data = new FormData(property[0]);
        $.ajax
        ({
            url: "././upload.php",
            method: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            success:function(data)
            {
                // var info = JSON.parse(data);
                console.log(data);

                //$('.image-placeholder').css("background-image", "url(" + info.name + ")");
            }

            
        })

    }

});