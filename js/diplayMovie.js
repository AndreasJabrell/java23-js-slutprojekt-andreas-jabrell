export function funcDisplayMovie(resultMovie) {
    const img_url = 'https://image.tmdb.org/t/p/w200/';
    const container = document.querySelector('#containerTopLists');
    container.innerHTML = '';
    document.querySelector('#containerSearchResult').innerHTML = ' ';
    
    const displayMovieDiv = document.createElement('div');
    container.append(displayMovieDiv)
    displayMovieDiv.setAttribute('class', 'displayPerson')
    for (let j= 0; j<1; j++){ 
        let title = resultMovie.original_title;
        let poster_path = resultMovie.poster_path;
        let tagline = resultMovie.tagline;
        let runtime = resultMovie.runtime;
        //let credits = resultMovie.credits.cast;
        
        const titleEl = document.createElement('h5');
        const posterEl = document.createElement('img');
        const taglineEl = document.createElement('h6');
        const runtimeEl = document.createElement('p');
        const creditsEl = document.createElement('p')
        
        console.log('kör den ens in här? 2')
        /* for (let i = 0; i < combinedCredits.length; i++) {
            let creditsTitle = combinedCredits[i].original_title;
            const creditsEl = document.createElement('li');
            creditsEl.innerText = creditsTitle;
            combinedCreditsEl.append(creditsEl);
            console.log('Loopar: ' + i);
            //meningen här var att plocka ut karaktär och skådespelare för att kunna klicka sig vidare
            //tim Robbins - Andy Dufresne
            //Jack Black - Jack Black
    

            //jag skulle kalla detta ett halvtappert försök som inte hann med pga tiden tog slut
        } */
    

        
        posterEl.src = img_url + poster_path;
        taglineEl.innerText = tagline;
        runtimeEl.innerText = runtime + ' minutes';
        creditsEl.innerHTML = 'HÄR SKULLE DET STÅTT<br>tim Robbins - Andy Dufresne<br>tim Robbins - Andy Dufresne';
        titleEl.innerText = title;
        displayMovieDiv.append(titleEl);
        displayMovieDiv.append(posterEl);
        displayMovieDiv.append(taglineEl);
        displayMovieDiv.append(runtimeEl);
        displayPersonDiv.append(creditsEl);
        container.appendChild(displayMovieDiv);
        
        console.log('kör den ens in här? 3')
    }  
    }