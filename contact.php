<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Contact Me :: Pam Bayfield</title>
<meta name="description" content="Pam takes you through the first 12 month's journey of rehabilitation as seen through her eyes. She had a bilateral knee replacement in July 2004" />
<meta name="keywords" content="knees,injury,knee pain,knee replacements,bilaterial,knee operations,hospital,pam bayfield,books,author,self publish,manly daily,peninsula living,pittwater life,paypal,knees up mother brown,orthopaedic surgery,sports medicine,artificial joint,bone,knee reconstructions" />

<?php include("includes/scripts-and-styles.html"); ?>
</head>
<body>
<div align="center">

<table id="mainTable" cellspacing="0">
<tr>
	<td colspan="2" class="bannerHome">
		<?php include("includes/banner.html"); ?>
	</td>
</tr>
<tr>
<td class="navbar">
<!-- begin navigation -->
	<?php include("includes/navigation.html"); ?>
</td>

   <td style="padding: 10px;" bgcolor="#ffffff">
<h1>Contact Pam</h1>
<p>To contact Pam please fill in the form below.</p>
<p>* Required Fields</p>

<form action="mailer.php" method="post" name="form1" id="form1" onsubmit="return validate(this);">

<p>*Your Name:<br />
<input name="name" type="text" id="name" class="textInput" value="<?php echo $_SESSION['name'];?>"/></p>

<p>*Your e-mail:<br />
<input name="from" type="text" id="from" class="textInput" value="<?php echo $_SESSION['from'];?>"/></p>


<p>*Subject:<br />
<input name="subject" type="text" id="subject" class="textInput" value="<?php echo $_SESSION['subject'];?>"/></p>

<p>*Type verification image:<br />
<input name="verif_box" type="text" id="verif_box" class="textInput" />
<img src="verificationimage.php?<?php echo rand(0,9999);?>" alt="verification image, type it in the box" width="50" height="24" align="absbottom" /></p>

<!-- if the variable "wrong_code" is sent from previous page then display the error field -->
<?php if(isset($_SESSION['wrong_code'])){?>
<div class="wrongCode">Wrong verification code</div><br />
<?php ;}?>

<p>*Message:<br />
<textarea name="message" cols="6" rows="35" id="message" ><?php echo $_SESSION['message'];?></textarea>
</p>
<input name="Submit" type="submit" id="submit" value="Send Message"/>
</form>



	</td>
  </tr>
</table>

<?php include("includes/footer.html"); ?>
</body>

</html>
