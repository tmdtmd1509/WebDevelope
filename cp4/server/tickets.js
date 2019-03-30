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
//add ticket
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
//delete ticket
router.delete('/:id', auth.verifyToken, async (req, res) => {
    try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//update complete state
router.post('/:id', auth.verifyToken, async (req, res) => {
  try {
  await Ticket.findOneAndUpdate(
    {
    _id: req.params.id
    },
    {
      $set: {completed: !req.body.completed}
    }
  );
  return res.sendStatus(200);
} catch (error) {
  console.log(error);
  return res.sendStatus(500);
}
});




module.exports = router;
