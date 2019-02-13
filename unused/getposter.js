
// const req = new XMLHttpRequest()
// let film = "Age Of Adaline"
// req.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film + '&callback=?')
// req.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4) {
//             let posterJSON = e.target.responseText
//             posterJSON = posterJSON.substring(posterJSON.indexOf('['), posterJSON.length - 2)
//             posterJSON = JSON.parse(posterJSON)
//             document.querySelector('#poster').setAttribute('src', 'http://image.tmdb.org/t/p/w500' + posterJSON[0].poster_path)
//             console.log(posterJSON[0].poster_path)
//         }
// })

// document.querySelector('#fetch-image').addEventListener('click', (e) => {
//    const req = new XMLHttpRequest()
//    let film = "Age Of Adaline"
//    req.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + film + '&callback=?')
//    req.addEventListener('readystatechange', (e) => {
//          if (e.target.readyState === 4) {
//                let posterJSON = e.target.responseText
//                posterJSON = posterJSON.substring(posterJSON.indexOf('['), posterJSON.length - 2)
//                posterJSON = JSON.parse(posterJSON)
//                document.querySelector('#poster').setAttribute('src', 'http://image.tmdb.org/t/p/w500' + posterJSON[0].poster_path)
//                console.log(posterJSON[0].poster_path)
//          }
//    })
//    req.send()
// })

let posterURL = ''

const retrievePoster = (title) => {
   const req = new XMLHttpRequest()

   req.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + title + '&callback=?')
   req.addEventListener('readystatechange', (e) => {
         if (e.target.readyState === 4) {
            
               let posterJSON = e.target.responseText
               posterJSON = posterJSON.substring(posterJSON.indexOf('['), posterJSON.length - 2)
               posterJSON = JSON.parse(posterJSON)
               let posterPath = 'http://image.tmdb.org/t/p/w500' + posterJSON[0].poster_path
               posterURL = posterPath
               debugger
         }
         
   })
   req.send()
}

