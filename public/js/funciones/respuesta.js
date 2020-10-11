function Respuesta() {
    this.respuesta = {
        info : {
            estado : false,
            mensaje: "",
            encabezado : "",
            tipo:""
        },
        data :null
    }

    return this.respuesta;
}




export { Respuesta };