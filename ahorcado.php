
<!DOCTYPE html>
<html lang="es" class="html pb-0">

<head>
  <link rel="shortcut icon" href="" />
  <title>Lista BPS</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="css/toastr.min.css">
  <link rel="stylesheet" href="css/misestilos.css">
  <link rel="stylesheet" href="css/estilosAh.css">
  
</head>
<style>
  .contenedor-letras-secreto{min-height: 65vh;}
  .row{margin-right: 0;margin-left: 0;--bs-gutter-x: 0;}
</style>

<body>
    <div id="principal" class=" bg-white">
        <div class="row justify-content-center titulo-principal text-white text-center">
            <h1 class="h1">Descubriendo el Texto</h1>
        </div>
        <div class="row">
            <div class="container">
                <div class="row justify-content-center">
                </div>
                <div id="palabra" class="row justify-content-center align-items-center contenedor-letras-secreto px-5 m-auto">
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center align-items-center bg-dark flex-wrap">
          <div class="botones my-2 d-flex justify-content-center flex-wrap w-50">
            <div class="w-100" style="position: relative;">
                <div class="container my-2 w-75">
                    <div class="row justify-content-center rounded-top bg-morado text-white">
                        Letras Fallidas
                    </div>
                    <div id="letras_fallidas" class="row align-content-center justify-content-center borde-morado rounded-bottom contenedor-letras">
                    </div>
                </div>
                <div class="errores w-25">
                  
                </div>
            </div>
            <button class="btn btn-lg btn-warning me-2" data-ancho="68">1
              <input type="hidden" name="" id="texto1" value="PEDIS Y NO RECIBIS PORQUE PEDIS MAL">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="75">2
              <input type="hidden" name="" id="texto2" value="DIOS RESISTE A LOS SOBERBIOS Y DA GRACIA A LOS HUMILDES">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="59">3
              <input type="hidden" name="" id="texto3" value="Y AL QUE SABE HACER LO BUENO Y NO LO HACE LE ES PECADO">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="69">4
              <input type="hidden" name="" id="texto4" value="PERO SI TU JUZGAS A LA LEY NO ERES HACEDOR DE LA LEY SINO JUEZ">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="74">5
              <input type="hidden" name="" id="texto5" value="EL ESPIRITU QUE EL HA HECHO MORAR EN NOSOTROS NOS ANHELA CELOSAMENTE">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="76">6
              <input type="hidden" name="" id="texto6" value="NO SABEIS QUE LA AMISTAD CON EL MUNDO ES ENEMISTAD CONTRA DIOS">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="59">7
              <input type="hidden" name="" id="texto7" value="HERMANOS NO MURMUREIS LOS UNOS DE LOS OTROS">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="72">8
              <input type="hidden" name="" id="texto8" value="DEBERIAIS DECIR SI EL SEÑOR QUIERE VIVIREMOS Y HAREMOS ESTO O AQUELLO">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="55">9
              <input type="hidden" name="" id="texto9" value="UNO SOLO ES EL DADOR DE LA LEY QUE PUEDE SALVAR Y PERDER">
            </button>
            <button class="btn btn-lg btn-warning me-2" data-ancho="60">10
              <input type="hidden" name="" id="texto10" value="HUMILLAOS DELANTE DEL SEÑOR Y EL OS EXALTARA">
            </button>
            
          </div>
            <div class="p-2 w-50 d-flex align-items-center">
                <div class="row w-75">
                    <div class="input-group mb-2 d-none">
                        <div class="input-group-prepend">
                            <span class="input-group-text ancho-etiqueta bg-success text-white"
                                id="label_palabra_secreta">Palabra:</span>
                        </div>
                        <input id="palabra_secreta" type="password
                                                          " class="form-control" placeholder="Escribe la palabra secreta y pulsa Iniciar"
                            aria-describedby="label_palabra_secreta">
                        <button id="boton_iniciar" class="btn btn-success ancho-boton">Iniciar</button>
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text ancho-etiqueta bg-primary text-white"
                                id="label_probar_letra">Letra:</span>
                        </div>
                        <input id="probar_letra" type="text" class="form-control" placeholder="Escribe la letra a probar"
                            aria-describedby="label_probar_letra" maxlength="1" minlength="1" disabled>
                        <button id="boton_probar" class="btn btn-primary ancho-boton" disabled>Probar</button>
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text ancho-etiqueta bg-warning" id="label_adivinar">¿Ya
                                sabes?</span>
                        </div>
                        <input id="adivinar" type="text" class="form-control" placeholder="Escribe la palabra que crees que es"
                            aria-describedby="label_adivinar" disabled>
                        <button id="boton_adivinar" class="btn btn-warning ancho-boton" disabled>Adivinar</button>
                    </div>
                </div>
                <div class="row justify-content-center ms-3">
                    <button id="boton_finalizar" class="btn btn-danger ancho-boton align-self-end">Reiniciar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Mensaje Modal -->
    <div class="modal fade" id="mensaje" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger" id="etiqueta_mensaje"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="cuerpo_mensaje" class="modal-body text-center">
                </div>
            </div>
        </div>
    </div>
   
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>


  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.bundle.min.js"></script>
  <script src="js/dataTables.min.js"></script>
  <script src="js/tether.min.js"></script>
  <script src="js/toastr.min.js"></script>
  <script src="js/main.js"></script>
  <script>

  </script>
</body>

</html>
