const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  document.body.innerHTML = "<h2>No medicine selected. Please go back and search again.</h2>";
} else {
  fetch(`/api/medicines/${id}`)
    .then((res) => res.json())
    .then((med) => {
      document.getElementById('name').textContent = med.name;
      document.getElementById('composition').textContent = med.composition;
      document.getElementById('uses').textContent = med.uses;
      document.getElementById('side_effects').textContent = med.side_effects;
      document.getElementById('manufacturer').textContent = med.manufacturer;
      document.getElementById('excellent_review_percent').textContent = med.excellent_review_percent;
      document.getElementById('average_review_percent').textContent = med.average_review_percent;
      document.getElementById('poor_review_percent').textContent = med.poor_review_percent;

      if (med.image_url) {
        document.getElementById('image').src = med.image_url;
      }
    })
    .catch((err) => {
      console.error('Error fetching medicine:', err);
      document.body.innerHTML = "<h2>Error loading medicine data. Please try again.</h2>";
    });
}
