<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('ru', 'phpmailer/language');
$mail -> IsHTML(true)

$mail -> setFrom('AlexandorKsenz@gmail.com');
$mail -> addAddress('AlexandrKsenz@gmail.com');
$mail -> Subject('Тестовое Задание');

$body = '<h1>Данные с формы</h1>';

if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].' </p>';
}
if(trim(!empty($_POST['phone']))) {
    $body.='<p><strong>Номер телефона:</strong> '.$_POST['phone'].' </p>';
}
if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>Email:</strong> '.$_POST['email'].' </p>';
}

$mail -> Body = $body

if (!$mail -> send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены'
}
$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response)
>