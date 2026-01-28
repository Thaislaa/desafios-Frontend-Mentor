const btnCart = document.querySelectorAll(".btn-cart");
const btnCartItems = document.querySelectorAll(".btn-cart-items");
const iconAdd = document.querySelectorAll(".icon-add");
const iconDesc = document.querySelectorAll(".icon-desc");
const tot = document.querySelectorAll(".tot");
const imgCart = document.querySelector("#img-cart");
const cartText = document.querySelector(".text");

let contadorGeral = 0;
let contadores = [];

function verificaCart(contadorGeral) {
  if(contadorGeral > 0){
    imgCart.style.display = "none";
    cartText.style.display = "none";
  }
  else if(contadorGeral === 0){
    imgCart.style.display = "flex";
    cartText.style.display = "block";
  }
}

btnCart.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadores[index] = 1;
    contadorGeral++;

    btn.style.display = "none";
    btnCartItems[index].style.display = "flex";

    btnCartItems[index].childNodes[1].nodeValue = `${contadores[index]}`;
    tot[0].textContent = `Your Cart (${contadorGeral})`;

    verificaCart(contadorGeral);

  });
});

iconAdd.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadores[index]++;
    contadorGeral++;

    btnCartItems[index].childNodes[1].nodeValue = `${contadores[index]}`;
    tot[0].textContent = `Your Cart (${contadorGeral})`;
  });
});

iconDesc.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadores[index]--;
    contadorGeral--;

    if (contadores[index] <= 0) {
      contadores[index] = 0;
      btnCart[index].style.display = "flex";
      btnCartItems[index].style.display = "none";
      verificaCart(contadorGeral);
    } else {
      btnCartItems[index].childNodes[1].nodeValue = `${contadores[index]}`;
    }

    if (contadorGeral < 0) contadorGeral = 0;
    tot[0].textContent = `Your Cart (${contadorGeral})`;
  });
});