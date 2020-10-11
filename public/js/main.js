import { generar_codigo } from "./qrcode/generar_codigo.js";
import { toggle_opciones } from "./interfas/toggle_opciones.js";

// const formulario = document.querySelector('#formulario_codigo');
const botones_opcion =  document.querySelectorAll('.boton_opcion');
const boton_generar_codigo =  document.querySelector('#boton_generar_codigo');



botones_opcion.forEach(boton =>{
    boton.addEventListener('click',toggle_opciones);
});


boton_generar_codigo.addEventListener('click',generar_codigo);