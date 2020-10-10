setTimeout(() => {



	
    var canvas = document.querySelector('#qrcode').querySelector('canvas');
    canvas.style.display='block'
    // if (canvas.getContext) {
    // 	var ctx = canvas.getContext("2d");

    // 	//define the colour of the square
    // 	ctx.strokeStyle = "blue";
    // 	ctx.fillStyle = "blue";



    // 	// Draw a square using the fillRect() method and fill it with the colour specified by the fillStyle attribute
    // 	let ancho = 400;
    // 	let largo = 100;
    // 	ctx.fillRect((250-(ancho/2)),(250-(largo/2)),ancho,largo);
        
    // 	ctx.strokeStyle = "red";
    // 	ctx.fillStyle = "red";
    // 	ctx.fillRect(250,250,1,1);
    // 	ctx.stroke();

    // }
    // var dataURL = canvas.toDataURL();

    // let img = document.createElement('img');
    // img.src = dataURL;

    // document.body.appendChild(img)

    // var link = document.createElement("a");

    // document.body.appendChild(link); // for Firefox

    // link.innerHTML='descargame perro'

    // link.setAttribute("href", dataURL);
    // link.setAttribute("download", "nombreimganen.png");

}, 2000);
// link.click();


//hace ciruclos
if(
    (row === 0 && col < 7) || 
    (row === 0 && col >= nCount - 7) ||
    ( (row > 0 && row <  7   )  && (col == 0 ) ) ||
    ( (row > 0 && row <  7   )  && (col == 6 ) ) ||
    ( (row == 6   )  && (col < 6 ) ) || 
    ( (row == 6   )  && (col >=  nCount - 7  ) ) || 
    ( (row < 7   )  && (col ==  nCount - 1   ) ) || 
    ( (row > 0 && row <  7   )  && (col == nCount - 7 ) ) ||
    (  ( row == nCount -7 ) && ( col < 7 ) ) ||
    (  ( row  >= nCount - 7 ) && (col == 6) ) ||
    (  ( row === nCount - 1  )  && ( col < 7 )  ) || 
    ( ( row >= nCount -7 ) && (col == 0) ) 
    ){
        // console.log(Math.floor(  Math.random()*225 ) );
        _oContext.fillRect(nLeft, nTop, nWidth, nHeight); //quique esta linea no estaba comentada
    }else if(bIsDark) {
       //quique, las siguientes 4 lineas no estaban
            _oContext.beginPath();
            _oContext.arc(nLeft +( nWidth / 2), nTop + (nHeight/2), nWidth / 2 , 0, 2 * Math.PI);
            
            _oContext.fill();
            
            _oContext.stroke();
    }


    // let canvas = document.createElement('canvas');

// canvas.width= 500;

// canvas.height= 500;

// document.body.append(canvas);
// var ctx = canvas.getContext('2d');
// let numero  = 33 ;

// let ancho_figura = canvas.width / numero ;

// let alto_figura = canvas.height / numero ;
// let color = 'rgb(46, 220, 171)';
// // ctx.strokeStyle ='black';
// // ctx.rect(10,10,10,10);

// for (let fila = 0; fila < numero; fila++) {
//     for (let columna = 0; columna < numero; columna++) {
        
        
//         if(
//         (fila === 0 && columna < 7) || 
//         (fila === 0 && columna >= numero - 7) ||
//         ( (fila > 0 && fila <  7   )  && (columna == 0 ) ) ||
//         ( (fila > 0 && fila <  7   )  && (columna == 6 ) ) ||
//         ( (fila == 6   )  && (columna < 6 ) ) || 
//         ( (fila == 6   )  && (columna >=  numero - 7  ) ) || 
//         ( (fila < 7   )  && (columna ==  numero - 1   ) ) || 
//         ( (fila > 0 && fila <  7   )  && (columna == numero - 7 ) ) ||
//         (  ( fila == numero -7 ) && ( columna < 7 ) ) ||
//         (  ( fila  >= numero - 7 ) && (columna == 6) ) ||
//         (  ( fila === numero - 1  )  && ( columna < 7 )  ) || 
//         ( ( fila >= numero -7 ) && (columna == 0) ) 
//         ){
//             // console.log(Math.floor(  Math.random()*225 ) );
//             ctx.fillStyle = color;
//             // console.log(`rgb(${Math.random()*225},${Math.random()*225},${Math.random()*225})`);
//         }else{
//             ctx.fillStyle ='black'; 
//         }

       
//         console.log(columna,fila);
//         ctx.fillRect(columna * ancho_figura,fila * alto_figura,ancho_figura,alto_figura);

       
//     }

// }

// ctx.stroke();

// function getRandomColour(){
//     var red = Math.floor(Math.random()* 255);
//     var green = Math.floor(Math.random() * 255);
//     var blue = Math.floor(Math.random() * 255);
  
//     return "rgb("+red+","+green+"," +blue+" )";  
//   }