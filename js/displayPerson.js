export function funcDisplayPerson(resultPerson) {
    const img_url = 'https://image.tmdb.org/t/p/w200/';
    const container = document.querySelector('#containerTopLists');
    container.innerHTML = '';
    document.querySelector('#containerSearchResult').innerHTML = ' ';
    
    const displayPersonDiv = document.createElement('div');
    displayPersonDiv.setAttribute('class', 'displayPerson')
    console.log('kör den ens in här?')
    for (let j= 0; j<1; j++){
        let name = resultPerson.name;
        let profile_path = resultPerson.profile_path;
        let knownForDepartment = resultPerson.known_for_department;
        let placeOfBirth = resultPerson.place_of_birth;
        let combinedCredits = resultPerson.combined_credits.cast;
        
        const nameEl = document.createElement('h5');
        const posterEl = document.createElement('img');
        const knownForDepartmentEl = document.createElement('h6');
        const placeOfBirthEl = document.createElement('p');
        const combinedCreditsEl = document.createElement('ol')
        
        console.log('kör den ens in här? 2')
        for (let i = 0; i < combinedCredits.length; i++) {
            let creditsTitle = combinedCredits[i].original_title;
            const creditsEl = document.createElement('li');
            creditsEl.innerText = creditsTitle;
            combinedCreditsEl.append(creditsEl);
            console.log('Loopar: ' + i);
            //meningen här var att plocka ut media typ och titel så det skulle bli en lista så här
            //movie - twelve monkeys
            //movie - fight club
            //tv - friends

            //jag skulle kalla detta ett tappert försök
        }
                console.log(combinedCreditsEl)        

        
        posterEl.src = img_url + profile_path;
        knownForDepartmentEl.innerText = knownForDepartment;
        placeOfBirthEl.innerText = placeOfBirth;
        combinedCreditsEl.innerText = combinedCredits;
        nameEl.innerText = name;
        displayPersonDiv.append(nameEl);
        displayPersonDiv.append(posterEl);
        displayPersonDiv.append(knownForDepartmentEl);
        displayPersonDiv.append(placeOfBirthEl);
        displayPersonDiv.append(combinedCreditsEl);
        container.appendChild(displayPersonDiv);
        
        console.log('kör den ens in här? 3')
    }  
    }
    