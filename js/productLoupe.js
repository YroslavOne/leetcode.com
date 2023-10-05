const $htmlGenerateBreadCrumbs = document.getElementById('breadCrumbs');
const $htmlGenerateTitle = document.getElementById('breadTitle');

const $htmlGenerateCardItem = document.getElementById('cardItem');
loupeRun();

function loupeRun() {
  let idLoupe = localStorage.idLoupe;

  let arrayCatalog = JSON.parse(localStorage.storage);
  filterById(arrayCatalog, idLoupe);
}
function filterById(product, idLoupe) {
  let filterProduct = product.filter((item) => item.id === idLoupe);
  console.log(filterProduct);
  generateHtmlLoupe(filterProduct);
}

function generateHtmlLoupe(filterProduct) {
  console.log(filterProduct[0].fields.name);
  let priceComma = roundUpPrice(filterProduct[0].fields.price);
  console.log(filterProduct[0].fields.colors);
  let colorProduct = colorProductHtmlGenerate(filterProduct[0].fields.colors);
  setBreadCrumbs(filterProduct[0].fields.name);
  $htmlGenerateCardItem.innerHTML = `<div class="block_cardItem">
		<div class="img_product_cart_loupe">
			<img src="${filterProduct[0].fields.image[0].url}" alt="">
		</div>
		<div>
			<h1 class="title_loupe">${filterProduct[0].fields.name}</h1>
			<h2 class="company_loupe">By ${filterProduct[0].fields.company}</h2>
			<h3 class="prise_loupe">$${priceComma}</h3>
			<div class="colorFlex">
				${colorProduct}
			</div>
			<p class="description_loupe">Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge</p>
		<button onclick=basketAdd("${filterProduct[0].id}") class="basket_tap_loupe">add to cart</button>
			</div>
		
		</div>`;
}

function roundUpPrice(valueForRounding) {
  let resultValue;
  let maxValueStartTwoSymble = String(valueForRounding).slice(0, -2);
  let maxValueEndTwoSymble = String(valueForRounding).slice(-2);
  resultValue = Number(maxValueStartTwoSymble + '.' + maxValueEndTwoSymble);
  return resultValue;
}
function colorProductHtmlGenerate(elemArray) {
  let result = '';
  elemArray.forEach((element) => {
    let htmlElem = `<a class="colorElem" style="Background: ${element}"></a>`;
    result = result + htmlElem;
  });
  return result;
}
function setBreadCrumbs(elemProduct) {
  $htmlGenerateBreadCrumbs.innerHTML = `Home / ${elemProduct}`;
  $htmlGenerateTitle.innerHTML = `Comfy / ${elemProduct}`;
}
