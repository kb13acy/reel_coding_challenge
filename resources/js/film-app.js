const filters = {
    searchText: '',
    duplicates: true
}
const request = new XMLHttpRequest()

request.open('GET', 'https://data.sfgov.org/resource/wwmu-gmzc.json')
request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4) {
            saveFilms(JSON.parse(e.target.responseText))
            let films = getSavedFilms()
            renderFilmList(films, filters)
        }
})

request.send()



document.querySelector('#show-hide-button').addEventListener('click', (e) => {
    if (e.target.value === 'hide') {
        filters.duplicates = false
        e.target.value = 'show'
        e.target.innerHTML = 'Hide duplicates'
    } else if (e.target.value === 'show'){
        filters.duplicates = true
        e.target.value = 'hide'
        e.target.innerHTML = 'Show duplicates'
    }
    renderFilmList(getSavedFilms(), filters)
})

// Rerender list when input content changes
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderFilmList(getSavedFilms(), filters)
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}




