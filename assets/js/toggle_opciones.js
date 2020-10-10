const toggle_opciones =  (e) =>{
    const opcion = e.currentTarget.dataset.opcion;
    
    console.log(opcion);
    
    document.querySelectorAll('.boton_opcion').forEach(boton =>{
        
         boton.dataset.opcion === opcion ? boton.classList.add('activo') :  boton.classList.remove('activo');
 
     })

    document.querySelectorAll('.formulario_codigo').forEach(formulario =>{
     
        formulario.dataset.tipo === opcion ? formulario.classList.add('activo') :  formulario.classList.remove('activo');

    })

};

export {toggle_opciones};