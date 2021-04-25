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
function showHideLeague() {
  let leagueDiv = document.getElementById("league");
  leagueDiv.style.margin = "1em 0 2em 0";
  if (leagueDiv.style.display === "block") {
    leagueDiv.style.display = "none";
  } else {
    leagueDiv.style.display = "block";
  }
}
function showEdit(idNumber) {
  let leagueDiv = document.getElementById(idNumber);
  if (leagueDiv.style.display === "block") {
    leagueDiv.style.display = "none";
  } else {
    leagueDiv.style.display = "block";
  }
}

function darkMode() {
  if (sessionStorage.getItem("colour") == "white") {
    sessionStorage.setItem("colour", "#525252");
    sessionStorage.setItem("backgroundColour", "#878787");
    sessionStorage.setItem("textColour", "white");
    console.log("Turning Website to Dark Mode");
  } else {
    sessionStorage.setItem("backgroundColour", "white");
    sessionStorage.setItem("colour", "white");
    sessionStorage.setItem("textColour", "black");
    console.log("Turning Website to Light Mode");
  }

  changeBackground();
}
function changeBackground() {
  document.getElementById(
    "menu"
  ).style.backgroundColor = sessionStorage.getItem("colour");
  document.getElementById("about").style.color = sessionStorage.getItem(
    "textColour"
  );
  document.getElementById("dashboard").style.color = sessionStorage.getItem(
    "textColour"
  );
  document.getElementById("logout").style.color = sessionStorage.getItem(
    "textColour"
  );
  var segment;
  for (segment of document.getElementsByClassName("segment")) {
    segment.style.backgroundColor = sessionStorage.getItem("colour");
    segment.style.color = sessionStorage.getItem("textColour");
  }
  var values = document.getElementsByClassName("value");
  var labels = document.getElementsByClassName("label");
  for (let i = 0; i < values.length; i++) {
    values[i].style.color = sessionStorage.getItem("textColour");
    labels[i].style.color = sessionStorage.getItem("textColour");
  }

  var cards = document.getElementsByClassName("card");
  var headers = document.getElementsByClassName("header");
  var metas = document.getElementsByClassName("meta");
  var descriptions = document.getElementsByClassName("description");
  for (let i = 0; i < headers.length; i++) {
    cards[i].style.backgroundColor = sessionStorage.getItem("colour");
    headers[i].style.color = sessionStorage.getItem("textColour");
    metas[i].style.color = sessionStorage.getItem("textColour");
    descriptions[i].style.color = sessionStorage.getItem("textColour");
  }

  var texts = document.getElementsByClassName("text");
  var authors = document.getElementsByClassName("author");
  var dates = document.getElementsByClassName("metadata");
  var replies = document.getElementsByClassName("reply");
  var deletes = document.getElementsByClassName("delcomment")
  for (let item of texts) {
    item.style.color = sessionStorage.getItem("textColour");
  }
  for (let item of authors) {
    item.style.color = sessionStorage.getItem("textColour");
  }
  for (let item of dates) {
    item.style.color = sessionStorage.getItem("textColour");
  }
  for (let item of replies) {
    item.style.color = sessionStorage.getItem("textColour");
  }
  for (let item of deletes) {
    item.style.color = sessionStorage.getItem("textColour");
  }
  var table;
  for (table of document.getElementsByClassName("table")) {
    table.style.backgroundColor = sessionStorage.getItem("colour");
    table.style.color = sessionStorage.getItem("textColour");
  }

  var label;
  for (label of document.getElementsByClassName("lbl")) {
    label.style.color = sessionStorage.getItem("textColour");
  }

  document.getElementsByClassName(
    "segment"
  )[0].style.backgroundColor = sessionStorage.getItem("backgroundColour");
  document.getElementsByClassName(
    "header"
  )[1].style.color = sessionStorage.getItem("textColour");
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

  if (userRating > 5 || userRating < 1 || isNaN(userRating)) {
    alert("Try again with a number between 1 and 5!");
  } else {
    $("#rating").html("You gave a rating of: ");
    for (let i = 0; i < userRating; i++) {
      $("#rating").append('<i class = "ui yellow icon star"></i>');
    }
    for (let i = 0; i < 5 - userRating; i++) {
      $("#rating").append('<i class = "ui yellow icon star outline"></i>');
    }
  }
}

$(".ui.icon.delteam.button").click(() => confirm("Really delete this team?"));
$(".ui.icon.delete.button").click(() => confirm("Really delete this league?"));
$(".delcomment").click(() => confirm("Really delete this comment?"));
