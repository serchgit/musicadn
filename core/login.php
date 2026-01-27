<?php
include_once "Funciones.php";

$user_agent     =   $_SERVER['HTTP_USER_AGENT'];
$user = $_POST['username'];
$pass = $_POST['password'];

$_SESSION['PRB']['user_os']=getOS();
$_SESSION['PRB']['user_browser']=getBrowser();
$_SESSION['PRB']['ip']=$_SERVER["REMOTE_ADDR"];

$data['PARAMETERS'] = [
    "username" => $_POST['username'],
    "password" => $_POST['password'],
    "action" => "login"
];


$consumo = new Funciones();

$response = $consumo->CURL('sp',$data);

 

// echo "<pre>";
// print_r($response);
// echo "</pre>";
// die();

$result = json_decode($response, true);
// echo "<pre>";
// print_r($result);
// echo "</pre>";
// die();

if( isset($result) && intval($result['response'][0]['code'])==1) {
    // echo "<pre>";
    // print_r($result);
    // echo "</pre>";
    // die();
    $_SESSION['PRB']["Usuario"]      = $user;
    $_SESSION['PRB']["idUsuario"]    = $result['response'][0]['idUsuario'];
    $_SESSION['PRB']["User"]         = $result['response'][0]['user'];

  
    // $_SESSION['GDT']['Bandeja']  = 0;
// }else{
//     //Sesion de prueba
//     $_SESSION['GDT']["Usuario"] = $user;
}


// $response = '{
// 	"result": "OK",
// 	"response": [
// 		{
// 			"Code": 1,
// 			"Login": [
// 				{
// 					"Usuario": [
// 						{
// 							"idUsuario": 2,
// 							"Nombre": "Gerardo Perez Jimenez",
// 							"Usuario": "gperez",
// 							"idPerfil": "1",
// 							"Token": "cb9547aa8a343f16335cfda037cf46ff"
// 						}
// 					]
// 				}
// 			]
// 		}
// 	]
// }';


// $_SESSION['GDT']["idUser"]    = 1;
// $_SESSION['GDT']["Nombre"]    = 'Usuario de Prueba';
// $_SESSION['GDT']["Usuario"]   = 'user_dev';
// $_SESSION['GDT']["idPerfil"]  = 2;

echo $response;




function getOS() {
    global $user_agent;
    $os_platform    =   "Unknown OS Platform";
    $os_array       =   array(
                            '/windows nt 10/i'     =>  'Windows 10',
                            '/windows nt 6.3/i'     =>  'Windows 8.1',
                            '/windows nt 6.2/i'     =>  'Windows 8',
                            '/windows nt 6.1/i'     =>  'Windows 7',
                            '/windows nt 6.0/i'     =>  'Windows Vista',
                            '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                            '/windows nt 5.1/i'     =>  'Windows XP',
                            '/windows xp/i'         =>  'Windows XP',
                            '/windows nt 5.0/i'     =>  'Windows 2000',
                            '/windows me/i'         =>  'Windows ME',
                            '/win98/i'              =>  'Windows 98',
                            '/win95/i'              =>  'Windows 95',
                            '/win16/i'              =>  'Windows 3.11',
                            '/macintosh|mac os x/i' =>  'Mac OS X',
                            '/mac_powerpc/i'        =>  'Mac OS 9',
                            '/linux/i'              =>  'Linux',
                            '/ubuntu/i'             =>  'Ubuntu',
                            '/iphone/i'             =>  'iPhone',
                            '/ipod/i'               =>  'iPod',
                            '/ipad/i'               =>  'iPad',
                            '/android/i'            =>  'Android',
                            '/blackberry/i'         =>  'BlackBerry',
                            '/webos/i'              =>  'Mobile'
                        );

    foreach ($os_array as $regex => $value) {
        if (preg_match($regex, $user_agent)) {
            $os_platform    =   $value;
        }
    }
    return $os_platform;
}

function getBrowser() {
    global $user_agent;
    $browser        =   "Unknown Browser";
    $browser_array  =   array(
                            '/msie/i'       =>  'Internet Explorer',
                            '/firefox/i'    =>  'Firefox',
                            '/safari/i'     =>  'Safari',
                            '/chrome/i'     =>  'Chrome',
                            '/edge/i'       =>  'Edge',
                            '/opera/i'      =>  'Opera',
                            '/netscape/i'   =>  'Netscape',
                            '/maxthon/i'    =>  'Maxthon',
                            '/konqueror/i'  =>  'Konqueror',
                            '/mobile/i'     =>  'Handheld Browser'
                        );
    foreach ($browser_array as $regex => $value) {
        if (preg_match($regex, $user_agent)) {
            $browser    =   $value;
        }
    }
    return $browser;
}
