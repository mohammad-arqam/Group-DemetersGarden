var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
this.classList.toggle("active");
var content = this.nextElementSibling;
if (content.style.display === "block") {
  content.style.display = "none";
} else {
  content.style.display = "block";
}
});
}

var collPan = document.getElementsByClassName("collapsiblePanel");
var i;
for (i = 0; i < collPan.length; i++) {
collPan[i].addEventListener("click", function() {
this.classList.toggle("active");
var contentPan = this.nextElementSibling;
if (contentPan.style.display === "block") {
  contentPan.style.display = "none";
} else {
  contentPan.style.display = "block";
}
});
}

var slider1 = document.getElementById("slider1");
var output1 = document.getElementById("slider1Val");

output1.innerHTML = slider1.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  output1.innerHTML = this.value;
  baseCase(slider1.value, slider2.value, slider3.value);
}

var slider2 = document.getElementById("slider2");
var output2 = document.getElementById("slider2Val");

output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  output2.innerHTML = this.value;
  baseCase(slider1.value, slider2.value, slider3.value);
}

var slider3 = document.getElementById("slider3");
var output3 = document.getElementById("slider3Val");

output1.innerHTML = slider3.value; // Display the default slider value

slider3.oninput = function() {
  output3.innerHTML = this.value;
  baseCase(slider1.value, slider2.value, slider3.value);
}

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

/* Code for filtering restaurant entries */
var printFilters = document.getElementById("printedFilters");
var printAmt = document.getElementById("printAmt");
var filterList = [];
var storeFilterID = [];
var restaurantList = [];
var finalList = [];
var allergies = ['peanuts','fish','egg','dairy','shellfish','wheat','soy','sesame','treeNut'];

baseCase(slider1.value, slider2.value, slider3.value);

//making a new base case resets everything
function baseCase(minPrice, maxPrice, minRating){
  var i, x, arr1, avgCost, avgRating;
  restaurantList = [];
  x = document.getElementsByClassName("column");
  addToFilters('priceRange');
  addToFilters('rating');
  for(i = 0; i<x.length;i++){
    hideRestaurant(x[i], "show");
    arr1 = x[i].className.split(" ");
    avgCost = Number(arr1[1]);
    avgRating = Number(arr1[2]);
    if(minRating == 1) minRating = 1.1;
    if(avgCost >= minPrice && avgCost <= maxPrice && avgRating >= (minRating - 0.1)){
      restaurantList[restaurantList.length] = x[i];
      showRestaurant(x[i], "show");
    }
  }
  if(storeFilterID.length != 0) applyFilter("");
  printFilters.innerHTML = filterList.join(", ");
}

function applyFilter(c){
  var x, i, j;
  finalList = [];
    if(c != ""){
      var idx = storeFilterID.indexOf(c);
      if(idx > -1){
        storeFilterID.splice(idx, 1);
        filterList.splice(idx+2,1);
      }
      else{
        storeFilterID[storeFilterID.length] = c;
        addToFilters(c);
      }
    }
    for(i = 0; i < restaurantList.length; i++){
      hideRestaurant(restaurantList[i], "show");
      if(storeFilterID.length == 0) showRestaurant(restaurantList[i], "show");
      else checkRestaurant(restaurantList[i]);
    }
    printFilters.innerHTML = filterList.join(", ");
  }

function checkRestaurant(restaurant){ 
  var i, j, arr1, allergyCheck;
  allergyCheck = false;
  var moddedFilter = [];
  arr1 = restaurant.className.split(" ");
  for (i = 0; i<storeFilterID.length; i++){
    if(allergies.indexOf(storeFilterID[i]) > -1 && arr1.indexOf(storeFilterID[i]) > -1){
      allergyCheck = true;
    }
    if(allergies.indexOf(storeFilterID[i]) == -1) moddedFilter[moddedFilter.length] = storeFilterID[i];
  }
  if(allergyCheck == false){
      if(moddedFilter.length == 0) showRestaurant(restaurant, "show");
      else{
        for (j = 0; j<moddedFilter.length; j++){
          if(arr1.indexOf(moddedFilter[j]) > -1) showRestaurant(restaurant, "show");
        }
      }
    }
}

