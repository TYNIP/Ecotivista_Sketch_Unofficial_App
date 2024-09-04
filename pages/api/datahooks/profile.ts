
const { PATHURL } = require('../config');

async function getData() {
    const res = await fetch(`${PATHURL}/api/authen/users`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export {getData};