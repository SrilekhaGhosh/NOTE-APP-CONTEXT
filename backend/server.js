import express from "express"
import dotenv from "dotenv/config"
import { dbConnect } from "./src/config/dbConnect.js"
import userRoute from "./src/routes/userRoute.js"
import todoRoute from "./src/routes/todoRoute.js"
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const port = process.env.PORT || 7001

app.use(express.json())
app.use(cors());

// Serve static files for profile uploads
app.use("/upload", express.static(path.join(__dirname, "src/upload")))

app.use("/user", userRoute)
app.use("/todo", todoRoute)

dbConnect()

app.listen(port, () => {
    console.log(`Server is Running at port ${port}`)
})