import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import roleRouter from './src/route/role.route';
import accountRouter from './src/route/account.route';
import requestRouter from './src/route/request.route';
import authRoute from "./src/route/auth.route";
import groupRouter from "./src/route/group.route";

dotenv.config()

const app = express();
app.use('/uploads', express.static('uploads'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded())
app.use(cors('*'))
app.use('/account', accountRouter)
app.use('/request', requestRouter)
app.use('/group', groupRouter)
app.use('/role', roleRouter)
app.use('/auth', authRoute)

app.use('*', (req, res) => {
    res.send("404")
})

app.listen(process.env.port,() => {
    console.log(`server start on http://${process.env.host}:${process.env.port}`)
})