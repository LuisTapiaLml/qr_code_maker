import { conexion } from "./funciones/conexion.js";

const generar_codigo =  () =>{
    let data =  new FormData();

    let formulario = document.querySelector(".formulario_codigo.activo");

    console.log(formulario);

    let datos = formulario.querySelectorAll('.campo_data');

    data.append('accion',formulario.dataset.tipo);

    datos.forEach(dato => {

        data.append(dato.name,dato.value);

    });

    mandar_datos(data);
};


const mandar_datos = async (data) =>{
    const url = 'assets/php/generar_codigo.php';

    let respuesta = await conexion(url,'POST',data);

    mostar_codigo(respuesta);
}


const mostar_codigo = (respuesta) =>{
    console.log(respuesta);
    
    const contenedor = document.querySelector('.vista_codigo');
    const img =  document.createElement('img');

    img.classList.add('img_codigo_qr');
    img.src = respuesta.data.url
    
    contenedor.innerHTML= ``;
    contenedor.append(img);
    
};



export {generar_codigo};