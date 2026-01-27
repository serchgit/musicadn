const fechaHomologada = (fecha)=>{
    let date = new Date(fecha)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let mes = "";
    if(month < 10){
        mes  = `0${month}`
    }else{
        mes =`${month}`
    }
    let día = ""
    if(day < 10){
        dia = `0${day}`
    }else{
        dia = `${day}`
    }

    return `${dia}/${mes}/${year}`;

}

const closeAll = () =>{
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'
    if(!$("#incapacidadContent").hasClass("d-none")){
        $("#incapacidadContent").addClass("d-none")
    }
    if(!$("#datosCompletos").hasClass("d-none")){
        $("#datosCompletos").addClass("d-none")
    }
    if(!$("#datosCompletosTranscripcion").hasClass("d-none")){
        $("#datosCompletosTranscripcion").addClass("d-none")
    }
    
}
let medicinaFamiliar = (mfResponse) => {

// const mfResponse = { "http_code": 200, "error": "", "response": { "cveUnidadMedica": "360118252110", "idPaciente": "LOTC83010192FBYBA1", "idNota": 4645008, "idEvento": 1, "fecha": "2020-08-05 11:12:56.337", "estatura": 1.6, "peso": 60, "temperatura": 36, "sistolica": 120, "diastolica": 80, "frecuenciaCardiaca": 65, "frecuenciaRespiratoria": 26, "glucosa": 120, "perimetroCefalico": 0, "perimetroToracico": 0, "perimetroAbdominal": 0, "resumenClinico": "PADECIMIENTO ACTUAL O MOTIVO DE LA CONSULTA, PARA CONOCER QUE REALMENTE EL MICROSERVICIO TRAE LA INFORMACIÓN COMPLETA REGISTRADA", "exploracionFisica": "DESCRIPCIÓN DE LA EXPLORACIÓN FÍSICA PARA CONOCER QUE REALMENTE EL MICROSERVICIO TRAE LA INFORMACIÓN COMPLETA", "motinoNoSomatometria": "", "diagnosticos": [{ "idDiagnostico": "61922", "diagnostico": "Diabetes mellitus asociada a desnutricion con coma hipoglicemico", "idCie": "E120      ", "consecutivo": "1", "idOcasion": "1", "ocasion": "Subsecuente", "complemento": "COMPLEMENTO DE DX PARA MICROSERVICIO" }, { "idDiagnostico": "62977", "diagnostico": "Hipertension arterial", "idCie": "I10X      ", "consecutivo": "2", "idOcasion": "1", "ocasion": "Subsecuente", "complemento": "COMPLEMENTO DE DX PARA MICROSERVICIO" }], "procedimientos": [{ "idProcedimiento": 17, "procedimiento": "Interpretación de electroencefalograma" }, { "idProcedimiento": 1, "procedimiento": "Bloqueo regional-troncular o local" }], "indicaciones": "INDICACIONES HIGIÉNICO DIETÉTICAS PARA CONSULTA EN EL MICROSERVICIO", "idLugarAccidente": 6, "lugarAccidente": "Otros", "medico": "DIVISION SISTEMAS MEDICINA FAMILIAR", "cedula": null, "matricula": "DSMF            " }, "URL": "http:\/\/172.16.162.62\/salud\/msomt-medicinafamiliar\/v1\/notas?cveUnidadMedica=360118252110&idPaciente=LOTC83010192FBYBA1&idNota=4645008&idEvento=1" }
    // console.log(mfResponse)

    if (mfResponse.http_code == 200) {
      let tablaDiagnostico = `<table class="table table-sm table-secondary">
                                <thead>
                                <tr>
                                    <th scope="col">Consecutivo</th>
                                    <th scope="col">Diagnostico</th>
                                    <th scope="col">Complemento</th>
                                    <!--th scope="col d-none">idCie</th>
                                    <th scope="col d-none">Ocasion</th-->
                                </tr>
                                </thead>
                                <tbody>`
    if(mfResponse.response.diagnosticos && mfResponse.response.diagnosticos.length > 0){
      mfResponse.response.diagnosticos.forEach(element => {
        tablaDiagnostico += `<tr>
                                    <td>${element.consecutivo}</td>
                                    <td>${element.diagnostico}</td>
                                    <td>${element.complemento}</td>
                                    <td class="d-none">${element.idCie}</td>
                                    <td class="d-none">${element.ocasion}</td>
                                </tr>`
      });
    }else{
      
      tablaDiagnostico += `<tr><td colspan="5">Sin registros</td></tr>`
            
    }

      tablaDiagnostico += `</tbody></table>`
      let mf_diagnosticoNota = document.getElementById('mf_diagnosticoNota');
      mf_diagnosticoNota.innerHTML = tablaDiagnostico

      let mf_fecha = document.getElementById('mf_fechaInicio')
      let mf_estatura = document.getElementById('mf_estaturaNota')
      let mf_peso = document.getElementById('mf_pesoNota')
      let mf_glucosa = document.getElementById('mf_glucosaNota')
      let mf_temperatura = document.getElementById('mf_temperaturaNota')
      let mf_presion = document.getElementById('mf_presionNota')
      let mf_cardiaca = document.getElementById('mf_cardiacaNota')
      let mf_respiratoria = document.getElementById('mf_respiratoriaNota')
      let mf_indicaciones = document.getElementById('mf_indicacionesNota')
      let mf_medico = document.getElementById('mf_medicoNota')
      let mf_cedula = document.getElementById('mf_cedulaNota')
      let mf_matricula = document.getElementById('mf_matriculaNota')
      //let mf_resumenClinico = document.getElementById('mf_resumenClinicoNota')
      let mf_exploracionFisica = document.getElementById('mf_exploracionFisicaNota')

    let mf_primetroCefalicoNota = document.getElementById('mf_primetroCefalicoNota')
    let mf_perimetroToracicoNota = document.getElementById('mf_perimetroToracicoNota')
    let mf_perimetroAbdominalNota = document.getElementById('mf_perimetroAbdominalNota')
    let mf_resumenClinicoNota = document.getElementById('mf_resumenClinicoNota')
    let mf_motivoNoExploracionNota = document.getElementById('mf_motivoNoExploracionNota')
        


      // complemento
      // procedimiento


      mf_fecha.innerHTML = mfResponse.response.fecha ?? ""
      mf_estatura.innerHTML = mfResponse.response.estatura + " m" ?? ""
      mf_peso.innerHTML = mfResponse.response.peso + " kg" ??  ""
      mf_glucosa.innerHTML = mfResponse.response.glucosa + " mg/dl" ?? ""
      mf_temperatura.innerHTML = mfResponse.response.temperatura + " ºC" ?? ""
      mf_presion.innerHTML = mfResponse.response.sistolica + "/" + mfResponse.response.diastolica + " mmHg" ?? ""
      mf_cardiaca.innerHTML = mfResponse.response.frecuenciaCardiaca + " latidos/min"
      mf_respiratoria.innerHTML = mfResponse.response.frecuenciaRespiratoria + " resp./min"
      mf_indicaciones.innerHTML =   mfResponse.response.indicaciones ?? ""
      mf_medico.innerHTML = mfResponse.response.medico ?? ""
      mf_cedula.innerHTML = mfResponse.response.cedula ?? ""
      mf_matricula.innerHTML = mfResponse.response.matricula ?? ""
      //mf_resumenClinico.innerHTML = mfResponse.response.resumenClinico ?? "" 
    //   console.log(mfResponse.response.resumenClinico,"Carlos Pruebas")
      mf_exploracionFisica.innerHTML = mfResponse.response.exploracionFisica ?? ""

        mf_primetroCefalicoNota.innerHTML = mfResponse.response.perimetroCefalico ?? ""
        mf_perimetroToracicoNota.innerHTML = mfResponse.response.perimetroToracico ?? ""
        mf_perimetroAbdominalNota.innerHTML = mfResponse.response.perimetroAbdominal ?? ""
        mf_resumenClinicoNota.innerHTML = mfResponse.response.resumenClinico ?? ""
        mf_motivoNoExploracionNota.innerHTML = mfResponse.response.motinoNoSomatometria ?? "" //motinoNoSomatometria

        if(
            mfResponse.response.estatura == 0 && 
            mfResponse.response.peso == 0 && 
            mfResponse.response.glucosa == 0 
            ){
                $(".reglaValoresCero").removeClass("d-none")
            }

    }
    document.getElementById('notasMedicas-section').style.display = 'block'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'

}
 let diabetes = (diabetesResponse) => {


    /**
     * ************************
     * DIABETES
     * ************************
     */
    

    // const diabetesResponse = { "http_code": 200, "error": "", "response": { "cveUnidadMedica": "360118252110", "idPaciente": "GABB470501BW6L9BB1", "idNota": 4645044, "idEvento": 1, "antecedentes": { "fechaInicio": "2020-08-24 00:00:00.0", "idOcupacion": 5201, "ocupacion": "Supervisores y encargados de trabajadores en cuidados personales y del hogar", "idEstadoCivil": 4, "estadoCivil": "Viudo(a)", "idEscolaridad": 7, "escolaridad": "Técnico", "padecimientos": [{ "idPadecimiento": 12, "padecimiento": "Sobrepeso" }, { "idPadecimiento": 82, "padecimiento": "Retinopatía" }, { "idPadecimiento": 80, "padecimiento": "Obesidad abdominal" }, { "idPadecimiento": 83, "padecimiento": "Síndrome de ovario poliquístico" }], "factores": [{ "idFactor": 0, "factor": "Menopausia" }, { "idFactor": 19, "factor": "Sobrepeso" }, { "idFactor": 20, "factor": "Tabaquismo, incluso ser fumador pasivo" }, { "idFactor": 95, "factor": "Estrés" }], "confirmacionDx": "Detección", "edadAnios": "45 a 64", "glucemia": "140", "anioDX": "2010", "evolucionDx": "igual o mayor a 10", "diagnostico": [{ "idCategoria": 8, "categoria": "Hipertensión Arterial", "criterio": "Tensión arterial mayor o igual 140\/90", "mesAnio": "Enero 2010" }], "tratamiento": [] }, "monitoreo": { "peso": 70, "talla": 1.7, "sistolica": 120, "diastolica": 80, "pieDerechoValor": 4, "pieDerecho": "Riesgo leve, se sugieren medidas educativas", "pieIzquierdoValor": 5, "pieIzquierdo": "Riesgo leve, se sugieren medidas educativas", "planAlimentario": "Favorable", "actividadEducativa": "Inicio", "actividadFisica": "Inducción", "grupoAutoayuda": "Regular", "diagnosticoClinico": [{ "idDiagnostico": "64501", "diagnostico": "Acrecion verde en los dientes", "idCie": "K036      ", "consecutivo": "1", "idOcasion": "1", "ocasion": "Subsecuente", "complemento": "" }], "padecimientoActual": "PADECIMIENTO PARA CONSULTA MS", "egoPH": 0, "densidad": 0, "hallazgo": ".", "refGlucosaAyunas": "Glucosa plasmática en ayunas o antes de las comidas", "glucosaAyunas": 0, "glucosaAyunasValor": "80-110 Mg\/dl", "refGlucosaCapilar": "Glucosa plasmática o capilar postprandial (1 hora)", "glucosaCapilar": 0, "glucosaCapilarValor": "80-140 Mg\/dl", "refHemoglobina": "Hemoglobina glucosilada (Hba 1c)", "hemoglobina": 0, "hemoglobinaValor": "Menor 7%", "refColesterol": "Colesterol total", "colesterol": 0, "colesterolValor": "Menor o igual a 180 Mg\/dl", "refTrigliceridos": "Triglicéridos en ayuno", "trigliceridos": 0, "trigliceridosValor": "Menor o igual a 150 Mg\/dl", "refImc": "Índice de Masa Corporal", "imc": 24.22, "imcValor": "Menor o igual a 25 Kg\/m^2", "medico": "DIVISION SISTEMAS MEDICINA FAMILIAR", "cedula": null, "matricula": "DSMF" } }, "URL": "http:\/\/172.16.162.62\/salud\/msomt-diabetes\/v1\/notas?cveUnidadMedica=360118252110&idPaciente=GABB470501BW6L9BB1&idNota=4645044&idEvento=1" }
        console.log(diabetesResponse)

    if (diabetesResponse.http_code == 200) {
    
        let diab_antecedentes_fechaInicio                               =   document.getElementById("diab_antecedentes_fechaInicio")
        let diab_antecedentes_ocupacionNota                             =   document.getElementById('diab_antecedentes-ocupacionNota')
        let diab_antecedentes_estadoCivilNota                           =   document.getElementById('diab_antecedentes-estadoCivilNota')
        let diab_antecedentes_escolaridadNota                           =   document.getElementById('diab_antecedentes-escolaridadNota')
        let diab_antecedentes_padecimientosNota                         =   document.getElementById('diab_antecedentes-padecimientosNota')
        let diab_antecedentes_factoresNota                              =   document.getElementById('diab_antecedentes-factoresNota')
        let diab_antecedentes_confirmacionDxNota                        =   document.getElementById('diab_antecedentes-confirmacionDxNota')
        let diab_antecedentes_edadNota                                  =   document.getElementById('diab_antecedentes-edadNota')
        let diab_antecedentes_glucemiaNota                              =   document.getElementById('diab_antecedentes-glucemiaNota')
        let diab_antecedentes_anioDxNota                                =   document.getElementById('diab_antecedentes-anioDxNota')
        let diab_antecedentes_evolucionDxNota                           =   document.getElementById('diab_antecedentes-evolucionDxNota')
        let diab_diagnostico_categoriaNota                              =   document.getElementById('diab_diagnostico-categoriaNota')
        let diab_diagnostico_tratamientoNota                            =   document.getElementById('diab_diagnostico-tratamientoNota')
        let diab_monitoreo_pesoNota                                     =   document.getElementById('diab_monitoreo-pesoNota')
        let diab_monitoreo_tallaNota                                    =   document.getElementById('diab_monitoreo-tallaNota')
        let diab_monitoreo_tensionArterialNota                          =   document.getElementById('diab_monitoreo-tensionArterialNota')
        let diab_exploracion_hallazgoNota                               =   document.getElementById('diab_exploracion-hallazgoNota')
        // let diab_exploracion_especificacionesNota                    =   document.getElementById('diab_exploracion-especificacionesNota')
        let diab_exploracion_pieDerechoNota                             =   document.getElementById('diab_exploracion-pieDerechoNota')
        let diab_exploracion_tipoRiesgoDerechoNota                      =   document.getElementById('diab_exploracion-tipoRiesgoDerechoNota')
        let diab_exploracion_pieIzquierdoNota                           =   document.getElementById('diab_exploracion-pieIzquierdoNota')
        let diab_exploracion_tipoRiesgoIzquierdoNota                    =   document.getElementById('diab_exploracion-tipoRiesgoIzquierdoNota')
        // let diab_exploracion_tratamientoNota                            =   document.getElementById('diab_exploracion-tratamientoNota')
        let diab_exploracion_planAlimentarioNota                        =   document.getElementById('diab_exploracion-planAlimentarioNota')
        let diab_exploracion_actividadEducativaNota                     =   document.getElementById('diab_exploracion-actividadEducativaNota')
        let diab_exploracion_actividadFisicaNota                        =   document.getElementById('diab_exploracion-actividadFisicaNota')
        let diab_exploracion_padecimientoActualNota                     =   document.getElementById('diab_exploracion-padecimientoActualNota')
        let diab_diabetes_diagnosticoClinicoNota                        =   document.getElementById('diab_diabetes-diagnosticoClinicoNota')
        let diab_parametros_egoPHNota                                   =   document.getElementById('diab_parametros-egoPHNota')
        let diab_parametros_densidadNota                                =   document.getElementById('diab_parametros-densidadNota')
        let diab_parametros_desOtrosHallazgosNota                       =   document.getElementById('diab_parametros-desOtrosHallazgosNota')
        let diab_parametros_valOtrosHallazgos                           =   document.getElementById('diab_parametros-valOtrosHallazgos')
        // let diab_factores_factorNota                                    =   document.getElementById('diab_factores-factorNota')

        diab_antecedentes_fechaInicio.innerHTML                         =   diabetesResponse.response.antecedentes.fechaInicio

        diab_antecedentes_ocupacionNota.innerHTML                       =   diabetesResponse.response.antecedentes.ocupacion
        diab_antecedentes_estadoCivilNota.innerHTML                     =   diabetesResponse.response.antecedentes.estadoCivil
        diab_antecedentes_escolaridadNota.innerHTML                     =   diabetesResponse.response.antecedentes.escolaridad
        let diab_antecedentes_padecimientosValor                        = []
        diabetesResponse.response.antecedentes.padecimientos.forEach(element               => {
            diab_antecedentes_padecimientosValor.push(element.padecimiento)
        });

        diab_antecedentes_padecimientosNota.innerHTML                   = diab_antecedentes_padecimientosValor.join()//diabetesResponse.response.antecedentes.padecimientos
        let diab_antecedentes_factoresValor                             = []
        diabetesResponse.response.antecedentes.factores.forEach(element => {
            diab_antecedentes_factoresValor.push(element.factor)
        })
        // console.warn(diab_antecedentes_factoresValor, "Factores", diab_antecedentes_factoresValor.join())

        diab_antecedentes_factoresNota.innerHTML                        = diab_antecedentes_factoresValor.join() //diabetesResponse.response.antecedentes.factores
        diab_antecedentes_confirmacionDxNota.innerHTML                  = diabetesResponse.response.antecedentes.confirmacionDx
        diab_antecedentes_edadNota.innerHTML                            = diabetesResponse.response.antecedentes.edadAnios
        diab_antecedentes_glucemiaNota.innerHTML                        = diabetesResponse.response.antecedentes.glucemia
        diab_antecedentes_anioDxNota.innerHTML                          = diabetesResponse.response.antecedentes.anioDX
        diab_antecedentes_evolucionDxNota.innerHTML                     = diabetesResponse.response.antecedentes.evolucionDx
        let diab_diagnostico_categoriaValor                             = `<table class="table table-sm table-secondary">
                                                                <thead>
                                                                <tr>
                                                                    
                                                                    <th scope="col">Categoria</th>
                                                                    <th scope="col">Criterio</th>
                                                                    <th scope="col">Mes y Año DE CONFIRMACIÓN</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>`
        if (diabetesResponse.response.antecedentes.diagnostico && diabetesResponse.response.antecedentes.diagnostico.length > 0) {
            diabetesResponse.response.antecedentes.diagnostico.forEach(element => {
                diab_diagnostico_categoriaValor += `<tr>
                                                    <td>${element.categoria}</td>
                                                    <td>${element.criterio}</td>
                                                    <td>${element.mesAnio}</td>
                                                </tr>`
            })
        } else {
            diab_diagnostico_categoriaValor += `<tr><td colspan="3">Sin registros</td></tr>`
        }
        diab_diagnostico_categoriaValor += `</tbody></table>`

        diab_diagnostico_categoriaNota.innerHTML = diab_diagnostico_categoriaValor //diabetesResponse.response.antecedentes.categoria


        let diab_antecedentes_tratamientoValor = `<table class="table table-sm table-secondary"><thead><tr>
                                                                        <th scope="col">Tomar</th>
                                                                        <th scope="col">Cada</th>
                                                                        <th scope="col">Durante</th>
                                                                        <th scope="col">Consecutivo</th>
                                                                    </tr></thead><tbody>`
        if (diabetesResponse.response.antecedentes.tratamiento && diabetesResponse.response.antecedentes.tratamiento.length > 0) {
            diabetesResponse.response.antecedentes.tratamiento.forEach(element => {
                diab_antecedentes_tratamientoValor += `<tr>
                                        <td>${element.tomar}</td>
                                        <td>${element.cada}</td>
                                        <td>${element.durante}</td>
                                        <td>${element.consecutivo}</td>
                                    </tr>`
            })
        } else {
            diab_antecedentes_tratamientoValor += `<tr><td colspan="4" style="text-align:center;">Sin registros</td></tr>`
        }
        diab_antecedentes_tratamientoValor += `</tbody></table>`

        diab_diagnostico_tratamientoNota.innerHTML = diab_antecedentes_tratamientoValor //diabetesResponse.response.monitoreo.tratamiento
        diab_monitoreo_pesoNota.innerHTML = diabetesResponse.response.monitoreo.peso
        diab_monitoreo_tallaNota.innerHTML = diabetesResponse.response.monitoreo.talla
        diab_monitoreo_tensionArterialNota.innerHTML = diabetesResponse.response.monitoreo.sistolica + "/" + diabetesResponse.response.monitoreo.diastolica + " mmhg."
        // =   diabetesResponse.response.exploracionHTA.sistolica+"/"+diabetesResponse.response.exploracionHTA.diastolica+" mmhg."
        diab_exploracion_hallazgoNota.innerHTML = diabetesResponse.response.monitoreo.hallazgo
        // diab_exploracion_especificacionesNota.innerHTML     =   diabetesResponse.response.monitoreo.especificaciones
        diab_exploracion_pieDerechoNota.innerHTML = diabetesResponse.response.monitoreo.pieDerecho
        diab_exploracion_tipoRiesgoDerechoNota.innerHTML = diabetesResponse.response.monitoreo.pieDerechoValor
        diab_exploracion_pieIzquierdoNota.innerHTML = diabetesResponse.response.monitoreo.pieIzquierdo
        diab_exploracion_tipoRiesgoIzquierdoNota.innerHTML = diabetesResponse.response.monitoreo.pieIzquierdoValor
        // let diab_antecedentes_trataminetoValor = `<table class="table table-sm table-secondary"><thead><tr>
        //                                                                 <th scope="col">Tomar</th>
        //                                                                 <th scope="col">Cada</th>
        //                                                                 <th scope="col">Durante</th>
        //                                                                 <th scope="col">Consecutivo</th>
        //                                                             </tr></thead><tbody>`
        // if (diabetesResponse.response.monitoreo.tratamiento && diabetesResponse.response.monitoreo.tratamiento.length > 0) {
        //     diabetesResponse.response.monitoreo.tratamiento.forEach(element => {
        //         diab_antecedentes_trataminetoValor += `<tr>
        //                                 <td>${element.tomar}</td>
        //                                 <td>${element.cada}</td>
        //                                 <td>${element.durante}</td>
        //                                 <td>${element.consecutivo}</td>
        //                             </tr>`
        //     })
        // } else {
        //     diab_antecedentes_trataminetoValor += `<tr><td colspan="4" style="text-align:center;">Sin registros</td></tr>`
        // }
        // diab_antecedentes_trataminetoValor += `</tbody></table>`
        // diab_exploracion_tratamientoNota.innerHTML = diab_antecedentes_trataminetoValor //diabetesResponse.response.monitoreo.tratamiento
        diab_exploracion_planAlimentarioNota.innerHTML = diabetesResponse.response.monitoreo.planAlimentario
        diab_exploracion_actividadEducativaNota.innerHTML = diabetesResponse.response.monitoreo.actividadEducativa
        diab_exploracion_actividadFisicaNota.innerHTML = diabetesResponse.response.monitoreo.actividadFisica
        diab_exploracion_padecimientoActualNota.innerHTML = diabetesResponse.response.monitoreo.padecimientoActual
        let diab_monitoreo_diagnosticoClinicoValor = `<table class="table table-sm table-secondary"><thead><tr>
                                                                        <th>Diagnostico</th>
                                                                        <th>Ocasion</th>
                                                                        <th>Complemento</th>
                                                                    </tr></thead><tbody>`
        if (diabetesResponse.response.monitoreo.diagnosticoClinico && diabetesResponse.response.monitoreo.diagnosticoClinico.length > 0) {
            diabetesResponse.response.monitoreo.diagnosticoClinico.forEach(element => {
                diab_monitoreo_diagnosticoClinicoValor += `<tr>
                                        <td>${element.diagnostico}</td>
                                        <td>${element.ocasion}</td>
                                        <td>${element.complemento} &nbsp;</td>
                                    </tr>`
            })
        } else {
            diab_monitoreo_diagnosticoClinicoValor += `<tr><td colspan="4" style="text-align:center;">Sin registros</td></tr>`
        }
        diab_monitoreo_diagnosticoClinicoValor += `</tbody></table>`

        diab_diabetes_diagnosticoClinicoNota.innerHTML = diab_monitoreo_diagnosticoClinicoValor //diabetesResponse.response.monitoreo.diagnosticoClinico
        diab_parametros_egoPHNota.innerHTML = diabetesResponse.response.monitoreo.egoPH
        diab_parametros_densidadNota.innerHTML = diabetesResponse.response.monitoreo.densidad
        diab_parametros_desOtrosHallazgosNota.innerHTML = diabetesResponse.response.monitoreo.desOtrosHallazgos
        diab_parametros_valOtrosHallazgos.innerHTML = diabetesResponse.response.monitoreo.valOtrosHalla
        // diab_factores_factorNota.innerHTML = diabetesResponse.response.antecedentes.factor


        let diab_medico = document.getElementById('diab_medico')
        let diab_matricula = document.getElementById('diab_matricula')
        let diab_cedula = document.getElementById('diab_cedula')
        let diab_firma = document.getElementById('diab_firma')

        diab_medico.innerHTML = diabetesResponse.response.monitoreo.medico
        diab_matricula.innerHTML = diabetesResponse.response.monitoreo.matricula
        diab_cedula.innerHTML = diabetesResponse.response.monitoreo.cedula
        diab_firma.innerHTML = diabetesResponse.response.monitoreo.firma




        let diab_monitoreo_trigliceridos = document.getElementById('diab_monitoreo-trigliceridos')
        let diab_monitoreo_optimoTrigliceridos = document.getElementById('diab_monitoreo-optimoTrigliceridos')
        let diab_monitoreo_IMC = document.getElementById('diab_monitoreo-IMC')
        let diab_monitoreo_optimoIMC = document.getElementById('diab_monitoreo-optimoIMC')
        let diab_monitoreo_Colesterol = document.getElementById('diab_monitoreo-Colesterol')
        let diab_monitoreo_optimoColesterol = document.getElementById('diab_monitoreo-optimoColesterol')
        let diab_monitoreo_GlucosaAyunas = document.getElementById('diab_monitoreo-GlucosaAyunas')
        let diab_monitoreo_optimoGlucosaAyunas = document.getElementById('diab_monitoreo-optimoGlucosaAyunas')
        let diab_monitoreo_GlucosaCapilar = document.getElementById('diab_monitoreo-GlucosaCapilar')
        let diab_monitoreo_optimoGlucosaCapilar = document.getElementById('diab_monitoreo-optimoGlucosaCapilar')
        let diab_monitoreo_Hemoglobina = document.getElementById('diab_monitoreo-Hemoglobina')
        let diab_monitoreo_optimoHemoglobina = document.getElementById('diab_monitoreo-optimoHemoglobina')


        diab_monitoreo_trigliceridos.innerHTML = diabetesResponse.response.monitoreo.trigliceridos ?? ""
        diab_monitoreo_optimoTrigliceridos.innerHTML = diabetesResponse.response.monitoreo.trigliceridosValor ?? ""   //optimoTrigliceridos
        diab_monitoreo_IMC.innerHTML = diabetesResponse.response.monitoreo.imc ?? ""   //IMC
        diab_monitoreo_optimoIMC.innerHTML = diabetesResponse.response.monitoreo.imcValor ?? ""  //optimoIMC
        diab_monitoreo_Colesterol.innerHTML = diabetesResponse.response.monitoreo.colesterol ?? ""  //Colesterol
        diab_monitoreo_optimoColesterol.innerHTML = diabetesResponse.response.monitoreo.colesterolValor ?? ""  //optimoColesterol
        diab_monitoreo_GlucosaAyunas.innerHTML = diabetesResponse.response.monitoreo.glucosaAyunas ?? ""  //GlucosaAyunas
        diab_monitoreo_optimoGlucosaAyunas.innerHTML = diabetesResponse.response.monitoreo.glucosaAyunasValor ?? ""  //optimoGlucosaAyunas
        diab_monitoreo_GlucosaCapilar.innerHTML = diabetesResponse.response.monitoreo.glucosaCapilar ?? ""  //GlucosaCapilar
        diab_monitoreo_optimoGlucosaCapilar.innerHTML = diabetesResponse.response.monitoreo.glucosaCapilarValor ?? ""  //optimoGlucosaCapilar
        diab_monitoreo_Hemoglobina.innerHTML = diabetesResponse.response.monitoreo.hemoglobina ?? ""  //Hemoglobina
        diab_monitoreo_optimoHemoglobina.innerHTML = diabetesResponse.response.monitoreo.hemoglobinaValor ?? ""  //optimoHemoglobina

    }
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'block'

    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'
}

