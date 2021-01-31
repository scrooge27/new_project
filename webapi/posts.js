const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const router = new express.Router();

const fetch = require('node-fetch');

router.get("/:id", (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/post/${req.params.id}/comments`)
  .then(response => response.json())
  .then(data => {
        res.write(`  
          <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
          <h1>post per id: ${req.params.id}</h1>

          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    `)
        
          data.forEach(j =>res.write(`
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">
                        <strong>Id commento : </strong>${j.id}
                      </div>
                      <div class="col-sm">
                        <strong>Nome utente : </strong>${j.name}
                      </div>
                      <div class="col-sm">
                        <strong>Email utente : </strong>${j.email}
                      </div>
                      <div class="col-sm">
                        <strong>Id post : </strong>${j.postId}
                      </div>
                      <div class="col-sm">
                        <strong>Testo : </strong>${j.body}
                      </div>
                    </div>
                  </div>
                    `))
          res.end()

    })
  
});

module.exports=router;