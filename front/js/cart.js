const cartItems = document.getElementById('cart__items');
const totalPriceElement = document.getElementById('totalPrice');
const totalQuantityElement = document.getElementById('totalQuantity');

let productInCart = JSON.parse(localStorage.getItem('productInCart'));
let totalPriceProducts = 0;
let totalQuantityProducts = 0;
let itemQuantity = document.getElementsByClassName('itemQuantity');

      


// Affichage des produits du panier
    function displayProductsContent() {

        for (element in productInCart) {
            let infoElement = productInCart[element];
            console.log(`Element est égal à : ${element}`);

            
            
            fetch(`http://localhost:3000/api/products/${infoElement.idProduct}`)
                .then(res => res.json())
                .then(data => {

                    let priceProduct = parseInt(data.price);
                
                    cartItems.innerHTML += `
                        <article class="cart__item" data-id="${data._id}">
                            <div class="cart__item__img">
                                <img src="${data.imageUrl}" alt="${data.altTxt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__titlePrice">
                                <h2>${data.name}</h2>
                                <p>${data.price} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${infoElement.quantityProduct}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                                </div>
                            </div>
                        </article>
                    `;


                    
                    // Affichage du prix total du panier
                    
                    addTotalPrice(priceProduct);
                    

                    
                    

                    if (infoElement.idProduct != productInCart[productInCart.length - 1].idProduct) {
                        return;
                    } else {
                        for (i = 0; i < itemQuantity.length; i++) {
                            itemQuantity[i].addEventListener('change', (e) => {
                                let elementEvent = e.path[4]
                                let dataId = elementEvent.dataset;
                                let idParent = (dataId.id);
                                for (i = 0; i < productInCart.length; i++) {
                                    if (productInCart[i].idProduct == idParent) {
                                        productInCart[i].quantityProduct = e.target.value;
                                        localStorage.setItem('productInCart', JSON.stringify(productInCart));
                                        console.log(productInCart);
                                        
                                    } else {
                                        continue;
                                    }
                                }
                                productInCart = JSON.parse(localStorage.getItem('productInCart'));
                                addTotalQuantity();
                                addTotalPrice(priceProduct);
                                
                            })
                            
                            
                            
    
                        }

                        
                    }

                    

                    
                })
        }
    }

    function addTotalQuantity() {
        let totalQuantityProducts = 0;
        for (element in productInCart) {
            totalQuantityProducts += parseInt(productInCart[element].quantityProduct);
            totalQuantityElement.textContent = totalQuantityProducts;
        }
    }

    function addTotalPrice(price) {
        let totalPriceProducts = 0;
        for (i = 0; i < productInCart.length; i++)
        totalPriceProducts += parseInt(price * productInCart[i].quantityProduct);
        totalPriceElement.textContent = totalPriceProducts;
        console.log(totalPriceProducts);
    }

    

   

    displayProductsContent();
    addTotalPrice();
    addTotalQuantity();
    
    
    





// let itemsQuantity = document.querySelectorAll('input');
// console.log(cartItems);

//         let totalQuantity = document.getElementById('totalQuantity');
//         let totalPrice = document.getElementById('totalPrice');
        
        
//     })

//     console.log(element);
    
// }

// 