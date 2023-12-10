const express = require('express')
const app = express()
import {STRIPE_API_KEY} from "@env"
const stripe = require('stripe')(STRIPE_API_KEY)

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