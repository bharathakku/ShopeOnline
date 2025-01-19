const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');

async function getAllProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const productsArray = await response.json();
  displayProductsCards(productsArray);
}

function displayProductsCards(productsArray) {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = ''; 

  productsArray.forEach((product) => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-md-6', 'col-lg-3', 'd-flex', 'justify-content-center');

    const article = document.createElement('article');
    article.classList.add('product');

    const card = document.createElement('div');
    card.classList.add('card');
    card.style.cssText = 'width: 18rem; cursor: pointer; border: none;';

    const img = document.createElement('img');
    img.src = product.image;
    img.classList.add('card-img-top');
    img.style.height = '300px';
    img.style.objectFit = 'contain'; 
    card.appendChild(img);

    const details = document.createElement('div');
    details.classList.add('productDetails');
    details.style.cssText = 'background-color: white; color: black; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;';

    const title = document.createElement('h5');
    title.classList.add('h6');
    title.textContent = product.title;

    const rating = document.createElement('div');
    rating.innerHTML = '&#9733; &#9733; &#9733; &#9733; &#9734;'; 

    const priceAndButton = document.createElement('div');
    priceAndButton.classList.add('priceAndButton');

    const price = document.createElement('span');
    price.textContent = `$${product.price}`;
    price.classList.add('p');

    const button = document.createElement('button');
    button.textContent = 'View Details';
    button.classList.add('button', 'button-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#productModal');
    button.addEventListener('click', () => {

      document.getElementById('modalProductTitle').textContent = product.title;
      document.getElementById('modalProductDescription').textContent = product.description || "No description available";
      document.getElementById('modalProductPrice').textContent = product.price;
      document.getElementById('modalProductStatus').textContent = product.stock ? "In Stock" : "Out of Stock";
      document.getElementById('modalProductImage').src = product.image;
    });

    priceAndButton.appendChild(price);
    priceAndButton.appendChild(button);

    details.appendChild(title);
    details.appendChild(rating);
    details.appendChild(priceAndButton);

    card.appendChild(details);
    article.appendChild(card);
    col.appendChild(article);

    productsList.appendChild(col);
  });
}

searchInput.addEventListener('keyup', async () => {
  const query = searchInput.value.toLowerCase();
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  
  if(query) {
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProductsCards(filteredProducts);
  } else {
    displayProductsCards(products); 
  }
});

getAllProducts();


