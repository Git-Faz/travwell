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
            console.log("First place:", places[0]);
            
            places.length > 0 ? showResults(places) : noResults();
        })
        .catch(error => console.log("Error fetching data:", error));
}

// Show matching places
function showResults(places) {
    let resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = ""; 

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
