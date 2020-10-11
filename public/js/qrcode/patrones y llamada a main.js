let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let nivel = 0;

let ancho_canvas = canvas.width;
let alto_canvas = canvas.height;

let ancho_figuras = 10;
let alto_figuras = 10;

let color_claro = "#ffffff";
let color_oscuro = "#000000";
let color_esquina = "#000000";
let tipo = 'cuadrado';
let logotipo = null;
let oQrCode = null;

// generar_codigo("#ffffff","#1b2432","#028090",tipo);

export async function _generar_codigo(qrModel, claro , oscuro, esquina, tipo_figura, logo = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    oQrCode = qrModel;
    nivel = oQrCode.moduleCount;
    ancho_figuras = ancho_canvas / nivel;
    alto_figuras = alto_canvas / nivel;
    nivel = oQrCode.moduleCount;

    color_claro = claro;
    color_oscuro = oscuro,
    color_esquina = esquina;
    tipo = tipo_figura;

    for (let fila = 0; fila < nivel; fila++) {

        for (let columna = 0; columna < nivel; columna++) {

            pintar_figura(fila, columna);

        }

    }

    if (logo !== null) {

        let respuesta = await cargar_logo(logo);

        if (respuesta) {
            generar_link_descarga();
        } else {
            throw new Error('¡Ups!')
        }

    } else {
        generar_link_descarga();
    }

}

function pintar_figura(x, y) {

    if (tipo === 'cuadrado') {
        pintar_cuadrado(x, y);
    }

    if (tipo === 'circular') {
        pintar_circulo(x, y);
    }

    if (tipo === 'cuadro_punto') {
        pintar_cuadro_punto(x, y);
    }

    if (tipo === 'dino') {
        pintar_dino(x, y);
    }

}


function es_esquina(x, y) {
    //valida si las posiciones corresponden a los cuadros de las esquinas
    // los cuadros SIEMPRE estan formados de 7x7 en el codigo que se genera
    if ((y === 0 && (x < 7 || x >= oQrCode.moduleCount - 7)) ||
        (y === 6 && (x < 7 || x >= oQrCode.moduleCount - 7)) ||
        ((y === oQrCode.moduleCount - 7 || y === oQrCode.moduleCount - 1) && x < 7) ||
        ((y < 7 || y >= oQrCode.moduleCount - 7) && (x === 0 || x === 6)) ||
        (y < 7 && (x === oQrCode.moduleCount - 7 || x === oQrCode.moduleCount - 1))
    ) { 
        return true;
    } else if (((y >= 2 && y <= 4) && ((x >= 2 && x <= 4) || (x > oQrCode.moduleCount - 6 && x < oQrCode.moduleCount - 2))) ||
        ((y >= oQrCode.moduleCount - 5 && y <= oQrCode.moduleCount - 3) && (x >= 2 && x <= 4))
    ) {
        return true;
    }
    return false;
}



function pintar_cuadrado(row, col) {
    
    let nWidth = ancho_canvas / nivel;
    let nHeight = alto_canvas    / nivel;
    let nRoundedWidth = Math.round(nWidth);
    let nRoundedHeight = Math.round(nHeight);
    let mi_color='';
    let bIsDark = oQrCode.modules[row][col];
    // console.log(String(bIsDark));
    let nLeft = col * nWidth;
    let nTop = row * nHeight;

    if(bIsDark){
        if(es_esquina(col, row)){
            console.log('es esquina');
            mi_color = color_esquina
        }else{
            mi_color = color_oscuro
        }
    }else{
        mi_color=color_claro
    }

    
    ctx.strokeStyle = mi_color
    ctx.lineWidth = 1;
    if(bIsDark){
        if(es_esquina(col, row)){
            mi_color = color_esquina
        }else{
            mi_color = color_oscuro
        }
    }else{
        mi_color=color_claro
    }
    
    ctx.fillStyle = mi_color
    ctx.fillRect(nLeft, nTop, nWidth, nHeight);

    // 안티 앨리어싱 방지 처리
    ctx.strokeRect(
        Math.floor(nLeft) + 0.5,
        Math.floor(nTop) + 0.5,
        nRoundedWidth,
        nRoundedHeight
    );

    ctx.strokeRect(
        Math.ceil(nLeft) - 0.5,
        Math.ceil(nTop) - 0.5,
        nRoundedWidth,
        nRoundedHeight
    );

}

function pintar_circulo(x, y) {

    if( es_esquina(x,y) ){
        pintar_cuadrado(x,y);
        return false;
    }else if( !oQrCode.modules[x][y] ){
        return false;
    }

    let xReal = x * ancho_figuras;
    let yReal = y * alto_figuras;

    let radio_cirulo = ancho_figuras / 2;

    let centro_x = xReal + (ancho_figuras / 2);
    let centro_y = yReal + (alto_figuras / 2);

    ctx.lineWidth = 1
    ctx.fillStyle = color_oscuro
    ctx.strokeStyle = color_oscuro

    ctx.beginPath();
    ctx.arc(centro_x, centro_y, radio_cirulo, 0, 2 * (Math.PI));
    ctx.fill();
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

    let data_base_64 = canvas.toDataURL('image/jpeg', 1.0);

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