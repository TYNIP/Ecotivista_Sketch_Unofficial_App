import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import {msg} from '../../utils/msg';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        res.setHeader('Set-Cookie', cookie.serialize('auth_cookie', '', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), 
            path: '/',
        }));

        res.status(200).json({
            message: msg.success.userLogged
        });
    } catch (err) {
        res.status(500).json({
            message: msg.error.logOutError
        });
    }
}
