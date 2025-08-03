import { fetchMovie } from "./dataManager.js";

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
function closeFW() {
  FilterWindow.style.display = "none";
}

//Forms input
searchForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submission();
  });
});

// Makes the input regain focus after using
movieType.addEventListener("change", (e) => {
  submission();
});

export function displayMovies(movies) {
  fmContainer.innerHTML = "";
  if (movies.length === 1) {
    showMovie(movies);
    return;
  }

  movies.Search.forEach((movie) => {
    const title = movie.Title;
    const poster = movie.Poster;
    const year = movie.Year;
    const type = movie.Type;
    const id = movie.imdbID || movie.imdbid;

    fmContainer.innerHTML += `
    <div class="fmcontainer" >
      <img src="${poster}" class="fmimage" data-id="${id}"
            onerror="this.onerror=null; this.src='/Movie Explorer/assets/icons/no-image.png';"; 
          />
          <div class="fmtrContainer">
            <h6>${year}</h6>
            <h6>${type}</h6>
          </div>
          <h5>${title}</h5>
      </div>
  `;
  });
  fmcEvents();
  showFW();
}

export function loadMovies(input, type) {
  fetchMovie(input, type);
}

export function loadingScreen() {
  fmContainer.innerHTML = `
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
  <div class="loadingBoxes"><div class="LBDS"></div></div>
`;
}

function submission() {
  const searchInput = document.querySelector(".search-title").value.trim();
  const fwsearchInput = document.querySelector(".fwsearch-title").value.trim();

  if (searchInput !== "") {
    fetchMovie(searchInput, movieType.value);
    document.querySelector(".search-title").value = "";
    movieType.value = "";
  } else if (fwsearchInput !== "") {
    fetchMovie(fwsearchInput, movieType.value);
    document.querySelector(".fwsearch-title").value = "";
    movieType.value = "";
  }
}

function fmcEvents() {
  const fmsContainer = document.querySelectorAll(".fmimage");

  fmsContainer.forEach((fmc) => {
    fmc.addEventListener("click", (e) => {
      closeFW();
      const id = fmc.getAttribute("data-id");
      fetchMovie(id);
    });
  });
}
