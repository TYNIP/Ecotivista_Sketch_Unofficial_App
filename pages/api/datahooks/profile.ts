
const { PATHURL } = require('../config');

async function getData() {
    console.log(`wasabiiiii: ${PATHURL}/api/users`)
    console.log(PATHURL)
    console.log()
    const res = await fetch(`${PATHURL}/api/users`);
    console.log('res ',res)

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export {getData};