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

    var showCard = document.createElement("div");
    showCard.className = "tvShowCard";
    var showName = document.createTextNode(tvShow.show.name);
    var showSummary = document.createTextNode(tvShow.show.summary);
    var showPremiereDate = document.createTextNode(tvShow.show.premiered);
    var showGenre = document.createTextNode(tvShow.show.genres);
    var showRating = document.createTextNode(tvShow.score);
    showCard.append(showName);
    showCard.append(showSummary);
    showCard.append(showPremiereDate);
    showCard.append(showGenre);
    showCard.append(showRating);
    return showCard;
}
