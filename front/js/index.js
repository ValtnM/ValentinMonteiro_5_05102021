async function init() {
    const products = await getProducts();
    console.log(products);
    coverPage(products);
}
init()


async function getProducts() {
    return fetch("http://localhost:3000/api/products")
        .then(res => {
            if (res.ok) {
                return res.json();
            }

        })
        .catch(err => {
            console.log(err);
        })
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