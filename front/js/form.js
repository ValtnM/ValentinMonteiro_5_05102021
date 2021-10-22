const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const orderBtn = document.getElementById('order');

const firstNameError = document.getElementById('firstNameErrorMsg');
const lastNameError = document.getElementById('lastNameErrorMsg');
const addressError = document.getElementById('addressErrorMsg');
const cityError = document.getElementById('cityErrorMsg');
const emailError = document.getElementById('emailErrorMsg');
let formValues = { };

const regexTxt = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const regexAddress = /^([0-9]{1,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;
const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;



function init() {
    getFirstName();
    getLastName();
    getAddress();
    getCity();
    getEmail();
    orderValidation();
}




// Validation de la commande

function orderValidation(){
    orderBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const order = regroupOrderData();
        const orderNumber =  await getOrderId(order)
        redirectionToConfirmation(orderNumber);
    })
}




// Redirection vers la page de confirmation

function redirectionToConfirmation(orderNumber){
    document.location.href=`./confirmation.html?orderId=${orderNumber}`;
}




// Récupération du numéro de commande

async function getOrderId(content){
    const response = await sendDataToAPI(content)
    let orderId = response.orderId;
    return orderId;
}




// Envoie des données à l'API

async function sendDataToAPI(content){
    return Utils.post(content);
}




// Regroupement des informations a envoyer à l'API

function regroupOrderData(){
    const orderArray = getProductsId();
    const order = {
        contact: formValues,
        products: orderArray
    }
    return order;
}




// Récupération des IDs des produits du local storage

function getProductsId(){
    const productsArray = getProductsInLocalStorage();
    const productsIdArray = [];
    for(i = 0; i < productsArray.length; i++){
        productsIdArray.push(productsArray[i].id)
    }
    return productsIdArray;
}




// Récupération des données saisies dans le formulaire

function getFirstName(){
    firstName.addEventListener('change',(e) => {
        if(testDataField(firstName, regexTxt, e.target.value)){
            formValues["firstName"] = e.target.value;
        }
    })
    
}

function getLastName(){
    lastName.addEventListener('change',(e) => {
        if(testDataField(lastName, regexTxt, e.target.value)){
            formValues["lastName"] = e.target.value;            
        }
    })
    
}

function getAddress(){
    address.addEventListener('change',(e) => {
        if(testDataField(address, regexAddress, e.target.value)){
            formValues["address"] = e.target.value;
        }
    })
    
}

function getCity(){
    city.addEventListener('change',(e) => {
        if(testDataField(city, regexTxt, e.target.value)){
            formValues["city"] = e.target.value;
        }
    })
    
}

function getEmail(){
    email.addEventListener('change',(e) => {
        if(testDataField(email, regexEmail, e.target.value)){
            formValues["email"] = e.target.value;
        }
    })
    
}




// Test des données saisies

function testDataField(field, regex, value){
    const errorMsg = field.id + 'ErrorMsg';
    const errorMsgElement = document.getElementById(errorMsg);
    if(regex.test(value)) {
        errorMsgElement.innerText = ``;
        return true;
    } else {
        errorMsgElement.innerText = `Le champ n'a pas été rempli correctement`;
        return false;
    }
}


init();