const valores = {
    canvas : document.querySelector('#canvas'),
    ctx : canvas.getContext('2d'),
    nivel : 0,
    ancho_canvas : canvas.width,
    alto_canvas : canvas.height,
    ancho_figuras : 1,
    alto_figuras : 10,
    color_claro : '#ffffff',
    color_oscuro : '#000000',
    color_esquina : '#000000',
    tipo : 'cuadrado',
    logotipo : null,
    oQrCode : null
}; 

// valores.ctx = valores.canvas.widt


export { valores };
