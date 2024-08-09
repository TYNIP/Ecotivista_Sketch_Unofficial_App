/* REGISTER */
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
        const {email, password, confirmPassword} = req.body;

        //Fields validation
        if(!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: msg.error.needProps,
            })
        }

        if(!isValidEmail(email)){
            return res.status(400).json({
                message: msg.error.emailNotValid,
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message: msg.error.pwdNotMatch,
            })
        };

        //FIND USER 
        const userFind = await User.findOne({email});
        if(userFind){
            return res.status(400).json({
                message: msg.error.emailExists,
            })
        }

        //HASH PWD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword
        })

        // @ts-ignore
        const {password: userPass,  ...rest} = newUser._doc;

        //Create Token
        const token = jwt.sign({data: rest}, SECRET, {
            expiresIn: 24 * 60 * 60, 
        });

        //Endpoint Response
        await newUser.save()
        
        res.status(200).json(
            {
                newUser: rest,
                message: msg.success.userCreated,
            }
        )

        res.setHeader('Set-Cookie', cookie.serialize('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24*60*60,
            path: '/',
        }))

    } catch (err) {
        return res.status(500).json({
            message: msg.error.default,
        })
    }
}