let hipertension = (respuesta) => {
    
    // let respuesta = {
    //     "http_code": 200,
    //     "error": "",
    //     "response": {
    //         "cveUnidadMedica": "360118252110",
    //         "idPaciente": "VAFC340901Y2D3TCA1",
    //         "idNota": 4645040,
    //         "idEvento": 1,
    //         "antecedentesHTA": {
    //             "fechaInicio": "2020-08-20 00:00:00.0",
    //             "idEscolaridad": 4,
    //             "escolaridad": "Primaria",
    //             "idEstadoCivil": 2,
    //             "estadoCivil": "Casado(a)",
    //             "confirmacionDx": "Cuadro Clinico Por:",
    //             "confirmacionPor": "EstresAlcoholismoUso de hormonasTabaquismoObesidad",
    //             "factores": [{
    //                 "idFactor": 56,
    //                 "factor": "Alcoholismo"
    //             }, {
    //                 "idFactor": 114,
    //                 "factor": "Menopausia"
    //             }],
    //             "padecimientos": [{
    //                 "idPadecimiento": 39,
    //                 "padecimiento": "Cardiopatía"
    //             }, {
    //                 "idPadecimiento": 43,
    //                 "padecimiento": "Sobrepeso"
    //             }],
    //             "diagnosticos": [{
    //                 "idDiagnostico": "61922",
    //                 "diagnostico": "Diabetes mellitus asociada a desnutricion con coma hipoglicemico",
    //                 "idCie": "E120      ",
    //                 "consecutivo": "1",
    //                 "idOcasion": "1",
    //                 "ocasion": "Subsecuente",
    //                 "complemento": ""
    //             }]
    //         },
    //         "exploracionHTA": {
    //             "peso": 0,
    //             "talla": 0,
    //             "sistolica": 120,
    //             "diastolica": 80,
    //             "ego": 0,
    //             "densidad": 0,
    //             "urocultivo": 0,
    //             "glucemia": 0,
    //             "urea": 0,
    //             "aurico": 0,
    //             "hallazgos": null,
    //             "otrosHallazgos": null,
    //             "rayosX": "NULL",
    //             "fondoOjo": "NULL",
    //             "colesterol": 0,
    //             "creatinina": 0,
    //             "sintomas": "SÍNTOMAS ACTUALES MS",
    //             "exploracionFisica": "EXPLORACIÓN FISICA MS",
    //             "indicacionesDieteticas": "INDICACIONES MS",
    //             "medico": "DIVISION SISTEMAS MEDICINA FAMILIAR",
    //             "cedula": null,
    //             "matricula": "DSMF"
    //         }
    //     },
    //     "URL": "http:\/\/172.16.162.62\/salud\/msomt-hipertension\/v1\/notas?cveUnidadMedica=360118252110&idPaciente=VAFC340901Y2D3TCA1&idNota=4645040&idEvento=1"
    // }
    console.log(respuesta)

    if (respuesta.http_code == 200) {
        // let tablaDiagnostico=`<table class="table table-sm table-secondary">
        //                         <thead>
        //                         <tr>
        //                             <th scope="col">Consecutivo</th>
        //                             <th scope="col">Complemento</th>
        //                             <th scope="col">Diagnostico</th>
        //                             <th scope="col">idCie</th>
        //                             <th scope="col">Ocasion</th>
        //                         </tr>
        //                         </thead>
        //                         <tbody>`

        // // respuesta.response.diagnosticos.forEach(element => {
        // //     tablaDiagnostico +=`<tr>
        // //                             <td>${element.consecutivo}</td>
        // //                             <td>${element.complemento}</td>
        // //                             <td>${element.diagnostico}</td>
        // //                             <td>${element.idCie}</td>
        // //                             <td>${element.ocasion}</td>
        // //                         </tr>`
        // // });
        // tablaDiagnostico +=`</tbody></table>`
        let fecha = document.getElementById('fechaNota')
        let hip_antecedentes_escolaridad = document.getElementById('hip_antecedentes-escolaridadNota')
        let hip_antecedentes_factores = document.getElementById('hip_antecedentes-factoresNota')
        let hip_antecedentes_padecimientos = document.getElementById('hip_antecedentes-padecimientosNota')
        let hip_antecedentes_confirmacionDx = document.getElementById('hip_antecedentes-confirmacionDxNota')
        let hip_antecedentes_estadoCivil = document.getElementById('hip_antecedentes-estadoCivilNota')
        let hip_antecedentes_confirmacionPor = document.getElementById('hip_antecedentes-confirmacionPorNota')
        let hip_antecedentes_diagnosticos = document.getElementById('hip_antecedentes-diagnosticosNota')

        //exploracionHTA
        let hip_exploracion_pesoNota = document.getElementById('hip_exploracion-pesoNota')
        let hip_exploracion_tallaNota = document.getElementById('hip_exploracion-tallaNota')
        let hip_exploracion_tensionArterialNota = document.getElementById('hip_exploracion-tensionArterialNota')


        fecha.innerHTML = respuesta.response.antecedentesHTA.fechaInicio
        hip_antecedentes_escolaridad.innerHTML = respuesta.response.antecedentesHTA.escolaridad
        let valoresFactores = ''
        respuesta.response.antecedentesHTA.factores.forEach(element => {
            valoresFactores += `<span>${element.factor}</span><br>`
        });
        hip_antecedentes_factores.innerHTML = valoresFactores

        let padecimientosValores = ''
        respuesta.response.antecedentesHTA.padecimientos.forEach(element => {
            padecimientosValores += `<span>${element.padecimiento}</span><br>`
        });
        hip_antecedentes_padecimientos.innerHTML = padecimientosValores
        hip_antecedentes_confirmacionDx.innerHTML = respuesta.response.antecedentesHTA.confirmacionDx
        hip_antecedentes_estadoCivil.innerHTML = respuesta.response.antecedentesHTA.estadoCivil
        hip_antecedentes_confirmacionPor.innerHTML = respuesta.response.antecedentesHTA.confirmacionPor
        let diagnosticosValor = `<table class="table table-sm table-secondary">
                            <thead>
                            <tr>
                                <th scope="col">Diagnostico</th>
                                <th scope="col">Complemento</th>
                            </tr>
                            </thead>
                            <tbody>`
        if(respuesta.response.antecedentesHTA.diagnosticos && respuesta.response.antecedentesHTA.diagnosticos.length > 0){
            respuesta.response.antecedentesHTA.diagnosticos.forEach(element => {
                diagnosticosValor += `<tr>
                                    <td>${element.diagnostico}</td>
                                    <td>${element.complemento}</td>
                                </tr>`
            });
        }else{
            diagnosticosValor   +=  `<tr><td colspan="4" style="text-align:center;">Sin registros</td></tr>`
        }
        diagnosticosValor += `</tbody></table>`
        hip_antecedentes_diagnosticos.innerHTML = ''
        hip_antecedentes_diagnosticos.innerHTML = diagnosticosValor

        hip_exploracion_pesoNota.innerHTML = respuesta.response.exploracionHTA.peso + " kg."
        hip_exploracion_tallaNota.innerHTML = respuesta.response.exploracionHTA.talla + " m."
        hip_exploracion_tensionArterialNota.innerHTML = respuesta.response.exploracionHTA.sistolica + "/" +
            respuesta.response.exploracionHTA.diastolica + " mmhg."

        // SOMATROMETRIA
        let hip_exploracion_ego = document.getElementById('hip_exploracion-ego')
        let hip_exploracion_densidad = document.getElementById('hip_exploracion-densidad')
        let hip_exploracion_urocultivo = document.getElementById('hip_exploracion-urocultivo')
        let hip_exploracion_glucemia = document.getElementById('hip_exploracion-glucemia')
        let hip_exploracion_urea = document.getElementById('hip_exploracion-urea')
        let hip_exploracion_aurico = document.getElementById('hip_exploracion-aurico')
        let hip_exploracion_hallazgos = document.getElementById('hip_exploracion-hallazgos')
        let hip_exploracion_OHallazgos  =   document.getElementById('hip_exploracion-OHallazgos')
        let hip_exploracion_rayosX = document.getElementById('hip_exploracion-rayosX')
        let hip_exploracion_fondoOjo = document.getElementById('hip_exploracion-fondoOjo')
        let hip_exploracion_colesterol = document.getElementById('hip_exploracion-colesterol')
        let hip_exploracion_cratinina = document.getElementById('hip_exploracion-cratinina')
        let hip_exploracion_sintomas = document.getElementById('hip_exploracion-sintomas')
        let hip_exploracion_exploracionFisica = document.getElementById('hip_exploracion-exploracionFisica')
        let hip_exploracion_indicacionesDieteticas = document.getElementById(
            'hip_exploracion-indicacionesDieteticas')
        let hip_medico = document.getElementById('hp_medico')
        let hip_matricula = document.getElementById('hp_matricula')
        let hip_cedula = document.getElementById('hp_cedula')
        let hip_firma = document.getElementById('hp_firma')

        hip_exploracion_ego.innerHTML = respuesta.response.exploracionHTA.ego ?? ""
        hip_exploracion_densidad.innerHTML = respuesta.response.exploracionHTA.densidad ?? ""
        hip_exploracion_urocultivo.innerHTML = respuesta.response.exploracionHTA.urocultivo ?? ""
        hip_exploracion_glucemia.innerHTML = respuesta.response.exploracionHTA.glucemia ?? ""
        hip_exploracion_urea.innerHTML = respuesta.response.exploracionHTA.urea ?? ""
        hip_exploracion_aurico.innerHTML = respuesta.response.exploracionHTA.aurico ?? ""
        hip_exploracion_hallazgos.innerHTML = respuesta.response.exploracionHTA.hallazgos ?? ""
        hip_exploracion_OHallazgos.innerHTML    =   respuesta.response.exploracionHTA.otrosHallazgos ?? ""
        hip_exploracion_rayosX.innerHTML = (respuesta.response.exploracionHTA.rayosX == "NULL" || respuesta.response.exploracionHTA.rayosX == "") ? "": respuesta.response.exploracionHTA.rayosX
        hip_exploracion_fondoOjo.innerHTML = (respuesta.response.exploracionHTA.fondoOjo == "NULL" || respuesta.response.exploracionHTA.fondoOjo == "")?"":respuesta.response.exploracionHTA.fondoOjo
        hip_exploracion_colesterol.innerHTML = respuesta.response.exploracionHTA.colesterol ?? ""
        hip_exploracion_cratinina.innerHTML = respuesta.response.exploracionHTA.creatinina ?? ""
        hip_exploracion_sintomas.innerHTML = respuesta.response.exploracionHTA.sintomas ?? ""
        hip_exploracion_exploracionFisica.innerHTML = respuesta.response.exploracionHTA.exploracionFisica ?? ""
        hip_exploracion_indicacionesDieteticas.innerHTML = respuesta.response.exploracionHTA.indicacionesDieteticas ?? ""










        hip_medico.innerHTML = respuesta.response.exploracionHTA.medico
        hip_matricula.innerHTML = respuesta.response.exploracionHTA.matricula
        hip_cedula.innerHTML = respuesta.response.exploracionHTA.cedula
        hip_firma.innerHTML = respuesta.response.exploracionHTA.firma


    }
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'block'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'

    // $("#modalNotas").modal('toggle')
}

