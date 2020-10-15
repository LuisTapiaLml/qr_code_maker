const mensaje = ({tipo,encabezado,mensaje}) =>{

    Swal.fire(
        encabezado,
        mensaje,
        tipo
      )
}

const mensaje_esquina = ({tipo,encabezado,mensaje}) =>{

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: tipo,
    title: mensaje
  })


}


export { mensaje ,mensaje_esquina }