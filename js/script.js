//===============add to cart======================
const cart__removeItem = document.querySelectorAll('.cart-item__remove-item-btn');
const emptyCartDiv = document.querySelector('.empty');
const cartItemButtonDiv = document.querySelector('.cart-item__total');
const cartItems = document.querySelector('.cart-items');
updateCart();

for (let i = 0; i < cart__removeItem.length; i++) {
    let btn = cart__removeItem[i];
    btn.addEventListener('click', function (e) {
        let removeBtn = event.target;
        removeBtn.parentElement.parentElement.remove();
        updateCart();
    })
}

function updateCart() {
    const cartItem = cartItems.querySelectorAll('.cart-item');
    let itemCount = 0;
    let total = 0;
    for (let i = 0; i < cartItem.length; i++) {
        let cart_Item = cartItem[i];
        let cartPrice = cart_Item.querySelector('.cart-item__price');
        let cartCount = cart_Item.querySelector('.cart-item__count');
        let price = parseInt(cartPrice.textContent.substr(1));
        let count = parseInt(cartCount.textContent.substr(1));
        total += price * count;
        itemCount +=count;
    }
    console.log(total);
    document.querySelector('.cart-item__sub-total strong').textContent = '$' + total;
    document.getElementById('total_count').textContent = `${itemCount}`;
    // console.log(cartItem)
    if (total !== 0) {
        emptyCartDiv.style.display = 'none';
        cartItemButtonDiv.style.display = 'flex';
    } else {
        cartItemButtonDiv.style.display = 'none';
        emptyCartDiv.style.display = 'block';
    }
}

//them gio hang
const addToCartButton = document.querySelectorAll('.add-to-cart-btn');
addToCartButton.forEach(element => {
    element.addEventListener('click', function (event) {
        let button = event.currentTarget;
        let product = button.parentElement.parentElement.parentElement;
        let src = product.querySelector('img').src;
        let productName = product.querySelector('.product-name').textContent;
        let price = product.querySelector('.price').textContent;
        addToCart(src, productName, price);
        updateCart();
        console.log(src+productName+price)
    })
});
// hidden cart-block
// let cartBlock = document.querySelector('#cart-block .dropdown-menu');
// cartBlock.onclick = function (e) {
//     // e.currentTarget.style.
//     e.currentTarget.style.opacity = '0';
//     e.currentTarget.style.visibility = 'visible';
// }

function addToCart(img, name, price) {
    console.log(name);
    let avaiItem = false;
    let cartTitles = cartItems.querySelectorAll('.title');
    cartTitles.forEach(element => {
        if (element.textContent === name) {
            avaiItem = true;
            let oldCount = element.parentElement.querySelector('.cart-item__count');
            let numb = parseInt(oldCount.textContent.substr(1));
            numb +=1;
            let newCount = document.createElement('div');
            newCount.classList.add('cart-item__count');
            newCount.textContent = 'x' + numb;
            element.parentNode.replaceChild(newCount, oldCount);
        }
    });
    if(avaiItem === true) return;
    let div = document.createElement('div');
    let cartItemTotal = document.querySelector('.cart-item__total');
    div.classList.add('cart-item');
    // let price1 = '$' + price;
    let newItem = `<div class="cart-item__row">
                   <img src="${img}" alt="a">
                   <div class="title">${name}</div>
                   <div class="cart-item__count">x1</p></div>
                   <div class="cart-item__price">${price}</div>
                   <span class="cart-item__remove-item-btn">x</span>
                   </div>
                   `;
    div.innerHTML = newItem;
    cartItems.insertBefore(div, cartItemTotal);
    div.querySelector('.cart-item__remove-item-btn').addEventListener('click', function (event) {
        let removeItem = event.target;
        removeItem.parentElement.parentElement.remove();
        updateCart();
    });
}


// =================modal====================
const quickViewBtn = document.querySelectorAll('.quick-view-btn');
const modalSection = document.querySelector('.section-modal');
const closeModalBtn = modalSection.querySelector('.modal__close-btn');
const modalBg = modalSection.querySelector('.modal');
quickViewBtn.forEach(element => {
    element.addEventListener('click', function () {
        modalSection.className += ' active';
    })
});
closeModalBtn.onclick = function () {
    modalSection.classList.remove('active');
};
// modalSection.addEventListener('click', function (event) {
//     event.target.classList.remove('active');
// });
modalBg.addEventListener('click', function (e) {
    // e = e || window.event;
    // modalSection.classList.remove('active');
    let el = e.target.parentNode;
    el.classList.remove('active');
    // console.log(el)
});
