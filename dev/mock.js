const express = require('express')
const path = require('path')
const multer = require('multer');
const upload = multer()
const fs = require('fs')

const app = express();

app.use(express.json())

app.get('/api/users/:uid/image', (req, res) => {
    res.sendFile(path.join(__dirname, '/images/', req.params.uid + ".png"))
})

app.post('/api/users/:uid/image', upload.fields([{name: 'upload', maxCount: 1}]), (req, res) => {
    console.log(req.files.upload[0].originalname.split('.')[1])
    fs.writeFileSync(path.join(__dirname, "/images/" , req.params.uid + "." + req.files.upload[0].originalname.split('.')[1]), Buffer.from(req.files.upload[0].buffer), {flag:'w'})
    res.status(200)
    res.send()
})

app.get('/', (req, res) => {
    
})

app.get('/', (req, res) => {
    
})

app.get('/', (req, res) => {
    
})

app.get('/', (req, res) => {
    
})

app.listen(8000);