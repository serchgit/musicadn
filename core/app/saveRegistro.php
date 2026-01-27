<?php 
include '../Funciones.php';
$data["PARAMETERS"] = $_POST;


$consumo    =   new Funciones();
$response   =   $consumo->CURL('SaveRegistro', $data);
echo $response;

 ?>