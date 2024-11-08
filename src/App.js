import express from "express"
import { configDotenv } from "dotenv"
configDotenv()

import DBConfig from "./DataBase/DBConfig.js"

import UserRoute from "./Routes/UserRoute.js"

const PORT = process.env.API_PORT
const HOST = process.env.API_HOST

const app = express()
const cursor = new DBConfig().cursor

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hellow motherr",
        ips: req.ip,
        valid: cursor.authorized
    })
})

app.use("/user", new UserRoute(cursor).routes)


app.listen(PORT, HOST, () => {
    console.log(`Server on: http://${HOST}:${PORT}`)
})
