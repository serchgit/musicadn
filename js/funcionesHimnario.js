$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

    
ListaH.forEach(function (ele, index, array){
    
      var fila ="<tr data-index="+index+"><td data-toggle='tooltip' data-bs-placement='right' title='Agregar'>"+ele.Titulo+"</td><td class='text-center text-danger tiempo'>"+ele.hVictoria+"</td>";
            fila+="<td>"+ele.Tono+"</td>"
    fila+="</tr>";
      $(".tabla-himnario tbody").append(fila);

    });

    $(".tabla-himnario").dataTable({  
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