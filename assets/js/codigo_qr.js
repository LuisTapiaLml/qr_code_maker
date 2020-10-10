import { conexion } from  "./funciones/conexion.js";
import { generar_codigo } from "./generar_codigo.js";
import { toggle_opciones } from "./toggle_opciones.js";

// const formulario = document.querySelector('#formulario_codigo');
const botones_opcion =  document.querySelectorAll('.boton_opcion');
const boton_generar_codigo =  document.querySelector('#boton_generar_codigo');




// formulario.addEventListener('submit',validar_formulario_codigo);

botones_opcion.forEach(boton =>{
    boton.addEventListener('click',toggle_opciones);
});


boton_generar_codigo.addEventListener('click',generar_codigo);