import { imdbErrorHandler } from "./errorHandler.js";
import { loadingScreen } from "./filterWindow.js";
import { showMovie } from "./main.js";

export async function fetchMovie(input, type) {
  let isID = isIDmethod(input);
  const apiKey = "3559942e";

  try {
    let response;
    if (isID) {
      response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${input}&type=${type}`
      );
      console.log("id");
    } else {
      response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${input}&type=${type}`
      );
      console.log("not id");
    }

    const data = await response.json();
    console.log(data);
    if (data.Actors) showMovie(data);
    else {
      loadingScreen();
      imdbErrorHandler(data);
    }
  } catch (error) {
    console.log(error);
  }
}

//This will verify if the input is ID,
//if the input starts with 'tt' and the rest is number, it returns true
function isIDmethod(input) {
  console.log(input);
  const id =
    input.slice(0, 2) === "tt" && !isNaN(Number(input.slice(2))) ? true : false;

  return id;
}
