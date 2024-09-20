/* FORGET PASSWORD */
import {connectMongoDB} from '../../libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import {msg} from '../../utils/msg';
import {isValidEmail} from '../../utils/isValidEmail';
import { EmailTemplate } from '../../mailsTemplates/ForgotPwd';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
const {SECRET, MKEY, PATHURL} = require('../../config')

const resend = new Resend(`${MKEY}`);

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse,
){
    try {
        const {email} = req.body;

        //Fields validation
        if(!email) {
            return res.status(400).json({
                message: msg.error.needProps,
            })
        }
        if(!isValidEmail(email)){
            return res.status(400).json({
                message: msg.error.emailNotValid,
            })
        }

        //Find User
        await connectMongoDB();
        const userFind = await User.findOne({email});
        if(!userFind){
            return res.status(400).json({
                message: msg.error.userNotFound,
            })
        }

        //Token data
        const tokenData = {
            email: userFind.email,
            userId: userFind._id
        }

        const token = jwt.sign({data: tokenData}, SECRET, {
            expiresIn: 24 * 60 * 60
        });

        //Model
        const forgetUrl = `${PATHURL}/change-password?token=${token}`;

        //@ts-ignore
        await resend.emails.send({
            from: 'Ecotivista <onboarding@resend.dev>',
            to: [`${email}`],
            subject: 'Cambiar Contraseña',
            react: EmailTemplate({ forgetPwd: forgetUrl }),
        })

        res.status(200).send(
            { message: msg.success.emailSent}
        );

    } catch (err) {
        return res.status(500).json({
            message: msg.error.default,
        })
    }
}