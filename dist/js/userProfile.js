window.onload = function() {
	var email = document.getElementById("emailField").value
	var user = app.sessionDatabase.read();
	email.innerHTML += user.email;
	
	
}