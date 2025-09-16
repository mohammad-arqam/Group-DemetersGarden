// this is for the side bar but not working yet

function openNav() {
    document.getElementById("mySidepanel").style.width = "250px"; // Open sidebar to 250px
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0"; // Close sidebar
}

// Toggle collapsible sections
const collapsibleButtons = document.querySelectorAll(".collapsiblePanel");
collapsibleButtons.forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});


// this is for choosing star 
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('active'));
            star.classList.add('active');
            selectedRating = star.dataset.value;
            console.log(`Rating selected: ${selectedRating}`);
        });
    });

     // Cancel button functionality
     document.getElementById('cancel-review').addEventListener('click', () => {
        window.location.href = 'restaurant.html'; // Redirect to index.html
    });

    document.getElementById('submit-review').addEventListener('click', () => {
        window.location.href = '404.html'; // Redirect to error page as this isn't fully functional yet
    });
});
