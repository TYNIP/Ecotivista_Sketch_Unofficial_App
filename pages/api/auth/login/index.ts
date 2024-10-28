/* LOGIN */
import {connectMongoDB} from '../../libs/mongodb';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import {msg} from '../../utils/msg';
import {isValidEmail} from '../../utils/isValidEmail';
import User, {IUserSchema} from '../../models/User';
import jwt from 'jsonwebtoken';
const {SECRET} = require('../../config')

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse,
){
    try {
        await connectMongoDB()
    
        const {email, password} = req.body;

        console.log(req.body);
        //Fields validation
        if(!email || !password) {
            return res.status(400).json({
                message: msg.error.needProps,
            })
        }

        if(!isValidEmail(email)){
            return res.status(400).json({
                message: msg.error.emailNotValid,
            })
        }

        //FIND USER 
        const userFind = await User.findOne({email});
        if(!userFind){
            return res.status(400).json({
                message: msg.error.userNotFound,
            })
        }

        //Validte pwd
        const isCorrect: boolean = await bcrypt.compare(password, userFind.password);
        if(!isCorrect){
            return res.status(400).json({
                message: msg.error.incorrect,
            })
        } 


        // @ts-ignore
        const {password: userPass,  ...rest} = userFind._doc;
        console.log("rest: ", rest)
        //Create Token
        const token = jwt.sign({data: rest}, SECRET, {
            expiresIn: 24 * 60 * 60, 
        });

        //Creating Cookie
        console.log('creating cookies')
        res.setHeader('Set-Cookie', cookie.serialize('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24*60*60,
            path: '/',
        }))

        //User Log Status Update
        const userLogStatus = await User.findOne({email});
        if(!userLogStatus) {
            return res.status(400).json({
                message: msg.error.userNotFound,
            })
        };
        userLogStatus.userLogStatus = true;
        await userLogStatus.save();

        console.log("log status: ", userLogStatus)

        //Endpoint Response
        res.status(200).json(
            {
                userFind: rest,
                message: msg.success.userLogged,
            }
        )

    } catch (err) {
        return res.status(500).json({
            message: msg.error.default,
        })
    }
}