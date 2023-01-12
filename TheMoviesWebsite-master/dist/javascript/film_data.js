import { baseUrl, apiKey, getImage, mainSection } from "./app.js";

//GETTING INFO OF SELECTED FILM
export async function getInfo (filmData, filmTitle, path) {

    let type = (filmData.media_type) ? filmData.media_type : 'movie';
    let newUrl = `${baseUrl}${type}/${filmData.id}?api_key=${apiKey}`;
    let newResponse = await fetch(newUrl);
    let newJson = await newResponse.json();
    let filmGenres = '';
    let releaseDate = type === 'movie' ? filmData.release_date : filmData.first_air_date;

    type === 'person' ? false : 
    newJson.genres.forEach((el) => {return filmGenres = (` ${filmGenres} / ${el.name}`)});
    
    
    const text =  `
    <div id="film-container" class= "film-container">
        <h1 class= "film-title">${filmTitle}</h1>
        <img src="${getImage('w342', path)}" alt="" id= "film-img" class= "film-img">
        <div id="film-data" class= "film-data">
            <h2 class= "subtitle">Information</h2>
            <p class= "info-para">Title: <span class="info-text">${filmTitle}</span></p>
            <p class= "info-para">Release Date: <span class="info-text">${releaseDate}</span></p>
            <p class= "info-para">Type: <span class="info-text">${type}</span></p>
            <p class= "info-para">Genres: <span class="info-text">${filmGenres}</span></p>
            <p class= "info-para">Popularity: <span class="info-text">${newJson.popularity}</span></p>
        </div>
        <div id="film-overview" class= "film-overview">
            <h2 class= "subtitle">Overview</h2>
            <p id= "film-overview" class= "info-overview">${newJson.overview}</p>
        </div>
    </div>`;

    mainSection.innerHTML = text;

    if (type === 'movie') return 

    if (type === 'tv') {

        let tvText = `
        <p class= "info-para">Total of Seasons: <span class="info-text">${newJson.number_of_seasons}</span></p>
        <p class= "info-para">Total of Episodes: <span class="info-text">${newJson.number_of_episodes}</span></p>`;

        return document.getElementById('film-data').insertAdjacentHTML('beforeend', tvText);

    } else {

        let personInfo = `
        <p class= "info-para">Name: <span class="info-text">${newJson.name}</span></p>
        <p class= "info-para">Birthday: <span class="info-text">${newJson.birthday}</span></p>
        <p class= "info-para">Known for: <span class="info-text">${newJson.known_for_department}</span></p>
        <p class= "info-para">Place Of Birth: <span class="info-text">${newJson.place_of_birth}</span></p>
        <p class= "info-para">Popularity: <span class="info-text">${newJson.popularity}</span></p>`;
        
        let personBio = `
        <h2 class= "subtitle">Biography</h2>
        <p id= "film-overview" class= "info-overview">${newJson.biography}</p>`;

        document.getElementById('film-data').innerHTML = personInfo;
        document.getElementById('film-overview').innerHTML = personBio;
    }
}
