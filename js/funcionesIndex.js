      var input = $("#form .inputValor");
      var label = $("#form label");

     $(input).on("input",function(e){
      var name = $(this).attr("name");
      var valor = $(this).val();
      var itemList = $(".listaPortaP li");
      var textLabel = $(this).siblings('label').text();
      //console.log(textLabel)
      for(var i = 0;itemList.length >= i;i++){
        var liName = $(itemList[i]).attr('data-name');

        if (liName === name && name != "EvidenciaAnexar") {
         // $(".listaPortaP li[data-name='"+name+"']").removeClass("d-none");
          $(".listaPortaP li[data-name='"+name+"'] span").text(valor.toUpperCase()+"*");

        }
      }

     });

      for (var i = 0; label.length >= i; i++) {
        var ipt = $(label[i]).siblings('input, select');
        var name = $(ipt).attr('name');
        var texto = $(label[i]).text().toUpperCase();
        var item = "<li data-name='"+name+"'>*"+texto+": <span>*</span></li>";
        //var item = "<li data-name='"+name+"' class='d-none'>"+label[i].textContent+": &nbsp<span></span></li>";
        //console.log(item)
        $(".listaPortaP").append(item)
      }

        $(".listaPortaP li:last").remove();

           //var li = $(".listaPortaP li");
           //var span = $(".listaPortaP li span");
           //for (var i = 0; input.length >= i; i++) {
           //  var valor = input[i].value;
           //  valor == "" ? "" : $(span[i]).html("<br>*"+valor+"*")
           //  //console.log(valor)
           //  console.log(li[i].textContent)
           //}


       function copiarTexto() {
            let lista = document.querySelectorAll(".listaPortaP li");
            let text = Array.from(lista).map(li => `${li.textContent}`).join("\n");
              navigator.clipboard.writeText(text);
              toastr["success"]("información copiada!");
        }

      $("#EvidenciaAnexar").selectize({
        delimiter: '|',
        persist: false,
        placeholder: "Selección Múltiple",
        onChange: function(value){
          if (Array.isArray(value)) {
            value = value.join(' | ');
          }
          document.querySelector("[data-name=EvidenciaAnexar] span").innerText = value+"*";
        }
      })

      function process(input){
        let value = input.value;
        let numbers = value.replace(/[^0-9]/g, "");
        input.value = numbers;
      }

      Object.values(document.querySelectorAll('.only-numbers')).map(e => {
        e.addEventListener('input', el => {
          process(el.target);
        })
      });

      document.querySelectorAll('.currency-mask').forEach((element) => {
          IMask(element, {
              mask: '$ num',
              blocks: {
                  num: {
                      mask: Number,
                      thousandsSeparator: ',',
                      radix: '.',
                      mapToRadix: ['.'],
                      scale: 2,
                      signed: false,
                      normalizeZeros: true,
                      padFractionalZeros: true,
                      min: 1,
                      max: 99999999.99
                  }
              }
          });
      });
