import mongoose from "mongoose";
import colors from "colors"


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to momgoDB databse ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`error in DB ${error}`);
        
    }
}

export default  connectDB;