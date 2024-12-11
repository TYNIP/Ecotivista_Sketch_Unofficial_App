
"use client"
export function getCookie() {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_cookie='))
      ?.split('=')[1];

    if (!token) {
      return { cookie: undefined };
    }
    return {cookie: token}
};
