$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

    
Lista.forEach(function (ele, index, array){
    
      var fila ="<tr data-index="+index+"><td data-bs-toggle='modal' data-bs-target='#modalCanto'>"+ele.Titulo+"</td><td class='text-center text-danger tiempo' data-size='"+ele.Size+"'>"+ele.Tiempo+"</td>";
    if(ele.Secuencia === undefined){
        fila+=`<td class="text-center"> - </td>`;
    }else{

        if (Array.isArray(ele.Secuencia)) {
            fila+=`<td class="text-center d-flex align-items-center secu" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}">
                    <button class="btn btn-sm btn-dark play me-1" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}"><i class="fa fa-play"></i></button>
                    <button class="btn btn-sm btn-dark stop d-none" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                        <input type="range" id="volumenListG${index}" min="0" max="1" step="0.01" value="0.4">
                        <span class="badge bg-danger mt-2 w-75">${ele.Secuencia[0].Descripcion}</span>
                        </i>
                    <div class="dropdown" data-toggle='tooltip' data-bs-placement='top' title='Tipo de Secuencia'>
                      <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdown${index}" data-bs-toggle="dropdown" aria-expanded="false">
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdown${index}">`;
                        ele.Secuencia.forEach(function (sec,index){
                            //console.log(sec)
                            var option  = "<li class='dropdown-item' data-archivo='"+sec.Archivo+"'>"+sec.Descripcion+"</li>";
                            fila += option;

                        })
                    fila += `</ul></td>`;
        }else{
            fila+=`<td class="text-center d-flex align-items-center secu" data-secuencia="${ele.Secuencia}" data-index="${index}">
                        <button class="btn btn-sm btn-dark play me-1" data-secuencia="${ele.Secuencia}" data-index="${index}"><i class="fa fa-play"></i></button>
                        <button class="btn btn-sm btn-dark stop d-none" data-secuencia="${ele.Secuencia}" data-index="${index}" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                        <input type="range" id="volumenListG${index}" min="0" max="1" step="0.01" value="0.4">
                        </i>
                    </td>`;
        }
    }
    fila+="</tr>";
      $(".tabla-notas tbody").append(fila);
    });
cambiarSecuencia(".tabla-notas tr td:last-child ul li")
$(".tabla-notas").dataTable({  
        dom: 'Bfrtip',
        language :{'url':'js/Spanish.json'}
        // paging:false,
        // searching: false,
        // ordering: false,
        // info:false,
        //buttons: [
        //  {
            //extend: 'excelHtml5',
            //title: '',
            //filename: `Reporte ${nameFile}`,
            //className: 'btn btn-success',
            //text:'Descargar Reporte <i class="fa fa-file-excel-o"></i>',
            //titleAttr: 'Excel'
        //  },
          //{ extend: 'copyHtml5', text: 'Copiar', title: ''}
        //]
      });
var playListaG = $(".tabla-notas tbody tr td:last-child button.play");

botonPlay(playListaG,"volumenListG")

function botonPlay(boton,input){
    $(boton).click(function(event) {
        var titulo = $(this).parents("tr").children('td:first-child').text()
        var boton = $(this);
        var archivo = boton.attr("data-secuencia");
        var tipoSecu = boton.attr("data-tipoSec");
        var index = $(this).attr("data-index");

            let play = $("#Secuencia").val();
        //console.log(titulo)
        if (boton.hasClass("play")) {

            if (play == "0") {
                $("#Secuencia").val("1")
                const miAudio = new Audio('msc/'+archivo);

                $(".tit-playing").html("<b>"+titulo+"</b>");
                if (tipoSecu == undefined) {
                    $(".tipo-Secuencia").html("");
                }else{
                    $(".tipo-Secuencia").html("<span class='badge bg-info ms-3'>"+tipoSecu+"</span>");
                }
                $(".btn-cont-playing").click()

                miAudio.play()
                miAudio.volume = 0.4;

                $(".cont-reproduciendo .collapse").addClass('show')

                $(this).siblings("button.stop").removeClass('d-none').click(function(event) {
                    miAudio.pause()
                    $(this).addClass('d-none')
                    $("#Secuencia").val("0")
                });

                $(".btn-reproduciendo").click(function(event) {
                    miAudio.pause()
                    $("button.stop").addClass('d-none')
                    $("#Secuencia").val("0")
                });

                var volumenSlider = document.getElementById(input+index);
                // Evento para cuando cambia el valor del slider
                    volumenSlider.addEventListener('input', function() {
                        miAudio.volume = this.value;
                    });

                miAudio.onended = function(){
                    $("button.stop").addClass('d-none')
                    $("#Secuencia").val("0")
                }
            }else{
                //console.log("ya se esta repruduciendo audio");
                if (document.getElementById('toast-container')) {

                }else{
                    toastr.warning("Ya se esta repruduciendo una Secuencia!","Secuencias:")

                }
            }

            

        }

    });

}

function cambiarSecuencia(li,botones){
    $(li).click(function(event) {
        let tipoSec = $(this).text();
        let archivo = $(this).attr("data-archivo");
        console.log(archivo)
        let divPadre = $(this).closest('div.dropdown');
        let btns = $(divPadre).siblings('button');
        $(divPadre).siblings('i').children("span").text(tipoSec);
        $(btns).attr({
            "data-secuencia": archivo,
            "data-tipoSec": tipoSec
        });
    });
}

var myModal = new bootstrap.Modal(document.getElementById('modalCanto'), {
  keyboard: false
})

myModal.show()

$(".tabla-notas tbody tr td:first-child").click(function(event) {
  let titulo = $(this).text();
  let index = $(this).parent("tr").attr("data-index");
  let bpm = parseInt($(this).siblings("td.tiempo").text());
  let size = parseInt($(this).siblings("td.tiempo").attr("data-size"));
  let sec = $(this).siblings('td.secu').html();
  let _counter = $(".counter");
  console.log(sec)
  $(".titulo").html(titulo);
  $(".bpm-input").val(bpm);
  $("#ts-top").val(size);

  if (sec == undefined) {
    //console.log("sin secuencia")
    $("#modalCanto .modal-body .alert").addClass("d-none");
  }else{
    $("#modalCanto .modal-body .alert").removeClass("d-none").html(sec);
    cambiarSecuencia(".alert div.dropdown ul li")
  }
    _counter.html("");

          for(var i = 0; i < parseInt($(".ts-top").val(), 10); i++)
          {
            var temp = document.createElement("div");
            temp.className = "dot";

            if(i === 0)
              temp.className += " active";

            _counter.append( temp );
          }
    $(".alert i input").attr("id","volumenNotas"+index)
    let playAl = $(".alert button.play");

    botonPlay(playAl,"volumenNotas")

    fetch("cantos/canto"+index+".html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("letraCanto").innerHTML = data;
        cambiarTono();
      });
});

function cambiarTono(){
    $("#letraCanto .tonos button").click(function(event) {
       let tono = $(this).text();
       console.log(tono)
       $('[data-tono]').addClass("d-none");
       $(".tonos button").removeClass('active');
       $('[data-tono="'+tono+'"]').removeClass("d-none");
       $(this).addClass('active');
    });
}
cambiarTono();