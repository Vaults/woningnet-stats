<?php
    //Seriously, CORS is a bitch.
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    echo file_get_contents("https://www.woningnetregioutrecht.nl/webapi/verantwoording/verantwoording/?Periode=4&DirectBemiddeling=false&Plaatsen%5B%5D=177&Plaatsen%5B%5D=176&Plaatsen%5B%5D=340&Plaatsen%5B%5D=460&Plaatsen%5B%5D=782&Plaatsen%5B%5D=1162&Plaatsen%5B%5D=1754&Plaatsen%5B%5D=1794&Plaatsen%5B%5D=2034&Soorten%5B%5D=G&Soorten%5B%5D=J&Soorten%5B%5D=HT&Soorten%5B%5D=N&Paging%5BCurrentPage%5D=");
?>
