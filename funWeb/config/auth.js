// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1790328744521180', // your App ID
        'clientSecret'  : 'ad7f39c7f7c05acb72f4fd67924fb5e2', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }

   /* 'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }*/

};
