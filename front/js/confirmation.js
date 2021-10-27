const orderIdElement = document.getElementById('orderId');


// Vider le panier
function cleanCart(){
    localStorage.removeItem('productInCart');
}


// Affichage du numéro de commande
function displayOrderId() {
    const orderId = getOrderId();
    orderIdElement.innerText = orderId;
}



// Récupération du numéro de commande dans l'URL
function getOrderId() {
    return Utils.getId('orderId');
}


displayOrderId();
cleanCart();