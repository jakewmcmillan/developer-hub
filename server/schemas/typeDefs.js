const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    name: String
    skills: [String]!
  }






`;

module.exports = typeDefs;