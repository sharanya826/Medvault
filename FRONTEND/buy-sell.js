const medicines = [
    {
      name: "Paracetamol 500mg",
      price: "₹25",
      seller: "HealthPharma",
      expiry: "2025-10",
      location: "Bangalore"
    },
    {
      name: "Azithromycin 250mg",
      price: "₹90",
      seller: "MediCare Ltd.",
      expiry: "2026-01",
      location: "Delhi"
    },
    {
      name: "Cetirizine 10mg",
      price: "₹15",
      seller: "QuickMeds",
      expiry: "2025-07",
      location: "Mumbai"
    }
  ];
  
  const list = document.getElementById("medicine-list");
  
  medicines.forEach(med => {
    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <h3>${med.name}</h3>
      <p><strong>Price:</strong> ${med.price}</p>
      <p><strong>Seller:</strong> ${med.seller}</p>
      <p><strong>Expiry:</strong> ${med.expiry}</p>
      <p><strong>Location:</strong> ${med.location}</p>
      <button class="buy-btn">Buy Now</button>
    `;
  
    list.appendChild(card);
  });
  // SELL LINK: Ask for medicine details
document.getElementById("sell-link").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent link from jumping
  
    const name = prompt("Enter medicine name:");
    if (!name) return;
  
    const price = prompt("Enter price:");
    if (!price) return;
  
    const quantity = prompt("Enter quantity:");
    if (!quantity) return;
  
    // Dummy confirmation (you could save this data later)
    alert(`Thanks! You submitted:
    Medicine: ${name}
    Price: ₹${price}
    Quantity: ${quantity}`);
  
    // Optional: push to `medicines` array and update UI dynamically
    medicines.push({
      name,
      price: `₹${price}`,
      seller: "You", // You can replace with real user later
      expiry: "2025-12", // Placeholder
      location: "Your City" // Placeholder
    });
  
    // Re-render the updated medicine list
    list.innerHTML = "";
    medicines.forEach(med => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${med.name}</h3>
        <p><strong>Price:</strong> ${med.price}</p>
        <p><strong>Seller:</strong> ${med.seller}</p>
        <p><strong>Expiry:</strong> ${med.expiry}</p>
        <p><strong>Location:</strong> ${med.location}</p>
        <button class="buy-btn">Buy Now</button>
      `;
      list.appendChild(card);
    });
  });
  