//
// schema.js
//
app.schema = function()
{
	// public methods
	function user(email, password)
	{
		var obj =  {email: email,
					password: password};					
		return obj;
	}
	
	function book()
	{
		var obj =  {authorLastName: null,
					authorFirstName: null,
					title: null,
					subTitle: null,
					edition: null,
					ISBN10: null,
					ISBN13: null,
					price: null};
		return obj;
/*
		//subject = []; // optional (from openlibrary)
		//table_of_contents = []; // optional (from openlibrary)
*/		
	}
	
	// public API
	return {user: user,
			book: book}
}();