
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
  <link rel="stylesheet" href="css/metronomo.css">
  
</head>
<style>
  .dataTables_info, .dataTables_paginate{display: none;}
</style>

<body>
<?php require_once("header.php");?>
    
  <section class="container bienvenida bg-light mt-3 p-2">
    <hr>
    <div class="d-flex flex-wrap">
      <div class="cont-tabla-notas px-2 col-12 col-lg-6">
        <input type="hidden" id="Secuencia" name="" value="0">
          <table class="table table-striped tabla-notas">
            <thead>
              <th class="">TÍTULO</th>
              <th class="">TEMPO</th>
              <th class="">SECUENCIA</th>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      <div class="cont-canto-notas bg-dark pt-2 col-12 col-lg-6">
        <h3 class="titulo text-warning text-center">La casa de Dios</h3>
        <div class="cont-secu alert-warning d-flex align-items-center justify-content-center py-2 mb-2">
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-primary" id="bipNotas">123</button>
            <label class="mx-3 tituloNotas">Secuencia</label>
            <button class="btn btn-sm btn-success"><i class="fa fa-play"></i></button>
            <i class="fa fa-volume-up px-2">
              <input type="range" id="volumenNotas" min="0" max="1" step="0.01" value="0.4">
            </i>
          </div>
        </div>
        <div class="canto">
          <div class="intro text-white border-top border-bottom border-info text-center">
            <small class="text-success">Intro</small>
            <p class="fw-bold text-center mb-0 pb-2">
              D &emsp;&emsp; A&emsp;&emsp; Bm &emsp;&emsp; A &emsp;&emsp; | &emsp;&emsp;
              D &emsp;&emsp; A &emsp;&emsp; G
            </p>
          </div>
          <div class="estrofa text-white mt-4 px-3">
            <p>Mej<b>D</b>or es un d<b>A</b>ía en la <b>Bm</b>casa de D<b>G</b>ios</p>
            <p>Pref<b>D</b>iero un rinc<b>A</b>ón en la <b>Bm</b>casa de Di<b>G</b>os</p>
            <p>Que <b>D</b>todo el pa<b>A</b>lacio de un r<b>Bm</b>ey, &emsp;&emsp;<b>G</b></p>
            <p>Que t<b>D</b>odo el pa<b>A</b>lacio de un r<b>G</b>ey</p>
            
            <p class="mt-5">Ven conm<b>D</b>igo a la casa de Di<b>A</b>os</p>
            <p>Celebr<b>Bm</b>aremos juntos su am<b>G</b>or</p>
            <p>Haremos fi<b>D</b>esta en honor de aqu<b>A</b>el que nos am<b>G</b>o</p>
            <p>Estando aqu<b>D</b>i en la casa de Di<b>A</b>os</p>
            <p>Alegra<b>Bm</b>remos juntos su am<b>G</b>or</p>
            <p>Le brinda<b>D</b>remos ofrenda de o<b>A</b>bediencia y am<b>G</b>or</p>
            <p>En la casa de Di<b>D &emsp;&emsp;A &emsp;&emsp;Bm &emsp;&emsp; G</b>os</p>

            <p class="mt-5">A<b>D</b>rde mi <b>A</b>alma, <b>Bm</b>arde de am<b>G</b>or</p>
            <p>P<b>D</b>or aquel que <b>A</b>me dió la v<b>G</b>ida</p>
            <p>Por e<b>D</b>so le anh<b>A</b>ela <b>Bm</b>mi coraz<b>G</b>ón an<b>D</b>hela de <b>A</b>su compa<b>Bm &emsp;&emsp; G</b>ñía</p>
            <p>Anh<b>D</b>ela de <b>A</b>su compañ<b>G</b>ía</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  	
<footer class="d-flex justify-content-center bg-dark py-1 footer">
  <p class="text-white"> - </p>
</footer>

<!-- Modal Canto -->
<div class="modal fade" id="modalCanto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-xl">
    <div class="modal-content bg-dark">
      <div class="modal-header">
        <section class="metronome-container w-100 bg-dark mb-0">
          <div class="counter pt-3 pb-0 counter-cantos"></div>
          
          <i class="fa fa-cog options-btn options-btn-notas"></i>

          <div class="controls d-flex align-items-center justify-content-between py-2">
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

            <button class="btn play-btn">Play</button>
            <button class="btn btn-secondary tap-btn">Tap</button>
          </div>
          <div class="options options-notas">
            <i class="fa fa-caret-down up"></i>
            <label>Off Beat Pitch: <input type="range" min="0" max="500" value="250" class="beat-range" /></label>
            <label>Accent Pitch: <input type="range" min="0" max="500" value="420" class="accent-range" /></label>
          </div>
        </section>
        <button type="button" class="btn-close btn-close-notas" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h5 class="modal-title text-warning titulo text-center" id="staticBackdropLabel">Modal title</h5>
        <div class="alert alert-warning py-2 text-center" role="alert">
          <button class="btn btn-sm btn-primary" id="bipNotas">123</button>
          <label class="mx-3 tituloNotas">Secuencia</label>
          <button class="btn btn-sm btn-success"><i class="fa fa-play"></i></button>
          <i class="fa fa-volume-up px-2">
            <input type="range" id="volumenNotas" min="0" max="1" step="0.01" value="0.4">
          </i>
        </div>
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/dataTables.min.js"></script>
  <script src="js/tether.min.js"></script>
  <script src="js/toastr.min.js"></script>
  <script src="js/lista.js"></script>
  <script src="js/funcionesNotas.js"></script>
  <script src="js/metronomo.js"></script>
  <script>
    
    $(document).ready(function() {
      $("nav li a[href='notas.php']").addClass('active');
    });

  </script>
</body>

</html>
