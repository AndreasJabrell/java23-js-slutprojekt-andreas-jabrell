/* export async function fetchData (url, funcDisplay){
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
      console.error('Error fetching data:', error);
      funcError(errorMessageInput);
  }
  } */