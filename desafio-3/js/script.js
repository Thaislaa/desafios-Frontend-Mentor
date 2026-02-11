import { desserts } from "./desserts.js";

const dessert = document.querySelector(".desserts");

let contadorVoltas = 0;
let container;

function createElement(tag, className, text){
  const element = document.createElement(tag);
  
  if(className){
    element.classList.add(className);
  }
  
  if(text){
    element.textContent = text;
  }
  
  return element;
}

desserts.forEach((item) => {
  if (contadorVoltas % 3 === 0) {
    container = createElement("div", "containers");
    dessert.appendChild(container);
  }

  const conteudo = createElement("div", "conteudo");
  container.appendChild(conteudo);

  const img = createElement("img");
  img.src = item.image;
  img.alt = item.title;
  
  conteudo.appendChild(img);

  const divBtn = createElement("div", "div-btn");
  
  conteudo.appendChild(divBtn);

  const btn = createElement("button", "btn-cart", "Add to Cart");
  
  divBtn.appendChild(btn);

  const imgCart = createElement("img", "icon-cart");
  imgCart.src = "./images/icon-add-to-cart.svg";
  imgCart.alt = "Carrinho"

  btn.appendChild(imgCart);

  const btnItems = createElement("button", "btn-cart-items");
  btnItems.style.display = "none";
  
  divBtn.appendChild(btnItems);

  const imgDesc = createElement("img", "icon-desc");
  imgDesc.src = "./images/icon-decrement-quantity.svg";
  imgDesc.alt = "Diminuir quantidade do item";

  btnItems.appendChild(imgDesc);

  const p = createElement("p", "num", "1");

  btnItems.appendChild(p);

  const imgAdd = createElement("img", "icon-add");
  imgAdd.src = "./images/icon-increment-quantity.svg";
  imgAdd.alt = "Aumentar quantidade do item";
  
  btnItems.appendChild(imgAdd);

  const pCategory = createElement("p", "category-name",  item.category);

  conteudo.appendChild(pCategory);

  const title = createElement("p", "title", item.title);

  conteudo.appendChild(title);

  const price = createElement("p", "price", `$${item.price.toFixed(2)}`);

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
const divOrderTotal = createElement("div", "order-total");
const divItemsCart = document.querySelector(".div-items-cart");
const deliveryInfo = document.querySelector(".delivery-info");
const cartBtn = document.querySelector(".cart-btn");

let contadorGeral = 0;
let cartList = [];

const cartDiv = document.querySelector(".div-items-cart");

function addToCart(itemCart) {
  const found = cartList.find(item => item.title === itemCart.title);

  if (!found) {
    cartList.push({
      category: itemCart.category,
      title: itemCart.title,
      price: itemCart.price,
      image: itemCart.image,
      quantity: 1
    });
  } else {
    found.quantity++;
  }
}

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

function removeToCart(itemCart) {
  const found = cartList.find(item => item.title === itemCart.title);

  if (!found) return;

  found.quantity--;

  if (found.quantity <= 0) {
    cartList = cartList.filter(item => item.title !== itemCart.title);
  }
}

function calculateCartTotal(){
  let cartTotal = 0;
  cartList.forEach((item) => {
    cartTotal += (item.quantity * item.price)
  });
  return cartTotal;
}

function addCartInfos() {
  cartDiv.innerHTML = "";
  divOrderTotal.innerHTML = "";

  cartList.forEach((item, index) => {
    if (!item) return;

    divItemsCart.style.display = "block";

    const divCart = createElement("div", "divCart");

    const divTitle = createElement("div");
    const divInfos = createElement("div", "infos-cart");
    const divItem = createElement("div");
    const exitDiv = createElement("div");
    
    const pTitle = createElement("p", "p-title", item.title);

    const pQuantity = createElement("p", "p-quantity", `${item.quantity}x`);

    const pPrice = createElement("p", "p-price", `$${item.price.toFixed(2)}`);

    const pTotal = createElement("p", "p-total", `$${(item.quantity * item.price).toFixed(2)}`);

    const hr = createElement("hr", "hr");

    divTitle.appendChild(pTitle);
    divInfos.appendChild(pQuantity);
    divInfos.appendChild(pPrice);
    divInfos.appendChild(pTotal);

    divItem.appendChild(divTitle);
    divItem.appendChild(divInfos);

    const exitImg = createElement("img","exit-img");
    exitImg.src = "./images/icon-remove-item.svg";
    exitImg.alt = "Sair";

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

        const foundIndex = cartList.findIndex(
          (dessertItem) => dessertItem.title === item.title
        );

        if (foundIndex !== -1) {
          cartList[foundIndex].quantity = 0;
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

  const cartTotal = calculateCartTotal();
        
  const cart = document.querySelector(".cart");

  const pOrder = createElement("p", "order", "Order Total");

  const pTotal = createElement("p", "total", `$${cartTotal.toFixed(2)}`);

  divOrderTotal.appendChild(pOrder);
  divOrderTotal.appendChild(pTotal);

  cart.appendChild(divOrderTotal);
}

iconAdd.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadorGeral++;

    addToCart(desserts[index]);

    const item = cartList.find(i => i.title === desserts[index].title);
    num[index].textContent = item.quantity;

    tot[0].textContent = `Your Cart (${contadorGeral})`;
    addCartInfos();
  });
});

iconDesc.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = cartList.find(i => i.title === desserts[index].title);

    if (!item) return;

    contadorGeral--;
    item.quantity--;

    if (item.quantity <= 0) {
      cartList = cartList.filter(i => i.title !== item.title);

      btnCart[index].style.display = "flex";
      btnCartItems[index].style.display = "none";
      num[index].textContent = "1";
    } else {
      num[index].textContent = item.quantity;
    }

    if (contadorGeral < 0) contadorGeral = 0;

    tot[0].textContent = `Your Cart (${contadorGeral})`;
    verificaCart(contadorGeral);
    addCartInfos();
  });
});

