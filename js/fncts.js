 let getNumberthisDiab = () => {
     let num = 0;
     document.querySelectorAll(".num-diab").forEach(element => {
         if( element.classList.contains("active")){
         // console.log(element.textContent);
             num = element.textContent;
         }
     })
     return num;
 };
 document.querySelector(".arrow-right-diab").addEventListener("click", e => {
     let num = parseInt(getNumberthisDiab());
     if(num == 1){
         console.log(num)
         document.querySelectorAll(".num-diab")[1].classList.add("active")
         document.querySelectorAll(".num-diab")[0].classList.remove("active")
         document.querySelectorAll(".card-cont-diab")[1].classList.remove("d-none")
         document.querySelectorAll(".card-cont-diab")[0].classList.add("d-none")
     }
     if(num == 2){
         console.log(num)
         document.querySelectorAll(".num-diab")[2].classList.add("active")
         document.querySelectorAll(".num-diab")[1].classList.remove("active")
         document.querySelectorAll(".card-cont-diab")[2].classList.remove("d-none")
         document.querySelectorAll(".card-cont-diab")[1].classList.add("d-none")
     }
 });

 document.querySelector(".arrow-left-diab").addEventListener("click", e => {
     let num = parseInt(getNumberthisDiab());
     if(num == 2){
         console.log(num)
         document.querySelectorAll(".num-diab")[0].classList.add("active")
         document.querySelectorAll(".num-diab")[1].classList.remove("active")
         document.querySelectorAll(".card-cont-diab")[0].classList.remove("d-none")
         document.querySelectorAll(".card-cont-diab")[1].classList.add("d-none")
     }
     if(num == 3){
         console.log(num)
         document.querySelectorAll(".num-diab")[1].classList.add("active")
         document.querySelectorAll(".num-diab")[2].classList.remove("active")
         document.querySelectorAll(".card-cont-diab")[2].classList.add("d-none")
         document.querySelectorAll(".card-cont-diab")[1].classList.remove("d-none")
     }
 });

 let getNumberthisHip = () => {
     let num = 0;
     document.querySelectorAll(".num-hip").forEach(element => {
         if( element.classList.contains("active")){
             num = element.textContent;
             // console.log(element.textContent);
         }
     })
     return num;
 };
 document.querySelector(".arrow-right-hip").addEventListener("click", e => {
     let num = parseInt(getNumberthisHip());
     if(num == 1){
         document.querySelectorAll(".num-hip")[1].classList.add("active")
         document.querySelectorAll(".num-hip")[0].classList.remove("active")
         document.querySelectorAll(".card-cont-hip")[1].classList.remove("d-none")
         document.querySelectorAll(".card-cont-hip")[0].classList.add("d-none")
     }
 });
 document.querySelector(".arrow-left-hip").addEventListener("click", e => {
     let num = parseInt(getNumberthisHip());
     if(num == 2){
         document.querySelectorAll(".num-hip")[0].classList.add("active")
         document.querySelectorAll(".num-hip")[1].classList.remove("active")
         document.querySelectorAll(".card-cont-hip")[0].classList.remove("d-none")
         document.querySelectorAll(".card-cont-hip")[1].classList.add("d-none")
     }
 });





let getNumberthis = () => {
    var activo = $("section.container:visible").attr("id");
    let num = $("#"+activo+" .num.active").html();
   
    return num;
};

 var activo = $("section.container:visible").attr("id");

$(".arrow-right").click(valor=>{
    console.log("iniciamos");
    let activo = $("section.container:visible").attr("id");
    let num = parseInt(getNumberthis());
    
    if(num == 1){
        console.log(num)
        $("#"+activo+" .card-cont-diab.active").removeClass("active").addClass("d-none")
        $("#"+activo+" .card-cont-data2").removeClass("d-none").addClass("active")

        console.log('#'+activo+' .num');

        let claseActivo = $('#'+activo+' .num')[0]
        let numero = $("#"+activo+" .num")[1]
        claseActivo.classList.remove("active")
        numero.classList.add("active")

    }
    let cantidad = $("#"+activo+" .cont-num").find(".num").length
    console.log("Cantidad->"+cantidad)
    if(num == 2 && cantidad > 2){
        console.log(num)
        $("#"+activo+" .card-cont-diab.active").removeClass("active").addClass("d-none")
        $("#"+activo+" .card-cont-data3").removeClass("d-none").addClass("active")

        let claseActivo =$("#"+activo+" .num")[1]
        let numero = $("#"+activo+" .num")[2]
        claseActivo.classList.remove("active")
        numero.classList.add("active")

        // let claseActivo =$("#"+activo+" .num.active")
        // let numero = $("#"+activo+" .num")[2]
        // claseActivo[0].classList.remove("active")
        // numero.classList.add("active")
    }



})

