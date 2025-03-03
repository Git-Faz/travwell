// Run search when the user clicks the Search button
document.getElementById("searchBtn").addEventListener("click", searchPlaces);

function searchPlaces() {
    let userInput = document.getElementById("searchBar").value.toLowerCase().trim();

    // Define category keywords
    let beachKeywords = ["beach", "beaches"];
    let templeKeywords = ["temple", "temples"];
    let countryKeywords = ["country", "countries"];

    let category = "";

    if (beachKeywords.includes(userInput)) {
        category = "beaches";
    } else if (templeKeywords.includes(userInput)) {
        category = "temples";
    } else if (countryKeywords.includes(userInput)) {
        category = "countries";
    }

    if (category) {
        fetchPlaces(category); 
    } else {
        noResults();
    }
}

// Fetch places from the JSON file
function fetchPlaces(category) {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log("Loaded data:", data);
            console.log("Category:", category);
            console.log("Data for category:", data[category]);
            
            let places = data[category] || [];
            console.log("Places:", places);
            
            places.length > 0 ? showResults(places, category) : noResults();
        })
        .catch(error => console.log("Error fetching data:", error));
}

// Show matching places
function showResults(places, category) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    if (category === "countries") {
        // If the category is countries, we need to loop through each country and its cities
        places.forEach(country => {
            let countryCard = document.createElement("div");
            countryCard.classList.add("result-card");
            countryCard.innerHTML = `<h2>${country.name}</h2>`;
            resultsDiv.appendChild(countryCard);

            // Now loop through the cities of the country
            country.cities.forEach(city => {
                let cityCard = document.createElement("div");
                cityCard.classList.add("city-card");
                cityCard.innerHTML = `
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                `;
                resultsDiv.appendChild(cityCard);
            });
        });
    } else {
        
        places.forEach(place => {
            let card = document.createElement("div");
            card.classList.add("result-card");
            card.innerHTML = `
                <img src="${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            `;
            resultsDiv.appendChild(card);
        });
    }
}

// Show "No results found"
function noResults() {
    document.getElementById("results").innerHTML =
        "<p>No results found. Try searching for 'beach', 'temple', or 'country'.</p>";
}

// Clear button function
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchBar").value = "";
}
document.getElementById("clearBtn").addEventListener("click", clearResults);