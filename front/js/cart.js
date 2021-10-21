const cartItems = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');





async function init(){
    showTotal()
    await refreshQuantity();
    deleteProduct();
}




// Suppression de produit du panier

async function deleteProduct(){
    const productsInLocalStorage = getProductsInLocalStorage();
    const deleteProduct = document.querySelectorAll('.deleteItem');
    for(i = 0; i < deleteProduct.length; i++){
        deleteProduct[i].addEventListener('click', (e) => {
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
}




// Modification de la quantité des produits

async function refreshQuantity(){
    await showProducts();
    const inputQuantity = document.querySelectorAll('.itemQuantity');
    const productsInLocalStorage = getProductsInLocalStorage();
    
    
    for(i = 0; i < inputQuantity.length; i++){
        inputQuantity[i].addEventListener('change', (e) => {
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
    
}




// Affichage des totaux

async function showTotal(){
    const totalProductsQuantity = await getTotalProductsQuantity();
    const totalProductsPrice = await getTotalProductsPrice();
    console.log(totalProductsPrice);
    totalQuantity.innerText = totalProductsQuantity;
    totalPrice.innerText = totalProductsPrice;
}




// Calcul du nombre total d'article dans le panier

async function getTotalProductsQuantity(){
    const productsQuantities = await getProductsQuantities();
    let totalProductsQuantity = 0;
    for(i = 0; i < productsQuantities.length; i++){
        totalProductsQuantity += parseInt(productsQuantities[i]);
    }
    return totalProductsQuantity;
}




// Calcul du prix total du panier

async function getTotalProductsPrice(){
    const productsQuantities = await getProductsQuantities();
    const productsElements = await getProductElements();
    let totalProductsPrice = 0;
    for(i = 0; i < productsElements.length; i++){
        totalProductsPrice += productsQuantities[i] * productsElements[i].price;
        
    }
    return totalProductsPrice;
}




// Création d'un tableau avec les couleurs des produits du local storage

function getProductsColors() {
    const products = getProductsInLocalStorage();
    const productsColors = [];
    for(i = 0; i < products.length; i++){
        productsColors.push(products[i].color);
    }
    return productsColors;
}




// Création d'un tableau avec les quantités des produits du local storage

function getProductsQuantities() {
    const products = getProductsInLocalStorage();
    const productsQuantities = [];
    for(i = 0; i < products.length; i++){
        productsQuantities.push(products[i].quantity);
    }
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

    return productsElements
}




// Création d'un tableau contenant les IDs des produits du local storage

function getProductsId(products){
    const productsId = [];
    for(i = 0; i < products.length; i++){
        productsId.push(products[i].id);
    }
    return productsId;
}




// Récupération des données du local storage

function getProductsInLocalStorage(){
    return JSON.parse(localStorage.getItem('productInCart'));
}




// Récupération des données via l'API

async function getProductsInAPI(id){
    return Utils.get(`http://localhost:3000/api/products/${id}`)
}


 init()

