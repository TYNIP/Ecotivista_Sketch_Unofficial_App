/* CHECK */
import {connectMongoDB} from '../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import {msg} from '../utils/msg';
import User from '../models/User';

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse, 
){
    try {
        await connectMongoDB();
        const users = await User.find();
        const info = users.map(user => user.email);

        res.status(200).json({users});
        
    } catch (err) {
        return res.status(500).json({
            message: msg.error.default,
        })
    }
}