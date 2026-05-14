
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
      <div class="lista-dia-notas">

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
      <div class="modal-header pb-0">
        <section class="metronome-container w-100 bg-dark mb-0">
          <div class="counter pt-2 pb-0 counter-cantos"></div>
          
          <i class="fa fa-cog options-btn options-btn-notas"></i>

          <div class="controls d-flex align-items-center justify-content-between py-2">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary btn-sm border-0 bpm-minus"><i class="fa fa-minus bpm-minus"></i></button>
                <input type="text" value="120" class="bpm-input" />
              <button type="button" class="btn btn-secondary btn-sm border-0 bpm-plus"><i class="fa fa-plus bpm-plus"></i></button>
            </div>
            <label>
              Beat: <input type="text" value="4" class="ts-top ms-1" id="ts-top" /></label>

            <button class="btn play-btn">Play</button>
            
            <div class="cont-controls">
              <input type="checkbox" id="timer-check" />
              <label for="timer-check"></label>
              
              Timer: <input type="text" value="60" class="timer ms-1" />
            </div>

            <!--<button class="btn btn-secondary tap-btn">Tap</button>-->
          </div>
          <div class="options options-notas">
            <i class="fa fa-caret-down up"></i>
            <label>Off Beat Pitch: <input type="range" min="0" max="500" value="250" class="beat-range" /></label>
            <label>Accent Pitch: <input type="range" min="0" max="500" value="420" class="accent-range" /></label>
          </div>
        </section>
        <button type="button" class="btn-close btn-close-notas" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body pt-0">
        <h5 class="modal-title text-warning titulo text-center py-2" id="staticBackdropLabel">Modal title</h5>
        <div class="alert alert-warning py-2 text-center sticky-top m-auto d-none" role="alert">
          <label class="mx-3 tituloNotas">Secuencia</label>
          <button class="btn btn-sm btn-success"><i class="fa fa-play"></i></button>
          <i class="fa fa-volume-up px-2">
            <input type="range" id="volumenNotas" min="0" max="1" step="0.01" value="0.4">
          </i>
        </div>
        <section class="letraCanto d-flex flex-wrap justify-content-center" id="letraCanto">
<pre class="instrumental col-12 mt-3 pb-2">
Cm       Bb - G#     Fm
</pre>
<div class="col-12 col-lg-11 text-white d-flex flex-wrap">
<pre class="col-12 col-lg-5">
     Cm
El camino del Señor es perfecto
</pre>
<pre class="col-12 col-lg-5">
La palabra del Señor es poder
</pre>
<pre class="col-12 col-lg-6">
Es el arma y escudo de todos los que en él confían

</pre>
<pre class="col-12 col-lg-5">
Cristo es mi fortaleza, es mi escudo
</pre>
<pre class="col-12 col-lg-5">
Con el paso en medio de un batallón
</pre>
<pre class="col-12 col-lg-5">
El adiestra mis manos, me prepara para pelear
</pre>
        
        </section>
      </div>
      <div class="modal-footer d-none">
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
