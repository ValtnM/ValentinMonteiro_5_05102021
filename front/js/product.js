const itemImg = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const button = document.getElementById('addToCart');
const productsArray = [];



class Produits {
    constructor(id, quantity, color){
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}



function init() {
    showProductElement();
    setItemToLocalStorage();
}




// Envoi des produits dans le local storage

function setItemToLocalStorage() {
    button.addEventListener('click', () => {
        const productsInLocalStorage = getItemToLocalStorage();
        const newProduct = new Produits(getProductId(), getProductQuantity(), getProductColor());
        if(colors.value == 0){
            alert('Veuillez choisir une couleur.');
        } else if (quantity.value == 0) {
            alert("Veuillez indiquer la nombre d'articles que vous souhaitez ajouter au panier");
        } else {
            if(productsInLocalStorage == null || productsInLocalStorage.length === 0) {
                productsArray.push(newProduct);
                localStorage.setItem('productInCart', JSON.stringify(productsArray));
            } else {
                for(i = 0; i < productsInLocalStorage.length; i++){
                    if(newProduct.id == productsInLocalStorage[i].id && newProduct.color == productsInLocalStorage[i].color){
                        productsInLocalStorage[i].quantity += newProduct.quantity;
                        break;
                    } else if(i == productsInLocalStorage.length - 1){
                        productsInLocalStorage.push(newProduct);
                        break;
                    } else {
                        continue;
                    }
                }
                localStorage.setItem('productInCart', JSON.stringify(productsInLocalStorage))
            }
            if(quantity.value > 1){
                alert("Vos articles ont bien été ajoutés au panier")
            } else {
                alert("Votre article a bien été ajouté au panier")
            }
        }
    })
}




// Récupération des données du local storage

function getItemToLocalStorage(){
    return JSON.parse(localStorage.getItem('productInCart'));
}




// Récupération de la quantité et de la couleur séléctionnés par l'utilisateur

function getProductQuantity(){
    return parseInt(quantity.value);
}

function getProductColor(){
    return colors.value;
}




// Affichage des information sur le produit

async function showProductElement(){
    const productElements = await getProductElement();
    itemImg.innerHTML = `<img src="${productElements.imageUrl}" alt="${productElements.altTxt}">`
    title.innerText = productElements.name;
    price.innerText = productElements.price;
    description.innerText = productElements.description;
    showProductColors(productElements)
}

function showProductColors(product){
    for (i = 0 ; i < product.colors.length; i++){
        colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
}




// Récupération des données du produit via l'API

async function getProductElement(){
    const productId = getProductId();
    return Utils.get(`http://localhost:3000/api/products/${productId}`)
}




// Récupération de l'URL de la page

function getProductId() {
    return Utils.getId('id');
}



init();