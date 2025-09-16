document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const availabilityDiv = document.getElementById("availability");

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  // Set the minimum date to today
  dateInput.min = minDate;

  // Disable time input until a date is selected
  function toggleTimeInput() {
    if (dateInput.value) {
      timeInput.disabled = false; // Enable time input
    } else {
      timeInput.disabled = true; // Disable time input
      timeInput.value = ""; // Clear time input
      availabilityDiv.innerHTML = ""; // Clear generated time slots
    }
  }

  // Run the function whenever the date input changes
  dateInput.addEventListener("input", toggleTimeInput);

  // Prevent interaction with time input without a date
  timeInput.addEventListener("click", (event) => {
    if (!dateInput.value) {
      alert("Please select a date first.");
      event.preventDefault();
    }
  });

  // Dynamically Generate and Handle Time Slots
  timeInput.addEventListener("input", function () {
    if (!dateInput.value) {
      alert("Please select a date first.");
      return;
    }

    const selectedTime = this.value; // Get the selected time
    availabilityDiv.innerHTML = ""; // Clear previous availability

    // Parse and round down minutes
    let [selectedHour, selectedMinute] = selectedTime.split(":").map(Number);
    selectedMinute = Math.floor(selectedMinute / 15) * 15;

    // Generate available slots (15-minute intervals)
    const slots = [];
    for (let i = 0; i < 4; i++) {
      let hour = selectedHour;
      let minute = selectedMinute + i * 15;
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }

      const period = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      const timeString = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
      slots.push(timeString);
    }

    // Create clickable time slot buttons
    slots.forEach((slot) => {
      const button = document.createElement("button");
      button.classList.add("time-slot");
      button.textContent = slot;

      // Add click event to the button
      button.addEventListener("click", () => {
        const partySize = document.getElementById("party-size").value;
        const date = dateInput.value;
        const time = slot;

        // Redirect with query parameters
        const queryParams = `?partySize=${encodeURIComponent(
          partySize
        )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
        window.location.href = `confirmReservation.html${queryParams}`;
      });

      availabilityDiv.appendChild(button);
    });
  });
});
