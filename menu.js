// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get the elements
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const closeBtn = document.getElementById("close-btn");

    // Add event listener for hamburger click
    hamburger.addEventListener("click", () => {
        // Toggle the 'show' class to slide the menu in/out
        menu.classList.toggle("show");
        // Toggle the 'open' class to change the hamburger icon
        hamburger.classList.toggle("open");
    });

    // Close the menu when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            menu.classList.remove("show");
            hamburger.classList.remove("open");
        });
    }
});
