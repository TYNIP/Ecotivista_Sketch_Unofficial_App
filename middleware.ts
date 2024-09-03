import type {NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
const {PATHURL} = require('./pages/api/config');

export async function middleware (req: NextRequest){
    try{
        const token = req.cookies.get('auth_cookie');
        if(!token){
            return NextResponse.redirect(new URL('/login', req.url));
        };


        const res = await fetch(`${PATHURL}/api/auth/check`,{
            headers: {
                token: token.value
            }
        });

        const data = await res.json();

        //@ts-ignore
        if(!data.isAuthorized){
            return NextResponse.redirect(new URL('/login', req.url));
        }


        if(data.isAuthorized){
            
            if(window.location.href === '/login' || window.location.href === '/signup'){
                return NextResponse.redirect(new URL('/'));
            }
        }

        return NextResponse.next();
    } catch(err){
        console.log('err', err)
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/info/:path*']
}