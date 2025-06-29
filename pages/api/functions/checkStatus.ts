"use client";

export async function checkStatus() {
  try {
    const res = await fetch(`/api/auth/check`, {
      credentials: 'include', 
    });

    if (!res.ok) {
      throw new Error('Not authorized');
    }

    const data = await res.json();

    return {
      isAuthorized: data.isAuthorized,
      username: data.username,
      email: data.email,
      id: data.id,
    };
  } catch (err) {
    
  }
}
