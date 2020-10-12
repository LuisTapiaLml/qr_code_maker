import {QRCode} from './qrcode.js'; 

let qrcode = new QRCode(document.getElementById("qrcode"), {
    width:500,
    height:500,
    colorDark : "#000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H,
    // useSVG : true
});

function generar_codigo () {		
	let elText = document.getElementById("text");
	
	if (!elText.value) {
		alert("Input a text");
		elText.focus();
		return;
	}
	
	let oQrCode = qrcode.makeCode(elText.value);

	console.log('eureka-->',oQrCode);
}
generar_codigo();

let input_texto =  document.querySelector('#text');

input_texto.addEventListener('keydown',function (e) {
		if (e.keyCode == 13) {
			generar_codigo();
		}
});