$(".arrow-left").click(valor=>{
    let activo = $("section.container:visible").attr("id")
    let num = parseInt(getNumberthis());
    if(num == 2){
        console.log(num)
        $("#"+activo+" .card-cont-diab.active").removeClass("active").addClass("d-none")
        $("#"+activo+" .card-cont-data1").removeClass("d-none").addClass("active")

        
        // let claseActivo =$("#"+activo+" .num.active").removeClass("active")
        // let numero = $("#prenatal-section .num")[0]
        // // claseActivo[0].classList.remove("active")
        // numero.classList.add("active")

        let claseActivo = $('#'+activo+' .num')[1]
        let numero = $("#"+activo+" .num")[0]
        claseActivo.classList.remove("active")
        numero.classList.add("active")

        // $("#"+activo+" .num.active").removeClass("active").addClass("d-none")
        // $("#prenatal-section .num-diab")[0].removeClass("d-none").addClass("active")
    }
    if(num == 3){
        console.log(num)
        $("#"+activo+" .card-cont-diab.active").removeClass("active").addClass("d-none")
        $("#"+activo+" .card-cont-data2").removeClass("d-none").addClass("active")

        // let claseActivo =$("#"+activo+" .num.active")
        // let numero = $("#prenatal-section .num")[1]
        // claseActivo[0].classList.remove("active")
        // numero.classList.add("active")

        let claseActivo = $('#'+activo+' .num')[2]
        let numero = $("#"+activo+" .num")[1]
        claseActivo.classList.remove("active")
        numero.classList.add("active")

        // $("#"+activo+" .num.active").removeClass("active").addClass("d-none")
        // $("#prenatal-section .num-diab")[1].removeClass("d-none").addClass("active")
    }
});



// document.querySelector(".arrow-right").addEventListener("click", e => {
//     let num = parseInt(getNumberthisDiab());
//     if(num == 1){
//         console.log(num)
//         document.querySelectorAll(".numeros")[1].classList.add("active")
//         document.querySelectorAll(".numeros")[0].classList.remove("active")
//         document.querySelectorAll(".card-cont-diab")[1].classList.remove("d-none")
//         document.querySelectorAll(".card-cont-diab")[0].classList.add("d-none")
//     }
//     if(num == 2){
//         console.log(num)
//         document.querySelectorAll(".numeros")[2].classList.add("active")
//         document.querySelectorAll(".numeros")[1].classList.remove("active")
//         document.querySelectorAll(".card-cont-diab")[2].classList.remove("d-none")
//         document.querySelectorAll(".card-cont-diab")[1].classList.add("d-none")
//     }
// });
// document.querySelector(".arrow-left-diab").addEventListener("click", e => {
//     let num = parseInt(getNumberthisDiab());
//     if(num == 2){
//         console.log(num)
//         document.querySelectorAll(".num-diab")[0].classList.add("active")
//         document.querySelectorAll(".num-diab")[1].classList.remove("active")
//         document.querySelectorAll(".card-cont-diab")[0].classList.remove("d-none")
//         document.querySelectorAll(".card-cont-diab")[1].classList.add("d-none")
//     }
//     if(num == 3){
//         console.log(num)
//         document.querySelectorAll(".num-diab")[1].classList.add("active")
//         document.querySelectorAll(".num-diab")[2].classList.remove("active")
//         document.querySelectorAll(".card-cont-diab")[2].classList.add("d-none")
//         document.querySelectorAll(".card-cont-diab")[1].classList.remove("d-none")
//     }
// });

