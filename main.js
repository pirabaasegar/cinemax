const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MOVIE_API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const TV_API_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const PERSON_API_URL = BASE_URL + '/person/popular?' + API_KEY;
const searchURL = BASE_URL + '/search/multi?' + API_KEY;

const form = document.getElementById('form');
const search = document.getElementById('search');

const main = document.getElementById('main');

const popularMovies = document.getElementById('popular-movies');
const popularTV = document.getElementById('popular-tv');
const popularPeople = document.getElementById('popular-people');

const carouselItems = document.getElementById('carousel-items');

getPopularMovies(MOVIE_API_URL);
getPopularShows(TV_API_URL);
getPopularPeople(PERSON_API_URL);
getCarouselItems(MOVIE_API_URL);

function getPopularMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showPopularMovies(data.results.slice(0, 7))
        })
}

function getPopularShows(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showPopularTV(data.results.slice(0, 7))
        })
}

function getPopularPeople(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showPopularPeople(data.results.slice(0, 7))
        })
}

function getCarouselItems(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showCarouselItems(data.results.slice(0, 1))
        })
}

function showPopularMovies(data) {
    popularMovies.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('w-52');
        movieEl.classList.add('m-4');
        movieEl.classList.add('relative');
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" class="rounded-2xl shadow-md" alt="${title}" draggable="false">
            <div class="mt-4">
                <h3 class="text-base font-bold">${title}</h3>
                <p class="text-gray-600">${release_date}</p>
            </div>
        `
        popularMovies.appendChild(movieEl);
    })
}

function showPopularTV(data) {
    popularTV.innerHTML = '';

    data.forEach(show => {
        const { name, poster_path, first_air_date } = show;
        const showEl = document.createElement('div');
        showEl.classList.add('w-52');
        showEl.classList.add('m-4');
        showEl.classList.add('relative');
        showEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" class="rounded-2xl shadow-md" alt="${name}" draggable="false">
            <div class="mt-4">
                <h3 class="text-base font-bold">${name}</h3>
                <p class="text-gray-600">${first_air_date}</p>
            </div>
        `
        popularTV.appendChild(showEl);
    })
}

function showPopularPeople(data) {
    popularPeople.innerHTML = '';

    data.forEach(person => {
        const { name, profile_path, known_for_department } = person;
        const personEl = document.createElement('div');
        personEl.classList.add('w-52');
        personEl.classList.add('m-4');
        personEl.classList.add('relative');
        personEl.classList.add('flex');
        personEl.classList.add('flex-col');
        personEl.innerHTML = `
            <img src="${profile_path ? IMG_URL + profile_path : "http://via.placeholder.com/150"}" class="rounded-2xl shadow-md" alt="${name}" draggable="false">
            <div class="mt-4 text-center">
                <h3 class="text-base font-bold">${name}</h3>
                <p class="text-gray-600">${known_for_department}</p>
            </div>
        `
        popularPeople.appendChild(personEl);
    })
}

function showCarouselItems(data) {
    carouselItems.innerHTML = '';

    data.forEach(item => {
        const { backdrop_path } = item;
        const carouselEl = document.createElement('div');
        carouselEl.classList.add('relative');
        carouselEl.classList.add('overflow-hidden');
        carouselEl.classList.add('shadow-md');
        carouselEl.classList.add('rounded-2xl');

        carouselEl.innerHTML = `
            <div class="duration-700 ease-in-out" data-carousel-item="active">
                <img src="images/header-1.jpg" alt="..." draggable="false">
            </div>
        `
        carouselItems.appendChild(carouselEl);
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getAll(searchURL + '&query=' + searchTerm)
        location.replace('?search=' + searchTerm);
    } else {
        getAll(MOVIE_API_URL);
    }

})

let topButton = document.getElementById("topButton");

window.onscroll = function () { scroll() };

function scroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

topButton.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})