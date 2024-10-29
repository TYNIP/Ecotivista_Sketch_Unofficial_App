// functions/checkStatus.ts
"use client"

const { PATHURL } = require('../../api/config');

export async function checkStatus() {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_cookie='))
      ?.split('=')[1];

    if (!token) {
      return { isAuthorized: false };
    }

    const res = await fetch(`${PATHURL}/api/auth/check`, {
      headers: {
        token: token,
      },
    });

    const data = await res.json();

    return { isAuthorized: data.isAuthorized, username: data.username, email: data.email };
  } catch (err) {
    window.location.href = '/login';
  }
}
