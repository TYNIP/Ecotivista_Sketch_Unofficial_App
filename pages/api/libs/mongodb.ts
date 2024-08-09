const {USERDB, PWD} = require('../config');
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);


export const connectMongoDB = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://${USERDB}:${PWD}@ecotivista.1gwyc.mongodb.net/?retryWrites=true&w=majority&appName=Ecotivista`);
        console.log('Connected to MongoDB')
    }catch(err){
        console.log('db error',err);
    }
}