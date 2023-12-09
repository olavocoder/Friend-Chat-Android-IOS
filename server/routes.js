const express = require('express')
const app = express()
const stripe = require('stripe')("sk_test_51O1jJCDlIepAe2MgoV5s0MOyPLSX4ikyQtpNwUgmLvZbGckhO6acJ7NWrtx3KdV1WsPGr9FMww7k80FKXCqeLpHz00DxjGTkzl")

//Autorizar receber o body para requisições post
app.use(express.json());

//endpoint principal
app.get('/', async(req, res) => {
    return res.json({message: 'endpoint para api funcionando normalmente'})
})

//endpoint de pagamento com cartão de credito
app.post('/create-payment-intent', async (req, res) =>{
    const {name, email, value} = req.body
    console.log(name, email, value)
    //Solicitacao de criacao de usuario
    const customer = await stripe.customers.create({
      name: name,
      email: email,
      description: 'Descrição padrão'
    })
  
    //Solicitacao de intencao de pagamento
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: value * 100,
      currency: 'brl',
      payment_method: 'pm_card_visa',
      return_url: 'http://localhost:3000',
      automatic_payment_methods: {
        enabled: true
      },
      confirm: true
    })
  
    //Confirmacao de pagamento
    await stripe.paymentIntents.confirm(paymentIntent.id, (ok) => {
        if(ok){
            res.redirect('/')
        }
    })
})

app.listen(3000, ()=>{console.log('api rodando em http://localhost:3000 para pagamentos de servicos')})