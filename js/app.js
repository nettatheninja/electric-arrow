(function(){
	// SETUP
	var href = window.location.href;
	var name = href.substr(href.lastIndexOf('/') + 1);
	var authors = window.nm.authors;
	var author = window.nm.quotes[name];
	if (!author || name.length == 0) {
		name = authors[0];
		author = window.nm.quotes[name];
	}

	// TWEET BUTTON
	document.querySelectorAll('.twitter-share-button')[0].onclick = function(event) {
		var shareUrl = encodeURIComponent('http://' + window.location.host + '/' + name);
		var tweetBody = encodeURIComponent('Check out this bit of advice by ' + author.name);
		var width  = 575,
			height = 400,
			left   = (window.innerWidth  - width)  / 2,
			top    = (window.innerHeight - height) / 2,
			url    = 'https://twitter.com/intent/tweet?text=' + tweetBody + '&url=' + shareUrl + '&via=_hindsight',
			opts   = 
				'status=1' +
				',width='  + width  +
				',height=' + height +
				',top='    + top    +
				',left='   + left;

		window.open(url, 'twitter', opts);
		return false;
	} 

	// CONTENT
	var quotesEl = document.querySelectorAll('#advice')[0];
	quotesEl.innerHTML = '';
	for (var i = 0; i < author.quote.length; i++) {
		var quoteEl = document.createElement('p');
		quoteEl.innerHTML = author.quote[i];
		quotesEl.appendChild(quoteEl);
	};

	var creditLinkEl = document.querySelectorAll('#credit a')[0];
	creditLinkEl.href = author.link;
	creditLinkEl.innerText = author.name;

	var creditProfEl = document.querySelectorAll('#credit span')[0];
	creditProfEl.innerText = author.title;

	// PAGINATION
	var current = name.length ? authors.indexOf(name) : 0;
	var prevAuthor = authors[(current + authors.length - 1) % authors.length];
	document.querySelectorAll('#pagination-prev a')[0].href = '/' + prevAuthor;
	var nextAuthor = authors[(current + authors.length + 1) % authors.length];
	document.querySelectorAll('#pagination-next a')[0].href = '/' + nextAuthor;

	keyboardPagination( '#container', {
		prev: '#pagination-prev',
		next: '#pagination-next'
	});
	if (window.mobile) {
		var style = document.createElement('style');
		style.innerHTML = 'div { cursor: pointer; }';
		document.head.appendChild(style);
		document.onclick = function(){
			location.href = '/' + nextAuthor;
		};
	}
})();
