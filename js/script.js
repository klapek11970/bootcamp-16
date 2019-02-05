'use strict';
getJoke()

var paragraph = document.getElementById("Joke")
function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.icndb.com/jokes/random');
  xhr.addEventListener('load', function(){
    var response = JSON.parse(xhr.response);
    paragraph.innerHTML = response.value.joke;
  });
  xhr.send();
}