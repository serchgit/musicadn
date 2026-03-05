$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

    
Lista.forEach(function (ele, index, array){
    
      var fila ="<tr data-index="+index+"><td data-toggle='tooltip' data-bs-placement='right' title='Agregar'>"+ele.Titulo+"</td><td class='text-center text-danger tiempo'><button class='btn btn-sm btn-primary btn-tempo' data-size='"+ele.Size+"'>"+ele.Tiempo+"</button></td>";
    if(ele.Secuencia === undefined){
        fila+=`<td class="text-center"> - </td>`;
    }else{

        if (Array.isArray(ele.Secuencia)) {
            fila+=`<td class="text-center d-flex align-items-center secu" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}">
                    <button class="btn btn-sm btn-success play me-1" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}"><i class="fa fa-play"></i></button>
                    <button class="btn btn-sm btn-danger stop d-none" data-secuencia="${ele.Secuencia[0].Archivo}" data-index="${index}" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                        <input type="range" id="volumenListG${index}" min="0" max="1" step="0.01" value="0.4">
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
                        <button class="btn btn-sm btn-success play me-1" data-secuencia="${ele.Secuencia}" data-index="${index}"><i class="fa fa-play"></i></button>
                        <button class="btn btn-sm btn-danger stop d-none" data-secuencia="${ele.Secuencia}" data-index="${index}" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                        <input type="range" id="volumenListG${index}" min="0" max="1" step="0.01" value="0.4">
                        </i>
                    </td>`;
        }
    }
    fila+="</tr>";
      $(".tabla tbody").append(fila);
    });

    BtnTempo(".btn-tempo");
    cambiarSecuencia(".tabla tr td:last-child ul li")
    $(".tabla").dataTable({  
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

    //var tablaLista = $(".tabla").DataTable()
    //var valorOculto = tablaLista.row(25).data()[2];
    //var btnOculto = $(valorOculto).children("button.stop").prevObject[2];
    //console.log(btnOculto); 

var playListaG = $(".tabla tbody tr td:last-child button.play");
botonPlay(playListaG,"volumenListG")

let seleccionados = [];

$(".tabla tbody tr td:first-child").click(function(event) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    //var titulo = $(this).text();
    //var tiempo = $(this).siblings("td.tiempo").text();
    //var secuencia = $(this).siblings("td.secu").attr("data-secuencia");
    var index = $(this).closest('tr').attr("data-index");
    //var size = $(this).siblings('td.tiempo').children("button").attr("data-size");
    //console.log(index)
    var item = `<tr data-index="${index}" draggable="true">
                    <td><button class='btn btn-sm btn-outline-danger me-2' data-toggle='tooltip' data-bs-placement='right' title='Quitar de la lista'><i class='fa fa-trash'></i></button>"${Lista[index].Titulo}"</td>
                    <td class="text-danger font-weight-bold"><button class="btn btn-sm btn-primary btn-tempo" data-size="${Lista[index].Size}">${Lista[index].Tiempo}</button></td>`;
    if (Lista[index].Secuencia == undefined) {
        item+= "<td class='text-center'><button class='btn btn-sm'> - </td></tr>";
    }else{
        if (Array.isArray(Lista[index].Secuencia)) {
            item+= `<td data-secuencia="${Lista[index].Secuencia[0].Archivo}" class="text-center d-flex align-items-center">
                        <button class="btn btn-sm btn-success play" data-secuencia="${Lista[index].Secuencia[0].Archivo}" data-index="${index}"><i class="fa fa-play"></i></button>
                        <button class="btn btn-sm btn-danger stop d-none" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                            <input class="ms-1" type="range" id="volumenListD${index}" min="0" max="1" step="0.01" value="0.4">
                        </i>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"data-toggle='tooltip' data-bs-placement='top' title='Tipo de Secuencia'>
                                  </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">`;
                            Lista[index].Secuencia.forEach(function (sec,index){
                                //console.log(sec)
                                var option  = "<li class='dropdown-item' data-archivo='"+sec.Archivo+"'>"+sec.Descripcion+"</li>";
                                item += option;

                            })
            item += `</ul></td></tr>`;
        }else{
            item += `<td data-secuencia="${Lista[index].Secuencia}" class="text-center d-flex align-items-center">
                        <button class="btn btn-sm btn-success play" data-secuencia="${Lista[index].Secuencia}" data-index="${index}"><i class="fa fa-play"></i></button>
                        <button class="btn btn-sm btn-danger stop d-none" style="position:absolute;"><i class="fa fa-stop"></i></button>
                        <i class="fa fa-volume-up px-2">
                            <input class="ms-1" type="range" id="volumenListD${index}" min="0" max="1" step="0.01" value="0.4">
                        </i>`;
        }

    }
    
   $(".listaDia tbody").append(item);
   BtnTempo(".btn-tempo");

    var sel = $(".listaDia tbody tr:last-child");
    //console.log(sel);

        var indexSel = $(sel).attr('data-index');

    if (seleccionados.includes(indexSel)) {
        $(sel).remove();
        toastr.warning("Ya ha sido agregado a la lista")
    }else{
        seleccionados.push(indexSel);
    }
      // console.log(seleccionados)

    $(".listaDia tbody tr td:first-child button").click(function(event) {
        $(".tooltip").removeClass('show')
        var indexlista = $(this).closest('tr').attr('data-index');
        $(this).closest("tr").remove();
        const indice = seleccionados.findIndex(existe => existe === indexSel);
        if(indice !== -1){
            seleccionados.splice(indice,1);
           // console.log(seleccionados)
        }

    });
    var playListaD = $(".listaDia tbody tr td:last-child button.play");
    botonPlay(playListaD, "volumenListD");
    cambiarSecuencia(".listaDia tr td:last-child ul li")
});

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
                }else{
                    $(".tipo-Secuencia").html("<span class='badge bg-info'>"+tipoSecu+"</span>");
                }
                $(".btn-cont-playing").click()

                miAudio.play()
                miAudio.volume = 0.4;

                $(".cont-reproduciendo .collapse").addClass('show')

                $(this).siblings("button.stop").removeClass('d-none').click(function(event) {
                    miAudio.pause()
                    $(this).addClass('d-none')
                    $(".cont-reproduciendo .collapse").removeClass('show');
                    $("#Secuencia").val("0")
                });

                $(".btn-reproduciendo").click(function(event) {
                    miAudio.pause()
                    $("button.stop").addClass('d-none')
                    $(".cont-reproduciendo .collapse").removeClass('show')
                    $("#Secuencia").val("0")
                });

                var volumenSlider = document.getElementById(input+index);
                // Evento para cuando cambia el valor del slider
                    volumenSlider.addEventListener('input', function() {
                        miAudio.volume = this.value;
                    });

                miAudio.onended = function(){
                    $("button.stop").addClass('d-none')
                    $(".cont-reproduciendo .collapse").removeClass('show')
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

function BtnTempo(button){
    $(button).click(function(event) {
        var bps = parseInt($(this).text())
        var size = $(this).attr("data-size");
        var _counter = $(".counter");
        
        $(".ts-top").val(size);
        $(".bpm-input").val(bps);
          _counter.html("");

          for(var i = 0; i < parseInt($(".ts-top").val(), 10); i++)
          {
            var temp = document.createElement("div");
            temp.className = "dot";

            if(i === 0)
              temp.className += " active";

            _counter.append( temp );
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
        $(btns).attr({
            "data-secuencia": archivo,
            "data-tipoSec": tipoSec
        });
    });
}

const tabla = document.getElementById('ListaDia');
    let filaArrastrada = null;

    // Evento al iniciar el arrastre
    tabla.addEventListener('dragstart', (e) => {
        filaArrastrada = e.target;
        e.target.classList.add('dragging');
    });

    // Evento cuando termina el arrastre
    tabla.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });

    // Evento cuando se pasa por encima de un objetivo
    tabla.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necesario para permitir soltar
        const filaDestino = e.target.closest('tr');
        if (filaDestino && filaDestino !== filaArrastrada && filaDestino.parentNode.nodeName === 'TBODY') {
            // Determinar si soltar antes o después
            const rect = filaDestino.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            tabla.querySelector('tbody').insertBefore(filaArrastrada, next ? filaDestino.nextSibling : filaDestino);
        }
    });


    //const miAudio = new Audio('msc/archivo.mp3'); // Ejemplo: 'sonidos/intro.mp3' o 'audio/musica.wav'

    // 2. Obtener los botones
    //const playBtn = document.getElementById('playButton');
    //const pauseBtn = document.getElementById('pauseButton');

    // 3. Añadir event listeners
    //playBtn.addEventListener('click', () => {
    //    miAudio.play(); // Inicia la reproducción
    //});

    //pauseBtn.addEventListener('click', () => {
    //    miAudio.pause(); // Pausa la reproducción
    //    miAudio.currentTime = 0; // Para reiniciarlo
    //});

    //const volumenSlider = document.getElementById('volumenSlider');

    // Evento para cuando cambia el valor del slider
    //volumenSlider.addEventListener('input', function() {
    //    miAudio.volume = this.value;
    //});

    // Si quieres que el slider refleje el volumen inicial
    //miAudio.volume = volumenSlider.value;