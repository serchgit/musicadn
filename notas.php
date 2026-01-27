
<!DOCTYPE html>
<html lang="es" class="html">

<head>
  <link rel="shortcut icon" href="" />
  <title>Lista BPS</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/toastr.min.css">
  <link rel="stylesheet" href="css/misEstilos.css">
  <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
  
</head>
<style>
  
</style>

<body>
<?php require_once("header.php");?>
  <section class="container bienvenida bg-light mt-3 p-2">
    <hr>
    <div class="d-flex">
      <div class="cont-tabla col-5 px-2">
          <table class="table table-striped tabla">
            <thead>
              <th class="">TÍTULO</th>
              <th class="text-center">TIEMPO</th>
              <th class="text-center">SECUENCIA</th>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      <div class="col-7 bg-dark p-2">
        <p class="titulo text-warning text-center">Titulo</p>
        <div class="intro">
          
        </div>
        <div class="estrofa">
          
        </div>
      </div>
    </div>
  </section>
  	
<footer class="d-flex justify-content-center bg-dark py-1">
  <p class="text-white"> - </p>
</footer>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/dataTables.min.js"></script>
  <script src="js/tether.min.js"></script>
  <script src="js/toastr.min.js"></script>
  <script src="js/lista.js"></script>
  <script src="js/funciones.js"></script>
  <script>
    
    $(document).ready(function() {
      $("nav li a[href='notas.php']").addClass('active');
    });

  </script>
</body>

</html>
