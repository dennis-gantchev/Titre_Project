import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import roleRouter from './src/route/role.route';
import accountRouter from './src/route/account.route';
import requestRouter from './src/route/request.route';
import authRoute from "./src/route/auth.route";

dotenv.config()

const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cors('*'))
app.use('/role', roleRouter)
app.use('/account', accountRouter)
app.use('/request', requestRouter)
app.use('/auth', authRoute)


app.listen(process.env.port,() => {
    console.log(`server start on http://${process.env.host}:${process.env.port}`)
})