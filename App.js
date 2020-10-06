const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.listen(process.env.PORT || 3000)

app.get('/', (req,res) =>{
    res.render('index')
})