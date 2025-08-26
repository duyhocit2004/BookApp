const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');

const Routers = require('./src/routes/web')

const database = require('./src/config/db')

app.use(express.static('./src/public'))

app.set('view engine', 'ejs');
app.set('views', './src/Resource/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser());

app.use('/', Routers);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(database)
})
