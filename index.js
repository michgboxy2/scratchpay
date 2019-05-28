const httpServer = require('./server/server');


httpServer.listen({port: 8000}, () => {
    console.log('graphql app starts');
})