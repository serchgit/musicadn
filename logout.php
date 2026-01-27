<?php

include_once "core/Funciones.php";
$_fn = new Funciones();

if (isset($_POST["Usuario"])) {
	$data['PARAMETERS'] = ["action"=>"logout","Usuario"=>$_POST["Usuario"]];
}else{
	$data['PARAMETERS'] = ["Usuario"=>$_SESSION['PRB']["idUsuario"]];
}
$response = $_fn->CURL('sp',$data);
echo $response;

if (!isset($_POST["Usuario"])) {
	unset($_SESSION['PRB']);
	header("Location: ./login.php");
}
