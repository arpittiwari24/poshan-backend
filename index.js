import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connect from "./config/db.js"
import router from "./routes/Allroutes.js"
import paymentRouter from "./routes/payment.js"
import blogRouter from "./routes/Blogs.js"
import adminAuth from "./routes/AdminAuth.js"
import passport from "passport"

//configuration

const app = express()
config({
    path: "./.env"
})

connect()

//middleware

app.use(cookieParser())
app.use(cors({
    origin: ["https://poshan-admin.vercel.app","https://poshan.in","http://localhost:5173"],
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

//routes

app.use("/users",router)
app.use("/payment",paymentRouter)
app.use("/blogs",blogRouter)
app.use("/admin",adminAuth)


// spin up the server

app.listen("5000", () => {
    console.log("server is running on port 5000")
})