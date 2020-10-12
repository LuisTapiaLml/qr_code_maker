const conexion =  (url,metodo, data) =>{
    
    let respuesta = fetch(url,{
        body:data,
        method:metodo
    }).then(response =>{
        return response.json();
    }).catch(error =>{
        
        console.error(error);

        return ({
            info:{
                estado:'error',
                mensaje:'Hubo un error inesperado'
            },
            data:{}
        })
    })

    return respuesta

}


export {conexion}