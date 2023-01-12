
'use strict';

//SELECTING DOM ELEMENTS
const input = document.getElementById('search-bar');
const mainSection = document.getElementById('main-section');
const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const searchBtn = document.querySelector('.search-btn');

let showMenu = false;

menuBtn.addEventListener('click', () => {
    if(!showMenu) {

        hamburger.classList.add('open');
        nav.classList.add('open');
        showMenu = true;
    } else {

        hamburger.classList.remove('open');
        nav.classList.remove('open');
        showMenu = false;
    }
});


//API URL PARTS
const apiKey = '42576017bb40e0e9473173d7ccffd32b';
const baseUrl = 'https://api.themoviedb.org/3/';

//CALLING SEARCHMULTIMEDIA()
searchBtn.addEventListener('click', () => searchMultiMedia(input.value))
document.addEventListener("keyup", (event) => {
    if(event.keyCode === 13) return searchMultiMedia(input.value);
});

//IMPORT AND EXPORT VARIABLES AND FUNCTIONS
export {baseUrl, apiKey, getImage, mainSection};
import { getInfo } from "./film_data.js";
import { showTopFilms, popularDiv, kidsDiv, theatreDiv } from "./top_films.js";


//SEARCHING FUNCTION
async function searchMultiMedia(movie){

    const url = `${baseUrl}search/multi?api_key=${apiKey}&query=${movie}`;
    
    let response = await fetch(url);
    let json = await response.json();
    if(movie === null || movie === '' || json.total_results === 0) return;

    response.ok ? showOptions(json.results, mainSection) : alert(`HTTP-Error: ${response.status}`);
    return input.value = '';
}

//SHOWING OPTIONS FUNCTION
export function showOptions(options = [], optionContainer) {

    optionContainer.innerHTML = '';

    options.forEach((el, i) => {

        let optionTitle = el.media_type === "tv" || el.media_type === "person" ?  el.name :  el.title;
        let imagePath = (el.poster_path) ?  el.poster_path :  el.profile_path;

        const option = `
        <div id="option-container" data-number-id = "${i}" class= "option">
            <img src="${getImage('w185', imagePath)}" alt="poster film" class= "option-img" id= "option-img">
            <div class= "option-div"><h4 class= "option-title">${optionTitle}</h4></div>
        </div>`;

        optionContainer.insertAdjacentHTML("beforeend", option);
        optionContainer.className = 'option-section';

        let optionList = document.querySelectorAll('#option-container');
        optionList[i].addEventListener('click', () => {
            //CALLING GETINFO() IN FILM_DATA.JS
            return getInfo(el, optionTitle, imagePath)
        });
    });
}

//GET IMAGE OF THE MOVIES, FILM, ETC.
let getImage = (width, path) => {

    if (screen.width < 600) return width = 'w92';
        
    if (screen.width > 600 && screen.width < 1024) return width = 'w154';
        
    if(path === undefined || path === null) return '../img/not_found.svg';

    return `https://image.tmdb.org/t/p/${width}/${path}`;
};
