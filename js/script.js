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
        //toast
        toast();

    })
});
// hidden cart-block
// let cartBlock = document.querySelector('#cart-block .dropdown-menu');
// cartBlock.onclick = function (e) {
//     // e.currentTarget.style.
//     e.currentTarget.style.opacity = '0';
//     e.currentTarget.style.visibility = 'visible';
// }
function toast() {
    const toasts = document.querySelector('#toast');
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast--success');
    toast.innerHTML = `<div class="toast__icon"><i class="fas fa-check-circle"></i></div>
                       <div class="toast__body">
                            <h3 class="toast__title">Success</h3>
                            <p class="toast__message">Addition 1 item to shopping cart</p>
                       </div>
                       <div class="toast__close"><i class="fas fa-times"></i></div>`;
    toast.style.animation = `showFromRight .6s ease, fadeOut 1s ease 2s forwards`;
    toasts.appendChild(toast);

    //remove toast
    const duration = setTimeout(() => {
        toast.remove()
    }, 3000)
    const closeBtn = toast.querySelector('.toast__close');
    closeBtn.onclick = function (e) {
        e.target.closest('.toast').remove();
        clearTimeout(duration)
    }
}

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
const modalBg = modalSection.querySelector('.modal');
const modalWrapper = document.querySelector('.modal__wrapper');
quickViewBtn.forEach(element => {
    element.addEventListener('click', function (e) {
        modalSection.className += ' active';
        const parentNode = e.target.closest('.carousel-item')
        const nameProduct = parentNode.querySelector('.product-name').textContent;
        let html = '';

        fetch('https://lamvietthinh-ef5d9.firebaseio.com/data.json')
            .then(response => response.json())
            .then(data => {
                let infoProduct;
                for (let dataItem in data) {
                    // console.log(data[dataItem].name)
                    if(data[dataItem].name === nameProduct) {
                        infoProduct = data[dataItem];
                    }
                }
                html = `<span class="modal__close-btn"><i class="fa fa-times"></i></span>
                        <div class="modal__content">
                            <div class="modal__image"><img src="${infoProduct.image.img1.bigImg}" alt=""></div>
                            <div class="modal__details">
                            <div class="modal__details-row">
                                <p class="modal__title">${infoProduct.name}</p>
                                <div class="modal__review">
                                    <a class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </a>
                                    <a href="#"><span>0 reviews</span></a>
                                    <a href="#"><span>Write a review</span></a>
                                </div>
                            </div>
                            <div class="modal__details-row">
                                <div class="modal__info">
                                    <span>Brand:</span>${infoProduct.brand}<br>
                                    <span>Product Code:</span>${infoProduct.productCode}<br>
                                    <span>Reward Points:</span>${infoProduct.rewardPoints}<br>
                                    <span>Availability:</span>${infoProduct.availability}
                                </div>
                            </div>
                            <div class="modal__details-row">
                                <div class="modal__price">
                                    <p><strong>\$${infoProduct.price}</strong></p>
                                    <p>Ex Tax: \$${infoProduct.price}</p>
                                    <span>Price in reward points: 400</span>
                                </div>
                            </div>
                            <div class="modal__details-row">
                                <div class="modal__add-to-cart">
                                    <div class="modal__cart-btn">
                                        <span class="modal__add">Add to cart</span>
                                    </div>
                                    <div class="modal__other-btn">
                                        <a href="#"><span>Add to wish list</span></a>
                                        <a href="#"><span>Compare this product</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                modalWrapper.innerHTML = html;

                const closeModalBtn = modalSection.querySelector('.modal__close-btn');
                closeModalBtn.onclick = function () {
                    modalSection.classList.remove('active');
                };
            })
    })
});

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
