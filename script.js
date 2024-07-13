document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    console.log("connexion au DOM");
  
   

  });

function openModal(film_id){
    let film_name = film_id
    console.log("Le bouton a été cliqué",film_id)
    document.getElementById("best_film").innerHTML = "Le bouton a été cliqué "+ film_id
    document.getElementById("section_best_film").innerHTML = `
            <div>
                <img src="Images/image1.png" alt="">
            </div>
            <div>
                <h2>${film_name}</h2>
                <p>
                    Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.
                </p>
                <p>
                    <button class="best_film_btn" onclick="openModal(1)">Détails</button>
                </p>
            </div>
            `
}

async function getBestFilm (){
  const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
  const result = await response.json();
  console.table(result.results)
  console.log(result.next)
}
getBestFilm()
 