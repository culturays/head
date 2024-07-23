import { MongoClient } from 'mongodb'; 
import { NextResponse } from 'next/server';
const MONGOKEY = process.env.MONGODB_;
 
export async function GET(request) {
    await new Promise((resolve)=> {
        setTimeout(()=>{
      resolve(true)
        },5000)
       })
    // const client = await MongoClient.connect(
    //     `mongodb+srv://teech:${MONGOKEY}@cluster0.pmxgu.mongodb.net/peopledb?retryWrites=true&w=majority` );
    //     const db = client.db(); 
    //     const bdaydb = await db.collection('bd').find({} ).toArray();
        
    //     client.close(); 
    
    // return NextResponse.json({ message: "Done" , error:"Action Failed", bdaydb:bdaydb}, { status: 200 });
    return NextResponse.json({ message: "Hello World" })
  }