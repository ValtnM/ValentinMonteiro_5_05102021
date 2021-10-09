
let pageUrl = window.location.href;
let splitUrl = pageUrl.split('=');
let newUrl = splitUrl[1];


fetch(`http://localhost:3000/api/products/${newUrl}`)
    .then(res => res.json())
    .then(data => {

        // Insertion de l'image du produit
        const divImg = document.querySelector('.item__img');
        divImg.innerHTML = `
            <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        `
        
        // Insertion du titre du produit
        const elementTitle = document.querySelector('#title');
        elementTitle.innerText = data.name;


        // Insertion du prix du produit
        const elementPrice = document.querySelector('#price');
        elementPrice.innerText = data.price;


        // Insertion de la description du produit
        const elementDescription = document.querySelector('#description');
        elementDescription.innerText = `${data.description}`;


        // Insertion des couleurs du produit
        const elementColors = document.querySelector('#colors');
        for (i = 0; i < data.colors.length ; i++) {
            let elementOption = document.createElement('option');
            elementOption.setAttribute('value', data.colors[i]);
            elementOption.innerText = data.colors[i];
            elementColors.appendChild(elementOption);
        }


        // Stockage des informations du produit dans le local storage
        const inputQuantity = document.querySelector('#quantity');
        const addButton = document.querySelector('#addToCart');
        
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
    })