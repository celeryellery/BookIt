window.onload = function() {
	var email = document.getElementById("emailField");
	var user = app.sessionDatabase.read();
	console.log(user.email);
	email.innerHTML += user.email;
	document.getElementById("confirmLogout").onclick = logout;
}
//Matt's for tanner
fucntion getbooks()
{
	var currentUser = app.sessionDatabase.read();
	var seller = currentUser.email;
	var books = app.search.searchDatabase(seller, "email", "");
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


//After entering in username change information, the new username is submitted to the database
function submitUsername() {
	var currentUsername = user.email;
	var newUsername = document.getElementById("newUsername").value;
	var newUsernameConfirm = document.getElementById("newUsernameConfirm").value;

	// TODO: Add error checking to see if current username isn't entered correctly, 
	// or if new username doesn't match confirmed new username
	
	user.email = newUsername;
	
	clearAllFormData();
	$('#usernameModal').modal('hide');
	if (isSupported()) {
		var db = app.database.read();
		db.push(book);
		app.database.write(db);
		$('#confirm').show();
	} else {
		$('#rejected').show();
	}
}

//After entering in password change information, the new password is submitted to the database
function submitPassword() {
	var currentPassword = user.password;
	var newPassword = document.getElementById("newPassword").value;
	var newPasswordConfirm = document.getElementById("newPasswordConfirm").value;

		// TODO: Add error checking to see if current password isn't entered correctly, 
	// or if new password doesn't match confirmed new password
	user.password = newPassword;
	
	clearAllFormData();
	$('#passwordModal').modal('hide');
	if (isSupported()) {
		var db = app.database.read();
		db.push(book);
		app.database.write(db);
		$('#confirm').show();
	} else {
		$('#rejected').show();
	}
}