
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
    <div class="d-flex flex-wrap">
      <div class="contenedor col-12 col-lg-7 bg-dark p-3" id="contenedor">
        <h4 class="text-info text-center ">Bienaventurados son</h4>
        <p class="text-warning text-center">Bb - No. HV 207</p>
        <p class="estrofa">
          <span>1</span><br>
          Bienaventurados son los de limpio corazón<br>
          Que no aman el tesoro terrenal,<br>
          De tranquilidad y paz gozan cada día más,<br>
          Y del cielo el gozo tienen ya en sí.<br>
        </p>
        <p class="coro">
          <span><i>CORO</i></span><br>
          ¡Oh cantemos aleluya!<br>
          Sí, de todo corazón;<br>
          Por amor al Salvador, a su nombre dad loor,<br>
          Y por siempre cantaremos de su amor.<br>
        </p>
        <p class="estrofa">
          <span>2</span><br>
          Grande dicha y favor me concede mi Señor,<br>
          Por su sangre que vertió por mí en la cruz;<br>
          Soy guardado siempre fiel por la fe que tengo en El,<br>
          Y me regocijo andando en la luz.
        </p>
        <p class="estrofa">
          <span>3</span><br>
          Al Señor obedecer y su Espíritu tener<br>
          Es un verdadero cielo en mi ser<br>
          Y por su inmenso amor hacia el pobre pecador<br>
          Cantaré sus alabanzas mas allá
        </p>
        <p class="estrofa">
          <span>4</span><br>
          Cuan perfecta es mi paz<br>
          No anhelo nada más<br>
          En el mundo que es su luz y su verdad<br>
          Con mi amado salvador poseído de su amor<br>
          Estaré contento por la eternidad.
        </p>
      </div>
      <div class="cont-tabla col-12 col-lg-5 px-2">
          <table class="table table-striped tabla-himnario">
            <thead>
              <th class="">TÍTULO</th>
              <th class="text-center" title="Numero del Himnario de Victoria">No. HV</th>
              <th class="text-center">TONO</th>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
    </div>
  </section>
  	
<footer class="d-flex justify-content-center bg-dark py-1 footer">
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
  <script src="js/listaHimnario.js"></script>
  <script src="js/funcionesHimnario.js"></script>
  <script>
    
    $(document).ready(function() {
      $("nav li a[href='himnos.php']").addClass('active');
    });

  </script>
</body>

</html>
