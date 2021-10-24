class Utils {

    // Récupération des données de l'API

    static async get(url) {
        try {
            let response = await fetch(url);
            if(response.ok){
                let dataList = await response.json();
                return dataList
            } else {
                console.log(`Réponse du serveur : ${response.status}`);
            }
        }
        catch(e) {
            console.error(e);
        }
    }



    // Envoi des données à l'API

    static async post(content) {
        try {
            let response = await fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(content)
            })
            if(response.ok){
                let dataList = await response.json();
                return dataList;
            } else {
                console.log(`Réponse du serveur : ${response.status}`);
            }
        }
        catch(e) {
            console.error(e);
        }
    }



    // Récupération de l'ID dans l'URL

    static getId(param){
        const pageUrl = new URLSearchParams(window.location.search);
        const productId = pageUrl.get(param);
        return productId;
    }
}