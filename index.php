
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
  <link rel="stylesheet" href="css/metronomo.css">
  <link rel="stylesheet" href="css/misEstilos.css">
  <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/toastr.min.css">
  
</head>
<style>
  
</style>

<body>
  <?php require_once("header.php");?>

<audio src="click.wav" crossorigin="anonymous" id="click" type="audio/wav"></audio>

  <div class="container sticky-top">
    <section class="metronome-container w-100 bg-dark m-0 mt-2">
      <div class="counter pt-3 pb-0"></div>
      
      <i class="fa fa-cog options-btn"></i>

      <div class="controls d-flex align-items-center justify-content-between">
        <label>BPM: <span class="ms-1">
                      <i class="fa fa-minus bpm-minus"></i>
                      <input type="text" value="120" class="bpm-input" />
                      <i class="fa fa-plus bpm-plus"></i>
                    </span>
        </label>
        <label>
          Beat: <input type="text" value="4" class="ts-top ms-1" id="ts-top" /></label>
        <div class="cont-controls">
          <input type="checkbox" id="timer-check" />
          <label for="timer-check"></label>
          
          Timer: <input type="text" value="60" class="timer ms-1" />
        </div>

        <button class="tap-btn">Tap</button>
        <button class="play-btn">Play</button>
      </div>
      
      <div class="options">
        <i class="fa fa-caret-down up"></i>
        <label>Off Beat Pitch: <input type="range" min="0" max="500" value="250" class="beat-range" /></label>
        <label>Accent Pitch: <input type="range" min="0" max="500" value="420" class="accent-range" /></label>
      </div>
    </section>
    <div class="cont-reproduciendo text-center">
        <div class="collapse" id="reproduciendo">
          <div class="alert alert-info rounded-0 d-flex justify-content-center align-items-center" role="alert">
            <p class="mb-0">Reproduciendo Secuencia: <span class="tit-playing"><b>Nombre Secuencia</b></span></p>
            <button class="btn-reproduciendo btn btn-sm btn-danger ms-3" title="Detener Secuencia"><i class="fa fa-stop"></i></button>
          </div>
        </div>
    </div>
  </div>
 

  <section class="container bienvenida bg-light my-3 p-2">
     
    <h2 class="verde mb-2 text-center text-muted">Lista de Tiempos y Secuencias</h2>
    <hr>
    <div class="d-flex flex-wrap">
      <input type="hidden" id="Secuencia" value="0">
      <div class="cont-tabla col-12 col-lg-6 px-2">
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
      <div class="cont-listaDia col-12 col-lg-6 px-2 mt-md-5 mt-lg-0">
        <h4 class="text-center mb-3 text-muted">Lista del día</h4>
        <table class="table listaDia" id="ListaDia">
            <!--<thead>
              <th class="col-9">TÍTULO</th>
              <th class="col-3 text-center">TIEMPO</th>
            </thead>-->
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
  <script src="js/lista.js"></script>
  <script src="js/funciones.js"></script>
  <script src="js/metronomo.js"></script>
  <script>
    
    $(document).ready(function() {
      $("nav li a[href='index.php']").addClass('active');
    });

  </script>
</body>

</html>
