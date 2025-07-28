// FilterWindow back Button
const fwbackButton = document.querySelector(".fwback-button");
const FilterWindow = document.querySelector(".filterWindow");
const fmContainer = document.querySelector("#fwbody");

fwbackButton.addEventListener("click", () => {
  FilterWindow.style.display = "none";
});
function showFW() {
  FilterWindow.style.display = "block";
}

async function fetchMovie(title) {
  loadingScreen(fmContainer);

  try {
    const apiKey = "3559942e";
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
    );

    if (response.Response === "False")
      throw new error("Failed to collect resources");

    const data = await response.json();
    dataHandler(data);
  } catch (error) {
    console.log(error);
  }
}

function dataHandler(data) {
  if (data.Error !== "Movie not found!") displayMovies(data);
  else fmContainer.innerHTML = `Movie not Found!`;
}

const searchForms = document.querySelectorAll(".formInput");
const filterWindow = document.querySelector(".filterWindow");

searchForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.querySelector(".search-title").value.trim();
    const fwsearchInput = document
      .querySelector(".fwsearch-title")
      .value.trim();

    if (searchInput !== "") fetchMovie(searchInput);
    else if (fwsearchInput !== "") fetchMovie(fwsearchInput);

    searchInput.value = "";
    fwsearchInput.value = "";
  });
});

function displayMovies(movies) {
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
