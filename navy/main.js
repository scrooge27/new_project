const faker = require("faker")
const express = require("express")
const app = new express()
const PORT = 8000
const fetch = require("node-fetch")
const { response } = require("express")

const field = []
const ships = []
const teams = []

app.get("/signup", ({ query: { n, pwd } }, res) => {
  const team = {
    name: n,
    password: pwd,
    score: 0,
    killedShips: [],
    firedBullets: 0,
    lastFiredBullet: new Date().getTime()
  }
  teams.push(team)
  res.json({ message: "sei registrato, team " + n })
})

const W = process.argv[2] || 4
const H = process.argv[3] || 4
const S = process.argv[4] || 2

const gameStatus = {
  active: true,
  startTime: new Date().getTime(),
  endTime: null
}

for (let y = 0; y < H; y++) {
  const row = []
  for (let x = 0; x < W; x++) {
    row.push({
      team: null,
      x,
      y,
      ship: null,
      hit: false
    })
  }
  field.push(row)
}

let id = 1
for (let i = 0; i < S; i++) {
  const vertical = faker.random.boolean()
  const maxHp = faker.random.number({ min: 1, max: vertical ? H-1 : W-1})
  console.log({ vertical, maxHp })

  const ship = {
    id,
    name: faker.name.firstName(),
    x: faker.random.number({ min: 0, max: vertical ? W - 1 : W - maxHp }),
    y: faker.random.number({ min: 0, max: vertical ? H - maxHp : H - 1 }),
    vertical,
    maxHp,
    curHp: maxHp,
    alive: true,
    killer: null
  }

  let found = false
  for (let e = 0; e < ship.maxHp; e++) {
    const x = ship.vertical ? ship.x : ship.x + e
    const y = ship.vertical ? ship.y + e : ship.y
    if (field[y][x].ship) {
      found = true
      break
    }
  }

  if (!found) {
    for (let e = 0; e < ship.maxHp; e++) {
      const x = ship.vertical ? ship.x : ship.x + e
      const y = ship.vertical ? ship.y + e : ship.y
      field[y][x].ship = ship
    }

    ships.push(ship)
    id ++
  }
}

app.get("/", ({ query: { format } }, res) => {
  const visibleField = field.map(row => row.map(cell => ({
    x: cell.x,
    y: cell.y,
    hit: cell.hit,
    team: cell.team,
    ship: cell.hit ?
      cell.ship ? { id: cell.ship.id, name: cell.ship.name, alive: cell.ship.alive, killer: cell.ship.killer } : null
      : null
  })))

  const visibleShipInfo = ships.map(ship => ({
    id: ship.id,
    name: ship.name,
    alive: ship.alive,
    killer: ship.killer
  }))

  if (format === "json") {
    res.json({
      field: visibleField,
      ships: visibleShipInfo
    })
  } else {
    // html format field
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>battaglia navale</title>
      <style>
        table, td, th {
          border: 1px solid black;
        }
        td {
          width: 40px;
          height: 40px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body>
      <table>
        <tbody>
          ${visibleField.map(row => `<tr>${row.map(cell => `<td>${cell.hit ? cell.ship ? cell.ship.alive ? cell.ship.name : ("f-" + cell.ship.name) : "hit" : "" }</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </body>
    </html>
    `)
  }
})

app.get("/score", (req, res) => {
  res.json([])
})

app.get("/fire", ({ query: { x, y, team, password } }, res) => {
  const t = teams.find(obj => {
    return obj.name === team
  })
  const now = new Date().getTime()
  if (!gameStatus.active) {
    return res.status(400).json({ message: "gioco terminato" })
  } else if (!t) {
    return res.status(401).json({ message: "team non registrato" })
  } else if (t.password !== password) {
    return res.status(401).json({ message: "password errata" })
  } else if (now - t.lastFiredBullet < 1000) {
    return res.status(408).json({ message: "stai tentando di aggirare il trottling della request" })
  }

  t.firedBullets ++
  t.lastFiredBullet = now

  if (field[y]) {
    if (field[y][x]) {
      if (field[y][x].hit) {
        t.score--
      } else {
        field[y][x].hit = true
        field[y][x].team = team
        if (field[y][x].ship) {
          field[y][x].ship.curHp--
          t.score++
          if (field[y][x].ship.curHp === 0) {
            field[y][x].ship.alive = false
            field[y][x].ship.killer = team
            t.score += field[y][x].ship.maxHp
          }
        }
      }
      res.json({
        x,
        y,
        team,
        colpito: field[y][x].hit,
        nave: field[y][x].ship ? field[y][x].ship.name  : null,
        affondata: field[y][x].ship ? (field[y][x].ship.alive ? "no" : "sì") : "nessuna nave",
        punti: t.score
      })
    }     else {
      t.score -= 10
      res.json({
        x,
        y,
        team,
        colpito: null,
        nave: null,
        punti: t.score
      })
    }
  }   else {
    t.score -= 10
    res.json({
      x,
      y,
      team,
      colpito: null,
      nave: null,
      punti: t.score
    })
  }
})

app.get("/play", ({ query: { n, pwd } }, res) => {
  const ms = 1500
  fetch("https://localhost:$PORT/signup?n=$n&pwd=$pwd")
  while (gameStatus.active) {
    const x = faker.random.number({ min: 0, max: 10 })
    const y = faker.random.number({ min: 0, max: 10 })
    fetch("https://localhost:$PORT/fire?x=$x&y=$y&team=$n&password=$pwd")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch( function () {
        console.log("error");
      });
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  }
  const t = teams.find(obj => {
    return obj.name === team
  })
  return res.status(200).json({ punteggio: t.score })

})
app.all("*", (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log("App listening on port %O", PORT))