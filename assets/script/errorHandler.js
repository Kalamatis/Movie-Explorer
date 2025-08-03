import { displayMovies } from "./filterWindow.js";

export function imdbErrorHandler(data) {
  const errorCode = data.Error;
  const fmContainer = document.querySelector("#fwbody");

  fmContainer.innerHTML = ``;

  if (
    errorCode === "Movie not found!" ||
    errorCode === "Incorrect IMDb ID." ||
    errorCode === "Series not found!"
  ) {
    fmContainer.innerHTML = `No movie found.`;
  } else if (errorCode === "Request limit reached!") {
    fmContainer.innerHTML = `Limit reached.`;
  } else if (errorCode === "Too many results.") {
    fmContainer.innerHTML = `Be more specific.
`;
  } else if (
    errorCode === "Something went wrong." ||
    errorCode === "Parameter apikey is invalid." ||
    errorCode === "Invalid API key!" ||
    errorCode === "Type parameter is invalid."
  ) {
    fmContainer.innerHTML = `Something went wrong.
`;
  } else displayMovies(data);
}

export function showMovieErrorHandler(data) {
  if (data.Error === "Incorrect IMDb ID.") {
  }
}
