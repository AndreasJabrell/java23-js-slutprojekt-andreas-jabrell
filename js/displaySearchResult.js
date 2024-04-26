import { fetchData } from "./main.js";
import { funcTopRatedPopular } from "./displayTopRatedPopular.js";
import { funcDisplayPerson } from "./displayPerson.js";

/* helt säker på att denna funktion skulle kunnas rensas och snyggas tilll rejält men 
har fokuserat på all funktionalitet och andra funktioner ska vara snygga... */

//funktion hämtar in data från multisearch och separerar in det på rätt ställen
export function funcSearchResult(searchResult) { 
    const img_url = 'https://image.tmdb.org/t/p/w200/';
    const container = document.querySelector('#containerSearchResult');
    container.innerHTML = '';//empty the div
    const divElPeople = document.createElement('div');
    divElPeople.setAttribute("class", "containerTopLists");
    const divElTitles = document.createElement('div');
    divElTitles.setAttribute("class", "containerTopLists");
    container.appendChild(divElPeople);
    container.appendChild(divElTitles);
    const h2People = document.createElement ('h2');
    h2People.innerText = 'PEOPLE';
    const h2Titles = document.createElement ('h2');
    h2Titles.innerText = 'TITLES';
    
    divElPeople.append(h2People);
    divElTitles.append(h2Titles);
  
      for (let i=0; i<20;i++){
          let media = searchResult.results[i].media_type;
          let idMediaPerson = searchResult.results[i].id;
          
          const cardDiv = document.createElement('div');
          cardDiv.setAttribute("class", "divElMainCard");
          const titleNameEl = document.createElement('h5');
          const overviewDiv = document.createElement('div');
          const overviewEl = document.createElement('p')
          const releaseEl = document.createElement('p');
          const posterEl = document.createElement('img');
          
          titleNameEl.addEventListener('click', event=>{
            event.preventDefault();
            fetchData(`https://api.themoviedb.org/3/person/${idMediaPerson}?&append_to_response=combined_credits`, funcDisplayPerson);
            console.log(idMediaPerson)}) //kommer användas för att klicka in till filmen sen
  
          if (media == 'movie'){
              let title = searchResult.results[i].title;
              let release_date = searchResult.results[i].release_date;
              let overview = searchResult.results[i].overview;
              let poster_path = searchResult.results[i].poster_path;
  
              cardDiv.append(titleNameEl);
              titleNameEl.innerText = title;
              titleNameEl.setAttribute("class", "overview");
              cardDiv.append(releaseEl);
              releaseEl.innerText = 'Released ' + release_date;
              cardDiv.append(posterEl);
              posterEl.src = img_url + poster_path;
              cardDiv.append(overviewDiv);
              overviewDiv.appendChild(overviewEl);
              overviewDiv.setAttribute("class", "overview");
              cardDiv.addEventListener("mouseenter" , () => {
                overviewEl.innerText = overview;
                overviewEl.style.display = "block"
              })
  
              cardDiv.addEventListener("mouseleave" , () => {
                overviewEl.style.display = "none"
              })
              
              divElTitles.appendChild(cardDiv);
              console.log(title, release_date, poster_path)
          } 
          else if (media == 'tv'){
              let name = searchResult.results[i].name;//title of tv-show
              let poster_path = searchResult.results[i].poster_path;
              cardDiv.append(titleNameEl);
              titleNameEl.innerText = name;
              cardDiv.append(posterEl);
              posterEl.src = img_url + poster_path;
              divElTitles.appendChild(cardDiv);
              console.log(name, poster_path)
          }
          else if (media == 'person'){
              let name = searchResult.results[i].name;
              let profile_path = searchResult.results[i].profile_path;
              let knownFor = searchResult.results[i].known_for_department;
              let credits = searchResult.results[i].known_for;
                
              cardDiv.append(posterEl);
              posterEl.src = img_url + profile_path;
              cardDiv.append(titleNameEl);
              cardDiv.setAttribute("class", "divElMainCard");
              titleNameEl.innerText = name + ' (' + knownFor + ')';
              divElPeople.appendChild(cardDiv);
              //for-loop to get credits of actor
              for (let j = 0; j<credits.length; j++) {
                let mediaCredits = searchResult.results[i].known_for[j].media_type;
                let mediaTitle = searchResult.results[i].known_for[j].original_title;
                let mediaName = searchResult.results[i].known_for[j].name;
                let mediaId = searchResult.results[i].known_for[j].id;
                const creditsEl = document.createElement('h5');
                creditsEl.addEventListener('click', event=>{
                  event.preventDefault();
                  console.log(`https://api.themoviedb.org/3/movie/${mediaId}?&append_to_response=credits`)
                    fetchData(`https://api.themoviedb.org/3/movie/${mediaId}?&append_to_response=credits`, funcDisplayPerson);
                    console.log(mediaId)})
                if (mediaCredits == 'movie'){
                  creditsEl.innerText = mediaCredits + ': ' + mediaTitle;
                } 
                else if (mediaCredits == 'tv'){
                  creditsEl.innerText = mediaCredits + ': ' + mediaName;
                }
                
                cardDiv.append(creditsEl);
                }
  
              console.log(profile_path, name, knownFor, credits)
          }
  
          container.append(divElPeople, divElTitles)
      }
      
    }