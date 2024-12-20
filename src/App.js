import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
configDotenv()

import DBConfig from "./DataBase/DBConfig.js"

import UserRoute from "./Routes/UserRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"

const PORT = process.env.API_PORT
const HOST = process.env.API_HOST

const app = express()
const cursor = new DBConfig().cursor

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello Mother",
        ips: req.ip,
        valid_db_connection: cursor.authorized
    })
})

app.use("/user", new UserRoute(cursor).routes)
app.use("/message", new MessageRoute(cursor).routes)


app.listen(PORT, HOST, () => {
    console.log(`Server on: http://${HOST}:${PORT}`)
})
