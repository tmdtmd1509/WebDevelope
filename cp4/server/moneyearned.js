const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

//
// Tickets
//

const ticketSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  money: Number,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

const auth = require("./auth.js");

router.get('/', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    return res.send(tickets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const ticket = new Ticket({
    text: req.body.text,
    completed: req.body.completed,
    money: req.body.money,
  });
  try {
    await ticket.save();
    return res.send(ticket);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});