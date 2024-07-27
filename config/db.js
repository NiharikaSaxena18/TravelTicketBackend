
import mongoose from "mongoose" ;


export const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://webkriti:abviiitm@cluster0.5dyr4fa.mongodb.net/travel-ticket').then(()=>console.log("DB connected"))
}