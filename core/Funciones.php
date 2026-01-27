<?php
include_once 'config.php';
class Funciones {

	private $urlLC = URL_LC;

	public function WS_LC($method,$data){
		$data_string = json_encode($data,JSON_UNESCAPED_UNICODE);
		//echo $data_string;
		$url = $this->urlLC."/$method";
		
		$ch = curl_init($url);
		
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


		curl_setopt($ch, CURLOPT_HTTPHEADER, [
			'Content-Type: application/json'
		]);

		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}
	
	public function CURL($servicio, $data, $_IP = '', $_PORT = '', $_SRV = 'auth') {
		
		$data_string = json_encode($data,JSON_UNESCAPED_UNICODE);
		#echo $data_string;
		$url = 'http://'.($_IP != '' ? $_IP : IP).':'.($_PORT != '' ? $_PORT : PORT)."/db/$_SRV/$servicio";
		// echo $url;die();
		// if($_SRV == 'SRV') echo $url;die();
		$ch = curl_init($url);
		// echo "https://".IP.":".PORT."/db/BAN/$servicio";
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		// curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);


		curl_setopt($ch, CURLOPT_HTTPHEADER, [
			'Content-Type: application/json',
			'Content-Length: ' . strlen($data_string)
		]);
		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}


	function getIdCRM ($_idUer) {
		$id_USER=str_pad($_idUer, 5, "0", STR_PAD_LEFT);
		$milisegundos=str_pad(substr(microtime(FALSE), 2, 3), 3, "0", STR_PAD_LEFT);
		$idCRM= date("ymdHis").$milisegundos.'_CRM_'.$id_USER;
		return $idCRM;
	}


	private function _formatoConsulta($nss,$tipo=0){
		$fecha=date("d-m-Y H:i:s");
		$fechas=explode(" ",$fecha);
		$date=$fechas[0];
		$time=$fechas[1];
		$fecha=explode("-",$date);
		$hora=explode(":",$time);
		$folio = $nss.VERSION.$hora[0].'00'.$fecha[0].$hora[1].$fecha[1];
		$folio=base64_encode($folio).USUARIO;
		if($tipo==0){
		  $consulta="{Nss:'".$nss."', Folio: '".$folio."'}";
		}else{
		  $consulta="{Nss:'".$nss."', Tipo: '".$tipo."', Folio: '".$folio."'}";
		}
	
		#printf($consulta);
		return base64_encode($consulta);
	}

