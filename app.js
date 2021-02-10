//Display cocktails
fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka`)

.then(res => res.json())
.then(data => displayCocktails(data.drinks))

const displayCocktails = drinks =>{
    drinks.forEach(drink => {
        // console.log(drink);
        const displayArea = document.getElementById('display-cocktails');
        const drinkDiv = document.createElement('div');
        const displayContent = `
        <div onclick="viewDetails(${drink.idDrink})" class="card" style="width: 18rem;">
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="drinks image cap">
            <div class="card-body">
                <h3 class="card-text text-dark">${drink.strDrink}</h3>
            </div>
        </div>  
        `

        drinkDiv.innerHTML= displayContent;
        displayArea.appendChild(drinkDiv);
    });
}

//Search Drinks
const searchDrinks = () =>{
    const searchText = document.getElementById('search-field').value;
    const url =`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.drinks))
    .catch(err => errorMsg(err))
}

//Search Result display
const searchResult = drinks =>{
    document.getElementById('display-cocktails').style.display = "none";
    document.getElementById('search-field').value = "";
    document.getElementById('drinks-detail').innerHTML = "";
    drinks.forEach(drink => {
        const displaySearch = document.getElementById('display-search');
        const drinkDiv = document.createElement('div');
        const displayDrink = `
            <div onclick="viewDetails(${drink.idDrink})" class="card" style="width: 18rem;">
                <img class="card-img-top" src="${drink.strDrinkThumb}" alt="drinks image cap">
                <div class="card-body">
                    <h3 class="card-text text-dark">${drink.strDrink}</h3>
                </div>
            </div>  
        `
        drinkDiv.innerHTML = displayDrink;
        displaySearch.appendChild(drinkDiv);
    });
}

const viewDetails = id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => ViewDrinkDetails(data.drinks[0]))

}

const ViewDrinkDetails = drink =>{
    // console.log(drink);
    const details = document.getElementById('drinks-detail');
    const detailsDiv = document.createElement('div');
    document.getElementById('drinks-detail').innerHTML = "";
    detailsDiv.innerHTML =`
        <div class="card col-md-6 mx-auto">
            <img class="card-img-top details-img" src="${drink.strDrinkThumb}" alt="drinks image cap">  
            <h2 class="card-text text-dark">${drink.strDrink}</h2>
            <h4 class="card-text text-dark">Category: <span>${drink.strCategory}</span></h4>
            <h4 class="card-text text-dark">Ingredients</span></h4>
            <ul>
                <li>${drink.strIngredient1}</li>
                <li>${drink.strIngredient2}</li>
                <li>${drink.strIngredient3}</li>
                <li>${drink.strIngredient4}</li>
                <li>${drink.strIngredient5}</li>
            </ul>
        </div>
    `
    details.appendChild(detailsDiv);
}

const errorMsg = err =>{
    const displayMsg = document.getElementById('error-msg');
    const h3 = document.createElement('h3');
    h3.className = "text-danger";
    h3.innerText = "Failed to load data. Try again later!!!";
    displayMsg.appendChild(h3);
}

