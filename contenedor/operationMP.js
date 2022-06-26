class operationMP{
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async getPaymentLink(req, res) {
        try {
            const payment = await this.subscriptionService.createPayment();
            return payment.init_point
        } catch (error) {
            console.log(error);
        }
    }

    async getSubscriptionLink() {
        try {
            const subscription = await this.subscriptionService.createSubscription();
            return subscription.init_point;
        } catch (error) {
            console.log(error);
        }
    }

    async refund(id){
        try {
            const refund = await this.subscriptionService.refund(id);
            return refund
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = operationMP;