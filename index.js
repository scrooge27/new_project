/* npm install express body-parser
const body-parser=require('body-parser')
app.use(body-parser.json())*/

/* npm init -y
npm install express
touch inde.js*/

const express = require("express")
const app = express()
const fetch = require("node-fetch")
const port = 8000

app.use(express.static("./public"))

const handlebars = require("express-handlebars")

app.set("view engine", "hbs")

app.engine("hbs", handlebars({
  layoutsDir: __dirname + "/views/layouts",
  extname: "hbs",
  defaultLayout: "planB",
  // new configuration parameter
  partialsDir: __dirname + "/views/partials/"
}))


app.get("/page", (req, res) => {
  res.send(html)
})

const mandalista = (el) => {
  el.forEach(e => {
    `<li>${e.id}</li>`
  })
}

const a = "ciao"

app.get("/prova/:id", (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/post/${req.params.id}/comments`)
    .then(response => response.json())
    .then(json => console.log(json))
    .then(response => {
      res.render("learn", {
        layout: "index",
        title: "<h1>ciao</h1>",
        comment: `${req.comment}`,
        email: `${req.email}` 	})
    })
})
/* 	  res.write(`
			  	<head>
			    <meta charset="utf-8">
			    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

			    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
				</head>
			  <body>
			    <h1>Lista dei post</h1>

			    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
			    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
			    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    `)
        data.forEach(i =>res.write(`
								<div class="container">
								  <div class="row">
								    <div class="col-sm">
								      <strong>Id : </strong>${i.id}
								    </div>
								    <div class="col-sm">
								      <strong>User : </strong>${i.userId}
								    </div>
								    <div class="col-sm">
								      <strong>Titolo : </strong>${i.title}
								    </div>
								    <div class="col-sm">
								      <strong>Contenuto : </strong>${i.body}
								    </div>
								  </div>
								</div>
                                `))
        res.end()
    })
  });*/

app.get("/", (req, res) => {
  const i = req.headers["user-agent"]
  if (i.search("Edg") < 0 && (req.query.name === "Simone" || req.query.id === "27" || req.query.sur === "Pucci")) {
    res.render("main", { layout: "index", greeting: "Hello World!", jumbo: "Hi master" })
  }
  if (i.search("Edg") < 0 && (req.query.name !== "Simone" && req.query.id != "27" && req.query.sur != "Pucci")) {
    res.render("main", { layout: "index", greeting: "Hello World!", jumbo: "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information." })
  }   else {
    res.render("main", { layout: "index", greeting: "stai usando Edge, mona!" })
  }

})

app.get("/learn", (req, res) => {
  const i = req.headers["user-agent"]
  if (i.search("Edg") < 0 && (req.query.name === "Simone" || req.query.id === "27" || req.query.sur === "Pucci")) {
    res.render("learn", { layout: "index", typeAl: "alert alert-success", content: "task completed master" })
  }
  if (i.search("Edg") < 0 && (req.query.name != "Simone" && req.query.id != "27" && req.query.sur != "Pucci")) {
    res.render("learn", { layout: "index", typeAl: "alert alert-success", content: "task completed" })
  }   else {
    res.render("learn", { layout: "index", typeAl: "alert alert-danger", content: "mission failed" })
  }

})

app.listen(port, () => console.log(`App listening to port ${port}`))
