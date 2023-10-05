let nameProduct = '';
let priceProduct;
let companyProduct = 'All';
let arrayCompanyProduct = ['All'];
const $htmlCompanyProduct = document.getElementById('all_company');
const $valuePriseInputRange = document.getElementById('value_price_input');
const $valuePriceInInput = document.getElementById('value_price_in_input');
let arrayProduct = [];
valueInInput(0);
searchIngredientDrink(foreachProductArray);
searchIngredientDrink(collectAllData);
activator();

function searchIngredientDrink(func) {
  let url = `https://course-api.com/javascript-store-products`;
  fetch(url)
    .then((response) => response.json())
    .then((product) => func(product));
}

function foreachProductArray(products) {
  products.forEach((element) => {
    arrayProduct.push(element);
  });
  return arrayProduct;
}

text_input.oninput = function () {
  nameProduct = text_input.value;
  activator();
};

value_price_input.oninput = function () {
  priceProduct = value_price_input.value;
  valueInInput(priceProduct);
  activator();
};

function valueInInput(valueInput) {
  $valuePriceInInput.innerHTML = `Value: ${valueInput}`;
}
// maxValueInput();

function collectAllData(arrayProduct) {
  maxValueInput(arrayProduct);
  createArrayCompanyProduct(arrayProduct);
}

function maxValueInput(arrayProduct) {
  let maxValue = 0;
  arrayProduct.forEach((element) => {
    if (element.fields.price > maxValue) {
      maxValue = element.fields.price;
    }
  });
  maxValue = roundUpPrice(maxValue);

  $valuePriseInputRange.setAttribute('max', maxValue);
  $valuePriseInputRange.setAttribute('value', maxValue);
  priceProduct = maxValue;
  valueInInput(maxValue);
}

function createArrayCompanyProduct(arrayProduct) {
  arrayProduct.forEach((element) => {
    let n = 0;
    for (let i = 0; i < arrayCompanyProduct.length; i++) {
      if (element.fields.company === arrayCompanyProduct[i]) {
        n = 1;
        return;
      }
    }

    if (n > 0) {
    } else {
      arrayCompanyProduct.push(element.fields.company);
    }
  });
  addHtmlCompanyProduct(arrayCompanyProduct);
}

function addHtmlCompanyProduct(arrayCompanyProducts) {
  let htmlCompanyProduct = '';
  arrayCompanyProducts.forEach((element) => {
    htmlCompanyProduct =
      htmlCompanyProduct +
      `<li onclick=filterCompany("${element}")>${element}</li>`;
  });
  $htmlCompanyProduct.innerHTML = `<ul class="ul_products">${htmlCompanyProduct}</ul>`;
}

function filterCompany(valueCompany) {
  companyProduct = valueCompany;
  activator();
}

function activator() {
  searchIngredientDrink(enterCatalogInProduct);
}

function enterCatalogInProduct(products) {
  let arrayАorFilter = [];
  products.forEach((element) => {
    if (nameProduct === '' || element.fields.name.indexOf(nameProduct) >= 0) {
      if (
        element.fields.company === companyProduct ||
        companyProduct === 'All'
      ) {
        let elemForFilterPrice = roundUpPrice(element.fields.price);
        if (elemForFilterPrice <= priceProduct) {
          arrayАorFilter.push(element);
        }
      }
    }
  });
  localStorage.arrayАorFilter = JSON.stringify(arrayАorFilter);
  arrayaProduct(arrayАorFilter)
  console.log(arrayАorFilter)
  // console.log()
}

function roundUpPrice(valueForRounding) {
  let resultValue;
  let maxValueStartTwoSymble = String(valueForRounding).slice(0, -2);
  let maxValueEndTwoSymble = String(valueForRounding).slice(-2);
  resultValue = Math.ceil(
    Number(maxValueStartTwoSymble + '.' + maxValueEndTwoSymble)
  );
  return resultValue;
}

////////////////////////////////

const $idElemCatalogProductHtml = document.getElementById('catalog_block_products');
let elemHtml = '';
let localStorageFilterProduct = JSON.parse(localStorage.storage)
arrayaProduct(localStorageFilterProduct)


function onClickSidbar(){
    localStorageFilterProduct = JSON.parse(localStorage.arrayАorFilter)
    arrayaProduct(localStorageFilterProduct)
    console.log(localStorageFilterProduct)
}


function arrayaProduct(products) {
  elemHtml = ""
    console.log(products)
  products.forEach((element) => {
    pageCheckForHome(element);
    
    // console.log(element)
  });
}

function pageCheckForHome(productsFeatured) {
     elemHtml = elemHtml + elementAssembly(productsFeatured);
     document.getElementById('catalog_block').innerHTML = elemHtml;
    //  console.log(elemHtml)
}

function elementAssembly(productsFeatured) {
  let priceWithDot = roundUpPrice(productsFeatured.fields.price);
//   console.log(productsFeatured.id);

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