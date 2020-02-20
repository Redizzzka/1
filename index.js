const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs'/*это строчка должна равняться строчка в app.engine*/)
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://Alexey:2abss90asJC9@cluster0-uw4n2.mongodb.net/todos', 
        {
            
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Сервер запущен...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()