import { loadMovies } from "./filterWindow.js";
//List of Recommendable movies
const recommended = [
  { imdbid: "tt7335184", title: "You" },
  { imdbid: "tt34490115", title: "Hidden Face" },
  { title: "The Shawshank Redemption", imdbID: "tt0111161" },
  { title: "The Godfather", imdbID: "tt0068646" },
  { title: "The Dark Knight", imdbID: "tt0468569" },
  { title: "Pulp Fiction", imdbID: "tt0110912" },
  { title: "Inception", imdbID: "tt1375666" },
  { title: "Fight Club", imdbID: "tt0137523" },
  { title: "Forrest Gump", imdbID: "tt0109830" },
  { title: "The Matrix", imdbID: "tt0133093" },
  {
    title: "The Lord of the Rings: The Return of the King",
    imdbID: "tt0167260",
  },
  { title: "The Empire Strikes Back", imdbID: "tt0080684" },
  { title: "The Social Network", imdbID: "tt1285016" },
  { title: "Avengers: Endgame", imdbID: "tt4154796" },
  { title: "Interstellar", imdbID: "tt0816692" },
  { title: "Whiplash", imdbID: "tt2582802" },
  { title: "Parasite", imdbID: "tt6751668" },
  { title: "Joker", imdbID: "tt7286456" },
  { title: "Gladiator", imdbID: "tt0172495" },
  { title: "Coco", imdbID: "tt2380307" },
  { title: "La La Land", imdbID: "tt3783958" },
  { title: "The Prestige", imdbID: "tt0482571" },
];

// import { fetchMovie } from "./filterWindow.js";
let randomMovies = [];
const recoQty = 3; //How many Recommended movies to take
const SMContainer = document.querySelector("#smParentContainer");

function randomIndex(max) {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

//Generates 3 unique random movies and adds it into 'randomMovies' array
function recoGenerator() {
  let rindArray = new Set();
  const recohtml = document.querySelector(".Recommendations");

  while (rindArray.size < recoQty) {
    let rind = randomIndex(recommended.length - 1);
    rindArray.add(rind);
  }

  //Makes the list of recommendation with event listener
  //that sends 'imdbid' to the 'FetchMovie' function
  rindArray.forEach((randomIndex) => {
    const movie = recommended[randomIndex];
    const li = document.createElement("li");
    li.className = "recoTitles";
    li.textContent = movie.title;

    li.addEventListener("click", () => {
      loadMovies(movie.imdbid || movie.imdbID, "");
    });

    recohtml.appendChild(li);
  });
}

export function showMovie(data) {
  SMContainer.style.display = "flex";
  document.getElementById("smimg").src =
    data.Poster || "/Movie Explorer/assets/icons/no-image.png";
  SMContainer.querySelector("h2").textContent = data.Title;
  SMContainer.querySelector(".meta").textContent =
    data.Genre + " · " + data.Runtime;
  SMContainer.querySelector(".plot").textContent = data.Plot;

  SMContainer.querySelector(".details").innerHTML = `
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Writers:</strong> ${data.Writer}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Release Date:</strong> ${data.Released}</p>
      <p><strong>Language:</strong> ${data.Language}</p>
      <p><strong>Rating:</strong> ${data.imdbRating}  · <strong>Votes:</strong> ${data.imdbVotes}</p>
  `;
}
document.querySelector("#smbbuton").addEventListener("click", () => {
  SMContainer.style.display = "none";
});
recoGenerator();
/*  */
