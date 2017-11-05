$(document).on('change', '#file', function()
{
    var property = document.getElementById("file").files[0]; //Get the file
    var image_name = property.name; //Get the name of the file
    var image_extension = image_name.split(".").pop().toLowerCase();
    if(jQuery.inArray(image_extension, ['gif', 'png', 'jpg', 'jpeg']) == -1) //Check to make sure it's the correct type
    {
        alert("Invalid Image File");
    }

    //Check for image size not over 2 megs
    var image_size = property.size;
    console.log(image_size);
    if(image_size > 20000000) 
    {
        alert("Image File Size is to big");
    }
    else
    {
        console.log(property);
        //Make a formdata object and add the file to it
        var form_data = new FormData();
        form_data.append("file", property);

        $.ajax
        ({
            url: "././upload.php",
            method: "POST",
            data: form_data,
            success:function(data)
            {
                // var info = JSON.parse(data);
                console.log(data);

                //$('.image-placeholder').css("background-image", "url(" + info.name + ")");
            }

            
        })

    }

});