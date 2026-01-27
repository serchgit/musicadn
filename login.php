<?php
session_start();
error_reporting(E_ALL);

if(isset($_SESSION['PRB']['idUsuario'])){
  header("Location: index.php");
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Inicio de Sesión | Pruebas Web Service </title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/toastr.min.css">
    <link rel="stylesheet" type="text/css" href="css/estilos.css">
    <!--Estilos en Css -->
    <body>
      <section class="log-body d-flex align-items-center justify-content-center">
          <div class="login col-lg-3 col-md-5 col-sm-6 py-4 px-3 rounded">
            <div class="fondo-form text-white">
              <div class="cont-tit">
                <div class="textLogin mt-3 mb-4">
                  <p class="display-4">Pruebas</p>
                </div>
              </div>
              <form action="" class="" id="form1" autocomplete="off">
                  <div class="usuario mb-4">
                    <label class="" for="username"><i class="fa fa-user"></i> Usuario:</label>
                    <input type="text" class="form-control" name="username" id="username" required>
                  </div>
                  <div class="pass">
                    <label class="" for="password"> <i class="fa fa-key"></i> Contraseña:</label>
                    <input type="password" class="form-control" name="password" id="password" required>
                  </div>
                  <div class="cont-boton text-center mt-4">
                    <button type="submit" class="btn btn-secondary btn-rh">Ingresar</button>
                  </div>
              </form>
            </div>
          </div>
      </section>
    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/tether.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/toastr.min.js"></script>
     <script>
      $(document).ready(function() {
    
      $('#form1').submit(function(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        fetch('core/login.php', {
            method: "POST",
            body: formData
          })
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            if (data.response[0].code == 1) {
              location.href = './index.php';
            }else{
              toastr.warning(data.response[0].error, "<h5><i class='fa fa-ban'></i> Login</h5>")
            }
          })
          .catch(e => {
            console.log("Error en => ", e);
          });

      });
    });
    </script>
  </body>
</html>
