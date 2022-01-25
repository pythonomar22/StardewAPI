const { Router } = require('express')
const Character = require('../models/Character')
const pool = require('../utils/pool.js')

module.exports = Router()
.post('/', async (req, res) => {
  // console.log(req.body)
  const character = await Character.insert({
    name: req.body.name, 
    birthday: req.body.birthday,
    address: req.body.address,
    elligible: req.body.elligible
  })

  res.send(character)
})
.get('/', async (req, res) => {
  const characters = await Character.getAll()
  res.send(characters)
})