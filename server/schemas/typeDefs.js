const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    snippets: [Snippet]!
  }

  type Snippet {
    _id: ID
    snippetText: String
    snippetAuthor: String
    createdAt: String
    category: Category 
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

type Category {
    _id: ID
    categoryName: String
    snippets: [Snippet]!
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    snippets(username: String): [Snippet]
    snippet(snippetId: ID!): Snippet
    categories: [Category]
    category(categoryName: String!): Category
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSnippet(snippetText: String!): Snippet
    addComment(snippetId: ID!, commentText: String!): Snippet
    removeSnippet(snippetId: ID!): Snippet
    removeComment(snippetId: ID!, commentId: ID!): Snippet
  }
`;

module.exports = typeDefs;