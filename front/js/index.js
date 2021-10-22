async function init() {
    const products = await getProducts();
    coverPage(products);
}
init()


async function getProducts() {
    return Utils.get("http://localhost:3000/api/products");
}

function coverPage(products){
    products.forEach(product => {
        showKanap(product);
    });
}

function showKanap(product){
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