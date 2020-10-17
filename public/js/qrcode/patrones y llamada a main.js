import { valores } from './constructor_codigo.js'; 
import { es_esquina } from './patrones/es_esquina.js';
import { pintar_circulo } from './patrones/pintar_circulo.js';
import { pintar_cuadrado } from "./patrones/pintar_cuadrado.js";
import { pintar_esquina } from './patrones/pintar_esquina.js';

export  function _generar_codigo(qrModel, claro , oscuro, esquina, tipo_figura, logo = null) {
    return new Promise( async ( resolve , reject ) =>{

    valores.ctx.clearRect(0, 0, valores.canvas.width, valores.canvas.height);
    valores.ctx.fillStyle = "white";
    valores.ctx.fillRect(0, 0, canvas.width, canvas.height);

    valores.oQrCode = qrModel;
    valores.nivel = valores.oQrCode.moduleCount;
    valores.ancho_figuras = valores.ancho_canvas / valores.nivel;
    valores.alto_figuras = valores.alto_canvas / valores.nivel;
    valores.nivel = valores.oQrCode.moduleCount;

    valores.color_claro = claro;
    valores.color_oscuro = oscuro,
    valores.color_esquina = esquina;
    valores.tipo = tipo_figura;

    for (let fila = 0; fila < valores.nivel; fila++) {

        for (let columna = 0; columna < valores.nivel; columna++) {

            pintar_figura(fila, columna);

        }

    }

    if (valores.logo !== null) {
        let respuesta = 2;
        // let respuesta = await cargar_logo(valores.logo);

        if (respuesta) {
            generar_link_descarga();
        } else {
            throw new Error('¡Ups!')
        }

    } else {
        generar_link_descarga();
    }
    resolve(true);
    });
}

function pintar_figura(x, y) {

    let esquina =  es_esquina(x,y);

    if(esquina.estado){
        pintar_esquina(x,y,esquina);
        return false
    }

    if (valores.tipo === 'cuadrado') {
        pintar_cuadrado(x, y);
    }

    if (valores.tipo === 'circular') {
        pintar_circulo(x, y);
    }

    if (valores.tipo === 'cuadro_punto') {
        pintar_cuadro_punto(x, y);
    }

    if (valores.tipo === 'dino') {
        pintar_dino(x, y);
    }

}

function pintar_cuadro_punto(x, y, color) {
    let xReal = x * ancho_figuras;
    let yReal = y * alto_figuras;

    // se agrega al final de un color en exadecimal para definir la tranparencia
    /*  
        0% = #00,10% = #16,20% = #32,30% = #48,40% = #64, 50% = #80, 60% = #96 , 70% = #112 ,80% = #128 ,90% = #144
    */
    ctx.lineWidth = 1

    ctx.fillStyle = color + '64';
    ctx.strokeStyle = color + '64';

    ctx.fillRect(xReal, yReal, ancho_figuras, alto_figuras);
    let radio_cirulo = ancho_figuras / 5;
    let centro_x = xReal + (ancho_figuras / 2);
    let centro_y = yReal + (alto_figuras / 2);

    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.arc(centro_x, centro_y, radio_cirulo, 0, 2 * (Math.PI));
    ctx.fill();
}


function pintar_dino(x, y, color) {
    let xReal = x * ancho_figuras;
    let yReal = y * alto_figuras;
    let img = new Image();
    img.src = './img/dinosaurio (2).png';

    img.onload = function () {
        ctx.drawImage(img, (xReal), (yReal), ancho_figuras, alto_figuras);
    }
}

function cargar_logo(logo) {
    return new Promise((resolve, reject) => {
        let img = new Image();

        let URL = window.URL;
        let area_codigo = ancho_canvas * alto_canvas;
        let area_permitida = area_codigo * .3;
        let area_origina_logo;


        let src = URL.createObjectURL(logo);
        img.src = src;

        img.onload = function () {
            area_origina_logo = img.width * img.height

            let nuevo_ancho = 0;
            let nuevo_alto = 0;

            nuevo_alto = (area_origina_logo * .25) / img.width;

            nuevo_ancho = (area_origina_logo * .25) / img.height;

            let posision_x = (ancho_canvas / 2) - (nuevo_ancho / 2);
            let posision_y = (alto_canvas / 2) - (nuevo_alto / 2);

            ctx.drawImage(img, posision_x, posision_y, nuevo_ancho, nuevo_alto);

            resolve(true);
        }
        img.onerror = () => {
            reject(false);
        }
    })
}



function generar_link_descarga() {
    let contenedor_codigo = document.querySelector('#contenedor_link_descarga');

    let link = document.createElement('a');

    let data_base_64 = valores.canvas.toDataURL('image/jpeg', 1.0);

    contenedor_codigo.innerHTML = '';

    link.classList.add('link_descarga');
    link.innerHTML = 'Descargar Código';
    link.href = data_base_64
    link.download = "codigo QR.png";

    contenedor_codigo.append(link)
}


// obtiene los nuevos datos para generar el codigo
// let formulario =  document.querySelector('#formulario_colores');

// formulario.addEventListener('submit',iniciar_carga);


// function iniciar_carga(e){
//     e.preventDefault();

//     let _color_fondo = formulario.querySelector('#color_fondo').value ; 
//     let _color_esquinas = formulario.querySelector('#color_esquinas').value;
//     let _color_oscuro = formulario.querySelector('#color_oscuro').value;
//     let _tipo = formulario.querySelector('#tipo_figura').value;
//     let _logotipo = formulario.querySelector('#logotipo').files[0] ? formulario.querySelector('#logotipo').files[0] : null ;

//     generar_codigo(_color_fondo,_color_oscuro,_color_esquinas,_tipo,_logotipo);

// }