document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // Dark Mode Toggle
    document.getElementById("toggle-dark-mode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
    });

    // Search Button Functionality
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = 'search.html?query=${encodeURIComponent(query)}';
        } else {
            alert("Please enter a medicine name to search.");
        }
    });

    function changeColor(item) {
        // Remove "active" class from all carousel items
        const items = document.querySelectorAll(".carousel-item");
        items.forEach((el) => el.classList.remove("active"));
    
        // Add "active" class to the clicked item
        item.classList.add("active");
    }
});
