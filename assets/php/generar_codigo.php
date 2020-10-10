<?php 
include './funciones.php';


$accion = isset($_POST['accion']) ? filter_var($_POST['accion']) : null ;


$info;
$error = false;

switch ($accion) {
    case 'url':
        $url =  filter_var($_POST['url'],FILTER_SANITIZE_STRING);
        $info = $url;

        break;

    case 'vcard':
        $nombre_tel =  filter_var($_POST['nombre_tel'],FILTER_SANITIZE_STRING);
        $tel_tel =  filter_var($_POST['tel_tel'],FILTER_SANITIZE_STRING);
        $email_tel =  filter_var($_POST['email_tel'],FILTER_SANITIZE_STRING);

        $info  = 'BEGIN:VCARD'."\n";
        $info .= 'FN:'.$nombre_tel."\n";
        $info .= 'TEL;WORK;VOICE:'.$tel_tel."\n";
        $info .= 'EMAIL:'.$email_tel."\n";

        break;
    
    case 'email':

        $email_email =  filter_var($_POST['email_email'],FILTER_SANITIZE_STRING);
        $asunto_email =  filter_var($_POST['asunto_email'],FILTER_SANITIZE_STRING);
        $mensaje_email =  filter_var($_POST['mensaje_email'],FILTER_SANITIZE_STRING);

        $info = 'mailto:'.$email_email.'?subject='.urlencode($asunto_email).'&body='.urlencode($mensaje_email);

        break;
    
    case 'sms':
        $tel_sms =  filter_var($_POST['tel_sms'],FILTER_SANITIZE_STRING);
        $mensaje_sms =  filter_var($_POST['mensaje_sms'],FILTER_SANITIZE_STRING);

        $info = 'SMSTO:'.$tel_sms . ':'.$mensaje_sms;

        break;
    
    case 'texto':
        $texto_texto =  filter_var($_POST['texto_texto'],FILTER_SANITIZE_STRING);
        
        $info = $texto_texto;

        break;

    default:
        $error = true;
        $respuesta['info']['estado'] = false;
        $respuesta['info']['mensaje'] = 'Hubo un error inesperado'; 
        break;
}



if($error){ 
        $respuesta['info']['estado'] = false;
        $respuesta['info']['mensaje'] = 'Hubo un error inesperado'; 
}else{
    generar_codigo($info);
} 


echo json_encode($respuesta);