btnCart.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contadorGeral++;

    btn.style.display = "none";
    btnCartItems[index].style.display = "flex";

    addToCart(desserts[index]);

    const item = cartList.find(i => i.title === desserts[index].title);
    num[index].textContent = item.quantity;

    tot[0].textContent = `Your Cart (${contadorGeral})`;
    verificaCart(contadorGeral);
    addCartInfos();
  });
});

cartBtn.addEventListener("click", () => {
  const overlay = createElement("div", "overlay");

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const modal = createElement("div", "modal");

  const confirmImg = createElement("img", "confirm-img");
  confirmImg.src = "./images/icon-order-confirmed.svg";
  confirmImg.alt = "Pedido confirmado";

  const confirmTitle = createElement("h1", null, "Order Confirmed");

  const pDescription = createElement("p", "p-description", "We hope you enjoy your food!");

  const divOrder = createElement("div", "div-order")

  const divShoppingList = createElement("div", "divShoppingList");

  cartList.forEach((item) => {
    const divOrderList = createElement("div", "divOrderList");

    const divMainOrder = createElement("div", "divMainOrder");

    const descriptiveDiv = createElement("div", "descriptiveDiv");

    const infoDiv = createElement("div", "infoDiv");

    const img = createElement("img", "small-img");
    img.src = item.image;
    img.alt = item.title;

    const title = createElement("p", "p-title", item.title);

    const quantity = createElement("p", "p-quantity", `${item.quantity}x`);

    const price = createElement("p", "p-price", `$${item.price.toFixed(2)}`);

    const soma = item.quantity * item.price;
    const total = createElement("p", "p-cart-total", `$${soma.toFixed(2)}`);

    const hr = createElement("hr", "hr");

    infoDiv.appendChild(quantity);
    infoDiv.appendChild(price);

    descriptiveDiv.appendChild(title);
    descriptiveDiv.appendChild(infoDiv);

    divMainOrder.appendChild(img);
    divMainOrder.appendChild(descriptiveDiv);
    divMainOrder.appendChild(total);

    divOrderList.appendChild(divMainOrder);
    divOrderList.appendChild(hr);

    divShoppingList.appendChild(divOrderList);
    divOrder.appendChild(divShoppingList);
  });

  const newOrderBtn = createElement("button", "new-list-btn", "Start New Order");
  
  const divTotal = createElement("div", "divTotal");
  
  const cartTotal = calculateCartTotal();
  
  const pOrder = createElement("p", "order", "Order Total");

  const pTotal = createElement("p", "total", `$${cartTotal.toFixed(2)}`);
  
  divTotal.appendChild(pOrder);
  divTotal.appendChild(pTotal);

  modal.appendChild(confirmImg);
  modal.appendChild(confirmTitle);
  modal.appendChild(pDescription);
  modal.appendChild(divOrder);
  modal.appendChild(divTotal);
  modal.appendChild(newOrderBtn);

  overlay.appendChild(modal);

  newOrderBtn.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
    cartList = [];
    verificaCart(0);
    btnCartItems.forEach((item) => {
      item.style.display = "none";
    });
    
    btnCart.forEach((item) => {
      item.style.display = "flex";
    });
    document.body.style.overflow = "visible";
    tot[0].textContent = "Your Cart (0)";
    contadorGeral = 0;
  });
});
