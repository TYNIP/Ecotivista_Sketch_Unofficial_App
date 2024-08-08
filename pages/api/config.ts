module.exports = {
    PORT: process.env.PORT,
    USERDB: /* process.env.USERDBYEAH */ '',
    PWD: /* process.env.DBPASSWORD */ '',
    SECRET: 'HOLAGENTECOMOANDAN',
    allowedDomains: (process.env.NODE_ENV === 'production' ? [
        process.env.REMOTE_CLIENT_APP, 
        process.env.REMOTE_SERVER_API
        ] : 
        [process.env.LOCAL_CLIENT_APP, 
        process.env.LOCAL_SERVER_API
    ])
  }