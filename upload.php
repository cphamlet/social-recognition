<?php

if($_FILES['file']['name'] != '')
{
    $test = explode(".", $_FILES["file"]["name"]); // 
    $extension = end($test);
    $name = rand(100,999); . '.' . $extension;
    $location = '/img' .$name;
    move_uploaded_file($_FILES["file"]["tmp_name"], $location);

    var $arr = [];

    $arr['location'] = $location;
    $arr['name'] = $name;

    echo json_encode($data);
    
}