const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Mutation {
        calculateDays(initialDate: String!, delay: Int!): BusinessDays!
    }

    type BusinessDays {
        ok : Boolean
        businessDate : Date,
        totalDays : Int,
        holidayDays : Int,
         weekendDays: Int
        
    }

    extend type Subscription {
        calculateDays : BusinessDays!
    }
`;