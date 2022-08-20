export const fetchCountries = name => {
  if (name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error in fetch-function');
      })
      .catch(error => console.error(error));
  }
};