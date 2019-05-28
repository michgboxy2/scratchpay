const {gql}     =  require('apollo-server-express');

const businessDateSchema = require('./businessDates');
const linkSchema = gql`
    scalar Date

    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }


`;

module.exports = [linkSchema, businessDateSchema];