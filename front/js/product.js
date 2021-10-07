
let pageUrl = window.location.href;

let splitUrl = pageUrl.split('=')

let newUrl = splitUrl[1]

console.log(newUrl);

fetch(`http://localhost:3000/api/products/${newUrl}`)
    .then(res => res.json())
    .then(data => {

        console.log(typeof data.price);

        const divImg = document.querySelector('.item__img');
        divImg.innerHTML = `
            <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        `
        
        const elementTitle = document.querySelector('#title');
        elementTitle.innerText = data.name;

        const elementPrice = document.querySelector('#price');
        let price = data.price / 100;
        elementPrice.innerText = price;

        const elementDescription = document.querySelector('#description');
        elementDescription.innerText = `${data.description}`;

        const elementColors = document.querySelector('#colors');
        for (i = 0; i < data.colors.length ; i++) {
            let elementOption = document.createElement('option');
            elementOption.setAttribute('value', data.colors[i]);
            elementOption.innerText = data.colors[i];
            elementColors.appendChild(elementOption);
        }
        

        // for (i = 0; i < data.length; i++) {
        //     let kanap = data[i];
        //     let item = document.createElement('div');
        //     // let image = document.createElement = (`<img src="${kanap.imageUrl}" alt="${kanap.altTxt}" width=150px height=150px>`);
        //     item.innerHTML= `
        //         <a href="./product.html?id=${kanap._id}">
        //             <article>
        //             <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
        //             <h3 class="productName">${kanap.name}</h3>
        //             <p class="productDescription">${kanap.description}</p>
        //             </article>
        //         </a>
        //     `;
        //     items.appendChild(item);
        //     console.log(kanap.name);
        // }
    })