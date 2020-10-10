import {codigo as oQrCode } from './codigo.js';
console.log(oQrCode);

let canvas = document.querySelector('#canvas');
let  ctx = canvas.getContext('2d');

let nivel = oQrCode.moduleCount;

let ancho_canvas = canvas.width;
let alto_canvas = canvas.height;

let ancho_figuras = ancho_canvas /  nivel ;
let alto_figuras = alto_canvas / nivel;

let color_claro = null ;
let color_oscuro = null ;
let color_esquina = null;
let tipo = 'cuadro_punto';
let logotipo = null;

generar_codigo("#ffffff","#1b2432","#028090",tipo);

async function generar_codigo(claro,oscuro,esquina,tipo_figura = null,logo = null){

    color_claro = claro;
    color_oscuro = oscuro,
    color_esquina = esquina;
    tipo = tipo_figura;

    if(color_claro != null ){
        ctx.fillStyle = color_claro;
        ctx.fillRect(0, 0, ancho_canvas,alto_canvas);
    }

    for (let fila = 0; fila < nivel; fila++) {
    
        for (let columna = 0; columna < nivel; columna++) {
            
            pintar_figura(fila,columna);
            
        }
        
    }

    if(logo !== null){
        
        let respuesta = await cargar_logo(logo);

        if (respuesta) {  
            generar_link_descarga();
        }else{
            throw new Error('¡Ups!')
        } 
        
    }else{
        generar_link_descarga();
    }
    
    

}

function pintar_figura (x,y){

    if(es_esquina(x,y) ){
        return false;
    }

    if(oQrCode.modules[x][y] && tipo === 'cuadrado'){
        pintar_cuadrado(x,y,color_oscuro);
    }

    if(oQrCode.modules[x][y] && tipo === 'circular'){
        pintar_circulo(x,y,color_oscuro);
    }

    if(oQrCode.modules[x][y] && tipo === 'cuadro_punto'){
        pintar_cuadro_punto(x,y,color_oscuro);
    }

    if(oQrCode.modules[x][y] && tipo === 'dino'){
        pintar_dino(x,y,color_oscuro);
    }

}


function es_esquina(x,y){
    //valida si las posiciones corresponden a los cuadros de las esquinas
    // los cuadros SIEMPRE estan formados de 7x7 en el codigo que se genera

    if( ( y === 0 && ( x < 7 || x >= oQrCode.moduleCount - 7   ))  ||
        ( y === 6 && (x < 7  || x >= oQrCode.moduleCount - 7   ) ) ||
        ( (y === oQrCode.moduleCount - 7 || y === oQrCode.moduleCount - 1)  &&  x < 7 ) ||
        ( ( y < 7  || y >=  oQrCode.moduleCount - 7 ) && (x === 0 || x === 6) ) ||
        ( y < 7  && (x === oQrCode.moduleCount - 7 || x === oQrCode.moduleCount - 1 )  )
    ){
        pintar_esquina(x,y)
        return true;
    }else if(  ( (y  >=  2 && y <= 4  )   && ((x >= 2 && x <= 4 ) || ( x > oQrCode.moduleCount - 6  && x< oQrCode.moduleCount - 2 )  ) ) ||
               ( (y  >=  oQrCode.moduleCount - 5 && y  <=  oQrCode.moduleCount - 3)  && (x >= 2 && x <= 4 ) ) 
        ){
            pintar_esquina(x,y)
            return true;
        }
    return false;
}

function pintar_esquina(x,y){
    
    pintar_cuadrado(x,y,color_esquina);
}



function pintar_cuadrado (x,y,color) {
    let xReal  = x * ancho_figuras;
    let yReal = y * alto_figuras;
    let nRoundedWidth = Math.round(ancho_figuras);
    let nRoundedHeight = Math.round(alto_figuras);

    ctx.lineWidth = 1
    ctx.fillStyle = color
    ctx.strokeStyle = color
    
    ctx.fillRect(xReal ,yReal,ancho_figuras,alto_figuras);
    ctx.rect(xReal ,yReal,ancho_figuras,alto_figuras);

    ctx.strokeRect(
        Math.floor(xReal) + 0.5,
        Math.floor(yReal) + 0.5,
        nRoundedWidth,
        nRoundedHeight
    );

    ctx.strokeRect(
        Math.floor(xReal) - 0.5,
        Math.floor(yReal) - 0.5,
        nRoundedWidth,
        nRoundedHeight
    );
   
}

