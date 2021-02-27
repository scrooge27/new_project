const express = require("express")
const app = new express
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())


db = require("./dbinit.js")

const fetch = require('node-fetch')

const port=8080
app.get("/accreditamento",(req,res)=>{
    res.json({nome : "Simone",
cognome : "Pucci"})
})

app.post("/citta-attore",(req,res)=>{
    n=req.body.nome
    console.log(n)
    const sql ='SELECT citta FROM ATTORI WHERE nome = ?'
    db.get(sql, n, (err, result) => {
        if (err || !result){
            res.status(401).json({ok:false})
            console.log("crasha")
            return
        }
        res.json(result)
        console.log(result)
    })
})

app.post("/sale",(req,res)=>{
    p=req.body.posti
    c=req.body.citta
    console.log(p,c)
    const sql ='SELECT nome FROM SALE WHERE posti > ? AND citta <> ?'
    db.all(sql, [p,c], (err, result) => {
        if (err || !result){
            res.status(401).json({ok:false})
            console.log("crasha")
            return
        }
        solu=[]
        for (let i=0; i<50; i++){
            solu[i]=result[i].nome
        }
        res.json({sale: solu})
        console.log(solu)
    })
})



app.listen(port, () => console.log(`App listening to port ${port}`));