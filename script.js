const accessKey = "shnO7AQoVsSKzPrP6Ud85EWn1QD2PgwnBfr538a4oKc";
const form = document.querySelector("form");
const searchResults = document.querySelector(".searchResults"); // Use '.searchResults' instead of 'searchResults'
const showMoreButton = document.querySelector(".showMore");
const input = document.querySelector("input");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = input.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // Fix the URL by adding '&' before 'client_id'
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult");
    const image = document.createElement("img"); // Use 'img' instead of 'image'
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const a = document.createElement("a");
    a.href = result.links.html; // Use 'links.html' instead of 'link.html'
    a.target = "_blank";
    a.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(a);
    searchResults.appendChild(imageWrapper); // Append 'imageWrapper' to 'searchResults'
  });

  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", function () {
  searchImages();
});
