<?php
session_start();
date_default_timezone_set('America/Mexico_City');
header('Content-Encoding: UTF-8');
header('Content-Type: text/html; charset=utf-8', true);
error_reporting(E_ALL);
ini_set('display_errors', '1');


define('IP','localhost');
define('PORT','8089');

define('URL_LC','http://localhost:8089/db/auth/sp');

?>