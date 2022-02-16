import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.listen(process.env.port,() => {
    console.log(`server start on http://${process.env.host}:${process.env.port}`)
})