<?php
session_start();
error_reporting(E_ALL);

if(!isset($_SESSION['PRB']['idUsuario'])){
  header("Location: ./login.php");
}

?>
<!DOCTYPE html>
<html lang="es" class="html">

<head>
  <link rel="shortcut icon" href="" />
  <title>Index Pruebas Admin</title>
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
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><?= $_SESSION['PRB']['User']?></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="index.php">Inicio <i class="fa fa-home"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Formularios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="logout.php">Salir <i class="fa fa-sign-out"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <section class="container bienvenida bg-light mt-3 p-3">
    <form class="d-flex flex-wrap">
      <div class="item-form mb-3 col-2 me-3">
        <label for="numeros" class="form-label px-2">Input sólo números</label>
        <input type="text" class="form-control form-control-sm only-numbers" id="numeros">
      </div>
      <div class="item-form mb-3 col-4">
        <label for="numeros" class="form-label px-2">Input mayúsculas sin acentos</label>
        <input type="text" class="form-control form-control-sm" id="numeros">
      </div>
    </form>
  </section>
  	
<footer class="d-flex justify-content-center">
</footer>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/tether.min.js"></script>
  <script src="js/toastr.min.js"></script>
  <script src="js/funcionesForms.js"></script>
  <script>

    $(document).ready(function() {
    
    });

  </script>
</body>

</html>
