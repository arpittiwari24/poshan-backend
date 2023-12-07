import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connect from "./config/db.js"
import router from "./routes/Allroutes.js"
import paymentRouter from "./routes/payment.js"

//configuration

const app = express()
config({
    path: "./.env"
})

connect()

//middleware

app.use(cookieParser())
app.use(cors({
    origin: "https://poshan.in",
    credentials: true
}))
app.use(express.json())

//routes

app.use("/users",router)
app.use("/payment",paymentRouter)


// spin up the server

app.listen("5000", () => {
    console.log("server is running on port 5000")
})