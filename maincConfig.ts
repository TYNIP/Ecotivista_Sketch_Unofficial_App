module.exports = {
    PATHURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_REMOTE : process.env.NEXT_PUBLIC_LOCAL,
    allowedDomains: (process.env.NODE_ENV === 'production' ? [
        process.env.NEXT_PUBLIC_REMOTE
        ] : 
        [process.env.NEXT_PUBLIC_REMOTE
    ]),
  }