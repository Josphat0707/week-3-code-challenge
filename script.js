const API = "http://localhost:3000/films";
document.addEventListener('DOMContentLoaded', () => {

    const movies = document.getElementById('movies');

    const cards = document.getElementById('row');
    const listdata = (films) => {
        const olist = document.createElement("li");
        olist.classList.add('lists');
        const aTag = document.createElement('a');
        aTag.classList.add('tags');

        olist.appendChild(aTag);
        aTag.innerText = films.title;
        movies.append(olist);
        aTag.addEventListener("click", (e) => {
            cards.innerHTML = ""
            e.preventDefault();
            displayMovieDetails(films);
        })
    }

    const availableTickets = (films) => {
        const balance = films.capacity - films.tickets_sold;
        return balance;
    }

    const displayMovieDetails = (films) => {

        const aticket = availableTickets(films);
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'col-5');
        const images = document.createElement('img');
        images.setAttribute("src", films.poster);
        images.src = films.poster;

        const ditDiv = document.createElement('div');
        ditDiv.classList.add('card', 'col-5');
        const movieName = document.createElement('h4');

        movieName.innerText = films.title
        const description = document.createElement('p');
        description.innerText = films.description

        const tickets = document.createElement('div');
        tickets.classList.add('card', 'col-12');
        const h2 = document.createElement('h2');
        h2.innerText = 'Showtime And Tickets';
        const ul = document.createElement('ul');
        ul.classList.add('unlist');

        const showTime = document.createElement('li');
        showTime.classList.add('show');
        showTime.innerHTML = `Showtime: <span style="color:blue;">${films.showtime}</span>`;

        const runtime = document.createElement('li');
        runtime.classList.add('runtime');
        runtime.innerHTML = `Runtime: <span style="color:blue;">${films.runtime}</span>`;

        const availTicket = document.createElement('li');
        availTicket.classList.add('avail')
        availTicket.innerHTML = `Available Tickets: <span style="color:red;">${aticket}</span>`;

        cardDiv.appendChild(images);
    
        ditDiv.appendChild(movieName);
        ditDiv.appendChild(description);
        cards.appendChild(cardDiv);
        cards.appendChild(ditDiv);

        tickets.appendChild(h2);
        ditDiv.appendChild(tickets);
        tickets.appendChild(showTime);
        tickets.appendChild(runtime);
        tickets.appendChild(availTicket);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('divbtn');
        const ticketBtn = document.createElement('button');
        ticketBtn.classList.add('btn', 'btn-outline-primary');
        ticketBtn.setAttribute("type", 'button');
        ticketBtn.innerText = `BUY-TICKET`;
        if (aticket === 0) {
            ticketBtn.disabled = true;
            ticketBtn.innerHTML = `<span style="color: red;">SOLD-OUT</span>`;
        }
        else {
            ticketBtn.addEventListener("click", (e) => {
                e.preventDefault();
                cards.innerHTML = "";
                buyTicket(films);
alert('Click OK to proceed with purchase');
            })
        }
    
        tickets.appendChild(buttonDiv);
        buttonDiv.appendChild(ticketBtn);
        
        return cardDiv;
    }

    const buyTicket = (films) => {
        fetch(`http://localhost:3000/films/${films.id}`, {
            method: 'PATCH',
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                title: films.title,

                tickets_sold: ++films.tickets_sold
            })
        })
            .then(res => res.json())
            .then(films => {
                displayMovieDetails(films)

            })
    }

    const loadMovieList = () => {
        fetch('https://kevinkkimutai.github.io/flatdango2/index.json')
            .then((res) => res.json())
            .then(data => {
                data.forEach(films => {
                    
                    listdata(films)
                    
                    if (parseInt(films.id) === 0) {
                        displayMovieDetails(films);
        
                    }
                })
            })
    }

    loadMovieList();
})