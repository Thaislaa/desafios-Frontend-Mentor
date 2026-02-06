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
const div = document.querySelector(".div");
const num = document.querySelectorAll(".num");
const divOrderTotal = document.createElement("div");
divOrderTotal.classList.add("order-total");
const divItemsCart = document.querySelector(".div-items-cart");
const deliveryInfo = document.querySelector(".delivery-info");
const cartBtn = document.querySelector(".cart-btn");

let contadorGeral = 0;
let cartList = [];

const cartDiv = document.querySelector(".div-items-cart");

function verificaCart(contadorGeral) {
  if (contadorGeral > 0) {
    imgCart.style.display = "none";
    cartText.style.display = "none";
    div.style.display = "none";
    divOrderTotal.style.display = "flex";
    divItemsCart.style.display = "block";
    deliveryInfo.style.display = "flex";
    cartBtn.style.display = "block";
  } else if (contadorGeral === 0) {
    imgCart.style.display = "flex";
    cartText.style.display = "block";
    div.style.display = "flex";
    divOrderTotal.style.display = "none";
    divItemsCart.style.display = "none";
    deliveryInfo.style.display = "none";
    cartBtn.style.display = "none";
  }
}

function addToCart(itemCart) {
  const found = cartList.find((item) => item.title === itemCart.title);
  const indexFound = cartList.findIndex((item) => item.title === itemCart.title);

  if (!found) {
    cartList.push({
      category: itemCart.category,
      title: itemCart.title,
      price: itemCart.price,
      image: itemCart.image,
      quantity: 1
    });
  } else {
    const item = desserts.find((item) => found.title === item.title);
    cartList[indexFound].quantity = item.quantity;
  }
}

function removeToCart(itemCart) {
  const found = cartList.find(item => item.title === itemCart.title);
  const indexFound = cartList.findIndex(item => item.title === itemCart.title);

  if (found.quantity === 1) {
    cartList.splice(indexFound, 1);
  } else {
    found.quantity--;
    const item = desserts.find((item) => found.title === item.title);
    cartList[indexFound].quantity = item.quantity;
  }
}

function addCartInfos() {
  cartDiv.innerHTML = "";
  divOrderTotal.innerHTML = "";

  cartList.forEach((item, index) => {
    // Verifique se o item ainda está no carrinho (caso o índice tenha sido invalidado)
    if (!item) return;

    divItemsCart.style.display = "block";

    const divCart = document.createElement("div");
    divCart.classList.add("divCart");
    const divTitle = document.createElement("div");
    const divInfos = document.createElement("div");
    const divItem = document.createElement("div");
    const exitDiv = document.createElement("div");

    divInfos.classList.add("infos-cart");

    const pTitle = document.createElement("p");
    pTitle.textContent = item.title;
    pTitle.classList.add("p-title");

    const pQuantity = document.createElement("p");
    pQuantity.textContent = `${item.quantity}x `;
    pQuantity.classList.add("p-quantity");

    const pPrice = document.createElement("p");
    pPrice.textContent = `$${item.price.toFixed(2)} `;
    pPrice.classList.add("p-price");

    const pTotal = document.createElement("p");
    pTotal.textContent = `$${(item.quantity * item.price).toFixed(2)} `;
    pTotal.classList.add("p-total");

    const hr = document.createElement("hr");
    hr.classList.add("hr");

    divTitle.appendChild(pTitle);
    divInfos.appendChild(pQuantity);
    divInfos.appendChild(pPrice);
    divInfos.appendChild(pTotal);

    divItem.appendChild(divTitle);
    divItem.appendChild(divInfos);

    const exitImg = document.createElement("img");
    exitImg.src = "./images/icon-remove-item.svg";
    exitImg.classList.add("exit-img");
    exitDiv.appendChild(exitImg);

    divCart.appendChild(exitDiv);
    exitDiv.classList.add("exit-div");
    divCart.appendChild(divItem);
    divItem.classList.add("div-item");

    cartDiv.appendChild(divCart);
    cartDiv.appendChild(hr);

    exitImg.addEventListener("click", () => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
      if (confirm) {
        contadorGeral -= item.quantity;

        cartList.splice(index, 1);

        const foundIndex = desserts.findIndex(dessertItem => dessertItem.title === item.title);
        if (foundIndex !== -1) {
          desserts[foundIndex].quantity = 0;
        }

        addCartInfos();

        const btnAddToCart = btnCart[foundIndex];
        const btnItems = btnCartItems[foundIndex];

        if (btnAddToCart && btnItems) {
          btnAddToCart.style.display = "flex";
          btnItems.style.display = "none";
        }

        tot[0].textContent = `Your Cart (${contadorGeral})`;

        verificaCart(contadorGeral);
      }
    });
  });

  let cartTotal = 0;
  cartList.forEach((item) => {
    cartTotal += item.quantity * item.price;
  });

  const cart = document.querySelector(".cart");

  const pOrder = document.createElement("p");
  pOrder.textContent = "Order Total";
  pOrder.id = "order";

  const pTotal = document.createElement("p");
  pTotal.textContent = `$${cartTotal.toFixed(2)}`;
  pTotal.id = "total";

  divOrderTotal.appendChild(pOrder);
  divOrderTotal.appendChild(pTotal);

  cart.appendChild(divOrderTotal);
}

btnCart.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    desserts[index].quantity = 1;
    contadorGeral++;

    btn.style.display = "none";
    btnCartItems[index].style.display = "flex";

    num[index].textContent = `${desserts[index].quantity}`;
    tot[0].textContent = `Your Cart (${contadorGeral})`;

    verificaCart(contadorGeral);
    addToCart(desserts[index]);
    addCartInfos();
  });
});

iconAdd.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    desserts[index].quantity++;
    contadorGeral++;
    addToCart(desserts[index]);

    num[index].textContent = `${desserts[index].quantity}`;
    tot[0].textContent = `Your Cart (${contadorGeral})`;
    addCartInfos();
  });
});

iconDesc.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    desserts[index].quantity--;
    contadorGeral--;

    if (desserts[index].quantity <= 0) {
      desserts[index].quantity = 0;
      btnCart[index].style.display = "flex";
      btnCartItems[index].style.display = "none";
      verificaCart(contadorGeral);
    } else {
      num[index].textContent = desserts[index].quantity;
    }

    if (contadorGeral < 0) contadorGeral = 0;
    tot[0].textContent = `Your Cart (${contadorGeral})`;
    removeToCart(desserts[index]);
    addCartInfos();
  });
});
