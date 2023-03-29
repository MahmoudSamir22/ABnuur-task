const authRouter = require('./authRoute')
const bookRouter = require('./bookRoute')
const readingListRouter = require('./readingListRoute')

const mountRoutes = (app)=>{
    app.use('/api/auth', authRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/readingList', readingListRouter)
}

module.exports = mountRoutes