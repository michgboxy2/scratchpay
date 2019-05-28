const {GraphQLDateTime}  = require('graphql-iso-date');

const businessDateResolver = require('./businessDates');
const customScalarResolver = {
    Date : GraphQLDateTime
}

module.exports = [customScalarResolver, businessDateResolver];