const $idElemCatalogHtml = document.getElementById('catalog_block');
let elemHtml = '';
getProducts();

function getProducts() {
  let url = `https://course-api.com/javascript-store-products`;
  fetch(url)
    .then((response) => response.json())
    .then((products) => arrayProduct(products));
}
function arrayProduct(products) {
  localStorage.storage = JSON.stringify(products)
  let arrayaProductInStorega = JSON.parse(localStorage.storage)
  arrayaProductInStorega.forEach((element) => {
    pageCheckForHome(element);
  });
}

function pageCheckForHome(productsFeatured) {
  if (productsFeatured.fields.featured === true) {
    elemHtml = elemHtml + elementAssembly(productsFeatured);
  }
  $idElemCatalogHtml.innerHTML = elemHtml;
}

function elementAssembly(productsFeatured) {
  let priceWithDot = roundUpPrice(productsFeatured.fields.price);
  console.log(productsFeatured.id);

  let CatalogElemHtml = `
<div class="card_product_home">
<div class="home_background_featured" style="Background: url(${productsFeatured.fields.image[0].url}); background-size: cover; object-fit: contain; background-position: center">
<div class="basket_and_loupe">
<a href="./productsLoupe.html"><button onclick=loupeOnClick("${productsFeatured.id}") class="loupe"><i class="bi bi-search"></i></button></a>
<button onclick=toDoBasketOpen("${productsFeatured.id}") class="basket_tap"><i class="bi bi-cart3"></i></button>
</div>
</div>
<h4 class="product_featured_name">${productsFeatured.fields.name}</h4>
<p class="product_featured_price">$${priceWithDot}</p>
</div>
`;
  return CatalogElemHtml;
}

function roundUpPrice(valueForRounding) {
  let resultValue;
  let maxValueStartTwoSymble = String(valueForRounding).slice(0, -2);
  let maxValueEndTwoSymble = String(valueForRounding).slice(-2);
  resultValue = Number(maxValueStartTwoSymble + '.' + maxValueEndTwoSymble);
  return resultValue;
}

// function loupeOnClick(idElem) {
//   console.log(idElem);
// }
// function basketAdd(idElem) {
//   console.log(idElem);
// }
