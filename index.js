import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connect from "./config/db.js"
import router from "./routes/Allroutes.js"
import paymentRouter from "./routes/payment.js"
import blogRouter from "./routes/Blogs.js"
import adminAuth from "./routes/AdminAuth.js"
import multer from "multer"
import path from "path"

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
app.use(express.json())

//routes

app.use("/users",router)
app.use("/payment",paymentRouter)
app.use("/blogs",blogRouter)
app.use("/admin",adminAuth)


 
const storage = multer.diskStorage({
  destination:
 
"uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const imageUrl = `http://localhost:5000/upload/${req.file.filename}`;

  try {
    // This is just an example, you can replace this with your own logic for converting the image
    // await convertImage(req.file.path);

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
  


// spin up the server

app.listen("5000", () => {
    console.log("server is running on port 5000")
})