document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    console.log("connexion au DOM");
});


function openModal(film_name){        
}

// I - GET
// Meilleurs films
async function getFilmByCategory(category=""){
    let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&genre="+category
    console.log(url)

    // requête pour récupérer les 5 films
    const response = await fetch(url)
    const resultat = await response.json();
    // let film_url = resultat.results[0].url;
    let first_result = resultat.results
    let next_url = resultat.next

    const response_next = await fetch(next_url)
    const resultat_next = await response_next.json();

    let second_result = resultat_next.results
    let all_result = first_result.concat(second_result)

    return all_result 
}


async function getAllCategory(){
    let url = "http://localhost:8000/api/v1/genres/"
    let all_category = []
    do{
        const response = await fetch(url)
        const resultat = await response.json();
        
        all_category = all_category.concat(resultat.results)
        url = resultat.next

    }while(url != null)
console.log(all_category)
}

getAllCategory()


// II - DISPLAY
// Meilleur Film
async function filmDetail(film_url){
    const response = await fetch(film_url)
    const resultat = await response.json();
    //return resultat.results[0];
    return resultat
}


async function getBestFilm (){
    const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes')
    const resultat = await response.json();
    let film_url = resultat.results[0].url;
    return filmDetail(film_url)
}


async function displayBestFilm(){
    let best_film = await getBestFilm()
    console.log(best_film)
    let section_best_film_element = document.getElementById("section_best_film");
    console.log(section_best_film_element);
    section_best_film_element.innerHTML =`<div>
                <img src="${best_film.image_url}" alt="">
            </div>
            <div>
                <h2>${best_film.title}</h2>
                <p>
                ${best_film.description}
                </p>
                <p>
                    <button class="best_film_btn" onclick="openModal(1)">Détails</button>
                </p>
            </div>`

}


//Meilleurs films
async function displayAllBestFilm(){
    let all_best_film = await getFilmByCategory("")
    let best_film = document.getElementById("best_films")
    best_film.innerHTML = ""
    all_best_film = all_best_film.slice(1,7)
    all_best_film.forEach(film => {
        best_film.innerHTML += `
        <div class="film">
                <img src="${film.image_url}" alt="">
                <div class="film_title">
                    <p>${film.title}</p>
                    <button onclick="openModal('titanic')">Détails</button>
                </div>
            </div>
        `  
    });
}


// catégorie 1 et 2 :
async function displayCategoryFilm(category_name, category_id){
    let all_category_film = await getFilmByCategory(category_name)
    let section_category = document.getElementById(category_id)
    section_category.innerHTML = ""
    all_category_film = all_category_film.slice(0,6)
    all_category_film.forEach(film => {
        section_category.innerHTML += `
        <div class="film">
                <img src="${film.image_url}" alt="">
                <div class="film_title">
                    <p>${film.title}</p>
                    <button onclick="openModal('titanic')">Détails</button>
                </div>
            </div>
        `  
    });
}


// categorie libre :
async function displayOtherCategory(){
    let selector = document.getElementById("selector")
    let category_choice = selector.value
    console.log(category_choice)
    if(category_choice != ""){
        displayCategoryFilm(category_choice, "other_category") 
    }else{
        document.getElementById("other_category").innerHTML = ""

    }
 }




displayBestFilm()
displayAllBestFilm()
displayCategoryFilm("Drama","drama")
displayCategoryFilm("Biography","biography")




