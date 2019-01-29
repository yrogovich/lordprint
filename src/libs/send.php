<?
$to = ''; //Почта получателя, через запятую можно указать сколько угодно адресов
$subject = 'Заявка с сайта '.$_SERVER['SERVER_NAME'];; //Заголовок сообщения
$message = '
        <html>
            <head>
                <title>'.$subject.'</title>
            </head>
            <body>';
				if(isset($_POST['user_name']) && $_POST['user_name'] !== '')
					$message .= '<p>Имя: '.$_POST['user_name'].'</p>';   
				if(isset($_POST['user_phone']) && $_POST['user_phone'] !== '')
					$message .= '<p>Телефон: '.$_POST['user_phone'].'</p>';

                if(isset($_POST['checkbox']) && $_POST['checkbox'] !== '') {
                    $checkboxArr = $_POST['checkbox'];
                    foreach ($checkboxArr as $value) {
                        $message .= '<p>Checkbox: '.$value.'</p>';
                    }
                }
                if(isset($_POST['textarea']) && $_POST['textarea'] !== '') {
                    $textareaArr = $_POST['textarea'];
                    foreach ($textareaArr as $value) {
                        $message .= '<p>Checkbox: '.$value.'</p>';
                    }
                }
$message .= '                 
            </body>
        </html>'; //Текст нащего сообщения можно использовать HTML теги
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
$headers .= "From: form@".$_SERVER['SERVER_NAME']."\r\n"; //Наименование и почта отправителя
mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
