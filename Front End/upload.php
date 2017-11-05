<?php

if($_FILES['file']['name'] != '')
{
    $test = explode(".", $_FILES["file"]["name"]); 
    $extension = end($test);
    $name = rand(100,999) . '.' . $extension;
    $location = "/".'img'.'/' . $name;
    $result = stripslashes($location);
    move_uploaded_file($_FILES["file"]["tmp_name"], $result);

    $arr = [];

    $arr['location'] = $location;
    $arr['name'] = $name;

    echo json_encode($arr);
    
}