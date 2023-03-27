const authRouter = require('./authRoute')
const bookRouter = require('./bookRoute')

const mountRoutes = (app)=>{
    app.use('/api/auth', authRouter)
    app.use('/api/book', bookRouter)
}

module.exports = mountRoutes