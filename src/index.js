import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';
import Notiflix, { Block } from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { AxiosError } from "axios";
import './css/common.css'

const elements = {
  select: document.querySelector(`#single`),
  info: document.querySelector(`.cat-info`),
  loader: document.querySelector(`.loader`)
}
elements.select.style.display = `none`
  let name = [];
fetchBreeds()
  .then(data => {
    elements.select.style.display = `flex`
    elements.loader.style.display = `none`;
    data.forEach(item => {
        name.push({text: item.name, value: item.id});
    });
    new SlimSelect({
      select: '#single',
      data: name
})
    })
  .catch(err => {
  Notiflix.Report.failure(
  'Ooops!',
  'Something went wrong!',
  'Try reloading the page!',
  function cb() {
   document.location.reload();
  },
  {
    width: '360px',
    svgSize: '120px',
  },
);
  });

elements.select.addEventListener(`change`, selectName);
function selectName(evt) {
  elements.info.style.display = `none`;
  elements.loader.style.display = `flex`;
  let breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      elements.loader.style.display = `none`;
      elements.info.style.display = `flex`;
      const {url, breeds: [{name, description, temperament}]} = data[0];
      elements.info.innerHTML = `
    <ul class="list-info">
        <li><img src="${url}" alt="${name}" height="auto" width="500px"></li>
        <div class="item-info">
        <li><h2 class="title-info">${name}</h2></li>
        <li><p class="desc-info">${description}</p> </li>
        <li><p class="temper-info"><span class="text-info">Temperament: </span>${temperament}</p> </li>
  </div>
    </ul>`
    })
    .catch(err => {
      Notiflix.Report.failure(
  'Ooops!',
  'Something went wrong!',
  'Try reloading the page!',
  function cb() {
   document.location.reload();
  },
  {
    width: '360px',
    svgSize: '120px',
  },
);
    });
}
