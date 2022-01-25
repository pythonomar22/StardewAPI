const pool = require('../utils/pool.js')

module.exports = class Character {
  id;
  name;
  birthday;
  address;
  elligible;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.birthday = row.birthday;
    this.address = row.address;
    this.elligible = row.elligible;
  }

  static async insert({ name, birthday, address, elligible }) {
    const { rows } = await pool.query(
      'INSERT INTO characters(name, birthday, address, elligible) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, birthday, address, elligible])
    return new Character(rows[0])
  }
}