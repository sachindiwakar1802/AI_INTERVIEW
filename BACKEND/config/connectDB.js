import mongoose from "mongoose"

const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DataBase Connected")
  }
  catch(error){
    console.log(`DataBase Error ${error}`)
  }
}

export default connectDB