const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.DB3')

db.serialize( () =>{
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)")

  const stmt = db.prepare("INSERT INTO users (username,password) VALUES (?,?)")
  for (let i = 0; i < 10; i++) {
      stmt.run("User " + (i+1), "User " + (i+1))
  }
  stmt.finalize()

  db.each("SELECT rowid AS id, username, password FROM users", (err, row) => {
      console.log(row.id + ": " + row.username + ", " + row.password)
  })

})

module.exports = db

