const mercadoPago = require('../contenedor/mercadoPago')
const operationMP = require('../contenedor/operationMP')
const paymentInstance = new operationMP( new mercadoPago() );


class serviceController {
    async getPaymentLink(req, res) {
        const linkMP = await paymentInstance.getPaymentLink()
        res.redirect(linkMP)
    }

    async getSubscriptionLink(req, res) {
        const linkMP = await paymentInstance.getSubscriptionLink()
        res.redirect(linkMP)
    }

    async refund(req, res){
        const linkMP = await paymentInstance.refund(13)
        console.log(linkMP)
    }
}

module.exports = new serviceController;