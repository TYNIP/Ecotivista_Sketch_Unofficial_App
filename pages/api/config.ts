
module.exports = {
    PORT: process.env.PORT,
    USERDB: process.env.USERDB,
    PWD: process.env.DBPASSWORD,
    SECRET: process.env.SECRETKEY,
    MKEY: process.env.MAILKEY,
    PATHURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_REMOTE : process.env.NEXT_PUBLIC_LOCAL,

    allowedDomains: (process.env.NODE_ENV === 'production' ? [
        process.env.NEXT_PUBLIC_REMOTE
        ] : 
        [process.env.NEXT_PUBLIC_REMOTE
    ]),
  }