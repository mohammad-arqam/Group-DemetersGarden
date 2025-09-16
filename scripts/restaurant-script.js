/* Code for the 3 sections - Full Page Tabs*/

function openPage(pageName, element, colour) {
    // Initially elements using class="tabconent"
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].style.backgroundColor = "#FFFFEC";
    }
    
    // Remove background colour of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific colour to the button to open the tab content
    element.style.backgroundColor = colour;

    // Put the appropriate content on the tab section 
    if (pageName === "Menu") {
        var menuObject = document.getElementById('menuObject');
        menuObject.setAttribute('data', './menu-content/rest-menu.html');
    } else if (pageName == "Reviews") {
        var reviewsObject = document.getElementById('reviewsObject');
        reviewsObject.setAttribute('data', './reviews-content/rest-reviews.html');
    } else if (pageName == "Images") {
        var imagesObject = document.getElementById('imagesObject');
        imagesObject.setAttribute('data', './images-content/rest-images.html');
    }
}

window.onload = function() {
    document.getElementById("defaultOpen").click();
};

// This will change the information of the restaurant
const urlParams = new URLSearchParams(window.location.search);
const restaurantName = decodeURIComponent(urlParams.get('restaurant') || "RESTAURANT NAME");
const restaurantLocation = decodeURIComponent(urlParams.get('location') || "Address, Winnipeg, MB");
const restaurantPhone = decodeURIComponent(urlParams.get('phone') || "(204) phone-number");
const restaurantDistance = decodeURIComponent(urlParams.get('distance') || "0.0 km");

document.getElementById('restaurantName').textContent = restaurantName;
document.getElementById('restaurantLocation').textContent = restaurantLocation;
document.getElementById('restaurantPhone').textContent = restaurantPhone;
document.getElementById('restaurantDistance').textContent = restaurantDistance;