	public function _esVigente($nss){
		$consulta= $this->_formatoConsulta($nss);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, URL.'/OSB_CMD_Rest3/service/esvigente/'.$consulta);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
		$response = curl_exec($ch);
		curl_close($ch);
		return $response;
	}

	public function validarCURPRenapoNubarium($data) {
		$data_string = json_encode($data,JSON_UNESCAPED_UNICODE);
		
		$url = URL_API_CURP_NUBARIUM;
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, USER_NUBARIUM.':'.PASSWORD_NUBARIUM);
		
		curl_setopt($ch, CURLOPT_HTTPHEADER, [
			'Content-Type: application/json'
		]);
		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}


	public function validarCURPRenapoMarket($data) {		
		$url = URL_API_CURP_MARKET."curp=$data";
		// echo $url;die();
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, []);		
		curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer '.API_KEY_MARKET]);
		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}

	public function nombreArchivo($nombre){
		setlocale(LC_CTYPE, "es_MX.UTF-8");
		$nuevoNombre = '';

		$nuevoNombre = str_replace(['ñ', 'Ñ', '@'], ['ni', 'NI', 'a'], $nombre);

		$nuevoNombre = iconv('UTF-8', 'ASCII//TRANSLIT', $nuevoNombre);

		//echo $nuevoNombre;die();

		//$nuevoNombre = preg_replace('/\s+/', ' ', $nuevoNombre); # 1 Nombre con _ en vez de espacios en blanco
		$nuevoNombre = preg_replace('/_+/', '_', $nuevoNombre);
		//$nuevoNombre = str_replace(' ', '_', $nuevoNombre);      # 1 Nombre con _ en vez de espacios en blanco
		//$nuevoNombre = preg_replace('/_+/', '_', $nuevoNombre);  # 1 Nombre con _ en vez de espacios en blanco
		$nuevoNombre = preg_replace('([^A-Za-z0-9\-\_\.\s\(\)])', '', $nuevoNombre);
		//$nuevoNombre = preg_replace('/_+/', '_', $nuevoNombre);  # 1 Nombre con _ en vez de espacios en blanco
		$nuevoNombre = preg_replace('/\s+/', ' ', $nuevoNombre);   # 2 Nombre de archivo puede aceptar espacios

		return $nuevoNombre;
	}

		
	// public function sendMail($email, $idTarea, $idInteraccion) {
	// 	include_once 'app/lib/PHPMailer/PHPMailerAutoload.php';
	// 	//$email = $_POST['email'] ?? false;
	// 	//echo $email;die();
	// 	$nombre=date("Y-m-d");
	// 	if($email && trim($email)) {
	// 		$respuesta = false;
	// 		$date = date("Y-m-d");
	// 		$ayer = date("Y-m-d", strtotime("-1 day", strtotime($date)));

	// 		$asuntoNew="Información AMEX.";
	// 		//require 'lib/Mailer.php';
	// 		$mail = new PHPMailer;


	// 		$mail->isSMTP();
	// 		$mail->CharSet = 'UTF-8';
	// 		$mail->Host = 'mail.eficasiacentrodecontacto.mx';
	// 		$mail->SMTPDebug = 0;
	// 		$mail->SMTPAuth = false;
	// 		$mail->SMTPAutoTLS = false;
	// 		$mail->SMTPSecure = false;
	// 		$mail->Username = 'beneficiosamex@eficasiacentrodecontacto.mx';
	// 		$mail->Password = 'eqd……';
	// 		// $mail->SMTPSecure = 'nottls';
	// 		$mail->Port = 25;

	// 		$mail->SetFrom('beneficiosamex@eficasiacentrodecontacto.mx', 'beneficiosamex@eficasiacentrodecontacto.mx');
	// 		$mail->addAddress($email);
	// 		// $mail->AddBCC("jose.estrada@eficasia.com");//Copia oculta

	// 		$template=file_get_contents('../app/lib/template/AMEX.html');


	// 		$mail->isHTML(true);

	// 		$mail->Subject = $asuntoNew;
	// 		$mail->Body	= $template;

	// 		// $mail->AddEmbeddedImage('../app/lib/template/images/logoEfectivale.png', 'logoEfectivale');
	// 		$mail->AddEmbeddedImage('../app/lib/template/Attachment/Carta-Propuesta de Afiliación 2020.jpg', 'AMX');
	// 		$mail->AddAttachment('../app/lib/template/Attachment/Carta-Propuesta de Afiliación 2020.pdf');
		

	// 		//$mail->AltBody = '<small>Correo enviado correctamente</small>';

	// 		if(!$mail->send()) {
	// 			// echo "<pre>";
	// 			// print_r($mail->ErrorInfo);
	// 			// echo "</pre>";
				
				
	// 			//error_log("Correo no enviado: ".$email." - idInteraccion: ".$idInteraccion.' - Error: '.$mail->ErrorInfo, 3, './error_log_correo/'.$nombre.".log");
	// 			$respuesta = 0;
	// 		} else {
	// 			$respuesta = 1;
	// 		}
	// 	} else {
	// 		//error_log("Correo no existente - idInteraccion: ".$idInteraccion, 3, './error_log_correo/'.$nombre.".log");
	// 		$respuesta = 0;
	// 	}

	// 	return $respuesta;
	// }

	public function array_to_csv_download($array, $fileName, $delimiter="|") {
		// header('Content-Type: application/csv');
		// header('Content-Disposition: attachment; filename="'.$filename.'";');
		$f = fopen("../archivos/$fileName", 'w');
		// $f = fopen('php://output', 'w');
		fputcsv($f, array_keys($array[0]), $delimiter);
	
		foreach ($array as $line => $value) {
			fputcsv($f, array_map("utf8_decode",str_replace("\n"," ",$value)), $delimiter);
			// fputcsv($f, $value, $delimiter);
		}

		fclose($f);
	}
}
