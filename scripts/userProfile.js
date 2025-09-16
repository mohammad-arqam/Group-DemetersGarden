let reservations = [
    { id: 1, resturant: "The Tasty Fork", NumPeople: 4, date: "2024-11-20", time: "4:00 pm" },
    { id: 2, resturant: "Bella Cucina", NumPeople: 2, date: "2024-12-01", time: "5:00 pm" },
    { id: 3, resturant: "Velvet Bistro", NumPeople: 1, date: "2024-12-15", time: "10:30 am" }
];

let reviews = [
    { restaurant: "Salt and Sage", rating: 4, review: "Great food, will visit again!", date: "2024-11-05" },
    { restaurant: "Saffron & Stone", rating: 5, review: "Excellent service and ambiance.", date: "2024-10-20" },
    { restaurant: "The Garden Grille", rating: 3, review: "Average experience, could be better.", date: "2024-09-15" }
];

document.addEventListener("DOMContentLoaded", () => {
    updateReservationList();
    updateReviewList();

    // Event listeners for account buttons
    document.getElementById("modify-account-details").addEventListener("click", showAccountUpdateModal);
    document.getElementById("sign-out-button").addEventListener("click", signOut);
    document.getElementById("delete-account-button").addEventListener("click", confirmDeleteAccount);
});

function signOut() {
    alert("You have signed out.");
    // Optionally, redirect to a login page or reset user session
}

function confirmDeleteAccount() {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (confirmed) {
        alert("Your account has been deleted.");
        // Add logic for account deletion (e.g., clear user data)
    }
}

