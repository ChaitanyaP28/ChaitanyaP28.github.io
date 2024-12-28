// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get all the necessary elements for each page (using class or id)
    const hamburgers = document.querySelectorAll(".hamburger");  // All hamburger icons
    const menus = document.querySelectorAll(".menu");  // All menus
    const closeBtns = document.querySelectorAll(".close-btn");  // All close buttons
    const notifications = document.querySelectorAll(".notification");  // All notifications
    const banners = document.querySelectorAll(".banner");  // All banners/images to check for scroll
    const bannerHeights = Array.from(banners).map(banner => banner.offsetHeight);  // Heights of all banners

    // Show the notification when the page loads
    window.addEventListener("load", () => {
        notifications.forEach(notification => {
            notification.style.display = "block"; // Show the notification
        });
    });

    // Add event listener for hamburger click on each page
    hamburgers.forEach((hamburger, index) => {
        hamburger.addEventListener("click", () => {
            // Toggle the 'show' class to slide the menu in/out
            menus[index].classList.toggle("show");
            // Toggle the 'open' class to change the hamburger icon
            hamburger.classList.toggle("open");

            // Hide or show the notification depending on the menu state
            if (menus[index].classList.contains("show")) {
                notifications[index].style.display = "none"; // Hide notification when menu is open
            } else {
                notifications[index].style.display = "block"; // Show notification when menu is closed
            }
        });
    });

    // Add event listener for notification click to open the menu on each page
    notifications.forEach((notification, index) => {
        notification.addEventListener("click", () => {
            // Trigger the same action as clicking the hamburger
            menus[index].classList.add("show");
            hamburgers[index].classList.add("open");
            notification.style.display = "none"; // Hide the notification when the menu is open
        });
    });

    // Close the menu when the close button is clicked on each page
    closeBtns.forEach((closeBtn, index) => {
        closeBtn.addEventListener("click", () => {
            menus[index].classList.remove("show");
            hamburgers[index].classList.remove("open");
            notifications[index].style.display = "block"; // Show notification when menu is closed
        });
    });

    // Scroll event listener to change hamburger color after scrolling past the banner
    window.addEventListener("scroll", () => {
        banners.forEach((banner, index) => {
            if (window.scrollY > bannerHeights[index]) {
                // Add the 'scrolled' class to the hamburger when scroll position is past the banner
                hamburgers[index].classList.add("scrolled");
            } else {
                // Remove the 'scrolled' class when scrolling back up
                hamburgers[index].classList.remove("scrolled");
            }
        });
    });
});
