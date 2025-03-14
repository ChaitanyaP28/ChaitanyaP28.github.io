document.addEventListener("DOMContentLoaded", () => {
    // Fetch and load the menu HTML
    const menuPlaceholder = document.getElementById("menu-placeholder");

    fetch("menu.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load menu: ${response.statusText}`);
            }
            return response.text();
        })
        .then((menuHtml) => {
            // Insert the menu HTML into the placeholder
            menuPlaceholder.innerHTML = menuHtml;

            // Get all the necessary elements for each page (using class or id)
            const hamburgers = document.querySelectorAll(".hamburger");  // All hamburger icons
            const menus = document.querySelectorAll(".menu");  // All menus
            const closeBtns = document.querySelectorAll(".close-btn");  // All close buttons
            const notifications = document.querySelectorAll(".notification");  // All notifications
            const banners = document.querySelectorAll(".banner");  // All banners/images to check for scroll
            const bannerHeights = Array.from(banners).map(banner => banner.offsetHeight);  // Heights of all banners

            // Dark Mode Toggle Functionality
            const darkModeButton = document.getElementById("darkModeButton");
            const body = document.body;

            // Check for dark mode in localStorage on page load
            if (localStorage.getItem("darkMode") === "true") {
                body.classList.add("dark-mode");
            }

            // Toggle dark mode
            darkModeButton.addEventListener("click", () => {
                body.classList.toggle("dark-mode");

                // Save the dark mode state to localStorage
                if (body.classList.contains("dark-mode")) {
                    localStorage.setItem("darkMode", "true");
                } else {
                    localStorage.setItem("darkMode", "false");
                }
            });

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
        })
        .catch((error) => console.error("Error loading menu:", error));
});

/*----- Events -----*/
async function fetchSheetData() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1OFFfj_q58ERHS-C4vS7PJnaNacFTc7W2gZyRmjr77sA/gviz/tq?tqx=out:csv&gid=723501588";

    // Show loading spinner while fetching data
    document.getElementById("loading-spinner").style.display = 'block';
    document.getElementById("sheetData").style.display = 'none';

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();

        // Parse CSV data
        const parsedData = Papa.parse(data, {
            skipEmptyLines: true,
            dynamicTyping: true,
            header: false,
            quotes: true
        });

        let output = "<ul>"; // Start unordered list

        parsedData.data.slice(1).forEach(row => {
            const eventName = row[0]?.trim() || "Unnamed Event"; // Column A: Event name
            const description = (row[1] || "No description available").replace(/\n/g, "<br>"); // Column B: Description (Handle newlines)

            // Check if row contains a category heading
            if (["Workshops & I/O Courses:", "Capture the Flag (CTF):", "Hackathons Participated:"].includes(eventName)) {
                output += `</ul><h1 class="event-heading">${eventName}</h1><ul>`; // Close previous list and start a new section
            } else {
                output += `
                    <li class="event-item" onclick="toggleDescription(this)">
                        ${eventName}
                        <i class="fas fa-chevron-right toggle-arrow"></i>
                    </li>
                    <div class="event-description">${description}</div>
                `;
            }
        });

        output += "</ul>"; // Close the last unordered list

        // Hide loading spinner and display the sheet data
        document.getElementById("loading-spinner").style.display = 'none';
        document.getElementById("sheetData").style.display = 'block';
        document.getElementById("sheetData").innerHTML = output;

    } catch (error) {
        document.getElementById("loading-spinner").style.display = 'none';
        document.getElementById("sheetData").innerHTML = "Failed to load data. Please try again later.";
        console.error("There was an error fetching the sheet data:", error);
    }
}

// Function to toggle event descriptions
function toggleDescription(element) {
    const description = element.nextElementSibling;
    if (description.style.display === "block") {
        description.style.display = "none";
        element.querySelector(".toggle-arrow").classList.remove("fa-chevron-down");
        element.querySelector(".toggle-arrow").classList.add("fa-chevron-right");
    } else {
        description.style.display = "block";
        element.querySelector(".toggle-arrow").classList.remove("fa-chevron-right");
        element.querySelector(".toggle-arrow").classList.add("fa-chevron-down");
    }
}

// Call function to load data
fetchSheetData();

