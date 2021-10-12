
let pageUrl = window.location.href;
let splitUrl = pageUrl.split('=');
let newUrl = splitUrl[1];
const divImg = document.querySelector('.item__img');
const elementTitle = document.querySelector('#title');
const elementPrice = document.querySelector('#price');
const elementDescription = document.querySelector('#description');
const elementColors = document.querySelector('#colors');
const inputQuantity = document.querySelector('#quantity');
const addButton = document.querySelector('#addToCart');


// Insertion de l'image du produit
function insertImageProduct (data) {
    divImg.innerHTML = `
        <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        `
}

// Insertion du titre du produit
function insertTitleProduct(data) {
    elementTitle.innerText = data.name;
}

// Insertion du prix du produit
function insertPriceProduct(data) {
    elementPrice.innerText = data.price;
}

// Insertion de la description du produit
function insertDescriptionProduct(data) {
    elementDescription.innerText = `${data.description}`;
}

// Insertion des couleurs du produit
function insertColorsProduct(data) {
    for (i = 0; i < data.colors.length ; i++) {
        let elementOption = document.createElement('option');
        elementOption.setAttribute('value', data.colors[i]);
        elementOption.innerText = data.colors[i];
        elementColors.appendChild(elementOption);
    }
}


// Stockage des informations du produit dans le local storage
function addProductToLocalStorage(data) {
    class CartProduct {
        constructor (idProduct, colorProduct, quantityProduct) {
            this.idProduct = idProduct;
            this.colorProduct = colorProduct
            this.quantityProduct = quantityProduct;
        }

    }

    
    let addToCartProduct = [];

    addButton.addEventListener('click', () => {

        if (!elementColors.value) {
            console.log('couleur non défini');
        } else {
            let productInLocalStorage = JSON.parse(localStorage.getItem('productInCart'));
            addToCartProduct.push(new CartProduct(newUrl, elementColors.value, inputQuantity.value));

            if (productInLocalStorage == null) {
                productInLocalStorage = addToCartProduct;
            } else {
                for (element in productInLocalStorage) {
                    if (productInLocalStorage[element].idProduct === newUrl && productInLocalStorage[element].colorProduct === elementColors.value ){
                        productInLocalStorage[element].quantityProduct = parseInt(productInLocalStorage[element].quantityProduct) + parseInt(addToCartProduct[0].quantityProduct, 10);
                        break;
                    } else if(element != productInLocalStorage.length - 1) {
                        continue;
                    } else {
                        productInLocalStorage.push(addToCartProduct[0])
                    }
                    
                }
            }

            addToCartProduct = [];

            localStorage.setItem('productInCart', JSON.stringify(productInLocalStorage))
        }
        
    })
}

fetch(`http://localhost:3000/api/products/${newUrl}`)
    .then(res => res.json())
    .then(data => {

        insertImageProduct(data)
        insertTitleProduct(data)
        insertPriceProduct(data)
        insertDescriptionProduct(data)
        insertColorsProduct(data)
        addProductToLocalStorage(data)
        
    })