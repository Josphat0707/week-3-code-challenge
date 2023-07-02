// Fetch the movie details for the first movie
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(movie => {
    // Display movie details on the page
    document.getElementById('poster').src = movie.poster;
    document.getElementById('title').textContent = movie.title;
    document.getElementById('runtime').textContent = movie.runtime + ' minutes';
    document.getElementById('showtime').textContent = 'Showtime: ' + movie.showtime;
    document.getElementById('available-tickets').textContent = 'Available Tickets: ' + (movie.capacity - movie.tickets_sold);
  });

// Fetch all movies
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(movies => {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = ''; // Clear the placeholder li element

    // Create and append li elements for each movie
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.textContent = movie.title;
      filmsList.appendChild(li);
    });
  });

// Buy ticket button click event handler
document.getElementById('buy-ticket').addEventListener('click', () => {
  // Check if tickets are available
  const availableTickets = parseInt(document.getElementById('available-tickets').textContent.split(': ')[1]);
  if (availableTickets > 0) {
    // Decrease available tickets count and update on the frontend
    const updatedTickets = availableTickets - 1;
    document.getElementById('available-tickets').textContent = 'Available Tickets: ' + updatedTickets;
  } else {
    // Show alert or display a message that the showing is sold out
    alert('This showing is sold out.');
  }
});
