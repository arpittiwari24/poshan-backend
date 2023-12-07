import mongoose from "mongoose";

export default async function connect() {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Users"
    }).then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err)
    })
}