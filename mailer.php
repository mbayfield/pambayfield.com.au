<?php

session_start();

// load the variables form address bar
$name = $_SESSION['name'] = $_REQUEST["name"];
$subject = $_SESSION['subject'] = $_REQUEST["subject"];
$message = $_SESSION['message'] = $_REQUEST["message"];
$from = $_SESSION['from'] = $_REQUEST["from"];
$verif_box = $_REQUEST["verif_box"];
$_SESSION['wrong_code'] = true;
// remove the backslashes that normally appears when entering " or '
$message = stripslashes($message);
$subject = stripslashes($subject);
$from = stripslashes($from);

// check to see if verificaton code was correct
if(md5($verif_box).'a4xn' == $_COOKIE['tntcon']){
$newLine = "\r\n"; //var just for newlines
$to = 'pambayfield@gmail.com';
$nameto = 'Pam Bayfield';
$headers = "MIME-Version: 1.0" . $newLine;
$headers .= "Content-type: text/html; charset=iso-8859-1" . $newLine;
$headers .= "bcc: webmaster@rosy.com.au" . $newLine;
$headers .= "From: $name <$from>" . $newLine;


$messageContent =<<<END
<html lang="en"><head><title>$subject</title></head>
<body>
<table>
	<tr>
		<td>From:</td>
		<td>$name</td>
	</tr>
	<tr>
		<td>Email Address:</td>
		<td>$from</td>
	</tr>
	<tr>
		<td colspan="2">Message:</td>
	</tr>
	<tr>
		<td colspan="2">$message</td>
	</tr>
</table>
</body></html>
END;



	// if verification code was correct send the message and show this page
	mail($to, 'Online Form: '.$subject, $messageContent, $headers);
	// delete the cookie so it cannot sent again by refreshing this page
	setcookie('tntcon','');

	session_destroy();

	header("Location:thankyou.html");

} else {
	// if verification code was incorrect then return to contact page and show error
	header("Location:".$_SERVER['HTTP_REFERER']);
	exit;
}
?>
