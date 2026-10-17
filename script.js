/*
  Name: Justice Tolentino
  Date: 10.16.2026
  CSC 372-01

  This is the script.js page for my fetch assignment. This is where I composed the functions for the tv show list page.
*/
"use strict"

let tvShowForm = document.getElementById("tv-show-form");
tvShowForm.addEventListener("submit", handleTVShowFormSubmit);

async function handleTVShowFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const showTitle = formData.get("title");

    const apiUrl = new URL(`https://api.tvmaze.com/search/shows?q=${showTitle}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const shows = await response.json();
        await displayTVShowResults(shows);
        console.log("It worked!")
    } catch (error) {
        console.error("Error fetching tv shows:", error);
    }
}

function displayTVShowResults(televisionShows) {
    
    const tvShowResults = document.getElementById("tv-show-results");
    const showList = document.createElement("div");
    tvShowResults.appendChild(showList);
    televisionShows.forEach((teleShow) => {
        const showCard = makeShowCard(teleShow);
        showList.append(showCard);
    });
    tvShowForm.reset();
}

function makeShowCard(tvShow) {

    let showCard = document.createElement("div");
    showCard.className = "tvShowCard";
    let showName = document.createTextNode(tvShow.show.name);
    let showSummary = document.createTextNode(tvShow.show.summary);
    let showPremiereDate = document.createTextNode(tvShow.show.premiered);
    let showGenre = document.createTextNode(tvShow.show.genres);
    let showRating = document.createTextNode(tvShow.score);
    showCard.append(showName);
    showCard.append(showSummary);
    showCard.append(showPremiereDate);
    showCard.append(showGenre);
    showCard.append(showRating);
    let castButton = document.createElement("button");
    castButton.textContent = "Show Cast";
    showCard.append(castButton);
    castButton.addEventListener('click', (event)=>{
        displayCast(tvShow.show.id)
    })
    return showCard;
}

//
window.addEventListener("load", async () => {
        const loadUrl = new URL(`https://api.tvmaze.com/search/shows?q=girls`);

    try {
        const response =  await fetch(loadUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const shows = await response.json();
         displayTVShowResults(shows);
        console.log("It worked!")
    } catch (error) {
        console.error("Error fetching tv shows:", error);
    }
});

/*
function displayCast(tvShowId) {
    const castUrl = new URL(`https://api.tvmaze.com/search/shows/${tvShowId}/cast`);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const shows = await response.json();
        await displayTVShowResults(shows);
        console.log("It worked!")
    } catch (error) {
        console.error("Error fetching tv shows:", error);
    }
let castCard = document.createElement("div");
    castCard.className = "tvShowCard";
    let showCast = document.createElement("div");
    castCard.append(showCast);
    .forEach((castMember) => {
        const showCard = makeShowCard(teleShow);
        showList.append(showCard);
    });
    let hideCastButton = document.createElement("button");
    hideCastButton.textContent = "Hide Cast";
    castCard.append(hideCastButton);
    return castCard;
}
*/