import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch() {
  const countryName = searchInput.value.trim();

  if (countryName === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName).then(data => renderContent(data));
}

function renderContent(data) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  if (data?.length === 1) {
    return renderCountryInfo(data[0]);
  }

  if (data?.length >= 2 && data.length <= 10) {
    return renderList(data);
  }

  if (data?.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderCountryInfo({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  const country = `<p class="heading main-heading"><img width="40" height="30" src="${svg}"/>${official}</p>
        <p><span class="heading">Capital: </span>${capital}</p>
        <p><span class="heading">Population: </span>${population}</p>
        <p><span class="heading">Languages: </span>${Object.values(
          languages
        ).join(', ')}</p>`;
  countryInfo.insertAdjacentHTML('beforeend', country);

  const headingText = document.querySelectorAll('.heading');
  const mainHeadingText = document.querySelector('.main-heading');

  headingText.forEach(item => (item.style.fontWeight = '700'));
  mainHeadingText.style.display = 'flex';
  mainHeadingText.style.alignItems = 'center';
  mainHeadingText.firstElementChild.style.marginRight = '10px';
  mainHeadingText.style.fontSize = '30px';
}

function renderList(data) {
  const list = data
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="list-item"><img width="40" height="30" src="${svg}"/><p>${official}</p></li>`
    )
    .join('');

  countryList.insertAdjacentHTML('beforeend', list);

  const countryOfTheList = document.querySelectorAll('.list-item');

  countryList.style.listStyle = 'none';
  countryOfTheList.forEach(item => {
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.firstElementChild.style.marginRight = '10px';
  });
}