// Sidebar functionality
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px"; // Open the sidebar
  document.querySelector(".openbtn").style.display = "none"; // Hide the open button
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0"; // Close the sidebar
  document.querySelector(".openbtn").style.display = "block"; // Show the open button
}

// Navigate to different sections
function switchTo(c) {
  let urlNew = 'searchResults.html?callFunction=' + c;
  window.location.replace(urlNew);
}

// Collapsible sections in the sidebar
document.addEventListener("DOMContentLoaded", () => {
  const collapsibles = document.querySelectorAll(".collapsiblePanel");

  collapsibles.forEach((collapsible) => {
    collapsible.addEventListener("click", () => {
      collapsible.classList.toggle("active");

      // Toggle visibility of the content panel
      const content = collapsible.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});

// Populate reservation summary
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantName = "The Tasty Fork";
  const partySize = urlParams.get("partySize") || "N/A";
  const date = urlParams.get("date") || "N/A";
  const time = urlParams.get("time") || "N/A";


  
  document.querySelector(".reservation-summary").innerHTML = `
    <div class="section-title">Reservation Details</div>
    <p><strong>Restaurant:</strong> ${restaurantName}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Guests:</strong> ${partySize} People</p>
  `;
});

// Form validation and success popup
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-details-form");
  const cancelButton = document.getElementById("cancel-button");
  const confirmButton = document.getElementById("confirm-button");
  const popup = document.getElementById("success-popup");
  const returnHomeButton = document.getElementById("return-home");

  // Helper function to validate form fields
  function validateForm() {
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Regular expressions for validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\d{10}|\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/;

    // Validation checks
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number in one of these formats: 123-456-7890, (123) 456-7890, or 1234567890.");
      return false;
    }

    return true;
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    if (validateForm()) {
      // Show success popup
      popup.style.display = "flex";
    }
  });

  // Handle cancel button
  cancelButton.addEventListener("click", () => {
    window.history.back(); // Navigate back to the previous page
  });

  // Handle return home button in the popup
  returnHomeButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to the homepage
  });
});
