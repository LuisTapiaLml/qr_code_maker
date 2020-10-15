import { valores } from "../constructor_codigo.js"


function pintar_esquina(col, row, esquina) {

    // console.log(valores);
    let nWidth = valores.ancho_canvas / valores.nivel;
    let nHeight = valores.alto_canvas / valores.nivel;
    let nRoundedWidth = Math.round(nWidth);
    let nRoundedHeight = Math.round(nHeight);

    let mi_color = valores.oQrCode.modules[col][row] ? valores.color_esquina : valores.color_claro;

    let nLeft = col * nWidth;
    let nTop = row * nHeight;


    valores.ctx.strokeStyle = mi_color
    valores.ctx.lineWidth = 1;

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

}


export { pintar_esquina }