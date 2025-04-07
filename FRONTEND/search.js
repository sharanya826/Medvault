document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results");

    // Handle Search Form Submission
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            alert("Please enter a medicine name!");
            return;
        }

        try {
            // 🔹 Send request to backend API
            const response = await fetch(`http://localhost:3000/api/medicines/search?query=${query}`);
            const medicines = await response.json();

            // 🔹 Clear previous results
            resultsContainer.innerHTML = "";

            if (medicines.length === 0) {
                resultsContainer.innerHTML = "<p>No medicines found.</p>";
                return;
            }

            // 🔹 Display search results
            medicines.forEach((medicine) => {
                const medicineCard = document.createElement("div");
                medicineCard.classList.add("medicine-card");
                medicineCard.innerHTML = `
                    <img src="${medicine.image_url || 'default.jpg'}" alt="${medicine.name}">
                    <h3>${medicine.name}</h3>
                    <p><strong>Composition:</strong> ${medicine.composition}</p>
                    <p><strong>Manufacturer:</strong> ${medicine.manufacturer}</p>
                    <button onclick="viewDetails(${medicine.id})">View Details</button>
                `;
                resultsContainer.appendChild(medicineCard);
            });
        } catch (error) {
            console.error("Error fetching medicines:", error);
            resultsContainer.innerHTML = "<p>Error fetching medicines.</p>";
        }
    });
});

// Redirect to details page
function viewDetails(id) {
    window.location.href = `medicine-details.html?id=${id}`;
}
