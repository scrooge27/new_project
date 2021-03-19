const express = require("express")
const app = new express()
const PORT = 8000

const field = []
const ships = []

const W = 10// process.argv[2] || 10   //process.argv[n] restituisce il valore inserito
const H = 10// process.argv[3] || 10  //da linea di comando alla posizione n
const S = 2// process.argv[4] || 10 // numero di navi

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

for (let i = 0; i < S; i++) {
  let counter = 0
  let xcoor = 0
  let ycoor = 0
  let hp = 0
  let direction = true
  do {
    xcoor = Math.floor(Math.random() * W)
    ycoor = Math.floor(Math.random() * H)
    direction = Math.random() < 0.5
    hp = direction ? Math.floor(Math.random() * 2 * H) + 1 : Math.floor(Math.random() * 2 * W) + 1
    counter += 1
    console.log("counter " + counter)
  } while (counter < 10 && direction ? ycoor + hp > H : xcoor + hp > W)
  if (counter >= 10) {
    if (direction) {
      hp = H - ycoor
    } else {
      hp = W - xcoor
    }
  }
  const ship = {
    id: "nave " + i,
    x: xcoor,
    y: ycoor,
    vertical: direction,
    maxHp: hp,
    curHp: hp,
    alive: true,
    killTeam: null
  }

  ships.push(ship)
  console.log("lunghezza " + ship.maxHp, " x " + ship.x, " y " + ship.y)

  for (let e = 0; e < ship.maxHp; e++) {
    const x = ship.vertical ? ship.x : ship.x + e
    const y = ship.vertical ? ship.y + e : ship.y
    field[y][x].ship = ship
  }

}


app.get("/", ({ query: { format } }, res) => {
  if (format === "json") {
    res.json(field)
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
          width: 100px;
          height: 100px;
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
          ${field.map(row => `<tr>${row.map(cell => `<td>${cell.ship ? cell.ship.id : ""}</td>`).join("")}</tr>`).join("")}
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

app.get("/fire", ({ query: { x, y, team } }, res) => {
  res.json({
    x, y, team
  })
})

app.all("*", (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log("App listening on port %O", PORT))