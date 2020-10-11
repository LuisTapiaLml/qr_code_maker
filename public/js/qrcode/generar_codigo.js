import { conexion } from "../funciones/conexion.js";
import { mensaje } from "../funciones/mensaje.js";
import { recolectar_formulario } from "../funciones/recolectar_formulario.js";
import { generar_texto } from "./generar_texto.js";
import { _generar_codigo } from "./patrones y llamada a main.js";
import { QRCode } from "./qrcode.js";

const generar_codigo = () => {

    let info_form = recolectar_formulario('.formulario_codigo.activo');

    if (!info_form.info.estado) {
        mensaje(info_form.info);
        return false;
    }

    let tipo = document.querySelector('.formulario_codigo.activo').dataset.tipo;

    info_form.data.tipo = tipo;

    let texto = generar_texto(info_form.data);

    const _QRCode = new QRCode();

    console.log(texto.data);

    let codigo = _QRCode.makeCode(texto.data);
    let formulario = document.querySelector('#contenedor_configuracion_codigo');
    let _color_fondo = formulario.querySelector('#color_fondo').value;
    let _color_esquinas = formulario.querySelector('#color_esquinas').value;
    let _color_oscuro = formulario.querySelector('#color_oscuro').value;
    let _tipo = formulario.querySelector('#tipo_figura').value;

    _generar_codigo(codigo, _color_fondo, _color_oscuro, _color_esquinas, _tipo, null)

};

export { generar_codigo };