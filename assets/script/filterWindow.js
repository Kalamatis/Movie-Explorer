import { imdbErrorHandler } from "./errorHandler.js";

// FilterWindow back Button
const fwbackButton = document.querySelector(".fwback-button");
const FilterWindow = document.querySelector(".filterWindow");
const fmContainer = document.querySelector("#fwbody");
const searchForms = document.querySelectorAll(".formInput");
const movieType = document.querySelector("#movie-type");

fwbackButton.addEventListener("click", () => {
  FilterWindow.style.display = "none";
});
document.querySelector("#showFW").addEventListener("click", () => {
  showFW();
});

function showFW() {
  FilterWindow.style.display = "block";
}

async function fetchMovie(input, type) {
  let isID = isIDmethod(input);

  loadingScreen(fmContainer);

  try {
    const apiKey = "3559942e";
    let response;
    if (isID) {
      response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${input}&type=${type}`
      );
    } else {
      response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${input}&type=${type}`
      );
    }
    const data = await response.json();
    console.log(data);
    imdbErrorHandler(data);
  } catch (error) {
    console.log(error);
  }
}

//This will verify if the input is ID,
//if the input starts with 'tt' and the rest is number, it returns
function isIDmethod(input) {
  const id =
    input.slice(0, 2) === "tt" && !isNaN(Number(input.slice(2))) ? true : false;
  return id;
}

//Forms input
searchForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchInput = document.querySelector(".search-title").value.trim();
    const fwsearchInput = document
      .querySelector(".fwsearch-title")
      .value.trim();

    if (searchInput !== "") {
      fetchMovie(searchInput, movieType.value);
      document.querySelector(".search-title").value = "";
      movieType.value = "";
    } else if (fwsearchInput !== "") {
      fetchMovie(fwsearchInput, movieType.value);
      document.querySelector(".fwsearch-title").value = "";
      movieType.value = "";
    }
  });
});

export function displayMovies(movies) {
  fmContainer.innerHTML = "";
  movies.Search.forEach((movie) => {
    const title = movie.Title;
    const poster = movie.Poster;
    const year = movie.Year;
    const type = movie.Type;

    console.log(poster);
    fmContainer.innerHTML += `
    <div class="fmcontainer">
      <img src="${poster}"
            alt="No image found"
            class="fmimage"
          />
          <div class="fmtrContainer">
            <h6>${year}</h6>
            <h6>${type}</h6>
          </div>
          <h5>${title}</h5>
      </div>
  `;
  });

  showFW();
}

function loadingScreen(div) {
  div.innerHTML = `
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
`;
}
