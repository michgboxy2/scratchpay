const express             = require('express'),
    bps		            = require("body-parser"),
    {ApolloServer}      = require('apollo-server-express'),
    http                = require('http'),
    cors                = require('cors'),
    morgan  = require('morgan');

    require('datejs');


const api   = require('../api/api');

const app   = express();
const schema = require('../schema');
const resolvers = require('../resolvers');

app.use(cors());

app.use(bps.json());
app.use(bps.urlencoded({extended : true}));

app.use(morgan("dev"));

app.use("/api/v1", api);

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async({req, connection}) => {
        if(connection){
           
        }

        if(req){
            
        }

    }
});

server.applyMiddleware({app, path:'/graphql'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

module.exports = httpServer;