import { valores } from '../constructor_codigo.js'; 
import { es_esquina } from './es_esquina.js';
import { pintar_cuadrado } from './pintar_cuadrado.js';

function pintar_circulo(x, y) {
    
    if(!valores.oQrCode.modules[x][y]) return false

    let xReal = y * valores.ancho_figuras;
    let yReal = x * valores.alto_figuras;

    let radio_cirulo = valores.ancho_figuras / 2;

    let centro_x = xReal + (valores.ancho_figuras / 2);
    let centro_y = yReal + (valores.alto_figuras / 2);

    let mi_color =  valores.color_oscuro ;

    valores.ctx.lineWidth = 1
    valores.ctx.fillStyle = mi_color;
    valores.ctx.strokeStyle =mi_color;

    valores.ctx.beginPath();
    valores.ctx.arc(centro_x, centro_y, radio_cirulo, 0, 2 * (Math.PI));
    valores.ctx.fill();
    
}

export { pintar_circulo };