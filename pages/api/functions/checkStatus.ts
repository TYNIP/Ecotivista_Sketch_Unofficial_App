"use client"

import type {NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
const {PATHURL} = require('../../api/config');
import {cookies} from 'next/headers';

export async function checkStatus() {
    try {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth_cookie='))
            ?.split('=')[1];

        if (!token) {
            return;
        }


        const res = await fetch(`${PATHURL}/api/auth/check`, {
            headers: {
                token: token
            }
        });

        const data = await res.json();

        return data;
    } catch (err) {
        window.location.href = '/login'; // Redirect to login
    }
}
