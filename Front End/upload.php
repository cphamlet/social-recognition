<?php

$file = $_FILES;

$arr = [];

$dir = '/img';

$extension = pathinfo($file['file']['name'], PATHINFO_EXTENSION);

move_uploaded_file($_FILES["file"]["tmp_name"], $dir.'.',$extension);

    

$arr['file'] = $file['file'];


echo json_encode($arr);

    
  
    