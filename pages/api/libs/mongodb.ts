const {USERDB, PWD} = require('../config');
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);


export const connectMongoDB = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://${USERDB}:${PWD}@ecotivista.yurzg.mongodb.net/?retryWrites=true&w=majority&appName=ECOTIVISTA`);
    }catch(err){
        console.error('db error',err);
    }
}