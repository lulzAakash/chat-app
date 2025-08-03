const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('path')

const authRoutes = require('../backend/routes/auth_routes')
const messageRoutes = require('./routes/message_routes')
const userRoutes = require('./routes/users_routes')
const {connectdb} = require('../backend/db/connectdb')
const cors = require('cors')
const { app, server } = require('./socket/socket')


__dirname = path.resolve();

connectdb();
app.use(cors())

//Middleware
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
}) 

//Listening Server
server.listen(process.env.PORT, () => {
    console.log('http://localhost:'+ process.env.PORT);
})