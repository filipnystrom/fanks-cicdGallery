import logo from './images/fankypicslogo.png';
import './styles/main.scss'

console.log('Filip rulez (sometimez)!');

const state = {
  header: "<img id='logo' src='http://localhost:8080/fb7e1839a4ebdb05b5c2.png' />",
  form: `<input type='text' list='dropdown' name='search' placeholder='Search for fanky pics' />
  <datalist id='dropdown'></datalist>
  <button class='fankyButton'>Search</button>`,
  imagesection: "<section class='grid'></section>",
  footer: "<footer><a href='https://github.com/filipnystrom/fanks-cicdGallery'>Link to Github Log</a></footer>",
};

const template = state => {
  return `
    <header>${state.header}</header>
    ${state.form}
    ${state.imagesection}
    ${state.footer}
  `;
};

const render = (htmlString, el) => {
  el.innerHTML = htmlString;
};

window.addEventListener("statechange", () => {
  render(template(state), document.querySelector("#root"));
});
  
window.dispatchEvent(new Event("statechange"));

let suggestionCount = 1;
const button = document.querySelector('.fankyButton');
button.addEventListener('click', () => {
  localStorage.setItem(`search${suggestionCount}`, document.querySelector('input').value);
  suggestionCount++;
  if (suggestionCount === 4) suggestionCount = 1;
  render(`<option value='${localStorage.getItem('search1')}'>
    <option value='${localStorage.getItem('search2')}'>
    <option value='${localStorage.getItem('search3')}'>`, document.querySelector('datalist'));
  const output = document.querySelector(".grid");
  let pictures = "";
  const ACCESS_KEY = 'LFQgZLCBi24aGBUgpuvGmWD1Oj6ZbkFHYE2vJBmAruQ';
  const unsplashEndpoint = `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=`;
  const response = fetch(unsplashEndpoint + `${document.querySelector('input').value}`);
  response
    .then(res => {
      return res.json();
    })
    .then(data => {
      let imagesArray = data.results;
      for (let i = 0; i < 9; i++) {
        pictures += `<div class='imageContainer'><img class='image' src="${imagesArray[i].urls.regular}"></div>`;
      }
      output.innerHTML = pictures;
    })
    .catch(err => {
      console.log(err)
    });
})

