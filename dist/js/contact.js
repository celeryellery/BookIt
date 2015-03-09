window.onload = function() {
	document.getElementById("confirmLogout").onclick = logout;
	document.getElementById("submit").onclick = submit; 
	spamChecker(); 
}

var spamValue1 = Math.round(Math.random() * 10); 
var spamValue2 = Math.round(Math.random() * 10); 

function isLoggedIn()
{
	var user = app.sessionDatabase.read();
	return user.isLoggedIn === true;
}

function logout() 
{
	// log the user out and create an empty user that is not logged in
	// as a default
	var user = {email: "",
				password: "",
				LoggedIn: false}
	app.sessionDatabase.write(user);
	window.location = "SignIn.html";
}

function spamChecker()
{


var spamAnswer = spamValue1 + spamValue2; 

var label = document.getElementById("spamChecker"); 

label.innerHTML = "What is " + spamValue1 + " + " + spamValue2 + "?"; 

}

function submit() 
{

	var answer = document.getElementById("InputReal").value; 
	if (answer == (spamValue1 + spamValue2))
	{
		alert("Holy shit, it worked."); 
	}
	else
	{
		alert("You're bad at this."); 
	}

}