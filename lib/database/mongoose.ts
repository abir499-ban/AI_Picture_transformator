import mongoose,{Mongoose} from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

interface DatabaseConnection{
    conn: Mongoose | null;
    promise : Promise<Mongoose> | null;
}

let cached : DatabaseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {
        conn:null, promise:null
    }
}

export const connectTOMogoDB = async()=>{
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) throw new Error('Mongo DB url missing');
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName:"PixAI",
        bufferCommands:false
    })

    cached.conn = await cached.promise;
    console.log("Mongo DB connected");
    return cached.conn;

}

