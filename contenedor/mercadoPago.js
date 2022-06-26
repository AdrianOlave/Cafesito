const axios = require("axios");

class mercadoPago {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_20799162@testuser.com",
      items: [
        {
          title: "Dummy Title",
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 10
        }
      ],
      back_urls: {
        failure: "/localhost:5050/response/failure",
        pending: "/localhost:5050/response/pending",
        success: "/localhost:5050/response/success"
      },
      payment_methods:{
        "excluded_payment_methods": [
            {
                "id": "master"
            }
        ],
        "excluded_payment_types": [
            {
                "id": "ticket"
            }
        ],
        "installments": 1
      },
      external_reference: 1
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_20799162@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }

  async refund(id){
    let idPago = id;
    const url = `https://api.mercadopago.com/v1/payments/${idPago}/refunds`;
    const envioReembolso = await axios.post(url,{
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    })
    return envioReembolso.data;

  }


  async obtenerPago(){
      const url = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=5730';
      const envioReembolso = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
    })
    return envioReembolso.data
  }
};

module.exports = mercadoPago;