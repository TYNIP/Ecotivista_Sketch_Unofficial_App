
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
    console.log("the data of data",data)
    return { isAuthorized: data.isAuthorized, username: data.username, email: data.email, id: data.id };
  } catch (err) {
    window.location.href = '/login';
  }
}
