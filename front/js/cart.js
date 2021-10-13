const cartItems = document.getElementById('cart__items');
const totalPriceElement = document.getElementById('totalPrice');
const totalQuantityElement = document.getElementById('totalQuantity');

let productInCart = JSON.parse(localStorage.getItem('productInCart'));
let totalPriceProducts = 0;
let totalQuantityProducts = 0;

let itemQuantity = document.getElementsByClassName('itemQuantity');
let deleteItem = document.getElementsByClassName('deleteItem');

      


// Affichage des produits du panier
function displayProductsContent() {

    for (element in productInCart) {
        let infoElement = productInCart[element];

        
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
                            <p class="colorProduct">${infoElement.colorProduct}</p>
                            <p class="priceProduct">${data.price} €</p>
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
                
                
                addTotalPrice(priceProduct);
                

                if (infoElement.idProduct != productInCart[productInCart.length - 1].idProduct) {
                    return;
                } else {
                    for (i = 0; i < itemQuantity.length; i++) {

                        // Modification de la quantité des produits du panier
                        itemQuantity[i].addEventListener('change', (e) => {
                            let elementParent = e.path[4];
                            let dataId = elementParent.dataset;
                            let idParent = dataId.id;
                            let colorProduct = elementParent.querySelector('.colorProduct');

                            for (i = 0; i < productInCart.length; i++) {
                                
                                if (productInCart[i].idProduct == idParent && productInCart[i].colorProduct == colorProduct.textContent) {
                                    
                                    productInCart[i].quantityProduct = e.target.value;
                                    localStorage.setItem('productInCart', JSON.stringify(productInCart));
                                    break;
                                    
                                } else {
                                    continue;
                                }
                            }
                            productInCart = JSON.parse(localStorage.getItem('productInCart'));
                            
                            addTotalPrice(priceProduct);
                            addTotalQuantity();
                        })
                            // Suppression des articles du panier
                            deleteItem[i].addEventListener('click', (e) => {
                                let elementParent = e.path[4];
                                let dataId = elementParent.dataset;
                                let idParent = dataId.id;
                                let colorProduct = elementParent.querySelector('.colorProduct');
                                for (i = 0; i < productInCart.length; i++) {
                                    if (productInCart[i].idProduct == idParent && productInCart[i].colorProduct == colorProduct.textContent) {
                                        if (productInCart.length == 1) {
                                            localStorage.removeItem('productInCart');
                                        } else {
                                            productInCart.splice(i, 1);
                                            localStorage.setItem('productInCart', JSON.stringify(productInCart));
                                        }
                                        
                                        

                                        
                                    } else {
                                        continue;
                                    }
                                    console.log(`suppression de ${colorProduct.textContent}`);
                                    elementParent.remove();
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
    

    // Affichage de la quantité totale de produits dans le panier
    function addTotalQuantity() {
        let totalQuantityProducts = 0;
        if (productInCart == null) {
            totalQuantityProducts = 0;
            totalQuantityElement.textContent = totalQuantityProducts;
        } else {
            for (element in productInCart) {
                totalQuantityProducts += parseInt(productInCart[element].quantityProduct);
                totalQuantityElement.textContent = totalQuantityProducts;
            }
        }
        
    }

    // Affichage du prix total du panier
    function addTotalPrice(price) {
        let totalPriceProducts = 0;
        if (productInCart == null){
            totalPriceProducts = 0;
            totalPriceElement.textContent = totalPriceProducts;
        } else {
            for (i = 0; i < productInCart.length; i++) {
                totalPriceProducts += parseInt(price * productInCart[i].quantityProduct);
                totalPriceElement.textContent = totalPriceProducts;
            }
        }
        
    }

    

   

    displayProductsContent();
    addTotalPrice();
    addTotalQuantity();
    