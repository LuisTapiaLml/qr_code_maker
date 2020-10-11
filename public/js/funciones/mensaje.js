const mensaje = ({tipo,encabezado,mensaje}) =>{

    Swal.fire(
        encabezado,
        mensaje,
        tipo
      )
}


export { mensaje }