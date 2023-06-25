let BASE_URL = "http://localhost:8000/api/v1/titles/"

function displayBestMovie() {

    let bannerTitle = document.getElementById('banner__title');
    let bannerImg = document.getElementById('banner')
    let bannerDesc = document.getElementById('banner__desc');
    let bannerButtonModal = document.getElementById('button__modal');
    fetch(BASE_URL + '?sort_by=-imdb_score&page_size=8')
    .then(response => response.json())
    .then(data => {
      let results = data.results;
      bannerTitle.innerHTML = results[0].title;
      bannerImg.style.backgroundImage = `url(${results[0].image_url})`;
      bannerButtonModal.setAttribute("onclick", `openModal("${results[0].id}")`)
      fetch(results[0]["url"])
                .then(response => response.json())
                .then(data => {
                    bannerDesc.innerHTML = data.description;
                })
      let bestMovies = document.getElementById('best__movies');
      let moviesList = document.createElement('div');
      moviesList.classList.add('movies__list');
      bestMovies.appendChild(moviesList)
      for(let i = 1; i < results.length; i++) {

        let box = document.createElement('div');
        box.classList.add("box");

        let movieCover = document.createElement("img");
        movieCover.setAttribute("alt", results[i].title);
        movieCover.src = results[i].image_url;
        box.appendChild(movieCover);

        let overlay = document.createElement("div");
        overlay.classList.add("overlay");

        let movieTitle = document.createElement("p");
        movieTitle.innerHTML = results[i].title;
        overlay.appendChild(movieTitle);

        let modalButton = document.createElement("button");
        modalButton.classList.add("overlay__button");
        modalButton.setAttribute("onclick", `openModal("${results[i].id}")`);
        modalButton.innerHTML = "More...";
        overlay.appendChild(modalButton);

        box.appendChild(overlay);
        moviesList.appendChild(box)

      }
    })
}

function displayOthersCategories(name) {

  fetch(BASE_URL + `?sort_by=-imdb_score&page_size=7&genre=` + name)
  .then(response => response.json())
  .then(data => {
    let results = data.results;
    let movies = document.getElementById(name);
    let moviesList = document.createElement('div');
    moviesList.classList.add('movies__list');
    movies.appendChild(moviesList)
    for(let i = 0; i < results.length; i++) {

      let box = document.createElement('div');
      box.classList.add("box");

      let movieCover = document.createElement("img");
      movieCover.setAttribute("alt", results[i].title);
      movieCover.src = results[i].image_url;
      box.appendChild(movieCover);

      let overlay = document.createElement("div");
      overlay.classList.add("overlay");

      let movieTitle = document.createElement("p");
      movieTitle.innerHTML = results[i].title;
      overlay.appendChild(movieTitle);

      let modalButton = document.createElement("button");
      modalButton.classList.add("overlay__button");
      modalButton.setAttribute("onclick", `openModal("${results[i].id}")`);
      modalButton.innerHTML = "More...";
      overlay.appendChild(modalButton);

      box.appendChild(overlay);
      moviesList.appendChild(box)

    }
  })

}


function openModal(id) {

    let modal = document.getElementById("modal");
    let close = document.getElementById("close");
    displayModalData(id)
    modal.style.display = "block";

    close.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target === modal)
            modal.style.display = "none";
    }
}

function displayModalData(id) {

    fetch(BASE_URL + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById('modal__cover').src = data.image_url;
            document.getElementById('modal__title').innerHTML = data.title;
            document.getElementById('modal__year').innerHTML = data.year;
            document.getElementById('modal__duration').innerHTML = data.duration + " min";
            document.getElementById('modal__genres').innerHTML = data.genres;
            document.getElementById('modal__imdb').innerHTML = data.imdb_score;
            document.getElementById('modal__directors').innerHTML = data.directors;
            document.getElementById('modal__cast').innerHTML = data.actors;
            document.getElementById('modal__country').innerHTML = data.countries;
            document.getElementById('modal__rating').innerHTML = data.rated;
            document.getElementById('modal__income').innerHTML = data.worldwide_gross_income;
            document.getElementById('modal__desc').innerHTML = data.description;
        })
        .catch(error => {
          console.error(error);
        });
}




let nextButton = document.getElementsByClassName('next__button');
let prevButton = document.getElementsByClassName('prev__button');
let box = document.getElementsByClassName('movies__list');
let shiftPositions = [0,0,0,0];




for (let i = 0; i < shiftPositions.length; i++) {
  nextButton[i].addEventListener('click', function() {
    if (shiftPositions[i] < 75){
      shiftPositions[i] += 25;
      box[i].style.transform = `translateX(-${shiftPositions[i]}%)`;
    }
  });
  prevButton[i].addEventListener('click', function() {
    if (shiftPositions[i] > 0){
      shiftPositions[i] -= 25;
      box[i].style.transform = `translateX(-${shiftPositions[i]}%)`;
    }
  });
}

displayBestMovie();
displayOthersCategories('adventure');
displayOthersCategories('animation');
displayOthersCategories('western');
