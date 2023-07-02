        function fetchingFilms(){
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
//Displays the first movie details.
        const moviePoster = document.getElementById(`movie-poster`);
        moviePoster.src = movie.poster;

        const movieTitle = document.getElementById(`movie-title`);
        movieTitle.textContent = movie.title;

        const movieRuntime = document.getElementById(`movie-runtime`);
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;

        const movieShowtime = document.getElementById(`movie-showtime`);
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;

        const movieAvailableTickets = document.getElementById(`movie-available-tickets`);
        const availableTicket = movie.capacity - movie.tickets-sold;
        movieAvailableTickets.textContent = `Available tickets: ${availableTicket}`;

        if (movieAvailableTickets < 0){
            movie.innerHTML = `${movie.title} <span> SOLDOUT </span>`
        }else{
            movieAvailableTickets.innerText = `tickets: (${availableTicket})`;
        };
    
//displays the other movies in a menu from where one click to get more details
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
    
//The buying tickets option.    
        const btn = document.createElement("button");
        btn.textContent = "Buy ticket";
        const movieAvailableTicket = document.getElementById(`movie.available-tickets`);
        const availableTickets = parseInt(movieAvailableTicket.textContent.split(` `)[2]);

        if(availableTickets > 0){
            movieAvailableTickets.textContent = `Available Tickets: ${availableTickets - 1}`;
        }
    }
fetchingFilms();

