class PersonRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Person (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phone TEXT, 
      email TEXT,
      isNotificationEnabled INTEGER DEFAULT 1,
      active INTEGER DEFAULT 1)`
    return this.dao.run(sql)
  }

  create({ firstName, lastName, phone, email, isNotificationEnabled, active }) {
    return this.dao.run(
      `INSERT INTO person (firstName, lastName, phone, email, isNotificationEnabled, active)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, phone, email, isNotificationEnabled, active])
  }

  update({ id, firstName, lastName, phone, email, isNotificationEnabled, active }) {
    return this.dao.run(
      `UPDATE person SET 
        firstName = ?, 
        lastName = ?,
        phone = ?,
        email = ?,
        isNotificationEnabled = ?,
        active = ?
        where id = ?`,
      [firstName, lastName, phone, email, isNotificationEnabled, active, id])
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM person WHERE id = ?`,
      [id]
    )
  }

  getAll() {
    return this.dao.all(`SELECT * FROM person`)
  }

  findByName(name) {
    return this.dao.all(`SELECT * FROM person WHERE 
      firstName like '%' || ? || '%'
      or
      lastName like '%' || ? || '%'`,
      [name, name])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM person WHERE id = ?`,
      [id])
  }
}

module.exports = PersonRepository;
