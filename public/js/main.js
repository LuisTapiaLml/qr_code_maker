import { generar_codigo } from "./qrcode/generar_codigo.js";
import { toggle_opciones } from "./interfas/toggle_opciones.js";

// const formulario = document.querySelector('#formulario_codigo');
const botones_opcion =  document.querySelectorAll('.boton_opcion');
const boton_generar_codigo =  document.querySelector('#boton_generar_codigo');
const patrones =  document.querySelectorAll('.patron');
const input_patron =  document.querySelector('#tipo_figura');
const campos_editables =  document.querySelectorAll('.campo_data');

botones_opcion.forEach(boton =>{
    boton.addEventListener('click',toggle_opciones);
});

patrones.forEach(patron =>{

    patron.addEventListener('click',(e)=>{
        
        patrones.forEach(p => p.classList.remove('activo'));

        let tipo = e.currentTarget.dataset.tipo;

        input_patron.value=tipo;

        patron.classList.add('activo')
        generar_codigo();
    })

})

campos_editables.forEach(campo =>{
    campo.addEventListener('change',generar_codigo);
})

boton_generar_codigo.addEventListener('click',generar_codigo);