const express = require('express')
const app = express()
const port = 3000
const Routers = require('./src/routes/web')

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', './src/Resource/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', Routers);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