function hideRestaurant(element, name){
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

function showRestaurant(element, name){
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function addToFilters(c){
  if(c == "") var x = 0;
  else if(c == 'priceRange') filterList[0] = "Price Range: " + slider1.value + " - " + slider2.value;
  else if(c == 'rating') filterList[1] = "Minimum rating: " + slider3.value + " stars";
  else if(c == 'peanuts') filterList[filterList.length] = "Peanut Allergy";
  else if(c == 'fish') filterList[filterList.length] = "Fish Allergy";
  else if(c == 'egg') filterList[filterList.length] = "Egg Allergy";
  else if(c == 'dairy') filterList[filterList.length] = "Milk and Dairy Allergy";
  else if(c == 'shellfish') filterList[filterList.length] = "Shellfish Allergy";
  else if(c == 'wheat') filterList[filterList.length] = "Wheat Allergy";
  else if(c == 'soy') filterList[filterList.length] = "Soy Allergy";
  else if(c == 'sesame') filterList[filterList.length] = "Sesame Allergy";
  else if(c == 'treeNut') filterList[filterList.length] = "Tree Nut Allergy";
  else if(c == 'indian') filterList[filterList.length] = "Indian";
  else if(c == 'midEastern') filterList[filterList.length] = "Middle-Eastern";
  else if(c == 'mediterr') filterList[filterList.length] = "Mediterranean";
  else if(c == 'carri') filterList[filterList.length] = "Carribean";
  else if(c == 'wAfrican') filterList[filterList.length] = "West African";
  else if(c == 'eAfrican') filterList[filterList.length] = "East African";
  else if(c == 'cAsian') filterList[filterList.length] = "Central Asian";
  else if(c == 'eAsian') filterList[filterList.length] = "East Asian";
  else if(c == 'seAsian') filterList[filterList.length] = "South East Asian";
  else if(c == 'eEuro') filterList[filterList.length] = "Eastern European";
  else if(c == 'wEuro') filterList[filterList.length] = "Western European";
  else if(c == 'bbq') filterList[filterList.length] = "BBQ and Steakhouse";
  else if(c == 'cajun') filterList[filterList.length] = "Cajun";
  else if(c == 'latinAm') filterList[filterList.length] = "Latin American";
  else if(c == 'breakfast') filterList[filterList.length] = "Breakfast";
  else if(c == 'brunch') filterList[filterList.length] = "Brunch";
  else if(c == 'lunch') filterList[filterList.length] = "Lunch";
  else if(c == 'dinner') filterList[filterList.length] = "Dinner";
  else if(c == 'fineDine') filterList[filterList.length] = "Fine Dining";
  else if(c == 'fastFood') filterList[filterList.length] = "Fast Food";
  else if(c == 'vegetarian') filterList[filterList.length] = "Vegetarian";
  else if(c == 'vegan') filterList[filterList.length] = "Vegan";
  else if(c == 'halal') filterList[filterList.length] = "Halal";
  else if(c == 'fishMeat') filterList[filterList.length] = "Pescatarian";
  else if(c == 'gluten') filterList[filterList.length] = "Gluten-Free";
  else if(c == 'keto') filterList[filterList.length] = "Keto-Friendly";
}

//This is for the url linking on the sidebar
function switchTo(c){
  let urlNew = 'searchResults.html?callFunction=' + c;
  window.location.replace(urlNew);
}

function switchToPage(c){
  let urlNew = 'restaurant.html?restaurant=' + c;
  window.location.replace(urlNew);
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'breakfast'){
  applyFilter('breakfast');
  var sidepanelFilter = document.getElementById('breakfast');
  sidepanelFilter.checked = true;
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'brunch'){
  applyFilter('brunch');
  var sidepanelFilter = document.getElementById('brunch');
  sidepanelFilter.checked = true;
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'lunch'){
  applyFilter('lunch');
  var sidepanelFilter = document.getElementById('lunch');
  sidepanelFilter.checked = true;
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'dinner'){
  applyFilter('dinner');
  var sidepanelFilter = document.getElementById('dinner');
  sidepanelFilter.checked = true;
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'fineDine'){
  applyFilter('fineDine');
  var sidepanelFilter = document.getElementById('fineDine');
  sidepanelFilter.checked = true;
}

if (new URLSearchParams(window.location.search).get('callFunction') === 'fastFood'){
  applyFilter('fastFood');
  var sidepanelFilter = document.getElementById('fastFood');
  sidepanelFilter.checked = true;
}