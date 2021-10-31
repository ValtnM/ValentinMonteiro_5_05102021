async function showApiProducts() {
    const products = await getProducts();
    showProducts(products);
}



// Affichage de tous les produits de l'API
function showProducts(products){
    products.forEach(product => {
        addProductElement(product);
    });
}



// Affichage sur la page du produit en paramètre
function addProductElement(product){
    const items = document.getElementById('items');
    items.innerHTML += `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>
    `
}



// Récupération des produits sur l'API
async function getProducts() {
    return Utils.get("http://localhost:3000/api/products");
}


showApiProducts();