window.onload = function() {
	var email = document.getElementById("emailField");
	var user = app.sessionDatabase.read();
	console.log(user.email);
	email.innerHTML += user.email;
	document.getElementById("confirmLogout").onclick = logout;
}

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