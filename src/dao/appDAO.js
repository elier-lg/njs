const sqllite3 = require('sqlite3')
const Promise = require('bluebird')

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqllite3.Database(dbFilePath, err => {
      if (err)
        console.log('Could not connect db', err)
      else
        console.log('Connected to db')
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID, obj: this })
        }
      })
    })
  }

  runBulk(sql, params = []) {
    return new Promise((resolve, reject) => {
      
      let statement = this.db.prepare(sql)
      for (var i = 0; i < params.length; i++)
        statement.run(params[i], function (err) {
          if (err)
            reject(err)
        });

      statement.finalize();
      resolve({ id: this.lastID, obj: this })
    })
  }


  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

}

module.exports = AppDAO