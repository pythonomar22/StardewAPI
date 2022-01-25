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

  it('creates a character', async() => {
    const testChar = {
      "name": "TestName",
      "birthday": "Test 66",
      "address": "666 Satan Road",
      "elligible": "true",
      "img": "https://blessthismess.com/img/666777888999.png"
    }

    const res = await request(app)
      .post('/api/v1/characters')
      .send(testChar)

      expect(res.body).toEqual({...testChar, id: '1'})
  })
});
