'use strict';

import { getImage, baseUrl, apiKey, showOptions } from "./app.js";

const popularDiv = document.getElementById('popular-div');
const kidsDiv = document.getElementById('kids-div');
const theatreDiv = document.getElementById('theatre-div');

const baseLocation = 'YOUR LOCAL URL BEFORE /file.html';

export {popularDiv, kidsDiv, theatreDiv, showTopFilms}

if (window.location.href === `${baseLocation}popular.html`) {
    //CALLING SHOWTOPFILMS()
    window.addEventListener('load', () => showTopFilms('&sort_by=popularity.desc', popularDiv));
}

if (window.location.href === `${baseLocation}theatre.html`) {
    //CALLING SHOWTOPFILMS()
    window.addEventListener('load', () => showTopFilms('&sort_by=release_date.desc', theatreDiv));
}

if (window.location.href === `${baseLocation}kids.html`) {
    //CALLING SHOWTOPFILMS()
    window.addEventListener('load', () => showTopFilms('&sort_by=popularity.desc&certification_country=US&certification=G', kidsDiv));
}

if (window.location.href === `${baseLocation}index.html`) {
    window.addEventListener('load', ()=>  {return showTopFilms('&sort_by=release_date.desc')});   
    window.addEventListener('load', ()=>  {return showTopFilms('&sort_by=popularity.desc')});
    window.addEventListener('load', ()=> { return showTopFilms('&sort_by=popularity.desc&certification_country=US&certification=G')});
}

//SHOWING TOP FILMS IN RESPECTIVE SECTIONS 
//(POPULAR, IN THEATRES AND AND POPULAR FOR KIDS)
async function showTopFilms(type, container) {

    const topUrl = `${baseUrl}discover/movie?api_key=${apiKey}${type}`;
    let topRespose = await fetch(topUrl);
    let topJson = await topRespose.json();
    
    if (window.location.href === `${baseLocation}index.html`) {
        return showTopTree(topJson.results, type)
    }

    return showOptions(topJson.results, container);
}

//SHOWING TOP 3 FILMS IN RESPECTIVE SECTIONS IN HOME PAGE
function showTopTree  (data = [], typeFilms) {

    let topPopular = document.getElementById('top-popular');
    let topKids = document.getElementById('top-kids');
    let topUpcomig = document.getElementById('top-upcoming');

    let topThree = data.filter((el, i) => i < 4)
    topThree.forEach((el, index) => {
        
        let topTxt = `
        <div data-number-id = "${index}" class= "top-option">
            <img src="${getImage('w185', el.poster_path)}" alt="poster film" class= "option-img">
            <div class= "option-div"><h4 class= "option-title">${el.title}</h4></div>
        </div>`;

        if (typeFilms === '&sort_by=popularity.desc') return topPopular.insertAdjacentHTML('beforeend', topTxt);
        if (typeFilms === '&sort_by=release_date.desc') return topUpcomig.insertAdjacentHTML('beforeend', topTxt);
        else { topKids.insertAdjacentHTML('beforeend', topTxt) };
    });
}
