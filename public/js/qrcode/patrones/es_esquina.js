import { valores } from '../constructor_codigo.js'; 


function es_esquina(y, x) {
    //valida si las posiciones corresponden a los cuadros de las esquinas
    // los cuadros SIEMPRE estan formados de 7x7 en el codigo que se genera
    if ((y === 0 && (x < 7 || x >= valores.oQrCode.moduleCount - 7)) ||
        (y === 6 && (x < 7 || x >= valores.oQrCode.moduleCount - 7)) ||
        ((y === valores.oQrCode.moduleCount - 7 || y === valores.oQrCode.moduleCount - 1) && x < 7) ||
        ((y < 7 || y >= valores.oQrCode.moduleCount - 7) && (x === 0 || x === 6)) ||
        (y < 7 && (x === valores.oQrCode.moduleCount - 7 || x === valores.oQrCode.moduleCount - 1))
    ) { 
        return {estado:true,esquina:true};
    } else if (((y >= 2 && y <= 4) && ((x >= 2 && x <= 4) || (x > valores.oQrCode.moduleCount - 6 && x < valores.oQrCode.moduleCount - 2))) ||
        ((y >= valores.oQrCode.moduleCount - 5 && y <= valores.oQrCode.moduleCount - 3) && (x >= 2 && x <= 4))
    ) {
        return {estado:true,esquina:false};
    }

    return {estado:false,esquina:false};
}


export { es_esquina };