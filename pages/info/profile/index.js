const {PATHURL} = require('../../api/config');

async function getData(){
    console.log('api_url', PATHURL)
    const res = await fetch(`${PATHURL}/api/users`);
    console.log(res);

    if (!res.ok){
        /* throw new Error('Failed to fetch data'); */
        console.log()
    }

    const {users} = res.json();
    console.log(users);
    return users;
}

export default function ProfilePage () {
    

    return(
        <section className='mainCenter'>
            <h1>Profile</h1>
            
        </section>
    )
}