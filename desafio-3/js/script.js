import { desserts } from "./desserts.js";

const dessert = document.querySelector(".desserts");

let contadorVoltas = 0;
let container;
desserts.forEach((item) => {

  if (contadorVoltas % 3 === 0) {
    container = document.createElement("div");
    container.classList.add("containers");
    dessert.appendChild(container);
  }

  const conteudo = document.createElement("div");
  conteudo.classList.add("conteudo");
  container.appendChild(conteudo);

  const img = document.createElement("img");
  img.src = item.image;
  conteudo.appendChild(img);

  const divBtn = document.createElement("div");
  divBtn.classList.add("div-btn");
  conteudo.appendChild(divBtn);

  const btn = document.createElement("button");
  btn.classList.add("btn-cart");
  btn.textContent = "Add to Cart";
  divBtn.appendChild(btn);

  const imgCart = document.createElement("img");
  imgCart.src = "./images/icon-add-to-cart.svg";
  imgCart.classList.add("icon-cart");
  btn.appendChild(imgCart);

  const btnItems = document.createElement("button");
  btnItems.classList.add("btn-cart-items");
  btnItems.style.display = "none";
  divBtn.appendChild(btnItems);


  const imgDesc = document.createElement("img");
  imgDesc.src = "./images/icon-decrement-quantity.svg";
  imgDesc.classList.add("icon-desc");
  btnItems.appendChild(imgDesc);

  const p = document.createElement("p");
  p.classList.add("num");
  p.textContent = "1"
  btnItems.appendChild(p);

  const imgAdd = document.createElement("img");
  imgAdd.src = "./images/icon-increment-quantity.svg";
  imgAdd.classList.add("icon-add");
  btnItems.appendChild(imgAdd);

  const pCategory = document.createElement("p");
  pCategory.textContent = item.category;
  pCategory.classList.add("category-name");
  conteudo.appendChild(pCategory);

  const title = document.createElement("p");
  title.textContent = item.title;
  title.classList.add("title");
  conteudo.appendChild(title);

  const price = document.createElement("p");
  price.textContent = `$${item.price.toFixed(2)}`;
  price.classList.add("price");
  conteudo.appendChild(price);
  contadorVoltas++;
});

const btnCart = document.querySelectorAll(".btn-cart");
const btnCartItems = document.querySelectorAll(".btn-cart-items");
const iconAdd = document.querySelectorAll(".icon-add");
const iconDesc = document.querySelectorAll(".icon-desc");
const tot = document.querySelectorAll(".tot");
const imgCart = document.querySelector("#img-cart");
const cartText = document.querySelector(".text");
const num = document.querySelectorAll(".num");

let contadorGeral = 0;
let contadores = [];

function verificaCart(contadorGeral) {
  if (contadorGeral > 0) {
    imgCart.style.display = "none";
    cartText.style.display = "none";
  }
  else if (contadorGeral === 0) {
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

    num[index].textContent = contadores[index];
    tot[0].textContent = `Your Cart (${contadorGeral})`;

    verificaCart(contadorGeral);

  });
});

iconAdd.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadores[index]++;
    contadorGeral++;

    num[index].textContent = contadores[index];
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
      num[index].textContent = contadores[index];
    }

    if (contadorGeral < 0) contadorGeral = 0;
    tot[0].textContent = `Your Cart (${contadorGeral})`;
  });
});