function updateReservationList() {
    const reservationTable = document.querySelector("#reservation-table tbody");
    reservationTable.innerHTML = "";

    reservations.forEach(reservation => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${reservation.id}</td>
          <td>${reservation.date}</td>
          <td>${reservation.time}</td>
          <td>${reservation.resturant}</td>
          <td>${reservation.NumPeople}</td>
          <td>
            <button onclick="showModifyReservation(${reservation.id})" class="action-button">Modify</button>
            <button class="cancel-button" onclick="cancelReservation(${reservation.id})">Cancel</button>
          </td>
        `;
        reservationTable.appendChild(row);
    });
}

function showModifyReservation(reservationId) {
    // Find the reservation from the list using reservationId
    const reservation = reservations.find(res => res.id === reservationId);

    // Create a modal with a date picker and time selector
    const existingModal = document.querySelector(".modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-content">
        <h3>Modify Reservation</h3>
        <form id="modify-reservation-form">
          <label for="modify-date">Date:</label>
          <input type="text" id="modify-date" placeholder="Select a date" value="${reservation.date}">
          
          <label for="modify-time">Time:</label>
          <input type="time" id="modify-time" value="${reservation.time}">
          
          <label for="modify-num-people">Number of People:</label>
          <input type="number" id="modify-num-people" value="${reservation.NumPeople}" min="1" max="10">
          
          <div class="modal-actions">
            <button type="button" id="save-modified-reservation" class="action-button">Save</button>
            <button type="button" id="cancel-modify" class="action-button cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialize flatpickr on the date input field
    flatpickr("#modify-date", {
        dateFormat: "Y-m-d", // Format to match the reservation date format
    });

    // Add event listeners for the buttons
    document.getElementById("save-modified-reservation").addEventListener("click", () => saveModifiedReservation(reservationId));
    document.getElementById("cancel-modify").addEventListener("click", () => modal.remove());
}


function cancelReservation(reservationId) {
    const reservationIndex = reservations.findIndex(reservation => reservation.id === reservationId);
    if (reservationIndex > -1) {
        reservations.splice(reservationIndex, 1); // Remove reservation from list
        updateReservationList(); // Update the table after cancelation
        alert(`Reservation ${reservationId} has been cancelled.`);
    }
}

function updateReviewList() {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    const greenContainer = document.createElement("div");
    greenContainer.classList.add("green-container");

    reviews.forEach(review => {
        const reviewContainer = document.createElement("div");
        reviewContainer.classList.add("review-container");

        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        reviewContainer.innerHTML = `
          <div class="review-header">
            <strong>${review.restaurant}</strong>
            <span class="star-rating">${stars}</span>
          </div>
          <p class="review-text">${review.review}</p>
          <p class="review-date"><em>Review Date: ${review.date}</em></p>
        `;

        greenContainer.appendChild(reviewContainer);
    });

    reviewList.appendChild(greenContainer);
}




function showAccountUpdateModal() {
    const existingModal = document.querySelector(".modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-content">
        <h3>Update Account Details</h3>
        <form id="update-account-form">
          <label for="update-name">Name:</label>
          <input type="text" id="update-name" placeholder="Enter new name">
          
          <label for="update-email">Email:</label>
          <input type="email" id="update-email" placeholder="Enter new email">

          <label for="update-phone">Phone:</label>
          <input type="tel" id="update-phone" placeholder="Enter new phone">

          <label for="update-dob">Date of Birth:</label>
          <input type="date" id="update-dob">

          <label for="update-address">Address:</label>
          <input type="text" id="update-address" placeholder="Enter new address">

          <div class="modal-actions">
            <button type="button" id="save-account-details" class="action-button">Save</button>
            <button type="button" id="cancel-account-update" class="action-button danger">Cancel</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("save-account-details").addEventListener("click", saveAccountDetails);
    document.getElementById("cancel-account-update").addEventListener("click", () => modal.remove());
}

function saveAccountDetails() {
    const updatedName = document.getElementById("update-name").value;
    const updatedEmail = document.getElementById("update-email").value;
    const updatedPhone = document.getElementById("update-phone").value;
    const updatedDOB = document.getElementById("update-dob").value;
    const updatedAddress = document.getElementById("update-address").value;

    const userDetails = document.querySelector(".user-details");
    if (updatedName) userDetails.querySelector("p:nth-child(1)").innerHTML = `<strong>Name:</strong> ${updatedName}`;
    if (updatedEmail) userDetails.querySelector("p:nth-child(2)").innerHTML = `<strong>Email:</strong> ${updatedEmail}`;
    if (updatedPhone) userDetails.querySelector("p:nth-child(3)").innerHTML = `<strong>Phone:</strong> ${updatedPhone}`;
    if (updatedDOB) userDetails.querySelector("p:nth-child(4)").innerHTML = `<strong>Date of Birth:</strong> ${updatedDOB}`;
    if (updatedAddress) userDetails.querySelector("p:nth-child(5)").innerHTML = `<strong>Address:</strong> ${updatedAddress}`;

    alert("Account details updated successfully!");
    document.querySelector(".modal").remove();
}

function switchTo(c){
    let urlNew = 'searchResults.html?callFunction=' + c;
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
  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px"; // Open the sidebar
    document.querySelector(".openbtn").style.display = "none"; // Hide the open button
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0"; // Close the sidebar
    document.querySelector(".openbtn").style.display = "block"; // Show the open button
  }
  
document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsiblePanel");
  
    collapsibles.forEach((collapsible) => {
      collapsible.addEventListener("click", () => {
        collapsible.classList.toggle("active");
  
        // Toggle visibility of the content panel
        const content = collapsible.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    });
  });
  
  function editReview(index) {
    const review = reviews[index];
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <h3>Edit Review</h3>
            <form id="edit-review-form">
                <label for="edit-rating">Rating (1-5):</label>
                <input type="number" id="edit-rating" min="1" max="5" value="${review.rating}">
                
                <label for="edit-review">Review:</label>
                <textarea id="edit-review">${review.review}</textarea>

                <div class="modal-actions">
                    <button type="button" id="save-review" class="action-button">Save</button>
                    <button type="button" id="cancel-edit" class="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("save-review").addEventListener("click", () => {
        reviews[index].rating = parseInt(document.getElementById("edit-rating").value);
        reviews[index].review = document.getElementById("edit-review").value;
        modal.remove();
        updateReviewList();
    });

    document.getElementById("cancel-edit").addEventListener("click", () => modal.remove());
}

function deleteReview(index) {
    reviews.splice(index, 1);
    updateReviewList();
}

function saveModifiedReservation(reservationId) {
  const reservation = reservations.find(res => res.id === reservationId);
  reservation.date = document.getElementById("modify-date").value;
  reservation.time = document.getElementById("modify-time").value;
  reservation.NumPeople = parseInt(document.getElementById("modify-num-people").value);

  document.querySelector(".modal").remove();
  updateReservationList();
}

function uploadProfilePicture() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              document.getElementById("profile-picture").src = reader.result;
          };
          reader.readAsDataURL(file);
      }
  });

  input.click();
}

function searchReservations() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const filteredReservations = reservations.filter(reservation => 
      reservation.resturant.toLowerCase().includes(searchTerm) || 
      reservation.date.includes(searchTerm)
  );

  const reservationTable = document.querySelector("#reservation-table tbody");
  reservationTable.innerHTML = "";

  filteredReservations.forEach(reservation => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${reservation.id}</td>
          <td>${reservation.date}</td>
          <td>${reservation.time}</td>
          <td>${reservation.resturant}</td>
          <td>${reservation.NumPeople}</td>
          <td>
              <button onclick="showModifyReservation(${reservation.id})" class="action-button">Modify</button>
              <button class="cancel-button" onclick="cancelReservation(${reservation.id})">Cancel</button>
          </td>
      `;
      reservationTable.appendChild(row);
  });
}
