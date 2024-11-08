import express from "express"
import { configDotenv } from "dotenv"
configDotenv()

const PORT = process.env.API_PORT
const HOST = process.env.API_HOST

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hellow motherr",
        ips: req.ip
    })
})


app.listen(PORT, HOST, () => {
    console.log(`Server on: http://${HOST}:${PORT}`)
})
