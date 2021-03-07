import countryCardTpl from './template.hbs';
import './styles.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';
import 'lodash.debounce';
import debounce from 'lodash.debounce';
import { template } from 'handlebars';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const searchForm = document.querySelector('.js-search-form');
const countryListRef = document.querySelector('.js-countryList');
// const searchInput = document.querySelector('input-js');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    clearCountryList();
    const searchQuery = e.target.value;

    fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(error => {
            console.log(error);
        })
}

function fetchCountryByName(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        return response.json();
    });
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    console.log(markup);
    countryListRef.innerHTML = markup;
}


function clearCountryList() {
  countryListRef.innerHTML = '';
}