const { Router } = require('express')
const Character = require('../models/Character')
const pool = require('../utils/pool.js')

module.exports = Router()
  .post('/characters/', async (req, res) => {
    // console.log(req.body)
    const character = await Character.insert({
      name: req.body.name, 
      birthday: req.body.birthday,
      address: req.body.address,
      elligible: req.body.elligible,
      img: req.body.img
    })

    res.send(character)
  })

  .get('/characters/:id', async (req, res) => {
    const { id } = req.params
    const character = await Character.getById(id)
    res.send(character)
  })

  .get('/characters', async (req, res) => {
    const characters = await Character.getAll()
    res.send(characters)
  })

  .patch('characters/:id', async (req, res) => {
    try {
      const { id } = req.params
      const { name, birthday, address, elligible, img } = req.body
      const character = await Character.updateById(id, { name, birthday, address, elligible, img })
      res.send(character)
    } catch(error) {
      next(error)
    }
  })

  .delete('characters/:id', async (req, res) => {
    const { id } = req.params
    const character = await Character.deleteById(id)
    res.send(character)
  })