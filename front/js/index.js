
let items = document.querySelector('#items');

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            let kanap = data[i];
            let item = document.createElement('div');
            // let image = document.createElement = (`<img src="${kanap.imageUrl}" alt="${kanap.altTxt}" width=150px height=150px>`);
            item.innerHTML= `
                <a href="./product.html?id=${kanap._id}">
                    <article>
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                    </article>
                </a>
            `;
            items.appendChild(item);
            console.log(kanap.name);
        }
    })