function pintar_circulo(x,y,color){
    let xReal  = x * ancho_figuras;
    let yReal = y * alto_figuras;

    let radio_cirulo = ancho_figuras / 2;
    
    let centro_x = xReal +( ancho_figuras / 2);
    let centro_y = yReal + (alto_figuras/2);

    ctx.lineWidth = 1
    ctx.fillStyle = color
    ctx.strokeStyle = color

    ctx.beginPath();
    ctx.arc(centro_x , centro_y , radio_cirulo , 0, 2 * (Math.PI  ));
    ctx.fill();
}

function pintar_cuadro_punto(x,y,color){
    let xReal  = x * ancho_figuras;
    let yReal = y * alto_figuras;

    // se agrega al final de un color en exadecimal para definir la tranparencia
    /*  
        0% = #00,10% = #16,20% = #32,30% = #48,40% = #64, 50% = #80, 60% = #96 , 70% = #112 ,80% = #128 ,90% = #144
    */
    ctx.lineWidth = 1

    ctx.fillStyle = color + '64'; 
    ctx.strokeStyle = color  + '64' ;
    
    ctx.fillRect(xReal ,yReal,ancho_figuras,alto_figuras);
    let radio_cirulo = ancho_figuras /5;
    let centro_x = xReal +( ancho_figuras / 2);
    let centro_y = yReal + (alto_figuras/2);

    ctx.fillStyle = color; 
    ctx.strokeStyle = color  ;

    ctx.beginPath();
    ctx.arc(centro_x , centro_y , radio_cirulo , 0, 2 * (Math.PI  ));
    ctx.fill();
}


function pintar_dino(x,y,color){
    let xReal  = x * ancho_figuras;
    let yReal = y * alto_figuras;
    let img = new Image();
    img.src = './img/dinosaurio (2).png';

    img.onload = function (){
        ctx.drawImage(img,(xReal  ), (yReal ),ancho_figuras ,alto_figuras ); 
    }
}

function cargar_logo (logo) {
    return new Promise((resolve,reject)=>{
        let img = new Image();

        let URL = window.URL;
        let area_codigo = ancho_canvas * alto_canvas;
        let area_permitida = area_codigo * .3;
        let area_origina_logo ;

        
        let src = URL.createObjectURL(logo);
        img.src = src;

        img.onload = function (){
            area_origina_logo = img.width * img.height
            
            let nuevo_ancho=0;
            let nuevo_alto= 0;

            nuevo_alto =  (area_origina_logo * .25 ) / img.width;
        
            nuevo_ancho =  (area_origina_logo * .25 ) / img.height;

            let posision_x = ( ancho_canvas / 2 ) - ( nuevo_ancho / 2 );
            let posision_y = ( alto_canvas /  2 ) - ( nuevo_alto / 2 ) ;

            ctx.drawImage(img,posision_x, posision_y,nuevo_ancho ,nuevo_alto );
            
            resolve(true);
        }
        img.onerror = () =>{
            reject(false);
        }
    })
}



function generar_link_descarga(){
    let contenedor_codigo = document.querySelector('#contenedor_link_descarga');
    
    let link =  document.createElement('a');
    
    let data_base_64 =canvas.toDataURL('image/png',1);

    contenedor_codigo.innerHTML = '';

    link.classList.add('link_descarga');
    link.innerHTML='Descargar Código';
    link.href = data_base_64
    link.download ="codigo QR.png";

    contenedor_codigo.append(link)
}


// obtiene los nuevos datos para generar el codigo
let formulario =  document.querySelector('#formulario_colores');

formulario.addEventListener('submit',iniciar_carga);


function iniciar_carga(e){
    e.preventDefault();
    
    let _color_fondo = formulario.querySelector('#color_fondo').value ; 
    let _color_esquinas = formulario.querySelector('#color_esquinas').value;
    let _color_oscuro = formulario.querySelector('#color_oscuro').value;
    let _tipo = formulario.querySelector('#tipo_figura').value;
    let _logotipo = formulario.querySelector('#logotipo').files[0] ? formulario.querySelector('#logotipo').files[0] : null ;
    
    generar_codigo(_color_fondo,_color_oscuro,_color_esquinas,_tipo,_logotipo);

}