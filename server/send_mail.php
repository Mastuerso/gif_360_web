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
$m_attch='/home/onikom/Pictures/nov13-1407.mp4';

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
    $mail->addAttachment($m_attch, 'gif360');    // Optional name

    //Content
    //$mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Gif360';
    $mail->Body    = '<b>!</b>Este correo contiene un  <b>Gif360!</b>';
    $mail->AltBody = '!Este correo contiene un Gif360!';

    $mail->send();
    echo 'Message has been sent' . "\r\n";
} catch (Exception $e) {
    echo 'Message could not be sent.' . "\r\n";
    echo 'Mailer Error: ' . $mail->ErrorInfo . "\r\n";
}