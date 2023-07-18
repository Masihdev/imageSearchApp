const accessKey = '1rk8_s7oVa4Y6Q7oLzRp0O0b3nfTIiKwIclF47bBERk';
const inputEl = document.getElementById('input-search');
const formEl = document.querySelector('form');
// const searchBtn = document.getElementById('button-search');
const searchResults = document.querySelector('.search-results');
// const searchResultContainer = document.querySelector('search-result');
// const img = document.querySelector('img');
const showMoreBtn = document.getElementById('show-more-button');
let inputData = '';
let page = 1;


async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.regular;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.download;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if(page > 1) {
        showMoreBtn.style.display = 'block';
    }
}


formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});


showMoreBtn.addEventListener('click', () => {
    searchImages();
});