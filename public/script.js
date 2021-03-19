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
  
  function showHideLeague() {
  let leagueDiv = document.getElementById("league");
  if (leagueDiv.style.display === "block") {
    leagueDiv.style.display = "none";
  } else {
    leagueDiv.style.display = "block";
  }
    function hideLeague() {
  let leagueDiv = document.getElementById("theLeague");
  leagueDiv.style.display = "none";
}
}
function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById("welcomeuser").innerHTML =
    "<p> Hello, " +
    username +
    ", looking forward to seeing all of your football leagues!.</p>";
  welcomeUserDiv.style.cursor = "pointer";
}
function hideWelcome() {
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "none";
}

function getRating() {
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
$(".delsong").click(() => confirm('Really delete this song?'))
