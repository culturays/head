import {google} from 'googleapis'
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req,res){

    if(req.method !== "POST"){
        return res.status(405).send({ message: 'Only Posts'})
    }
    const resp = await req.json() 
try{
const auth = new google.auth.GoogleAuth( {
    credentials:{
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes:[
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.file',
'https://www.googleapis.com/auth/spreadsheets', 
    ]
})  
const sheets= google.sheets({
    auth,
    version: 'v4'
})

const response =await sheets.spreadsheets.values.append({
    spreadsheetId:process.env.SPREADSHEET_CONTACT_ID,
    range:'A1:B1',
    valueInputOption: 'USER_ENTERED',
    requestBody:{
        values:  [
            [resp.name, resp.email, resp.message]
        ],
    }
})

return NextResponse.json({ message: response}, {status:200}) 

}catch(err){
console.log(err )
return NextResponse.json({ message: err.message }, {status:500})

}
}

