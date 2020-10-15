import { valores } from '../constructor_codigo.js'; 
import { es_esquina } from './es_esquina.js';
    

function pintar_cuadrado(row,col) {
    // console.log(valores);
    let nWidth = valores.ancho_canvas / valores.nivel;
    let nHeight = valores.alto_canvas    / valores.nivel;
    let nRoundedWidth = Math.round(nWidth);
    let nRoundedHeight = Math.round(nHeight);
    let mi_color='';

    valores.oQrCode.modules[row][col] ? mi_color = valores.color_oscuro : mi_color = valores.color_claro ;
    // console.log(String(bIsDark));
    let nLeft = col * nWidth;
    let nTop = row * nHeight;

    valores.ctx.lineWidth = 1;
    valores.ctx.strokeStyle = mi_color
    valores.ctx.fillStyle = mi_color

    valores.ctx.fillRect(nLeft, nTop, nWidth, nHeight);

    // 안티 앨리어싱 방지 처리
    valores.ctx.strokeRect(
        Math.floor(nLeft) + 0.5,
        Math.floor(nTop) + 0.5,
        nRoundedWidth,
        nRoundedHeight
    );

    valores.ctx.strokeRect(
        Math.ceil(nLeft) - 0.5,
        Math.ceil(nTop) - 0.5,
        nRoundedWidth,
        nRoundedHeight
    );

    valores.ctx.fillStyle = 'white';
    valores.ctx.strokeStyle ='white';
}


export { pintar_cuadrado };