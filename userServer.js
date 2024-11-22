const express = require('express')
const app = express()
const mongoose = require('mongoose')
// middlewares
app.use(express.static('studView'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//connection
mongoose.connect("mongodb://0.0.0.0:27017/23MCA")
//Checking Connection string
const conn = mongoose.connection
conn.on('connected',()=>{
    console.log('MongoDB Connected')
})
// Creating Schema
const userSchema = mongoose.Schema({
    userID:String,
    pass:String,
    role:String
})
// Create Model
const users = mongoose.model('users',userSchema)


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/studView/login.html')
})

// API :View Data
app.get('/api/users',(req,res)=>{
    users.find().then((data)=>{
        res.json(data)
    })
})

//API: Insert Data
app.post('/api/addUsers',(req,res)=>{
    users.create({
        userID:req.body.txtuid,
        pass:req.body.txtpwd,
        role:req.body.txtrole
    }).then(()=>{
        res.json({message:'User Added'})
    })
})

//API : delete data
app.delete('/api/deleteUser/:id',(req,res)=>{
    let id = req.params.id
    users.deleteOne({userID:id}).then((err,data)=>{
        res.json({message:`User ${id} deleted`})
    })
})

//API : update data
app.put('/api/updateUser/:id',(req,res)=>{
    let id = req.params.id
    let upUser = req.body
    users.updateOne({userID:id},upUser).then((data)=>{
        res.json({message:`User ${id} edited`})
    })
})

app.listen(1010,()=>{
    console.log("Server is running on the port 1010")
    console.log("http://localhost:1010")
})