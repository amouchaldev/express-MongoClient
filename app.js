const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
let db

MongoClient.connect(url)
.then(client => {
    console.log('Connected to database')
     db = client.db('express')
})
.catch(error=> console.error(error))

app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        const user = req.body 
        const result = await db.collection('users').insertOne(user)
        return res.status(201).json({message: "created successfully"})
    }
    catch (err) {
        console.log("error : ", err)
        throw err
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find({}).toArray()
        return res.json(users)
    }
    catch (err) {
        console.log("error : ", err)
        throw err
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const userId = +req.params.id
        const user = await db.collection('users').find({id: 1}).toArray()
        return res.json(user)
    }
    catch (err) {
        console.log("error : ", err)
        throw err
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const result = await db.collection('users').deleteOne({id})
        return res.json({message: "deleted successfully"})
    }
    catch (err) {
        console.log("error : ", err)
        throw err
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const userNewData = req.body
        // console.log(userNewData)
        // return null
        const result = await db.collection('users').replaceOne({id}, userNewData)
        return res.json({message: "Updated Successfully"})
    }
    catch (err) {
        console.log("error : ", err)
        throw err
    }
})


app.listen(3000, (err) => {
    if (!err) console.log('connected successfully on port 3000')
})