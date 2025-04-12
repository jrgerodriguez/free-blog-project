const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Free Blog API',
    description: 'This is documentation for our API',
  },
  host: 'free-blog-project.onrender.com',
  schemes: ['https'],
  components: {
    securitySchemes: {
      oAuthNoScopes: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            scopes: {
              'https://www.googleapis.com/auth/userinfo.email': 'Access to your email address',
              'https://www.googleapis.com/auth/userinfo.profile': 'Access to your basic profile info',
            },
          },
        },
      },
    },
  },
  security: [
    {
      oAuthNoScopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