// const valores = (valor,idParodental) =>{
//     console.log(valor,idParodental,"Pepe")
//     // if(idParodental == 0){
//         if($.trim(valor) == 'A'){
//             valor = parseInt(0)
//         }else if($.trim(valor) == 'B'){
//             valor = parseInt(1)
//         }else if($.trim(valor) == 'C'){
//             valor = parseInt(2)
//         }else if($.trim(valor) == 'D'){
//             valor = parseInt(3)
//         }else if($.trim(valor) == 'E'){
//             valor = parseInt(4)
//         }else if($.trim(valor) == 'F'){
//             valor = parseInt(5)
//         }else if($.trim(valor) == 'G'){
//             valor = parseInt(6)
//         }else if($.trim(valor) == 'H'){
//             valor = parseInt(7)
//         }else if($.trim(valor) == 'I'){
//             valor = parseInt(8)
//         }else if($.trim(valor) == 'J'){
//             valor = parseInt(9)
//         }else if($.trim(valor) == 'K'){
//             valor = parseInt(10)
//         }else{
//             valor = valor
//         }

//     // }else{ 
//     //     if(valor == '*'){
//     //         valor = `<span class="simbolo">*</span>`
//     //     }else if(valor == "|"){
//     //         valor = `<span class="simbolo">|</span>`
//     //     }else{
//     //         valor = `<span class="simbolo">${valor}</span>`
//     //     }
//     // }

//     return valor
// }
const valores = (valor,idParodental) =>{
    if($.trim(valor) == 'A'){
        valor = 0
    }else if($.trim(valor) == 'B'){
        valor = parseInt(1)
    }else if($.trim(valor) == 'C'){
        valor = parseInt(2)
    }else if($.trim(valor) == 'D'){
        valor = parseInt(3)
    }else if($.trim(valor) == 'E'){
        valor = parseInt(4)
    }else if($.trim(valor) == 'F'){
        valor = parseInt(6)
    }else if($.trim(valor) == 'G'){
        valor = parseInt(7)
    }else if($.trim(valor) == 'H'){
        valor = parseInt(8)
    }else if($.trim(valor) == 'I'){
        valor = parseInt(9)
    }else if($.trim(valor) == 'J'){
        valor = parseInt(10)
    }else if($.trim(valor) == 'K'){
        valor = parseInt(11)
    }else{
        valor = valor
    }

return valor
}

