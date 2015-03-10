//
// searchBook.js
//

//Search for books in the database given a search term 
app.search = function() 
{
	// public methods
	function searchBook()
	{
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
		var books = searchDatabase(term, "title", "authorFullName");

		// create and display list of search results
		for (var i = 0; i < books.length; i++) 
		{
			//container
			var div = document.createElement('div');
			var sec = document.createElement( 'section');   
			
			div.setAttribute("ID", "bookInfo");
			sec.setAttribute("ID", "book_details");
			
			//div container
			var a = document.createElement('a');
			a.className = "list-group-item";
			a.setAttribute('href', "#");

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
			
		$('#bookModal').modal('show');
	}
	
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
			if (db[i].hasOwnProperty(property) && db[i][property].toLowerCase().indexOf(term.toLowerCase()) != -1)
			{
				searchItems.push(db[i]);
			}
			else if (db[i].hasOwnProperty(property2) && db[i][property2].toLowerCase().indexOf(term.toLowerCase()) != -1)
			{
				searchItems.push(db[i]);
			}
		}
		return searchItems;
	}
	
	// public api
	return {searchBook: searchBook,
			searchDatabase: searchDatabase};
}();