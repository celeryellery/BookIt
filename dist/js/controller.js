window.onload = function() {
	document.getElementById("submitBtn").onclick = submit;
	document.getElementById("closeConfirm").onclick = hideConfirm;
	document.getElementById("closeReject").onclick = hideReject;
	document.getElementById("searchBtn").onclick = searchBook;
	document.getElementById("openLibraryBtn").onclick = queryOpenLibrary;
}

console.log(app);

//After entering in book information, the book is submitted to the database
function submit() {
	// $('#myModal').modal('hide');
	var authorFullName = document.getElementById("authorFullName").value;
	var bookSubtitle = document.getElementById("bookSubtitle").value;
	var edition = document.getElementById("edition").value;
	var bookTitle = document.getElementById("bookTitle").value;
	var isbn10 = document.getElementById("isbn10").value;
	var isbn13 = document.getElementById("isbn13").value;
	var price = document.getElementById("price").value;

	var book = app.schema.book();
	book.authorFullName = authorFullName;
	book.subTitle = bookSubtitle;
	book.edition = edition;
	book.title = bookTitle;
	book.ISBN10 = isbn10;
	book.ISBN13 = isbn13;
	book.price = price;

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
	var term = document.getElementById("searchBar").value;
	if (term == "") {
		return;
	}
	var list = document.getElementById("list");
	list.innerHTML = "";
	
	var db = app.database.read();
	console.log("db", db);
	for (var i = db.length - 1; i > 0; i--) {
		if (db[i] == null) {
			return;
		}
		var title = db[i].title;
		if (term.toLowerCase() == title.toLowerCase()) {
			var a = document.createElement('a');
			a.className = "list-group-item";
			a.setAttribute('href', "#");

			var h3 = document.createElement("h3");
			h3.className = "list-group-item-heading";
			h3.innerHTML = title;
			h3.style.fontWeight = "bold";

			var h4 = document.createElement("h4");
			h4.className = "list-group-item-heading";
			h4.innerHTML = db[i].authorFullName;

			var pEdition = document.createElement("p");
			pEdition.className = "list-group-item-text";
			pEdition.innerHTML = "Edition " + db[i].edition;			

			var pPrice = document.createElement("p");
			pPrice.className = "list-group-item-text";
			pPrice.innerHTML = "$" + db[i].price;

			a.appendChild(h3);
			a.appendChild(h4);
			a.appendChild(pEdition);
			a.appendChild(pPrice);
			list.appendChild(a);
		}
	}
}

function queryOpenLibrary()
{
	var isbn = document.getElementById("isbn10").value;
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