window.onload = function() {
	document.getElementById("loginBtn").onclick = login;
}

//Makes the proper checks to see if the textfields are filled in properly and if the account exists, then lets users
//access the homepage
function login() {
	var email = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	var loginForm = document.getElementById("loginForm");
	if (email == "" || password == "") {
		alert("Please enter both an email and password");
		return;
	}
	if (!validateEmail(email)) {
		alert("Please enter an email of the format example@uw.edu or example@uwb.edu");
		return;
	}
	if (!accountExists(email, password)) {
		alert("The email " + email + " does not have an existing account.");
	} else {
		window.location = "MainPage.html";
	}
}

//Checks if the email is in a valid format
function validateEmail(email){        
   	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

//Checks the database for if the account exists
function accountExists(email, password) {
	var db = app.database.read();
	console.log(db);
	for (var i = 0; i < db.length; i++) {
		if (db[i].email == email && db[i].password == password) {
			// $('#existsError').show();
			return true;
		}
	}
	return false;
}
