const express = require('express');
const userModel = require('../models/userModel');
const planModel = require('../models/planModel');
const stripe = require('stripe')(process.env.STRIPE_SECTRE_KEY)

module.exports.createSession = async function createSession(req, res) {
  try {
    const userID = req.id;
    // we need to implement this -> const planID = req.params.id;
    const planID = '655a10202171c7a5fe9a10b2';
    const user = await userModel.findById(userID);
    const plan = await planModel.findById(planID);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price,
          currency: "usd",
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get("host")}/userProfile`,
      cancel_url: `${req.protocol}://${req.get("host")}/userProfile`,
    });
    res.status(200).json({
      status:"success",
      session
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

