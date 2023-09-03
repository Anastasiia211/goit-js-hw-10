import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_jTZgoEYyYpC5E39UYpsJo3nRGb3VNmX2IVtldI2yMUh7jAsUPykqEDPxhJMgUtw8";
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';



const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    catInfo: document.querySelector('.cat-info')
}

function onBreedSearch() {
  fetchBreeds()
    .then(({ data }) => {
      elements.select.innerHTML = createSelectMarkup(data);
      elements.select.classList.remove('hidden');
      new SlimSelect({
        select: elements.select,
        settings: {
          showSearch: false,
        },
      });
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      elements.loader.classList.add('hidden');
    });
}

onBreedSearch();

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  elements.loader.classList.remove('hidden');

  fetchCatByBreed(evt.currentTarget.value)
      .then(({ data }) => {
          Notify.success('I am so cute')
      elements.catInfo.innerHTML = createMarkup(data);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      elements.loader.classList.add('hidden');
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
        <img src="${url}" class="image"  alt="${breeds.map(item => item.name)}"/>
        <div class="text">
          <h2 class="name">${breeds.map(item => item.name)}</h2>
          <div class="temperament"><span>Temperament: </span>${breeds.map(
            item => item.temperament
          )}</div>
          <div class="description">${breeds.map(item => item.description)}</div>
        </div>
    `
    )
    .join('');
}