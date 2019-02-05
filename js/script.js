'use strict';
getJoke()

var quote = document.getElementById("quote")
var author = document.getElementById("author")
var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = prefix+"https://twitter.com/intent/tweet?text=";
var quoteUrl = prefix+"https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var url = 'https://restcountries.eu/rest/v2/name/';
var link = ""


var countriesList = document.getElementById('countries');
document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
		
		fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
	console.log(resp)
  countriesList.innerHTML = '';
	resp.forEach(function(item){
    var liEl = document.createElement('li');
    liEl.innerText = item.name;
		
		var p = document.createElement('p');
		p.innerText = "capital: "+item.capital
    liEl.appendChild(p);	
		
		var p = document.createElement('p');
		p.innerText = "region: "+item.region
    liEl.appendChild(p);	
		
		var img = document.createElement('img');
		img.src = item.flag
    liEl.appendChild(img);
		
    countriesList.appendChild(liEl);
	});
}

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