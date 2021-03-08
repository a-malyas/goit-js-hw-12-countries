import fetchCountries from './fetchCountries.js';
import './styles.css';
import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import 'lodash.debounce';
import oneCountryTpl from './1_country_template.hbs';
import countryListTpl from './countries_template.hbs';
import debounce from 'lodash.debounce';
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
defaults.styling = 'brighttheme';
defaults.icons = 'brighttheme';

defaultModules.set(PNotifyMobile, {});

const searchForm = document.querySelector('.js-search-form');
const countryListRef = document.querySelector('.js-countryList');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    clearCountryList();
    
    fetchCountries(searchQuery).then(data => {
        if (data.length >= 10) {
            error({
                text: "Too many matches found. Please enter a more specific query!",
                delay: 2000,
            });
        } else if (data.status === 404) {
            error({
                text: "No country has been found. Please enter a more specific query!"
        });
        } else if (data.length === 1) {
            renderOneCountryCard(data);
        } else if (data.length < 10) {
            renderCountriesList(data);
        }
    })
    .catch(error => console.log(error));
}
        

function renderCountriesList(countries) {
    const markup = countryListTpl(countries);
    console.log(markup);
    countryListRef.insertAdjacentHTML('afterbegin', markup);
}

function renderOneCountryCard([country]) {
    const markup = oneCountryTpl(country);
    console.log(markup);
    countryListRef.innerHTML = markup;
}

function clearCountryList() {
  countryListRef.innerHTML = '';
}