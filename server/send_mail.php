#!/usr/bin/php

<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader

require '/var/www/html/vendor/autoload.php';

$mail = new PHPMailer(true);// Passing `true` enables exceptions
$username='soporte.gif360@gmail.com';
$pswd=base64_decode('WjJsbU16WXc=');
$recipient='rodrigo.mmr1991@gmail.com';
$m_attch='/home/onikom/Pictures/nov14-1556.mp4';

try {
    //Server settings
    $mail->SMTPDebug = 2;                                   // Enable verbose debug output
    $mail->isSMTP();                                        // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $username;                 // SMTP username
    $mail->Password = $pswd;                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($username, 'Gif360');
    //$mail->addAddress('antonio.credoz@gmail.com', 'Anthony');     // Add a recipient
    $mail->addAddress($recipient);               // Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    $mail->addAttachment($m_attch);    // Optional name
    //$mail->addAttachment($m_attch, 'gif360');    // Optional name

    //Content
    $mail->CharSet = 'UTF-8';    
    //$mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Gif360';
    
    $mail->Body    = <<<'EOD'
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Movil Evolution | Evolution is not a force but a process. Not a cause but a law.
    </title>
    </head>
    <body>
    <center>
    <!--Comienza heading-->
    <table cellspacing="0" cellpadding="0" width="590" bgcolor="#fff">
    <tbody>
    <tr>
    <td align="center" valign="top" style="color: #b5b5b5; padding: 3px;"><br>Si no puedes ver este anuncio importante, <a href="http://www.w-wings.mx/NewsLetter/Semana-1.html" style="color: #007ad1;">sigue este enlace.</a><br><br>
    </td>
    </tr>
    <tr><td style="background-color: #000" align="center"><img src="images/logo_BE-2.png" width="250" height="auto"></td></tr>
    <tr><td style="background-color: #000;font-size: 18px; color: #ff7300; font-family: Arial; text-align: center; padding: 3px;" align="center">Evolution is not a force but a process.<br>Not a cause but a law.<br></td></tr>
    </tbody>
    </table>
    <!--Logos-->
    <table cellspacing="0" cellpadding="0" width="600" bgcolor="#fff">
    <tbody>
    <tr>
    <td width="300" align="center"><img src="images/logos_02.png" width="200" height="auto"></td><td width="300" align="center"><img src="images/logos_04.png" width="200" height="auto"></td>
    </tr>
    </tbody>
    <!--Content-->
    <table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">
    <tbody>
    <tr>
    <td width="300" align="center" style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;"><h1><strong>¡Agradecemos tu participación en nuestro GIF 360°!</strong></h1></p>
    
    <p>Ahora tienes un recuerdo memorable de tu participación en la Copa de Golf Peyrelongue.</p>
    
    <p>Así como este photo opportunity, a través de tecnología y creatividad, desarrollamos experiencias a la medida que cautivan por su originalidad y eficiente impacto en el consumidor.</p>
    </td>
    </tr>
    </tbody>
    </table>    
    <!--Content2-->
    <table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">
    <tbody>
    <tr>
    <td width="300" align="center" style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;"><p>En esta nueva era, donde los asiduos cambios tecnológicos afectan el comportamiento de los consumidores hacia las marcas, las estrategias de marketing BTL (below the line) se han convertido en el modo principal de conectar a la audiencia con una marca.</p>
    </td>
    </tr>
    </tbody>
    </table>
    <table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">
    <tr ><td align="center"><img src="images/sevices.png" width="450" height="auto"></td></tr>
    </table>
    <table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">
    <tr><td style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;">Conoce nuestros alcances, proyectos e innovaciones. <br>Visita nuesta página  web y/o redes sociales:</td></tr>
    <tr><td style="font-size: 14px; color: #fff; font-family: Arial; text-align: center; padding: 6px;">
    <a href="aquíva el link de toyutuve"><img src="images/SM-1.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de vimeo"><img src="images/SM-2.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de facebook"><img src="images/SM-3.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de twitter"><img src="images/SM-4.png" width="30" height="30" style="padding: 3px;"></a></td></tr>
    </table>
    <!--Footer terminos y condiciones-->
    <table cellspacing="0" cellpadding="4" width="600" bgcolor="#fff">
    <tbody>
    <tr>
    <td width="496" style="background-color: #030000;font-size: 9px; color: #fff; font-family: Arial; text-align: justify;">
    <p align="center">¿Deseas dejar de recibir nuestros comunicados?, <a href="" style="color: #ff7300">sigue este enlace.</a></p>
    <br>
    <p align="center">El tratamiento de los datos personales en Movil evolution se realiza en conformidad con el Aviso de Privacidad Integral que se encuentra disponible en la página de Internet <a href="http://movil-evolution.com.mx/" style="color: #ff7300">movil-evolution.com.mx</a> en la sección “PolItica de privacidad”.</p>
    <br>
    <br>
    <center><a href="http://movil-evolution.com.mx/"><img src="images/logo_BE-2.png" width="auto" height="60"></a></center>
    <br>
    <center>Movil Evolution SA de CV, Derechos reservados 2017</center>
    <br>
    </td></tr>
    </tbody>
    </table>
    </center>
    </body>
    </html>
    EOD;
    
    //$mail->Body    = '<b>!</b>Este correo contiene un  <b>Gif360!</b>';
    //$mail->Body  = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
    //$mail->Body .= '<html xmlns="http://www.w3.org/1999/xhtml">';
    //$mail->Body .= '<head>';
    //$mail->Body .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
    //$mail->Body .= '<title>Movil Evolution | Evolution is not a force but a process. Not a cause but a law.';
    //$mail->Body .= '</title>';
    //$mail->Body .= '</head>';
    //$mail->Body .= '<body>';
    //$mail->Body .= '<center>';
    //$mail->Body .= '<!--Comienza heading-->';
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="590" bgcolor="#fff">';
    //$mail->Body .= '<tbody>';
    //$mail->Body .= '<tr>';
    //$mail->Body .= '<td align="center" valign="top" style="color: #b5b5b5; padding: 3px;"><br>Si no puedes ver este anuncio importante, <a href="http://www.w-wings.mx/NewsLetter/Semana-1.html" style="color: #007ad1;">sigue este enlace.</a><br><br>';
    //$mail->Body .= '</td>';
    //$mail->Body .= '</tr>';
    //$mail->Body .= '<tr><td style="background-color: #000" align="center"><img src="images/logo_BE-2.png" width="250" height="auto"></td></tr>';
    //$mail->Body .= '<tr><td style="background-color: #000;font-size: 18px; color: #ff7300; font-family: Arial; text-align: center; padding: 3px;" align="center">Evolution is not a force but a process.<br>Not a cause but a law.<br></td></tr>';
    //$mail->Body .= '</tbody>';
    //$mail->Body .= '</table>';
    //#<!--Logos-->
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" bgcolor="#fff">';
    //$mail->Body .= '<tbody>';
    //$mail->Body .= '<tr>';
    //$mail->Body .= '<td width="300" align="center"><img src="images/logos_02.png" width="200" height="auto"></td><td width="300" align="center"><img src="images/logos_04.png" width="200" height="auto"></td>';
    //$mail->Body .= '</tr>';
    //$mail->Body .= '</tbody>';
    //#<!--Content-->
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">';
    //$mail->Body .= '<tbody><tr>';
    //$mail->Body .= '<td width="300" align="center" style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;"><h1><strong>¡Agradecemos tu participación en nuestro GIF 360°!</strong></h1></p>';
    //$mail->Body .= '<p>Ahora tienes un recuerdo memorable de tu participación en la Copa de Golf Peyrelongue.</p>';
    //$mail->Body .= '<p>Así como este photo opportunity, a través de tecnología y creatividad, desarrollamos experiencias a la medida que cautivan por su originalidad y eficiente impacto en el consumidor.</p>';
    //$mail->Body .= '</td>';
    //$mail->Body .= '</tr>';
    //$mail->Body .= '</tbody>';
    //$mail->Body .= '</table>';
    //#<!--Video-->
    //#$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" height="480" bgcolor="#ccc">';
    //#$mail->Body .= '<tbody>';
    //#$mail->Body .= '<tr>';
    //#$mail->Body .= '<td width="300" align="center"></td>';
    //#$mail->Body .= '</tr>';
    //#$mail->Body .= '</tbody>';
    //#$mail->Body .= '</table>';
    //#<!--Content2-->
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">';
    //$mail->Body .= '<tbody>';
    //$mail->Body .= '<tr>';
    //$mail->Body .= '<td width="300" align="center" style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;"><p>En esta nueva era, donde los asiduos cambios tecnológicos afectan el comportamiento de los consumidores hacia las marcas, las estrategias de marketing BTL (below the line) se han convertido en el modo principal de conectar a la audiencia con una marca.</p>';
    //$mail->Body .= '</td>';
    //$mail->Body .= '</tr>';
    //$mail->Body .= '</tbody>';
    //$mail->Body .= '</table>';
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">';
    //$mail->Body .= '<tr ><td align="center"><img src="images/sevices.png" width="450" height="auto"></td></tr>';
    //$mail->Body .= '</table>';
    //$mail->Body .= '<table cellspacing="0" cellpadding="0" width="600" bgcolor="#000">';
    //$mail->Body .= '<tr><td style="font-size: 14px; color: #fff; font-family: Arial; text-align: center;">Conoce nuestros alcances, proyectos e innovaciones. <br>Visita nuesta página  web y/o redes sociales:</td></tr>';
    //$mail->Body .= '<tr><td style="font-size: 14px; color: #fff; font-family: Arial; text-align: center; padding: 6px;">';
    //$mail->Body .= '<a href="aquíva el link de toyutuve"><img src="images/SM-1.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de vimeo"><img src="images/SM-2.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de facebook"><img src="images/SM-3.png" width="30" height="30" style="padding: 3px;"></a><a href="aquíva el link de twitter"><img src="images/SM-4.png" width="30" height="30" style="padding: 3px;"></a></td></tr>';
    //$mail->Body .= '</table>';
    //#<!--Footer terminos y condiciones-->
    //$mail->Body .= '<table cellspacing="0" cellpadding="4" width="600" bgcolor="#fff">';
    //$mail->Body .= '<tbody>';
    //$mail->Body .= '<tr>';
    //$mail->Body .= '<td width="496" style="background-color: #030000;font-size: 9px; color: #fff; font-family: Arial; text-align: justify;">';
    //$mail->Body .= '<p align="center">¿Deseas dejar de recibir nuestros comunicados?, <a href="" style="color: #ff7300">sigue este enlace.</a></p>';
    //$mail->Body .= '<br>';
    //$mail->Body .= '<p align="center">El tratamiento de los datos personales en Movil evolution se realiza en conformidad con el Aviso de Privacidad Integral que se encuentra disponible en la página de Internet <a href="http://movil-evolution.com.mx/" style="color: #ff7300">movil-evolution.com.mx</a> en la sección “PolItica de privacidad”.</p>';
    //$mail->Body .= '<br>';
    //$mail->Body .= '<br>';
    //$mail->Body .= '<center><a href="http://movil-evolution.com.mx/"><img src="images/logo_BE-2.png" width="auto" height="60"></a></center>';
    //$mail->Body .= '<br>';
    //$mail->Body .= '<center>Movil Evolution SA de CV, Derechos reservados 2017</center>';
    //$mail->Body .= '<br></td></tr></tbody></table></center></body></html>';
    $mail->isHTML(true);
    //$mail->AltBody = '!Este correo contiene un Gif360!';

    $mail->send();
    echo 'Message has been sent' . "\r\n";
} catch (Exception $e) {
    echo 'Message could not be sent.' . "\r\n";
    echo 'Mailer Error: ' . $mail->ErrorInfo . "\r\n";
}
