document.addEventListener(`DOMContentLoaded`, ()=> {
        fetch(`http://localhost:3000/films/1`)
        .then(response => response.json())
        .then(movie => {
            displayMovieDetails(movie);
        })

        fetch(`http://localhost:3000/films`)
        .then(response => response.json())
        .then(film => {
            displayFilmMenu(film);
        })

    function displayMovieDetails(movie){
        const moviePoster = document.getElementById(`movie-poster`);
        moviePoster.src = movie.poster;

        const movieTitle = document.getElementById(movie-title);
        movieTitle.textContent = movie.title;

        const movieRuntime = document.getElementById(`movie-runtime`);
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;

        const movieShowtime = document.getElementById(`movie-showtime`);
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;

        const movieAvailableTickets = document.getElementById(`movie-available-tickets`);
        const availableTickets = movie.capacity - movie.tickets-sold;
        movieAvailableTickets.textContent = `Available tickets: ${availableTickets}`;
    }

    function displayFilmMenu(films) {
        const filmMenu = document.getElementById(`films`);

        films.forEach(film =>{
            const li = document.createElement(`li`);
            li.textContent = film.title;
            li.classList.add(`film`, `item`);

            li.addEventListener(`click`, ()=>{
                displayMovieDetails(film);
            });
            filmMenu.appendChild(li);
        })
    }
    function buyTicket(){
        const movieAvailableTickets = document.getElementById(`movie.available-tickets`);
        const availableTickets = parseInt(movieAvailableTickets.textContent.split(` `)[2]);

        if(availableTickets > 0){
            movieAvailableTickets.textContent = `Available Tickets: ${availableTickets - 1}`;
        }
    }
})