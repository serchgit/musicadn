$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

    
Lista.forEach(function (ele, index, array){
    
      var fila ="<tr data-index="+index+" data-tempo="+ele.Tiempo+" data-secuencia="+ele.Secuencia+" data-size="+ele.Size+"><td data-toggle='tooltip' data-bs-placement='right' title='Agregar'>"+ele.Titulo+"</td></tr>";
    
      $(".tabla-notas tbody").append(fila);
    });

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
