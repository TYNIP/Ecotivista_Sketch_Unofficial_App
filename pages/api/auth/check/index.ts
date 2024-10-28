/* CHECK */
import {connectMongoDB} from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import {msg} from '../../utils/msg';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
const {SECRET} = require('../../config')


export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse, 
){
    try {

        const token = req.headers.token as string | undefined;
        if(!token) {
            return res.status(400).json({
                message: msg.error.notAuthorized,
            })
        };

        try{
            const isTokenValid = jwt.verify(token, SECRET);
            //@ts-ignore
            const {data} = isTokenValid;
            await connectMongoDB();
            const userFind = await User.findById(data._id);


            if(!userFind) {
                return res.status(400).json({
                    message: msg.error.userNotFound,
                })
            };

            res.status(200).json(
                {
                    isAuthorized: true,
                    message: msg.success.authorized,
                    username: data.email
                },
            )

        }catch(err){
            return res.status(500).json({
                message: msg.error.tokenNotValid,
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: msg.error.default,
        })
    }
}