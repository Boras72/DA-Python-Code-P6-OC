document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    console.log("connexion au DOM");
});


// I - FONCTIONS GET

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


// Meilleurs films par catégorie
async function getFilmByCategory(category=""){
    let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes&genre="+category
    console.log(url)

    let all_result = []
    // requête pour récupérer les 6 films (5+1)
    const response = await fetch(url)
    const resultat = await response.json();
    // let film_url = resultat.results[0].url;
    all_result  = resultat.results
    let next_url = resultat.next

    if(next_url != null){
        const response_next = await fetch(next_url)
        const resultat_next = await response_next.json();

        let second_result = resultat_next.results
        all_result = all_result.concat(second_result)

    }
    return all_result 
}


// Meilleurs films toutes catégories confondues
async function getAllCategory(){
    let url = "http://localhost:8000/api/v1/genres/"
    let all_category = []
    do{
        const response = await fetch(url)
        const resultat = await response.json();
        
        all_category = all_category.concat(resultat.results)
        url = resultat.next

    }while(url != null)
    return all_category
}




// II - FONCTIONS DISPLAY

// Meilleur film
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
                    <button class="best_film_btn" onclick="openModal('${best_film.url}')">Détails</button>
                </p>
            </div>`

}


// Meilleurs films
async function displayAllBestFilm(){
    let all_best_film = await getFilmByCategory("")
    let best_film = document.getElementById("best_films")
    
    best_film.innerHTML = ""
    all_best_film = all_best_film.slice(1,7)
    all_best_film.forEach(film => {
        best_film.innerHTML += `
        <div class="film best_film" >
                <img src="${film.image_url}" alt="">
                <div class="film_title">
                    <p>${film.title}</p>
                    <button onclick="openModal('${film.url}')">Détails</button>
                </div>
            </div>
        `  
    });
    ajustScreenFilm('best_film')
    
}


// catégorie 1 et 2 :
async function displayCategoryFilm(category_name, category_id){
    let all_category_film = await getFilmByCategory(category_name)
    let section_category = document.getElementById(category_id)
    section_category.innerHTML = ""
    all_category_film = all_category_film.slice(0,6)
    all_category_film.forEach(film => {
        section_category.innerHTML += `
        <div class="film ${category_name}">
                <img src="${film.image_url}" alt="">
                <div class="film_title">
                    <p>${film.title}</p>
                    <button onclick="openModal('${film.url}')">Détails</button>
                </div>
            </div>
        `  
    });
    section_category.insertAdjacentHTML("afterend", `<button class="modal_btn voir_plus" onclick="voirPlus('${category_name}')">Voir plus</button>`)
    ajustScreenFilm(category_name)
}


// categorie libre avec menu déroulant :
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

async function displaySelectCategory(){   //afficher la liste des options
    let selector = document.getElementById("selector")
    let all_category = await getAllCategory()
    selector.innerHTML = `<option value="">Choisissez une catégorie</option>`
    all_category.forEach(category => {
        selector.innerHTML += `<option value="${category.name}">${category.name}</option>`
    })

}


async function displayModal(film_url){
    film = await filmDetail(film_url)
    console.log(film)
    let section_modal = document.getElementById("section_modal")
    section_modal.innerHTML = `
        <div class="modal">
            <div class="film_modal">
                <div>
                    <h2><b>${film.title}</b></h2>
                    <p><b>${film.year} - ${film.genres} </b></p>
                    <p><b>Rated : ${film.rated} - ${film.duration} minutes (${film.countries})</b></p>
                    <p><b>IMDB score: ${film.imdb_score}/10 </b></p>
                    
                    <p>
                        <b>Réalisé par:</b> <br>
                        ${film.directors}
                    </p>
                
                </div>
                <div class="modal_img_desktop">
                    <img src="${film.image_url}" alt="">
                </div>
            </div>
            
            <div>
                
                <p>
                    ${film.long_description}
                </p>
                <p class="modal_img_mobile">
                    <img src="${film.image_url}" alt="">
                </p>
                <p>
                    <b>Avec:</b><br>
                    ${film.actors}
                </p>
                <button class="modal_btn" onclick="closeModal()">Fermer</button>
            </div>
        </div>
    `
    
    
}


function voirPlus(class_name){
    let films = document.getElementsByClassName(class_name)
    for (let i = 0; i < films.length; i++) {
        films[i].classList.remove('hidden_film');
    }

}

function ajustScreenFilm(class_name){
    const screen_width = window.innerWidth
    console.log(screen_width)
    let films = document.getElementsByClassName(class_name)
    if (screen_width < 600){
        for (let i = 0; i < films.length; i++) {
            if ( i>1 ) {
                films[i].classList.add('hidden_film');
            }  
        }
    }
    else if (screen_width < 1025){
        for (let i = 0; i < films.length; i++) {
            if ( i>3 ) {
                films[i].classList.add('hidden_film');
            }  
        }
    }
}


// MODAL

async function openModal(film_url){   
    let section_modal = document.getElementById("section_modal")
    await displayModal(film_url)
    section_modal.classList.add("open_modal")
    
}
function closeModal(){
    let section_modal = document.getElementById("section_modal")
    section_modal.classList.remove("open_modal")
}



// APPELS DE FONCTIONS

displaySelectCategory()
displayBestFilm()
displayAllBestFilm()
displayCategoryFilm("Drama","drama")
displayCategoryFilm("Biography","biography")




