<!DOCTYPE html>
<?php
if (is_uploaded_file($_FILES['archivo']['tmp_name'])) {
    copy($_FILES['archivo']['tmp_name'], '/var/www/html/gif_360_web/gui/subidas/'.$_FILES['archivo']['name'].'');
    $subido = true;
    }
    if($subido) {
    echo "<p>El archivo ha sido subido con exito</p>";
    } else {
    echo "<p><strong>Error:</strong> El archivo no ha sido subido</p>";
    }
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="archivo">
        <input type="submit" value="Enviar">
        </form>
</body>
</html>