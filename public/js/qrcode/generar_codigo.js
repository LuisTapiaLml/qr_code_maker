import { mensaje ,mensaje_esquina } from "../funciones/mensaje.js";
import { recolectar_formulario } from "../funciones/recolectar_formulario.js";
import { generar_texto } from "./generar_texto.js";
import { _generar_codigo } from "./patrones y llamada a main.js";
import { QRCode } from "./qrcode.js";

const generar_codigo = async () => {

    let info_form = recolectar_formulario('.formulario_codigo.activo');

    if (!info_form.info.estado) {
        mensaje(info_form.info);
        return false;
    }

    let tipo = document.querySelector('.formulario_codigo.activo').dataset.tipo;

    info_form.data.tipo = tipo;

    let texto = generar_texto(info_form.data);

    const _QRCode = new QRCode();

   

    let codigo = _QRCode.makeCode(texto.data);
    
    

    let formulario = document.querySelector('#contenedor_configuracion_codigo');
    let _color_fondo = formulario.querySelector('#color_fondo').value;
    let _color_esquinas = formulario.querySelector('#color_esquinas').value;
    let _color_oscuro = formulario.querySelector('#color_oscuro').value;
    let _tipo = formulario.querySelector('#tipo_figura').value;

    console.log(_tipo,codigo);

    let resp = await _generar_codigo(codigo, _color_fondo, _color_oscuro, _color_esquinas, _tipo, null)

    if(resp) mensaje_esquina({tipo:'success',mensaje:'codigo generado'})

    document.querySelector('.vista_codigo').style.display='flex'

    if(window.screen.height <= 800){
        
        setTimeout(window.scrollTo(0,document.body.scrollHeight),100);
    }
};

export { generar_codigo };