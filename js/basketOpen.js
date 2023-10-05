const $htmlBasketOpen = document.getElementById('basket_open');
const $bodyBackground = document.getSelection('BackgroundForBasket');
let htmlOptionsBasketProduct;
let arrayProductsBaskets

function basketOpen() {
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
}

function sumAllProductBaskets(permArrayProductsBasket) {
  let resultSumAllProductBasket = 0;
  permArrayProductsBasket.forEach((element) => {
    resultSumAllProductBasket =
      resultSumAllProductBasket + element.quantity * element.price;
  });
  return resultSumAllProductBasket;
}

function optionsBasketProducts(permArrayProductsBaskets) {
  let htmlOptionsBasketProduct = sortThroughBasketProduct(
    permArrayProductsBaskets
  );
  return htmlOptionsBasketProduct;
}
function sortThroughBasketProduct(permArrayProductsBaskets) {
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
}

function basketClose() {
  $htmlBasketOpen.innerHTML = ``;
  $htmlBasketOpen.classList.remove('basket_open');
  $htmlBasketOpen.classList.add('basket_close');
}

function removeItemBasket(indexArr){
    arrayProductsBaskets.splice(indexArr, 1);
    localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
    basketOpen()
}

function productPlus(indexArr){
    arrayProductsBaskets[indexArr].quantity++
    localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
    basketOpen()
}

function productMinus(indexArr){
    arrayProductsBaskets[indexArr].quantity--
    if(arrayProductsBaskets[indexArr].quantity ===0){
        removeItemBasket(indexArr)
    } else{
        localStorage.basketProduct = JSON.stringify(arrayProductsBaskets)
        basketOpen()
    }
    
}

