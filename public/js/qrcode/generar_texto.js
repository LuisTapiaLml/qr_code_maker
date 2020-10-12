import { mensaje } from "../funciones/mensaje.js";
import { Respuesta } from "../funciones/respuesta.js";

const generar_texto =  (data) =>{
    
    let respuesta = new Respuesta();
    let texto = '';
    let hubo_error = false;
    try {

        switch (data.tipo) {
            case 'url':
                texto = data.url.trim();
                break;
            
            case 'vcard':

                texto = `BEGIN:VCARD
FN:${data.nombre_tel.trim()}
TEL;WORK;VOICE:${data.tel_tel.trim()}
EMAIL${data.email_tel.trim()}
END:VCARD`;

                break;

            case 'email':
                texto =`mailto:${data.email_email.trim()}?subject=${data.asunto_email.trim()}&body=${data.mensaje_email.trim()}`
                
                break;
            case 'sms':
                texto = `SMSTO:${data.tel_sms.trim()}:${data.mensaje_sms.trim()}`
                break;
            case 'texto':
                texto = data.texto_texto.trim();
                break;
            
            default:
                respuesta_error('Error','Hubo un problema al generar el texto',respuesta);
                hubo_error = true
                break;
        }
        
        if(!hubo_error){
            
            respuesta.info.estado = true;
            respuesta.info.tipo='success';
            respuesta.info.encabezado = 'Éxito';
            respuesta.info.mensaje='El texto se genero de manera correcta';
            respuesta.data = texto;
        }
        
    } catch (error) {
        console.error(error);
        console.log('pero no se rompio');
        respuesta_error('Error','Hubo un problema al generar el texto',respuesta);
    }

    return respuesta;
}


const respuesta_error = (encabezado,mensaje,respuesta) => {

    respuesta.info.estado = false;
    respuesta.info.tipo='error';
    respuesta.info.encabezado = encabezado;
    respuesta.info.mensaje=mensaje;

}


export { generar_texto };