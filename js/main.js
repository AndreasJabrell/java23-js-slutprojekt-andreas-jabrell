import { funcTopRatedPopular } from "./displayTopRatedPopular.js";
import { funcSearchResult } from "./displaySearchResult.js";
import { funcDisplayPerson } from "./displayPerson.js";
/* import { fetchData } from "./fetchData.js"; */

const BAERER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjYyNTFmMTIyMzE2YmVmMGY0MTQxYzU5ODc3OGVlNiIsInN1YiI6IjY2MjYyMjdiNjNlNmZiMDE3ZWZjYzBmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0uQ7LPUf55NmbCot8vuhOTljXgPLzSxv7w9PG0p270';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BAERER_KEY}`
  }
};


const urlTopRated = 'https://api.themoviedb.org/3/movie/top_rated';
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const urlPerson = `https://api.themoviedb.org/3/movie/3?&append_to_response=credits`
const linkPopular = document.querySelectorAll('h3')[2];
const linkTopRated = document.querySelectorAll('h3')[1];
const linkHome = document.querySelectorAll('h3')[0];
const formEl= document.querySelector('form');
const errorMessageInput = document.createElement('h4').innerText = 'Try writing that again';
const errorMessageResponse = document.createElement('h4').innerText = 'Something went wrong, try again later';


linkHome.addEventListener('click', event=>{
  event.preventDefault(); //Hindrar default responset
  location.reload();//reload page
})

formEl.addEventListener('submit', event=>{
    event.preventDefault(); //Hindrar default responset
    document.querySelector('#containerTopLists').innerText = ' ';
    const inputEl = formEl.querySelector('input');
    console.log(inputEl);
    const inputText = inputEl.value; //Hämtar det som angetts i input
    if (!inputEl.value){
      funcError(errorMessageInput);
    } else {
      console.log(inputText);
      let urlMultiSearch = `https://api.themoviedb.org/3/search/multi?query=${inputText}%20&include_adult=false&language=en-US&page=1`;
      fetchData(urlMultiSearch, funcSearchResult);
    }
    
})

linkTopRated.addEventListener('click', event=>{
    event.preventDefault(); //Hindrar default responset
    document.querySelector('#containerSearchResult').innerText = ' ';
    fetchData(urlTopRated, funcTopRatedPopular);
})

linkPopular.addEventListener('click', event=>{
  event.preventDefault(); //Hindrar default responset
  document.querySelector('#containerSearchResult').innerText = ' ';
  fetchData(urlPopular, funcTopRatedPopular);
})

function funcError (errorMessage){
  const errorDiv = document.body.querySelector('#containerSearchResult');
  errorDiv.innerText = ' ';
  errorDiv.append(errorMessage);
}

export async function fetchData (url, funcDisplay){
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
        funcError(errorMessageResponse);
        return;
    }
    const data = await response.json();
    console.log(data);
    funcDisplay(data);
} catch (error) {
  if (error.message.includes('Failed to fetch')) {
    funcError(errorMessageResponse);
    console.error('Unable to connect to the internet. Please check your internet connection and try again.');
    }
  else if (error.message.includes('Cannot read properties of undefined')) {
    funcError(errorMessageInput);
    console.error('du har skrivit in fel ', error)
    }
  else {
    console.error('An error occurred:', error);
    }
  }
}
