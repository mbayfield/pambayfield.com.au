var msg = "";
var missing = "";

function errMsg(msg){
	alert(msg);
	return true;
}

// validation
function  validate(thisform) {
	if(thisform.name.value == "") missing += "\n - Name.";
	 
	if(thisform.from.value == "") missing += "\n - Email Address.";
	
	if(thisform.subject.value == "") missing += "\n - Subject.";
	
	//if(thisform.verif_box.value == "") missing += "\n - Verification Code.";
	
	if(thisform.message.value == "") missing += "\n - Message.";
	

	if(thisform.from.value != "") {
		re=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if(!re.test(thisform.from.value)) {
			missing += "\n - Invalid email address.";
		}
	
		//if(thisform.from.value != thisform.confirmCustEmail.value) 
		//	missing += "\n - Invalid email address. Do not match.";
	}
	
	
	
	if(missing.length !=0) {
	
	msg += "\n\nThe following required fields are missing:";
	msg+= missing;
	
	errMsg(msg);
	msg = "";
	missing="";
	return false;
	} else {
	return true;
	}
}
 