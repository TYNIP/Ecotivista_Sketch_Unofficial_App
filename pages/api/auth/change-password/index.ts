/* CHANGE PASSWORD */
import {connectMongoDB} from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import {msg} from '../../utils/msg';
import bcrypt from 'bcryptjs';
import User from '../../models/UserModel';
import jwt from 'jsonwebtoken';
const {SECRET} = require('../../config')

interface BodyProps{
    newPassword: string;
    confirmPassword: string;
}

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse,
){
    try {
        const body: BodyProps = req.body;
        const {newPassword, confirmPassword} = body;

        //Fields validation
        if(!newPassword || !confirmPassword) {
            return res.status(400).json({
                message: msg.error.needProps,
            })
        }

        //Update
        await connectMongoDB();
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
            const userFind = await User.findById(data.userId);

            if(!userFind) {
                return res.status(400).json({
                    message: msg.error.userNotFound,
                })
            };

            if(newPassword !== confirmPassword) {
                return res.status(400).json({
                    message: msg.error.pwdNotMatch,
                })
            };

            //HASH PWD
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            userFind.password = hashedPassword;
            await userFind.save();

            res.status(200).json(
                {
                    message: msg.success.pwdChanged,
                }
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