let msomtEstomatologia = (estomatologiaResponse) => {

    if (estomatologiaResponse.http_code == 200) {
        const odontograma = (idEnfermedad,valor,idParodental,idDiente) =>{
            let valorMostrar = valores(valor,idParodental)
            // if(valorMostrar.length)
            valorMostrar = $.trim(valorMostrar)
            let diente = Math.floor(idDiente/10)
            let estructura = ''
            if(parseInt($.trim(idParodental)) == 0){
                if(parseInt(idEnfermedad) == 1){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>`
                    }
                    
                }
                if(parseInt(idEnfermedad) == 2){
                    if(diente == 1 || diente == 2 || diente == 5 || diente == 6){
                        estructura = `<span class="arriba">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="abajo">${$.trim(valorMostrar)}</span>`
                    }
                }
                if(parseInt(idEnfermedad) == 3){
                    if(diente == 1 || diente == 2 || diente == 5 || diente == 6){
                        estructura = `<span class="abajo">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="arriba">${$.trim(valorMostrar)}</span>`
                    }
                }
                if(parseInt(idEnfermedad) == 4){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>`
                    }
                }
                if(parseInt(idEnfermedad) == 5){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>`
                    }
                }
                if(parseInt(idEnfermedad) == 6){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>`
                    }else{
                                estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                        <span class="centro">${$.trim(valorMostrar)}</span>
                                        <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                        <span class="arriba">${$.trim(valorMostrar)}</span>
                                        <span class="abajo">${$.trim(valorMostrar)}</span>`
    
                    }
                }
                if(parseInt(idEnfermedad) == 7){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>`
    
                    }
                }
                if(parseInt(idEnfermedad) == 8){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 9){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                            `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                            `
    
                    }
                }
                if(parseInt(idEnfermedad) == 10){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 11){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierda">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 12){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>`
    
                    }
                }
                if(parseInt(idEnfermedad) == 13){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 14){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>`
    
                    }
                }
                if(parseInt(idEnfermedad) == 15){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 16){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 17){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="arriba">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 18){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 19){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 20){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 21){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 22){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 23){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="abajo">${$.trim(valorMostrar)}</span>`
                    }else{
                        estructura = `<span class="abajo">${$.trim(valorMostrar)}</span>`
    
                    }
                }
                if(parseInt(idEnfermedad) == 24){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 25){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }
                }
    
                if(parseInt(idEnfermedad) == 26){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 27){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 28){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 29){
                    if(diente == 1 || diente == 5 || diente == 8 || diente == 4){
                        estructura = `<span class="izquierdo">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
                    }else{
                        estructura = `<span class="derecho">${$.trim(valorMostrar)}</span>
                                <span class="centro">${$.trim(valorMostrar)}</span>
                                <span class="abajo">${$.trim(valorMostrar)}</span>
                                `
    
                    }
                }
                if(parseInt(idEnfermedad) == 30){
                    estructura = `<span class="centro">${$.trim(valorMostrar)}</span>`
                }
            }else{

                
// d_bolsa_gingiviitis_arriba_abajo
// d_bolsa
// d_bolsa_gingivitis_abajo
// d_bolsa_gingivitis_arriba
// d_gingivitis_abajo
// d_gingivitis_arr_aba
// d_gingivitis_arriba

                if($.trim(valor)    ==  "^"){
                    console.log(valor,"Arriba")
                    estructura = `<span class="simbolo d_gingivitis_abajo"></span>`

                }else if($.trim(valor)    ==  "*"){
                    console.log(valor,"Asterisco")
                    estructura = `<span class="simbolo d_bolsa"></span>`

                }else if($.trim(valor)    ==  "v"){
                    console.log(valor,"Abajo")
                    estructura = `<span class="simbolo d_gingivitis_arriba"></span>`

                }else if($.trim(valor)    ==  "~"){
                    console.log(valor,"Diferencia")
                    estructura = `<span class="simbolo d_gingivitis_arr_aba"></span>`

                }else if($.trim(valor)    ==  "|"){
                    console.log(valor,"Diferencia")
                    estructura = `<span class="simbolo d_bolsa_gingiviitis_arriba_abajo"></span>` //d_bolsa_gingivitis_arriba

                }else if($.trim(valor)    ==  "]"){
                    console.log(valor,"Diferencia")
                    estructura = `<span class="simbolo d_bolsa_gingivitis_abajo"></span>`

                }else if($.trim(valor)    ==  "|"){
                    console.log(valor,"Diferencia")
                    estructura = `<span class="simbolo d_bolsa_gingiviitis_arriba_abajo"></span>`

                }else{
                    console.log(valor)
                    estructura = `<span class="simbolo">${$.trim(valor)}</span>`
                }
            }
            return estructura
        }
    
        // nombreNotasMF
        // edadNotasMF
        // sexoNotasMF
        // nssNotasMF
        // aMedicoNotasMF
        // consultorioNotasMF
        // turnoNotasMF
        let estoma_antecedentes_fechaInicio                 =   document.getElementById('estoma_antecedentes_fechaInicio')
        let estoma_datos_fecha                              =   document.getElementById('estoma_datos_fecha')
        let estoma_datos_edad                               =   document.getElementById('estoma_datos_edad')
        let estoma_datos_sexo                               =   document.getElementById('estoma_datos_sexo')
        let estoma_datos_informante                         =   document.getElementById('estoma_datos_informante')
        // let estoma_datos_espontaneo                         =   document.getElementById('estoma_datos_espontaneo')
        let estoma_datos_ocupacion                          =   document.getElementById('estoma_datos_ocupacion')
        let estoma_datos_referido                           =   document.getElementById('estoma_datos_referido')
        let estoma_proteccion                               =   document.getElementById('estoma_proteccion')
        let estoma_padecimiento_actual                      =   document.getElementById('estoma_padecimiento_actual')
        let estoma_peso                                     =   document.getElementById('estoma_peso')
        let estoma_estatura                                 =   document.getElementById('estoma_estatura')
        let estoma_temperatura                              =   document.getElementById('estoma_temperatura')
        let estoma_frecuencia_cardiaca                      =   document.getElementById('estoma_frecuencia_cardiaca')
        let estoma_frecuencia_respiratoria                  =   document.getElementById('estoma_frecuencia_respiratoria')
        let estoma_presion_arterial                         =   document.getElementById('estoma_presion_arterial')
        let estoma_exploracion_fisica                       =   document.getElementById('estoma_exploracion_fisica')
        let estoma_tratamientos_previos                     =   document.getElementById('estoma_tratamientos_previos')
        let estoma_resumen_clinico                          =   document.getElementById('estoma_resumen_clinico')
        let estoma_diagnostico                              =   document.getElementById('estoma_diagnostico')
        let estoma_tratamiento_manejo_integral              =   document.getElementById('estoma_tratamiento_manejo_integral')
        let estoma_procedimientos                           =   document.getElementById('estoma_procedimientos')
        let estoma_glucosa                                  =   document.getElementById('estoma_glucosa')
        let estoma_motivo_no_exploracion                    =   document.getElementById('estoma_motivo_no_exploracion')
        let estoma_no_exploracion                           =   document.getElementById('estoma_no_exploracion')
    
        estoma_antecedentes_fechaInicio.innerHTML           =   estomatologiaResponse.response.inicial.fecha
    
        if(estomatologiaResponse.response.inicial.fecha  != null){
                estoma_datos_fecha.innerHTML          =  fechaHomologada(estomatologiaResponse.response.inicial.fecha)// `${dia}/${mes}/${year}`//estomatologiaResponse.response.inicial.fecha
            }else{
                estoma_datos_fecha.innerHTML          =   estomatologiaResponse.response.inicial.fecha
            }
    
        // estoma_datos_fecha.innerHTML                        =   estomatologiaResponse.response.inicial.fecha
        // estoma_datos_edad.innerHTML                         =   estomatologiaResponse.response.inicial.edad
        estoma_datos_sexo.innerHTML                         =   estomatologiaResponse.response.inicial.sexo
        estoma_datos_informante.innerHTML                   =   estomatologiaResponse.response.inicial.informante
        // estoma_datos_espontaneo.innerHTML                   =   "No_Existe"//estomatologiaResponse.response.inicial.fecha
        estoma_datos_ocupacion.innerHTML                    =   estomatologiaResponse.response.inicial.ocupacion
        estoma_datos_referido.innerHTML                     =   estomatologiaResponse.response.inicial.referidoPor
    
        let estoma_proteccionList                           = '<ul class="estoma_proteccion">' 
        if(estomatologiaResponse.response.inicial.proteccion && estomatologiaResponse.response.inicial.proteccion.length > 0){
            estomatologiaResponse.response.inicial.proteccion.forEach(valor=>{
                estoma_proteccionList += `<li>${valor.fecha+"&nbsp; "+ valor.proteccion }</li>`
            })
            estoma_proteccionList += `</ul>`
        }
    
        estoma_proteccion.innerHTML                         =   estoma_proteccionList //estomatologiaResponse.response.inicial.fecha
    
        estoma_padecimiento_actual.innerHTML                =   estomatologiaResponse.response.inicial.padecmiento
        estoma_peso.innerHTML                               =   (estomatologiaResponse.response.inicial.somatometriaSignos.peso != null && estomatologiaResponse.response.inicial.somatometriaSignos.peso != "")?estomatologiaResponse.response.inicial.somatometriaSignos.peso + " Kgs":"";
        estoma_estatura.innerHTML                           =   (estomatologiaResponse.response.inicial.somatometriaSignos.estatura != null && estomatologiaResponse.response.inicial.somatometriaSignos.estatura != "")?estomatologiaResponse.response.inicial.somatometriaSignos.estatura + " Mts":"";
        estoma_temperatura.innerHTML                        =   estomatologiaResponse.response.inicial.somatometriaSignos.temperatura
        estoma_frecuencia_cardiaca.innerHTML                =   estomatologiaResponse.response.inicial.somatometriaSignos.frecuenciaCardiaca
        estoma_frecuencia_respiratoria.innerHTML            =   estomatologiaResponse.response.inicial.somatometriaSignos.frecuenciaRespiratoria
        estoma_presion_arterial.innerHTML                   =   estomatologiaResponse.response.inicial.somatometriaSignos.sistolica + "/"   +estomatologiaResponse.response.inicial.somatometriaSignos.diastolica
    
    
        estoma_glucosa.innerHTML                            =   estomatologiaResponse.response.inicial.somatometriaSignos.glucosa
        if(estomatologiaResponse.response.inicial.somatometriaSignos.peso == 0 && estomatologiaResponse.response.inicial.somatometriaSignos.estatura == 0){
            // estoma_motivo_no_exploracion.
            estoma_motivo_no_exploracion.classList.remove("d-none")
            estoma_no_exploracion.innerHTML                     =   estomatologiaResponse.response.inicial.somatometriaSignos.motivoNoExploracion
        }
        // estoma_motivo_no_exploracion.innerHTML              =   estoma_motivo_no_exploracion
    
    
        estoma_exploracion_fisica.innerHTML                 =   estomatologiaResponse.response.inicial.exploracionBucal
        estoma_tratamientos_previos.innerHTML               =   estomatologiaResponse.response.inicial.tratamientoPrevio
        estoma_resumen_clinico.innerHTML                    =   estomatologiaResponse.response.nota.resumenClinico
    
    
        //// ODONTOGRAMA
        // console.log(estomatologiaResponse.response.odontograma,estomatologiaResponse.response.odontograma.length)
        if(estomatologiaResponse.response.odontograma && estomatologiaResponse.response.odontograma.length > 0){
            estomatologiaResponse.response.odontograma.forEach(valor=>{
    
                let imagenDiente = odontograma(valor.idCara,valor.parodental,valor.idParodental,valor.idDiente)
                
                
                $(".diente"+valor.idDiente+" .contenedorDiente").append(imagenDiente)
                // console.log(".diente"+valor.idDiente+" .contenedorDiente",imagenDiente)
            })
        }
        
    
        let estoma_diagnosticoTable                         =   `<table class="table table-sm table-secondary">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">DIAGNOSTICO</th>
                                                                            <th scope="col">COMPLEMENTO DX</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
    
                if(estomatologiaResponse.response.nota.diagnostico  &&  estomatologiaResponse.response.nota.diagnostico.length    >   0){
                    estomatologiaResponse.response.nota.diagnostico.forEach(element => {
                        estoma_diagnosticoTable +=      `<tr>
                                                            <td>${element.diagnostico+" "+element.ocasion}</td>
                                                            <td>${element.complemento}</td>
                                                        </tr>`
                    })
                } else {
                    estoma_diagnosticoTable += `<tr><td colspan="2">Sin registros</td></tr>`
                }
            estoma_diagnosticoTable += `</tbody></table>`
    
        estoma_diagnostico.innerHTML                        =   estoma_diagnosticoTable//estomatologiaResponse.response.nota.diagnostico
        estoma_tratamiento_manejo_integral.innerHTML        =   estomatologiaResponse.response.nota.tratamientoIntegral
    
        let estoma_procedimientosList                           = '<ul class="estoma_proteccion">' 
        if(estomatologiaResponse.response.nota.procedimiento && estomatologiaResponse.response.nota.procedimiento.length > 0){
            estomatologiaResponse.response.nota.procedimiento.forEach(valor=>{
                estoma_procedimientosList += `<li>${valor.procedimiento }</li>`
            })
            estoma_procedimientosList += `</ul>`
        }
        estoma_procedimientos.innerHTML                     =   estoma_procedimientosList//estomatologiaResponse.response.nota.fecha
    }
    
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'block'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'

}
let msomtPlanificacion = (planificacionResponse)=>{

    if (planificacionResponse.http_code == 200) {

        let plani_antecedentes_fechaInicio                          =   document.getElementById('plani_antecedentes_fechaInicio')
        let plani_antecedentes_edad                                 =   document.getElementById("plani_antecedentes_edad")
        // let plani_antecedentes_temperatura                          =   document.getElementById("plani_antecedentes_temperatura")
        let plani_antecedentes_peso                                 =   document.getElementById("plani_antecedentes_peso")
        let plani_antecedentes_talla                                =   document.getElementById("plani_antecedentes_talla")
        let plani_antecedentes_escolaridad                          =   document.getElementById("plani_antecedentes_escolaridad")
        let plani_antecedentes_menarca                              =   document.getElementById("plani_antecedentes_menarca")
        let plani_antecedentes_menstrual                            =   document.getElementById("plani_antecedentes_menstrual")
        let plani_antecedentes_gesta                                =   document.getElementById("plani_antecedentes_gesta")
        let plani_antecedentes_para                                 =   document.getElementById("plani_antecedentes_para")
        let plani_antecedentes_aborto                               =   document.getElementById("plani_antecedentes_aborto")
        let plani_antecedentes_cesarea                              =   document.getElementById("plani_antecedentes_cesarea")
        let plani_antecedentes_hijos                                =   document.getElementById("plani_antecedentes_hijos")
        let plani_valoracion_obstetricos                            =   document.getElementById("plani_valoracion_obstetricos")
        let plani_antecedentes_diabetesMellitus                     =   document.getElementById("plani_antecedentes_diabetesMellitus")
        // // let plani_antecedentes_valoracionRiesgoReproductivo         =   document.getElementById("plani_antecedentes_valoracionRiesgoReproductivo")
        let plani_planificacion_familiarValores                     =   document.getElementById("plani_planificacion_familiarValores")
        
        
        plani_antecedentes_fechaInicio.innerHTML                    =   planificacionResponse.response.valoracion.fecha ?? ""
        // plani_antecedentes_temperatura.innerHTML                    =  planificacionResponse.response 
        plani_antecedentes_peso.innerHTML                           =  (planificacionResponse.response.valoracion.peso != "" && planificacionResponse.response.valoracion.peso != null) ?planificacionResponse.response.valoracion.peso + " Kgs":""; 
        plani_antecedentes_talla.innerHTML                          =  (planificacionResponse.response.valoracion.talla != "" && planificacionResponse.response.valoracion.talla != null)?planificacionResponse.response.valoracion.talla+" Mts" : "" ;
        plani_antecedentes_escolaridad.innerHTML                    =  planificacionResponse.response.valoracion.escolaridad ?? ""
        let plani_menarca                                           =  planificacionResponse.response.valoracion.menarca ?? ""
        if(planificacionResponse.response.valoracion.menarca != ""){
            plani_menarca += " Años"
        }
        plani_antecedentes_menarca.innerHTML                        =  plani_menarca //planificacionResponse.response.valoracion.menarca ?? "" 
        plani_antecedentes_menstrual.innerHTML                      =  planificacionResponse.response.valoracion.cicloMenstrual ?? ""
        plani_antecedentes_gesta.innerHTML                          =  planificacionResponse.response.valoracion.gestas ?? "" 
        plani_antecedentes_para.innerHTML                           =  planificacionResponse.response.valoracion.para ?? ""
        plani_antecedentes_aborto.innerHTML                         =  planificacionResponse.response.valoracion.aborto ?? ""
        plani_antecedentes_cesarea.innerHTML                        =  planificacionResponse.response.valoracion.cesarea ?? ""
        plani_antecedentes_hijos.innerHTML                          =  planificacionResponse.response.valoracion.hijosVivos ?? ""
        // plani_antecedentes_diabetesMellitus.innerHTML               =  planificacionResponse.response.
        // plani_antecedentes_valoracionRiesgoReproductivo.innerHTML   =  (planificacionResponse.response.valoracion.riesgoReproductivo)?? ""
        let plani_otrosAntecedentes                                 = []
        if(planificacionResponse.response.valoracion.obstetricos && planificacionResponse.response.valoracion.obstetricos.length > 0){
            planificacionResponse.response.valoracion.obstetricos.forEach(valor=>{
                plani_otrosAntecedentes.push(valor.otroAntecedente)
            })
        }
        plani_valoracion_obstetricos.innerHTML  =   plani_otrosAntecedentes.join(", ")
        let plani_patologicos = `<ul class="climatorioContent">`
        let plani_patologicoValores =   []
            planificacionResponse.response.valoracion.patologicos.forEach(valor =>{
                plani_patologicoValores.push(valor.antecedente)
                plani_patologicos += `<li class=" d-flex justify-content-between">
                                           ${valor.antecedente} 
                                        </li>`
            })

            plani_patologicos += `</ul>`
            plani_antecedentes_diabetesMellitus.innerHTML = plani_patologicoValores.join(", ") //plani_patologicos

        var plani_planificacion_familia = '';
        
        planificacionResponse.response.planificacion.forEach(element => {
            plani_planificacion_familia += `<div class="col-12 font-weight-light mb-3">
                            
                            <table class="table table-sm table-secondary planificacionFamiliar">
                                <thead>
                                    <tr>
                                        <th scope="col">FECHA DE LA CONSULTA</th>
                                        <th scope="col">PESO</th>
                                        <th scope="col">TENSIÓN ARTERIAL</th>
                                        <th scope="col">FECHA ÚLTIMA MENSTRUACIÓN</th>
                                        <th scope="col">MÉTODO ANTICONCEPTIVO EN USO</th>
                                        <th scope="col">DESEA CAMBIO DE MÉTODO</th>
                                        <th scope="col">MÉTODO ANTICONCEPTIVO ELEGIDO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>
                                                ${element.fecha ?? ""}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                ${element.peso ?? ""}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                            ${element.sistolica}/${element.diastolica} 
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                ${element.ultimaMenstruacion ?? ""}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                ${element.anticonceptivoUso ?? ""}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                ${element.cambioMetodo ?? ""}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                ${element.anticonceptivoElegido ?? ""}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`
            
            let accionElegida = ""
            let requirio_requirio =""
                        if(element.metodo == "" || element.metodo == null){
                            accionElegida = element.accionElegida
                            requirio_requirio = `${element.requirio.requirio?? ""}, ${element.requirio.envio?? ""}, ${element.procedimiento?? ""}`
                        }

            let efectosSecundarios = []
            element.efectosSecundarios.forEach(valor => {
                efectosSecundarios.push(valor.efecto)
            });
            


            plani_planificacion_familia += `<div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_efectodSecundarios">Efectos Secundarios:</span>
                            <span>${efectosSecundarios.join(", ")}</span>
                        </div>`
            plani_planificacion_familia += `<div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_metodo">Método:</span>
                            <span>${element.metodo ?? ""}</span>
                        </div>
                        <div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_envio">Envío:</span>
                            <span>${accionElegida ?? ""}</span>
                        </div>
                        <div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_requirio carlos">Requirió:</span>
                            <span>${requirio_requirio ?? ""}</span>
                        </div>
                        
                        <div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_noAceptacion">Causa de no aceptación:</span>
                            <span>${element.causaNoAceptacion ?? ""}</span>
                        </div>
                        <div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_recomendacionesOtros">Recomendaciones y otros:</span>
                            <span>${element.recomendaciones ?? ""}</span>
                        </div>`
                        let plani_etiqueta  =   ""
                        let plani_valor     =   ""
            if(element.aceptante != ""){    
                plani_etiqueta  =   "Aceptante de"
                plani_valor     =   element.aceptante
            }else{
                plani_etiqueta  =   "Subsecuente de"
                plani_valor     =   element.subsecuente
            }

             plani_planificacion_familia += `<div class="col-3 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_aceptante">${plani_etiqueta}:</span>
                            <span>${plani_valor ?? ""}</span>
                        </div>`

            plani_planificacion_familia += ` <div class="col-12 font-weight-light mb-3">
                            <span class="form-text labelVerde" for="plani_familiar_diagnostico">Diagnostico:</span>
                            <span>`
            plani_planificacion_familia += `<table class="table table-sm table-secondary"><thead><tr>
                                                                    <th>Diagnostico</th>
                                                                    <th>Ocasion</th>
                                                                    <!--<th>Complemento</th>-->
                                                                </tr></thead><tbody>`
            if (element.diagnosticos && element.diagnosticos.length > 0) {
                element.diagnosticos.forEach(element => {
                    plani_planificacion_familia += `<tr>
                                    <td>${element.diagnostico}</td>
                                    <td>${element.ocasion}</td>
                                    <!--<td>${element.complemento} &nbsp;</td>-->
                                </tr>`
                })
            } else {
                plani_planificacion_familia += `<tr><td colspan="4" style="text-align:center;">Sin registros</td></tr>`
            }
            plani_planificacion_familia += `</tbody></table>`




            plani_planificacion_familia += `                        
                            </span>
                        </div>`

        });

        plani_planificacion_familiarValores.innerHTML           =   plani_planificacion_familia
    }
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'block'
    document.getElementById('urgencias-section').style.display  = 'none'

}
let msomtClimaterio = (climaResponse)   =>  {
    if (climaResponse.http_code == 200) {



        //     diabetes
        // nombreNotasMF
        // edadNotasMF
        // sexoNotasMF
        // nssNotasMF
        // aMedicoNotasMF
        // consultorioNotasMF
        // turnoNotasMF
        let clima_antecedentes_fechaInicio                      =   document.getElementById('clima_antecedentes_fechaInicio')
        let clima_antecedentes_edad                             =   document.getElementById('clima_antecedentes_edad')
        let clima_antecedentes_temperatura                      =   document.getElementById('clima_antecedentes_temperatura')
        let clima_antecedentes_peso                             =   document.getElementById('clima_antecedentes_peso')
        let clima_antecedentes_talla                            =   document.getElementById('clima_antecedentes_talla')
        // let clima_antecedentes_imc                              =   document.getElementById('clima_antecedentes_imc')
        let clima_antecedentes_metodo_PF                        =   document.getElementById('clima_antecedentes_metodo_PF')
        let clima_antecedentes_quirurgicos                      =   document.getElementById('clima_antecedentes_quirurgicos')
        let clima_antecedentes_fechaMenstruacion                =   document.getElementById('clima_antecedentes_fechaMenstruacion')
        let clima_antecedentes_habitual                         =   document.getElementById('clima_antecedentes_habitual')
        let clima_antecedentes_actual                           =   document.getElementById('clima_antecedentes_actual')
        let clima_trastornos_bochornos                          =   document.getElementById('clima_trastornos_bochornos')
        let clima_trastornos_sudores                            =   document.getElementById('clima_trastornos_sudores')
        let clima_trastornos_vaso_ninguno                       =   document.getElementById('clima_trastornos_vaso_ninguno')
        let clima_trastornos_resequedad                         =   document.getElementById('clima_trastornos_resequedad')
        let clima_trastornos_dispareunia                        =   document.getElementById('clima_trastornos_dispareunia')
        let clima_trastornos_tracto_ninguno                     =   document.getElementById('clima_trastornos_tracto_ninguno')
        let clima_trastornos_insomnio                           =   document.getElementById('clima_trastornos_insomnio')
        let clima_trastornos_resequedadPiel                     =   document.getElementById('clima_trastornos_resequedadPiel')
        let clima_trastornos_cefalea                            =   document.getElementById('clima_trastornos_cefalea')
        let clima_trastornos_mialgias                           =   document.getElementById('clima_trastornos_mialgias')
        let clima_trastornos_artralgias                         =   document.getElementById('clima_trastornos_artralgias')
        let clima_trastornos_mareos                             =   document.getElementById('clima_trastornos_mareos')
        let clima_trastornos_desmayos                           =   document.getElementById('clima_trastornos_desmayos')
        let clima_trastornos_somaticosNinguno                   =   document.getElementById('clima_trastornos_somaticosNinguno')
        let clima_trastornos_depresion                          =   document.getElementById('clima_trastornos_depresion')
        let clima_trastornos_dismLibido                         =   document.getElementById('clima_trastornos_dismLibido')
        let clima_trastornos_cansancioFat                       =   document.getElementById('clima_trastornos_cansancioFat')
        let clima_trastornos_olvidosFrec                        =   document.getElementById('clima_trastornos_olvidosFrec')
        let clima_trastornos_ansiedadNerv                       =   document.getElementById('clima_trastornos_ansiedadNerv')
        let clima_trastornos_irritableEnoj                      =   document.getElementById('clima_trastornos_irritableEnoj')
        let clima_trastornos_sicologicos_ninguno                =   document.getElementById('clima_trastornos_sicologicos_ninguno')
        let clima_patologia_cancerMama                          =   document.getElementById('clima_patologia_cancerMama')
        let clima_patologia_cancerCervico                       =   document.getElementById('clima_patologia_cancerCervico')
        let clima_patologia_endometrial                         =   document.getElementById('clima_patologia_endometrial')
        let clima_patologia_enfTromboAguda                      =   document.getElementById('clima_patologia_enfTromboAguda')
        let clima_patologia_enfTromboCronica                    =   document.getElementById('clima_patologia_enfTromboCronica')
        let clima_patologia_enfHepAguda                         =   document.getElementById('clima_patologia_enfHepAguda')
        let clima_patologia_enfHepCronica                       =   document.getElementById('clima_patologia_enfHepCronica')
        let clima_patologia_enfRenalCronica                     =   document.getElementById('clima_patologia_enfRenalCronica')
        let clima_patologia_enfQuistica                         =   document.getElementById('clima_patologia_enfQuistica')
        let clima_patologia_miomatosis                          =   document.getElementById('clima_patologia_miomatosis')
        let clima_patologia_colecistopatia                      =   document.getElementById('clima_patologia_colecistopatia')
        let clima_patologia_hipArtSistSevera                    =   document.getElementById('clima_patologia_hipArtSistSevera')
        let clima_patologia_hipArtSistModerada                  =   document.getElementById('clima_patologia_hipArtSistModerada')
        let clima_patologia_diabetesMellitus                    =   document.getElementById('clima_patologia_diabetesMellitus')
        let clima_patologia_ningunoPatologia                    =   document.getElementById('clima_patologia_ningunoPatologia')
        let clima_antecedentesFam_cancerMama                    =   document.getElementById('clima_antecedentesFam_cancerMama')
        let clima_estiloVida_tabaquismo                         =   document.getElementById('clima_estiloVida_tabaquismo')
        let clima_estiloVida_sedentarismo                       =   document.getElementById('clima_estiloVida_sedentarismo')
        let clima_estiloVida_alcoholismo                        =   document.getElementById('clima_estiloVida_alcoholismo')
        let clima_estiloVida_ninguno                            =   document.getElementById('clima_estiloVida_ninguno')
        


        let clima_deteccionCancerMamario_fecha                  =   document.getElementById('clima_deteccionCancerMamario_fecha')
        let clima_deteccionCancerMamario_resultado              =   document.getElementById('clima_deteccionCancerMamario_resultado')
        let clima_deteccionCervicouterino_fecha                 =   document.getElementById('clima_deteccionCervicouterino_fecha')
        let clima_deteccionCervicouterino_resultado             =   document.getElementById('clima_deteccionCervicouterino_resultado')
        // // let clima_tratamientoFarma                              =   document.getElementById('clima_tratamientoFarma')
        let clima_tratamientoNoFarma                            =   document.getElementById('clima_tratamientoNoFarma')
        let clima_inicial_tratamientoNoFarma                    =   document.getElementById('clima_inicial_tratamientoNoFarma')
        let clima_enviar                                        =   document.getElementById('clima_enviar')
        let clima_subsecuente_fecha                             =   document.getElementById('clima_subsecuente_fecha')
        let clima_subsecuente_peso                              =   document.getElementById('clima_subsecuente_peso')
        let clima_subsecuente_tension                           =   document.getElementById('clima_subsecuente_tension')
        let clima_subsecuente_temperatura                       =   document.getElementById('clima_subsecuente_temperatura')
        let clima_subsecuente_ultimaMenstruacion                =   document.getElementById('clima_subsecuente_ultimaMenstruacion')
        let clima_subsecuente_otraPatologiaActualArray          =   document.getElementById('clima_subsecuente_otraPatologiaActualArray')
        let clima_subsecuente_sindromeClimaterico               =   document.getElementById('clima_subsecuente_sindromeClimaterico')
        let clima_detecciones                                   =   document.getElementById('clima_detecciones')
        let clima_diagnostico                                   =   document.getElementById('clima_diagnostico')
        let clima_detecciones_inicial                           =   document.getElementById('clima_detecciones_inicial')
        
        
        
        
        clima_antecedentes_fechaInicio.innerHTML                =   climaResponse.response.inicial.fecha
        // clima_antecedentes_edad.innerHTML                       =   climaResponse.response.edadAnios
        
        clima_antecedentes_temperatura.innerHTML                =   climaResponse.response.inicial.temperatura
        clima_antecedentes_peso.innerHTML                       =   (climaResponse.response.inicial.peso != "" && climaResponse.response.inicial.peso != null)?climaResponse.response.inicial.peso + " kgs":"";
        clima_antecedentes_talla.innerHTML                      =   (climaResponse.response.inicial.talla != "" && climaResponse.response.inicial.talla != null) ? climaResponse.response.inicial.talla + " mts": "";
        // clima_antecedentes_imc.innerHTML                     =   climaResponse.response
        clima_antecedentes_metodo_PF.innerHTML                  =   climaResponse.response.inicial.antecedentes.metodoPlanificacion
        clima_antecedentes_quirurgicos.innerHTML                =   climaResponse.response.inicial.antecedentes.quirurgicos
        if(climaResponse.response.inicial.antecedentes.ultimaMenstruacion  != null){
        
            clima_antecedentes_fechaMenstruacion.innerHTML          =   fechaHomologada(climaResponse.response.inicial.antecedentes.ultimaMenstruacion) //`${dia}/${mes}/${year}`//climaResponse.response.inicial.antecedentes.ultimaMenstruacion
        }else{
            clima_antecedentes_fechaMenstruacion.innerHTML          =   climaResponse.response.inicial.antecedentes.ultimaMenstruacion
        }
        
        // // Array
         clima_antecedentes_habitual.innerHTML                  =   climaResponse.response.inicial.antecedentes.cicloHabitual.cantidad+' x '+climaResponse.response.inicial.antecedentes.cicloHabitual.duracion//climaResponse.response.inicial.antecedentes.cicloHabitual.periodo +' - '+climaResponse.response.inicial.antecedentes.cicloHabitual.duracion +' - '+climaResponse.response.inicial.antecedentes.cicloHabitual.cantidad
        // // Array
         clima_antecedentes_actual.innerHTML                    =   climaResponse.response.inicial.antecedentes.cicloActual.cantidad+' x '+climaResponse.response.inicial.antecedentes.cicloActual.duracion //climaResponse.response.inicial.antecedentes.cicloActual.periodo +' - '+climaResponse.response.inicial.antecedentes.cicloActual.duracion +' - '+climaResponse.response.inicial.antecedentes.cicloActual.cantidad
        
        clima_trastornos_bochornos.innerHTML                    =   climaResponse.response.inicial.vasomotores.bochornos
        clima_trastornos_sudores.innerHTML                      =   climaResponse.response.inicial.vasomotores.sudoresNocturnos
        clima_trastornos_vaso_ninguno.innerHTML                 =   climaResponse.response.inicial.vasomotores.ninguno
        clima_trastornos_resequedad.innerHTML                   =   climaResponse.response.inicial.tactoVaginal.resequedad
        clima_trastornos_dispareunia.innerHTML                  =   climaResponse.response.inicial.tactoVaginal.dispareunia
        clima_trastornos_tracto_ninguno.innerHTML               =   climaResponse.response.inicial.tactoVaginal.ninguno
        
        clima_trastornos_insomnio.innerHTML                     =   climaResponse.response.inicial.otrosSomaticos.insomnio
        clima_trastornos_resequedadPiel.innerHTML               =   climaResponse.response.inicial.otrosSomaticos.resequedad
        clima_trastornos_cefalea.innerHTML                      =   climaResponse.response.inicial.otrosSomaticos.cefalea
        clima_trastornos_mialgias.innerHTML                     =   climaResponse.response.inicial.otrosSomaticos.mialgias
        clima_trastornos_artralgias.innerHTML                   =   climaResponse.response.inicial.otrosSomaticos.artralgias
        clima_trastornos_mareos.innerHTML                       =   climaResponse.response.inicial.otrosSomaticos.mareos
        clima_trastornos_desmayos.innerHTML                     =   climaResponse.response.inicial.otrosSomaticos.desmayos
        clima_trastornos_somaticosNinguno.innerHTML             =   climaResponse.response.inicial.otrosSomaticos.ninguno
        
        clima_trastornos_depresion.innerHTML                    =   climaResponse.response.inicial.psicologicos.depresionTristeza
        clima_trastornos_dismLibido.innerHTML                   =   climaResponse.response.inicial.psicologicos.disminucionLabido
        clima_trastornos_cansancioFat.innerHTML                 =   climaResponse.response.inicial.psicologicos.cansancioFatiga
        clima_trastornos_olvidosFrec.innerHTML                  =   climaResponse.response.inicial.psicologicos.olvidosFrecuentes
        clima_trastornos_ansiedadNerv.innerHTML                 =   climaResponse.response.inicial.psicologicos.ansiedadNerviosismo
        clima_trastornos_irritableEnoj.innerHTML                =   climaResponse.response.inicial.psicologicos.irritableOjos
        clima_trastornos_sicologicos_ninguno.innerHTML          =   climaResponse.response.inicial.psicologicos.ninguno
        clima_patologia_cancerMama.innerHTML                    =   climaResponse.response.inicial.patologiaActual.cancerMama
        clima_patologia_cancerCervico.innerHTML                 =   climaResponse.response.inicial.patologiaActual.cancerCervico
        clima_patologia_endometrial.innerHTML                   =   climaResponse.response.inicial.patologiaActual.cancerEndometrial
        clima_patologia_enfTromboAguda.innerHTML                =   climaResponse.response.inicial.patologiaActual.tromboembolicaAguda
        clima_patologia_enfTromboCronica.innerHTML              =   climaResponse.response.inicial.patologiaActual.tromboembolicaCronica
        clima_patologia_enfHepAguda.innerHTML                   =   climaResponse.response.inicial.patologiaActual.hepaticaAguda
        clima_patologia_enfHepCronica.innerHTML                 =   climaResponse.response.inicial.patologiaActual.hepaticaCronica
        clima_patologia_enfRenalCronica.innerHTML               =   climaResponse.response.inicial.patologiaActual.renalCronica
        clima_patologia_enfQuistica.innerHTML                   =   climaResponse.response.inicial.patologiaActual.quisticaMamaria
        clima_patologia_miomatosis.innerHTML                    =   climaResponse.response.inicial.patologiaActual.miomatosisUterina
        clima_patologia_colecistopatia.innerHTML                =   climaResponse.response.inicial.patologiaActual.colecistopatiaCronica
        
        clima_patologia_hipArtSistSevera.innerHTML              =   climaResponse.response.inicial.patologiaActual.hipertensionSevera
        clima_patologia_hipArtSistModerada.innerHTML            =   climaResponse.response.inicial.patologiaActual.hipertensionModerada
        clima_patologia_diabetesMellitus.innerHTML              =   climaResponse.response.inicial.patologiaActual.diabetes
        clima_patologia_ningunoPatologia.innerHTML              =   climaResponse.response.inicial.patologiaActual.ninguno
        
        // // Array inicial.famiiares
         clima_antecedentesFam_cancerMama.innerHTML           =   climaResponse.response.inicial.famiiares.familiarCama;

        //  console.warn(climaResponse.response.inicial.famiiares);
        //  console.log(climaResponse.response.inicial.famiiares,"jocen");
        clima_deteccionCancerMamario_fecha.innerHTML            =   climaResponse.response.inicial.famiiares.fechaCama ?? ""
        clima_deteccionCancerMamario_resultado.innerHTML        =   climaResponse.response.inicial.famiiares.resultadoCama ?? ""
        clima_deteccionCervicouterino_fecha.innerHTML           =   climaResponse.response.inicial.famiiares.fechaCacu ?? ""
        clima_deteccionCervicouterino_resultado.innerHTML       =   climaResponse.response.inicial.famiiares.resultadoCacu ?? ""


        let clima_diagnosticoInicialTabla = `<table class="table table-sm table-secondary">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">FECHA</th>
                                                                            <th scope="col">DIAGNOSTICO</th>
                                                                            <th scope="col">prescripciÓn DE THR</th>
                                                                            <th scope="col">ENVIAR A</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
            if(climaResponse.response.inicial){
                
                let fecha = (climaResponse.response.inicial.fecha && climaResponse.response.inicial.fecha != "" && climaResponse.response.inicial.fecha != null)?fechaHomologada(climaResponse.response.inicial.fecha):""
                if (climaResponse.response.inicial.diagnostico && climaResponse.response.inicial.diagnostico.length > 0) {
                    climaResponse.response.inicial.diagnostico.forEach(element => {
                        clima_diagnosticoInicialTabla += `<tr>
                                                            <td>${fecha}</td>
                                                            <td>${element.diagnostico}</td>
                                                            <td>${element.prescripcionTHR}</td>
                                                            <td>${element.envioOtroNivel}</td>
                                                        </tr>`
                    })
                } else {
                    clima_diagnosticoInicialTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
           
        }else{
            clima_diagnosticoInicialTabla += `<tr><td colspan="3">Sin registros</td></tr>`
        }

            clima_diagnosticoInicialTabla += `</tbody></table>`

            console.log(clima_detecciones_inicial,"Test")
        
        clima_detecciones_inicial.innerHTML                     =   clima_diagnosticoInicialTabla

        clima_inicial_tratamientoNoFarma.innerHTML              =   climaResponse.response.inicial.tratamientoNoFarmaco ?? ""
         
        
        
        clima_estiloVida_tabaquismo.innerHTML                   =   climaResponse.response.inicial.estiloVida.tabaquismo
        clima_estiloVida_sedentarismo.innerHTML                 =   climaResponse.response.inicial.estiloVida.sedentarismo
        clima_estiloVida_alcoholismo.innerHTML                  =   climaResponse.response.inicial.estiloVida.alcoholismo
        clima_estiloVida_ninguno.innerHTML                      =   climaResponse.response.inicial.estiloVida.ninguno
        
        
        /// // REVISAR
        // // Array
        let clima_sistolica = ""
        let clima_diastolica = ""
        let subsecuente_fecha = ""
        let subsecuente_peso    =   ""
        let subsecuente_tension = ""
        let subsecuente_temperatura =   ""
        let subsecuente_ultimaMenstruacion  =   ""
        let subsecuente_sindromeClimaterico =   ""
        

        if(climaResponse.response.subsecuente && climaResponse.response.subsecuente.length > 0 ){
            clima_sistolica = climaResponse.response.subsecuente[0].sistolica 
            clima_diastolica = climaResponse.response.subsecuente[0].diastolica 
            subsecuente_fecha = climaResponse.response.subsecuente[0].fecha ?? ""
            subsecuente_peso    =   (climaResponse.response.subsecuente[0].peso && climaResponse.response.subsecuente[0].peso != null)?climaResponse.response.subsecuente[0].peso + " kgs" : ""
            subsecuente_tension =   clima_sistolica + "/"+ clima_diastolica
            subsecuente_temperatura =   climaResponse.response.subsecuente[0].temperatura ?? ""
            subsecuente_ultimaMenstruacion  =   (climaResponse.response.subsecuente[0].ultimaMenstruacion && climaResponse.response.subsecuente[0].ultimaMenstruacion != null)? fechaHomologada(climaResponse.response.subsecuente[0].ultimaMenstruacion) : ""
            subsecuente_sindromeClimaterico =   climaResponse.response.subsecuente[0].sindromeClimaterico ?? ""
            $(".conConsultas").removeClass("d-none")
            $(".sinConsultas").addClass("d-none")
            
        }else{
            $(".conConsultas").addClass("d-none")
            $(".sinConsultas").removeClass("d-none")
        }

        clima_subsecuente_fecha.innerHTML                       =   subsecuente_fecha
        clima_subsecuente_peso.innerHTML                        =   subsecuente_peso
        clima_subsecuente_tension.innerHTML                     =   subsecuente_tension
        clima_subsecuente_temperatura.innerHTML                 =   subsecuente_temperatura
        clima_subsecuente_ultimaMenstruacion.innerHTML          =   subsecuente_ultimaMenstruacion
        let clima_subsecuente_otraPatologiaActual = []
        if(climaResponse.response.subsecuente && climaResponse.response.subsecuente.length > 0 && climaResponse.response.subsecuente[0].otraPatologiaActual && climaResponse.response.subsecuente[0].otraPatologiaActual.length > 0){
            climaResponse.response.subsecuente[0].otraPatologiaActual.forEach(valor=>{
                clima_subsecuente_otraPatologiaActual.push(valor.antecedente)
            })
            
        }
        clima_subsecuente_otraPatologiaActualArray.innerHTML    =   clima_subsecuente_otraPatologiaActual.join(", ") ?? ""
        clima_subsecuente_sindromeClimaterico.innerHTML         =   subsecuente_sindromeClimaterico

        

        
        
        let clima_deteccionesTabla = `<table class="table table-sm table-secondary">
                                                                    <thead>
                                                                    <tr>
                                                                        <th scope="col">TEMA</th>
                                                                        <th scope="col">RESULTADO</th>
                                                                        <th scope="col">FECHA</th>
                                                                        <!--<th scope="col">ENVIAR A</th>-->
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>`
            climaResponse.response.subsecuente.forEach(subsecuente=>{
                if (subsecuente.detecciones && subsecuente.detecciones.length > 0) {
                    subsecuente.detecciones.forEach(element => {
                        clima_deteccionesTabla += `<tr>
                                                            <td>${element.tema}</td>
                                                            <td>${element.resultado}</td>
                                                            <td>${fechaHomologada(element.fechaResultado)}</td>
                                                            <!--<td>${element.envioOtroNivel}</td>-->
                                                        </tr>`
                    })
                } else {
                    clima_deteccionesTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            })
            clima_deteccionesTabla += `</tbody></table>`
        
            clima_detecciones.innerHTML =   clima_deteccionesTabla
        
        
        // clima_tratamientoFarma.innerHTML                     =   climaResponse
        let climaResponse_subsecuente_tratamiento = ""
        if(climaResponse.response.subsecuente && climaResponse.response.subsecuente.length >0){
            climaResponse_subsecuente_tratamiento   =   climaResponse.response.subsecuente[0].tratamientoNoFarmaco
        }
        clima_tratamientoNoFarma.innerHTML                      =   climaResponse_subsecuente_tratamiento
        // clima_enviar.innerHTML  =   climaResponse
        
        
        
        
        
        
        let clima_diagnosticoTabla = `<table class="table table-sm table-secondary">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">FECHA</th>
                                                                            <th scope="col">DIAGNOSTICO</th>
                                                                            <th scope="col">prescripciÓn DE THR</th>
                                                                            <th scope="col">ENVIAR A</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
            climaResponse.response.subsecuente.forEach(subsecuente=>{
                let fecha = subsecuente.fecha
                if (subsecuente.diagnostico && subsecuente.diagnostico.length > 0) {
                    subsecuente.diagnostico.forEach(element => {
                        clima_diagnosticoTabla += `<tr>
                                                            <td>${fecha}</td>
                                                            <td>${element.diagnostico}</td>
                                                            <td>${element.prescripcionTHR}</td>
                                                            <td>${element.envioOtroNivel}</td>
                                                        </tr>`
                    })
                } else {
                    clima_diagnosticoTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            })
            clima_diagnosticoTabla += `</tbody></table>`
        
        clima_diagnostico.innerHTML                             = clima_diagnosticoTabla
        
    }
    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'block'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'none'
}
let msomtPrenatal = (prenatalResponse)   =>  {
    if (prenatalResponse.http_code == 200) {




        //     diabetes
        // nombreNotasMF
        // edadNotasMF
        // sexoNotasMF
        // nssNotasMF
        // aMedicoNotasMF
        // consultorioNotasMF
        // turnoNotasMF
        let  prenatal_antecedentes_fechaInicio = document.getElementById('prenatal_antecedentes_fechaInicio')

        let prenatal_antecedentes_edad = document.getElementById('prenatal_antecedentes_edad')
        let prenatal_antecedentes_menarca = document.getElementById('prenatal_antecedentes_menarca')
        let prenatal_antecedentes_inicioSexual = document.getElementById('prenatal_antecedentes_inicioSexual')
        let prenatal_antecedentes_gesta = document.getElementById('prenatal_antecedentes_gesta')
        let prenatal_antecedentes_para = document.getElementById('prenatal_antecedentes_para')
        let prenatal_antecedentes_aborto = document.getElementById('prenatal_antecedentes_aborto')
        let prenatal_antecedentes_cesarea = document.getElementById('prenatal_antecedentes_cesarea')
        let prenatal_antecedentes_hijosVivos = document.getElementById('prenatal_antecedentes_hijosVivos')
        let prenatal_antecedentes_interIntergenesico = document.getElementById('prenatal_antecedentes_interIntergenesico')
        let prenatal_antecedentes_escolaridad = document.getElementById('prenatal_antecedentes_escolaridad')
        let prenatal_antecedentes_embarazoAnterior_termino = document.getElementById('prenatal_antecedentes_embarazoAnterior_termino')
        let prenatal_antecedentes_embarazoAnterior_fecha = document.getElementById('prenatal_antecedentes_embarazoAnterior_fecha')
        let prenatal_antecedentes_embarazoAnterior_muertePerinatal = document.getElementById('prenatal_antecedentes_embarazoAnterior_muertePerinatal')
        let prenatal_antecedentes_embarazoAnterior_otrosObstetricos = document.getElementById('prenatal_antecedentes_embarazoAnterior_otrosObstetricos')
        let prenatal_antecedentes_embarActual_fechaUltMenstruacion = document.getElementById('prenatal_antecedentes_embarActual_fechaUltMenstruacion')
        let prenatal_antecedentes_embarActual_fechaProbableParto = document.getElementById('prenatal_antecedentes_embarActual_fechaProbableParto')
        let prenatal_antecedentes_embarActual_pesoPrevioEmbarazo = document.getElementById('prenatal_antecedentes_embarActual_pesoPrevioEmbarazo')
        let prenatal_antecedentes_embarActual_talla = document.getElementById('prenatal_antecedentes_embarActual_talla')
        // let prenatal_antecedentes_embarActual_imc = document.getElementById('prenatal_antecedentes_embarActual_imc')
        let prenatal_antecedentes_embarActual_personalesPat = document.getElementById('prenatal_antecedentes_embarActual_personalesPat')
        let prenatal_diagnostico_inter_viasUrinarias = document.getElementById('prenatal_diagnostico_inter_viasUrinarias')
        let prenatal_diagnostico_inter_cervicovaginales = document.getElementById('prenatal_diagnostico_inter_cervicovaginales')
        let prenatal_diagnostico_inter_otros = document.getElementById('prenatal_diagnostico_inter_otros')
        let prenatal_diagnostico_tiempoEvolucion_viasUrinarias = document.getElementById('prenatal_diagnostico_tiempoEvolucion_viasUrinarias')
        let prenatal_diagnostico_tiempoEvolucion_cervicovaginales = document.getElementById('prenatal_diagnostico_tiempoEvolucion_cervicovaginales')
        let prenatal_diagnostico_tiempoEvolucion_otros = document.getElementById('prenatal_diagnostico_tiempoEvolucion_otros')
        let prenatal_diagnostico_exploracion_viasUrinarias = document.getElementById('prenatal_diagnostico_exploracion_viasUrinarias')
        let prenatal_diagnostico_exploracion_cervicovaginales = document.getElementById('prenatal_diagnostico_exploracion_cervicovaginales')
        let prenatal_diagnostico_exploracion_otros = document.getElementById('prenatal_diagnostico_exploracion_otros')
        let prenatal_diagnosticoTrata_diagnostico = document.getElementById('prenatal_diagnosticoTrata_diagnostico')
        let prenatal_diagnosticoTrata_tratamiento = document.getElementById('prenatal_diagnosticoTrata_tratamiento')
        let prenatal_diagnosticoTrata_envioOtroNivel = document.getElementById('prenatal_diagnosticoTrata_envioOtroNivel')
        let prenatal_diagnostico_riesgo = document.getElementById('prenatal_diagnostico_riesgo')
        let prenatal_resultados_laboratorio = document.getElementById('prenatal_resultados_laboratorio')
        let prenatal_estadoActual = document.getElementById('prenatal_estadoActual')
        let prenatal_diagnostico_tratamiento = document.getElementById('prenatal_diagnostico_tratamiento')


        prenatal_antecedentes_fechaInicio.innerHTML =   prenatalResponse.response.antecedentesObstetricos.fecha
        // prenatal_antecedentes_edad.innerHTML                                                    =   
        prenatal_antecedentes_menarca.innerHTML = (prenatalResponse.response.antecedentesObstetricos.menarca != "")? prenatalResponse.response.antecedentesObstetricos.menarca+" Años" : "";
        prenatal_antecedentes_inicioSexual.innerHTML = (prenatalResponse.response.antecedentesObstetricos.inicioVidaSexual != "")?prenatalResponse.response.antecedentesObstetricos.inicioVidaSexual + " Años":"";
        prenatal_antecedentes_gesta.innerHTML = prenatalResponse.response.antecedentesObstetricos.gestas
        prenatal_antecedentes_para.innerHTML = prenatalResponse.response.antecedentesObstetricos.paras
        prenatal_antecedentes_aborto.innerHTML = prenatalResponse.response.antecedentesObstetricos.abortos
        prenatal_antecedentes_cesarea.innerHTML = prenatalResponse.response.antecedentesObstetricos.cesareas
        prenatal_antecedentes_hijosVivos.innerHTML = prenatalResponse.response.antecedentesObstetricos.hijosVivos
        prenatal_antecedentes_interIntergenesico.innerHTML = (prenatalResponse.response.antecedentesObstetricos.intergenesico != null)?prenatalResponse.response.antecedentesObstetricos.intergenesico +" Meses":"";
        prenatal_antecedentes_escolaridad.innerHTML = prenatalResponse.response.antecedentesObstetricos.escolaridad

        prenatal_antecedentes_embarazoAnterior_termino.innerHTML = prenatalResponse.response.antecedentesObstetricos.terminoEmbarazo
        
        if(prenatalResponse.response.antecedentesObstetricos.fechaTermino  != null){
            prenatal_antecedentes_embarazoAnterior_fecha.innerHTML = fechaHomologada(prenatalResponse.response.antecedentesObstetricos.fechaTermino)
        }
        prenatal_antecedentes_embarazoAnterior_muertePerinatal.innerHTML = prenatalResponse.response.antecedentesObstetricos.muertePerinatal

        let prenatal_otrosObstetricos_valores = []
        prenatalResponse.response.antecedentesObstetricos.otrosObstetricos.forEach(element => {
            prenatal_otrosObstetricos_valores.push(element.antecedente)
        });

        prenatal_antecedentes_embarazoAnterior_otrosObstetricos.innerHTML = prenatal_otrosObstetricos_valores.join(", ")

        prenatal_antecedentes_embarActual_fechaUltMenstruacion.innerHTML = prenatalResponse.response.antecedentesObstetricos.fechaUltMenstruacion
        prenatal_antecedentes_embarActual_fechaProbableParto.innerHTML = prenatalResponse.response.antecedentesObstetricos.fechProbableParto
        prenatal_antecedentes_embarActual_pesoPrevioEmbarazo.innerHTML = prenatalResponse.response.antecedentesObstetricos.pesoPrevio +" kg"
        prenatal_antecedentes_embarActual_talla.innerHTML = prenatalResponse.response.antecedentesObstetricos.talla + " Mts"
        
        let prenatal_personalesPatologicosValores = []
        prenatalResponse.response.antecedentesObstetricos.personalesPatologicos.forEach(patologicos=>{
            prenatal_personalesPatologicosValores.push(patologicos.antecedente)
        })
        // //array antecedentesObstetricos.personalesPatologicos
        prenatal_antecedentes_embarActual_personalesPat.innerHTML                               =   prenatal_personalesPatologicosValores.join(", ")



        let prenatal_estadoActual_table = `<table class="table table-sm table-secondary" style="font-size: 12px;"><thead>
                                    <tr>
                                        <th scope="col">FECHA DE LA CONSULTA</th>
                                        <th scope="col">SEM DE GEST.</th>
                                        <th scope="col">PESO ACTUAL (KILOS)</th>
                                        <th scope="col">TENSIÓN ARTERIAL (mmHg)</th>
                                        <th scope="col">T.A. MEDIA (mmHg)</th>
                                        <th scope="col">SIND. VASCULO ESPASMODICO</th>
                                        <th scope="col">A.F.U. (CM)</th>
                                        <th scope="col">EDEMA</th>
                                        <th scope="col">F.C.F. (x min)</th>
                                        <th scope="col">MOVIMIENTOS FETALES</th>
                                    </tr>
                                </thead>
                                <tbody>`
        if (prenatalResponse.response.estadoActual && prenatalResponse.response.estadoActual.length > 0) {

            prenatalResponse.response.estadoActual.forEach(element => {
                // <td>${element.vasculoespasmodico}</td>
                //<td>${element.edema}</td>
                let fecha = ''
                if(element.fecha != null){
                    fecha = fechaHomologada(element.fecha)
                }
                prenatal_estadoActual_table += `<tr>
                                                <td>${fecha}</td>
                                                <td>${element.semanasGestacion}</td>
                                                <td>${element.pesoActual}</td>
                                                <td>${element.tensionArterial}</td>
                                                <td>${element.taMedia}</td>
                                                <td></td>
                                                <td>${element.afu}</td>
                                                <td></td>
                                                <td>${element.cardiacaFetal}</td>
                                                <td>${element.movimientosFetales}</td>
                                            </tr>`
            })
        } else {
            prenatal_estadoActual_table += `<tr><td colspan="5" style="text-align:center;">Sin registros</td></tr>`
        }
        prenatal_estadoActual_table += `</tbody>
                            </table>`

        prenatal_estadoActual.innerHTML = prenatal_estadoActual_table

        let prenatal_resultados_laboratorio_table = `<table class="table table-sm table-secondary" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th scope="col">ESTUDIO</th>
                                        <th scope="col">FACTOR</th>
                                        <th scope="col">RESULTADOS</th>
                                        <th scope="col">INTERPRETACIÓN</th>
                                        <th scope="col">FECHA DE LA INTERPRETACIÓN</th>
                                    </tr>
                                </thead>
                                <tbody>`
        if (prenatalResponse.response.resultadosLaboratorio && prenatalResponse.response.resultadosLaboratorio.length > 0) {

            prenatalResponse.response.resultadosLaboratorio.forEach(element => {
                let fecha = ''
                if(element.fechaInterpretacion != null){
                    fecha = fechaHomologada(element.fechaInterpretacion)
                }
                prenatal_resultados_laboratorio_table += `<tr>
                                    <td>${element.estudio}</td>
                                    <td>${element.factor}</td>

                                    <td>${element.resultados}</td>
                                    <td>${element.interpretacion}</td>
                                    <td>${fecha}</td>
                                </tr>`
            })
        } else {
            prenatal_resultados_laboratorio_table += `<tr><td colspan="5" style="text-align:center;">Sin registros</td></tr>`
        }


        prenatal_resultados_laboratorio_table += `</tbody>
                            </table>`

        prenatal_resultados_laboratorio.innerHTML = prenatal_resultados_laboratorio_table



        var prenatal_diagnostivo_tratamiento_valor = ''

        prenatalResponse.response.diagonosticoTratamiento.forEach(value => {







            prenatal_diagnostivo_tratamiento_valor += `<div class="col-12">
                            <div class="row">
                                <div class="col-2">
                                
                                    <span class="text-center">${value.fecha}</span>
                                </div>
                                <div class="col-10 mb-3">
                                    <div class="row">
                                    <span class="form-text labelVerde col-12">INTERROGATORIO</span><hr>`
                                    let otroInter =  ''
                                    let viasInter =  ''
                                    let cervicoInter = ''
                                    if (value.sintomasSignos && value.sintomasSignos.length > 0) {
                                        value.sintomasSignos.forEach(sintomas => {
                                            if(sintomas.tipo=="Otros:"){
                                                otroInter += `<div class="col-4">
                                                <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                <p>${(sintomas.interrogatorio!= "" && sintomas.interrogatorio != "DISABLED")?sintomas.interrogatorio:""}</p>
                                            </div>
                                            `
                                            }
                                            if(sintomas.tipo=="Vías urinarias:"){
                                                viasInter += `<div class="col-4">
                                                <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                <p>${(sintomas.interrogatorio!= "" && sintomas.interrogatorio != "DISABLED")?sintomas.interrogatorio:""}</p>
                                            </div>
                                            `
                                            }
                                            if(sintomas.tipo=="Cervicovaginales:"){
                                                cervicoInter += `<div class="col-4">
                                                <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                <p>${(sintomas.interrogatorio!= "" && sintomas.interrogatorio != "DISABLED")?sintomas.interrogatorio:""}</p>
                                            </div>
                                            `
                                            }
                                            
                                        });
                                    }
                                    prenatal_diagnostivo_tratamiento_valor += viasInter + cervicoInter + otroInter

                                    prenatal_diagnostivo_tratamiento_valor += `<span class="form-text labelVerde col-12">TIEMPO DE EVOLUCIÓN</span><hr>`
                                    let otroTiempo =  ''
                                    let viasTiempo =  ''
                                    let cervicoTiempo = ''
                                    if (value.sintomasSignos && value.sintomasSignos.length > 0) {
                                        value.sintomasSignos.forEach(sintomas => {
                                            if(sintomas.tipo=="Otros:"){
                                                otroTiempo += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${sintomas.evolucion+' '+sintomas.frecuencia}</p>
                                                </div>`
                                            }
                                            if(sintomas.tipo=="Vías urinarias:"){
                                                viasTiempo += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${sintomas.evolucion+' '+sintomas.frecuencia}</p>
                                                </div>`
                                            }
                                            if(sintomas.tipo=="Cervicovaginales:"){
                                                cervicoTiempo += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${sintomas.evolucion+' '+sintomas.frecuencia}</p>
                                                </div>`
                                            }
                                        });
                                    }
                                    prenatal_diagnostivo_tratamiento_valor += viasTiempo + cervicoTiempo + otroTiempo


                                    prenatal_diagnostivo_tratamiento_valor += `<span class="form-text labelVerde col-12">EXPLORACIÓN</span><hr>`
                                    let otro =  ''
                                    let vias =  ''
                                    let cervico = ''
                                    if (value.sintomasSignos && value.sintomasSignos.length > 0) {
                                        value.sintomasSignos.forEach(sintomas => {
                                            if(sintomas.tipo=="Otros:"){
                                                otro += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${(sintomas.exploracion != "" && sintomas.exploracion != "DISABLED")?sintomas.exploracion : ""}</p>
                                                </div>
                                                `
                                            }
                                            if(sintomas.tipo=="Vías urinarias:"){
                                                vias += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${(sintomas.exploracion != "" && sintomas.exploracion != "DISABLED")?sintomas.exploracion : ""}</p>
                                                </div>
                                                `
                                            }
                                            if(sintomas.tipo=="Cervicovaginales:"){
                                                cervico += `<div class="col-4">
                                                    <span class="form-text labelVerde">${sintomas.tipo}</span>
                                                    <p>${(sintomas.exploracion != "" && sintomas.exploracion != "DISABLED")?sintomas.exploracion : ""}</p>
                                                </div>
                                                `
                                            }
                                        });
                                    }
                                    console.log(vias + cervico + otro, "EXPLORACIÓN")
                                    prenatal_diagnostivo_tratamiento_valor += vias + cervico + otro

                                    


            prenatal_diagnostivo_tratamiento_valor += `<!--<div class="col-12"><table class="table table-sm table-secondary">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">INTERROGATORIO</th>
                                                                <th scope="col">TIEMPO DE EVOLUCIÓN</th>
                                                                <th scope="col">EXPLORIACIÓN</th>
                                                                <th scope="col">TIPO</th>
                                                                <th scope="col">FRECUENCIA</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>`
            if (value.sintomasSignos && value.sintomasSignos.length > 0) {

                value.sintomasSignos.forEach(sintomas => {
                    prenatal_diagnostivo_tratamiento_valor += `<tr>
                                                <td>${sintomas.interrogatorio}</td>
                                                <td>${sintomas.evolucion}</td>
                                                <td>${sintomas.exploracion}</td>
                                                <td>${sintomas.tipo}</td>
                                                <td>${sintomas.frecuencia}</td>
                                            </tr>`
                   
                });
            } else {
                prenatal_diagnostivo_tratamiento_valor += `<tr><td colspan="5">Sin registros</td></tr>`
            }
            prenatal_diagnostivo_tratamiento_valor += `</tbody></table></div>-->
                                    <div class="col-12">
                                    <!--<span class="form-text labelVerde">DIAGNÓSTICO</span>-->
                                    `
            prenatal_diagnostivo_tratamiento_valor += `<table class="table table-sm table-secondary">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">DIAGNÓSTICO</th>
                                                                <th scope="col">OCASION</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>`
            if (value.diagnosticos && value.diagnosticos.length > 0) {
                value.diagnosticos.forEach(diagnosticos => {
                    prenatal_diagnostivo_tratamiento_valor += `<tr>
                                                <td>${diagnosticos.idOcasion}</td>
                                                <td>${diagnosticos.ocasion}</td>
                                            </tr>`
                })

            } else {
                prenatal_diagnostivo_tratamiento_valor += `<tr><td colspan="2">Sin registros</td></tr>`
            }
            prenatal_diagnostivo_tratamiento_valor += `</tbody></table></div>
                                    <div class="col-12">
                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">TRATAMIENTO</th>
                                                                    <th scope="col">ENVÍO A OTRO NIVEL DE ATENCIÓN</th>
                                                                    <th scope="col">RIESGO OBST.</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                <td>${value.tratamiento}</td>
                                                                <td>${value.envioOtroNivel}</td>
                                                                <td>${value.riesgoObstetrico}</td>
                                                            </tr>
                                                        </tbody>
                                        </table>
                                    </div>
                                
                            
                                    `

            

            prenatal_diagnostivo_tratamiento_valor += `
                               
                            </div>
                        </div>
                    </div>
                </div>`

        })

        prenatal_diagnostico_tratamiento.innerHTML = prenatal_diagnostivo_tratamiento_valor

    }
    document.getElementById('notasMedicas-section').style.display   = 'none'
    document.getElementById('hipertension-section').style.display   = 'none'
    document.getElementById('diabetes-section').style.display       = 'none'
    document.getElementById('prenatal-section').style.display       = 'block'
    document.getElementById('climaterio-section').style.display     = 'none'
    document.getElementById('estomatologia-section').style.display  = 'none'
    document.getElementById('planificacion-section').style.display  = 'none'
    document.getElementById('urgencias-section').style.display      = 'none'
}

let msomtUrgencias     = (urgenciasResponse) =>{
    
    let urge_antecedentes_fechaInicio                   =   document.getElementById('urge_antecedentes_fechaInicio')
    let urge_nota_fecha                                 =   document.getElementById('urge_nota_fecha')
    let urge_nota_talla                                 =   document.getElementById('urge_nota_talla')
    let urge_nota_peso                                  =   document.getElementById('urge_nota_peso')
    let urge_nota_temperatura                           =   document.getElementById('urge_nota_temperatura')
    let urge_nota_tension                               =   document.getElementById('urge_nota_tension')
    let urge_nota_cefalico                              =   document.getElementById('urge_nota_cefalico')
    let urge_nota_abdominal                             =   document.getElementById('urge_nota_abdominal')
    let urge_nota_toracico                              =   document.getElementById('urge_nota_toracico')
    let urge_nota_frecuencia_cardiaca                   =   document.getElementById('urge_nota_frecuencia_cardiaca')
    let urge_nota_frecuencia_respiratoria               =   document.getElementById('urge_nota_frecuencia_respiratoria')
    let urge_nota_glucosa                               =   document.getElementById('urge_nota_glucosa')
    let urge_nota_resumenClinico                        =   document.getElementById('urge_nota_resumenClinico')
    let urge_nota_exploracionFisica                     =   document.getElementById('urge_nota_exploracionFisica')
    let urge_nota_motivoNoExploracion                   =   document.getElementById('urge_nota_motivoNoExploracion')
    let urge_nota_diagnostico                           =   document.getElementById('urge_nota_diagnostico')
    let urge_nota_planEstudio                           =   document.getElementById('urge_nota_planEstudio')
    let urge_nota_pronostico                            =   document.getElementById('urge_nota_pronostico')
    let urge_nota_tipoUrgencia                          =   document.getElementById('urge_nota_tipoUrgencia')
    let urge_tratamientoDieta_tipoFormula               =   document.getElementById('urge_tratamientoDieta_tipoFormula')
    let urge_tratamientoDieta_cantidad                  =   document.getElementById('urge_tratamientoDieta_cantidad')
    let urge_tratamientoDieta_calorias                  =   document.getElementById('urge_tratamientoDieta_calorias')
    let urge_tratamientoDieta_cantidadPrescrita         =   document.getElementById('urge_tratamientoDieta_cantidadPrescrita')
    let urge_tratamientoDieta_tipoDieta                 =   document.getElementById('urge_tratamientoDieta_tipoDieta')
    let urge_tratamientoDieta_tipoLiquido               =   document.getElementById('urge_tratamientoDieta_tipoLiquido')
    let urge_tratamientoDieta_viaAdministracion         =   document.getElementById('urge_tratamientoDieta_viaAdministracion')
    let urge_elementos                                  =   document.getElementById('urge_elementos')
    let urge_controlLiquidos                            =   document.getElementById('urge_controlLiquidos')
    let urge_procedimientos                             =   document.getElementById('urge_procedimientos')
    let urge_interdependientes                          =   document.getElementById('urge_interdependientes')


    let FechaHoraUrgencia                               =   urgenciasResponse.response.nota.fecha.split(".")
    let fechaUrgencias                                  = fechaHomologada(urgenciasResponse.response.nota.fecha)
    let horaUrgencias                                   =   FechaHoraUrgencia[0].split(" ")
    
    console.log("Urgencias fecha y hora ",urgenciasResponse.response.nota.fecha.split("."),FechaHoraUrgencia,fechaUrgencias,horaUrgencias[0],"Final",horaUrgencias[1])
    
    urge_antecedentes_fechaInicio.innerHTML                             =   urgenciasResponse.response.nota.fecha ?? ''
    urge_nota_fecha.innerHTML                                           =    fechaUrgencias+" "+horaUrgencias[1] //(urgenciasResponse.response.nota.fecha != "" && urgenciasResponse.response.nota.fecha != null)?fechaHomologada(urgenciasResponse.response.nota.fecha):""
    urge_nota_talla.innerHTML                                           =   (urgenciasResponse.response.nota.talla != "")?urgenciasResponse.response.nota.talla + " m":""
    urge_nota_peso.innerHTML                                            =   (urgenciasResponse.response.nota.peso != "")? urgenciasResponse.response.nota.peso + " kg":""
    urge_nota_temperatura.innerHTML                                     =   urgenciasResponse.response.nota.temperatura ?? "&nbsp; "
    urge_nota_tension.innerHTML                                         =   (urgenciasResponse.response.nota.sistolica && urgenciasResponse.response.nota.sistolica != "" && urgenciasResponse.response.nota.diastolica && urgenciasResponse.response.nota.diastolica != "")?urgenciasResponse.response.nota.sistolica +"mmhg /"+ urgenciasResponse.response.nota.diastolica+" mmHg":""
    urge_nota_cefalico.innerHTML                                        =   (urgenciasResponse.response.nota.cefalico) ?    urgenciasResponse.response.nota.cefalico + " cm": "&nbsp; "
    urge_nota_abdominal.innerHTML                                       =   (urgenciasResponse.response.nota.abdominal) ?   urgenciasResponse.response.nota.abdominal + " cm": "&nbsp; "
    urge_nota_toracico.innerHTML                                        =   (urgenciasResponse.response.nota.toracico) ?    urgenciasResponse.response.nota.toracico + " cm": "&nbsp; "
    urge_nota_frecuencia_cardiaca.innerHTML                             =   (urgenciasResponse.response.nota.frecuenciaCardiaca && urgenciasResponse.response.nota.frecuenciaCardiaca != "")?urgenciasResponse.response.nota.frecuenciaCardiaca + " latidos/min":""
    urge_nota_frecuencia_respiratoria.innerHTML                         =   (urgenciasResponse.response.nota.frecuenciaRespiratoria && urgenciasResponse.response.nota.frecuenciaRespiratoria != "")?urgenciasResponse.response.nota.frecuenciaRespiratoria + " resp./min":""
    urge_nota_glucosa.innerHTML                                         =   (urgenciasResponse.response.nota.glucosa && urgenciasResponse.response.nota.glucosa != "")?urgenciasResponse.response.nota.glucosa +" mg/dl":""
    urge_nota_resumenClinico.innerHTML                                  =   urgenciasResponse.response.nota.resumenClinico ?? "&nbsp; "
    urge_nota_exploracionFisica.innerHTML                               =   urgenciasResponse.response.nota.exploracionFisica ?? "&nbsp; "
    urge_nota_motivoNoExploracion.innerHTML                             =   urgenciasResponse.response.nota.motivoNoExploracion ?? "&nbsp; "

    let urge_diagnosticoTabla = `<table class="table table-sm table-secondary">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">DIAGNOSTICO</th>
                                                                        <th scope="col">Complemento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>`
    
            if (urgenciasResponse.response.nota.diagnosticos && urgenciasResponse.response.nota.diagnosticos.length > 0) {
                urgenciasResponse.response.nota.diagnosticos.forEach(element => {
                    urge_diagnosticoTabla += `<tr>
                                                        <td>${element.diagnostico}</td>
                                                        <td>${element.complemento}</td>
                                                    </tr>`
                })
            } else {
                urge_diagnosticoTabla += `<tr><td colspan="3">Sin registros</td></tr>`
            }
        
        urge_diagnosticoTabla += `</tbody></table>`


    urge_nota_diagnostico.innerHTML                                     =   urge_diagnosticoTabla //urgenciasResponse.response.nota.diagnostico


    let urge_planEstudioValor = []
    
            if (urgenciasResponse.response.nota.planEstudio && urgenciasResponse.response.nota.planEstudio.length > 0) {
                urgenciasResponse.response.nota.planEstudio.forEach(element => {
                    urge_planEstudioValor.push(element.plan)
                })
            }

            let urge_pronosticoEstudioValor = []
    
    if (urgenciasResponse.response.nota.planEstudio && urgenciasResponse.response.nota.planEstudio.length > 0) {
        urgenciasResponse.response.nota.planEstudio.forEach(element => {
            console.log(element,"diagnosticos",element.pronostico)
            urge_pronosticoEstudioValor.push(element.pronostico)
        })
    }

       console.log(urge_pronosticoEstudioValor,"Pronostico",urgenciasResponse.response.nota.planEstudio) 

    urge_nota_planEstudio.innerHTML                                     =   urge_planEstudioValor.join(", ")//urgenciasResponse.response.nota.planEstudio
    urge_nota_pronostico.innerHTML                                      =   urge_pronosticoEstudioValor.join(", ")//urgenciasResponse.response.nota.pronostico
    urge_nota_tipoUrgencia.innerHTML                                    =   urgenciasResponse.response.nota.tipoUrgencia ?? "&nbsp; "

    urge_tratamientoDieta_tipoFormula.innerHTML                         =   urgenciasResponse.response.tratamientoDieta.tipoFormula ?? "&nbsp; "
    urge_tratamientoDieta_cantidad.innerHTML                            =   urgenciasResponse.response.tratamientoDieta.cantidad    ?? "&nbsp; "
    urge_tratamientoDieta_calorias.innerHTML                            =   urgenciasResponse.response.tratamientoDieta.calorias    ?? "&nbsp; "
    urge_tratamientoDieta_cantidadPrescrita.innerHTML                   =   urgenciasResponse.response.tratamientoDieta.cantidadPrescrita   ?? "&nbsp; "
    urge_tratamientoDieta_tipoDieta.innerHTML                           =   urgenciasResponse.response.tratamientoDieta.tipoDieta   ?? "&nbsp; "
    urge_tratamientoDieta_tipoLiquido.innerHTML                         =   urgenciasResponse.response.tratamientoDieta.tipoLiquido ?? "&nbsp; "
    urge_tratamientoDieta_viaAdministracion.innerHTML                   =   urgenciasResponse.response.tratamientoDieta.viaAdministracion   ?? "&nbsp; "


    let urge_elementosTabla = `<table class="table table-sm table-secondary">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Elemento</th>
                                                                        <th scope="col">Cantidad</th>
                                                                        <th scope="col">Concentración</th>
                                                                        <th scope="col">Vía</th>
                                                                        <th scope="col">Medicamento</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>`
    
            if (urgenciasResponse.response.elementos && urgenciasResponse.response.elementos.length > 0) {
                urgenciasResponse.response.elementos.forEach(elementos => {
                    urge_elementosTabla += `<tr>
                                                        <td>${elementos.elemento}</td>
                                                        <td>${elementos.cantidad}</td>
                                                        <td>${elementos.concentracion}</td>
                                                        <td>${elementos.viaAdministracion}</td>
                                                        <td>${elementos.medicamento}</td>
                                                    </tr>`
                })
            } else {
                urge_elementosTabla += `<tr><td colspan="5">Sin registros</td></tr>`
            }
        
        urge_elementosTabla += `</tbody></table>`

    urge_elementos.innerHTML                                            =   urge_elementosTabla //urgenciasResponse.response.elementos


    let urge_controlLiquidosTabla = `<table class="table table-sm table-secondary">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Elemento</th>
                                                                        <th scope="col">Cantidad</th>
                                                                        <th scope="col">Caracteristicas</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>`
    
            if (urgenciasResponse.response.controlLiquidos && urgenciasResponse.response.controlLiquidos.length > 0) {
                urgenciasResponse.response.controlLiquidos.forEach(elementos => {
                    urge_controlLiquidosTabla += `<tr>
                                                        <td>${elementos.viaIngreso}</td>
                                                        <td>${elementos.cantidad} ml</td>
                                                        <td>${elementos.caracteristica}</td>
                                                    </tr>`
                })
            } else {
                urge_controlLiquidosTabla += `<tr><td colspan="3">Sin registros</td></tr>`
            }
        
        urge_controlLiquidosTabla += `</tbody></table>`

    urge_controlLiquidos.innerHTML                                      =   urge_controlLiquidosTabla //urgenciasResponse.response.controlLiquidos

    urge_procedimientoValor =   []

    if(urgenciasResponse.response.procedimientos && urgenciasResponse.response.procedimientos.length > 0){
        urgenciasResponse.response.procedimientos.forEach(valor=>{
            urge_procedimientoValor.push(valor.procedimiento)
        })
    }


    urge_procedimientos.innerHTML                                       =   urge_procedimientoValor.join(", ") ?? "&nbsp;" //urgenciasResponse.response.procedimientos

    let urge_interdependientesTabla = `<table class="table table-sm table-secondary">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Tratamiento</th>
                                                                        <th scope="col">Frecuencia</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>`
    
        if (urgenciasResponse.response.interdependientes && urgenciasResponse.response.interdependientes.length > 0) {
            urgenciasResponse.response.interdependientes.forEach(elementos => {
                urge_interdependientesTabla += `<tr>
                                                    <td>${elementos.tratamiento}</td>
                                                    <td>${elementos.frecuencia}</td>
                                                </tr>`
            })
        } else {
            urge_interdependientesTabla += `<tr><td colspan="2">Sin registros</td></tr>`
        }
    urge_interdependientesTabla += `</tbody></table>`
    urge_interdependientes.innerHTML                                    =   urge_interdependientesTabla //urgenciasResponse.response.interdependientes

    document.getElementById('notasMedicas-section').style.display = 'none'
    document.getElementById('hipertension-section').style.display = 'none'
    document.getElementById('diabetes-section').style.display = 'none'
    document.getElementById('prenatal-section').style.display = 'none'
    document.getElementById('climaterio-section').style.display = 'none'
    document.getElementById('estomatologia-section').style.display = 'none'
    document.getElementById('planificacion-section').style.display = 'none'
    document.getElementById('urgencias-section').style.display  = 'block'

}
let msomt_incapacidades = (incapacidadResponse)   =>  {
    // incapacidadResponse = {"http_code":200,"error":"","response":{"idPaciente":"AAAA7109194G11MGE1","cveUnidadMedica":"360118252110  ","idNota":4645240,"idEvento":1,"identificacion":"Credencial para votar","numeroIdentificacion":"273173571","cveDelegacion":"36","unidad":"UMF No. 11","delegacion":"2 Noreste D.F.","certificado":"WC114123","patron":"MANUFACTURERA","puesto":"Encargados y trabajadores en control de almacén y bodega","tipoIncapacidad":"Recaida","diasAutorizados":7,"diasRecuperacion":14,"diasAcumulados":0,"ramoSeguro":"Riesgo de trabajo","controlPrenatal":"No","probableRiesgo":"No","tipoRiesgo":"Enfermedad de trabajo","fechaInicio":"2020-10-22 00:00:00.0","fechaExpedicion":"2020-10-22 18:34:19.267","diagnostico":"Seguimiento a distancia SARS-CoV- 2","idCie":"U07D      ","complemento":"COMPLEMENTO","medicoAutoriza":"NO APLICA","trabajadorImss":"No","incapacidadManual":"No"},"URL":"http:\/\/172.16.162.62\/salud\/msomt-incapacidades\/v1\/incapacidades?cveUnidadMedica=360118252110&idPaciente=AAAA7109194G11MGE1&idNota=4645240&idEvento=1"}
    console.log(incapacidadResponse,"Incapacidad")
    // $("#msomt-incapacidades").modal("show")

    let receta_filio                    =   document.getElementById("receta_filio")
    let receta_diasAut                  =   document.getElementById('receta_diasAut')
    let receta_diasProb                 =   document.getElementById('receta_diasProb')
    let receta_diasAcumulados                   =   document.getElementById('receta_diasAcumulados')
    let receta_fechaInicial                 =   document.getElementById('receta_fechaInicial')
    let receta_rSeguro                  =   document.getElementById('receta_rSeguro')
    let receta_fechaExpedicion                  =   document.getElementById('receta_fechaExpedicion')
    let receta_tipoIncapacidad                  =   document.getElementById('receta_tipoIncapacidad')
    let receta_puestoTrabajo                    =   document.getElementById('receta_puestoTrabajo')

   

    receta_filio.innerHTML              =    ''//recetaResponse.response.individuales[0].folio ?? ''


    // INCAPACIDAD
    receta_filio.innerHTML              =   incapacidadResponse.response.certificado ?? ""
    receta_diasAut.innerHTML                =   incapacidadResponse.response.diasAutorizados ?? ""
    receta_diasProb.innerHTML               =   incapacidadResponse.response.diasRecuperacion ?? ""
    receta_diasAcumulados.innerHTML             =   incapacidadResponse.response.diasAcumulados ?? ""
    receta_fechaInicial.innerHTML               =   (incapacidadResponse.response.fechaInicio && incapacidadResponse.response.fechaInicio.length > 5)   ? fechaHomologada(incapacidadResponse.response.fechaInicio)    : ""
    receta_rSeguro.innerHTML                =   incapacidadResponse.response.ramoSeguro ?? ""
    receta_fechaExpedicion.innerHTML                =   (incapacidadResponse.response.fechaExpedicion && incapacidadResponse.response.fechaExpedicion.length > 5)   ?   fechaHomologada(incapacidadResponse.response.fechaExpedicion) :""
    receta_tipoIncapacidad.innerHTML                =   incapacidadResponse.response.tipoIncapacidad ?? ""
    receta_puestoTrabajo.innerHTML              =   incapacidadResponse.response.puesto ?? ""

    
    $("#incapacidadContent").removeClass("d-none")
    // $("#btn-DAuxiliares").removeClass('hide')
    $('#btn-auxiliar').removeClass('hide');

}
let msomt_individual = (recetaResponse)   =>  {
    console.log(recetaResponse,"individual")
    // $("#msomt-recetaindividual").modal("show")

    
    let receta_filio                    =   document.getElementById("receta_filio")
            let datosCompletos                  =   document.getElementById("datosCompletos")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<fieldset> <legend class="card-title">Receta individual</legend><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Tomar</th>
                                                                            <th scope="col">Cada</th>
                                                                            <th scope="col">Durante</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
            recetaResponse.response.individuales.forEach(subsecuente => {
                let fecha = subsecuente.fecha
                if (subsecuente.medicamentos && subsecuente.medicamentos.length > 0) {
                    subsecuente.medicamentos.forEach(element => {
                        recete_recetasIndividualesTabla += `<tr>
                                                            <td>RECETA INDIVIDUAL: ${(element.cveEspecifico=="ZZZZ")?element.medicamento +'<br> INDICACIONES: '+element.indicaciones :element.medicamento +' ' +element.cantidadDosis + ' '+ element.dosis +'<br> INDICACIONES: '+element.indicaciones }</td>
                                                            <td>${(element.cveEspecifico=="ZZZZ")?"":element.cantidadIntervalo + ' '+ element.intervalo}</td>
                                                            <td>${(element.cveEspecifico=="ZZZZ")?"":element.cantidadDuracion + ' '+ element.duracion}</td>
                                                        </tr>`
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            })
            recete_recetasIndividualesTabla += `</tbody></table></fieldset>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletos").removeClass("d-none")
            // $("#btn-DAuxiliares").removeClass('hide')
            $('#btn-auxiliar').removeClass('hide');
    

}
let msomt_recetaTranscripcion = (recetaTranscripcion)   =>  { 
    let datosCompletosTranscripcion =   document.getElementById('datosCompletosTranscripcion');
        if(recetaTranscripcion.response.transcripciones && recetaTranscripcion.response.transcripciones.length > 0){
                let recete_recetasTranscripcionTabla = `<fieldset> <legend class="card-title">Receta Transcripcion</legend><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Tomar</th>
                                                                            <th scope="col">Cada</th>
                                                                            <th scope="col">Durante</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
            recetaTranscripcion.response.transcripciones.forEach(subsecuente => {
                let fecha = ''//subsecuente.fecha
                if (subsecuente.medicamentos && subsecuente.medicamentos.length > 0) {
                    subsecuente.medicamentos.forEach(element => {
                        recete_recetasTranscripcionTabla += `<tr>
                                                            <td>RECETA TRANSCRIPCIÓN: ${element.medicamento+' ' +element.cantidadDosis + ' '+ element.dosis +'<br> INDICACIONES: '+element.indicaciones}</td>
                                                            <td>${element.cantidadIntervalo + ' '+ element.intervalo}</td>
                                                            <td>${element.cantidadDuracion + ' '+ element.duracion}</td>
                                                        </tr>`
                    })
                } else {
                    recete_recetasTranscripcionTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            })
            recete_recetasTranscripcionTabla += `</tbody></table></fieldset>`
            let datosCompletosData  =   recete_recetasTranscripcionTabla

            datosCompletosTranscripcion.innerHTML        =   datosCompletosData


            $("#datosCompletosTranscripcion").removeClass("d-none")
            // $("#btn-DAuxiliares").removeClass('hide')
            $('#btn-auxiliar').removeClass('hide');
            
        }
}
let msomt_resurtible = (resurtibleResponse)   =>  {
    console.log(resurtibleResponse,"resurtible")
    let datosCompletos                  =   document.getElementById("datosCompletosresurtible")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<h4>Receta</h4><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Tomar</th>
                                                                            <th scope="col">Cada</th>
                                                                            <th scope="col">Durante</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
                                                                    console.log(resurtibleResponse,resurtibleResponse.response,resurtibleResponse.response.resurtibles)

            resurtibleResponse.response.resurtibles.forEach(subsecuente => {
                let fecha = subsecuente.fecha
                if (subsecuente.Medicamentos && subsecuente.Medicamentos.length > 0) {
                    subsecuente.Medicamentos.forEach(element => {
                        recete_recetasIndividualesTabla += `<tr>
                                                            <td>RECETA RESURTIBLE: ${(element.cveEspecifico=="ZZZZ")?element.medicamento +'<br> INDICACIONES: '+element.indicaciones :element.medicamento +' ' +element.cantidadDosis + ' '+ element.dosis +'<br> INDICACIONES: '+element.indicaciones }</td>
                                                            <td>${(element.cveEspecifico=="ZZZZ")?"":element.cantidadIntervalo + ' '+ element.intervalo}</td>
                                                            <td>${(element.cveEspecifico=="ZZZZ")?"":element.cantidadDuracion + ' '+ element.duracion}</td>
                                                        </tr>`
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            })
            recete_recetasIndividualesTabla += `</tbody></table>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletosresurtible").removeClass("d-none")
    // $("#msomt-recetaindividual").modal("show")

}

let msomt_referencia = (referenciaResponse)   =>  {
    console.log(referenciaResponse,"referencia")
    let datosCompletos                  =   document.getElementById("datosCompletosReferencia")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<h4>Referencia</h4><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Tipo</th>
                                                                            <th scope="col">Especialidad que se envia</th>
                                                                            <th scope="col">Unidad que se envia</th>
                                                                           
                                                                            <th scope="col">Motivo envío</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
           
                if (referenciaResponse.response && referenciaResponse.response.length > 0) {
                    referenciaResponse.response.forEach(element => {
                        recete_recetasIndividualesTabla += `<tr>
                                                            <td>${element.tipo}</td>
                                                            <td>${element.especialidad }</td>
                                                            <td>${element.unidad }</td>

                                                            <td>${element.motivoEnvio }</td>
                                                        </tr>`
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="4">Sin registros</td></tr>`
                }
            
            recete_recetasIndividualesTabla += `</tbody></table>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletosReferencia").removeClass("d-none")

}

let msomt_serviciosumf = (serviciosumfResponse)   =>  {
    console.log(serviciosumfResponse,"serviciosumf")
    let datosCompletos                  =   document.getElementById("datosCompletosServiciosUMF")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<h4>Servicios UMF</h4><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Tipo</th>
                                                                            <th scope="col">Ocasion</th>
                                                                            <th scope="col">Servicio</th>
                                                                            <th scope="col">Motivo envío</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
           
                if (serviciosumfResponse.response && serviciosumfResponse.response.length > 0) {
                    serviciosumfResponse.response.forEach(element => {
                        recete_recetasIndividualesTabla += `<tr>
                                                            <td>${element.tipo}</td>

                                                            <td>${element.ocasion }</td>
                                                            <td>${element.servicio }</td>
                                                            <td>${element.motivoEnvio }</td>
                                                        </tr>`
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="7">Sin registros</td></tr>`
                }
            
            recete_recetasIndividualesTabla += `</tbody></table>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletosServiciosUMF").removeClass("d-none")


            

}


let msomt_rayosx = (rayosxResponse)   =>  {
    console.log(rayosxResponse,"rayosx")
    let datosCompletos                  =   document.getElementById("datosCompletosRayosX")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<h4>Solicitud de Rayos X</h4><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Grupo o Región</th>
                                                                            <th scope="col">Estudio</th>
                                                                            <th scope="col">Observaciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
           
                if (rayosxResponse.response && rayosxResponse.response.length > 0) {
                    rayosxResponse.response.forEach(element => {
                        // let Estudio = '<ul>'
                        
                        element.estudios.forEach(elementos =>{
                            // Estudio += `<li>${elementos.estudio + ' -> ' + elementos.tipoEstudio}</li>`
                            recete_recetasIndividualesTabla += `<tr>
                                                            <td>${elementos.tipoEstudio}</td>
                                                            <td>${elementos.estudio }</td>
                                                            <td>${elementos.indicaciones }</td>
                                                        </tr>`
                        })
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="4">Sin registros</td></tr>`
                }
            
            recete_recetasIndividualesTabla += `</tbody></table>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletosRayosX").removeClass("d-none")
}

let msomt_laboratorio = (laboratorioResponse)   =>  {
    console.log(laboratorioResponse,"laboratorio")
    let datosCompletos                  =   document.getElementById("datosCompletosLaboratorio")

            // receta_filio.innerHTML              =   recetaResponse.response.individuales[0].folio


            let recete_recetasIndividualesTabla = `<h4>Solicitud de Laboratorio</h4><table class="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Area</th>
                                                                            <th scope="col">Estudio</th>
                                                                            <th scope="col">Indicaciones</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
           
                if (laboratorioResponse.response && laboratorioResponse.response.length > 0) {
                    laboratorioResponse.response.forEach(element => {
                        
                        
                        element.estudios.forEach(elementos =>{
                            // Estudio += `<li>${elementos.estudio + ' -> ' + elementos.tipoEstudio}</li>`
                            recete_recetasIndividualesTabla += `<tr>
                                                            <td>${elementos.tipoEstudio}</td>
                                                            <td>${elementos.estudio }</td>
                                                            <td>${elementos.observaciones }</td>
                                                        </tr>`
                        })
                        
                        
                    })
                } else {
                    recete_recetasIndividualesTabla += `<tr><td colspan="3">Sin registros</td></tr>`
                }
            
            recete_recetasIndividualesTabla += `</tbody></table>`
            let datosCompletosData  =   recete_recetasIndividualesTabla

            datosCompletos.innerHTML        =   datosCompletosData


            $("#datosCompletosLaboratorio").removeClass("d-none")


            

}