<?php
    //Seriously, CORS is a bitch.
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    $url = "https://www.woningnetregioutrecht.nl/webapi/verantwoording/verantwoordingv2?vanaf=13-10-2019";
    $params = "?vanaf=04-06-2019";
    //Get this specific URL (with empty currentPage) so it barfs up all the data for my specific needs
    echo file_get_contents($url.$params);
?>
