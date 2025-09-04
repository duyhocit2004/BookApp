const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config()

const authMiddleware = require('./src/middlewares/auth');


app.use(methodOverride('_method'));

const Routers = require('./src/routes/web')
const RouterAdmin = require('./src/routes/admin')
const database = require('./src/config/db')

app.use(express.static('./src/public'))
app.use(express.static('./src/Resource/js'))

app.set('view engine', 'ejs');
app.set('views', './src/Resource/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser());

app.use(session({
    secret: process.env.ACCESS_TOKEN_SESSION,
    resave:false,// không lưu lại session nếu không thay đổi
    saveUninitialized:true, //lưu session mới ngay cả khi chưa có dữ liệu
    cookie:{maxAge: 1000 * 60 * 15} // lưu 15p
}))

app.use('/', Routers);
app.use('/admin',authMiddleware,RouterAdmin);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(database)
})
