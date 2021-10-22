const cartItems = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');



async function init(){
    await showProducts();
    refreshQuantity()
    deleteProduct()
}




// Suppression de produit du panier

function deleteProduct(){
    const deleteProduct = document.querySelectorAll('.deleteItem');
    for(i = 0; i < deleteProduct.length; i++){
        deleteProduct[i].addEventListener('click', (e) => {
            const productsInLocalStorage = getProductsInLocalStorage();
            const parentElement = e.target.closest('article');
            const productId = parentElement.dataset.id;
            const productColor = parentElement.querySelector('.itemColor').innerText;
            parentElement.remove();

            for(i = 0; i < productsInLocalStorage.length; i++){
                if(productsInLocalStorage[i].id == productId && productsInLocalStorage[i].color == productColor){
                    productsInLocalStorage.splice(i,1);
                }
            }
            localStorage.setItem('productInCart', JSON.stringify(productsInLocalStorage));
            showTotal()
        })
    }
    showTotal()
}




// Modification de la quantité des produits

function refreshQuantity(){
    const inputQuantity = document.querySelectorAll('.itemQuantity');
    
    for(i = 0; i < inputQuantity.length; i++){
        inputQuantity[i].addEventListener('change', (e) => {
            const productsInLocalStorage = getProductsInLocalStorage();
            const parentElement = (e.path[4]);
            const productId = parentElement.dataset.id;
            const productColor = parentElement.querySelector('.itemColor').innerText;

            for(i = 0; i < productsInLocalStorage.length; i++){
                if(productsInLocalStorage[i].id == productId && productsInLocalStorage[i].color == productColor){
                    productsInLocalStorage[i].quantity = parseInt(e.target.value);
                }
            }
            
            localStorage.setItem('productInCart', JSON.stringify(productsInLocalStorage));
            showTotal()
        })
    }
    showTotal()
}




// Affichage des différents articles du panier

async function showProducts(){
    
    const productsElements = await getProductElements();
    const productsColor = getProductsColors();
    const productsQuantities = getProductsQuantities();
    for(i = 0; i < productsElements.length; i++){
        cartItems.innerHTML += `
            <article class="cart__item" data-id="${productsElements[i]._id}">
                <div class="cart__item__img">
                    <img src="${productsElements[i].imageUrl}" alt="${productsElements[i].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${productsElements[i].name}</h2>
                        <p class="itemColor">${productsColor[i]}</p>
                        <p class="itemPrice">${productsElements[i].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsQuantities[i]}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `
    }
    showTotal()
}




// Affichage des totaux

async function showTotal(){
    const totalProductsQuantity = getTotalProductsQuantity();
    const totalProductsPrice = await getTotalProductsPrice();
    totalQuantity.innerText = totalProductsQuantity;
    totalPrice.innerText = totalProductsPrice;
}




// Calcul du nombre total d'article dans le panier

function getTotalProductsQuantity(){
    const productsQuantities = getProductsQuantities();
    let totalProductsQuantity = 0;
    for(i = 0; i < productsQuantities.length; i++){
        totalProductsQuantity += parseInt(productsQuantities[i]);
    }
    return totalProductsQuantity;
}




// Calcul du prix total du panier

async function getTotalProductsPrice(){
    const productsQuantities = getProductsQuantities();
    const productsElements = await getProductElements();
    let totalProductsPrice = 0;
    for(i = 0; i < productsElements.length; i++){
        totalProductsPrice += productsQuantities[i] * productsElements[i].price;
        
    }
    // Retourne une promesse avec le prix total du panier
    return totalProductsPrice;
}




// Création d'un tableau avec les couleurs des produits du local storage

function getProductsColors() {
    const products = getProductsInLocalStorage();
    const productsColors = [];
    for(i = 0; i < products.length; i++){
        productsColors.push(products[i].color);
    }
    // Retourne un tableau avec la couleur de chaque produit du local storage.
    return productsColors;
}




// Création d'un tableau avec les quantités des produits du local storage

function getProductsQuantities() {
    const products = getProductsInLocalStorage();
    const productsQuantities = [];
    for(i = 0; i < products.length; i++){
        productsQuantities.push(products[i].quantity);
    }
    // Retourne un tableau avec la quantité de chaque produit du local storage
    return productsQuantities;
}




// Récupération via l'API des informations des produits du local storage

async function getProductElements(){
    const products = getProductsInLocalStorage()
    const productsId = getProductsId(products);
    
    const productsElements = [];
    for(i = 0; i < products.length; i++){
        const productElements = await getProductsInAPI(productsId[i]);
        productsElements.push(productElements);
    }
    // Retourne une promesse d'un tableau avec les informations des produits du local storage
    return productsElements
}




// Création d'un tableau contenant les IDs des produits du local storage

function getProductsId(products){
    const productsId = [];
    for(i = 0; i < products.length; i++){
        productsId.push(products[i].id);
    }
    // Retourne un tableau avec les IDs des produits du tableau passé en paramètre
    return productsId;
}




// Récupération des données du local storage

function getProductsInLocalStorage(){
    // Retourne une tableau avec les éléments du local storage
    return JSON.parse(localStorage.getItem('productInCart'));
}




// Récupération des données via l'API

function getProductsInAPI(id){
    // Retourne une promesse avec le produits de l'API
    return Utils.get(`http://localhost:3000/api/products/${id}`)
}


 init()

