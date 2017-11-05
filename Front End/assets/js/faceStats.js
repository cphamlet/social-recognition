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
        console.log(form_data);

        $.ajax
        ({
            url: "././upload.php",
            method: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            success:function(data)
            {
                var info = JSON.parse(data);
                console.log(info);

                $('.image-placeholder').css("background-image", "url(" + "../../img/" + info['name'] + ")");
                $('.image-placeholder').css("background-position", "center");
                $('.image-placeholder').css("background-size", "cover");
                $('.image-placeholder').css("background-repeat", "no-repeat");
                $('.image-placeholder').addClass("show-preview");



                //Microsoft API

                function processImage() 
                {
                   
                    var subscriptionKey = "98b3730f5ff244f1801cf08274c7106a";

                    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
            
                    // Request parameters.
                    var params = 
                    {
                        "returnFaceId": "true",
                        "returnFaceLandmarks": "false",
                        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
                    };
            
                    // Display the image.
                    var sourceImageUrl = 'http://viridessense.com/img/' + info['name'];
                    
            
                    // Perform the REST API call.
                    $.ajax({
                        url: uriBase + "?" + $.param(params),
            
                        // Request headers.
                        beforeSend: function(xhrObj)
                        {
                            xhrObj.setRequestHeader("Content-Type","application/json");
                            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                        },
            
                        type: "POST",
            
                        // Request body.
                        data: '{"url": ' + '"' + sourceImageUrl + '"}',
                    })
            
                    .done(function(data) 
                    {
                        
                        // Show formatted JSON on webpage.
                        console.log(data[0]);

                        function jsUcfirst(string) 
                        {
                            return string.charAt(0).toUpperCase() + string.slice(1);
                        }



                      
                        $("#sex").text("Gender: " + jsUcfirst(data[0]['faceAttributes'].gender));
                        $("#age").text("Age: " + Math.round(data[0]['faceAttributes'].age));


                        if(data[0]['faceAttributes'].glasses == "NoGlasses")
                        {
                            $("#glasses").text("Glasses: " + 'No Glasses');
                        }
                        else
                        {
                            $("#glasses").text(data[0]['faceAttributes'].glasses);
                        }
                       
                        
                        

                        

                        $(".preview-flex-container").addClass("show-preview");
                    })
            
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        // Display error message.
                        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
                        alert(errorString);
                    });
                };



                processImage();






            }
        })

    }

});