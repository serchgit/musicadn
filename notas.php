
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
      <div class="cont-tabla-notas px-2">
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
      <div class="cont-canto-notas bg-dark p-2">
        <button class="btn btn-secondary btn-sm btn-maximizar"><i class="fa fa-arrow-left"></i></button>
        <h4 class="titulo text-warning text-center">La casa de Dios</h4>
        <div class="intro text-white border-top border-bottom border-info">
          <small>Intro</small>
          <p class="text-info fw-bold text-center mb-0 pb-2">
            D &emsp;&emsp; A&emsp;&emsp; Bm &emsp;&emsp; A &emsp;&emsp; | &emsp;&emsp;
            D &emsp;&emsp; A &emsp;&emsp; G
          </p>
        </div>
        <div class="estrofa text-white mt-4">
          <p>Me<span>D</span>jor es un d<span>A</span>ía en la <span>Bm</span>casa de Di<span>G</span>os &emsp;&emsp; Que mil años lejos de El.</p>
          <p>Prefiero un rincón en la casa de Dios &emsp;&emsp; Que todo el palacio de un rey</p>
          <p>Que todo el palacio de un rey</p>

          <p class="mt-5">Ven conmigo a la casa de Dios &emsp;&emsp; Celebraremos juntos su amor</p>
          <p>Haremos Fiesta en honor de aquel que nos amó.</p>
          <p>Estando aquí en la casa de Dios &emsp;&emsp; Alegraremos su corazón</p>
          <p>Le brindaremos ofrendas de obediencia y amor &emsp;&emsp; En la casa de Dios</p>

          <p class="mt-5">Arde mi alma, arde de amor &emsp;&emsp; Por aquel que me dio la vida</p>
          <p>Por eso le anhela mi corazón &emsp;&emsp; Anhela de su compañía &emsp;&emsp; Anhela de su compañía</p>
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
  <script src="js/funcionesNotas.js"></script>
  <script>
    
    $(document).ready(function() {
      $("nav li a[href='notas.php']").addClass('active');
    });

  </script>
</body>

</html>
