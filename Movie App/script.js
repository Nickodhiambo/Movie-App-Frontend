const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8de7fc22e9afd6be4ad1c2585c653b77&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8de7fc22e9afd6be4ad1c2585c653b77&query=";

const row = document.querySelector(".row");
const form = document.querySelector("#form");
const search = document.querySelector("#query");

returnMovies(APILINK);

async function returnMovies(url) {
    response = await (await fetch(url)).json();
    const results = response.results
    console.log(results);

    results.forEach(item => {

        //Dynamically create containers for API data
        const columnDiv = document.createElement("div");
        columnDiv.setAttribute('class', 'column');

        const cardDiv = document.createElement("div");
        cardDiv.setAttribute('class', 'card');
        
        const img = document.createElement("img");
        const title = document.createElement("h3");

        img.src = IMG_PATH + item.poster_path;
        title.textContent = `${item.title}`;

        // Append every elements to row
        cardDiv.appendChild(img);
        cardDiv.appendChild(title);
        columnDiv.appendChild(cardDiv);
        row.appendChild(columnDiv);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    row.innerHTML = "";

    const searchItem = search.value;
    if (searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
})