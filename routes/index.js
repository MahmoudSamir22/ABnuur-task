const authRouter = require('./authRoute')

const mountRoutes = (app)=>{
    app.use('/api/auth', authRouter)
}

module.exports = mountRoutes