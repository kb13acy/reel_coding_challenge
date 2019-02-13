const modal = document.getElementById('myModal');

// Retrieve string from local storage and return it as JSON array
const getSavedFilms = function () {
    let filmsJSON = localStorage.getItem('filmData')

    return filmsJSON !== null ? JSON.parse(filmsJSON) : []
 }

// Save the movie list in local storage with a generated unique ID (for later use, if needed)
const saveFilms = function(data) {
    for (i = 0; i < data.length; i++) {
           data[i]['id'] = uuidv4()
    }
    localStorage.setItem('filmData', JSON.stringify(data))
}

// Validate string text size
const validateTextLenght = (text) => {
    if (text.length > 44) {
        text = text.substring(0, 42)
        text = `${text}...`
        return text
    } else {
        return text
    }
}

// Create new array without duplicates
const removeDuplicates = function(films, filters, comp) {
    if (filters.duplicates) {
        const unique = films
            .map(e => e[comp])
    
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
    
        // eliminate the dead keys & store unique objects
        .filter(e => films[e]).map(e => films[e]);
    
        return unique;
    } else {
        return films
    }
  }

// Rendering the movile list
const renderFilmList = function(films, filters) {
    films = removeDuplicates(films, filters, 'title')
    const filteredFilms = films.filter((film) =>  film.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    //Clear parent content
    document.querySelector('#film-list-content').innerHTML = ''

    // Append result on screen
    filteredFilms.forEach(function(film) {
        document.querySelector('#film-list-content').appendChild(generateFilmDOM(film))
    })
}

// Hide the movie modal
const closeModal = () => {
    modal.style.display = "none";
}



// Make the movie modal visible and set content
const openModal = (film) => {
    document.querySelector('#modal-title').textContent = film.title
    document.querySelector('#modal-year').textContent = film.release_year
    document.querySelector('#modal-locations').textContent = film.locations
    document.querySelector('#modal-funfacts').textContent = film.fun_facts
    document.querySelector('#modal-production').textContent = film.production_company
    document.querySelector('#modal-distributor').textContent = film.distributor
    document.querySelector('#modal-director').textContent = film.director
    document.querySelector('#modal-writer').textContent = film.writer
    document.querySelector('#modal-actor1').textContent = film.actor_1
    document.querySelector('#modal-actor2').textContent = film.actor_2
    document.querySelector('#modal-actor3').textContent = film.actor_3

    const req = new XMLHttpRequest()
    let posterURL
    req.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=353ef5574b16e5650020485ec2680bf9&query=' + film.title + '&callback=?')
    req.addEventListener('readystatechange', (e) => {
         if (e.target.readyState === 4) {
            
               let posterJSON = e.target.responseText
               posterJSON = posterJSON.substring(posterJSON.indexOf('['), posterJSON.length - 2)
               posterJSON = JSON.parse(posterJSON)
               let posterPath = 'http://image.tmdb.org/t/p/w500' + posterJSON[0].poster_path
               posterURL = posterPath
               document.querySelector('#poster').setAttribute('src', posterURL)
               debugger
         }
         
    })
    req.send()
    
    modal.style.display = "block";
}

// Creating the DOM element for a movie
const generateFilmDOM = (film) => {
    const filmEl = document.createElement('div')
    const filmTitle = document.createElement('h2')
    const filmData = document.createElement('div')
    const filmYear = document.createElement('p')
    const filmDirector = document.createElement('p')
    const filmButton = document.createElement('button')
    const filmIcon = document.createElement('i')

    // Assign class to div
    filmEl.setAttribute('class', 'film-element')

    // Setup film title header
    if (film.title.length > 0) {
        filmTitle.textContent = film.title
    } else {
        filmTitle.textContent = 'Missing Data'
    }
    filmEl.appendChild(filmTitle)

    // Setup director paragraphs
    filmDirector.setAttribute('id', 'list-director')
    if (film.director.length > 0) {
        //filmDirector.textContent = film.director
        let testText = validateTextLenght(film.director)
        
        filmDirector.textContent = testText
    } else {
        filmDirector.textContent = 'Missing Data'
    }
    filmData.appendChild(filmDirector)
    
    // Setup film release year paragraphs
    filmYear.setAttribute('id', 'list-year')
    if (film.release_year.length > 0) {
        filmYear.textContent = film.release_year
    } else {
        filmYear.textContent = 'Missing Data'
    }
    filmData.appendChild(filmYear)


    // Setup the button
    filmButton.setAttribute('id', 'modalButton')
    filmButton.setAttribute('class', "btn btn-ghost")
    filmIcon.setAttribute('class', 'icon ion-md-eye')
    filmButton.appendChild(filmIcon)
    filmData.appendChild(filmButton)
    filmButton.addEventListener('click', function (e) {
        openModal(film)
    })
    filmData.setAttribute('class', 'film-data')
    filmEl.appendChild(filmData)

    return filmEl
}


