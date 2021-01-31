const express = require("express")
const app = new express
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())


db = require("./database.js")

const fetch = require('node-fetch')

const port=8080

app.post("/login", (req,res)=>{
	us=req.body.username
	pwd=req.body.password
	const sql ='SELECT * FROM users WHERE username = ? AND password = ?'
    const params =[us,pwd]
    db.get(sql, params, (err, result) => {
        if (err || !result){
            res.status(401).json({ok:false})
            console.log("crasha")
            return 
        }
        res.status(200).json({ok:true})
        console.log("Benevenuto " + result.username)
    })
	
})

app.listen(port, () => console.log(`App listening to port ${port}`));