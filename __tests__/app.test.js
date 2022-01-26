const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/models/Character.js');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  const testChar1 = {
      "name": "The Dark Lord",
      "birthday": "Winter 6",
      "address": "666 Highway to Hell",
      "elligible": "very",
      "img": "https://darklord.com/img/666.png"
    }

  const testChar2 = {
    "name": "Assistant to the Dark Lord",
    "birthday": "Summer 7",
    "address": "777 Light Ln.",
    "elligible": "false",
    "img": "https://darklord.com/img/777.png"
  }

  const testChar3 = {
    "name": "Assistant to the Regional Dark Lord Assistant",
    "birthday": "Fall 4",
    "address": "777 Light Ln.",
    "elligible": "true",
    "img": "https://darklord.com/img/333.png"
  }

  const testArr = [{...testChar1, id: '1'}, {...testChar2, id: '2'}, {...testChar3, id: '3'}]

  it('creates a character', async() => {
    const res = await request(app)
      .post('/api/v1/characters')
      .send(testChar1)

      expect(res.body).toEqual({...testChar1, id: '1'})

      await Character.deleteById(res.body.id)
  })

  it('gets one character by ID', async() => {
    const char = await Character.insert(testChar1)

    const res = await request(app)
    .get(`/api/v1/characters/${char.id}`)

    expect(res.body).toEqual({...testChar1, id: '1'})

    await Character.deleteById(char.id)
  })

  it('gets all characters', async() => {
    await Character.insert(testChar1)
    await Character.insert(testChar2)
    await Character.insert(testChar3)

    const res = await request(app)
    .get(`/api/v1/characters`)

    expect(res.body).toEqual(testArr)
  })

  // it.only('updates a character', async() => {
  //   const char = await Character.insert(testChar1)
  //   const res = await request(app)
  //   .patch(`/api/v1/characters/${char.id}`)

  //   expect(res.body).toEqual([{...testChar1, id: '1'}, {...testChar2, id: '2'}, {...testChar3, id: '3'}])
  // })
});
