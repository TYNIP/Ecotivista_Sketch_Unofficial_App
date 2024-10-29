import { NextApiRequest, NextApiResponse } from 'next';
import {connectMongoDB} from '../../libs/mongodb';
import cookie from 'cookie';
import {msg} from '../../utils/msg';

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse,
){
    console.log("cerrando sesion")
    try {
        await connectMongoDB()

        console.log("ayuddddddaaaa")

        res.setHeader('Set-Cookie', cookie.serialize('auth_cookie', '', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), 
            path: '/',
        }));
        console.log("clossing session")
        
        res.status(200).json({
            message: msg.success.logout
        });

    } catch (err) {
        res.status(500).json({
            message: msg.error.logOutError
        });
    }
}
