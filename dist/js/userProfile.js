window.onload = function() {
	var email = document.getElementById("emailField");
	var user = app.sessionDatabase.read();
	email.innerHTML += user.email;
	document.getElementById("confirmLogout").onclick = logout;
    //searchData();
}
//Matt's for tanner
function getbooks()
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
/*
function searchData(){

var db = app.database.read();
var currentUser = app.sessionDatabase.read();
var book = searchDatabase(currentUser.email, "seller", "");
var table = document.createElement('table');

table.setAttribute("ID", "bookInfo" +i);
table.className = "user-listings";
var row = document.createElement('tr');
var rowData = document.createElement ('th');
rowdata.innerHTML = "Book Title"; 
}

for (var i = 0; i < books.length; i++) 
	{
        //container
        
        //div container
		var row = document.createElement('tr');
        
        
        
		var h3 = document.createElement("h3");
		h3.className = "list-group-item-heading";
		h3.innerHTML = books[i].title;
		h3.style.fontWeight = "bold";

		var h4 = document.createElement("h4");
		h4.className = "list-group-item-heading";
		h4.innerHTML = books[i].authorFullName;
        
		var pEdition = document.createElement("p");
		pEdition.className = "list-group-item-text";
		pEdition.innerHTML = "Edition " + books[i].edition;		
        
        var pPrice = document.createElement("h4");
        pPrice.setAttribute('align', 'right');
		pPrice.className = "list-group-item-text";
		pPrice.innerHTML = "$" + books[i].price;
       
        //sec container
        var bCon = document.createElement("p");
        bCon.setAttribute('align', 'right');
		bCon.className = "list-group-item-text";
		bCon.innerHTML = "Condition:" + books[i].condition;
        
        var aEmail = document.createElement('a');
         aEmail.setAttribute('align', 'right');
        
        aEmail.innerHTML = " Email Seller";
		aEmail.className = "list-group-item";
        var email = "mailto:" + books[i].seller; //temp string 
		aEmail.setAttribute('href', email);

		a.appendChild(h3);
		a.appendChild(h4);
		a.appendChild(pEdition);
        div.appendChild(a);
        div.appendChild(sec);
        
        sec.appendChild(pPrice);
        sec.appendChild(bCon);
        sec.appendChild(aEmail);
 
		list.appendChild(div);
	}
	*/

// internally search the database for a given "term"
// and sees which objects have a designated property
// with a value equal to the search term
// i.e. searchDatabase("The Lord of the Rings", "title") (returns books)
// or   searchDatabase("matt.stewart.us@gmail.com", "email") (returns users)

function searchDatabase(term, property, property2)
{
	var db = app.database.read();
	var searchItems = []; //array of items that match search criteria
	for(var i = 0; i < db.length; i++)
	{
		// if the object has the specified property,
		// check if the property has the desired value
		// if the object is what was being searched for, add it to the list of search items
		if (db[i].hasOwnProperty(property) && db[i][property] != null && db[i][property].toLowerCase().indexOf(term.toLowerCase()) != -1)
		{
			searchItems.push(db[i]);
		}
		else if (db[i].hasOwnProperty(property2) && db[i][property2] != null && db[i][property2].toLowerCase().indexOf(term.toLowerCase()) != -1)
		{
			searchItems.push(db[i]);
		}
	}
	return searchItems;
}

function queryOpenLibrary()
{
	var isbn = document.getElementById("isbn").value;
	if (validateIsbn(isbn))
	{
		app.openLibrary.search(isbn, fillOutForm);
	}
	else
	{
		alert("Please check your ISBN format. Something's not right!");
	}
}

