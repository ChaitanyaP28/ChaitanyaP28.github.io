// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get the elements
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const closeBtn = document.getElementById("close-btn");
    const notification = document.getElementById("notification"); // Get the notification element

    // Show the notification when the page loads
    window.addEventListener("load", () => {
        notification.style.display = "block"; // Show the notification
    });

    // Add event listener for hamburger click
    hamburger.addEventListener("click", () => {
        // Toggle the 'show' class to slide the menu in/out
        menu.classList.toggle("show");
        // Toggle the 'open' class to change the hamburger icon
        hamburger.classList.toggle("open");

        // Hide or show the notification depending on the menu state
        if (menu.classList.contains("show")) {
            notification.style.display = "none"; // Hide notification when menu is open
        } else {
            notification.style.display = "block"; // Show notification when menu is closed
        }
    });

    // Close the menu when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            menu.classList.remove("show");
            hamburger.classList.remove("open");
            notification.style.display = "block"; // Show notification when menu is closed
        });
    }
});
