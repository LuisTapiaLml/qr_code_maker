
import { Respuesta } from "./respuesta.js";

/**
 * 
 * @param {string} identificador // identificador del contenedor del formulario 
 */

const recolectar_formulario =  (identificador) =>{
    let mensaje= ``;
    let hubo_error = false ;
    let data = {}
    let respuesta = new Respuesta();

    let contenedor_formuario =  document.querySelector(identificador);
    
    let elementos =  contenedor_formuario.querySelectorAll('.campo_data');

    elementos.forEach(elemento  => {

        if( elemento.required  ){
            if(elemento.value.trim() !== ""){
                data[elemento.name] = elemento.value.trim();
            }else{
                mensaje = 'Lo campos marcardos son requeridos';
                hubo_error = true;
            }
        }else{
            data[elemento.name]= elemento.value.trim();
        }

    });

    respuesta.info.estado = hubo_error ? false  : true ;
    respuesta.info.tipo = hubo_error ? 'error' : 'success';
    respuesta.info.mensaje = hubo_error  ? mensaje :  "Datos recopilados con éxito";
    respuesta.data = data;

    return respuesta;
}


export { recolectar_formulario }