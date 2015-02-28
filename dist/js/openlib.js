//
// openlib.js
// 
app.openLibrary = function()
{
	var callback = null;
			
    function searchCallback(data, textStatus, jqXHR) 
	{
		if(textStatus === 'success')
		{
			try
			{
				var book = app.schema.book();
				for(var key in data) 
				{
					if (data.hasOwnProperty(key)) 
					{
						var substr = key.substring(0,5);
						if(substr === 'ISBN:')
						{
							// ISBN
							if(data[key].details.isbn_13 != undefined && data[key].details.isbn_13.length)
							{
								book.isbn = data[key].details.isbn_13[0];
							}
							else
							{
								book.ISBN10 = key.substring(5,key.length);
							}
							
							// title
							if(data[key].details.title != undefined && data[key].details.title.length)
							{
								book.title = data[key].details.title;
							}
							
							// subtitle
							if(data[key].details.subtitle != undefined && data[key].details.subtitle.length)
							{
								book.subtitle = data[key].details.subtitle;
							}
							
							// author
							if(data[key].details.authors != undefined && data[key].details.authors.length)
							{
								book.authorFirstName = data[key].details.authors[0].name;
							}
							
							// revision
							if(data[key].details.edition_name != undefined && data[key].details.edition_name)
							{
								book.edition = data[key].details.edition_name;
							}
						}
					}
				}
				if(callback && book && typeof callback == 'function')
				{
					callback(book);
				}
			}
			catch(e)
			{
				console.log('An error has occurred in openlib::searchCallback\r\n' + e.message);
			}
		}
    }
	
	// public methods
	function search(isbn, cb)
	{
		callback = cb;

		$.ajax({url: 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=details',
				data: {'show_all_items': 'true'},
				dataType: 'jsonp',
				success: searchCallback
		});
	}
	
	// public API
	return {search: search}
}();
