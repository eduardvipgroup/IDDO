<?php
//Если на сервер пришел POST запрос
if ( $_POST ) {

	$email = "";
	$name = "";
	$message = "";
	$from = "IDDO"; // откуда письмо(указываем наш сайт, чтоб в почтовом ящике было видно откуда пришло)
	$to = "admin@email.adress"; // адрес, на который должны приходить письма
	$subject = "Письмо с сайта $from"; //тема письма
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";//заголовок
    $headers .= "From: Форма обратной связи IDDO <IDDO>\r\n";//заголовок

    $mail_html = "<h1>Письмо с сайта $from</h1>";// эта переменная будет содержать html код, который прийдет на почту. оформлять можно - как душе угодно, стили писать, скорее всего, инлайново

	if ( isset($_POST['email']) && mb_strlen($_POST['email']) != 0) {
		$email = trim(strip_tags($_POST['email'])); //trim удаляет переводы строки и спец символы, strip_tags - удаляет теги, если пользователь их ввел
		$mail_html .= "<p style='color: #333'> <strong> Email отправителя:</strong> <a href='mailto:$email> $email </a>";
	}

	if ( isset($_POST['name']) && mb_strlen($_POST['name']) != 0) {
		$name = trim(strip_tags($_POST['name'])); //trim удаляет переводы строки и спец символы, strip_tags - удаляет теги, если пользователь их ввел
		$mail_html .= "<p style='color: #333'> <strong> Имя отправителя:</strong> <span> $name </span>";
	}

	if ( isset($_POST['message']) && mb_strlen($_POST['message']) != 0) {
		$message = trim(strip_tags($_POST['message'])); //trim удаляет переводы строки и спец символы, strip_tags - удаляет теги, если пользователь их ввел
		$mail_html .= "<p style='color: #333'> <strong> Текст сообщения:</strong> <p style='display: inline-block'>$message</p>";
	}
	// функция отправки письма
	mail($to,$subject,$message, $headers);
	// выводит сообщение на экран. Если используется ajax - именно это сообщение получит xhr.response
	echo "Ваше письмо, $name, отправлено. В ближайшее время мы с Вами свяжемся";
}

// $var - переменная всегда пишется со знаком доллара. Её не обязательно объявлять до присвоения ей значения если в этом нет необходимости. Получить значение из нее тоже можно только через доллар
// функции isset, trim и другие - часть php(встроенные и написаны на С)
// Очень важно не пропускать точки с запятыми, php это не прощает, в отличие от js
// так же важно проверять все в if / elseif(да-да, в php зачастую пишут слитно)

?>
