const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = JSON.parse(fs.readFileSync('./credentials/credential-firebase.json'))


class firebase {
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
    }

    async agregarPedidos(pedido){
        const db = admin.firestore();
        const query = await db.collection("ventas")
        const agregar = await query.add({
            id: pedido.collection_id,
            estado: pedido.status,
            idProducto: pedido.external_reference,
            metodoPago: pedido.payment_type
        })
    }


    async obtenerProductos(){
        const db = admin.firestore();
        const query = await db.collection("productos")

        let id = 1
        const data = await query.get()
        data.forEach(function(dato){
            console.log(dato.id)
        })
    }

}

module.exports = firebase

