import {checkLocalStorage, basketOpen, basketAdd, basketOpen } from './module/cardFunction.js';
checkLocalStorage;

function toDoBasketClose(){
  console.log("ghjikj")
  basketClose(); 
  checkLocalStorage();
}
function toDoBasketOpen(productsFeatured){
  console.log("ghjikj")
  console.log(productsFeatured)
  basketAdd(productsFeatured);
  basketOpen(); 
  
}