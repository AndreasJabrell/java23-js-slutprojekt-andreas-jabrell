
import { fetchData } from "./main.js";
import { funcDisplayMovie } from "./diplayMovie.js";


export function funcTopRatedPopular(topRated) {
  const img_url = 'https://image.tmdb.org/t/p/w200/';
  const container = document.querySelector('#containerTopLists');
  container.innerHTML = '';

  for (let i=0; i<10; i++){
      let title =topRated.results[i].title;
      let release_date =topRated.results[i].release_date;
      let poster_path =topRated.results[i].poster_path;
      let movieId = topRated.results[i].id;
      const urlMovieDetails = `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=credits`;
      const topRatedDiv = document.createElement('div');
      topRatedDiv.setAttribute("class", "divElMainCard");
      const titleEl = document.createElement('h5');
      
      const releaseEl = document.createElement('p');
      const posterEl = document.createElement('img');
  
      topRatedDiv.append(titleEl);
      topRatedDiv.append(releaseEl);
      topRatedDiv.append(posterEl);
      container.appendChild(topRatedDiv);

      titleEl.innerText = title;
      const titleClick = document.querySelectorAll('h5')[i];
      titleClick.addEventListener('click', event=>{
        event.preventDefault();
        console.log(`https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=credits`)
        fetchData(urlMovieDetails, funcDisplayMovie);
        console.log(movieId) //kommer användas för att klicka in till filmen sen
      })
      releaseEl.innerText = 'Released ' + release_date;
      posterEl.src = img_url + poster_path;
  }
}