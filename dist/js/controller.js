window.onload = function() {
	$("#searchBar").keypress(function(e) {
	    if(e.which == 13) {
	        searchBook();
	    }
	});
	$("#myModal").keypress(function(e) {
	    if(e.which == 13) {
	        submit();
	    }
	});
	document.getElementById("submitBtn").onclick = submit;
	document.getElementById("closeConfirm").onclick = hideConfirm;
	document.getElementById("closeReject").onclick = hideReject;
	document.getElementById("searchBtn").onclick = searchBook;
	document.getElementById("isbn").onchange = queryOpenLibrary;
	document.getElementById("confirmLogout").onclick = logout;
}

console.log(app);

//After entering in book information, the book is submitted to the database
function submit() {
	var authorFullName = document.getElementById("authorFullName").value;
	var bookSubtitle = document.getElementById("bookSubtitle").value;
	var edition = document.getElementById("edition").value;
	var bookTitle = document.getElementById("bookTitle").value;
	var isbn = document.getElementById("isbn").value;
	var price = document.getElementById("price").value;

	var book = app.schema.book();
	book.authorFullName = authorFullName;
	book.subTitle = bookSubtitle;
	book.edition = edition;
	book.title = bookTitle;
	book.ISBN = isbn;
	book.price = price;
	
	// find out who is currently logged in and add that user's
	// email to the book object before adding it to the database
	var currentUser = app.sessionDatabase.read();
	book.seller = currentUser.email;
	
	if (bookTitle == "" || authorFullName == "" || price == "" || edition == "") {
		alert("Please fill in all of the required fields.");
		return;
	}
	$('#myModal').modal('hide');
	if (isSupported()) {
		var db = app.database.read();
		db.push(book);
		app.database.write(db);
		$('#confirm').show();
	} else {
		$('#rejected').show();
	}
}

function hideConfirm() {
	$('#confirm').hide();	
}

function hideReject() {
	$('#rejected').hide();	
}

function isSupported() {
  return app.database.supported();
}

//Search for books in the database given a search term 
function searchBook() {
	// causes the database search to look for items based on "title"
	var searchKey = "title";
	// database will search for an exact match of term
	// in the title property of each stored book object
	var term = document.getElementById("searchBar").value;
	if (term == "") {
		alert("Please enter a search term");
		return;
	}
	var list = document.getElementById("list");
	list.innerHTML = "";
	
	// search the database and return a list of all
	// books that match the search criteria
	var books = searchDatabase(term, searchKey);

	// create and display list of search results
	for (var i = 0; i < books.length; i++) 
	{
		var a = document.createElement('a');
		a.className = "list-group-item";
		a.setAttribute('href', "#");

		var h3 = document.createElement("h3");
		h3.className = "list-group-item-heading";
		h3.innerHTML = books[i][searchKey];
		h3.style.fontWeight = "bold";

		var h4 = document.createElement("h4");
		h4.className = "list-group-item-heading";
		h4.innerHTML = books[i].authorFullName;

		var pEdition = document.createElement("p");
		pEdition.className = "list-group-item-text";
		pEdition.innerHTML = "Edition: " + books[i].edition;			

		var pPrice = document.createElement("p");
		pPrice.className = "list-group-item-text";
		pPrice.innerHTML = "$" + books[i].price;

		a.appendChild(h3);
		a.appendChild(h4);
		a.appendChild(pEdition);
		a.appendChild(pPrice);
		list.appendChild(a);
	}
		
	$('#bookModal').modal('show');
}

// internally search the database for a given "term"
// and sees which objects have a designated property
// with a value equal to the search term
// i.e. searchDatabase("The Lord of the Rings", "title") (returns books)
// or   searchDatabase("matt.stewart.us@gmail.com", "email") (returns users)
function searchDatabase(term, property)
{
	var db = app.database.read();
	var searchItems = []; //array of items that match search criteria
	for(var i = 0; i < db.length; i++)
	{
		// if the object has the specified property,
		// check if the property has the desired value
		if (!db[i].hasOwnProperty(property))
		{
			continue;
		}
		var bookTitle = db[i][property];
		// if the object is what was being searched for, add it to the list of search items
		if (db[i][property].toLowerCase().indexOf(term.toLowerCase()) != -1)
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

// Determine whether user made an error typing in ISBN
function validateIsbn(isbn)
{
	// Note: Validation algorithm from http://en.wikipedia.org/wiki/International_Standard_Book_Number
	// ISBN 10
	if (isbn.length === 10 )
	{
		var sumOfProducts10 = 0;
		for (var i = 10; i > 0; i--)
		{
			sumOfProducts10 += isbn[10-i]*i;
		}
		return ((sumOfProducts10%11)===0);
	}
	// ISBN 13
	else if (isbn.length === 13)
	{
		var sumOfProducts13 = 0;
		var multiplier = 1;
		for (var i = 13; i > 0; i--)
		{
			multiplier = 1;
			if (i%2 === 0)
			{
				multiplier = 3;
			}
			sumOfProducts13 += isbn[13-i]*multiplier;
		}
		return ((sumOfProducts13%10)===0);
	}
	else
	{
		return false;
	}
}

function fillOutForm(book)
{
	// clear the form of previous information before auto-filling
	clearFormData();
	// title
	if (book.title && book.title.length)
	{
		document.getElementById("bookTitle").value = book.title;
	}
	// subtitle
	if (book.subtitle && book.subtitle.length)
	{
		document.getElementById("bookSubtitle").value = book.subtitle;
	}
	// Author full name
	if (book.authorFullName && book.authorFullName.length)
	{
		document.getElementById("authorFullName").value = book.authorFullName;
	}
	// Edition
	if (book.edition && book.edition.length)
	{
		document.getElementById("edition").value = book.edition;
	}
}

// clears data fields that will be replaced with openlibrary.org data,
// isbn and price are not cleared
function clearFormData()
{
	document.getElementById("bookTitle").value = "";
	document.getElementById("bookSubtitle").value = "";
	document.getElementById("authorFullName").value = "";
	document.getElementById("edition").value = "";
}

function clearAllFormData()
{
	document.getElementById("isbn").value = "";
	document.getElementById("bookTitle").value = "";
	document.getElementById("bookSubtitle").value = "";
	document.getElementById("authorFullName").value = "";
	document.getElementById("edition").value = "";
	document.getElementById("price").value = "";
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