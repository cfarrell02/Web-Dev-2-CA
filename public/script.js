/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");
function showHide() {
  let readMoreDiv = document.getElementById("readmore");
  readMoreDiv.style.color = "green";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}
function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById("welcomeuser").innerHTML =
    "<p> Hello, " +
    username +
    ", looking forward to hearing your playlists! Click this message to close it.</p>";
  welcomeUserDiv.style.cursor = "pointer";
}
function hideWelcome() {
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "none";
}
const sonatas = {
  title: 'Beethoven Sonatas',
  songs: [
    {
      title: 'Piano Sonata No. 3',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 7',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 10',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 11',
      artist: 'Beethoven',
    }
  ],
getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));

  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("You gave a rating of: ");
    for(let i=0;i<userRating;i++){
    $("#rating").append("<i class = \"ui yellow icon star\"></i>");
  }
  for(let i=0;i<(5-userRating);i++){
    $("#rating").append("<i class = \"ui yellow icon star outline\"></i>");
  }
  }
}
};
$(document).ready(function(){

  $("#tableoutput").html("<h2 class='ui header'>" + sonatas.title + "</h2>");

  $("#tableoutput").append("<table class='ui fixed striped table'><thead><tr><th>Song</th><th>Artist</th></tr></thead><tbody>");

  for (let i in sonatas.songs){
        $("#tableoutput tr:last").after("<tr><td>" + sonatas.songs[i].title + "</td><td>" + sonatas.songs[i].artist + "</td></tr>");
  }

  $("#tableoutput").append("</tbody></table>");
  
  $("#tableoutput").append('<p><span id="rating"> </span></p>');

  $("#tableoutput").append('<button class="ui blue button" onclick="sonatas.getRating()"> Rate it! <i class="star icon"></i></button>');
});