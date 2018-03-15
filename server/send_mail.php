#!/usr/bin/php

<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
//Load composer's autoloader
require '/var/www/html/vendor/autoload.php';
include_once '/var/www/html/gif_360_web/gui/txtParser.php'; //location of txt parser

echo "\n================SEND MAIL================\n";

$mail = new PHPMailer(true);// Passing `true` enables exceptions
$username='contacto@socialevent.mx'; //$username='soporte.gif360@gmail.com';
$pswd='D-*JbO{SBOa;';

$minidir=$argv[1];
$file=$minidir . "/gif_settings.txt";
$values=parse_txt($file);
$recipient=array();

echo "\n================RECIPIENT(S):================\n";

if ( count($values["mailto"]) > 1 ) {
    print_r($values["mailto"]);
    $recipient=$values["mailto"];
} else {
    echo $values["mailto"] . "\n";
    $recipient[0]=$values["mailto"];
}

$base_url="http://socialevent.mx/gif/uploads/360/";

$files=array_diff(scandir($minidir), array('..', '.'));
#print_r($files);
foreach ($files as $filename) {
    #echo "$filename" . "\n";
    if ( strstr($filename, '.mp4') ) $v_url=$base_url . $filename;
    if ( strstr($filename, '.gif') ) $img_url=$base_url . $filename;
}

$m_subject=$values["fb_message"];

$email_msg = <<< SHACA
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>MOVIL EVOLUTION | COLEGIO MONTEVERDE
</title>
</head>
<body>
<center>
<!--Comienza heading-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#004e20">
<tbody>
<tr>
<td align="center" valign="top" style="color: #FFFFFF; padding: 3px; font-family: Verdana;"><br>Si no puedes ver este anuncio importante, <a href="#" style="color: #FEC714;">sigue este enlace.</a><br><br>
</td>
</tr>
<tr><td style="background-color: #;font-size: 18px; color: #FFFFFF; font-family: Lato; text-align: center; padding: 5px; line-height: 40px;" align="center"><b>COLEGIO MONTEVERDE</b><br>
<hr width="50%" style="color: #6a6a6a;"></td></tr>
</tbody>
</table>
<!--Content-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#ffffff">
<tbody>
<tr><td><img src="http://socialevent.mx/gif/uploads/360/images/monteverde/headbanner.png" />
</tr>
</tbody>
</table>
<!--Video-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#f2f2f2">
<tbody>
<a href="$v_url">
<img border="0" src="$img_url" width="600" height="400">
</a>
</tbody>
</table>
<!--Button-->
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#FFFFFF">
<tbody>
<tr>
<td></td><td style="background-color: #0000000 border-radius: 5px; width: 300px; height: 60px; color: #; font-family: Verdana; text-align: center;font-size: 30px;"><a href="#" target="_blank" style="text-decoration: none; color: #FEC714;">DESCARGAR</a></td><td></td>
</tr>
</tbody>
</table>
<table cellspacing="0" cellpadding="0" width="600" bgcolor="#FFFFFF">
<tr><td style="font-size: 17px; color: #000000; font-family: Verdana; text-align: center; padding: 6px; padding-top: 24px;"><a href="http://movil-evolution.com.mx/" style="text-decoration: none;">Movil Evolution</a></td></tr>
<tr><td style="font-size: 12px; color: #3a3a3a; font-family: Verdana; text-align: center; padding: 6px;">

<a href="https://www.facebook.com/Movil-Evolution-99624818770/?pnref=story" target="_blank" style="text-decoration: none;"><img src="http://socialevent.mx/gif/uploads/360/images/monteverde/SM-3.png" width="40" height="40" style="padding: 3px;"></a>
<a href="https://twitter.com/movil_evo" target="_blank" style="text-decoration: none;"><img src="http://socialevent.mx/gif/uploads/360/images/monteverde/SM-4.png" width="40" height="40" style="padding: 3px;"></a>
<a href="https://www.instagram.com/movilevolution_mx/" target="_blank" style="text-decoration: none;"><img src="http://socialevent.mx/gif/uploads/360/images/monteverde/SM-1.png" width="40" height="40" style="padding: 3px;"></a></td></tr>
</table>
<!--Footer terminos y condiciones-->
<table cellspacing="0" cellpadding="4" width="600" bgcolor="#FFFF#014924">
<tbody>
<tr>
<td width="496" style="background-color: #FFFFFF; font-size: 9px; color: #6a6a6a; font-family: Verdana; text-align: justify;">
<br>
<p align="center">El tratamiento de los datos personales en Movil Evolution se realiza en conformidad con el Aviso de Privacidad Integral que se encuentra disponible en la página de Internet <a href="http://socialevent.mx/privacidad/" style="color: #e96c24">movil-evolution.mx</a> en la sección “PolItica de privacidad”.</p>
<br>
<br>
<center><a href="http://movil-evolution.com.mx/"></a></center>
<br>
<center style="color: #6a6a6a">Movil Evolution SA de CV, Derechos reservados 2018</center>
<br>
</td></tr>
</tbody>
</table>
</center>
</body>
</html>


SHACA;

try {
    //Server settings
    $mail->SMTPDebug = 2;                                   // Enable verbose debug output
    $mail->isSMTP();                                        // Set mailer to use SMTP
    $mail->Host = 'mail.socialevent.mx';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $username;                 // SMTP username
    $mail->Password = $pswd;                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($username);
    $count = 0;
    foreach($recipient as $member){
        if ($count > 0) {
            $mail->addBCC($member);
        }
        else {
            $mail->addAddress($member);
        }
        $count += 1;
    }
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment($m_attch);    // Optional name
    //$mail->addAttachment($m_attch, 'gif360');    // Optional name

    //Content
    $mail->CharSet = 'UTF-8';
    //$mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $m_subject;

    $mail->Body = $email_msg;


    $mail->isHTML(true);
    //$mail->AltBody = '!Este correo contiene un Gif360!';

    $mail->send();
    echo 'Message has been sent' . "\r\n";
} catch (Exception $e) {
    echo 'Message could not be sent.' . "\r\n";
    echo 'Mailer Error: ' . $mail->ErrorInfo . "\r\n";
}
