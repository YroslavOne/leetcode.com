// import { basketProductArrays } from './storageValue.js';
let basketProductArray = [];

const curdFunction = {
  basketAdd: function (idElem) {
    curdFunction.quantityProduct(idElem);
  },

  checkLocalStorage1: function () {
    if (localStorage.basketProduct !== '') {
      console.log(basketProductArray[0]);
      basketProductArray = JSON.parse(localStorage.basketProduct);
      console.log(basketProductArray[0]);
      console.log('dff');
    }
    console.log('dff');
    curdFunction.quantityBasketProduct(basketProductArray);
  },
  quantityProduct: function (idElem) {
    let ifProductTrue = 0;
    if (basketProductArray.length > 0) {
      basketProductArray.forEach((element) => {
        if (element.id === idElem) {
          element.quantity = element.quantity + 1;
          localStorage.basketProduct = JSON.stringify(basketProductArray);
          ifProductTrue = 1;
          curdFunction.quantityBasketProduct(basketProductArray);
        }
      });
      console.log(ifProductTrue);

      if (ifProductTrue === 0) {
        curdFunction.addProductId(idElem);
        ifProductTrue = 0;
      }
    } else {
      curdFunction.addProductId(idElem);
    }
  },
  addProductId: function (idElem) {
    let arrayProduct = JSON.parse(localStorage.storage);
    arrayProduct.forEach((element) => {
      if (idElem === element.id)
        basketProductArray.push({
          id: element.id,
          name: element.fields.name,
          price: curdFunction.roundUpPrice(element.fields.price),
          img: element.fields.image[0].url,
          quantity: 1,
        });
    });
    localStorage.basketProduct = JSON.stringify(basketProductArray);
    curdFunction.quantityBasketProduct(basketProductArray);
  },
  quantityBasketProduct: function (basketProductArray) {
    let sumProduct = 0;
    basketProductArray.forEach((element) => {
      sumProduct = sumProduct + element.quantity;
    });
    console.log(sumProduct);
    document.getElementById('basket_summ_items').innerHTML = sumProduct;
  },
  roundUpPrice: function (valueForRounding) {
    let resultValue;
    let maxValueStartTwoSymble = String(valueForRounding).slice(0, -2);
    let maxValueEndTwoSymble = String(valueForRounding).slice(-2);
    resultValue = Number(maxValueStartTwoSymble + '.' + maxValueEndTwoSymble);
    return resultValue;
  },
};

export const basketAdd = curdFunction.basketAdd;
export const checkLocalStorage = curdFunction.checkLocalStorage1;
export const quantityProduct = curdFunction.quantityProduct;
export const addProductId = curdFunction.addProductId;
export const quantityBasketProduct = curdFunction.quantityBasketProduct;
export const roundUpPrice = curdFunction.roundUpPrice;

const $htmlBasketOpen = document.getElementById('basket_open');
const $bodyBackground = document.getSelection('BackgroundForBasket');
let htmlOptionsBasketProduct;
let arrayProductsBaskets

const curdOpen = {
  basketOpen: function() {
    arrayProductsBaskets = JSON.parse(localStorage.basketProduct);
    let sumAllProductBasket = sumAllProductBaskets(arrayProductsBaskets);
    let optionsBasketProduct = optionsBasketProducts(arrayProductsBaskets);
    $htmlBasketOpen.classList.add('basket_open');
    $htmlBasketOpen.classList.remove('basket_close');
  
    $htmlBasketOpen.innerHTML = `
      <div class="block_basket">
    <div class="close_basket" onclick="toDoBasketClose()"><i  class="bi bi-x"></i></div>
    <div class="basket_block_main">
      <h3 class="title_basket">Your Bag</h3>
      <div class="block_basket_product">${optionsBasketProduct}</div>
      <div class="div_prise_basket">
        <p class="_prise_basket">Total : $${sumAllProductBasket}</p>
      </div>
      <button class="basket_checkout">checkout</button>
  
    </div>
  
  </div>`;
    console.log('check');
  },

  sumAllProductBaskets: function (permArrayProductsBasket) {
    let resultSumAllProductBasket = 0;
    permArrayProductsBasket.forEach((element) => {
      resultSumAllProductBasket =
        resultSumAllProductBasket + element.quantity * element.price;
    });
    return resultSumAllProductBasket;
  },

  optionsBasketProducts: function (permArrayProductsBaskets) {
    let htmlOptionsBasketProduct = curdOpen.sortThroughBasketProduct(permArrayProductsBaskets);
    return htmlOptionsBasketProduct;
  },

  sortThroughBasketProduct: function (permArrayProductsBaskets) {
    let htmlOptionsBasketProducts = '';
    let indexObjProduct = 0
    permArrayProductsBaskets.forEach((element) => {
      console.log(indexObjProduct)
      htmlOptionsBasketProducts =
        htmlOptionsBasketProducts +
        `
        <div class="display_flex_basket_product">
  <div class="img_elem_basket_product">
    <img src="${element.img}" alt="">
  </div>
  <div class="text_elem_basket_product">
    <p class="title_elem_basket_product">${element.name}</p>
    <p class="price_elem_basket_product">${element.price}</p>
    <button class="button_elem_basket_product" onclick="removeItemBasket(${indexObjProduct})">remove</button>
  
  </div>
  <div class="quantity_elem_basket_product">
    <button class="quantity_plus" onclick=productPlus(${indexObjProduct})><i class="bi bi-caret-up"></i></button>
    <p class="quantity_text_basket_product">${element.quantity}</p>
    <button class="quantity_minus" onclick=productMinus(${indexObjProduct})><i class="bi bi-caret-down"></i></button>
  </div>
  </div>`;
  indexObjProduct++
    });
    return htmlOptionsBasketProducts;
  },

  basketClose: function() {
    $htmlBasketOpen.innerHTML = ``;
    $htmlBasketOpen.classList.remove('basket_open');
    $htmlBasketOpen.classList.add('basket_close');
  },

  removeItemBasket: function (indexArr){
    arrayProductsBaskets.splice(indexArr, 1);
    localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
    curdOpen.basketOpen()
},

productPlus: function(indexArr){
  arrayProductsBaskets[indexArr].quantity++
  localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
  curdOpen.basketOpen()
},

productMinus: function (indexArr){
  arrayProductsBaskets[indexArr].quantity--
  if(arrayProductsBaskets[indexArr].quantity ===0){
    curdOpen.removeItemBasket(indexArr)
  } else{
      localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
      curdOpen.basketOpen()
  }
  
},
}

export const basketOpen = curdFunction.basketOpen;
export const sumAllProductBaskets = curdFunction.sumAllProductBaskets;
export const optionsBasketProducts = curdFunction.optionsBasketProducts;
export const sortThroughBasketProduct = curdFunction.sortThroughBasketProduct;
export const basketClose = curdFunction.basketClose;
export const removeItemBasket = curdFunction.removeItemBasket;
export const productPlus = curdFunction.productPlus;
export const productMinus = curdFunction.productMinus;