/*
OLD FUNCTION
async function fetchSheetData() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1OFFfj_q58ERHS-C4vS7PJnaNacFTc7W2gZyRmjr77sA/gviz/tq?tqx=out:csv&gid=723501588";
    
    // Show loading spinner while fetching data
    document.getElementById("loading-spinner").style.display = 'block';
    document.getElementById("sheetData").style.display = 'none';

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        
        // Use PapaParse to parse the CSV data
        const parsedData = Papa.parse(data, {
            skipEmptyLines: true,  // Skip empty rows
            dynamicTyping: true,    // Automatically detect data types
            header: false           // Don't treat the first row as a header
});

let output = "";

parsedData.data.slice(1).forEach(row => {
    // Use only the first column (A column) for the event name
    const displayText = row[0];  // Only the name from column A
    const description = row[1] || 'No description available';  // Description is in the B column (row[1])

    // Only add bullet point to the content inside (not headings)
    if (row[0] === "Workshops & I/O Courses:" || row[0] === "Capture the Flag (CTF):" || row[0] === "Hackathons Participated:") {
        output += `<h1 class="event-heading">
                      ${displayText}
                   </h1>`;
    } else {
        output += `<ul>
                      <li class="event-item" onclick="toggleDescription(this)">
                          ${displayText}
                          <i class="fas fa-chevron-right toggle-arrow"></i>
                      </li>
                      <div class="event-description">${description}</div>
                   </ul>`;
    }
});

// Hide loading spinner and display the sheet data
document.getElementById("loading-spinner").style.display = 'none';
document.getElementById("sheetData").style.display = 'block';
document.getElementById("sheetData").innerHTML = output;

} catch (error) {
document.getElementById("loading-spinner").style.display = 'none';
document.getElementById("sheetData").innerHTML = "Failed to load data. Please try again later.";
console.error('There was an error fetching the sheet data:', error);
}
}
*/

// Function to toggle the visibility of event description and rotate the arrow
function toggleDescription(element) {
    // Get all descriptions and arrows
    const allDescriptions = document.querySelectorAll('.event-description');
    const allArrows = document.querySelectorAll('.toggle-arrow');

    // Get the clicked description and arrow
    const description = element.closest('li').nextElementSibling;
    const arrow = element.querySelector('.toggle-arrow');

    // Check if the clicked description is already open
    const isAlreadyOpen = description.style.display === 'block';

    // Close all descriptions and reset arrows
    allDescriptions.forEach(desc => desc.style.display = 'none');
    allArrows.forEach(arr => arr.classList.remove('rotate'));

    // Toggle the clicked description only if it was not already open
    if (!isAlreadyOpen) {
        description.style.display = 'block';
        arrow.classList.add('rotate');
    }
}

document.addEventListener("DOMContentLoaded", fetchSheetData);


/*----- Projects -----*/
async function fetchProjectData() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1OFFfj_q58ERHS-C4vS7PJnaNacFTc7W2gZyRmjr77sA/gviz/tq?tqx=out:csv&gid=198575720";
    
    // Show loading spinner while fetching data
    document.getElementById("loading-spinner").style.display = 'block';
    document.getElementById("projectData").style.display = 'none';

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        
        // Use PapaParse to parse the CSV data
        const parsedData = Papa.parse(data, {
            skipEmptyLines: true,  // Skip empty rows
            dynamicTyping: true,    // Automatically detect data types
            header: false           // Don't treat the first row as a header
        });

        let output = "";

        // Loop through rows and stop at the first row with null value
        for (let i = 1; i < parsedData.data.length; i++) {
            const row = parsedData.data[i];
            const projectName = row[0];
            if (!projectName) break;  // Stop loop when a row with null project name is reached

            const description = row[1] || 'No description available';

            // Add project name and description to the output
            output += `<ul>
                          <li class="project-item" onclick="toggleProjectDescription(this)">
                              ${projectName}
                              <i class="fas fa-chevron-right toggle-arrow"></i>
                          </li>
                          <div class="project-description">${description}</div>
                       </ul>`;
        }

        // Hide loading spinner and display the project data
        document.getElementById("loading-spinner").style.display = 'none';
        document.getElementById("projectData").style.display = 'block';
        document.getElementById("projectData").innerHTML = output;

    } catch (error) {
        document.getElementById("loading-spinner").style.display = 'none';
        document.getElementById("projectData").innerHTML = "Failed to load data. Please try again later.";
        console.error('There was an error fetching the project data:', error);
    }
}

// Function to toggle the visibility of project description and rotate the arrow
function toggleProjectDescription(element) {
    // Get all descriptions and arrows
    const allDescriptions = document.querySelectorAll('.project-description');
    const allArrows = document.querySelectorAll('.toggle-arrow');

    // Get the clicked description and arrow
    const description = element.closest('li').nextElementSibling;
    const arrow = element.querySelector('.toggle-arrow');

    // Check if the clicked description is already open
    const isAlreadyOpen = description.style.display === 'block';

    // Close all descriptions and reset arrows
    allDescriptions.forEach(desc => desc.style.display = 'none');
    allArrows.forEach(arr => arr.classList.remove('rotate'));

    // Toggle the clicked description only if it was not already open
    if (!isAlreadyOpen) {
        description.style.display = 'block';
        arrow.classList.add('rotate');
    }
}

document.addEventListener("DOMContentLoaded", fetchProjectData);

