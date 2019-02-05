'use strict';
getJoke()

var quote = document.getElementById("quote")
var author = document.getElementById("author")
var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = prefix+"https://twitter.com/intent/tweet?text=";
var quoteUrl = prefix+"https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

var link = ""

document.getElementById("joke").addEventListener('click', function(){
	getJoke()
})

document.getElementById("twquote").addEventListener('click', function(){
	getQuote()
})

document.getElementById("tweet").addEventListener('click', function(){
	if(link){
		location.href=link
	}
})


function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
		
		if (quoteText.length > 140) {
				getQuote();
				console.log(quoteText,quoteText.length)
				return
		}
		
    var quoteAuthor = data.title || "Unknown author";
		
		var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
		
		quote.innerText = "Quote of the day - " + quoteText
		author.innerText = quoteAuthor
		link = data.link
}

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.icndb.com/jokes/random');
  xhr.addEventListener('load', function(){
    var response = JSON.parse(xhr.response);
    quote.innerHTML = response.value.joke;
    author.innerHTML = 'Author: api.icndb.com/jokes/random';
		link = ''
  });
  xhr.send();
}