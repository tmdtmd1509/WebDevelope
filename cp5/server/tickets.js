const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;

//
// Tickets
//

const ticketSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  money: Number,
});

const Ticket = mongoose.model('Ticket', ticketSchema);


router.get('/', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    console.log("get ticket");
    return res.send(tickets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//add tickets
router.post('/', async (req, res) => {
    const tickets = req.body.todos;
    try {
        await Ticket.collection.insert(tickets);
        console.log("add tickets");
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//delete ticket
router.delete('/edit', auth.verifyToken, async (req, res) => {
    try {
    await Ticket.deleteOne({
      _id: req.body._id
    });
    console.log("delete ticket");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//update complete state
router.post('/edit', auth.verifyToken, async (req, res) => {
  try {
  await Ticket.findOneAndUpdate(
    {
    _id: req.body._id
    },
    {
      $set: {completed: !req.body.completed}
    }
  );
  console.log("update ticket");
  return res.sendStatus(200);
} catch (error) {
  console.log(error);
  return res.sendStatus(500);
}
});

module.exports = router;
