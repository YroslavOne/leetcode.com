import { basketProductArrays } from './storageValue';
let basketProductArray = [];

const curdFunction = {
  basketAdd: function (idElem) {
    curdFunction.quantityProduct(idElem);
  },

  checkLocalStorage: function () {
    if (localStorage.basketProduct !== '') {
      basketProductArray = basketProductArrays;
      console.log(basketProductArray[0]);
    }
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
export const checkLocalStorage = curdFunction.checkLocalStorage;
export const quantityProduct = curdFunction.quantityProduct;
export const addProductId = curdFunction.addProductId;
export const quantityBasketProduct = curdFunction.quantityBasketProduct;
export const roundUpPrice = curdFunction.roundUpPrice;
