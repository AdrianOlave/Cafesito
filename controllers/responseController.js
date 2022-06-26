const firebase = require('../contenedor/firebase')
const mercadoPago = require('../contenedor/mercadoPago')
const operationMP = require('../contenedor/operationMP')
const paymentInstance = new operationMP( new mercadoPago() );

class responseController {
    async approved(req, res) {
        console.log( typeof(req.query.status))
        if(req.query.status == 'approved'){
            const connectionFirebase = new firebase
            await connectionFirebase.agregarPedidos(req.query)
            res.redirect(`/response/successfulPayment/${req.query.collection_id}`);
        } else {
            res.send('crearPagina ')
        }
    }

    successfulPayment(req, res){
        res.render('pagoRealizado', {idCompra: req.params.id})
    }

    async pending(req, res) {
        if(req.query.status == 'in_process'){
            const connectionFirebase = new firebase
            await connectionFirebase.agregarPedidos(req.query)
            await paymentInstance.refund(req.query.collection_id)
            res.redirect(`/response/pendingPayment/${req.query.collection_id}`);
        } else {
            res.send('crearPagina ')
        }
    }

    pendingPayment(req, res){
        res.render('pagoPendiente', {idCompra: req.params.id})
    }

    async failure(req, res) {
        if(req.query.status == 'rejected'){
            const connectionFirebase = new firebase
            await connectionFirebase.agregarPedidos(req.query)
            await paymentInstance.refund(req.query.collection_id)
            res.redirect(`/response/failurePayment/${req.query.collection_id}`);
        } else {
            res.send('crearPagina ')
        }
    }

    failurePayment(req, res){
        res.render("pagoRechazado")
    }


}

module.exports = new responseController